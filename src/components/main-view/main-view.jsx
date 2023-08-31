import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";
import { ProfileView } from "../profile-view/profile-view.jsx";
import { NavigationBar } from "../navigation-bar/navigation-bar.jsx";
import { Row, Col, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { apiURL } from "../../config";
import "./main-view.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const storedUserObject = JSON.parse(localStorage.getItem("user"));
  const [userName, setUserName] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [userObject, setUserObject] = useState(
    storedUserObject ? storedUserObject : null
  );

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
            _id: movie._id,
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
        user={userObject ? userObject.Username : null}
        onLoggedOut={() => {
          setUserObject(null);
          setToken(null);
          localStorage.clear();
          window.location.reload();
        }}
      />
      <Container>
        <Row className="justify-content-md-center font-monospace ">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {userName ? (
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
                  {userName ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView
                        onLoggedIn={(user, token, userObject) => {
                          setUserName(user);
                          setToken(token);
                          setUserObject(userObject);
                          window.location.reload();
                        }}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {!userName ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Col md={8} className="application">
                      <MovieView
                        movies={movies}
                        user={userObject}
                        token={token}
                        setuser={(user) => {
                          setUserName(user.Username);
                          setUserObject(user);
                        }}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  {!userName ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>This list is empty!</Col>
                  ) : (
                    <>
                      {movies.map((movie) => (
                        <Col className="mb-3" md={3} key={movie._id}>
                          <MovieCard
                            movie={movie}
                            user={userObject}
                            token={token}
                            setuser={(user) => {
                              setUserName(user.Username);
                              setUserObject(user);
                            }}
                          />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  {!userName ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <Col>
                      <ProfileView
                        user={userObject}
                        movies={movies}
                        token={token}
                        updateUsername={(user) => {
                          if (user !== null) {
                            setUserName(user.Username);
                            setUserObject(user);
                          } else {
                            setUserName(null);
                            setUserObject(null);
                          }
                        }}
                      />
                    </Col>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};
