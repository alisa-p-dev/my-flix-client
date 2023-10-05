import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';

import { apiURL } from '../../config';
import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view.jsx';
import { LoginView } from '../login-view/login-view.jsx';
import { SignupView } from '../signup-view/signup-view.jsx';
import { ProfileView } from '../profile-view/profile-view.jsx';
import { NavigationBar } from '../navigation-bar/navigation-bar.jsx';

import './main-view.scss';

export const MainView = () => {
  const storedUserObject = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');

  const [userName, setUserName] = useState(
    storedUserObject ? storedUserObject : null
  );
  const [token, setToken] = useState(storedToken);
  const [movies, setMovies] = useState([]);
  const [userObject, setUserObject] = useState(storedUserObject);
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    if (!token) return;

    fetch(`${apiURL}/movies`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          _id: movie._id,
          Title: movie.Title,
          ImagePath: movie.ImagePath,
          Description: movie.Description,
          Genre: { Name: movie.Genre.Name },
          Director: { Name: movie.Director.Name }
        }));
        setMovies(moviesFromApi);
      });
  }, [token, refreshFlag]);

  return (
    <BrowserRouter>
      <NavigationBar
        userName={userObject ? userObject.Username : null}
        onLoggedOut={() => {
          setUserObject(null);
          setUserName(null);
          setMovies([]);
          setToken(null);
          localStorage.clear();
          setRefreshFlag((prev) => !prev);
        }}
      />
      <Container className="center-vertically">
        <Row className="font-monospace">
          <Routes>
            <Route
              path="/signup"
              element={
                userName ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={12}>
                    <SignupView />
                  </Col>
                )
              }
            />
            <Route
              path="/login"
              element={
                userName ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={12}>
                    <LoginView
                      setUserName={setUserName}
                      setToken={setToken}
                      setUserObject={setUserObject}
                      setRefreshFlag={setRefreshFlag}
                    />
                  </Col>
                )
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                !userName ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8} className="application">
                    <MovieView
                      movies={movies}
                      user={userObject}
                      token={token}
                      setUser={(user) => {
                        setUserName(user.Username);
                        setUserObject(user);
                      }}
                    />
                  </Col>
                )
              }
            />
            <Route
              path="/"
              element={
                !userName ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>This list is empty!</Col>
                ) : (
                  movies.map((movie) => (
                    <Col className="mb-5" md={3} key={movie._id}>
                      <MovieCard
                        movie={movie}
                        user={userObject}
                        token={token}
                        setUser={(user) => {
                          setUserName(user.Username);
                          setUserObject(user);
                        }}
                      />
                    </Col>
                  ))
                )
              }
            />
            <Route
              path="/profile"
              element={
                !userName ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <ProfileView
                      user={userObject}
                      movies={movies}
                      token={token}
                      updateUsername={(user) => {
                        if (user) {
                          setUserName(user.Username);
                          setUserObject(user);
                        } else {
                          setUserName(null);
                          setUserObject(null);
                        }
                      }}
                    />
                  </Col>
                )
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};
