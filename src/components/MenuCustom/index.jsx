import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Avatar, Box, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { FaHome, FaSignOutAlt, FaColumns, FaSignInAlt } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';

import useAuth from 'store/hooks/useAuth';
import useCustomToast from 'store/hooks/useCustomToast';
import AvatarUser from 'components/AvatarUser';
import anonymousAvatar from 'icons/anonymous.svg';

function MenuCustom({ isSignedIn, photoURL }) {
  const { success } = useCustomToast();
  const { signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    success({
      id: 'sign-out',
      title: 'See you',
      description: 'Sign out successful. Have a good day.',
    });
  };
  const iconSignInOut = isSignedIn ? <FaSignOutAlt /> : <FaSignInAlt />;

  return (
    <Menu placement='bottom' offset={[-85, 10]} preventOverflow='true'>
      <MenuButton
        as={Box}
        style={{ marginInlineStart: 0, userSelect: 'none' }}
        borderRadius='full'
        borderWidth='3px'
        cursor='pointer'
      >
        <Avatar colorScheme='brandPrimary' bg='transparent' src={photoURL || anonymousAvatar} />
      </MenuButton>
      <MenuList>
        {isSignedIn && (
          <>
            <MenuItem icon={<FiSettings />} as={Link} to='/settings'>
              Settings
            </MenuItem>
            <MenuItem icon={iconSignInOut} onClick={handleLogout}>
              Sign out
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
}

export default MenuCustom;
