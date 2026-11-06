const defaultSettings = {
    storeName: "StockFlow Inventory",
    currency: "PHP",
    lowStockThreshold: 10,
    dateFormat: "YYYY-MM-DD"
};

let inventorySettings = {
    ...defaultSettings,
    ...(JSON.parse(localStorage.getItem("inventorySettings")) || {})
};

// Currency formatter
function formatCurrency(amount) {
    return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: inventorySettings.currency
    }).format(Number(amount) || 0);
}

// Date formatter
function formatDate(date) {
    if (!date) return "";

    const parts = date.split("-");

    if (parts.length !== 3) return date;

    const [year, month, day] = parts;

    switch (inventorySettings.dateFormat) {
        case "MM/DD/YYYY":
            return `${month}/${day}/${year}`;

        case "DD/MM/YYYY":
            return `${day}/${month}/${year}`;

        default:
            return `${year}-${month}-${day}`;
    }
}

// Get product stock status
function getStockStatus(quantity) {
    if (Number(quantity) <= 0) {
        return "Out of Stock";
    }

    if (Number(quantity) <= inventorySettings.lowStockThreshold) {
        return "Low Stock";
    }

    return "In Stock";
}

// Save settings
function saveSettings() {
    localStorage.setItem(
        "inventorySettings",
        JSON.stringify(inventorySettings)
    );
}

// Load settings into the form
function loadSettings() {
    const storeName = document.getElementById("storeName");

    if (!storeName) return;

    document.getElementById("storeName").value =
        inventorySettings.storeName;

    document.getElementById("currency").value =
        inventorySettings.currency;

    document.getElementById("lowStockThreshold").value =
        inventorySettings.lowStockThreshold;

    document.getElementById("dateFormat").value =
        inventorySettings.dateFormat;
}

function updateBusinessName() {
    const businessName = document.getElementById("businessName");

    if (businessName) {
        businessName.textContent = inventorySettings.storeName;
    }
}

updateBusinessName();

// Initialize Settings page
const settingsForm = document.getElementById("settingsForm");

if (settingsForm) {

    loadSettings();

    // Save form changes
    settingsForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const threshold = Number(
            document.getElementById("lowStockThreshold").value
        );

        if (!Number.isInteger(threshold) || threshold < 0) {
            alert("Please enter a valid low-stock threshold.");
            return;
        }

        inventorySettings = {
            storeName: document.getElementById("storeName").value.trim(),
            currency: document.getElementById("currency").value,
            lowStockThreshold: threshold,
            dateFormat: document.getElementById("dateFormat").value
        };

        if (!inventorySettings.storeName) {
            alert("Please enter a business name.");
            return;
        }

        saveSettings();
        updateBusinessName();

        alert("Settings saved successfully!");
    });

    // Reset settings
    document.getElementById("resetSettings").addEventListener(
        "click",
        function() {
            const confirmReset = confirm(
                "Are you sure you want to reset all settings?"
            );

            if (!confirmReset) return;

            inventorySettings = { ...defaultSettings };

            saveSettings();
            loadSettings();
            updateBusinessName();

            alert("Settings have been reset to default.");
        }
    );
}

const navLinks = document.querySelectorAll(".nav-link");

const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach(link => {

    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
        link.classList.add("active");
    } else {
        link.classList.remove("active");
    }

});

const defaultProducts = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 2499,
        quantity: 25
    },
    {
        id: 2,
        name: "Mechanical Keyboard",
        category: "Accessories",
        price: 3299,
        quantity: 8
    },
    {
        id: 3,
        name: "Office Chair",
        category: "Furniture",
        price: 4500,
        quantity: 0
    },
    {
        id: 4,
        name: "Wireless Mouse",
        category: "Accessories",
        price: 899,
        quantity: 15
    }
];

// Load products from localStorage
let products = JSON.parse(
    localStorage.getItem("inventoryProducts")
) || defaultProducts;

function saveProducts() {
    localStorage.setItem(
        "inventoryProducts",
        JSON.stringify(products)
    );
}

