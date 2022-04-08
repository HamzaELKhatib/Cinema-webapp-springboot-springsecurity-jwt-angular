package com.nttdata.cinema.service.implementation;

import com.nttdata.cinema.exceptions.domain.NotAnImageFileException;
import com.nttdata.cinema.model.Gallery;
import com.nttdata.cinema.model.Movie;
import com.nttdata.cinema.repository.GalleryRepo;
import com.nttdata.cinema.service.AbstractServiceImpl;
import com.nttdata.cinema.service.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

import static com.nttdata.cinema.model.constant.FileConstant.*;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;
import static org.springframework.http.MediaType.*;

@Service
public class GalleryServiceImpl extends AbstractServiceImpl<Gallery,Long> implements GalleryService {

    @Autowired
    private GalleryRepo repository;

    @Override
    protected JpaRepository<Gallery, Long> getRepository() {
        return repository;
    }

    @Override
    public List<Gallery> getByMovie(Movie movie) {
        return repository.findByMovie(movie);
    }


    @Override
    public void deleteGallery(Long id) {
        delete(id);
    }

    @Override
    public Gallery addGallery(MultipartFile file,Movie movie) {
        Gallery newGallery=new Gallery();
        newGallery.setMovie(movie);
        save(newGallery);
        saveFile(movie.getId(), newGallery.getId(),file);
        return newGallery;
    }



    private String setImageUrl(Long movie_id,Long gallery_id) {
        return ServletUriComponentsBuilder.fromCurrentContextPath().path(MOVIES_FOLDER + movie_id +GALLERY_FOLDER
                + gallery_id + DOT + JPG_EXTENSION).toUriString();
    }

    public String saveFile(Long movie_id,Long gallery_id, MultipartFile file)  {
        if (file != null) {
            try {

                if(!Arrays.asList(IMAGE_JPEG_VALUE, IMAGE_PNG_VALUE, IMAGE_GIF_VALUE).contains(file.getContentType())) {
                    throw new NotAnImageFileException(file.getOriginalFilename() + NOT_AN_IMAGE_FILE);
                }

                Path galleryFolder = Paths.get(MOVIES_FOLDER_PATH+ movie_id+GALLERY_FOLDER+gallery_id).toAbsolutePath().normalize();
                if(!Files.exists(galleryFolder)) {
                    Files.createDirectories(galleryFolder);
                }

                Files.deleteIfExists(Paths.get(galleryFolder +gallery_id.toString() + DOT + JPG_EXTENSION));
                Files.copy(file.getInputStream(), galleryFolder.resolve( gallery_id + DOT + JPG_EXTENSION), REPLACE_EXISTING);
                Gallery gallery=get(gallery_id);
                gallery.setPhotoUrl(setImageUrl(movie_id,gallery_id));
                save(gallery);
                return gallery.getPhotoUrl();
            }catch (NotAnImageFileException | IOException e){
                System.out.println("Error uploading file :"+e);
                return e.getMessage();

            }
        }
        return "file is null";


    }
}
