package com.nttdata.cinema.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Getter
@Setter
@Table(name = "movie")
public class Movie  extends BaseModel<Long>{

    @Column(name = "movie_title")
    private String title;

    @Column(name = "release_year")
    private Integer releaseYear;

    @Column(name = "runtime")
    private Integer runtime;

    @Lob
    @Column(name = "plot")
    private String plot;

    @Column(name = "movie_poster")
    private String poster;

    @Column(name = "box_office")
    private Double boxOffice;

    @ManyToOne
    @JoinColumn(name = "nationality_id")
    private Nationality nationality;

    @ManyToOne
    @JoinColumn(name = "director_ID")
    private Artist director;

    @OneToMany(mappedBy="movie",cascade = CascadeType.ALL)
    private List<Gallery> Galleries;


    @ManyToOne
    @JoinColumn(name = "writer_ID")
    private Artist writer;

    @ToString.Exclude
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "movie_actors",
            joinColumns = @JoinColumn(name = "movie_id",referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name="actor_id",referencedColumnName = "id")
    )
    private List<Artist> actors;

    @ManyToOne
    @JoinColumn(name = "genre_id")
    private MovieGenre genre;


}
