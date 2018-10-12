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
