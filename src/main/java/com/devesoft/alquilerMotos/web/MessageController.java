/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.devesoft.alquilerMotos.web;


import com.devesoft.alquilerMotos.model.Message;
import com.devesoft.alquilerMotos.service.MessageService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author cabil
 */

@RestController
@RequestMapping("/api/Message")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class MessageController {
    
    @Autowired
    private MessageService messageService;
    
    @GetMapping("/all")
    public List<Message> getMessage(){
        return messageService.getAll();    
    }
    
    @GetMapping("/{id}")
    public Optional<Message> getidMessage (@PathVariable("id") int id){
        return messageService.getidMessage(id);
    }
    
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Message save(@RequestBody Message message){
        return messageService.save(message);
    }
}
