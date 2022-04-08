package com.nttdata.cinema.service;


import com.nttdata.cinema.exceptions.ResourceNotFoundException;
import com.nttdata.cinema.model.BaseModel;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.io.Serializable;
import java.util.List;

public abstract class AbstractServiceImpl<T extends BaseModel<Long>, Long extends Serializable>{

    protected abstract JpaRepository<T, Long> getRepository();

    public List<T> getAll(){
        return getRepository().findAll();
    }

    public T save(T entity) {
        return getRepository().save(entity);
    }

    public T get(Long id) {
        return getRepository().findById(id).orElseThrow(ResourceNotFoundException::new);
    }

    public void delete(Long id) {
        try {
            getRepository().deleteById(id);
        } catch (EmptyResultDataAccessException ignored) {}
    }

//    public void update(T entity) {
//        Optional<T> getEntityOpt = getRepository().findById(entity.getId());
//        T getEntity = getEntityOpt.get();
//        getRepository().save(entity);
//    }

}
