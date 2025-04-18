import Title from "@/components/common/Title";
import { Box, Stack, Typography, Button } from "@mui/material";
import { useState } from "react";

export default function AdminFeatureManagement() {
  const [featureList, setFeatureList] = useState<string[]>(["機能A", "機能B"]);

  const addFeature = () => {
    setFeatureList([
      ...featureList,
      `機能${String.fromCharCode(65 + featureList.length)}`,
    ]);
  };

  return (
    <Stack spacing={2}>
      <Title text="機能管理" />
      <Box>
        <Typography variant="h6">機能一覧:</Typography>
        <Stack spacing={1}>
          {featureList.map((feature, index) => (
            <Typography key={index}>{feature}</Typography>
          ))}
        </Stack>
        <Button variant="contained" sx={{ mt: 2 }} onClick={addFeature}>
          機能を追加
        </Button>
      </Box>
    </Stack>
  );
}
