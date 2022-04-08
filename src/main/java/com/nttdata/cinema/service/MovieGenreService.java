package com.nttdata.cinema.service;

import com.nttdata.cinema.model.MovieGenre;
import org.springframework.stereotype.Service;

@Service
public interface MovieGenreService {

    void deleteGenre(Long id);

    MovieGenre addGenre(MovieGenre genre);

}
