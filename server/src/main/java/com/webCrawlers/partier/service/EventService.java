package com.webCrawlers.partier.service;

import com.webCrawlers.partier.model.Event;

import java.util.Set;

public interface EventService {

    Set<Event> getAllApprovedEvents();

    Set<Event> getAllUnapprovedEvents();

    Event getEvent(Long id);

    void addEvent(Event event);

    Boolean approveEvent(Long id);

    void deleteEvent(Long id);

    Set<Event> getAllFavoriteEventsForUser(Long userId);
}
