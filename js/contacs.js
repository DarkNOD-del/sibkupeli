// Отправка формы

document.addEventListener('DOMContentLoaded', function () {
    const TOKEN = "6207474555:AAEPOd7oSn4GP_L_LetqRNXBWlf-DXe3xMY";
    const CHAT_ID = "-1001853940603";
    let URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    const form = document.getElementById('form');

    const modal = document.getElementById('modal');
    const modal_text = document.getElementById('modal-text');
    const modal_close = document.getElementsByClassName("close")[0];

    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        disableErrorPopups();

        let canSend = formValidate();

        if (canSend)
        {
            form.classList.add('_sending');

            let formData = new FormData(form)

            let message = `<b>НОВАЯ ЗАПИСЬ!</b>\n`;
            message += `<b>Имя: </b> <i>${formData.get("user_name")}</i>\n`;
            message += `<b>E-mail: </b> <i>${formData.get("user_email")}</i>\n`;
            message += `<b>Телефон: </b> <i>${formData.get("user_phone")}</i>\n`;
            
            if (formData.get("user_event_date") != "")
                message += `<b>Дата: </b> <i>${formData.get("user_event_date")}</i>\n`;
            
            if (formData.get("user_note") != "")
                message += `<b>Примечание: </b> <i>${formData.get("user_note")}</i>`;

            try {
                const response = await fetch(URI_API, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        chat_id: CHAT_ID,
                        text: message,
                        parse_mode: 'html'
                    })
                })
                
                if (response.ok) {
                    modal_text.textContent = `${formData.get("user_name")}, ваше сообщение успешно отправлено! Скоро вам перезвонит наш администратор.`;
                    form.reset()
                }
            } 
            catch (err) {
                console.error(err);
                modal_text.textContent = `${formData.get("user_name")}, нам жаль, но при отправке вашего сообщения произошла ошибка. Пожалуйста, попробуйте еще раз.`;
        
            } 
            finally {
                form.classList.remove('_sending');
                modal.style.display = "block";
            }
        }

        // let formData = new FormData(form);

        // if (canSend) {
        //     form.classList.add('_sending');
        //     response = await fetch('php/telegram.php', {
        //         method: 'POST',
        //         body: formData
        //     });

        //     if (response.ok) {
        //         let result = await response.json();
        //         console.log(result);
        //         form.reset();
        //         modal_text.textContent = 'Уважаемый пользователь, ваше сообщение успешно отправлено!';
                
        //     }
        //     else {
        //         modal_text.textContent = 'Нам жаль, но при отправке вашего сообщения произошла ошибка. Пожалуйста, попробуйте еще раз.';
        //     }

        //     form.classList.remove('_sending');
        //     modal.style.display = "block";
        // }
    }

    function formValidate() {
        let canSend = true;
        let formReq = document.querySelectorAll('._req');

        for(let index = 0; index < formReq.length; index++) {

            let errorInElement = false;

            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_email')) 
            {
                if (checkEmail(input)) {
                    errorInElement = true;
                }
            }

            else if(input.classList.contains('_phonenumber')) 
            {
                if (checkPhone(input)) {
                    errorInElement = true;
                }
            }

            else if(input.classList.contains('_name')) 
            {
                if (checkName(input)) {
                    errorInElement = true;
                }
            }

            if (errorInElement)
            {
                formAddError(input);
                canSend = false;

                let errPopup = input.nextElementSibling;
                if (errPopup.classList.contains('error_popup'))
                {
                    errPopup.style.display = "block";
                }
            }
        }

        return canSend;
    }

    function formAddError(input) {
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.classList.remove('_error');
    }

    function disableErrorPopups() {
        let errPopups = document.querySelectorAll('.error_popup');

        for(let index = 0; index < errPopups.length; index++) {
            const errorPopup = errPopups[index];
            errorPopup.style.display = "none";
        }
    }

    function checkEmail(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    function checkPhone(input) {
        return !/^[\d\+][\d\(\)\ -]{4,14}\d$/.test(input.value);
    }

    function checkName(input) {
        return !/[а-яА-Яa-zA-Z]/.test(input.value);
    }

    modal_close.onclick = function() {
        modal.style.display = "none";
    }
});