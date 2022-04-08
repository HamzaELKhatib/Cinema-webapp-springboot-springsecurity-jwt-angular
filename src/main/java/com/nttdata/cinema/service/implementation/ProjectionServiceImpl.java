package com.nttdata.cinema.service.implementation;

import com.nttdata.cinema.model.Projection;
import com.nttdata.cinema.repository.ProjectionRepo;
import com.nttdata.cinema.service.AbstractServiceImpl;
import com.nttdata.cinema.service.ProjectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectionServiceImpl extends AbstractServiceImpl<Projection, Long> implements ProjectionService {

    @Autowired
    private ProjectionRepo repository;

    @Override
    protected JpaRepository<Projection, Long> getRepository() {
        return repository;
    }


    @Override
    public List<Projection> getAllProjections() {
        return getAll();
    }

    @Override
    public Projection createNewProjection(Projection projection) {
        return save(projection);
    }

    @Override
    public Projection updateProjection(Long id, Projection projection) {
        Projection oldProjection = get(id);
        oldProjection.setMovie(projection.getMovie());
        oldProjection.setStartTime(projection.getStartTime());
        oldProjection.setHall(projection.getHall());

        return save(oldProjection);
    }

    @Override
    public Projection getProjectionById(Long id) {
        return get(id);
    }

    @Override
    public void deleteProjection(Long id) {
        delete(id);
    }
}
