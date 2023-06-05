<?php
include("database.php");
session_start();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MarkerMaps - Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
</head>

<body class="bg-primary d-flex justify-content-center align-items-center text-center">
    <main>
        <h1 class="text-light display-1 name">MarkerMaps</h1>
        <form class="bg-light rounded p-3" action="<?php htmlspecialchars($_SERVER["PHP_SELF"]) ?>" method="post">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" name="rusername" placeholder="Username" maxlength="50" pattern="[a-zA-Z0-9]+" required>
                <label for="floatingInput">Username</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" name="rpassword" placeholder="Password" maxlength="255" required>
                <label for="floatingPassword">Password</label>
            </div>
            <div class="col text-center">
                <button class="btn btn-primary" type="submit" name="login" value="login">Login</button>
                <button class="btn btn-outline-primary" type="submit" name="register" value="register">Registrate</button>
            </div>
        </form>
        <?php
        if (isset($_POST["register"])) {
            $username = $_POST["rusername"];
            $password = $_POST["rpassword"];
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $sql = "INSERT INTO user (use_name, password)  VALUES ('$username', '$hash')";
            try {
                mysqli_query($conn, $sql);
                $_SESSION["rusername"] = $username;
                $_SESSION["rpassword"] = $password;
                header("Location: map.php");
            } catch (mysqli_sql_exeption) {
                echo '<div class="alert alert-danger alert-dismissible fade show" role="alert">That username is taken<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
            }
        }
        if (isset($_POST["login"])) {
            $username = $_POST["rusername"];
            $password = $_POST["rpassword"];
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $sql = "SELECT id_use, heslo FROM uzivatel WHERE username='$username'";
            $result = mysqli_query($conn, $sql);

            if (mysqli_num_rows($result) > 0) {
                $row = mysqli_fetch_assoc($result);
                if (password_verify($password, $row["password"])) {
                    $_SESSION["rusername"] = $username;
                    $_SESSION["rpassword"] = $password;
                    $_SESSION["id_use"] = $row["id_use"];
                    header("Location: map.php");
                } else {
                    echo '<div class="alert alert-danger alert-dismissible fade show" role="alert">Wrong username or password<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
                }
            } else {
                echo '<div class="alert alert-danger alert-dismissible fade show" role="alert">Wrong username or password<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
            }
        }

        mysqli_close($conn);
        ?>
    </main>
    <footer class="fixed-bottom text-center">
        <p class="text-light">© 2023 SPŠE Ječná by David Šafránek, Jakub Svoboda, Ondřej Šembera</p>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
</body>

</html>