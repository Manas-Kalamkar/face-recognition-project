package com.eventvision.DTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class MatchData {
    private String photoId;
    private String filename;
    private Float confidence;
    private String imageUrl;
}
