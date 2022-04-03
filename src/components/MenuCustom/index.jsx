import { Box, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import AvatarUser from 'components/AvatarUser';
import { FaSignOutAlt, FaColumns, FaSignInAlt } from "react-icons/fa";

import React from 'react';
import useAuth from 'store/hooks/useAuth';
import useCustomToast from 'store/hooks/useCustomToast';
import { useDispatch } from 'react-redux';
import { openModal } from 'store/slices/uiSlice';

function MenuCustom({isSignedIn, photoURL}) {
  const dispatch = useDispatch();
  const {success} = useCustomToast()
  const { signOut } = useAuth(() => {
    success({
      title: 'See you',
      description: 'Sign out successful. Have a good day.'
    })
  });

  const handleClick = () => {
    if (!isSignedIn) {
      console.log('here');
      const action = openModal();
      return dispatch(action);
    } 
    signOut();
  }
  const iconSignInOut = isSignedIn ? <FaSignOutAlt/> : <FaSignInAlt/>;

  return (
    <Menu ms={0} flip="false"  direction="rtl">
      <MenuButton
        as={Box}
        ms={0}
        style={{marginInlineStart: 0, userSelect: 'none'}}
        borderRadius="full"
        cursor="pointer"
        _hover={{ bg: 'gray.400' }}
      >
        <AvatarUser
          ms={0}
          photoURL={photoURL || 'https://source.unsplash.com/random'}/>
      </MenuButton>
      <MenuList>
        <MenuItem icon={<FaColumns/>}>
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