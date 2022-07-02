package com.server.backend.question;

import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class QuestionDto {
    public String question;
    public String correctOption;
    public Set<String> wrongOptions;
    public String difficulty;
}
