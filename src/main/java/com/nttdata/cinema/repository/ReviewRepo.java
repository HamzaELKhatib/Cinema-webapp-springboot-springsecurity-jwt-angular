package com.nttdata.cinema.repository;

import com.nttdata.cinema.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepo extends JpaRepository<Review, Long> {
}
