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
import CompletedSalesModel from "../completedSalesModel";
  
  function CompletedOrders() {
    const {inventory} = useContext(InventoryContext)
    const [orders,setOrders] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const getTotalPrice = (data)=>{
        let total = 0;
        data.forEach((i) => {
          total += Number(i.sellingRate);
        });
        return total
      }

      const activeOrders = inventory.filter((order)=>order.paid === true)
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
          <Tbody>{orders.map((order,index) => {
          
              return <Tr key={index}>
              <Td>{order.customer.value.customer_profile.id}</Td>
              <Td>{order.customer.label}</Td>
              <Td>₹{getTotalPrice(order.productsDetails)}</Td>
              <Td>24/5/2024</Td>
              <Td><Button onClick={()=>{onOpen()}}>...</Button></Td>
            <CompletedSalesModel defaultValues={order} isOpen={isOpen} readOnly={true} onClose={onClose}/>
            </Tr>
           
          })}</Tbody>
        </Table>
      </TableContainer>
    );
  }
  
  export default CompletedOrders;
  