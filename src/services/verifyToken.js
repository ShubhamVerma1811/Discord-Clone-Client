export default async function verifyToken(accessToken) {
  try {
    const res = await fetch('/api/auth/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
