/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.devesoft.alquilerMotos.service;

import com.devesoft.alquilerMotos.model.Message;
import com.devesoft.alquilerMotos.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author cabil
 */

@Service
public class MessageService {
    
    @Autowired
    private MessageRepository messageRepository;
    
    public List<Message> getAll(){
        return messageRepository.getAll();
    }
    
    public Optional<Message> getMessage(int id){
        return messageRepository.getMessage(id);
    }
    
    public Message save (Message message){
        if(message.getId()==null){
            return messageRepository.save(message);
        }else{
            Optional<Message> mgaux = messageRepository.getMessage(message.getId());
            if (mgaux.isEmpty()) {
                return messageRepository.save(message);
            } else {
                return message;
            }
        }   
    }
}
