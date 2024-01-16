/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const FROM_ADDRESS = "Cloud Kintai dev <noreply@kintai.virtualtech.jp>";

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export async function handler(event) {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const to = event.arguments.data.to;
  const subject = event.arguments.data.subject;
  const body = event.arguments.data.body;

  const sesClient = new SESClient({
    region: "ap-northeast-1",
  });

  if (!to) {
    return {
      statusCode: 400,
      body: "to is required",
    };
  }

  if (!subject) {
    return {
      statusCode: 400,
      body: "subject is required",
    };
  }

  if (!body) {
    return {
      statusCode: 400,
      body: "body is required",
    };
  }

  const sendEmailCommandInput = {
    Source: FROM_ADDRESS,
    Destination: {
      ToAddresses: to,
    },
    Message: {
      Subject: { Data: subject },
      Body: {
        Text: {
          Data: body,
        },
      },
    },
  };

  const sendEmailCommand = new SendEmailCommand(sendEmailCommandInput);
  const sendEmailCommandOutput = await sesClient.send(sendEmailCommand);

  return {
    statusCode: 200,
    body: sendEmailCommandOutput.MessageId,
  };
}
