const createServer = async (body) => {
  const res = await fetch('/api/servers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await res.json();
};

const editServer = async () => {};

const deleteServer = async () => {};

const getServerInfo = async () => {};

const getServerChannels = async (serverID) => {
  const res = await fetch(`/api/servers/${serverID}/channels`);
  return await res.json();
};

const getServerMembers = async (serverID) => {
  const res = await fetch(`/api/servers/${serverID}/members`);
  return await res.json();
};

export {
  createServer,
  editServer,
  deleteServer,
  getServerInfo,
  getServerChannels,
  getServerMembers,
};
