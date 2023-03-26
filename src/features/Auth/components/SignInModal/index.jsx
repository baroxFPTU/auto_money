import {
  Button,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { signIn } from 'features/Auth/authSlice';
import React, { useCallback, memo } from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import useAuth from 'store/hooks/useAuth';
import useCustomToast from 'store/hooks/useCustomToast';
import { closeModal } from 'store/slices/uiSlice';

function SignInModal(props) {
  const dispatch = useDispatch();
  const { success } = useCustomToast();
  const updateUser = (user) => {
    if (!user) return;
    dispatch(signIn(user));
    dispatch(closeModal());
    success({
      id: 'login-success',
      title: `What\'s up, ${user.displayName} `,
      description: 'Sign in successful.',
    });
  };
  const { signInWithGoogle, signInWithFacebook } = useAuth(updateUser);

  return (
    <Modal {...props}>
      <ModalOverlay bg='none' backdropFilter='auto' backdropInvert='10%' backdropBlur='2px' />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody display='flex' alignItems='center'>
          <VStack w='full' py={10} px={5} spacing={4}>
            <Heading>Sign In</Heading>
            <Text>Save & check your budget anytime</Text>
            <Button size='lg' w='full' onClick={signInWithGoogle}>
              <Icon position='absolute' left={6} as={FaGoogle} />
              Google
            </Button>
            <Button size='lg' w='full' onClick={signInWithFacebook}>
              <Icon position='absolute' left={6} as={FaFacebook} />
              Facebook
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default memo(SignInModal);
