import Button from "../components/Button";
import Header from "../components/Header";

const Profile = () => {
    
    return(
        <>
        <Header/>
        <div className="bg-gradient-to-b from-blue-100 via-emerald-100 to-blue-200 min-h-screen mt-14 px-5 py-2 overflow-y-auto">
            <div className="md:ms-[15%] flex flex-col justify-center items-center inset-0 absolute ">
                <h1 className="text-2xl font-bold py-5">Profile</h1>
                <div className="bg-white py-7 px-2 shadow-xl w-[50%] rounded-md">
                    <div className="px-13 flex justify-between">
                        <p className="font-medium text-lg ">Personal Information</p>
                        <Button btnText="Edit" btnSize="md" btnVariant="blue"/>
                    </div>
                    <label className="px-13">Name</label>
                    <input type="text" placeholder="Name" className="w-[90%] md:w-[85%] bg-white p-2 mb-4 border-2 border-slate-200 shadow-lg block mx-auto rounded-md focus:outline-none"/>
                    <label className="px-13">Email</label>
                    <input type="text" placeholder="Email" className="w-[90%] md:w-[85%] bg-white p-2 mb-4 border-2 border-slate-200 shadow-lg block mx-auto rounded-md focus:outline-none"/>
                </div>
            </div>
        </div>
        </>
    )
};

export default Profile;