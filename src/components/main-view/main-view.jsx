import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";
import { NavigationBar } from "../navigation-bar/navigation-bar.jsx";
import { Col, Row } from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  const apiURL = "https://my-flix-api-esd8.onrender.com";

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch(`${apiURL}/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie.id,
            Title: movie.Title,
            ImagePath: movie.ImagePath,
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name,
            },
            Director: {
              Name: movie.Director.Name,
            },
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          <Row className="justify-content-md-center font-monospace">
            <Routes>
              <Route
                path="/signup"
                element={
                  <>
                    {user ? (
                      <Navigate to="/" />
                    ) : (
                      <Col md={5}>
                        <SignupView />
                      </Col>
                    )}
                  </>
                }
              />
              <Route
                path="/login"
                element={
                  <>
                    {user ? (
                      <Navigate to="/" />
                    ) : (
                      <Col md={5}>
                        <LoginView onLoggedIn={(user) => setUser(user)} />
                      </Col>
                    )}
                  </>
                }
              />
              <Route
                path="/movies/:movieId"
                element={
                  <>
                    {!user ? (
                      <Navigate to="/login" replace />
                    ) : movies.length === 0 ? (
                      <Col>The list is empty!</Col>
                    ) : (
                      <Col md={8}>
                        <MovieView movies={movies} />
                      </Col>
                    )}
                  </>
                }
              />
              <Route
                path="/"
                element={
                  <>
                    {!user ? (
                      <>
                        <Col md={6} className="mb-5">
                          <LoginView
                            onLoggedIn={(user, token) => {
                              setUser(user);
                              setToken(token);
                            }}
                          />
                          or
                          <SignupView />
                        </Col>
                      </>
                    ) : (
                      <Routes>
                        <Route
                          path="/"
                          element={
                            selectedMovie ? (
                              <Col md={8}>
                                <MovieView />
                              </Col>
                            ) : movies.length === 0 ? (
                              <div>The list is empty!</div>
                            ) : (
                              <>
                                {movies.map((movie) => (
                                  <Col className="m-2" key={movie._id} md={3}>
                                    <MovieCard movie={movie} />
                                  </Col>
                                ))}
                              </>
                            )
                          }
                        />
                      </Routes>
                    )}
                  </>
                }
              />
            </Routes>
          </Row>;
        }}
      />
    </BrowserRouter>
  );
};
