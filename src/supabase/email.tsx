async function sendEmailFunction(
  to: string,
  subject: string,
  type: string,
  token: string,
) {
  const url = 'https://emsjiuztcinhapaurcrl.supabase.co/functions/v1/email';

  const body = {
    to: to,
    subject: subject,
    type: type,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { errorCode: 1, message: error }; // Return a general error code
  }
}

export { sendEmailFunction };
