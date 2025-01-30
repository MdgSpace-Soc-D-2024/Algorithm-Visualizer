-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 25, 2025 at 05:17 PM
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
-- Table structure for table `bubblesort`
--

CREATE TABLE `bubblesort` (
  `id` int(255) NOT NULL,
  `room` varchar(100) NOT NULL,
  `author` varchar(500) NOT NULL,
  `message` text NOT NULL,
  `date` date NOT NULL DEFAULT '2025-01-01',
  `time` time NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bubblesort`
--

INSERT INTO `bubblesort` (`id`, `room`, `author`, `message`, `date`, `time`) VALUES
(0, 'bubblesort', 'dummy1', 'doubtt', '2025-01-06', '00:43:00'),
(41868943, 'bubblesort', 'user', 'doubt', '2025-01-09', '05:06:00'),
(50307969, 'mergesort', 'user', 'another doubt', '2025-01-13', '19:39:00'),
(62548656, 'bubblesort', 'user', 'doubtt', '2025-01-11', '12:04:00'),
(113091995, 'mergesort', 'user', 'selection sort doubt', '2025-01-13', '19:48:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bubblesort`
--
ALTER TABLE `bubblesort`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
