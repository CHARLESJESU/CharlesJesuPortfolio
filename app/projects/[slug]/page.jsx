"use client";
// @flow strict
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, use } from 'react';

const projects = {
  'faabor-food-donate': {
    title: 'Faabor — Food Donate',
    images: [
      '/faabor/IMG-20251012-WA0010.jpg',
      '/faabor/IMG-20251012-WA0011.jpg',
      '/faabor/IMG-20251012-WA0012.jpg',
      '/faabor/IMG-20251012-WA0013.jpg',
      '/faabor/IMG-20251012-WA0014.jpg',
      '/faabor/IMG-20251012-WA0015.jpg',
      '/faabor/IMG-20251012-WA0016.jpg',
      '/faabor/IMG-20251012-WA0017.jpg',
      '/faabor/IMG-20251012-WA0018.jpg',
      '/faabor/IMG-20251012-WA0019.jpg',
      '/faabor/IMG-20251012-WA0020.jpg',
      '/faabor/IMG-20251012-WA0021.jpg',
      '/faabor/IMG-20251012-WA0022.jpg',
      '/faabor/IMG-20251012-WA0023.jpg',
      '/faabor/IMG-20251012-WA0024.jpg'
    ]
  },
  'kiddo-call': {
    title: 'Kiddo Call',
    images: [
      '/kiddocall/IMG-20251012-WA0002.jpg',
      '/kiddocall/IMG-20251012-WA0003.jpg',
      '/kiddocall/IMG-20251012-WA0004.jpg',
      '/kiddocall/IMG-20251012-WA0005.jpg',
      '/kiddocall/IMG-20251012-WA0006.jpg',
      '/kiddocall/IMG-20251012-WA0007.jpg',
      '/kiddocall/IMG-20251012-WA0008.jpg'
    ]
  },
  'nivetha-app': {
    title: 'Worknest',
    images: [
      '/worknest/IMG-20251011-WA0007.jpg',
      '/worknest/IMG-20251011-WA0008.jpg',
      '/worknest/IMG-20251011-WA0009.jpg',
      '/worknest/IMG-20251011-WA0010.jpg',
      '/worknest/IMG-20251011-WA0011.jpg',
      '/worknest/IMG-20251011-WA0012.jpg',
      '/worknest/IMG-20251011-WA0013.jpg',
      '/worknest/IMG-20251011-WA0014.jpg',
      '/worknest/IMG-20251011-WA0015.jpg',
      '/worknest/IMG-20251011-WA0016.jpg',
      '/worknest/IMG-20251011-WA0017.jpg'
    ]
  },
  'student-registration-hub': {
    title: 'Student Registration Hub',
    images: ['/studentregistrationportal/Screenshot 2025-10-12 122201.png']
  }
};

export default function Page({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const project = projects[slug];
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!project) return;
      
      switch(e.key) {
        case 'ArrowRight':
          e.preventDefault();
          setCurrentImageIndex(prev => 
            prev < project.images.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setCurrentImageIndex(prev => 
            prev > 0 ? prev - 1 : project.images.length - 1
          );
          break;
        case 'Escape':
          setSelectedImage(null);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [project, currentImageIndex]);

  if (!project) {
    return (
      <div className="p-8 text-white">
        <h2>Project not found</h2>
        <Link href="/">Go home</Link>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">{project.title}</h1>
        {/* Navigation Instructions */}
        <div className="text-white mb-6 p-4 bg-[#1a1443] rounded-lg border border-[#464c6a]">
          <p className="text-sm text-[#16f2b3] mb-2">🎮 Navigation:</p>
          <div className="text-xs text-gray-300">
            <p>• <kbd className="px-2 py-1 bg-[#0d1224] rounded">←</kbd> <kbd className="px-2 py-1 bg-[#0d1224] rounded">→</kbd> Navigate images • <kbd className="px-2 py-1 bg-[#0d1224] rounded">Click</kbd> Fullscreen</p>
          </div>
        </div>

        {/* Single Image Display */}
        <div className="flex flex-col items-center">
          {/* Image Counter */}
          <div className="text-white mb-4 text-center">
            <p className="text-sm text-gray-400">Image {currentImageIndex + 1} of {project.images.length}</p>
          </div>
          
          {/* Main Image Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            {project.images.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl font-bold bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-70 z-10 transition-all duration-300"
                  onClick={() => {
                    const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : project.images.length - 1;
                    setCurrentImageIndex(prevIndex);
                  }}
                >
                  ←
                </button>
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl font-bold bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-70 z-10 transition-all duration-300"
                  onClick={() => {
                    const nextIndex = currentImageIndex < project.images.length - 1 ? currentImageIndex + 1 : 0;
                    setCurrentImageIndex(nextIndex);
                  }}
                >
                  →
                </button>
              </>
            )}
            
            {/* Main Image */}
            <div 
              className="rounded-lg overflow-hidden border border-[#464c6a] bg-[#0f1224] hover:border-[#16f2b3] transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedImage(project.images[currentImageIndex])}
            >
              <Image 
                src={project.images[currentImageIndex]} 
                alt={`${project.title}-${currentImageIndex + 1}`} 
                width={1200} 
                height={800} 
                className="max-w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
                style={{ maxHeight: '70vh' }}
              />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Link href="/" className="text-sm text-[#16f2b3]">Back</Link>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-full">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white text-2xl font-bold bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-70 z-10 transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              ×
            </button>
            
            {/* Navigation in Modal */}
            {project.images.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl font-bold bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-70 z-10 transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = project.images.indexOf(selectedImage);
                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : project.images.length - 1;
                    setSelectedImage(project.images[prevIndex]);
                    setCurrentImageIndex(prevIndex);
                  }}
                >
                  ←
                </button>
                <button
                  className="absolute right-16 top-1/2 transform -translate-y-1/2 text-white text-2xl font-bold bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-70 z-10 transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = project.images.indexOf(selectedImage);
                    const nextIndex = currentIndex < project.images.length - 1 ? currentIndex + 1 : 0;
                    setSelectedImage(project.images[nextIndex]);
                    setCurrentImageIndex(nextIndex);
                  }}
                >
                  →
                </button>
              </>
            )}
            
            <Image 
              src={selectedImage} 
              alt="Full size image" 
              width={1920} 
              height={1080} 
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Image Counter in Modal */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-full">
              {project.images.indexOf(selectedImage) + 1} / {project.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
