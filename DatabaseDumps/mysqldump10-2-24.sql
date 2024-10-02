-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: COP4331
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Contacts`
--

DROP TABLE IF EXISTS `Contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Contacts` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL DEFAULT '',
  `Phone` varchar(50) NOT NULL DEFAULT '',
  `Email` varchar(50) NOT NULL DEFAULT '',
  `UserID` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `Contacts_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Contacts`
--

LOCK TABLES `Contacts` WRITE;
/*!40000 ALTER TABLE `Contacts` DISABLE KEYS */;
INSERT INTO `Contacts` VALUES (1,'Ahmed D','555-867-5309','tommytutone@columbia.com',1),(3,'JGWentworth','877-CASHNOW','jg@wentworth.com',1),(4,'John Doe','111-111-1111','john@doe.com',2),(5,'Jane Doe','222-222-222','jane@doe.com',3),(26,'Hilton Hotel','777-101-9134','hiltons@paris.com',1),(49,'john doe','999-999-9999','john21@gmail.com',30),(51,'Jenni Kim','444-444-4444','Jenni@BP.com',1),(52,'Lola Car','111-111-1111','aos@coulson.com',1),(59,'Will S','542-121-4682','w@s.com',1),(68,'Red Robin','321-234-3169','rr@yum.com',1),(71,'Harry Potter','454-577-8655','hp@7.com',1),(72,'John Fortnite','420-420-4204','myemail@fortmail.com',1),(73,'First Last','555-123-4567','gmiller@mail.com',41),(77,'joy mo','222-2222222','hi@yahho.om',42),(85,'G M','(111) - 111 - 1111','garrett@miller.com',41),(86,'Taio Cruz','(912) - 391 - 2939','DYNAMINTE@music.com',1),(87,'Ben Stiller','(123) - 939 - 3029','benstiller@actor.com',1),(89,'Red Robin','(512) - 351 - 5355','rr@yum.com',1),(99,'hello world','(565) - 465 - 6544','h@w.com',1),(100,'Shakira Mebarak','+57 (301) - 423 - 9011','hipsdontlie@colombia.com',15),(102,'ran dom','(545) - 353 - 4548','ran@dom.com',1),(103,'Le Sserafim','+1 (800) - 468 - 6386','wheretheheckissaki@fearnot.com',1),(114,'Cat Valentine','(401) - 877 - 6541','cvalentine@victorious.com',15),(115,'Carly Shay','(565) - 901 - 2345','cshay@icarly.com',15),(116,'Freddy Benson','(505) - 678 - 9014','nerd@icarly.com',15),(120,'Lionel Messi','+54 (601) - 789 - 2481','futbol@argentina.com',15),(121,'Bob Duncan','(405) - 987 - 1012','N/A',15),(123,'John Doe','(123) - 456 - 7890','jdoe@gmail.com',15),(124,'Danny Phantom','(000) - 000 - 0000','goinghost@boo.com',15),(127,'Peter Pan','(111) - 111 - 1111','neverland@disney.com',15),(128,'Bruce Wayne','(781) - 423 - 0911','notbatman@waynetech.com',15),(131,'Clark Kent','(901) - 678 - 2481','ckent@thedailyplanet.com',15),(132,'Peter Parker','(631) - 405 - 6701','peterp@dailybugle.com',15),(133,'Henry Danger','(911) - 081 - 2450','',15);
/*!40000 ALTER TABLE `Contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `DateCreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DateLastLoggedIn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `FirstName` varchar(50) NOT NULL DEFAULT '',
  `LastName` varchar(50) NOT NULL DEFAULT '',
  `Login` varchar(50) NOT NULL DEFAULT '',
  `Password` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'2024-08-28 19:27:56','2024-08-28 19:27:56','Paris','Hilton','Paris','tinkerbell'),(2,'2024-08-28 19:27:56','2024-08-28 19:27:56','Donald','Trump','Trump','yourefired'),(3,'2024-08-28 19:27:56','2024-08-28 19:27:56','Mark','Zuckerberg','TheZuck','dadada'),(4,'2024-08-28 19:27:57','2024-08-28 19:27:57','Garrett','Miller','gmill','WeLoveCOP4331!'),(5,'2024-09-05 14:35:06','2024-09-05 14:35:06','myFirstName','myLastName','myUser','myPassword'),(6,'2024-09-05 14:47:47','2024-09-05 14:47:47','John','Smith','John123','securePassword'),(7,'2024-09-05 23:00:00','2024-09-05 23:00:00','myFirstName','myLastName','thisIsMyUser','myPassword'),(8,'2024-09-07 19:06:22','2024-09-07 19:06:22','Jane','Doe','jdoe','123'),(9,'2024-09-07 19:50:17','2024-09-07 19:50:17','Bob','Smith','bsmith','random'),(10,'2024-09-07 19:50:51','2024-09-07 19:50:51','Bobby','Smithens','bsmithens','random2'),(12,'2024-09-07 20:17:12','2024-09-07 20:17:12','Johnny','Bravo','jbravo','cool'),(13,'2024-09-07 20:30:08','2024-09-07 20:30:08','Rango','Deep','Rango','conflicted'),(14,'2024-09-07 20:30:32','2024-09-07 20:30:32','Rainbow','Road','Rainbow','Mario'),(15,'2024-09-07 21:46:54','2024-09-07 21:46:54','Sam','Puckett','spuckett','friedchicken'),(17,'2024-09-08 05:43:06','2024-09-08 05:43:06','Paris','Hilton','hg','jhkhk'),(18,'2024-09-09 02:14:34','2024-09-09 02:14:34','Mario','Mario','Mario','itsame'),(28,'2024-09-14 00:51:22','2024-09-14 00:51:22','Fred','','','Friedchicken!_`11'),(30,'2024-09-17 12:34:00','2024-09-17 12:34:00','jane','doe','jane123','Janedoe1!'),(31,'2024-09-22 23:55:34','2024-09-22 23:55:34','Alex ','The Lion','Lion','Number1!'),(32,'2024-09-23 00:05:20','2024-09-23 00:05:20','Marty','Zebra','Marty','4TheWild!'),(33,'2024-09-23 00:06:41','2024-09-23 00:06:41','Melvin','Girrafe','Melvin','LoveD0ctor!'),(34,'2024-09-23 00:14:58','2024-09-23 00:14:58','King','Julian','The Best','Iamthebest!Noseriously!#1'),(36,'2024-09-23 00:19:27','2024-09-23 00:19:27','Maurice','Lemur','Maurice','dflgkjlksdlkfj@1'),(41,'2024-09-23 22:15:13','2024-09-23 22:15:13','Garrett','Miller','gmiller','Garrrettt123!'),(42,'2024-09-24 15:06:51','2024-09-24 15:06:51','jane','doe','jane3','Pilipinas_01!'),(43,'2024-09-24 23:41:58','2024-09-24 23:41:58','Captain','Jack','CaptainJackSparrow','Whyistherumgone!1'),(44,'2024-09-25 19:25:11','2024-09-25 19:25:11','Aang','Nomad','The Avatar','Whydoineeda1password?'),(45,'2024-09-25 20:47:34','2024-09-25 20:47:34','Ethan','Jewell','ethanJ','Spog@3904'),(46,'2024-10-01 20:39:49','2024-10-01 20:39:49','John','Smith','John1234','securePassword'),(47,'2024-10-02 15:33:28','2024-10-02 15:33:28','Danny','Phantom','dphantom','ghost1!!');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-02 21:10:15
