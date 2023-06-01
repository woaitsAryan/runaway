import React, { useEffect, useRef, useState } from 'react';
import './parallax.css';

const Parallax = () => {
  const containerRef = useRef(null);
  const offsetX = window.innerWidth / 2;  const offsetY = 239;
  const [mouseX, setMouseX] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouseX(event.clientX);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="parallax-container" ref={containerRef}>
      <div className="static-layer">
        <img src="layers/layer0.png" alt="background" style={{ width: '100%', height: '100%', borderRadius:'15px' }} />
      </div>
      <div
        className="layer water" 
        style={{
          transform: `translate(${(mouseX - offsetX) * 0.010}px)`,
          zIndex: -10,
        }}
      >
        <img src="layers/layer1.png" alt="background" style={{ maxWidth: '100%', height: '100%',
         borderBottomLeftRadius:'15px', borderBottomRightRadius:'15px' }} />
      </div>
      <div
        className="layer"
        style={{
          transform: `translate(${(mouseX - offsetX) * 0.001}px)`,
          zIndex: -15,
        }}
      >
        <img src="layers/layer6.png" alt="background" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </div>
      <div
        className="layer"
        style={{
          transform: `translate(${(mouseX - offsetX) * 0.002}px)`,
          zIndex: -14,
        }}
      >
        <img src="layers/layer5.png" alt="background" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </div>
      <div
        className="layer"
        style={{
          transform: `translate(${(mouseX - offsetX) * 0.003}px)`,
          zIndex: -13,
        }}
      >
        <img src="layers/layer4.png" alt="background" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </div>
      <div
        className="layer"
        style={{
          transform: `translate(${(mouseX - offsetX) * 0.004}px)`,
          zIndex: -12,
        }}
      >
        <img src="layers/layer3.png" alt="background" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </div>
      <div
        className="layer"
        style={{
          transform: `translate(${(mouseX - offsetX) * 0.006}px)`,
          zIndex: -11,
        }}
      >
        <img src="layers/layer2.png" alt="background" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </div>
    </div>
  );
};

export default Parallax;
