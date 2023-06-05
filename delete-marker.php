<?php
    include("database.php");
    session_start();
    $data = json_decode(file_get_contents('php://input'), true);
    $latitude = $data['latitude'];
    $longitude= $data['longitude'];
    $id = $_SESSION['id_use'];
    $sql ="DELETE FROM marker WHERE id_use=$id and latitude=$latitude and longitude=$longitude";  
    $respose = mysqli_query($conn, $sql);
    echo json_encode($response);
?>