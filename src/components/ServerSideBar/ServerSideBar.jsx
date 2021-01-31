import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Item, Menu } from 'react-contexify';
import { useQuery, useQueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useSelector } from 'react-redux';
import { Modal } from 'react-responsive-modal';
import { createServer } from 'services/handleServersData';
import { removeDashes } from 'services/uuidFormat';

export const ServerSideBar = () => {
  const user = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const { serverID } = useRouter().query;
  const [serverModal, setServerModal] = useState(false);
  const [server_uid, setServerUID] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const accessToken = localStorage.getItem('accessToken');

  const { data, error, isLoading, isError } = useQuery(
    'userServers',
    async () => {
      const res = await fetch('/api/user/servers', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      return await res.json();
    }
  );

  const handleCreateServer = async (e) => {
    e.preventDefault();
    const response = await createServer({
      name,
      description,
      userID: user.user_uid,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    queryClient.invalidateQueries('userServers');
  };

  return (
    <div className="bg-gray-800 w-20 h-screen overflow-hidden overflow-y-scroll">
      <ReactQueryDevtools initialIsOpen={false} />
      <div>
        <nav className="px-2">
          <Link href="/channels/@me">
            <div
              className={`logo rounded-full ${
                serverID === '@me'
                  ? ' bg-blue-500 logo-selected '
                  : 'bg-gray-600'
              } h-16 w-16 flex items-center justify-center cursor-pointer hover:bg-blue-500`}>
              Logo
            </div>
          </Link>

          <div className="my-4">
            <hr />
          </div>
          {isLoading ? (
            <h1>fetch...</h1>
          ) : (
            <div>
              {data.servers.map((server) => (
                <Link
                  href={`/channels/${removeDashes(server.server_uid)}`}
                  key={server.server_uid}>
                  <div
                    className={`logo rounded-full my-2 ${
                      serverID == server.server_uid
                        ? 'bg-blue-500 logo-selected'
                        : 'bg-gray-700 text-white'
                    } h-16 w-16 flex font-bold items-center justify-center cursor-pointer hover:bg-blue-500`}>
                    <p className="font-primary">
                      {server.name.match(/\b(\w)/g).join('')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className="my-4">
            <hr />
          </div>
          <div
            className="logo rounded-full flex items-center justify-center bg-gray-600 h-16 w-16  cursor-pointer hover:bg-red-200"
            onClick={() => setServerModal(true)}>
            <h1 className="p-0 m-0 text-5xl">+</h1>
          </div>
          <Menu>
            <Item>ine</Item>
          </Menu>
        </nav>
      </div>
      <div>
        <Modal open={serverModal} onClose={() => setServerModal(false)} center>
          <div className="bg-red-500">
            <form onSubmit={handleCreateServer}>
              <input
                type="text"
                placeholder="name"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="description"
                required
                onChange={(e) => setDescription(e.target.value)}
              />
              <button type="submit">Create</button>
            </form>
            <div>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const res = await fetch('/api/user/servers/sid', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      userID: user.user_uid,
                      serverID: server_uid,
                    }),
                  });
                  queryClient.invalidateQueries('userServers');
                }}>
                <input
                  type="text"
                  name="server_id"
                  value={server_uid}
                  placeholder="Join server"
                  id="server_id"
                  onChange={(e) => setServerUID(e.target.value)}
                />
                <button type="submit">Join Server</button>
              </form>
            </div>
          </div>
        </Modal>
      </div>
      <style jsx>
        {`
          .logo:hover {
            border-radius: 35%;
            color: black;
          }
          .logo-selected {
            border-radius: 35%;
          }
        `}
      </style>
    </div>
  );
};
