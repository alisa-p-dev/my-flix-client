import PropTypes from "prop-types";
import { Button, Card, Col, Row } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
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
        <Button onClick={onBackClick} variant="link">
          &lt;&lt;Back
        </Button>
      </div>
    </Card>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
