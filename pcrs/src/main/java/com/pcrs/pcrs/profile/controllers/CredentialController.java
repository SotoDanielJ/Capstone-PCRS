package com.pcrs.pcrs.profile.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import com.pcrs.pcrs.profile.models.UserProfileModel;
import com.pcrs.pcrs.profile.repos.UserProfileRepository;
import jakarta.annotation.Resource;
import jakarta.servlet.http.*;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public abstract class CredentialController {
    @Resource
    private UserProfileRepository userProfileRepository;

    public CredentialController(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    protected boolean login(String username, String password, HttpServletResponse response) {
        logout(response);
        UserProfileModel user = userProfileRepository.findByUsername(username);
        boolean returnValue = false;
        if (user != null && user.getPassword().equals(password)) {
            Cookie usernameCookie = new Cookie("userData", "" + user.getUsername());
            response.addCookie(usernameCookie);
            returnValue = true;
        }
        return returnValue;
    }

    protected void logout(HttpServletResponse response) {
        Cookie usernameCookie = new Cookie("Username", "" + "null");
        usernameCookie.setMaxAge(0);
        response.addCookie(usernameCookie);
    }

}
