// EditorialBoard.js (or .tsx)

import React from 'react';

const EditorialBoard = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-slate-800">
      <h1 className="text-3xl font-bold text-center mb-6 text-slate-900">
        Editorial Board
      </h1>
      <p className="text-lg text-center text-slate-700 mb-8 italic">
       
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 border-b pb-2">Editor-in-Chief</h2>
        <div className="bg-slate-50 p-5 rounded-lg shadow-sm">
          <p className="font-bold text-lg">1. Dr. Navnath D. Kale</p>
          <p className="text-slate-700">Senior Assistant Professor, Dept. of Computer Engineering</p>
          <p className="text-slate-700">MIT Academy of Engineering, Pune, India.</p>
          <p className="mt-2 text-slate-600">Email: <a href="mailto:editor@ijepa.org" className="text-amber-600 hover:underline">editor@ijepa.org</a></p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 border-b pb-2">Associate Editors</h2>
        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="font-medium">2. Dr. Yogesh Gurav</p>
            <p className="text-slate-700">Dean Academics & Research,</p>
            <p className="text-slate-700">Dr. D. Y. Patil Technical Campus, Talegaon, Pune, India</p>
            <p className="text-slate-600 text-sm">Email: <a href="mailto:ybgurav1977@gmail.com" className="text-amber-600 hover:underline">ybgurav1977@gmail.com</a></p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="font-medium">3. Dr. Sandeep Kadam</p>
            <p className="text-slate-700">Principal, Keystone School of Engineering, Pune, India</p>
            <p className="text-slate-600 text-sm">Email: <a href="mailto:sandeep.kadam@gmail.com" className="text-amber-600 hover:underline">sandeep.kadam@gmail.com</a></p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="font-medium">4. Dr. M. Venkateshwara Rao</p>
            <p className="text-slate-700">Professor, Dept. of Computer Science and Engineering,</p>
            <p className="text-slate-700">Vignana Bharathi Institute of Technology, Ghatkesar, Hyderabad, India.</p>
            <p className="text-slate-600 text-sm">Email: <a href="mailto:venkateshwara.rao@vbithyd.ac.in" className="text-amber-600 hover:underline">venkateshwara.rao@vbithyd.ac.in</a></p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="font-medium">5. Dr. Pramod Ganjewar</p>
            <p className="text-slate-700">Head, Dept of Computer Engineering,</p>
            <p className="text-slate-700">MIT Academy of Engineering, Pune, India.</p>
            <p className="text-slate-600 text-sm">Email: <a href="mailto:pdganjewar@mitaoe.ac.in" className="text-amber-600 hover:underline">pdganjewar@mitaoe.ac.in</a></p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="font-medium">6. Dr. Manish Giri</p>
            <p className="text-slate-700">Head, Dept. of Computer Engineering (Software Engineering)</p>
            <p className="text-slate-700">MIT Academy of Engineering, Pune, India.</p>
            <p className="text-slate-600 text-sm">Email: <a href="mailto:mbgiri@mitaoe.ac.in" className="text-amber-600 hover:underline">mbgiri@mitaoe.ac.in</a></p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="font-medium">7. Dr. G. Arun</p>
            <p className="text-slate-700">Associate Professor, Dept. of Computer Science and Engineering,</p>
            <p className="text-slate-700">Vignana Bharathi Institute of Technology, Ghatkesar, Hyderabad, India.</p>
            <p className="text-slate-600 text-sm">Email: <a href="mailto:g.arun@vbithyd.ac.in" className="text-amber-600 hover:underline">g.arun@vbithyd.ac.in</a></p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="font-medium">8. Dr. Royyuru Srikanth</p>
            <p className="text-slate-700">Assistant Professor, Dept. of Computer Science and Engineering</p>
            <p className="text-slate-700">Vardhaman College of Engineering, Hyderabad, India</p>
            <p className="text-slate-600 text-sm">Email: <a href="mailto:srikanth.r@gmail.com" className="text-amber-600 hover:underline">srikanth.r@gmail.com</a></p>
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