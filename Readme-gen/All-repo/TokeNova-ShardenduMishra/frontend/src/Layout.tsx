import { ReactNode } from "react";
import Meta from "./components/Helmet";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div>
      <Meta
        author="Team Parashuram"
        title="Neuro-Assistant | Acumant" 
        keywords="neuro-assistant, stroke detection, AI in healthcare, medical imaging, emergency response, stroke management, medical AI, healthcare automation"
        description="Neuro-Assistant is an application designed for physicians to streamline stroke assessment with guided data entry, image uploads, and protocol-based analysis." 
      />
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default Container;