-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 01, 2024 at 04:42 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `akatsuki_shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `username` varchar(25) NOT NULL,
  `password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`username`, `password`) VALUES
('hm10', '$2y$10$fUbWquWHVyDaIQZ33o37hebjNn3KYzOMZTnB3x2Oq1Ib3i9bpDK9m');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Accessories'),
(2, 'Shirts'),
(3, 'Games'),
(4, 'Books');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `first_name`, `last_name`, `email`, `phone_number`, `address`, `created_at`) VALUES
(1, 'Hadi', 'Makki', 'hadmak20@gmail.com', '03 111 111', 'Nabatieh', '2023-10-06 17:19:27'),
(2, 'Hadi', 'Makki', 'had.mak@hotmail.com', '70986272', 'nabatieh', '2023-10-13 15:07:22');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `message` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `name`, `email`, `phone`, `message`, `image`, `created_at`) VALUES
(1, 'eren yeager', 'ERENYEAGER@GMAIL.COM', '1 111 111', 'tatakae', '../../Frontend/Images/shirt1-back.webp', '2023-11-12 15:25:31'),
(3, 'eren yeager', 'ERENYEAGER@GMAIL.COM', '1 111 111', 'shinzou wo sasageyo', '../../Frontend/Images/item3.jpg', '2023-11-12 15:27:23'),
(4, 'Madara uchiha', 'mugentsukuyomi@gmail.com', '90 90 90 90', 'wake up to reality', NULL, '2023-12-18 15:14:08'),
(5, 'Madara uchiha', 'mugentsukuyomi@gmail.com', '90 90 90 90', 'with a picture', '../../Frontend/Images/FB_IMG_1667688025155.jpg', '2023-12-18 15:16:25');

-- --------------------------------------------------------

--
-- Table structure for table `now_trending_products`
--

CREATE TABLE `now_trending_products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `now_trending_products`
--

INSERT INTO `now_trending_products` (`id`, `name`, `description`, `price`, `image`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 'ONE PIECE SHIRT', 'MONKEY D. LUFFY SHIRT', 15.00, '../Images/shirt1.jpg', 2, '2023-10-09 15:52:06', '2023-10-09 15:52:06'),
(2, 'NARUTO SHIRT', 'NARUTO UZUMAKI SHIRT', 15.00, '../Images/shirt2.jpg', 2, '2023-10-09 15:56:09', '2023-10-09 15:56:09'),
(3, 'NARUTO BACKPACK', 'ITACHI UCHIHA BACKPACK', 30.00, '../Images/backpack1.jpg', 1, '2023-10-09 15:56:09', '2023-10-09 15:56:09');

-- --------------------------------------------------------

--
-- Table structure for table `offers`
--

CREATE TABLE `offers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `old_price` decimal(10,2) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `offers`
--

