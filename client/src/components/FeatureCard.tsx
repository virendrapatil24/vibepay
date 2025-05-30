import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

const FeatureCard = ({ title, description, Icon }: FeatureCardProps) => {
  return (
    <div className="border border-white/30 px-5 sm:px-8 py-10  text-center rounded-xl sm:flex-1">
      <Icon className="inline-flex h-8 w-8 items-center justify-center text-green-300" />
      <h3 className="mt-6 font-bold">{title}</h3>
      <p className="mt-2 px-4 sm:px-0 text-white/70 text-center">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
