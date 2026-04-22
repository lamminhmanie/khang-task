const input = document.getElementById('upload-docx');
input.addEventListener('change', event => {
    const file = input.files[0];
    if(!file) return;
    const reader = new FileReader();

    reader.onload = (event) => {
        mammoth.convertToHtml()
    }
    reader.readAsArrayBuffer(file)
});