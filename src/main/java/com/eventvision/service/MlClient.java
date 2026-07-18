package com.eventvision.service;

import com.eventvision.DTO.MlFaceResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
public class MlClient {

    private final WebClient webClient;

    public MlFaceResponse processImage(byte[] imageBytes) {

        return webClient.post()
                .uri("/process-image")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(
                        BodyInserters.fromMultipartData("file",
                                new ByteArrayResource(imageBytes) {
                                    @Override
                                    public String getFilename() {
                                        return "image.jpg";
                                    }
                                }
                        )
                )
                .retrieve()
                .bodyToMono(MlFaceResponse.class)
                .block();
    }
}
