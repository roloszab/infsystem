package businesslogic;

import java.util.List;

import javax.json.Json;
import javax.json.JsonObject;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;

import model.Member;
import model.Stock;

public class StockManager {
	EntityManager entityManager = Persistence.createEntityManagerFactory("InfoSys").createEntityManager();

	public List<Stock> getAll() {		
		TypedQuery<Stock> query = entityManager.createQuery("SELECT s FROM Stock s", Stock.class);
		List<Stock> stocks = query.getResultList();
		
		return stocks;
	}
	
	public Stock get(int id) {
		TypedQuery<Stock> query = entityManager.createQuery("SELECT s FROM Stock WHERE s.id = " + id, Stock.class);
		return query.getSingleResult();
	}
	
	public String update(Stock stock) {
		try {
			Stock stockToUpdate = entityManager.find(Stock.class, stock.getId());
			entityManager.getTransaction().begin();
			stockToUpdate.setAuthor(stock.getAuthor());
			stockToUpdate.setTitle(stock.getTitle());
			stockToUpdate.setType(stock.getType());
			stockToUpdate.setSourceDate(stock.getSourceDate());
			entityManager.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			return "Update unsuccesful";
		}
		return "Succesfully updated " + stock.getTitle() + "!";
	}
	
	public String add(Stock stock) {
		try {
			entityManager.getTransaction().begin();
			entityManager.persist(stock);
			entityManager.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			return stock.getTitle() + " could not be added!";
		}
		return stock.getTitle() + " succesfully added!";
	}
	
	public String delete(int id) {
		try {
			Stock stock = entityManager.find(Stock.class, id);
			entityManager.getTransaction().begin();
			stock.setStatus(2);
			stock.setMember(null);
			entityManager.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			return "Removal unsuccesful";
		}
		return "Removed succesfully";
	}
	
	public JsonObject stockToJsonObject(Stock stock) {
		return Json.createObjectBuilder()
				.add("id", stock.getId())
				.add("title", stock.getTitle())
				.add("author", stock.getAuthor())
				.add("sourceDate", stock.getSourceDate().toString())
				.add("type", stock.getType())
				.add("state", stock.getStatus())
				.build();
	}
}
