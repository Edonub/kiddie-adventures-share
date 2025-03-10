
import { Plus } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import React, { useState } from "react";

interface AddChildFormProps {
  addChild: (age: number) => void;
}

const AddChildForm = ({ addChild }: AddChildFormProps) => {
  const [childAge, setChildAge] = useState<number>(2);

  // Handle the input change to prevent leading zeros
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Parse to number and back to string to remove leading zeros
    const ageValue = parseInt(value) || 0;
    setChildAge(ageValue);
  };

  const handleAddChild = (e: React.MouseEvent) => {
    e.stopPropagation();
    addChild(childAge);
    setChildAge(2); // Reset age input for next child
  };

  return (
    <div className="flex items-center gap-2 mt-3">
      <div className="flex-1">
        <Input
          type="number"
          min="0"
          max="12"
          value={childAge}
          onChange={handleAgeChange}
          className="w-full"
          placeholder="Edad del niño"
        />
      </div>
      <Button 
        variant="outline"
        onClick={handleAddChild}
        className="whitespace-nowrap"
      >
        <Plus size={16} className="mr-1" />
        Añadir niño
      </Button>
    </div>
  );
};

export default AddChildForm;
