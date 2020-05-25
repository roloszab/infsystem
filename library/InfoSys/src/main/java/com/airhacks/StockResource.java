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
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

import businesslogic.StockManager;
import model.Member;
import model.Stock;

@Path("stock")
public class StockResource {
	
	StockManager stockManager = new StockManager();
	
	@GET
	@Path("/all")
	public JsonArray getAll() {
		List<Stock> stocks = stockManager.getAll();
		JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
		for (Stock stock : stocks) {
			arrayBuilder.add(stockManager.stockToJsonObject(stock));
		}
		return arrayBuilder.build();
	}
	@POST
	@Path("/add")
	@Consumes(MediaType.APPLICATION_JSON)
	public JsonObject addStock(InputStream inputStream) {
		JsonObject jsonObject = Json.createReader(inputStream).readObject();
		Stock stock = new Stock(
					0, 
					jsonObject.getString("title"), 
					jsonObject.getString("author"), 
					jsonObject.getString("type"), 
					LocalDate.parse(jsonObject.getString("type")),
					jsonObject.getInt("state")
				);
		String result = stockManager.add(stock);
		return Json.createObjectBuilder().add("result", result).build();
	}
	
	@PUT
	@Path("/update/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	public JsonObject updateStock(InputStream inputStream, @PathParam("id") int id) {
		JsonObject jsonObject = Json.createReader(inputStream).readObject();
		Stock stock = new Stock( 
					id,
					jsonObject.getString("title"), 
					jsonObject.getString("author"), 
					jsonObject.getString("type"), 
					LocalDate.parse(jsonObject.getString("type")),
					jsonObject.getInt("state")
				);
		String result = stockManager.update(stock);
		return Json.createObjectBuilder().add("result", result).build();
	}
	
	@DELETE
	@Path("/delete/{id}")
	public JsonObject delete(@PathParam("id") int id) {
		String result = stockManager.delete(id);
		return Json.createObjectBuilder().add("result", result).build();
	}

}
