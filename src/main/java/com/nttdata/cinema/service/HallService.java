package com.nttdata.cinema.service;

import com.nttdata.cinema.model.Artist;
import com.nttdata.cinema.model.ArtistType;
import com.nttdata.cinema.model.Hall;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface HallService {

    List<Hall> getAllHalls();

    Hall createNewHall(Hall hall);

    Hall updateHall(Long id,Hall hall);

    Hall getHallById(Long id);

    void deleteHall(Long id);
}
