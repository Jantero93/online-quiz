package com.server.backend.question;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "questions")
@Data
public class Question {

    @Id
    @GeneratedValue
    private Integer id;

    private String question;

    private String correctOption;

    @ElementCollection
    private List<String> wrongOptions;

    private String difficulty;

    private Integer userCreated;
}
