package com.nttdata.cinema.controller;

import com.nttdata.cinema.model.MovieGenre;
import com.nttdata.cinema.service.implementation.MovieGenreServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(MovieGenreController.BASE_URL)
public class MovieGenreController {

    public static final String BASE_URL = "/genres";
    private final MovieGenreServiceImpl service;

    MovieGenreController(MovieGenreServiceImpl service) {
        this.service = service;
    }

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    List<MovieGenre> getAll() {
        return service.getAll();
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    MovieGenre addNew(@RequestBody MovieGenre genre) {
        return service.addGenre(genre);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
