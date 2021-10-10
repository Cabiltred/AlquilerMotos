/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.devesoft.alquilerMotos.repository.crud;

import com.devesoft.alquilerMotos.model.Client;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author cabil
 */
public interface ClientCrud extends CrudRepository<Client, Integer>{
    
}
