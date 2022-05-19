package com.webCrawlers.partier.controller;

import com.stripe.model.PaymentIntent;
import com.webCrawlers.partier.model.CardDetails;
import com.webCrawlers.partier.model.Event;
//import com.webCrawlers.partier.model.Order;
import com.webCrawlers.partier.model.TicketOrder;
import com.webCrawlers.partier.service.*;
//import com.webCrawlers.partier.service.OrderServiceImp;
import com.webCrawlers.partier.util.StripeApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

import static com.webCrawlers.partier.util.StripeApi.createPaymentIntent;

@RestController
@RequestMapping("/events")
@CrossOrigin(origins = "http://localhost:3000")
public class EventsController {

    EventServiceImp eventService;
    TicketOrderServiceImp orderService;
    UserServiceImp userService;

    @Autowired
    public EventsController(EventServiceImp es, TicketOrderServiceImp tos, UserServiceImp us) {
        this.eventService = es;
        this.orderService = tos;
        this.userService = us;
    }

    @GetMapping("/{id}")
    public Event getEvent(@PathVariable Long id) {
        return eventService.getEvent(id);
    }

    @GetMapping("/approved")
    public Set<Event> getAllApprovedEvents() {
        return eventService.getAllApprovedEvents();
    }

    @GetMapping("/unapproved")
    public Set<Event> getAllUnapprovedEvents() {
        return eventService.getAllUnapprovedEvents();
    }

    @PostMapping
    public void addEvent(@RequestBody Event event) {
        eventService.addEvent(event);
    }

    @PutMapping("/approve/{id}")
    public void approveEvent(@PathVariable Long id) {
        eventService.approveEvent(id);
    }

    @PostMapping("/delete/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
    }


    @GetMapping("/favorites/{userId}")
    public Set<Event> getAllFavoriteEventsForUser(@PathVariable Long userId) {
        return eventService.getAllFavoriteEventsForUser(userId);
    }

    @GetMapping("/buy/{userId}/{eventId}/{stripeUserId}")
    public String buyTicket(@RequestBody CardDetails cardDetails, @PathVariable Long userId, @PathVariable String stripeUserId, @PathVariable Long eventId) {
        String stripePaymentMethodId = userService.generatePaymentMethodId(cardDetails, String.valueOf(userService.getUser(userId).getUsername()));
        PaymentIntent paymentIntent = createPaymentIntent(100, "USD", stripeUserId);
        PaymentIntent updatedPaymentIntent = StripeApi.tryToConfirmPayment(paymentIntent, stripePaymentMethodId);
        if (updatedPaymentIntent.getStatus().equals("succeeded")) {
            System.out.println("payment success");
            // create order
            TicketOrder ticketOrder = TicketOrder.builder().build();
            ticketOrder.setDescription("this is a ticket");
            System.out.println("user id is ..." + userId);
            ticketOrder.setUser(userService.getUser(userId));
            ticketOrder.setEvent(eventService.getEvent(eventId));
            orderService.addOrder(ticketOrder);
            return updatedPaymentIntent.getId();
        } else {
            return "failed";
        }
    }
}
