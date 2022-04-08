package com.nttdata.cinema.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Data
@Entity
@Getter
@Setter
@Table(name = "slider")
public class Slider extends BaseModel<Long> {

    @Id
    private Long id;

    @Column(name = "slider_img")
    private String slider_img;

    @Lob
    @Column(name = "description")
    private String description;
}
