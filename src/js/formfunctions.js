
export const submitEventListener = (datatable, eventsFunction) => {
    document.querySelector('#submitButton').addEventListener('click', () => {
        const form = document.forms[0];
        const username = form.querySelector('input[name="username"]') != null ? form.querySelector('input[name="username"]').value : '';
        const name = form.querySelector('input[name="name"]') != null ? form.querySelector('input[name="name"]').value : '';
        const email = form.querySelector('input[name="email"]') != null ? form.querySelector('input[name="email"]').value : '';
        const city = form.querySelector('input[name="city"]') != null ? form.querySelector('input[name="city"]').value : '';
        const rideingroup = form.querySelector('input[name="ridegroup"]:checked') != null ? form.querySelector('input[name="ridegroup"]:checked').value : '';
        const weekdayelements = form.querySelector('input[name="weekday"]:checked') != null ? Array.from(form.querySelectorAll('input[name="weekday"]:checked')) : '';

        let weekdays = ""
        weekdayelements.forEach((element, key) => {
            weekdays.length == 0 ? weekdays = element.value : weekdays = `${weekdays} ${element.value}`;
        });


        console.log(username, name, email, city, rideingroup, weekdays);

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
            '<div class="albums">0</div>',,
            '0',
            `<div class="trash" data-userid='' data-tableindex='${document.querySelectorAll('.dataTable-table tbody tr').length}'>   
            <a>
                <i class="fas fa-trash-alt"></i>
            </a>
        </div>`
        ]
        datatable.rows().add(newLine);
        eventsFunction();
    })
}
