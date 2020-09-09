<?php
    $lang = $_POST['lang'];
    $lang_settings = file_get_contents('../lang-content.json');
    $output = json_decode($lang_settings, JSON_UNESCAPED_UNICODE);
    echo json_encode($output[$lang], JSON_UNESCAPED_UNICODE);