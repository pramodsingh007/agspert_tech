import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/react"
import React from "react"
import SalesOrderForm from "../salesOrderForm"


function AddSalesModal({isOpen,onClose}){
    
    const finalRef = React.useRef(null)
    const defaultValues = {
      selectedProducts: [],
      paid: false,
      invoice: '',
      date: '',
      customer: {},
      productsDetails: [],
    }
    return (
      <>
        <Modal  finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody minW={'full'}>
            <SalesOrderForm onClose={onClose} defaultValues={defaultValues} action={'create'} readOnly={false}/>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default AddSalesModal