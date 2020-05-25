package model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.criteria.Order;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Entity
@Table(name = "member", schema = "library")
public class Member {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Integer id;
	@Column(name = "NAME", nullable = false, length = 255)
	private String name;
	@Column(name = "PHONE_NUMBER", nullable = false, length = 15)
	private String phoneNumber;
	@Column(name = "AUTH_CARD_NUMBER", nullable = false, length = 8, columnDefinition = "char(8)")
	private String authCardNumber;
	@Column(name = "ADDRESS", nullable = false, length = 255)
	private String address;
	@OneToMany
	@JoinColumn(name = "MEMBER_ID")
	private List<Stock> stocks = new ArrayList<>();

	public Member() {
		super();
	}

	public Member(Integer id, String name, String phoneNumber, String authCardNumber, String address) {
		super();
		this.id = id;
		this.name = name;
		this.phoneNumber = phoneNumber;
		this.authCardNumber = authCardNumber;
		this.address = address;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getAuthCardNumber() {
		return authCardNumber;
	}

	public void setAuthCardNumber(String authCardNumber) {
		this.authCardNumber = authCardNumber;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public List<Stock> getStocks() {
		return stocks;
	}

	public void setStocks(List<Stock> stocks) {
		this.stocks = stocks;
	}

	@Override
	public String toString() {
		return "Member [id=" + id + ", name=" + name + ", phoneNumber=" + phoneNumber + ", authCardNumber="
				+ authCardNumber + ", address=" + address + ", stocks=" + stocks + "]";
	}

}
