import {
    Box,
    Container,
    Heading,
    VStack,
    useColorModeValue,
    Input,
    Button,
    useToast
  } from '@chakra-ui/react';
  import React, { useState } from 'react';
import { useProductStore } from '../store/product';
  
  export default function CreatePages() {
    const [newProduct, setNewProduct] = useState({
      name: '',
      price: '',
      image: '',
    });
    const {createProduct} = useProductStore();
    const toast = useToast();
    const handleSubmitProduct = async()=>{
        const {success, message} = await createProduct(newProduct);
        console.log(success, message);
        if(!success){
            toast({
                title: 'Error',
                description: "Unable to create product!",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
        else{
            toast({
                title: 'Success',
                description: "Product created successfully!",
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            setNewProduct({
                name: '',
                price: '',
                image: ''
            });
        }
        
    }
  
    return (
      <Container maxW="container.sm">
        <VStack spacing={8}>
          <Heading as="h1" size="2xl" textAlign="center" mb={8}>
            Create new product
          </Heading>
          <Box
            bg={useColorModeValue('white', 'gray.800')}
            w="full"
            p={6}
            rounded="lg"
            shadow="md"
          >
            <VStack spacing={4}>
              <Input
                placeholder="Product name"
                name="name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Product price"
                name="price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
              <Input
                placeholder="Product image"
                name="image"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
              />
              <Button colorScheme='blue' w={'full'} onClick={handleSubmitProduct}>Add Product</Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    );
  }
  