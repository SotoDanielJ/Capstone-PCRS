package com.pcrs.pcrs.profile.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import com.pcrs.pcrs.profile.models.UserProfileModel;

public interface UserProfileRepository extends JpaRepository<UserProfileModel, Long> {
    UserProfileModel findByUsername(String username);
    UserProfileModel findByEmail(String email);
}