// Display products
function displayProducts() {

    const table = document.getElementById("productTable");

    if (!table) return;

    const searchValue = document
        .getElementById("searchInput").value.toLowerCase();

    const categoryValue = document
        .getElementById("categoryFilter").value;

    const filteredProducts = products.filter(product => {

        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchValue);

        const matchesCategory = categoryValue === "" ||
            product.category === categoryValue;

        return matchesSearch && matchesCategory;
    });

    table.innerHTML = "";

    if (filteredProducts.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="6">No products found.</td>
            </tr>
        `;
        return;
    }

    filteredProducts.forEach(product => {

        const status = getStockStatus(product.quantity);

        let statusClass = "";

        if (status === "Out of Stock") {
            statusClass = "out-stock";
        } else if (status === "Low Stock") {
            statusClass = "low-stock";
        } else {
            statusClass = "in-stock";
        }

        table.innerHTML += `
            <tr>
                <td>${escapeHTML(product.name)}</td>
                <td>${escapeHTML(product.category)}</td>
                <td>${formatCurrency(product.price)}</td>
                <td>${product.quantity}</td>
                <td>
                    <span class="status ${statusClass}">
                        ${status}
                    </span>
                </td>
                <td>
                    <button class="action-btn edit-btn"
                        onclick="editProduct(${product.id})">
                        Edit
                    </button>

                    <button class="action-btn delete-btn"
                        onclick="deleteProduct(${product.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

// Escape user-provided text before inserting it into HTML
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

// Open modal
function openModal() {

    document.getElementById("productForm").reset();

    document.getElementById("productId").value = "";

    document.getElementById("modalTitle").textContent =
        "Add Product";

    document.querySelector(".save-btn").textContent =
        "Save Product";

    document.getElementById("productModal").classList.add("show");
}

// Close modal
function closeModal() {
    document.getElementById("productModal").classList.remove("show");
}

// Add or Edit Product
const productForm = document.getElementById("productForm");

if (productForm) {

    productForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const id = document.getElementById("productId").value;
        const name = document.getElementById("productName").value.trim();
        const category = document.getElementById("productCategory").value;
        const price = Number(document.getElementById("productPrice").value);
        const quantity = Number(document.getElementById("productQuantity").value);

        if (
            !name ||
            !category ||
            !Number.isFinite(price) ||
            price < 0 ||
            !Number.isInteger(quantity) ||
            quantity < 0
        ) {
            alert("Please enter valid product information.");
            return;
        }

        if (id) {

            // Update existing product
            const product = products.find(
                product => product.id === Number(id)
            );

            if (product) {
                product.name = name;
                product.category = category;
                product.price = price;
                product.quantity = quantity;
            }

        } else {

            // Add new product
            const newProduct = {
                id: Date.now(),
                name,
                category,
                price,
                quantity
            };

            products.push(newProduct);
        }

        saveProducts();
        displayProducts();
        closeModal();

    });
}

// Edit Product
function editProduct(id) {

    const product = products.find(
        product => product.id === id
    );

    if (!product) return;

    document.getElementById("productId").value = product.id;
    document.getElementById("productName").value = product.name;
    document.getElementById("productCategory").value = product.category;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productQuantity").value = product.quantity;

    document.getElementById("modalTitle").textContent =
        "Edit Product";

    document.querySelector(".save-btn").textContent =
        "Update Product";

    document.getElementById("productModal").classList.add("show");
}

// Delete Product
function deleteProduct(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    products = products.filter(
        product => product.id !== id
    );

    saveProducts();
    displayProducts();
}

// Search and category filters
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

if (searchInput && categoryFilter) {
    searchInput.addEventListener("input", displayProducts);
    categoryFilter.addEventListener("change", displayProducts);
}

// Initial display
displayProducts();

// Default categories
const defaultCategories = [
    {
        id: 1,
        name: "Electronics",
        description: "Electronic devices and equipment",
        dateCreated: "2026-11-01"
    },
    {
        id: 2,
        name: "Accessories",
        description: "Computer and electronic accessories",
        dateCreated: "2026-11-01"
    },
    {
        id: 3,
        name: "Furniture",
        description: "Office and home furniture",
        dateCreated: "2026-11-01"
    }
];

