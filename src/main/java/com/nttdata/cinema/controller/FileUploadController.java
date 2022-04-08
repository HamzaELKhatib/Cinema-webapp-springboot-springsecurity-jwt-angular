package com.nttdata.cinema.controller;
import com.nttdata.cinema.model.Artist;
import com.nttdata.cinema.service.implementation.ArtistServiceImpl;
import com.nttdata.cinema.service.implementation.FileUploadServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping(FileUploadController.BASE_URL)
public class FileUploadController {

    public static final String BASE_URL = "/files";

    @PostMapping("add")
    @ResponseStatus(HttpStatus.CREATED)
    void addNew(@RequestBody String data) {
        try {
            String base64Image = data.split(",")[1];
            byte[] imageBytes = javax.xml.bind.DatatypeConverter.parseBase64Binary(base64Image);
            BufferedImage img = ImageIO.read(new ByteArrayInputStream(imageBytes));
           // System.out.println(System.getProperty("user.dir")+"src\\main\\resources\\static\\Artists\\Artist"+ FileUploadServiceImpl.recentArtist.getId() +"\\artistImg.png");
            File outputfile = new File(System.getProperty("user.home") + "/cinema/artists/Artist"+ FileUploadServiceImpl.recentArtist.getId() +"\\artistImg.png");
            outputfile.getParentFile().mkdirs();
            ImageIO.write(img, "png", outputfile);
        } catch (IOException e) {
            System.out.println(e);
        }
    }
}
