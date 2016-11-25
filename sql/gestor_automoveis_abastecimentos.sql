-- MySQL dump 10.13  Distrib 5.7.12, for osx10.9 (x86_64)
--
-- Host: 127.0.0.1    Database: gestor_automoveis
-- ------------------------------------------------------
-- Server version	5.5.38

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `abastecimentos`
--

DROP TABLE IF EXISTS `abastecimentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `abastecimentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_automovel` int(11) NOT NULL,
  `tipo_combustivel` varchar(45) NOT NULL,
  `data` date NOT NULL,
  `valor_odometro` int(6) NOT NULL,
  `quantidade_litros` decimal(6,2) NOT NULL,
  `custo_total` decimal(6,2) NOT NULL,
  `preco_litro` decimal(6,2) NOT NULL,
  `nova_serie` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `automovel_id_idx` (`id_automovel`),
  CONSTRAINT `automovel_id` FOREIGN KEY (`id_automovel`) REFERENCES `automoveis` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `abastecimentos`
--

LOCK TABLES `abastecimentos` WRITE;
/*!40000 ALTER TABLE `abastecimentos` DISABLE KEYS */;
INSERT INTO `abastecimentos` VALUES (20,12,'gasolina','2011-01-01',100700,11.11,22.22,2.22,1),(21,12,'gasolina','2011-01-02',100900,11.12,22.23,2.23,0),(22,12,'gasolina','2011-01-03',101200,11.13,22.24,2.24,0),(23,12,'gasolina','2011-02-01',105200,11.16,22.26,2.26,1),(24,12,'gasolina','2011-02-02',105400,11.17,22.27,2.27,0);
/*!40000 ALTER TABLE `abastecimentos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-22  8:18:09
