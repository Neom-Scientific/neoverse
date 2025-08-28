"use client";
import React, { useEffect, useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { AiFillHeart } from "react-icons/ai";
// import NeomLogo from '../../public/images/new_logo.png';
import NeomLogo from '../../public/images/updated_logo_neom-removebg-preview.png';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Input } from "@/components/ui/input"
import { Search, Heart, ChevronDown, Dna, Microscope, BarChart3, FileText, Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavourite, removeFavourite } from '@/lib/redux/slices/favouriteSlice';

const categories = ['Gemline', 'Enrichment', 'Somatic', 'RNA'];


const iconMap = {
  Microscope,
  Dna,
  BarChart3,
  FileText,
};

const apps = [

  {
    id: 'Pre-Process_qc',
    name: 'Pre-Process & QC',
    provider: 'Neom Scientific Solutions',
    description: 'Clinexies is to streamline and automate the conversion of raw sequencing data files — including .fastq, .fastq.gz, .fq, and .fq.gz formats — into high-quality Variant Call Format (VCF) files. This tool is specifically designed to support genomic testing workflows such as Whole Exome Sequencing (WES), Clinical Exome, and Carrier Screening.',
    icon: "FileText",
    color: 'from-cyan-400 to-blue-300',
    badges: [
      { label: "Fast Processing", color: "bg-blue-50 text-blue-700 border-blue-100" },
      { label: "High Accuracy", color: "bg-green-50 text-green-700 border-green-100" }
    ],
    features: [
      { label: "Automated workflow processing", dot: "bg-blue-500" },
      { label: "Clinical-grade analysis", dot: "bg-green-500" },
      { label: "Real-time results", dot: "bg-purple-500" }
    ],
    status: { label: "Ready to use", color: "text-green-600" },
    version: "v0.0.0",
    iconColor: 'text-orange-500',
  },
  // pedigree_tool
  {
    id:'pedigree_tool',
    name: 'Pedigree Analysis Tool', 
    provider: 'Neom Scientific Solutions',
    description:'The Pedigree Analysis Tool is a web-based application designed to generate, visualize, and analyze family pedigrees for genetic and medical research. It provides an interactive interface where users can build pedigrees, add relationships (parents, children, spouses, siblings), and explore inheritance patterns in an intuitive manner.',
    icon: "Dna",
    color: 'from-yellow-400 to-orange-300',
    badges: [
      { label: "Fast Processing", color: "bg-blue-50 text-blue-700 border-blue-100" },
      { label: "High Accuracy", color: "bg-green-50 text-green-700 border-green-100" }
    ],
    features: [
      { label: "Automated workflow processing", dot: "bg-blue-500" },
      { label: "Clinical-grade analysis", dot: "bg-green-500" },
      { label: "Real-time results", dot: "bg-purple-500" }
    ],
    status: { label: "Ready to use", color: "text-green-600" },
    version: "v0.0.0",
    iconColor: 'text-orange-500',
    link:"https://neom-scientific.github.io/pedigree-analysis/"
  },
  // vide
  {
    id: 'vide',
    name: 'VIDE',
    provider: 'Neom Scientific Solutions',
    description: 'VIDE is the secure web-based is a web-based workflow management system designed to track and manage diagnostic samples. It streamlines and organizes the entire lifecycle of a sample — from registration to final report generation — ensuring traceability, accountability, and accuracy at every step.',
    icon: "Microscope",
    color: 'from-emerald-500 to-teal-600',
    badges: [
      { label: "Fast Processing", color: "bg-blue-50 text-blue-700 border-blue-100" },
      { label: "High Accuracy", color: "bg-green-50 text-green-700 border-green-100" }
    ],
    features: [
      { label: "Automated workflow processing", dot: "bg-blue-500" },
      { label: "Clinical-grade analysis", dot: "bg-green-500" },
      { label: "Real-time results", dot: "bg-purple-500" }
    ],
    status: { label: "Ready to use", color: "text-green-600" },
    version: "v1.0",
    iconColor: 'text-emerald-500',
    link: "https://trf-dashboard-bay.vercel.app/"
  },

  // neoVar
  {
    id: 'neovar',
    name: 'NeoVar',
    provider: 'Neom Scientific Solutions',
    description: 'NeoVar is to streamline and automate the conversion of raw sequencing data files — including .fastq, .fastq.gz, .fq, and .fq.gz formats — into high-quality Variant Call Format (VCF) files. This tool is specifically designed to support genomic testing workflows such as Whole Exome Sequencing (WES), Clinical Exome, and Carrier Screening.',
    icon: "Dna",
    color: 'from-blue-500 to-indigo-600',
    badges: [
      { label: "Fast Processing", color: "bg-blue-50 text-blue-700 border-blue-100" },
      { label: "High Accuracy", color: "bg-green-50 text-green-700 border-green-100" }
    ],
    features: [
      { label: "Automated workflow processing", dot: "bg-blue-500" },
      { label: "Clinical-grade analysis", dot: "bg-green-500" },
      { label: "Real-time results", dot: "bg-purple-500" }
    ],
    status: { label: "Ready to use", color: "text-green-600" },
    version: "v0.1",
    iconColor: 'text-blue-500',
    link:"https://neovar-frontend.onrender.com/"
  },

  // neoFastq
  {
    id: 'neofastq',
    name: 'NeoFastq',
    provider: 'Neom Scientific Solutions',
    description: 'NeoFastq is to streamline and automate the conversion of raw sequencing data files — including .fastq, .fastq.gz, .fq, and .fq.gz formats — into high-quality Variant Call Format (VCF) files. This tool is specifically designed to support genomic testing workflows such as Whole Exome Sequencing (WES), Clinical Exome, and Carrier Screening.',
    icon: "BarChart3",
    color: 'from-purple-500 to-pink-600',
    badges: [
      { label: "Fast Processing", color: "bg-blue-50 text-blue-700 border-blue-100" },
      { label: "High Accuracy", color: "bg-green-50 text-green-700 border-green-100" }
    ],
    features: [
      { label: "Automated workflow processing", dot: "bg-blue-500" },
      { label: "Clinical-grade analysis", dot: "bg-green-500" },
      { label: "Real-time results", dot: "bg-purple-500" }
    ],
    status: { label: "Ready to use", color: "text-green-600" },
    version: "v2.1.0",
    iconColor: 'text-purple-500',
  },

  // clinexies
  {
    id: 'clinexies',
    name: 'Clinexies',
    provider: 'Neom Scientific Solutions',
    description: 'Clinexies is to streamline and automate the conversion of raw sequencing data files — including .fastq, .fastq.gz, .fq, and .fq.gz formats — into high-quality Variant Call Format (VCF) files. This tool is specifically designed to support genomic testing workflows such as Whole Exome Sequencing (WES), Clinical Exome, and Carrier Screening.',
    icon: "FileText",
    color: 'from-orange-500 to-red-600',
    badges: [
      { label: "Fast Processing", color: "bg-blue-50 text-blue-700 border-blue-100" },
      { label: "High Accuracy", color: "bg-green-50 text-green-700 border-green-100" }
    ],
    features: [
      { label: "Automated workflow processing", dot: "bg-blue-500" },
      { label: "Clinical-grade analysis", dot: "bg-green-500" },
      { label: "Real-time results", dot: "bg-purple-500" }
    ],
    status: { label: "Ready to use", color: "text-green-600" },
    version: "v0.0.0",
    iconColor: 'text-orange-500',
  },

  {
    id: 'preview_compute',
    name: 'Preview Compute',
    provider: 'Neom Scientific Solutions',
    description: 'Clinexies is to streamline and automate the conversion of raw sequencing data files — including .fastq, .fastq.gz, .fq, and .fq.gz formats — into high-quality Variant Call Format (VCF) files. This tool is specifically designed to support genomic testing workflows such as Whole Exome Sequencing (WES), Clinical Exome, and Carrier Screening.',
    icon: "FileText",
    color: 'from-fuchsia-600 to-pink-500',
    badges: [
      { label: "Fast Processing", color: "bg-blue-50 text-blue-700 border-blue-100" },
      { label: "High Accuracy", color: "bg-green-50 text-green-700 border-green-100" }
    ],
    features: [
      { label: "Automated workflow processing", dot: "bg-blue-500" },
      { label: "Clinical-grade analysis", dot: "bg-green-500" },
      { label: "Real-time results", dot: "bg-purple-500" }
    ],
    status: { label: "Ready to use", color: "text-green-600" },
    version: "v0.0.0",
    iconColor: 'text-purple-500',
  },

  {
    id: 'cardiogenomics',
    name: 'Cardio Genomics',
    provider: 'Neom Scientific Solutions',
    description: 'Clinexies is to streamline and automate the conversion of raw sequencing data files — including .fastq, .fastq.gz, .fq, and .fq.gz formats — into high-quality Variant Call Format (VCF) files. This tool is specifically designed to support genomic testing workflows such as Whole Exome Sequencing (WES), Clinical Exome, and Carrier Screening.',
    icon: "FileText",
    color: 'from-pink-400 to-red-300',
    badges: [
      { label: "Fast Processing", color: "bg-blue-50 text-blue-700 border-blue-100" },
      { label: "High Accuracy", color: "bg-green-50 text-green-700 border-green-100" }
    ],
    features: [
      { label: "Automated workflow processing", dot: "bg-blue-500" },
      { label: "Clinical-grade analysis", dot: "bg-green-500" },
      { label: "Real-time results", dot: "bg-purple-500" }
    ],
    status: { label: "Ready to use", color: "text-green-600" },
    version: "v0.0.0",
    iconColor: 'text-orange-500',
  },

  {
    id: 'LPWGS',
    name: 'LPWGS',
    provider: 'Neom Scientific Solutions',
    description: 'Clinexies is to streamline and automate the conversion of raw sequencing data files — including .fastq, .fastq.gz, .fq, and .fq.gz formats — into high-quality Variant Call Format (VCF) files. This tool is specifically designed to support genomic testing workflows such as Whole Exome Sequencing (WES), Clinical Exome, and Carrier Screening.',
    icon: "FileText",
    color: 'from-lime-400 to-green-300',
    badges: [
      { label: "Fast Processing", color: "bg-blue-50 text-blue-700 border-blue-100" },
      { label: "High Accuracy", color: "bg-green-50 text-green-700 border-green-100" }
    ],
    features: [
      { label: "Automated workflow processing", dot: "bg-blue-500" },
      { label: "Clinical-grade analysis", dot: "bg-green-500" },
      { label: "Real-time results", dot: "bg-purple-500" }
    ],
    status: { label: "Ready to use", color: "text-green-600" },
    version: "v0.0.0",
    iconColor: 'text-orange-500',
  },

  {
    id: 'wellness',
    name: 'WellNess',
    provider: 'Neom Scientific Solutions',
    description: 'Clinexies is to streamline and automate the conversion of raw sequencing data files — including .fastq, .fastq.gz, .fq, and .fq.gz formats — into high-quality Variant Call Format (VCF) files. This tool is specifically designed to support genomic testing workflows such as Whole Exome Sequencing (WES), Clinical Exome, and Carrier Screening.',
    icon: "FileText",
    color: 'from-green-700 to-green-400',
    badges: [
      { label: "Fast Processing", color: "bg-blue-50 text-blue-700 border-blue-100" },
      { label: "High Accuracy", color: "bg-green-50 text-green-700 border-green-100" }
    ],
    features: [
      { label: "Automated workflow processing", dot: "bg-blue-500" },
      { label: "Clinical-grade analysis", dot: "bg-green-500" },
      { label: "Real-time results", dot: "bg-purple-500" }
    ],
    status: { label: "Ready to use", color: "text-green-600" },
    version: "v0.0.0",
    iconColor: 'text-orange-500',
  }


];


