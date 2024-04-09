import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from "react-router-dom";
import RootLayout from "./RootLayout";
import MoviesListing from "../pages/moviesList/MoviesListing";
import MoviesWatchLater from "../pages/moviesList/MoviesWatchLater";
import SignIn from "../pages/moviesList/SignIn";
import SignUp from "../pages/moviesList/SignUp";
//import ProtectedRoute from "../utils/ProtectedRoute";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      {/*  <Route element={<ProtectedRoute />}> */}
      <Route path="/" element={<RootLayout />}>
        <Route index element={<MoviesListing />} />
        <Route path="/movies-watchlater" element={<MoviesWatchLater />} />
      </Route>
      {/*  </Route> */}
    </Route>
  )
);
