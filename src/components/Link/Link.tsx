import { Text } from '@chakra-ui/react';
import {default as NextLink, LinkProps } from 'next/link'

interface linkProps extends LinkProps {
  children: React.ReactNode;
  color?: string;
}

export function Link({ children, color, ...rest }: linkProps) {
  return (
    <Text as="span" color={color ?? "blue.500"}>
      <NextLink {...rest}>
        { children }
      </NextLink>
    </Text>
  );
}