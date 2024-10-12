import React from 'react'

export default function LoginPage() {

    const handleLogin=()=>{
        console.log("azure api from backend")
    }

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login with Azure AD</button>
    </div>
  )
}
