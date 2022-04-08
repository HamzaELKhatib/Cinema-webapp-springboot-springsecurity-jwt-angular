package com.nttdata.cinema.repository;

import com.nttdata.cinema.model.MovieGenre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieGenreRepo extends JpaRepository<MovieGenre, Long> {
}
