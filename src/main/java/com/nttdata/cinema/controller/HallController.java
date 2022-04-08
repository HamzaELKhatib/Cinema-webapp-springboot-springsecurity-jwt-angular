package com.nttdata.cinema.controller;

import com.nttdata.cinema.model.Hall;
import com.nttdata.cinema.service.implementation.HallServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(HallController.BASE_URL)
public class HallController {

    public static final String BASE_URL = "/halls";
    private final HallServiceImpl service;
    HallController(HallServiceImpl serv) {
        this.service = serv;
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    List<Hall> getAll() {return service.getAllHalls();

    }

    @GetMapping("/{id}")
    Hall getById(@PathVariable Long id) {
        System.out.println("-----IT PASSED IN THE BACK-----");
        return service.getHallById(id);
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    Hall addNew(@RequestBody Hall newHall) {
        return service.createNewHall(newHall);
    }

    @PutMapping("/update/{id}")
    Hall update(@RequestBody Hall hall, @PathVariable Long id) {
        return service.updateHall(id,hall);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    void delete(@PathVariable Long id) {
        service.delete(id);
    }
}

