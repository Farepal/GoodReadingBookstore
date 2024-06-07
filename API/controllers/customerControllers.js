const Database = require("../config/connectDatabase");
const pool = Database.getPool();
const { fullInsertAddress } = require("../utils/fullInsertLocation");

const structureData = (rows) => {
    const customers = {};

    rows.forEach(row => {
        if (!customers[row.customer_id]) {
            customers[row.customer_id] = {
                customerId: row.customer_id,
                username: row.username,
                firstName: row.first_name,
                lastName: row.last_name,
                email: row.email,
                createdAt: row.customer_created_at,
                lastUpdate: row.customer_last_update,
                wishlists: {},
                locations: new Set(), // Use a Set to ensure uniqueness
            };
        }

        const customer = customers[row.customer_id];

        // Create a unique identifier for each location
        const locationString = JSON.stringify({
            locationId: row.customer_location_id,
            addressName: row.customer_address,
            district: row.customer_district,
            postalCode: row.customer_postal_code,
            city: row.customer_city,
            country: row.customer_country
        });

        // Add location details to a Set to ensure uniqueness
        customer.locations.add(locationString);

        // Initialize or add to wishlist
        if (!customer.wishlists[row.wishlist_id]) {
            customer.wishlists[row.wishlist_id] = {
                wishlistId: row.wishlist_id,
                books: []
            };
        }

        customer.wishlists[row.wishlist_id].books.push({
            bookId: row.book_id,
            title: row.book_title,
            isbn: row.isbn,
            pages: row.pages,
            weightInGrams: row.weight_in_grams,
            synopsis: row.synopsis,
            price: row.price,
            bookCreatedAt: row.book_created_at,
            bookLastUpdate: row.book_last_update,
            publisherName: row.publisher_name,
            foundedYear: row.founded_year,
            languageName: row.language_name,
            categoryName: row.category_name,
            author: {
                firstName: row.author_first_name,
                lastName: row.author_last_name,
                dateOfBirth: row.author_date_of_birth
            }
        });
    });

    // Convert Set of JSON strings back to array of objects
    Object.values(customers).forEach(customer => {
        customer.locations = Array.from(customer.locations).map(location => JSON.parse(location));
    });

    // Convert the nested objects to arrays for the final output
    return Object.values(customers).map(customer => ({
        ...customer,
        wishlists: Object.values(customer.wishlists)
    }));
};


const register = async (req, res, next) => {
    try {
        const { username, email, password, firstName, lastName } = req.body;

        if (!username || !email || !password || !firstName || !lastName)
            return res.status(400).json({ message: "All fields are required" });

        if (await isEmailExistInCustomerDb(email))
            return res.status(400).json({ message: "Email already exists" });

        await insertCustomer(username, email, password, firstName, lastName);
        res.status(201).json({ message: "Customer created successfully" });
    } catch (error) {
        next(error);
    }

    async function isEmailExistInCustomerDb(email) {
        const queryText = "SELECT * FROM customer WHERE email = $1";
        const { rows } = await pool.query(queryText, [email]);
        return rows.length > 0;
    }

    async function insertCustomer(
        username,
        email,
        password,
        firstName,
        lastName
    ) {
        try {
            const queryText =
                "INSERT INTO customer (username, email, password, first_name, last_name) VALUES ($1, $2, $3, $4, $5)";
            await pool.query(queryText, [
                username,
                email,
                password,
                firstName,
                lastName,
            ]);
            await pool.query("COMMIT");
        } catch (error) {
            await pool.query("ROLLBACK");
            throw error;
        }
    }
};

const customerList = async (req, res, next) => {
    try {
        const { rows } = await pool.query(
            "SELECT * FROM view_customer_wishlists_with_books"
        );
        const AllCustomers = structureData(rows);

        // add location
        // view_customer_location
        const { rows: locationRows } = await pool.query(
            "SELECT * FROM view_customer_location"
        );

        res.status(200).json(AllCustomers);
    } catch (error) {
        next(error);
    }
};

const oneCustomer = async (req, res, next) => {
    try {
        const { customerId } = req.params;

        const { rows } = await pool.query(
            "SELECT * FROM view_customer_wishlists_with_books WHERE customer_id = $1",
            [customerId]
        );
        if (rows.length === 0)
            return res.status(404).json({ message: "Customer not found" });

        const oneCustomer = structureData(rows);
        res.status(200).json(oneCustomer);
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: "All fields are required" });

        const { rows } = await pool.query(
            "SELECT * FROM customer WHERE email = $1 AND password = $2",
            [email, password]
        );
        if (rows.length === 0)
            return res
                .status(401)
                .json({ message: "Invalid email or password" });

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        next(error);
    }
};

