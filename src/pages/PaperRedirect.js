import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { mockAPI } from '../data/mockData';

const PaperRedirect = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [targetUrl, setTargetUrl] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setLoading(true);
        const paper = await mockAPI.getPaperById(id);
        const pdfUrl = paper?.pdfUrl || null;

        if (!isMounted) return;

        if (pdfUrl) {
          setTargetUrl(pdfUrl);
          return;
        }

        setTargetUrl(null);
      } catch (_e) {
        if (!isMounted) return;
        setTargetUrl(null);
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (!targetUrl) return;
    window.location.replace(targetUrl);
  }, [targetUrl]);

  if (!id) return <Navigate to="/" replace />;
  if (!loading && !targetUrl) return <Navigate to="/journal-issues" replace />;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 max-w-md w-full">
        <p className="text-slate-800 font-medium">Opening paper...</p>
        <p className="text-slate-600 text-sm mt-1">If nothing happens, your paper file link may be missing.</p>
      </div>
    </div>
  );
};

export default PaperRedirect;
