import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function GraphPrompt() {
  const backgroundImageUrl = process.env.PUBLIC_URL + "/images/green.jpg";
  return (
    <Flex
      w={"full"}
      h={"100vh"}
      backgroundImage={`url(${backgroundImageUrl})`}
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
      >
        <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
          <Text
            color={"white"}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
          >
            If you want to get graphed, you have to sign in or create an
            account.
          </Text>
          <Stack direction={"row"}>
            <Button
              as={Link}
              to={"/register-or-login"}
              bg={"darkseagreen"}
              rounded={"full"}
              color={"white"}
              _hover={{ bg: "#42610a", color: "white" }}
            >
              Sounds good, let's go
            </Button>
            <Button
              as={Link}
              to={"/"}
              bg={"whiteAlpha.300"}
              rounded={"full"}
              color={"white"}
              _hover={{ bg: "whiteAlpha.500", color: "white" }}
            >
              I don't know. Lemme see those neat squares again...
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
}
