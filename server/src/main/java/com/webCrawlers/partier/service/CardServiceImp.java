package com.webCrawlers.partier.service;

import com.webCrawlers.partier.model.Card;
import com.webCrawlers.partier.repository.CardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CardServiceImp implements CardService {

    CardRepository cardRepository;

    @Autowired
    public CardServiceImp(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    @Override
    public Long addCard(Card card) {
        card = cardRepository.save(card);
        cardRepository.flush();
        return card.getId();
    }
}
