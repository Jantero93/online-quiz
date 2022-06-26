package com.server.backend.question;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class QuestionController {
    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
    final String URL = "api/question";

    @Autowired
    QuestionService questionService;

    @PostMapping(URL)
    public QuestionDto postQuestion(@RequestBody QuestionDto questionDto) {
        LOGGER.info("Posting new question");
        return questionService.createQuestion(questionDto);
    }
}
