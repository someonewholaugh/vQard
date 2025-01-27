import axios from 'axios';

export const shortenUrl = async (longUrl: string): Promise<string> => {
  try {
    const response = await axios.post('https://spoo.me/', new URLSearchParams({ url: longUrl }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    });

    return response.data.short_url;
  } catch (error: any) {
    console.error('Error shortening URL:', error.response?.data || error.message);
    return longUrl;
  }
};
