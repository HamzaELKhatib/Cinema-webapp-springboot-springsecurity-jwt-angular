package com.nttdata.cinema.model;


import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@Table(name = "review")
public class Review extends BaseModel<Long> {

    @Lob//LONGTEXT
    @Column(name = "user_review")
    private String userReview;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;


    public Review() {
    }
}
