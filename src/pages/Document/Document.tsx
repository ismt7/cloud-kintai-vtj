import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Collapse,
  Container,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

interface DocumentOpen {
  workStart: boolean;
  workEnd: boolean;
  rest: boolean;
}

const initialDocumentOpen: DocumentOpen = {
  workStart: false,
  workEnd: false,
  rest: false,
};

export default function Document() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<DocumentOpen>(initialDocumentOpen);

  const handleClick = (key: keyof DocumentOpen) => {
    const newOpen = { ...open };
    newOpen[key] = !open[key];
    Object.keys(open).forEach((k) => {
      if (k !== key) {
        newOpen[k as keyof DocumentOpen] = false;
      }
    });
    setOpen(newOpen);
  };

  return (
    <Container maxWidth="xl">
      <Stack direction="row">
        <Box>
          <List sx={{ width: 250 }}>
            <ListItemButton onClick={() => navigate("/docs/start")}>
              <ListItemText primary="はじめに" />
            </ListItemButton>
            <ListItemButton onClick={() => handleClick("workStart")}>
              <ListItemText primary="出勤打刻" />
              {open.workStart ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open.workStart} timeout="auto" unmountOnExit>
              <List>
                <ListItemButton onClick={() => navigate("/docs/work-start")}>
                  <ListItemText primary="通常打刻" sx={{ pl: 2 }} />
                </ListItemButton>
                <ListItemButton onClick={() => navigate("/docs/go-direct")}>
                  <ListItemText primary="直行打刻" sx={{ pl: 2 }} />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton onClick={() => handleClick("rest")}>
              <ListItemText primary="休憩打刻" />
              {open.rest ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open.rest} timeout="auto" unmountOnExit>
              <List>
                <ListItemButton onClick={() => navigate("/docs/rest-start")}>
                  <ListItemText primary="休憩開始" sx={{ pl: 2 }} />
                </ListItemButton>
                <ListItemButton onClick={() => navigate("/docs/rest-end")}>
                  <ListItemText primary="休憩終了" sx={{ pl: 2 }} />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton onClick={() => handleClick("workEnd")}>
              <ListItemText primary="退勤打刻" />
              {open.workEnd ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open.workEnd} timeout="auto" unmountOnExit>
              <List>
                <ListItemButton onClick={() => navigate("/docs/work-end")}>
                  <ListItemText primary="通常打刻" sx={{ pl: 2 }} />
                </ListItemButton>
                <ListItemButton>
                  <ListItemText primary="直帰打刻" sx={{ pl: 2 }} />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton
              onClick={() => navigate("/docs/attendance-remarks")}
            >
              <ListItemText primary="勤怠備考" />
            </ListItemButton>
          </List>
        </Box>
        <Box sx={{ width: 1, p: 2 }}>
          <Stack spacing={2}>
            <Box>
              <Breadcrumbs>
                <Link to="/" color="inherit">
                  TOP
                </Link>
                <Typography color="text.primary">ドキュメント</Typography>
              </Breadcrumbs>
            </Box>
            <Box>
              <Outlet />
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
