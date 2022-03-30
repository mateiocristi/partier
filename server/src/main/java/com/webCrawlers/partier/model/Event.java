package com.webCrawlers.partier.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.webCrawlers.partier.model.user.AppUser;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @Column(
            length = 2000
    )
    private String description;
    private String location;
    private String startDate;
    private String endDate;
    private String image;
    private String category;
    private boolean approved;

    @ManyToMany
    private Collection<AppUser> likedEvents = new ArrayList<>();

    @OneToMany
    private Set<TicketOrder> orders = new HashSet<>();
}
