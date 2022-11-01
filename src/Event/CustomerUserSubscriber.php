<?php

namespace App\Event;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Customer;
use Symfony\Component\EventDispatcher\EventSubscriberInterface as EventSubscriberInterfaceAlias;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class CustomerUserSubscriber implements EventSubscriberInterfaceAlias
{
    /** @var Security  */
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setUserForCustomer', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForCustomer(ViewEvent $event)
    {
        $result = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($result instanceof Customer && $method === 'POST') {
            $user = $this->security->getUser();
            $result->setUser($user);
        }
    }
}