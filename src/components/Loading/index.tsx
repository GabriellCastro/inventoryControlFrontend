import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Box padding="20" boxShadow="lg" m="auto">
      <SkeletonCircle size="100" />
      <SkeletonText mt="4" noOfLines={5} spacing="4" />
    </Box>
  );
};

export default Loading;
