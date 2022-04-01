import React, { useCallback, useEffect } from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import {
  Button, Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
  VStack
} from '@chakra-ui/react';
import useAuth from 'store/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { signIn } from 'features/Auth/authSlice';
import { closeModal } from 'store/slices/uiSlice';

function SignInModal(props) {
  const dispatch = useDispatch();
  const toast = useToast();
  const updateUser = useCallback((user) => {
    if (!user) return;
    dispatch(signIn(user));
    dispatch(closeModal());
    toast({
      position: 'top',
      title: `What\'s up, ${user.displayName} `,
      description: "Sign in successful.",
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  },[]);
  const {user, signInWithGoogle, signInWithFacebook} = useAuth(updateUser);



  return (
    <Modal  {...props}>
      <ModalOverlay bg='none'
      backdropFilter='auto'
      backdropInvert='10%'
      backdropBlur='2px'/>
      <ModalContent>
        <ModalHeader>Sign In</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <VStack w="full" pt={5} pb={10} px={5} spacing={4}>
            <Button size="lg" w="full" onClick={signInWithGoogle}>
                <Icon position='absolute' left={6} as={FaGoogle}/>Google
            </Button>
            <Button size="lg" w="full" onClick={signInWithFacebook}>
              <Icon  position='absolute' left={6} as={FaFacebook}/>Facebook
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SignInModal;