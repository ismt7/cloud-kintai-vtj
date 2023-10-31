import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Collapse,
  Container,
  List,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Document() {
  const navigate = useNavigate();
  const [workStartOpen, setWorkStartOpen] = useState(false);
  const [workEndOpen, setWorkEndOpen] = useState(false);
  const [restOpen, setRestOpen] = useState(false);

  const handleWorkStartClick = () => {
    setWorkStartOpen(!workStartOpen);
    setWorkEndOpen(false);
    setRestOpen(false);
  };

  const handleRestClick = () => {
    setRestOpen(!restOpen);
    setWorkStartOpen(false);
    setWorkEndOpen(false);
  };

  const handleWorkEndClick = () => {
    setWorkEndOpen(!workEndOpen);
    setWorkStartOpen(false);
    setRestOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <Stack direction="row">
        <Box>
          <List sx={{ width: 250 }}>
            <ListItemButton onClick={() => navigate("/docs/start")}>
              <ListItemText primary="はじめに" />
            </ListItemButton>
            <ListItemButton onClick={handleWorkStartClick}>
              <ListItemText primary="出勤打刻" />
              {workStartOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={workStartOpen} timeout="auto" unmountOnExit>
              <List>
                <ListItemButton onClick={() => navigate("/docs/work-start")}>
                  <ListItemText primary="通常打刻" sx={{ pl: 2 }} />
                </ListItemButton>
                <ListItemButton>
                  <ListItemText primary="直行打刻" sx={{ pl: 2 }} />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton onClick={handleRestClick}>
              <ListItemText primary="休憩打刻" />
              {workStartOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={restOpen} timeout="auto" unmountOnExit>
              <List>
                <ListItemButton onClick={() => navigate("/docs/rest-start")}>
                  <ListItemText primary="休憩開始" sx={{ pl: 2 }} />
                </ListItemButton>
                <ListItemButton onClick={() => navigate("/docs/rest-end")}>
                  <ListItemText primary="休憩終了" sx={{ pl: 2 }} />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton onClick={handleWorkEndClick}>
              <ListItemText primary="退勤打刻" />
              {workStartOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={workEndOpen} timeout="auto" unmountOnExit>
              <List>
                <ListItemButton onClick={() => navigate("/docs/work-end")}>
                  <ListItemText primary="通常打刻" sx={{ pl: 2 }} />
                </ListItemButton>
                <ListItemButton>
                  <ListItemText primary="直帰打刻" sx={{ pl: 2 }} />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
        <Box sx={{ width: 1, p: 2 }}>
          <Outlet />
        </Box>
      </Stack>
    </Container>
  );
}
