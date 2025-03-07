
import { Users } from "lucide-react";

type LogoProps = {
  variant?: "default" | "white";
  showText?: boolean;
  size?: "sm" | "md" | "lg";
};

const FamilyLogo = ({ variant = "default", showText = true, size = "md" }: LogoProps) => {
  const textColor = variant === "white" ? "text-white" : "text-familyxp-primary";
  const iconColor = variant === "white" ? "white" : "#0077b6";
  
  const logoSizes = {
    sm: {
      container: "w-6 h-6",
      icon: 14,
      text: "text-sm",
      spacing: "ml-1",
    },
    md: {
      container: "w-8 h-8",
      icon: 18,
      text: "text-xl",
      spacing: "ml-2",
    },
    lg: {
      container: "w-10 h-10",
      icon: 24,
      text: "text-2xl",
      spacing: "ml-3",
    },
  };

  return (
    <div className="flex items-center">
      <div className={`${logoSizes[size].container} rounded-full bg-familyxp-tertiary flex items-center justify-center`}>
        <Users size={logoSizes[size].icon} color={iconColor} strokeWidth={2.5} />
      </div>
      {showText && (
        <span className={`${logoSizes[size].spacing} ${logoSizes[size].text} font-bold ${textColor}`}>
          Familea
        </span>
      )}
    </div>
  );
};

export default FamilyLogo;
