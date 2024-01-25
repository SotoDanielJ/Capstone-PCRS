package com.pcrs.pcrs.profile.models;

import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pcrs.pcrs.bot.models.RecommendationModel;

import jakarta.persistence.*;

@Entity
@Table(name = "user_profiles")
public class UserProfileModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private String dob;
    private String username;
    private String password;
    private int themeColorPref;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BlogPost> blogPosts = new ArrayList<>();

    @Column(columnDefinition = "TEXT")
    private String bio;

    @ManyToMany
    @JoinTable(name = "user_followers", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "follower_id"))
    @JsonIgnore
    private List<UserProfileModel> followers;

    @ManyToMany
    @JoinTable(name = "user_following", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "following_id"))
    @JsonIgnore
    private List<UserProfileModel> following;

    @Lob
    private byte[] setupImage;

    @Column(columnDefinition = "TEXT")
    private String setupDescription;


    @OneToMany(mappedBy = "userProfile", cascade = CascadeType.ALL)
    private List<RecommendationModel> recommendations;

    public UserProfileModel() {

    }

    public UserProfileModel(String firstName, String lastName, String email, String dob, String username,
            String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dob = dob;
        this.username = username;
        this.password = password;
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

    public List<UserProfileModel> getFollowers() {
        if (followers == null) {
            followers = new ArrayList<>();
        }
        return followers;
    }

    public void setFollowers(List<UserProfileModel> followers) {
        this.followers = followers;
    }

    public List<UserProfileModel> getFollowing() {
        if (following == null) {
            following = new ArrayList<>();
        }
        return following;
    }

    public void setFollowing(List<UserProfileModel> following) {
        this.following = following;
    }

    public String getSetupDescription() {
        return setupDescription;
    }

    public void setSetupDescription(String setupDescription) {
        this.setupDescription = setupDescription;
    }

    public int getThemeColorPref() {
        return themeColorPref;
    }

    public void setThemeColorPref(int themeColorPref) {
        this.themeColorPref = themeColorPref;
    }

    public List<RecommendationModel> getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(List<RecommendationModel> recommendations) {
        this.recommendations = recommendations;
    }


}
