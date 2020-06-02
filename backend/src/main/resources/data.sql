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

INSERT INTO user(id, username, password, role_id, email, active) VALUES
    (1, "admin", "$2a$10$xNe0e6W/6nwCYlyMrMimCe6wZqKjZ.fSvgiOzP5vrdUfxMT11sqIK", 1, "admin@admin.com", "Y")
ON DUPLICATE KEY UPDATE
    username = VALUES(username), password = VALUES(password);

INSERT INTO user(id, username, password, role_id, email, active) VALUES
    (2, "teacher", "$2a$10$xNe0e6W/6nwCYlyMrMimCe6wZqKjZ.fSvgiOzP5vrdUfxMT11sqIK", 2, "teacher@teacher.com", "Y")
ON DUPLICATE KEY UPDATE
    id = VALUES(id), username = VALUES(username), password = VALUES(password), role_id = VALUES(role_id);

INSERT INTO teacher(first_name, last_name, user_id) VALUES
    ("teacher","teacher", 2)
ON DUPLICATE KEY UPDATE
    user_id = VALUES(user_id);

INSERT INTO user(id, username, password, role_id, email, active) VALUES
    (3, "student", "$2a$10$xNe0e6W/6nwCYlyMrMimCe6wZqKjZ.fSvgiOzP5vrdUfxMT11sqIK", 3, "student@student.com", "Y")
ON DUPLICATE KEY UPDATE
    id = VALUES(id), username = VALUES(username), password = VALUES(password), role_id = VALUES(role_id);

INSERT INTO student(first_name, last_name, user_id) VALUES
    ("student","student", 3)
ON DUPLICATE KEY UPDATE
    user_id = VALUES(user_id);

INSERT INTO user(id, username, password, role_id, email, active) VALUES
    (4, "student2", "$2a$10$xNe0e6W/6nwCYlyMrMimCe6wZqKjZ.fSvgiOzP5vrdUfxMT11sqIK", 3, "student2@student.com", "Y")
ON DUPLICATE KEY UPDATE
    id = VALUES(id), username = VALUES(username), password = VALUES(password), role_id = VALUES(role_id);

INSERT INTO student(first_name, last_name, user_id) VALUES
    ("student2","student2", 4)
ON DUPLICATE KEY UPDATE
    user_id = VALUES(user_id);

INSERT INTO user(id, username, password, role_id, email, active) VALUES
    (5, "student3", "$2a$10$xNe0e6W/6nwCYlyMrMimCe6wZqKjZ.fSvgiOzP5vrdUfxMT11sqIK", 3, "student3@student.com", "Y")
ON DUPLICATE KEY UPDATE
    id = VALUES(id), username = VALUES(username), password = VALUES(password), role_id = VALUES(role_id);

INSERT INTO student(first_name, last_name, user_id) VALUES
    ("student3","student3", 5)
ON DUPLICATE KEY UPDATE
    user_id = VALUES(user_id);

INSERT INTO user(id, username, password, role_id, email, active) VALUES
    (6, "student4", "$2a$10$xNe0e6W/6nwCYlyMrMimCe6wZqKjZ.fSvgiOzP5vrdUfxMT11sqIK", 3, "student4@student.com", "Y")
ON DUPLICATE KEY UPDATE
    id = VALUES(id), username = VALUES(username), password = VALUES(password), role_id = VALUES(role_id);

INSERT INTO student(first_name, last_name, user_id) VALUES
    ("student4","student4", 6)
ON DUPLICATE KEY UPDATE
    user_id = VALUES(user_id);

INSERT INTO user(id, username, password, role_id, email, active) VALUES
    (7, "student5", "$2a$10$xNe0e6W/6nwCYlyMrMimCe6wZqKjZ.fSvgiOzP5vrdUfxMT11sqIK", 3, "student5@student.com", "Y")
ON DUPLICATE KEY UPDATE
    id = VALUES(id), username = VALUES(username), password = VALUES(password), role_id = VALUES(role_id);

INSERT INTO student(first_name, last_name, user_id) VALUES
    ("student5","student5", 7)
ON DUPLICATE KEY UPDATE
    user_id = VALUES(user_id);

INSERT INTO user(id, username, password, role_id, email, active) VALUES
    (8, "student6", "$2a$10$xNe0e6W/6nwCYlyMrMimCe6wZqKjZ.fSvgiOzP5vrdUfxMT11sqIK", 3, "student6@student.com", "Y")
ON DUPLICATE KEY UPDATE
    id = VALUES(id), username = VALUES(username), password = VALUES(password), role_id = VALUES(role_id);

INSERT INTO student(first_name, last_name, user_id) VALUES
    ("student6","student6", 8)
ON DUPLICATE KEY UPDATE
    user_id = VALUES(user_id);

INSERT INTO user(id, username, password, role_id, email, active) VALUES
    (9, "student7", "$2a$10$xNe0e6W/6nwCYlyMrMimCe6wZqKjZ.fSvgiOzP5vrdUfxMT11sqIK", 3, "student7@student.com", "Y")
ON DUPLICATE KEY UPDATE
    id = VALUES(id), username = VALUES(username), password = VALUES(password), role_id = VALUES(role_id);

INSERT INTO student(first_name, last_name, user_id) VALUES
    ("student7","student7", 9)
ON DUPLICATE KEY UPDATE
    user_id = VALUES(user_id);

INSERT INTO user(id, username, password, role_id, email, active) VALUES
    (10, "student8", "$2a$10$xNe0e6W/6nwCYlyMrMimCe6wZqKjZ.fSvgiOzP5vrdUfxMT11sqIK", 3, "student8@student.com", "Y")
ON DUPLICATE KEY UPDATE
    id = VALUES(id), username = VALUES(username), password = VALUES(password), role_id = VALUES(role_id);

INSERT INTO student(first_name, last_name, user_id) VALUES
    ("student8","student8", 10)
ON DUPLICATE KEY UPDATE
    user_id = VALUES(user_id);

INSERT INTO semester(id, course, semester_number, year) VALUES
    (1, "Computer Science", 6, 2019)
ON DUPLICATE KEY UPDATE
    id = VALUES(id), course = VALUES(course);

INSERT INTO topic(id, description, name, status, teacher_user_id) VALUES
    (1, "Spring course", "Spring","open", 2)
ON DUPLICATE KEY UPDATE
    id = VALUES(id), description = VALUES(description), teacher_user_id = VALUES(teacher_user_id);

INSERT INTO section(id, name, section_limit, state, semester_id, topic_id) VALUES
    (1, "Spring section", 5, "open", 1, 1)
ON DUPLICATE KEY UPDATE
    id = VALUES(id), name = VALUES(name), topic_id = VALUES(topic_id);

INSERT INTO topic(id, description, name, status, teacher_user_id) VALUES
    (2, "ReactJS course", "ReactJS","close", 2)
ON DUPLICATE KEY UPDATE
    id = VALUES(id), description = VALUES(description), teacher_user_id = VALUES(teacher_user_id);

INSERT INTO section(id, name, section_limit, state, semester_id, topic_id) VALUES
    (2, "ReactJS section", 5, "close", 1, 2)
ON DUPLICATE KEY UPDATE
    id = VALUES(id), name = VALUES(name), topic_id = VALUES(topic_id);

