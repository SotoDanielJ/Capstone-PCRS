package com.pcrs.pcrs.bot.service;

import java.util.List;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcrs.pcrs.bot.models.RecommendationModel;
import com.pcrs.pcrs.bot.repository.RecommendationRepository;

@Service
public class RecommendationService {

    @Autowired
    private RecommendationRepository recommendationRepository;

    public void saveRecommendation(RecommendationModel recommendationModel) {
        recommendationRepository.save(recommendationModel);
    }

    public List<RecommendationModel> getRecommendationsByUserId(Long userId) {
        try {
            // Assuming you have a repository method to fetch recommendations by user
            // profile ID
            return recommendationRepository.findByUserProfileId(userId);
        } catch (Exception e) {
            // Handle exceptions or log them
            throw new RuntimeException("Error fetching recommendations by user ID", e);
        }
    }

    public RecommendationModel getQuizDataByUsername(String username) throws Exception {
        List<RecommendationModel> recommendations = recommendationRepository.findByUsername(username);

        if (!recommendations.isEmpty()) {
            // Assuming you have a constructor in RecommendationModel to create a new
            // instance
            // based on existing data
            RecommendationModel recommendationModel = recommendations.get(0);
            return new RecommendationModel(
                    recommendationModel.getQuestions(),
                    recommendationModel.getAnswers(),
                    recommendationModel.getApiResponse());
        } else {
            throw new NameNotFoundException("Data not found for username: " + username);
        }
    }
}