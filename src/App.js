import {
  Box,
  ChakraProvider,
  Container,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";

import InputTitle from "./components/atoms/InputTitle";
import HeaderLayout from "./components/layouts/HeaderLayout";
import { theme } from "./styles/Theme";
function App() {
  return (
    <ChakraProvider resetCSS={true} theme={theme}>
      <Box textAlign={"left"} p="0">
        <HeaderLayout>
          <Text fontSize={"16px"}>渋滞シミュレーション</Text>
        </HeaderLayout>
        <Container maxW="container.xl">
          <Box m={"1em"} my={"2em"}>
            <InputTitle name="基本項目" />
            <Box border={"1px"} p="1.5em">
              <Text fontSize={"20px"}>交通容量</Text>
              <HStack>
                <>
                  <Text maxW={"100px"}>通常時</Text>
                  <Input maxW={"100px"} />
                </>
                <>
                  <Text maxW={"100px"}>混雑時</Text>
                  <Input maxW={"100px"} />
                </>
              </HStack>
            </Box>
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
