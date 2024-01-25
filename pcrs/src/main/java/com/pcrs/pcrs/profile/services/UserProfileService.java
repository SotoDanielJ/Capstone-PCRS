package com.pcrs.pcrs.profile.services;

import java.util.*;
import org.springframework.stereotype.Service;
import com.pcrs.pcrs.profile.dto.UserProfileDto;
import com.pcrs.pcrs.profile.models.UserProfileModel;
import com.pcrs.pcrs.profile.repos.UserProfileRepository;

@Service
public class UserProfileService {
    private final UserProfileRepository userProfileRepository;

    public UserProfileService(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    public UserProfileDto createProfile(UserProfileModel profile) {
        UserProfileModel newUser = userProfileRepository.save(profile);
        return convertToDto(newUser);
    }

    public void updateUserInfo(String username, UserProfileModel updatedProfile) {
        UserProfileModel existingUser = userProfileRepository.findByUsername(username);
        existingUser.setFirstName(updatedProfile.getFirstName());
        existingUser.setLastName(updatedProfile.getLastName());
        existingUser.setDob(updatedProfile.getDob());
        existingUser.setUsername(updatedProfile.getUsername());
        existingUser.setEmail(updatedProfile.getEmail());
        existingUser.setPassword(updatedProfile.getPassword());
        existingUser.setThemeColorPref(updatedProfile.getThemeColorPref());
        existingUser.setBio(updatedProfile.getBio());
        existingUser.setSetupDescription(updatedProfile.getSetupDescription());
        userProfileRepository.save(existingUser);
    }
    
    public UserProfileModel getUserByUsername(String username) {
        return userProfileRepository.findByUsername(username);
    }

    public List<UserProfileDto> getAllProfiles() {
        List<UserProfileModel> allUserProfiles = userProfileRepository.findAll();
        return convertAllToDto(allUserProfiles);
    }

    private List<UserProfileDto> convertAllToDto(List<UserProfileModel> userProfiles) {
        List<UserProfileDto> dtoList = new ArrayList<>();
        for (UserProfileModel userProfile : userProfiles) {
            UserProfileDto dto = convertToDto(userProfile);
            dtoList.add(dto);
        }
        return dtoList;
    }

    public UserProfileDto getProfileByUsername(String username) {
        UserProfileModel userProfileModel = userProfileRepository.findByUsername(username);
        if (userProfileModel != null) {
            return convertToDto(userProfileModel);
        } else {
            return null;
        }
    }

    private UserProfileDto convertToDto(UserProfileModel userProfileModel) {

        UserProfileDto response = new UserProfileDto();
        response.setFirstName(userProfileModel.getFirstName());
        response.setLastName(userProfileModel.getLastName());
        response.setDob(userProfileModel.getDob());
        response.setUsername(userProfileModel.getUsername());
        response.setEmail(userProfileModel.getEmail());
        response.setPassword(userProfileModel.getPassword());
        response.setUsername(userProfileModel.getUsername());
        response.setBio(userProfileModel.getBio());
        response.setThemeColorPref(userProfileModel.getThemeColorPref());
        response.setSetupDescription(userProfileModel.getSetupDescription());
        response.setFollowingCount(userProfileModel.getFollowing().size());
        response.setFollowerCount(userProfileModel.getFollowers().size());
        return response;
    }

    public boolean existsByUsername(String username) {
        UserProfileModel existingUser = userProfileRepository.findByUsername(username);
        return existingUser != null;
    }

    public boolean existsByEmail(String email) {
        UserProfileModel existingUser = userProfileRepository.findByEmail(email);
        return existingUser != null;
    }
}
