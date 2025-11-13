"use client";
// @flow strict
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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
  const slug = params.slug;
  const project = projects[slug];
  const [selectedImage, setSelectedImage] = useState(null);

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
        <div className="text-white mb-4">
          <p className="text-sm text-gray-400">Showing {project.images.length} image{project.images.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {project.images.map((img, i) => (
            <div 
              key={i} 
              className="rounded-lg overflow-hidden border border-[#464c6a] bg-[#0f1224] hover:border-[#16f2b3] transition-colors duration-300 cursor-pointer"
              onClick={() => setSelectedImage(img)}
            >
              <Image src={img} alt={`${project.title}-${i + 1}`} width={1200} height={800} className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/" className="text-sm text-[#16f2b3]">Back</Link>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-full">
            <button
              className="absolute top-4 right-4 text-white text-2xl font-bold bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              ×
            </button>
            <Image 
              src={selectedImage} 
              alt="Full size image" 
              width={1920} 
              height={1080} 
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
