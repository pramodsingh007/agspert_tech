import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { InventoryContext } from "../../context/inventoryContext";
import ActiveSalesModel from "../activeSalesModal";

function ActiveOrders() {
  const {inventory} = useContext(InventoryContext)
  const [orders,setOrders] = useState([])
  // useQuery({queryKey:['salesOrder'],queryFn:getSalesOrder})
  const { isOpen, onOpen, onClose } = useDisclosure()

  const getTotalPrice = (data)=>{
    let total = 0;
    data.forEach((i) => {
      total += Number(i.sellingRate);
    });
    return total
  }
  
  const activeOrders = inventory.filter((order)=>order.paid === false)
  useEffect(()=>{
    setOrders(activeOrders)
  },[inventory,activeOrders])
  return (
    <TableContainer minW={"full"}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Customer Name</Th>
            <Th>Price (₹)</Th>
            <Th>Last Modified</Th>
            <Th>Edit/View</Th>
          </Tr>
        </Thead>
        <Tbody>{orders?.map((order,index) => {
         
            return <Tr key={index}>
            <Td>{order.customer.value.customer}</Td>
            <Td>{order.customer.label}</Td>
            <Td>₹{getTotalPrice(order.productsDetails)}</Td>
            <Td>24/5/2024</Td>
            <Td><Button onClick={()=>{onOpen()}}>...</Button></Td>
            <ActiveSalesModel defaultValues={order} isOpen={isOpen} onClose={onClose}/>
          </Tr>
          
        })}</Tbody>
      </Table>
    </TableContainer>
  );
}

export default ActiveOrders;













