document.addEventListener('DOMContentLoaded', function() {

    // Класс формы
    class CustomForm {
        // Получение формы по id элемента
        constructor(id) {
            this.form = document.getElementById(id)
        }
        
        // Добавляет класс _error элементу поля ввода
        formAddError(input){
            input.classList.add('_error');
        }

        // Убирает класс _error элементу поля ввода
        formRemoveError(input){
            input.classList.remove('_error');
        }

        // Проверяет возвращает кол-во ошибок
        formValidate() {
            
            // Кол-во ошибок и список обязательных полей (с классом _req)
            let error = 0;
            let formReq = this.form.querySelectorAll("._req");
    
            for(let i = 0; i < formReq.length; i++){
                const input = formReq[i]
                this.formRemoveError(input);
    
                // Проверка полей чекбоксов на пустое значение
                if (input.getAttribute('type') === 'checkbox' && input.checked === false){
                    this.formAddError(input);
                    error++;
                }else{
                    // Проверка остальных полей на пустое значение
                    if(input.value === ''){
                        this.formAddError(input);
                        error++;
                    }
                }
            }

            return error
        }

        // Обработка отправки
        formTelSend(e) {
            e.preventDefault();
        
            // Получение кол-ва ошибок
            let error = this.formValidate()
    
            if(error === 0 ){
                this.form.submit()
            }else{
                alert('Заполните обязательные поля')
            }
        }

        // Добавление обработчика отправки формы
        setSubmit() {
            this.form.addEventListener('submit', this.formTelSend.bind(this));
        }

    }

    // Пример инициализации
   const form1 = new CustomForm('form')
   form1.setSubmit()
})

// Валидация ввода для полей с номером телефона
document.addEventListener("DOMContentLoaded", function () {
    var phoneInputs = document.querySelectorAll('input[data-tel-input]');

    var getInputNumbersValue = function (input) {
        // Return stripped input value — just numbers
        return input.value.replace(/\D/g, '');
    }

    var onPhonePaste = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input);
        var pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            var pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
                // formatting will be in onPhoneInput handler
                input.value = inputNumbersValue;
                return;
            }
        }
    }

    var onPhoneInput = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            selectionStart = input.selectionStart,
            formattedInputValue = "";

        if (!inputNumbersValue) {
            return input.value = "";
        }

        if (input.value.length != selectionStart) {
            // Editing in the middle of input, not last symbol
            if (e.data && /\D/g.test(e.data)) {
                // Attempt to input non-numeric symbol
                input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
            formattedInputValue = input.value = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    }
    var onPhoneKeyDown = function (e) {
        // Clear input after remove last symbol
        var inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = "";
        }
    }
    for (var phoneInput of phoneInputs) {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false);
    }
})
