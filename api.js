
exports.handler = async (event, context, callback) => {
    if (event.httpMethod == 'GET') {
      try {
        // Process the GET request as needed
        try{
        data = require('./data.json');
        }
        catch(e){
            return {
                statusCode: 500,
                headers,
                body: {message: e.toString()},
              };
        }


        // CORS
        const headers = {
            'Access-Control-Allow-Origin': '*', // Replace * with the appropriate domain
            'Access-Control-Allow-Headers': 'Content-Type',
          };

        // Return the data as the response
        callback(null,  {
          statusCode: 200,
          headers,
          body: JSON.stringify(data),
        });
      } catch (error) {
        // Return an error response if there was an issue processing the request
        callback(null,  {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Failed to process GET request' }),
        });
      }
    }
  };

  exports.handler = async (event, context, callback) => {
    if (event.httpMethod == 'POST') {
      try {
        // Parse the incoming JSON payload from the request body
        const requestBody = JSON.parse(event.body);
        
        // Add CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*', // Replace * with the appropriate domain
        'Access-Control-Allow-Headers': 'Content-Type',
      };


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
        callback(null,  {
          statusCode: 200,
          headers,
          body: JSON.stringify({ message: 'POST request processed successfully' }),
        });
      } catch (error) {
        // Return an error response if there was an issue processing the request
        callback(null,  {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Failed to process POST request' }),
        });
      }
    }
  };

//   exports.handler = async (event, context) => {
//     // ...
//     // console.log();
//     // Add CORS headers
//     const headers = {
//       'Access-Control-Allow-Origin': '*', // Replace * with the appropriate domain
//       'Access-Control-Allow-Headers': 'Content-Type',
//     };
  
//     // Return the response with headers
//     return {
//       statusCode: 200,
//       headers,
//       body: JSON.stringify(event.httpMethod),
//     };
  
//     // ...
//   };