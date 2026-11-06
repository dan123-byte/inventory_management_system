<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>StockFlow | Stock In</title>

    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

    <?php include 'includes/sidebar.php'; ?>

    <main class="main-content">

        <header class="topbar">
            <div>
                <h3>Stock In</h3>
                <p>Record incoming inventory from suppliers.</p>
            </div>
        </header>

        <section class="products-section">

            <div class="products-heading">
                <div>
                    <h2>Receive Inventory</h2>
                    <p>Record newly received products.</p>
                </div>
            </div>

            <form id="stockInForm" class="transaction-form">

                <div class="form-row">

                    <div class="form-group">
                        <label for="stockProduct">Product</label>
                        <select id="stockProduct" required>
                            <option value="">Select Product</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="stockSupplier">Supplier</label>
                        <select id="stockSupplier" required>
                            <option value="">Select Supplier</option>
                        </select>
                    </div>

                </div>

                <div class="form-row">

                    <div class="form-group">
                        <label for="stockQuantity">Quantity Received</label>
                        <input
                            type="number"
                            id="stockQuantity"
                            min="1"
                            step="1"
                            placeholder="Enter quantity"
                            required
                        >
                    </div>

                    <div class="form-group">
                        <label for="stockCost">Purchase Cost Per Unit (₱)</label>
                        <input
                            type="number"
                            id="stockCost"
                            min="0"
                            step="0.01"
                            placeholder="Enter purchase cost"
                            required
                        >
                    </div>

                </div>

                <div class="form-row">

                    <div class="form-group">
                        <label for="stockDate">Transaction Date</label>
                        <input type="date" id="stockDate" required>
                    </div>

                    <div class="form-group">
                        <label for="stockReference">Reference Number</label>
                        <input
                            type="text"
                            id="stockReference"
                            placeholder="e.g. PO-001"
                            required
                        >
                    </div>

                </div>

                <div class="transaction-total">
                    <span>Total Purchase Cost</span>
                    <h2 id="stockTotal">₱0.00</h2>
                </div>

                <div class="modal-actions">
                    <button type="reset" class="cancel-btn">
                        Clear Form
                    </button>

                    <button type="submit" class="save-btn">
                        Receive Stock
                    </button>
                </div>

            </form>

        </section>

        <section class="products-section stock-history">

            <div class="products-heading">
                <div>
                    <h2>Stock In History</h2>
                    <p>Review previously received inventory.</p>
                </div>
            </div>

            <div class="products-toolbar">
                <input
                    type="text"
                    id="stockSearch"
                    placeholder="Search product or reference number..."
                >
            </div>

            <div class="table-container">

                <table>
                    <thead>
                        <tr>
                            <th>Reference No.</th>
                            <th>Product</th>
                            <th>Supplier</th>
                            <th>Quantity</th>
                            <th>Unit Cost</th>
                            <th>Total Cost</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody id="stockInTable"></tbody>
                </table>

            </div>

        </section>

    </main>

    <script src="assets/js/script.js"></script>

</body>
</html>