const patchCustomer = async (req, res, next) => {
    try {
        const { customerId } = req.params;
        const { username, email, password, firstName, lastName } = req.body;

        const customer = await getCustomerById(customerId);
        if (!customer)
            return res.status(404).json({ message: "Customer not found" });

        customer.customerId = customerId;

        if (username) customer.username = username;

        if (email) customer.email = email;

        if (password) customer.password = password;

        if (firstName) customer.firstName = firstName;

        if (lastName) customer.lastName = lastName;

        await updateCustomer(customer);
    } catch (error) {
        next(error);
    }

    async function getCustomerById(customerId) {
        const queryText = "SELECT * FROM customer WHERE customer_id = $1";
        const { rows } = await pool.query(queryText, [customerId]);
        if (rows.length === 0) return null;
        return rows[0];
    }

    async function updateCustomer(customer) {
        try {
            // customer.customer_id is primary key, so no need to update it
            const queryText =
                "UPDATE customer SET username = $1, email = $2, password = $3, first_name = $4, last_name = $5 WHERE customer_id = $6";
            await pool.query(queryText, [
                customer.username,
                customer.email,
                customer.password,
                customer.firstName,
                customer.lastName,
                customer.customerId,
            ]);
        } catch (error) {
            await pool.query("ROLLBACK");
            throw error;
        }
    }
};

// WISHLIST

const deleteWishlist = async (req, res, next) => {
    try {
        // wishlist is connected customerId and inventory_id, so just need to delete wishlist_id
        const { wishlistId } = req.params;
        await deleteWishlist(wishlistId);
        res.status(200).json({ message: "Wishlist deleted successfully" });
    } catch (error) {
        next(error);
    }

    async function deleteWishlist(wishlistId) {
        try {
            const queryText = "DELETE FROM wishlist WHERE wishlist_id = $1";
            await pool.query(queryText, [wishlistId]);
            await pool.query("COMMIT");
        } catch (error) {
            await pool.query("ROLLBACK");
            throw error;
        }
    }
};

const addWishlist = async (req, res, next) => {
    try {
        const { customerId, inventoryId } = req.body;

        if (!customerId || !inventoryId)
            return res
                .status(400)
                .json({ message: "Customer ID and Inventory ID are required" });

        if (await isWishlistExist(customerId, inventoryId))
            return res.status(400).json({ message: "Wishlist already exists" });

        await insertWishlist(customerId, inventoryId);
        res.status(201).json({ message: "Wishlist added successfully" });
    } catch (error) {
        next(error);
    }

    async function isWishlistExist(customerId, inventoryId) {
        const queryText =
            "SELECT * FROM wishlist WHERE customer_id = $1 AND inventory_id = $2";
        const { rows } = await pool.query(queryText, [customerId, inventoryId]);
        return rows.length > 0;
    }

    async function insertWishlist(customerId, inventoryId) {
        try {
            const queryText =
                "INSERT INTO wishlist (customer_id, inventory_id) VALUES ($1, $2)";
            await pool.query(queryText, [customerId, inventoryId]);
            await pool.query("COMMIT");
        } catch (error) {
            await pool.query("ROLLBACK");
            throw error;
        }
    }
};


// there exist customer_location table so just need  delete customer_location_id
const deleteCustomerAddress = async (req, res, next) => {
    try {
        const { customerLocationId } = req.params;
        await deleteCustomerLocation(customerLocationId);
        res.status(200).json({ message: "Address deleted successfully" });
    } catch (error) {
        next(error);
    }

    async function deleteCustomerLocation(customerLocationId) {
        try {
            const queryText =
                "DELETE FROM customer_location WHERE customer_location_id = $1";
            await pool.query(queryText, [customerLocationId]);
            await pool.query("COMMIT");
        } catch (error) {
            await pool.query("ROLLBACK");
            throw error;
        }
    }
}

// address: 'Jl. Gatot Subroto No. 12', city: 'Jakarta', postal_code: '12930', district: 'Cengkareng', country: 'Indonesia'
const addAddress = async (req, res, next) => {
    try {
        const { customerId } = req.params;
        const { address, city, postalCode, district, country } = req.body;

        if (!address || !city || !postalCode || !district || !country)
            return res.status(400).json({ message: "All fields are required" });

        const address_id = await fullInsertAddress(customerId, address, city, postalCode, district, country);

        await insertCustomerLocation(customerId, address_id);
        res.status(201).json({ message: "Address added successfully" });
    } catch (error) {
        next(error);
    }

    async function insertCustomerLocation(customerId, address_id) {
        try {
            const queryText =
                "INSERT INTO customer_location (customer_id, address_id) VALUES ($1, $2)";
            await pool.query(queryText, [customerId, address_id]);
            await pool.query("COMMIT");
        } catch (error) {
            await pool.query("ROLLBACK");
            throw error;
        }
    }
}


module.exports = {
    register,
    login,
    customerList,
    oneCustomer,
    patchCustomer,
    deleteWishlist,
    addWishlist,
    deleteCustomerAddress,
    addAddress
};
