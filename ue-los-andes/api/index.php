<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/layout.php';

// Si ya inició sesión, lo mandamos directo al panel
if (currentUser()) {
    header('Location: /dashboard');
    exit;
}

$error = $_GET['error'] ?? null;

renderHeader('Iniciar sesión - U.E. Los Andes');
?>
<div class="login-wrap">
    <div class="tarjeta-login">
        <svg class="icono-monte" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 50 L22 20 L32 34 L42 14 L60 50 Z" fill="#f2a93b"/>
            <path d="M22 20 L30 32 L18 50 H4 Z" fill="#ffd479"/>
            <path d="M42 14 L52 32 L60 50 H42 L34 36 Z" fill="#2e8b6f"/>
            <circle cx="48" cy="12" r="5" fill="#08263f"/>
        </svg>
        <h2>Unidad Educativa Los Andes</h2>
        <p class="subt">Ingresa con tu usuario institucional</p>

        <?php if ($error): ?>
            <div class="alerta-error">⚠️ <?= htmlspecialchars($error) ?></div>
        <?php endif; ?>

        <form action="/login" method="POST">
            <div class="campo">
                <label for="usuario">Usuario</label>
                <input type="text" id="usuario" name="usuario" placeholder="admin" required autofocus>
            </div>
            <div class="campo">
                <label for="password">Contraseña</label>
                <input type="password" id="password" name="password" placeholder="••••••••" required>
            </div>
            <button type="submit" class="btn-ingresar">Ingresar al portal</button>
        </form>

        <div class="credenciales-prueba">
            <b>Accesos de prueba</b><br>
            Usuario: <b>admin</b> &nbsp;|&nbsp; Contraseña: <b>admin123</b><br>
            Usuario: <b>mquispe</b> &nbsp;|&nbsp; Contraseña: <b>secretaria2026</b>
        </div>
    </div>
</div>
<?php renderFooter(); ?>
