import { Staff } from "../../client";

export type LoginStaff = Staff | null;

// function searchFilter(
//   item: FieldArrayWithId<AdminStaffInputs, "staffs", "id">,
//   searchText: string
// ) {
//   if (searchText === "") {
//     return true;
//   }

//   if (!item.lastName || !item.firstName) {
//     return false;
//   }

//   return (
//     item.lastName.includes(searchText) || item.firstName.includes(searchText)
//   );
// }

export default function StaffList() {
  // {}: // staffFields,
  // {
  // staffFields: FieldArrayWithId<AdminStaffInputs, "staffs", "id">[];
  // }
  return <div>StaffList</div>;
  // const { staffId: paramStaffId } = useParams();
  // const navigate = useNavigate();

  // const [staffSearchText, setStaffSearchText] = useState<string>("");

  // // const handleAddStaff = () => {
  // //   dispatch(selectedStaff(undefined));
  // // };

  // return (
  //   <Stack
  //     sx={{
  //       width: 1,
  //       height: 1,
  //     }}
  //   >
  //     <Box>
  //       <Stack alignItems="center" direction="row" spacing={1}>
  //         <Box sx={{ flexGrow: 1 }}>
  //           <TextField
  //             id="standard-basic"
  //             variant="standard"
  //             placeholder="スタッフ名で検索"
  //             value={staffSearchText}
  //             sx={{ width: 1 }}
  //             InputProps={{
  //               endAdornment: (
  //                 <InputAdornment position="end">
  //                   <IconButton
  //                     aria-label="staff-search"
  //                     // onClick={handleSearchStaff}
  //                     onClick={() => {
  //                       /* 処理なし */
  //                     }}
  //                   >
  //                     <SearchIcon />
  //                   </IconButton>
  //                 </InputAdornment>
  //               ),
  //             }}
  //             onChange={(e) => setStaffSearchText(e.target.value)}
  //           />
  //         </Box>
  //         <Box>
  //           <IconButton
  //             aria-label="staff-add"
  //             // onClick={handleAddStaff}
  //             onClick={() => {
  //               /* 処理なし */
  //             }}
  //           >
  //             <PersonAddIcon />
  //           </IconButton>
  //         </Box>
  //       </Stack>
  //     </Box>
  //     <Box sx={{ height: 1, overflow: "scroll" }}>
  //       {staffFields.length === 0 ? (
  //         <Box sx={{ textAlign: "center" }}>スタッフが見つかりません</Box>
  //       ) : (
  //         <List>
  //           {staffFields
  //             .filter((item) => searchFilter(item, staffSearchText))
  //             .map((item, index) => (
  //               <ListItemButton
  //                 key={index}
  //                 selected={item.id === Number(paramStaffId)}
  //                 sx={{ p: 1 }}
  //                 divider
  //                 onClick={() => {
  //                   navigate(`/admin/staff/${item.id}`);
  //                 }}
  //               >
  //                 <Stack>
  //                   <Box>ID: {item.id}</Box>
  //                   <Box>
  //                     <Typography>
  //                       {item.lastName && item.firstName
  //                         ? `${item.lastName} ${item.firstName}`
  //                         : "(未設定)"}
  //                     </Typography>
  //                   </Box>
  //                 </Stack>
  //               </ListItemButton>
  //             ))}
  //         </List>
  //       )}
  //     </Box>
  //   </Stack>
  // );
}
