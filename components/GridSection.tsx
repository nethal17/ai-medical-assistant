import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

export function GridSection() {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem] mt-15">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton1 = () => (
  <img 
  src="/ai-health.png"
  className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl"></img>
);
const Skeleton2 = () => (
  <img 
  src="/customer.jpg"
  className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl"></img>
);
const Skeleton3 = () => (
  <img 
  src="/security.jpg"
  className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl"></img>
);
const Skeleton4 = () => (
  <img 
  src="/friendly-conversation.jpg"
  className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl"></img>
);
const items = [
  {
    title: "Powered by Advanced Medical AI",
    description: "Built on cutting-edge language models and trained using clinical data, MediCare delivers responses that are medically informed, context-aware, and easy to understand.",
    header: <Skeleton1 />,
    className: "md:col-span-2",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Instant, 24/7 Access to Medical Insight",
    description: "Skip the waiting room. Whether it’s midnight or midday, MediCare is ready to assist",
    header: <Skeleton2 />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Secure & Confidential",
    description: "Your health is personal. That’s why we use end-to-end encryption and adhere to strict privacy standards",
    header: <Skeleton3 />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Natural Conversations, Real Support",
    description:
      "Our agents are designed to speak like a human doctor—with empathy, clarity, and professionalism. No robotic replies. Just real help.",
    header: <Skeleton4 />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];
