<?php

namespace App\Listeners;

use App\Events\UserRegistered;
use App\Notifications\EmailVerificationNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendEmailVerificationNotification
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserRegistered $event)
    {
        $event->user->notify(new EmailVerificationNotification);
    }
}
