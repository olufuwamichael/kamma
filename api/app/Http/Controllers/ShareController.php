<?php

namespace App\Http\Controllers;

use App\Model\Share;
use App\Mail\ShareForm;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Psr\Log\LoggerInterface;

class ShareController extends Controller
{
    /**
     * @var LoggerInterface
     */
    private $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    /**
     * Save a Share
     *
     * @param $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function postShare(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|max:255',
                'friend_name' => 'required|max:255',
                'friend_email' => 'required|email',
            ]);

            $share = new Share();
            $share->name = $request->name;
            $share->friend_name = $request->friend_name;
            $share->friend_email = $request->friend_email;
            $share->save();

            // This needs to be configured to use Mailgun
            // Please comment out if no config
            Mail::to($share->friend_email)->send(new ShareForm($share));

            return response()->json($share->toArray())->setStatusCode(201);
        } catch (\Exception $e) {
            $this->logger->error('Error saving contact with data: ' . json_encode($request->all()));

            return response()->json([
                'error' => [
                    'status' => 401,
                    'message' => $e->getMessage()
                ]
            ])->setStatusCode(401);
        }
    }
}