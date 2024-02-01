export type DocumentInputs = {
  title: string | null | undefined;
  content: string | null | undefined;
};

export const defaultValues: DocumentInputs = {
  title: undefined,
  content: undefined,
};
