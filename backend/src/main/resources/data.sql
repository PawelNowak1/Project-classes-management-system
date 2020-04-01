INSERT INTO role(id, role) VALUES
    (1, "ROLE_ADMIN")
ON DUPLICATE KEY UPDATE
    id = VALUES(id), role = VALUES(role);

INSERT INTO role(id, role) VALUES
   (2, "ROLE_TEACHER")
ON DUPLICATE KEY UPDATE
    id = VALUES(id), role = VALUES(role);

INSERT INTO role(id, role) VALUES
    (3, "ROLE_STUDENT")
ON DUPLICATE KEY UPDATE
    id = VALUES(id), role = VALUES(role);

INSERT INTO user(id, username, password, role_id, email, name, last_name, active) VALUES
    (1, "admin", "$2a$10$xNe0e6W/6nwCYlyMrMimCe6wZqKjZ.fSvgiOzP5vrdUfxMT11sqIK", 1, "admin@admin.com", "Administrator", "Administrator", "Y")
ON DUPLICATE KEY UPDATE
    username = VALUES(username), password = VALUES(password);