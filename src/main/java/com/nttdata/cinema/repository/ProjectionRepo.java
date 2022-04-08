package com.nttdata.cinema.repository;

import com.nttdata.cinema.model.Projection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectionRepo extends JpaRepository<Projection, Long> {
}
