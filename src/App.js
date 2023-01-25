import {
  Box,
  Button,
  ChakraProvider,
  Container,
  Grid,
  GridItem,
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
import Chart from "react-google-charts";
const graph_data = [
  ["時間", "交通量", "推計補正", "交通容量1", "交通容量2", "渋滞長"],
  ["01-01-00", 306, 65, 1200, 1500, 0],
  ["01-01-01", 311, 66, 1200, 1500, 0],
  ["01-01-02", 257, 55, 1200, 1500, 0],
  ["01-01-03", 264, 56, 1200, 1500, 0],
  ["01-01-04", 269, 57, 1200, 1500, 0],
  ["01-01-05", 260, 55, 1200, 1500, 0],
  ["01-01-06", 230, 49, 1200, 1500, 0],
  ["01-01-07", 354, 75, 1200, 1500, 0],
  ["01-01-08", 538, 114, 1200, 1500, 0],
  ["01-01-09", 637, 135, 1200, 1500, 0],
  ["01-01-10", 845, 179, 1200, 1500, 0],
  ["01-01-11", 1010, 214, 1200, 1500, 0],
  ["01-01-12", 1001, 212, 1200, 1500, 0],
  ["01-01-13", 1097, 233, 1200, 1500, 0],
  ["01-01-14", 1207, 256, 1200, 1500, 0],
  ["01-01-15", 1430, 303, 1200, 1500, 0],
  ["01-01-16", 1470, 312, 1200, 1500, 0],
  ["01-01-17", 1331, 283, 1200, 1500, 0],
  ["01-01-18", 945, 201, 1200, 1500, 0],
  ["01-01-19", 731, 155, 1200, 1500, 0],
  ["01-01-20", 683, 145, 1200, 1500, 0],
  ["01-01-21", 592, 126, 1200, 1500, 0],
  ["01-01-22", 483, 103, 1200, 1500, 0],
  ["01-01-23", 403, 86, 1200, 1500, 0],
  ["01-02-00", 355, 75, 1200, 1500, 0],
  ["01-02-01", 280, 60, 1200, 1500, 0],
  ["01-02-02", 260, 55, 1200, 1500, 0],
  ["01-02-03", 204, 43, 1200, 1500, 0],
  ["01-02-04", 224, 48, 1200, 1500, 0],
  ["01-02-05", 220, 47, 1200, 1500, 0],
  ["01-02-06", 259, 55, 1200, 1500, 0],
  ["01-02-07", 469, 100, 1200, 1500, 0],
  ["01-02-08", 919, 195, 1200, 1500, 0],
  ["01-02-09", 1359, 288, 1200, 1500, 0],
  ["01-02-10", 1540, 327, 1200, 1500, 200],
  ["01-02-11", 1758, 373, 1200, 1500, 2700],
  ["01-02-12", 1638, 348, 1200, 1500, 4600],
  ["01-02-13", 1647, 350, 1200, 1500, 6600],
  ["01-02-14", 1879, 399, 1200, 1500, 9650],
  ["01-02-15", 1868, 397, 1200, 1500, 12700],
  ["01-02-16", 1699, 361, 1200, 1500, 14900],
  ["01-02-17", 1420, 301, 1200, 1500, 15800],
  ["01-02-18", 1690, 359, 1200, 1500, 17950],
  ["01-02-19", 1215, 258, 1200, 1500, 17850],
  ["01-02-20", 1034, 219, 1200, 1500, 16850],
  ["01-02-21", 961, 204, 1200, 1500, 15450],
  ["01-02-22", 987, 210, 1200, 1500, 14250],
  ["01-02-23", 928, 197, 1200, 1500, 12750],
  ["01-03-00", 769, 163, 1200, 1500, 10450],
  ["01-03-01", 657, 140, 1200, 1500, 7600],
  ["01-03-02", 508, 108, 1200, 1500, 4100],
  ["01-03-03", 436, 92, 1200, 1500, 200],
  ["01-03-04", 342, 73, 1200, 1500, 0],
  ["01-03-05", 295, 63, 1200, 1500, 0],
  ["01-03-06", 356, 76, 1200, 1500, 0],
  ["01-03-07", 490, 104, 1200, 1500, 0],
  ["01-03-08", 891, 189, 1200, 1500, 0],
  ["01-03-09", 1286, 273, 1200, 1500, 0],
  ["01-03-10", 1623, 344, 1200, 1500, 600],
  ["01-03-11", 1813, 385, 1200, 1500, 3400],
  ["01-03-12", 1687, 358, 1200, 1500, 5550],
  ["01-03-13", 1777, 377, 1200, 1500, 8150],
  ["01-03-14", 1934, 410, 1200, 1500, 11500],
  ["01-03-15", 966, 205, 1200, 1500, 10150],
  ["01-03-16", 804, 171, 1200, 1500, 8050],
  ["01-03-17", 1464, 311, 1200, 1500, 9100],
  ["01-03-18", 1705, 362, 1200, 1500, 11350],
  ["01-03-19", 1355, 287, 1200, 1500, 11900],
  ["01-03-20", 1006, 214, 1200, 1500, 10750],
  ["01-03-21", 1029, 218, 1200, 1500, 9750],
];
const graph_options = {
  title: "TEST データ A ～ B区間　上り方向",
  titleTextStyle: {
    fontSize: 18,
    bold: false,
    italic: true,
  },
  colors: ["006699", "77933C", "FF3300", "0000FF", "7030A0"],
  series: {
    0: {
      type: "bars",
      targetAxisIndex: 0,
    },
    1: {
      type: "bars",
      targetAxisIndex: 0,
    },
    2: {
      type: "line",
      lineDashStyle: [8, 6],
      targetAxisIndex: 0,
    },
    3: {
      type: "line",
      lineDashStyle: [8, 6],
      targetAxisIndex: 0,
    },
    4: {
      type: "line",
      targetAxisIndex: 1,
      lineWidth: 3,
    },
  },
  legend: {
    position: "top",
  },
  vAxis: {
    0: {
      title: "交通量",
      textStyle: {
        fontSize: 11,
      },
      viewWindow: {
        max: 4000,
        min: 0,
      },
    },
    1: {
      title: "渋滞長",
      textStyle: {
        fontSize: 11,
      },
      viewWindow: {
        max: 24000,
        min: 0,
      },
    },
  },
  hAxis: {
    title: "日付",
    textStyle: {
      fontSize: 10,
      bold: true,
    },
    slantedTextAngle: 60,
  },
  isStacked: true,
  bar: {
    groupWidth: "40%",
  },
  chartArea: {
    left: "8%",
    right: "8%",
    top: "15%",
    bottom: "15%",
    width: "70%",
    height: "70%",
  },
  width: 1400,
  height: 400,
  // seriesType: "bars",
  // series: { 5: { type: "line" } },
};
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
  graph_option: {
    day: ""
  }
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
        var remain = result[index][cols.all] - result[index][cols.yoryo];
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

  // 描画用データを作る

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
      case "reset_data":
        var dat = calcHourData(apiData, state);
        return {
          ...state,
          view_data: dat,
        };
      case "change_graph_option":
        return {
          ...state,
          graph_option: {
            [action.field]: action.payload,
          }
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
      type: "reset_data",
    });
    setReading(false);
  };
  return (
    <ChakraProvider resetCSS={true} theme={theme}>
      <Box textAlign={"left"} p="0">
        <HeaderLayout>
          <Text fontSize={"16px"}>渋滞シミュレーション</Text>
        </HeaderLayout>
        <Container maxW="container.2xl">
          <Box m={"1em"} my={"2em"}>
            <InputTitle name="データ指定" />
            <Box border={"1px"} p="1.5em">
              <Text fontSize={"20px"}>データ指定</Text>
              <HStack>
                <>
                  <Select
                    maxW={"200px"}
                    placeholder='データ選択'
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
          <Grid templateColumns={"450px 1fr"}>
            <GridItem>
              <Box m={"1em"} my={"2em"}>
                <InputTitle name="入力項目" />
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
                  <>
                      <Text>日付選択</Text>
                      <Input
                        placeholder="Select Date and Time"
                        size="md"
                        type="date"
                        defaultValue='2019-01-01'
                        max="2019-12-31"
                        min="2019-01-01"
                        onChange={(e) =>
                          dispatch({
                            type: "change_graph_option",
                            field: "day",
                            payload: (e.currentTarget.value),
                          })
                        }
                      />
                    </>
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
              <>
              <Text>日付:{state.graph_option.day}</Text>
              </>
            </GridItem>
            <GridItem>
            <>
                <Text>グラフ描画</Text>
                <Box my={"2em"}>
                  <Chart
                    chartType="ComboChart"
                    width="100%"
                    height="400px"
                    data={graph_data}
                    options={graph_options}
                  />            
                </Box>
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

            </GridItem>
          </Grid>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
