
export const submitEventListener = (datatable, eventsFunction) => {
    document.querySelector('#submitButton').addEventListener('click', () => {
        // console.log(username, name, email, city, rideingroup, weekdays);
        const newLine = formValidate();
        if(newLine === true) {
            return false;
        } else {
            datatable.rows().add(newLine);
            document.querySelector('#clearform').click() // clear form after include the new line;
            eventsFunction();
        }
    })
}



const formValidate = (element, key) => {

    const form = document.forms[0];
    const username = form.querySelector('input[name="username"]');
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const city = form.querySelector('input[name="city"]');
    const rideingroup = form.querySelector('input[name="ridegroup"]:checked');
    const weekdayelements = form.querySelector('input[name="weekday"]:checked');
    let error = false;

    if(username != null && username.value == "") {
        username.style.border = "1px solid red"
        error = true;
    } else {
        username.style.border = ""
    }
    if (name != null && name.value == "") {
        name.style.border = "1px solid red"
        error = true;
    } else {
        name.style.border = ""
    }

    if (email != null && email.value == "") {
        email.style.border = "1px solid red"
        error = true;
    } else {
        email.style.border = ""
    }

    if (rideingroup == null ) { 
        document.querySelectorAll('.radios label').forEach((e, key) => {
            e.classList.add('error');
        })
        error = true;
    } else {
        document.querySelectorAll('.radios label').forEach((e, key) => {
            e.classList.remove('error');
        })
    }
    if (weekdayelements == null) {
        document.querySelectorAll('.checkboxes label').forEach((e, key) => {
            e.classList.add('error');
        })
        error = true;
    } else {
        document.querySelectorAll('.checkboxes label').forEach((e, key) => {
            e.classList.remove('error');
        })
    }

    if(error) {
        return true;
    }

    let weekdays = '';
    if (weekdayelements.length) {
        weekdayelements.forEach((element, key) => {
            weekdays.length == 0 ? weekdays = element.value : weekdays = `${weekdays} ${element.value}`;
        });
    } else {
        weekdays = weekdayelements.value;
    }

    return [
        username.value,
        name.value,
        `<a href="mailto:${email.value}">
                ${email.value}
            </a>`,
        `-`,
        rideingroup.value,
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
}
