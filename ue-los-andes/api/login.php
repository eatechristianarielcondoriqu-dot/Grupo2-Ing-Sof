<?php
require_once __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /');
    exit;
}

$usuario  = trim($_POST['usuario'] ?? '');
$password = $_POST['password'] ?? '';

if ($usuario === '' || $password === '') {
    header('Location: /?error=' . urlencode('Completa usuario y contraseña'));
    exit;
}

try {
    $pdo = getDB();
    $stmt = $pdo->prepare(
        'SELECT * FROM usuarios WHERE usuario = :usuario AND activo = TRUE LIMIT 1'
    );
    $stmt->execute(['usuario' => $usuario]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        header('Location: /?error=' . urlencode('Usuario o contraseña incorrectos'));
        exit;
    }

    loginUser($user);
    header('Location: /dashboard');
    exit;
} catch (Throwable $e) {
    header('Location: /?error=' . urlencode('Error de conexión con la base de datos. Verifica DATABASE_URL.'));
    exit;
}
