package com.airhacks;

import java.io.InputStream;
import java.time.LocalDate;
import java.util.List;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

import businesslogic.RentManager;
import businesslogic.RentManager.Rent;

@Path("rent")
public class RentResource {
	
	RentManager rentManager = new RentManager();

	@GET
	@Path("/all")
	public JsonArray getAll() {
		List<Rent> rents = rentManager.getAll();
		JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
		for (Rent rent : rents) {
			arrayBuilder.add(rentManager.rentToJsonObject(rent));
		}
		return arrayBuilder.build();
	}
	@POST
	@Path("/add")
	@Consumes(MediaType.APPLICATION_JSON)
	public JsonObject addStock(InputStream inputStream) {
		JsonObject jsonObject = Json.createReader(inputStream).readObject();
		JsonObject memberObject = jsonObject.getJsonObject("member");
		JsonObject stockObject = jsonObject.getJsonObject("stock");
		String result = rentManager.add(memberObject.getInt("id"), stockObject.getInt("id"));
		return Json.createObjectBuilder().add("result", result).build();
	}
	@DELETE
	@Path("/delete/{stockId}")
	public JsonObject delete(@PathParam("stockId") int id) {
		String result = rentManager.delete(id);
		return Json.createObjectBuilder().add("result", result).build();
	}
}
