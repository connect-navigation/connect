package mk.ukim.finki.connect.repository;

import mk.ukim.finki.connect.model.SuperMarket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuperMarketRepository extends JpaRepository<SuperMarket, Long> {
}
