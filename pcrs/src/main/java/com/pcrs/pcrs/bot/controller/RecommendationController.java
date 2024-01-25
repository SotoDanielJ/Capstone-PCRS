package com.pcrs.pcrs.bot.controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import com.pcrs.pcrs.bot.models.RecommendationModel;
import com.pcrs.pcrs.bot.service.RecommendationService;
import com.pcrs.pcrs.profile.models.UserProfileModel;
import com.pcrs.pcrs.profile.repos.UserProfileRepository;

@RestController
@RequestMapping("/bot")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @PostMapping("/saveQuiz")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> saveQuizData(@RequestBody Map<String, String> quizData) {
        try {
            String questions = quizData.get("questions");
            String answers = quizData.get("answers");
            String apiResponse = quizData.get("apiResponse");
            String username = quizData.get("username"); // Change 'userId' to 'username'
    
            UserProfileModel userProfile = userProfileRepository.findByUsername(username); // Change 'findById' to 'findByUsername'
            if (userProfile != null) {
                RecommendationModel recommendationModel = new RecommendationModel(questions, answers, apiResponse);
                recommendationModel.setUserProfile(userProfile);
                recommendationModel.setUsername(username);
    
                recommendationService.saveRecommendation(recommendationModel);
    
                return new ResponseEntity<>("Quiz data saved successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Error saving quiz data", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/saveQuiz")
    public ResponseEntity<List<RecommendationModel>> getRecommendations(@RequestParam("userId") Long userId) {
        try {
            // Assuming you have a method in recommendationService to get recommendations by userId
            List<RecommendationModel> recommendations = recommendationService.getRecommendationsByUserId(userId);

            return new ResponseEntity<>(recommendations, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/getRecommendation")
public ResponseEntity<RecommendationModel> fetchQuizDataAndApiResponse(@RequestParam String username) {
    try {
        // Assuming RecommendationService has a method to fetch data by username
        RecommendationModel quizData = recommendationService.getQuizDataByUsername(username);

        // Assuming ApiResponse is a class representing your API response
        RecommendationModel responseModel = new RecommendationModel(
            quizData.getQuestions(),
            quizData.getAnswers(),
            quizData.getApiResponse()
        );

        return new ResponseEntity<>(responseModel, HttpStatus.OK);
    } catch (Exception e) {
        // Handle exceptions appropriately
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

}