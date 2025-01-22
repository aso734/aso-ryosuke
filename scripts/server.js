const { exec } = require('child_process');
const imagePath = 'img_pngs/syukatu.jpg'; // 画像パスを指定

const curlCommand = `curl -s "http://compreface/api/v1/detection/detect" \
    -H "Content-Type: multipart/form-data" \
    -H "x-api-key: 7700b4a7-bd1f-4063-9115-7f125371cf80" \
    -F "file=@${imagePath}"`;

exec(curlCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing curl: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    try {
        const response = JSON.parse(stdout); // JSONパース
        console.log('Detected face coordinates:', response.result);

        // 結果が空でない場合、顔の座標を表示
        if (response.result && response.result.length > 0) {
            response.result.forEach((face, index) => {
                console.log(`Face ${index + 1} coordinates:`, face.box);
            });
        }
    } catch (parseError) {
        console.error('Failed to parse response:', parseError);
    }
});
