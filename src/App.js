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
import ViewTable from "./components/ViewTable";
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
    capacity_normal: 1500,
    capacity_jutai: 1200,
    kanzan: 2.5,
    carlen: 10,
    syasen: 2,
  },
  view_data: {},
};
const cols = {
  days: 0,
  hour: 1,
  car: 2,
  big: 3,
  kanzan: 4,
  all: 5,
  ruiseki: 6,
  yoryo: 7,
  remain: 8,
  jutai: 9,
  carlen: 10,
  suikei: 11,
};
function App() {
  // データを1時間ピッチで集計する
  const calcHourData = (res, state) => {
    const result = [];
    var temp = [0, 0];
    var data = res.data;
    data.map((item, i) => {
      // １時間 = 12*5分 = 60分
      // iが12で割り切れるまで足す
      var car = Number(item.car1);
      var big = Number(item.car2);
      temp[0] += car;
      temp[1] += big;
      if ((Math.floor(i % 12) === 0) & (i > 0)) {
        var index = i / 12 - 1;
        result[index] = [];
        result[index][cols.days] = item.day; // 日付
        result[index][cols.hour] = (index % 24) + "時"; // 時刻
        result[index][cols.car] = temp[0]; // 普通車
        result[index][cols.big] = temp[1]; // 大型車
        result[index][cols.all] = Math.floor(
          temp[0] + temp[1] * state.calc_option.kanzan * 0.825
        ); // 全車 * 推計補正率
        result[index][cols.suikei] = Math.floor(
          (temp[0] + temp[1] * state.calc_option.kanzan) * (1 - 0.825)
        );
        result[index][cols.yoryo] = state.calc_option.capacity_normal; // 容量
        result[index][cols.kanzan] = state.calc_option.kanzan; // 大型車の換算値
        result[index][cols.carlen] = state.calc_option.carlen; // 車頭間隔
        // 直前に捌け残り交通量が存在していたら渋滞
        var prev_remain = index > 0 ? result[index - 1][cols.remain] : 0;
        result[index][cols.yoryo] =
          prev_remain > 0
            ? state.calc_option.capacity_jutai
            : state.calc_option.capacity_normal;
        // 捌け残り交通量
        var remain =
          result[index][cols.all] - result[index][cols.yoryo];
        result[index][cols.remain] = remain > 0 ? remain : 0;
        // 累積交通量
        var remain_all =
          remain > 0
            ? result[index][cols.yoryo] + remain
            : result[index][cols.all];
        result[index][cols.ruiseki] = remain_all;
        temp = [0, 0]; // 値初期化
        // 渋滞長
        var jutai =
          (result[index][cols.remain] / state.calc_option.syasen) *
          state.calc_option.carlen;
        result[index][cols.jutai] = jutai;
      }
    });
    return result;
  };

  const [reading, setReading] = useState(false);
  const [apiData, setApiData] = useState();

  const reducer = (state, action) => {
    switch (action.type) {
      case "change_calc_option": {
        var result = {
          ...state,
          calc_option: {
            ...state.calc_option,
            [action.field]: action.payload,
          },
        };
        if (apiData !== undefined) {
          var dat = calcHourData(apiData, result);
          result = {
            ...result,
            view_data: dat,
          };
        }
        return result;
      }
      case "change_data_option": {
        var result = {
          ...state,
          data_option: {
            ...state.data_option,
            [action.field]: action.payload,
          }
        };
        if (apiData !== undefined) {
          var dat = calcHourData(apiData, result);
          result = {
            ...result,
            view_data: dat
          }
        }
        return result;
      }
      case "reset_data": 
        var dat = calcHourData(apiData, state);
        return {
          ...state,
          view_data : dat
        }
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const buttonClicked = async () => {
    setReading(true);
    var dir = state.data_option.dir === "1" ? "up" : "down";
    var url = state.data_option.data + dir;
    const res = await axios.get(
      `https://civitort.github.io/JSONAPI/${url}.json`
    );
    setApiData(res.data);
    dispatch({
      type:"reset_data"
    })
    setReading(false);
  };
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
                  <Text>{reading ? "読み込み中..." : ""}</Text>
                </>
              </HStack>
              {apiData === undefined ? (
                ""
              ) : (
                <Stack pt="1em" direction={"row"}>
                  <Text>区間:{apiData.name}</Text>
                  <Text>方向:{apiData.direction}</Text>
                </Stack>
              )}
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
                    defaultValue={1500}
                    onChange={(e) =>
                      dispatch({
                        type: "change_calc_option",
                        field: "capacity_normal",
                        payload: Number(e.currentTarget.value),
                      })
                    }
                  />
                </>
                <>
                  <Text maxW={"100px"}>混雑時</Text>
                  <Input
                    maxW={"100px"}
                    defaultValue={1200}
                    onChange={(e) =>
                      dispatch({
                        type: "change_calc_option",
                        field: "capacity_jutai",
                        payload: Number(e.currentTarget.value),
                      })
                    }
                  />
                </>
              </HStack>
            </Box>
            <Box border={"1px"} p="1.5em">
              <HStack>
                <>
                  <Text maxW={"100px"}>大型車換算値：</Text>
                  <Input
                    maxW={"100px"}
                    defaultValue={2.5}
                    onChange={(e) =>
                      dispatch({
                        type: "change_calc_option",
                        field: "kanzan",
                        payload: Number(e.currentTarget.value),
                      })
                    }
                  />
                </>
                <>
                  <Text maxW={"100px"}>車頭間隔：</Text>
                  <Input
                    maxW={"100px"}
                    defaultValue={10}
                    onChange={(e) =>
                      dispatch({
                        type: "change_calc_option",
                        field: "carlen",
                        payload: Number(e.currentTarget.value),
                      })
                    }
                  />
                  <Text maxW={"100px"}>車線数：</Text>
                  <Input
                    maxW={"100px"}
                    defaultValue={2}
                    onChange={(e) =>
                      dispatch({
                        type: "change_calc_option",
                        field: "syasen",
                        payload: Number(e.currentTarget.value),
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
          <Box>
            <Text>◆データ一覧（1時間ピッチ）</Text>

            <ViewTable
              data={state.view_data}
              column={[
                "日付",
                "時刻",
                "普通車",
                "大型車",
                "換算",
                "全車",
                "累積",
                "交通容量",
                "残存交通",
                "渋滞長",
                "車頭間隔",
              ]}
            ></ViewTable>
          </Box>
          <>
            <Text>グラフ描画</Text>
          </>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
