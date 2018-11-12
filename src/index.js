import './index.css';

const map = {
  labs: '/labs.html',
  drama: '/drama.html'
};

Object.keys(map).forEach(key => {
  document.getElementById(key).addEventListener('click', () => {
    location.href = map[key];
  });
});
