import PropTypes from 'prop-types';
import { Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { apiURL } from '../../config';
import './movie-card.scss';

export const MovieCard = ({ movie, token, setUser }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (
      user &&
      user.FavoriteMovies &&
      user.FavoriteMovies.includes(movie._id)
    ) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [user]);

  const addToFavorite = () => {
    fetch(`${apiURL}/users/${user.Username}/movies/${movie._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add movie to favorites');
        }
        return response.json();
      })
      .then((res) => {
        const updatedUser = { ...res };

        setIsFavorite(true);
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setAlertMessage('Added to favorites');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      })
      .catch((error) => {
        console.error('Error adding movie to favorites:', error);
      });
  };
  const removeFromFavorite = () => {
    fetch(`${apiURL}/users/${user.Username}/movies/${movie._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to remove movie from favorites');
        }
        return response.json();
      })
      .then((res) => {
        const updatedUser = { ...res };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsFavorite(false);
        setUser(updatedUser);
        setAlertMessage('Removed from favorites');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      })
      .catch((error) => {
        console.error('Error removing movie from favorites:', error);
      });
  };

  return (
    <div>
      <Card className="movieCard border-0">
        <Card.Img className="card-image" variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title className="text-center fs-6 ">{movie.Title}</Card.Title>
          <div className="text-center d-flex justify-content-center">
            <div className="mb-2">
              <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                <Button variant="primary" className="btn text-nowrap" size="sm">
                  Open
                </Button>
              </Link>
            </div>
            <div className="ml-auto">
              {!isFavorite ? (
                <Button
                  className="btn"
                  variant="primary"
                  size="sm"
                  onClick={addToFavorite}
                >
                  Add to Favorites
                </Button>
              ) : (
                <Button
                  className="btn"
                  variant="primary"
                  size="sm"
                  onClick={removeFromFavorite}
                >
                  Remove from Favorites
                </Button>
              )}
            </div>{' '}
          </div>
        </Card.Body>
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

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string),
    Username: PropTypes.string,
    _id: PropTypes.string
  }),
  token: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired
};
