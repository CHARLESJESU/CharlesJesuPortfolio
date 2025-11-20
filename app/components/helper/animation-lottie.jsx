"use client"
import { useEffect, useState } from 'react';

const AnimationLottie = ({ animationPath, width }) => {
  const [Lottie, setLottie] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    // Dynamically import Lottie only on client side to avoid SSR issues
    import('lottie-react').then((LottieReact) => {
      setLottie(() => LottieReact.default);
    });
  }, []);

  // Show static placeholder during SSR and loading state on client
  if (!isMounted || !Lottie) {
    return (
      <div 
        style={{ 
          width: width || '95%', 
          height: '200px', 
          backgroundColor: '#0d1224',
          border: '1px solid #25213b',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#16f2b3'
        }}
      >
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#16f2b3]"></div>
          <span className="text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Lottie
      animationData={animationPath}
      loop={true}
      style={{
        width: width || '95%',
        height: 'auto'
      }}
    />
  );
};

export default AnimationLottie;