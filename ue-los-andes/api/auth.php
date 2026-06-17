<?php
/**
 * Autenticación mediante una cookie firmada (HMAC).
 *
 * No usamos sesiones nativas de PHP (session_start) porque en un entorno
 * serverless como Vercel cada función puede ejecutarse en un contenedor
 * distinto y los archivos de sesión no se comparten de forma confiable
 * entre invocaciones. En su lugar, guardamos los datos del usuario en una
 * cookie firmada digitalmente: el servidor no necesita "recordar" nada,
 * solo verifica que la firma sea válida en cada request.
 */

require_once __DIR__ . '/db.php';

const AUTH_COOKIE = 'ue_andes_auth';

function appSecret(): string
{
    $secret = getenv('APP_SECRET');

    if (!$secret) {
        // Valor de respaldo SOLO para pruebas rápidas.
        // En producción, define APP_SECRET en las variables de entorno de Vercel.
        $secret = 'ue-los-andes-cambia-esta-clave-2026';
    }

    return $secret;
}

function createAuthToken(array $user): string
{
    $payload = [
        'id'      => $user['id'],
        'usuario' => $user['usuario'],
        'nombre'  => $user['nombre_completo'],
        'rol'     => $user['rol'],
        'exp'     => time() + (4 * 3600), // expira en 4 horas
    ];

    $payloadB64 = base64_encode(json_encode($payload));
    $signature  = hash_hmac('sha256', $payloadB64, appSecret());

    return $payloadB64 . '.' . $signature;
}

function verifyAuthToken(?string $token): ?array
{
    if (!$token || !str_contains($token, '.')) {
        return null;
    }

    [$payloadB64, $signature] = explode('.', $token, 2);
    $expected = hash_hmac('sha256', $payloadB64, appSecret());

    if (!hash_equals($expected, $signature)) {
        return null;
    }

    $payload = json_decode(base64_decode($payloadB64), true);

    if (!$payload || !isset($payload['exp']) || $payload['exp'] < time()) {
        return null;
    }

    return $payload;
}

function currentUser(): ?array
{
    $token = $_COOKIE[AUTH_COOKIE] ?? null;
    return verifyAuthToken($token);
}

function requireLogin(): array
{
    $user = currentUser();

    if (!$user) {
        header('Location: /');
        exit;
    }

    return $user;
}

function loginUser(array $user): void
{
    $token = createAuthToken($user);

    setcookie(AUTH_COOKIE, $token, [
        'expires'  => time() + (4 * 3600),
        'path'     => '/',
        'secure'   => true,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}

function logoutUser(): void
{
    setcookie(AUTH_COOKIE, '', [
        'expires'  => time() - 3600,
        'path'     => '/',
        'secure'   => true,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}
