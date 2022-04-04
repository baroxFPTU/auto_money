import React, { useCallback, useEffect } from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import {
  Button, Heading, Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react';
import useAuth from 'store/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { signIn } from 'features/Auth/authSlice';
import { closeModal } from 'store/slices/uiSlice';
import useCustomToast from 'store/hooks/useCustomToast';

function SignInModal(props) {
  const dispatch = useDispatch();
  const {success} = useCustomToast();
  const updateUser = useCallback((user) => {
    if (!user) return;
    dispatch(signIn(user));
    dispatch(closeModal());
    success({
      title: `What\'s up, ${user.displayName} `,
      description: "Sign in successful.",
    });
  },[]);
  const {signInWithGoogle, signInWithFacebook} = useAuth(updateUser);

  return (
    <Modal  {...props}>
      <ModalOverlay bg='none'
      backdropFilter='auto'
      backdropInvert='10%'
      backdropBlur='2px'/>
      <ModalContent>
        <ModalCloseButton/>
        <ModalBody display="flex" alignItems="center">
          <VStack w="full" py={10} px={5} spacing={4}>
            <Heading>Sign In</Heading>
            <Text>Save & check your budget anytime</Text>
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