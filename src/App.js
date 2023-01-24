import {
  Box,
  ChakraProvider,
  Container,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import { useReducer } from "react";

import InputTitle from "./components/atoms/InputTitle";
import HeaderLayout from "./components/layouts/HeaderLayout";
import { theme } from "./styles/Theme";

const initialState = {
  data_option: {
    data: "",
    kukan: "",
    dir: "",
  },
  calc_option: {
    capacity_normal: "",
    capacity_jutai: "",
  },
  api_data: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "HANDLE_INPUT_TEXT":
      return {
        ...state,
        calc_option: {
          ...state.calc_option,
          [action.field]: action.payload,
        },
      };
    default:
      throw new Error();
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
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
                  <Input
                    maxW={"100px"}
                    placeholder={"1500"}
                    onChange={(e) =>
                      dispatch({
                        type: "HANDLE_INPUT_TEXT",
                        field: "capacity_normal",
                        payload: e.currentTarget.value,
                      })
                    }
                  />
                </>
                <>
                  <Text maxW={"100px"}>混雑時</Text>
                  <Input
                    maxW={"100px"}
                    onChange={(e) =>
                      dispatch({
                        type: "HANDLE_INPUT_TEXT",
                        field: "capacity_jutai",
                        payload: e.currentTarget.value,
                      })
                    }
                  />
                </>
              </HStack>
            </Box>
          </Box>
          <>
            <Text>通常時:{state.calc_option.capacity_normal}</Text>
            <Text>渋滞時:{state.calc_option.capacity_jutai}</Text>
          </>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
