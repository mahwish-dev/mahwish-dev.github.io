
exports.handler = async (event, context) => {
    if (event.httpMethod === 'GET') {
      try {
        // Process the GET request as needed
        data = require('./data.json');
  
        // Return the data as the response
        return {
          statusCode: 200,
          body: JSON.stringify(data),
        };
      } catch (error) {
        // Return an error response if there was an issue processing the request
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Failed to process GET request' }),
        };
      }
    }
  };

  exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
      try {
        // Parse the incoming JSON payload from the request body
        const requestBody = JSON.parse(event.body);
  
        console.log(requestBody);
        // Save the data to a database or perform other necessary operations
        const { writeFile } = require("fs");
        writeFile('./data.json', JSON.stringify(requestBody), (error) => {
            if (error) {
                console.log("An error has occurred ", error);
                return;
            }
            console.log("Data written successfully to the file");
        });
  
        // Return a success response
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'POST request processed successfully' }),
        };
      } catch (error) {
        // Return an error response if there was an issue processing the request
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Failed to process POST request' }),
        };
      }
    }
  };

  exports.handler = async (event, context) => {
    // ...
    console.log(event.httpMethod);
    // Add CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*', // Replace * with the appropriate domain
      'Access-Control-Allow-Headers': 'Content-Type',
    };
  
    // Return the response with headers
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };
  
    // ...
  };