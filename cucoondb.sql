-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: cucoon
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `batch_master`
--

DROP TABLE IF EXISTS `batch_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `batch_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `cost_price` double DEFAULT '0',
  `selling_price` double NOT NULL DEFAULT '0',
  `expiry_date` date DEFAULT NULL,
  `msu` int(11) DEFAULT '0',
  `comment` varchar(50) DEFAULT NULL,
  `isactive` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_batchmaster_item_idx` (`item_id`),
  CONSTRAINT `fk_batchmaster_item` FOREIGN KEY (`item_id`) REFERENCES `item_master` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batch_master`
--

LOCK TABLES `batch_master` WRITE;
/*!40000 ALTER TABLE `batch_master` DISABLE KEYS */;
INSERT INTO `batch_master` VALUES (1,1,'BI651800',24200,20.16,'2020-04-30',1500,'',1),(2,2,'7070072',25200,21,'2020-04-30',1500,'',1),(3,3,'myh3ho1',0,1099,'2019-09-30',1,'',1),(4,4,'Etm21805',400,1669,'2021-04-30',1,'',1),(5,5,'LCAAJO918',424,1239,'2020-06-30',1,'',1),(6,6,'B18718001',904.76,1359,'2020-02-28',1,'',1),(7,7,'X44012',615.18,1800,'2020-03-30',1,'',1),(8,8,'13889',252,350.69,'2020-07-30',1,'',1),(9,9,'Ba051933',1227.67,1650,'2020-03-30',1,'',1),(10,10,'Ao9618021',1650,4095,'2021-09-30',1,'',1),(11,11,'Apo5841',190.4,411,'2020-07-30',1,'',1),(12,12,'411802x02',529.46,1394,'2019-11-30',1,'',1),(13,13,'F648384',69,109.73,'2021-06-30',1,'',1),(14,14,'V550001',16100,0,'2021-07-30',1500,'',1),(15,15,'EPC100818',1100,3140,'2020-06-30',1,'',1),(16,16,'SH04151',64.29,114.5,'2020-09-30',1,'',1),(17,17,'KAVA9010',436.7,611.38,'2021-12-31',1,'',1),(18,18,'18lhgt042',115,276.95,'2020-09-30',1,'',1),(19,19,'Xdb048',120,163,'2020-09-30',1,'',1),(20,20,'72284',518.57,726,'2020-04-30',1,'',1),(21,21,'XCGC131118',13.65,50,'2020-10-30',1,'',1),(22,22,'1248042',36.8,46,'2019-05-30',1,'',1),(23,23,'T276531',58.65,151.72,'2020-07-30',1,'',1),(24,24,'V305279',31.5,59.95,'2019-05-30',1,'',1),(25,25,'S82035',20.18,54.4,'2020-06-30',1,'',1),(26,26,'P22186',9.4,12.9,'2021-09-30',1,'',1),(27,27,'Ao706490',9,11.89,'2019-10-30',1,'',1),(28,28,'ULH-192',24,69.17,'2020-09-30',1,'',1),(29,29,'PA8284',20,27.5,'2020-05-30',1,'',1),(30,30,'GA101017',3.25,4.38,'2019-09-30',1,'',1),(31,31,'143274',7.18,12.25,'2020-10-30',1,'',1),(32,32,'V447377',24.5,36,'2019-04-30',1,'',1),(33,33,'M118-08',5.35,6.78,'2019-11-30',1,'',1),(34,34,'DY2710',12,23.5,'2019-08-30',1,'',1),(35,35,'G801269',4.44,5.7,'2022-02-28',1,'',1),(36,36,'GA020918',8.2,11.7,'2021-08-30',1,'',1),(37,37,'WAV8004',14.65,45.25,'2020-03-30',1,'',1),(38,38,'NPBO164',3.5,6.74,'2019-04-30',1,'',1),(39,39,'ELBAFA003',0,133.48,'2019-10-30',1,'',1),(40,40,'2171979',22.64,46.11,'2021-08-30',1,'',1),(41,41,'ZBRO00G',55.5,124.77,'2020-02-28',1,'',1),(42,42,'18LA20',55.65,359,'2019-12-30',1,'',1),(43,43,'B2MK3466',365.65,531.18,'2023-07-30',1,'',1),(44,44,'SU144410',22,29.65,'2020-01-30',1,'',1),(45,45,'SU238040',28.7,54,'2019-06-30',1,'',1),(46,46,'2118048',2.56,3.2,'2021-07-30',1,'',1),(47,47,'0239M1801',7.65,15.9,'2020-02-28',1,'',1),(48,48,'743130',18,35.56,'2019-08-30',1,'',1),(49,49,'SB18016',8.35,10.6,'2020-02-28',1,'',1),(50,50,'0',0,0,NULL,1,'',1),(51,51,'U1390',23.5,31.8,'2019-12-31',1,'',1),(52,52,'BNP274283',43.65,58,'2021-07-30',1,'',1),(53,53,'1710001105',38.65,95,'2020-09-30',1,'',1),(54,54,'NP0716',18,52,'2021-06-30',1,'',1),(55,55,'0',0,0,NULL,1,'',1),(56,56,'1804025905',38.65,95,'2021-03-30',1,'',1),(57,57,'1804025905',38.65,95,'2021-03-30',1,'',1),(58,58,'1033765',10.5,29,'2022-03-30',1,'',1),(59,59,'1712510',5.94,22,'2022-11-30',1,'',1),(60,60,'18G1911',2.78,12,'2023-05-31',1,'',1),(61,61,'18G2312',3.7,9.5,'2023-06-30',1,'',1),(62,62,'8239335',4.69,14.5,'2023-07-30',1,'',1),(63,63,'820445',3.5,12,'2023-07-30',1,'',1),(64,64,'7082495',3.5,3.5,'2020-05-31',1,'',1),(65,65,'6308137',3.5,3.5,'2021-10-30',1,'',1),(66,66,'0',0,0,NULL,1,'',1),(67,67,'7115398',1.87,4.5,'2022-04-30',1,'',1),(68,68,'A3891004',23.65,47.7,'2021-12-30',1,'',1),(69,69,'91642',10.5,16.62,'2021-10-30',1,'',1),(70,70,'18032435',15.19,45,'2023-02-28',1,'',1),(71,71,'18J2541G',36.42,132,'2023-08-30',1,'',1),(72,72,'3W1711001',8.65,149,'2020-10-30',1,'',1),(73,73,'4109118H',10.38,118,'2023-07-30',1,'',1),(74,74,'5K025',10,30,'2020-08-30',1,'',1),(75,75,'6A28S',8,30,'2020-12-31',1,'',1),(76,76,'RO8181123',168.75,450,'2020-02-28',1,'',1),(77,77,'HY-CHEM',55.6,150,'2021-09-30',1,'',1),(78,78,'0',0,0,NULL,1,'',1),(79,79,'S3-18129',236.5,423,'2021-10-30',1,'',1);
/*!40000 ALTER TABLE `batch_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking_master`
--

DROP TABLE IF EXISTS `booking_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `booking_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cfc` varchar(45) DEFAULT NULL,
  `ref_id` int(11) DEFAULT NULL,
  `branch_id` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `comment` varchar(200) DEFAULT NULL,
  `booked_by` varchar(100) DEFAULT NULL,
  `booking_date` datetime DEFAULT NULL,
  `visit_status` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_bmcfc_idx` (`cfc`),
  KEY `fk_ref_idx` (`ref_id`),
  KEY `fk_bmcilinic_idx` (`branch_id`),
  KEY `fk_bmdoctor_idx` (`doctor_id`),
  CONSTRAINT `fk_bmcfc` FOREIGN KEY (`cfc`) REFERENCES `customer_master` (`cfc`) ON DELETE CASCADE,
  CONSTRAINT `fk_bmcilinic` FOREIGN KEY (`branch_id`) REFERENCES `branch_master` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ref` FOREIGN KEY (`ref_id`) REFERENCES `reference_master` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fkbmdoc` FOREIGN KEY (`doctor_id`) REFERENCES `doctor_master` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_master`
--

LOCK TABLES `booking_master` WRITE;
/*!40000 ALTER TABLE `booking_master` DISABLE KEYS */;
INSERT INTO `booking_master` VALUES (40,NULL,65,14,'2019-03-04 14:21:00',NULL,'','CustomerCare1 @ 06-04-2019 22:14','2019-03-04 14:21:32',0),(41,'TH19022',NULL,1,'2019-03-05 00:59:00',21,'','thane @ 05-03-2019 01:08','2019-03-05 01:08:27',1),(42,'TH19023',NULL,1,'2019-03-05 01:13:00',21,'','CustomerCare1 @ 05-03-2019 01:29','2019-03-05 01:13:26',1),(43,NULL,69,1,'2019-03-05 01:31:00',NULL,'adasd','thane @ 05-03-2019 13:53','2019-03-05 01:31:46',0),(44,'TH19024',NULL,1,'2019-03-05 20:59:00',21,'','thane @ 05-03-2019 20:59','2019-03-05 20:59:19',1),(45,'TH19023',NULL,1,'2019-03-05 20:59:00',21,'','thane @ 05-03-2019 20:59','2019-03-05 20:59:43',1),(46,'TH19022',NULL,1,'2019-03-06 00:58:00',21,'','thane @ 06-03-2019 00:58','2019-03-06 00:58:20',1),(47,'TH19025',NULL,1,'2019-03-06 00:58:00',21,'','thane @ 06-03-2019 00:58 @ 06-03-2019 00:58','2019-03-06 00:58:53',1),(48,NULL,71,1,'2019-03-06 01:00:00',NULL,'','thane @ 06-03-2019 01:00','2019-03-06 01:00:58',0),(49,NULL,72,1,'2019-03-06 01:01:00',NULL,'','thane @ 06-03-2019 01:01','2019-03-06 01:01:13',0),(50,'TH19026',NULL,1,'2019-03-06 01:02:00',25,'','thane @ 06-03-2019 01:02 @ 06-03-2019 01:02','2019-03-06 01:02:27',1),(51,'TH19027',NULL,1,'2019-03-06 01:02:00',21,'','thane @ 06-03-2019 01:03 @ 06-03-2019 01:03','2019-03-06 01:03:00',1),(52,NULL,73,1,'2019-03-06 01:04:00',NULL,'','thane @ 06-03-2019 01:04','2019-03-06 01:04:26',0),(53,'TH19028',NULL,1,'2019-03-06 01:04:00',21,'','thane @ 06-03-2019 01:04','2019-03-06 01:04:49',1),(54,NULL,75,9,'2019-04-01 16:38:00',NULL,'','CustomerCare1 @ 01-04-2019 16:38','2019-04-01 16:38:20',0),(55,NULL,76,9,'2019-04-01 16:38:00',NULL,'','CustomerCare1 @ 01-04-2019 16:38','2019-04-01 16:38:56',0),(56,'TH19029',NULL,1,'2019-04-02 09:12:00',21,'','admin @ 02-04-2019 09:12 @ 02-04-2019 09:12','2019-04-02 09:12:28',1),(57,'TH19027',NULL,9,'2019-04-06 22:15:00',NULL,'','CustomerCare1 @ 06-04-2019 22:15','2019-04-06 22:15:48',0),(58,'TH19023',NULL,1,'2019-04-08 11:50:00',21,'','fothane @ 08-04-2019 11:50','2019-04-08 11:50:58',1),(59,'TH19030',NULL,1,'2019-04-08 11:51:00',21,'','fothane @ 08-04-2019 11:51 @ 08-04-2019 11:51','2019-04-08 11:51:13',1),(60,'TH19031',NULL,1,'2019-04-08 11:53:00',21,'','fothane @ 08-04-2019 11:53','2019-04-08 11:53:40',1),(61,'TH19023',NULL,9,'2019-04-09 23:34:00',24,'','fokochi @ 09-04-2019 23:34','2019-04-09 23:34:57',1),(62,'KOC0009',NULL,9,'2019-04-19 15:43:00',24,'','fokochi @ 19-04-2019 15:43 @ 19-04-2019 15:43','2019-04-19 15:43:28',1),(63,'KOC0010',NULL,9,'2019-04-19 15:43:00',28,'','fokochi @ 19-04-2019 15:43 @ 19-04-2019 15:43','2019-04-19 15:43:42',1),(64,'KOC0011',NULL,9,'2019-04-19 15:43:00',27,'','fokochi @ 19-04-2019 15:44 @ 19-04-2019 15:44','2019-04-19 15:44:01',1),(65,'KOC0099',NULL,9,'2019-04-19 15:44:00',27,'','fokochi @ 19-04-2019 15:44 @ 19-04-2019 15:44','2019-04-19 15:44:31',1),(66,'KOC0100',NULL,9,'2019-04-19 15:44:00',27,'','fokochi @ 19-04-2019 15:44 @ 19-04-2019 15:44','2019-04-19 15:44:45',1),(67,'KOC0101',NULL,9,'2019-04-19 15:45:00',27,'','fokochi @ 19-04-2019 15:45 @ 19-04-2019 15:45','2019-04-19 15:45:05',1),(68,'KOC0999',NULL,9,'2019-04-19 15:45:00',27,'','fokochi @ 19-04-2019 15:45 @ 19-04-2019 15:45','2019-04-19 15:45:25',1),(69,'KOC1000',NULL,9,'2019-04-19 15:45:00',28,'','fokochi @ 19-04-2019 15:45 @ 19-04-2019 15:45','2019-04-19 15:45:38',1),(70,'KOC1001',NULL,9,'2019-04-19 15:45:00',27,'','fokochi @ 19-04-2019 15:45 @ 19-04-2019 15:45','2019-04-19 15:45:53',1),(71,'KOC199999',NULL,9,'2019-04-19 15:46:00',27,'','fokochi @ 19-04-2019 15:46 @ 19-04-2019 15:46','2019-04-19 15:46:36',1),(72,'KOC1910000',NULL,9,'2019-04-19 15:46:00',28,'','fokochi @ 19-04-2019 15:46 @ 19-04-2019 15:46','2019-04-19 15:46:55',1),(73,'KOC190055',NULL,9,'2019-04-19 15:47:00',27,'','fokochi @ 19-04-2019 15:47 @ 19-04-2019 15:47','2019-04-19 15:47:29',1);
/*!40000 ALTER TABLE `booking_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branch_item`
--

DROP TABLE IF EXISTS `branch_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `branch_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `branch_id` int(11) NOT NULL,
  `batch_id` int(11) NOT NULL,
  `counter` int(11) NOT NULL,
  `qty_json` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch_item`
--

LOCK TABLES `branch_item` WRITE;
/*!40000 ALTER TABLE `branch_item` DISABLE KEYS */;
INSERT INTO `branch_item` VALUES (134,1,4,0,'{\"i\": 0}'),(135,1,1,10,'{\"i0\": 53, \"i1\": 0, \"i2\": 0, \"i3\": 0, \"i4\": 0, \"i5\": 0, \"i6\": 0, \"i7\": 0, \"i8\": 0, \"i9\": 0}');
/*!40000 ALTER TABLE `branch_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branch_master`
--

DROP TABLE IF EXISTS `branch_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `branch_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `address` varchar(200) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `type` int(11) NOT NULL,
  `invoice_prefix` varchar(45) NOT NULL,
  `invoice_counter` int(11) NOT NULL,
  `receipt_prefix` varchar(45) NOT NULL,
  `receipt_counter` int(11) NOT NULL,
  `isactive` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `receipt_prefix_UNIQUE` (`receipt_prefix`),
  UNIQUE KEY `invoice_prefix_UNIQUE` (`invoice_prefix`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch_master`
--

LOCK TABLES `branch_master` WRITE;
/*!40000 ALTER TABLE `branch_master` DISABLE KEYS */;
INSERT INTO `branch_master` VALUES (1,'Thane','address of thane','54564456',1,'THA',1003,'THA',1013,1),(2,'Santa Cruzz','address of santa\r\nedited','1234',1,'SC',1,'SC',1,1),(9,'Kochi','kerala',NULL,0,'KO',1,'KO',7,1),(10,'vile','vil',NULL,0,'vi',1,'vi',1,1),(11,'t','asd','111',1,'cd',1,'cd',1,1),(12,'Dubey','kj','1235455',1,'dubds',1,'dubds',1,1),(13,'ri','','7897',0,'r',1,'r',1,1),(14,'kolkatya','','4',1,'kol',1,'kol',1,1),(15,'t1','','12',1,'it1',1,'rt1',1,1),(16,'k','','546546',1,'p',1,'p',1,0),(17,'test1','465464646sdfsdfs','54654656546',1,'teinv',1,'terec',1,1);
/*!40000 ALTER TABLE `branch_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brand_master`
--

DROP TABLE IF EXISTS `brand_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `brand_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `isactive` smallint(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand_master`
--

LOCK TABLES `brand_master` WRITE;
/*!40000 ALTER TABLE `brand_master` DISABLE KEYS */;
INSERT INTO `brand_master` VALUES (1,'brand10',1),(2,'brand2',0),(3,'brand3',1),(4,'brand 3',1);
/*!40000 ALTER TABLE `brand_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cfc_master`
--

DROP TABLE IF EXISTS `cfc_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cfc_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `branch_id` int(11) NOT NULL,
  `prefix` varchar(45) NOT NULL,
  `counter` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `prefix_UNIQUE` (`prefix`),
  KEY `cfcm_branch_idx` (`branch_id`),
  CONSTRAINT `cfcm_branch` FOREIGN KEY (`branch_id`) REFERENCES `branch_master` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cfc_master`
--

LOCK TABLES `cfc_master` WRITE;
/*!40000 ALTER TABLE `cfc_master` DISABLE KEYS */;
INSERT INTO `cfc_master` VALUES (1,1,'THA',9),(2,2,'SC',1),(6,9,'KOC19',56),(7,10,'vi',10),(8,11,'cd',1),(9,12,'dubds',10),(10,13,'r',1),(12,14,'kol',1),(13,15,'ct1',1),(14,16,'k',1),(15,17,'tecfcc',1);
/*!40000 ALTER TABLE `cfc_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_care_source`
--

DROP TABLE IF EXISTS `customer_care_source`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `customer_care_source` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `isactive` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_care_source`
--

LOCK TABLES `customer_care_source` WRITE;
/*!40000 ALTER TABLE `customer_care_source` DISABLE KEYS */;
INSERT INTO `customer_care_source` VALUES (1,'Source 1',1),(2,'Source 2',1),(3,'souce2',0);
/*!40000 ALTER TABLE `customer_care_source` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_master`
--

DROP TABLE IF EXISTS `customer_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `customer_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cfc` varchar(45) NOT NULL,
  `base_branch` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `number1` varchar(45) NOT NULL,
  `number2` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `customer_source` int(11) NOT NULL,
  `isactive` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cfc_UNIQUE` (`cfc`),
  UNIQUE KEY `number1_UNIQUE` (`number1`),
  KEY `fk_basebranch_idx` (`base_branch`),
  KEY `fk_custmaster_source_idx` (`customer_source`),
  CONSTRAINT `fk_basebranch` FOREIGN KEY (`base_branch`) REFERENCES `branch_master` (`id`),
  CONSTRAINT `fk_custmaster_source` FOREIGN KEY (`customer_source`) REFERENCES `customer_care_source` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_master`
--

LOCK TABLES `customer_master` WRITE;
/*!40000 ALTER TABLE `customer_master` DISABLE KEYS */;
INSERT INTO `customer_master` VALUES (72,'TH19022',1,'asd','2','','','',1,1),(92,'TH19023',1,'edit','3','23','viveksanu@hotmail.com','Njavakkattu House, Koottickal P.O',1,1),(98,'TH19024',1,'asdasd','4','','','',1,1),(108,'TH19025',1,'zc','5','','','',1,1),(109,'TH19026',1,'asdas','6','','','',1,1),(113,'TH19027',1,'vivek','7','','','',1,1),(121,'TH19028',1,'asda','8','','','',2,1),(122,'TH19029',1,'asd','1321546','','','',1,1),(125,'TH19030',1,'avas','123','','','',1,1),(126,'TH19031',1,'asd','45465','','','',1,1),(127,'KOC0009',9,'c9','011','','','',1,1),(128,'KOC0010',9,'c10','112','','','',1,1),(130,'KOC0011',9,'c11','11','','','',1,1),(131,'KOC0099',9,'c99','99','','','',1,1),(133,'KOC0100',9,'c100','111','','','',1,1),(134,'KOC0101',9,'c101','1123','','','',1,1),(135,'KOC0999',9,'c999','999','','','',1,1),(136,'KOC1000',9,'c1000','1000','','','',1,1),(137,'KOC1001',9,'c10001','1001','','','',1,1),(138,'KOC199999',9,'c9999','1546','','','',1,1),(139,'KOC1910000',9,'asd','545646','','','',1,1),(140,'KOC190055',9,'asd','54646','','','',1,1);
/*!40000 ALTER TABLE `customer_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount_master`
--

DROP TABLE IF EXISTS `discount_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `discount_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_type` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount_master`
--

LOCK TABLES `discount_master` WRITE;
/*!40000 ALTER TABLE `discount_master` DISABLE KEYS */;
INSERT INTO `discount_master` VALUES (1,1,100),(2,0,100),(3,2,5),(4,3,0),(5,7,0);
/*!40000 ALTER TABLE `discount_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_branch`
--

DROP TABLE IF EXISTS `doctor_branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `doctor_branch` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `did` int(11) NOT NULL,
  `bid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bd_doctor_idx` (`did`),
  KEY `bd_branch_idx` (`bid`),
  CONSTRAINT `bd_branch` FOREIGN KEY (`bid`) REFERENCES `branch_master` (`id`) ON DELETE CASCADE,
  CONSTRAINT `bd_doctor` FOREIGN KEY (`did`) REFERENCES `doctor_master` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_branch`
--

LOCK TABLES `doctor_branch` WRITE;
/*!40000 ALTER TABLE `doctor_branch` DISABLE KEYS */;
INSERT INTO `doctor_branch` VALUES (32,21,1),(33,22,1),(35,24,9),(37,25,1),(38,26,1),(39,27,9),(40,28,9),(41,28,1);
/*!40000 ALTER TABLE `doctor_branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_master`
--

DROP TABLE IF EXISTS `doctor_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `doctor_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `dob` date DEFAULT NULL,
  `sex` varchar(15) DEFAULT NULL,
  `contact` varchar(45) DEFAULT NULL,
  `status` tinyint(4) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `isactive` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  KEY `fk_dm_user_idx` (`user_id`),
  CONSTRAINT `fk_dm_user` FOREIGN KEY (`user_id`) REFERENCES `user_master` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_master`
--

LOCK TABLES `doctor_master` WRITE;
/*!40000 ALTER TABLE `doctor_master` DISABLE KEYS */;
INSERT INTO `doctor_master` VALUES (21,'doctor1','2019-02-26','Male','45465',1,16,1),(22,'doctor 2','2019-02-04','Male','4787456',1,17,1),(23,'doctor3',NULL,'Female','',1,18,1),(24,'doctor4',NULL,'Female','',1,19,1),(25,'Dr jobin',NULL,'Male','',1,23,1),(26,'Dr Robin',NULL,'Male','',1,24,1),(27,'doctor5',NULL,'Female','',1,25,1),(28,'doctor6',NULL,'Female','',1,26,1);
/*!40000 ALTER TABLE `doctor_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_master`
--

DROP TABLE IF EXISTS `invoice_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `invoice_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bid` int(11) NOT NULL,
  `tid` int(11) NOT NULL,
  `invoice_num` varchar(45) NOT NULL,
  `invoice_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_im_branch_idx` (`bid`),
  KEY `fk_im_treatment_idx` (`tid`),
  CONSTRAINT `fk_im_branch` FOREIGN KEY (`bid`) REFERENCES `branch_master` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_im_treatment` FOREIGN KEY (`tid`) REFERENCES `treatment_master` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_master`
--

LOCK TABLES `invoice_master` WRITE;
/*!40000 ALTER TABLE `invoice_master` DISABLE KEYS */;
INSERT INTO `invoice_master` VALUES (8,1,15,'TH8','2019-03-27 16:25:00'),(9,1,16,'TH9','2019-04-02 09:14:49'),(10,1,14,'TH10','2019-04-04 16:30:14'),(11,1,22,'TH11','2019-04-15 10:47:25'),(12,1,23,'TH12','2019-04-16 21:13:42'),(13,1,24,'THA0009','2019-04-17 20:15:25'),(14,1,25,'THA0010','2019-04-17 20:16:05'),(16,1,27,'THA0099','2019-04-17 20:20:27'),(17,1,28,'THA0100','2019-04-17 20:20:53'),(18,1,29,'THA0101','2019-04-17 20:21:37'),(19,1,30,'THA0999','2019-04-17 20:22:16'),(20,1,31,'THA1000','2019-04-17 20:22:38'),(21,1,32,'THA1001','2019-04-17 20:24:13'),(22,1,26,'THA1002','2019-04-26 14:34:23');
/*!40000 ALTER TABLE `invoice_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_master`
--

DROP TABLE IF EXISTS `item_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `item_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `type` smallint(6) NOT NULL DEFAULT '1',
  `isactive` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_master`
--

LOCK TABLES `item_master` WRITE;
/*!40000 ALTER TABLE `item_master` DISABLE KEYS */;
INSERT INTO `item_master` VALUES (1,'Inj.Foligraf 1200IU',2,1),(2,'Inj.Folisurge1200IU',2,1),(3,'inj.My Hcg 10,000',1,1),(4,'Inj.Magnacent 150',1,1),(5,'inj.Vestova 0.25',1,1),(6,'Inj.R hucog 6500',1,1),(7,'inj.Vestova 0.05',1,1),(8,'Inj Decapeptyl 0.01',1,1),(9,'Inj Ovitrelle 250',1,1),(10,'Inj Luprodex depot 3.75',1,1),(11,'Inj Lupi HCG 5000',1,1),(12,'Inj X- grast300',1,1),(13,'Inj Gestone100',1,1),(14,'Inj Menotas 1200IU',2,1),(15,'Inj Lonopin 300',1,1),(16,'Naturogest Gel 8',1,1),(17,'Tab Duphastone 10',1,1),(18,'Tab Enrifol 2',1,1),(19,'Tab Alivher 25',1,1),(20,'Osterogel 75',1,1),(21,'UPT Kit ',1,1),(22,'Inj Sucol 10 ',1,1),(23,'Inj.Propofol 20',1,1),(24,'Inj Medazolam10',1,1),(25,'Inj Ketamin 5',1,1),(26,'Inj Glyco-p 2',1,1),(27,'Inj Emset 2',1,1),(28,'Inj Pause 5',1,1),(29,'Inj Fortwin 20',1,1),(30,'Inj Atropin 1',1,1),(31,'Inj Diazepam2',1,1),(32,'Inj Effcorlin 100',1,1),(33,'Inj Dexa 4 ',1,1),(34,'Inj Voveran 1',1,1),(35,'Inj Deriphylline 2',1,1),(36,'Inj Cal.Gluconate 10',1,1),(37,'Inj Pan 40',1,1),(38,'Inj Phenargan2',1,1),(39,'Inj Orofer 50',1,1),(40,'Inj Soda by carb 10',1,1),(41,'Inj Monocef1.2',1,1),(42,'Inj Paracetamol 100',1,1),(43,'Inj Expavon 6%',1,1),(44,'Inj Xylocaine 2%',1,1),(45,'Inj Loxicard 50',1,1),(46,'Inj Avil 2',1,1),(47,'Inj Adrenaline 2',1,1),(48,'Inj Aminophyline 10',1,1),(49,'Inj Buscopan 20',1,1),(50,'Inj Lasix 2',1,1),(51,'Xylocaine Jelly2%',1,1),(52,'Tab Jonac 100 (suppos)',1,1),(53,'Latex Gloves no7',1,1),(54,'Surgical Gloves no 6',1,1),(55,'Surgical GLoves  no 6.5',1,1),(56,'Latex Gloves no6',1,1),(57,'Latex Gloves no6.5',1,1),(58,'Syringe BD    20 ml',1,1),(59,'Syringe BD                    10 ml',1,1),(60,'Syringe BD   05ml',1,1),(61,'Syringe BD  02 ml',1,1),(62,'Syringe BD      01 ml ',1,1),(63,'Dis. Needle   26G',1,1),(64,'Dis. Needle 25G',1,1),(65,'Dis. Needle  23G',1,1),(66,'Dis. Needle   22G',1,1),(67,'Dis. Needle     18G',1,1),(68,'IV     R L 500',1,1),(69,'IV    N S 100',1,1),(70,'R- 90 Catheter',1,1),(71,'Vein Flow    22',1,1),(72,'3 WAY',1,1),(73,'IV Set',1,1),(74,'Scalp vein  23',1,1),(75,'Scalp Vein  no 18',1,1),(76,'Micropore',1,1),(77,'Spirit',1,1),(78,'Tena pad',1,1),(79,'Sterillium',1,1),(80,'test',1,1),(81,'test2',1,1);
/*!40000 ALTER TABLE `item_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lab_investigation_master`
--

DROP TABLE IF EXISTS `lab_investigation_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `lab_investigation_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `cost` int(11) NOT NULL,
  `isactive` smallint(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lab_investigation_master`
--

LOCK TABLES `lab_investigation_master` WRITE;
/*!40000 ALTER TABLE `lab_investigation_master` DISABLE KEYS */;
INSERT INTO `lab_investigation_master` VALUES (1,'Blood group',NULL,220,1),(2,'BT/CT/PT',NULL,550,1),(3,'CBC',NULL,230,1),(4,'Urine Routine',NULL,160,1),(5,'Urine Culture',NULL,900,1),(6,'FBS/RBS/PPBS',NULL,90,1),(7,'HbA1c',NULL,550,1),(8,'Hb Electrophoresis',NULL,1100,1),(9,'Rubella IgG',NULL,650,1),(10,'Rhesus Antibodies',NULL,0,1),(11,'Thyroid Antobodies ATA',NULL,1100,1),(12,'Thyroid Antobodies AMA',NULL,1100,1),(13,'TB Gold',NULL,2500,1),(14,'TB PCR',NULL,1400,1),(15,'Karyotype ','Female',3250,1),(16,'HIV 1 & 2',NULL,550,1),(17,'HbsAg',NULL,480,1),(18,'VDRL',NULL,250,1),(19,'HCV',NULL,1000,1),(20,'Chlamydia IgG/IgM','Chlaymadia Pneumoniae (IgG)Rate for only One',1850,1),(21,'Haemoglobin',NULL,180,1),(22,'CA 125',NULL,1150,1),(23,'Alpha Feto Protein',NULL,750,1),(24,'CA 19.9',NULL,1250,1),(25,'FSH',NULL,480,1),(26,'LH',NULL,480,1),(27,'AMH',NULL,1900,1),(28,'Oestradiol','E2',600,1),(29,'FreeT3/T4/TSH',NULL,650,1),(30,'T3/T4/TSH',NULL,400,1),(31,'Prolactin',NULL,480,1),(32,'Testosterone',NULL,650,1),(33,'DHEAs',NULL,1000,1),(34,'DHT',NULL,2300,1),(35,'17 alpha OH progesterone',NULL,1400,1),(36,'B-HCG',NULL,650,1),(37,'Progesterone','P4',600,1),(38,'SHBG',NULL,2100,1),(39,'Semen Analysis',NULL,500,1),(40,'Semen Culture',NULL,900,1),(41,'Anti-sperm Antobodies',NULL,1100,1),(42,'TFT',NULL,550,1),(43,'PT-INR',NULL,350,1),(44,'TORCH-IGg',NULL,1800,1),(45,'Pap smear',NULL,600,1),(46,'Anti-bodies sensitivity Test',NULL,900,1),(47,'Y-Chromosome Microdeletion',NULL,6800,1),(48,'ANA','by Immunoflourescence',950,1),(49,'dsDNA',NULL,1400,1),(50,'Cardiolipin Antibodies IgG/IgM',NULL,1700,1),(51,'APLA','Phospholipid IgG & IgM',1900,1),(52,'Lupus anticoagulant','by drvvt,dilute russel viper venon time',1650,1),(53,'Factor V Leiden',NULL,4900,1),(54,'Homocysteine',NULL,1200,1),(55,'Protein C Activity',NULL,3900,1),(56,'Protein S Activity',NULL,3600,1),(57,'Anti-thrombin III',NULL,3600,1),(58,'Protein  C Antigen',NULL,4500,1),(59,'Protein S Antigen',NULL,5500,1),(60,'Anti-thrombin III',NULL,3600,1),(61,'Thrombophilia Screen',NULL,16500,1),(62,'Karyotyping husband and wife',NULL,6500,1),(63,'Prothrombin gene mutation',NULL,5000,1),(64,'LFT',NULL,900,1),(65,'RFT-small','(BUN/Urea/Creatinine)',380,1),(66,'RFT-complete','(BUN/Urea/Creatinine/Electrolytes/UR/Phosphorus/Calcium)',1300,1),(67,'Uric Acid',NULL,200,1),(68,'Lipid Profile',NULL,700,1),(69,'Calcium',NULL,220,1),(70,'Vit D-Total',NULL,1500,1),(71,'Vit B12',NULL,1000,1),(72,'Fasting Insulin',NULL,800,1),(73,'Pre Conception Profile','CBC/HbA1c/Urine Routine/Blood Group/Hb Electrophoresis/',5540,1),(74,'LH+FSH+Prolactin','FSH/LH/Prolactin',1350,1),(75,'Thyroid Profile','FT3/FT4/TSH/ATA/AMA',2630,1),(76,'Infection Screening','HIV/HbsAg/HCV/VDRL/Blood Group',2385,1),(77,'Cervical Screening','LBC/HPV DNA testing',2400,1),(78,'Cocoon Thrombophillia profile','Thrombophillia Screen/dsDNA/ANA (by Immunoflourescence)',17910,1),(79,'Pre-op Profile','CBC/RBS/Blood Group/Urine Routine/HIV/HbsAg/HCV/VDRL/Free TFT (FT3+FT4+TSH)',3510,1),(80,'Cardiolipin Antibodies  ',NULL,850,1);
/*!40000 ALTER TABLE `lab_investigation_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_bar`
--

DROP TABLE IF EXISTS `menu_bar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `menu_bar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(45) NOT NULL,
  `rank` int(11) DEFAULT NULL,
  `user_role` int(11) DEFAULT NULL,
  `tag` varchar(45) DEFAULT NULL,
  `home` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_bar`
--

LOCK TABLES `menu_bar` WRITE;
/*!40000 ALTER TABLE `menu_bar` DISABLE KEYS */;
INSERT INTO `menu_bar` VALUES (1,'adminViewStock.jsp',5,0,'Stock','home.jsp'),(2,'adminViewStock.jsp',5,1,'Stock','home.jsp'),(3,'adminViewStock.jsp',5,4,'Stock','msa.jsp'),(6,'branchDoctor.jsp',9,2,'Doctors','foBooking.jsp'),(7,'branchMaster.jsp',13,0,'Branch','home.jsp'),(8,'branchMaster.jsp',13,1,'Branch','home.jsp'),(9,'bsaPending.jsp',14,5,'Pending','bsaPending.jsp'),(10,'bsaViewStock.jsp',15,5,'Stock','bsaPending.jsp'),(12,'foBooking.jsp',4,0,'Bookings','home.jsp'),(13,'foBooking.jsp',4,1,'Bookings','home.jsp'),(14,'foBooking.jsp',4,2,'Bookings','foBooking.jsp'),(15,'foBooking.jsp',4,3,'Bookings','foBooking.jsp'),(16,'foBooking.jsp',4,7,'Bookings','foBooking.jsp'),(17,'home.jsp',1,0,'Home','home.jsp'),(18,'home.jsp',1,1,'Home','home.jsp'),(19,'foBooking.jsp',1,2,'Home','foBooking.jsp'),(20,'msa.jsp',7,0,'New Purchase','home.jsp'),(21,'msa.jsp',7,1,'New Purchase','home.jsp'),(22,'msa.jsp',7,4,'New Purchase','msa.jsp'),(23,'msaPending.jsp',8,0,'MSA Orders','home.jsp'),(24,'msaPending.jsp',8,1,'MSA Order','home.jsp'),(25,'msaPending.jsp',8,4,'Order','msa.jsp'),(26,'procedureMaster.jsp',11,0,'Procedure','home.jsp'),(27,'procedureMaster.jsp',11,1,'Procedure','home.jsp'),(28,'roomBooking.jsp',6,0,'OT Booking','home.jsp'),(29,'roomBooking.jsp',6,1,'OT Booking','home.jsp'),(30,'roomBooking.jsp',6,2,'OT Booking','foBooking.jsp'),(31,'roomBooking.jsp',6,3,'OT Booking','foBooking.jsp'),(35,'roomMaster.jsp',10,2,'Room Setting','foBooking.jsp'),(36,'viewPatient.jsp',3,0,'Patients','home.jsp'),(37,'viewPatient.jsp',3,1,'Patients','home.jsp'),(38,'viewPatient.jsp',3,2,'Patients','foBooking.jsp'),(39,'viewPatient.jsp',3,3,'Patients','foBooking.jsp'),(40,'viewPatient.jsp',3,7,'Patients','foBooking.jsp'),(41,'stLogin',101,0,'Logout','home.jsp'),(42,'stLogin',101,1,'Logout','home.jsp'),(43,'stLogin',101,2,'Logout','foBooking.jsp'),(44,'stLogin',101,3,'Logout','foBooking.jsp'),(45,'stLogin',101,4,'Logout','msa.jsp'),(46,'stLogin',101,5,'Logout','bsaPending.jsp'),(47,'stLogin',101,6,'Logout','customerCareHome.jsp'),(48,'stLogin',101,7,'Logout','foBooking.jsp'),(49,'bsaStockTransfer.jsp',16,5,'Internal Stock Transfer','bsaPending.jsp'),(50,'bsaStockTransferAll.jsp',17,5,'View Stock Transfer','bsaPending.jsp'),(51,'bsaStockTransferPending.jsp',18,5,'View Pending Internal Stock Transfer','bsaPending.jsp'),(52,'userMaster.jsp',19,0,'Users','home.jsp'),(53,'userMaster.jsp',19,1,'Users','home.jsp'),(54,'doctorMaster.jsp',20,1,'Doctor','home.jsp'),(55,'doctorMaster.jsp',20,0,'Doctor','home.jsp'),(56,'roomBooking.jsp',6,7,'OT Booking','foBooking.jsp'),(57,'bsaViewStock.jsp',15,2,'Stock','foBooking.jsp'),(58,'brandMaster.jsp',21,1,'Manufacturers','home.jsp'),(59,'brandMaster.jsp',21,0,'Manufacturers','home.jsp'),(60,'customerCareSource.jsp',22,1,'Customer Source','home.jsp'),(61,'customerCareSource.jsp',22,0,'Customer Source','home.jsp'),(62,'password.jsp',100,0,'Change Password',''),(63,'password.jsp',100,0,'Change Password',''),(64,'password.jsp',100,1,'Change Password',''),(65,'password.jsp',100,2,'Change Password',''),(66,'password.jsp',100,3,'Change Password',''),(67,'password.jsp',100,4,'Change Password',''),(68,'password.jsp',100,5,'Change Password',''),(69,'password.jsp',100,6,'Change Password',''),(70,'password.jsp',100,7,'Change Password',''),(71,'lihMaster.jsp',12,0,'Lab Investigation','home.jsp'),(72,'lihMaster.jsp',12,1,'Lab Investigation','home.jsp'),(73,'customerCareHome.jsp',2,6,'Bookings','customerCareHome.jsp'),(74,'brandMaster.jsp',21,4,'Manufacturers','home.jsp'),(75,'receiptInfo.jsp',23,2,'Reports','foBooking.jsp'),(76,'receiptInfo.jsp',23,3,'Reports','foBooking.jsp');
/*!40000 ALTER TABLE `menu_bar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_branch`
--

DROP TABLE IF EXISTS `patient_branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `patient_branch` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bid` int(11) NOT NULL,
  `cfc` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_patient_brancg` (`bid`,`cfc`),
  KEY `fkpbbr_idx` (`bid`),
  KEY `fkpbpat_idx` (`cfc`),
  CONSTRAINT `fkpbbr` FOREIGN KEY (`bid`) REFERENCES `branch_master` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fkpbcfc` FOREIGN KEY (`cfc`) REFERENCES `customer_master` (`cfc`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_branch`
--

LOCK TABLES `patient_branch` WRITE;
/*!40000 ALTER TABLE `patient_branch` DISABLE KEYS */;
INSERT INTO `patient_branch` VALUES (90,1,'TH19022'),(91,1,'TH19023'),(92,1,'TH19024'),(93,1,'TH19025'),(94,1,'TH19026'),(95,1,'TH19027'),(96,1,'TH19028'),(97,1,'TH19029'),(99,1,'TH19030'),(100,1,'TH19031'),(102,9,'KOC0009'),(103,9,'KOC0010'),(104,9,'KOC0011'),(105,9,'KOC0099'),(106,9,'KOC0100'),(107,9,'KOC0101'),(108,9,'KOC0999'),(109,9,'KOC1000'),(110,9,'KOC1001'),(113,9,'KOC190055'),(112,9,'KOC1910000'),(111,9,'KOC199999'),(101,9,'TH19023'),(98,9,'TH19027');
/*!40000 ALTER TABLE `patient_branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_info_master`
--

DROP TABLE IF EXISTS `patient_info_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `patient_info_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cfc` varchar(45) NOT NULL,
  `name` varchar(100) NOT NULL,
  `sex` varchar(6) NOT NULL,
  `dob` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pifnamesex` (`cfc`,`sex`),
  KEY `fkpimcfc_idx` (`cfc`),
  CONSTRAINT `fkpimcfc` FOREIGN KEY (`cfc`) REFERENCES `customer_master` (`cfc`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_info_master`
--

LOCK TABLES `patient_info_master` WRITE;
/*!40000 ALTER TABLE `patient_info_master` DISABLE KEYS */;
INSERT INTO `patient_info_master` VALUES (15,'TH19023','f1','Female','1994-05-31'),(16,'TH19022','fe eddd','Female','2019-03-22'),(17,'TH19029','Female','Female','2019-04-02'),(18,'TH19023','ma','Male','2019-04-03'),(19,'TH19029','male','Male','2019-04-06'),(20,'TH19024','asfasdas','Female','2019-04-06'),(21,'TH19024','male0','Male','2019-04-06'),(22,'TH19026','saa','Female','2019-04-08'),(23,'TH19026','maleee','Male','2019-04-08'),(25,'TH19022','male ed','Male','2019-04-08'),(26,'TH19028','fe','Female','2019-04-10'),(27,'TH19028','makde','Male','2019-04-08');
/*!40000 ALTER TABLE `patient_info_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `procedure_master`
--

DROP TABLE IF EXISTS `procedure_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `procedure_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `cost` int(11) NOT NULL,
  `isactive` smallint(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `procedure_master`
--

LOCK TABLES `procedure_master` WRITE;
/*!40000 ALTER TABLE `procedure_master` DISABLE KEYS */;
INSERT INTO `procedure_master` VALUES (1,'ICSI',NULL,10000,1),(2,'Segmental IVF',NULL,20000,1),(3,'Semen freezing(ST)','2 months.',2000,1),(4,'Embryo freezing per leaf',NULL,10000,1),(5,'Annual freezing charges',NULL,10000,1),(6,'Blastocyst culture & transfer',NULL,20000,1),(7,'PRP',NULL,5000,1),(8,'IUI','routine',7800,1),(9,'IUI','package',30000,1),(10,'IUI','Referral ',13000,1),(11,'Semen freezing(LT)','1 year',8000,1),(12,'Annual Semen Storage fees',NULL,3000,1),(13,'Mock ET',NULL,4700,1),(14,'Extra insemination in same cycle',NULL,3000,1),(15,'ERA',NULL,50000,1),(16,'Endometrial scratch',NULL,3000,1),(17,'Egg Freezing per leaf from 3rd leaf',NULL,10000,1),(18,'Annual Egg Freezing Fees',NULL,10000,1),(19,'Donor Sperm','Level 1',5000,1),(20,'Donor Sperm','Level 2',7000,1),(21,'Donor Sperm','Level 3',10000,1),(22,'Embryo donation cycle','Type 1',105000,1),(23,'Embryo donation cycle','Type2',125000,1),(24,'Embryo donation cycle','Type 3',145000,1),(25,'Consultation',NULL,800,1),(26,'Consultation charge',NULL,1000,1),(27,'Follow up Consultation',NULL,400,1),(28,'Follow up Consultation charge',NULL,500,1),(29,'Baseline/1st USG',NULL,800,1),(30,'Follow up USG',NULL,400,1),(31,'SSG / HyCoSy',NULL,10800,1),(32,'Cyst Aspiration under Anaesthesia',NULL,10000,1),(33,'HBA',NULL,5000,1),(34,'PICSI',NULL,10000,1),(35,'TESA/PESA',NULL,45000,1),(36,'Testicular Mapping + TESA/PESA',NULL,65000,1),(37,'Surgically aspirated sperm annual freezing',NULL,5000,1),(38,'IVF Routine Fresh ','Type1',190000,1),(39,'IVF Routine Fresh ','Type 2',205000,1),(40,'IVF Routine Fresh ','Type 3',220000,1),(41,'Camp Fresh IVF','Type 1(ICSI + Segmental/Sequential/Bastocyst + Annual freezing/STSF NOT INCLUDED)',120000,1),(42,'Embryo freezing','Cover charge-irrespective of no. of leaves.',40000,1),(43,'FET cycle','(Sequential/Blastocyst not included)',85000,1),(44,'Sequential- Morula/Blastocyst culture &transfer',NULL,20000,1),(45,'Donor Egg cycle','Type 1 -Undergraduate',305000,1),(46,'Donor Egg cycle','Type 2- Graduate',325000,1),(47,'Donor Egg cycle','Type 3-Post graduate',375000,1),(48,'Donor Egg cycle- Camp','Camp (Post ET meds+Blastocyst+Sequential transfer+ Annual freezing - NOT INCLUDED)',250000,1),(49,'Egg freezing/Oocyte Freezing cycle.','Including ovarian stimulation Inject.',170000,1),(50,'Annual egg freezing fees from next year','Oocyte freezing cycle-step 2',10000,1),(51,'Egg Pooling-3cycle pkg','3cycle pkg(Including everything)',505000,1),(52,'Egg Pooling-2 cycle pkg','2 cycle pkg(Includes everything)',365000,1);
/*!40000 ALTER TABLE `procedure_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_content`
--

DROP TABLE IF EXISTS `purchase_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `purchase_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `purchase_id` int(11) NOT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `msu` int(11) DEFAULT NULL,
  `batch_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT '0',
  `cost_price` double DEFAULT '0',
  `selling_price` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_pur_cont_purrchaseid_idx` (`purchase_id`),
  CONSTRAINT `fk_pur_cont_purrchaseid` FOREIGN KEY (`purchase_id`) REFERENCES `purchase_master` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_content`
--

LOCK TABLES `purchase_content` WRITE;
/*!40000 ALTER TABLE `purchase_content` DISABLE KEYS */;
INSERT INTO `purchase_content` VALUES (101,50,NULL,1,12,10,10,101),(102,50,NULL,1,13,5,20,201),(103,51,NULL,100,16,2,2,23),(104,52,NULL,100,16,10,2,23),(105,52,NULL,200,17,10,10,101),(106,53,NULL,1,14,1,2,22),(107,54,NULL,1,20,1,5,22),(108,56,NULL,1,32,10,20,22),(109,57,NULL,200,17,10,10,101),(110,57,NULL,1,20,1,5,22),(111,58,NULL,1,20,100,5,22),(112,61,NULL,100,34,10,0,1),(113,61,NULL,1,33,100,0,5),(116,64,1,1,14,1,2,22),(117,64,1,1,14,1,2,22),(123,66,1,100,35,100,101.2,202.5),(124,67,1,1500,1,10,24200,20.16),(125,67,1,1500,2,10,25200,21),(126,65,1,1,28,1,69.17,24),(127,65,3,1,12,10,1394,529.46),(128,65,3,1500,14,1,16100,0),(129,68,1,1,65,1,3.5,3.5),(130,68,1,1,65,1,3.5,3.5),(132,69,1,1,72,1,149,8.65),(133,70,1,1,80,10,100,200),(134,71,1,1,82,1,100,102),(135,71,1,1,81,1,200,1000),(136,72,3,1,72,1,149,8.65),(137,72,3,1,67,10,4.5,1.87),(138,73,1,1,33,1,6.78,5.35),(139,74,1,1500,1,10,24200,20.16),(140,75,1,1,4,1,1669,400),(141,76,1,1,4,1,1669,400),(142,77,1,1500,1,10,24200,20.16);
/*!40000 ALTER TABLE `purchase_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_master`
--

DROP TABLE IF EXISTS `purchase_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `purchase_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference_no` varchar(45) DEFAULT NULL,
  `branch_id` int(11) NOT NULL,
  `status` smallint(6) NOT NULL,
  `comment` varchar(200) DEFAULT NULL,
  `date` date NOT NULL,
  `accepted_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_purchase_master_branchid_idx` (`branch_id`),
  CONSTRAINT `fk_purchase_master_branchid` FOREIGN KEY (`branch_id`) REFERENCES `branch_master` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_master`
--

LOCK TABLES `purchase_master` WRITE;
/*!40000 ALTER TABLE `purchase_master` DISABLE KEYS */;
INSERT INTO `purchase_master` VALUES (50,'r1',1,1,'','2018-12-19',NULL),(51,'rf',9,1,'','2018-12-19',NULL),(52,'45',1,1,'','2018-12-20',NULL),(53,'12',1,0,'','2018-12-27',NULL),(54,'ko',9,0,'','2018-12-27',NULL),(56,'sdf',1,1,'','2019-01-05',NULL),(57,'reet',1,1,'','2019-01-07',NULL),(58,'sd',1,1,'','2019-01-21',NULL),(61,'asdas',1,1,'','2019-01-22',NULL),(64,'rtrytryt',1,0,'','2019-02-21',NULL),(65,'asdasd',1,0,'','2019-02-21',NULL),(66,'r1',1,1,'','2019-02-26',NULL),(67,'asd',1,1,'','2019-04-06',NULL),(68,'new',1,1,'','2019-04-08','2019-04-08'),(69,'oijji',9,0,'','2019-04-08',NULL),(70,'test',1,1,'','2019-04-09','2019-04-09'),(71,'test2',1,1,'','2019-04-09','2019-04-09'),(72,'test3',1,1,'','2019-04-09','2019-04-09'),(73,'test4',1,1,'','2019-04-09','2019-04-09'),(74,'red',1,1,'','2019-04-10','2019-04-10'),(75,'dsfsd',1,1,'','2019-04-10','2019-04-10'),(76,'asd',1,1,'','2019-04-10','2019-04-10'),(77,'sdf',1,1,'','2019-04-15','2019-04-15');
/*!40000 ALTER TABLE `purchase_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receipt_master`
--

DROP TABLE IF EXISTS `receipt_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `receipt_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bid` int(11) NOT NULL,
  `tid` int(11) NOT NULL,
  `receipt_num` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `bill_date` date NOT NULL,
  `amount` double NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `payment_mode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `receipt_num_UNIQUE` (`receipt_num`),
  KEY `fk_rm_branch_idx` (`bid`),
  KEY `fk_rm_treatment_idx` (`tid`),
  CONSTRAINT `fk_rm_branch` FOREIGN KEY (`bid`) REFERENCES `branch_master` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_rm_treatment` FOREIGN KEY (`tid`) REFERENCES `treatment_master` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receipt_master`
--

LOCK TABLES `receipt_master` WRITE;
/*!40000 ALTER TABLE `receipt_master` DISABLE KEYS */;
INSERT INTO `receipt_master` VALUES (94,1,14,'TH88','asdasd','2019-04-04',1000,'{\"procedure\":[],\"pharmacy\":[],\"lih\":[]}','admin @ 05-04-2019 18:01','Cheque/DD'),(98,1,14,'TH92','dsdasd','2019-04-05',1000,'{\"procedure\":[\"2\",\"2\",\"4\",\"7\",\"9\",\"8\",\"12\",\"2\",\"4\",\"9\"],\"pharmacy\":[\"13\",\"33\",\"33\",\"33\",\"13\",\"32\",\"33\"],\"lih\":[\"5\",\"2\",\"9\"]}','admin @ 05-04-2019 20:57','Cash'),(102,1,14,'TH96','dsdasd','2019-04-06',145978.55,'{\"procedure\":[],\"pharmacy\":[],\"lih\":[\"2\"]}','admin @ 06-04-2019 12:28','Cash'),(104,1,14,'TH98','dsdasd','2019-04-06',100,'{\"procedure\":[\"6\"],\"pharmacy\":[],\"lih\":[]}','admin @ 06-04-2019 21:10','Cash'),(105,1,14,'TH99','edit','2019-04-11',4821.45,'{\"procedure\":[\"6\"],\"pharmacy\":[],\"lih\":[]}','admin @ 11-04-2019 18:10','Cash'),(112,1,22,'TH106','edit','2019-04-15',1,'{\"procedure\":[],\"pharmacy\":[\"1\"],\"lih\":[]}','fothane @ 15-04-2019 10:34','Cash'),(113,1,22,'TH107','edit','2019-04-15',1,'{\"procedure\":[],\"pharmacy\":[\"1\",\"4\"],\"lih\":[]}','fothane @ 15-04-2019 11:03','Cash'),(115,1,22,'TH109','edit','2019-04-15',22,'{\"procedure\":[],\"pharmacy\":[\"4\",\"1\"],\"lih\":[]}','fothane @ 15-04-2019 11:27','Cash'),(117,1,23,'TH111','edit','2019-04-16',10000,'{\"procedure\":[\"1\"],\"pharmacy\":[],\"lih\":[]}','admin @ 16-04-2019 21:13','Cash'),(118,1,14,'TH0112','edit','2019-04-17',1,'{\"procedure\":[\"6\"],\"pharmacy\":[],\"lih\":[]}','fothane @ 17-04-2019 18:24','Cash'),(119,1,14,'TH0999','edit','2019-04-17',1,'{\"procedure\":[],\"pharmacy\":[],\"lih\":[\"5\"]}','fothane @ 17-04-2019 18:27','Cash'),(120,1,14,'TH1000','edit','2019-04-17',1,'{\"procedure\":[],\"pharmacy\":[],\"lih\":[\"5\"]}','fothane @ 17-04-2019 18:27','Cash'),(121,1,14,'TH9999','edit','2019-04-17',1,'{\"procedure\":[\"6\"],\"pharmacy\":[],\"lih\":[]}','fothane @ 17-04-2019 18:27','Cash'),(122,1,14,'TH10000','edit','2019-04-18',1,'{\"procedure\":[],\"pharmacy\":[],\"lih\":[\"5\"]}','fothane @ 17-04-2019 18:27','Cash'),(125,1,14,'THA0009','edit','2019-04-17',1,'{\"procedure\":[],\"pharmacy\":[],\"lih\":[\"5\"]}','fothane @ 17-04-2019 18:28','Cash'),(126,1,14,'THA0010','edit','2019-04-17',1,'{\"procedure\":[\"2\"],\"pharmacy\":[],\"lih\":[]}','fothane @ 17-04-2019 18:28','Cash'),(127,1,14,'THA0099','edit','2019-04-17',1,'{\"procedure\":[\"6\"],\"pharmacy\":[],\"lih\":[]}','fothane @ 17-04-2019 18:29','Cash'),(128,1,14,'THA0100','edit','2019-04-18',1,'{\"procedure\":[\"2\"],\"pharmacy\":[],\"lih\":[]}','fothane @ 17-04-2019 18:30','Cash'),(129,1,14,'THA0101','edit','2019-04-17',1,'{\"procedure\":[],\"pharmacy\":[],\"lih\":[\"5\"]}','fothane @ 17-04-2019 18:33','Cash'),(130,1,14,'THA0999','edit','2019-04-18',1,'{\"procedure\":[],\"pharmacy\":[],\"lih\":[\"2\"]}','fothane @ 17-04-2019 18:34','Cash'),(131,1,14,'THA1000','edit','2019-04-17',1,'{\"procedure\":[\"2\"],\"pharmacy\":[],\"lih\":[]}','fothane @ 17-04-2019 18:34','Cash'),(132,1,14,'THA1001','edit','2019-04-17',1,'{\"procedure\":[],\"pharmacy\":[],\"lih\":[\"9\"]}','fothane @ 17-04-2019 18:36','Cash'),(133,1,14,'THA1002','edit','2019-04-18',1,'{\"procedure\":[],\"pharmacy\":[],\"lih\":[\"2\"]}','fothane @ 17-04-2019 18:37','Cash'),(134,1,14,'THA1003','edit','2019-04-19',4986,'{\"procedure\":[],\"pharmacy\":[],\"lih\":[\"2\"]}','admin @ 19-04-2019 17:02','Cash'),(136,1,22,'THA1005','edit','2019-04-18',44,'{\"procedure\":[],\"pharmacy\":[\"1\"],\"lih\":[]}','admin @ 19-04-2019 18:36','Cash'),(137,1,22,'THA1006','edit','2019-04-20',100,'{\"procedure\":[\"1\"],\"pharmacy\":[],\"lih\":[]}','admin @ 19-04-2019 18:38','Cash'),(138,1,22,'THA1007','edit','2019-04-19',500,'{\"procedure\":[\"1\"],\"pharmacy\":[],\"lih\":[]}','admin @ 19-04-2019 18:41','Cash'),(139,1,26,'THA1008','edit','2019-04-26',30091.71,'{\"procedure\":[\"2\",\"1\"],\"pharmacy\":[\"1\",\"1\"],\"lih\":[\"1\",\"1\",\"1\"]}','admin @ 26-04-2019 14:18','Cash'),(140,1,26,'THA1009','edit','2019-04-26',25.45,'{\"procedure\":[\"2\",\"1\"],\"pharmacy\":[\"1\",\"1\"],\"lih\":[\"1\",\"1\",\"1\"]}','admin @ 26-04-2019 14:42','Cash'),(141,1,26,'THA1010','edit','2019-04-26',136.44,'{\"procedure\":[\"2\",\"1\"],\"pharmacy\":[\"1\",\"1\"],\"lih\":[\"1\",\"1\",\"1\"]}','admin @ 26-04-2019 16:03','Cash');
/*!40000 ALTER TABLE `receipt_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reference_master`
--

DROP TABLE IF EXISTS `reference_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `reference_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `contact` varchar(45) NOT NULL,
  `customer_source` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reference_sourse_idx` (`customer_source`),
  CONSTRAINT `fk_reference_sourse` FOREIGN KEY (`customer_source`) REFERENCES `customer_care_source` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reference_master`
--

LOCK TABLES `reference_master` WRITE;
/*!40000 ALTER TABLE `reference_master` DISABLE KEYS */;
INSERT INTO `reference_master` VALUES (65,'k;l','1',2,0),(69,'jjjl','2',1,0),(71,'asd','6',1,0),(72,'asdasd','6',1,0),(73,'wdqw','8',1,0),(75,'vivek','1231',2,0),(76,'sdf','9496943777',2,0);
/*!40000 ALTER TABLE `reference_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_master`
--

DROP TABLE IF EXISTS `room_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `room_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `isactive` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fkrm_branch_idx` (`branch_id`),
  CONSTRAINT `fkrm_branch` FOREIGN KEY (`branch_id`) REFERENCES `branch_master` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_master`
--

LOCK TABLES `room_master` WRITE;
/*!40000 ALTER TABLE `room_master` DISABLE KEYS */;
INSERT INTO `room_master` VALUES (1,0,1,'op1',0),(2,1,1,'s1',0),(3,0,1,'op2156',1),(4,1,1,'s22',0),(5,0,1,'op1',0),(6,0,1,'op30',1),(7,0,9,'koop11',1),(8,0,9,'koop2',1),(9,0,1,'op4',1);
/*!40000 ALTER TABLE `room_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_transaction`
--

DROP TABLE IF EXISTS `room_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `room_transaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `book_start` datetime NOT NULL,
  `book_end` datetime NOT NULL,
  `comment` varchar(100) DEFAULT NULL,
  `booked_by` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_rt_room_idx` (`room_id`),
  KEY `fk_rt_doctor_idx` (`doctor_id`),
  KEY `fk_rt_patient_idx` (`patient_id`),
  CONSTRAINT `fk_rt_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctor_master` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_rt_patient` FOREIGN KEY (`patient_id`) REFERENCES `patient_info_master` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_rt_room` FOREIGN KEY (`room_id`) REFERENCES `room_master` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_transaction`
--

LOCK TABLES `room_transaction` WRITE;
/*!40000 ALTER TABLE `room_transaction` DISABLE KEYS */;
INSERT INTO `room_transaction` VALUES (30,3,15,21,'2019-04-08 11:55:00','2019-04-08 12:55:00','','fothane @ 08-04-2019 11:57');
/*!40000 ALTER TABLE `room_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock_transfer_content`
--

DROP TABLE IF EXISTS `stock_transfer_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `stock_transfer_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `transfer_id` int(11) NOT NULL,
  `batch_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT '0',
  `bottle` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_stc_transfer_idx` (`transfer_id`),
  KEY `fk_stc_batchid_idx` (`batch_id`),
  CONSTRAINT `fk_stc_batchid` FOREIGN KEY (`batch_id`) REFERENCES `batch_master` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_stc_transfer` FOREIGN KEY (`transfer_id`) REFERENCES `stock_transfer_master` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_transfer_content`
--

LOCK TABLES `stock_transfer_content` WRITE;
/*!40000 ALTER TABLE `stock_transfer_content` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock_transfer_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock_transfer_master`
--

DROP TABLE IF EXISTS `stock_transfer_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `stock_transfer_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference_no` varchar(45) DEFAULT NULL,
  `branch_id` int(11) NOT NULL,
  `destination_branch_id` int(11) NOT NULL,
  `status` smallint(6) NOT NULL,
  `comment` varchar(200) DEFAULT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_st_dbranch_idx` (`destination_branch_id`),
  KEY `fk_st_branch_idx` (`branch_id`),
  CONSTRAINT `fk_st_branch` FOREIGN KEY (`branch_id`) REFERENCES `branch_master` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_st_dbranch` FOREIGN KEY (`destination_branch_id`) REFERENCES `branch_master` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_transfer_master`
--

LOCK TABLES `stock_transfer_master` WRITE;
/*!40000 ALTER TABLE `stock_transfer_master` DISABLE KEYS */;
INSERT INTO `stock_transfer_master` VALUES (64,'asda',1,9,0,'','2019-01-22'),(65,'asdasd',1,9,0,'asdasdasd','2019-01-21'),(73,'jkhgj',10,1,1,'','2019-01-22'),(74,'asdasasd',1,9,1,'','2019-01-22'),(75,'retr',1,9,0,'','2019-02-12'),(76,'ref1',1,9,0,'','2019-02-12'),(78,'',1,1,1,'','2019-04-10'),(79,'',1,1,1,'','2019-04-10');
/*!40000 ALTER TABLE `stock_transfer_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treatment_lab_investigation`
--

DROP TABLE IF EXISTS `treatment_lab_investigation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `treatment_lab_investigation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tid` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `lab_investigation_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `amount` double NOT NULL,
  `discount` double DEFAULT NULL,
  `comment` varchar(45) DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `is_free` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tlabi_treatment_idx` (`tid`),
  KEY `fk_tlabi_patient_idx` (`patient_id`),
  KEY `fk_tlabi_idx` (`lab_investigation_id`),
  KEY `fk_tlabi_branch_idx` (`branch_id`),
  CONSTRAINT `fk_tlab_branch` FOREIGN KEY (`branch_id`) REFERENCES `branch_master` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_tlab_lab` FOREIGN KEY (`lab_investigation_id`) REFERENCES `lab_investigation_master` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_tlab_patient` FOREIGN KEY (`patient_id`) REFERENCES `patient_info_master` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_tlab_treatment` FOREIGN KEY (`tid`) REFERENCES `treatment_master` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treatment_lab_investigation`
--

LOCK TABLES `treatment_lab_investigation` WRITE;
/*!40000 ALTER TABLE `treatment_lab_investigation` DISABLE KEYS */;
INSERT INTO `treatment_lab_investigation` VALUES (7,29,15,33,1,'2019-04-19',1000,0,'','admin @ 19-04-2019 19:43',0),(23,14,15,1,1,'2019-04-25',220,0.9090909090909091,'218','admin @ 25-04-2019 19:57',0),(26,14,15,1,1,'2019-04-25',220,2,'215.6','admin @ 25-04-2019 19:59',0),(27,14,15,1,1,'2019-04-25',220,45.45454545454545,'120','admin @ 25-04-2019 20:00',0),(28,14,15,1,1,'2019-04-25',220,100,'0','admin @ 25-04-2019 20:00',0),(29,14,15,1,1,'2019-04-25',220,0,'','admin @ 25-04-2019 20:00',0),(30,14,15,4,1,'2019-04-25',160,20,'140','admin @ 25-04-2019 20:01',0),(31,14,15,3,1,'2019-04-25',230,0,'210','fothane @ 26-04-2019 18:36',0),(32,14,15,6,1,'2019-04-26',90,0,'0 di','fothane @ 26-04-2019 18:36',0),(34,28,15,1,1,'2019-04-25',220,1,'219','admin @ 25-04-2019 20:07',0),(35,28,15,1,1,'2019-04-25',220,1,'219','admin @ 25-04-2019 20:08',0),(36,27,15,1,1,'2019-04-25',220,1,'219','admin @ 25-04-2019 20:12',0),(37,27,15,1,1,'2019-04-25',220,0.45454545454545453,'','admin @ 25-04-2019 20:13',0),(38,27,15,1,1,'2019-04-25',220,22,'171.6','admin @ 25-04-2019 20:13',0),(39,27,15,1,1,'2019-04-25',220,2.2727272727272725,'215','admin @ 25-04-2019 20:14',0),(40,27,15,4,1,'2019-04-25',160,16,'','admin @ 25-04-2019 20:14',0),(41,26,15,1,1,'2019-04-26',220,10,'200','admin @ 26-04-2019 14:04',0),(42,26,15,1,1,'2019-04-26',220,9.09090909090909,'0','admin @ 26-04-2019 14:41',0),(43,26,15,1,1,'2019-04-26',220,4.545,'0','admin @ 26-04-2019 14:16',0);
/*!40000 ALTER TABLE `treatment_lab_investigation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treatment_master`
--

DROP TABLE IF EXISTS `treatment_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `treatment_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `cfc` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `start_date` date NOT NULL,
  `payment_date` date NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `comment` varchar(100) DEFAULT NULL,
  `last_edit_by` varchar(45) NOT NULL,
  `is_active` smallint(6) NOT NULL,
  `last_edit` datetime DEFAULT NULL,
  `patient_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_treatment_cus_idx` (`cfc`),
  KEY `fk_treatment_doctor_idx` (`doctor_id`),
  KEY `fk_treatment_patient_idx` (`patient_id`),
  CONSTRAINT `fk_treatment_cus` FOREIGN KEY (`cfc`) REFERENCES `customer_master` (`cfc`) ON DELETE CASCADE,
  CONSTRAINT `fk_treatment_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctor_master` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_treatment_patient` FOREIGN KEY (`patient_id`) REFERENCES `patient_info_master` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treatment_master`
--

LOCK TABLES `treatment_master` WRITE;
/*!40000 ALTER TABLE `treatment_master` DISABLE KEYS */;
INSERT INTO `treatment_master` VALUES (14,'Treatment 1','TH19023','2019-03-19','2019-03-19',22,'','admin @ 06-04-2019 14:05',1,'2019-04-06 14:05:57',15),(15,'sd','TH19022','2019-03-22','2019-03-22',22,'','admin @ 22-03-2019 13:59',1,'2019-03-22 13:59:42',NULL),(16,'Treatment 1','TH19029','2019-04-02','2019-04-02',21,'','admin @ 02-04-2019 09:13',1,'2019-04-02 09:13:11',NULL),(22,'t2','TH19023','2019-04-09','2019-04-09',22,'','fokochi @ 09-04-2019 18:49',1,'2019-04-09 18:49:45',15),(23,'t3','TH19023','2019-04-16','2019-04-16',21,'','admin @ 16-04-2019 21:13',1,'2019-04-16 21:13:02',15),(24,'p1','TH19023','2019-04-17','2019-04-17',22,'','fothane @ 17-04-2019 20:13',1,'2019-04-17 20:13:27',15),(25,'p2','TH19023','2019-04-17','2019-04-17',24,'','admin @ 17-04-2019 20:15',1,'2019-04-17 20:15:56',15),(26,'p3','TH19023','2019-04-17','2019-04-17',25,'','admin @ 17-04-2019 20:19',1,'2019-04-17 20:19:33',15),(27,'p4','TH19023','2019-04-17','2019-04-17',24,'','admin @ 17-04-2019 20:20',1,'2019-04-17 20:20:13',15),(28,'p6','TH19023','2019-04-17','2019-04-17',24,'','admin @ 17-04-2019 20:20',1,'2019-04-17 20:20:43',15),(29,'p7','TH19023','2019-04-17','2019-04-17',24,'','admin @ 17-04-2019 20:21',1,'2019-04-17 20:21:28',15),(30,'p8','TH19023','2019-04-17','2019-04-17',24,'','admin @ 17-04-2019 20:22',1,'2019-04-17 20:22:05',15),(31,'p9','TH19023','2019-04-17','2019-04-17',24,'','admin @ 17-04-2019 20:22',1,'2019-04-17 20:22:30',15),(32,'p10','TH19023','2019-04-17','2019-04-17',25,'','admin @ 17-04-2019 20:24',1,'2019-04-17 20:24:02',15);
/*!40000 ALTER TABLE `treatment_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treatment_procedure`
--

DROP TABLE IF EXISTS `treatment_procedure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `treatment_procedure` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tid` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `procedure_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `amount` double NOT NULL,
  `discount` double DEFAULT NULL,
  `comment` varchar(45) DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `is_free` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tprocedure_treatment_idx` (`tid`),
  KEY `fk_tprocedure_patient_idx` (`patient_id`),
  KEY `fk_tprocedure_procedure_idx` (`procedure_id`),
  KEY `fk_tprocedire_branch_idx` (`branch_id`),
  CONSTRAINT `fk_tprocedure_branch` FOREIGN KEY (`branch_id`) REFERENCES `branch_master` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_tprocedure_patient` FOREIGN KEY (`patient_id`) REFERENCES `patient_info_master` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_tprocedure_procedure` FOREIGN KEY (`procedure_id`) REFERENCES `procedure_master` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_tprocedure_treatment` FOREIGN KEY (`tid`) REFERENCES `treatment_master` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treatment_procedure`
--

LOCK TABLES `treatment_procedure` WRITE;
/*!40000 ALTER TABLE `treatment_procedure` DISABLE KEYS */;
INSERT INTO `treatment_procedure` VALUES (37,16,17,2,1,'2019-04-02',20000,0,'','admin @ 02-04-2019 09:13',0),(38,16,17,4,1,'2019-04-02',10000,0,'','admin @ 02-04-2019 09:13',0),(39,14,15,2,1,'2019-04-04',20000,0,'','admin @ 04-04-2019 15:11',0),(40,14,15,4,1,'2019-04-04',10000,0,'','admin @ 04-04-2019 15:11',0),(41,14,15,9,1,'2019-04-03',30000,0,'','admin @ 04-04-2019 20:33',0),(42,14,15,2,1,'2019-04-05',20000,0,'','admin @ 05-04-2019 20:55',0),(43,14,15,2,1,'2019-04-05',20000,0,'','admin @ 05-04-2019 20:56',0),(44,14,15,4,1,'2019-04-05',10000,0,'','admin @ 05-04-2019 20:56',0),(45,14,15,7,1,'2019-04-05',5000,0,'','admin @ 05-04-2019 20:56',0),(46,14,15,9,1,'2019-04-05',30000,0,'','admin @ 05-04-2019 20:56',0),(47,14,15,8,1,'2019-04-05',7800,0,'','admin @ 05-04-2019 20:56',0),(48,14,15,12,1,'2019-04-05',3000,0,'','admin @ 05-04-2019 20:56',0),(49,14,15,6,1,'2019-04-06',0,0,'','admin @ 06-04-2019 21:10',1),(50,22,15,1,1,'2019-04-15',10000,0,'','fothane @ 15-04-2019 10:28',0),(51,22,15,1,1,'2019-04-15',10000,0,'','fothane @ 15-04-2019 10:29',0),(52,23,15,1,1,'2019-04-16',10000,0,'','admin @ 16-04-2019 21:13',0),(53,29,15,3,1,'2019-04-19',2000,0,'','admin @ 19-04-2019 19:43',0),(55,14,15,1,1,'2019-04-25',10000,25,'','admin @ 25-04-2019 17:39',0),(57,14,15,1,1,'2019-04-25',10000,1.5,'','admin @ 25-04-2019 17:45',0),(58,14,15,1,1,'2019-04-25',10000,100,'','admin @ 25-04-2019 17:46',0),(59,14,15,38,1,'2019-04-25',190000,2.6315789473684212,'','admin @ 25-04-2019 17:50',0),(60,14,15,1,1,'2019-04-25',10000,0.02,'9998','admin @ 25-04-2019 19:38',0),(61,26,15,2,1,'2019-04-26',20000,0.275,'9975','admin @ 26-04-2019 13:48',0),(62,26,15,1,1,'2019-04-26',10000,4.51,'0','admin @ 26-04-2019 14:17',0);
/*!40000 ALTER TABLE `treatment_procedure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treatment_stock`
--

DROP TABLE IF EXISTS `treatment_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `treatment_stock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tid` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `batch_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `bottle` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `amount` double NOT NULL,
  `discount` double DEFAULT NULL,
  `is_free` smallint(6) NOT NULL,
  `start_date` date NOT NULL,
  `comment` varchar(45) DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_t_stock_treatment_idx` (`tid`),
  KEY `fk_t_stock_patient_idx` (`patient_id`),
  KEY `fk_t_stock_batch_idx` (`batch_id`),
  KEY `fk_t_stock_branch_idx` (`branch_id`),
  CONSTRAINT `fk_t_stock_batch` FOREIGN KEY (`batch_id`) REFERENCES `batch_master` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_t_stock_branch` FOREIGN KEY (`branch_id`) REFERENCES `branch_master` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_t_stock_patient` FOREIGN KEY (`patient_id`) REFERENCES `patient_info_master` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_t_stock_treatment` FOREIGN KEY (`tid`) REFERENCES `treatment_master` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treatment_stock`
--

LOCK TABLES `treatment_stock` WRITE;
/*!40000 ALTER TABLE `treatment_stock` DISABLE KEYS */;
INSERT INTO `treatment_stock` VALUES (46,22,15,1,1,0,10,20.16,0,0,'2019-04-15','','fothane @ 15-04-2019 10:00'),(47,22,15,4,1,-1,1,1669,0,0,'2019-04-15','','fothane @ 15-04-2019 10:00'),(48,22,15,1,1,0,10,20.16,0,0,'2019-04-15','','fothane @ 15-04-2019 10:01'),(49,27,15,1,1,0,1,20.16,50,0,'2019-04-25','','admin @ 25-04-2019 20:43'),(50,27,15,1,1,0,10,20.16,24.8015873015873,0,'2019-04-25','151.6','admin @ 25-04-2019 20:48'),(51,27,15,1,1,0,1,20.16,49.6031746031746,0,'2019-04-25','','admin @ 25-04-2019 20:48'),(52,27,15,1,1,0,10,20.16,74.4047619047619,0,'2019-04-25','','admin @ 25-04-2019 20:56'),(53,26,15,1,1,0,10,20.16,24.8015873015873,0,'2019-04-26','15.16','admin @ 26-04-2019 16:01'),(54,26,15,1,1,0,1,20.16,100,0,'2019-04-26','0','admin @ 26-04-2019 12:40');
/*!40000 ALTER TABLE `treatment_stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_master`
--

DROP TABLE IF EXISTS `user_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `type` int(10) NOT NULL,
  `branch_id` int(11) NOT NULL DEFAULT '-1',
  `password` varchar(45) NOT NULL DEFAULT '12345',
  `isactive` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_master`
--

LOCK TABLES `user_master` WRITE;
/*!40000 ALTER TABLE `user_master` DISABLE KEYS */;
INSERT INTO `user_master` VALUES (1,'CustomerCare1',6,-1,'12345',1),(2,'CustomerCare2',6,-1,'12345',1),(3,'admin',1,1,'123',1),(4,'kochi',2,9,'12345',1),(5,'bsakochi',5,9,'123',1),(6,'fokochi',3,9,'12345',1),(7,'fothane',3,1,'12345',1),(8,'thane',2,1,'thane',1),(9,'bsathane',5,1,'12345',1),(10,'msa',4,10,'12345',1),(11,'dire',0,1,'dire',0),(13,'jobin',7,1,'12345',1),(14,'dr ar ad',1,1,'dr ar ad',1),(15,'dr drd',7,9,'dr drd',0),(16,'doctor1',7,1,'doctor1',1),(17,'doctor 2',7,1,'doctor 2',1),(18,'doctor3',7,1,'doctor3',1),(19,'doctor4',7,9,'doctor4',1),(23,'jobin1',7,1,'jobin1',1),(24,'robin1',7,1,'robin1',1),(25,'doctor5',7,9,'doctor5',1),(26,'doctor6',7,9,'doctor6',1),(27,'director',0,1,'director',1),(28,'fosanta',3,2,'fosanta',1);
/*!40000 ALTER TABLE `user_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` int(10) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_role_UNIQUE` (`role`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,0,'Director'),(2,1,'Admin'),(3,2,'Branch Admin'),(4,3,'Front Office'),(5,4,'Master Stock Admin'),(6,5,'Branch Stock Admin'),(7,6,'Customer Care'),(8,7,'Doctor');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'cucoon'
--
/*!50003 DROP PROCEDURE IF EXISTS `add_patient_basic_info` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_patient_basic_info`(in type int,in cfcc varchar(45),in namee varchar(100),in sexx varchar(6),in dobb date)
BEGIN
if type=1 then 
insert into patient_info_master values(null,cfcc,namee,sexx,dobb);
elseif type=2 then
update patient_info_master set name=namee,dob=dobb where cfc=cfcc and sex=sexx;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `assign_doctor_branch` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `assign_doctor_branch`(in did int,in bid int)
BEGIN
insert into doctor_branch values (null,did,bid);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `assign_patient_branch` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `assign_patient_branch`(in bid int,in cfc text(45))
BEGIN
insert into patient_branch values (null,bid,cfc);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `brand_master` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `brand_master`(in type int,in idd int,in namee varchar(200))
BEGIN
#type 1 insert,2edit ,3 delete
if type=1 then
insert into brand_master values(null,namee,1);

elseif type=2 then
update brand_master set name=namee where id =idd;

elseif type=3 then
update brand_master set isactive=0 where id =idd;

end if;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `check_duplicate_primary_contact` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `check_duplicate_primary_contact`(in num varchar(45),out countn int)
BEGIN
select count(*) into countn from customer_master where number1 like num;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `confirm_bsa_stock_transfer` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `confirm_bsa_stock_transfer`(in purchaseid int,in branchid int)
BEGIN
declare destinationbranch int;
DECLARE v_finished INTEGER DEFAULT 0;
        DECLARE qty int;
        declare batchid int;
 DEClARE e_cursor CURSOR FOR 
 SELECT quantity,batch_id FROM stock_transfer_content where transfer_id = purchaseid;
 
 -- declare NOT FOUND handler
 DECLARE CONTINUE HANDLER 
        FOR NOT FOUND SET v_finished = 1;
 update stock_transfer_master set status=1 where id=purchaseid and destination_branch_id=branchid;
 select destination_branch_id into destinationbranch from stock_transfer_master where id =purchaseid;
 OPEN e_cursor;
 get_data: LOOP
 
 FETCH e_cursor INTO qty,batchid;
 
 IF v_finished = 1 THEN 
 LEAVE get_data;
 END IF;
 
 call update_stock(2,destinationbranch,batchid,qty);
 END LOOP get_data;
 
 CLOSE e_cursor;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `confirm_purchase_bsa` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `confirm_purchase_bsa`(in purchaseid int,in branchid int)
BEGIN
DECLARE v_finished INTEGER DEFAULT 0;
        DECLARE qty int;
        declare batchid int;
 DEClARE e_cursor CURSOR FOR 
 SELECT quantity,batch_id FROM purchase_content where purchase_id = purchaseid;
 
 -- declare NOT FOUND handler
 DECLARE CONTINUE HANDLER 
        FOR NOT FOUND SET v_finished = 1;
 update purchase_master set status=1,accepted_date=now() where id=purchaseid and branch_id=branchid;
 
 OPEN e_cursor;
 get_data: LOOP
 
 FETCH e_cursor INTO qty,batchid;
 
 IF v_finished = 1 THEN 
 LEAVE get_data;
 END IF;
 
 call update_stock(1,branchid,batchid,qty);
 END LOOP get_data;
 
 CLOSE e_cursor;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `customer_care_source` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `customer_care_source`(in type int,in idd int,in namee varchar(200))
BEGIN
#type 1 insert,2edit ,3 delete
if type=1 then
insert into customer_care_source values(null,namee,1);

elseif type=2 then
update customer_care_source set name=namee where id =idd;

elseif type=3 then
update customer_care_source set isactive=0 where id =idd;

end if;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_batch` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_batch`(in itemid int,in batchid int)
BEGIN
update batch_master set isactive = 0 where id=batchid and item_id=itemid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_booking_branch` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_booking_branch`(in branchid int,in bookingid int)
BEGIN
if branchid = -1 then
delete from booking_master where id=bookingid; 
else
delete from booking_master where id=bookingid and branch_id=branchid;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_item` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_item`(in itemid int)
BEGIN
update item_master set isactive=0 where id=itemid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_patient` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_patient`(in cfcc varchar(45),in bidd int,in usertype int)
BEGIN
if usertype < 2 then
update customer_master set isactive=0 where cfc like cfcc ;
else
update customer_master set isactive=0 where cfc like cfcc and cfc in (select cfc from patient_branch where bid=bidd);
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_purchase` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_purchase`(in pid int)
BEGIN
delete from purchase_master where id=pid and status =0;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_receipt` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_receipt`(in treatmentid int,in idd int)
BEGIN
delete from receipt_master where id=idd and tid=treatmentid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_room_booking` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_room_booking`(in bookingid int,in branchid int )
BEGIN
declare bid int;
delete from room_transaction where room_transaction.id=bookingid and 
room_id in(select room_master.id from room_master where branch_id=branchid);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_stock_transfer` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_stock_transfer`(in pid int,in branchid int)
BEGIN
DECLARE v_finished INTEGER DEFAULT 0;
        
 declare batchid,quantityy,bottlee,stock int;       
 DEClARE e_cursor CURSOR FOR 
 SELECT quantity,batch_id,bottle FROM stock_transfer_content where transfer_id = pid;
 
 -- declare NOT FOUND handler
 DECLARE CONTINUE HANDLER 
        FOR NOT FOUND SET v_finished = 1;
 
 OPEN e_cursor;
 get_data: LOOP
 
 FETCH e_cursor INTO quantityy,batchid,bottlee;
 
 IF v_finished = 1 THEN 
 LEAVE get_data;
 END IF;
 
 
if bottlee=-1 then 
update branch_item set counter=counter+quantityy where branch_id =branchid and batch_id=batchid;
else 
select JSON_EXTRACT(qty_json , concat('$.i',bottlee)) into stock from branch_item where branch_id =branchid and batch_id=batchid;
update branch_item set qty_json = JSON_REPLACE(qty_json,concat('$.i',bottlee),stock-quantityy) where branch_id =branchid and batch_id=batchid;
end if;
 END LOOP get_data;
 CLOSE e_cursor;
delete from stock_transfer_master where id=pid and status =0;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_treatment_file` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_treatment_file`(in tid int,in cfcc varchar(45))
BEGIN
delete from treatment_master where id=tid and cfc like cfcc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `edit_booking_cc` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `edit_booking_cc`(in type int,in cname varchar(100),in contactt varchar(100),in clinic int,in timee datetime,in bookedby varchar(100),in coment varchar(200),in bookingid int,in sourceid int,out flag int)
BEGIN
declare ref int;
if type=1 then
	set flag=1;
	call check_duplicate_primary_contact(contactt,flag);
	if flag = 0 then
	select ref_id into ref from booking_master where id=bookingid;
	update reference_master set name =cname,contact=contactt,customer_source=sourceid where id=ref; 
	update booking_master set branch_id=clinic,time=timee,comment=coment,booked_by=concat(bookedby,' @ ',date_format(now(),'%d-%m-%Y %H:%i')) where id=bookingid and cfc is null;
	end if;
    
elseif type = 2 then

update booking_master set time=timee,comment=coment where id=bookingid and ref_id is null;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `edit_branch_info` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `edit_branch_info`(in namee varchar(100),in addresss varchar(200),
in phonee varchar(45),in typee int,in branchid int)
BEGIN
update branch_master set name=namee,address=addresss,phone=phonee,type=typee where id=branchid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `edit_branch_prefix` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `edit_branch_prefix`(in  pre varchar(45),in counterr int,in branchid int,
in invoiceprefix varchar(45),in invoicecounter int,in receiptprefix varchar(45),in receiptcounter int
)
BEGIN
update cfc_master set prefix=pre,counter=counterr where branch_id=branchid;

update branch_master set invoice_prefix=invoiceprefix,invoice_counter=invoicecounter,
receipt_prefix=receiptprefix,receipt_counter=receiptcounter where id=branchid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `edit_cfc_booking` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `edit_cfc_booking`(in atime datetime,in did int,in commentt varchar(100),
in bookedby varchar(100),in bookingid int)
BEGIN

update booking_master set time=atime,doctor_id=did,comment=commentt,booked_by=concat(bookedby,' @ ',date_format(now(),'%d-%m-%Y %H:%i')) where id=bookingid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `edit_doctor_admin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `edit_doctor_admin`(in namee varchar(200),in dobb date,in sexx varchar(15),in contactt varchar(45),in did int)
BEGIN
#edit doctor detail from branch admin
update doctor_master set name=namee,dob = dobb, sex=sexx,contact=contactt where id=did;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `edit_item` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `edit_item`(in itemid int,in itemname varchar(200))
BEGIN
update item_master set name=itemname where id=itemid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `edit_item_batch` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `edit_item_batch`(in itemid int,in batchname varchar(100),in cp double,in sp double,
in expirydate date,in msuu int,in commentt varchar(50),in batchid int)
BEGIN
declare nmsu int;

select type into nmsu from item_master where id=itemid;
if nmsu=2 then
set nmsu=msuu;
end if;
update batch_master set name=batchname,cost_price=cp,selling_price=sp,expiry_date=expirydate,
msu=nmsu,comment=commentt where id=batchid and item_id=itemid and isactive=1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `edit_patient_master` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `edit_patient_master`(in usertype int,in bidd int,in cfcc varchar(45),in namee varchar(100),in number11 varchar(45),
in number22 varchar(45),in emaill varchar(45),in addresss varchar(200),in sourcee int)
BEGIN
if usertype <2 then
update customer_master set name=namee,number1=number11,number2=number22,email=emaill,address=addresss,customer_source=sourcee where cfc like cfcc;
else
update customer_master set name=namee,number1=number11,number2=number22,email=emaill,address=addresss,
customer_source=sourcee where cfc like cfcc
and cfc in (select cfc from patient_branch where bid=bidd);
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `edit_purchase` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `edit_purchase`(in reference varchar(45),in branchid int,in commentt varchar(200),in pdate date,in pid int)
BEGIN
update purchase_master set reference_no=reference,branch_id=branchid,comment=commentt,date=pdate where id=pid and status =0;
delete from purchase_content where purchase_id in (select id from purchase_master where id=pid and status = 0);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `edit_receipt` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `edit_receipt`(in branchid int,in treatmentid int,in name varchar(45),in billdate date ,
in amount double,in description varchar(200),in createdby varchar(100),in rid int,in mode varchar(45))
BEGIN

declare balanceamount,tempamount double;
select 
ifnull(tstock.samount,0)+ifnull(tprocedure.pamount,0)+ifnull(tlab.lamount,0)-ifnull(rcpt.ramount,0) balance_amount 
into balanceamount
from treatment_master 
left join
(
select treatment_stock.tid, sum((treatment_stock.amount*treatment_stock.quantity)-((treatment_stock.quantity*treatment_stock.amount*discount)/100))samount from
treatment_stock where treatment_stock.is_free=0 and treatment_stock.tid=treatmentid  group by treatment_stock.tid
)tstock on treatment_master.id= tstock.tid
left join
(
select treatment_procedure.tid, sum(treatment_procedure.amount-((treatment_procedure.amount*treatment_procedure.discount)/100))pamount from
treatment_procedure where treatment_procedure.is_free=0 and treatment_procedure.tid=treatmentid group by treatment_procedure.tid
)tprocedure on tprocedure.tid=treatment_master.id
left join
(
select treatment_lab_investigation.tid, sum(treatment_lab_investigation.amount-((treatment_lab_investigation.amount*treatment_lab_investigation.discount)/100))lamount from
treatment_lab_investigation where treatment_lab_investigation.is_free=0 group by treatment_lab_investigation.tid
)tlab on tlab.tid=treatment_master.id
left join
(
select sum(receipt_master.amount)ramount,receipt_master.tid  from receipt_master where  receipt_master.tid=treatmentid group by receipt_master.tid
)rcpt on rcpt.tid=treatment_master.id
where treatment_master.id =treatmentid;

select amount into tempamount from receipt_master where id=rid;

if balanceamount+tempamount>=amount then
update receipt_master set bid = branchid ,receipt_master.name=name,bill_date=billdate,payment_mode=mode,
receipt_master.amount=amount,receipt_master.description=description,created_by=concat(createdby,' @ ',date_format(now(),'%d-%m-%Y %H:%i')) 
where id=rid and receipt_master.tid = treatmentid;

end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `edit_ref_booking` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `edit_ref_booking`(in bookingid int,in appointment datetime,in commentt varchar(200),in bookedby varchar(100),in sourcee int,in contactt varchar (45))
BEGIN
update booking_master set time=appointment,comment=commentt,booked_by=concat(bookedby,' @ ',date_format(now(),'%d-%m-%Y %H:%i')) where id=bookingid;
update reference_master set customer_source =sourcee,contact = contactt where id in (select ref_id from booking_master where id = bookingid) ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `edit_stock_transfer` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `edit_stock_transfer`(in referencee varchar(45),in destbranchid int,in commentt varchar(200),in pdate date,in pid int,in branchid int)
BEGIN
DECLARE v_finished INTEGER DEFAULT 0;
        
 declare batchid,quantityy,bottlee,stock int;       
 DEClARE e_cursor CURSOR FOR 
 SELECT quantity,batch_id,bottle FROM stock_transfer_content where transfer_id = pid;
 
 -- declare NOT FOUND handler
 DECLARE CONTINUE HANDLER 
        FOR NOT FOUND SET v_finished = 1;
 
 OPEN e_cursor;
 get_data: LOOP
 
 FETCH e_cursor INTO quantityy,batchid,bottlee;
 
 IF v_finished = 1 THEN 
 LEAVE get_data;
 END IF;
 
 
if bottlee=-1 then 
update branch_item set counter=counter+quantityy where branch_id =branchid and batch_id=batchid;
else 
select JSON_EXTRACT(qty_json , concat('$.i',bottlee)) into stock from branch_item where branch_id =branchid and batch_id=batchid;
update branch_item set qty_json = JSON_REPLACE(qty_json,concat('$.i',bottlee),stock-quantityy) where branch_id =branchid and batch_id=batchid;
end if;
 END LOOP get_data;
 CLOSE e_cursor;

delete from stock_transfer_content where transfer_id in (select id from stock_transfer_master where id=pid and status = 0);
update stock_transfer_master set reference_no=referencee,destination_branch_id=destbranchid,comment=commentt,date=pdate where id=pid and status =0;
#delete from stock_transfer_content where purchase_id in (select id from stock_transfer_master where id=pid and status = 0);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `edit_treatment_file` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `edit_treatment_file`(in namee varchar(100),in cfcc varchar (45),in startdate date,in paymentdate date,in commentt varchar(45),
in createdby varchar(45),in tid int,in doctorid int,in patientid int
)
BEGIN
update treatment_master set name=namee,start_date=startdate,payment_date=paymentdate,comment=commentt,doctor_id=doctorid,
last_edit_by=concat(createdby,' @ ',date_format(now(),'%d-%m-%Y %H:%i')),last_edit=now(),patient_id=patientid where id=tid and cfc=cfcc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `expired_products` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `expired_products`(in branchidd int)
BEGIN
select item_id,name from(
select item_master.id item_id, item_master.name,
#batch_master.msu,temp.counter,
case item_master.type when '2' then
sum(ifnull((batch_master.msu*temp.counter)-temp.sumtot,0)) when '1' then sum(ifnull(temp.counter,0)) end quantity,item_master.type from item_master left join batch_master on item_master.id = batch_master.item_id 
and item_master.isactive = 1
left join
(select ifnull(sumx,0)sumtot,batch_master.id batchid,ifnull(counter,0)counter,branch_id branchid from batch_master left join
 (SELECT ifnull(sum(xval),0) sumx,batch_id id,branch_id ,counter
     FROM branch_item,
       JSON_TABLE(
         qty_json,
         "$.*" COLUMNS(
           xval VARCHAR(100) PATH "$"
          
         ) 
       ) AS  jt1 group by branch_item.id 
       )th on batch_master.id = th.id
 )temp
 on batch_master.id =temp.batchid 
and temp.branchid=branchidd
 where item_master.isactive = 1 and batch_master.isactive=1 and batch_master.expiry_date is not null and batch_master.expiry_date <= date(now())
 group by item_master.id 
 order by item_master.name
)temp2 where temp2.quantity > 0;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `find_existing_patient_cc` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `find_existing_patient_cc`(in type int,in find text)
BEGIN
#find cfc for existing patient booking via customer care
#1 = search based on cfc
#2=search based on contact
if type=1 then
select name,cfc,number1 contact from customer_master where cfc like find and isactive=1;
elseif type=2 then
select name,cfc,number1 contact from customer_master where number1 like find and isactive=1;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `generate_cfc` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `generate_cfc`(in branchid int,out cfc text)
BEGIN
#select concat(prefix,counter) into cfc from cfc_master where branch_id =branchid;
select concat(prefix,concat(case when counter  < 10 then '000' when  counter >=10 and counter < 100 then
 '00' when  counter >=100 and counter < 1000  then '0' else '' end,counter)) into cfc from cfc_master where branch_id =branchid;
update cfc_master set counter =counter+1 where branch_id=branchid;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `generate_cfc_from_reference` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `generate_cfc_from_reference`(in bookingid int,in did int,in visit int)
BEGIN

declare cfc text;
declare pid int;
declare refid int;
declare branchid int;
select ref_id,branch_id  into refid,branchid from booking_master where id=bookingid;
call generate_cfc(branchid,cfc);



insert into customer_master
select null,cfc,branchid,name,contact,'','','',customer_source,1 from reference_master 
where id =refid;

set pid =LAST_INSERT_ID();

call assign_patient_branch(branchid,cfc);

update booking_master set ref_id=null,booking_master.cfc=cfc,doctor_id=did,visit_status=visit where booking_master.id=bookingid; 

delete from reference_master where id = refid;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_all_branch_basic` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_branch_basic`(in type int)
BEGIN
#type=1 brach info for admin
if type =1 then
select branch_master.id,branch_master.name,branch_master.phone,case branch_master.type when 0 then 'Franchise' when 1 then 'Subsidiary' end type 
,cfc_master.prefix cfc from branch_master
 inner join cfc_master on branch_master.id=cfc_master.branch_id  and branch_master.isactive =1;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_all_doctor_basic` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_doctor_basic`(in bidd int)
BEGIN
select doctor_master.id,doctor_master.name from doctor_master where doctor_master.status=1 and doctor_master.id not in (select did from doctor_branch where bid=bidd);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_all_doctor_basic_admin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_doctor_basic_admin`()
BEGIN
select doctor_master.id,doctor_master.name from doctor_master where doctor_master.status=1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_basics` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_basics`(in type int)
BEGIN
#1 client name
#2 procedure details
#3 all item name,id,type
#4 all batch basic
#5 customercare source

if type = 1 then
#basic client details
select id,name from branch_master where isactive = 1 order by name;
elseif type = 2 then
select * from procedure_master where isactive =1;
elseif type=3 then
select id,name,item_master.type from item_master where isactive=1 order by name;
elseif type=4 then
select batch_master.id,item_id,batch_master.name,cost_price,selling_price,expiry_date,msu
from batch_master inner join item_master on item_master.id = batch_master.item_id and item_master.isactive = 1 and batch_master.isactive=1;
elseif type=5 then
select * from customer_care_source where isactive=1;
elseif type=6 then
select * from brand_master where isactive=1;
elseif type=7 then
select * from lab_investigation_master where isactive =1;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_basic_generate_receipt` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_basic_generate_receipt`(in tidd int)
BEGIN

declare invoice_flag int;
select count(*) into invoice_flag from invoice_master where tid=tidd;


select customer_master.name,ifnull(tstock.samount,0)+ifnull(tprocedure.pamount,0)+ifnull(tlab.lamount,0)total_amount,invoice_flag,
ifnull(rcpt.ramount,0)ramount,ifnull(tstock.samount,0)+ifnull(tprocedure.pamount,0)+ifnull(tlab.lamount,0)-ifnull(rcpt.ramount,0) balance_amount from customer_master inner join
treatment_master on treatment_master.cfc = customer_master.cfc 
left join
(
select treatment_stock.tid, sum((treatment_stock.amount*treatment_stock.quantity)-((treatment_stock.quantity*treatment_stock.amount*discount)/100))samount from
treatment_stock where treatment_stock.is_free=0 and treatment_stock.tid=tidd  group by treatment_stock.tid
)tstock on treatment_master.id= tstock.tid
left join
(
select treatment_procedure.tid, sum(treatment_procedure.amount-((treatment_procedure.amount*treatment_procedure.discount)/100))pamount from
treatment_procedure where treatment_procedure.is_free=0 and treatment_procedure.tid=tidd group by treatment_procedure.tid
)tprocedure on tprocedure.tid=treatment_master.id
left join
(
select treatment_lab_investigation.tid, sum(treatment_lab_investigation.amount-((treatment_lab_investigation.amount*treatment_lab_investigation.discount)/100))lamount from
treatment_lab_investigation where treatment_lab_investigation.is_free=0 and treatment_lab_investigation.tid=tidd group by treatment_lab_investigation.tid
)tlab on tlab.tid=treatment_master.id

left join
(
select sum(receipt_master.amount)ramount,receipt_master.tid  from receipt_master where  receipt_master.tid=tidd group by receipt_master.tid
)rcpt on rcpt.tid=treatment_master.id
where treatment_master.id =tidd;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_batch_basics` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_batch_basics`(in itemid int)
BEGIN
select id,name,cost_price,selling_price,expiry_date,date_format(expiry_date,'%d-%m-%Y')fdate,msu,comment from
batch_master where item_id=itemid and isactive = 1 order by expiry_date ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_bookings_cc` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_bookings_cc`(in ttype int,in branchid int,in fromdate date,in todate date)
BEGIN
#retrival of booking details 
#type = 1 retrive for customer master
#type = 2 for branch
if ttype = 1 then
if branchid=0 then
(select customer_care_source.id source_id,customer_care_source.name source_name,branch_master.name branch_name,  branch_master.id branch_id, booking_master.comment,booking_master.id booking_id, date_format(booking_master.booking_date, '%d/%m/%Y')booking_date,ifnull(booking_master.cfc,'-')cfc,branch_master.name branch_name,
date_format(booking_master.time, '%d/%m/%Y %H:%i')appointment_time,date_format(booking_master.time, '%Y-%m-%d %H:%i')ap_time,reference_master.name,reference_master.contact,
booking_master.booked_by,case booking_master.visit_status when 1 then 'Visited'  when 0 then 'Pending'  end  as visit_status
from booking_master inner join reference_master on booking_master.ref_id = reference_master.id 
inner join branch_master on branch_master.id = booking_master.branch_id 
inner join customer_care_source on customer_care_source.id = reference_master.customer_source
where (date(booking_master.time) between fromdate and todate)
)union
(select customer_care_source.id source_id,customer_care_source.name source_name,branch_master.name branch_name,branch_master.id branch_id,booking_master.comment,booking_master.id booking_id, date_format(booking_master.booking_date, '%d/%m/%Y')booking_date,booking_master.cfc,branch_master.name branch_name,
date_format(booking_master.time, '%d/%m/%Y %H:%i')appointment_time,date_format(booking_master.time, '%Y-%m-%d %H:%i')ap_time,customer_master.name,customer_master.number1 contact,
booking_master.booked_by,case booking_master.visit_status when 1 then 'Visited'  when 0 then 'Pending'  end  as visit_status
from booking_master inner join customer_master on booking_master.cfc = customer_master.cfc
inner join branch_master on branch_master.id = booking_master.branch_id  
inner join customer_care_source on customer_care_source.id = customer_master.customer_source
where (date(booking_master.time) between fromdate and todate)
);
else
(select customer_care_source.id source_id,customer_care_source.name source_name,  branch_master.id branch_id, booking_master.comment,booking_master.id booking_id, date_format(booking_master.booking_date, '%d/%m/%Y')booking_date,ifnull(booking_master.cfc,'-')cfc,branch_master.name branch_name,
date_format(booking_master.time, '%d/%m/%Y %H:%i')appointment_time,date_format(booking_master.time, '%Y-%m-%d %H:%i')ap_time,reference_master.name,reference_master.contact,
booking_master.booked_by,case booking_master.visit_status when 1 then 'Visited'  when 0 then 'Pending'  end  as visit_status
from booking_master inner join reference_master on booking_master.ref_id = reference_master.id 
inner join branch_master on branch_master.id = booking_master.branch_id 
inner join customer_care_source on customer_care_source.id = reference_master.customer_source
where (date(booking_master.time) between fromdate and todate)and branch_master.id = branchid
)union
(select customer_care_source.id source_id,customer_care_source.name source_name,branch_master.id branch_id,booking_master.comment,booking_master.id booking_id, date_format(booking_master.booking_date, '%d/%m/%Y')booking_date,booking_master.cfc,branch_master.name branch_name,
date_format(booking_master.time, '%d/%m/%Y %H:%i')appointment_time,date_format(booking_master.time, '%Y-%m-%d %H:%i')ap_time,customer_master.name,customer_master.number1 contact,
booking_master.booked_by,case booking_master.visit_status when 1 then 'Visited'  when 0 then 'Pending'  end  as visit_status
from booking_master inner join customer_master on booking_master.cfc = customer_master.cfc
inner join branch_master on branch_master.id = booking_master.branch_id  
inner join customer_care_source on customer_care_source.id = customer_master.customer_source
where (date(booking_master.time) between fromdate and todate)and branch_master.id = branchid
);
end if;
elseif ttype = 2 then
(select customer_care_source.id source_id,booking_master.branch_id, booking_master.comment,booking_master.id booking_id, date_format(booking_master.booking_date, '%d/%m/%Y')booking_date,booking_master.cfc,
date_format(booking_master.time, '%d/%m/%Y %H:%i')appointment_time,date_format(booking_master.time, '%Y-%m-%d %H:%i')ap_time,reference_master.name,reference_master.contact,
booking_master.booked_by,case booking_master.visit_status when 1 then 'Visited'  when 0 then 'Pending'  end  as visit_status
,'' as doctor,'-1' as doctor_id,'ref' as booking_type from booking_master inner join reference_master on booking_master.ref_id = reference_master.id 
inner join branch_master on branch_master.id = booking_master.branch_id 
inner join customer_care_source on customer_care_source.id = reference_master.customer_source
where (date(booking_master.time) between fromdate and todate)and branch_master.id = branchid
)union
(select '' as source_id,booking_master.branch_id,booking_master.comment,booking_master.id booking_id, date_format(booking_master.booking_date, '%d/%m/%Y')booking_date,booking_master.cfc,
date_format(booking_master.time, '%d/%m/%Y %H:%i')appointment_time,date_format(booking_master.time, '%Y-%m-%d %H:%i')ap_time,customer_master.name,customer_master.number1 contact,
booking_master.booked_by,case booking_master.visit_status when 1 then 'Visited'  when 0 then 'Pending'  end  as visit_status,
ifnull(doctor_master.name,'') doctor,ifnull(doctor_master.id,-2) doctor_id,'cfc' as booking_type
from booking_master inner join customer_master on booking_master.cfc = customer_master.cfc
join branch_master on branch_master.id = booking_master.branch_id  

left join doctor_master on doctor_master.id = booking_master.doctor_id
where (date(booking_master.time) between fromdate and todate)and branch_master.id = branchid
);
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_branch_basic` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_branch_basic`(in type int,in branchid int)
BEGIN
#type1: branchInfo.jsp ,branch details along cfc details
if type=1 then
select branch_master.id,branch_master.name,branch_master.address,branch_master.phone,case branch_master.type when 0 then 'Franchise' when 1 then 'Subsidiary' end type 
,branch_master.type branch_type,cfc_master.prefix cfc,cfc_master.counter counter,
branch_master.invoice_prefix,branch_master.invoice_counter,branch_master.receipt_prefix,branch_master.receipt_counter
 from branch_master
 inner join cfc_master on branch_master.id=cfc_master.branch_id  and branch_master.id =branchid;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_bsa_allocation` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_bsa_allocation`(in bid int)
BEGIN
select purchase_master.id,date_format(purchase_master.date, '%d/%m/%Y')purchase_date,purchase_master.reference_no,
branch_master.name ,case purchase_master.status when '0' then 'Pending' when '1' then 'Confirmed' end fstatus,purchase_master.status
from purchase_master inner join branch_master on
 purchase_master.branch_id = branch_master.id where purchase_master.branch_id=bid and purchase_master.status=0;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_bsa_stock_transfer_all` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_bsa_stock_transfer_all`(in fromdate date,in todate date,in branchid int)
BEGIN
select stock_transfer_master.id,date_format(stock_transfer_master.date, '%d/%m/%Y')purchase_date,stock_transfer_master.reference_no,
branch_master.name ,case stock_transfer_master.status when '0' then 'Pending' when '1' then 'Confirmed' end fstatus,stock_transfer_master.status
from stock_transfer_master inner join branch_master on
 stock_transfer_master.destination_branch_id = branch_master.id and stock_transfer_master.date between fromdate and todate
 where stock_transfer_master.branch_id=branchid;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_bsa_stock_transfer_pending` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_bsa_stock_transfer_pending`(in bid int)
BEGIN
select stock_transfer_master.id,date_format(stock_transfer_master.date, '%d/%m/%Y')purchase_date,stock_transfer_master.reference_no,
branch_master.name ,case stock_transfer_master.status when '0' then 'Pending' when '1' then 'Confirmed' end fstatus,stock_transfer_master.status
from stock_transfer_master inner join branch_master on
 stock_transfer_master.branch_id = branch_master.id where stock_transfer_master.destination_branch_id=bid and stock_transfer_master.status=0;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_clinic_admin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_clinic_admin`(in userid int,in branchid int)
BEGIN
declare usertype int;
select type into usertype from user_master where id =userid;
if usertype < 2 then
select name,id from branch_master where  isactive=1;
elseif usertype = 7 then
select name,id from branch_master where id in 
(select bid from doctor_branch where did in (select id from doctor_master where user_id=userid)) and isactive=1;
else 
select name,id from branch_master where id=branchid and  isactive=1;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_discount` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_discount`(in usertype int)
BEGIN
select discount from discount_master where user_type=usertype;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_doctor_all` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_doctor_all`()
BEGIN
select doctor_master.*,date_format(doctor_master.dob, '%d/%m/%Y')fdob
from doctor_master where doctor_master.isactive=1 order by name asc; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_doctor_branch` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_doctor_branch`(in bid int)
BEGIN
select distinct (doctor_master.id),doctor_master.name,doctor_master.contact,date_format(doctor_master.dob, '%d/%m/%Y')dob,doctor_master.sex sex,
doctor_master.dob edob
from doctor_master inner join doctor_branch where doctor_master.id = doctor_branch.did and doctor_master.isactive=1 and doctor_branch.bid = bid; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_doctor_branch_admin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_doctor_branch_admin`(in bid int)
BEGIN
if bid=-1 then
select doctor_branch.*,doctor_master.name dname from doctor_branch 
inner join doctor_master on doctor_master.id=doctor_branch.did
where doctor_master.isactive=1 order by doctor_branch.bid;
else
select doctor_branch.*,doctor_master.name dname from doctor_branch 
inner join doctor_master on doctor_master.id=doctor_branch.did
where doctor_master.isactive=1 and doctor_branch.bid=bid order by doctor_branch.bid;

end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_invoice_receipt` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_invoice_receipt`(in treatmentid int,in idd int)
BEGIN
select receipt_master.id,payment_mode,receipt_master.receipt_num,receipt_master.name,receipt_master.bill_date,date_format(receipt_master.bill_date,'%d-%m-%Y')fdate,
receipt_master.amount,receipt_master.description,receipt_master.created_by,branch_master.name branch_name from 
receipt_master inner join branch_master on branch_master.id = receipt_master.bid where receipt_master.tid=treatmentid
and receipt_master.id=idd;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_invoice_treatment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_invoice_treatment`(in treatmentid int)
BEGIN
select patient_info_master.sex gender, patient_info_master.name patient_name,treatment_master.cfc,invoice_num,date_format(invoice_date,'%d-%m-%Y %H:%i')invoice_date,branch_master.name branch_name,customer_master.name customer_name,treatment_master.name treatment_name,doctor_master.name doctor_name,
DATE_FORMAT(invoice_master.invoice_date, '%Y') - DATE_FORMAT(patient_info_master.dob, '%Y') - (DATE_FORMAT(invoice_master.invoice_date, '00-%m-%d') < DATE_FORMAT(patient_info_master.dob, '00-%m-%d')) AS age 
from invoice_master 
inner join treatment_master on invoice_master.tid = treatment_master.id 
inner join doctor_master on doctor_master.id = treatment_master.doctor_id
inner join customer_master on customer_master.cfc = treatment_master.cfc 
inner join patient_info_master on patient_info_master.id = treatment_master.patient_id
inner join branch_master on branch_master.id=invoice_master.bid where invoice_master.tid=treatmentid;

select procedure_master.name procedure_name,treatment_procedure.amount-((treatment_procedure.amount*treatment_procedure.discount)/100)amount from treatment_procedure 
inner join procedure_master on treatment_procedure.procedure_id = procedure_master.id where treatment_procedure.tid=treatmentid and treatment_procedure.is_free=0
union all
select lab_investigation_master.name procedure_name,treatment_lab_investigation.amount-((treatment_lab_investigation.amount*treatment_lab_investigation.discount)/100)amount from treatment_lab_investigation
inner join lab_investigation_master on treatment_lab_investigation.lab_investigation_id = lab_investigation_master.id where treatment_lab_investigation.tid=treatmentid and treatment_lab_investigation.is_free=0

union all
select 'Pharmacy' as procedure_name, sum((treatment_stock.amount*treatment_stock.quantity)-((treatment_stock.quantity*treatment_stock.amount*discount)/100))amount
from treatment_stock where tid=treatmentid and treatment_stock.is_free=0
group by treatment_stock.tid;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_item_batch_basic` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_item_batch_basic`(in type int,in branchid int)
BEGIN
#get batch,item deatils of  branch
#1 =item
#2=batch
#3stock
if type=1 then
select distinct(id),name from item_master where id in
(select distinct (batch_master.item_id)
from batch_master inner join branch_item on 
 branch_item.batch_id = batch_master.id 
 and branch_item.branch_id=branchid where (batch_master.expiry_date >=date(now()) or batch_master.expiry_date is null) and batch_master.isactive= 1
 order by batch_master.expiry_date
 )
 order by name;
elseif type=2 then
select distinct (batch_master.id),batch_master.item_id,batch_master.selling_price,batch_master.name,date_format(batch_master.expiry_date,'%d-%m-%Y')expiry_date,
batch_master.msu from batch_master inner join branch_item on 
 branch_item.batch_id = batch_master.id 
 and branch_item.branch_id=branchid where 
 (batch_master.expiry_date >=date(now()) or batch_master.expiry_date is null) and batch_master.isactive= 1
 order by batch_master.item_id, batch_master.expiry_date;
 
 elseif type=3 then
select temp.biid,batch_master.id batch_id,
 msu, case msu when 1 then 'NA' else bottle end bottle ,
 case msu when 1 then temp.counter else batch_master.msu-temp.stock end stock 
 from batch_master 
 inner join (
 select bottle,stock,branch_id,batch_id,branch_item.id biid,counter from branch_item ,
       JSON_TABLE
       (
         branch_item.qty_json,
         
         "$.*" COLUMNS(
         bottle FOR ORDINALITY,
           stock VARCHAR(100) PATH "$"
          
         ) 
       ) AS jt1   
 ) temp on temp.batch_id = batch_master.id
 and temp.branch_id=branchid where temp.stock<batch_master.msu or (temp.counter>0 and batch_master.msu=1)
 and (batch_master.expiry_date >=date(now()) or batch_master.expiry_date is null) and batch_master.isactive= 1 order by batch_master.id,temp.bottle; 

end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_menu_bar` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_menu_bar`(in userrole int)
BEGIN
select id,url,tag,home,menu_bar.rank from menu_bar where user_role=userrole order by menu_bar.rank;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_msa_allocation` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_msa_allocation`(in fromdate date,in todate date)
BEGIN
select purchase_master.id,date_format(purchase_master.date, '%d/%m/%Y')purchase_date,purchase_master.reference_no,
date_format(purchase_master.accepted_date, '%d/%m/%Y')fdate,branch_master.name ,case purchase_master.status when '0' then 'Pending' when '1' then 'Confirmed' end fstatus,purchase_master.status
from purchase_master inner join branch_master on
 purchase_master.branch_id = branch_master.id and purchase_master.date between fromdate and todate;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_patient_branch` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_patient_branch`(in cfcc varchar(45),in type int)
BEGIN
#in show patient branch
#get branches
if type=1 then
select  patient_branch.id,branch_master.name branch_name  from patient_branch
inner join branch_master on branch_master.id=patient_branch.bid
where cfc like cfcc order by branch_master.name;
elseif type=2 then
select branch_master.id,branch_master.name branch_name from branch_master where id
 not in(select bid from patient_branch where cfc like cfcc);
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_patient_info_basic` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_patient_info_basic`(in type int,in cfcc varchar(45),in branchid int)
BEGIN
#type=0 admin
#type=1 front office,branch admin
#2 room booking ,basic patient info name,cfc,modified cfc
if type=1 then
select id,cfc,name,sex,dob,date_format(dob, '%d-%m-%Y') dobf from patient_info_master where cfc=cfcc;

elseif type=2 then
select id,name,cfc,case sex when 'Male' then concat(cfc,'-M') when 'Female' then concat(cfc,'-F') end mcfc from patient_info_master 
where cfc in (select cfc from patient_branch where bid=branchid);

elseif type= 3 then
select customer_master.*,customer_care_source.name source_name from customer_master inner join customer_care_source 
on customer_care_source.id = customer_master.customer_source and customer_master.cfc like cfcc;
end if;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_patient_master_all` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_patient_master_all`(in bidd int,in userid int)
BEGIN

select * from customer_master where isactive=1 and cfc in (select cfc from patient_branch where bid = bidd) order by id desc;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_patient_master_search` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_patient_master_search`(in bidd int,in usertype int,in cfcc varchar(45),in namee varchar(100),in number11 varchar(100))
BEGIN
if usertype <2 then #director,admin
select * from customer_master where name like namee and cfc like cfcc and number1 like number11 and customer_master.isactive = 1;
elseif usertype=7 then#doctor
select distinct customer_master.* from doctor_master inner join doctor_branch on doctor_master.id = doctor_branch.did 
inner join patient_branch on patient_branch.bid = doctor_branch.bid  
inner join customer_master on customer_master.cfc = patient_branch.cfc where doctor_master.user_id=bidd
and customer_master.name like namee and customer_master.cfc like cfcc and customer_master.number1 like number11 and customer_master.isactive = 1;
elseif usertype <4 then#branch admin,front office
select * from customer_master where cfc in (select patient_branch.cfc from patient_branch where patient_branch.bid=bidd) and
customer_master.name like namee and customer_master.cfc like cfcc and customer_master.number1 like number11 and customer_master.isactive = 1;
end if;
#select * from customer_master where isactive=1 and cfc in (select cfc from patient_branch where bid = bidd) order by id desc;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_patient_room_booking` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_patient_room_booking`(in cfcc varchar(45))
BEGIN
select id,name,sex from patient_info_master where cfc like cfcc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_report1` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_report1`(in type int,in fromdate date,in todate date,in branch int)
BEGIN
#type1 cash report
#type2optd report
#type3 procedure report state wise
#tye4 procedure report procedure wise
#type5 stock report
#type6 inter stock report
#type 7 customer source reference
if type=1 then
		if branch=-2 then#all
		
        #select ifnull(sum(receipt_master.amount),0) total,ifnull(count(receipt_master.id),0)count,branch_master.name branch_name from branch_master left join
		#receipt_master on branch_master.id = receipt_master.bid   and
		#receipt_master.bill_date between fromdate and todate where branch_master.isactive=1
		#group by branch_master.id order by branch_master.name ;
		select ifnull(sum(receipt_master.amount),0) total,ifnull(count(receipt_master.id),0)count,branch_master.name branch_name,
		ifnull(temp.Cash,0)cash,ifnull(temp.Card,0)card,ifnull(temp.ChequeDD,0)cheque,ifnull(temp.Online,0) 'online'
		from branch_master left join
		receipt_master on branch_master.id = receipt_master.bid   
		left join (
		SELECT 
		bid, 
		sum( if( receipt_master.payment_mode like 'Cash', receipt_master.amount, 0 ) ) AS Cash,  
		sum( if( receipt_master.payment_mode like 'Card', receipt_master.amount, 0 ) ) AS Card,  
		sum( if( receipt_master.payment_mode like 'Cheque/DD', receipt_master.amount, 0 ) ) AS ChequeDD,  
		sum( if( receipt_master.payment_mode like 'Online', receipt_master.amount, 0 ) ) AS 'Online'
		FROM receipt_master where receipt_master.bill_date between fromdate and todate GROUP BY bid
		)temp on temp.bid = branch_master.id
		where branch_master.isactive=1 and receipt_master.bill_date between fromdate and todate
		group by branch_master.id order by branch_master.name ;

        
        select receipt_master.receipt_num,receipt_master.name,date_format(receipt_master.bill_date,'%d/%m/%Y') fdate,
		receipt_master.amount,branch_master.name branch_name from 
		receipt_master inner join branch_master on branch_master.id = receipt_master.bid where
		receipt_master.bill_date between fromdate and todate order by receipt_master.bill_date;
		
        
        elseif branch=-1 then#subsidiary	
		select ifnull(sum(receipt_master.amount),0) total,ifnull(count(receipt_master.id),0)count,branch_master.name branch_name,
		ifnull(temp.Cash,0)cash,ifnull(temp.Card,0)card,ifnull(temp.ChequeDD,0)cheque,ifnull(temp.Online,0) 'online'
		from branch_master left join
		receipt_master on branch_master.id = receipt_master.bid   
		left join (
		SELECT 
		bid, 
		sum( if( receipt_master.payment_mode like 'Cash', receipt_master.amount, 0 ) ) AS Cash,  
		sum( if( receipt_master.payment_mode like 'Card', receipt_master.amount, 0 ) ) AS Card,  
		sum( if( receipt_master.payment_mode like 'Cheque/DD', receipt_master.amount, 0 ) ) AS ChequeDD,  
		sum( if( receipt_master.payment_mode like 'Online', receipt_master.amount, 0 ) ) AS 'Online'
		FROM receipt_master where receipt_master.bill_date between fromdate and todate GROUP BY bid 
		)temp on temp.bid = branch_master.id
		where
        receipt_master.bill_date between fromdate and todate
        and  
		branch_master.type=1 and branch_master.isactive=1
		group by branch_master.id order by branch_master.name;
        
		select receipt_master.receipt_num,receipt_master.name,date_format(receipt_master.bill_date,'%d/%m/%Y') fdate,
		receipt_master.amount,branch_master.name branch_name from 
		receipt_master inner join branch_master on branch_master.id = receipt_master.bid where
		branch_master.type=1 and
        receipt_master.bill_date between fromdate and todate        
        order by receipt_master.bill_date;		

        elseif branch=0 then#franchise
				select ifnull(sum(receipt_master.amount),0) total,ifnull(count(receipt_master.id),0)count,branch_master.name branch_name,
		ifnull(temp.Cash,0)cash,ifnull(temp.Card,0)card,ifnull(temp.ChequeDD,0)cheque,ifnull(temp.Online,0) 'online'
		from branch_master left join
		receipt_master on branch_master.id = receipt_master.bid   
		left join (
		SELECT 
		bid, 
		sum( if( receipt_master.payment_mode like 'Cash', receipt_master.amount, 0 ) ) AS Cash,  
		sum( if( receipt_master.payment_mode like 'Card', receipt_master.amount, 0 ) ) AS Card,  
		sum( if( receipt_master.payment_mode like 'Cheque/DD', receipt_master.amount, 0 ) ) AS ChequeDD,  
		sum( if( receipt_master.payment_mode like 'Online', receipt_master.amount, 0 ) ) AS 'Online'
		FROM receipt_master where receipt_master.bill_date between fromdate and todate GROUP BY bid
		)temp on temp.bid = branch_master.id
		where   receipt_master.bill_date between fromdate and todate and branch_master.isactive=1 and 
		branch_master.type=0 
		group by branch_master.id order by branch_master.name;
        
		select receipt_master.receipt_num,receipt_master.name,date_format(receipt_master.bill_date,'%d/%m/%Y') fdate,
		receipt_master.amount,branch_master.name branch_name from 
		receipt_master inner join branch_master on branch_master.id = receipt_master.bid where
		branch_master.type=0 and
        receipt_master.bill_date between fromdate and todate        
        order by receipt_master.bill_date;
	
		else#specific branches
		select ifnull(sum(receipt_master.amount),0) total,ifnull(count(receipt_master.id),0)count,branch_master.name branch_name,
		ifnull(temp.Cash,0)cash,ifnull(temp.Card,0)card,ifnull(temp.ChequeDD,0)cheque,ifnull(temp.Online,0) 'online'
		from branch_master left join
		receipt_master on branch_master.id = receipt_master.bid   
		left join (
		SELECT 
		bid, 
		sum( if( receipt_master.payment_mode like 'Cash', receipt_master.amount, 0 ) ) AS Cash,  
		sum( if( receipt_master.payment_mode like 'Card', receipt_master.amount, 0 ) ) AS Card,  
		sum( if( receipt_master.payment_mode like 'Cheque/DD', receipt_master.amount, 0 ) ) AS ChequeDD,  
		sum( if( receipt_master.payment_mode like 'Online', receipt_master.amount, 0 ) ) AS 'Online'
		FROM receipt_master where receipt_master.bill_date between fromdate and todate GROUP BY bid
		)temp on temp.bid = branch_master.id
		where receipt_master.bill_date between fromdate and todate and branch_master.isactive=1 and 
		branch_master.id=branch 
		group by branch_master.id order by branch_master.name;
        
		select receipt_master.tid treatment_id,receipt_master.id receipt_id,receipt_master.receipt_num,receipt_master.name,date_format(receipt_master.bill_date,'%d/%m/%Y') fdate,
		receipt_master.amount,branch_master.name branch_name from 
		receipt_master inner join branch_master on branch_master.id = receipt_master.bid where
		branch_master.id=branch and
        receipt_master.bill_date between fromdate and todate        
        order by receipt_master.bill_date;
		end if;
        
 elseif type=2 then
		if branch=-2 then#all
		select branch_master.name,ifnull(temp.count,0)new,ifnull(temp2.count,0)old,ifnull(temp3.count,0)noshow from branch_master left join 
		(select count( distinct bm.cfc)count,bm.branch_id from booking_master bm
		join (select cfc from booking_master group by cfc having count(cfc) = 1) bm1
		on bm.cfc=bm1.cfc where date(bm.time)  between fromdate and todate group by bm.branch_id 
		)temp on branch_master.id = temp.branch_id
		left join 
		(select count(distinct bm.cfc)count,bm.branch_id from booking_master bm
		join (select cfc from booking_master group by cfc having count(cfc) > 1) bm1
		on bm.cfc=bm1.cfc where date(bm.time)  between fromdate and todate group by bm.branch_id)temp2 on temp2.branch_id=branch_master.id
		left join 
		(select branch_id, count(distinct ref_id)count from booking_master where booking_master.visit_status=0 and booking_master.ref_id is not null
		and  date(booking_master.time)  between fromdate and todate
		group by branch_id
		)temp3 on temp3.branch_id=branch_master.id where branch_master.isactive=1;

		select booking_master.cfc,branch_master.name branch_name, case when booking_master.cfc is null then reference_master.name else customer_master.name end name,
		case when booking_master.cfc is null then reference_master.contact else customer_master.number1 end contact,
		date_format(time,'%d/%m/%Y %H:%i') time
		from booking_master 
		inner join branch_master on branch_master.id=booking_master.branch_id 
		left join reference_master
		on reference_master.id = booking_master.ref_id 
		left join customer_master on customer_master.cfc = booking_master.cfc
		where booking_master.visit_status=0 and date(time) between fromdate and todate;


        elseif branch=-1 then#subsidiary	
        select branch_master.name,ifnull(temp.count,0)new,ifnull(temp2.count,0)old,ifnull(temp3.count,0)noshow from branch_master left join 
		(select count( distinct bm.cfc)count,bm.branch_id from booking_master bm
		join (select cfc from booking_master group by cfc having count(cfc) = 1) bm1
		on bm.cfc=bm1.cfc where date(bm.time)  between fromdate and todate group by bm.branch_id 
		)temp on branch_master.id = temp.branch_id
		left join 
		(select count(distinct bm.cfc)count,bm.branch_id from booking_master bm
		join (select cfc from booking_master group by cfc having count(cfc) > 1) bm1
		on bm.cfc=bm1.cfc where date(bm.time)  between fromdate and todate group by bm.branch_id)temp2 on temp2.branch_id=branch_master.id
		left join 
		(select branch_id, count(distinct ref_id)count from booking_master where booking_master.visit_status=0 and booking_master.ref_id is not null
		and  date(booking_master.time)  between fromdate and todate
		group by branch_id
		)temp3 on temp3.branch_id=branch_master.id where branch_master.isactive=1 and branch_master.type=1;

		select booking_master.cfc,branch_master.name branch_name, case when booking_master.cfc is null then reference_master.name else customer_master.name end name,
		case when booking_master.cfc is null then reference_master.contact else customer_master.number1 end contact,
		date_format(time,'%d/%m/%Y %H:%i') time
		from booking_master 
		inner join branch_master on branch_master.id=booking_master.branch_id and branch_master.type=1
		left join reference_master
		on reference_master.id = booking_master.ref_id 
		left join customer_master on customer_master.cfc = booking_master.cfc
		where booking_master.visit_status=0 and date(time) between fromdate and todate;

        elseif branch=0 then#franchise
        select branch_master.name,ifnull(temp.count,0)new,ifnull(temp2.count,0)old,ifnull(temp3.count,0)noshow from branch_master left join 
		(select count( distinct bm.cfc)count,bm.branch_id from booking_master bm
		join (select cfc from booking_master group by cfc having count(cfc) = 1) bm1
		on bm.cfc=bm1.cfc where date(bm.time)  between fromdate and todate group by bm.branch_id 
		)temp on branch_master.id = temp.branch_id
		left join 
		(select count(distinct bm.cfc)count,bm.branch_id from booking_master bm
		join (select cfc from booking_master group by cfc having count(cfc) > 1) bm1
		on bm.cfc=bm1.cfc where date(bm.time)  between fromdate and todate group by bm.branch_id)temp2 on temp2.branch_id=branch_master.id
		left join 
		(select branch_id, count(distinct ref_id)count from booking_master where booking_master.visit_status=0 and booking_master.ref_id is not null
		and  date(booking_master.time)  between fromdate and todate
		group by branch_id
		)temp3 on temp3.branch_id=branch_master.id where branch_master.isactive=1 and branch_master.type=0;

		select booking_master.cfc,branch_master.name branch_name, case when booking_master.cfc is null then reference_master.name else customer_master.name end name,
		case when booking_master.cfc is null then reference_master.contact else customer_master.number1 end contact,
		date_format(time,'%d/%m/%Y %H:%i') time
		from booking_master 
		inner join branch_master on branch_master.id=booking_master.branch_id and branch_master.type=0
		left join reference_master
		on reference_master.id = booking_master.ref_id 
		left join customer_master on customer_master.cfc = booking_master.cfc
		where booking_master.visit_status=0 and date(time) between fromdate and todate;
	
		else#specific branches
        select branch_master.name,ifnull(temp.count,0)new,ifnull(temp2.count,0)old,ifnull(temp3.count,0)noshow from branch_master left join 
		(select count( distinct bm.cfc)count,bm.branch_id from booking_master bm
		join (select cfc from booking_master group by cfc having count(cfc) = 1) bm1
		on bm.cfc=bm1.cfc where date(bm.time)  between fromdate and todate group by bm.branch_id 
		)temp on branch_master.id = temp.branch_id
		left join 
		(select count(distinct bm.cfc)count,bm.branch_id from booking_master bm
		join (select cfc from booking_master group by cfc having count(cfc) > 1) bm1
		on bm.cfc=bm1.cfc where date(bm.time)  between fromdate and todate group by bm.branch_id)temp2 on temp2.branch_id=branch_master.id
		left join 
		(select branch_id, count(distinct ref_id)count from booking_master where booking_master.visit_status=0 and booking_master.ref_id is not null
		and  date(booking_master.time)  between fromdate and todate
		group by branch_id
		)temp3 on temp3.branch_id=branch_master.id where branch_master.isactive=1 and branch_master.id=branch;

		select booking_master.cfc,branch_master.name branch_name, case when booking_master.cfc is null then reference_master.name else customer_master.name end name,
		case when booking_master.cfc is null then reference_master.contact else customer_master.number1 end contact,
		date_format(time,'%d/%m/%Y %H:%i') time
		from booking_master 
		inner join branch_master on branch_master.id=booking_master.branch_id and branch_master.id=branch
		left join reference_master
		on reference_master.id = booking_master.ref_id 
		left join customer_master on customer_master.cfc = booking_master.cfc
		where booking_master.visit_status=0 and date(time) between fromdate and todate;

		end if;
elseif type=3 then
		select procedure_master.name procedure_name, count(*)total,ifnull(temp.count,0)free from treatment_procedure
		inner join procedure_master on procedure_master.id=treatment_procedure.procedure_id and procedure_master.isactive=1
		left join (
		select count(*)count,procedure_id from treatment_procedure where is_free =1 and treatment_procedure.branch_id=branch and treatment_procedure.start_date between fromdate and todate group by procedure_id
		)temp on temp.procedure_id = treatment_procedure.procedure_id
		where treatment_procedure.branch_id=branch and treatment_procedure.start_date between fromdate and todate
		group by treatment_procedure.procedure_id order by procedure_master.name;

elseif type=4 then
		select branch_master.name,ifnull(temp.count,0) total,ifnull(temp2.count,0) free from branch_master left join (
		select count(*)count,branch_id from treatment_procedure where procedure_id = branch and treatment_procedure.start_date between fromdate and todate group by branch_id 
		)temp on temp.branch_id=branch_master.id left join (
		select count(*)count,branch_id from treatment_procedure where is_free =1 and procedure_id=branch and treatment_procedure.start_date between fromdate and todate group by branch_id 
		)temp2 on temp2.branch_id=branch_master.id where branch_master.isactive=1 group by branch_master.id order by branch_master.name; 
        
elseif type=5 then
        if branch=-2 then#all
        select branch_master.name,ifnull(temp.count,0) total,ifnull(temp2.count,0) pending from branch_master left join (
        select count(*)count,branch_id from purchase_master where purchase_master.date between fromdate and todate group by branch_id
        )temp on temp.branch_id = branch_master.id left join(
        select count(*) count,branch_id from purchase_master where status=0 and purchase_master.date between fromdate and todate group by branch_id
        )temp2 on temp2.branch_id=branch_master.id where branch_master.isactive=1 order by branch_master.name;
        
        
        select branch_master.name branch_name,reference_no,case purchase_master.status when 0 then 'Pending' when 1 then 'Deliverd' end status,
        date_format(purchase_master.date,'%d/%m/%Y')date from branch_master
        inner join purchase_master on branch_master.id=purchase_master.branch_id
        where branch_master.isactive=1 and purchase_master.date between fromdate and todate
        order by branch_master.name ,purchase_master.date;		
        
        elseif branch=-1 then#subsidiary	
        select branch_master.name,ifnull(temp.count,0) total,ifnull(temp2.count,0) pending from branch_master left join (
        select count(*)count,branch_id from purchase_master where purchase_master.date between fromdate and todate group by branch_id
        )temp on temp.branch_id = branch_master.id left join(
        select count(*) count,branch_id from purchase_master where status=0 and purchase_master.date between fromdate and todate group by branch_id
        )temp2 on temp2.branch_id=branch_master.id where branch_master.isactive=1 and branch_master.type=1 order by branch_master.name;
        
        
        select branch_master.name branch_name,reference_no,case purchase_master.status when 0 then 'Pending' when 1 then 'Deliverd' end status,
        date_format(purchase_master.date,'%d/%m/%Y')date from branch_master
        inner join purchase_master on branch_master.id=purchase_master.branch_id
        where branch_master.isactive=1 and branch_master.type=1 and purchase_master.date between fromdate and todate
        order by branch_master.name ,purchase_master.date        ;
        
        elseif branch=0 then#franchise
        select branch_master.name,ifnull(temp.count,0) total,ifnull(temp2.count,0) pending from branch_master left join (
        select count(*)count,branch_id from purchase_master where purchase_master.date between fromdate and todate group by branch_id
        )temp on temp.branch_id = branch_master.id left join(
        select count(*) count,branch_id from purchase_master where status=0 and purchase_master.date between fromdate and todate group by branch_id
        )temp2 on temp2.branch_id=branch_master.id where branch_master.isactive=1 and branch_master.type=0 order by branch_master.name;
        
		select branch_master.name branch_name,reference_no,case purchase_master.status when 0 then 'Pending' when 1 then 'Deliverd' end status,
        date_format(purchase_master.date,'%d/%m/%Y')date from branch_master
        inner join purchase_master on branch_master.id=purchase_master.branch_id
        where branch_master.isactive=1 and  branch_master.type=0 and purchase_master.date between fromdate and todate
        order by branch_master.name ,purchase_master.date;
		
        else
        select branch_master.name,ifnull(temp.count,0) total,ifnull(temp2.count,0) pending from branch_master left join (
        select count(*)count,branch_id from purchase_master where purchase_master.date between fromdate and todate group by branch_id
        )temp on temp.branch_id = branch_master.id left join(
        select count(*) count,branch_id from purchase_master where status=0 and purchase_master.date between fromdate and todate group by branch_id
        )temp2 on temp2.branch_id=branch_master.id where branch_master.isactive=1 and branch_master.id=branch order by branch_master.name;
        
        select branch_master.name branch_name,reference_no,case purchase_master.status when 0 then 'Pending' when 1 then 'Deliverd' end status,
        date_format(purchase_master.date,'%d/%m/%Y')date from branch_master
        inner join purchase_master on branch_master.id=purchase_master.branch_id
        where branch_master.isactive=1 and branch_master.id=branch and purchase_master.date between fromdate and todate
        order by branch_master.name ,purchase_master.date;
		
        end if;
elseif type=6 then
		select stock_transfer_master.reference_no,origin.name origin,destination.name destination,
		date_format(stock_transfer_master.date,'%d/%m/%Y')date,case stock_transfer_master.status when 0 then 'Pending' when 1 then 'Deliverd' end status
		from stock_transfer_master inner join branch_master origin on origin.id=stock_transfer_master.branch_id
		inner join branch_master destination on destination.id=stock_transfer_master.destination_branch_id where
        stock_transfer_master.date between fromdate and todate;
elseif type = 7 then
		if branch=-2 then
			select count(*)count,ifnull(customer_care_source.name,'NA')source from booking_master bm
			join (select cfc from booking_master group by cfc having count(cfc) = 1) bm1
			on bm.cfc=bm1.cfc 
			inner join customer_master on customer_master.cfc = bm.cfc
            inner join branch_master on branch_master.id = bm.branch_id
			left join customer_care_source on customer_care_source.id = customer_master.customer_source
			where date(bm.time)  between fromdate and todate and branch_master.isactive=1
			group by customer_master.customer_source;
		elseif branch=-1 then
			select count(*)count,ifnull(customer_care_source.name,'NA')source from booking_master bm
			join (select cfc from booking_master group by cfc having count(cfc) = 1) bm1
			on bm.cfc=bm1.cfc 
			inner join customer_master on customer_master.cfc = bm.cfc
            inner join branch_master on branch_master.id = bm.branch_id
			left join customer_care_source on customer_care_source.id = customer_master.customer_source
			where date(bm.time)  between fromdate and todate and branch_master.isactive=1 and branch_master.type=-1
			group by customer_master.customer_source;
		elseif branch=0 then
			select count(*)count,ifnull(customer_care_source.name,'NA')source from booking_master bm
			join (select cfc from booking_master group by cfc having count(cfc) = 1) bm1
			on bm.cfc=bm1.cfc 
			inner join customer_master on customer_master.cfc = bm.cfc
            inner join branch_master on branch_master.id = bm.branch_id
			left join customer_care_source on customer_care_source.id = customer_master.customer_source
			where date(bm.time)  between fromdate and todate and branch_master.isactive=1 and branch_master.type=0
			group by customer_master.customer_source;
		else 
			select count(*)count,ifnull(customer_care_source.name,'NA')source from booking_master bm
			join (select cfc from booking_master group by cfc having count(cfc) = 1) bm1
			on bm.cfc=bm1.cfc 
			inner join customer_master on customer_master.cfc = bm.cfc
            inner join branch_master on branch_master.id = bm.branch_id
			left join customer_care_source on customer_care_source.id = customer_master.customer_source
			where date(bm.time)  between fromdate and todate and branch_master.isactive=1 and branch_master.id=branch
			group by customer_master.customer_source;
		end if;


end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_room_booking` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_room_booking`(in branchid int,in fromdate date,in todate date)
BEGIN
select room_transaction.id, room_master.name rname,patient_info_master.name pname ,case patient_info_master.sex when 'Male' then concat(cfc,'-M') when 'Female' then concat(cfc,'-F') end mcfc,
date_format(room_transaction.book_start, '%d/%m/%Y %H:%i')mstart,date_format(room_transaction.book_end, '%d/%m/%Y %H:%i')mend,
date_format(room_transaction.book_start, '%Y-%m-%d %H:%i')book_start,date_format(room_transaction.book_end, '%Y-%m-%d %H:%i')book_end,
#room_transaction.book_start,room_transaction.book_end,
concat('Dr ',doctor_master.name) dname ,room_transaction.comment,
 room_transaction.room_id,room_transaction.doctor_id,room_transaction.patient_id,
 room_transaction.booked_by
from room_master inner join
room_transaction on room_transaction.room_id = room_master.id join patient_info_master on
patient_info_master.id = room_transaction.patient_id join doctor_master on doctor_master.id = room_transaction.doctor_id
where room_master.branch_id=branchid and date(room_transaction.book_start) between fromdate and todate ;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_room_detail` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_room_detail`(in branchid int)
BEGIN
if branchid=-1 then
select room_master.branch_id, room_master.id,room_master.name,room_master.type rtype,case room_master.type when 0 then 'Operation Theatre' when 1 
then 'Sonography' end type
from room_master where isactive=1 order by rtype ,name asc;
else
select room_master.branch_id,room_master.id,room_master.name,room_master.type rtype,case room_master.type when 0 then 'Operation Theatre' when 1 
then 'Sonography' end type
from room_master where room_master.branch_id = branchid and isactive=1 order by rtype ,name asc;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_treatment_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_treatment_data`(in type int,in branchid int,in treatmentid int)
BEGIN
#type 1 treatment procedures
if type=1 then
select branch_master.name branch_name,treatment_procedure.branch_id branch_id,treatment_procedure.id id, patient_info_master.name patient_name,patient_id,procedure_master.name procedure_name,created_by,procedure_id,start_date,
case treatment_procedure.is_free when 0 then '-' when 1 then 'Yes' end type,
amount-((amount*discount)/100)net_amount,
date_format(start_date,'%d-%m-%Y')fstart_date,amount,discount,comment ,is_free from 
treatment_procedure inner join patient_info_master on patient_info_master.id = treatment_procedure.patient_id
inner join procedure_master on procedure_master.id = treatment_procedure.procedure_id 
inner join branch_master on branch_master.id=treatment_procedure.branch_id
where treatment_procedure.tid=treatmentid
order by treatment_procedure.start_date desc;

elseif type=2 then
select  treatment_stock.branch_id branch_id,treatment_stock.id ,item_master.name item_name,item_master.id item_id, treatment_stock.tid ,treatment_stock.patient_id,treatment_stock.batch_id,
(treatment_stock.amount*treatment_stock.quantity)-((treatment_stock.quantity*treatment_stock.amount*discount)/100)net_amount,
date_format(start_date,'%d-%m-%Y')fstart_date,start_date,patient_info_master.name patient_name,batch_master.name batch_name, branch_master.name branch_name,
case treatment_stock.bottle when '-1' then 'NA' else treatment_stock.bottle+1 end bottle,treatment_stock.quantity,
treatment_stock.amount,treatment_stock.discount,treatment_stock.is_free,case treatment_stock.is_free when 0 then '-' when 1 then 'Yes' end type,
treatment_stock.comment,treatment_stock.created_by from treatment_stock inner join patient_info_master on 
treatment_stock.patient_id=patient_info_master.id inner join batch_master on batch_master.id = treatment_stock.batch_id
inner join branch_master on branch_master.id = treatment_stock.branch_id inner join item_master on item_master.id = batch_master.item_id
where treatment_stock.tid=treatmentid order by treatment_stock.start_date desc ;
elseif type =3 then#lab investigation report

select branch_master.name branch_name,treatment_lab_investigation.branch_id branch_id,treatment_lab_investigation.id id, 
patient_info_master.name patient_name,patient_id,lab_investigation_id,lab_investigation_master.name lih_name,created_by,lab_investigation_id,start_date,
case treatment_lab_investigation.is_free when 0 then '-' when 1 then 'Yes' end type,
amount-((amount*discount)/100)net_amount,
date_format(start_date,'%d-%m-%Y')fstart_date,amount,discount,comment ,is_free from 
treatment_lab_investigation inner join patient_info_master on patient_info_master.id = treatment_lab_investigation.patient_id
inner join lab_investigation_master on lab_investigation_master.id = treatment_lab_investigation.lab_investigation_id 
inner join branch_master on branch_master.id=treatment_lab_investigation.branch_id
where treatment_lab_investigation.tid=treatmentid
order by treatment_lab_investigation.start_date desc;

end if;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_treatment_doctor` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_treatment_doctor`(in cfcc varchar(45))
BEGIN
select distinct (doctor_master.id),doctor_master.name
from patient_branch inner join
branch_master on branch_master.id = patient_branch.bid
inner join doctor_branch on
doctor_branch.bid = patient_branch.bid 
inner join doctor_master on doctor_master.id=doctor_branch.did
where doctor_master.status=1 and patient_branch.cfc like cfcc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_treatment_files` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_treatment_files`(in cfcc varchar(45))
BEGIN
#select id, name,cfc,start_date,payment_date,comment,date_format(start_date,'%d-%m-%Y')sdate,
#date_format(payment_date,'%d-%m-%Y')pdate 
#from treatment_master where cfc like cfcc and is_active = 1 order by start_date desc;

select treatment_master.id,treatment_master.patient_id,patient_info_master.name pname , treatment_master.name,treatment_master.cfc,start_date,payment_date,comment,date_format(start_date,'%d-%m-%Y')sdate,doctor_master.name doctor_name,doctor_master.id doctor_id,
date_format(payment_date,'%d-%m-%Y')pdate ,ifnull(tstock.samount,0)+ifnull(tprocedure.pamount,0)+ifnull(tlab.lamount,0)total_amount,
ifnull(rcpt.ramount,0)ramount,ifnull(tstock.samount,0)+ifnull(tprocedure.pamount,0)+ifnull(tlab.lamount,0)-ifnull(rcpt.ramount,0) balance_amount
from treatment_master 
left join
(
select treatment_stock.tid, sum((treatment_stock.amount*treatment_stock.quantity)-((treatment_stock.quantity*treatment_stock.amount*discount)/100))samount from
treatment_stock where treatment_stock.is_free=0 group by treatment_stock.tid
)tstock on treatment_master.id= tstock.tid
left join
(
select treatment_procedure.tid, sum(treatment_procedure.amount-((treatment_procedure.amount*treatment_procedure.discount)/100))pamount from
treatment_procedure where treatment_procedure.is_free=0 group by treatment_procedure.tid
)tprocedure on tprocedure.tid=treatment_master.id
left join
(
select treatment_lab_investigation.tid, sum(treatment_lab_investigation.amount-((treatment_lab_investigation.amount*treatment_lab_investigation.discount)/100))lamount from
treatment_lab_investigation where treatment_lab_investigation.is_free=0 group by treatment_lab_investigation.tid
)tlab on tlab.tid=treatment_master.id
left join
(
select sum(receipt_master.amount)ramount,receipt_master.tid from receipt_master group by receipt_master.tid
)rcpt on rcpt.tid=treatment_master.id
inner join doctor_master on doctor_master.id=treatment_master.doctor_id
inner join patient_info_master on patient_info_master.id=treatment_master.patient_id
where treatment_master.cfc like cfcc order by start_date desc;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_treatment_receipt` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_treatment_receipt`(in treatmentid int)
BEGIN
select receipt_master.id,payment_mode,receipt_master.receipt_num,receipt_master.name,receipt_master.bill_date,date_format(receipt_master.bill_date,'%d-%m-%Y')fdate,
receipt_master.amount,receipt_master.description,receipt_master.created_by,branch_master.name branch_name from 
receipt_master inner join branch_master on branch_master.id = receipt_master.bid where receipt_master.tid=treatmentid
order by receipt_master.bill_date desc;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `lab_investigation_master` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `lab_investigation_master`(in type int,in namee varchar(100),in descriptionn varchar(200),in costt int,in pid int)
BEGIN
if type=1 then
insert into lab_investigation_master values (null,namee,descriptionn,costt,1);
elseif type = 2 then
update lab_investigation_master set name=namee,description=descriptionn,cost=costt where id=pid;
elseif type = 3 then
update lab_investigation_master set isactive = 0 where id=pid;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `new_booking_cc` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_booking_cc`(in cname varchar(100),in contact varchar(100),in clinic int,in time datetime,in bookedby varchar(100),in coment varchar(200),in csource int,
out flag int
)
BEGIN
declare refid int;
set flag=1;
call check_duplicate_primary_contact(contact,flag);
if flag = 0 then
insert into reference_master values(null,cname,contact,csource,0);
set refid=last_insert_id();

insert into booking_master values(null,null,refid,clinic,time,null,coment,concat(bookedby,' @ ',date_format(now(),'%d-%m-%Y %H:%i')),now(),0);
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `new_booking_cfc` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_booking_cfc`(in cfcc varchar(45),in branchid int,in atime datetime,in did int,in commentt varchar(100),
in bookedby varchar(100),in visitstatus int)
BEGIN
#booking made through cfc
declare c int;
select count(*) into c from patient_branch where cfc=cfcc and bid=branchid;
if c=0 then
call assign_patient_branch(branchid,cfcc);
end if;

insert into booking_master values(null,cfcc,null,branchid,atime,did,commentt,concat(bookedby,' @ ',date_format(now(),'%d-%m-%Y %H:%i')),now(),visitstatus);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `new_branch` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_branch`(in name varchar(100),in address varchar(200),in phone varchar(45),
in cfc varchar(45),in counter int,in type int,in invoiceprefix varchar(45),in invoicecounter int
,in receiptprefix varchar(45),in receiptcounter int)
BEGIN
declare bid int;
insert into branch_master values(null,name,address,phone,type,invoiceprefix,invoicecounter,receiptprefix,receiptcounter,1);
set bid=last_insert_id();
insert into cfc_master values(null,bid,cfc,counter);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `new_doctor` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_doctor`(in userid int,in namee varchar(200),in dob date,in sex varchar(15),in contact varchar(45),in bid int,in username varchar(100))
BEGIN
#userid 0 from new doctor
declare did int;

if userid=0 then
insert into user_master values(null,username,7,bid,username,1);
set userid=LAST_INSERT_ID();
end if;
insert into doctor_master values(null,namee,dob,sex,contact,1,userid,1);
  SET did = LAST_INSERT_ID();
  if bid>0 then
call assign_doctor_branch(did,bid);
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `new_invoice` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_invoice`(in treatmentid int,in branchid int)
BEGIN

declare invoice varchar(45);
declare customername varchar(100);
declare counter,newcounter int;
declare balanceamount double;
select 
ifnull(tstock.samount,0)+ifnull(tprocedure.pamount,0)+ifnull(tlab.lamount,0)-ifnull(rcpt.ramount,0) balance_amount 
into balanceamount
from treatment_master 
left join
(
select treatment_stock.tid, sum((treatment_stock.amount*treatment_stock.quantity)-((treatment_stock.quantity*treatment_stock.amount*discount)/100))samount from
treatment_stock where treatment_stock.is_free=0 and treatment_stock.tid=treatmentid  group by treatment_stock.tid
)tstock on treatment_master.id= tstock.tid
left join
(
select treatment_procedure.tid, sum(treatment_procedure.amount-((treatment_procedure.amount*treatment_procedure.discount)/100))pamount from
treatment_procedure where treatment_procedure.is_free=0 and treatment_procedure.tid=treatmentid group by treatment_procedure.tid
)tprocedure on tprocedure.tid=treatment_master.id
left join
(
select treatment_lab_investigation.tid, sum(treatment_lab_investigation.amount-((treatment_lab_investigation.amount*treatment_lab_investigation.discount)/100))lamount from
treatment_lab_investigation where treatment_lab_investigation.is_free=0 group by treatment_lab_investigation.tid
)tlab on tlab.tid=treatment_master.id
left join
(
select sum(receipt_master.amount)ramount,receipt_master.tid  from receipt_master where  receipt_master.tid=treatmentid group by receipt_master.tid
)rcpt on rcpt.tid=treatment_master.id
where treatment_master.id =treatmentid;

if round(balanceamount,2)=0 then
select concat(invoice_prefix,concat(case when invoice_counter < 10 then '000' when  invoice_counter >=10 and invoice_counter < 100 then
 '00' when  invoice_counter >=100 and invoice_counter < 1000  then '0' else '' end ,invoice_counter)),invoice_counter into invoice,counter  from branch_master where id=branchid;

insert into invoice_master values(null,branchid,treatmentid,invoice,now()); 

update branch_master set invoice_counter = invoice_counter + 1 where id=branchid;   

end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `new_item` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_item`(in itemname varchar(200),in itemtype int,in batchname varchar(100),in cp double,in sp double,
in expirydate date,in msu int,in commentt varchar(50))
BEGIN
declare itemid int;
insert into item_master values(null,itemname,itemtype,1);

set itemid=last_insert_id();

call new_item_batch(itemid,batchname,cp,sp,expirydate,msu,commentt);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `new_item_batch` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_item_batch`(in itemid int,in batchname varchar(100),in cp double,in sp double,
in expirydate date,in msuu int,in commentt varchar(50))
BEGIN
declare msu int;

select type into msu from item_master where id=itemid;
if msu=2 then
set msu=msuu;
end if;
insert into batch_master values(null,itemid,batchname,cp,sp,expirydate,msu,commentt,1);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `new_patient_booking` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_patient_booking`(in branchid int,in namee varchar(100),in contact1 varchar(45),in contact2 varchar(45),
in email varchar(45),in address varchar(200),in aptime datetime,in docid int,in commentt varchar(200),in bookedby varchar(100),in visit int,in sourcee int)
BEGIN
#create cfc, new patient ,assign branch and booking master entry
declare cfc text;
declare pid int;
call generate_cfc(branchid,cfc);
insert into customer_master values(null,cfc,branchid,namee,contact1,contact2,email,address,sourcee,1);
set pid =LAST_INSERT_ID();

call new_booking_cfc(cfc,branchid,aptime,docid,commentt,concat(bookedby,' @ ',date_format(now(),'%d-%m-%Y %H:%i')),visit);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `new_receipt` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_receipt`(in branchid int,in treatmentid int,in name varchar(45),in billdate date ,
in amount double,in description varchar(200),in createdby varchar(100),in mode varchar(45))
BEGIN

declare receipt varchar(45);
declare counter,newcounter int;
declare balanceamount double;
select 
ifnull(tstock.samount,0)+ifnull(tprocedure.pamount,0)+ifnull(tlab.lamount,0)-ifnull(rcpt.ramount,0) balance_amount 
into balanceamount
from treatment_master 
left join
(
select treatment_stock.tid, sum((treatment_stock.amount*treatment_stock.quantity)-((treatment_stock.quantity*treatment_stock.amount*discount)/100))samount from
treatment_stock where treatment_stock.is_free=0 and treatment_stock.tid=treatmentid  group by treatment_stock.tid
)tstock on treatment_master.id= tstock.tid
left join
(
select treatment_procedure.tid, sum(treatment_procedure.amount-((treatment_procedure.amount*treatment_procedure.discount)/100))pamount from
treatment_procedure where treatment_procedure.is_free=0 and treatment_procedure.tid=treatmentid group by treatment_procedure.tid
)tprocedure on tprocedure.tid=treatment_master.id
left join
(
select treatment_lab_investigation.tid, sum(treatment_lab_investigation.amount-((treatment_lab_investigation.amount*treatment_lab_investigation.discount)/100))lamount from
treatment_lab_investigation where treatment_lab_investigation.is_free=0 and treatment_lab_investigation.tid=treatmentid group by treatment_lab_investigation.tid
)tlab on tlab.tid=treatment_master.id

left join
(
select sum(receipt_master.amount)ramount,receipt_master.tid  from receipt_master where  receipt_master.tid=treatmentid group by receipt_master.tid
)rcpt on rcpt.tid=treatment_master.id
where treatment_master.id =treatmentid;


if round (balanceamount,2)>=amount then

select concat(receipt_prefix,
concat(case when receipt_counter  < 10 then '000' when  receipt_counter >=10 and receipt_counter < 100 then
 '00' when  receipt_counter >=100 and receipt_counter < 1000  then '0' else '' end,receipt_counter)),receipt_counter
 into receipt,counter  from branch_master where id=branchid;

insert into receipt_master values(null,branchid,treatmentid,receipt,name,billdate,amount,description,concat(createdby,' @ ',date_format(now(),'%d-%m-%Y %H:%i')),mode); 

update branch_master set receipt_counter =receipt_counter + 1 where id=branchid;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `new_treatment_file` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_treatment_file`(in name varchar(100),in cfc varchar (45),in startdate date,in paymentdate date,in comment varchar(45),
in bookedby varchar(45),in doctor_id int,in patientid int
)
BEGIN
insert into treatment_master values(null,name,cfc,startdate,paymentdate,doctor_id,comment,concat(bookedby,' @ ',date_format(now(),'%d-%m-%Y %H:%i')),1,now(),patientid);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `new_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_user`(in username varchar(100),in userrole int,in branchid int)
BEGIN
declare userid int;
insert into user_master values(null,username,userrole,branchid,username,1);
set userid = LAST_INSERT_ID();

if userrole=7 then
call new_doctor(userid,username,null,'Female','',branchid,'');
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `patient_list_treatment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `patient_list_treatment`(in tid int)
BEGIN
select id,patient_info_master.name,patient_info_master.sex from patient_info_master where cfc in(select cfc from treatment_master where id =tid);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `procedure_master` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `procedure_master`(in type int,in namee varchar(100),in descriptionn varchar(200),in costt int,in pid int)
BEGIN
if type=1 then
insert into procedure_master values (null,namee,descriptionn,costt,1);
elseif type = 2 then
update procedure_master set name=namee,description=descriptionn,cost=costt where id=pid;
elseif type = 3 then
update procedure_master set isactive = 0 where id=pid;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `purchase_content_entry` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `purchase_content_entry`(in purchaseid int,in batchid int,in qty int,in brandid int)
BEGIN
#insert into purchase_content values(null,purchaseid,brandid,msu,batchid,qty,cp,sp);
insert into purchase_content 
select null,purchaseid,brandid,batch_master.msu,batchid,qty,batch_master.cost_price,batch_master.selling_price from batch_master 
where id =batchid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `room_booking` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `room_booking`(in type int,in branchid int,in roomid int,in pid int,
in did int,in bookstart datetime,in bookend datetime,in commentt varchar(100),in bookedby varchar(100),out status int,in bookingid int)
BEGIN
#type 1:insertion
declare count2,count3 int;
#count1 patient branch access
#count2 branch room access
#count3

if branchid=-1 then
set count2=1;
else
select count(id) into count2 from room_master where room_master.branch_id=branchid and id=roomid and isactive=1;
end if;

select count(*) into count3 from room_transaction where (
(bookstart <=(room_transaction.book_start) and bookend >=(room_transaction.book_end)) or
(bookstart <= (room_transaction.book_start) and bookend<= (room_transaction.book_end) and bookend>=(room_transaction.book_start)) or
( bookstart>= (room_transaction.book_start) and bookend <= (room_transaction.book_end)) or
(bookstart <=(room_transaction.book_end) and bookend >=(room_transaction.book_end))
) and room_id=roomid;



if count2=1  then
set status=0;

		if type=1 and count3=0 then
        #new room booking
			set status=1;
			insert into room_transaction values(null,roomid,pid,did,bookstart,bookend,commentt,concat(bookedby,' @ ',date_format(now(),'%d-%m-%Y %H:%i')));
		elseif type=2 and count3<2 then
		#edit room booking,count3=1 bcoz same transaction will return 1 not 0 count
        set status=1;
			update room_transaction set room_id=roomid,patient_id=pid,doctor_id=did,book_start=bookstart,
            book_end=bookend,comment=commentt,booked_by=concat(bookedby,' @ ',date_format(now(),'%d-%m-%Y %H:%i')) where id=bookingid;
        
		end if;
        
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `room_master` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `room_master`(in type int,in typee int,in namee varchar(45),in branchid int,in roomid int)
BEGIN
#1 insertion
#2 updation
#3 deletion
if type=1 then
insert into room_master values (null,typee,branchid,namee,1);
elseif type=2 then
update room_master set room_master.type=typee,name=namee where id=roomid;
elseif type=3 then
update room_master set isactive=0 where id=roomid and branch_id=branchid;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sample` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sample`(in v text)
BEGIN

#select qty_json->v from branch_item where id=85;
select JSON_EXTRACT(qty_json , concat('$.i',v)) from branch_item where id=85;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `stock_transfer_content_entry` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `stock_transfer_content_entry`(in idd int,in batchid int,in bottle int,in quantity int,in branchid int)
BEGIN
declare stockk ,msuu int;

insert into stock_transfer_content values(null,idd,batchid,quantity,bottle);
select batch_master.msu into msuu from batch_master where id =batchid;
set bottle=bottle-1;#index is -1
if msuu=1 then 
update branch_item set counter = counter - quantity where branch_id =branchid and batch_id=batchid;
else 
select JSON_EXTRACT(qty_json , concat('$.i',bottle)) into stockk from branch_item where branch_id =branchid and batch_id=batchid;
update branch_item set qty_json = JSON_REPLACE(qty_json,concat('$.i',bottle),stockk+quantity) where branch_id =branchid and batch_id=batchid;
end if;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `toggle_visit_status` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `toggle_visit_status`(in bookingid int)
BEGIN
update booking_master
set visit_status = case when visit_status = 1 
                  then 0 
                  else 1   
             end
             where id=bookingid;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `treatment_file_add_lab` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `treatment_file_add_lab`(in tid int,in patientid int,in lid int,in startdate date,
in discount double,in comment varchar(200),in createdby varchar(45),in isfree smallint ,in branchid int)
BEGIN
declare amount double;
if isfree = 1 then
set amount =0;
elseif isfree=0 then
select cost into amount from lab_investigation_master where id=lid;
end if;
insert into treatment_lab_investigation values(null,tid,patientid,lid,branchid,startdate,amount,discount,comment,concat(createdby,' @ ',date_format(now(),'%d-%m-%Y %H:%i')),isfree);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `treatment_file_add_procedure` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `treatment_file_add_procedure`(in tid int,in patientid int,in procedureid int,in startdate date,
in discount double,in comment varchar(200),in createdby varchar(45),in isfree smallint ,in branchid int)
BEGIN
declare amount double;
if isfree = 1 then
set amount =0;
elseif isfree=0 then
select cost into amount from procedure_master where id=procedureid;
end if;
insert into treatment_procedure values(null,tid,patientid,procedureid,branchid,startdate,amount,discount,comment,concat(createdby,' @ ',date_format(now(),'%d-%m-%Y %H:%i')),isfree);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `treatment_file_add_stock` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `treatment_file_add_stock`(in tid int,in patientid int,in batchid int,in bottle text,in quantity int,in discount double,
in isfree int,in comment varchar(200),in createdby varchar(45),in branchid int,out flag int,in sdate date)
BEGIN
declare amount double;
declare stock ,msuu int;
set flag=1;
if isfree = 1 then
set amount =0;
elseif isfree=0 then
select selling_price into amount from batch_master  where id=batchid;
end if;
set bottle=bottle-1;#index is -1
insert into treatment_stock values(null,tid,patientid,batchid,branchid,bottle,quantity,amount,discount,isfree,sdate,comment,concat(createdby,' @ ',date_format(now(),'%d-%m-%Y %H:%i')));
 
select batch_master.msu into msuu from batch_master where id =batchid;
if msuu=1 then 
select counter into stock from branch_item where branch_id =branchid and batch_id=batchid;
update branch_item set counter = counter - quantity where branch_id =branchid and batch_id=batchid;
else 
select JSON_EXTRACT(qty_json , concat('$.i',bottle)) into stock from branch_item where branch_id =branchid and batch_id=batchid;
update branch_item set qty_json = JSON_REPLACE(qty_json,concat('$.i',bottle),stock+quantity) where branch_id =branchid and batch_id=batchid;
set stock=msuu-stock;
end if;

if quantity>stock then
set flag=0;
end if;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `treatment_file_delete_lab` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `treatment_file_delete_lab`(in idd int,in tidd int)
BEGIN
delete from treatment_lab_investigation where id=idd and tid=tidd;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `treatment_file_delete_procedure` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `treatment_file_delete_procedure`(in idd int,in tidd int)
BEGIN
delete from treatment_procedure where id=idd and tid=tidd;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `treatment_file_delete_stock` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `treatment_file_delete_stock`(in sid int, in tidd int,in bid int)
BEGIN
declare amount double;
declare batchid,quantityy,bottlee,stock,branchid int;

select batch_id ,quantity,bottle,branch_id into batchid, quantityy,bottlee,branchid from treatment_stock where id=sid;
delete from treatment_stock where id = sid and tid=tidd;

if bottlee=-1 then 
update branch_item set counter=counter+quantityy where branch_id =branchid and batch_id=batchid;
else 
select JSON_EXTRACT(qty_json , concat('$.i',bottlee)) into stock from branch_item where branch_id =branchid and batch_id=batchid;
update branch_item set qty_json = JSON_REPLACE(qty_json,concat('$.i',bottlee),stock-quantityy) where branch_id =branchid and batch_id=batchid;
end if;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `treatment_file_edit_lab` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `treatment_file_edit_lab`(in tidd int,in patientid int,in procedureid int,in startdate date,
in discountt double,in commentt varchar(200),in createdby varchar(45),in isfree smallint,in tpid int,in branchid int)
BEGIN
declare amountt double;
if isfree = 1 then
set amountt =0;
elseif isfree=0 then
select cost into amountt from lab_investigation_master where id=procedureid;
end if;

update treatment_lab_investigation set patient_id=patientid,lab_investigation_id=procedureid,start_date=startdate,amount=amountt,discount=discountt,
branch_id=branchid,comment=commentt,created_by=concat(createdby,' @ ',date_format(now(),'%d-%m-%Y %H:%i')),is_free=isfree where id=tpid and tid=tidd;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `treatment_file_edit_procedure` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `treatment_file_edit_procedure`(in tidd int,in patientid int,in procedureid int,in startdate date,
in discountt double,in commentt varchar(200),in createdby varchar(45),in isfree smallint,in tpid int,in branchid int)
BEGIN
declare amountt double;
if isfree = 1 then
set amountt =0;
elseif isfree=0 then
select cost into amountt from procedure_master where id=procedureid;
end if;

update treatment_procedure set patient_id=patientid,procedure_id=procedureid,start_date=startdate,amount=amountt,discount=discountt,
branch_id=branchid,comment=commentt,created_by=concat(createdby,' @ ',date_format(now(),'%d-%m-%Y %H:%i')),is_free=isfree where id=tpid and tid=tidd;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `treatment_file_edit_stock` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `treatment_file_edit_stock`(in tid int,in patientid int,in batchid int,in bottle text,in quantity int,in discount double,
in isfree int,in comment varchar(200),in createdby varchar(45),in branchid int,out flag int,in sdate date,in sid int)
BEGIN
declare amount double;
declare stock ,msuu,pbottle,pquantity,pbatchid,pbranchid int;
set flag=1;

#adding back the stock
select treatment_stock.quantity,treatment_stock.bottle,branch_id,batch_id into pquantity,pbottle,pbranchid,pbatchid from treatment_stock where id=sid and treatment_stock.tid=tid;

if pbottle=-1 then 
update branch_item set counter=counter+pquantity where branch_id =pbranchid and batch_id=pbatchid;
else 
select JSON_EXTRACT(qty_json , concat('$.i',pbottle)) into stock from branch_item where branch_id =pbranchid and batch_id=pbatchid;
update branch_item set qty_json = JSON_REPLACE(qty_json,concat('$.i',pbottle),stock-pquantity) where branch_id =pbranchid and batch_id=pbatchid;
end if;

#updating new values

if isfree = 1 then
set amount =0;
elseif isfree=0 then
select selling_price into amount from batch_master  where id=batchid;
end if;

set bottle=bottle-1;#index is -1

update treatment_stock set patient_id =patientid,batch_id=batchid,branch_id=branchid,
treatment_stock.bottle=bottle,treatment_stock.quantity=quantity,treatment_stock.amount=amount,
treatment_stock.discount=discount,is_free=isfree,start_date=sdate,treatment_stock.comment=comment,created_by=concat(createdby,' @ ',date_format(now(),'%d-%m-%Y %H:%i'))
where id=sid and treatment_stock.tid=tid;
 
select batch_master.msu into msuu from batch_master where id =batchid;
if msuu=1 then 
select counter into stock from branch_item where branch_id =branchid and batch_id=batchid;
update branch_item set counter = counter - quantity where branch_id =branchid and batch_id=batchid;
else 
select JSON_EXTRACT(qty_json , concat('$.i',bottle)) into stock from branch_item where branch_id =branchid and batch_id=batchid;
update branch_item set qty_json = JSON_REPLACE(qty_json,concat('$.i',bottle),stock+quantity) where branch_id =branchid and batch_id=batchid;
set stock=msuu-stock;
end if;

if quantity>stock then
set flag=0;
end if;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_stock` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_stock`(in ttype int,in branchid int,in batchid int,in quantity int)
BEGIN
#1=add quantity
#for msu 1 ,we add to counter instead of quantity,and counter value is used for quantity 
declare itemtype int;
declare pcount int;#0 implies new batch
declare ccount int;# count of counter
declare temp int;
declare i int;
declare msu int;
#declare jstring text;
#set jstring='';k
declare jstring json;
set jstring='{}';
#select branchid,batchid;
if ttype=1 then
select item_master.type into itemtype from item_master where id in (select batch_master.item_id from batch_master where id=batchid);
select count(id) , ifnull(branch_item.counter,0) into pcount,ccount from branch_item where branch_id = branchid and batch_id = batchid;

set temp=ccount;
set ccount=ccount+quantity;	
    
    if pcount=0 and itemtype=1 then
    insert into branch_item values(null,branchid,batchid,ccount,'{"i":0}');
    
    elseif pcount =0 and itemtype=2 then
    set i=temp;
		while i<ccount do
		#set jstring=concat(jstring,'{"',i,'":0}');
       #select JSON_INSERT(@jstring, '$.i', 0);
       #select JSON_SET(jstring,'{"a": 1, "b": 2}', '$.c', 3);
       set jstring=JSON_INSERT(jstring,concat('$.i',i), 0);
        set i=i+1;
		end while;
 #select jstring;       
   insert into  branch_item values (null,branchid,batchid,ccount,jstring);  
   
   elseif pcount>0 and itemtype=1 then
   update branch_item set counter=ccount where batch_id=batchid and branch_id=branchid;
   
   elseif pcount>0 and itemtype=2 then
   set i=temp;
		while i<ccount do

#       set jstring=JSON_INSERT(jstring,concat('$.i',i), 0);
		update branch_item set qty_json = JSON_insert(qty_json, concat('$.i',i), 0) where branch_id=branchid and batch_id=batchid;
        set i=i+1;
		end while;
	update branch_item set counter=ccount where branch_id=branchid and batch_id=batchid;

    end if;


elseif ttype=2 then
select item_master.type into itemtype from item_master where id in (select batch_master.item_id from batch_master where id=batchid);
select count(id) , ifnull(branch_item.counter,0) into pcount,ccount from branch_item where branch_id = branchid and batch_id = batchid;
select batch_master.msu into msu from batch_master where id=batchid;
set temp=ccount;
set ccount=ccount+quantity;	
    
    if pcount=0 and itemtype=1 then
    insert into branch_item values(null,branchid,batchid,ccount,'{"i":0}');
    
    elseif pcount =0 and itemtype=2 then
    set i=temp;
	#	while i<ccount do

     #  set jstring=JSON_INSERT(jstring,concat('$.i',i), 0);
      #  set i=i+1;
		#end while;
 #select jstring;       
 set jstring=JSON_INSERT(jstring,concat('$.i0'), msu-quantity);
   insert into  branch_item values (null,branchid,batchid,1,jstring);  
   
   elseif pcount>0 and itemtype=1 then
   update branch_item set counter=ccount where branch_item.batch_id=batchid and branch_id=branchid;
   
   elseif pcount>0 and itemtype=2 then
   set i=temp;
   set ccount=ccount-quantity;
		#while i<ccount do

#       set jstring=JSON_INSERT(jstring,concat('$.i',i), 0);
		#update branch_item set qty_json = JSON_insert(qty_json, concat('$.i',i), 0) where branch_id=branchid and batch_id=batchid;
        #set i=i+1;
		#end while;
        
	update branch_item set qty_json = JSON_insert(qty_json, concat('$.i',ccount), msu-quantity) where branch_id=branchid and branch_item.batch_id=batchid;
	update branch_item set counter=counter+1 where branch_id=branchid and branch_item.batch_id=batchid;

    end if;
    
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `view_all_stock_details` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `view_all_stock_details`(in branchid int)
BEGIN
if branchid=-1 then
select item_master.id item_id, item_master.name,sum(ifnull(pen.pending,0))pending,
#batch_master.msu,temp.counter,
case item_master.type when '2' then
sum((batch_master.msu*temp.counter)-temp.sumtot) when '1' then sum(temp.counter) end quantity,item_master.type from item_master left join batch_master on item_master.id = batch_master.item_id 
and item_master.isactive = 1
left join
(select ifnull(sumx,0)sumtot,batch_master.id batchid,ifnull(counter,0)counter,branch_id branchid from batch_master left join
 (SELECT ifnull(sum(xval),0) sumx,batch_id id,branch_id ,counter
     FROM branch_item,
       JSON_TABLE(
         qty_json,
         "$.*" COLUMNS(
           xval VARCHAR(100) PATH "$"
          
         ) 
       ) AS  jt1 group by branch_item.id
       )th on batch_master.id = th.id
 )temp
 on batch_master.id =temp.batchid 
left join (
select sum(purchase_content.quantity)*purchase_content.msu pending,purchase_content.batch_id from purchase_content inner join purchase_master on purchase_master.id=purchase_content.purchase_id 
where purchase_master.status=0
group by purchase_content.batch_id order by purchase_content.batch_id 
 )pen on pen.batch_id=batch_master.id
 where item_master.isactive = 1 and batch_master.isactive=1
 group by item_master.id 
 #,temp.branchid 
 order by item_master.name;
 
 else
 
 select item_master.id item_id, item_master.name,
sum(ifnull(pen.pending,0))pending,
#batch_master.msu,temp.counter,
case item_master.type when '2' then
sum(ifnull((batch_master.msu*temp.counter)-temp.sumtot,0)) when '1' then sum(ifnull(temp.counter,0)) end quantity,item_master.type from item_master left join batch_master on item_master.id = batch_master.item_id 
and item_master.isactive = 1
left join
(select ifnull(sumx,0)sumtot,batch_master.id batchid,ifnull(counter,0)counter,branch_id branchid from batch_master left join
 (SELECT ifnull(sum(xval),0) sumx,batch_id id,branch_id ,counter
     FROM branch_item,
       JSON_TABLE(
         qty_json,
         "$.*" COLUMNS(
           xval VARCHAR(100) PATH "$"
          
         ) 
       ) AS  jt1 group by branch_item.id 
       )th on batch_master.id = th.id
 )temp
 on batch_master.id =temp.batchid 

and temp.branchid=branchid
left join (
select sum(purchase_content.quantity)*purchase_content.msu pending,purchase_content.batch_id from purchase_content inner join purchase_master on purchase_master.id=purchase_content.purchase_id 
where purchase_master.status=0 and purchase_master.branch_id=branchid
group by purchase_content.batch_id order by purchase_content.batch_id 
 )pen on pen.batch_id=batch_master.id
 where item_master.isactive = 1 and batch_master.isactive=1
 group by item_master.id 
 #,temp.branchid 
 order by item_master.name;

 end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `view_invoice` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `view_invoice`(in tidd int,in branchid  int,in type int)
BEGIN
#type1 normal invoice
#type 2 detailed invoice
declare flag int;
select count(*) into flag from invoice_master where tid=tidd;
if flag=0 then
call new_invoice(tidd,branchid);
end if;
call get_invoice_treatment(tidd);
if type=2 then
call get_treatment_data(1,0,tidd);#procedure history
call get_treatment_data(2,0,tidd);#pharmacy history
call get_treatment_data(3,0,tidd);#lab investigation history
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `view_invoice_print` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `view_invoice_print`(in tidd int)
BEGIN
call get_treatment_data(1,0,tidd);#procedure history
call get_treatment_data(2,0,tidd);#pharmacy history
call get_treatment_data(3,0,tidd);#lab investigation history
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `view_stock_batch` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `view_stock_batch`(in branchid int,in itemid int)
BEGIN
select case item_master.type when '2' then
sum((batch_master.msu*counter)-ifnull(sumx,0)) when '1' then ifnull(sum(counter),0) end quantity,batch_master.comment
,batch_master.selling_price sp,date_format(batch_master.expiry_date,'%d/%m/%Y')expiry_date,batch_master.msu,batch_master.name,batch_master.id batch_id from batch_master left join
 (
 SELECT ifnull(sum(xval),0) sumx,batch_id id,branch_id ,counter
     FROM branch_item,
       JSON_TABLE(
         qty_json,
         "$.*" COLUMNS(
           xval VARCHAR(100) PATH "$"
			) 
			) AS  jt1 where branch_item.branch_id=branchid  group by branch_item.batch_id
	)th on batch_master.id = th.id 
inner join item_master on item_master.id = batch_master.item_id where batch_master.item_id=itemid  
and batch_master.isactive=1
group by batch_master.id;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `view_stock_purchase` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `view_stock_purchase`(in purchaseid int,in branchid int)
BEGIN
if branchid = -1 then
select purchase_master.id,branch_master.id branch_id,date_format(purchase_master.date, '%d/%m/%Y')purchase_date,purchase_master.reference_no,
branch_master.name,purchase_master.comment ,case purchase_master.status when '0' then 'Pending' when '1' then 'Confirmed' end fstatus,purchase_master.status
from purchase_master inner join branch_master on purchase_master.branch_id = branch_master.id and purchase_master.id=purchaseid;

select brand_master.id brand_id,brand_master.name brand_name,date_format(batch_master.expiry_date, '%d/%m/%Y')expiry,item_master.id item_id,batch_master.id batch_id,item_master.name item_name,batch_master.name batch_name,purchase_content.msu,purchase_content.selling_price,purchase_content.cost_price,
 purchase_content.quantity from purchase_master inner join purchase_content on purchase_master.id = purchase_content.purchase_id join
 batch_master on batch_master.id = purchase_content.batch_id 
 inner join brand_master on brand_master.id = purchase_content.brand_id
 join item_master on item_master.id = batch_master.item_id
 and purchase_master.id = purchaseid;
 
 else
select purchase_master.id,branch_master.id branch_id,date_format(purchase_master.date, '%d/%m/%Y')purchase_date,purchase_master.reference_no,
branch_master.name,purchase_master.comment ,case purchase_master.status when '0' then 'Pending' when '1' then 'Confirmed' end fstatus,purchase_master.status
from purchase_master inner join branch_master on purchase_master.branch_id = branch_master.id and purchase_master.id=purchaseid where purchase_master.branch_id=branchid;

select brand_master.id brand_id,brand_master.name brand_name,date_format(batch_master.expiry_date, '%d/%m/%Y')expiry,item_master.id item_id,batch_master.id batch_id,item_master.name item_name,batch_master.name batch_name,purchase_content.msu,purchase_content.selling_price,'' cost_price,
 purchase_content.quantity from purchase_master inner join purchase_content on purchase_master.id = purchase_content.purchase_id join
 batch_master on batch_master.id = purchase_content.batch_id
 inner join brand_master on brand_master.id = purchase_content.brand_id
 join item_master on item_master.id = batch_master.item_id
 and purchase_master.id = purchaseid and purchase_master.branch_id=branchid;
  

end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `view_stock_transfer` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `view_stock_transfer`(in purchaseid int,in branchid int)
BEGIN
select stock_transfer_master.id,branch_master.id branch_id,date_format(stock_transfer_master.date, '%d/%m/%Y')purchase_date,
stock_transfer_master.reference_no,
branch_master.name,stock_transfer_master.comment ,case stock_transfer_master.status when '0' then 'Pending' when '1' then 'Confirmed' end fstatus,
stock_transfer_master.status
from stock_transfer_master inner join branch_master on stock_transfer_master.destination_branch_id = branch_master.id and stock_transfer_master.id=purchaseid where stock_transfer_master.branch_id=branchid;

select date_format(batch_master.expiry_date, '%d/%m/%Y')expiry,item_master.id item_id,batch_master.id batch_id,
item_master.name item_name,batch_master.name batch_name,
case stock_transfer_content.bottle when -1 then 'NA' else bottle+1 end bottle,
 stock_transfer_content.quantity from stock_transfer_master inner join stock_transfer_content on stock_transfer_master.id = stock_transfer_content.transfer_id join
 batch_master on batch_master.id = stock_transfer_content.batch_id join item_master on item_master.id = batch_master.item_id
 and stock_transfer_master.id = purchaseid and stock_transfer_master.branch_id=branchid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `view_stock_transfer_pending` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `view_stock_transfer_pending`(in purchaseid int,in branchid int)
BEGIN
select stock_transfer_master.id,branch_master.id branch_id,date_format(stock_transfer_master.date, '%d/%m/%Y')purchase_date,
stock_transfer_master.reference_no,
branch_master.name,stock_transfer_master.comment ,case stock_transfer_master.status when '0' then 'Pending' when '1' then 'Confirmed' end fstatus,
stock_transfer_master.status
from stock_transfer_master inner join branch_master on stock_transfer_master.branch_id = branch_master.id and stock_transfer_master.id=purchaseid where stock_transfer_master.destination_branch_id=branchid;

select date_format(batch_master.expiry_date, '%d/%m/%Y')expiry,item_master.id item_id,batch_master.id batch_id,
item_master.name item_name,batch_master.name batch_name,
case stock_transfer_content.bottle when -1 then 'NA' else bottle+1 end bottle,
 stock_transfer_content.quantity from stock_transfer_master inner join stock_transfer_content on stock_transfer_master.id = stock_transfer_content.transfer_id join
 batch_master on batch_master.id = stock_transfer_content.batch_id join item_master on item_master.id = batch_master.item_id
 and stock_transfer_master.id = purchaseid and stock_transfer_master.destination_branch_id=branchid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-29 12:25:40
