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
    const text = result.value; // Đây là toàn bộ chữ trong file Word thành html tag
    document.getElementById('output').innerHTML = text;
    
    //Tách mỗi cặp <p></p> thành một phần tử trong mảng
    let tagSplit = text.split(/(<p>.*?<\/p>)/g)
    tagSplit = tagSplit.filter(item => item !== "");
  
    //Khai báo array chứa paragraph
    let paragraph = [];
    
    //Array chứa index bắt đầu tiêu đề đoạn paragraph
    const indexParagraphStartArr = [];

    //Lấy các index bắt đầu paragraph
    for(let i = 0; i < tagSplit.length; i++){
        if((/<p><strong>READING PASSAGE \d+\t*<\/strong><\/p>/g).test(tagSplit[i])){
            indexParagraphStartArr.push(i);
        }
    }

    //Đẩy các paragraph vào mảng paragraph.
    for(let i = 0; i < indexParagraphStartArr.length; i++){
        for(let j = indexParagraphStartArr[i]; j < tagSplit.length; j++){
            if((/(<p>\d+\..*?<\/p>)/g).test(tagSplit[j])){
                break;
            }
            paragraph.push(tagSplit[j]);
            // ghi đè "" vào phần tử đó của tagSplit
            tagSplit[j] = "";
        }
    }

    //filter các phần tử "" để lấy các câu hỏi.
    let question = tagSplit.filter(item => item !== "")
    
    let testResult = question.filter(item => (/<p><strong>\(\w\).*?<\/p>/g).test(item))
    
    console.log(paragraph)
    console.log(question)
    console.log(testResult)

}

function handleError(err) {
    console.error("Có lỗi xảy ra:", err);
}