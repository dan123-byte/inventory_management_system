<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>StockFlow | Suppliers</title>

    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

    <?php include 'includes/sidebar.php'; ?>

    <main class="main-content">

        <header class="topbar">
            <div>
                <h3>Suppliers</h3>
                <p>Manage your inventory suppliers.</p>
            </div>
        </header>

        <section class="products-section">

            <div class="products-heading">
                <div>
                    <h2>Supplier List</h2>
                    <p>View and manage your suppliers.</p>
                </div>

                <button class="add-btn" onclick="openSupplierModal()">
                    + Add Supplier
                </button>
            </div>

            <div class="products-toolbar">
                <input
                    type="text"
                    id="supplierSearch"
                    placeholder="Search suppliers..."
                >
            </div>

            <div class="table-container">

                <table>
                    <thead>
                        <tr>
                            <th>Supplier Name</th>
                            <th>Contact Person</th>
                            <th>Email Address</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody id="supplierTable"></tbody>
                </table>

            </div>

        </section>

    </main>

    <!-- Supplier Modal -->

    <div class="modal-overlay" id="supplierModal">

        <div class="modal">

            <div class="modal-header">
                <div>
                    <h2 id="supplierModalTitle">Add Supplier</h2>
                    <p>Enter the supplier information below.</p>
                </div>

                <button class="close-btn" onclick="closeSupplierModal()">
                    &times;
                </button>
            </div>

            <form id="supplierForm">

                <input type="hidden" id="supplierId">

                <div class="form-group">
                    <label for="supplierName">Supplier Name</label>
                    <input type="text" id="supplierName" required>
                </div>

                <div class="form-group">
                    <label for="contactPerson">Contact Person</label>
                    <input type="text" id="contactPerson" required>
                </div>

                <div class="form-group">
                    <label for="supplierEmail">Email Address</label>
                    <input type="email" id="supplierEmail" required>
                </div>

                <div class="form-group">
                    <label for="supplierPhone">Phone Number</label>
                    <input type="tel" id="supplierPhone" required>
                </div>

                <div class="form-group">
                    <label for="supplierAddress">Address</label>
                    <textarea
                        id="supplierAddress"
                        rows="3"
                        placeholder="Enter supplier address..."
                        required
                    ></textarea>
                </div>

                <div class="modal-actions">

                    <button
                        type="button"
                        class="cancel-btn"
                        onclick="closeSupplierModal()"
                    >
                        Cancel
                    </button>

                    <button type="submit" class="save-btn">
                        Save Supplier
                    </button>

                </div>

            </form>

        </div>

    </div>

    <script src="assets/js/script.js"></script>

</body>
</html>
