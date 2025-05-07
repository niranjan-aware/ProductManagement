import {
  Box, Heading, HStack, IconButton, Image, Text, useColorModeValue, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Input,
  useDisclosure,
  Button
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons';
import { AiFillDelete } from 'react-icons/ai';
import React, { useState } from 'react'
import { useProductStore } from '../store/product';

export default function ProductCard({ product }) {
  const[updatedProduct, setUpdatedProduct] = useState(product);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bg = useColorModeValue('white', 'gray.800');
  const { deleteProduct, updateProduct } = useProductStore();

  const handleDelete = async(pid) => {
    console.log(pid);

    const { success, message } = await deleteProduct(pid);
    console.log(success, message);

  }

  const handleUpdate = async(pid,product) => {
    console.log(pid);

    const { success, message } = await updateProduct(pid,product);
    // console.log(success, message);
    onClose();

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{ transform: "translateY(-5px)", shadow: 'xl' }}
      bg={bg}
    >
      <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'} />
      <Box p={4}>
        <Heading
          as={'h3'}
          size={'md'}
          mb={2}
        >{product.name}</Heading>
        <Text
          fontWeight='bold'
          fontSize='xl'
          color={textColor}
          mb={4}
        > {product.price}</Text>
        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} bgColor={'blue'} onClick={onOpen}/>
          <IconButton icon={<AiFillDelete />} bgColor={'red'} onClick={() => handleDelete(product._id)} />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input placeholder='product name' name='name' value={updatedProduct.name} onChange={handleChange}/>
              <Input placeholder='product price' name='price' type='number' value={updatedProduct.price} onChange={handleChange}/>
              <Input placeholder='product image' name='image' value={updatedProduct.image} onChange={handleChange}/>
            </VStack>
          </ModalBody>

          <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={() => handleUpdate(product._id, updatedProduct)}>
              Update
            </Button>
            <Button variant='ghost'>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
