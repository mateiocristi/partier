package com.webCrawlers.partier.service;

import com.webCrawlers.partier.model.Card;
import com.webCrawlers.partier.model.CardDetails;
import com.webCrawlers.partier.model.Event;
import com.webCrawlers.partier.model.user.AppUser;
import com.webCrawlers.partier.model.user.Role;
import com.webCrawlers.partier.repository.CardRepository;
import com.webCrawlers.partier.repository.EventRepository;
import com.webCrawlers.partier.repository.RoleRepo;
import com.webCrawlers.partier.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.stripe.model.Customer;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

import static com.webCrawlers.partier.util.StripeApi.createCustomer;
import static com.webCrawlers.partier.util.StripeApi.createPaymentMethod;
import static com.webCrawlers.partier.util.StripeApi.attachesPaymentMethodToCustomer;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImp implements UserService, UserDetailsService {

    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final EventRepository eventRepo;
    private final CardRepository cardRepository;
    private final PasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user = userRepo.findByUsername(username);
        Collection<SimpleGrantedAuthority> roles = new ArrayList<>();
        user.getRoles().forEach(role -> roles.add(new SimpleGrantedAuthority(role)));
        return new User(user.getUsername(), user.getPassword(), roles);
    }

    @Override
    public AppUser saveUser(AppUser appUser) {
        appUser.setPassword(bCryptPasswordEncoder.encode(appUser.getPassword()));
        Customer customer = createCustomer();
        appUser.setStripeCustomerId(customer.getId());
        return userRepo.save(appUser);
    }

    @Override
    public Role saveRole(Role role) {
        return roleRepo.save(role);
    }

    @Override
    public AppUser updateUser(AppUser user, long id) {
        AppUser appUser = userRepo.findById(id).get();
        // TODO: fix bug when update user details without changing password
        appUser.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        appUser.setFirstName(user.getFirstName());
        appUser.setLastName(user.getLastName());
        appUser.setAddress(user.getAddress());
        appUser.setEmail(user.getEmail());
        return userRepo.save(appUser);
    }

    @Override
    public AppUser getUser(long id) {
        return userRepo.findById(id).get();
    }

    @Override
    public AppUser getUser(String username) {
        return userRepo.findByUsername(username);
    }

    @Override
    public List<AppUser> getUsers() {
        return userRepo.findAll();
    }

    @Override
    public void addEventToFavorites(String username, Long eventId) {
        AppUser appUser = userRepo.findByUsername(username);
        Event event = eventRepo.getById(eventId);
        appUser.getFavoriteEvents().add(event);
        userRepo.save(appUser);
    }

    @Override
    public void addCard(String username, Long cardId) {
        AppUser appUser = userRepo.findByUsername(username);
        Card card = cardRepository.getById(cardId);
        appUser.getCards().add(card);
        userRepo.save(appUser);
    }


    @Override
    public String generatePaymentMethodId(CardDetails cardDetails, String username) {
        AppUser user = userRepo.findByUsername(username);
        String paymentMethodId = createPaymentMethod(cardDetails.getNumber(), cardDetails.getExpMonth(), cardDetails.getExpYear(), String.valueOf(cardDetails.getCvv()));
        attachesPaymentMethodToCustomer(String.valueOf(user.getStripeCustomerId()),
                paymentMethodId);
        return paymentMethodId;
    }

    @Override
    public Set<Event> getAllFavoriteEventsForUser(String username) {
        return Set.copyOf(userRepo.findByUsername(username).getFavoriteEvents());
    }

}
