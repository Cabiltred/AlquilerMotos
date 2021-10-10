/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.devesoft.alquilerMotos.web;

import com.devesoft.alquilerMotos.model.Motorbike;
import com.devesoft.alquilerMotos.service.MotorbikeService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author cabil
 */

@RestController
@RequestMapping("/api/Motorbike")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class MotorbikeController {
    
    @Autowired
    private MotorbikeService motorbikeService;
    
    @GetMapping("/all")
    public List<Motorbike> getMotorbikes(){
        return motorbikeService.getAll();    
    }
    
    @GetMapping("/{id}")
    public Optional<Motorbike> getMotorbike (@PathVariable("id") int id){
        return motorbikeService.getMotorbike(id);
    }
    
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Motorbike save(@RequestBody Motorbike motorbike){
        return motorbikeService.save(motorbike);
    }
}
