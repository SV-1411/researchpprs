const express = require('express');
const { supabase } = require('../supabaseClient');

const router = express.Router();

const ensureSupabase = (res) => {
  if (!supabase) {
    res.status(500).json({ success: false, error: 'Supabase client is not configured on the server.' });
    return false;
  }
  return true;
};

const SETTINGS_TABLE = process.env.SUPABASE_SETTINGS_TABLE || 'site_settings';
const IMPORTANT_DATES_KEY = 'important_dates';

// GET /api/settings/important-dates
router.get('/important-dates', async (req, res) => {
  try {
    if (!ensureSupabase(res)) return;

    const { data, error } = await supabase
      .from(SETTINGS_TABLE)
      .select('key, value')
      .eq('key', IMPORTANT_DATES_KEY)
      .maybeSingle();

    if (error) {
      console.error('Error fetching important dates', error);
      return res.status(500).json({ success: false, error: 'Failed to load important dates.' });
    }

    return res.json({ success: true, dates: data?.value || null });
  } catch (err) {
    console.error('Unexpected error in GET /api/settings/important-dates', err);
    return res.status(500).json({ success: false, error: 'Failed to load important dates.' });
  }
});

// POST /api/settings/important-dates
router.post('/important-dates', async (req, res) => {
  try {
    if (!ensureSupabase(res)) return;

    const { dates } = req.body || {};

    if (!dates || typeof dates !== 'object') {
      return res.status(400).json({ success: false, error: 'dates object is required.' });
    }

    const { error } = await supabase
      .from(SETTINGS_TABLE)
      .upsert({
        key: IMPORTANT_DATES_KEY,
        value: dates,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'key' });

    if (error) {
      console.error('Error saving important dates', error);
      return res.status(500).json({ success: false, error: 'Failed to save important dates.' });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error('Unexpected error in POST /api/settings/important-dates', err);
    return res.status(500).json({ success: false, error: 'Failed to save important dates.' });
  }
});

module.exports = router;
