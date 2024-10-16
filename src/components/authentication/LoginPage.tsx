import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookieUtils";
import loginImg from "../../assets/images/login.jpg"
import MicrosoftLogo from "../../assets/images/microsoft-logo.jpg"
import "./login-page.css";
import { AuthService } from "../../services/authService";

const service = new AuthService()

export default function LoginPage() {
  
  const navigate = useNavigate();

  // const authUrl =
  //   `https://login.microsoftonline.com/380a88f6-5447-406c-bebb-2c908f53f0a3/oauth2/v2.0/authorize?` +
  //   new URLSearchParams({
  //     client_id: "0a8992fa-f124-4b04-a317-06b62cc31e84" ,
  //     response_type: "code",
  //     redirect_uri: "http://localhost:3000/runway",
  //     scope: "openid profile email User.read",
  //     response_mode: "query",
  //   }).toString();

  const handleLogin = async () => {
    console.log("azure api from backend");
    let authUrl =  await service.getAuthUrl()
    console.log(authUrl)
    window.location.href =authUrl.data
  };

  useEffect(() => {
    if (getCookie("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login-bg">
      <div className="login-card shadow">
        <div className="w-50">
          <img src={loginImg} alt="login-img" />
        </div>
        <div className="login-content p-5">
          <h4>Hello,</h4>

          <h2 className="text-start">welcome!</h2>
          <button onClick={handleLogin} >
            <div className="login-btn-content">
              <div className="d-flex align-items-center justify-content-center">
                <img src={MicrosoftLogo}/>
              </div>
              
              <p >Log in with Microsoft</p>

            </div>
          </button>
        </div>
      </div>
    </div>
  );
}


