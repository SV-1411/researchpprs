// EditorialBoard.js (or .tsx)

import React, { useEffect, useMemo, useState } from 'react';
import { mockAPI } from '../data/mockData';

const EditorialBoard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [board, setBoard] = useState([]);

  useEffect(() => {
    const loadBoard = async () => {
      try {
        setLoading(true);
        setError('');
        const result = await mockAPI.getEditorialBoard();
        if (result.success && Array.isArray(result.board)) {
          setBoard(result.board);
        } else {
          setBoard([]);
          setError(result.error || 'Editorial board is not configured yet.');
        }
      } catch (e) {
        console.error('Failed to load editorial board', e);
        setBoard([]);
        setError('Failed to load editorial board.');
      } finally {
        setLoading(false);
      }
    };

    loadBoard();
  }, []);

  const sections = useMemo(() => {
    const groups = {};
    (board || []).forEach((m) => {
      const key = String(m?.section || '').trim() || 'Editorial Board';
      if (!groups[key]) groups[key] = [];
      groups[key].push(m);
    });
    return groups;
  }, [board]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-slate-800">
      <h1 className="text-3xl font-bold text-center mb-6 text-slate-900">
        Editorial Board
      </h1>
      <p className="text-lg text-center text-slate-700 mb-8 italic">
       
      </p>

      {loading ? (
        <div className="text-center text-slate-600 py-10">Loading editorial board...</div>
      ) : Object.keys(sections).length === 0 ? (
        <div className="text-center text-slate-600 py-10">{error || 'No editorial board members found.'}</div>
      ) : (
        Object.entries(sections).map(([sectionName, members]) => (
          <section key={sectionName} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-slate-800 border-b pb-2">{sectionName}</h2>
            <div className="space-y-4">
              {members.map((m) => (
                <div key={m.id || `${m.section}-${m.name}-${m.email}`} className="bg-slate-50 p-4 rounded-lg">
                  <p className="font-medium">{m.name}</p>
                  {m.title && <p className="text-slate-700">{m.title}</p>}
                  {m.affiliation && <p className="text-slate-700">{m.affiliation}</p>}
                  {m.email && (
                    <p className="text-slate-600 text-sm">
                      Email:{' '}
                      <a href={`mailto:${m.email}`} className="text-amber-600 hover:underline">
                        {m.email}
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))
      )}

      {/* Join the Editorial Board */}
      <section className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-lg mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-slate-800">Interested in Joining the Editorial Board?</h2>
        <p className="mb-4">
          IJEPA welcomes qualified academics and industry professionals to contribute as Associate Editors or Reviewers. If you have a strong research background and a commitment to scholarly excellence, we invite you to apply.
        </p>
        <a
          href="/joinusedito"
          className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Apply Now
        </a>
      </section>

      {/* Contact */}
      <section className="text-center text-slate-600">
        <p>
          For inquiries regarding the Editorial Board, please contact the Editorial Office at{' '}
          <a href="mailto:editorial@ijepa.org" className="text-amber-600 hover:underline">editorial@ijepa.org</a>.
        </p>
      </section>
    </div>
  );
};

export default EditorialBoard;