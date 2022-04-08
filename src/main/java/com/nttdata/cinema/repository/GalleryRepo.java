package com.nttdata.cinema.repository;

import com.nttdata.cinema.model.Gallery;
import com.nttdata.cinema.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GalleryRepo extends JpaRepository<Gallery, Long> {
    List<Gallery> findByMovie(Movie movie);
}
