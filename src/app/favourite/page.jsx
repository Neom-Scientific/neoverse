"use client";
import React, { useState } from "react";
import { Star, Dna, Microscope, BarChart3, FileText } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { removeFavourite } from "@/lib/redux/slices/favouriteSlice";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// import NeomLogo from '../../../public/images/new_logo.png';
import NeomLogo from '../../../public/images/updated_logo_neom-removebg-preview.png';
import Image from 'next/image';

const iconMap = {
    Microscope,
    Dna,
    BarChart3,
    FileText,
};

const FavouritePage = () => {
    const dispatch = useDispatch();
    const favourites = useSelector(state => state.favourite.favourites);

    // Dialog state
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleRemove = (id) => {
        dispatch(removeFavourite({ id }));
        setDialogOpen(false);
        setSelectedId(null);
    };

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <div className="bg-white rounded-t-md border px-6 py-4 text-lg font-semibold">
                My Favourite ({favourites.length})
            </div>
            <div className="bg-white border border-t-0 rounded-b-md p-4">
                {favourites.length === 0 ? (
                    <div className="text-center text-slate-500 py-8">No items in your wishlist.</div>
                ) : (
                    favourites.map((item) => {
                        const IconComponent = iconMap[item.icon];
                        return (
                            <div key={item.id} className="flex gap-4 border-b last:border-b-0 py-4 relative">
                                <div className={`w-16 h-16 flex items-center justify-center bg-gradient-to-r rounded-xl shadow ${item.color}`} >
                                    {IconComponent && <Image src={NeomLogo} alt="logo" className="w-8 h-8 text-white" />}
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-slate-500 text-sm">{item.provider}</div>
                                    <div className="text-slate-400 text-xs mt-1">{item.version}</div>
                                    <div className="mt-2 text-right ">
                                        <button
                                            onClick={() => item.link && window.open(item.link, "_blank")}
                                            className={`py-2 px-4 mt-2 cursor-pointer bg-gradient-to-r ${item.color} text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02]`}
                                            disabled={!item.link}
                                        >
                                            Launch App
                                        </button>
                                    </div>
                                </div>
                                <button
                                    className="absolute top-4 right-4 hover:text-red-500"
                                    onClick={() => {
                                        setDialogOpen(true);
                                        setSelectedId(item.id);
                                    }}
                                    aria-label="Remove"
                                >
                                    <Star className="w-5 h-5" fill="#facc15" />
                                </button>
                            </div>
                        );
                    })
                )}
            </div>
            {/* Confirmation Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Remove from Favourites?</DialogTitle>
                    </DialogHeader>
                    <div>Are you sure you want to remove this item from your favourites?</div>
                    <DialogFooter>
                        <Button
                            variant="destructive"
                            className="bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                            onClick={() => handleRemove(selectedId)}
                        >
                            Remove
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setDialogOpen(false)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700"
                        >
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FavouritePage;