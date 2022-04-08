package com.nttdata.cinema.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@Entity
@Getter
@Setter
@Table(name = "nationality")
public class Nationality extends BaseModel<Long> {

    @Column(name = "nationality_title")
    private String title;
}
