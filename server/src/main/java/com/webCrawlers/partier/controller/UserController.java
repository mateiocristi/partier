package com.webCrawlers.partier.controller;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.stripe.model.PaymentMethod;
import com.webCrawlers.partier.model.Card;
import com.webCrawlers.partier.model.CardDetails;
import com.webCrawlers.partier.model.Event;
import com.webCrawlers.partier.model.user.AppUser;
import com.webCrawlers.partier.service.CardService;
import com.webCrawlers.partier.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


import javax.annotation.security.RolesAllowed;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.UUID;

import java.net.URI;
import java.util.List;
import java.util.Set;

import static com.webCrawlers.partier.util.StripeApi.getPaymentMethodsByIds;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {


    @Value("${document.bucket-name}")
    private String bucketName;

    @Autowired
    private AmazonS3 amazonS3;

    private final UserService userService;
    private final CardService cardService;

    @GetMapping("/users")
    public ResponseEntity<List<AppUser>> getUsers() {
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<AppUser> getUserById(@PathVariable long id) {
        return ResponseEntity.ok().body(userService.getUser(id));
    }

    @GetMapping("/users/name/{username}")
    public ResponseEntity<AppUser> getUserByUsername(@PathVariable String username) {
        return ResponseEntity.ok().body(userService.getUser(username));
    }

    @GetMapping("/user/organiser")
    public boolean getAuth() {
        return true;
    }

    @PostMapping("/user/save")
    public ResponseEntity<AppUser> saveUser(@RequestBody AppUser user) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save").toUriString());
        return ResponseEntity.created(uri).body(userService.saveUser(user));
    }

    @PostMapping("/user/update/{id}")
    public ResponseEntity<AppUser> updateUser(@RequestBody AppUser user, @PathVariable long id) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/update").toUriString());
        return ResponseEntity.created(uri).body(userService.updateUser(user, id));
    }

//    @PostMapping("/event/favorites")
//    public ResponseEntity<?> addToFavorites(@RequestBody EventToUserForm eventToUserForm) {
//        userService.addEventToFavorites(eventToUserForm.getUsername(), eventToUserForm.getEventId());
//        return ResponseEntity.ok().build();
//    }
//
//    @GetMapping("/cards/{username}")
//    public List<CardDetails> getCardsForUser(@PathVariable String username) {
//        return userService.getCardsForUser(username);
//    }

    @PostMapping("/uploadPicture")
    public ResponseEntity uploadDocument(@RequestParam(value = "file") MultipartFile file) throws IOException {
        System.out.println("file name " + file.getOriginalFilename());
        String tempFileName = file.getOriginalFilename();
        File tempFile = new File(System.getProperty("java.io.tmpdir") + "/" + tempFileName);
        file.transferTo(tempFile); // Convert multipart file to File
        String key = file.getOriginalFilename(); // unique key for the file
        amazonS3.putObject(bucketName, key, tempFile); // Upload file
        tempFile.deleteOnExit(); //delete temp file
        return ResponseEntity.created(URI.create(tempFileName)).build();
    }

    @GetMapping("/getProfilePic/{fileName}")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable String fileName) throws IOException {
        S3Object data = amazonS3.getObject(bucketName, fileName); // fileName is key which is used while uploading the object
        S3ObjectInputStream objectContent = data.getObjectContent();
        byte[] bytes = IOUtils.toByteArray(objectContent);
        ByteArrayResource resource = new ByteArrayResource(bytes);
        objectContent.close();
        return ResponseEntity
                .ok()
                .contentLength(bytes.length)
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + fileName + "\"")
                .body(resource);
    }

    @GetMapping("/event/favorites/{username}")
    public Set<Event> getFavoritesForUser(@PathVariable String username) {
        return userService.getAllFavoriteEventsForUser(username);
    }

    @PostMapping("/user/add-card/{username}")
    public ResponseEntity<?> addCardToUser(@RequestBody CardDetails cardDetails, @PathVariable String username) {
        String stripePaymentMethodId = userService.generatePaymentMethodId(cardDetails, String.valueOf(username));
        Long id = cardService.addCard(new Card(null, stripePaymentMethodId));
        userService.addCard(username, id);
        return ResponseEntity.ok().build();
    }
}

@Data
class EventToUserForm {
    private String username;
    private Long eventId;
}



