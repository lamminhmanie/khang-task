const input = document.getElementById('upload-docx');
input.addEventListener('change', event => {
    const file = input.files[0];
    if(!file) return;
    const read = new FileReader();

    console.log(read);
});