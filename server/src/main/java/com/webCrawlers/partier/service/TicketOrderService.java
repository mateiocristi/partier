package com.webCrawlers.partier.service;

import com.webCrawlers.partier.model.TicketOrder;

import java.util.Set;

public interface TicketOrderService {
    void addOrder(TicketOrder ticketOrder);
    Set<TicketOrder> getAllOrders();
    Set<TicketOrder> getAllOrdersForUserId();
}
