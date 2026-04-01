import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';   
import 'react-phone-input-2/lib/style.css';

const GuestAuth = () => {

    const [ phone,setPhone ] = useState('');
    const handleCountryCode = (e) => {
        e.target.value = e.target.value.replace(/\D/g,'');
    }
    
    return (
        
        <>
         <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4">
            <div className="max-w-md w-full">

            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl space-y-6">
            <h1 className="text-3xl font-bold text-purple-700 text-center">Guest Authentication</h1>

            {/* <!-- Form --> */}
            <form className="space-y-5">
            {/* <!-- Name --> */}
            <div>
                <label for="name" className="block text-gray-700 font-medium mb-1">Full Name</label>
                <input type="text" id="name" required placeholder="Your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>

            {/* <!-- Email --> */}
            <div>
                <label for="email" className="block text-gray-700 font-medium mb-1">Email</label>
                <input type="email" id="email" required placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>

            {/* <!-- Phone --> */}
            
            <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">Phone Number</label>
                <PhoneInput
                    country={'in'}
                    value={phone}
                    onChange={setPhone}
                    inputProps={{
                    required: true,
                    name: 'phone',
                    id: 'phone',
                    }}
                    inputStyle={{
                    width: '100%',
                    height: '42px',
                    borderRadius: '8px',
                    border: '1px solid border-gray-300', 
                    }}
                    containerStyle={{ width: '100%' }}
                    buttonStyle={{ borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}
                />
                </div>            

            {/* <!-- Selfie --> */}
            <div>
                <h2 className="text-gray-700 font-medium mb-2">Capture Selfie</h2>
                <button type="button"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-200">
                <i className="ri-camera-line mr-2"></i>Open Camera
                </button>
            </div>

            {/* <!-- Consent --> */}
            <div className="flex items-start gap-2">
                <input type="checkbox" id="consent" required className="mt-1" />
                <label for="consent" className="text-sm text-gray-600">
                I agree to the <a href="#" className="text-purple-600 underline">Privacy Policy</a> and give my consent.
                </label>
            </div>

            {/* <!-- Submit --> */}
            <button type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:opacity-90 text-white font-semibold py-3 rounded-lg text-lg transition duration-200">
                Get My Photos
            </button>
            </form>

            {/* <!-- Footer --> */}
            <div className="pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 mb-3">Follow Us</p>
            <div className="flex justify-center gap-4 text-2xl text-purple-600">
                <a href="#" title="Instagram"><i className="ri-instagram-line"></i></a>
                <a href="#" title="GitHub"><i className="ri-github-line"></i></a>
            </div>
            <p className="text-sm text-gray-500 mt-4">Powered by <span className="font-semibold text-purple-700">SnapFinder</span></p>
            </div>
        </div>
        </div>
        </div>  
        </>
    );
}

export default GuestAuth;