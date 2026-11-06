<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StockFlow | Stock Out</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

    <?php include 'includes/sidebar.php'; ?>

    <main class="main-content">
        <div class="products-section">

            <div class="products-heading">
                <div>
                    <h1>Stock Out</h1>
                    <p>Record products released from your inventory.</p>
                </div>
            </div>

            <div class="form-container">
                <h2>Record Stock Out</h2>

                <form id="stockOutForm" class="transaction-form">

                    <div class="form-row">
                        <div class="form-group">
                            <label for="outProduct">Product</label>
                            <select id="outProduct" required>
                                <option value="">Select a product</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="outQuantity">Quantity to Release</label>
                            <input type="number" id="outQuantity" min="1" step="1" required>
                        </div>
                    </div>

                    <div class="available-stock">
                        <span>Available Stock:</span>
                        <strong id="outAvailable">Select a product</strong>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="outReason">Reason</label>
                            <select id="outReason" required>
                                <option value="">Select a reason</option>
                                <option value="Sale">Sale</option>
                                <option value="Damaged">Damaged</option>
                                <option value="Returned to Supplier">Returned to Supplier</option>
                                <option value="Internal Use">Internal Use</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="outDate">Transaction Date</label>
                            <input type="date" id="outDate" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="outReference">Reference Number</label>
                        <input type="text" id="outReference" placeholder="e.g. OUT-001" required>
                    </div>

                    <button type="submit" class="add-btn">Record Stock Out</button>

                </form>
            </div>

            <div class="stock-history">
                <div class="products-toolbar">
                    <h2>Stock Out History</h2>
                    <input
                        type="text"
                        id="stockOutSearch"
                        placeholder="Search product or reference..."
                    >
                </div>

                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Reference</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Reason</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody id="stockOutTable"></tbody>
                    </table>
                </div>
            </div>

        </div>
    </main>

    <script src="assets/js/script.js"></script>
</body>
</html>