// Fix: Import React to make React.ElementType available.
import React from 'react';

export interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatarUrl: string;
}

export interface Vision {
  creativeVision: string;
  missionStatement: string;
  keyFeatures: string[];
  imageUrl?: string;
}

export type GearStatus = 'Available' | 'Rented' | 'Maintenance';

export interface MaintenanceLog {
  date: string;
  notes: string;
  technician: string;
}

export interface GearItem {
  id: number;
  name: string;
  type: 'Instrument' | 'Amplifier' | 'PA' | 'Accessory';
  brand: string;
  condition: 'New' | 'Good' | 'Fair' | 'Poor';
  status: GearStatus;
  imageUrl: string;
  maintenanceLogs: MaintenanceLog[];
}
