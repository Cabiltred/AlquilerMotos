/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.devesoft.alquilerMotos.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import java.util.List;

/**
 *
 * @author cabil
 */
@Entity
@Table(name = "category")
public class Category implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "name", length = 45)
    private String name;
    @Column(name = "description", length = 250)
    private String description;

    @OneToMany(cascade = {CascadeType.PERSIST},mappedBy = "category")//si cambio algo que lo revise desde ahi, y busca el atributo que va a relacionar
    @JsonIgnoreProperties("category")//ignora a la categoria despues que ubica la moto
    public List<Motorbike> motorbikes;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Motorbike> getMotorbikes() {
        return motorbikes;
    }

    public void setMotorbikes(List<Motorbike> motorbikes) {
        this.motorbikes = motorbikes;
    }
     
}
