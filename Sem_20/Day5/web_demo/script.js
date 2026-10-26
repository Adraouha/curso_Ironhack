// ==========================================================
// Semana 20 - Día 5: Script interactivo para la web demo
// Comprobación de entorno, fecha en vivo e interactividad JS
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Reloj en tiempo real
  const clockElement = document.getElementById('live-clock');
  const updateClock = () => {
    const now = new Date();
    if (clockElement) {
      clockElement.textContent = now.toLocaleDateString('es-ES', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }
  };
  updateClock();
  setInterval(updateClock, 1000);

  // 2. Diagnóstico del entorno de ejecución
  const protoEl = document.getElementById('protocolo-info');
  const hostEl = document.getElementById('host-info');
  const browserEl = document.getElementById('browser-info');

  if (protoEl) protoEl.textContent = window.location.protocol.replace(':', '').toUpperCase() || 'LOCAL FILE';
  if (hostEl) hostEl.textContent = window.location.host || 'Visualización Local (file:///)';
  if (browserEl) {
    const ua = navigator.userAgent;
    let browserName = 'Navegador Moderno';
    if (ua.includes('Firefox')) browserName = 'Mozilla Firefox';
    else if (ua.includes('Edg')) browserName = 'Microsoft Edge';
    else if (ua.includes('Chrome')) browserName = 'Google Chrome';
    else if (ua.includes('Safari')) browserName = 'Apple Safari';
    browserEl.textContent = `${browserName} (${navigator.platform || 'Sistema 64-bit'})`;
  }

  // 3. Botón de interactividad JS y felicitación
  const btnSaludo = document.getElementById('btn-saludo');
  const alertBox = document.getElementById('mensaje-saludo');

  if (btnSaludo && alertBox) {
    let clickCount = 0;
    btnSaludo.addEventListener('click', () => {
      clickCount++;
      alertBox.classList.remove('hidden');
      alertBox.innerHTML = `
        <strong>🎉 ¡Prueba de ejecución completada! (Clics: ${clickCount})</strong><br>
        JavaScript y CSS se están sirviendo correctamente desde la carpeta <code>htdocs</code>. 
        Tu servidor web está interpretando las peticiones y enviando los assets estáticos con código HTTP 200 OK.
      `;
    });
  }
});
