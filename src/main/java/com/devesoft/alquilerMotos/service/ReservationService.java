/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.devesoft.alquilerMotos.service;

import com.devesoft.alquilerMotos.model.Reservation;
import com.devesoft.alquilerMotos.model.custom.CountClient;
import com.devesoft.alquilerMotos.model.custom.StatusAmount;
import com.devesoft.alquilerMotos.repository.ReservationRepository;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.Date;

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
    
    public Reservation update (Reservation reservation){
        if (reservation.getIdReservation()!=null) {
            Optional<Reservation> reaux = reservationRepository.getidReservation(reservation.getIdReservation());
            if (!reaux.isEmpty()) {
                if(reservation.getStartDate()!=null){
                    reaux.get().setStartDate(reservation.getStartDate());
                }
                if(reservation.getDevolutionDate()!=null){
                    reaux.get().setDevolutionDate(reservation.getDevolutionDate());
                }
                if(reservation.getStatus()!=null){
                    reaux.get().setStatus(reservation.getStatus());
                }
                reservationRepository.save(reaux.get());
                return reaux.get();
            } else {
                return reservation;
            }
        }else {
            return reservation;
        }
    }
    
    public boolean deleteReservation(int id){
        Optional<Reservation> rvaux= getidReservation(id);
        if(!rvaux.isEmpty()){
            reservationRepository.delete(rvaux.get());
            return true;
        }
        return false;
    }
    
    public List<CountClient> getTopClient(){
        return reservationRepository.getTopClient();
    }
    
    public StatusAmount getStatusReport(){
        List<Reservation> completed=reservationRepository.getReservationsByStatus("completed");
        List<Reservation> cancelled=reservationRepository.getReservationsByStatus("cancelled");
        
        StatusAmount statAmt=new StatusAmount(completed.size(), cancelled.size());
        return statAmt;
    }
    
    public List<Reservation> getReservationPeriod(String d1, String d2){
        SimpleDateFormat parser=new SimpleDateFormat("yyyy-MM-dd");
        Date dateOne = new Date();
        Date dateTwo = new Date();
        try {
            dateOne = parser.parse(d1);
            dateTwo = parser.parse(d2);
        }catch (ParseException e) {
            e.printStackTrace();
        }
        if (dateOne.before(dateTwo)) {
            return reservationRepository.getReservationPeriod(dateOne, dateTwo);
        } else {
            return new ArrayList<>();
        }
    }
}
