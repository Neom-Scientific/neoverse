import { Dna, Menu } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from "react-redux";
import NeomLogo from '../../../public/images/updated_logo_neom-removebg-preview.png';
import Image from 'next/image';

const Header = () => {
    const favouriteCount = useSelector(state => state.favourite.favourites.length);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200/60 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 relative">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                            <Image src={NeomLogo} alt="logo" className="w-7 h-7 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-orange-500">
                            NeoVerse
                        </h1>
                    </div>
                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="/" className="hover:text-blue-600 text-orange-500 font-medium transition-colors duration-200">Apps</a>
                        <a href="/favourite" className="relative text-orange-500 hover:text-blue-600 font-medium transition-colors duration-200">
                            Favorite
                            {favouriteCount > 0 && (
                                <span className="absolute -top-2 -right-6 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    {favouriteCount}
                                </span>
                            )}
                        </a>
                    </nav>
                    {/* Hamburger for mobile */}
                    <button
                        className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Open menu"
                    >
                        <Menu className="w-7 h-7 text-orange-500" />
                    </button>
                </div>
                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden mt-2 absolute right-5 bg-white rounded-xl shadow-lg py-2 px-4 flex flex-col space-y-2">
                        <a href="/" className="hover:text-blue-600 text-orange-500 font-medium transition-colors duration-200">Apps</a>
                        <a href="/favourite" className="relative text-orange-500 hover:text-blue-600 font-medium transition-colors duration-200">
                            Favorite
                            {favouriteCount > 0 && (
                                <span className="absolute -top-2 -right-6 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    {favouriteCount}
                                </span>
                            )}
                        </a>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header