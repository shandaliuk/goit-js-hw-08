import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const CURRENT_TIME = 'videoplayer-current-time';

const iframeElement = document.querySelector('#vimeo-player');

const player = new Player(iframeElement);

if (localStorage.getItem(CURRENT_TIME)) {
  restoreTime();
}

const onTimeUpdate = event => {
  localStorage.setItem(CURRENT_TIME, event.seconds);

  if (event.seconds === event.duration) {
    localStorage.removeItem(CURRENT_TIME);
  }
};

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function restoreTime() {
  player.setCurrentTime(JSON.parse(localStorage.getItem(CURRENT_TIME)));
  player.play();
}
