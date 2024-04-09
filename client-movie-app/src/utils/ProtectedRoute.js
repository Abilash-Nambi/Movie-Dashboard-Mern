// import React from "react";
// import { useEffect } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = () => {
//   const navigate = useNavigate();
//   let isLoggedIn = JSON.parse(localStorage.getItem("movieDb"));

//   useEffect(() => {
//     if (!isLoggedIn || !isLoggedIn.token) {
//       <Navigate to="/sign-in" />;
//       //navigate("/sign-in"); // Use navigate to redirect to sign-in page
//     }
//   }, [isLoggedIn, navigate]); // Include isLoggedIn and navigate in the dependency array

//   // Render Outlet if user is logged in
//   return isLoggedIn && isLoggedIn.token ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/sign-in" />
//   );
// };

// export default ProtectedRoute;
