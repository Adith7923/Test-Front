import React from "react";
import PropTypes from "prop-types";
import "./CustomGoogleLoginButton.css";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";
import secureLocalStorage from "react-secure-storage";

const clientId =
  "129038097874-1albul8aknf7348ljuhiro03sl8dhn43.apps.googleusercontent.com";

const CustomGoogleLoginButton = ({ fullWidth }) => {
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    console.log("Credential Response:", credentialResponse);

    const accessToken = credentialResponse.access_token;
    console.log("Access Token:", accessToken);

    try {
      const userInfo = await fetchUserInfo(accessToken);
      await handleUserLogin(userInfo);
    } catch (error) {
      console.error("Error during login process:", error);
      toast.error("Login failed! Please try again.");
    }
  };

  const fetchUserInfo = async (accessToken) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("User Info Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user info:", error);
      toast.error("Failed to fetch user info. Please try again.");
      throw error;
    }
  };

  const handleUserLogin = async (userInfo) => {
    const { email, name, picture, sub: participantId } = userInfo;
    console.log("Email:", email);
    console.log("Name:", name);
    console.log("Picture URL:", picture);
    console.log("Participant ID:", participantId);
    localStorage.setItem("profilePicture", picture);

    try {
      const response = await axios.post(
        "https://ekalavya.tarento.com/api/login",
        {
          email,
        }
      );
      const { roleId, userId } = response.data.responseData;
      console.log("API Response Role ID:", roleId);

      if (typeof roleId === "undefined") {
        throw new Error("Role ID is undefined");
      } else {
        secureLocalStorage.setItem("userSession", {
          roleId: roleId,
          userId: userId,
        });
        handleLoginNavigation(roleId);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const handleLoginNavigation = (roleId) => {
    switch (roleId) {
      case 3:
        navigateAndReload(`/student/profile`);
        break;
      case 2:
        navigateAndReload(`/mentor/profile`);
        break;
      case 1:
        navigateAndReload(`/admin/student`);
        break;
      default:
        console.error("Unknown role ID:", roleId);
        break;
    }
  };

  const navigateAndReload = (route) => {
    navigate(route);
    window.location.reload();
  };

  const login = useGoogleLogin({
    clientId,
    onSuccess: handleLoginSuccess,
    onError: (error) => {
      console.error("Login Failed:", error);
    },
  });

  const handleClick = () => {
    const username = secureLocalStorage.getItem("userSession");

    if (username) {
      console.log("User already logged in:", username);
    } else {
      login();
    }
  };

  return (
    <button
      onClick={() => handleClick()}
      className={`custom-google-login-button ${fullWidth ? "full-width" : ""}`}
    >
      <FaGoogle />
      Login
    </button>
  );
};

CustomGoogleLoginButton.propTypes = {
  fullWidth: PropTypes.bool,
};

CustomGoogleLoginButton.defaultProps = {
  fullWidth: false,
};

export default CustomGoogleLoginButton;
