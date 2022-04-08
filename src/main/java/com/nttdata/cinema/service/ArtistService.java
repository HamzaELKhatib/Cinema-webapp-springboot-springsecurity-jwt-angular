package com.nttdata.cinema.service;

import com.nttdata.cinema.model.Artist;
import com.nttdata.cinema.model.ArtistType;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ArtistService {

    List<Artist> getAllArtists();

    List<Artist> getByType(ArtistType type);

    Artist createNewArtist(Artist artist);

    Artist updateArtist(Long id,Artist artist);

    Artist getArtistById(Long id);

    void deleteArtist(Long id);
}
