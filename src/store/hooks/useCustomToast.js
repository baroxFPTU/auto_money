import { useToast } from '@chakra-ui/react';

function useCustomToast(duration, isClosable) {
  const toast = useToast();
  const defaultConfig = {
    position: 'top',
    variant: 'subtle',
    duration: duration || 2000,
    isClosable: isClosable || true,
  };

  const warning = ({ title, description, id }) => {
    if (!toast.isActive(id))
      return toast({
        ...defaultConfig,
        id: id,
        status: 'warning',
        title: title,
        description: description,
      });
  };

  const success = ({ title, description, id }) => {
    if (!toast.isActive(id))
      return toast({
        ...defaultConfig,
        id: id,
        status: 'success',
        title: title,
        description: description,
      });
  };

  const error = ({ title, description, id }) => {
    if (!toast.isActive(id))
      return toast({
        ...defaultConfig,
        id: id,
        status: 'error',
        title: title,
        description: description,
      });
  };

  const info = ({ title, description, id }) => {
    if (!toast.isActive(id))
      return toast({
        ...defaultConfig,
        id: id,
        status: 'info',
        title: title,
        description: description,
      });
  };

  return {
    success,
    error,
    info,
    warning,
  };
}

export default useCustomToast;
