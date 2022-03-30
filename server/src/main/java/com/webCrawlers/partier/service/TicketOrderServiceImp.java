package com.webCrawlers.partier.service;

import com.webCrawlers.partier.model.TicketOrder;
import com.webCrawlers.partier.repository.TicketOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TicketOrderServiceImp implements TicketOrderService {

    TicketOrderRepository ticketOrderRepository;

    @Autowired
    public TicketOrderServiceImp(TicketOrderRepository ticketOrderRepository) {
        this.ticketOrderRepository = ticketOrderRepository;
    }

    @Override
    public void addOrder(TicketOrder ticketOrder) {
        ticketOrderRepository.save(ticketOrder);
    }

    @Override
    public Set<TicketOrder> getAllOrders() {
        return new HashSet<>(ticketOrderRepository.findAll());
    }

    @Override
    public Set<TicketOrder> getAllOrdersForUserId() {
        return null;
    }
}
