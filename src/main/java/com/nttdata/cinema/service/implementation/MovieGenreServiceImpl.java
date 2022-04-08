package com.nttdata.cinema.service.implementation;

import com.nttdata.cinema.model.MovieGenre;
import com.nttdata.cinema.repository.MovieGenreRepo;
import com.nttdata.cinema.service.AbstractServiceImpl;
import com.nttdata.cinema.service.MovieGenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class MovieGenreServiceImpl extends AbstractServiceImpl<MovieGenre,Long> implements MovieGenreService {

    @Autowired
    private MovieGenreRepo repository;

    @Override
    protected JpaRepository<MovieGenre, Long> getRepository() {
        return repository;
    }


    @Override
    public void deleteGenre(Long id) {
        delete(id);
    }

    @Override
    public MovieGenre addGenre(MovieGenre genre) {
        return save(genre);
    }
}
