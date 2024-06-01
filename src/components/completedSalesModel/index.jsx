import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/react"
import React from "react"
import SalesOrderForm from "../salesOrderForm"


function CompletedSalesModel({isOpen,onClose,defaultValues,readOnly}){
    
    const finalRef = React.useRef(null)
    return (
      <>
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
            <SalesOrderForm  onClose={onClose} defaultValues={defaultValues} action={'update'} readOnly={readOnly}/>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default CompletedSalesModel