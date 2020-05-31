package com.bd2.backend.service.interfaces;

import com.bd2.backend.entities.Topic;

public interface TopicService {
    Iterable<Topic> findAllTopics(Long teacherId);

    Long createTopic(Topic topic);
}
