import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookieUtils";
import "./login-page.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const authUrl =
    `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}/oauth2/v2.0/authorize?` +
    new URLSearchParams({
      client_id: process.env.REACT_APP_CLIENT_ID || "",
      response_type: "code",
      redirect_uri: "http://localhost:3000/runway",
      scope: "openid profile email User.read",
      response_mode: "query",
    }).toString();

  const handleLogin = () => {
    console.log("azure api from backend");
    window.location.href = authUrl;
  };

  useEffect(() => {
    if (getCookie("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="w-50">
          <img src="" alt="login-img" />
        </div>
        <div>
          <h4>Hello,</h4>
          <h2>welcome!</h2>
          <button onClick={handleLogin}>
            <div>
              <img/>
              <p>Log in with Microsoft</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
