"use client";

import { FaChartLine, FaShieldAlt, FaRobot, FaGem, FaBolt, FaRocket, FaChartBar } from "react-icons/fa";

interface FeaturePill {
  text: string;
  icon: JSX.Element;
  className: string;
  delay: string;
}

export default function WhyUs() {
  const features: FeaturePill[] = [
    {
      text: "Boost Productivity",
      icon: <FaChartLine className="text-[#736bff]" />,
      className: "top-[120px] left-[80px]",
      delay: "0s",
    },
    {
      text: "Automate Securely",
      icon: <FaShieldAlt className="text-[#736bff]" />,
      className: "top-[40px] left-1/2 -translate-x-1/2",
      delay: "0.5s",
    },
    {
      text: "AI Workflow",
      icon: <FaRobot className="text-[#736bff]" />,
      className: "top-[120px] right-[80px]",
      delay: "1s",
    },
    {
      text: "Value from Data",
      icon: <FaGem className="text-[#736bff]" />,
      className: "top-1/2 -translate-y-1/2 right-[20px]",
      delay: "1.5s",
    },
    {
      text: "Improve Efficiency",
      icon: <FaBolt className="text-[#736bff]" />,
      className: "bottom-[120px] right-[80px]",
      delay: "2s",
    },
    {
      text: "Deploy Intelligent Workflows",
      icon: <FaRocket className="text-[#736bff]" />,
      className: "bottom-[40px] left-1/2 -translate-x-1/2",
      delay: "2.5s",
    },
    {
      text: "Scale Operations",
      icon: <FaChartBar className="text-[#736bff]" />,
      className: "bottom-[120px] left-[80px]",
      delay: "3s",
    },
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-[#0a0a1f] via-[#151535] to-[#1a1a3f] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#736bff] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#736bff] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Why </span>
            <span className="text-[#736bff]">RankAI</span>
          </h2>
          <p className="text-white/70 text-lg max-w-4xl mx-auto leading-relaxed">
            With RankAI, discover innovative ways to streamline tasks across your team.
            Build seamless automation strategies, improve productivity, and create
            intelligent workflows enriched with AI modules.
          </p>
        </div>

        {/* SVG Diagram */}
        <div className="relative max-w-4xl mx-auto">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 800 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Concentric arcs */}
            {[50, 90, 130, 170, 210].map((y, i) => (
              <path
                key={i}
                d={`M ${100 + i * 20} ${300 + i * 20} Q 400 ${y}, ${700 - i * 20} ${300 + i * 20}`}
                stroke="url(#gradient1)"
                strokeWidth="2"
                fill="none"
                opacity={0.45 - i * 0.05}
              />
            ))}

            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#736bff" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#736bff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#736bff" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Floating Pills */}
          <div className="relative h-[600px]">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`absolute animate-float ${feature.className}`}
                style={{ animationDelay: feature.delay }}
              >
                <div className="bg-gradient-to-r from-[#1a1a3f] to-[#252550] border border-[#736bff]/30 rounded-full px-6 py-3 flex items-center space-x-2 backdrop-blur-sm hover:border-[#736bff]/60 transition-all">
                  <span className="text-white/90 text-sm font-medium">{feature.text}</span>
                  {feature.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
