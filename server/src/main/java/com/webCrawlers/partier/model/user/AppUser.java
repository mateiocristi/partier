package com.webCrawlers.partier.model.user;

import com.webCrawlers.partier.model.Event;
import com.webCrawlers.partier.model.TicketOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.*;

@Entity @Data @NoArgsConstructor @AllArgsConstructor
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String address;
    private String birthdate;
    private String profilePhoto;
    private String password;

    private String stripeCustomerId;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @ManyToMany
    private Collection<Event> favoriteEvents = new ArrayList<>();

    @OneToMany
    private Set<TicketOrder> orders = new HashSet<>();
}
