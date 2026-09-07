import { NavLink } from "react-router-dom";
import Button from "./ui/Button";


const Home = () => {
    return (
        <>
            {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20digital%20face%20recognition%20technology%20with%20soft%20purple%20gradients%2C%20clean%20minimalist%20background%20with%20floating%20geometric%20elements%2C%20professional%20photography%20equipment%2C%20futuristic%20AI%20interface%20elements%2C%20very%20clean%20and%20elegant%20composition&width=1200&height=800&seq=hero-bg&orientation=landscape')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Find yourself in
                  <span className="bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent block">
                    event photos
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Simply scan your face and instantly discover all photos containing you from any event or album. 
                  Powered by advanced AI face recognition technology.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <NavLink to="/findingPhotos">
                  <Button size="lg" className="w-full sm:w-auto">
                    <i className="ri-scan-line text-xl"></i>
                    Start Finding Photos
                  </Button>
                </NavLink>
              </div>
              
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <i className="ri-shield-check-line text-purple-600 text-xl"></i>
                  <span className="text-sm text-gray-600">100% Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-flash-line text-purple-600 text-xl"></i>
                  <span className="text-sm text-gray-600">Instant Results</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-smartphone-line text-purple-600 text-xl"></i>
                  <span className="text-sm text-gray-600">Mobile Friendly</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <img 
                  src="https://readdy.ai/api/search-image?query=Modern%20smartphone%20interface%20showing%20face%20recognition%20scanning%20process%2C%20clean%20UI%20design%20with%20purple%20accents%2C%20person%20smiling%20at%20camera%20within%20circular%20frame%2C%20gallery%20of%20matched%20photos%20below%2C%20professional%20product%20photography%2C%20minimalist%20design&width=500&height=600&seq=hero-phone&orientation=portrait"
                  alt="Face recognition interface"
                  className="w-full h-auto rounded-2xl object-cover"
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-purple-100 rounded-full p-4 shadow-lg">
                <i className="ri-camera-3-fill text-purple-600 text-2xl"></i>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-blue-100 rounded-full p-4 shadow-lg">
                <i className="ri-search-eye-line text-blue-600 text-2xl"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to find all your photos</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto">
                <i className="ri-camera-line text-purple-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold">1. Scan Your Face</h3>
              <p className="text-gray-600">Use your camera to take a quick photo of yourself</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto">
                <i className="ri-search-line text-blue-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold">2. AI Processing</h3>
              <p className="text-gray-600">Our AI instantly searches through all event photos</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto">
                <i className="ri-download-line text-green-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold">3. Download Photos</h3>
              <p className="text-gray-600">View and download all photos containing you</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to find yourself in photos?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of users who've already discovered their photos
          </p>
          <NavLink to="/login">
            <Button variant="secondary" size="lg">
              <i className="ri-arrow-right-line text-xl"></i>
              Get Started Now
            </Button>
          </NavLink>
        </div>
      </section> 
        </>
    );
}


export default Home;