import  { useContext, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  VStack,
  Button,
  HStack,
  Badge,
  Flex,
  Card,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { InventoryContext } from "../../context/inventoryContext";
import { useQuery } from "@tanstack/react-query";
import { getCustomerSchema, getProductSchema } from "../../api/orders";



const FormComponent = ({onClose,defaultValues,action,readOnly}) => {
  const products = useQuery({queryKey:['products'],queryFn:getProductSchema}).data
  const customer = useQuery({queryKey:['customer'],queryFn:getCustomerSchema}).data
  // if(!products && !customer)return
  // console.log(data)
  const {setItem,updateItem} = useContext(InventoryContext);
  const { handleSubmit, register, control, watch,reset, formState: { errors,isValid } } = useForm({
    defaultValues: defaultValues
  });

  const selectedProducts = watch("selectedProducts");
  const productsDetails = watch("productsDetails");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "productsDetails",
  });

  useEffect(() => {
    const selectedProductIds = selectedProducts.map((p) => p.value);
    const existingProductIds = fields.map((field) => field.productId);

    selectedProductIds.forEach((productId) => {
      if (!existingProductIds.includes(productId)) {
        const product = products?.find((p) => p.id === productId);
        product.sku.forEach((sku) => {
          append({
            productId: productId,
            skuId: sku.id,
            sellingRate: sku.selling_price,
            totalItems: 1,
          });
        });
      }
    });

    existingProductIds.forEach((productId, index) => {
      if (!selectedProductIds.includes(productId)) {
        remove(index);
      }
    });
  }, [selectedProducts, fields, append, remove]);

  const onSubmit = (formData) => {
    console.log(formData);
    if(action==='create'){
      setItem(formData);
    }
    if(action === 'update'){
      updateItem(formData)
    }
    onClose()
  };

  let total = 0;
  productsDetails.forEach((i) => {
    total += Number(i.sellingRate);
  });

  return (
    <Box minW="full" mx="auto" mt={5} borderRadius="lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <HStack spacing={8} align="stretch">
            <FormControl isRequired isInvalid={errors.invoice}>
              <FormLabel>Invoice Number</FormLabel>
              <Input
                readOnly={action==='update'||readOnly}
                {...register('invoice', { required: 'Invoice number is required' })}
                placeholder="Enter Invoice Number"
              />
              <FormErrorMessage>{errors.invoice && errors.invoice.message}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={errors.date}>
              <FormLabel>Select Date</FormLabel>
              <Input
              readOnly={readOnly}
                {...register('date', { required: 'Date is required' })}
                type="date"
              />
              <FormErrorMessage>{errors.date && errors.date.message}</FormErrorMessage>
            </FormControl>
          </HStack>
          <FormControl isRequired isInvalid={errors.customer}>
            <FormLabel>Select Customer</FormLabel>
            <Controller
              control={control}
              name="customer"
              rules={{ required: 'Customer is required' }}
              render={({ field }) => (
                <Select
                
                  isReadOnly={readOnly}
                  {...field}
                  placeholder="Select a customer"
                  options={customer?.map((c) => ({
                    value: c,
                    label: c.customer_profile.name,
                  }))}
                />
              )}
            />
            <FormErrorMessage>{errors.customer && errors.customer.message}</FormErrorMessage>
          </FormControl>
          <FormControl isReadOnly={readOnly}  isRequired isInvalid={errors.selectedProducts}>
            <FormLabel>Select Products</FormLabel>
            <Controller
              name="selectedProducts"
              
              control={control}
              rules={{ required: 'At least one product must be selected' }}
              render={({ field }) => (
                <Select
                
                  isReadOnly={readOnly}
                  {...field}
                  options={products?.map((product) => ({
                    label: product.name,
                    value: product.id,
                  }))}
                  isMulti
                  closeMenuOnSelect={false}
                  placeholder="Select products"
                />
              )}
            />
            <FormErrorMessage>{errors.selectedProducts && errors.selectedProducts.message}</FormErrorMessage>
          </FormControl>

          <Accordion allowToggle shadow="sm" rounded="md">
            {selectedProducts &&
              selectedProducts.map((selected) => {
                const product = products.find((p) => p.id === selected.value);
                return (
                  product && (
                    <AccordionItem key={product.id}>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          {product.name}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        {product.sku.map((sku) => {
                          const fieldIndex = fields.findIndex(
                            (field) =>
                              field.productId === product.id &&
                              field.skuId === sku.id
                          );
                          return (
                            <Card p={3} key={sku.id} mb={4} position="relative">
                              <HStack>
                                <FormControl>
                                  <FormLabel>
                                    SKU {sku.id} ({sku.amount}Kg)
                                  </FormLabel>
                                </FormControl>
                                <FormControl>
                                  <Badge color="gray" rounded="sm" p={1}>
                                    Rate: ₹{sku.selling_price}
                                  </Badge>
                                </FormControl>
                              </HStack>
                              <HStack justify="space-between">
                                <FormControl isRequired isInvalid={errors?.productsDetails?.[fieldIndex]?.sellingRate}>
                                  <FormLabel>Selling Rate</FormLabel>
                                  <Input
                                  readOnly={readOnly}
                                    placeholder="Enter Selling Rate"
                                    {...register(
                                      `productsDetails.${fieldIndex}.sellingRate`,
                                      { required: 'Selling rate is required' }
                                    )}
                                  />
                                  <FormErrorMessage>{errors?.productsDetails?.[fieldIndex]?.sellingRate && errors.productsDetails[fieldIndex].sellingRate.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isRequired isInvalid={errors?.productsDetails?.[fieldIndex]?.totalItems}>
                                  <FormLabel>Total Items</FormLabel>
                                  <Input
                                    readOnly={readOnly}
                                    placeholder="Enter Total Items"
                                    {...register(
                                      `productsDetails.${fieldIndex}.totalItems`,
                                      { required: 'Total items are required' }
                                    )}
                                  />
                                  <FormErrorMessage>{errors?.productsDetails?.[fieldIndex]?.totalItems && errors.productsDetails[fieldIndex].totalItems.message}</FormErrorMessage>
                                </FormControl>
                              </HStack>
                              <Flex
                                justifyContent="flex-end"
                                display="flex"
                                position="absolute"
                                zIndex={10}
                                bottom={1}
                                right={5}
                              >
                                <Badge color="green" rounded={4}>
                                  No Items Remaining
                                </Badge>
                              </Flex>
                            </Card>
                          );
                        })}
                      </AccordionPanel>
                    </AccordionItem>
                  )
                );
              })}
          </Accordion>
          <HStack justifyContent="space-between" w="full">
            <Button colorScheme="red" onClick={()=>{reset()}}>Discard</Button>
            <Button isDisabled={!isValid} colorScheme="blue" type="submit">
              {action==="create"?"Create Sale Order":"Update Sale Order"}
            </Button>
          </HStack>
          <HStack justifyContent="space-between" w="full">
            <FormControl display="flex" alignItems="center">
              <FormLabel>Is Paid</FormLabel>
              <Controller
                name="paid"
                control={control}
                render={({ field }) => (
                  <Checkbox readOnly={readOnly} {...field} isChecked={field.value}></Checkbox>
                )}
              />
            </FormControl>
            <Flex gap={5}>
              <Badge rounded={2} colorScheme="green">
                Total Price: ₹{total}
              </Badge>
              <Badge rounded={2} colorScheme="green">
                Total Items: {selectedProducts.length}
              </Badge>
            </Flex>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export default FormComponent;
