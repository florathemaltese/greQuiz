"use strict";
(function () {
    const InputEl = document.querySelector('input');
    const ButtonEl = document.querySelector('button');

    disableButtonIfNoInput();

    ButtonEl.disabled = !InputEl.value;

    function disableButtonIfNoInput() {
        InputEl.addEventListener('input', () => {
            ButtonEl.disabled = !InputEl.value;
        });
    }
})();

