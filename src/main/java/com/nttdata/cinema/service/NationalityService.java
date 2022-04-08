package com.nttdata.cinema.service;

import com.nttdata.cinema.model.Nationality;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface NationalityService {
    List<Nationality> getAllNationalities();

    Nationality getNationalityById(Long id);

    void deleteNationality(Long id);

    Nationality addNationality(Nationality nationality);
}
