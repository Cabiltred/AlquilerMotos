/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.devesoft.alquilerMotos.repository.crud;

import com.devesoft.alquilerMotos.model.Reservation;
import org.springframework.data.repository.CrudRepository;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author cabil
 */
public interface ReservationCrud extends CrudRepository<Reservation, Integer>{
    
    //Cantidad de reservas en un tiempo determinado
    public List<Reservation> findAllByStartDateAfterAndStartDateBefore(Date dateOne, Date dateTwo);
    
    //Cantidad de reservas completas vs canceladas
    public List<Reservation> findAllByStatus(String status);
    
    //Top de los clientes que más dinero le han dejado a la compañía.
    @Query("select c.client, COUNT(c.client) from Reservation AS c group by c.client order by COUNT(c.client) desc")
    public List<Object[]> countTotalReservationByClient();
}
