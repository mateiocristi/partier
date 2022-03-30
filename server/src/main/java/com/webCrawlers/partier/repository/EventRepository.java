package com.webCrawlers.partier.repository;


import com.webCrawlers.partier.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {

}