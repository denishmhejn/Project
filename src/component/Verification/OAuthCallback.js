import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const fetchAccessToken = async (code, navigate) => {
try {
        // const response = await axios.post("http://localhost:8080/api/auth/google", {
        //   code,
        //   redirectUri: "http://localhost:3000/oatuh-callback", // this must match exactly what you registered
        // });

        // const { token, user } = response.data;

        if (code) {
          localStorage.setItem("token", code);
          navigate("/");
        } else {
          console.error("Token not received from backend");
          navigate("/Login/");
        }
      } catch (error) {
        console.error("OAuth login failed:", error.response?.data || error.message);
        navigate("/Login");
      }
};

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      console.error("Authorization code not found");
      navigate("/Signup");
      return;
    }
    fetchAccessToken(code, navigate);
  }, [code, navigate]);

  return <div>Logging you in via Google...</div>;
};

export default OAuthCallback;
