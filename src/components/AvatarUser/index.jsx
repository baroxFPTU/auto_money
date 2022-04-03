import React, { forwardRef } from 'react';
import { AspectRatio, Image } from '@chakra-ui/react';


function AvatarUser(props) {
  return (
    <>
      <AspectRatio ratio="1" w={50}>
        <Image src={props.photoURL} borderRadius="full"/>
      </AspectRatio>
    </>
  );
}


export default AvatarUser;