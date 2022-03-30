package com.webCrawlers.partier.repository;

import com.webCrawlers.partier.model.TicketOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketOrderRepository extends JpaRepository<TicketOrder, Long> {
}
