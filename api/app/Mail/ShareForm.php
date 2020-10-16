<?php

namespace App\Mail;

use App\Model\Share;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ShareForm extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * @var string
     */
    public $share;

    /**
     * ShareForm constructor
     * .
     * @param Share $share
     */
    public function __construct(Share $share)
    {
        $this->share = $share;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(env('MAIL_USERNAME'))->view('emails.share');
    }
}
