import { Flex } from '@chakra-ui/react';
import BudgetCategory from 'features/Expense/components/BudgetCategory';
import Form from 'features/Expense/components/Form';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import useCustomToast from 'store/hooks/useCustomToast';
import { generateId, normalize, slugify } from 'utils/main';
import { addConfig } from '../slice/expenseSlice';

function Expenses(props) {
  const [isEditing, setIsEditing] = useState();
  const { info } = useCustomToast();
  const dispatch = useDispatch();

  const handleAddOption = useCallback((nameConfig, callback) => {
    if (nameConfig === '') {
      return info({
        title: 'Tips',
        description: 'Don\'t forget to enter name of budget item.'
      });
    };
    const nonAccentName = normalize(nameConfig);
    const id = `${nonAccentName}-${generateId()}`;
    const newConfig = {
      name: nameConfig,
      id: slugify(id),
      percent: 0
    }

    callback();

    const action = addConfig(newConfig);
    dispatch(action);
    setIsEditing(false);
  }, [isEditing]);

  return (
    <>
    <Flex w="full" h="full" py={{base: 0, md: 10}} columnGap={12} direction={{base: "column", md: "row"}}>
      <Form/>
      <BudgetCategory
        isEditing={isEditing}
        onEditing={() => setIsEditing(true)}
        onAddOption={handleAddOption}
      />
    </Flex>
    </>
  );
}

export default Expenses;