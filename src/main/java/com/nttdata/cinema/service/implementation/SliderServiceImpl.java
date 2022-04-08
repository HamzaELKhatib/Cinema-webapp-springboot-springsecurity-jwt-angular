package com.nttdata.cinema.service.implementation;


import com.nttdata.cinema.exceptions.domain.NotAnImageFileException;
import com.nttdata.cinema.model.Movie;
import com.nttdata.cinema.model.Slider;
import com.nttdata.cinema.repository.SliderRepo;
import com.nttdata.cinema.service.AbstractServiceImpl;
import com.nttdata.cinema.service.SliderService;
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

import static com.nttdata.cinema.model.constant.FileConstant.*;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;
import static org.springframework.http.MediaType.*;


@Service
public class SliderServiceImpl extends AbstractServiceImpl<Slider, Long> implements SliderService {


    @Autowired
    private SliderRepo repository;


    @Override
    protected JpaRepository<Slider, Long> getRepository() {
        return repository;
    }

    @Override
    public Slider getSliderById(Long id) {
        return get(id);
    }

    @Override
    public Slider createNewSlider(Slider slider) {
        return save(slider);
    }

    @Override
    public Slider updateSlider(Long id, Slider slider) {

        Slider oldSlider = get(id);
        oldSlider.setSlider_img(slider.getSlider_img());
        oldSlider.setDescription(slider.getDescription());


        return save(oldSlider);
    }

    @Override
    public void deleteSlider(Long id) {
        delete(id);
    }

    @Override
    public String saveImage(Long slider_id, MultipartFile image) {
        if (image != null) {
            try {

                if(!Arrays.asList(IMAGE_JPEG_VALUE, IMAGE_PNG_VALUE, IMAGE_GIF_VALUE).contains(image.getContentType())) {
                    throw new NotAnImageFileException(image.getOriginalFilename() + NOT_AN_IMAGE_FILE);
                }

                Path folder = Paths.get(SLIDER_FOLDER_PATH +slider_id+SLIDER_IMAGES_FOLDER).toAbsolutePath().normalize();
                if(!Files.exists(folder)) {
                    Files.createDirectories(folder);
                }
                Files.deleteIfExists(Paths.get(folder +slider_id.toString() + DOT + JPG_EXTENSION));
                Files.copy(image.getInputStream(), folder.resolve( slider_id + DOT + JPG_EXTENSION), REPLACE_EXISTING);

                Slider slider=get(slider_id);
                slider.setSlider_img(setImageUrl(slider_id));
                save(slider);
                return slider.getSlider_img();
            }catch (NotAnImageFileException | IOException e){
                System.out.println("Error uploading file :"+e);
                return e.getMessage();
            }
        }
        return "file is null";    }

    private String setImageUrl(Long id) {
        return ServletUriComponentsBuilder.fromCurrentContextPath().path(SLIDER_FOLDER + id + SLIDER_IMAGES_FOLDER
                + id + DOT + JPG_EXTENSION).toUriString();
    }

}
