document.getElementById('qr-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            const img = new Image();
            img.onload = function() {
                const canvas = document.getElementById('qr-canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                // jsQRを使ってQRコードを解析
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const qrCode = jsQR(imageData.data, canvas.width, canvas.height);
                
                if (qrCode) {
                    document.getElementById('qr-result').innerText = `QRコードの内容: ${qrCode.data}`;
                } else {
                    document.getElementById('qr-result').innerText = 'QRコードが認識されませんでした';
                }
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    }
});
