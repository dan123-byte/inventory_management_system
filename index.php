<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>StockFlow | Dashboard</title>

    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

    <?php include 'includes/sidebar.php'; ?>

    <main class="main-content">

        <?php include 'includes/header.php'; ?>

        <section class="dashboard">

            <h2>Dashboard Overview</h2>

            <div class="stats-container">

                <div class="stat-card">
                    <p>Total Products</p>
                    <h2>248</h2>
                    <span>Products in inventory</span>
                </div>

                <div class="stat-card">
                    <p>Total Categories</p>
                    <h2>18</h2>
                    <span>Product categories</span>
                </div>

                <div class="stat-card">
                    <p>Low Stock Items</p>
                    <h2>12</h2>
                    <span>Items need restocking</span>
                </div>

                <div class="stat-card">
                    <p>Out of Stock</p>
                    <h2>5</h2>
                    <span>Currently unavailable</span>
                </div>

            </div>

        </section>

    </main>

    <script src="assets/js/script.js"></script>

</body>
</html>