// Load categories from localStorage
let categories = JSON.parse(
    localStorage.getItem("inventoryCategories")
) || defaultCategories;

function saveCategories() {
    localStorage.setItem(
        "inventoryCategories",
        JSON.stringify(categories)
    );
}

// Display categories
function displayCategories() {

    const table = document.getElementById("categoryTable");

    if (!table) return;

    const searchValue = document
        .getElementById("categorySearch")
        .value.toLowerCase();

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchValue)
    );

    table.innerHTML = "";

    if (filteredCategories.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="5">No categories found.</td>
            </tr>
        `;
        return;
    }

    filteredCategories.forEach(category => {

        const totalProducts = products.filter(product =>
            product.category === category.name
        ).length;

        table.innerHTML += `
            <tr>
                <td>${escapeHTML(category.name)}</td>

                <td>${escapeHTML(category.description || "-")}</td>

                <td>
                    <span class="category-count">
                        ${totalProducts} Products
                    </span>
                </td>

                <td>${escapeHTML(category.dateCreated)}</td>

                <td>
                    <div class="category-actions">

                        <button
                            class="action-btn edit-btn"
                            onclick="editCategory(${category.id})">
                            Edit
                        </button>

                        <button
                            class="action-btn delete-btn"
                            onclick="deleteCategory(${category.id})">
                            Delete
                        </button>

                    </div>
                </td>
            </tr>
        `;
    });
}

function openCategoryModal() {

    document.getElementById("categoryForm").reset();

    document.getElementById("categoryId").value = "";

    document.getElementById("categoryModalTitle").textContent =
        "Add Category";

    document.querySelector("#categoryForm .save-btn").textContent =
        "Save Category";

    document.getElementById("categoryModal").classList.add("show");
}

// Close category modal
function closeCategoryModal() {
    document.getElementById("categoryModal").classList.remove("show");
}

// Add or update category
const categoryForm = document.getElementById("categoryForm");

if (categoryForm) {

    categoryForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const id = document.getElementById("categoryId").value;

        const name = document.getElementById("categoryName").value.trim();

        const description = document
            .getElementById("categoryDescription").value.trim();

        // Check for duplicate category names
        const duplicate = categories.some(category =>
            category.name.toLowerCase() === name.toLowerCase() &&
            category.id !== Number(id)
        );

        if (duplicate) {
            alert("This category already exists.");
            return;
        }

        if (id) {

            // Update existing category
            const category = categories.find(
                category => category.id === Number(id)
            );

            if (category) {

                const oldName = category.name;

                category.name = name;
                category.description = description;

                // Update products using the old category name
                products.forEach(product => {
                    if (product.category === oldName) {
                        product.category = name;
                    }
                });

                saveProducts();
            }

        } else {

            // Add new category
            categories.push({
                id: Date.now(),
                name: name,
                description: description,
                dateCreated: new Date().toISOString().split("T")[0]
            });

        }

        saveCategories();
        displayCategories();
        displayProducts();
        updateProductCategoryOptions();

        closeCategoryModal();

    });
}

// Edit category
function editCategory(id) {

    const category = categories.find(
        category => category.id === id
    );

    if (!category) return;

    document.getElementById("categoryId").value = category.id;

    document.getElementById("categoryName").value = category.name;

    document.getElementById("categoryDescription").value =
        category.description;

    document.getElementById("categoryModalTitle").textContent =
        "Edit Category";

    document.querySelector("#categoryForm .save-btn").textContent =
        "Update Category";

    document.getElementById("categoryModal").classList.add("show");
}

// Delete category
function deleteCategory(id) {

    const category = categories.find(
        category => category.id === id
    );

    if (!category) return;

    // Prevent deleting categories that contain products
    const hasProducts = products.some(product =>
        product.category === category.name
    );

    if (hasProducts) {
        alert("Cannot delete this category because it has existing products.");
        return;
    }

    const confirmDelete = confirm(
        `Are you sure you want to delete ${category.name}?`
    );

    if (!confirmDelete) return;

    categories = categories.filter(
        category => category.id !== id
    );

    saveCategories();
    displayCategories();
    updateProductCategoryOptions();
}

// Search categories
const categorySearch = document.getElementById("categorySearch");

if (categorySearch) {
    categorySearch.addEventListener("input", displayCategories);
}

// Update category dropdowns on Products page
function updateProductCategoryOptions() {

    const productCategory = document.getElementById("productCategory");
    const categoryFilter = document.getElementById("categoryFilter");

    if (productCategory) {

        const selectedValue = productCategory.value;

        productCategory.innerHTML = `
            <option value="">Select Category</option>
        `;

        categories.forEach(category => {
            productCategory.innerHTML += `
                <option value="${escapeHTML(category.name)}">
                    ${escapeHTML(category.name)}
                </option>
            `;
        });

        productCategory.value = selectedValue;
    }

    if (categoryFilter) {

        const selectedValue = categoryFilter.value;

        categoryFilter.innerHTML = `
            <option value="">All Categories</option>
        `;

        categories.forEach(category => {
            categoryFilter.innerHTML += `
                <option value="${escapeHTML(category.name)}">
                    ${escapeHTML(category.name)}
                </option>
            `;
        });

        categoryFilter.value = selectedValue;
    }
}

// Initialize categories
saveCategories();
displayCategories();
updateProductCategoryOptions();


// Default suppliers
const defaultSuppliers = [
    {
        id: 1,
        name: "TechSource Philippines",
        contactPerson: "Juan Santos",
        email: "sales@techsource.com",
        phone: "09171234567",
        address: "Quezon City, Philippines",
        dateCreated: "2026-11-01"
    },
    {
        id: 2,
        name: "Office Essentials Co.",
        contactPerson: "Maria Reyes",
        email: "info@officeessentials.com",
        phone: "09181234567",
        address: "Makati City, Philippines",
        dateCreated: "2026-11-02"
    },
    {
        id: 3,
        name: "Digital Components Inc.",
        contactPerson: "Pedro Cruz",
        email: "contact@digitalcomponents.com",
        phone: "09191234567",
        address: "Manila, Philippines",
        dateCreated: "2026-11-03"
    }
];

// Load suppliers from localStorage
let suppliers = JSON.parse(
    localStorage.getItem("inventorySuppliers")
) || defaultSuppliers;

function saveSuppliers() {
    localStorage.setItem(
        "inventorySuppliers",
        JSON.stringify(suppliers)
    );
}

// Display suppliers
function displaySuppliers() {

    const table = document.getElementById("supplierTable");

    if (!table) return;

    const searchValue = document
        .getElementById("supplierSearch")
        .value.toLowerCase();

    const filteredSuppliers = suppliers.filter(supplier => {

        return (
            supplier.name.toLowerCase().includes(searchValue) ||
            supplier.contactPerson.toLowerCase().includes(searchValue) ||
            supplier.email.toLowerCase().includes(searchValue)
        );

    });

    table.innerHTML = "";

    if (filteredSuppliers.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="6">No suppliers found.</td>
            </tr>
        `;
        return;
    }

    filteredSuppliers.forEach(supplier => {

        table.innerHTML += `
            <tr>
                <td class="supplier-name">
                    ${escapeHTML(supplier.name)}
                </td>

                <td>${escapeHTML(supplier.contactPerson)}</td>

                <td>${escapeHTML(supplier.email)}</td>

                <td>${escapeHTML(supplier.phone)}</td>

                <td>${escapeHTML(supplier.address)}</td>

                <td>
                    <button
                        class="action-btn edit-btn"
                        onclick="editSupplier(${supplier.id})">
                        Edit
                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteSupplier(${supplier.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

function openSupplierModal() {

    document.getElementById("supplierForm").reset();

    document.getElementById("supplierId").value = "";

    document.getElementById("supplierModalTitle").textContent =
        "Add Supplier";

    document.querySelector("#supplierForm .save-btn").textContent =
        "Save Supplier";

    document.getElementById("supplierModal").classList.add("show");
}

// Close supplier modal
function closeSupplierModal() {
    document.getElementById("supplierModal").classList.remove("show");
}

// Add or update supplier
const supplierForm = document.getElementById("supplierForm");

if (supplierForm) {

    supplierForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const id = document.getElementById("supplierId").value;

        const name = document.getElementById("supplierName").value.trim();

        const contactPerson = document
            .getElementById("contactPerson").value.trim();

        const email = document
            .getElementById("supplierEmail").value.trim();

        const phone = document
            .getElementById("supplierPhone").value.trim();

        const address = document
            .getElementById("supplierAddress").value.trim();

        // Check for duplicate supplier names
        const duplicate = suppliers.some(supplier =>
            supplier.name.toLowerCase() === name.toLowerCase() &&
            supplier.id !== Number(id)
        );

        if (duplicate) {
            alert("This supplier already exists.");
            return;
        }

        if (id) {

            // Update existing supplier
            const supplier = suppliers.find(
                supplier => supplier.id === Number(id)
            );

            if (supplier) {
                supplier.name = name;
                supplier.contactPerson = contactPerson;
                supplier.email = email;
                supplier.phone = phone;
                supplier.address = address;
            }

        } else {

            // Add new supplier
            suppliers.push({
                id: Date.now(),
                name,
                contactPerson,
                email,
                phone,
                address,
                dateCreated: new Date().toISOString().split("T")[0]
            });

        }

        saveSuppliers();
        displaySuppliers();
        closeSupplierModal();

    });

}

// Edit supplier
function editSupplier(id) {

    const supplier = suppliers.find(
        supplier => supplier.id === id
    );

    if (!supplier) return;

    document.getElementById("supplierId").value = supplier.id;

    document.getElementById("supplierName").value = supplier.name;

    document.getElementById("contactPerson").value =
        supplier.contactPerson;

    document.getElementById("supplierEmail").value = supplier.email;

    document.getElementById("supplierPhone").value = supplier.phone;

    document.getElementById("supplierAddress").value =
        supplier.address;

    document.getElementById("supplierModalTitle").textContent =
        "Edit Supplier";

    document.querySelector("#supplierForm .save-btn").textContent =
        "Update Supplier";

    document.getElementById("supplierModal").classList.add("show");
}

// Delete supplier
function deleteSupplier(id) {

    const supplier = suppliers.find(
        supplier => supplier.id === id
    );

    if (!supplier) return;

    const confirmDelete = confirm(
        `Are you sure you want to delete ${supplier.name}?`
    );

    if (!confirmDelete) return;

    suppliers = suppliers.filter(
        supplier => supplier.id !== id
    );

    saveSuppliers();
    displaySuppliers();

}

// Search suppliers
const supplierSearch = document.getElementById("supplierSearch");

if (supplierSearch) {
    supplierSearch.addEventListener("input", displaySuppliers);
}

// Initialize suppliers
saveSuppliers();
displaySuppliers();


// Default stock-in transactions
const defaultStockIn = [];

// Load stock-in transactions
let stockInTransactions = JSON.parse(
    localStorage.getItem("inventoryStockIn")
) || defaultStockIn;

function saveStockIn() {
    localStorage.setItem(
        "inventoryStockIn",
        JSON.stringify(stockInTransactions)
    );
}

// Populate product and supplier dropdowns
function populateStockDropdowns() {

    const productSelect = document.getElementById("stockProduct");
    const supplierSelect = document.getElementById("stockSupplier");

    if (!productSelect || !supplierSelect) return;

    productSelect.innerHTML = `
        <option value="">Select Product</option>
    `;

    supplierSelect.innerHTML = `
        <option value="">Select Supplier</option>
    `;

    products.forEach(product => {
        productSelect.innerHTML += `
            <option value="${product.id}">
                ${escapeHTML(product.name)}
            </option>
        `;
    });

    suppliers.forEach(supplier => {
        supplierSelect.innerHTML += `
            <option value="${supplier.id}">
                ${escapeHTML(supplier.name)}
            </option>
        `;
    });
}

// Calculate total purchase cost
function calculateStockTotal() {

    const quantity = Number(
        document.getElementById("stockQuantity").value
    );

    const cost = Number(
        document.getElementById("stockCost").value
    );

    const total = quantity * cost;

    const totalElement = document.getElementById("stockTotal");

    if (totalElement) {
        totalElement.textContent = formatCurrency(total);
    }
}

function displayStockIn() {

    const table = document.getElementById("stockInTable");

    if (!table) return;

    const searchValue = document
        .getElementById("stockSearch")
        .value.toLowerCase();

    const filteredTransactions = stockInTransactions.filter(transaction => {

        return (
            transaction.productName.toLowerCase().includes(searchValue) ||
            transaction.reference.toLowerCase().includes(searchValue)
        );

    });

    table.innerHTML = "";

    if (filteredTransactions.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7">No stock-in transactions found.</td>
            </tr>
        `;

        return;
    }

    filteredTransactions.forEach(transaction => {

        table.innerHTML += `
            <tr>
                <td>${escapeHTML(transaction.reference)}</td>
                <td>${escapeHTML(transaction.productName)}</td>
                <td>${escapeHTML(transaction.supplierName)}</td>
                <td>${transaction.quantity}</td>
                <td>${formatCurrency(transaction.unitCost)}</td>
                <td>${formatCurrency(transaction.totalCost)}</td>
                <td>${formatDate(transaction.date)}</td>
            </tr>
        `;

    });
}

