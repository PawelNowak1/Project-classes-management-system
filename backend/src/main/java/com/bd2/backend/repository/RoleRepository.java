package com.bd2.backend.repository;

import com.bd2.backend.entities.Role;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Integer> {
    Role findByRole(String role);
    Role findById(int id);
}
