import { cn } from "@/lib/utils";
import React from "react";

interface IWrapper {
  children: React.ReactNode;
  className?: string;
}

const Wrapper = ({ children, className }: IWrapper) => {
  return (
    <div className={cn("max-w-screen-xl mx-auto px-2 sm:px-4", className)}>
      {children}
    </div>
  );
};

export default Wrapper;
