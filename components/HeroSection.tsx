"use client";
import { motion } from "motion/react";
import CornerElements from "./CornerElements";
import Link from "next/link";
import { HeartHandshake } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center">
      <div className="px-4 py-8 md:py-16">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-xl font-bold text-green-700 md:text-4xl lg:text-6xl">
          {"Your 24/7 AI Powered Medical Assistant"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-4 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-gray-800"
        >
          Get expert medical guidance anytime, anywhere — powered by 10 specialized AI agents trained across multiple disciplines.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href={"/dashboard"}>
          <button className="w-60 transform rounded-lg bg-green-700 px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-800 cursor-pointer">
            Explore Now
          </button>
          </Link>
          
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-25"
        >
          <div className="flex flex-col-2 items-center justify-center overflow-hidden w-full rounded-3xl">
            <div className="absolute flex items-center text-3xl text-white bottom-0 text-center p-4 bg-green-800/50 rounded-b-3xl font-mono">
            Each agent is powered by the latest advancements in AI and trained on real-world medical literature, ensuring accurate and up-to-date responses.
            </div>

            <CornerElements />

            <div>
            <Link href="/" className="absolute flex items-center gap-1 top-4 left-4 bg-white/50 p-2 rounded-xl">
                        <div className="rounded">
                            <HeartHandshake className="w-7 h-7 text-green-700" />
                        </div>
                        <span className="text-2xl font-bold font-mono">
                            <span className="text-green-700">Medi</span>Care
                        </span>
                    </Link>
            </div>

            <img
              src="/header1.png"
              alt="Landing page preview"
              className="flex h-auto w-full object-cover"
              height={100}
              width={1000}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};