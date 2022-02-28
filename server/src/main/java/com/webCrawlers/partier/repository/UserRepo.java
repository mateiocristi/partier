package com.webCrawlers.partier.repository;

import com.webCrawlers.partier.model.user.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<AppUser, Long> {
    AppUser findByUsername(String username);
}