// Record incoming stock
const stockInForm = document.getElementById("stockInForm");

if (stockInForm) {

    const quantityInput = document.getElementById("stockQuantity");
    const costInput = document.getElementById("stockCost");
    const stockSearch = document.getElementById("stockSearch");

    quantityInput.addEventListener("input", calculateStockTotal);
    costInput.addEventListener("input", calculateStockTotal);

    stockSearch.addEventListener("input", displayStockIn);

    stockInForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const productId = Number(
            document.getElementById("stockProduct").value
        );

        const supplierId = Number(
            document.getElementById("stockSupplier").value
        );

        const quantity = Number(quantityInput.value);
        const unitCost = Number(costInput.value);

        const date = document.getElementById("stockDate").value;

        const reference = document
            .getElementById("stockReference").value.trim();

        const product = products.find(
            product => product.id === productId
        );

        const supplier = suppliers.find(
            supplier => supplier.id === supplierId
        );

        if (!product || !supplier) {
            alert("Please select a valid product and supplier.");
            return;
        }

        if (
            !Number.isInteger(quantity) ||
            quantity <= 0 ||
            !Number.isFinite(unitCost) ||
            unitCost < 0 ||
            !date ||
            !reference
        ) {
            alert("Please enter valid transaction information.");
            return;
        }

        const duplicateReference = stockInTransactions.some(
            transaction =>
                transaction.reference.toLowerCase() === reference.toLowerCase()
        );

        if (duplicateReference) {
            alert("This reference number already exists.");
            return;
        }

        const totalCost = quantity * unitCost;

        // Increase product inventory
        product.quantity += quantity;

        // Create stock-in transaction
        const newTransaction = {
            id: Date.now(),
            reference,
            productId,
            productName: product.name,
            supplierId,
            supplierName: supplier.name,
            quantity,
            unitCost,
            totalCost,
            date
        };

        stockInTransactions.unshift(newTransaction);

        // Save updated inventory and transaction
        saveProducts();
        saveStockIn();

        // Refresh the page data
        displayStockIn();
        displayProducts();

        stockInForm.reset();

        document.getElementById("stockDate").value =
            new Date().toISOString().split("T")[0];

        calculateStockTotal();

        alert("Stock received successfully!");

    });

}

