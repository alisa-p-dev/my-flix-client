import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Modal, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { apiURL } from "../../config";

export const ProfileView = ({ user, movies, token, updateUsername }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [show, setShow] = useState(false);
  const [deregister, setDeregister] = useState(false);
  const favourite_movies = movies.filter((movie) =>
    user.FavoriteMovies.includes(movie._id)
  );

  handleShow = () => setShow(true);
  handleClose = () => setShow(false);
  updateUser = () => {
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
          localStorage.setItem("userObject", JSON.stringify(res));
          updateUsername(res);
          alert("Your account is updated");
        } else {
          alert("Update failed");
        }
      });
    setShow(false);
  };
  deleteUser = () => {
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
  handleDeregister = () => setDeregister(true);
  handleCloseDeregister = () => setDeregister(false);

  if (username !== null) {
    return (
      <>
        <Row>
          <Col md={6} className="mx-auto">
            <Card border="primary" className="movieCard">
              <Card.Body>
                <Card.Title className="text-center fs-4">
                  Profile
                  <br />
                </Card.Title>
                <Card.Text>
                  Username: {username}
                  <br />
                  Email: {email}
                  <br />
                  Birthday: {birthday}
                  <br />
                </Card.Text>

                <Button
                  variant="primary"
                  data-inline="true"
                  className="m-4 float-end"
                  onClick={handleShow}
                >
                  Update profile
                </Button>
                <Button
                  variant="primary"
                  data-inline="true"
                  className="m-4 float-end"
                  onClick={handleDeregister}
                >
                  Delete your account
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <h2 className="text-center fs-4">Favorite Movies</h2>
          {favourite_movies.map((movie) => (
            <Col className="mb-5 d-flex" key={movie._id}>
              <MovieCard
                movie={movie}
                user={user}
                token={token}
                setuser={(user) => updateUsername(user)}
              />
            </Col>
          ))}
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
