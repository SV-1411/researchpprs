import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { mockAPI } from '../data/mockData';

const JournalIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIssuePapers, setCurrentIssuePapers] = useState([]);
  const [papersLoading, setPapersLoading] = useState(false);
  const [expandedIssueId, setExpandedIssueId] = useState(null);
  const [archiveIssuePapers, setArchiveIssuePapers] = useState({});
  const [archivePapersLoadingId, setArchivePapersLoadingId] = useState(null);

  useEffect(() => {
    const loadIssues = async () => {
      try {
        const data = await mockAPI.getIssues();
        const sorted = (data || []).slice().sort((a, b) => b.year - a.year || b.issue - a.issue);
        setIssues(sorted);
      } catch (error) {
        console.error('Error loading issues:', error);
      } finally {
        setLoading(false);
      }
    };
    loadIssues();
  }, []);

  const currentIssue = issues.find(issue => issue.isCurrent);
  const archives = issues.filter(issue => !issue.isCurrent);

  useEffect(() => {
    const loadCurrentIssuePapers = async () => {
      const issue = issues.find((i) => i.isCurrent);
      if (!issue) {
        setCurrentIssuePapers([]);
        return;
      }

      try {
        setPapersLoading(true);
        const papers = await mockAPI.getIssuePapers(issue.id);
        setCurrentIssuePapers(papers || []);
      } catch (error) {
        console.error('Error loading current issue papers:', error);
        setCurrentIssuePapers([]);
      } finally {
        setPapersLoading(false);
      }
    };

    if (issues && issues.length > 0) {
      loadCurrentIssuePapers();
    }
  }, [issues]);

  const archivesByVolume = archives.reduce((acc, issue) => {
    const volumeKey = `Volume ${issue.volume}`;
    if (!acc[volumeKey]) acc[volumeKey] = [];
    acc[volumeKey].push(issue);
    return acc;
  }, {});

  const mapBackendPaperToIssueCard = (paper) => ({
    id: paper.id,
    title: paper.title,
    authors: paper.authors || [],
    doi: paper.doi || 'N/A',
    abstract: paper.abstract || '',
    pdfUrl: paper.pdfUrl || null,
  });

  const handleArchiveIssueClick = async (issue) => {
    if (!issue) return;
    if (expandedIssueId === issue.id) {
      setExpandedIssueId(null);
      return;
    }

    setExpandedIssueId(issue.id);
    if (archiveIssuePapers[issue.id]) return;

    try {
      setArchivePapersLoadingId(issue.id);
      const papers = await mockAPI.getIssuePapers(issue.id);
      setArchiveIssuePapers(prev => ({ ...prev, [issue.id]: papers || [] }));
    } catch (error) {
      console.error('Error loading archive papers:', error);
      setArchiveIssuePapers(prev => ({ ...prev, [issue.id]: [] }));
    } finally {
      setArchivePapersLoadingId(null);
    }
  };

  const PaperCard = ({ paper }) => (
    <div className="border-l-4 border-amber-600 pl-4 py-2 mb-4 last:mb-0">
      <p className="text-sm text-slate-700">
        <span className="font-semibold text-slate-900">Title:</span> {paper.title},
      </p>
      <p className="text-sm text-slate-700 mt-1">
        <span className="font-semibold text-slate-900">Author name:</span> {Array.isArray(paper.authors) ? paper.authors.join(', ') : paper.authors}
      </p>
      <p className="text-sm text-slate-700 mt-1">
        <span className="font-semibold text-slate-900">Paper link:</span>{' '}
        {paper.id ? (
          <a
            href={`/p/${paper.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-700 hover:underline"
          >
            {`/p/${paper.id}`}
          </a>
        ) : (
          <span className="text-slate-600">N/A</span>
        )}
      </p>
      {paper.pdfUrl && (
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          <a
            href={paper.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-amber-700 hover:underline inline-block"
          >
            View Full Paper
          </a>
          <a
            href={paper.pdfUrl}
            download
            className="text-sm text-amber-700 hover:underline inline-block"
          >
            Download Paper
          </a>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Content Box — identical to AuthorGuidelines */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 print:p-6">

          {/* Header */}
          <div className="text-center mb-10 pb-6 border-b border-slate-200">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Journal <span className="text-amber-700">Issues</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore current and archived issues of IJEPA featuring peer-reviewed research across engineering disciplines.
            </p>
          </div>

          {/* Intro */}
          <p className="text-slate-700 mb-8 leading-relaxed text-justify">
            The <strong>International Journal of Engineering Practices and Applications (IJEPA)</strong> publishes regular issues featuring high-quality research articles, reviews, and case studies across diverse engineering domains. Our issues provide a global platform for disseminating knowledge and fostering innovation in engineering practices and applications.
          </p>

          {/* Current Issue */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
              Current Issue
            </h2>

            {loading ? (
              <p className="text-slate-600 text-justify">Loading current issue...</p>
            ) : currentIssue ? (
              <>
                <p className="text-slate-700 mb-4 text-justify">
                  <strong>Volume {currentIssue.volume}, Issue {currentIssue.issue} – {currentIssue.month}, {currentIssue.year}</strong>
                </p>

                {papersLoading ? (
                  <p className="text-slate-600 text-justify">Loading papers for this issue...</p>
                ) : currentIssuePapers.length > 0 ? (
                  <div>
                    {currentIssuePapers.map((paper) => (
                      <PaperCard key={paper.id} paper={mapBackendPaperToIssueCard(paper)} />
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600 text-justify">No papers have been assigned to this issue yet.</p>
                )}
              </>
            ) : (
              <p className="text-slate-600 text-justify">No current issue is available at the moment.</p>
            )}
          </section>

          {/* Archives */}
          {/* 
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
              Archives
            </h2>

            <p className="text-slate-700 mb-6 text-justify">
              Explore previously published volumes and issues of IJEPA. All articles are available in full text under our open-access policy.
            </p>

            {loading ? (
              <p className="text-slate-600 text-justify">Loading archives...</p>
            ) : (
              <div className="space-y-6">
                {Object.entries(archivesByVolume).map(([volume, issuesInVolume]) => (
                  <div key={volume}>
                    <h3 className="text-xl font-bold text-slate-800 mb-4">{volume}</h3>
                    <div className="space-y-4">
                      {issuesInVolume.map((issue) => (
                        <div
                          key={issue.id}
                          className="bg-slate-50 p-4 rounded-lg border border-slate-200 cursor-pointer"
                          onClick={() => handleArchiveIssueClick(issue)}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-slate-900">
                              Issue {issue.issue}, {issue.year}
                            </span>
                            <span className="text-xs text-amber-700">
                              {expandedIssueId === issue.id ? 'Hide' : 'View'}
                            </span>
                          </div>

                          {expandedIssueId === issue.id && (
                            <div className="mt-3 pt-3 border-t border-slate-200">
                              {archivePapersLoadingId === issue.id ? (
                                <p className="text-sm text-slate-600">Loading papers...</p>
                              ) : (archiveIssuePapers[issue.id] || []).length === 0 ? (
                                <p className="text-sm text-slate-600">No papers available.</p>
                              ) : (
                                (archiveIssuePapers[issue.id] || []).map((paper) => (
                                  <div key={paper.id} className="border-l-4 border-amber-500 pl-3 py-1 mb-2 last:mb-0">
                                    <a
                                      href={paper.pdfUrl || '#'}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-sm font-medium text-amber-800 hover:underline"
                                    >
                                      {paper.title}
                                    </a>
                                    <p className="text-xs text-slate-600 mt-1">
                                      {Array.isArray(paper.authors) ? paper.authors.join(', ') : paper.authors}
                                    </p>
                                    {paper.pdfUrl && (
                                      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                                        <a
                                          href={paper.pdfUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-xs text-amber-700 hover:underline"
                                        >
                                          View Full Paper
                                        </a>
                                        <a
                                          href={paper.pdfUrl}
                                          download
                                          className="text-xs text-amber-700 hover:underline"
                                        >
                                          Download Paper
                                        </a>
                                      </div>
                                    )}
                                  </div>
                                ))
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
          */}

          {/* Publication Info */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
              Publication Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Publication Frequency</h3>
                <p className="text-slate-700 text-justify">
                  IJEPA publishes <strong>Monthly</strong>. Special issues on emerging topics may also be announced.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Access Policy</h3>
                <p className="text-slate-700 text-justify">
                  All issues are published online and made <strong>freely accessible</strong> under our open-access policy.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <div className="text-center pt-6 border-t border-slate-200">
            <p className="text-slate-700 mb-4">
              To publish in upcoming issues, please visit our Call for Papers page.
            </p>
            <a
              href="/callforpapers"
              className="inline-flex items-center px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded-lg text-sm transition-colors"
            >
              Call for Papers
            </a>
          </div>
        </div>
      </div>
 
    </div>
  );
};

export default JournalIssues;