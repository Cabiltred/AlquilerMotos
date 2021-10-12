/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.devesoft.alquilerMotos.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;

/**
 *
 * @author cabil
 */
@Entity
@Table (name="score")
public class Score implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    @Column(name= "idScore")
    private Integer idScore;
    
    @Column(name = "valueScore", length = 1)
    private Integer valueScore;
    
    @Column(name = "valueMessage", length = 250)
    private String valueMessage;

    public Integer getIdScore() {
        return idScore;
    }

    public void setIdScore(Integer idScore) {
        this.idScore = idScore;
    }

    public Integer getValueScore() {
        return valueScore;
    }

    public void setValueScore(Integer valueScore) {
        this.valueScore = valueScore;
    }

    public String getValueMessage() {
        return valueMessage;
    }

    public void setValueMessage(String valueMessage) {
        this.valueMessage = valueMessage;
    }
    
}
