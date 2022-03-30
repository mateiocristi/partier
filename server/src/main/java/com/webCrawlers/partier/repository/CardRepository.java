package com.webCrawlers.partier.repository;

import com.webCrawlers.partier.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card, Long> {
}
