import MyDialog from './my-dialog/dialog';
import './my-dialog/dialog.css';

import MyBanner from './my-banner/banner';
import './my-banner/banner.css';

function openMyDialog() {
  console.log('open my-dialog');
  const dialog = new MyDialog({
    title: 'Title',
    content: 'Hello, World',
    onCancel() {
      console.log('cancel');
    },
    onConfirm() {
      console.log('confirm');
    }
  });
}

document.getElementById('dialogBtn').addEventListener('click', openMyDialog);

const myBanner = new MyBanner(document.getElementById('banner'));
