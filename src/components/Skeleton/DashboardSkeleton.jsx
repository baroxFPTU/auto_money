import { Skeleton, Stack, Td, Tr } from '@chakra-ui/react';
import React from 'react';

function DashboardSkeleton(props) {
  const repeats = [1,2,3,4]
  return (
    <>
    {repeats.map(repeat => (
      <Tr w="full">
      <Td>
        <Skeleton height="50px" mb="5px"/>
      </Td>
      <Td>
        <Skeleton height="50px" mb="5px"/>
      </Td>
      <Td>
        <Skeleton height="50px" mb="5px"/>
      </Td>
      <Td>
        <Skeleton height="50px" mb="5px"/>
      </Td>
    </Tr>    
    ))}
    </>
  );
}

export default DashboardSkeleton;