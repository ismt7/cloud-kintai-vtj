import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import { Box, Stack, Typography } from "@mui/material";
import { JobTermList, JobTermStatus } from "../reducers/FetchJobTermList";
import AggregateEndItem from "./AggregateEndItem";
import AggregateStartItem from "./AggregateStartItem";

interface AggregateRangeItemProps {
  item: JobTermList;
  setJobTermData: React.Dispatch<React.SetStateAction<JobTermList[]>>;
}

export default function AggregateRangeItem({
  item,
  setJobTermData,
}: AggregateRangeItemProps) {
  const syncStatus = () => {
    switch (item.status) {
      case JobTermStatus.NO_SYNCED:
        return (
          <Typography variant="body1">
            <CloudQueueIcon />
          </Typography>
        );
      case JobTermStatus.SYNCED:
        return (
          <Typography variant="body1">
            <CloudDoneIcon />
          </Typography>
        );
      default:
        return (
          <Typography variant="body1">
            <CloudOffIcon />
          </Typography>
        );
    }
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Box>
        <AggregateStartItem item={item} setJobTermData={setJobTermData} />
      </Box>
      <Box>〜</Box>
      <Box>
        <AggregateEndItem item={item} setJobTermData={setJobTermData} />
      </Box>
      <Box>{syncStatus()}</Box>
    </Stack>
  );
}
