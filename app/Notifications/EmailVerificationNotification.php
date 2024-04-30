<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Auth\Notifications\VerifyEmail;


class EmailVerificationNotification extends VerifyEmail
{
    protected function buildMailMessage($url)
    {
        return (new MailMessage)
            ->subject('Подтвердите ваш email')
            ->line('Пожалуйста, нажмите на кнопку ниже, чтобы подтвердить свой email адрес.')
            ->action('Подтвердить email', $url)
            ->line('Если вы не регистрировались на сайте meeper.info, проигнорируйте это сообщение.');
    }
}
