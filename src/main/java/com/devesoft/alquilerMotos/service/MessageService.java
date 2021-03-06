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
    
    public Optional<Message> getidMessage(int id){
        return messageRepository.getidMessage(id);
    }
    
    public Message save (Message message){
        if(message.getIdMessage()==null){
            return messageRepository.save(message);
        }else{
            Optional<Message> mgaux = messageRepository.getidMessage(message.getIdMessage());
            if (mgaux.isEmpty()) {
                return messageRepository.save(message);
            } else {
                return message;
            }
        }   
    }
    
    public Message update(Message message){
        if(message.getIdMessage()!=null){
            Optional<Message> maux = messageRepository.getidMessage(message.getIdMessage());
            if(!maux.isEmpty()){
                if(message.getMessageText()!=null){
                    maux.get().setMessageText(message.getMessageText());
                }
                messageRepository.save(maux.get());
                return maux.get();
            }else{
                return message;
            }
        }else{
            return message;
        }
    }
    
    public boolean deleteMessage(int id){
        Optional<Message> meaux= getidMessage(id);
        if(!meaux.isEmpty()){
            messageRepository.delete(meaux.get());
            return true;
        }
        return false;
    }    
}
