import { Container, Heading, HStack, Switch } from '@chakra-ui/react';
import MenuCustom from 'components/MenuCustom';
import React from 'react';
import { useSelector } from 'react-redux';

function Header(props) {
  const isSignedIn = useSelector(state => state.auth.isSignedIn)
  const photoURL = useSelector(state => state.auth.user?.photoURL);

  return (
    <Container w="full" maxW="container.xl">
      <HStack w="full" justify="space-between" pt={{base: 10, md: 20}} pb={10}>
          <Heading size="xl">
            Auto Money
          </Heading>
          <HStack columnGap={4}>
            <Switch size='lg'/>
            <MenuCustom marginLeft={10} isSignedIn={isSignedIn} photoURL={photoURL}/>
          </HStack>
      </HStack>
    </Container>
  );
}

export default Header;