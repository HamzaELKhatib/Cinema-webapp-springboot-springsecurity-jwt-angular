package com.nttdata.cinema.controller;

import com.nttdata.cinema.model.IdRequest;
import com.nttdata.cinema.model.Movie;
import com.nttdata.cinema.service.implementation.GalleryServiceImpl;
import com.nttdata.cinema.service.implementation.MovieServiceImpl;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import static com.nttdata.cinema.model.constant.FileConstant.*;
import static org.springframework.http.MediaType.*;

@RestController
@RequestMapping("/movies")
public class MoviesController {


    private final MovieServiceImpl service;
    private final GalleryServiceImpl galleryService;

    MoviesController(MovieServiceImpl service, GalleryServiceImpl galleryService) {
        this.service = service;
        this.galleryService = galleryService;
    }

    // MOVIE


    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    List<Movie> getAll() {
        return service.getAllMovies();
    }

    @SneakyThrows
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    Movie addNew(@RequestBody Movie movie) {
        return service.save(movie);
    }


    @GetMapping("{id}")
    Movie getById(@PathVariable Long id) {
        return service.getMovieById(id);
    }

    @PutMapping("{id}")
    Movie update(@RequestBody Movie movie, @PathVariable Long id) {
        return service.updateMovie(id, movie);
    }


    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    void delete(@PathVariable Long id) {
        service.deleteMovie(id);
    }



    // GALLERY

    @PostMapping(consumes = {
            "multipart/mixed",
            "multipart/form-data"
    }, value = "{id}/galleries")
    void addGallery(@RequestParam(value="file") MultipartFile file,@PathVariable Long id) {
        System.out.println("upload gallery :"+file.getName());
        galleryService.addGallery(file,service.get(id));
    }

    @DeleteMapping("{id}/galleries/{gallery_id}")
    void removeGallery(@PathVariable Long gallery_id, @PathVariable String id) {
        galleryService.deleteGallery(gallery_id);
    }

    @GetMapping(path = "{movie_id}/gallery/{fileName}", produces = IMAGE_JPEG_VALUE)
    public byte[] getGallery(@PathVariable("movie_id") String movie_id, @PathVariable("fileName") String fileName) throws IOException {
        return Files.readAllBytes(Paths.get(MOVIES_FOLDER_PATH+movie_id+GALLERY_FOLDER+ fileName));
    }


    //POSTER

    @PostMapping("{id}/poster")
    public String uploadFile(@RequestParam(value="file") MultipartFile file,@PathVariable Long id) {
        return service.savePoster(id,file);
    }

    @GetMapping(path = "{movie_id}/poster/{fileName}", produces = IMAGE_JPEG_VALUE)
    public byte[] getPoster(@PathVariable("movie_id") String movie_id, @PathVariable("fileName") String fileName) throws IOException {
        return Files.readAllBytes(Paths.get(MOVIES_FOLDER_PATH+movie_id+POSTER_FOLDER+FORWARD_SLASH + fileName));
    }



}
