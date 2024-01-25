package com.pcrs.pcrs.profile.dto;

public class UserProfileDto {
    private String firstName;
    private String lastName;
    private String email;
    private String dob;
    private String username;
    private int followerCount;
    private int followingCount;
    private String password;
    private String bio;
    private int themeColorPref;
    private int pfpPref;
    private String setupDescription;

    public UserProfileDto() {
    }

    public UserProfileDto(String firstName, String lastName, String email, String dob, String username, String password,
            String profileImageFilePath, String bio, byte[] setupImage, String setupDescription, int followerCount,
            int followingCount, int themeColorPref, int pfpPref) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dob = dob;
        this.username = username;
        this.password = password;
        this.bio = bio;
        this.themeColorPref = themeColorPref;
        this.setupDescription = setupDescription;
        this.followerCount = followerCount;
        this.followingCount = followingCount;
        this.pfpPref = pfpPref;

    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getSetupDescription() {
        return setupDescription;
    }

    public void setSetupDescription(String setupDescription) {
        this.setupDescription = setupDescription;
    }

    public int getFollowerCount() {
        return followerCount;
    }

    public void setFollowerCount(int followerCount) {
        this.followerCount = followerCount;
    }

    public int getFollowingCount() {
        return followingCount;
    }

    public void setFollowingCount(int followingCount) {
        this.followingCount = followingCount;
    }

    public int getThemeColorPref() {
        return themeColorPref;
    }

    public void setThemeColorPref(int themeColorPref) {
        this.themeColorPref = themeColorPref;
    }

    public int getPfpPref() {
        return pfpPref;
    }

    public void setPfpPref(int pfpPref) {
        this.pfpPref = pfpPref;
    }

}
