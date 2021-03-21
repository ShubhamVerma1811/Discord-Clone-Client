import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleSignIn, handleSignUp } from 'services/handleAuthentication';
import { setUser } from 'store/userSlice';

const AuthForm = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();

  const signIn = () => {
    const Router = useRouter();
    return (
      <div className="">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await handleSignIn(email, password);
            const { user, accessToken } = res;
            localStorage.setItem('accessToken', res.accessToken);
            dispatch(setUser({ ...user, accessToken }));
            if (res.message.toLowerCase() === 'success') {
              Router.replace('/channels/@me');
            }
          }}>
          <div>
            <label
              className="block mb-2 w-full text-white semibold"
              htmlFor="email">
              Email
            </label>
            <input
              className="pl-3 w-full text-white py-2 bg-gray-700 focus-within:border-blue-500 border-2 border-gray-800"
              id="email"
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              className="block my-2  w-full text-white semibold"
              htmlFor="password">
              Password
            </label>
            <input
              className="pl-3 w-full text-white py-2 bg-gray-700 focus-within:border-blue-500 border-2 border-gray-800"
              id="password"
              type="password"
              value={password}
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="bg-blue-500 my-2">
            <button
              className="w-full py-3 text-white font-semibold text-center"
              type="submit">
              Log In
            </button>
          </div>
        </form>
      </div>
    );
  };

  const signUp = () => {
    return (
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await handleSignUp(username, email, password);
          }}>
          <div className="my-3">
            <label
              htmlFor="email"
              className="block mb-2 w-full text-white semibold">
              Email
            </label>
            <input
              className="pl-3 w-full text-white py-2 bg-gray-700 focus-within:border-blue-500 border-2 border-gray-800"
              id="email"
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="my-3">
            <label
              htmlFor="username"
              className="block mb-2 w-full text-white semibold">
              Username
            </label>
            <input
              className="pl-3 w-full text-white py-2 bg-gray-700 focus-within:border-blue-500 border-2 border-gray-800"
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="my-3">
            <label
              htmlFor="password"
              className="block mb-2 w-full text-white semibold">
              Password
            </label>
            <input
              className="pl-3 w-full text-white py-2 bg-gray-700 focus-within:border-blue-500 border-2 border-gray-800"
              id="password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="bg-blue-500 my-2">
            <button
              type="submit"
              className="w-full py-3 text-white font-semibold text-center">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="bg-gray-600 p-4 md:p-12">
      {type === 'signUp' && signUp()}
      {type === 'signIn' && signIn()}
    </div>
  );
};

export default AuthForm;
