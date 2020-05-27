package com.airhacks;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonValue;
import javax.json.stream.JsonParser;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.ListJoin;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Selection;
import javax.persistence.criteria.SetJoin;
import javax.persistence.metamodel.SingularAttribute;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;

import javax.ws.rs.core.MediaType;

import model.Member;
import model.Stock;

@Path("test")
public class TestResource {
	@GET
	@Path("/get")
	public JsonArray tests() {

		EntityManagerFactory emfactory = Persistence.createEntityManagerFactory("InfoSys");

		EntityManager entityManager = emfactory.createEntityManager();
		entityManager.getTransaction().begin();
		
		Query query = entityManager.createQuery("SELECT DISTINCT m FROM Member m INNER JOIN m.stocks s", Member.class);
		List<Member> memberResults = query.getResultList();
		

		entityManager.close();
		emfactory.close();

		JsonArrayBuilder ab = Json.createArrayBuilder();
		for (Member result : memberResults)
			ab.add(memberTest(result));

		return ab.build();
	}

	public JsonObject test(String name, int age) {
		return Json.createObjectBuilder().add("name", name).add("age", age).build();
	}

	public JsonObject memberTest(Member member) {
		JsonObjectBuilder memberObject =  Json.createObjectBuilder().add("id", member.getId()).add("name", member.getName())
				.add("phone", member.getPhoneNumber()).add("address", member.getAddress())
				.add("authCard", member.getAuthCardNumber());
		JsonArrayBuilder stocks = Json.createArrayBuilder();
		for (Stock stock : member.getStocks()) {
			stocks.add(
					Json.createObjectBuilder()
					.add("title", stock.getTitle())
					.add("author", stock.getAuthor())
					.add("sourceDate", stock.getSourceDate().toString())
					.add("type", stock.getType())
					.add("state", stock.getStatus())
					.build()
					);
		}
		memberObject.add("stocks", stocks);
		return memberObject.build();
	}

	@POST
	@Path("/post")
	@Consumes(MediaType.APPLICATION_JSON)
	public JsonArray testPost(InputStream inputStream) {
		JsonArrayBuilder array = Json.createArrayBuilder();
		JsonObject jsonObject = Json.createReader(inputStream).readObject();
		array.add(jsonObject);
		return array.build();
	}

}
