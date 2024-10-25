import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookieUtils";
import loginImg from "../../assets/images/login.jpg";
import MicrosoftLogo from "../../assets/images/microsoft-logo.jpg";
import { toast, ToastContainer } from "react-toastify";
import "./login-page.css";
import { AuthService } from "../../services/authService";

const service = new AuthService();

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const {statusCode} = await service.findUserByEmail(email);
      console.log(statusCode)

      if(statusCode===404){
        setEmail("")
        toast.error("Invalid User", {
          position: "top-right",
        });
        
      }else{
          console.log("azure api from backend");
          let authUrl = await service.getAuthUrl();
          console.log(authUrl);
          window.location.href = authUrl.data;
      }

      
    } catch (error) {
      console.error("Login failed:", error);
     
    }

    
  };

  useEffect(() => {
    if (getCookie("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="login-bg">
        <h5>BLP EVENTS PRIVATE LIMITED</h5>
        <div className="login-card shadow">
          <div className="w-50">
            <img src={loginImg} alt="login-img" />
          </div>
          <form className="login-content p-5" onSubmit={handleLogin}>
            <h4>Hello,</h4>

            <h2 className="text-start">welcome back!</h2>

            <input
              onChange={(e: any) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="login-input-field"
              required
            />

            <button type="submit" className="login-button">
              <div className="login-btn-content">
                <div className="d-flex align-items-center justify-content-center">
                  <h3>Login with </h3>
                </div>

                <div className="d-flex align-items-center justify-content-center">
                  <img src={MicrosoftLogo} />
                </div>
              </div>
            </button>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}
