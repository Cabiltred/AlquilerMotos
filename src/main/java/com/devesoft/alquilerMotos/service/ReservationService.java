/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.devesoft.alquilerMotos.service;

import com.devesoft.alquilerMotos.model.Reservation;
import com.devesoft.alquilerMotos.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author cabil
 */

@Service
public class ReservationService {
    
    @Autowired
    private ReservationRepository reservationRepository;
    
    public List<Reservation> getAll(){
        return reservationRepository.getAll();
    }
    
    public Optional<Reservation> getidReservation(int id){
        return reservationRepository.getidReservation(id);
    }
    
    public Reservation save (Reservation reservation){
        if (reservation.getIdReservation()==null) {
            return reservationRepository.save(reservation);
        } else {
            Optional<Reservation> raux = reservationRepository.getidReservation(reservation.getIdReservation());
            if (raux.isEmpty()) {
                return reservationRepository.save(reservation);
            } else {
                return reservation;
            }
        }
    }
}
