package com.webCrawlers.partier.repository;

import com.webCrawlers.partier.model.Event;
import com.webCrawlers.partier.model.user.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepo extends JpaRepository<AppUser, Long> {
    AppUser findByUsername(String username);

//    @Query(
//            value = "SELECT id FROM event\n" +
//                    "INNER JOIN app_user_favorite_events aufe on event.id = aufe.favorite_events_id\n" +
//                    "WHERE app_user_id = :id;",
//            nativeQuery = true)
//    List<Integer> getFavoriteEventsForUser(@Param("id") long id);
}
