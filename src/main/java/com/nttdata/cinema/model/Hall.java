package com.nttdata.cinema.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
@Data
@Entity
@Getter
@Setter
@Table(name = "hall")
public class Hall extends BaseModel<Long> {

    @Column(name = "hall_name", nullable = false, length = 10)
    private String name;

    @Column(name = "seats_number", nullable = false)
    private Integer seatsNbr;


    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "hall_projections",
            joinColumns = @JoinColumn(name = "hall_id",referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name="projection_id",referencedColumnName = "id")
    )
    private List<Projection> projections;


}
