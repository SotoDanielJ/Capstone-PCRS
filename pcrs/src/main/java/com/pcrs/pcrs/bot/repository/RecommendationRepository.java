package com.pcrs.pcrs.bot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pcrs.pcrs.bot.models.RecommendationModel;

public interface RecommendationRepository extends JpaRepository<RecommendationModel, Long>{
    List<RecommendationModel> findByUserProfileId(Long userProfileId);
    
    List<RecommendationModel> findByUsername(String username);
}
