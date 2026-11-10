'use strict';

window.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('calc-form');
  var productSelect = document.getElementById('product');
  var quantityInput = document.getElementById('quantity');
  var errorBox = document.getElementById('calc-error');
  var orderBody = document.getElementById('order-body');
  var orderTotal = document.getElementById('order-total');
  var clearButton = document.getElementById('clear-order');

  // Хранилище заказа: массив объектов { name, price, quantity }
  var order = [];

  function findProductIndex(name) {
    var i;
    for (i = 0; i < order.length; i += 1) {
      if (order[i].name === name) {
        return i;
      }
    }
    return -1;
  }

  function renderOrder() {
    var total = 0;
    var i;
    var item;
    var sum;
    var row;
    var cells;
    var button;

    orderBody.innerHTML = '';

    for (i = 0; i < order.length; i += 1) {
      item = order[i];
      sum = item.price * item.quantity;
      total += sum;

      row = document.createElement('tr');

      cells = [
        item.name,
        String(item.price),
        String(item.quantity),
        String(sum)
      ];

      cells.forEach(function (text) {
        var td = document.createElement('td');
        td.textContent = text;
        row.appendChild(td);
      });

      var actionTd = document.createElement('td');
      button = document.createElement('button');
      button.type = 'button';
      button.className = 'btn btn-sm btn-outline-danger';
      button.textContent = 'Удалить';
      button.setAttribute('data-name', item.name);
      actionTd.appendChild(button);
      row.appendChild(actionTd);

      orderBody.appendChild(row);
    }

    orderTotal.textContent = String(total);
  }

  function onAdd(event) {
    event.preventDefault();
    errorBox.textContent = '';

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

    var option = productSelect.options[productSelect.selectedIndex];
    var name = option.textContent.split('—')[0].trim();
    var price = parseInt(productSelect.value, 10);

    var index = findProductIndex(name);
    if (index === -1) {
      order.push({ name: name, price: price, quantity: quantity });
    } else {
      order[index].quantity += quantity;
    }

    quantityInput.value = '';
    renderOrder();
  }

  function onOrderClick(event) {
    var target = event.target;
    if (target.tagName !== 'BUTTON') {
      return;
    }
    var name = target.getAttribute('data-name');
    if (name === null) {
      return;
    }
    var index = findProductIndex(name);
    if (index !== -1) {
      order.splice(index, 1);
      renderOrder();
    }
  }

  function onClear() {
    order = [];
    errorBox.textContent = '';
    quantityInput.value = '';
    renderOrder();
  }

  form.addEventListener('submit', onAdd);
  orderBody.addEventListener('click', onOrderClick);
  clearButton.addEventListener('click', onClear);
});