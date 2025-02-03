import { Box, Image } from "@chakra-ui/react";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="bg.gradient"
      padding={10}
    >
      <Image
        src="logo-white.svg"
        alt="Logo"
        position="absolute"
        height="40vh"
        top="15vh"
        left="-30vh"
        opacity={0.3}
      />
      <Image
        src="logo-white.svg"
        alt="Logo"
        position="absolute"
        height="40vh"
        bottom="15vh"
        right="-20vh"
        opacity={0.08}
      />
      <Image src="full-logo-white.svg" alt="Logo" alignSelf="start" />
      {children}
    </Box>
  );
};

export default AuthLayout;
