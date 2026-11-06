<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>StockFlow | Categories</title>

    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

    <?php include 'includes/sidebar.php'; ?>

    <main class="main-content">

        <header class="topbar">
            <div>
                <h3>Categories</h3>
                <p>Organize and manage your product categories.</p>
            </div>
        </header>

        <section class="products-section">

            <div class="products-heading">
                <div>
                    <h2>Category List</h2>
                    <p>Manage your inventory categories.</p>
                </div>

                <button class="add-btn" onclick="openCategoryModal()">
                    + Add Category
                </button>
            </div>

            <div class="products-toolbar">
                <input
                    type="text"
                    id="categorySearch"
                    placeholder="Search categories..."
                >
            </div>

            <div class="table-container">

                <table>
                    <thead>
                        <tr>
                            <th>Category Name</th>
                            <th>Description</th>
                            <th>Total Products</th>
                            <th>Date Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody id="categoryTable"></tbody>
                </table>

            </div>

        </section>

    </main>

    <!-- Category Modal -->

    <div class="modal-overlay" id="categoryModal">

        <div class="modal">

            <div class="modal-header">
                <div>
                    <h2 id="categoryModalTitle">Add Category</h2>
                    <p>Enter the category information below.</p>
                </div>

                <button class="close-btn" onclick="closeCategoryModal()">
                    &times;
                </button>
            </div>

            <form id="categoryForm">

                <input type="hidden" id="categoryId">

                <div class="form-group">
                    <label for="categoryName">Category Name</label>
                    <input type="text" id="categoryName" required>
                </div>

                <div class="form-group">
                    <label for="categoryDescription">Description</label>
                    <textarea
                        id="categoryDescription"
                        rows="4"
                        placeholder="Enter category description..."
                    ></textarea>
                </div>

                <div class="modal-actions">

                    <button
                        type="button"
                        class="cancel-btn"
                        onclick="closeCategoryModal()"
                    >
                        Cancel
                    </button>

                    <button type="submit" class="save-btn">
                        Save Category
                    </button>

                </div>

            </form>

        </div>

    </div>

    <script src="assets/js/script.js"></script>

</body>
</html>