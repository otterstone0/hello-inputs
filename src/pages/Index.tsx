
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
    notifications: false,
    darkMode: false,
    analytics: true,
    autoUpdates: true,
    soundEffects: false,
    highContrast: false,
    dataSync: true,
    locationServices: false,
  });

  const handleToggleChange = (key: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleReset = () => {
    setPreferences({
      notifications: false,
      darkMode: false,
      analytics: true,
      autoUpdates: true,
      soundEffects: false,
      highContrast: false,
      dataSync: true,
      locationServices: false,
    });
    toast.info("All preferences have been reset to default values");
  };

  const handleSave = () => {
    toast.success("Your preferences have been saved successfully");
    console.log("Saved preferences:", preferences);
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
                <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
                <div className="space-y-2">
                  <ToggleInput
                    id="notifications"
                    label="Enable Notifications"
                    description="Receive important updates and alerts"
                    defaultValue={preferences.notifications}
                    onChange={(value) => handleToggleChange('notifications', value)}
                  />
                  <Separator />
                  <ToggleInput
                    id="soundEffects"
                    label="Sound Effects"
                    description="Play sounds for notifications and interactions"
                    defaultValue={preferences.soundEffects}
                    onChange={(value) => handleToggleChange('soundEffects', value)}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="overflow-hidden card-hover">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Appearance</h2>
                <div className="space-y-2">
                  <ToggleInput
                    id="darkMode"
                    label="Dark Mode"
                    description="Switch to a darker color scheme"
                    defaultValue={preferences.darkMode}
                    onChange={(value) => handleToggleChange('darkMode', value)}
                  />
                  <Separator />
                  <ToggleInput
                    id="highContrast"
                    label="High Contrast"
                    description="Increase contrast for better visibility"
                    defaultValue={preferences.highContrast}
                    onChange={(value) => handleToggleChange('highContrast', value)}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="overflow-hidden card-hover">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Privacy & Data</h2>
                <div className="space-y-2">
                  <ToggleInput
                    id="analytics"
                    label="Analytics"
                    description="Help improve our service with anonymous usage data"
                    defaultValue={preferences.analytics}
                    onChange={(value) => handleToggleChange('analytics', value)}
                  />
                  <Separator />
                  <ToggleInput
                    id="locationServices"
                    label="Location Services"
                    description="Allow access to your location for relevant features"
                    defaultValue={preferences.locationServices}
                    onChange={(value) => handleToggleChange('locationServices', value)}
                  />
                  <Separator />
                  <ToggleInput
                    id="dataSync"
                    label="Data Synchronization"
                    description="Sync your preferences across devices"
                    defaultValue={preferences.dataSync}
                    onChange={(value) => handleToggleChange('dataSync', value)}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="overflow-hidden card-hover">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">System</h2>
                <div className="space-y-2">
                  <ToggleInput
                    id="autoUpdates"
                    label="Automatic Updates"
                    description="Keep the application up to date automatically"
                    defaultValue={preferences.autoUpdates}
                    onChange={(value) => handleToggleChange('autoUpdates', value)}
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
              Save Preferences
            </Button>
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
