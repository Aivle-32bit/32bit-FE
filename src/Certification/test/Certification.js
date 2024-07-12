document.getElementById('businessForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const companyName = document.getElementById('companyName').value;
    const ceoName = document.getElementById('ceoName').value;
    const businessNumber = document.getElementById('businessNumber').value;
    const businessType = document.getElementById('businessType').value;
    const registrationImage = document.getElementById('registrationImage').files[0];

    console.log('회사 이름:', companyName);
    console.log('대표자명:', ceoName);
    console.log('사업자 등록 번호:', businessNumber);
    console.log('사업 종류:', businessType);
    console.log('사업자 등록증 이미지:', registrationImage);

    // 여기서 서버에 데이터를 전송하는 코드를 추가할 수 있습니다.
});
