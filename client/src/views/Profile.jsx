import axios from "axios";
import Button from "../components/Button";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import Input from "../components/Input";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [password, setPassword] = useState({
    currentPass: "",
    newPass: "",
    confirmNewPass: "",
  });
  const [showPass, setShowPass] = useState(false);


  const [isModalOpen, setIsModalOpen] = useState(false);

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
      localStorage.setItem("currentuser", JSON.stringify(response.data.data));
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  const updatePassword = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_KEY}/password/${user._id}`,
        {
          currentPass: password.currentPass,
          newPass: password.newPass,
          confirmNewPass: password.confirmNewPass,
        }
      );

      if (response.data.success) {
        setPassword(response.data.data);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || e?.message);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-blue-100 via-emerald-100 to-blue-200 min-h-screen mt-14 px-5 py-2 ">
        <div className="md:ms-[15%] flex flex-col gap-4 justify-center items-center inset-0 ">
          <h1 className="text-2xl font-bold py-2">Profile</h1>
          <div className="bg-white py-7 px-2 shadow-xl w-[95%] md:w-[55%] rounded-xl">
            <div className="px-5 md:px-13 my-2 flex justify-between">
              <p className="font-medium text-xl">Personal Information</p>
              <Button
                btnText="Save"
                btnSize="md"
                btnVariant="blue"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              />
            </div>
            <label className="px-5 md:px-13 font-medium">Name</label>
            <Input
              type="text"
              placeholder="Name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              profileInput="true"
            />
            <label className="px-5 md:px-13 font-medium">Email</label>
            <Input
              type="text"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              profileInput="true"
            />
          </div>
          <div className="bg-white py-7 px-2 shadow-xl w-[95%] md:w-[55%] rounded-xl">
            <div className="px-5 md:px-13 my-2 flex justify-between">
              <p className="font-medium text-xl">Reset Password</p>
              <Button
                btnText="Save"
                btnSize="md"
                btnVariant="blue"
                onClick={updatePassword}
              />
            </div>
            <label className="px-5 md:px-13 font-medium">Old Password</label>
            <Input
              type={showPass? "text": "password"}
              placeholder="Current Password"
              value={password.currentPass}
              onChange={(e) =>
                setPassword({ ...password, currentPass: e.target.value })
              }
              profileInput="true"
              passwordInput="true"
              showPass={showPass}
              setShowPass={setShowPass}
            />
            <label className="px-5 md:px-13 font-medium">New Password</label>
            <Input
              type={showPass? "text": "password"}
              placeholder="New Password"
              value={password.newPass}
              onChange={(e) =>
                setPassword({ ...password, newPass: e.target.value })
              }
              profileInput="true"
              passwordInput="true"
              showPass={showPass}
              setShowPass={setShowPass}
            />
            <label className="px-5 md:px-13 font-medium">
              Confirm New Password
            </label>
            <Input
              type={showPass? "text": "password"}
              placeholder="Confirm New Password"
              value={password.confirmNewPass}
              onChange={(e) =>
                setPassword({ ...password, confirmNewPass: e.target.value })
              }
              profileInput="true"
              passwordInput="true"
              showPass={showPass}
              setShowPass={setShowPass}
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        width="sm"
      >
        <div className="flex flex-col justify-center items-center px-4 py-2">
          <p className="text-white text-center">
            Are you sure, you want to update your data?
          </p>
          <Button
            btnText="Update"
            btnSize="sm"
            btnVariant="blue"
            onClick={() => {
              editProfile(), setIsModalOpen(false);
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default Profile;
