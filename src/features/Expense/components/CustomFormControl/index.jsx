import { FormControl, FormLabel } from '@chakra-ui/react';

CustomFormControl.propTypes = {};

function CustomFormControl({ label, children, ...props }) {
  return (
    <FormControl {...props}>
      <FormLabel>{label}</FormLabel>
      {children}
    </FormControl>
  );
}

export default CustomFormControl;
