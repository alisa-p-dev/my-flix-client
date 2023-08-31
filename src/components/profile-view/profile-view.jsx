import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Modal, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { apiURL } from "../../config";

export const ProfileView = ({ user, movies, token, updateUsername }) => {
  console.log(user);
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [show, setShow] = useState(false);
  const [deregister, setDeregister] = useState(false);
  const favourite_movies = movies.filter((movie) =>
    user.FavoriteMovies.includes(movie._id)
  );

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const updateUser = () => {
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch(`${apiURL}/users/${user.Username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.Username) {
          localStorage.setItem("user", JSON.stringify(res.Username));
          localStorage.setItem("user", JSON.stringify(res));
          updateUsername(res);
          alert("Your account is updated");
        } else {
          alert("Update failed");
        }
      });
    setShow(false);
  };
  const deleteUser = () => {
    fetch(`${apiURL}/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        alert("Your account is deleted successfully!");
        updateUsername(null);
        localStorage.clear();
        window.location.reload();
      });
  };
  const handleDeregister = () => setDeregister(true);
  const handleCloseDeregister = () => setDeregister(false);

  const myFavoriteMovies = movies.filter((movie) =>
    user.FavoriteMovies.includes(movie._id)
  );

  if (username !== null) {
    return (
      <>
        <Row>
          <Col md={8} className="mx-auto">
            <Card className="movieCard mt-2" border="primary">
              <Card.Body>
                <Card.Title className="text-center fs-2 pb-3">
                  Profile
                  <br />
                </Card.Title>
                <Card.Text>
                  Username: {username}
                  <br />
                  Email: {email}
                  <br />
                  Birthday: {birthday ? birthday.slice(0, 10) : null}
                  <br />
                </Card.Text>

                <Button
                  variant="primary"
                  data-inline="true"
                  className="m-2 float-center"
                  onClick={handleShow}
                >
                  Update profile
                </Button>
                <Button
                  variant="primary"
                  data-inline="true"
                  className="m-2 float-center"
                  onClick={handleDeregister}
                >
                  Delete your account
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <h2 className="text-center fs-4 pt-4">Favorite Movies</h2>
          {/* {user.FavoriteMovies.map((movie) => (
            <Col className="mb-5 d-flex" key={movie._id}>
              <MovieCard
                movie={movie}
                user={user}
                token={token}
                setuser={(user) => {
                  setUserName(user.Username);
                  setUserObject(user);
                }}
              />
            </Col>
          ))} */}
          {myFavoriteMovies.map((movieData) => {
            if (movieData) {
              return (
                <Col className="mb-5 d-flex" key={movieData._id}>
                  <MovieCard
                    movie={movieData}
                    user={user}
                    token={token}
                    setuser={(user) => {
                      setUserName(user.Username);
                      setUserObject(user);
                    }}
                  />
                </Col>
              );
            }
          })}
        </Row>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="ms-auto">Update Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={username}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your new password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicBirthday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updateUser}>
              Update User
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={deregister} onHide={handleCloseDeregister}>
          <Modal.Header closeButton>
            <Modal.Title className="ms-auto">Deregister</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Do you want to delete your account?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeregister}>
              Close
            </Button>
            <Button variant="primary" onClick={deleteUser}>
              Delete account
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
};
