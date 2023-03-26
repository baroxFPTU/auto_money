import { Box, Button, Icon, VStack } from '@chakra-ui/react';
import { useCallback, useEffect, useRef } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import ExpenseItem from '../ExpenseItem';

function BudgetCategory({ isEditing, onEditing, onAddOption, categories }) {
  const currency = useSelector((state) => state.expense.currency);
  const inputRef = useRef();

  const handleClickAddButton = useCallback(() => {
    onEditing(true);
  }, []);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [isEditing]);

  const handleSubmitAdd = useCallback(() => {
    const nameConfig = inputRef.current.value;
    onAddOption(nameConfig, () => {
      inputRef.current.value = '';
    });
  }, []);

  const addButton = (
    <Button
      size='lg'
      w='full'
      variant='ghost'
      color='gray.500'
      onClick={handleClickAddButton}
      leftIcon={<Icon as={AiOutlinePlus} />}
    >
      Add more
    </Button>
  );
  const submitButton = (
    <Box w='full' pos={{ base: 'fixed', md: 'relative' }} bottom='0' p={{ base: 5, md: 0 }}>
      <Button size='lg' w='full' onClick={handleSubmitAdd}>
        Submit
      </Button>
    </Box>
  );

  return (
    <VStack w='full'>
      <VStack w='full'>
        {categories?.map((item) => (
          <ExpenseItem
            key={item.id}
            name={item.name}
            id={item.id}
            percent={item.percent}
            currency={currency}
          />
        ))}
      </VStack>
      {addButton}
      {/* {isEditing && <AddBudgetItemForm ref={inputRef} onSubmit={handleSubmitAdd}/>} */}
      {/* {isEditing || addButton} */}
    </VStack>
  );
}

export default BudgetCategory;
