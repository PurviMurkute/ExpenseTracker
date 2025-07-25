import axios from "axios";
import Button from "../components/Button";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import Modal from "../components/Modal";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentuser"));

    if (currentUser) {
      setUser(currentUser);
    } else {
      navigate("/signin");
    }
  }, []);

  const editProfile = async () => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_KEY}/profile/${user._id}`,
      {
        name: user.name,
        email: user.email,
      }
    );

    if (response.data.success) {
      setUser(response.data.data);
      console.log(response.data.data);
      
      localStorage.setItem("currentuser", JSON.stringify(response.data.data));
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-blue-100 via-emerald-100 to-blue-200 min-h-screen mt-14 px-5 py-2 overflow-y-auto">
        <div className="md:ms-[15%] flex flex-col justify-center items-center inset-0 absolute ">
          <h1 className="text-2xl font-bold py-5">Profile</h1>
          <div className="bg-white py-7 px-2 shadow-xl w-[90%] md:w-[50%] rounded-xl">
            <div className="px-5 md:px-13 my-2 flex justify-between">
              <p className="font-medium text-xl">Personal Information</p>
              <Button
                btnText="Save"
                btnSize="md"
                btnVariant="blue"
                onClick={()=>{setIsModalOpen(true)}}
              />
            </div>
            <label className="px-5 md:px-13 font-medium">Name</label>
            <input
              type="text"
              placeholder="Name"
              value={user.name}
              onChange={(e)=>setUser({...user, name: e.target.value})}
              className="w-[90%] md:w-[85%] bg-white p-2 mb-4 border-2 border-slate-200 shadow-lg block mx-auto rounded-md focus:outline-none"
            />
            <label className="px-5 md:px-13 font-medium">Email</label>
            <input
              type="text"
              placeholder="Email"
              value={user.email}
              onChange={(e)=>setUser({...user, email: e.target.value})}
              className="w-[90%] md:w-[85%] bg-white p-2 mb-4 border-2 border-slate-200 shadow-lg block mx-auto rounded-md focus:outline-none"
            />
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={()=>{setIsModalOpen(false)}} width="sm">
        <div className="flex flex-col justify-center items-center px-4 py-2">
            <p className="text-white text-center">Are you sure, you want to update your data?</p>
            <Button btnText="Update" btnSize="sm" btnVariant="blue" onClick={()=>{editProfile(), setIsModalOpen(false)}}/>
        </div>
      </Modal>
    </>
  );
};

export default Profile;
