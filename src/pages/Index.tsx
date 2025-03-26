import React, { useState, useEffect } from 'react';
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
import { Checkbox } from "@/components/ui/checkbox";
import { saveFormDataForEmbed } from "@/utils/embedHelper";
import { saveSubmissionToFile } from '@/utils/submissionHelper';

// Define the storage device type
interface StorageDevice {
  id: string;
  name: string;
  type: 'Liquid' | 'Gaseous';
  location: 'Indoor' | 'Outdoor';
  sprinklers?: boolean;
  exhaustedEnclosure?: boolean;
  quantity: string;
  maxPressure: string;
  maxDiameter: string;
}

// Define the fueling equipment type
interface FuelingEquipment {
  id: string;
  name: string;
  location: 'Indoor' | 'Outdoor';
  dispensedAs: 'Liquid' | 'Gaseous';
  publicAccess: 'Public' | 'Nonpublic';
}

// Define the preferences type
interface Preferences {
  approach: 'Prescriptive' | 'Performance' | 'Both (or unsure)';
  mobileFeatures: boolean;
  undergroundType: 'Some underground' | 'All above';
  fuelingCapacity: boolean;
  fuelCells: boolean;
  h2Production: boolean;
  combustion: boolean;
  specialAtmospheres: boolean;
  metalHydrideStorage: boolean;
}

