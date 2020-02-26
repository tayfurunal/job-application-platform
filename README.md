# Job Application Platform
Job-Application-Platform using Spring Framework(Spring Boot, Security, JPA) and React, Redux

* Rol based(Applicant and Human Resources) Authentication and Authorization with JSON Web Token.
* Create, and Delete and Job for only Human Resources user.
* Apply job for Applicant user
* File Upload an Download
* Secured Routes an API's based on Client and Server side 

### Technologies

The technologies used to develop this web app were diverse, the main ones being:

- Spring Framework(Spring Boot, Spring Security, Spring Data JPA)
- React
- Postgresql

### Installation
 
Clone and install server

```sh
$ git clone https://github.com/tayfurunal/Job-Application-Platform.git

$ cd hr-application-backend
$ mvn clean install or import IDE(Intellij IDEA etc.)
$ mvn spring-boot:run
```

Database Settings:

```sh
hr-application-backend > src > main > resources > application.properties

and Fill in the blanks

spring.datasource.url=
spring.datasource.username=
spring.datasource.password=
```

install client

```sh
$ cd hr-application-client
$ yarn
$ yarn start
```

### Usage

Human Resources
```sh
username: hradmin
password: hradmin
```

Applicant
```sh
username: tayfur
password: tayfur
```

Create new user with role on Postman:

*for HR user => role:["HR"]
*for APPLICANT user => role:["APPLICANT"]

![image](https://i.imgur.com/w6pfR3i.png)


### Screenshots

![image](https://i.imgur.com/MDOHVNL.png)

![image](https://i.imgur.com/XokACvp.png)

![image](https://i.imgur.com/Pt9MezI.png)

![image](https://i.imgur.com/QZlB6Qu.png)
