/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.devesoft.alquilerMotos.repository;

import com.devesoft.alquilerMotos.model.Category;
import com.devesoft.alquilerMotos.repository.crud.CategoryCrud;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author cabil
 */
@Repository
public class CategoryRepository {
    @Autowired
    private CategoryCrud categoryCrudRepository;
    
    public List<Category> getAll() { return (List<Category>) categoryCrudRepository.findAll(); }
    
    public Optional<Category> getCategory(int id) { return categoryCrudRepository.findById(id); }
    
    public Category save(Category category) { return categoryCrudRepository.save(category); }
    
}
