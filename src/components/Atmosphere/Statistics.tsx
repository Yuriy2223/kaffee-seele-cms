import { TrendingUp, Award, Users } from "lucide-react";
import { useReviewStats } from "@/hooks/useReviewStats";

interface StatisticsProps {
  isVisible?: boolean;
  className?: string;
}

export const Statistics = ({
  isVisible = false,
  className,
}: StatisticsProps) => {
  const { averageRating } = useReviewStats();

  const statsData = [
    {
      number: "100%",
      text: "Натуральні інгредієнти",
      icon: <TrendingUp className="w-7 h-7 text-white" />,
    },
    {
      number: "15+",
      text: "Унікальних рецептів",
      icon: <Award className="w-7 h-7 text-white" />,
    },
    {
      number: `${averageRating}★`,
      text: "Рейтинг відвідувачів",
      icon: <Users className="w-7 h-7 text-white" />,
    },
  ];

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 gap-8 transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        } ${className}`}
      style={{ transitionDelay: isVisible ? "700ms" : "0ms" }}
    >
      {statsData.map((stat, index) => (
        <div
          key={index}
          className="group text-center bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-md border border-cream/40 hover:shadow-lg hover:scale-[1.05] transition-all duration-500"
          style={{ animationDelay: isVisible ? `${index * 200}ms` : "0ms" }}
        >
          <div className="flex items-center justify-center mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sage-green to-warm-brown rounded-full flex items-center justify-center shadow-md transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
              {stat.icon}
            </div>
          </div>

          <div className="text-2xl md:text-3xl font-bold text-warm-brown mb-2 transition-colors duration-300 group-hover:text-sage-green">
            {stat.number}
          </div>

          <div className="text-dark-text font-medium text-base leading-snug">
            {stat.text}
          </div>

          <div className="flex justify-center mt-3 space-x-1.5">
            <div className="w-1 h-1 bg-sage-green/60 rounded-full animate-pulse" />
            <div
              className="w-1 h-1 bg-warm-brown/60 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="w-1 h-1 bg-sage-green/60 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

