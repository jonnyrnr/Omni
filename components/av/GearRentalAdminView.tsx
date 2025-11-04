import React, { useState } from 'react';
import { GearItem, GearStatus } from '../../types';
import MaintenanceModal from './MaintenanceModal';

const statusColors: Record<GearStatus, string> = {
    Available: 'bg-green-100 text-green-800',
    Rented: 'bg-yellow-100 text-yellow-800',
    Maintenance: 'bg-red-100 text-red-800',
};

const GearRentalAdminView: React.FC<{
    gearInventory: GearItem[];
    onUpdateGear: (updatedItem: GearItem) => void;
    onAddMaintenanceLog: (gearId: number, log: { notes: string; technician: string }) => void;
}> = ({ gearInventory, onUpdateGear, onAddMaintenanceLog }) => {
    const [selectedGear, setSelectedGear] = useState<GearItem | null>(null);

    const handleStatusChange = (item: GearItem, newStatus: GearStatus) => {
        onUpdateGear({ ...item, status: newStatus });
    };

    return (
        <div className="bg-brand-primary p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold font-display text-brand-text mb-6">Gear Inventory Management</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {gearInventory.map(item => (
                            <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.condition}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                        value={item.status}
                                        onChange={(e) => handleStatusChange(item, e.target.value as GearStatus)}
                                        className={`text-xs font-semibold rounded-full px-3 py-1 border-transparent focus:ring-2 focus:ring-brand-accent focus:outline-none ${statusColors[item.status]}`}
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Rented">Rented</option>
                                        <option value="Maintenance">Maintenance</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => setSelectedGear(item)}
                                        className="text-brand-accent hover:text-brand-accent-dark"
                                    >
                                        Maintenance Log
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedGear && (
                <MaintenanceModal
                    gearItem={selectedGear}
                    onClose={() => setSelectedGear(null)}
                    onAddLog={onAddMaintenanceLog}
                />
            )}
        </div>
    );
};

export default GearRentalAdminView;
