INSERT INTO users (username, passwd) VALUES ('admin', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4');
INSERT INTO userroles (username, role) VALUES ('admin', 'ADMIN');
INSERT INTO status (status_name) VALUES ('avalible');
INSERT INTO status (status_name) VALUES ('reserved');
INSERT INTO status (status_name) VALUES ('disposed');
INSERT INTO dvd (title, source_date, status_id) VALUES ('Pulp Fiction', '1997-05-21', SELECT id FROM status WHERE status_name = 'available');
INSERT INTO dvd (title, source_date, status_id) VALUES ('Inglorious Basterds', '2009-05-20', SELECT id FROM status WHERE status_name = 'reserved');
INSERT INTO dvd (title, source_date, status_id) VALUES ('Sin city', '2005-03-28', SELECT id FROM status WHERE status_name = 'disposed');