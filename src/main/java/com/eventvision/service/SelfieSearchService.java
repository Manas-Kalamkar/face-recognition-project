package com.eventvision.service;

import com.eventvision.DTO.MatchData;
import com.eventvision.DTO.MatchResponse;
import com.eventvision.DTO.MlFaceResponse;
import com.eventvision.model.Face;
import com.eventvision.repository.FaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
@RequiredArgsConstructor
public class SelfieSearchService {

    private final MlClient mlClient;
    private final FaceRepository faceRepository;

    private static final float THRESHOLD = 0.60f;

    public MatchResponse search(String eventId, MultipartFile selfie)
            throws Exception {

        // 1️⃣ selfie → bytes
        byte[] imageBytes = selfie.getBytes();

        // 2️⃣ ML call
        MlFaceResponse response = mlClient.processImage(imageBytes);

        if (response.getFaces().isEmpty()) {
            throw new RuntimeException("No face detected in selfie");
        }

        // 3️⃣ selfie embedding
        float[] selfieEmbedding =
                toFloatArray(response.getFaces().get(0).getEmbedding());

        // 4️⃣ DB faces (event wise)
        List<Face> faces =
                faceRepository.findByPhoto_Event_Id(eventId);

        // 🔥 KEY FIX: photoId → best match
        Map<String, MatchData> bestMatchPerPhoto = new HashMap<>();

        for (Face face : faces) {

            float[] dbEmbedding = parseEmbedding(face.getEmbedding());
            float score = cosineSimilarity(selfieEmbedding, dbEmbedding);
            System.out.println("📸 " + face.getPhoto().getFilename() + " → score: " + score);
            if (score >= THRESHOLD) {

                String photoId = face.getPhoto().getId();

                MatchData existing = bestMatchPerPhoto.get(photoId);

                // keep BEST face per photo
                if (existing == null || score > existing.getConfidence()) {
                    bestMatchPerPhoto.put(
                            photoId,
                            MatchData.builder()
                                    .photoId(photoId)
                                    .filename(face.getPhoto().getFilename())
                                    .confidence(score)
                                    .imageUrl("/photos/" + photoId)
                                    .build()
                    );
                }
            }
        }

        // 5️⃣ final sorted list
        List<MatchData> matches =
                new ArrayList<>(bestMatchPerPhoto.values());

        matches.sort(
                (a, b) -> Float.compare(b.getConfidence(), a.getConfidence())
        );

        return MatchResponse.builder()
                .matches(matches)
                .build();
    }

    // ---------------- helpers ----------------

    private float[] toFloatArray(List<Double> list) {
        float[] arr = new float[list.size()];
        for (int i = 0; i < list.size(); i++) {
            arr[i] = list.get(i).floatValue();
        }
        return arr;
    }

    private float[] parseEmbedding(String embedding) {
        String clean = embedding.replace("[", "").replace("]", "");
        String[] parts = clean.split(",");

        float[] vector = new float[parts.length];
        for (int i = 0; i < parts.length; i++) {
            vector[i] = Float.parseFloat(parts[i].trim());
        }
        return vector;
    }

    private float cosineSimilarity(float[] a, float[] b) {
        float dot = 0f, normA = 0f, normB = 0f;

        for (int i = 0; i < a.length; i++) {
            dot += a[i] * b[i];
            normA += a[i] * a[i];
            normB += b[i] * b[i];
        }

        return (float) (dot / (Math.sqrt(normA) * Math.sqrt(normB)));
    }
}
