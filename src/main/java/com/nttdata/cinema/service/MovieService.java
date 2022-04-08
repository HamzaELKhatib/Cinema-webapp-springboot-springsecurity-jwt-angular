package com.nttdata.cinema.service;

import com.nttdata.cinema.exceptions.domain.NotAnImageFileException;
import com.nttdata.cinema.model.Movie;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface MovieService{

    List<Movie> getAllMovies();

    Movie createNewMovie(Movie movie,MultipartFile posterImage) throws IOException, NotAnImageFileException;

    Movie updateMovie(Long id,Movie movie);

    Movie getMovieById(Long id);

    void deleteMovie(Long id);
    String savePoster(Long movie_id, MultipartFile poster);
    //String storePoster(MultipartFile file);

}
