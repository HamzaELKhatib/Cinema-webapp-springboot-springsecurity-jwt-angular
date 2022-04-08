package com.nttdata.cinema.controller;

import com.nttdata.cinema.model.Gallery;
import com.nttdata.cinema.model.Movie;
import com.nttdata.cinema.service.implementation.GalleryServiceImpl;
import com.nttdata.cinema.service.implementation.MovieServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(GalleryController.BASE_URL)
public class GalleryController {

    public static final String BASE_URL = "/gallery";
    private final GalleryServiceImpl service;
    private final MovieServiceImpl movieServ;
    GalleryController(GalleryServiceImpl service, MovieServiceImpl movieServ) {
        this.service = service;
        this.movieServ = movieServ;
    }



    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    List<Gallery> getByMovieId(@PathVariable Long id) {
        Movie m = movieServ.getMovieById(id);
        return service.getByMovie(m);
    }
}
