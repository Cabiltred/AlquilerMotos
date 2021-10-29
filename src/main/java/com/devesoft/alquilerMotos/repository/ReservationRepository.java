/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.devesoft.alquilerMotos.repository;

import com.devesoft.alquilerMotos.model.Client;
import com.devesoft.alquilerMotos.model.Reservation;
import com.devesoft.alquilerMotos.model.custom.CountClient;
import com.devesoft.alquilerMotos.repository.crud.ReservationCrud;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;
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
    
    public void delete(Reservation reservation) { reservationCrudRepository.delete(reservation);}
    
    public List<Reservation> getReservationsByStatus(String status){
        return reservationCrudRepository.findAllByStatus(status);
    }
    
    public List<Reservation> getReservationPeriod(Date dateOne, Date dateTwo){
        return reservationCrudRepository.findAllByStartDateAfterAndStartDateBefore(dateOne, dateTwo);
    }
    
    public List<CountClient> getTopClient(){
        List<CountClient> res=new ArrayList<>();
        
        List<Object[]> report=reservationCrudRepository.countTotalReservationByClient();
        for (int i=0; i<report.size(); i++) {
            Client cliente=(Client) report.get(i)[0];
            Long cantidad=(Long)report.get(i)[1];
            CountClient cclient=new CountClient(cantidad, cliente);
            res.add(cclient);
        }
        return res;
    }
}
