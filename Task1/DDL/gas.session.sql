CREATE OR REPLACE FUNCTION update_last_update()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_update = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validate_email()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.email ~* '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' THEN
        RETURN NEW;
    ELSE
        RAISE EXCEPTION 'Invalid email format';
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validate_password()
RETURNS TRIGGER AS $$
BEGIN
    -- Check minimum length
    IF LENGTH(NEW.password) < 8 THEN
        RAISE EXCEPTION 'Password must be at least 8 characters long.';
    END IF;

    -- Check for at least one digit
    IF NOT (NEW.password ~ '[0-9]') THEN
        RAISE EXCEPTION 'Password must contain at least one digit.';
    END IF;

    -- Check for at least one uppercase letter
    IF NOT (NEW.password ~ '[A-Z]') THEN
        RAISE EXCEPTION 'Password must contain at least one uppercase letter.';
    END IF;

    -- Check for at least one lowercase letter
    IF NOT (NEW.password ~ '[a-z]') THEN
        RAISE EXCEPTION 'Password must contain at least one lowercase letter.';
    END IF;

    -- Check for at least one special character
    IF NOT (NEW.password ~ '[\W]') THEN
        RAISE EXCEPTION 'Password must contain at least one special character.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;



CREATE TABLE customer (
    customer_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER check_email_before_insert_or_update
BEFORE INSERT OR UPDATE OF email ON customer
FOR EACH ROW
EXECUTE FUNCTION validate_email();

CREATE TRIGGER check_password_before_insert_or_update
BEFORE INSERT OR UPDATE OF password ON customer
FOR EACH ROW
EXECUTE FUNCTION validate_password();

CREATE TRIGGER update_customer_last_update
BEFORE UPDATE ON customer
FOR EACH ROW
EXECUTE FUNCTION update_last_update();



CREATE TABLE author (
    author_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (first_name, last_name, date_of_birth)
);

CREATE TRIGGER update_author_last_update
BEFORE UPDATE ON author
FOR EACH ROW
EXECUTE FUNCTION update_last_update();



CREATE TABLE country (
    country_id SERIAL PRIMARY KEY,
    country_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_country_last_update
BEFORE UPDATE ON country
FOR EACH ROW
EXECUTE FUNCTION update_last_update();



CREATE TABLE city (
    city_id SERIAL PRIMARY KEY,
    city_name VARCHAR(50) NOT NULL,
    country_id INT REFERENCES country(country_id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (city_name, country_id)
);

CREATE TRIGGER update_city_last_update
BEFORE UPDATE ON city
FOR EACH ROW
EXECUTE FUNCTION update_last_update();



CREATE TABLE address (
    address_id SERIAL PRIMARY KEY,
    address_name VARCHAR(100) NOT NULL,
    city_id INT REFERENCES city(city_id) NOT NULL,
    district VARCHAR(20) NOT NULL,
    postal_code VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_address_last_update
BEFORE UPDATE ON address
FOR EACH ROW
EXECUTE FUNCTION update_last_update();



CREATE TABLE publisher (
    publisher_id SERIAL PRIMARY KEY,
    city INT REFERENCES city(city_id) NOT NULL,
    founded_year INT NOT NULL CHECK (founded_year > 0),
    publisher_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (publisher_name, founded_year)
);

CREATE TRIGGER update_publisher_last_update
BEFORE UPDATE ON publisher
FOR EACH ROW
EXECUTE FUNCTION update_last_update();



CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_category_last_update
BEFORE UPDATE ON category
FOR EACH ROW
EXECUTE FUNCTION update_last_update();



CREATE TABLE language (
    language_id SERIAL PRIMARY KEY,
    language_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_language_last_update
BEFORE UPDATE ON language
FOR EACH ROW
EXECUTE FUNCTION update_last_update();



CREATE TABLE store (
    store_id SERIAL PRIMARY KEY,
    store_name VARCHAR(50) NOT NULL UNIQUE,
    address_id INT REFERENCES address(address_id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_store_last_update
BEFORE UPDATE ON store
FOR EACH ROW
EXECUTE FUNCTION update_last_update();



CREATE TABLE staff (
    staff_id SERIAL PRIMARY KEY,
    store_id INT REFERENCES store(store_id) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER check_email_before_insert_or_update
BEFORE INSERT OR UPDATE OF email ON staff
FOR EACH ROW
EXECUTE FUNCTION validate_email();

CREATE TRIGGER check_password_before_insert_or_update
BEFORE INSERT OR UPDATE OF password ON staff
FOR EACH ROW
EXECUTE FUNCTION validate_password();

CREATE TRIGGER update_staff_last_update
BEFORE UPDATE ON staff
FOR EACH ROW
EXECUTE FUNCTION update_last_update();



CREATE TABLE book (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    publisher_id INT REFERENCES publisher(publisher_id) NOT NULL,
    language_id INT REFERENCES language(language_id) NOT NULL,
    price_in_rupiah DECIMAL(10, 2) NOT NULL,
    isbn VARCHAR(50) NOT NULL,
    pages INT NOT NULL,
    weight_in_grams INT NOT NULL,
    synopsis TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_book_last_update
BEFORE UPDATE ON book
FOR EACH ROW
EXECUTE FUNCTION update_last_update();



CREATE TABLE book_author (
    book_author_id SERIAL PRIMARY KEY,
    book_id INT REFERENCES book(book_id) NOT NULL,
    author_id INT REFERENCES author(author_id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (book_id, author_id)
);

CREATE TRIGGER update_book_author_last_update
BEFORE UPDATE ON book_author
FOR EACH ROW
EXECUTE FUNCTION update_last_update();



CREATE TABLE book_category (
    book_category_id SERIAL PRIMARY KEY,
    book_id INT REFERENCES book(book_id) NOT NULL,
    category_id INT REFERENCES category(category_id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (book_id, category_id)
);

CREATE TRIGGER update_book_category_last_update
BEFORE UPDATE ON book_category
FOR EACH ROW
EXECUTE FUNCTION update_last_update();



CREATE TABLE inventory (
    inventory_id SERIAL PRIMARY KEY,
    book_id INT REFERENCES book(book_id) NOT NULL,
    store_id INT REFERENCES store(store_id) NOT NULL,
    shelf_location VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_inventory_last_update
BEFORE UPDATE ON inventory
FOR EACH ROW
EXECUTE FUNCTION update_last_update();



CREATE TABLE customer_location (
    customer_location_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customer(customer_id) NOT NULL,
    address_id INT REFERENCES address(address_id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (customer_id, address_id)
);

CREATE TRIGGER update_customer_location_last_update
BEFORE UPDATE ON customer_location
FOR EACH ROW
EXECUTE FUNCTION update_last_update();



CREATE TABLE inventory_log (
    inventory_log_id SERIAL PRIMARY KEY,
    inventory_id INT REFERENCES inventory(inventory_id) NOT NULL,
    quantity INT NOT NULL,
    updated_by INT REFERENCES staff(staff_id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE wishlist (
    wishlist_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customer(customer_id) NOT NULL,
    inventory_id INT REFERENCES inventory(inventory_id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


