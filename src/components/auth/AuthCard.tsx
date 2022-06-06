import React from "react";
import { Flex, Heading, Spinner, Stack } from "@chakra-ui/react";

interface authCardProps {
  children: React.ReactNode;
  title: string;
  loading?: boolean;
}

export default function AuthCard({ children, title, loading }: authCardProps) {
  return (
    <Flex
      bgColor="white"
      color="gray.900"
      p="90px 60px"
      minW="450px"
      borderRadius="10px"
      flexDir="column"
      align="center"
      justify="center"
    >
      {loading ? (
        <Spinner size="xl" thickness="4px" emptyColor="gray.200" speed="0.65s" color="blue.500" />
      ) : (
        <>
          <Heading
            textTransform="uppercase"
            fontSize="27px"
            mb="20px"
          >
            { title }
          </Heading>
          <Stack spacing={5} w="100%" textAlign="center" align="center">
            { children }
          </Stack>
        </>
      )}

    </Flex>
  )
}