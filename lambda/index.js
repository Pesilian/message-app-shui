import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const generateId = () => {
  const timestamp = Date.now(); // aktuellt tidsstämpel
  const randomNum = Math.floor(Math.random() * 1000); // lägg till ett slumpmässigt tal
  return `${timestamp}-${randomNum}`; // kombinera dem för att skapa ett unikt ID
};

// Initiera DynamoDB-klienten
const client = new DynamoDBClient({});
const dynamoDb = DynamoDBDocumentClient.from(client);

export const handler = async event => {
  try {
    // Kontrollera att event.body finns och inte är undefined
    if (!event.body) {
      throw new Error('Request body is missing');
    }

    // Försök att parsa event.body
    const { userName, text } = JSON.parse(event.body);

    // Kontrollera om userName eller text saknas
    if (!userName || !text) {
      throw new Error('userName or text is missing from the request body');
    }

    const id = generateId();

    // Skapa en tidsstämpel för när meddelandet skapades
    const createdAt = new Date().toISOString();

    // DynamoDB parameterobjekt för att spara data
    const params = {
      TableName: 'Messages', // Ersätt 'Messages' med ditt tabellnamn
      Item: {
        id: id,
        userName: userName,
        message: text,
        createdAt: createdAt,
      },
    };

    // Skicka datan till DynamoDB med PutCommand
    await dynamoDb.send(new PutCommand(params));

    // Returnera ett lyckat svar
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Your message has been posted.',
      }),
    };
  } catch (error) {
    // Hantera fel och returnera ett 500-svar med ett felmeddelande
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'An error occurred.',
        error: error.message,
      }),
    };
  }
};
