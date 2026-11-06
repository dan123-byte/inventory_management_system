<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StockFlow | Reports</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

    <?php include 'includes/sidebar.php'; ?>

    <main class="main-content">
        <div class="products-section">

            <div class="products-heading">
                <div>
                    <h1>Reports</h1>
                    <p>Monitor your inventory and stock movement.</p>
                </div>
                <button class="add-btn" id="printReportBtn" type="button">
                    Print Report
                </button>
            </div>

            <section class="report-summary">
                <div class="report-card">
                    <span>Total Products</span>
                    <h2 id="reportTotalProducts">0</h2>
                </div>

                <div class="report-card">
                    <span>Total Inventory Units</span>
                    <h2 id="reportTotalUnits">0</h2>
                </div>

                <div class="report-card">
                    <span>Inventory Value</span>
                    <h2 id="reportInventoryValue">₱0.00</h2>
                </div>

                <div class="report-card">
                    <span>Low Stock Products</span>
                    <h2 id="reportLowStock">0</h2>
                </div>

                <div class="report-card">
                    <span>Out of Stock Products</span>
                    <h2 id="reportOutOfStock">0</h2>
                </div>
            </section>

            <section class="report-movement">
                <div class="report-card">
                    <span>Total Stock In Transactions</span>
                    <h2 id="reportStockInTransactions">0</h2>
                    <p id="reportStockInUnits">0 units received</p>
                </div>

                <div class="report-card">
                    <span>Total Stock Out Transactions</span>
                    <h2 id="reportStockOutTransactions">0</h2>
                    <p id="reportStockOutUnits">0 units released</p>
                </div>
            </section>

            <section class="report-table-section">
                <div class="products-toolbar">
                    <h2>Inventory Report</h2>

                    <div class="report-filters">
                        <input
                            type="text"
                            id="reportSearch"
                            placeholder="Search products..."
                        >

                        <select id="reportStatusFilter">
                            <option value="All">All Statuses</option>
                            <option value="In Stock">In Stock</option>
                            <option value="Low Stock">Low Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                        </select>
                    </div>
                </div>

                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Inventory Value</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="reportProductTable"></tbody>
                    </table>
                </div>
            </section>

        </div>
    </main>

    <script src="assets/js/script.js"></script>
</body>
</html>