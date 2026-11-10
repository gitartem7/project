'use strict';

window.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('calc-form');
  var productSelect = document.getElementById('product');
  var quantityInput = document.getElementById('quantity');
  var errorBox = document.getElementById('calc-error');
  var resultBox = document.getElementById('calc-result');

  function onClick(event) {
    event.preventDefault();
    errorBox.textContent = '';
    resultBox.textContent = '';

    var raw = quantityInput.value.trim();

    if (raw.match(/^\d+$/) === null) {
      errorBox.textContent = 'Ошибка: введите целое положительное число (только цифры).';
      return;
    }

    var quantity = parseInt(raw, 10);
    if (quantity <= 0) {
      errorBox.textContent = 'Ошибка: количество должно быть больше нуля.';
      return;
    }

    var price = parseInt(productSelect.value, 10);
    var total = price * quantity;

    resultBox.textContent = 'Стоимость заказа: ' + total + ' руб.';
  }

  form.addEventListener('submit', onClick);
});