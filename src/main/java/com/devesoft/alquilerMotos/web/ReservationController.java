/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.devesoft.alquilerMotos.web;

import com.devesoft.alquilerMotos.model.Reservation;
import com.devesoft.alquilerMotos.model.custom.CountClient;
import com.devesoft.alquilerMotos.model.custom.StatusAmount;
import com.devesoft.alquilerMotos.service.ReservationService;
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
@RequestMapping("/api/Reservation")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class ReservationController {
    
    @Autowired
    private ReservationService reservationService;
    
    @GetMapping("/all")
    public List<Reservation> getReservation(){
        return reservationService.getAll();    
    }
    
    @GetMapping("/{id}")
    public Optional<Reservation> getidReservation (@PathVariable("id") int id){
        return reservationService.getidReservation(id);
    }
    
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation save(@RequestBody Reservation reservation){
        return reservationService.save(reservation);
    }
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation update(@RequestBody Reservation reservation){
        return reservationService.update(reservation);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean deleteidReservation (@PathVariable("id") int id){
        return reservationService.deleteReservation(id);
    }
    
    @GetMapping("/report-dates/{dateOne}/{dateTwo}")
    public List<Reservation> getDatesReport(@PathVariable("dateOne")String d1, @PathVariable("dateTwo")String d2){
        return reservationService.getReservationPeriod(d1, d2);
    }
    
    @GetMapping("/report-status")
    public StatusAmount getStatusAmountStatus(){
        return reservationService.getStatusReport();
    }
    
    @GetMapping("/report-clients")
    public List<CountClient> getCountClients(){
        return reservationService.getTopClient();
    }
}
