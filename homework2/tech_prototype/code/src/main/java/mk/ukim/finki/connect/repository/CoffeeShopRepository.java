package mk.ukim.finki.connect.repository;

import mk.ukim.finki.connect.model.CoffeeShop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CoffeeShopRepository extends JpaRepository<CoffeeShop, Long> {
}
