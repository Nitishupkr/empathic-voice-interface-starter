"use client";

import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import StartCall from "./StartCall";
import { ComponentRef, useRef } from "react";
import { motion } from "framer-motion";

export default function ClientComponent({
  accessToken,
}: {
  accessToken: string;
}) {
  const timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: 0.3 } },
  };

  return (
    <motion.div
      className={
        "relative grow flex flex-col mx-auto w-full overflow-hidden h-[0px]"
      }
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <VoiceProvider
        auth={{ type: "accessToken", value: accessToken }}
        onMessage={() => {
          if (timeout.current) {
            window.clearTimeout(timeout.current);
          }

          timeout.current = window.setTimeout(() => {
            if (ref.current) {
              const scrollHeight = ref.current.scrollHeight;

              ref.current.scrollTo({
                top: scrollHeight,
                behavior: "smooth",
              });
            }
          }, 200);
        }}
      >
        <motion.div variants={itemVariants}>
          <Messages ref={ref} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Controls />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StartCall />
        </motion.div>
      </VoiceProvider>
    </motion.div>
  );
}
