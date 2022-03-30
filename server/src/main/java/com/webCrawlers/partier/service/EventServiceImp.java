package com.webCrawlers.partier.service;

import com.webCrawlers.partier.model.Event;
import com.webCrawlers.partier.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventServiceImp implements EventService {

    EventRepository eventRepository;

    @Autowired
    public EventServiceImp(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public Set<Event> getAllApprovedEvents() {
        return Set.copyOf(eventRepository.findAll().stream().filter(event -> event.isApproved()).collect(Collectors.toSet()));
    }

    @Override
    public Set<Event> getAllUnapprovedEvents() {
        return Set.copyOf(eventRepository.findAll().stream().filter(event -> !event.isApproved()).collect(Collectors.toSet()));
    }

    @Override
    public Set<Event> getAllFavoriteEventsForUser(Long userId) {
//        return eventRepository.
        return Set.copyOf(eventRepository.findAll().stream().filter(event -> !event.isApproved()).collect(Collectors.toSet()));
    }

    @Override
    public Event getEvent(Long id) {
        return eventRepository.findById(id).orElse(null);
    }

    @Override
    public void addEvent(Event event) {
        eventRepository.save(event);
    }

    @Override
    public Boolean approveEvent(Long id) {
        try {
            Event event = eventRepository.getById(id);
            event.setApproved(true);
            eventRepository.save(event);
            return true;
        } catch (Exception e) {
            System.out.println("*Can't approve event: " + e);
            return false;
        }
    }

    @Override
    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }


}
