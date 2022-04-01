import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React from 'react';

function SignInModal(props) {
  return (
    <Modal {...props}>
      <ModalOverlay bg='none'
      backdropFilter='auto'
      backdropInvert='10%'
      backdropBlur='2px'/>
      <ModalContent>
        <ModalHeader>Sign In</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <button>Sign In with Google</button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SignInModal;