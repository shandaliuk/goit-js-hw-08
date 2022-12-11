import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const CURRENT_TIME = 'videoplayer-current-time';

const iframeElement = document.querySelector('#vimeo-player');

const player = new Player(iframeElement);

const savedTime = localStorage.getItem(CURRENT_TIME);

if (savedTime) {
  restoreTime(savedTime);
}

const onTimeUpdate = event => {
  localStorage.setItem(CURRENT_TIME, event.seconds);

  if (event.seconds === event.duration) {
    localStorage.removeItem(CURRENT_TIME);
  }
};

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function restoreTime(timestamp) {
  player.setCurrentTime(JSON.parse(timestamp));
  player.play();
}
