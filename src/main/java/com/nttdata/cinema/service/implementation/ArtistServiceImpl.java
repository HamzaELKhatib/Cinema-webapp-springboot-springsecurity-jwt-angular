package com.nttdata.cinema.service.implementation;

import com.nttdata.cinema.model.Artist;
import com.nttdata.cinema.model.ArtistType;
import com.nttdata.cinema.repository.ArtistRepo;
import com.nttdata.cinema.service.AbstractServiceImpl;
import com.nttdata.cinema.service.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArtistServiceImpl extends AbstractServiceImpl<Artist,Long> implements ArtistService {

    @Autowired
    private ArtistRepo repository;

    @Override
    protected JpaRepository<Artist, Long> getRepository() {
        return repository;
    }


    @Override
    public List<Artist> getAllArtists() {
        return getAll();
    }

    @Override
    public List<Artist> getByType(ArtistType type) {
        return repository.findArtistsByType(type);
    }

    @Override
    public Artist createNewArtist(Artist artist) {
        return save(artist);
    }

    @Override
    public Artist updateArtist(Long id, Artist artist) {
        Artist oldArtist = get(id);
        oldArtist.setFirstName(artist.getFirstName());
        oldArtist.setLastName(artist.getLastName());
        oldArtist.setNationality(artist.getNationality());
        oldArtist.setDateOfBirth(artist.getDateOfBirth());
        oldArtist.setType(artist.getType());
        oldArtist.setBio(artist.getBio());
        return save(oldArtist);
    }

    @Override
    public Artist getArtistById(Long id) {
        return get(id);
    }

    @Override
    public void deleteArtist(Long id) {
        delete(id);
    }
}
