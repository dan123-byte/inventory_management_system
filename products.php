<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>StockFlow | Products</title>

    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

    <?php include 'includes/sidebar.php'; ?>

    <main class="main-content">

        <header class="topbar">
            <div>
                <h3>Products</h3>
                <p>Manage your inventory products.</p>
            </div>
        </header>

        <section class="products-section">

            <div class="products-heading">
                <div>
                    <h2>Product List</h2>
                    <p>View and manage all your products.</p>
                </div>

                <button class="add-btn" onclick="openModal()">
                    + Add Product
                </button>
            </div>

            <div class="products-toolbar">
                <input
                    type="text"
                    id="searchInput"
                    placeholder="Search products..."
                >

                <select id="categoryFilter">
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Furniture">Furniture</option>
                </select>
            </div>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody id="productTable">
                    </tbody>
                </table>
            </div>

        </section>

        <!-- Add / Edit Product Modal -->
        <div class="modal-overlay" id="productModal">

            <div class="modal">

                <div class="modal-header">
                    <div>
                        <h2 id="modalTitle">Add Product</h2>
                        <p>Enter the product information below.</p>
                    </div>

                    <button class="close-btn" onclick="closeModal()">
                        &times;
                    </button>
                </div>

                <form id="productForm">

                    <input type="hidden" id="productId">

                    <div class="form-group">
                        <label for="productName">Product Name</label>
                        <input type="text" id="productName" required>
                    </div>

                    <div class="form-group">
                        <label for="productCategory">Category</label>
                        <select id="productCategory" required>
                            <option value="">Select Category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Furniture">Furniture</option>
                        </select>
                    </div>

                    <div class="form-row">

                        <div class="form-group">
                            <label for="productPrice">Price (₱)</label>
                            <input type="number" id="productPrice" min="0" step="0.01" required>
                        </div>

                        <div class="form-group">
                            <label for="productQuantity">Quantity</label>
                            <input type="number" id="productQuantity" min="0" step="1" required>
                        </div>

                    </div>

                    <div class="modal-actions">
                        <button type="button" class="cancel-btn" onclick="closeModal()">
                            Cancel
                        </button>

                        <button type="submit" class="save-btn">
                            Save Product
                        </button>
                    </div>

                </form>

            </div>

        </div>

    </main>

    <script src="assets/js/script.js"></script>

</body>
</html>
