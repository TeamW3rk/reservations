CREATE TABLE restaurants (
    id INT,
    name TEXT,
    bookings TEXT
);

CREATE TABLE availibilities (
    id INT,
    restaurant_id INT,
    time_id INT
);

CREATE TABLE time_slots (
    id INT,
    day INT, 
    hour INT,
    min INT
);


