/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.devesoft.alquilerMotos.service;

import com.devesoft.alquilerMotos.model.Admin;
import com.devesoft.alquilerMotos.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author cabil
 */
@Service
public class AdminService {
    
    @Autowired
    private AdminRepository adminRepository;
    
    public List<Admin> getAll() { 
        return adminRepository.getAll();
    }
    
    public Optional<Admin> getidAdmin(int id) { 
        return adminRepository.getidAdmin(id);
    }
    
    public Admin save(Admin admin){
        if(admin.getIdAdmin()==null){
            return adminRepository.save(admin);
        }else{
            Optional<Admin> adaux= adminRepository.getidAdmin(admin.getIdAdmin());
            if(adaux.isEmpty()){
                return adminRepository.save(admin);
            }else{
                return admin;
            }
        }
    }
    
    public Admin update(Admin admin){
        if(admin.getIdAdmin()!=null){
            Optional<Admin> admaux= adminRepository.getidAdmin(admin.getIdAdmin());
            if(!admaux.isEmpty()){
                if(admin.getName()!=null){
                    admaux.get().setName(admin.getName());
                }
                if(admin.getPassword()!=null){
                    admaux.get().setPassword(admin.getPassword());
                }
                adminRepository.save(admaux.get());
                return admaux.get();
            }else{
                return admin;
            }
        }else{
            return admin;
        }
    }
    
    public boolean deleteAdmin(int id){
        Optional<Admin> aaux= getidAdmin(id);
        if(!aaux.isEmpty()){
            adminRepository.delete(aaux.get());
            return true;
        }
        return false;
    }
}
