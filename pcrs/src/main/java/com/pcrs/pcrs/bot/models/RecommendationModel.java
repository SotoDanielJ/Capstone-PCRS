package com.pcrs.pcrs.bot.models;

import com.pcrs.pcrs.profile.models.UserProfileModel;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Recommendations")
public class RecommendationModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "userProfileId", referencedColumnName = "id")
    private UserProfileModel userProfile;

    @Column(length = 1000)
    private String questions;
    @Column(length = 1000)
    private String answers;
    @Column(length = 10000)
    private String apiResponse;
    @Column(length = 100)
    private String username;


    public RecommendationModel() {
    }

    public RecommendationModel(String questions, String answers, String apiResponse) {
        this.questions = questions;
        this.answers = answers;
        this.apiResponse = apiResponse;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getQuestions() {
        return questions;
    }

    public void setQuestions(String questions) {
        this.questions = questions;
    }

    public String getAnswers() {
        return answers;
    }

    public void setAnswers(String answers) {
        this.answers = answers;
    }

    public String getApiResponse() {
        return apiResponse;
    }

    public void setApiResponse(String apiResponse) {
        this.apiResponse = apiResponse;
    }

    public UserProfileModel getUserProfile() {
        return userProfile;
    }

    public void setUserProfile(UserProfileModel userProfile) {
        this.userProfile = userProfile;
    }

    public long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
