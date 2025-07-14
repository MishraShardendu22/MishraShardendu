import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";


interface reportProps {
  prevTab: () => void;
}

const Report: React.FC<reportProps> = ({
  prevTab,
}) => {
  return (
    <div>
      
      <CardFooter className="flex justify-between pt-2 pb-4">
        <Button
          variant="outline"
          onClick={prevTab}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
      </CardFooter>
    </div>
  );
};

export default Report;
