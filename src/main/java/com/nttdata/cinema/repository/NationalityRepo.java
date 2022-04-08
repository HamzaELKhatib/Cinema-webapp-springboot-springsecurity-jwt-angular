package com.nttdata.cinema.repository;

import com.nttdata.cinema.model.Nationality;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NationalityRepo extends JpaRepository<Nationality, Long> {
}
