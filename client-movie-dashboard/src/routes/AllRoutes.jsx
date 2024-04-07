import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "./RootLayout";
import MoviesListing from "../pages/moviesList/MoviesListing";
import AddMovies from "../pages/moviesList/AddMovies";
import AddGenre from "../pages/moviesList/AddGenre";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<MoviesListing />} />
        <Route path="add-movies" element={<AddMovies />} />
        <Route path="add-genre" element={<AddGenre />} />
      </Route>
    </Route>
  )
);
