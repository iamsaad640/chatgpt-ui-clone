//Components
import { Stack, useMediaQuery } from "@chakra-ui/react";
import { ChatSidebar } from "@/components/Sidebar/ChatSidebar";
import { Chat } from "@/components/Chat";

import { useState, useEffect, useRef } from "react";

const useElementWidth = (): [React.RefObject<HTMLDivElement>, number] => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width);
      }
    };

    const resizeObserver = new ResizeObserver(updateWidth);
    if (ref.current) resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, []);

  return [ref, width];
};

export default function Home() {
  const [ref, width] = useElementWidth();

  const isResponsive = width <= 800;

  return (
    <Stack
      direction={!isResponsive ? "row" : "column"}
      ref={ref}
      width="full"
      height="full"
      spacing={0}
    >
      <ChatSidebar isResponsive={isResponsive} />
      <Chat />
    </Stack>
  );
}
