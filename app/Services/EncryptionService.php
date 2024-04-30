<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class EncryptionService
{
    private $cipher = 'aes-256-cbc';
    private $key;

    public function __construct()
    {
        $this->key = config('app.key'); // Использование ключа приложения Laravel
    }

    public function encryptFile($filePath)
    {
        $contents = file_get_contents($filePath);
        $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length($this->cipher));
        $encryptedContents = openssl_encrypt($contents, $this->cipher, $this->key, 0, $iv);
        $encryptedContents = base64_encode($iv . $encryptedContents);

        return $encryptedContents;
    }

    public function decryptFile($encryptedContents)
    {
        $data = base64_decode($encryptedContents);
        $ivLength = openssl_cipher_iv_length($this->cipher);
        $iv = substr($data, 0, $ivLength);
        $encryptedContents = substr($data, $ivLength);
        $decryptedContents = openssl_decrypt($encryptedContents, $this->cipher, $this->key, 0, $iv);

        return $decryptedContents;
    }

    public function storeEncryptedFile($encryptedContents, $path)
    {
        Storage::put($path, $encryptedContents);
    }

    public function retrieveEncryptedFile($path)
    {
        return Storage::get($path);
    }
}
