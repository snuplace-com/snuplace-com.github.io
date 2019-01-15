'use strict';

/**
 * Handle newsletter input field.
 */
document.getElementById('subscribe').addEventListener('submit', function (event) {
    const url = event.target.action
    const email = event.target.email.value
    const content = {
        "data": { "email": email }
    }
    makeRequest(url, JSON.stringify(content), {
        "204": () => subscribeSuccess(event),
        "422": () => subscribeSuccess(event)
    })

    event.preventDefault();
});

function subscribeSuccess(event) {
    event.target.email.value = ''

    const current = event.target.submit.innerText;
    event.target.submit.innerText = 'ISCRITTO!'
    setTimeout(() => {
        event.target.submit.innerText = current
    }, 3000);
}

/**
 * Make a JSON API request.
 * 
 * @param {string} url 
 * @param {string} content 
 * @param {JSON} callback a callback per http reponse status
 */
function makeRequest(url, content, callbacks) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        // DONE with NO_CONTENT
        if (xmlhttp.readyState == 4) {
            const status = xmlhttp.status;
            if (callbacks && callbacks[status]) {
                callbacks[status]();
            }
        }
    };

    xmlhttp.open('POST', url, true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.setRequestHeader('Accept', 'application/json');
    xmlhttp.send(content);
}

/**
 * Copy to clipboard from permalink input
 * 
 * @param {HTMLDocument} button clicked
 */
function copyPermalink(button) {
    const input = document.querySelector('#permalink');
    if (!input) {
        return;
    }

    input.select();
    document.execCommand('copy');

    const url = input.value;
    const icon = button.getElementsByClassName('fa')[0];

    // show visual feedback
    icon.classList.remove('fa-paste');
    icon.classList.add('fa-ok');
    input.value = "Permalink copiato!";
    input.blur();

    setTimeout(() => {
        // restore visual state
        icon.classList.remove('fa-ok');
        icon.classList.add('fa-paste');
        input.value = url;
    }, 3000);
}
