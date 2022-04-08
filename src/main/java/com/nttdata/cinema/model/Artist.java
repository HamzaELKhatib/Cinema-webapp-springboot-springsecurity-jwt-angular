package com.nttdata.cinema.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Data
@Getter
@Setter
@Entity
@Table(name = "artist")
public class Artist extends Person<Long>{

    @ManyToOne
    @JoinColumn(name = "nationality_id")
    private Nationality nationality;

    @Column(name = "artist_type")
    @Enumerated(EnumType.STRING)
    private ArtistType type;

    @Column(name = "bio")
    private String bio;

    @Column(name = "photo_url")
    private String photoUrl;

    @ManyToMany(mappedBy = "actors",fetch = FetchType.EAGER)
    @JsonIgnore
    @ToString.Exclude
    private List<Movie> movies;



}
