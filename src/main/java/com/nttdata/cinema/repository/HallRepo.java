package com.nttdata.cinema.repository;

import com.nttdata.cinema.model.Hall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HallRepo extends JpaRepository<Hall, Long> {
}
