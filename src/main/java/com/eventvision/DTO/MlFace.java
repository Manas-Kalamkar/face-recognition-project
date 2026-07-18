package com.eventvision.DTO;

import lombok.Data;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

@Data
public class MlFace {
    private List<Double> embedding;
    private List<Integer> box; // [x, y, w, h]

    public int getX() { return box.get(0); }
    public int getY() { return box.get(1); }
    public int getW() { return box.get(2); }
    public int getH() { return box.get(3); }

    public String getEmbeddingsAsJson() {
        try {
            return new ObjectMapper().writeValueAsString(embedding);
        } catch (Exception e) {
            throw new RuntimeException("Embedding serialization failed", e);
        }
    }

}

