import {
  As,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightAddon,
}
from "@chakra-ui/react";
import { useState } from "react";

interface authInputProps extends InputProps {
  icon:  As<any> | undefined;
  rightAddon?: any;
}

export default function AuthInput({ icon, rightAddon ,...rest }: authInputProps) {

  const [inputFocus, setInputFocus] = useState<boolean>(false);

  return (
    <InputGroup w="100%">
      <InputLeftElement
        pointerEvents='none'
      >
        <Icon as={icon} color={inputFocus ? 'gray.900' : 'gray.500'} />
      </InputLeftElement>
      <Input
        w="100%"
        {...rest}
        onFocus={() => {setInputFocus(true)}}
        onBlur={() => setInputFocus(false)}
      />
      {!!rightAddon &&
        <InputRightAddon>
          { rightAddon }
        </InputRightAddon>
      }
     
    </InputGroup>
  )
}