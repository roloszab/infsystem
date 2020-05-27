package businesslogic;

import java.util.List;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import model.Member;
import model.Stock;

public class MemberManager {
	
	EntityManager entityManager = Persistence.createEntityManagerFactory("InfoSys").createEntityManager();
	public List<Member> getAll() {
		Query query = entityManager.createQuery("SELECT DISTINCT m FROM Member m LEFT JOIN m.stocks s");
		List<Member> members = query.getResultList();
		return members;
	}

	public Member get(int id) {
		TypedQuery<Member> query = entityManager.createQuery("SELECT m FROM Member m WHERE m.id = " + id, Member.class);
		return query.getSingleResult();
	}
	
	public String delete(int id) {
		try {
			Member member = entityManager.find(Member.class,  id);
			entityManager.getTransaction().begin();
			for (Stock stock: member.getStocks()) {
				stock.setMember(null);
				stock.setStatus(0);
			}
			entityManager.remove(member);
			entityManager.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			return "Removal unsuccesful";
		}
		return "Removed succesfully";
	}
	
	public String update(Member member) {
		try {
			Member memberToUpdate = entityManager.find(Member.class, member.getId());
			entityManager.getTransaction().begin();
			memberToUpdate.setName(member.getName());
			memberToUpdate.setAddress(member.getAddress());
			memberToUpdate.setAuthCardNumber(member.getAuthCardNumber());
			memberToUpdate.setPhoneNumber(member.getPhoneNumber());
			entityManager.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			return "Update unsuccesful";
		}
		return "Succesfully updated " + member.getName() + "!";
	}

	public String add(Member member) {		
		try {
			entityManager.getTransaction().begin();
			entityManager.persist(member);
			entityManager.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			return member.getName() + " could not be added!";
		}
		return member.getName() + " succesfully added!";
	}
	
	public JsonObject memberToJsonObject(Member member) {
		JsonObjectBuilder memberObject =  Json.createObjectBuilder()
				.add("id", member.getId())
				.add("name", member.getName())
				.add("phoneNumber", member.getPhoneNumber()).add("address", member.getAddress())
				.add("idCardNumber", member.getAuthCardNumber());
		JsonArrayBuilder stocks = Json.createArrayBuilder();
		for (Stock stock : member.getStocks()) {
			stocks.add(new StockManager().stockToJsonObject(stock));
		}
		memberObject.add("stock", stocks);
		return memberObject.build();
	}
}
