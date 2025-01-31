import { useState } from "react";
import {
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ChakraProvider,
} from "@chakra-ui/react";
import Home from "./Home";
import { theme } from "@/styles/theme";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  const modalWidth = isFullScreen ? "100%" : "md";
  const modalHeight = isFullScreen ? "100vh" : "auto";

  return (
    <ChakraProvider resetCSS={false} theme={theme} cssVarsRoot="undefined">
      <Box position="relative">
        <Button
          position="fixed"
          bottom={4}
          right={4}
          onClick={openModal}
          aria-label="Open Chat"
        >
          Open Chat
        </Button>
        <Modal isOpen={isOpen} onClose={closeModal} size={modalWidth}>
          <ModalOverlay />
          <ModalContent height={modalHeight}>
            <ModalHeader
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              Chat
              <Button onClick={toggleFullScreen} size="sm">
                {isFullScreen ? "Exit Full Screen" : "Full Screen"}
              </Button>
              <ModalCloseButton position="relative" />
            </ModalHeader>
            <ModalBody flex="1" overflowY="auto">
              <Home />
            </ModalBody>
            <ModalFooter>
              <Button onClick={toggleFullScreen}>
                {isFullScreen ? "Exit Full Screen" : "Full Screen"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
}
