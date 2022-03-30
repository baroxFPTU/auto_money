import { AspectRatio, Container, Heading, HStack, Image } from '@chakra-ui/react';
import React from 'react';

function Header(props) {
  return (
    <Container w="full" maxW="container.xl">
      <HStack w="full" justify="space-between" pt={{base: 10, md: 20}} pb={10}>
          <Heading size="xl">
            Auto Money
          </Heading>
          <AspectRatio ratio="1" w={50}>
            <Image src={'https://source.unsplash.com/random'} borderRadius="full"/>
          </AspectRatio>
      </HStack>
    </Container>
  );
}

export default Header;