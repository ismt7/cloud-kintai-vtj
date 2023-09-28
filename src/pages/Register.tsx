import { Box, Typography } from "@mui/material";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TimeRecorder from "../components/time_recorder/TimeRecorder";

function Register() {
  const { route, user } = useAuthenticator();
  const navigate = useNavigate();

  const cognitoUserId = user?.attributes?.sub;

  useEffect(() => {
    if (route !== "idle" && route !== "authenticated") {
      navigate("/login");
    }
  }, [route]);

  return (
    <Box sx={{ height: 1, py: 10, justifyContent: "center", display: "flex" }}>
      {route === "authenticated" ? (
        <TimeRecorder cognitoUserId={cognitoUserId} />
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
}

export default Register;
