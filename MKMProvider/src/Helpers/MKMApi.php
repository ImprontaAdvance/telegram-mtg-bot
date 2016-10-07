<?php
namespace MKMProvider\Helpers;

class MKMApi {
    const SIGNATURE_METHOD = 'HMAC-SHA1';
    const OAUTH_VERSION = '1.0';

    private $appToken;
    private $appSecret;
    private $accessToken;
    private $accessSecret;


    public function __construct($appToken, $appSecret, $accessToken, $accessSecret) {
        $this->appToken = $appToken;
        $this->appSecret = $appSecret;
        $this->accessToken = $accessToken;
        $this->accessSecret = $accessSecret;
    }


    private function _getSignatureHeader($method, $url) {
        $params = array(
            'realm'                     => $url,
            'oauth_consumer_key'        => $this->appToken,
            'oauth_token'               => $this->accessToken,
            'oauth_nonce'               => uniqid(),
            'oauth_timestamp'           => time(),
            'oauth_signature_method'    => self::SIGNATURE_METHOD,
            'oauth_version'             => self::OAUTH_VERSION,
        );

        $baseString = strtoupper($method) . '&' . rawurlencode($url) . '&';


        $encodedParams = [];
        foreach ($params as $key => $value)
            if ('realm' !== $key)
                $encodedParams[rawurlencode($key)] = rawurlencode($value);
        ksort($encodedParams);

        /*
         * Expand the base string by the encoded parameter=value pairs
         */
        $values = array();
        foreach ($encodedParams as $key => $value)
            $values[] = $key . "=" . $value;
        $paramsString = rawurlencode(implode("&", $values));

        $baseString .= $paramsString;

        $signatureKey  = rawurlencode($this->appSecret) . "&" . rawurlencode($this->accessSecret);
        $rawSignature  = hash_hmac("sha1", $baseString, $signatureKey, true);
        $oAuthSignature = base64_encode($rawSignature);

        $header = "Authorization: OAuth ";

        $headerParams       = array();
        foreach ($params as $key => $value)
            $headerParams[] = $key . "=\"" . $value . "\"";
        $headerParams[] = 'oauth_signature="' . $oAuthSignature . '"';

        $header .= implode(", ", $headerParams);

        return $header;
    }


    public function getSignedRequest($method, $url, $data = null) {
        $curlHandle = curl_init();
        curl_setopt($curlHandle, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curlHandle, CURLOPT_URL, $url);
        curl_setopt($curlHandle, CURLOPT_HTTPHEADER, array($this->_getSignatureHeader($method, $url)));
        curl_setopt($curlHandle, CURLOPT_SSL_VERIFYPEER, false);
        // curl_setopt($curlHandle, CURLOPT_VERBOSE, 1);
        // curl_setopt($curlHandle, CURLOPT_HEADER, 1);

        $content = curl_exec($curlHandle);
        $info    = curl_getinfo($curlHandle);

        if($info['http_code'] > 299)
            return false;

        curl_close($curlHandle);

        return $content;
    }


    // $method             = "GET";
    // // $url                = "https://www.mkmapi.eu/ws/v1.1/account";
    // $url                = "https://www.mkmapi.eu/ws/v1.1/products/snapcaster/1/1/false";
    // $appToken           = "wBSY3MMS12SoPdBX";
    // $appSecret          = "zkMru510ij98raVbEPI53iywwe4bGKHy";
    // $accessToken        = "57dLtLhduOPdXrv3rTcAk1SN9oVaJKsG";
    // $accessSecret       = "eSh1OjIH2vhEv4NJbLfP2OefQSUbGh2L";
    // $nonce              = uniqid();
    // $timestamp          = time();
    // $signatureMethod    = "HMAC-SHA1";
    // $version            = "1.0";

}
