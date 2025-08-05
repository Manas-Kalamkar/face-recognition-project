import { NavLink,useNavigate } from "react-router-dom";

const FindingPhotos = () => {

    const navigate = useNavigate(); 
    const handleSubmit = (e) => {
        e.preventDefault();

        navigate('/guestauth');
    }

    return (
        <>
         <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4">
            <div className="max-w-md w-full">

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Album Link */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="albumLink">Album Link</label>
                        <input
                        type="text"
                        id="albumLink"
                        placeholder="Paste the album link here"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="password">Password</label>
                        <input
                        type="password"
                        id="password"
                        placeholder="Enter album password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                        />
                    </div>

                    {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-200"
                            >
                                Access Album
                            </button>

                    </form>

            </div>
        </div>
        

        </>
    );
}

export default FindingPhotos;