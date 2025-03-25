
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import ToggleInput from '@/components/ToggleInput';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  const [preferences, setPreferences] = useState({
    mobileFeatures: false,
    undergroundHydrogenFeatures: false,
    fuelingCapacity: false,
    fuelCells: false,
    h2Production: false,
    combustion: false,
    specialAtmospheres: false,
    metalHydrideStorage: false,
  });

  const handleToggleChange = (key: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleReset = () => {
    setPreferences({
      mobileFeatures: false,
      undergroundHydrogenFeatures: false,
      fuelingCapacity: false,
      fuelCells: false,
      h2Production: false,
      combustion: false,
      specialAtmospheres: false,
      metalHydrideStorage: false,
    });
    toast.info("All inputs have been reset to default values");
  };

  const handleSave = () => {
    toast.success("Your facility inputs have been saved successfully");
    console.log("Saved facility inputs:", preferences);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 md:px-6 py-6">
        <motion.div 
          className="max-w-2xl mx-auto space-y-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <Card className="overflow-hidden card-hover">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Main Inputs</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Does your facility have: (select all that apply)<br />
                  If you are unsure, leave empty (defaults as true)
                </p>
                <div className="space-y-2">
                  <ToggleInput
                    id="mobileFeatures"
                    label="Mobile Features"
                    description="Include mobile features in your facility"
                    defaultValue={preferences.mobileFeatures}
                    onChange={(value) => handleToggleChange('mobileFeatures', value)}
                  />
                  <Separator />
                  <ToggleInput
                    id="undergroundHydrogenFeatures"
                    label="Underground Hydrogen Features (New or Existing)"
                    description="Include underground hydrogen storage and distribution features"
                    defaultValue={preferences.undergroundHydrogenFeatures}
                    onChange={(value) => handleToggleChange('undergroundHydrogenFeatures', value)}
                  />
                  <Separator />
                  <ToggleInput
                    id="fuelingCapacity"
                    label="Fueling Capacity (Chap 10, 11)"
                    description="Include hydrogen fueling capabilities"
                    defaultValue={preferences.fuelingCapacity}
                    onChange={(value) => handleToggleChange('fuelingCapacity', value)}
                  />
                  <Separator />
                  <ToggleInput
                    id="fuelCells"
                    label="Fuel Cells (Chap 12)"
                    description="Include fuel cell technologies"
                    defaultValue={preferences.fuelCells}
                    onChange={(value) => handleToggleChange('fuelCells', value)}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="overflow-hidden card-hover">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Storage Devices</h2>
                <div className="space-y-2">
                  <ToggleInput
                    id="h2Production"
                    label="H2 Production (Chap 13)"
                    description="Include hydrogen production capabilities"
                    defaultValue={preferences.h2Production}
                    onChange={(value) => handleToggleChange('h2Production', value)}
                  />
                  <Separator />
                  <ToggleInput
                    id="combustion"
                    label="Combustion (Chap 14)"
                    description="Include hydrogen combustion systems"
                    defaultValue={preferences.combustion}
                    onChange={(value) => handleToggleChange('combustion', value)}
                  />
                  <Separator />
                  <ToggleInput
                    id="specialAtmospheres"
                    label="Special Atmospheres (Chap 15)"
                    description="Include systems for special hydrogen atmospheres"
                    defaultValue={preferences.specialAtmospheres}
                    onChange={(value) => handleToggleChange('specialAtmospheres', value)}
                  />
                  <Separator />
                  <ToggleInput
                    id="metalHydrideStorage"
                    label="Metal Hydride Storage"
                    description="Store hydrogen in solid-state metal hydride materials"
                    defaultValue={preferences.metalHydrideStorage}
                    onChange={(value) => handleToggleChange('metalHydrideStorage', value)}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div 
            variants={item}
            className="flex justify-between pt-4"
          >
            <Button 
              variant="outline" 
              onClick={handleReset}
              className="transition-all duration-300 hover:bg-destructive/10"
            >
              Reset to Defaults
            </Button>
            <Button 
              onClick={handleSave}
              className="transition-all duration-300"
            >
              Save Inputs
            </Button>
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
