import { Flex } from "@chakra-ui/react";
import React from "react"


interface authContainerProps {
  children: React.ReactNode;
}

export default function AuthContainer({ children }: authContainerProps) {
  return (
    <Flex
      bgColor="gray.900"
      minW="100vw"
      minH="100vh"
      w="100%"
      h="100%"
      align="center"
      justify="center"
      color="white"
    >
      { children }
    </Flex>
  )
}