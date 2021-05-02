import React, { useContext, useRef, useState } from "react";
import firebase from "firebase";
import { ContextApp } from "../../../../ContextAPI";
import { db } from "../../../../Fire";
import Icon from "../../../Icon/Icon";

function Uploadcv(props) {
  const { state, setState, disabled, cv } = props;
  const { user, setNotifibool, setNotifi } = useContext(ContextApp);
  const [loading, setLoading] = useState();
  const loadingref = useRef();
  const img = 'https://www.thenfapost.com/wp-content/uploads/2020/08/unnamed-2.png'
  function uploadImg(e) {
    const file = e.target.files[0];

    if (file) {
      var storageRef = firebase
        .storage()
        .ref(`${user.uid}/images`)
        .child(file.name);
      const task = storageRef.put(file.name);
      task.on(
        "state_changes",
        function progress(snap) {
          setLoading(true);
          const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          loadingref.current.style.height = percentage + "%";
        },
        function error() {
          setNotifibool(true);
          setNotifi({
            text: "Try Again!",
            icon: "fal fa-exclamation-circle"
          });
        },
        function complete() {
          setLoading(false);
          storageRef.getDownloadURL().then((url) => {
            setState(url);
          });
          setNotifi({
            text: "Image Uploaded!",
            icon: "fal fa-check-circle"
          });
        }
      );
    } else {
      window.alert("too big");
    }
  }

  return (
    <label className={disabled ? "img dis" : "img"}>
      {!disabled && (
        <input
          type="file"
          style={{ display: "none" }}
          onChange={(e) => uploadImg(e)}
        />
      )}
      {state && <img src={cv?img:state} alt="" />}
      <Icon icon="fal fa-upload" />
      {loading && (
        <div className="loader">
          <div className="loaderfill" ref={loadingref}></div>
        </div>
      )}
    </label>
  );
}
export default Uploadcv;
