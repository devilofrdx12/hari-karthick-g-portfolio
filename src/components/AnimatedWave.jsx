import React from 'react';
import Wave from 'react-wavify';

const AnimatedWave = ({ theme }) => {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100vw',
      height: '35vh', 
      zIndex: -1,
      pointerEvents: 'none'
    }}>
      <Wave 
        fill="url(#smart-gradient)" 
        paused={false}
        options={{
          height: 20,       
          amplitude: 30,    
          speed: 0.10,      
          points: 4         
        }}
        style={{ width: '100%', height: '100%', display: 'flex' }}
      >
       <defs>
          <linearGradient id="smart-gradient" gradientTransform="rotate(90)">
            
            {/* Top edge of the wave */}
            <stop 
              offset="8%" 
              stopColor={theme === 'light' ? "#A0D2FF" : "#ADF1FF"} 
              style={{ transition: 'stop-color 0.5s ease-in-out' }} 
            />
            
            {/* Middle section - Hard stop at 8% never moves! */}
            <stop 
              offset="8%" 
              stopColor={theme === 'light' ? "#A0D2FF" : "#356586"} 
              style={{ transition: 'stop-color 0.5s ease-in-out' }} 
            />

            {/* Bottom deep water */}
            <stop 
              offset="90%" 
              stopColor={theme === 'light' ? "#C7E4FF" : "#0C3256"} 
              style={{ transition: 'stop-color 0.5s ease-in-out' }} 
            />
            
          </linearGradient>
        </defs>
      </Wave>
    </div>
  );
};

export default AnimatedWave;