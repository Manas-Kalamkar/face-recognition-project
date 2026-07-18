package com.eventvision.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Face {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String embedding;


    private int x;
    private int y;
    private int width;
    private int height;

    @ManyToOne
    @JoinColumn(name = "photo_id")
    @JsonIgnore
    private Photo photo;

}
