package com.bd2.backend.repository;

import com.bd2.backend.entities.Topic;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TopicRepository extends CrudRepository<Topic, Long> {

    @Query(value = "select t from Topic t where ?1 is null or t.teacher.id = ?1",
            nativeQuery = false)
    List<Topic> findAllTopics(Long teacherId);
}
