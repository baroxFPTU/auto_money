import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';

CustomFormSelection.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array
};

CustomFormSelection.defaultProps = {
  name: 'selection',
  label: 'Selection',
  defaultValue: null,
  onChange: null,
  options: []
}

function CustomFormSelection({name, label, defaultValue, onChange, options}) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Select size="lg" name={name} onChange={onChange} defaultValue={defaultValue}>
       {options.map((option, index)=> (<option key={index} value={option.value}>{option.label}</option>))}
      </Select>
    </FormControl>
  );
}

export default CustomFormSelection;