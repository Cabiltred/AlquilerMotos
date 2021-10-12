/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.devesoft.alquilerMotos.repository;

import com.devesoft.alquilerMotos.model.Client;
import com.devesoft.alquilerMotos.repository.crud.ClientCrud;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author cabil
 */
@Repository
public class ClientRepository {
    @Autowired
    private ClientCrud clientCrudRepository;
    
    public List<Client> getAll() { return (List<Client>) clientCrudRepository.findAll(); }
    
    public Optional<Client> getidClient(int id) { return clientCrudRepository.findById(id); }
    
    public Client save(Client client) { return clientCrudRepository.save(client); }
    
}
