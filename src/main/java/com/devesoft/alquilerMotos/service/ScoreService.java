/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.devesoft.alquilerMotos.service;

import com.devesoft.alquilerMotos.model.Score;
import com.devesoft.alquilerMotos.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author cabil
 */
@Service
public class ScoreService {
    @Autowired
    private ScoreRepository scoreRepository;
    
    public List<Score> getAll(){
        return scoreRepository.getAll();
    }
    
    public Optional<Score> getidScore(int id){
        return scoreRepository.getidScore(id);
    }
    
    public Score save (Score score){
        if (score.getIdScore()==null) {
            return scoreRepository.save(score);
        } else {
            Optional<Score> saux = scoreRepository.getidScore(score.getIdScore());
            if (saux.isEmpty()) {
                return scoreRepository.save(score);
            } else {
                return score;
            }
        }
    }
}
