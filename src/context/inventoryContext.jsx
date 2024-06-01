import { createContext, useState } from "react";

export const InventoryContext = createContext([]);

export const InventoryProvider = ({ children }) => {
  const [inventory, addItemsToInventory] = useState([]);

  const setItem = (data) => {
    const index = inventory.findIndex((item)=>item.invoice===data.invoice)
    if(index ==-1){
        addItemsToInventory([data, ...inventory]);
    }
  };

  const updateItem = (data) => {
   const index = inventory.findIndex((item)=>item.invoice===data.invoice)
   inventory[index] = data
   addItemsToInventory(inventory)

  };

  return (
    <InventoryContext.Provider value={{ inventory, setItem,updateItem }}>
      {children}
    </InventoryContext.Provider>
  );
};
