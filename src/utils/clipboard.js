import ClipboardJS from 'clipboard';

var clipboard = new ClipboardJS('.clipboard');

clipboard.on('success', function (e) {
  console.info('Action:', e.action);
  console.info('Text:', e.text);
  // console.info('Trigger:', e.trigger);
  $message.success('复制成功！');

  e.clearSelection();
});

clipboard.on('error', function (e) {
  console.error('Action:', e.action);
  // console.error('Trigger:', e.trigger);
  $message.warning('值为空');
});
