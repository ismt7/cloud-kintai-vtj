import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import { useState } from "react";
import { UseFormGetValues } from "react-hook-form";
import dayjs from "dayjs";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// eslint-disable-next-line import/no-cycle
import { AttendanceEditorInputs } from "./AttendanceEditor";
import { AttendanceHistory } from "../../API";

function Row({ history }: { history: AttendanceHistory }) {
  const [open, setOpen] = useState(false);
  const rests = history.rests
    ? history.rests.filter(
        (item): item is NonNullable<typeof item> => item !== null
      )
    : [];

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          {dayjs(history.createdAt).format("YYYY/MM/DD HH:mm")}
        </TableCell>
        <TableCell>{history.staffId}</TableCell>
        <TableCell>{dayjs(history.workDate).format("YYYY/MM/DD")}</TableCell>
        <TableCell>{history.paidHolidayFlag ? "有" : "無"}</TableCell>
        <TableCell>{history.goDirectlyFlag ? "有" : "無"}</TableCell>
        <TableCell>{history.returnDirectlyFlag ? "有" : "無"}</TableCell>
        <TableCell>
          {history.startTime
            ? dayjs(history.startTime).format("HH:mm")
            : "(なし)"}
        </TableCell>
        <TableCell>
          {history.endTime ? dayjs(history.endTime).format("HH:mm") : "(なし)"}
        </TableCell>
        <TableCell>{history.remarks ? history.remarks : "(なし)"}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit sx={{ py: 1 }}>
            <Typography variant="h6">休憩</Typography>
            {rests.length === 0 ? (
              <Typography variant="body1">登録はありません</Typography>
            ) : (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: 100 }}>開始</TableCell>
                    <TableCell sx={{ width: 100 }}>終了</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rests.map((rest, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {rest.startTime
                          ? dayjs(rest.startTime).format("HH:mm")
                          : "(なし)"}
                      </TableCell>
                      <TableCell>
                        {rest.endTime
                          ? dayjs(rest.endTime).format("HH:mm")
                          : "(なし)"}
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function EditAttendanceHistoryList({
  getValues,
}: {
  getValues: UseFormGetValues<AttendanceEditorInputs>;
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button
        variant="outlined"
        size="medium"
        startIcon={<HistoryIcon />}
        onClick={handleClickOpen}
      >
        変更履歴
      </Button>
      <Dialog
        open={open}
        fullWidth
        maxWidth="lg"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"変更履歴"}</DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table size="small" sx={{ width: 1500, overflowY: "auto" }}>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell sx={{ width: 150 }}>作成日時</TableCell>
                  <TableCell sx={{ width: 300 }}>スタッフID</TableCell>
                  <TableCell sx={{ width: 100 }}>勤務日</TableCell>
                  <TableCell sx={{ width: 100 }}>有給休暇</TableCell>
                  <TableCell sx={{ width: 100 }}>直行</TableCell>
                  <TableCell sx={{ width: 100 }}>直帰</TableCell>
                  <TableCell sx={{ width: 100 }}>勤務開始</TableCell>
                  <TableCell sx={{ width: 100 }}>勤務終了</TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap" }}>備考</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getValues("histories")
                  .sort((a, b) =>
                    dayjs(b.createdAt).isBefore(dayjs(a.createdAt)) ? -1 : 1
                  )
                  .map((history, index) => (
                    <Row key={index} history={history} />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
