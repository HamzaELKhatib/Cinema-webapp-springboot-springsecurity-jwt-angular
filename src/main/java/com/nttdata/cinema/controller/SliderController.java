package com.nttdata.cinema.controller;

import com.nttdata.cinema.model.Slider;
import com.nttdata.cinema.service.implementation.SliderServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import static com.nttdata.cinema.model.constant.FileConstant.*;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;


@RestController
@RequestMapping("/slider")
public class SliderController {

    private final SliderServiceImpl service;

    public SliderController(SliderServiceImpl service) {
        this.service = service;
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    Slider addNew(@RequestBody Slider newSlider) {
        return service.createNewSlider(newSlider);
    }

    @PutMapping("{id}")
    Slider update(@RequestBody Slider slider, @PathVariable Long id) {
        return service.updateSlider(id, slider);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping()
    List<Slider> getAll(){ return service.getAll();}

    @GetMapping("{id}")
    Slider getById(@PathVariable Long id){ return service.getSliderById(id);}

    //Image

    @PostMapping("{id}/image")
    public String uploadFile(@RequestParam(value="file") MultipartFile file, @PathVariable Long id) {
        return service.saveImage(id,file);
    }

    @GetMapping(path = "{id}/image/{fileName}", produces = IMAGE_JPEG_VALUE)
    public byte[] getImage(@PathVariable("id") String slider_id, @PathVariable("fileName") String fileName) throws IOException {
        return Files.readAllBytes(Paths.get(SLIDER_FOLDER_PATH+slider_id+SLIDER_IMAGES_FOLDER+FORWARD_SLASH + fileName));
    }
}