// Initialize Stock In page
if (document.getElementById("stockInForm")) {

    populateStockDropdowns();

    document.getElementById("stockDate").value =
        new Date().toISOString().split("T")[0];

    calculateStockTotal();
    displayStockIn();
}

const defaultStockOut = [];

let stockOutTransactions =
    JSON.parse(localStorage.getItem("inventoryStockOut")) || defaultStockOut;

// Save Stock Out transactions
function saveStockOut() {
    localStorage.setItem(
        "inventoryStockOut",
        JSON.stringify(stockOutTransactions)
    );
}

// Populate product dropdown
function populateStockOutProducts() {
    const productDropdown = document.getElementById("outProduct");

    if (!productDropdown) return;

    productDropdown.innerHTML = `
        <option value="">Select a product</option>
    `;

    products.forEach(product => {
        const option = document.createElement("option");

        option.value = product.id;
        option.textContent = `${product.name} (${product.quantity} available)`;

        productDropdown.appendChild(option);
    });
}

// Display available stock for selected product
function updateAvailableStock() {
    const productId = Number(document.getElementById("outProduct").value);
    const availableDisplay = document.getElementById("outAvailable");
    const quantityInput = document.getElementById("outQuantity");

    const selectedProduct = products.find(
        product => product.id === productId
    );

    if (!selectedProduct) {
        availableDisplay.textContent = "Select a product";
        quantityInput.max = "";
        return;
    }

    availableDisplay.textContent = `${selectedProduct.quantity} units`;
    quantityInput.max = selectedProduct.quantity;
}

