import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import ListUsers from "@/components/Dashboard/ListUsers";
import AdminSidebar from "@/components/Sidebar/AdminSidebar";
import ChatPopup from "@/ChatModel/Chatpopup";

const Home = () => {
  const [selectedItem, setSelectedItem] = useState("listUsers");

  return (
    <Box>
      <Flex height="100vh" overflow="hidden" color={"white"}>
        <AdminSidebar setSelectedItem={setSelectedItem} />

        <Box flex="1" flexDirection="column" bg="bg.white" color="text.light">
          <ChatPopup />
          <Box mt="16">{selectedItem === "listUsers" && <ListUsers />}</Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
