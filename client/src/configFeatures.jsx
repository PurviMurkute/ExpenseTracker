import {
  BadgeIndianRupee,
  ShieldPlus,
  SwatchBook,
  ChartColumnBig,
  LaptopMinimalCheck,
  FileHeart,
} from "lucide-react";

const FEATURESDATA = [
  {
    icon: <BadgeIndianRupee color="#2a2a32" className="h-10 w-10" />,
    title: "100% Free",
    description: "No hidden charges",
    className: "bg-red-300 text-red-800",
  },
  {
    icon: <ShieldPlus color="#2a2a32" className="h-10 w-10" />,
    title: "Secure & Private",
    description: "Your data stays safe with you",
    className: "bg-blue-300 text-blue-800",
  },
  {
    icon: <SwatchBook color="#2a2a32" className="h-10 w-10" />,
    title: "Simple & Intuitive",
    description: "Designed for everyone",
    className: "bg-cyan-300 text-cyan-800",
  },
  {
    icon: <LaptopMinimalCheck color="#2a2a32" className="h-10 w-10" />,
    title: "Visual Insights",
    description: "Understand your spending habits",
    className: "bg-sky-300 text-sky-800",
  },
  {
    icon: <FileHeart color="#2a2a32" className="h-10 w-10" />,
    title: "Access Anywhere",
    description: "Mobile-friendly and responsive",
    className: "bg-emerald-300 text-emerald-800",
  },
  {
    icon: <ChartColumnBig color="#2a2a32" className="h-10 w-10" />,
    title: "Quick & Easy Setup",
    description: "Start tracking in minutes",
    className: "bg-fuchsia-300 text-fuchsia-800",
  },
];

const HEADING = "Features of ExpenseDiary";

export { FEATURESDATA, HEADING };
