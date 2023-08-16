import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Avatar",
      description:
        "A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
      image:
        "https://www.themoviedb.org/t/p/w440_and_h660_face/uO2yU3QiGHvVp0L5e5IatTVRkYk.jpg",
      director: "James Cameron",
      genre: "Action",
    },
    {
      id: 2,
      title: "Inception",
      description:
        "A thief who enters the dreams of others to steal their secrets gets a chance to redeem himself when he is given a seemingly impossible task: plant an idea in someone's mind.",
      image:
        "https://www.themoviedb.org/t/p/w1280/sNxqwtyHMNQwKWoFYDqcYTui5Ok.jpg",
      director: "Christopher Nolan",
      genre: "Science Fiction",
    },
    {
      id: 3,
      title: "The Shawshank Redemption",
      description:
        "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      image:
        "https://www.themoviedb.org/t/p/w1280/78Pb6FMLMfpm1jUOKTniwREYgAN.jpg",
      director: "Frank Darabont",
      genre: "Drama",
    },
    {
      id: 4,
      title: "The Lord of the Rings: The Fellowship of the Ring",
      description:
        "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
      image:
        "https://www.themoviedb.org/t/p/w1280/k6lw7hhaMDzJ170bfZfBbnipxcW.jpg",
      director: "Peter Jackson",
      genre: "Fantasy",
    },
  ]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
