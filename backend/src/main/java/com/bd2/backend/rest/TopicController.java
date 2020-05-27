package com.bd2.backend.rest;

import com.bd2.backend.entities.Topic;
import com.bd2.backend.service.impl.TopicServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
@RequestMapping("/topic")
public class TopicController {

    final TopicServiceImpl topicService;

    public TopicController(TopicServiceImpl topicService) {
        this.topicService = topicService;
    }

    @RequestMapping(path = "/all", method = RequestMethod.GET)
    public ResponseEntity<Iterable<Topic>> findTopics(@RequestParam(required = false) Long teacherId) {
        return ResponseEntity.ok(topicService.findAllTopics(teacherId));
    }

    @RequestMapping(path = "/create", method = RequestMethod.POST)
    public ResponseEntity<?> findTopics(@RequestBody Topic topic) {
        topicService.createTopic(topic);
        return ResponseEntity.ok("Utworzono temat");
    }
}
