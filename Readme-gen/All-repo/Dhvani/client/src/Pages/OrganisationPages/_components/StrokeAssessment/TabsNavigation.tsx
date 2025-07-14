import { cn } from "@/lib/utils";
import { User, Heart, Upload, AlertCircle, FormInputIcon } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";

interface TabsNavigationProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    }

    const TabsNavigation = ({ activeTab, setActiveTab }: TabsNavigationProps) => {
    const { theme } = useThemeStore();
    const tabs = [
        { id: "personal", label: "1.) Details", icon: <User className="w-5 h-5" /> },
        { id: "vitals", label: "2.) Vitals", icon: <Heart className="w-5 h-5" /> },
        { id: "symptoms", label: "3.) Symptoms", icon: <AlertCircle className="w-5 h-5" /> },
        { id: "exclusion", label: "4.) Exclusion", icon: <FormInputIcon className="w-5 h-5" /> },
        { id: "upload", label: "5.) Upload", icon: <Upload className="w-5 h-5" /> },
    ];

    return (
        <div className="flex items-center justify-center my-4">
        <div className={`rounded-xl p-1 flex w-full max-w-4xl shadow-sm ${
            theme === "light" ? "bg-gray-100" : "bg-base-300"
        }`}>
            {tabs.map(tab => (
            <button
                key={tab.id}
                className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 text-xs font-medium rounded-lg py-3 px-2 transition-all",
                activeTab === tab.id
                    ? theme === "light"
                    ? "bg-white text-gray-800 shadow"
                    : "bg-base-100 text-primary shadow"
                    : theme === "light"
                    ? "text-gray-600 hover:text-gray-800"
                    : "text-base-content/70 hover:text-primary"
                )}
                onClick={() => setActiveTab(tab.id)}
            >
                {tab.icon}
                <span>{tab.label}</span>
            </button>
            ))}
        </div>
        </div>
    );
};

export default TabsNavigation;