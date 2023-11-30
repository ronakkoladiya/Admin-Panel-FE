import React, { useState, useEffect } from "react";
import style from "./Loader.module.css";
import logo from "../../../Assest/logo.png";
import { useSelector } from "react-redux";


const Loader = () => {
  // Check if loading state is true using Redux
  const isloading = useSelector((state: any) => state?.commonLoader?.loading);

  return (
    <>
      {/* Render the loader only if 'isloading' is true */}
      {(isloading) && (
        <div className={style.loaderContainer}>
          <img
            src={logo}
            alt="Logo"
            className={style.logo}
          />
        </div>
      )}
    </>
  );
};

export default Loader;
