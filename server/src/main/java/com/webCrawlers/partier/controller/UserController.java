package com.webCrawlers.partier.controller;

import com.webCrawlers.partier.model.Event;
import com.webCrawlers.partier.model.user.AppUser;
import com.webCrawlers.partier.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Set;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {


//    @Value("${document.bucket-name}")
//    private String bucketName;

//    @Autowired
//    private AmazonS3 amazonS3;

    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<AppUser>> getUsers() {
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<AppUser> getUserById(@PathVariable long id) {
        return ResponseEntity.ok().body(userService.getUser(id));
    }

    @GetMapping("/users/check/{username}")
    public ResponseEntity<?> checkUserByUsername(@PathVariable String username) {
        if (userService.getUser(username) !=  null)
            return ResponseEntity.status(HttpStatus.OK).body("found");
        return ResponseEntity.status(HttpStatus.OK).body("not found");
    }

    @GetMapping("/users/name/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUser(username));
    }

    @GetMapping("/user/organiser")
    public boolean getAuth() {
        return true;
    }

    @PostMapping("/user/save")
    public ResponseEntity<?> saveUser(@RequestBody AppUser user) {
        if (userService.getUser(user.getUsername()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("user already exists");
        }
        return ResponseEntity.status(HttpStatus.OK).body(userService.saveUser(user));
    }

    @PostMapping("/user/update/{id}")
    public ResponseEntity<AppUser> updateUser(@RequestBody AppUser user, @PathVariable long id) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/update").toUriString());
        return ResponseEntity.created(uri).body(userService.updateUser(user, id));
    }

    @GetMapping("/event/favorites/{username}")
    public Set<Event> getFavoritesForUser(@PathVariable String username) {
        return userService.getAllFavoriteEventsForUser(username);
    }

    //    @PostMapping("/uploadPicture")
//    public ResponseEntity uploadDocument(@RequestParam(value = "file") MultipartFile file) throws IOException {
//        System.out.println("file name " + file.getOriginalFilename());
//        String tempFileName = file.getOriginalFilename();
//        File tempFile = new File(System.getProperty("java.io.tmpdir") + "/" + tempFileName);
//        file.transferTo(tempFile); // Convert multipart file to File
//        String key = file.getOriginalFilename(); // unique key for the file
//        amazonS3.putObject(bucketName, key, tempFile); // Upload file
//        tempFile.deleteOnExit(); //delete temp file
//        return ResponseEntity.created(URI.create(tempFileName)).build();
//    }

//    @GetMapping("/getProfilePic/{fileName}")
//    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable String fileName) throws IOException {
//        S3Object data = amazonS3.getObject(bucketName, fileName); // fileName is key which is used while uploading the object
//        S3ObjectInputStream objectContent = data.getObjectContent();
//        byte[] bytes = IOUtils.toByteArray(objectContent);
//        ByteArrayResource resource = new ByteArrayResource(bytes);
//        objectContent.close();
//        return ResponseEntity
//                .ok()
//                .contentLength(bytes.length)
//                .header("Content-type", "application/octet-stream")
//                .header("Content-disposition", "attachment; filename=\"" + fileName + "\"")
//                .body(resource);
//    }

}

@Data
class EventToUserForm {
    private String username;
    private Long eventId;
}



