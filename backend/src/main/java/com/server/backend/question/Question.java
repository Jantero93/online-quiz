package com.server.backend.question;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.jetbrains.annotations.NotNull;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
public class Question {

    @Id
    @GeneratedValue
    private Integer id;

    @NotNull
    @Column(unique = true)
    private String question;

    @NotNull
    private String correctOption;

    @NotNull
    @NotEmpty
    @ElementCollection
    private List<String> wrongOptions;

    @NotNull
    private String difficulty;

}
