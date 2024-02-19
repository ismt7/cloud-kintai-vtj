import { GraphQLResult } from "@aws-amplify/api";
import { API } from "aws-amplify";

import { Document as APIDocument, ListDocumentsQuery } from "../../API";
import { listDocuments } from "../../graphql/queries";

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
