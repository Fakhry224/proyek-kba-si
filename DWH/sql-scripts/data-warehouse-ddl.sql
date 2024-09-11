CREATE DATABASE IF NOT EXISTS gravity_books_dwh character set = 'utf8mb4' collate = 'utf8mb4_general_ci';

CREATE TABLE IF NOT EXISTS gravity_books_dwh.customer (
    customer_id INT,
    customer_sk SERIAL,
    name VARCHAR(1000),
    country VARCHAR(100),
    city VARCHAR(100),
    street_name VARCHAR(500),
    street_number VARCHAR(100),
    PRIMARY KEY (customer_id, street_name, street_number)
);

CREATE TABLE IF NOT EXISTS gravity_books_dwh.time (
    time_sk SERIAL PRIMARY KEY,
    year INT,
    month INT,
    day INT
);

CREATE TABLE IF NOT EXISTS gravity_books_dwh.shipping_method (
    method_id INT PRIMARY KEY,
    method_sk SERIAL,
    method_name VARCHAR(100),
    cost DECIMAL
);

CREATE TABLE IF NOT EXISTS gravity_books_dwh.book (
    book_id INT PRIMARY KEY,
    book_sk SERIAL,
    title VARCHAR(500),
    author VARCHAR(1000),
    publisher VARCHAR(500),
    language VARCHAR(100),
    publication_date DATE,
    pages INT
);

CREATE TABLE IF NOT EXISTS gravity_books_dwh.book_sales_facts (
    book_sales_facts_id SERIAL PRIMARY KEY,
    time_sk BIGINT UNSIGNED,
    customer_sk BIGINT UNSIGNED,
    method_sk BIGINT UNSIGNED,
    book_sk BIGINT UNSIGNED,
    revenue_book_sales DECIMAL(10, 2),
    CONSTRAINT time_fk FOREIGN KEY (time_sk) REFERENCES time (time_sk),
    CONSTRAINT customer_fk FOREIGN KEY (customer_sk) REFERENCES customer (customer_sk),
    CONSTRAINT method_fk FOREIGN KEY (method_sk) REFERENCES shipping_method (method_sk),
    CONSTRAINT book_fk FOREIGN KEY (book_sk) REFERENCES book(book_sk)
);