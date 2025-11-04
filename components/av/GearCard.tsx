import React from 'react';
import { GearItem, GearStatus } from '../../types';

const statusStyles: Record<GearStatus, { dot: string; text: string; button: string; }> = {
    Available: {
        dot: 'bg-green-500',
        text: 'text-green-700',
        button: 'bg-brand-accent hover:bg-brand-accent-dark',
    },
    Rented: {
        dot: 'bg-yellow-500',
        text: 'text-yellow-700',
        button: 'bg-gray-400 cursor-not-allowed',
    },
    Maintenance: {
        dot: 'bg-red-500',
        text: 'text-red-700',
        button: 'bg-gray-400 cursor-not-allowed',
    },
};

const GearCard: React.FC<{
    item: GearItem;
    onAddToCart: (item: GearItem) => void;
}> = ({ item, onAddToCart }) => {
    const style = statusStyles[item.status];

    return (
        <div className="bg-brand-primary rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col">
            <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover" />
            <div className="p-4 flex flex-col flex-grow">
                <h4 className="text-lg font-bold font-display text-brand-text truncate">{item.name}</h4>
                <p className="text-sm text-gray-500 mb-2">{item.brand}</p>
                <div className="flex items-center text-sm mb-4">
                    <span className={`w-2.5 h-2.5 rounded-full mr-2 ${style.dot}`}></span>
                    <span className={`font-semibold ${style.text}`}>{item.status}</span>
                </div>
                <div className="mt-auto">
                    <button
                        onClick={() => onAddToCart(item)}
                        disabled={item.status !== 'Available'}
                        className={`w-full text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 text-sm ${style.button}`}
                    >
                        {item.status === 'Available' ? 'Add to Request' : 'Unavailable'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GearCard;
