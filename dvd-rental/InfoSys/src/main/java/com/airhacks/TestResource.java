package com.airhacks;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("test")
public class TestResource {

	@GET
	public JsonArray tests() {
		return Json.createArrayBuilder().
				add(test("Mamesz", 29)).
				add(test("Papesz", 29)).
				build();
	}

	public JsonObject test(String name, int age) {
		return Json.createObjectBuilder().
				add("name", name).
				add("age", age).
				build();
	}

}
