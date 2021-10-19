/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.devesoft.alquilerMotos.service;

import com.devesoft.alquilerMotos.model.Client;
import com.devesoft.alquilerMotos.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author cabil
 */

@Service
public class ClientService {
    
    @Autowired
    private ClientRepository clientRepository;
    
    public List<Client> getAll(){
        return clientRepository.getAll();
    } 
    
    public Optional<Client> getidClient(int id){
        return clientRepository.getidClient(id);
    }
    
    public Client save (Client client){
        if(client.getIdClient()==null){
            return clientRepository.save(client);
        }else{
            Optional<Client> claux = clientRepository.getidClient(client.getIdClient());
            if (claux.isEmpty()) {
                return clientRepository.save(client);
            } else {
                return client;
            }
        }
    }
    
    public Client update (Client client){
        if(client.getIdClient()!=null){
            Optional<Client> claux= clientRepository.getidClient(client.getIdClient());
            if(!claux.isEmpty()){
                if(client.getName()!=null){
                    claux.get().setName(client.getName());
                }
                if(client.getAge()!=null){
                    claux.get().setAge(client.getAge());
                }
                if(client.getPassword()!=null){
                    claux.get().setPassword(client.getPassword());                    
                }
                clientRepository.save(claux.get());
                return claux.get();
            }else{
                return client;
            }
        }else{
            return client;
        }
    }
    
        public boolean deleteClient(int id){
        Optional<Client> claux= getidClient(id);
        if(!claux.isEmpty()){
            clientRepository.delete(claux.get());
            return true;
        }
        return false;
    }
}
