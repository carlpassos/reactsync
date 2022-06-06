import { Button, ButtonProps } from "@chakra-ui/react";

interface buttonProps extends ButtonProps {
  children: React.ReactNode;
}

export default function AuthButton({ children, ...rest }: buttonProps) {
  return (
    <Button
      w="100%"
      colorScheme="blue"
      {...rest}
    >
      { children }
    </Button>
  )
}