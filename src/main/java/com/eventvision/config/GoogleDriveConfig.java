package com.eventvision.config;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.core.io.ClassPathResource;


import java.io.FileInputStream;
import java.io.InputStream;
import java.util.List;

@Configuration
public class GoogleDriveConfig {

    @Bean
    public Drive driveService() throws Exception{
        InputStream inputStream =
                new ClassPathResource("credentials.json").getInputStream();

        GoogleCredentials credentials = GoogleCredentials
                .fromStream(inputStream)
                .createScoped(List.of(DriveScopes.DRIVE_READONLY));

        return new Drive.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                JacksonFactory.getDefaultInstance(),
                new HttpCredentialsAdapter(credentials)
        )
                .setApplicationName("Event Gallery Backend")
                .build();
    }
}
