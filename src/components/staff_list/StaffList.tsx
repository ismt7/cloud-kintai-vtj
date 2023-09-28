import { useEffect, useState } from "react";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Service, Staff } from "../../client";

export type LoginStaff = Staff | null;

async function fetchStaffs(staff: Staff, callback: (value: Staff[]) => void) {
  const staffs = await Service.getStaffs(staff.id).catch((error) => {
    console.log(error);
    return [] as Staff[];
  });

  callback(staffs);
}

function searchFilter(item: Staff, searchText: string) {
  if (searchText === "") {
    return true;
  }

  if (!item.last_name || !item.first_name) {
    return false;
  }

  return (
    item.last_name.includes(searchText) || item.first_name.includes(searchText)
  );
}

const StaffList = ({ loginStaff }: { loginStaff: LoginStaff }) => {
  const { staffId: paramStaffId } = useParams();
  const navigate = useNavigate();

  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [staffSearchText, setStaffSearchText] = useState<string>("");

  useEffect(() => {
    if (!loginStaff) return;

    void fetchStaffs(loginStaff, (value) => setStaffs(value));
  }, [loginStaff]);

  // const handleAddStaff = () => {
  //   dispatch(selectedStaff(undefined));
  // };

  return (
    <Stack
      sx={{
        width: 1,
        height: 1,
      }}
    >
      <Box>
        <Stack alignItems="center" direction="row" spacing={1}>
          <Box sx={{ flexGrow: 1 }}>
            <TextField
              id="standard-basic"
              variant="standard"
              placeholder="スタッフ名で検索"
              value={staffSearchText}
              sx={{ width: 1 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="staff-search"
                      // onClick={handleSearchStaff}
                      onClick={() => {
                        /* 処理なし */
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setStaffSearchText(e.target.value)}
            />
          </Box>
          <Box>
            <IconButton
              aria-label="staff-add"
              // onClick={handleAddStaff}
              onClick={() => {
                /* 処理なし */
              }}
            >
              <PersonAddIcon />
            </IconButton>
          </Box>
        </Stack>
      </Box>
      <Box sx={{ height: 1, overflow: "scroll" }}>
        {staffs.length === 0 ? (
          <Box sx={{ textAlign: "center" }}>スタッフが見つかりません</Box>
        ) : (
          <List>
            {staffs
              .filter((item) => searchFilter(item, staffSearchText))
              .map((item, index) => (
                <ListItemButton
                  key={index}
                  selected={item.id === Number(paramStaffId)}
                  sx={{ p: 1 }}
                  divider
                  onClick={() => {
                    navigate(`/admin/staff/${item.id}`);
                  }}
                >
                  <Stack>
                    <Box>ID: {item.id}</Box>
                    <Box>
                      <Typography>
                        {item.last_name && item.first_name
                          ? `${item.last_name} ${item.first_name}`
                          : "(未設定)"}
                      </Typography>
                    </Box>
                  </Stack>
                </ListItemButton>
              ))}
          </List>
        )}
      </Box>
    </Stack>
  );
};
export default StaffList;
