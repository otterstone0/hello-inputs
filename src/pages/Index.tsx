
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
    electrolyzer: false,
    renewableEnergy: true,
    carbonCapture: false,
    heatRecovery: true,
    pressurizedStorage: false,
    liquidStorage: true,
    undergroundStorage: false,
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
      electrolyzer: false,
      renewableEnergy: true,
      carbonCapture: false,
      heatRecovery: true,
      pressurizedStorage: false,
      liquidStorage: true,
      undergroundStorage: false,
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
                <div className="space-y-2">
                  <ToggleInput
                    id="electrolyzer"
                    label="Electrolyzer System"
                    description="Include an electrolyzer system in your facility"
                    defaultValue={preferences.electrolyzer}
                    onChange={(value) => handleToggleChange('electrolyzer', value)}
                  />
                  <Separator />
                  <ToggleInput
                    id="renewableEnergy"
                    label="Renewable Energy Source"
                    description="Power your facility with renewable energy"
                    defaultValue={preferences.renewableEnergy}
                    onChange={(value) => handleToggleChange('renewableEnergy', value)}
                  />
                  <Separator />
                  <ToggleInput
                    id="carbonCapture"
                    label="Carbon Capture"
                    description="Include carbon capture technology"
                    defaultValue={preferences.carbonCapture}
                    onChange={(value) => handleToggleChange('carbonCapture', value)}
                  />
                  <Separator />
                  <ToggleInput
                    id="heatRecovery"
                    label="Heat Recovery System"
                    description="Recover and utilize waste heat"
                    defaultValue={preferences.heatRecovery}
                    onChange={(value) => handleToggleChange('heatRecovery', value)}
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
                    id="pressurizedStorage"
                    label="Pressurized Storage Tanks"
                    description="Store hydrogen in high-pressure tanks"
                    defaultValue={preferences.pressurizedStorage}
                    onChange={(value) => handleToggleChange('pressurizedStorage', value)}
                  />
                  <Separator />
                  <ToggleInput
                    id="liquidStorage"
                    label="Liquid Hydrogen Storage"
                    description="Store hydrogen in its liquid form at cryogenic temperatures"
                    defaultValue={preferences.liquidStorage}
                    onChange={(value) => handleToggleChange('liquidStorage', value)}
                  />
                  <Separator />
                  <ToggleInput
                    id="undergroundStorage"
                    label="Underground Storage"
                    description="Store hydrogen in underground caverns or depleted gas fields"
                    defaultValue={preferences.undergroundStorage}
                    onChange={(value) => handleToggleChange('undergroundStorage', value)}
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
