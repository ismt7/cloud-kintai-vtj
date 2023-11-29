import { LoginStaff } from "../staff_list/StaffList";

export default function StaffForm({ loginStaff }: { loginStaff: LoginStaff }) {
  return <div>StaffForm</div>;
  // console.log(loginStaff);
  // const { staffId } = useParams();
  // const {
  //   staffRole,
  //   loading: staffRoleLoading,
  //   error: staffRoleError,
  // } = useStaffRole(staffId ? Number(staffId) : undefined);
  // const { roles, loading: roleLoading, error: roleError } = useRoles();

  // useEffect(() => {
  //   if (staffLoading || staffRoleLoading || !staff || !staffRole) return;

  //   setValue("lastName", staff.last_name);
  //   setValue("firstName", staff.first_name);
  //   setValue("mailAddress", staff.mail_address);
  //   setValue("iconPath", staff.icon_path);
  //   setValue("staffRole", staffRole);
  // }, [staffLoading, staffRoleLoading, staff, staffRole]);

  // if (staffLoading || staffRoleLoading || roleLoading) {
  //   return <LinearProgress />;
  // }

  // if (staffError || staffRoleError || roleError) {
  //   return (
  //     <Typography variant="body1">
  //       データ取得中に予期せぬ問題が発生しました。管理者に連絡してください。
  //     </Typography>
  //   );
  // }

  // return (
  //   <Stack spacing={1}>
  //     {staff && (
  //       <Box
  //         sx={{
  //           display: "inline-flex",
  //           flexDirection: "row",
  //           justifyContent: "flex-end",
  //         }}
  //       >
  //         <Button
  //           variant="contained"
  //           color="delete"
  //           // onClick={handleDelete}
  //           onClick={() => {
  //             /* 処理なし */
  //           }}
  //           sx={{ width: "150px" }}
  //         >
  //           スタッフを削除
  //         </Button>
  //       </Box>
  //     )}
  //     <Stack spacing={3} sx={{ display: "inline-block" }}>
  //       <Box>
  //         <Typography>{`スタッフID: ${staffId || ""}`}</Typography>
  //       </Box>
  //       <Stack direction="row" spacing={3}>
  //         <Box>
  //           <TextField
  //             label="名前(姓)"
  //             inputProps={{ maxLength: 10, "data-testid": "last-name" }}
  //             required={true}
  //             {...register("lastName")}
  //           />
  //         </Box>
  //         <Box>
  //           <TextField
  //             label="名前(名)"
  //             inputProps={{ maxLength: 10, "data-testid": "first-name" }}
  //             required={true}
  //             {...register("firstName")}
  //           />
  //         </Box>
  //       </Stack>
  //       <Box>
  //         <TextField
  //           label="メールアドレス"
  //           required={true}
  //           sx={{ width: 1 }}
  //           {...register("mailAddress")}
  //         />
  //       </Box>
  //       <Box>
  //         <Controller
  //           name="staffRole"
  //           control={control}
  //           render={({ field }) => (
  //             <Autocomplete
  //               value={roles.find((role) => role.id === field.value?.role_id)}
  //               options={roles}
  //               getOptionLabel={(option) => option.name}
  //               sx={{ width: 300 }}
  //               renderInput={(params) => <TextField {...params} label="役割" />}
  //               onChange={(_, data) => {
  //                 field.onChange({
  //                   ...field.value,
  //                   role_id: data?.id,
  //                 });
  //               }}
  //             />
  //           )}
  //         />
  //       </Box>
  //       <Box>
  //         {staffId ? (
  //           <Button
  //             variant="contained"
  //             onClick={handleSubmit(onSubmit)}
  //             sx={{ width: "150px" }}
  //           >
  //             保存
  //           </Button>
  //         ) : (
  //           <Button
  //             variant="contained"
  //             // onClick={handleCreate}
  //             onClick={() => {
  //               /* 処理なし */
  //             }}
  //             sx={{ width: "150px" }}
  //           >
  //             作成
  //           </Button>
  //         )}
  //       </Box>
  //     </Stack>
  //   </Stack>
  // );
}
