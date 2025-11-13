"use client"

const AnimationLottie = ({ animationPath, width }) => {
  // Temporary placeholder to avoid SSR issues - animations disabled for now
  return (
    <div 
      style={{ 
        width: '95%', 
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
      Animation Placeholder
    </div>
  );
};

export default AnimationLottie;