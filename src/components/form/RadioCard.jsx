const { useRadio, Box } = require('@chakra-ui/react');

export default function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderRadius='lg'
        _checked={{
          bg: 'brandPrimary.600',
          color: 'white',
          borderColor: 'brandPrimary.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={3}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}
