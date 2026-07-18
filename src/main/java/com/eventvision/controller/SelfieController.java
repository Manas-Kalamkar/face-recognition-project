package com.eventvision.controller;

import com.eventvision.DTO.MatchResponse;
import com.eventvision.service.SelfieSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class SelfieController {

    private final SelfieSearchService service;

    @PostMapping(value = "/events/search-selfie/{eventId}",
    consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<MatchResponse> searchBySelfie(
            @PathVariable String eventId,
            @RequestParam(name = "file") MultipartFile selfie
            ) throws Exception {

        return ResponseEntity.ok(service.search(eventId,selfie));

    }
}
