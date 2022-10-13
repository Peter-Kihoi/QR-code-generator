const form = document.querySelector('#generate-form');
const qr = document.querySelector('#qrcode');

const  onGenerateSubmit = (e) => {
    e.preventDefault();

    const url = document.querySelector('#url').value;
    const size = document.querySelector('#size').value;
    const alert = document.querySelector('span');

    clearUI();

    if (url == '') {
        alert.classList.remove('invisible')
        alert.classList.add('visible');
    } else {
        alert.classList.add('invisible')
        alert.classList.remove('visible');
        showSpinner();

        setTimeout(() => {
            hideSpinner();
            generateQRCode(url, size);

            setTimeout(() => {
                const saveURL = qr.querySelector('img').src;
                createSaveButton(saveURL);
            },50)
        }, 1000);
    }
};

const generateQRCode = (url, size) => {
    const qrcode = new  QRCode('qrcode', {
        text: url,
        width: size,
        height: size,
    });
}

const showSpinner = () => {
    document.querySelector('#spinner').style.display = 'block';
}
const hideSpinner = () => {
    document.querySelector('#spinner').style.display = 'none';
}

const clearUI = () => {
    qr.innerHTML = '';
    const saveLink = document.querySelector('#save-link');
    if (saveLink) saveLink.remove();
        
}

const createSaveButton = (saveURL) => {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
    link.href = saveURL;
    link.download = 'qrcode';
    link.innerHTML = 'Save Image';
    document.getElementById('generated').appendChild(link);
}

hideSpinner();
form.addEventListener('submit', onGenerateSubmit);