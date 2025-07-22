import { AnimatedTestimonials } from "./ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "The Pediatric AI Agent gave me peace of mind when my daughter had a fever. It felt like texting a real doctor, but faster!",
      name: "Jason Taylor",
      designation: "Father of Two",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        " used the AI General Physician when I felt unwell at night. It helped me understand my symptoms and decide whether I needed urgent care. Life-saver!",
      name: "Anika R. Patel",
      designation: "Busy Professional",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The Mental Health AI was surprisingly helpful during a stressful week. It asked thoughtful questions and gave great coping techniques",
      name: "James O'Connor",
      designation: "Software Engineer",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "I asked the Nutrition Agent for meal advice based on my fitness goals. It was like having a personal dietitian in my pocket.",
      name: "Ravi M Singh",
      designation: "Wellness Enthusiast",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "I was feeling anxious about some symptoms before exams, and the AI General Physician helped me understand what was going on. It was fast, accurate, and really comforting to use.",
      name: "George Smith",
      designation: "University Student",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
