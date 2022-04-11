import { Box, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import AvatarUser from 'components/AvatarUser';
import { FaSignOutAlt, FaColumns, FaSignInAlt } from "react-icons/fa";

import React from 'react';
import useAuth from 'store/hooks/useAuth';
import useCustomToast from 'store/hooks/useCustomToast';
import { useDispatch } from 'react-redux';
import { openModal } from 'store/slices/uiSlice';
import anonymousAvatar from 'icons/anonymous.svg';
import { Link } from 'react-router-dom';

function MenuCustom({isSignedIn, photoURL}) {
  const dispatch = useDispatch();
  const {success} = useCustomToast()
  const { signOut } = useAuth();

  const handleClick = () => {
    if (!isSignedIn) {
      const action = openModal();
      return dispatch(action);
    } 
    signOut();
    success({
      title: 'See you',
      description: 'Sign out successful. Have a good day.'
    });
  }
  const iconSignInOut = isSignedIn ? <FaSignOutAlt/> : <FaSignInAlt/>;

  return (
    <Menu ms={0} placement="top" offset={[-85,10]} preventOverflow="false">
      <MenuButton
        as={Box}
        ms={0}
        style={{marginInlineStart: 0, userSelect: 'none'}}
        borderRadius="full"
        border="2px"
        borderStyle="solid"
        borderColor="gray.400"
        cursor="pointer"
      >
        <AvatarUser
          ms={0}
          photoURL={photoURL || anonymousAvatar}/>
      </MenuButton>
      <MenuList>
        <MenuItem icon={<FaColumns/>} as={Link} to="/">
          Home
        </MenuItem>
        <MenuItem icon={<FaColumns/>} as={Link} to="/dashboard">
          Dashboard
        </MenuItem>
        <MenuItem icon={iconSignInOut} onClick={handleClick}>
          {isSignedIn ? 'Sign out' : 'Sign in'}
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default MenuCustom;