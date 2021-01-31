const handleSignIn = async (email, password) => {
  try {
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

const handleSignUp = async (username, email, password) => {
  try {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        created_at: Date.now(),
        updated_at: Date.now(),
      }),
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

const handleSignOut = async () => {
  try {
    localStorage.removeItem('accessToken');
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export { handleSignIn, handleSignUp, handleSignOut };
