package com.nttdata.cinema.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "genre")
public class MovieGenre extends BaseModel<Long> {

    @Column(name = "genre_title", nullable = false, length = 30)
    private String title;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "genre", cascade = CascadeType.ALL)
    @JsonIgnore
    @ToString.Exclude
    public List<Movie> movies;

}
