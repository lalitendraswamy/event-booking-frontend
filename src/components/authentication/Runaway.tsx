'use client'

import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getCookie, setCookie } from '../../utils/cookieUtils'
import { useDispatch } from 'react-redux'
import { getLoginUser } from '../../redux/features/authentication/UserSlice'
import customAxios from './customAxios'
import './runaway.css'

export default function Runway() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const code = query.get('code')
    if (code) {
      const exchangeCodeForTokens = async () => {
        try {
          if (!getCookie("token")) {
            console.log('code', code)
            console.log("Before", !getCookie("token"))
            const response = await customAxios.post("/auth/callback", { code })

            console.log("After", !getCookie("token"))
            console.log("user data", response.data)
            setCookie('token', response.data.token, 3)
            setCookie('role', response.data.role, 3)
            dispatch<any>(getLoginUser({
              username: response.data.username,
              userImageUrl: response.data.userImageUrl,
              role: response.data.role
            }))
            navigate("/")
          }
        } catch (e) {
          console.log(e)
        }
      }
      exchangeCodeForTokens()
    } else {
      console.error('No authorization code found.')
    }
  }, [location, navigate, dispatch])

  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <h2>Processing Authentication</h2>
      <p>Please wait while we securely log you in...</p>
      
    </div>
  )
}