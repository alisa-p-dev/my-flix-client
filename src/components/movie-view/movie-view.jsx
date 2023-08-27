import PropTypes from "prop-types";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId);
  return (
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
