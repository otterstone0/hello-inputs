
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import ToggleInput from '@/components/ToggleInput';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";

// Define the storage device type
interface StorageDevice {
  id: string;
  name: string;
  type: 'Liquid' | 'Gaseous';
  quantity: string;
  maxPressure: string;
  maxDiameter: string;
}

const Index = () => {
  const [preferences, setPreferences] = useState({
    mobileFeatures: false,
    undergroundType: 'Some underground',
    fuelingCapacity: false,
    fuelCells: false,
    h2Production: false,
    combustion: false,
    specialAtmospheres: false,
    metalHydrideStorage: false,
  });

  const [storageDevices, setStorageDevices] = useState<StorageDevice[]>([]);

  const handleToggleChange = (key: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleUndergroundChange = (value: string) => {
    setPreferences(prev => ({
      ...prev,
      undergroundType: value
    }));
  };

  const addStorageDevice = () => {
    const newDevice: StorageDevice = {
      id: `device-${Date.now()}`,
      name: `Storage Device ${storageDevices.length + 1}`,
      type: 'Gaseous',
      quantity: '',
      maxPressure: '',
      maxDiameter: '',
    };
    setStorageDevices(prev => [...prev, newDevice]);
    toast.success("Storage device added");
  };

  const updateStorageDevice = (id: string, field: keyof StorageDevice, value: string) => {
    setStorageDevices(prev => 
      prev.map(device => 
        device.id === id ? { ...device, [field]: value } : device
      )
    );
  };

  const removeStorageDevice = (id: string) => {
    setStorageDevices(prev => prev.filter(device => device.id !== id));
    toast.info("Storage device removed");
  };

  const handleReset = () => {
    setPreferences({
      mobileFeatures: false,
      undergroundType: 'Some underground',
      fuelingCapacity: false,
      fuelCells: false,
      h2Production: false,
      combustion: false,
      specialAtmospheres: false,
      metalHydrideStorage: false,
    });
    setStorageDevices([]);
    toast.info("All inputs have been reset to default values");
  };

  const handleSave = () => {
    toast.success("Your facility inputs have been saved successfully");
    console.log("Saved facility inputs:", { preferences, storageDevices });
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
                  
                  <div className="py-4">
                    <Label htmlFor="undergroundType" className="text-base font-medium mb-1.5 block">
                      Underground Hydrogen Features (New or Existing)
                    </Label>
                    <Select
                      value={preferences.undergroundType}
                      onValueChange={handleUndergroundChange}
                    >
                      <SelectTrigger id="undergroundType" className="w-full">
                        <SelectValue placeholder="Select underground type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Some underground">Some underground</SelectItem>
                        <SelectItem value="All above">All above</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground mt-1">Select if your facility has underground features</p>
                  </div>
                  
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
                  <Separator />
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

          <motion.div variants={item}>
            <Card className="overflow-hidden card-hover">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Storage Devices</h2>
                
                {storageDevices.length > 0 && (
                  <div className="space-y-6 mb-6">
                    {storageDevices.map((device) => (
                      <div key={device.id} className="border rounded-lg p-4 relative">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                          onClick={() => removeStorageDevice(device.id)}
                        >
                          <Trash2 size={18} />
                        </Button>

                        <div className="grid gap-4">
                          <div>
                            <Label htmlFor={`name-${device.id}`}>Name</Label>
                            <Input 
                              id={`name-${device.id}`}
                              value={device.name}
                              onChange={(e) => updateStorageDevice(device.id, 'name', e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor={`type-${device.id}`}>Type</Label>
                            <Select
                              value={device.type}
                              onValueChange={(value) => updateStorageDevice(device.id, 'type', value)}
                            >
                              <SelectTrigger id={`type-${device.id}`} className="mt-1">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Liquid">Liquid</SelectItem>
                                <SelectItem value="Gaseous">Gaseous</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor={`quantity-${device.id}`}>Quantity</Label>
                              <Input 
                                id={`quantity-${device.id}`}
                                value={device.quantity}
                                onChange={(e) => updateStorageDevice(device.id, 'quantity', e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor={`pressure-${device.id}`}>Max Operating Pressure (psig)</Label>
                              <Input 
                                id={`pressure-${device.id}`}
                                value={device.maxPressure}
                                onChange={(e) => updateStorageDevice(device.id, 'maxPressure', e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor={`diameter-${device.id}`}>Max pipe inner diameter (in)</Label>
                              <Input 
                                id={`diameter-${device.id}`}
                                value={device.maxDiameter}
                                onChange={(e) => updateStorageDevice(device.id, 'maxDiameter', e.target.value)}
                                className="mt-1"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <Button 
                  onClick={addStorageDevice}
                  className="w-full transition-all duration-300"
                >
                  Add Storage Device
                </Button>
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
