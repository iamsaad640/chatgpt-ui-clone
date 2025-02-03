import AuthLayout from "@/components/Layout/AuthLayout";
import {
  Box,
  Button,
  Checkbox,
  Input,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";

import { useState } from "react";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isResponsive] = useMediaQuery("(max-width: 800px)");

  return (
    <AuthLayout>
      <Box
        bg="bg.whiteAlpha" // Set background color with opacity
        color="text.light"
        paddingX={12}
        paddingY={14}
        borderRadius="2xl"
        boxShadow="md"
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginY="auto"
      >
        <Text
          fontSize="xl"
          fontWeight={600}
          width={isResponsive ? "100%" : "400px"}
          mb={6}
        >
          Welcome Back!
        </Text>
        <VStack spacing={4} width="100%">
          <Input
            placeholder="Email"
            variant="outline"
            bg="bg.white"
            paddingY={6}
          />
          <Box position="relative" width="100%">
            <Input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              variant="outline"
              pr="4.5rem"
              bg="bg.white"
              paddingY={6}
            />
            <Button
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
              position="absolute"
              top="50%"
              right="1rem"
              variant="link"
              color="text.light"
              textDecoration="underline"
              transform="translateY(-50%)"
              zIndex={1}
            >
              {showPassword ? "Hide" : "Show"}
            </Button>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            alignItems="center"
          >
            <Checkbox
              borderColor="bg.primary"
              color="text.light"
              fontSize={10}
              size="sm"
              opacity={0.7}
            >
              Remember Me
            </Checkbox>
            <Button
              variant="link"
              color="text.light"
              textDecoration="underline"
              fontSize={12}
            >
              Forgot Password?
            </Button>
          </Box>
          <Button
            variant="custom"
            backgroundColor="bg.primary"
            width="100%"
            paddingY={6}
            fontWeight={400}
          >
            Log in
          </Button>
        </VStack>
      </Box>
    </AuthLayout>
  );
};

export default Signin;
