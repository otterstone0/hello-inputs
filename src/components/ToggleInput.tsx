
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface ToggleInputProps {
  id: string;
  label: string;
  description?: string;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
  className?: string;
}

const ToggleInput = ({
  id,
  label,
  description,
  defaultValue = false,
  onChange,
  className,
}: ToggleInputProps) => {
  const [value, setValue] = useState(defaultValue);

  const handleToggle = () => {
    const newValue = !value;
    setValue(newValue);
    
    if (onChange) {
      onChange(newValue);
    }
    
    toast.success(`${label} set to ${newValue ? 'Yes' : 'No'}`);
  };

  return (
    <div className={cn("group py-4", className)}>
      <div className="flex items-center justify-between mb-1.5">
        <label
          htmlFor={id}
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={value}
          onClick={handleToggle}
          className="focus-ring rounded-full"
        >
          <div className={cn("toggle-track", value && "active")}>
            <motion.div 
              className="toggle-thumb"
              initial={false}
              animate={{ 
                x: value ? 24 : 4 
              }}
              transition={{ 
                type: "spring", 
                stiffness: 500, 
                damping: 30 
              }}
            />
          </div>
        </button>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default ToggleInput;
