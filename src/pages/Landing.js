import React, { useState, useEffect } from 'react';
import PaperCard from '../components/PaperCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { mockAPI } from '../data/mockData';
import hero from "../components/annie-spratt-5cFwQ-WMcJU-unsplash.jpg"

// We will inject Roboto font for Landing page only
const Landing = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    loadPublishedPapers();
  }, []);

  useEffect(() => {
    filterPapers();
  }, [papers, searchTerm, selectedCategory]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadPublishedPapers = async () => {
    try {
      setLoading(true);
      const publishedPapers = await mockAPI.getPublishedPapers();
      setPapers(publishedPapers);
    } catch (error) {
      console.error('Error loading papers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPapers = () => {
    let filtered = papers;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(paper =>
        paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.authors.some(author => 
          author.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        paper.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(paper => paper.category === selectedCategory);
    }

    setFilteredPapers(filtered);
  };

  const categories = ['all', ...new Set(papers.map(paper => paper.category))];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-slate-50 py-16">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading published papers...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        .landing-page-roboto { font-family: 'Roboto', sans-serif; }
      `}</style>
      <div className="bg-slate-50 landing-page-roboto">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${hero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        
      }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-amber-700 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse animation-delay-4000"></div>
        
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <span className="text-amber-200 text-sm font-medium">Trusted by 500+ Researchers Worldwide</span>
            
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Publish Your Research with
              <span className="block bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">IJEPA</span>
            
            </h1>
            
            <p className="text-xl md:text-2xl text-white mb-10 leading-relaxed max-w-3xl mx-auto">
              A seamless platform for authors, reviewers, and editors. Transparent workflows. 
              Trusted by researchers worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/papers"
                className="group bg-white text-slate-900 hover:bg-amber-50 font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Browse Papers...
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="/register"
                className="group border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:-translate-y-1"
              >
                  Join Our Platform
              </a>
            </div>
          </div>
        </div>
      </section>
       <section className="bg-gradient-to-br from-slate-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              About <span className="text-amber-700">IJEPA</span>
            </h2>
            <div className="w-24 h-1 bg-amber-700 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-amber-100 text-amber-800 rounded-lg flex items-center justify-center mr-3 text-lg">📚</span>
                Who We Are
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Welcome to the <strong>International Journal of Engineering Practices and Applications (IJEPA)</strong> – your premier destination for cutting-edge engineering research and innovation. Established in 2019, we've grown from a passionate idea into a globally recognized academic platform that connects over 5,000 researchers across 87 countries.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Our journey began when a group of engineering professors and industry veterans recognized a critical gap in academic publishing – the disconnect between theoretical research and practical implementation. Today, we bridge that gap by publishing work that doesn't just advance knowledge, but transforms industries and impacts real-world engineering challenges.
              </p>
            </div>

            <div className="mt-12 mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-amber-100 text-amber-800 rounded-lg flex items-center justify-center mr-3">✓</span>
                Our Vision
              </h3>
              <p className="pl-11">
                To become a globally recognized journal that drives innovation, disseminates impactful research, and promotes collaboration across engineering domains.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-amber-100 text-amber-800 rounded-lg flex items-center justify-center mr-3">✓</span>
                Our Scope
              </h3>
              <p className="pl-11 mb-4">
                IJEPA covers, but is not limited to, the following areas:
              </p>
              <ul className="pl-11 grid grid-cols-1 md:grid-cols-2 gap-2">
                <li className="flex items-start">
                  <span className="text-amber-700 mr-2">•</span>
                  <span>Civil, Mechanical, Electrical, and Electronics Engineering</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-700 mr-2">•</span>
                  <span>Computer Science, Information Technology, and Artificial Intelligence</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-700 mr-2">•</span>
                  <span>Industrial, Manufacturing, and Materials Engineering</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-700 mr-2">•</span>
                  <span>Communication, Control, and Instrumentation Systems</span>
                </li>
                <li className="flex items-start md:col-span-2">
                  <span className="text-amber-700 mr-2">•</span>
                  <span>Sustainable, Green, and Emerging Engineering Practices</span>
                </li>
              </ul>
            </div>
            
            </div>
            

          {/* Sidebar Stats */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Our Impact</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Published Papers</span>
                  <span className="text-2xl font-bold text-amber-700">1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Global Authors</span>
                  <span className="text-2xl font-bold text-amber-700">5,000+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Countries</span>
                  <span className="text-2xl font-bold text-amber-700">87</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Impact Factor</span>
                  <span className="text-2xl font-bold text-amber-700">3.2</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-slate-600">Acceptance Rate: 23%</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span className="text-slate-600">Review Time: 4-6 weeks</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  <span className="text-slate-600">Publication Frequency: Monthly</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                  <span className="text-slate-600">Indexed in 15+ databases</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
    
      </div>
      </section>

      {/* Important Dates Section */}
      

      {/* Search and Filter Section */}
      
      {/* Features Section */}
      <section className="bg-amber-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Why Researchers Choose Build Softech
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We provide a comprehensive solution for academic research publication and peer review
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-slate-200">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-all duration-300">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-amber-700">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                Rigorous Peer Review
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed text-center">
                Your paper is reviewed by qualified experts assigned by our editorial team for quality and integrity.
              </p>
            </div>

            <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-slate-200">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-100 transition-all duration-300">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-amber-700">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                Fast Turnaround
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed text-center">
                Streamlined workflows ensure your paper moves quickly from submission to publication.
              </p>
            </div>

            <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-slate-200">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-all duration-300">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-amber-700">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                Global Visibility
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed text-center">
                Get your research seen by academics and institutions worldwide through our indexed platform.
              </p>
            </div>
          </div>
        </div>
        <section className="bg-white border-t border-slate-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div className="text-center mb-20">
      <h2 className="text-4xl font-bold text-slate-900 mb-6">
        Platform Features & Capabilities
      </h2>
      <p className="text-xl text-slate-600 max-w-3xl mx-auto">
        Our comprehensive platform provides researchers with advanced tools and resources for every stage of the publication journey
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
        <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center mb-4">
          <span className="text-xl font-bold">1</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-4">Smart Submission System</h3>
        <p className="text-slate-600 mb-4">
          Our intelligent submission portal guides authors through the entire process with real-time validation, automatic formatting checks, and instant plagiarism screening using iThenticate with 98% accuracy.
        </p>
        <ul className="space-y-2 text-sm text-slate-600">
          <li>• Drag-and-drop file upload with 500MB limit</li>
          <li>• Automatic metadata extraction from manuscripts</li>
          <li>• Real-time formatting validation</li>
          <li>• Co-author collaboration tools</li>
        </ul>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
        <div className="w-12 h-12 bg-green-100 text-green-700 rounded-lg flex items-center justify-center mb-4">
          <span className="text-xl font-bold">2</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-4">Advanced Review Management</h3>
        <p className="text-slate-600 mb-4">
          Streamlined peer review workflow with automated reviewer matching, deadline tracking, and secure communication channels. Our system supports double-blind, single-blind, and open review formats.
        </p>
        <ul className="space-y-2 text-sm text-slate-600">
          <li>• AI-powered reviewer matching algorithm</li>
          <li>• Automated deadline reminders</li>
          <li>• Secure reviewer-author communication</li>
          <li>• Review quality assessment metrics</li>
        </ul>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
        <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-lg flex items-center justify-center mb-4">
          <span className="text-xl font-bold">3</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-4">Production & Publishing</h3>
        <p className="text-slate-600 mb-4">
          Professional typesetting and layout services with XML-first workflow, ensuring consistent formatting and immediate online publication upon acceptance. All articles receive permanent DOI assignment.
        </p>
        <ul className="space-y-2 text-sm text-slate-600">
          <li>• XML-based publishing workflow</li>
          <li>• Professional copyediting services</li>
          <li>• Multiple export formats (PDF, HTML, XML)</li>
          <li>• Enhanced digital object identifiers</li>
        </ul>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
        <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center mb-4">
          <span className="text-xl font-bold">4</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-4">Analytics & Impact Tracking</h3>
        <p className="text-slate-600 mb-4">
          Comprehensive article analytics dashboard providing real-time insights into citation metrics, download statistics, altmetric scores, and social media engagement across multiple platforms.
        </p>
        <ul className="space-y-2 text-sm text-slate-600">
          <li>• Real-time citation tracking</li>
          <li>• Geographic reader distribution</li>
          <li>• Social media impact metrics</li>
          <li>• Institutional access statistics</li>
        </ul>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
        <div className="w-12 h-12 bg-red-100 text-red-700 rounded-lg flex items-center justify-center mb-4">
          <span className="text-xl font-bold">5</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-4">Author Support Center</h3>
        <p className="text-slate-600 mb-4">
          Dedicated support team providing 24/7 assistance via live chat, email, and phone. Includes free language editing, publication ethics consultation, and guidance throughout the publication process.
        </p>
        <ul className="space-y-2 text-sm text-slate-600">
          <li>• 24/7 multilingual support</li>
          <li>• Free language editing services</li>
          <li>• Publication ethics guidance</li>
          <li>• Career development resources</li>
        </ul>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
        <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center mb-4">
          <span className="text-xl font-bold">6</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-4">Open Access Compliance</h3>
        <p className="text-slate-600 mb-4">
          Full compliance with funder mandates and institutional OA policies. Flexible publishing models including Gold OA, Green OA, and hybrid options with transparent fee structures.
        </p>
        <ul className="space-y-2 text-sm text-slate-600">
          <li>• CC-BY licensing options</li>
          <li>• Funder mandate compliance</li>
          <li>• Institutional partnerships</li>
          <li>• Fee waiver programs</li>
        </ul>
      </div>
    </div>

    <div className="mt-16 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Technical Specifications</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold text-slate-800 mb-2">Platform Performance</h4>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>• 99.9% uptime guarantee</li>
            <li>• Average page load: 1.2 seconds</li>
            <li>• SSL encryption throughout</li>
            <li>• GDPR compliant infrastructure</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-800 mb-2">File Support</h4>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>• Manuscript: DOC, DOCX, LaTeX</li>
            <li>• Figures: PNG, JPG, TIFF, EPS</li>
            <li>• Supplementary: PDF, CSV, XLSX</li>
            <li>• Video: MP4, AVI (max 100MB)</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-800 mb-2">Integration Capabilities</h4>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>• ORCID authentication</li>
            <li>• Crossref DOI registration</li>
            <li>• PubMed submission</li>
            <li>• Institutional repository sync</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
      </section>

      <div className="max-w-7xl mx-auto px-6">
      <section>
  <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
    <div className="text-center mb-10">
  <h3 className="text-4xl font-extrabold text-slate-900">
    Why Publish with <span className="text-amber-700">IJEPA ?</span>
  </h3>

  <div className="mt-2 flex justify-center">
    <div className="w-24 h-1 bg-amber-700 rounded-full"></div>
  </div>
</div>


    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-slate-900 mb-3">Rigorous Peer Review Process</h4>
        <p className="text-slate-700 mb-2">Our double-blind peer review system ensures academic integrity and quality. Each manuscript undergoes evaluation by at least two independent experts in the field, typically within 4-6 weeks. Our reviewers are experienced academics and industry professionals who provide constructive feedback to enhance manuscript quality.</p>
      </div>

      <div>
        <h4 className="font-semibold text-slate-900 mb-3">Open Access & Global Visibility</h4>
        <p className="text-slate-700 mb-2">All published articles are immediately available under Creative Commons Attribution License, ensuring maximum visibility and impact. Our articles are indexed in major databases including Scopus, Web of Science, Google Scholar, and 15+ specialized engineering databases, reaching over 50,000 monthly readers worldwide.</p>
      </div>

      <div>
        <h4 className="font-semibold text-slate-900 mb-3">Publication Ethics & Integrity</h4>
        <p className="text-slate-700 mb-2">IJEPA follows COPE (Committee on Publication Ethics) guidelines strictly. We use iThenticate plagiarism detection software with 98% accuracy to ensure originality. All published articles receive DOI assignment for permanent citation and archiving through CLOCKSS and Portico preservation services.</p>
      </div>

      <div>
        <h4 className="font-semibold text-slate-900 mb-3">Author Support Services</h4>
        <ul className="space-y-2 text-slate-700">
          <li className="flex items-start">
            <span className="text-green-600 mr-2">•</span>
            <span>Free language editing services for non-native English speakers</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">•</span>
            <span>Dedicated author support team available 24/7 via email and chat</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">•</span>
            <span>Comprehensive article promotion through social media and academic networks</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">•</span>
            <span>Download certificates and publication letters for institutional requirements</span>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-slate-900 mb-3">Publication Timeline & Process</h4>
        <div className="bg-white rounded-lg p-4 border border-amber-200">
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex justify-between">
              <span>Initial Screening:</span>
              <span className="font-medium">2-3 days</span>
            </li>
            <li className="flex justify-between">
              <span>Peer Review Process:</span>
              <span className="font-medium">4-6 weeks</span>
            </li>
            <li className="flex justify-between">
              <span>Revision Period:</span>
              <span className="font-medium">2-4 weeks</span>
            </li>
            <li className="flex justify-between">
              <span>Final Decision:</span>
              <span className="font-medium">1 week</span>
            </li>
            <li className="flex justify-between">
              <span>Online Publication:</span>
              <span className="font-medium">Within 48 hours</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>

  <p className="mt-8 text-center text-lg italic text-slate-600">
    "At IJEPA, we believe that engineering is not just about knowledge creation but also about meaningful application. 
    By connecting research with practice, we aim to contribute to technological growth and societal development."
  </p>

</section>
</div>
<section className="bg-slate-50 border-t border-slate-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div className="text-center mb-20">
      <h2 className="text-4xl font-bold text-slate-900 mb-6">
        Editorial Board & Leadership
      </h2>
      <p className="text-xl text-slate-600 max-w-3xl mx-auto">
        Led by distinguished experts from top institutions worldwide, ensuring the highest standards of academic excellence
      </p>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
      <div className="lg:col-span-2">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Editor-in-Chief</h3>
        <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-slate-200 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-slate-600">EIC</span>
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-slate-900 mb-2">Dr. Michael Chen</h4>
              <p className="text-slate-600 mb-3">Professor of Mechanical Engineering, MIT</p>
              <div className="space-y-3">
                <p className="text-slate-700">
                  Dr. Chen brings over 25 years of experience in engineering research and academic publishing. With over 200 peer-reviewed publications and an h-index of 45, he is a leading authority in thermal systems and renewable energy engineering.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-slate-800 mb-2">Research Focus</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Thermal Engineering Systems</li>
                      <li>• Renewable Energy Technologies</li>
                      <li>• Sustainable Manufacturing</li>
                      <li>• Computational Fluid Dynamics</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-800 mb-2">Academic Background</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Ph.D., Stanford University (1998)</li>
                      <li>• M.S., UC Berkeley (1995)</li>
                      <li>• B.S., Caltech (1993)</li>
                      <li>• Fellow, ASME, AAAS</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Board Statistics</h3>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-slate-600">Total Board Members</span>
            <span className="text-2xl font-bold text-slate-900">47</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600">Countries Represented</span>
            <span className="text-2xl font-bold text-slate-900">18</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600">Average Experience</span>
            <span className="text-2xl font-bold text-slate-900">15+ years</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-600">Combined Publications</span>
            <span className="text-2xl font-bold text-slate-900">3,200+</span>
          </div>
        </div>
      </div>
    </div>

    <div className="mb-16">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Associate Editors</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-blue-700">AE</span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">Dr. Sarah Johnson</h4>
              <p className="text-sm text-slate-600">Civil Engineering, Imperial College London</p>
            </div>
          </div>
          <p className="text-sm text-slate-700 mb-3">
            Specializes in structural engineering and seismic design. 15+ years of experience in earthquake-resistant structures.
          </p>
          <div className="text-xs text-slate-600">
            <p>Publications: 142 | H-index: 28 | Reviews: 89</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-green-700">AE</span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">Prof. Raj Patel</h4>
              <p className="text-sm text-slate-600">Computer Science, IIT Bombay</p>
            </div>
          </div>
          <p className="text-sm text-slate-700 mb-3">
            Expert in artificial intelligence and machine learning applications in engineering systems.
          </p>
          <div className="text-xs text-slate-600">
            <p>Publications: 178 | H-index: 35 | Reviews: 112</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-purple-700">AE</span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">Dr. Maria Rodriguez</h4>
              <p className="text-sm text-slate-600">Chemical Engineering, TU Munich</p>
            </div>
          </div>
          <p className="text-sm text-slate-700 mb-3">
            Focus on sustainable chemical processes and green engineering technologies.
          </p>
          <div className="text-xs text-slate-600">
            <p>Publications: 156 | H-index: 31 | Reviews: 98</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-r from-slate-100 to-slate-50 rounded-2xl p-8 border border-slate-200">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Editorial Process & Standards</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-slate-800 mb-4">Review Process</h4>
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex items-start">
              <span className="text-amber-700 mr-2">•</span>
              <span><strong>Initial Screening:</strong> All manuscripts undergo initial quality check by editorial team within 48 hours</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-700 mr-2">•</span>
              <span><strong>Peer Review:</strong> Minimum 2 independent reviewers with expertise in the specific field</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-700 mr-2">•</span>
              <span><strong>Review Timeline:</strong> Standard review completed within 4-6 weeks</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-700 mr-2">•</span>
              <span><strong>Decision Process:</strong> Editorial board makes final decision based on reviewer recommendations</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-800 mb-4">Quality Standards</h4>
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex items-start">
              <span className="text-amber-700 mr-2">•</span>
              <span><strong>Originality:</strong> All manuscripts checked with iThenticate (98% accuracy)</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-700 mr-2">•</span>
              <span><strong>Ethical Compliance:</strong> COPE guidelines strictly followed</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-700 mr-2">•</span>
              <span><strong>Conflict of Interest:</strong> Mandatory disclosure for all reviewers and editors</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-700 mr-2">•</span>
              <span><strong>Appeals Process:</strong> Formal appeals reviewed by independent editorial committee</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
<section className="bg-amber-50 border-t border-slate-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div className="text-center mb-20">
      <h2 className="text-4xl font-bold text-slate-900 mb-6">
        Publication Process & Timeline
      </h2>
      <p className="text-xl text-slate-600 max-w-3xl mx-auto">
        A transparent, efficient, and author-friendly publication journey from submission to dissemination
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
      <div className="relative">
        <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
            <span className="font-bold">1</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-3">Submission</h3>
          <p className="text-slate-700 mb-4">
            Online submission through our secure portal with real-time validation and immediate plagiarism screening.
          </p>
          <div className="bg-white rounded-lg p-3 text-sm">
            <p className="font-semibold text-blue-700">Timeline: 2-3 days</p>
            <p className="text-slate-600">Initial screening and validation</p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="bg-amber-50 rounded-xl p-6 border-2 border-amber-200">
          <div className="w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center mb-4">
            <span className="font-bold">2</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-3">Peer Review</h3>
          <p className="text-slate-700 mb-4">
            Review by minimum 2 experts using our AI-powered reviewer matching system.
          </p>
          <div className="bg-white rounded-lg p-3 text-sm">
            <p className="font-semibold text-amber-700">Timeline: 4-6 weeks</p>
            <p className="text-slate-600">Comprehensive expert evaluation</p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
          <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center mb-4">
            <span className="font-bold">3</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-3">Revision</h3>
          <p className="text-slate-700 mb-4">
            Author responds to reviewer comments with our structured revision system and support tools.
          </p>
          <div className="bg-white rounded-lg p-3 text-sm">
            <p className="font-semibold text-green-700">Timeline: 2-4 weeks</p>
            <p className="text-slate-600">Author revision period</p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
          <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center mb-4">
            <span className="font-bold">4</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-3">Publication</h3>
          <p className="text-slate-700 mb-4">
            Professional typesetting, DOI assignment, and immediate online publication upon acceptance.
          </p>
          <div className="bg-white rounded-lg p-3 text-sm">
            <p className="font-semibold text-purple-700">Timeline: 48 hours</p>
            <p className="text-slate-600">Online publication</p>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Detailed Process Overview</h3>
        <div className="space-y-6">
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-3">Step 1: Manuscript Submission</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Create author account with ORCID integration</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Complete online submission form with all required metadata</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Upload manuscript files (DOC, DOCX, LaTeX)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Automatic plagiarism check with iThenticate</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Receive submission confirmation with tracking ID</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-3">Step 2: Editorial Screening</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>Initial quality check by editorial team (48 hours)</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>Scope and format compliance verification</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>Desk rejection if outside scope or major issues</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span>Assignment to handling editor within 72 hours</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-3">Step 3: Peer Review Process</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>AI-powered reviewer matching (2-3 reviewers)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Double-blind review process</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Review deadline: 21 days with automated reminders</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Quality assessment of reviewer comments</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Author Requirements & Guidelines</h3>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <h4 className="font-semibold text-slate-800 mb-3">Manuscript Requirements</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• Word count: 3,000-8,000 words (original research)</li>
              <li>• Abstract: 250-300 words with keywords</li>
              <li>• References: APA format, minimum 20 recent citations</li>
              <li>• Figures: High-resolution (300 DPI), numbered sequentially</li>
              <li>• Tables: Formatted in Excel or Word, editable format</li>
              <li>• Supplementary materials: PDF, CSV, or multimedia files</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200">
            <h4 className="font-semibold text-slate-800 mb-3">Ethical Requirements</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• IRB/IEC approval for human/animal studies</li>
              <li>• Informed consent documentation</li>
              <li>• Conflict of interest disclosure for all authors</li>
              <li>• Data availability statement</li>
              <li>• Funding source acknowledgment</li>
              <li>• Author contribution statements (CRediT taxonomy)</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <h4 className="font-semibold text-slate-800 mb-3">Publication Fees</h4>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex justify-between">
                <span>Standard Article Processing Charge:</span>
                <span className="font-semibold">₹100</span>
              </div>
              <div className="flex justify-between">
                <span>Review Article:</span>
                <span className="font-semibold">₹50</span>
              </div>
              <div className="flex justify-between">
                <span>Total:</span>
                <span className="font-semibold">₹150</span>
              </div>
              <div className="flex justify-between">
                <span>Fee waivers available for:</span>
                <span className="font-semibold">Developing countries</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-slate-100 rounded-2xl p-8 border border-slate-200">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Decision Types & Next Steps</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-4">
          <h4 className="font-semibold text-green-700 mb-2">Accept</h4>
          <p className="text-sm text-slate-700">Minor revisions required, proceed to production within 48 hours</p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <h4 className="font-semibold text-amber-700 mb-2">Minor Revision</h4>
          <p className="text-sm text-slate-700">2 weeks to address reviewer comments, re-review not required</p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <h4 className="font-semibold text-orange-700 mb-2">Major Revision</h4>
          <p className="text-sm text-slate-700">4 weeks to address concerns, may require additional review</p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <h4 className="font-semibold text-red-700 mb-2">Reject</h4>
          <p className="text-sm text-slate-700">Not suitable for publication, detailed feedback provided</p>
        </div>
      </div>
    </div>
  </div>
</section>
<section className="bg-white border-t border-slate-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div className="text-center mb-20">
      <h2 className="text-4xl font-bold text-slate-900 mb-6">
        Indexing & Impact Metrics
      </h2>
      <p className="text-xl text-slate-600 max-w-3xl mx-auto">
        Comprehensive indexing coverage and measurable impact ensuring maximum visibility and citation potential
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
      <div className="lg:col-span-2">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Database Indexing</h3>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <h4 className="font-semibold text-slate-800 mb-4">Major International Databases</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-blue-800 mb-3">Core Indexing</h5>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>Scopus:</strong> Elsevier's comprehensive abstract and citation database (since 2020)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>Web of Science:</strong> Clarivate Analytics Core Collection (SCIE, ESCI)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>PubMed/MEDLINE:</strong> National Library of Medicine biomedical database</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>Google Scholar:</strong> Broad academic search engine coverage</span>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-blue-800 mb-3">Specialized Databases</h5>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>Engineering Village:</strong> Compendex and Inspec databases</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>IEEE Xplore:</strong> Electrical engineering and computer science</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>ACM Digital Library:</strong> Computing literature database</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>ScienceDirect:</strong> Full-text access for institutional subscribers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <h4 className="font-semibold text-slate-800 mb-4">Regional & Subject Databases</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-medium text-green-800 mb-2">Asia-Pacific</h5>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li>• CNKI (China)</li>
                  <li>• J-STAGE (Japan)</li>
                  <li>• KCI (Korea)</li>
                  <li>• ScienceOpen</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-green-800 mb-2">Europe</h5>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li>• DOAJ (UK)</li>
                  <li>• SciELO</li>
                  <li>• Redalyc</li>
                  <li>• EBSCOhost</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-green-800 mb-2">Engineering</h5>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li>• arXiv</li>
                  <li>• ResearchGate</li>
                  <li>• Mendeley</li>
                  <li>• ORCID</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Indexing Timeline</h3>
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-lg border border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-slate-800">Initial Indexing</span>
              <span className="text-sm text-blue-600 font-medium">2-4 weeks</span>
            </div>
            <p className="text-sm text-slate-600">Google Scholar, DOAJ, basic directory listings</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg border border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-slate-800">Major Databases</span>
              <span className="text-sm text-amber-600 font-medium">3-6 months</span>
            </div>
            <p className="text-sm text-slate-600">Scopus, Web of Science evaluation and inclusion</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg border border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-slate-800">Full Coverage</span>
              <span className="text-sm text-green-600 font-medium">6-12 months</span>
            </div>
            <p className="text-sm text-slate-600">Complete indexing across all target databases</p>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Impact Metrics & Performance</h3>
        <div className="space-y-6">
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-4">Citation Metrics (2023)</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <div className="text-3xl font-bold text-blue-600 mb-2">3.2</div>
                <div className="text-sm text-slate-600">Impact Factor</div>
                <div className="text-xs text-slate-500">2-year citation average</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-3xl font-bold text-green-600 mb-2">4.1</div>
                <div className="text-sm text-slate-600">5-Year Impact Factor</div>
                <div className="text-xs text-slate-500">5-year citation average</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-3xl font-bold text-amber-600 mb-2">0.85</div>
                <div className="text-sm text-slate-600">CiteScore</div>
                <div className="text-xs text-slate-500">Scopus metric</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-3xl font-bold text-purple-600 mb-2">12.5</div>
                <div className="text-sm text-slate-600">SNIP</div>
                <div className="text-xs text-slate-500">Source Normalized Impact</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-4">Usage Statistics</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Monthly Article Views</span>
                <span className="font-semibold text-slate-900">45,000+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Monthly Downloads</span>
                <span className="font-semibold text-slate-900">18,000+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Average Citations per Article</span>
                <span className="font-semibold text-slate-900">8.7</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Altmetric Score (average)</span>
                <span className="font-semibold text-slate-900">24.3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Author Benefits & Visibility</h3>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200">
            <h4 className="font-semibold text-slate-800 mb-4">Global Reach</h4>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span><strong>87 Countries:</strong> Readers and authors from across the globe</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span><strong>5,000+ Institutions:</strong> University and corporate access</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span><strong>15+ Languages:</strong> Abstract translation services available</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span><strong>Social Media:</strong> 50,000+ followers across platforms</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <h4 className="font-semibold text-slate-800 mb-4">Citation Enhancement</h4>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span><strong>DOI Assignment:</strong> Permanent digital object identifier for all articles</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span><strong>Crossref Integration:</strong> Automatic citation linking and tracking</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span><strong>ORCID Integration:</strong> Author disambiguation and profile linking</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span><strong>Altmetric Tracking:</strong> Real-time social media and news mentions</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <h4 className="font-semibold text-slate-800 mb-4">Archiving & Preservation</h4>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span><strong>CLOCKSS:</strong> Controlled Lots of Copies Keep Stuff Safe</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span><strong>Portico:</strong> Digital preservation service for scholarly content</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span><strong>National Libraries:</strong> Deposited in major national archives</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span><strong>Permanent Access:</strong> Guaranteed long-term availability</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-r from-slate-100 to-slate-50 rounded-2xl p-8 border border-slate-200">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Indexing Application Status</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-4 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-green-600 font-bold">✓</span>
          </div>
          <h4 className="font-semibold text-slate-900 mb-2">Active Indexing</h4>
          <p className="text-sm text-slate-600">15+ databases currently indexing IJEPA content</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-amber-600 font-bold">⏱</span>
          </div>
          <h4 className="font-semibold text-slate-900 mb-2">Under Review</h4>
          <p className="text-sm text-slate-600">8 databases in evaluation process</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-blue-600 font-bold">📈</span>
          </div>
          <h4 className="font-semibold text-slate-900 mb-2">Growing Impact</h4>
          <p className="text-sm text-slate-600">25% annual increase in citations</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-purple-600 font-bold">🌍</span>
          </div>
          <h4 className="font-semibold text-slate-900 mb-2">Global Recognition</h4>
          <p className="text-sm text-slate-600">Indexed in 6 continents</p>
        </div>
      </div>
    </div>
  </div>
</section>
      {/* Quick Links Section */}
      <section className="bg-amber-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Quick Access
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Navigate to key sections of our platform with a single click.
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1: Indexing & Abstracting */}
              <div className="group bg-white p-8 rounded-2xl border border-slate-200 transition-all duration-300 hover:border-amber-400 hover:shadow-md">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-amber-700">
                    <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                  Indexing & Abstracting
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed text-center mb-6">
                  Discover where our journal is indexed and abstracted.
                </p>
                <a href="/indexing" className="block text-center bg-white border border-amber-700 text-amber-800 hover:bg-amber-700 hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300">
                  Learn More
                </a>
              </div>

              {/* Card 2: Journal Issues */}
              <div className="group bg-white p-8 rounded-2xl border border-slate-200 transition-all duration-300 hover:border-amber-400 hover:shadow-md">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-amber-700">
                    <path d="M4 6h16M4 12h16M4 18h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                  Journal Issues
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed text-center mb-6">
                  Browse our past and current journal issues.
                </p>
                <a href="/journal-issues" className="block text-center bg-white border border-amber-700 text-amber-800 hover:bg-amber-700 hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300">
                  View Issues
                </a>
              </div>

              {/* Card 3: Join as Editor/Reviewer */}
              <div className="group bg-white p-8 rounded-2xl border border-slate-200 transition-all duration-300 hover:border-amber-400 hover:shadow-md">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-amber-700">
                    <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                  Join Our Team
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed text-center mb-6">
                  Become an editor or reviewer for IJEPA.
                </p>
                <a href="/joinusedito" className="block text-center bg-white border border-amber-700 text-amber-800 hover:bg-amber-700 hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300">
                  Join Now
                </a>
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Card 4: Author Guidelines */}
                <div className="group bg-white p-8 rounded-2xl border border-slate-200 transition-all duration-300 hover:border-amber-400 hover:shadow-md">
                  <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-amber-700">
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                    Author Guidelines
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed text-center mb-6">
                    Everything you need to know to prepare your manuscript.
                  </p>
                  <a href="/author-guidelines" className="block text-center bg-white border border-amber-700 text-amber-800 hover:bg-amber-700 hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300">
                    Read Guidelines
                  </a>
                </div>

                {/* Card 5: Call for Papers */}
                <div className="group bg-white p-8 rounded-2xl border border-slate-200 transition-all duration-300 hover:border-amber-400 hover:shadow-md">
                  <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-amber-700">
                      <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.148-6.443a1.76 1.76 0 013.417-.592zM11 5.882a1.76 1.76 0 012.592.443l2.148 6.443a1.76 1.76 0 01-3.417.592l-2.148-6.443a1.76 1.76 0 01.825-1.036z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                    Call for Papers
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed text-center mb-6">
                    Submit your latest research to our upcoming issues.
                  </p>
                  <a href="/callforpapers" className="block text-center bg-white border border-amber-700 text-amber-800 hover:bg-amber-700 hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300">
                    Submit Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section - IJEPA */}
     


      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl z-50"
          aria-label="Scroll to top"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  </>
);
};
export default Landing;