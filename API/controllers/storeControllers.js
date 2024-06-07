const Database = require("../config/connectDatabase");
const pool = Database.getPool();

const allStoreDetailsToInventory = async () => {
    const storeDetailsResult = await pool.query(
        "SELECT * FROM view_store_details"
    );
    const storeDetailsRows = storeDetailsResult.rows;

    // Transform the flat result set into hierarchical JSON structure
    const stores = {};

    storeDetailsRows.forEach((row) => {
        if (!stores[row.store_id]) {
            stores[row.store_id] = {
                store_id: row.store_id,
                store_name: row.store_name,
                store_address: row.store_address,
                store_district: row.store_district,
                store_postal_code: row.store_postal_code,
                store_city: row.store_city,
                store_country: row.store_country,
                staff: [],
                inventory: [],
            };
        }

        // Check if inventory item already exists in the store
        const existingInventoryItem = stores[row.store_id].inventory.find(
            (item) => item.inventory_id === row.inventory_id
        );

        if (!existingInventoryItem) {
            // Add inventory details
            const inventoryItem = {
                inventory_id: row.inventory_id,
                available_quantity: row.available_quantity,
                shelf_location: row.shelf_location,
                book: {
                    book_id: row.book_id,
                    book_title: row.book_title,
                    isbn: row.isbn,
                    pages: row.pages,
                    weight_in_grams: row.weight_in_grams,
                    synopsis: row.synopsis,
                    price: row.price,
                    book_created_at: row.book_created_at,
                    book_last_update: row.book_last_update,
                    publisher_name: row.publisher_name,
                    founded_year: row.founded_year,
                    language_name: row.language_name,
                    category_name: row.category_name,
                    author_first_name: row.author_first_name,
                    author_last_name: row.author_last_name,
                    full_name:
                        row.author_first_name + " " + row.author_last_name,
                    author_date_of_birth: row.author_date_of_birth,
                },
            };

            // Add inventory to the store
            stores[row.store_id].inventory.push(inventoryItem);
        }

        // Add staff details if not already added
        if (
            row.staff_id &&
            !stores[row.store_id].staff.find(
                (staff) => staff.staff_id === row.staff_id
            )
        ) {
            const staffItem = {
                staff_id: row.staff_id,
                staff_first_name: row.staff_first_name,
                staff_last_name: row.staff_last_name,
                staff_email: row.staff_email,
            };
            stores[row.store_id].staff.push(staffItem);
        }
    });

    // Convert stores object to array
    const storesArray = Object.values(stores);

    return storesArray;
};

