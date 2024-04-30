<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\EncryptionService;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;



class FileController extends Controller
{
    protected $encryptionService;

    public function __construct(EncryptionService $encryptionService)
    {
        $this->encryptionService = $encryptionService;
    }

    public function uploadMultiple(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:jpg,jpeg,png,bmp,gif,svg|max:10240',
        ]);

        $file = $request->file('file');
        $fileName = Str::random(40) . '.' . $file->getClientOriginalExtension();

        // Encrypt the file content
        $encryptedContent = Crypt::encrypt(file_get_contents($file->getPathname()));
        Storage::put('encrypted/' . $fileName, $encryptedContent);

        // Create thumbnail using GD
        $thumbnailPath = 'encrypted/thumbnails/' . $fileName;
        $this->createThumbnail($file->getPathname(), $thumbnailPath, 600, 600);

        return response()->json([
            'original' => $fileName,
            'thumbnail' => $thumbnailPath
        ], 200);
    }

    private function createThumbnail($filePath, $thumbnailPath, $width, $height)
    {
        // Load the image
        $sourceImage = imagecreatefromstring(file_get_contents($filePath));
        $sourceWidth = imagesx($sourceImage);
        $sourceHeight = imagesy($sourceImage);

        // Calculate aspect ratio
        $aspectRatio = $sourceWidth / $sourceHeight;
        if ($width / $height > $aspectRatio) {
            $width = $height * $aspectRatio;
        } else {
            $height = $width / $aspectRatio;
        }

        // Create a blank image with the desired dimensions
        $thumbnailImage = imagecreatetruecolor($width, $height);

        // Copy and resize the original image into the blank image
        imagecopyresampled($thumbnailImage, $sourceImage, 0, 0, 0, 0, $width, $height, $sourceWidth, $sourceHeight);

        // Capture the thumbnail image data as a string
        ob_start();
        imagejpeg($thumbnailImage, null, 100);
        $thumbnailData = ob_get_clean();

        // Encrypt the thumbnail data
        $encryptedThumbnailData = Crypt::encrypt($thumbnailData);

        // Save the encrypted thumbnail to storage
        Storage::put($thumbnailPath, $encryptedThumbnailData);

        // Clean up
        imagedestroy($sourceImage);
        imagedestroy($thumbnailImage);
    }
    public function getFiles()
    {
        $files = Storage::files('encrypted/thumbnails/');

        return response()->json(array_map(function ($file) {
            return ['fileName' => basename($file)];
        }, $files));
    }

    public function getFile($fileName)
    {
        try {
            $encryptedContent = Storage::get('encrypted/thumbnails/' . $fileName);
            $decryptedContent = Crypt::decrypt($encryptedContent);
            $mimeType = $this->mime_content_type_from_binary($decryptedContent);

            return response($decryptedContent, 200)->header('Content-Type', $mimeType);
        } catch (DecryptException $e) {
            return response()->json(['error' => 'File could not be decrypted'], 400);
        } catch (\Exception $e) {
            return response()->json(['error' => 'File not found or other error'], 400);
        }
    }

    private function mime_content_type_from_binary($binary)
    {
        $finfo = new \finfo(FILEINFO_MIME_TYPE);
        return $finfo->buffer($binary);
    }

    public function download($fileName)
    {
        $filePath = 'uploads/' . $fileName;
        if (Storage::exists($filePath)) {
            return Storage::download($filePath);
        }

        return abort(404);
    }


    public function show($fileName)
    {
        $filePath = 'encrypted/thumbnails/' . $fileName;

        if (!Storage::exists($filePath)) {
            return abort(404, 'File not found.');
        }

        $encryptedContent = Storage::get($filePath);
        $decryptedContent = Crypt::decrypt($encryptedContent);

        return response()->stream(function () use ($decryptedContent) {
            echo $decryptedContent;
        }, 200, ['Content-Type' => 'image/jpeg']);
    }

    public function list()
    {
        $files = Storage::files('encrypted/thumbnails/');
        $fileNames = array_map('basename', $files);

        return response()->json(array_map(function ($fileName) {
            return ['fileName' => $fileName];
        }, $fileNames));
    }
}
