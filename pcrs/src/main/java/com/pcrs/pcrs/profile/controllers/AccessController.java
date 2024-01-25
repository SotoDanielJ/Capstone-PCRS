package com.pcrs.pcrs.profile.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.pcrs.pcrs.profile.dto.UserProfileDto;
import com.pcrs.pcrs.profile.models.UserProfileModel;
import com.pcrs.pcrs.profile.repos.UserProfileRepository;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class AccessController extends CredentialController {

    @Resource
    private UserProfileRepository userProfileRepository;

    public AccessController(UserProfileRepository userProfileRepository) {
        super(userProfileRepository);
    }

    @PostMapping("/login")
    public ResponseEntity<?> postLogin(@RequestBody UserProfileModel model, HttpServletResponse response) {
        UserProfileModel user = userProfileRepository.findByUsername(model.getUsername());
        if (this.login(model.getUsername(), model.getPassword(), response)) {
            UserProfileDto userProfileDto = new UserProfileDto();
            userProfileDto.setFirstName(user.getFirstName());
            userProfileDto.setLastName(user.getLastName());
            userProfileDto.setUsername(user.getUsername());
            userProfileDto.setEmail(user.getEmail());
            userProfileDto.setBio(user.getBio());
            userProfileDto.setFollowerCount(user.getFollowers().size());
            userProfileDto.setFollowingCount(user.getFollowing().size());
            userProfileDto.setSetupDescription(user.getSetupDescription());
            userProfileDto.setThemeColorPref(user.getThemeColorPref());
            return ResponseEntity.ok(userProfileDto);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Login.");
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletResponse response) {
        this.logout(response);
        return ResponseEntity.ok("You have been logged out.");
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUsers() {
        return ResponseEntity.ok(userProfileRepository.findAll());
    }
}
