import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import fetchDocument from "../../../hooks/useDocuments/fetchDocument";
import { useAppDispatchV2 } from "../../../app/hooks";
import {
  setSnackbarError,
  setSnackbarSuccess,
} from "../../../lib/reducers/snackbarReducer";
import * as MESSAGE_CODE from "../../../errors";
import Title from "../../../components/Title/Title";
import { DocumentInputs, defaultValues } from "./common";
import ContentBlockNoteEditor from "./ContentBlockNoteEditor";
import updateDocumentData from "../../../hooks/useDocuments/updateDocumentData";

export default function DocumentEditor() {
  const dispatch = useAppDispatchV2();
  const { documentId } = useParams();

  const [documentTitle, setDocumentTitle] = useState<string | null | undefined>(
    undefined
  );
  const [documentContent, setDocumentContent] = useState<
    string | null | undefined
  >(undefined);

  const { register, setValue, handleSubmit } = useForm<DocumentInputs>({
    mode: "onChange",
    defaultValues,
  });

  const onSubmit = (data: DocumentInputs) => {
    if (!documentId) return;

    updateDocumentData({
      id: documentId,
      title: data.title,
      content: data.content,
    })
      .then(() => dispatch(setSnackbarSuccess(MESSAGE_CODE.S13003)))
      .catch(() => dispatch(setSnackbarError(MESSAGE_CODE.E13003)));
  };

  useEffect(() => {
    if (!documentId) return;

    fetchDocument(documentId)
      .then((res) => {
        setDocumentTitle(res.title);
        setDocumentContent(res.content);

        setValue("title", res.title);
        setValue("content", res.content);
      })
      .catch(() => {
        dispatch(setSnackbarError(MESSAGE_CODE.E13001));
      });
  }, [documentId]);

  if (!documentId) {
    return null;
  }

  if (!documentTitle || !documentContent) {
    return null;
  }

  return (
    <Stack direction="column" spacing={2}>
      <Box>
        <Breadcrumbs>
          <Link to="/" color="inherit">
            TOP
          </Link>
          <Link to="/docs" color="inherit">
            ドキュメント一覧
          </Link>
          <Link to={`/docs/${documentId}`} color="inherit">
            {documentTitle}
          </Link>
          <Typography color="text.primary">編集</Typography>
        </Breadcrumbs>
      </Box>
      <Title text="ドキュメント編集" />
      <Container maxWidth="md">
        <Stack direction="column" spacing={2}>
          <Box>
            <Button
              variant="contained"
              size="medium"
              onClick={handleSubmit(onSubmit)}
            >
              保存
            </Button>
          </Box>
          <TextField {...register("title")} />
          <Paper elevation={3}>
            <ContentBlockNoteEditor
              content={documentContent}
              setValue={setValue}
            />
          </Paper>
        </Stack>
      </Container>
    </Stack>
  );
}
