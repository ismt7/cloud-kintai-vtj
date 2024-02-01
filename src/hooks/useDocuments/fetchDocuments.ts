import { API } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { listDocuments } from "../../graphql/queries";
import { ListDocumentsQuery, Document as APIDocument } from "../../API";

export default async function fetchDocuments() {
  const response = (await API.graphql({
    query: listDocuments,
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as GraphQLResult<ListDocumentsQuery>;

  if (response.errors) {
    throw new Error(response.errors[0].message);
  }

  if (!response.data?.listDocuments) {
    throw new Error("Document not found");
  }

  const documents: APIDocument[] = response.data.listDocuments.items.filter(
    (item): item is NonNullable<typeof item> => Boolean(item)
  );
  return documents;
}
