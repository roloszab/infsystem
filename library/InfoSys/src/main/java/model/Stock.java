package model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "media", schema = "library")
public class Stock {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Integer id;
	@Column(name = "TITLE", nullable = false, length = 255)
	private String title;
	@Column(name = "AUTHOR", nullable = false, length = 255)
	private String author;
	@Column(name = "TYPE", nullable = false, length = 255)
	private String type;
	@Column(name = "SOURCE_DATE", columnDefinition = "DATE", nullable = false)
	private LocalDate sourceDate;
	@Column(name = "STATUS", columnDefinition = "integer default 0")
	private Integer status;
	private Member member;

	public Stock() {
		super();
	}

	public Stock(Integer id, String title, String author, String type, LocalDate sourceDate, Integer status) {
		super();
		this.id = id;
		this.title = title;
		this.author = author;
		this.type = type;
		this.sourceDate = sourceDate;
		this.status = status;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public LocalDate getSourceDate() {
		return sourceDate;
	}

	public void setSourceDate(LocalDate sourceDate) {
		this.sourceDate = sourceDate;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	@Override
	public String toString() {
		return "Stock [id=" + id + ", title=" + title + ", author=" + author + ", type=" + type + ", sourceDate="
				+ sourceDate + ", status=" + status + ", member=" + member + "]";
	}

}
