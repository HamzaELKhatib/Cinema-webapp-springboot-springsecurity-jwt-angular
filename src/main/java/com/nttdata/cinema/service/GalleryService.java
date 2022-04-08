package com.nttdata.cinema.service;

import com.nttdata.cinema.model.Gallery;
import com.nttdata.cinema.model.Movie;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@Service
public interface GalleryService {

    List<Gallery> getByMovie(Movie movie);

    void deleteGallery(Long id);

    Gallery addGallery(MultipartFile file, Movie movie);


}