INSERT INTO `offers` (`id`, `name`, `description`, `old_price`, `price`, `image`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 'Naruto Shirt', 'Get this shirt with 5 naruto characters for only', 15.00, 12.00, '../Images/naruto-shirt-1.jpg', 2, '2023-10-09 16:06:19', '2023-10-09 16:06:19'),
(2, 'Demon Slayer backpack set', 'demon slayer backpack, pencil case and lunch bag for only', 70.00, 45.00, '../Images/backpack-set.jpg', 1, '2023-10-09 16:06:19', '2023-10-09 16:06:19'),
(3, 'Game of thrones books set', 'get all five game of thrones books for only', 120.00, 80.00, '../Images/got-books-set.jpg', 4, '2023-10-09 16:06:19', '2023-10-09 16:06:19'),
(4, 'ITACHI LAMP', 'AMAZING ITACHI UCHIHA BEDROOM LAMP', 30.00, 15.00, '../Images/item7.jpg', 1, '2023-10-09 16:06:19', '2023-10-09 16:06:19');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_price` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_id`, `order_date`, `total_price`) VALUES
(1, 1, '2023-10-06 17:19:27', 30.00),
(2, 1, '2023-10-06 17:24:43', 15.00),
(8, 2, '2023-12-22 19:21:14', 40.00),
(9, 2, '2023-12-25 18:34:16', 25.00);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`, `color`, `size`) VALUES
(1, 1, 2, 1, 15.00, 'Black', 'M'),
(2, 1, 1, 1, 15.00, '', ''),
(3, 2, 3, 1, 15.00, 'Black', 'M'),
(10, 8, 5, 1, 25.00, '', ''),
(11, 8, 3, 1, 15.00, 'Black', 'M'),
(12, 9, 6, 1, 10.00, '', ''),
(13, 9, 2, 1, 15.00, 'Black', 'S');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `image`, `name`, `description`, `price`, `category_id`, `created_at`, `updated_at`) VALUES
(1, '../Images/item8.jpg', 'Kakashi Lamp', 'Kakashi Hatake bedroom lamp', 15.00, 1, '2023-09-14 15:53:20', '2023-12-11 16:09:37'),
(2, '../Images/shirt1.jpg', 'ONE PIECE SHIRT', 'MONKEY D. LUFFY SHIRT', 15.00, 2, '2023-09-14 16:17:29', '2023-09-14 17:09:40'),
(3, '../Images/shirt2.jpg', 'NARUTO SHIRT', 'NARUTO UZUMAKI SHIRT', 15.00, 2, '2023-09-14 17:44:36', '2023-09-14 17:44:36'),
(4, '../Images/backpack1.jpg', 'NARUTO BACKPACK', 'ITACHI UCHIHA BACKPACK', 30.00, 1, '2023-09-14 17:44:37', '2023-09-18 16:44:58'),
(5, '../../Frontend/Images/accessories-category.webp', 'One Piece Bag', 'SHOULDER ONE PIECE BLACK BAG', 25.00, 1, '2023-10-22 15:26:03', '2023-10-22 15:27:53'),
(6, '../../Frontend/Images/Uncharted_4.jpg', 'Uncharted 4', 'uncharted 4 ps4 game', 10.00, 3, '2023-10-22 15:30:01', '2023-10-22 15:30:01'),
(12, '../../Frontend/Images/naruto-manga.jpg', 'Naruto Manga', 'naruto manga vol.70', 50.00, 4, '2024-01-01 15:21:00', '2024-01-01 15:21:00'),
(13, '../../Frontend/Images/one-piece-manga.webp', 'One piece manga', 'ONE PIECE MANGA volume 100', 50.00, 4, '2024-01-01 15:24:00', '2024-01-01 15:24:00'),
(14, '../../Frontend/Images/aot-manga.webp', 'Attack on titan manga', 'Aot MANGA chapter 13', 25.00, 4, '2024-01-01 15:26:23', '2024-01-01 15:26:23'),
(15, '../../Frontend/Images/naruto-game.webp', 'NARUTO X BORUTO ULTIMATE NINJA STORM CONNECTIONS', ' PlayStation 5 | PS5', 59.99, 3, '2024-01-01 15:28:52', '2024-01-01 15:34:03'),
(16, '../../Frontend/Images/fireandice.jpg', 'FIRE AND ICE', 'GAME OF THRONES FIRE AND ICE', 25.00, 4, '2024-01-01 15:33:42', '2024-01-01 15:33:42'),
(17, '../../Frontend/Images/eren-hoodie.webp', 'Attack On Titan Hoodie', 'EREN YEAGER Hoodie', 25.00, 2, '2024-01-01 15:38:24', '2024-01-01 15:38:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `now_trending_products`
--
ALTER TABLE `now_trending_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `offers`
--
ALTER TABLE `offers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `now_trending_products`
--
ALTER TABLE `now_trending_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `offers`
--
ALTER TABLE `offers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `now_trending_products`
--
ALTER TABLE `now_trending_products`
  ADD CONSTRAINT `now_trending_products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `offers`
--
ALTER TABLE `offers`
  ADD CONSTRAINT `offers_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
