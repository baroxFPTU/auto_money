import React from 'react';
import { HStack, useRadioGroup } from '@chakra-ui/react';
import RadioCard from 'components/form/RadioCard';
import { BsGrid, BsList } from 'react-icons/bs';

function LayoutSwitch({ onChange }) {
  const options = [
    {
      id: 1,
      icon: <BsList />,
      key: 'list',
    },
    {
      id: 2,
      icon: <BsGrid />,
      key: 'grid',
    },
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'layout',
    defaultValue: 'list',
    onChange: console.log,
  });

  const group = getRootProps();

  return (
    <HStack {...group} py={1} px={2} bg='gray.50' borderRadius='lg'>
      {options.map((opt) => {
        const radio = getRadioProps({ value: opt.key });
        return (
          <RadioCard key={opt.key} {...radio}>
            {opt.icon}
          </RadioCard>
        );
      })}
    </HStack>
  );
}

export default LayoutSwitch;
