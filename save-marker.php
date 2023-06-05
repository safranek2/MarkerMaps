<?php
    include("database.php");
    session_start();
    $data = json_decode(file_get_contents('php://input'), true);
    $latitude = $data['latitude'];
    $longitude= $data['longitude'];
    $name= $data['name'];
    $id = $_SESSION['id_uz'];
    $sql ="INSERT INTO marker( latitude, longitude, name, id_use) VALUES ($latitude,$longitude,'$name',$id)";
    $respose = mysqli_query($conn, $sql);
    echo json_encode($response);
?>