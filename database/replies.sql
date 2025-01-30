-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 25, 2025 at 05:20 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mysql`
--

-- --------------------------------------------------------

--
-- Table structure for table `replies`
--

CREATE TABLE `replies` (
  `replyId` int(255) NOT NULL,
  `replyMsg` text NOT NULL,
  `replyDate` date NOT NULL,
  `replyTime` varchar(500) NOT NULL DEFAULT current_timestamp(),
  `replyAuthor` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `replies`
--

INSERT INTO `replies` (`replyId`, `replyMsg`, `replyDate`, `replyTime`, `replyAuthor`) VALUES
(41868943, '??', '2025-01-10', '10:22', 'user'),
(62548656, 'noo', '2025-01-11', '12:4', 'user'),
(62548656, '???', '2025-01-11', '18:44', 'user'),
(50307969, 'another reply', '2025-01-13', '19:39', 'user'),
(113091995, 'replyyy', '2025-01-13', '19:48', 'user'),
(41868943, 'yes', '2025-01-10', '9:40', 'user'),
(41868943, 'yes', '2025-01-10', '9:41', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `replies`
--
ALTER TABLE `replies`
  ADD PRIMARY KEY (`replyTime`(100),`replyAuthor`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
