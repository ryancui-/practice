import MyDialog from './my-dialog/dialog';
import './my-dialog/dialog.css';

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
