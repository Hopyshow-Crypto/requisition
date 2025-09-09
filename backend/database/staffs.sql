-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 09, 2025 at 07:38 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wealth_creation_full`
--

-- --------------------------------------------------------

--
-- Table structure for table `staffs`
--

CREATE TABLE `staffs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_level` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `other_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `home_address` varchar(200) NOT NULL,
  `phone_no` varchar(11) NOT NULL,
  `cug_phone` varchar(11) NOT NULL,
  `other_email` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `sex` varchar(6) NOT NULL,
  `dob` varchar(15) NOT NULL,
  `state` varchar(50) NOT NULL,
  `qualification` varchar(50) NOT NULL,
  `date_of_employment` varchar(50) NOT NULL,
  `department` varchar(50) NOT NULL,
  `present_grade` varchar(50) NOT NULL,
  `last_promotion_date` varchar(50) NOT NULL,
  `hmo` varchar(50) NOT NULL,
  `pension_provider` varchar(50) NOT NULL,
  `rsa_no` varchar(20) NOT NULL,
  `bank_name` varchar(50) NOT NULL,
  `bank_acct_name` varchar(50) NOT NULL,
  `bank_acct_no` varchar(11) NOT NULL,
  `gross_salary` varchar(11) NOT NULL,
  `payee_tax` varchar(11) NOT NULL,
  `salary_deduction` varchar(11) NOT NULL,
  `pension_deduction` varchar(11) NOT NULL,
  `net_salary` varchar(11) NOT NULL,
  `next_of_kin` varchar(60) NOT NULL,
  `kin_phone_no` varchar(15) NOT NULL,
  `kin_home_address` varchar(150) NOT NULL,
  `level` varchar(50) NOT NULL,
  `update_status` varchar(50) NOT NULL,
  `last_updated` datetime NOT NULL,
  `inputter_status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `staffs`
--
ALTER TABLE `staffs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `staffs`
--
ALTER TABLE `staffs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `staffs`
--
ALTER TABLE `staffs`
  ADD CONSTRAINT `staffs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
