//Modules
import { useRef } from "react";
import { ChatContent, useChat } from "@/store/chat";
import { useForm } from "react-hook-form";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useMutation } from "react-query";

//Components
import { Input } from "@/components/Input";
import { FiSend } from "react-icons/fi";
import { IconButton, Spinner, Stack, Text } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import { Instructions } from "../Layout/Instructions";
import { useAPI } from "@/store/api";

export interface ChatProps {}

interface ChatSchema {
  input: string;
}

export const Chat = ({ ...props }: ChatProps) => {
  const { api } = useAPI();
  const { selectedChat, addMessage, addChat, editChat, getChat } = useChat();
  const selectedId = selectedChat?.id,
    selectedRole = selectedChat?.role;

  const hasSelectedChat = selectedChat && selectedChat?.content.length > 0;

  const { register, setValue, handleSubmit } = useForm<ChatSchema>();

  const overflowRef = useRef<HTMLDivElement>(null);
  const updateScroll = () => {
    overflowRef.current?.scrollTo(0, overflowRef.current.scrollHeight);
  };

  const [parentRef] = useAutoAnimate();

  const { mutate, isLoading } = useMutation({
    mutationKey: "prompt",
    mutationFn: async ({
      prompt,
      history,
    }: {
      prompt: string;
      history: ChatContent[];
    }) => {
      const response = await fetch(
        "https://www.virtual-sales.com/chatai/chat/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${api}`,
          },
          body: JSON.stringify({
            question: prompt,
            history,
          }),
        }
      );
      return response.json();
    },
  });

  const handleAsk = async ({ input: prompt }: ChatSchema) => {
    updateScroll();
    const sendRequest = (selectedId: string) => {
      setValue("input", "");

      addMessage(selectedId, {
        emitter: "user",
        message: prompt,
      });

      const chatHistory = getChat(selectedId);

      const history: ChatContent[] = chatHistory || [];

      mutate(
        { prompt, history },
        {
          onSuccess({ answer }, variable) {
            const message = String(answer);
            addMessage(selectedId, {
              emitter: "gpt",
              message,
            });

            if (selectedRole == "New chat" || selectedRole == undefined) {
              editChat(selectedId, { role: variable.prompt });
            }
            updateScroll();
          },
          onError(error) {
            const message = "An error occurred while fetching the response.";
            addMessage(selectedId, {
              emitter: "error",
              message,
            });
            updateScroll();
          },
        }
      );
    };

    if (selectedId) {
      if (prompt && !isLoading) {
        sendRequest(selectedId);
      }
    } else {
      addChat(sendRequest);
    }
  };

  return (
    <Stack width="full" height="100vh">
      <Stack
        maxWidth="768px"
        width="full"
        marginX="auto"
        height="85%"
        overflow="auto"
        ref={overflowRef}
      >
        <Stack spacing={2} padding={2} ref={parentRef} height="full">
          {hasSelectedChat ? (
            selectedChat.content.map(({ emitter, message }, key) => {
              const getMessage = () => {
                if (message.slice(0, 2) == "\n\n") {
                  return message.slice(2, Infinity);
                }

                return message;
              };

              return (
                <Stack
                  key={key}
                  direction="row"
                  padding={4}
                  rounded={8}
                  backgroundColor={
                    emitter == "gpt" ? "blackAlpha.200" : "transparent"
                  }
                  spacing={4}
                >
                  <Text
                    whiteSpace="pre-wrap"
                    marginTop=".75em !important"
                    overflow="hidden"
                  >
                    <ReactMarkdown>{getMessage()}</ReactMarkdown>
                  </Text>
                </Stack>
              );
            })
          ) : (
            <Instructions onClick={(text) => setValue("input", text)} />
          )}
        </Stack>
      </Stack>
      <Stack
        height="20%"
        padding={4}
        backgroundColor="blackAlpha.400"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
      >
        <Stack maxWidth="768px">
          <Input
            autoFocus={true}
            variant="filled"
            inputRightAddon={
              <IconButton
                aria-label="send_button"
                icon={!isLoading ? <FiSend /> : <Spinner />}
                backgroundColor="transparent"
                onClick={handleSubmit(handleAsk)}
              />
            }
            {...register("input")}
            onSubmit={console.log}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleAsk({ input: e.currentTarget.value });
              }
            }}
          />
          <Text textAlign="center" fontSize="sm" opacity={0.5}>
            Free Research Preview. Our goal is to make AI systems more natural
            and safe to interact with. Your feedback will help us improve.
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};
