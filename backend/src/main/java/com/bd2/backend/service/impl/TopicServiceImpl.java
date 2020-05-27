package com.bd2.backend.service.impl;

import com.bd2.backend.entities.Topic;
import com.bd2.backend.repository.TopicRepository;
import com.bd2.backend.service.interfaces.TopicService;
import org.springframework.stereotype.Service;

@Service
public class TopicServiceImpl implements TopicService {

    private final TopicRepository topicRepository;

    public TopicServiceImpl(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    @Override
    public Iterable<Topic> findAllTopics(Long teacherId) {
        return topicRepository.findAllTopics(teacherId);
    }

    @Override
    public void createTopic(Topic topic) {
        topicRepository.save(topic);
    }
}
