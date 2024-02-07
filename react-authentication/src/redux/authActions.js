// authActions.js
import axios from "axios";
import { loginUser } from "./authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const login = async (email, password, dispatch, navigate) => {
  try {
    const response = await axios.post(
      "https://localhost:50000/vk/api/v1/Token",
      {
        email,
        password,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const user = response.data.response;
    console.log(user);
    if (response.data.success == true) {
      dispatch(loginUser(user));
      toast.success("Success!", {
        position: "top-right",
      });
      navigate("/admin");
    } else {
      toast.error(response.data.message, {
        position: "top-right",
      });
    }
  } catch (error) {
    console.error("Login failed:", error);
    // Handle error
    toast.error(error.message, {
      position: "top-right",
    });
  }
};
