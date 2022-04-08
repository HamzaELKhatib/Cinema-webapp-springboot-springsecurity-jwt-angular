package com.nttdata.cinema.service.implementation;

import com.nttdata.cinema.model.Hall;
import com.nttdata.cinema.repository.HallRepo;
import com.nttdata.cinema.service.AbstractServiceImpl;
import com.nttdata.cinema.service.HallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HallServiceImpl extends AbstractServiceImpl<Hall,Long> implements HallService {

    @Autowired
    private HallRepo repository;

    @Override
    protected JpaRepository<Hall, Long> getRepository() {
        return repository;
    }

    @Override
    public List<Hall> getAllHalls() {
        return getAll();
    }

    @Override
    public Hall createNewHall(Hall hall) {
        return save(hall);
    }

    @Override
    public Hall updateHall(Long id, Hall hall) {
        Hall oldHall = get(id);
        oldHall.setName(hall.getName());
        oldHall.setSeatsNbr(hall.getSeatsNbr());

        return save(oldHall);
    }

    @Override
    public Hall getHallById(Long id) {
        return get(id);
    }

    @Override
    public void deleteHall(Long id) {
        delete(id);
    }
}
