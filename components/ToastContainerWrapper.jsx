"use client";

import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastContainerWrapper() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      rtl={false}
      hideProgressBar={false}
      pauseOnFocusLoss={false}
      pauseOnHover={false}
      transition={Bounce}
      newestOnTop
      closeOnClick
      draggable
      theme="colored"
      // limit={1}
    />
  );
}
