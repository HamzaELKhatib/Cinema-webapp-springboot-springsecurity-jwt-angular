package com.nttdata.cinema.service;

import com.nttdata.cinema.model.Projection;

import java.util.List;

public interface ProjectionService {

    List<Projection> getAllProjections();

    Projection createNewProjection(Projection projection);

    Projection updateProjection(Long id,Projection projection);

    Projection getProjectionById(Long id);

    void deleteProjection(Long id);


}
