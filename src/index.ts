navigator.serviceWorker?.register('service-worker.js');

window.addEventListener('DOMContentLoaded', () => {
    document.body.textContent = window.location.href;
});