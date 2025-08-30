import axios from "axios";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

const GoogleSuccess = () => {
    const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (token) {
        localStorage.setItem("JwtToken", token);

        try {
          const res = await axios.get(`${import.meta.env.VITE_API_KEY}/auth/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          if(res.data.success){
            setUser(res.data.data);
            localStorage.setItem("currentuser", JSON.stringify(res.data.data));
            navigate("/dashboard");
          }
        } catch (error) {
            console.log("error in googlesuccess", error);
            
            toast.error(error.message);
        }
      }
    };

    handleAuth();
  }, [navigate]);

  return <div>Logging you in... <Toaster/></div>;
};

export default GoogleSuccess;