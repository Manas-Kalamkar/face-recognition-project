package com.eventvision.service;

import com.eventvision.DTO.MatchResponse;
import com.eventvision.DTO.MlFace;
import com.eventvision.DTO.MlFaceResponse;
import com.eventvision.model.Face;
import com.eventvision.model.Photo;
import com.eventvision.repository.FaceRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SelfieSearchServiceTest {

    @Mock
    private MlClient mlClient;

    @Mock
    private FaceRepository faceRepository;

    @InjectMocks
    private SelfieSearchService selfieSearchService;


    @Test
    void search_shouldThrowWhenNoFaceDetected()
            throws Exception {

        MockMultipartFile selfie =

                new MockMultipartFile(

                        "file",

                        "selfie.jpg",

                        "image/jpeg",

                        new byte[]{1,2,3}

                );



        MlFaceResponse response =

                new MlFaceResponse(

                        0,

                        List.of()

                );



        when(

                mlClient.processImage(any())

        )

                .thenReturn(response);



        RuntimeException ex =

                assertThrows(

                        RuntimeException.class,

                        () -> selfieSearchService.search(

                                "event1",

                                selfie

                        )

                );



        assertEquals(

                "No face detected in selfie",

                ex.getMessage()

        );

    }


    @Test
    void search_shouldReturnEmptyMatches()
            throws Exception {

        MockMultipartFile selfie =

                new MockMultipartFile(

                        "file",

                        "selfie.jpg",

                        "image/jpeg",

                        new byte[]{1}

                );



        MlFace mlFace =

                new MlFace();



        mlFace.setEmbedding(

                List.of(

                        1.0,

                        0.0

                )

        );



        mlFace.setBox(

                List.of(

                        0,

                        0,

                        100,

                        100

                )

        );



        MlFaceResponse response =

                new MlFaceResponse(

                        1,

                        List.of(

                                mlFace

                        )

                );



        when(

                mlClient.processImage(

                        any()

                )

        )

                .thenReturn(

                        response

                );



        when(

                faceRepository

                        .findByPhoto_Event_Id(

                                "event1"

                        )

        )

                .thenReturn(

                        List.of()

                );



        MatchResponse result =

                selfieSearchService.search(

                        "event1",

                        selfie

                );



        assertNotNull(

                result

        );



        assertTrue(

                result

                        .getMatches()

                        .isEmpty()

        );

    }


    @Test
    void search_shouldReturnMatches()
            throws Exception {

        MockMultipartFile selfie =

                new MockMultipartFile(

                        "file",

                        "selfie.jpg",

                        "image/jpeg",

                        new byte[]{1}

                );



        MlFace mlFace =

                new MlFace();



        mlFace.setEmbedding(

                List.of(

                        1.0,

                        0.0

                )

        );



        mlFace.setBox(

                List.of(

                        0,

                        0,

                        100,

                        100

                )

        );



        MlFaceResponse response =

                new MlFaceResponse(

                        1,

                        List.of(

                                mlFace

                        )

                );



        when(

                mlClient.processImage(

                        any()

                )

        )

                .thenReturn(

                        response

                );



        Photo photo =

                Photo.builder()

                        .id("p1")

                        .filename("image1.jpg")

                        .build();



        Face dbFace =

                Face.builder()

                        .embedding("[1.0,0.0]")

                        .photo(photo)

                        .build();



        when(

                faceRepository

                        .findByPhoto_Event_Id(

                                "event1"

                        )

        )

                .thenReturn(

                        List.of(

                                dbFace

                        )

                );



        MatchResponse result =

                selfieSearchService.search(

                        "event1",

                        selfie

                );



        assertEquals(

                1,

                result.getMatches()

                        .size()

        );

    }


    @Test
    void search_shouldKeepBestMatchPerPhoto()
            throws Exception {

        MockMultipartFile selfie =
                new MockMultipartFile(
                        "file",
                        "selfie.jpg",
                        "image/jpeg",
                        new byte[]{1}
                );

        MlFace mlFace = new MlFace();

        mlFace.setEmbedding(
                List.of(1.0,0.0)
        );

        mlFace.setBox(
                List.of(0,0,100,100)
        );

        MlFaceResponse response =
                new MlFaceResponse(
                        1,
                        List.of(mlFace)
                );

        when(
                mlClient.processImage(any())
        )
                .thenReturn(response);



        Photo photo =
                Photo.builder()
                        .id("p1")
                        .filename("group.jpg")
                        .build();



        Face face1 =
                Face.builder()
                        .embedding("[1.0,0.0]")
                        .photo(photo)
                        .build();



        Face face2 =
                Face.builder()
                        .embedding("[0.95,0.05]")
                        .photo(photo)
                        .build();



        when(
                faceRepository.findByPhoto_Event_Id(
                        "event1"
                )
        )
                .thenReturn(
                        List.of(
                                face1,
                                face2
                        )
                );



        MatchResponse result =
                selfieSearchService.search(
                        "event1",
                        selfie
                );



        assertEquals(
                1,
                result.getMatches()
                        .size()
        );

    }

    @Test
    void search_shouldSortByConfidence()
            throws Exception {

        MockMultipartFile selfie =
                new MockMultipartFile(
                        "file",
                        "selfie.jpg",
                        "image/jpeg",
                        new byte[]{1}
                );



        MlFace mlFace =
                new MlFace();



        mlFace.setEmbedding(
                List.of(
                        1.0,
                        0.0
                )
        );



        mlFace.setBox(
                List.of(
                        0,
                        0,
                        100,
                        100
                )
        );



        MlFaceResponse response =
                new MlFaceResponse(
                        1,
                        List.of(
                                mlFace
                        )
                );



        when(
                mlClient.processImage(
                        any()
                )
        )
                .thenReturn(
                        response
                );



        Photo photo1 =
                Photo.builder()

                        .id("p1")

                        .filename("best.jpg")

                        .build();



        Photo photo2 =
                Photo.builder()

                        .id("p2")

                        .filename("second.jpg")

                        .build();



        Face face1 =
                Face.builder()

                        .embedding("[1.0,0.0]")

                        .photo(photo1)

                        .build();



        Face face2 =
                Face.builder()

                        .embedding("[0.80,0.20]")

                        .photo(photo2)

                        .build();



        when(
                faceRepository.findByPhoto_Event_Id(
                        "event1"
                )
        )

                .thenReturn(

                        List.of(

                                face2,

                                face1

                        )

                );



        MatchResponse result =

                selfieSearchService.search(

                        "event1",

                        selfie

                );



        assertEquals(

                2,

                result.getMatches()

                        .size()

        );



        assertEquals(

                "best.jpg",

                result.getMatches()

                        .get(0)

                        .getFilename()

        );

    }



}