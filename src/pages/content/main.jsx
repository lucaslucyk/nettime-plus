// import { unmountComponentAtNode } from 'react-dom';
import { createRoot } from 'react-dom/client';
import PlusPopup from '@pages/content/PlusPopup';

const waitTime = time => {
  return new Promise(resolve => setTimeout(() => resolve(), time));
};

// const handleMouseUp = async e => {
//   if (e.button != 0 || !e.altKey || !e.ctrlKey) return;
//   await waitTime(10);
//   // console.log(document.activeElement);
//   const clickedPosition = { x: e.clientX, y: e.clientY };
//   showContainer(clickedPosition);
// };

const handleKeyDown = e => {
  if (e.key === 'Escape') {
    // removeTranslatecontainer()
    removeContainer();
  }
};

const onContextMenu = async e => {
  if (e.button != 2 || !e.altKey) return;
  e.preventDefault();
  await waitTime(10);
  // console.log(document.activeElement);
  const clickedPosition = { x: e.clientX, y: e.clientY };
  showContainer(clickedPosition);
};

// const getSelectedText = () => {
//   const element = document.activeElement
//   const isInTextField = element.tagName === 'INPUT' || element.tagName === 'TEXTAREA'
//   const selectedText = isInTextField
//     ? element.value.substring(element.selectionStart, element.selectionEnd)
//     : window.getSelection()?.toString() ?? ''
//   return selectedText
// }

const removeContainer = () => {
  const container = document.getElementById('nt-plus');
  if (!container) return;

  // unmountComponentAtNode(element)
  const root = createRoot(container);
  root.unmount();
  container.parentNode.removeChild(container);
};

const showContainer = ({ x, y }) => {
  const element = document.getElementById('nt-plus');
  if (element) return;

  document.body.insertAdjacentHTML(
    'beforeend',
    `<div id="nt-plus" style="top: ${y}px; left: ${x}px" class="plus-container"></div>`,
  );
  const container = document.getElementById('nt-plus');
  const root = createRoot(container);
  root.render(<PlusPopup />);
};

const init = async () => {
  // document.addEventListener('mouseup', handleMouseUp);
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('contextmenu', onContextMenu);
  // document.addEventListener('visibilitychange', handleVisibilityChange)
};
void init();
