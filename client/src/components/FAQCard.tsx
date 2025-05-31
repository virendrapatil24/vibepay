import { AnimatePresence, motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

interface FAQCardProps {
  question: string;
  answer: string;
}

const FAQCard = ({ question, answer }: FAQCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[linear-gradient(to_bottom,#3abab3,#42e098)] p-5 sm:p-7 rounded-2xl text-black/80">
      <div
        className="flex gap-1 justify-between items-center hover:cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-md sm:text-xl font-semibold">{question}</h3>
        <PlusCircle
          className={`w-6 h-6 transition-transform duration-300 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
              marginTop: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              marginTop: "16px",
            }}
            exit={{
              opacity: 0,
              height: 0,
              marginTop: 0,
            }}
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQCard;
