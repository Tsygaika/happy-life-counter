// класс для создание таймера обратного отсчета
class CountdownTimer {
    constructor(deadline, cbChange, cbComplete) {
      this._deadline = deadline;
      this._cbChange = cbChange;
      this._cbComplete = cbComplete;
      this._timerId = null;
      this._out = {
        days: '', hours: '', minutes: '', seconds: '',
        daysTitle: '', hoursTitle: '', minutesTitle: '', secondsTitle: ''
      };
      this._start();
    }
    static declensionNum(num, words) {
      return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }
    _start() {
      this._calc();
      this._timerId = setInterval(this._calc.bind(this), 1000);
    }
    _calc() {
      const diff = this._deadline - new Date();
      const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
      const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
      const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
      const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
      this._out.days = days < 10 ? '0' + days : days;
      this._out.hours = hours < 10 ? '0' + hours : hours;
      this._out.minutes = minutes < 10 ? '0' + minutes : minutes;
      this._out.seconds = seconds < 10 ? '0' + seconds : seconds;
      this._out.daysTitle = CountdownTimer.declensionNum(days, ['день', 'дня', 'дней']);
      this._out.hoursTitle = CountdownTimer.declensionNum(hours, ['час', 'часа', 'часов']);
      this._out.minutesTitle = CountdownTimer.declensionNum(minutes, ['минута', 'минуты', 'минут']);
      this._out.secondsTitle = CountdownTimer.declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
      this._cbChange ? this._cbChange(this._out) : null;
      if (diff <= 0) {
        clearInterval(this._timerId);
        this._cbComplete ? this._cbComplete() : null;
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {

    // .timer-2 (до конца месяца)
    const elDays2 = document.querySelector('.timer-2 .timer__days');
    const elHours2 = document.querySelector('.timer-2 .timer__hours');
    const elMinutes2 = document.querySelector('.timer-2 .timer__minutes');
    const elSeconds2 = document.querySelector('.timer-2 .timer__seconds');
    const deadline2 = new Date(2025, 5, 30,23,59,59);
    new CountdownTimer(deadline2, (timer) => {
      elDays2.textContent = timer.days;
      elHours2.textContent = timer.hours;
      elMinutes2.textContent = timer.minutes;
      elSeconds2.textContent = timer.seconds;
      elDays2.dataset.title = timer.daysTitle;
      elHours2.dataset.title = timer.hoursTitle;
      elMinutes2.dataset.title = timer.minutesTitle;
      elSeconds2.dataset.title = timer.secondsTitle;
    }, () => {
      document.querySelector('.timer-2 .timer__result').innerHTML = "<h1 class='final_text'>Счастливая жизнь наступила!!!</h1><video class='final_video' src='smiles.mp4' loop autoplay muted preload style='line-height: 0'></video>";
    });

  });