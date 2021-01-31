const createMessage = async (body) => {
  const res = await fetch('/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await res.json();
};

const getMessageInfo = async () => {};

const editMessageInfo = async () => {};

const deleteMessage = async () => {};

export { createMessage, getMessageInfo, editMessageInfo, deleteMessage };
