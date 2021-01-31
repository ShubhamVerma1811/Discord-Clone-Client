const createChannel = async (body) => {
  const res = await fetch('/api/channels', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return await res.json();
};

const getChannelInfo = async () => {};

const editChannelInfo = async () => {};

const deleteChannel = async () => {};

const getChannelMessages = async (channelID) => {
  const uri = `/api/channels/${channelID}/messages`;
  const res = await fetch(uri);
  return await res.json();
};

export {
  createChannel,
  getChannelInfo,
  editChannelInfo,
  deleteChannel,
  getChannelMessages,
};
