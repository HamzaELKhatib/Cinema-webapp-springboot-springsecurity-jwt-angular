package com.nttdata.cinema.controller;


import com.nttdata.cinema.model.Review;
import com.nttdata.cinema.repository.ReviewRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    private ReviewRepo repository;


    public ReviewController(ReviewRepo repository) {
        this.repository = repository;
    }


    @PostMapping("/create")
    public Review addReview(@RequestBody Review review){
        return repository.save(
                new Review(
                        review.getUserReview(),
                        review.getUser(),
                        review.getMovie()
                )
        );
    }
}
