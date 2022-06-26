package com.server.backend.question;

import lombok.Data;

import java.util.List;

@Data
public class QuestionDto {
    public String question;
    public String correctOption;
    public List<String> wrongOptions;
    public String difficulty;
}
