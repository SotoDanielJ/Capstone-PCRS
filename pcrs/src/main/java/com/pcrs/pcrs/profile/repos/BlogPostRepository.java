package com.pcrs.pcrs.profile.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pcrs.pcrs.profile.models.BlogPost;
import com.pcrs.pcrs.profile.models.UserProfileModel;

public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    
    List<BlogPost> findByCategoryIndex(int categoryIndex);
    List<BlogPost> findByUser(UserProfileModel user);
    List<BlogPost> findByUserUsername(String username);
}


