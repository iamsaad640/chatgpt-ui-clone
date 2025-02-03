import { useState } from "react";
import {
  Box,
  Image,
  Text,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { HiMenu } from "react-icons/hi";

const sidebarItems = [
  { label: "List all users", value: "listUsers" },
  // Add more items as needed
];

const AdminSidebar = ({
  setSelectedItem,
}: {
  setSelectedItem: (item: string) => void;
}) => {
  const [activeItem, setActiveItem] = useState(sidebarItems[0].value);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleItemClick = (value: string) => {
    setActiveItem(value);
    setSelectedItem(value);
    onClose();
  };

  return (
    <>
      <Box
        display={{ base: "none", md: "block" }}
        w="300px"
        h="100vh"
        bg="bg.gradient"
        color="white"
        p="4"
      >
        <Image src="full-logo-white.svg" alt="Logo" />
        <Box mt="8">
          {sidebarItems.map((item) => (
            <Text
              key={item.value}
              cursor="pointer"
              bg={activeItem === item.value ? "whiteAlpha.300" : "transparent"}
              onClick={() => handleItemClick(item.value)}
              p="2"
              borderRadius="md"
            >
              {item.label}
            </Text>
          ))}
        </Box>
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent
            w="90vw"
            h="100vh"
            bg="bg.gradient"
            color="white"
            p="4"
          >
            <DrawerCloseButton />
            <DrawerBody>
              <Box>
                <Image src="full-logo-white.svg" alt="Logo" />
                <Box mt="8">
                  {sidebarItems.map((item) => (
                    <Text
                      key={item.value}
                      cursor="pointer"
                      bg={
                        activeItem === item.value
                          ? "whiteAlpha.300"
                          : "transparent"
                      }
                      onClick={() => handleItemClick(item.value)}
                      p="2"
                      borderRadius="md"
                    >
                      {item.label}
                    </Text>
                  ))}
                </Box>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

      <IconButton
        aria-label="Open menu"
        icon={<HiMenu style={{ margin: "auto" }} />}
        display={{ base: "block", md: "none" }}
        onClick={onOpen}
        position="fixed"
        top="1rem"
        left="1rem"
      />
    </>
  );
};

export default AdminSidebar;
