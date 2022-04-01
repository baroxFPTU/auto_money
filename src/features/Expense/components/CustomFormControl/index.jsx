import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel } from '@chakra-ui/react';

CustomFormControl.propTypes = {
  
};

function CustomFormControl({label, children}) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      {children}
    </FormControl>
  );
}

export default CustomFormControl;