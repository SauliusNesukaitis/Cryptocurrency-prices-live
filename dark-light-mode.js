const darkModeBtn = document.querySelector('#dark-light-mode')

function darkLightMode() {
    let element = document.body;
    darkModeBtn.addEventListener('click', event => {
        event.preventDefault()
        element.classList.toggle("dark-light-mode");
    })
}

darkLightMode()