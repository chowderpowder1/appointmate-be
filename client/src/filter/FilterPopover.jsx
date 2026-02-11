import React from 'react'
import { Button, Icon, Popover, PopoverArrow, PopoverContent, PopoverTrigger,PopoverBody, Text, VStack, Flex} from "@chakra-ui/react";

const StatusItem = ({status, setColumnFilters}) => (
    <Flex 
    
     align='center'
     cursor='pointer'
    fontWeigth="bold"
    p={1.5}
    _hover={{
        bg:"gray.800"
    }}
    onClick={
        ()=>{
            setColumnFilters([
                {
                    id:'status',
                    value:[1]
                }
            ])
        }
    }
    >
        
    </Flex>
)
const FilterPopover = ({ columnFilters, setColumnFilters }) => {
  return (
<Popover.Root
  lazyMount
  positioning={{
    placement: "bottom-end",
    offset: { mainAxis: 8 },
  }}
>
  <Popover.Trigger asChild>
    <Button
      bg="#1565C0"
      borderRadius="5px"
      color="white"
    >
      Filter
    </Button>
  </Popover.Trigger>

  <Popover.Content zIndex={1500}>
    <Popover.Arrow />
    <Popover.Body>
      <Text fontSize="md" fontWeight="bold" mb={4}>
        Filter By:
      </Text>

      <Text fontWeight="bold">Status</Text>

      <VStack align="flex-start" spacing={1} />
    </Popover.Body>
  </Popover.Content>
</Popover.Root>
  );
};

export default FilterPopover;
