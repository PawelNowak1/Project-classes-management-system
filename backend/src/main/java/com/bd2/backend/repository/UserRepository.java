package com.bd2.backend.repository;

import com.bd2.backend.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserRepository extends PagingAndSortingRepository<User, Long> {
    User findByUsername(String username);
    User findByEmail(String email);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);

    @Query(value = "select u from User u where (?1 is null or u.username like %?1%) and u.role.id = 1",
            countQuery = "select count (u) from User u where (?1 is null or u.username like %?1%) and u.role.id = 1",
            nativeQuery = false)
    Page<User> findUserPaginated(String username, Pageable pageable);
}
