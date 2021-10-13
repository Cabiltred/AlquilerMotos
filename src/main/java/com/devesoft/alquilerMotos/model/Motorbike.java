/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.devesoft.alquilerMotos.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.List;
import javax.persistence.*;

/**
 *
 * @author Diana Chaves Beltran
 */
/**
    *  Se anota a la clase Motorbike como una Entidad 
 */
@Entity
/**
    *  La clase Motorbike es una tabla cuyo nombre en motorbike
*/
@Table(name = "motorbike")
/**
    *  La información de la tabla se puede utilizar gracias al implements Serializable
*/
public class Motorbike implements Serializable{
    /**
    *  Asignación del Id
    */
    @Id
    /**
    *  Genera una clave primaria 
    */
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    /**
    *  Se crea variable Id
    */
    private Integer id;
    /**
    *  Se crea variable name
    */
    @Column(name = "name", length = 45)
    private String name;
    /**
    *  Se crea variable brand
    */
    @Column(name = "brand", length = 45)
    private String brand;
    /**
    *  Se crea variable year
    */
    @Column(name = "year", length = 4)
    private Integer year;
    /**
    *  Se crea variable description
    */
    @Column(name = "description", length = 250)
    private String description;
    /**
    *  Se crea llave foranea categoryId
    */
    @ManyToOne
    @JoinColumn(name="categoryId")//aca nombra a llave foranea como categoryid
    @JsonIgnoreProperties("motorbikes")//esta sentencia ignora una vez atrae la categoria ya ignora a motorbikes
    private Category category;
    /**
    *  Se crea relacion messages
    */
    @OneToMany(cascade = {CascadeType.PERSIST},mappedBy = "motorbike")
    @JsonIgnoreProperties({"motorbike","client"})
    public List<Message> messages;
    /**
    *  Se crea relacion reservations
    */
    @OneToMany (cascade = {CascadeType.PERSIST},mappedBy = "motorbike")
    @JsonIgnoreProperties({"motorbike", "client"})
    public List<Reservation> reservations;
    
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

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }


}
