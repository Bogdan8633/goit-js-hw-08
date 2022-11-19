import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';
const takeCurrentPlayingTime = function ({ seconds }) {
  localStorage.setItem(STORAGE_KEY, seconds);
  console.log(`Current second: ${seconds}`);
};

getStartPoint();

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on('play', function () {
  console.log('played the video!');
});

player.on('timeupdate', throttle(takeCurrentPlayingTime, 1000));

function getStartPoint() {
  const savedPreviousTime = localStorage.getItem(STORAGE_KEY);
  if (savedPreviousTime) {
    console.log('В памяти есть сохраненное время воспроизведения');
    player.setCurrentTime(localStorage.getItem(STORAGE_KEY));
  }
}
