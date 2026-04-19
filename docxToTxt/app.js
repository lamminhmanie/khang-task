document.getElementById('upload-docx').addEventListener('change', function(event) {
    const reader = new FileReader();
    const file = event.target.files[0];

    if (!file) return;

    reader.onload = function(loadEvent) {
        const arrayBuffer = loadEvent.target.result; // Dữ liệu nhị phân của file
        // Sử dụng Mammoth để chuyển sang Plain Text (văn bản thuần)
        // Dùng extractRawText sẽ giúp bạn dễ xử lý thuật toán tách file hơn convertToHtml
        mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
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
    const array = text.split(/(<p><strong>READING PASSAGE \d+\t*<\/strong><\/p>)/g);
    console.log(array);
    const paragraph = []
    const question = [];
    for (let index = 2; index < array.length; index += 2) {
        const element = array[index].split(/(<\/p><p>\d+.)/g);
        paragraph.push(array[index - 1])
        paragraph.push([...element.slice(0,1),"</p>"].join(""))
        question.push(array[index - 1])
        question.push(element.slice(1))
    }
    
    
    question.forEach((element,i) => {
        if(i % 2 !== 0){
            element.forEach((value, j) => {
                if(j % 2 !== 0){
                    element[j] = [element[j - 1].replace("</p>",""),element[j],"</p>"].join("");
                }
            });
            question[i] = element.filter((_, index) => {
                return index % 2 !== 0;
            });
        }
    });
    

    console.log(paragraph);
    console.log(question);
    // console.log(paragraphAndQuestion[0].split(/(<\/p><p>\d+.)/g))
    
    

}

function handleError(err) {
    console.error("Có lỗi xảy ra:", err);
}