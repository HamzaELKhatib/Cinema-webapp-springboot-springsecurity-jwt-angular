package com.nttdata.cinema.controller;

import com.nttdata.cinema.model.Artist;
import com.nttdata.cinema.model.ArtistType;
import com.nttdata.cinema.service.implementation.ArtistServiceImpl;
import com.nttdata.cinema.service.implementation.FileUploadServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.util.List;

import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

@RestController
@RequestMapping(ArtistController.BASE_URL)
public class ArtistController {

    public static final String BASE_URL = "/artists";
    private final ArtistServiceImpl service;

    ArtistController(ArtistServiceImpl service) {
        this.service = service;
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    List<Artist> getAll() {
        return service.getAllArtists();
    }



    @GetMapping("/actors")
    @ResponseStatus(HttpStatus.OK)
    List<Artist> getAllActors() {
        return service.getByType(ArtistType.ACTOR);
    }

    @GetMapping("/directors")
    @ResponseStatus(HttpStatus.OK)
    List<Artist> getAllDirector() {
        return service.getByType(ArtistType.DIRECTOR);
    }

    @GetMapping("/writers")
    @ResponseStatus(HttpStatus.OK)
    List<Artist> getAllWriters() {
        return service.getByType(ArtistType.WRITER);
    }


    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    Artist addNew(@RequestBody Artist newArtist) {
        Artist arti = service.createNewArtist(newArtist);
        arti.setPhotoUrl("http://localhost:8081/artists/"+arti.getId()+"/image");
        service.updateArtist(arti.getId(),arti);
        FileUploadServiceImpl.recentArtist = arti;
        return arti;
    }

    @GetMapping("{id}")
    Artist getById(@PathVariable Long id) {
        return service.getArtistById(id);
    }


    @PutMapping("/update/{id}")
    Artist update(@RequestBody Artist artist, @PathVariable Long id) {
        return service.updateArtist(id,artist);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    void delete(@PathVariable Long id) {
        service.delete(id);
    }
    @GetMapping(path = "/{id}/image", produces = IMAGE_PNG_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public byte[] getArtistImg(@PathVariable("id") Long id) throws IOException {
        try {
            File outputfile = new File(System.getProperty("user.home") + "/cinema/artists/Artist" + id + "/artistImg.png");
            System.out.println(System.getProperty("user.home") + "/cinema/artists/Artist" + id + "\\artistImg.png");
            return Files.readAllBytes(outputfile.toPath());
        } catch (Exception e) {
            System.out.println("This artist do not have an image. Exception details: " + e);
            return null;
        }

    }
}
