const contactForm = document.getElementById('contact-form');
const emailInputBox = document.getElementById('email-input-box');
const nameInputBox = document.getElementById('name-input-box');
const messageInputBox = document.getElementById('message-input-box');
const contactSubmitBtn = document.getElementById('contact-submit-btn');
const submitBtnLogo = document.getElementById('send-btn-icon');
const submitBtnTxt = document.getElementById('submit-btn-txt');

// the following keys/IDs are public and can be exposed 
// though security is still not guaranteed
const publicKey = "S2z636yqByQIXsYdP";
const templateId = "template_hjadnge";
const serviceId = "service_2i9k2ge";

emailjs.init({publicKey: publicKey});

contactSubmitBtn.addEventListener('click', (e) => {
    handleSubmit(e);
});

const handleSubmit = async (e) => {
    e.preventDefault();

    let email = emailInputBox.value;
    let name = nameInputBox.value;
    let message = messageInputBox.value;

    let emailParams = {
        from_name: name,
        from_email: email,
        message: message,
        date_sent: getFullCurrentDateTime()
    }

    try{
        submitBtnLogo.src = "./src/assets/loading.svg";
        submitBtnTxt.innerText = "Sending";
        contactSubmitBtn.disabled = true;
        contactSubmitBtn.classList.remove("cursor-pointer");
        contactSubmitBtn.classList.add("cursor-progress");

        await emailjs.send(serviceId, templateId, emailParams);

        contactSubmitBtn.classList.remove("cursor-progress");
        contactSubmitBtn.classList.add("cursor-pointer");
        submitBtnLogo.src = "./src/assets/check.svg";
        submitBtnTxt.innerText = "Sent!";
    } catch(err){
        submitBtnLogo.src = "./src/assets/send.svg";
        submitBtnTxt.innerText = "Send";
    } finally {
        clearContactForm();
        contactSubmitBtn.disabled = false;
        contactSubmitBtn.classList.remove("cursor-progress");
        contactSubmitBtn.classList.add("cursor-pointer");
        setTimeout(() => {
            submitBtnLogo.src = "./src/assets/send.svg";
            submitBtnTxt.innerText = "Send";
        }, 5000);
    }
}

const clearContactForm = () => {
    emailInputBox.value = '';
    nameInputBox.value = '';
    messageInputBox.value = '';
}

const getFullCurrentDateTime = () => {
    const currentDate = new Date().toLocaleString('en-PH', {
        timeZone: 'Asia/Manila',
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

    return currentDate;
}