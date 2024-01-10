import { Box, CircularProgress } from "@mui/material";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TimeRecorder from "../components/time_recorder/TimeRecorder";

export default function Register() {
  const { route } = useAuthenticator();
  const navigate = useNavigate();

  useEffect(() => {
    if (route !== "idle" && route !== "authenticated") {
      navigate("/login");
    }
  }, [route]);

  if (route !== "authenticated") {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ height: 1, py: 10, justifyContent: "center", display: "flex" }}>
      <TimeRecorder />
    </Box>
  );
}
