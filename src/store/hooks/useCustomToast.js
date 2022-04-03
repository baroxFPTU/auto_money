import { useToast } from "@chakra-ui/react";

function useCustomToast(duration, isClosable) {
  const toast = useToast();
  const defaultConfig = {
    position: 'top',
    variant: 'subtle',
    duration: duration || 3000,
    isClosable: isClosable || true,
  }

  const success = ({title, description}) => {
    return toast({
      ...defaultConfig,
      status: 'success',
      title: title,
      description: description
    });
  }

  const error = ({title, description}) => {
    return toast({
      ...defaultConfig,
      status: 'error',
      title: title,
      description: description
    });
  }

  const info = ({title, description}) => {
    return toast({
      ...defaultConfig,
      status: 'info',
      title: title,
      description: description
    });
  }

  return {
    success,
    error,
    info
  }
}

export default useCustomToast;