import React, { useState, useEffect } from "react";
import styles from "./Slider.module.css";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

const SliderItem = function (props) {
  const handleRadioChange = function (e) {
    let newImg = Number(e.target.id);
    props.changeImg(newImg);
  };
  return (
    <div key={props.index}>
      <input
        onChange={handleRadioChange}
        type="radio"
        name="slider"
        id={props.index}
      />
    </div>
  );
};

export default function Slider(props) {
  const [img, setImg] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!images || images.length !== props.images.length) {
      setImages(props.images);
    }
  }, [images]);

  const handleChangeImageNext = function () {
    if (img === images.length - 1) {
      setImg(0);
    }
    if (img < images.length - 1) {
      setImg(img + 1);
    }
  };

  const handleChangeImagePrev = function () {
    if (img === 0) {
      setImg(images.length - 1);
    }
    if (img > 0) {
      setImg(img - 1);
    }
  };

  return (
    <div className={styles.main}>
      <button
        type="button"
        className={styles.buttonPrev + " " + styles.btn}
        onClick={handleChangeImagePrev}
      >
        <NavigateBeforeIcon className={styles.icon} />
      </button>
      <button
        type="button"
        className={styles.buttonNext + " " + styles.btn}
        onClick={handleChangeImageNext}
      >
        <NavigateNextIcon className={styles.icon} />
      </button>
      <div className={styles.image}>
        {images.length > 0 && <img src={images[img]} alt="" />}
      </div>
    </div>
  );
}
