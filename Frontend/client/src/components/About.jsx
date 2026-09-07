const About = () => {
    return (

    <section className="py-20 bg-purple-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-purple-800 mb-4">About This Project</h2>
          <p className="text-lg text-purple-600 max-w-2xl mx-auto">
            This platform helps guests find their event photos using face recognition. Built for photographers and guests, it combines AI and a user-friendly interface to deliver instant, secure, and personalized photo results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 text-purple-700">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-purple-800">🎯 Purpose</h3>
            <p>
              Tired of digging through hundreds of photos? This app uses AI to identify guests' faces from photos uploaded by event photographers.
            </p>
            <p>
              Guests access albums via a link, fill in personal details, scan their face, and instantly find photos featuring them.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-purple-800">🛠️ Technologies Used</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Frontend:</strong> React.js, Tailwind CSS</li>
              <li><strong>Face Recognition:</strong> Python + dlib</li>
              <li><strong>Storage:</strong> Firebase or S3</li>
              <li><strong>Authentication:</strong> OTP / Guest-based</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
    
}

export default About;