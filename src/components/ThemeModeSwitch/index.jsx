import React from 'react';
import { IconButton, useColorMode } from '@chakra-ui/react';
import { BsSun, BsMoon } from 'react-icons/bs';

function ThemeModeSwitch(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const Icon = colorMode === 'dark' ? BsSun : BsMoon;

  return <IconButton aria-label='Theme mode switch' icon={<Icon />} onClick={toggleColorMode} />;
}

export default ThemeModeSwitch;
