import { Box, HStack } from "@chakra-ui/react";
import { VariableSizeGrid } from "react-window";
import styled from "styled-components";
const Styles = styled.div`
  padding: 1rem;
  .grid {
    border: 1px solid #d9dddd;
  }

  .cell {
    border: 1px solid #d9dddd;
    display: flex;
    align-items: center;
    justify-content: center;
  }

`;


const Cell = ({ columnIndex, rowIndex, style, data }) => {
  const record = data[rowIndex];
  const key = Object.keys(record)[columnIndex];

  return (
    <div className="cell" style={style}>
      {record[key]}
    </div>
  );
};

const ViewTable = ({ data, column }) => {
  return (
    <Box>
      <Styles>
        {data.length > 0 ? (
          <>
            <HStack spacing={0}>
                {column.map((item, i) => {
                  return <Box w="100px"  display='flex' justifyContent='center' alignItems='center' key={i}>{item}</Box>
                })}
            </HStack>
            <VariableSizeGrid
              className="grid"
              columnCount={column.length}
              columnWidth={(index) => 100}
              height={300}
              rowCount={data.length}
              rowHeight={(index) => 30}
              width={column.length*100 + 50 }
              itemData={data}
            >
              {Cell}
            </VariableSizeGrid>
          </>
        ) : (
          ""
        )}
      </Styles>
    </Box>
  );
};

export default ViewTable;
