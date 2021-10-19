/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.devesoft.alquilerMotos.service;

import com.devesoft.alquilerMotos.model.Category;
import com.devesoft.alquilerMotos.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author cabil
 */

@Service
public class CategoryService {
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    public List<Category> getAll(){
        return categoryRepository.getAll();    
    }
    
    public Optional<Category> getCategory (int id){
        return categoryRepository.getCategory(id);
    }
    
    public Category save (Category category){
        if (category.getId()==null){
            return categoryRepository.save(category);
        }else{
            Optional<Category> caux = categoryRepository.getCategory(category.getId());
            if (caux.isEmpty()) {
                return categoryRepository.save(category);
            } else {
                return category;
            }
        }
    }
    
    public Category update(Category category){
        if(category.getId()!=null){
            Optional<Category> cataux= categoryRepository.getCategory(category.getId());
            if(!cataux.isEmpty()){
                if(category.getName()!=null){
                    cataux.get().setName(category.getName());
                }
                if(category.getDescription()!=null){
                    cataux.get().setDescription(category.getDescription());
                }
                categoryRepository.save(cataux.get());
                return cataux.get();
            }else{
                return category;
            }
        }else{
            return category;
        }
    }
    
    public boolean deleteCategory(int id){
        Optional<Category> caux=getCategory(id);
        if(!caux.isEmpty()){
            categoryRepository.delete(caux.get());
            return true;
        }
        return false;
    }
    
}
