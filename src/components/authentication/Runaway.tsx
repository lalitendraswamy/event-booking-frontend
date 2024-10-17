// src/Runway.js
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCookie, setCookie } from '../../utils/cookieUtils';
import { useDispatch } from 'react-redux';
import { getLoginUser } from '../../redux/features/authentication/UserSlice';
import customAxios from './customAxios';

function Runway() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get('code');
    if (code) {

      // Send the authorization code to the backend to exchange for tokens
      const exchangeCodeForTokens = async () => {
        try {
              if(!getCookie("token")){
              console.log('code', code)

              const response = await customAxios.post("/auth/callback", { code });
              console.log("user data", response.data);
  
            setCookie('token', response.data.token,3);
            setCookie('role', response.data.role , 3);
            dispatch<any>(getLoginUser({
              username:response.data.username,
              userImageUrl:response.data.userImageUrl,
              role:response.data.role
            }))
            navigate("/");
          }

        } catch (e) {
          console.log(e);
        }
      };

      exchangeCodeForTokens();

    } else {
      // Handle error or missing code
      console.error('No authorization code found.');
    }


  }, []);

  return (
    <div>
      <h2>Processing authentication...</h2>
    </div>
  );
}

export default Runway;
