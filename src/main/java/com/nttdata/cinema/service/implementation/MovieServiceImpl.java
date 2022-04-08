package com.nttdata.cinema.service.implementation;

import com.nttdata.cinema.exceptions.domain.NotAnImageFileException;
import com.nttdata.cinema.model.Movie;
import com.nttdata.cinema.model.Nationality;
import com.nttdata.cinema.repository.ArtistRepo;
import com.nttdata.cinema.repository.MovieRepo;
import com.nttdata.cinema.service.AbstractServiceImpl;
import com.nttdata.cinema.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

import static com.nttdata.cinema.model.constant.FileConstant.*;
import static com.nttdata.cinema.model.constant.FileConstant.JPG_EXTENSION;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;
import static org.springframework.http.MediaType.*;

@Service
public class MovieServiceImpl extends AbstractServiceImpl<Movie,Long> implements MovieService {

    @Autowired
    private MovieRepo repository;

    @Override
    protected JpaRepository<Movie, Long> getRepository() {
        return repository;
    }

    @Override
    public List<Movie> getAllMovies() {
        return getAll();
    }

    @Override
    public Movie createNewMovie(Movie movie,MultipartFile poster) throws IOException, NotAnImageFileException {
        //movie.setPoster(getTemporaryPosterImageUrl(movie.getId()));
        Movie newMovie=save(movie);
        savePoster(newMovie.getId(),poster);
        return newMovie;
    }

    @Override
    public Movie updateMovie(Long id, Movie movie) {
        Movie oldMovie = get(id);
        oldMovie.setDirector(movie.getDirector());
        oldMovie.setNationality(movie.getNationality());
        oldMovie.setWriter(movie.getWriter());
        oldMovie.setTitle(movie.getTitle());
        oldMovie.setGenre(movie.getGenre());
        oldMovie.setBoxOffice(movie.getBoxOffice());
        oldMovie.setReleaseYear(movie.getReleaseYear());
        oldMovie.setPlot(movie.getPlot());
        oldMovie.setRuntime(movie.getRuntime());
        oldMovie.setPoster(movie.getPoster());

        return save(oldMovie);
    }

    @Override
    public Movie getMovieById(Long id) {
        return get(id);
    }




    @Override
    public void deleteMovie(Long id) {
        delete(id);
    }



    private String setPosterImageUrl(Long movie_id) {
        return ServletUriComponentsBuilder.fromCurrentContextPath().path(MOVIES_FOLDER + movie_id + POSTER_FOLDER
                + movie_id + DOT + JPG_EXTENSION).toUriString();
    }
    public String savePoster(Long movie_id, MultipartFile poster)  {
        if (poster != null) {
            try {

                if(!Arrays.asList(IMAGE_JPEG_VALUE, IMAGE_PNG_VALUE, IMAGE_GIF_VALUE).contains(poster.getContentType())) {
                    throw new NotAnImageFileException(poster.getOriginalFilename() + NOT_AN_IMAGE_FILE);
                }

                Path moviesFolder = Paths.get(MOVIES_FOLDER_PATH +movie_id+POSTER_FOLDER).toAbsolutePath().normalize();
                if(!Files.exists(moviesFolder)) {
                    Files.createDirectories(moviesFolder);
                }
                System.out.println(moviesFolder);

                Files.deleteIfExists(Paths.get(moviesFolder +movie_id.toString() + DOT + JPG_EXTENSION));
                Files.copy(poster.getInputStream(), moviesFolder.resolve( movie_id + DOT + JPG_EXTENSION), REPLACE_EXISTING);
                Movie movie=getMovieById(movie_id);
                movie.setPoster(setPosterImageUrl(movie_id));
                save(movie);
                return movie.getPoster();
            }catch (NotAnImageFileException | IOException e){
                System.out.println("Error uploading file :"+e);
                return e.getMessage();
            }
        }
        return "file is null";


    }
}