const Index = () => {
  const [preferences, setPreferences] = useState<Preferences>({
    approach: 'Prescriptive',
    mobileFeatures: false,
    undergroundType: 'All above',
    fuelingCapacity: false,
    fuelCells: false,
    h2Production: false,
    combustion: false,
    specialAtmospheres: false,
    metalHydrideStorage: false,
  });

  const [storageDevices, setStorageDevices] = useState<StorageDevice[]>([]);
  const [fuelingEquipments, setFuelingEquipments] = useState<FuelingEquipment[]>([]);

  // Add effect to save form data whenever it changes
  useEffect(() => {
    const formData = {
      preferences,
      storageDevices,
      fuelingEquipments
    };
    saveFormDataForEmbed(formData);
  }, [preferences, storageDevices, fuelingEquipments]);

  const handleToggleChange = (key: keyof Preferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleUndergroundChange = (value: 'Some underground' | 'All above') => {
    setPreferences(prev => ({
      ...prev,
      undergroundType: value
    }));
  };

  const handleApproachChange = (value: 'Prescriptive' | 'Performance' | 'Both (or unsure)') => {
    setPreferences(prev => ({
      ...prev,
      approach: value
    }));
  };

  const addStorageDevice = () => {
    const newDevice: StorageDevice = {
      id: `device-${Date.now()}`,
      name: `Storage Device ${storageDevices.length + 1}`,
      type: 'Gaseous',
      location: 'Outdoor',
      sprinklers: false,
      exhaustedEnclosure: false,
      quantity: '',
      maxPressure: '',
      maxDiameter: '',
    };
    setStorageDevices(prev => [...prev, newDevice]);
    toast.success("Storage device added");
  };

  const updateStorageDevice = (id: string, field: keyof StorageDevice, value: any) => {
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

  const addFuelingEquipment = () => {
    const newEquipment: FuelingEquipment = {
      id: `equipment-${Date.now()}`,
      name: `Fueling Equipment ${fuelingEquipments.length + 1}`,
      location: 'Outdoor',
      dispensedAs: 'Gaseous',
      publicAccess: 'Nonpublic',
    };
    setFuelingEquipments(prev => [...prev, newEquipment]);
    toast.success("Fueling equipment added");
  };

  const updateFuelingEquipment = (id: string, field: keyof FuelingEquipment, value: any) => {
    setFuelingEquipments(prev => 
      prev.map(equipment => 
        equipment.id === id ? { ...equipment, [field]: value } : equipment
      )
    );
  };

  const removeFuelingEquipment = (id: string) => {
    setFuelingEquipments(prev => prev.filter(equipment => equipment.id !== id));
    toast.info("Fueling equipment removed");
  };

  const handleReset = () => {
    setPreferences({
      approach: 'Prescriptive',
      mobileFeatures: false,
      undergroundType: 'All above',
      fuelingCapacity: false,
      fuelCells: false,
      h2Production: false,
      combustion: false,
      specialAtmospheres: false,
      metalHydrideStorage: false,
    });
    setStorageDevices([]);
    setFuelingEquipments([]);
    toast.info("All inputs have been reset to default values");
  };

  const handleSave = () => {
    const formData = {
      preferences,
      storageDevices,
      fuelingEquipments,
      timestamp: new Date().toISOString(),
    };
    saveFormDataForEmbed(formData);
    saveSubmissionToFile(formData);
    toast.success("Your facility inputs have been saved successfully");
    console.log("Saved facility inputs:", formData);
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
                  Select all features that apply to facility
                </p>
                <div className="space-y-2">
                  <div className="py-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <Label htmlFor="approach" className="text-base font-medium">
                        Approach
                      </Label>
                      <Select
                        value={preferences.approach}
                        onValueChange={handleApproachChange}
                      >
                        <SelectTrigger id="approach" className="w-auto min-w-[180px]">
                          <SelectValue placeholder="Select approach" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Prescriptive">Prescriptive</SelectItem>
                          <SelectItem value="Performance">Performance</SelectItem>
                          <SelectItem value="Both (or unsure)">Both (or unsure)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <ToggleInput
                    id="mobileFeatures"
                    label="Mobile Features"
                    defaultValue={preferences.mobileFeatures}
                    onChange={(value) => handleToggleChange('mobileFeatures', value)}
                  />
                  <Separator />
                  
                  <div className="py-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <Label htmlFor="undergroundType" className="text-base font-medium">
                        Underground Hydrogen Features (New or Existing)
                      </Label>
                      <Select
                        value={preferences.undergroundType}
                        onValueChange={handleUndergroundChange}
                      >
                        <SelectTrigger id="undergroundType" className="w-auto min-w-[150px]">
                          <SelectValue placeholder="Select underground type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Some underground">Some underground</SelectItem>
                          <SelectItem value="All above">All above</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Separator />
                  <ToggleInput
                    id="fuelingCapacity"
                    label="Fueling Capacity (Chap 10, 11)"
                    defaultValue={preferences.fuelingCapacity}
                    onChange={(value) => handleToggleChange('fuelingCapacity', value)}
                  />
                  <Separator />
                  <ToggleInput
                    id="fuelCells"
                    label="Fuel Cells (Chap 12)"
                    defaultValue={preferences.fuelCells}
                    onChange={(value) => handleToggleChange('fuelCells', value)}
                  />
                  <Separator />
                  <ToggleInput
                    id="h2Production"
                    label="H2 Production (Chap 13)"
                    defaultValue={preferences.h2Production}
                    onChange={(value) => handleToggleChange('h2Production', value)}
                  />
                  <Separator />
                  <ToggleInput
                    id="combustion"
                    label="Combustion (Chap 14)"
                    defaultValue={preferences.combustion}
                    onChange={(value) => handleToggleChange('combustion', value)}
                  />
                  <Separator />
                  <ToggleInput
                    id="specialAtmospheres"
                    label="Special Atmospheres (Chap 15)"
                    defaultValue={preferences.specialAtmospheres}
                    onChange={(value) => handleToggleChange('specialAtmospheres', value)}
                  />
                  <Separator />
                  <ToggleInput
                    id="metalHydrideStorage"
                    label="Metal Hydride Storage"
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
                          
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`type-${device.id}`}>Type</Label>
                            <Select
                              value={device.type}
                              onValueChange={(value) => updateStorageDevice(device.id, 'type', value)}
                            >
                              <SelectTrigger id={`type-${device.id}`} className="w-auto min-w-[120px]">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Liquid">Liquid</SelectItem>
                                <SelectItem value="Gaseous">Gaseous</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex items-center justify-between">
                            <Label htmlFor={`location-${device.id}`}>In/outdoor</Label>
                            <Select
                              value={device.location}
                              onValueChange={(value) => updateStorageDevice(device.id, 'location', value)}
                            >
                              <SelectTrigger id={`location-${device.id}`} className="w-auto min-w-[120px]">
                                <SelectValue placeholder="Select location" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Indoor">Indoor</SelectItem>
                                <SelectItem value="Outdoor">Outdoor</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {device.location === 'Indoor' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`sprinklers-${device.id}`} 
                                  checked={device.sprinklers}
                                  onCheckedChange={(checked) => 
                                    updateStorageDevice(device.id, 'sprinklers', checked === true)
                                  }
                                />
                                <Label htmlFor={`sprinklers-${device.id}`}>Sprinklers</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`exhausted-${device.id}`} 
                                  checked={device.exhaustedEnclosure}
                                  onCheckedChange={(checked) => 
                                    updateStorageDevice(device.id, 'exhaustedEnclosure', checked === true)
                                  }
                                />
                                <Label htmlFor={`exhausted-${device.id}`}>Exhausted Enclosure</Label>
                              </div>
                            </div>
                          )}
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <Label htmlFor={`quantity-${device.id}`}>Quantity</Label>
                              <div className="flex items-center">
                                <Input 
                                  id={`quantity-${device.id}`}
                                  value={device.quantity}
                                  onChange={(e) => updateStorageDevice(device.id, 'quantity', e.target.value)}
                                  className="w-auto min-w-[150px]"
                                />
                                <div className="ml-2 bg-muted px-2 py-1 rounded text-sm font-medium">
                                  {device.type === 'Liquid' ? 'gal' : 'scf'}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <Label htmlFor={`pressure-${device.id}`}>Max operating pressure (psig)</Label>
                              <Input 
                                id={`pressure-${device.id}`}
                                value={device.maxPressure}
                                onChange={(e) => updateStorageDevice(device.id, 'maxPressure', e.target.value)}
                                className="w-auto min-w-[150px]"
                              />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <Label htmlFor={`diameter-${device.id}`}>Max pipe inner diameter (in)</Label>
                              <Input 
                                id={`diameter-${device.id}`}
                                value={device.maxDiameter}
                                onChange={(e) => updateStorageDevice(device.id, 'maxDiameter', e.target.value)}
                                className="w-auto min-w-[150px]"
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

          {preferences.fuelingCapacity && (
            <motion.div variants={item}>
              <Card className="overflow-hidden card-hover">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Fueling Equipment</h2>
                  
                  {fuelingEquipments.length > 0 && (
                    <div className="space-y-6 mb-6">
                      {fuelingEquipments.map((equipment) => (
                        <div key={equipment.id} className="border rounded-lg p-4 relative">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute top-2 right-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                            onClick={() => removeFuelingEquipment(equipment.id)}
                          >
                            <Trash2 size={18} />
                          </Button>

                          <div className="grid gap-4">
                            <div>
                              <Label htmlFor={`name-${equipment.id}`}>Name</Label>
                              <Input 
                                id={`name-${equipment.id}`}
                                value={equipment.name}
                                onChange={(e) => updateFuelingEquipment(equipment.id, 'name', e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <Label htmlFor={`location-${equipment.id}`}>In/outdoor</Label>
                              <Select
                                value={equipment.location}
                                onValueChange={(value) => updateFuelingEquipment(equipment.id, 'location', value)}
                              >
                                <SelectTrigger id={`location-${equipment.id}`} className="w-auto min-w-[120px]">
                                  <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Indoor">Indoor</SelectItem>
                                  <SelectItem value="Outdoor">Outdoor</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <Label htmlFor={`dispensed-${equipment.id}`}>Dispensed as</Label>
                              <Select
                                value={equipment.dispensedAs}
                                onValueChange={(value) => updateFuelingEquipment(equipment.id, 'dispensedAs', value)}
                              >
                                <SelectTrigger id={`dispensed-${equipment.id}`} className="w-auto min-w-[120px]">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Liquid">Liquid</SelectItem>
                                  <SelectItem value="Gaseous">Gaseous</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <Label htmlFor={`access-${equipment.id}`}>Public Access</Label>
                              <Select
                                value={equipment.publicAccess}
                                onValueChange={(value) => updateFuelingEquipment(equipment.id, 'publicAccess', value)}
                              >
                                <SelectTrigger id={`access-${equipment.id}`} className="w-auto min-w-[120px]">
                                  <SelectValue placeholder="Select access type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Public">Public</SelectItem>
                                  <SelectItem value="Nonpublic">Nonpublic</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <Button 
                    onClick={addFuelingEquipment}
                    className="w-full transition-all duration-300"
                  >
                    Add Fueling Equipment
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

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
              Submit Inputs
            </Button>
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
