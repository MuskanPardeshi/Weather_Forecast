import React, { useState, useEffect } from 'react';
import './CatAnimation.css'; 

const CatAnimation = ({ containsRainOrCloud }) => {
  const [isCloudVisible, setCloudVisibility] = useState(false);
  const [cloudPosition, setCloudPosition] = useState(-35);
  const [isSliderChecked, setSliderChecked] = useState(false);

  useEffect(() => {
    addSun();
  }, []);

  useEffect(() => {
    if (containsRainOrCloud) {
      addCloud();
    } else {
      removeCloud();
    }
  }, [containsRainOrCloud]);

  const addSun = () => {
    const sun = document.getElementById("sun");
    sun.classList.add("sun");
    sun.style.left = "57%";
    sun.style.top = "13%";
  };

  const addCloud = () => {
    setCloudVisibility(true);
    setCloudPosition(34);
    setSliderChecked(true);
    updateCatStyles(true, true);
  };

  const removeCloud = () => {
    setCloudVisibility(false);
    setCloudPosition(-35);
    setSliderChecked(false);
    updateCatStyles(false);
  };

  
  const updateCatStyles = (isCloudVisible, isSliderChecked) => {
    const eyelids = document.querySelectorAll(".eyelid");
    const body = document.querySelector("body");
    const mouth = document.querySelector(".mouth");
  
    eyelids.forEach((eyelid) => {
      eyelid.style.bottom = isCloudVisible ? "60%" : "120%";
    });
  
    body.style.backgroundColor = isCloudVisible ? "#2c3e50" : "#469CCE";
  
    if (isCloudVisible) {
      eyelids.forEach((eyelid) => {
        eyelid.style.borderRadius = "0%";
      });
      mouth.style.borderRadius = "90% 90% 0 0";
    } else {
      eyelids.forEach((eyelid) => {
        eyelid.style.borderRadius = "0";
      });
      mouth.style.borderRadius = "0 0 90% 90%";
    }
  

    
    const sliderContainer = document.querySelector(".slider-container");
    const slider = document.querySelector(".slider");
  
    if (sliderContainer && slider) {
      if (isSliderChecked) {
        const containerWidth = sliderContainer.offsetWidth;
        const newPosition = containerWidth - slider.offsetWidth;
        slider.style.transform = `translateX(${newPosition}px)`;
      } else {
        slider.style.transform = "translateX(0)";
      }
    }
  };
  

  return (
    <div id="cat-animation" className="container center">
       <div className={`circle ${isCloudVisible ? 'cloud-background' : 'sun-background'}`}>
         <div id="sun" className={`sun ${isCloudVisible ? 'half-visible' : ''}`}></div>
         <div
          id="cloud"
          className={`cloud ${isCloudVisible ? '' : 'hidden'}`}
          style={{ left: `${cloudPosition}%` }}
        ></div>
        <div className="cat">
          <div className="left-eye">
            <div className="pupil">
              <div className="light"></div>
              <div className="eyelid"></div>
            </div>
          </div>
          <div className="right-eye">
            <div className="pupil">
              <div className="light"></div>
              <div className="eyelid"></div>
            </div>
          </div>
          <div className="mouth"></div>
        </div>
      </div>
     

      <div className="row">
        <div className="col-xs-12 centered-text">
        <div className="row">
         <div className="col-xs-12 centered-text">
           <div className="sun-icon"></div>
           <label className="switch">
             <input
               type="checkbox"
               checked={isCloudVisible}
               onChange={(e) => (e.target.checked ? addCloud() : removeCloud())}
             />
             <div className="slider"></div>
           </label>
           <div className="cloud-icon"></div>
         </div>
       </div>
        </div>
      </div>
    </div>
  );
};

export default CatAnimation;



