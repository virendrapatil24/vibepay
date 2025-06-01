import { Send, ShieldCheck, Smartphone } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    title: "Instant Transfers",
    description: "Send money to anyone in seconds — no delays, no friction.",
    icon: Send,
  },
  {
    title: "Bank-Level Security",
    description:
      "Your data and money are protected with advanced encryption and authentication.",
    icon: ShieldCheck,
  },
  {
    title: "Simple Interface",
    description:
      "Designed to be intuitive, even for first-time users. Just tap and send.",
    icon: Smartphone,
  },
];

const Features = () => {
  return (
    <div className="bg-black py-[72px] sm:py-24 text-white ">
      <div className="container">
        <div className="flex flex-col justify-center">
          <h2 className="text-center text-4xl sm:text-5xl max-w-md mx-auto font-bold">
            Built for trust and simplicity
          </h2>
          <p className="text-center px-4 mt-6 text-white/70 max-w-xl mx-auto ">
            At VibePay, we blend seamless user experience, modern security
            standards, and reliable infrastructure to make sending money
            effortless and secure.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 mt-16">
            {features.map((feature, index) => (
              <FeatureCard
                title={feature.title}
                description={feature.description}
                Icon={feature.icon}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
