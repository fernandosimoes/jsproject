const hideelements = () => {

    let lielements = document.querySelectorAll('.breadcrumb--list li')
    const elementslenght = lielements.length - 1;
    lielements.forEach((e, k) => {
        if (k >= 2 && k < elementslenght) {
            if (!e.classList.contains('ellipseshide')) {
                e.classList.add('hide');
            }
        }
        // if (k == elementslenght) {
        //     document.querySelector('.ellipseshide').classList.remove('ellipseshide')
        // }
    })
}

const showElements = () => {

}
hideelements()