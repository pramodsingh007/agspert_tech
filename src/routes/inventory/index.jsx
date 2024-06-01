import { Tab, TabList, TabPanels, TabPanel, Tabs, Flex, Box, useColorModeValue, Button, useDisclosure } from "@chakra-ui/react"
import AddSalesModal from "../../components/salesModal"
import ActiveOrders from "../../components/activeOrders"
import CompletedOrders from "../../components/completedOrders"

function Inventory() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    
  return (
    <Flex minHeight="80vh" bgGradient={useColorModeValue('white', 'gray.700')}>
      <Box
        bg={useColorModeValue('white', 'gray.700')}
        p={8}
        maxW=""
        w="full"
      >
        <Tabs isFitted variant="enclosed" mt={4}>
          <TabList mb="1em">
            <Tab>Active Sales Orders</Tab>
            <Tab>Completed Sales Orders</Tab>
            <AddSalesModal isOpen={isOpen} onClose={onClose}/>
            <Button onClick={onOpen}>+ Sales Order</Button>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ActiveOrders/>
            </TabPanel>
            <TabPanel>
              <CompletedOrders/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  )
}

export default Inventory