package com.bd2.backend.repository;

import com.bd2.backend.entities.Role;
import com.bd2.backend.security.Roles;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Integer> {
    Role findByRole(Roles role);
    Role findById(int id);
}
