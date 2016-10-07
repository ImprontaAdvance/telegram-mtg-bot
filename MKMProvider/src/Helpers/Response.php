<?php
namespace MKMProvider\Helpers;

class Response {
    function Json($content = [], $code = 200) {

        header_remove();

        http_response_code($code);

        header('Content-Type: application/json');

        return json_encode($content);
    }
}
