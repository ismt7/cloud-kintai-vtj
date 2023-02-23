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
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { selectStaff, selectStaffList } from "../../lib/store";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { Staff } from "../../api";
import fetchStaffList from "../../lib/staff/FetchStaffList";
import { selectedStaff } from "../../lib/reducers/staffListReducer";

const StaffList = () => {
  const createStaff = useAppSelector(selectStaff);
  const staffs = useAppSelector(selectStaffList);
  const [staffName, setStaffName] = useState<string>("");
  const [filteredStaffs, setFilteredStaffs] = useState<Staff[]>(staffs.data);
  const dispatch = useAppDispatch();

  const handleSearchStaff = () => {
    if (staffName === "") {
      setFilteredStaffs(staffs.data);
      return;
    }

    const filtered = staffs.data.filter(
      (staffData) =>
        staffData.lastName.includes(staffName) ||
        staffData.firstName.includes(staffName)
    );
    setFilteredStaffs(filtered);
  };

  const handleAddStaff = () => {
    dispatch(selectedStaff(undefined));
  };

  useEffect(() => {
    void dispatch(fetchStaffList());
  }, [createStaff, staffs.selectedData]);

  useEffect(() => {
    handleSearchStaff();
  }, [staffName]);

  useEffect(() => {
    setFilteredStaffs(staffs.data);
  }, [staffs]);

  return (
    <Stack
      sx={{
        width: 1,
        height: 1,
        p: 1,
        boxSizing: "border-box",
      }}
    >
      <Box>
        <Stack alignItems="center" direction="row" spacing={1}>
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
                    <IconButton
                      aria-label="staff-search"
                      onClick={handleSearchStaff}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setStaffName(e.target.value)}
            />
          </Box>
          <Box>
            <IconButton aria-label="staff-add" onClick={handleAddStaff}>
              <PersonAddIcon />
            </IconButton>
          </Box>
        </Stack>
      </Box>
      <Box sx={{ overflow: "scroll" }}>
        {filteredStaffs.length === 0 ? (
          <Box sx={{ textAlign: "center" }}>スタッフが見つかりません</Box>
        ) : (
          <List>
            {filteredStaffs.map((staffData) => (
              <Box key={staffData.staffId}>
                <ListItemButton
                  selected={staffData.staffId === staffs.selectedData?.staffId}
                  sx={{ p: 1 }}
                  onClick={() => {
                    dispatch(selectedStaff(staffData));
                  }}
                >
                  <Stack>
                    <Box>ID: {staffData.staffId}</Box>
                    <Box>
                      {staffData.lastName} {staffData.firstName}
                    </Box>
                  </Stack>
                  <Divider />
                </ListItemButton>
                <Divider />
              </Box>
            ))}
          </List>
        )}
      </Box>
    </Stack>
  );
};
export default StaffList;
