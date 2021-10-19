/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.devesoft.alquilerMotos.service;

import com.devesoft.alquilerMotos.repository.MotorbikeRepository;
import com.devesoft.alquilerMotos.model.Motorbike;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author cabil
 */
@Service
public class MotorbikeService {
    
    @Autowired
    private MotorbikeRepository motorbikeRepository;
    
    public List<Motorbike> getAll(){
        return motorbikeRepository.getAll();    
    }
    
    public Optional<Motorbike> getMotorbike (int id){
        return motorbikeRepository.getMotorbike(id);
    }
    
    public Motorbike save (Motorbike motorbike){
        if(motorbike.getId()==null){
            return motorbikeRepository.save(motorbike);
        }else{
            Optional<Motorbike> maux= motorbikeRepository.getMotorbike(motorbike.getId());
            if(maux.isEmpty()){
                return motorbikeRepository.save(motorbike);
            }else{
                return motorbike;
            }
        }
    }
    
    public Motorbike update (Motorbike motorbike){
        if(motorbike.getId()!=null){
            Optional<Motorbike> motaux= motorbikeRepository.getMotorbike(motorbike.getId());
            if(!motaux.isEmpty()){
                if(motorbike.getBrand()!=null){
                    motaux.get().setBrand(motorbike.getBrand());
                }
                if(motorbike.getName()!=null){
                    motaux.get().setName(motorbike.getName());
                }
                if(motorbike.getYear()!=null){
                    motaux.get().setYear(motorbike.getYear());
                }
                if(motorbike.getDescription()!=null){
                    motaux.get().setDescription(motorbike.getDescription());
                }
                if(motorbike.getCategory()!=null){
                    motaux.get().setCategory(motorbike.getCategory());
                }
                motorbikeRepository.save(motaux.get());
                return motaux.get();                        
            }else{
                return motorbike;
            }
        }else{
            return motorbike;
        }
    }
    
    public boolean deleteMotorbike(int id){
        Optional<Motorbike> moaux= getMotorbike(id);
        if(!moaux.isEmpty()){
            motorbikeRepository.delete(moaux.get());
            return true;
        }
        return false;
    }
}
