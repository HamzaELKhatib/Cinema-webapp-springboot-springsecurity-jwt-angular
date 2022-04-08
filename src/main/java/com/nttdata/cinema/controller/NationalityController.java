package com.nttdata.cinema.controller;


import com.nttdata.cinema.model.Movie;
import com.nttdata.cinema.model.Nationality;
import com.nttdata.cinema.service.NationalityService;
import com.nttdata.cinema.service.implementation.GalleryServiceImpl;
import com.nttdata.cinema.service.implementation.MovieServiceImpl;
import com.nttdata.cinema.model.Nationality;

import com.nttdata.cinema.service.implementation.NationalityServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(NationalityController.BASE_URL)
public class NationalityController {

    public static final String BASE_URL = "/nationalities";
    private final NationalityServiceImpl service;

    NationalityController(NationalityServiceImpl service) {
        this.service = service;
    }

    @GetMapping("")
    @ResponseStatus(HttpStatus.OK)
    List<Nationality> getAll() {
        return service.getAll();
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    Nationality addNew(@RequestBody Nationality nationality) {
        return service.save(nationality);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    void delete(@PathVariable Long id) {
        service.deleteNationality(id);
    }


    @GetMapping("{id}")
    Nationality getById(@PathVariable Long id) {
        return service.getNationalityById(id);
    }



}
