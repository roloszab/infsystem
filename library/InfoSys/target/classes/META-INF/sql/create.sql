-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema rental
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema rental
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `rental` DEFAULT CHARACTER SET utf8 ;
USE `rental` ;


-- -----------------------------------------------------
-- Table `rental`.`userroles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rental`.`userroles` ;

CREATE TABLE IF NOT EXISTS `workflow`.`userroles` (
  `username` VARCHAR(255) NULL DEFAULT NULL,
  `role` VARCHAR(32) NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `rental`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rental`.`users` ;

CREATE TABLE IF NOT EXISTS `workflow`.`users` (
  `username` VARCHAR(255) NOT NULL,
  `passwd` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`username`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `rental`.`customer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rental`.`customer` ;

CREATE TABLE IF NOT EXISTS `rental`.`customer` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `NAME` VARCHAR(255) NULL DEFAULT NULL,
  `PHONE_NUMBER` VARCHAR(15) NULL,
  `AUTH_CARD_NUMBER` CHAR(8) NULL,
  `ADDRESS` VARCHAR(255) NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `rental`.`status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rental`.`status` ;

CREATE TABLE IF NOT EXISTS `rental`.`status` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `STATUS_NAME` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `rental`.`dvd`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rental`.`dvd` ;

CREATE TABLE IF NOT EXISTS `rental`.`dvd` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `TITLE` VARCHAR(255), NULL,
  `SOURCE_DATE` DATE NULL,
  `STATUS_ID` INT NOT NULL,
PRIMARY KEY (`ID`),
	CONSTRAINT `fk_dvd_status`
	FOREIGN KEY (`STATUS_ID`)
	REFERENCES rental.status(`ID`)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
