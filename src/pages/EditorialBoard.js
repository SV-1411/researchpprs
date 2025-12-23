// EditorialBoard.js (or .tsx)

import React from 'react';

const EditorialBoard = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-slate-800">
      <h1 className="text-3xl font-bold text-center mb-6 text-slate-900">
        Editorial Board
      </h1>
      <p className="text-lg text-center text-slate-700 mb-8 italic">
        The International Journal of Engineering Practices and Applications (IJEPA)
      </p>

      {/* About the Editorial Board */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 border-b pb-2">About the Editorial Board</h2>
        <p className="mb-4">
          The Editorial Board of IJEPA comprises distinguished scholars, researchers, and industry experts from across the globe, representing diverse engineering disciplines. Our board plays a pivotal role in upholding the journal’s academic standards, guiding editorial policy, and ensuring the integrity and quality of published research.
        </p>
        <p>
          Through rigorous peer review, strategic vision, and domain expertise, the Editorial Board supports IJEPA’s mission to bridge theoretical innovation with real-world engineering applications.
        </p>
      </section>

      {/* Chief Editor */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 border-b pb-2">Chief Editor</h2>
        <div className="bg-slate-50 p-5 rounded-lg shadow-sm">
          <p className="font-bold text-lg">Dr. [Full Name]</p>
          <p className="text-slate-700">[Designation, e.g., Professor of Mechanical Engineering]</p>
          <p className="text-slate-700">[University / Institution Name], [Country]</p>
          <p className="mt-2 text-slate-600">Email: <a href="mailto:chiefeditor@ijepa.org" className="text-amber-600 hover:underline">chiefeditor@ijepa.org</a></p>
        </div>
      </section>

      {/* Associate Editors */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 border-b pb-2">Associate Editors</h2>
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="font-medium">Dr. [Name 1]</p>
            <p className="text-slate-700">[Affiliation], [Country]</p>
            <p className="text-slate-600 text-sm">Expertise: Civil Engineering, Sustainable Infrastructure</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="font-medium">Dr. [Name 2]</p>
            <p className="text-slate-700">[Affiliation], [Country]</p>
            <p className="text-slate-600 text-sm">Expertise: Artificial Intelligence, Machine Learning</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="font-medium">Dr. [Name 3]</p>
            <p className="text-slate-700">[Affiliation], [Country]</p>
            <p className="text-slate-600 text-sm">Expertise: Renewable Energy Systems, Power Electronics</p>
          </div>
          {/* Add more as needed */}
        </div>
      </section>

      {/* Editorial Advisory Board */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 border-b pb-2">Editorial Advisory Board</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="font-medium">Prof. [Name A]</p>
            <p className="text-slate-700">[University], [Country]</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="font-medium">Dr. [Name B]</p>
            <p className="text-slate-700">[Institute], [Country]</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="font-medium">Prof. [Name C]</p>
            <p className="text-slate-700">[Organization], [Country]</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="font-medium">Dr. [Name D]</p>
            <p className="text-slate-700">[Institution], [Country]</p>
          </div>
        </div>
      </section>

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