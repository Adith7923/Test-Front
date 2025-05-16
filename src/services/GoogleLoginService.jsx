import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const clientId =
  "129038097874-1albul8aknf7348ljuhiro03sl8dhn43.apps.googleusercontent.com";

const GoogleLoginService = async () => {
  try {
    const login = useGoogleLogin({
      clientId: clientId,
      onSuccess: async (credentialResponse) => {
        console.log("Credential Response:", credentialResponse);

        const accessToken = credentialResponse.access_token;
        console.log("Access Token:", accessToken);

        try {
          const userInfoResponse = await axios.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          console.log("User Info Response:", userInfoResponse.data);

          const { email, name, picture } = userInfoResponse.data;
          console.log("Email:", email);
          console.log("Name:", name);
          console.log("Picture URL:", picture);

          const participantId = userInfoResponse.data.sub;
          console.log("Participant ID:", participantId);

          const apiResponse = await axios.get(
            "https://ekalavya.tarento.com/api/enrollment",
            {
              params: { participantId: participantId },
            }
          );
          console.log("API Response:", apiResponse.data);
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      },
      onError: (error) => {
        console.error("Login Failed:", error);
      },
    });

    return login;
  } catch (error) {
    console.error("Error initializing Google login:", error);
    throw error;
  }
};

export default GoogleLoginService;
