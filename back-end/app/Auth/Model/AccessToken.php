<?php

namespace App\Auth\Model;

use App\User;
use Laravel\Passport\Bridge\AccessToken as PassportAccessToken;
use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Signer\Key;
use Lcobucci\JWT\Signer\Rsa\Sha256;
use League\OAuth2\Server\CryptKey;

class AccessToken extends PassportAccessToken
{

    private $privateKey;

    public function convertToJWT(CryptKey $privateKey)
    {
        $builder = new Builder();
        $user = User::find($this->getUserIdentifier());
        $builder->permittedFor($this->getClient()->getIdentifier())
            ->identifiedBy($this->getIdentifier(), true)
            ->issuedAt(time())
            ->canOnlyBeUsedAfter(time())
            ->expiresAt($this->getExpiryDateTime()->getTimestamp())
            ->relatedTo($this->getUserIdentifier())
            ->withClaim('scopes', [])
            ->withClaim('id', $user->id)
            ->withClaim('name', $user->name)
            ->withClaim('email', $user->email)
            ->withClaim('status', $user->status == 0 ? 'active' : 'inactive')
            ->withClaim('rolesList', $user->getRoleNames())
            ->withClaim('roleData', $user->load('roles.permissions'));
//        ->withClaim('roleData', $user->roles);
        return $builder
            ->getToken(new Sha256(), new Key($privateKey->getKeyPath(), $privateKey->getPassPhrase()));
    }

    public function setPrivateKey(CryptKey $privateKey)
    {
        $this->privateKey = $privateKey;
    }

    public function __toString()
    {
        return (string)$this->convertToJWT($this->privateKey);
    }

}