function displayStockOut() {
    const table = document.getElementById("stockOutTable");

    if (!table) return;

    const searchInput = document.getElementById("stockOutSearch");
    const searchTerm = searchInput.value.toLowerCase();

    const filteredTransactions = stockOutTransactions.filter(transaction => {
        return (
            transaction.productName.toLowerCase().includes(searchTerm) ||
            transaction.reference.toLowerCase().includes(searchTerm)
        );
    });

    if (filteredTransactions.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="5">No stock out transactions found.</td>
            </tr>
        `;
        return;
    }

    table.innerHTML = filteredTransactions.map(transaction => `
        <tr>
            <td>${escapeHTML(transaction.reference)}</td>
            <td>${escapeHTML(transaction.productName)}</td>
            <td>${transaction.quantity}</td>
            <td>${escapeHTML(transaction.reason)}</td>
            <td>${formatDate(transaction.date)}</td>
        </tr>
    `).join("");
}

// Handle Stock Out form
const stockOutForm = document.getElementById("stockOutForm");

if (stockOutForm) {

    const productDropdown = document.getElementById("outProduct");
    const quantityInput = document.getElementById("outQuantity");
    const reasonInput = document.getElementById("outReason");
    const dateInput = document.getElementById("outDate");
    const referenceInput = document.getElementById("outReference");

    populateStockOutProducts();

    // Set today's date using the local date
    const today = new Date();
    const localDate = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    dateInput.value = localDate;

    // Update available stock when product changes
    productDropdown.addEventListener("change", updateAvailableStock);

    // Search Stock Out history
    document.getElementById("stockOutSearch").addEventListener(
        "input",
        displayStockOut
    );

    // Submit Stock Out transaction
    stockOutForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const productId = Number(productDropdown.value);
        const quantity = Number(quantityInput.value);
        const reason = reasonInput.value;
        const date = dateInput.value;
        const reference = referenceInput.value.trim();

        const selectedProduct = products.find(
            product => product.id === productId
        );

        // Validate product
        if (!selectedProduct) {
            alert("Please select a valid product.");
            return;
        }

        // Validate quantity
        if (!Number.isInteger(quantity) || quantity <= 0) {
            alert("Please enter a valid whole-number quantity.");
            return;
        }

        // Prevent releasing more than available stock
        if (quantity > selectedProduct.quantity) {
            alert(
                `Insufficient stock. Only ${selectedProduct.quantity} units are available.`
            );
            return;
        }

        // Validate other required fields
        if (!reason || !date || !reference) {
            alert("Please complete all required fields.");
            return;
        }

        // Prevent duplicate reference numbers
        const duplicateReference = stockOutTransactions.some(
            transaction =>
                transaction.reference.toLowerCase() === reference.toLowerCase()
        );

        if (duplicateReference) {
            alert("This reference number already exists in Stock Out history.");
            return;
        }

        // Deduct product quantity
        selectedProduct.quantity -= quantity;

        // Create transaction record
        const transaction = {
            id: Date.now(),
            reference: reference,
            productId: selectedProduct.id,
            productName: selectedProduct.name,
            quantity: quantity,
            reason: reason,
            date: date
        };

        // Save transaction
        stockOutTransactions.unshift(transaction);

        saveProducts();
        saveStockOut();

        // Refresh product and transaction displays
        populateStockOutProducts();
        updateAvailableStock();
        displayStockOut();

        // Refresh product table if it exists
        if (typeof displayProducts === "function") {
            displayProducts();
        }

        // Reset form
        stockOutForm.reset();
        dateInput.value = localDate;

        updateAvailableStock();

        alert("Stock Out transaction recorded successfully!");
    });

    displayStockOut();
}

const reportProductTable = document.getElementById("reportProductTable");

if (reportProductTable) {

    function getReportStockStatus(quantity) {
        return getStockStatus(quantity);
    }

    function formatReportCurrency(amount) {
        return formatCurrency(amount);
    }

    // Calculate and display report summaries
    function displayReportSummary() {

        const totalProducts = products.length;

        const totalUnits = products.reduce(
            (total, product) => total + Number(product.quantity),
            0
        );

        const inventoryValue = products.reduce(
            (total, product) =>
                total + (Number(product.price) * Number(product.quantity)),
            0
        );

        const lowStockProducts = products.filter(
            product => product.quantity > 0 &&
            product.quantity <= inventorySettings.lowStockThreshold
        ).length;

        const outOfStockProducts = products.filter(
            product => product.quantity === 0
        ).length;

        const totalStockInUnits = stockInTransactions.reduce(
            (total, transaction) => total + Number(transaction.quantity),
            0
        );

        const totalStockOutUnits = stockOutTransactions.reduce(
            (total, transaction) => total + Number(transaction.quantity),
            0
        );

        document.getElementById("reportTotalProducts").textContent =
            totalProducts;

        document.getElementById("reportTotalUnits").textContent =
            totalUnits;

        document.getElementById("reportInventoryValue").textContent =
            formatReportCurrency(inventoryValue);

        document.getElementById("reportLowStock").textContent =
            lowStockProducts;

        document.getElementById("reportOutOfStock").textContent =
            outOfStockProducts;

        document.getElementById("reportStockInTransactions").textContent =
            stockInTransactions.length;

        document.getElementById("reportStockInUnits").textContent =
            `${totalStockInUnits} units received`;

        document.getElementById("reportStockOutTransactions").textContent =
            stockOutTransactions.length;

        document.getElementById("reportStockOutUnits").textContent =
            `${totalStockOutUnits} units released`;
    }


    // Display inventory report table
    function displayInventoryReport() {

        const searchTerm = document
            .getElementById("reportSearch")
            .value
            .toLowerCase();

        const selectedStatus = document
            .getElementById("reportStatusFilter")
            .value;

        const filteredProducts = products.filter(product => {

            const matchesSearch =
                product.name.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm);

            const status = getReportStockStatus(
                Number(product.quantity)
            );

            const matchesStatus =
                selectedStatus === "All" || status === selectedStatus;

            return matchesSearch && matchesStatus;
        });


        if (filteredProducts.length === 0) {
            reportProductTable.innerHTML = `
                <tr>
                    <td colspan="6">No products found.</td>
                </tr>
            `;
            return;
        }


        reportProductTable.innerHTML = filteredProducts.map(product => {

            const price = Number(product.price);
            const quantity = Number(product.quantity);
            const totalValue = price * quantity;

            const status = getReportStockStatus(quantity);

            let statusClass = "in-stock";

            if (status === "Low Stock") {
                statusClass = "low-stock";
            } else if (status === "Out of Stock") {
                statusClass = "out-of-stock";
            }

            return `
                <tr>
                    <td>${escapeHTML(product.name)}</td>
                    <td>${escapeHTML(product.category)}</td>
                    <td>${formatReportCurrency(price)}</td>
                    <td>${quantity}</td>
                    <td>${formatReportCurrency(totalValue)}</td>
                    <td>
                        <span class="status-badge ${statusClass}">
                            ${status}
                        </span>
                    </td>
                </tr>
            `;

        }).join("");
    }

    // Search and filter events
    document.getElementById("reportSearch").addEventListener(
        "input",
        displayInventoryReport
    );

    document.getElementById("reportStatusFilter").addEventListener(
        "change",
        displayInventoryReport
    );


    // Print report
    document.getElementById("printReportBtn").addEventListener(
        "click",
        function() {
            window.print();
        }
    );


    // Initialize reports
    displayReportSummary();
    displayInventoryReport();
}
