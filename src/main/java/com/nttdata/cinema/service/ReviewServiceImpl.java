package com.nttdata.cinema.service;

import com.nttdata.cinema.model.Review;
import com.nttdata.cinema.repository.ReviewRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

public class ReviewServiceImpl extends AbstractServiceImpl<Review, Long> {

    @Autowired
    private ReviewRepo repository;

    @Override
    protected JpaRepository<Review, Long> getRepository() {
        return repository;
    }
}
