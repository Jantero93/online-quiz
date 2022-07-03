package com.server.backend.question;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Slf4j
@RequestMapping("/api")
@RestController
public class QuestionController {
    @Autowired
    QuestionService questionService;

    @PostMapping("/question")
    public QuestionDto postQuestion(@Valid @RequestBody QuestionDto questionDto) {
        log.info("Posting new question");
        return questionService.createQuestion(questionDto);
    }
}
