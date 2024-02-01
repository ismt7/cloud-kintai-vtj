import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  LinearProgress,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { useForm } from "react-hook-form";
import Title from "../../components/Title/Title";
import "@blocknote/core/style.css";
import useDocuments from "../../hooks/useDocuments/useDocuments";
import { useAppDispatchV2 } from "../../app/hooks";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "../../lib/reducers/snackbarReducer";
import * as MESSAGE_CODE from "../../errors";

type Inputs = {
  title: string | null | undefined;
  content: string | null | undefined;
};

const defaultValues: Inputs = {
  title: undefined,
  content: undefined,
};

export default function DocumentPoster() {
  const dispatch = useAppDispatchV2();

  const {
    loading: documentLoading,
    error: documentError,
    createDocument,
  } = useDocuments();

  const {
    register,
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

    const { title, content } = data;
    createDocument({ title, content })
      .then(() => dispatch(setSnackbarSuccess(MESSAGE_CODE.S13002)))
      .catch(() => dispatch(setSnackbarError(MESSAGE_CODE.E13002)));
  };

  const editor: BlockNoteEditor = useBlockNote({
    onEditorContentChange(e) {
      setValue("content", JSON.stringify(e.topLevelBlocks));
    },
  });

  if (documentLoading) {
    return <LinearProgress />;
  }

  if (documentError) {
    // TODO: スナックバーでエラーを表示する
    return null;
  }

  return (
    <Container maxWidth="xl">
      <Stack direction="column" spacing={2}>
        <Breadcrumbs>
          <Link color="inherit" href="/">
            TOP
          </Link>
          <Typography color="text.primary">ドキュメント</Typography>
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
            <BlockNoteView editor={editor} />
          </Stack>
        </Container>
      </Stack>
    </Container>
  );
}
