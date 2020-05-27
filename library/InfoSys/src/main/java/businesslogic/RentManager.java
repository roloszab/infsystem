package businesslogic;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import model.Stock;
import model.Member;

public class RentManager {
	
	public class Rent { 
		Member member;
		Stock stock;
		public Rent(Member member, Stock stock) {
			this.member = member;
			this.stock = stock;
		}
	}
	
	EntityManager entityManager = Persistence.createEntityManagerFactory("InfoSys").createEntityManager();
	
	public String add(int memberID, int stockID) {
		try {
			Stock stock = entityManager.find(Stock.class, stockID);
			entityManager.getTransaction().begin();
			if (stock.getStatus() == 1 || stock.getStatus() == 2)
				throw new Exception("Renting reserved or waste media is not allowed!");
			Member member = entityManager.find(Member.class, memberID);
			stock.setMember(member);
			stock.setStatus(1);
			entityManager.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			return "Rent failed";
		} 
		return "Rent succesful";
	}

	public List<Rent> getAll() {
		List<Rent> rents = new ArrayList<>();
		TypedQuery<Stock> queryStocks = entityManager.createQuery("SELECT DISTINCT media FROM Stock media", Stock.class);
		List<Stock> stocks = queryStocks.getResultList().stream().filter(s -> s.getMember() != null).collect(Collectors.toList());
		for (Stock stock: stocks) {
			Member tempMember = new Member();
			tempMember = entityManager.find(Member.class, stock.getMember().getId());
			rents.add(new Rent(tempMember, stock));
		}
		return rents;
	}
	
	public String delete(int id) {
		try {
			Stock stock = entityManager.find(Stock.class, id);
			entityManager.getTransaction().begin();
			stock.setMember(null);
			stock.setStatus(0);
			entityManager.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			return "Could not delete rent!";
		}
		return "Succesfully deleted rent!";
	}
	
	public JsonObject rentToJsonObject(Rent rent) {
		JsonObject memberObject =  new MemberManager().memberToJsonObject(rent.member);
		JsonObject stockObject = new StockManager().stockToJsonObject(rent.stock);
		return Json.createObjectBuilder()
				.add("member", memberObject)
				.add("stock", stockObject)
				.build();
	}

}
