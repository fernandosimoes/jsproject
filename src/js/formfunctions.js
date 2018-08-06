
export const submitEventListener = (datatable, eventsFunction) => {
    document.querySelector('#submitButton').addEventListener('click', () => {
        const form = document.forms[0];
        const username = (form.querySelector('input[name="username"]') && form.querySelector('input[name="username"]').value.length > 0 ) ? form.querySelector('input[name="username"]').value : formValidate(form.querySelector('input[name="username"]'), 'email');
        const name = form.querySelector('input[name="name"]') != null ? form.querySelector('input[name="name"]').value : '';
        const email = form.querySelector('input[name="email"]') != null ? form.querySelector('input[name="email"]').value : '';
        const city = form.querySelector('input[name="city"]') != null ? form.querySelector('input[name="city"]').value : '';
        const rideingroup = form.querySelector('input[name="ridegroup"]:checked') != null ? form.querySelector('input[name="ridegroup"]:checked').value : '';
        const weekdayelements = form.querySelector('input[name="weekday"]:checked') != null ? Array.from(form.querySelectorAll('input[name="weekday"]:checked')) : '';

        formValidate('', true);
        let weekdays = '';
        if (weekdayelements.length) {
            weekdayelements.forEach((element, key) => {
                weekdays.length == 0 ? weekdays = element.value : weekdays = `${weekdays} ${element.value}`;
            });
        } else {
            return false;
        }


        // console.log(username, name, email, city, rideingroup, weekdays);

        const newLine = [
            username,
            name,
            `<a href="mailto:${email}">
                ${email}
            </a>`,
            `-`,
            rideingroup,
            weekdays,
            '<div class="posts">0</div>',
            '<div class="albums">0</div>',
            '0',
            `<div class="trash" data-userid='' data-tableindex='${document.querySelectorAll('.dataTable-table tbody tr').length}'>   
            <a>
                <i class="fas fa-trash-alt"></i>
            </a>
        </div>`
        ]
        console.log('newLine', newLine);
        datatable.rows().add(newLine);
        eventsFunction();
    })
}



const formValidate = (element, key) => {

    switch (key) {
        case 'email':
             return 'email'
            break;

        default:
            break;
    }
}
