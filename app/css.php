<?php
    $cssPath = "json/css.json";
    if (file_exists($cssPath)) {
        $cssJson = file_get_contents($cssPath);
        $cssJsonArray = json_decode($cssJson, true);
    } else {
        $cssJsonArray = [
                "lighttheme" => [
                    "lightBackgroundColor" => "white",
                    "backgroundColor" => "#F5F6F7",
                    "borderColor" => "#cecece",
                    "fontColor" => "black",
                    "fontButtonColor" => "#6deb6d",
                    "lightFontButtonColor" => "#6ff26f",
                    "darkFontButtonColor" => "#45b645",
                    "imageWhite" => "0%"
                ],
                "darktheme" => [
                    "lightBackgroundColor" => "#202020",
                    "backgroundColor" => "#1C1C1C",
                    "borderColor" => "#2A2A2A",
                    "fontColor" => "white",
                    "fontButtonColor" => "#ff8c00",
                    "lightFontButtonColor" => "#ff9e20",
                    "darkFontButtonColor" => "#cf7500",
                    "imageWhite" => "100%"
                ]
            ];
        file_put_contents($cssPath, json_encode($cssJsonArray, JSON_PRETTY_PRINT));
    }

    if(!isset($_SESSION["theme"])){
        $_SESSION["theme"] = "lighttheme";
    }

    $theme = $_SESSION["theme"];

    foreach ($cssJsonArray[$theme] as $key => $value) {
        $_SESSION[$key] = $value;
    }
?>