exports.handler = async event => {
  const responseMessage = 'Hello from Lambda!';
  return {
    statusCode: 200,
    body: JSON.stringify({ message: responseMessage }),
  };
};
