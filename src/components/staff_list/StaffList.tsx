import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const StaffList = () => {
  const [staffName, setStaffName] = useState<string>("");

  return (
    <Stack sx={{ width: 1, p: 1, boxSizing: "border-box" }}>
      <Box>
        <Stack alignItems="center" direction="row">
          <Box sx={{ flexGrow: 2 }}>
            <TextField
              id="standard-basic"
              variant="standard"
              placeholder="スタッフ名で検索"
              value={staffName}
              sx={{ width: 1 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="staff-search">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setStaffName(e.target.value)}
            />
          </Box>
          <Box>
            <IconButton aria-label="staff-add">
              <PersonAddIcon />
            </IconButton>
          </Box>
        </Stack>
      </Box>
      <Box>
        <List>
          <ListItemButton sx={{ p: 1 }}>
            <Stack>
              <Box>ID: 0001</Box>
              <Box>田中 太郎</Box>
            </Stack>
          </ListItemButton>
          <Divider />
          <ListItemButton sx={{ p: 1 }}>
            <Stack>
              <Box>ID: 0001</Box>
              <Box>田中 太郎</Box>
            </Stack>
          </ListItemButton>
          <Divider />
          <ListItemButton sx={{ p: 1 }}>
            <Stack>
              <Box>ID: 0001</Box>
              <Box>田中 太郎</Box>
            </Stack>
          </ListItemButton>
        </List>
      </Box>
    </Stack>
  );
};
export default StaffList;
