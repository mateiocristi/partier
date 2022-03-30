package com.webCrawlers.partier.model;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CardDetails {

    private String sptripePaymentMethodId;
    private String number;
    private int expYear;
    private int expMonth;
    private int cvv;

}
