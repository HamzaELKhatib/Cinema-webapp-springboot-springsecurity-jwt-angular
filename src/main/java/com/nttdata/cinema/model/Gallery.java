package com.nttdata.cinema.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Data
@Entity
@Getter
@Setter
@Table(name = "gallery")
public class Gallery extends BaseModel<Long> {

    @Column(name="photo_url")
    private String photoUrl;

    @ManyToOne()
    @JoinColumn(name = "movie_id")
    @JsonIgnore
    private Movie movie;

}
