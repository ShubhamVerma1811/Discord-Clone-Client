import {
  AccountCircle,
  ExitToApp,
  ExpandMore,
  FilterHdr,
} from '@material-ui/icons';
import Avatar from 'components/Avatar/Avatar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleSignOut } from 'services/handleAuthentication';
import { removeUser } from 'store/userSlice';

export const UserDropDown = () => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const [dropDownOpen, setDropdownOpenTo] = useState(false);
  const user = useSelector((state) => state.user);

  return (
    <div>
      {dropDownOpen && (
        <div className="bg-gray-800 border-2 border-gray-500 rounded-lg p-5 px-4">
          <div>
            <div className="mb-4">
              <Link href="/">
                <div className="flex p-3 rounded-lg hover:bg-gray-600 cursor-pointer">
                  <div className="mr-4">
                    <AccountCircle htmlColor="white" />
                  </div>
                  <div>
                    <p className="dark:text-white font-primary font-bold">
                      My Profile
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="my-4">
              <Link href="/">
                <div className="flex p-3 rounded-lg hover:bg-gray-600 cursor-pointer">
                  <div className="mr-4">
                    <FilterHdr htmlColor="white" />
                  </div>
                  <div>
                    <p className="dark:text-white font-primary font-bold">
                      Tweeter
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <hr className="mb-2" />
            <div
              onClick={() => {
                if (handleSignOut()) {
                  dispatch(removeUser());
                  Router.replace('/');
                }
              }}
              className="flex p-3 rounded-lg hover:bg-gray-600 cursor-pointer">
              <div className="mr-4">
                <ExitToApp htmlColor="white" />
              </div>
              <div>
                <p className="dark:text-white font-primary font-bold">Logout</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className="dark:bg-black py-4"
        onClick={() => {
          if (dropDownOpen) {
            setDropdownOpenTo(false);
          } else {
            setDropdownOpenTo(true);
          }
        }}>
        <div className="flex justify-evenly items-center">
          <div className="w-12 h-12 overflow-hidden">
            <Avatar
              src="https://firebasestorage.googleapis.com/v0/b/tweeter-45929.appspot.com/o/_MG_9752.JPG?alt=media&token=84363dfc-4111-4c5e-b569-0852da768639"
              alt="profile_picture"
            />
          </div>

          <div>
            <p className="dark:text-white font-bold text-lg">{user.username}</p>
          </div>

          <div>
            <span className="relative">
              <ExpandMore htmlColor="white" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
