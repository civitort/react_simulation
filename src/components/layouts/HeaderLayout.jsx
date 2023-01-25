import { Flex } from "@chakra-ui/react";

const HeaderLayout = (props) => {
  return (
    <Flex
      borderBottom="1px"
      p="14px"
      borderColor={"white"}
      borderBottomColor={"gray.300"}
      backgroundColor={"blackAlpha.50"}
    >
      {props.children}
    </Flex>
  );
};

export default HeaderLayout;
