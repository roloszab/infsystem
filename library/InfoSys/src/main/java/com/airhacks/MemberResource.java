package com.airhacks;

import java.io.InputStream;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

import businesslogic.MemberManager;
import model.Member;
import model.Stock;

@Path("member") 
public class MemberResource {
	private MemberManager memberManager = new MemberManager();
	@GET
	@Path("/all")
	public JsonArray getAll() {
		JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
		for (Member member: memberManager.getAll()) {
			arrayBuilder.add(memberManager.memberToJsonObject(member));
		}
		System.out.println("Get all of them!");
		return arrayBuilder.build();
	}
	
	@GET
	@Path("/{id}")
	public JsonObject getMember(@PathParam("id") int id) {
		return memberManager.memberToJsonObject(memberManager.get(id));
	}
	
	@POST
	@Path("/add")
	@Consumes(MediaType.APPLICATION_JSON)
	public JsonObject addMember(InputStream inputStream) {
		JsonObject jsonObject = Json.createReader(inputStream).readObject();
		Member member = new Member(
					0, 
					jsonObject.getString("name"), 
					jsonObject.getString("phoneNumber"), 
					jsonObject.getString("idCardNumber"), 
					jsonObject.getString("address")
				);
		String result = memberManager.add(member);
		return Json.createObjectBuilder().add("result", result).build();
	}
	
	@PUT
	@Path("/update/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	public JsonObject updateMember(InputStream inputStream, @PathParam("id") int id) {
		JsonObject jsonObject = Json.createReader(inputStream).readObject();
		Member member = new Member(
					id, 
					jsonObject.getString("name"), 
					jsonObject.getString("phoneNumber"), 
					jsonObject.getString("idCardNumber"), 
					jsonObject.getString("address")
				);
		String result = memberManager.update(member);
		return Json.createObjectBuilder().add("result", result).build();
	}
	
	@DELETE
	@Path("/delete/{id}")
	public JsonObject delete(@PathParam("id") int id) {
		String result = memberManager.delete(id);
		return Json.createObjectBuilder().add("result", result).build();
	}
}
