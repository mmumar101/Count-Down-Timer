let display__time_left = document.querySelector('.display__time_left');
let display__end_time = document.querySelector('.display__end_time');
const timer__button = document.querySelectorAll('.timer__button');
const customForm = document.querySelector('[name="customForm"]');
const mins = document.querySelector('[name= "minutes"]');



let countDown;
const digitTime = (seconds) => {
    clearInterval(countDown);
    const digitTime = Date.now()
    
    const future = digitTime + (seconds * 1000);
    displayTimeBack(future);
    //console.log(new Date (future));
   
    displayCountDown(seconds)
   countDown = setInterval (() => {
        let secondsLeft = Math.round((future  - Date.now()) / 1000)
        if (secondsLeft < 0){
            clearInterval(countDown)
            return
        }
       // console.log(Math.abs(secondsLeft));
       displayCountDown(Math.abs(secondsLeft))
    }, 1000)
      
}

const displayCountDown = secondsLeft => {
    let minute = Math.floor (secondsLeft/60);
    let seconds = secondsLeft % 60
    let display = `${minute}:${seconds < 10 ? '0':''}${seconds}`
    display__time_left.textContent= display

} 

function displayTimeBack (future){
    let formattedFuture = new Date (future);
    let futureHour = formattedFuture.getHours();
    let futureMinutes = formattedFuture.getMinutes();
    const display = `Be Back At ${futureHour > 12 ? futureHour % 12 : futureHour}:${futureMinutes < 10 ? '0' : ''}${futureMinutes}`;
    display__end_time.textContent = display
    
}

function handlingCountDown(){
    const seconds = parseInt(this.dataset.time);
    digitTime(seconds);
}
//digitTime(90)
timer__button.forEach((button) =>{
    button.addEventListener('click', handlingCountDown)
}); 

customForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const seconds = mins.value * 60;
    mins.value= "";
    digitTime(seconds)
});


