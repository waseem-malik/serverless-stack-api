import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    //scanning
    ProjectionExpression: "content, attachment",
    FilterExpression: "content = :content",
    ExpressionAttributeValues: {
        ":content": data.content
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settin
  };
const result = await dynamoDb.scan(params);
if ( ! result.Items) {
    throw new Error("Item not found.");
  }

  // Return the retrieved item
  return result.Items;
});