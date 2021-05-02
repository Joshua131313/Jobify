import React, { useState } from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

function Loaderel(props) {
  const {type, size} = props
  const  [loading, setLoading] = useState(true);
  const [color, setColor] = useState("var(--theme-color)");

  return <Loader
  type={type}
  color="var(--theme-color)"
  height={size}
  width={size}
/>
}
export default Loaderel