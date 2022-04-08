package com.nttdata.cinema.service;

import com.nttdata.cinema.model.Slider;
import org.springframework.web.multipart.MultipartFile;

public interface SliderService {


    Slider getSliderById(Long id);

    Slider createNewSlider(Slider slider);

    Slider updateSlider(Long id, Slider slider);

    void deleteSlider(Long id);

    String saveImage(Long slider_id, MultipartFile image);

}
