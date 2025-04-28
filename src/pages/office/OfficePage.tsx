import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OfficePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/office/qr");
  }, [navigate]);

  return null;
};

export default OfficePage;
