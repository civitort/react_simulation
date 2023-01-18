import { Box, ChakraProvider, Text } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider resetCSS={true}>
      <Box>
        <Text>テスト</Text>
      </Box>
    </ChakraProvider>
  );
}

export default App;
