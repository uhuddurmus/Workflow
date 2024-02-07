import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logoutUser, selectIsAdmin } from "../redux/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import List from "./List";
const UserComponent = () => {
  const user = useSelector(selectUser);
  const isAdmin = useSelector(selectIsAdmin);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
    // You can redirect to the login page or perform any other actions after logout
  };
  const navigate = useNavigate();
  const handleGoAdmin = () => {
    navigate("/admin"); // You can redirect to the login page or perform any other actions after logout
  };
  return (
    <div style={{ backgroundColor: "#040c18" }}>
      <ToastContainer />
      <div
        className="container-fluid d-flex align-items-center justify-content-center "
        style={{
          backgroundImage: `url('/bg.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <ToastContainer />
        <div className="row col-md-6">
          {/* Form Section */}
          <div className="col-md-12  p-5  ">
            <div className="container mt-1 bg-secondary bg-opacity-50 rounded p-5 text-center">
              <h1>
                {" "}
                <span className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="32"
                    fill="currentColor"
                    class="bi bi-person"
                    viewBox="0 0 18 18"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                  </svg>
                </span>
                User Page
              </h1>
            </div>
          </div>
          <div className="col-md-6  p-5  ">
            <div className="container mt-1 bg-secondary bg-opacity-50 rounded p-5">
              <h2 className="mb-4">Hi {user?.fullName}</h2>
              <h2 className="mb-4">
                It's User Page. You can see this page because of your role is{" "}
                {user?.role}
              </h2>
              <button
                className={`btn btn-warning ${isAdmin ? "" : "d-none"}`}
                onClick={handleGoAdmin}
              >
                Admin Page
              </button>
            </div>
          </div>
          <div className="col-md-6  p-5 my-auto ">
            <div className="container mt-1 bg-secondary bg-opacity-50 rounded p-5">
              <svg
                preserveAspectRatio="xMidYMid meet"
                data-bbox="0 0 585.42 153.21"
                viewBox="0 0 585.42 153.21"
                xmlns="http://www.w3.org/2000/svg"
                data-type="ugc"
                role="img"
                aria-label="Konzek Şirket Logosu"
              >
                <g>
                  <defs>
                    <linearGradient
                      gradientUnits="userSpaceOnUse"
                      x2="38.35"
                      y1="153.2"
                      x1="38.35"
                      id="dfc95779-92fe-41b2-a00f-dbdbc44e8283_comp-kxizlnl4"
                    >
                      <stop stop-color="#0071ce" offset="0"></stop>
                      <stop stop-color="#0a9cfc" offset="1"></stop>
                    </linearGradient>
                  </defs>
                  <g>
                    <g>
                      <path
                        fill="#ffffff"
                        d="M191.85 74.95h-20.64l-41.64 39.58V49.16h-14.29v104.05h14.29v-19.02l11.41-10.88 31.35 29.9h20.64l-41.73-39.68 40.61-38.58z"
                      ></path>
                      <path
                        d="M307.43 72.68a38.13 38.13 0 0 0-26.54 10.51A33.82 33.82 0 0 0 270 108.4v44.81h14.33V108.4a22.29 22.29 0 0 1 22.76-22.77 22 22 0 0 1 16.08 6.49 22.33 22.33 0 0 1 6.67 16.28v44.81h14.34V108.4a33.93 33.93 0 0 0-10.92-25.31 36.57 36.57 0 0 0-25.79-10.41"
                        fill="#ffffff"
                      ></path>
                      <path
                        fill="#ffffff"
                        d="M352.49 87.3h48.65l-48.65 53.65v12.26h67.71v-12.26h-48.85l48.85-53.84V75.02h-67.71V87.3z"
                      ></path>
                      <path
                        fill="#ffffff"
                        d="m543.69 113.53 40.56-38.51h-20.64l-41.59 39.51V49.16h-14.29v104.05h14.29v-19.02l11.41-10.88 31.35 29.9h20.64l-41.73-39.68z"
                      ></path>
                      <path
                        d="M464.11 72.65c-26.37 0-39.19 13.13-39.19 40.12 0 27.21 12.87 40.44 39.35 40.44 20.7 0 33.12-8.61 35.07-24.25h-16.23c-2.28 8.58-8.65 12.76-19.46 12.76-14.07 0-21.71-7.48-22.72-22.22l-.05-.67h58.27c.84-11.29-.14-26.56-9.25-36.44-6-6.46-14.64-9.74-25.79-9.74m19.6 33.65-.09.54H441v-.67c1-14.74 8-21.9 21.47-21.9 6.5 0 11.6 1.83 15.17 5.45a21.92 21.92 0 0 1 6 15.55v.76z"
                        fill="#ffffff"
                      ></path>
                      <path
                        fill="url(#dfc95779-92fe-41b2-a00f-dbdbc44e8283_comp-kxizlnl4)"
                        d="M76.71 0v153.2H0V0h76.71z"
                      ></path>
                      <path
                        d="M224.49 72.68c-24.61 0-37.09 13.55-37.09 40.26s12.43 40.26 36.94 40.26c24.71 0 37.23-13.54 37.23-40.26 0-18.36-6.43-40.26-37.08-40.26m-.16 68.32c-20.62 0-23.26-15-23.26-28 0-25.1 13.36-28 23.42-28 20.75 0 23.41 15 23.41 28 0 24.83-12.6 28-23.57 28"
                        fill="#ffffff"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>

          <div className=" d-flex align-items-center justify-content-center">
            <button className="btn btn-primary" onClick={handleLogout}>
              Log Out
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComponent;
