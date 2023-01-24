import {
  Box,
  Button,
  ChakraProvider,
  Container,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useReducer, useState } from "react";
import InputTitle from "./components/atoms/InputTitle";
import HeaderLayout from "./components/layouts/HeaderLayout";
import { theme } from "./styles/Theme";
import axios from "axios";
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



function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case "change_calc_option":
        return {
          ...state,
          calc_option: {
            ...state.calc_option,
            [action.field]: action.payload,
          },
        };
      case "change_data_option":
        return {
          ...state,
          data_option: {
            ...state.data_option,
            [action.field]: action.payload,
          },
        };
      default:
        throw new Error();
    }
  };
  
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const [apiData, setApiData] = useState();
  const buttonClicked = async () => {
    var dir = (state.data_option.dir === "1") ? "up" : "down";
    var url = state.data_option.data + dir
    const res = await axios.get(
      `https://civitort.github.io/JSONAPI/${url}.json`
    );
    setApiData(res.data);
  };
  console.log(apiData);
  return (
    <ChakraProvider resetCSS={true} theme={theme}>
      <Box textAlign={"left"} p="0">
        <HeaderLayout>
          <Text fontSize={"16px"}>渋滞シミュレーション</Text>
        </HeaderLayout>
        <Container maxW="container.xl">
          <Box m={"1em"} my={"2em"}>
            <InputTitle name="データ指定" />
            <Box border={"1px"} p="1.5em">
              <Text fontSize={"20px"}>データ指定</Text>
              <HStack>
                <>
                  <Select
                    maxW={"200px"}
                    onChange={(e) =>
                      dispatch({
                        type: "change_data_option",
                        field: "data",
                        payload: e.currentTarget.value,
                      })
                    }
                  >
                    <option value="data1">データ 1</option>
                    <option value="data2">データ 2</option>
                  </Select>
                </>
                <>
                  <Text maxW={"100px"}>区間</Text>
                  <RadioGroup
                    px="8px"
                    onChange={(e) =>
                      dispatch({
                        type: "change_data_option",
                        field: "kukan",
                        payload: e,
                      })
                    }
                  >
                    <Stack direction="row">
                      <Radio value="1">A</Radio>
                      <Radio value="2">B</Radio>
                    </Stack>
                  </RadioGroup>
                </>
                <>
                  <Text maxW={"100px"}>上下</Text>
                  <RadioGroup
                    px="8px"
                    onChange={(e) =>
                      dispatch({
                        type: "change_data_option",
                        field: "dir",
                        payload: e,
                      })
                    }
                  >
                    <Stack direction="row">
                      <Radio value="1">上り</Radio>
                      <Radio value="2">下り</Radio>
                    </Stack>
                  </RadioGroup>
                  <Button onClick={buttonClicked}>読込</Button>
                </>
              </HStack>
            </Box>
          </Box>
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
                        type: "change_calc_option",
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
                        type: "change_calc_option",
                        field: "capacity_jutai",
                        payload: e.currentTarget.value,
                      })
                    }
                  />
                </>
              </HStack>
            </Box>
          </Box>
          <Box my={"1em"}>
            <Text>データ:{state.data_option.data}</Text>
            <Text>区間:{state.data_option.kukan}</Text>
            <Text>上下:{state.data_option.dir}</Text>
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
