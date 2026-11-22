// Erdem düğmeleri: seçilen erdemin karakter güçlerini vurgular.
(function () {
  var field = document.getElementById('field');
  if (!field) return;
  var buttons = document.querySelectorAll('.virtues button');
  function select(v) {
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.v === v)); });
    if (!v) { field.removeAttribute('data-active'); }
    else { field.setAttribute('data-active', v); }
    field.querySelectorAll('li').forEach(function (li) { li.classList.toggle('on', !!v && li.classList.contains(v)); });
  }
  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      select(b.getAttribute('aria-pressed') === 'true' ? null : b.dataset.v);
    });
  });
})();
