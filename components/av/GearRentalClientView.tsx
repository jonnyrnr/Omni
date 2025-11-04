import React, { useState, useMemo } from 'react';
import { GearItem } from '../../types';
import { getGearRecommendations } from '../../services/geminiService';
import GearCard from './GearCard';

const sessionTypes = ["Live Rock Show", "Studio Podcast", "Jazz Trio Gig", "Corporate Event", "Acoustic Cafe Set"];

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center space-x-2">
    <div className="w-3 h-3 rounded-full bg-brand-accent animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-3 h-3 rounded-full bg-brand-accent animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-3 h-3 rounded-full bg-brand-accent animate-bounce"></div>
  </div>
);

const GearRentalClientView: React.FC<{ gearInventory: GearItem[] }> = ({ gearInventory }) => {
    const [typeFilter, setTypeFilter] = useState<'All' | GearItem['type']>('All');
    const [availabilityFilter, setAvailabilityFilter] = useState(false);
    const [bookingCart, setBookingCart] = useState<GearItem[]>([]);
    const [sessionType, setSessionType] = useState(sessionTypes[0]);
    const [recommendations, setRecommendations] = useState<{ itemName: string; reason: string }[]>([]);
    const [isLoadingRecs, setIsLoadingRecs] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const filteredGear = useMemo(() => {
        return gearInventory.filter(item => {
            const typeMatch = typeFilter === 'All' || item.type === typeFilter;
            const availabilityMatch = !availabilityFilter || item.status === 'Available';
            return typeMatch && availabilityMatch;
        });
    }, [gearInventory, typeFilter, availabilityFilter]);

    const addToCart = (item: GearItem) => {
        if (item.status !== 'Available') return;
        if (!bookingCart.find(cartItem => cartItem.id === item.id)) {
            setBookingCart([...bookingCart, item]);
        }
    };

    const removeFromCart = (itemId: number) => {
        setBookingCart(bookingCart.filter(item => item.id !== itemId));
    };

    const handleGetRecommendations = async () => {
        setIsLoadingRecs(true);
        setError(null);
        setRecommendations([]);
        try {
            const availableForRecs = gearInventory.filter(g => g.status === 'Available' && !bookingCart.find(cartItem => cartItem.id === g.id));
            const recs = await getGearRecommendations(sessionType, bookingCart, availableForRecs);
            setRecommendations(recs);
        } catch (err) {
            setError('Could not fetch AI recommendations. Please try again.');
            console.error(err);
        } finally {
            setIsLoadingRecs(false);
        }
    };

    return (
        <div className="grid lg:grid-cols-3 gap-12">
            {/* Gear Listing and Filters */}
            <div className="lg:col-span-2">
                <div className="bg-brand-primary p-4 rounded-lg shadow-md mb-6 sticky top-24 z-40 border border-gray-200">
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
                        <h3 className="md:col-span-1 text-lg font-bold font-display text-brand-text">Browse Gear</h3>
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value as any)}
                            className="w-full bg-white border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-brand-accent focus:outline-none"
                        >
                            <option value="All">All Types</option>
                            <option value="Instrument">Instruments</option>
                            <option value="Amplifier">Amplifiers</option>
                            <option value="PA">PA Systems</option>
                            <option value="Accessory">Accessories</option>
                        </select>
                        <label className="flex items-center justify-center space-x-2 bg-white border border-gray-300 rounded-md p-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={availabilityFilter}
                                onChange={(e) => setAvailabilityFilter(e.target.checked)}
                                className="h-4 w-4 rounded text-brand-accent focus:ring-brand-accent"
                            />
                            <span>Available Only</span>
                        </label>
                         <button className="bg-brand-accent/10 text-brand-accent font-semibold p-2 rounded-md hover:bg-brand-accent/20 transition-colors">
                            Search
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredGear.map(item => (
                        <GearCard key={item.id} item={item} onAddToCart={addToCart} />
                    ))}
                     {filteredGear.length === 0 && (
                        <p className="md:col-span-2 xl:col-span-3 text-center text-gray-500 py-10">No gear matches your filters.</p>
                     )}
                </div>
            </div>

            {/* Booking Cart and AI Recommendations */}
            <div className="lg:col-span-1">
                <div className="sticky top-24 z-30 space-y-8">
                    {/* Booking Cart */}
                    <div className="bg-brand-primary p-6 rounded-lg shadow-lg border border-gray-200">
                        <h3 className="text-2xl font-bold font-display text-brand-accent mb-4">Booking Request</h3>
                        {bookingCart.length > 0 ? (
                            <ul className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-2">
                                {bookingCart.map(item => (
                                    <li key={item.id} className="flex justify-between items-center text-sm">
                                        <span>{item.name}</span>
                                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">&times;</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 mb-4">Add gear to get started.</p>
                        )}
                        <button disabled={bookingCart.length === 0} className="w-full bg-brand-accent text-white font-bold py-3 rounded-lg hover:bg-brand-accent-dark transition disabled:opacity-50 disabled:cursor-not-allowed">
                            Submit Request
                        </button>
                    </div>

                    {/* AI Recommendations */}
                    <div className="bg-brand-primary p-6 rounded-lg shadow-lg border border-gray-200">
                        <h3 className="text-2xl font-bold font-display text-brand-accent mb-4">AI Assistant</h3>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="session-type" className="block text-sm font-medium text-gray-700 mb-1">Session Type</label>
                                <select
                                    id="session-type"
                                    value={sessionType}
                                    onChange={e => setSessionType(e.target.value)}
                                    className="w-full bg-white border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-brand-accent focus:outline-none"
                                >
                                    {sessionTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                </select>
                            </div>
                            <button
                                onClick={handleGetRecommendations}
                                disabled={isLoadingRecs}
                                className="w-full flex justify-center items-center bg-brand-cursive/20 text-brand-cursive font-bold py-3 rounded-lg hover:bg-brand-cursive/30 transition disabled:opacity-50"
                            >
                                {isLoadingRecs ? <LoadingSpinner /> : 'Get AI Suggestions'}
                            </button>
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            {recommendations.length > 0 && (
                                <div className="mt-4 space-y-3 border-t pt-4">
                                    <h4 className="font-bold text-brand-text">Recommendations:</h4>
                                    <ul className="space-y-2 text-sm">
                                        {recommendations.map((rec, index) => (
                                            <li key={index}>
                                                <strong className="text-brand-accent">{rec.itemName}:</strong>
                                                <p className="text-gray-600 italic pl-2">{rec.reason}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GearRentalClientView;
