exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Simple validation
    if (!data.name || !data.email || !data.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Name, email, and message are required" })
      };
    }

    // Here you would typically send this data to an email service or database
    // For now, we'll just return success
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: "Message received successfully", 
        id: Date.now() // Generate a dummy ID
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to process contact form" })
    };
  }
};
