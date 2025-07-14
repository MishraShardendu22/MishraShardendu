import { cn } from "@/lib/utils";
import {
  User,
  Heart,
  Upload,
  AlertCircle,
  FormInputIcon,
} from "lucide-react";

interface TabsNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsNavigation = ({ activeTab, setActiveTab }: TabsNavigationProps) => {
  const tabs = [
    {
      id: "personal",
      label: "1.) Patient Details",
      icon: <User className="h-6 w-6" />,
    },
    {
      id: "vitals",
      label: "2.) Vital Signs",
      icon: <Heart className="h-6 w-6" />,
    },
    {
      id: "symptoms",
      label: "3.) Symptoms",
      icon: <AlertCircle className="h-6 w-6" />,
    },
    {
      id: "exclusion",
      label: "4.) Exclusion",
      icon: <FormInputIcon className="h-6 w-6" />,
    },
    {
      id: "upload",
      label: "5.) Upload",
      icon: <Upload className="h-6 w-6" />,
    },
  ];

  return (
    <div className="flex items-center justify-center my-6">
      <div className="bg-muted rounded-xl p-2 flex w-full max-w-6xl shadow-lg">
        {" "}
        {/* Increased max-w from 4xl to 6xl */}
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "flex flex-col items-center justify-center gap-2 flex-1 text-sm font-medium rounded-lg py-4 px-6 transition-all",
              activeTab === tab.id
                ? "bg-background text-foreground shadow-md scale-105"
                : "text-muted-foreground hover:text-foreground hover:bg-gray-100"
            )}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span className="text-sm font-semibold">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabsNavigation;
