import React, { useState } from 'react';
import { initialGear } from '../data/gear';
import { GearItem, MaintenanceLog } from '../types';
import GearRentalClientView from './av/GearRentalClientView';
import GearRentalAdminView from './av/GearRentalAdminView';

const AVServices: React.FC = () => {
    const [isAdminView, setIsAdminView] = useState(false);
    const [gearInventory, setGearInventory] = useState<GearItem[]>(initialGear);

    const updateGearItem = (updatedItem: GearItem) => {
        setGearInventory(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    };

    const addMaintenanceLog = (gearId: number, log: Omit<MaintenanceLog, 'date'>) => {
        const newLog: MaintenanceLog = {
            ...log,
            date: new Date().toLocaleDateString(),
        };
        setGearInventory(prev => prev.map(item => 
            item.id === gearId 
                ? { ...item, maintenanceLogs: [newLog, ...item.maintenanceLogs] }
                : item
        ));
    };

    return (
        <section id="av-services" className="py-24 bg-brand-primary/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-text">A/V Production & Gear Management</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto font-cursive text-brand-cursive">A dedicated app for seamless event production and backline services.</p>
                </div>
                
                {/* View Toggle */}
                <div className="max-w-md mx-auto mb-12 flex justify-center bg-brand-secondary p-1 rounded-lg">
                    <button
                        onClick={() => setIsAdminView(false)}
                        className={`w-1/2 py-2 px-4 rounded-md font-bold transition-colors duration-300 ${!isAdminView ? 'bg-brand-primary shadow' : 'text-gray-500 hover:bg-brand-primary/50'}`}
                        aria-pressed={!isAdminView}
                    >
                        Client View
                    </button>
                    <button
                        onClick={() => setIsAdminView(true)}
                        className={`w-1/2 py-2 px-4 rounded-md font-bold transition-colors duration-300 ${isAdminView ? 'bg-brand-primary shadow' : 'text-gray-500 hover:bg-brand-primary/50'}`}
                        aria-pressed={isAdminView}
                    >
                        Admin View
                    </button>
                </div>

                {/* Conditional View Rendering */}
                <div>
                    {isAdminView ? (
                        <GearRentalAdminView 
                            gearInventory={gearInventory}
                            onUpdateGear={updateGearItem}
                            onAddMaintenanceLog={addMaintenanceLog}
                        />
                    ) : (
                        <GearRentalClientView 
                            gearInventory={gearInventory}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default AVServices;
