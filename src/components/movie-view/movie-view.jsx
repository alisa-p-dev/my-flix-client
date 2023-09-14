import PropTypes from "prop-types";
import { Button, Card, Col, Row, Alert } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiURL } from "../../config";

export const MovieView = ({ movies, user, token, setuser }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie._id === movieId);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (
      user &&
      user.FavoriteMovies &&
      user.FavoriteMovies.includes(movie._id)
    ) {
      setIsFavorite(true);
    }
  }, [user, movie._id]);

  const addToFavorite = () => {
    fetch(`${apiURL}/users/${user.Username}/movies/${movie._id}`, {
      method: "POST",
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
      .then((res) => {
        setIsFavorite(true);
        setuser(res);
        localStorage.setItem("user", JSON.stringify(res));

        setAlertMessage("Added to favorites");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      });
  };

  const removeFromFavorite = () => {
    fetch(`${apiURL}/users/${user.Username}/movies/${movie._id}`, {
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
      .then((res) => {
        setIsFavorite(false);
        setuser(res);
        localStorage.setItem("user", JSON.stringify(res));

        setAlertMessage("Removed from favorites");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      });
  };

  return (
    <div>
      <Card className="border-0">
        <Row>
          <Col md={4}>
            <Card.Img src={movie.ImagePath} />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>{movie.Description}</Card.Text>
              <div>
                <strong>Genre: </strong>
                {movie.Genre.Name}
              </div>
              <div>
                <strong>Director: </strong>
                {movie.Director.Name}
              </div>
            </Card.Body>
            <Card.Footer className="text-center ">
              {!isFavorite ? (
                <Button variant="primary" onClick={addToFavorite}>
                  Add to Favorites
                </Button>
              ) : (
                <Button variant="primary" onClick={removeFromFavorite}>
                  Remove from Favorites
                </Button>
              )}
            </Card.Footer>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <Link to={`/`}>
            <Button variant="link" className="back-button">
              &lt;&lt;Back
            </Button>
          </Link>
        </div>
      </Card>
      {showAlert && (
        <Alert
          variant="dark"
          className="text-center small-font"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,
};
