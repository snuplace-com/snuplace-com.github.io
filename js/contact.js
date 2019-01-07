/**
 * Handle contact form.
 */
document.getElementById('contact-form').addEventListener('submit', function (event) {
    const url = event.target.action
    const name = event.target.name.value
    const email = event.target.email.value
    const message = event.target.message.value
    const content = {
        "data": {
            "name": name,
            "email": email,
            "message": message,
        }
    }

    const alertEl = event.target.getElementsByClassName('alert')[0];
    makeRequest(url, JSON.stringify(content), {
        "204": () => {
            // show success
            alertEl.hidden = false;
            event.target.reset();
            // scroll to the message
            alertEl.scrollIntoView({block: "center"}); 

            // restore form
            setTimeout(() => {
                alertEl.hidden = true;
            }, 10000)
        }
    })

    event.preventDefault()
})
