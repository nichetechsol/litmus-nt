/* eslint-disable @typescript-eslint/no-explicit-any */
async function licenceKeyAPI(licenseName: string, apiKey: string) {
  const url =
    'https://litmus.licensing-portal.staging.litmus.io/licensing-portal/license/key';

  const body = {
    licenseName: licenseName,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: apiKey, // Ensure proper Authorization header format
        'Content-Type': 'application/json', // Explicitly set content type
      },
      body: JSON.stringify(body), // Ensure the body is properly stringified
    });

    if (!response.ok) {
      const errorResponse = await response.json(); // Capture error details from response
      throw new Error(`Error ${response.status}: ${errorResponse.message}`);
    }

    const data = await response.text();
    return data;
  } catch (error: any) {
    return { errorCode: 1, message: error.message }; // Include error message in response
  }
}

export { licenceKeyAPI };
