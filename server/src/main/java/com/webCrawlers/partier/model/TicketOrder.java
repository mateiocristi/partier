package com.webCrawlers.partier.model;

import com.webCrawlers.partier.model.user.AppUser;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class TicketOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private boolean isAvailable;

    @ManyToOne
    private AppUser user;

    @ManyToOne
    private Event event;

}
