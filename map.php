<?php
include("database.php");
session_start();
if (empty($_SESSION['id_use'])) {
    header("Location: index.php");
    exit;
}
$id = $_SESSION['id_use'];
$sql = "SELECT latitude, longitude, name FROM marker WHERE id_use=$id";
$result = mysqli_query($conn, $sql);
$databaseMarkers = array();

while ($row = mysqli_fetch_assoc($result)) {
    $databaseMarkers[] = $row;
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MarkerMaps - Map</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
</head>

<body action="map.php" method="post">
    <div id="map"></div>
    <form action="map.php" method="post">
        <button type="submit" class="leaflet-top leaflet-right btn btn-primary" name="logout" value="logout">Log Out</button>
    </form>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
    <script>
        let databaseMarkers = <?php echo json_encode($databaseMarkers); ?>;
    </script>
    <script src="mapscript.js"></script>
</body>

</html>
<?php
if (isset($_POST["logout"])) {
    session_destroy();
    header("Location: index.php");
    exit;
}

?>