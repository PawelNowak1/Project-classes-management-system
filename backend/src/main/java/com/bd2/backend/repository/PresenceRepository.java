package com.bd2.backend.repository;

import com.bd2.backend.entities.Presence;
import org.springframework.data.repository.CrudRepository;

public interface PresenceRepository extends CrudRepository<Presence, Long> {
}
