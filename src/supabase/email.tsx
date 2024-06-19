/* eslint-disable @typescript-eslint/no-explicit-any */
async function sendEmailFunction(
  to: string,
  subject: string,
  heading: any,
  content: any,
  token: any,
) {
  const url =
    'https://emsjiuztcinhapaurcrl.supabase.co/functions/v1/send-email';

  const body = {
    to: to,
    subject: subject,
    heading: heading,
    content: content,
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
