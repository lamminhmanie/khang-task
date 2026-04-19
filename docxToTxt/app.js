document.getElementById('upload-docx').addEventListener('change', function(event) {
    const reader = new FileReader();
    const file = event.target.files[0];

    if (!file) return;

    reader.onload = function(loadEvent) {
        const arrayBuffer = loadEvent.target.result; // Dữ liệu nhị phân của file
        // Sử dụng Mammoth để chuyển sang Plain Text (văn bản thuần)
        // Dùng extractRawText sẽ giúp bạn dễ xử lý thuật toán tách file hơn convertToHtml
        mammoth.extractRawText({ arrayBuffer: arrayBuffer })
            .then(displayResult)
            .catch(handleError);
    };

    reader.readAsArrayBuffer(file);
});

function displayResult(result) {
    const text = result.value; // Đây là toàn bộ chữ trong file Word của bạn
    document.getElementById('output').innerHTML = text;
    
    // Sau khi có 'text', bạn có thể bắt đầu thuật toán tách 3 phần tại đây

    // const arr = text.replace(/<p>/g,"").split("</p>");
    // console.log(arr)
    const array = text.split(/(READING PASSAGE \d+)/g);
    console.log(array);
    const paragraphAndQuestion = []
    for (let index = 2; index < array.length; index += 2) {
        const element = array[index];
        paragraphAndQuestion.push(element);
    }
    const paragraph = paragraphAndQuestion[0].split(/(\n\n\n\d+.)/g);
    console.log(paragraph)
    
    

}

function handleError(err) {
    console.error("Có lỗi xảy ra:", err);
}