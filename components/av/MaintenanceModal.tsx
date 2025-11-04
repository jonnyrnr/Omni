import React, { useState } from 'react';
import { GearItem } from '../../types';

const MaintenanceModal: React.FC<{
    gearItem: GearItem;
    onClose: () => void;
    onAddLog: (gearId: number, log: { notes: string; technician: string }) => void;
}> = ({ gearItem, onClose, onAddLog }) => {
    const [notes, setNotes] = useState('');
    const [technician, setTechnician] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!notes.trim() || !technician.trim()) return;
        onAddLog(gearItem.id, { notes, technician });
        setNotes('');
        setTechnician('');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-start">
                    <div>
                        <h2 id="modal-title" className="text-2xl font-bold font-display text-brand-text">{gearItem.name}</h2>
                        <p className="text-gray-500">Maintenance & Repair History</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
                </div>

                {/* Add New Log Form */}
                <form onSubmit={handleSubmit} className="mt-6 p-4 border rounded-lg bg-gray-50">
                    <h3 className="font-bold text-brand-text mb-2">Add New Log Entry</h3>
                    <div className="space-y-3">
                        <textarea
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            placeholder="Describe maintenance performed..."
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-brand-accent focus:outline-none"
                            rows={3}
                            required
                        />
                        <input
                            type="text"
                            value={technician}
                            onChange={e => setTechnician(e.target.value)}
                            placeholder="Technician Name"
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-brand-accent focus:outline-none"
                            required
                        />
                        <button type="submit" className="w-full bg-brand-accent text-white font-bold py-2 rounded-lg hover:bg-brand-accent-dark transition">
                            Save Entry
                        </button>
                    </div>
                </form>

                {/* Log History */}
                <div className="mt-6">
                    <h3 className="font-bold text-brand-text mb-4">History</h3>
                    <div className="space-y-4">
                        {gearItem.maintenanceLogs.length > 0 ? (
                            gearItem.maintenanceLogs.map((log, index) => (
                                <div key={index} className="border-b pb-3">
                                    <p className="font-semibold">{log.notes}</p>
                                    <p className="text-sm text-gray-500">
                                        Serviced by <span className="font-medium text-gray-700">{log.technician}</span> on <span className="font-medium text-gray-700">{log.date}</span>
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 italic">No maintenance history recorded.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaintenanceModal;
