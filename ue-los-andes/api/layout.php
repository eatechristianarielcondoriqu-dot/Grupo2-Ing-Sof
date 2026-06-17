<?php
/**
 * Header y footer compartidos con el estilo visual del portal.
 */

function renderHeader(string $title, bool $showNav = false, ?array $user = null): void
{
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?= htmlspecialchars($title) ?></title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
    :root {
        --azul-andes: #0b3d60;
        --azul-noche: #08263f;
        --dorado: #f2a93b;
        --dorado-claro: #ffd479;
        --verde-valle: #2e8b6f;
        --blanco-hueso: #f7f9fb;
        --gris-texto: #4a5568;
    }

    * { box-sizing: border-box; }

    body {
        margin: 0;
        font-family: 'Poppins', sans-serif;
        background: linear-gradient(160deg, var(--azul-noche) 0%, var(--azul-andes) 45%, var(--verde-valle) 100%);
        min-height: 100vh;
        color: #1a202c;
    }

    .topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 18px 36px;
        background: rgba(8, 38, 63, 0.55);
        backdrop-filter: blur(6px);
        border-bottom: 3px solid var(--dorado);
    }

    .marca {
        display: flex;
        align-items: center;
        gap: 12px;
        color: #fff;
    }

    .marca .icono-monte {
        width: 42px;
        height: 42px;
        flex-shrink: 0;
    }

    .marca h1 {
        font-size: 1.15rem;
        font-weight: 700;
        margin: 0;
        line-height: 1.1;
        letter-spacing: 0.3px;
    }

    .marca span {
        display: block;
        font-size: 0.7rem;
        font-weight: 400;
        color: var(--dorado-claro);
        letter-spacing: 1px;
        text-transform: uppercase;
    }

    .nav-usuario {
        display: flex;
        align-items: center;
        gap: 18px;
        color: #fff;
    }

    .nav-usuario .saludo {
        font-size: 0.9rem;
        text-align: right;
        line-height: 1.3;
    }

    .nav-usuario .saludo b { color: var(--dorado-claro); }

    .btn-salir {
        background: var(--dorado);
        color: var(--azul-noche);
        border: none;
        padding: 9px 18px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 0.85rem;
        text-decoration: none;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
    }

    .btn-salir:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 14px rgba(242, 169, 59, 0.4);
    }

    .contenedor {
        max-width: 1100px;
        margin: 0 auto;
        padding: 40px 24px 60px;
    }

    /* ---------- Login ---------- */
    .login-wrap {
        min-height: calc(100vh - 90px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
    }

    .tarjeta-login {
        background: #fff;
        width: 100%;
        max-width: 420px;
        border-radius: 18px;
        padding: 38px 34px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.35);
        text-align: center;
    }

    .tarjeta-login .icono-monte {
        width: 64px;
        height: 64px;
        margin: 0 auto 6px;
    }

    .tarjeta-login h2 {
        margin: 6px 0 2px;
        color: var(--azul-noche);
        font-size: 1.4rem;
    }

    .tarjeta-login p.subt {
        color: var(--gris-texto);
        font-size: 0.88rem;
        margin: 0 0 26px;
    }

    .campo {
        text-align: left;
        margin-bottom: 16px;
    }

    .campo label {
        display: block;
        font-size: 0.82rem;
        font-weight: 600;
        color: var(--azul-noche);
        margin-bottom: 6px;
    }

    .campo input {
        width: 100%;
        padding: 11px 14px;
        border: 1.5px solid #e1e6ec;
        border-radius: 9px;
        font-size: 0.95rem;
        font-family: inherit;
        transition: border-color 0.15s ease;
    }

    .campo input:focus {
        outline: none;
        border-color: var(--verde-valle);
    }

    .btn-ingresar {
        width: 100%;
        padding: 13px;
        margin-top: 6px;
        border: none;
        border-radius: 9px;
        background: linear-gradient(135deg, var(--verde-valle), var(--azul-andes));
        color: #fff;
        font-weight: 700;
        font-size: 0.95rem;
        cursor: pointer;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
    }

    .btn-ingresar:hover {
        transform: translateY(-1px);
        box-shadow: 0 10px 22px rgba(11, 61, 96, 0.35);
    }

    .alerta-error {
        background: #fde8e8;
        color: #c53030;
        border: 1px solid #f8b4b4;
        border-radius: 8px;
        padding: 10px 14px;
        font-size: 0.85rem;
        margin-bottom: 18px;
        text-align: left;
    }

    .credenciales-prueba {
        margin-top: 24px;
        background: #f0f5f3;
        border: 1px dashed #b9d4c8;
        border-radius: 10px;
        padding: 14px 16px;
        font-size: 0.78rem;
        color: var(--gris-texto);
        text-align: left;
    }

    .credenciales-prueba b { color: var(--azul-noche); }

    /* ---------- Dashboard ---------- */
    .bienvenida {
        color: #fff;
        margin-bottom: 28px;
    }

    .bienvenida h2 {
        margin: 0 0 4px;
        font-size: 1.6rem;
    }

    .bienvenida p {
        margin: 0;
        color: #d6e4ee;
        font-size: 0.92rem;
    }

    .tarjetas-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
        gap: 18px;
        margin-bottom: 30px;
    }

    .stat {
        background: #fff;
        border-radius: 14px;
        padding: 20px 22px;
        box-shadow: 0 12px 28px rgba(0,0,0,0.18);
        border-left: 5px solid var(--dorado);
    }

    .stat .num {
        font-size: 2rem;
        font-weight: 800;
        color: var(--azul-noche);
        line-height: 1;
    }

    .stat .label {
        font-size: 0.8rem;
        color: var(--gris-texto);
        margin-top: 6px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .panel-tabla {
        background: #fff;
        border-radius: 16px;
        padding: 26px;
        box-shadow: 0 16px 36px rgba(0,0,0,0.22);
        overflow-x: auto;
    }

    .panel-tabla h3 {
        margin: 0 0 18px;
        color: var(--azul-noche);
        font-size: 1.1rem;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.88rem;
    }

    thead th {
        text-align: left;
        background: var(--azul-noche);
        color: #fff;
        padding: 12px 14px;
        font-weight: 600;
        white-space: nowrap;
    }

    thead th:first-child { border-radius: 8px 0 0 8px; }
    thead th:last-child { border-radius: 0 8px 8px 0; }

    tbody td {
        padding: 11px 14px;
        border-bottom: 1px solid #edf1f5;
        color: #2d3748;
    }

    tbody tr:hover { background: #f7faf9; }

    .pill {
        display: inline-block;
        padding: 3px 10px;
        border-radius: 20px;
        background: #e6f4ee;
        color: var(--verde-valle);
        font-size: 0.76rem;
        font-weight: 600;
    }

    .aviso-bd {
        background: #fff7e6;
        border: 1px solid #ffd479;
        color: #7a5200;
        padding: 14px 18px;
        border-radius: 10px;
        margin-bottom: 24px;
        font-size: 0.85rem;
    }

    footer.pie {
        text-align: center;
        color: #cfe0e9;
        font-size: 0.78rem;
        padding: 18px;
        opacity: 0.8;
    }
</style>
</head>
<body>
<header class="topbar">
    <div class="marca">
        <svg class="icono-monte" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 50 L22 20 L32 34 L42 14 L60 50 Z" fill="#f2a93b"/>
            <path d="M22 20 L30 32 L18 50 H4 Z" fill="#ffd479"/>
            <path d="M42 14 L52 32 L60 50 H42 L34 36 Z" fill="#2e8b6f"/>
            <circle cx="48" cy="12" r="5" fill="#fff7e6"/>
        </svg>
        <div>
            <h1>Unidad Educativa Los Andes</h1>
            <span>Portal de Gestión Estudiantil</span>
        </div>
    </div>
    <?php if ($showNav && $user): ?>
    <div class="nav-usuario">
        <div class="saludo">
            Hola, <b><?= htmlspecialchars($user['nombre']) ?></b><br>
            <?= htmlspecialchars(ucfirst($user['rol'])) ?>
        </div>
        <a class="btn-salir" href="/logout">Cerrar sesión</a>
    </div>
    <?php endif; ?>
</header>
<?php
}

function renderFooter(): void
{
?>
<footer class="pie">
    &copy; <?= date('Y') ?> Unidad Educativa Los Andes &mdash; Proyecto demostrativo (PHP + PostgreSQL/Neon en Vercel)
</footer>
</body>
</html>
<?php
}
