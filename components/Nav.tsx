"use client";

import { useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import HumeLogo from "./logos/Hume";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import Github from "./logos/GitHub";
import pkg from '@/package.json';

export const Nav = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useLayoutEffect(() => {
    const el = document.documentElement;

    if (el.classList.contains("dark")) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  const toggleDark = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setIsDarkMode((prev) => !prev);
  };

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={
        "px-4 py-2 flex items-center h-14 z-50 bg-card border-b border-border"
      }
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <HumeLogo className={"h-5 w-auto"} />
      </motion.div>
      <div className={"ml-auto flex items-center gap-1"}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={() => {
              window.open(
                pkg.homepage,
                "_blank",
                "noopener noreferrer"
              );
            }}
            variant={"ghost"}
            className={"ml-auto flex items-center gap-1.5"}
          >
            <span>
              <Github className={"size-4"} />
            </span>
            <span>Star on GitHub</span>
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={toggleDark}
            variant={"ghost"}
            className={"ml-auto flex items-center gap-1.5"}
          >
            <span>
              {isDarkMode ? (
                <Sun className={"size-4"} />
              ) : (
                <Moon className={"size-4"} />
              )}
            </span>
            <span>{isDarkMode ? "Light" : "Dark"} Mode</span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};
