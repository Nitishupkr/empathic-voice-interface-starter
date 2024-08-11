import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";

export default function StartCall() {
  const { status, connect } = useVoice();

  return (
    <AnimatePresence>
      {status.value !== "connected" ? (
        <motion.div
          className={"fixed inset-0 p-4 flex items-center justify-center bg-background"}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{
            initial: { opacity: 0 },
            enter: { opacity: 1, transition: { duration: 0.5 } },
            exit: { opacity: 0, transition: { duration: 0.3 } },
          }}
        >
          <motion.div
            variants={{
              initial: { scale: 0.8, opacity: 0 },
              enter: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
              exit: { scale: 0.8, opacity: 0, transition: { duration: 0.3 } },
            }}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <Button
              className={"z-50 flex items-center gap-1.5"}
              onClick={() => {
                connect()
                  .then(() => {})
                  .catch(() => {})
                  .finally(() => {});
              }}
            >
              <span>
                <Phone
                  className={"size-4 opacity-50"}
                  strokeWidth={2}
                  stroke={"currentColor"}
                />
              </span>
              <span>Start Call</span>
            </Button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
