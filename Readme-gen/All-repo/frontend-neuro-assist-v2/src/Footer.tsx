export const MedicalFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t border-border py-6">
      <div className="container mx-auto text-center">
        <p className="text-muted-foreground text-sm mb-2">
          © {currentYear} Stroke Assessment. All Rights Reserved.
        </p>
        <p className="text-xs text-muted-foreground italic">
          Thank you for prioritizing your health and taking proactive steps
          towards wellness.
        </p>
      </div>
    </footer>
  );
};

export default MedicalFooter;
