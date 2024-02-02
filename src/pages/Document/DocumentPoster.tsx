import {
  Autocomplete,
  Box,
  Breadcrumbs,
  Button,
  Container,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title/Title";
import "@blocknote/core/style.css";
import { useAppDispatchV2 } from "../../app/hooks";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "../../lib/reducers/snackbarReducer";
import * as MESSAGE_CODE from "../../errors";
import createDocumentData from "../../hooks/useDocuments/createDocumentData";

type Inputs = {
  title: string | null | undefined;
  content: string | null | undefined;
  targetRole: string[];
};

const defaultValues: Inputs = {
  title: undefined,
  content: undefined,
  targetRole: [],
};

export default function DocumentPoster() {
  const dispatch = useAppDispatchV2();
  const navigate = useNavigate();

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm<Inputs>({
    mode: "onChange",
    defaultValues,
  });

  const onSubmit = (data: Inputs) => {
    if (!data.title || !data.content) {
      return;
    }

    const { title, content, targetRole } = data;
    createDocumentData({ title, content, targetRole })
      .then(() => {
        dispatch(setSnackbarSuccess(MESSAGE_CODE.S13002));
        navigate("/docs");
      })
      .catch(() => dispatch(setSnackbarError(MESSAGE_CODE.E13002)));
  };

  const editor: BlockNoteEditor = useBlockNote({
    onEditorContentChange(e) {
      setValue("content", JSON.stringify(e.topLevelBlocks));
    },
  });

  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <Stack direction="column" spacing={2}>
        <Breadcrumbs>
          <Link color="inherit" href="/">
            TOP
          </Link>
          <Link color="inherit" href="/docs">
            ドキュメント一覧
          </Link>
          <Typography color="text.primary">作成</Typography>
        </Breadcrumbs>
        <Title text="ドキュメントの作成" />
        <Container maxWidth="md">
          <Stack direction="column" spacing={2}>
            <Box>
              <Button
                variant="contained"
                size="medium"
                onClick={handleSubmit(onSubmit)}
                disabled={!isDirty || !isValid || isSubmitting}
              >
                保存
              </Button>
            </Box>
            <TextField label="タイトル" {...register("title")} />
            <Controller
              name="targetRole"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  value={field.value}
                  multiple
                  options={["スタッフ", "管理者"]}
                  renderInput={(params) => (
                    <TextField {...params} label="対象者" />
                  )}
                  onChange={(_, data) => {
                    field.onChange(data);
                  }}
                />
              )}
            />
            <Paper elevation={3} sx={{ p: 3 }}>
              <BlockNoteView editor={editor} />
            </Paper>
          </Stack>
        </Container>
      </Stack>
    </Container>
  );
}
