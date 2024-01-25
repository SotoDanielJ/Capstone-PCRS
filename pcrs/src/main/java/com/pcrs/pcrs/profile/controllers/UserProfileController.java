package com.pcrs.pcrs.profile.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pcrs.pcrs.profile.dto.BlogPostDto;
import com.pcrs.pcrs.profile.dto.UserProfileDto;
import com.pcrs.pcrs.profile.models.BlogPost;
import com.pcrs.pcrs.profile.models.UserProfileModel;
import com.pcrs.pcrs.profile.repos.BlogPostRepository;
import com.pcrs.pcrs.profile.repos.UserProfileRepository;
import com.pcrs.pcrs.profile.services.BlogPostService;
import com.pcrs.pcrs.profile.services.UserProfileService;
import java.util.*;
import jakarta.annotation.Resource;
import jakarta.servlet.http.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/users")
public class UserProfileController extends CredentialController {

    @Resource
    private final UserProfileService userProfileService;

    @Resource
    private BlogPostRepository blogPostRepository;

    @Resource
    BlogPostService blogPostService;

    @Resource
    private UserProfileRepository userProfileRepository;

    public UserProfileController(UserProfileService userProfileService, UserProfileRepository userProfileRepository) {
        super(userProfileRepository);
        this.userProfileService = userProfileService;
        this.userProfileRepository = userProfileRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProfile(@RequestBody UserProfileModel profile) {

        if (userProfileService.existsByUsername(profile.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Username already exists. Please choose a different one.");
        }
        if (userProfileService.existsByEmail(profile.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email already exists. Please choose a different one.");
        }

        UserProfileDto newUser = userProfileService.createProfile(profile);
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/create/post/{username}")
    public ResponseEntity<?> createPost(@PathVariable String username, @RequestBody BlogPost post,
            HttpServletRequest request) {

        if (!userProfileService.existsByUsername(username)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Account does not exist.");
        }

        BlogPostDto newPost = blogPostService.createBlogPost(username, post);

        return ResponseEntity.ok(newPost);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllProfiles(HttpServletRequest request) {
        try {
            if (isLoggedIn(request)) {
                List<UserProfileDto> allUsers = userProfileService.getAllProfiles();
                return ResponseEntity.ok(allUsers);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Access. Please log in.");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    

    @GetMapping("/search/{username}")
    public ResponseEntity<?> findUser(@PathVariable String username, HttpServletRequest request) {
        UserProfileDto user = userProfileService.getProfileByUsername(username);

        try {
            if (isLoggedIn(request)) {

                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Access. Please log in.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
    // @GetMapping("/search/{username}")
    // public ResponseEntity<?> findUser(@PathVariable String username,
    // HttpServletRequest request) {
    // try {
    // if (isLoggedIn(request)) {
    // UserProfileDto userProfileDto =
    // userProfileService.getProfileByUsername(username);
    // if (userProfileDto == null) {
    // return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    // }

    // List<BlogPostDto> usersPosts =
    // blogPostService.getAllBlogPostsByUser(username);
    // Map<String, Object> response = new HashMap<>();
    // response.put("user", userProfileDto);
    // response.put("posts", usersPosts);

    // return ResponseEntity.ok(response);
    // } else {
    // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized
    // Access. Please log in.");
    // }
    // } catch (Exception e) {
    // // Log the exception; replace `logger` with your actual logger
    // // logger.error("Error while searching for user: " + username, e);
    // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error
    // occurred");
    // }
    // }

    @GetMapping("/{username}")
    public ResponseEntity<?> userProfile(@PathVariable String username, HttpServletRequest request) {
        try {
            if (isLoggedIn(request)) {
                UserProfileDto user = userProfileService.getProfileByUsername(username);
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Access. Please log in.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @GetMapping("/posts/{username}")
    public ResponseEntity<?> userPosts(@PathVariable String username, HttpServletRequest request) {
        try {
            if (isLoggedIn(request)) {
                UserProfileDto userProfileDto = userProfileService.getProfileByUsername(username);
                if (userProfileDto == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
                }
                List<BlogPostDto> usersPosts = blogPostService.getAllBlogPostsByUser(username);
                return ResponseEntity.ok(usersPosts);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Access. Please log in.");
            }
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    @GetMapping("/posts/all")
    public ResponseEntity<?> getAllPosts(HttpServletRequest request) {
        try {
            if (isLoggedIn(request)) {
                List<BlogPostDto> allPosts = blogPostService.getAllBlogPosts();
                return ResponseEntity.ok(allPosts);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Access. Please log in.");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/posts/category/{categoryIndex}")
    public ResponseEntity<?> getPostsByCategory(@PathVariable int categoryIndex, HttpServletRequest request) {
        try {
            if (isLoggedIn(request)) {
                List<BlogPostDto> relatedPosts = blogPostService.getBlogPostByCategory(categoryIndex);
                return ResponseEntity.ok(relatedPosts);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Access. Please log in.");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PutMapping("/update/personal/{username}")
    public ResponseEntity<?> updateUserInfo(@PathVariable String username,
            @RequestBody UserProfileModel updatedProfile, HttpServletRequest request) {
        try {
            if (isLoggedIn(request)) {
                UserProfileModel existingUser = userProfileRepository.findByUsername(username);

                if (existingUser == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body("User not found with the given username: " + username);
                }

                existingUser.setEmail(updatedProfile.getEmail());
                existingUser.setFirstName(updatedProfile.getFirstName());
                existingUser.setLastName(updatedProfile.getLastName());
                existingUser.setDob(updatedProfile.getDob());
                existingUser.setBio(updatedProfile.getBio());
                existingUser.setSetupDescription(updatedProfile.getSetupDescription());

                userProfileService.updateUserInfo(username, existingUser);

                return ResponseEntity.ok("User information updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Access. Please log in.");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/theme/{username}")
    public ResponseEntity<?> updateProfileTheme(@PathVariable String username,
            @RequestBody UserProfileModel updatedProfile, HttpServletRequest request) {
        try {
            if (isLoggedIn(request)) {
                UserProfileModel existingUser = userProfileRepository.findByUsername(username);

                if (existingUser == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body("User not found with the given username: " + username);
                }

                existingUser.setThemeColorPref(updatedProfile.getThemeColorPref());

                userProfileService.updateUserInfo(username, existingUser);

                return ResponseEntity.ok("User information updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Access. Please log in.");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/password/{username}")
    public ResponseEntity<?> updateUserPassword(@PathVariable String username,
            @RequestBody UserProfileModel updatedProfile, HttpServletRequest request) {
        try {
            if (isLoggedIn(request)) {
                UserProfileModel existingUser = userProfileRepository.findByUsername(username);

                if (existingUser == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body("User not found with the given username: " + username);
                }
                updatedProfile.setUsername(existingUser.getUsername());
                updatedProfile.setEmail(existingUser.getEmail());
                existingUser.setPassword(updatedProfile.getPassword());

                userProfileService.updateUserInfo(username, existingUser);

                return ResponseEntity.ok("Password updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Access. Please log in.");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/email/{username}")
    public ResponseEntity<?> updateUserEmail(@PathVariable String username,
            @RequestBody UserProfileModel updatedProfile, HttpServletRequest request) {
        try {
            if (isLoggedIn(request)) {
                if (userProfileService.existsByEmail(updatedProfile.getEmail()) &&
                        userProfileService.existsByEmail(username) == false) {
                    return ResponseEntity.status(HttpStatus.CONFLICT)
                            .body("Email already exists. Please choose a different one.");
                }
                userProfileService.updateUserInfo(username, updatedProfile);
                return ResponseEntity.ok("Email updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Access. Please log in.");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/username/{username}")
    public ResponseEntity<?> updateUsername(@PathVariable String username, @RequestBody UserProfileModel updatedProfile,
            HttpServletRequest request) {
        try {
            if (isLoggedIn(request)) {
                UserProfileModel existingUser = userProfileRepository.findByUsername(username);
                if (existingUser == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body("User not found with the given username: " + username);
                }

                if (!updatedProfile.getUsername().equals(existingUser.getUsername()) &&
                        userProfileService.existsByUsername(updatedProfile.getUsername())) {
                    return ResponseEntity.status(HttpStatus.CONFLICT)
                            .body("Username already exists. Please choose a different one.");
                }

                existingUser.setUsername(updatedProfile.getUsername());
                userProfileService.updateUserInfo(username, existingUser);

                return ResponseEntity.ok("Username updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized Access. Please log in.");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    private boolean isLoggedIn(HttpServletRequest request) {

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("userData".equals(cookie.getName())) {
                    return cookie.getValue() != null && !cookie.getValue().isEmpty();
                }
            }
        }
        return false;
    }

    @PostMapping("/{followerUsername}/follow/{followeeUsername}")
    public ResponseEntity<?> followUser(@PathVariable String followerUsername, @PathVariable String followeeUsername) {

        UserProfileModel follower = userProfileRepository.findByUsername(followerUsername);
        UserProfileModel followee = userProfileRepository.findByUsername(followeeUsername);

        if (follower == null || followee == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("One or both users not found");
        }
        if (follower.getFollowing().contains(followee)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Already following this user");
        }
        follower.getFollowing().add(followee);
        followee.getFollowers().add(follower);
        userProfileRepository.save(follower);
        userProfileRepository.save(followee);

        return ResponseEntity.ok("Now following user: " + followeeUsername);
    }

    @GetMapping("/{followerUsername}/follows/{followeeUsername}")
    public ResponseEntity<?> checkIfFollowing(@PathVariable String followerUsername,
            @PathVariable String followeeUsername) {

        UserProfileModel follower = userProfileRepository.findByUsername(followerUsername);
        UserProfileModel followee = userProfileRepository.findByUsername(followeeUsername);

        if (follower == null || followee == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("One or both users not found");
        } else if (follower.getFollowing().contains(followee)) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }

    }

    @PutMapping("/{followerUsername}/unfollow/{followeeUsername}")
    public ResponseEntity<?> unfollowUser(@PathVariable String followerUsername,
            @PathVariable String followeeUsername) {

        UserProfileModel follower = userProfileRepository.findByUsername(followerUsername);
        UserProfileModel followee = userProfileRepository.findByUsername(followeeUsername);

        if (follower == null || followee == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
        if (!follower.getFollowing().contains(followee)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You do not follow this user.");
        }
        follower.getFollowing().remove(followee);
        followee.getFollowers().remove(follower);
        userProfileRepository.save(follower);
        userProfileRepository.save(followee);

        return ResponseEntity.ok("You have unfollowed user: " + followeeUsername);
    }

}
