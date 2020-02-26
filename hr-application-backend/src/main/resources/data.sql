INSERT INTO role(name) VALUES('ROLE_HR');
INSERT INTO role(name) VALUES('ROLE_APPLICANT');

INSERT INTO users VALUES (1000, '2020-02-26 21:58:53.761', 'hr@admin.com', '$2a$10$rmDgWQpaFYrqcrVBpt3GMOqXr2vSne1hPUugmOCN3d7F3fIveDINK', 'hradmin');
INSERT INTO users VALUES (1001, '2020-02-26 21:59:23.997', 'tayfur@tayfur.com', '$2a$10$8mX1mf2zULROmZ3J61noQ.hKOGqHa3JRvyrRuOyA/.01sU2vfEsJi', 'tayfur');

INSERT INTO job_list VALUES (2000, '2020-02-26 22:04:56.109', false, 'Minimum 4 years work experience as a Software Application developer, Experience with Container images deploy & release management with Openshift', 'We are looking for Devops Engineer', 'Devops Engineer', '2021-01-05 03:02:00', 0);
INSERT INTO job_list VALUES (2001, '2020-02-26 22:03:12.549', false, '4+ years hands on coding advanced experience in Java and Web technologies, Experience about microservice architectures', 'We are looking for Senior Java Developers', 'Java Developer', '2021-01-02 03:01:00', 1);
INSERT INTO application VALUES (1, '2020-02-26 22:06:46.885', 'Bahçelievler/Istanbul', 'mtayfurunal@gmail.com', 'Tayfur Ünal', '5352370557', 'TayfurÜnal-CV.pdf', 'I think this is suitable for me.', 2000, 1001);

INSERT INTO user_role VALUES (1000, 1);
INSERT INTO user_role VALUES (1000, 2);
INSERT INTO user_role VALUES (1001, 2);