// VIEW TO LOOK ALL DETAILS REALLY DETAILS TO view_store_details
const allStoreDetails = async (req, res) => {
    try {
        const stores = await allStoreDetailsToInventory();
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const oneStore = async (req, res) => {
    try {
        const storeId = req.params.storeId;
        if (!storeId) {
            return res.status(400).json({ message: "Store ID is required" });
        }

        const stores = await allStoreDetailsToInventory();
        const store = stores.find((store) => store.store_id == storeId);

        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }

        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const allCategory = async (req, res) => {
    try {
        const categoryResult = await pool.query(
            "SELECT category_name FROM category"
        );
        const categoryRows = categoryResult.rows;
        res.status(200).json(categoryRows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const bookByAuthor = async (req, res) => {
    try {
        const { storeId } = req.params;
        const { author } = req.body;

        if (!author) {
            return res.status(400).json({ message: "Author is required" });
        }

        const stores = await allStoreDetailsToInventory();

        const store = stores.find((store) => store.store_id == storeId);
        const inventoryStore = store.inventory;

        const regex = new RegExp(author, "i");

        const books = inventoryStore.filter((inventory) => {
            return regex.test(inventory.book.full_name);
        });

        res.status(200).json({ books });
        // using regex search for author
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const bookByCategory = async (req, res) => {
    try {
        const { storeId } = req.params;
        const { category } = req.body;

        if (!category) {
            return res.status(400).json({ message: "Category is required" });
        }

        const stores = await allStoreDetailsToInventory();

        const store = stores.find((store) => store.store_id == storeId);
        const inventoryStore = store.inventory;

        // incase sensitive search
        const books = inventoryStore.filter((inventory) => {
            return (
                inventory.book.category_name.toLowerCase() ===
                category.toLowerCase()
            );
        });
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const bookByName = async (req, res) => {
    try {
        const { storeId } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Book name is required" });
        }

        const stores = await allStoreDetailsToInventory();

        const store = stores.find((store) => store.store_id == storeId);
        const inventoryStore = store.inventory;

        const regex = new RegExp(name, "i");

        const books = inventoryStore.filter((inventory) => {
            return regex.test(inventory.book.book_title);
        });

        res.status(200).json({ books });
        // using regex search for book name
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// (book_id, store_id, shelf_location, quantity)
// we also need add staff_id to write inventory_log
const addInventory = async (req, res) => {
    try {
        const store_id = req.params.storeId;
        store_id;
        const { book_id, shelf_location, quantity, staff_id } = req.body;

        if (
            !book_id ||
            !store_id ||
            !shelf_location ||
            !quantity ||
            !staff_id
        ) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // check if inventory already exists
        const inventoryCheckResult = await pool.query(
            "SELECT * FROM inventory WHERE book_id = $1 AND store_id = $2",
            [book_id, store_id]
        );

        if (inventoryCheckResult.rows.length > 0) {
            return res
                .status(400)
                .json({ message: "Inventory already exists" });
        }

        // check if the staff work in the store
        const staff = await pool.query(
            "SELECT * FROM staff WHERE staff_id = $1",
            [staff_id]
        );
        if (staff.rows.length === 0) {
            return res.status(400).json({ message: "Staff does not exist" });
        }

        // check if staff work in the store
        if (parseInt(staff.rows[0].store_id) !== parseInt(store_id)) {
            return res
                .status(400)
                .json({ message: "Staff does not work in the store" });
        }

        await pool.query('BEGIN');

        const inventoryResult = await pool.query(
            "INSERT INTO inventory (book_id, store_id, shelf_location, quantity) VALUES ($1, $2, $3, $4) RETURNING *",
            [book_id, store_id, shelf_location, quantity]
        );

        const inventory = inventoryResult.rows[0];

        // INSERT INTO inventory_log (inventory_id, quantity, updated_by)
        await pool.query(
            "INSERT INTO inventory_log (inventory_id, quantity, updated_by) VALUES ($1, $2, $3)",
            [inventory.inventory_id, quantity, staff_id]
        );

        await pool.query('COMMIT');

        res.status(201).json({ inventory });
    } catch (error) {
        await pool.query('ROLLBACK');
        res.status(500).json({ message: error.message });
    }
};

const updateQuantity = async (req, res) => {
    try {
        const store_id = req.params.storeId;
        const inventory_id = req.params.inventoryId;
        const { quantity, staff_id } = req.body;

        if (!quantity || !staff_id) {
            return res.status(400).json({ message: "Quantity is required" });
        }

        // check if the staff work in the store
        const staff = await pool.query(
            "SELECT * FROM staff WHERE staff_id = $1",
            [staff_id]
        );
        if (staff.rows.length === 0) {
            return res.status(400).json({ message: "Staff does not exist" });
        }

        // check if staff work in the store
        if (parseInt(staff.rows[0].store_id) !== parseInt(store_id)) {
            return res
                .status(400)
                .json({ message: "Staff does not work in the store" });
        }

        // use TCL to UPDATE
        const inventoryResult = await pool.query(
            "UPDATE inventory SET quantity = quantity + $1 WHERE inventory_id = $2 RETURNING *",
            [quantity, inventory_id]
        );

        const inventory = inventoryResult.rows[0];
        
        await pool.query('BEGIN');
        // INSERT INTO inventory_log (inventory_id, quantity, updated_by)
        await pool.query(
            "INSERT INTO inventory_log (inventory_id, quantity, updated_by) VALUES ($1, $2, $3)",
            [inventory.inventory_id, quantity, staff_id]
        );

        await pool.query('COMMIT');
        res.status(200).json({ inventory });
    } catch (error) {
        await pool.query('ROLLBACK');
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    allStoreDetails,
    oneStore,
    allCategory,
    bookByAuthor,
    bookByCategory,
    bookByName,
    addInventory,
    updateQuantity,
};
