CREATE SCHEMA `employee_cms_hw` ;

// create department table.

CREATE TABLE `employee_cms_hw`.`departments` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));

  CREATE TABLE `employee_cms_hw`.`roles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `salary` DECIMAL NULL DEFAULT 0,
  `department_id` INT ZEROFILL NOT NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `employee_cms_hw`.`roles` 
ADD INDEX `fk_roles_1_idx` (`department_id` ASC) VISIBLE;
;
ALTER TABLE `employee_cms_hw`.`roles` 
ADD CONSTRAINT `fk_roles_1`
  FOREIGN KEY (`department_id`)
  REFERENCES `employee_cms_hw`.`departments` (`id`)
  ON DELETE CASCADE
  ON UPDATE NO ACTION;


  CREATE TABLE `employee_cms_hw`.`employees` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(225) NOT NULL,
  `role_id` INT UNSIGNED NOT NULL,
  `manager_id` INT UNSIGNED NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `employee_cms_hw`.`employees` 
ADD INDEX `fk_role_id_idx` (`role_id` ASC) VISIBLE;
;
ALTER TABLE `employee_cms_hw`.`employees` 
ADD CONSTRAINT `fk_role_id`
  FOREIGN KEY (`role_id`)
  REFERENCES `employee_cms_hw`.`roles` (`id`)
  ON DELETE CASCADE
  ON UPDATE NO ACTION;

ALTER TABLE `employee_cms_hw`.`employees` 
ADD CONSTRAINT `fk_manager_id`
  FOREIGN KEY (`manager_id`)
  REFERENCES `employee_cms_hw`.`employees` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
