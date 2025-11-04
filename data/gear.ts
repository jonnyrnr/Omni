import { GearItem } from '../types';

export const initialGear: GearItem[] = [
  // Instruments
  {
    id: 1,
    name: "Fender American Stratocaster",
    type: "Instrument",
    brand: "Fender",
    condition: "Good",
    status: "Available",
    imageUrl: "https://picsum.photos/seed/strat/400/300",
    maintenanceLogs: [
      { date: "03/15/2024", notes: "Full setup and string change.", technician: "Sean H." },
      { date: "11/02/2023", notes: "Replaced input jack.", technician: "Jonny W." }
    ],
  },
  {
    id: 2,
    name: "Gibson Les Paul Standard",
    type: "Instrument",
    brand: "Gibson",
    condition: "Good",
    status: "Rented",
    imageUrl: "https://picsum.photos/seed/lespaul/400/300",
    maintenanceLogs: [
      { date: "02/20/2024", notes: "Cleaned electronics, new strings.", technician: "Sean H." },
    ],
  },
  {
    id: 3,
    name: "Fender P-Bass",
    type: "Instrument",
    brand: "Fender",
    condition: "Fair",
    status: "Available",
    imageUrl: "https://picsum.photos/seed/pbass/400/300",
    maintenanceLogs: [],
  },
   {
    id: 4,
    name: "Nord Stage 3 Keyboard",
    type: "Instrument",
    brand: "Nord",
    condition: "New",
    status: "Available",
    imageUrl: "https://picsum.photos/seed/nord/400/300",
    maintenanceLogs: [
       { date: "05/01/2024", notes: "Firmware update.", technician: "Jonny W." }
    ],
  },
   {
    id: 5,
    name: "Pearl Export Drum Kit",
    type: "Instrument",
    brand: "Pearl",
    condition: "Good",
    status: "Maintenance",
    imageUrl: "https://picsum.photos/seed/drumkit/400/300",
    maintenanceLogs: [
       { date: "05/10/2024", notes: "Replacing snare drum head.", technician: "Sean H." },
       { date: "01/12/2024", notes: "Tuned all toms.", technician: "Sean H." }
    ],
  },

  // Amplifiers
  {
    id: 6,
    name: "Fender Twin Reverb",
    type: "Amplifier",
    brand: "Fender",
    condition: "Good",
    status: "Available",
    imageUrl: "https://picsum.photos/seed/twinreverb/400/300",
    maintenanceLogs: [
      { date: "04/05/2024", notes: "Re-tubed power section.", technician: "Jonny W." },
    ],
  },
  {
    id: 7,
    name: "Marshall JCM800 Head",
    type: "Amplifier",
    brand: "Marshall",
    condition: "Good",
    status: "Available",
    imageUrl: "https://picsum.photos/seed/jcm800/400/300",
    maintenanceLogs: [],
  },
  {
    id: 8,
    name: "Ampeg SVT-CL Bass Head",
    type: "Amplifier",
    brand: "Ampeg",
    condition: "Good",
    status: "Rented",
    imageUrl: "https://picsum.photos/seed/svtcl/400/300",
    maintenanceLogs: [
        { date: "03/01/2024", notes: "Cleaned all pots, no more scratchy knobs.", technician: "Jonny W." }
    ],
  },
    {
    id: 9,
    name: "Marshall 1960A 4x12 Cab",
    type: "Amplifier",
    brand: "Marshall",
    condition: "Fair",
    status: "Available",
    imageUrl: "https://picsum.photos/seed/marshallcab/400/300",
    maintenanceLogs: [
        { date: "12/15/2023", notes: "Repaired tear in tolex.", technician: "Sean H." }
    ],
  },

  // PA System
  {
    id: 10,
    name: "QSC K12.2 Powered Speaker",
    type: "PA",
    brand: "QSC",
    condition: "New",
    status: "Available",
    imageUrl: "https://picsum.photos/seed/qsc12/400/300",
    maintenanceLogs: [],
  },
  {
    id: 11,
    name: "QSC K12.2 Powered Speaker",
    type: "PA",
    brand: "QSC",
    condition: "New",
    status: "Available",
    imageUrl: "https://picsum.photos/seed/qsc12b/400/300",
    maintenanceLogs: [],
  },
  {
    id: 12,
    name: "Behringer X32 Mixer",
    type: "PA",
    brand: "Behringer",
    condition: "Good",
    status: "Available",
    imageUrl: "https://picsum.photos/seed/x32/400/300",
    maintenanceLogs: [
      { date: "02/01/2024", notes: "Updated to latest firmware.", technician: "Jonny W." },
    ],
  },
  
  // Accessories
    {
    id: 13,
    name: "Shure SM58 Microphone",
    type: "Accessory",
    brand: "Shure",
    condition: "Good",
    status: "Available",
    imageUrl: "https://picsum.photos/seed/sm58/400/300",
    maintenanceLogs: [],
  },
  {
    id: 14,
    name: "K&M Mic Stand",
    type: "Accessory",
    brand: "K&M",
    condition: "Good",
    status: "Available",
    imageUrl: "https://picsum.photos/seed/micstand/400/300",
    maintenanceLogs: [],
  },
];
