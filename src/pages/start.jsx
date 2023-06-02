import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './start.css'
import Parallax from './parallax.jsx';

function StartPage({onStart }) {
  const [formData, setFormData] = useState({theme: '', novolume: false});
  const navigate =  useNavigate();
  const prevRef = useRef(null);
  const collegesRef = useRef(null);
  const companiesRef = useRef(null);
  const programmingRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);

  const handlevolume = () => {
    setIsClicked((prevIsClicked) => {
      const newIsClicked = !prevIsClicked;
      setFormData({ ...formData, novolume: newIsClicked });
      return newIsClicked;
    });
  };
  
  const handleButtonClick = (value) => {
    const imageRefs = {
      colleges: collegesRef,
      companies: companiesRef,
      programming: programmingRef,
    };

    const image = imageRefs[value].current;


    if (prevRef.current != null) {
      prevRef.current.src = `options/noclick/${prevRef.current.id}.webp`;    }
    prevRef.current = image;

    image.src = `options/onclick/${value}.webp`;

    setFormData({ ...formData, theme: value });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if(formData.theme !== ''){
      onStart(formData);
      navigate('/game');
    }
    else{
      alert("Please select a theme");
    }
  };

  return (
    <div className="Final">
      <Parallax />
      <img src="madeby.webp" className="madeby" alt="madeby" />
      <div className="gameName">
        <a href="https://github.com/woaitsAryan/runaway" className='link' target="_blank">Runaway</a>
      </div>
      <button onClick={handlevolume} className={`volume ${isClicked ? 'strike-through' : ''}` }>
      Sound
     </button>
      <div className="Main">
        <div className="ButtonsContainer">
          <div className="Row">
            <button type="button" onClick={() => handleButtonClick('colleges')} className="btn">
              <img src="options/noclick/colleges.webp" className="btnimg" ref={collegesRef} id = "colleges" alt = "colleges"/>
            </button>
            <button type="button" onClick={() => handleButtonClick('companies')} className="btn">
              <img src="options/noclick/companies.webp" className="btnimg" ref={companiesRef} id = "companies" alt = "companies"/>
            </button>
            <button type="button" onClick={() => handleButtonClick('programming')} className="btn">
              <img src="options/noclick/programming.webp" className="btnimg" ref={programmingRef} id = "programming" alt = "programming" />
            </button>
          </div>
          <button type="submit" onClick={handleSubmit} className="start">
            <img src="start.webp" className="btnimg" alt="start" />
          </button>
        </div>
      </div>
    </div>   
  );
}
export default StartPage;
