<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StockFlow | Settings</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

    <?php include 'includes/sidebar.php'; ?>

    <main class="main-content">
        <div class="products-section">

            <div class="products-heading">
                <div>
                    <h1>Settings</h1>
                    <p>Manage your inventory system preferences.</p>
                </div>
            </div>

            <form id="settingsForm">

                <div class="settings-card">
                    <h2>General Settings</h2>
                    <p>Configure your business information.</p>

                    <div class="form-group">
                        <label for="storeName">Business Name</label>
                        <input type="text" id="storeName" required>
                    </div>

                    <div class="form-group">
                        <label for="currency">Currency</label>
                        <select id="currency" required>
                            <option value="PHP">Philippine Peso (₱)</option>
                            <option value="USD">US Dollar ($)</option>
                            <option value="EUR">Euro (€)</option>
                            <option value="JPY">Japanese Yen (¥)</option>
                        </select>
                    </div>
                </div>

                <div class="settings-card">
                    <h2>Inventory Settings</h2>
                    <p>Configure how your inventory is monitored.</p>

                    <div class="form-group">
                        <label for="lowStockThreshold">Low Stock Threshold</label>
                        <input type="number" id="lowStockThreshold" min="0" step="1" required>
                        <small>Products with quantities at or below this number will be marked as low stock.</small>
                    </div>
                </div>

                <div class="settings-card">
                    <h2>Regional Settings</h2>
                    <p>Configure how dates are displayed.</p>

                    <div class="form-group">
                        <label for="dateFormat">Date Format</label>
                        <select id="dateFormat" required>
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        </select>
                    </div>
                </div>

                <div class="settings-actions">
                    <button type="submit" class="add-btn">Save Settings</button>
                    <button type="button" id="resetSettings" class="reset-btn">
                        Reset to Default
                    </button>
                </div>

            </form>

        </div>
    </main>

    <script src="assets/js/script.js"></script>
</body>
</html>