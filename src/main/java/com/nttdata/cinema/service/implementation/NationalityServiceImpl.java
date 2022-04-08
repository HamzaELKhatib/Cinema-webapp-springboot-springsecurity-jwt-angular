package com.nttdata.cinema.service.implementation;

import com.nttdata.cinema.model.Nationality;
import com.nttdata.cinema.repository.NationalityRepo;
import com.nttdata.cinema.service.AbstractServiceImpl;
import com.nttdata.cinema.service.NationalityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NationalityServiceImpl extends AbstractServiceImpl<Nationality,Long> implements NationalityService {

    @Autowired
    private NationalityRepo repository;

    @Override
    protected JpaRepository<Nationality, Long> getRepository() {
        return repository;
    }


    @Override
    public List<Nationality> getAllNationalities() {
        return getAll();
    }

    @Override
    public Nationality getNationalityById(Long id) {
        return get(id);
    }

    @Override
    public void deleteNationality(Long id) {
        delete(id);
    }

    @Override
    public Nationality addNationality(Nationality nationality) {
        return save(nationality);
    }
}
