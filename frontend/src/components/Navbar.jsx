import { Container, Flex, HStack, Text, Button, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegPlusSquare } from "react-icons/fa";

export default function Navbar() {
  const {colorMode,toggleColorMode} = useColorMode();

  return (
    <Container width={"100vw"} px={4}   >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
        gap={2}
      >
        <Text
          fontSize={{
            base: "22",
            sm: "28",
          }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          <Link to="/">Product Store</Link>
        </Text>

        <HStack spacing={2} alignItems="center">
          <Link to="/create">
            <Button leftIcon={<FaRegPlusSquare />}>
              Add Product
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? "🌙" : "🌞"}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}
