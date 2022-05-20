package com.webCrawlers.partier.controller;

import com.webCrawlers.partier.model.TicketOrder;
import com.webCrawlers.partier.service.TicketOrderServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class TicketOrdersController {

    TicketOrderServiceImp orderService;

    @Autowired
    public TicketOrdersController(TicketOrderServiceImp orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/all")
    public Set<TicketOrder> getAllOrders() {
        return orderService.getAllOrders();
    }

//    @GetMapping("/userId")
//    public Set<TicketOrder> getOrderForId() {
//        return orderService.getAllOrdersForUserId();
//    }
}
