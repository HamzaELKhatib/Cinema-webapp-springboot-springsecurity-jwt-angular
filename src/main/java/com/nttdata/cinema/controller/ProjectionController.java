package com.nttdata.cinema.controller;


import com.nttdata.cinema.model.Projection;
import com.nttdata.cinema.service.implementation.ProjectionServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ProjectionController.BASE_URL)
public class ProjectionController {

    public static final String BASE_URL = "projections";
    private final ProjectionServiceImpl service;

    ProjectionController(ProjectionServiceImpl service) {
        this.service = service;
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    List<Projection> getAll() {
        return service.getAllProjections();
    }


    @GetMapping(" {id}")
    Projection getById(@PathVariable Long id) {
        return service.getProjectionById(id);
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    Projection addNew(@RequestBody Projection newProjection) {
        return service.createNewProjection(newProjection);
    }

    @PutMapping("/update/{id}")
    Projection update(@RequestBody Projection projection, @PathVariable Long id) {
        return service.updateProjection(id,projection);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
