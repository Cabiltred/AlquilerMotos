/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.devesoft.alquilerMotos.repository;

import com.devesoft.alquilerMotos.model.Reservation;
import com.devesoft.alquilerMotos.repository.crud.ReservationCrud;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author cabil
 */
@Repository
public class ReservationRepository {
    @Autowired
    private ReservationCrud reservationCrudRepository;
    
    public List<Reservation> getAll() { return (List<Reservation>) reservationCrudRepository.findAll(); }
    
    public Optional<Reservation> getidReservation(int id) { return reservationCrudRepository.findById(id); }
    
    public Reservation save(Reservation reservation) { return reservationCrudRepository.save(reservation); }
    
}
