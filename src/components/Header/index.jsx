import { Container, Heading, HStack, Switch, useColorMode } from '@chakra-ui/react';
import MenuCustom from 'components/MenuCustom';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function Header(props) {
  const isSignedIn = useSelector(state => state.auth.isSignedIn)
  const photoURL = useSelector(state => state.auth.user?.photoURL);
  const { colorMode, toggleColorMode } = useColorMode();
  const handleChangeColorMode = () => {
    toggleColorMode();
  }

  return (
    <Container w="full" maxW="container.xl">
      <HStack w="full" justify="space-between" pt={{base: 5, md: 20}} pb={{base: 2, md: 10}}>
        <Link to="/">
          <Heading size="xl">
            Auto Money
          </Heading>
        </Link>
          <HStack columnGap={4}>
            <Switch
              colorScheme="brandPrimary"
              size="md" onChange={handleChangeColorMode}
            />
            <MenuCustom marginLeft={10} isSignedIn={isSignedIn} photoURL={photoURL}/>
          </HStack>
      </HStack>
    </Container>
  );
}

export default Header;