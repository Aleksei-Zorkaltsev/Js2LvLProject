
class FeedBackForm {
    constructor(form){
        this.nameInput = form.elements[0];
        this.telInput = form.elements[1];
        this.mailInput = form.elements[2];
        this.massageTextarea = form.elements[3];
        this.button = form.elements[4];
        this.sistemError = form.lastElementChild;
    }

    validation(){
        this.nameInput.classList.remove('errForm');
        this.telInput.classList.remove('errForm');
        this.mailInput.classList.remove('errForm');
        this.sistemError.innerHTML = '';

        let resultName = this.validName(this.nameInput);
        let resultTel = this.validTel(this.telInput);
        let resultMail = this.validmail(this.mailInput);

        if(resultName == true && resultTel == true && resultMail == true){
            this.sistemError.innerHTML = '<span>Сообщение отправленно.</span>';
            return true
        }else{
            this.sistemError.innerHTML = '* Ошибка заполнения формы.';
            return false}
    }
    validName(name){
        if(name.value.search(/^[а-яА-ЯёЁ]+$|^[a-zA-Z]+$/) == -1){
            name.classList.add('errForm');
            return false
        }else{
            name.classList.remove('errForm');
            return true}
    }
    validTel(tel){
        if(tel.value.search(/^(\+7)(\(\d{3}\))\d{3}-\d{4}$/) == -1){
            tel.classList.add('errForm');
            return false
        }else{
            tel.classList.remove('errForm');
            return true}
    }
    validmail(mail){
        if(mail.value.search(/^[a-z]([\w\.\-]+)@([a-z]+)\.(\bru\b$|\bcom\b$)/i) == -1){
            mail.classList.add('errForm');
            return false
        }else{
            mail.classList.remove('errForm');
            return true}
    }
    clear(){
        this.nameInput.value ='';
        this.telInput.value ='';
        this.mailInput.value ='';
        this.massageTextarea.value ='';
    }
}

class Feedback {
    constructor(form){
        this.name = form.nameInput.value;
        this.tel = form.telInput.value;
        this.mail = form.mailInput.value;
        this.massage = form.massageTextarea.value;
    }
}

const feedbackForm = new FeedBackForm(document.forms.feedbackForm);
feedbackForm.button.addEventListener('click', (event)=>{
    if(feedbackForm.validation() == true){
        console.log(new Feedback(feedbackForm));
        feedbackForm.clear();
    }
})