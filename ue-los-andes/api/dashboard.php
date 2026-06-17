<?php
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/layout.php';

$user = requireLogin();

$dbError = null;
$estudiantes = [];
$totalEstudiantes = 0;
$totalCursos = 0;

try {
    $pdo = getDB();

    $estudiantes = $pdo
        ->query('SELECT * FROM estudiantes ORDER BY curso, paralelo, nombre_completo')
        ->fetchAll();

    $totalEstudiantes = count($estudiantes);
    $totalCursos = (int) $pdo->query('SELECT COUNT(DISTINCT curso) FROM estudiantes')->fetchColumn();
} catch (Throwable $e) {
    $dbError = 'No se pudo conectar con la base de datos. Revisa la variable DATABASE_URL en Vercel.';
}

renderHeader('Panel - U.E. Los Andes', true, $user);
?>
<div class="contenedor">
    <div class="bienvenida">
        <h2>Panel de Gestión Estudiantil</h2>
        <p>Lista de estudiantes registrados en el sistema</p>
    </div>

    <?php if ($dbError): ?>
        <div class="aviso-bd">⚠️ <?= htmlspecialchars($dbError) ?></div>
    <?php endif; ?>

    <div class="tarjetas-stats">
        <div class="stat">
            <div class="num"><?= $totalEstudiantes ?></div>
            <div class="label">Estudiantes registrados</div>
        </div>
        <div class="stat">
            <div class="num"><?= $totalCursos ?></div>
            <div class="label">Cursos activos</div>
        </div>
        <div class="stat">
            <div class="num"><?= htmlspecialchars(ucfirst($user['rol'])) ?></div>
            <div class="label">Tu rol en el sistema</div>
        </div>
    </div>

    <div class="panel-tabla">
        <h3>Estudiantes</h3>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre completo</th>
                    <th>Curso</th>
                    <th>Paralelo</th>
                    <th>Fecha de nacimiento</th>
                    <th>Representante</th>
                    <th>Teléfono</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($estudiantes as $i => $e): ?>
                <tr>
                    <td><?= $i + 1 ?></td>
                    <td><?= htmlspecialchars($e['nombre_completo']) ?></td>
                    <td><?= htmlspecialchars($e['curso']) ?></td>
                    <td><span class="pill"><?= htmlspecialchars($e['paralelo']) ?></span></td>
                    <td><?= htmlspecialchars($e['fecha_nacimiento'] ?? '—') ?></td>
                    <td><?= htmlspecialchars($e['representante'] ?? '—') ?></td>
                    <td><?= htmlspecialchars($e['telefono_representante'] ?? '—') ?></td>
                </tr>
                <?php endforeach; ?>
                <?php if (empty($estudiantes) && !$dbError): ?>
                <tr><td colspan="7" style="text-align:center; color:#888;">No hay estudiantes registrados todavía.</td></tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>
<?php renderFooter(); ?>
