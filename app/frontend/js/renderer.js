//App controls
const minButton = document.querySelector('#min-window');
const maxButton = document.querySelector('#max-window');
const closeButton = document.querySelector('#close-app');

minButton.addEventListener('click', () => {
    ipcRenderer.send('minApp');
    console.log('click')
});

maxButton.addEventListener('click', () => {
    ipcRenderer.send('maxApp');
});

closeButton.addEventListener('click', () => {
    ipcRenderer.send('closeApp');
});