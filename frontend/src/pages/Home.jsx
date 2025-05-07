import React, { useEffect } from 'react'
import { Container, VStack, Text, Link, SimpleGrid } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { fetchProduct, products } = useProductStore();
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);
  console.log(products);

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text
          fontSize="30"
          fontWeight="bold"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
          textAlign="center"
        >
          Current Products
        </Text>
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3
          }}
          spacing={10}
          width={'full'}
        >
          {products.length > 0 &&
            products
              .filter((product) => product && product._id)
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
        </SimpleGrid>
        {products.length === 0 && (
          <Text
            fontSize="30"
            fontWeight="bold"
            color="gray.300"
            textAlign="center"
          >
            No Products Found!{' '}
            <Link
              as={RouterLink}
              to="/create"
              color="blue.400"
              _hover={{ textDecoration: 'underline' }}
            >
              Create Product
            </Link>
          </Text>
        )}

      </VStack>
    </Container>
  )
}
