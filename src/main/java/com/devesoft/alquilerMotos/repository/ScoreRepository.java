/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.devesoft.alquilerMotos.repository;

import com.devesoft.alquilerMotos.model.Score;
import com.devesoft.alquilerMotos.repository.crud.ScoreCrud;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
        
/**
 *
 * @author cabil
 */
@Repository
public class ScoreRepository {
    @Autowired
    private ScoreCrud scoreCrudRepository;
    
    public List<Score> getAll() { return (List<Score>) scoreCrudRepository.findAll(); }
    
    public Optional<Score> getidScore(int id) { return scoreCrudRepository.findById(id); }
    
    public Score save(Score score) { return scoreCrudRepository.save(score); }
    
}