const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState('Gemline');
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const favouriteApps = useSelector(state => state.favourite.favourites);
  // Filter apps based on search term (case-insensitive)
  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFavorite = (app) => {
    const isFav = favouriteApps.some(fav => fav.id === app.id);
    if (isFav) {
      dispatch(removeFavourite({ id: app.id }));
    } else {
      dispatch(addFavourite(app));
    }
  };

  useEffect(() => {
    console.log('favouriteApps updated:', favouriteApps);
  }, [favouriteApps]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-indigo-50">

      {/* Main Content */}
      <main className="w-full max-w-full sm:max-w-7xl mx-auto px-2 sm:px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Accurate, comprehensive, and efficient
            <span className="block bg-gradient-to-r from-orange-500 to-red-300 bg-clip-text text-transparent">
              secondary analysis with Neom
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Streamline your genomic workflows with our advanced suite of bioinformatics tools
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${selectedCategory === category
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-white text-slate-700 hover:bg-slate-50 shadow-md hover:shadow-lg border border-slate-200'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search Apps..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-slate-700 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-8">
          {filteredApps.length === 0 ? (
            <div className="col-span-full text-center text-slate-500">No apps found.</div>
          ) : (
            filteredApps.map((app) => {
              const IconComponent = iconMap[app.icon];
              const isFavorite = favouriteApps.some(fav => fav.id === app.id);

              return (
                <div
                  key={app.id}
                  className="flip-card group bg-transparent rounded-2xl sm:rounded-3xl min-h-[420px] w-full max-w-md mx-auto shadow-md sm:shadow-lg"
                >
                  <div className="flip-card-inner relative w-full h-full">
                    {/* Front Side */}
                    <div className="flip-card-front absolute inset-0 bg-white rounded-3xl p-6 shadow-lg border border-slate-100 flex flex-col justify-between h-full">
                      {/* Top: Icon and Heart */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${app.color} rounded-xl flex items-center justify-center shadow-lg`}>
                          <Image src={NeomLogo} alt='logo' className="w-7 h-7 text-white" />
                        </div>
                        <button
                          className={`p-1 rounded-full transition-all duration-200 ${isFavorite ? "text-yellow-400" : "text-slate-300 hover:text-yellow-400"}`}
                          aria-label="Favorite"
                          onClick={() => toggleFavorite(app)}
                        >
                          <Star className="w-5 h-5" fill={isFavorite ? "#facc15" : "none"} />
                        </button>
                      </div>

                      {/* App Name and Provider */}
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{app.name}</h3>
                        <p className="text-sm text-slate-500 font-medium">{app.provider}</p>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 my-3">
                        {app.badges.map((badge, i) => (
                          <span
                            key={i}
                            className={`px-3 py-1 text-xs font-medium rounded-full border ${badge.color}`}
                          >
                            {badge.label}
                          </span>
                        ))}
                      </div>

                      {/* Features */}
                      <div className="space-y-2 mb-3">
                        {app.features.map((feature, i) => (
                          <div key={i} className="flex items-center text-sm text-slate-600">
                            <span className={`w-2 h-2 ${feature.dot} rounded-full mr-2`}></span>
                            {feature.label}
                          </div>
                        ))}
                      </div>

                      {/* Status and Version */}
                      <div className="flex items-center justify-between border-t border-slate-100 mt-auto">
                        <div className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 ${app.status.color}`}></span>
                          <span className={`text-xs font-medium ${app.status.color}`}>{app.status.label}</span>
                        </div>
                        <span className="text-xs text-black-400">{app.version}</span>
                      </div>

                      {/* Hover hint */}
                      <div className="text-center pt-2">
                        <span className="text-xs text-slate-400 opacity-70">
                          Hover for details
                        </span>
                      </div>
                    </div>
                    {/* Back Side */}
                    <div className="flip-card-back absolute inset-0 rounded-3xl p-4 shadow-lg border border-slate-100 flex flex-col h-full overflow-hidden" style={{ background: "none" }}>
                      {/* Light gradient overlay, only this has opacity */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${app.color}`} style={{ opacity: 0.6, zIndex: 0 }} />
                      {/* All content stays fully opaque */}
                      <div className="relative z-10 flex flex-col h-full">
                        {/* Top: Star icon */}
                        <div className="flex items-start justify-end mb-4">
                          <button
                            className={`p-1 rounded-full transition-all duration-200 ${isFavorite ? "text-yellow-400" : "text-white hover:text-yellow-400"}`}
                            aria-label="Favorite"
                            onClick={() => toggleFavorite(app)}
                          >
                            <abbr title='Add to favorites'>
                              <Star className="w-5 h-5 cursor-pointer" fill={isFavorite ? "#facc15" : "none"} />
                            </abbr>
                          </button>
                        </div>
                        {/* Icon background */}
                        {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <IconComponent className={`w-32 h-32 opacity-20 text-white`} />
                      </div> */}
                        {/* Content above the icon */}
                        <p className="text-white text-sm font-bold leading-relaxed mb-6 text-center z-10">
                          {app.description}
                        </p>
                        <div className="mt-auto z-10">
                          <button
                            {...app && app.link ? { onClick: () => window.open(app.link, '_blank') } : {}}
                            className={`w-full py-3 px-4 cursor-pointer bg-gradient-to-r ${app.color} text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02]`}>
                            Launch App
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;