package com.nttdata.cinema.repository;

import com.nttdata.cinema.model.Artist;
import com.nttdata.cinema.model.ArtistType;
import com.nttdata.cinema.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArtistRepo extends JpaRepository<Artist, Long> {

    List<Artist> findArtistsByType(ArtistType type);
}
