import axios from 'axios';
import * as fs from 'fs';
import * as FormData from 'form-data';

const filePath = './face.jpg'; // 画像ファイルのパス

const main = async () => {
  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));

    const response = await axios.post('http://compreface/api/v1/detection/detect', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-api-key': '7700b4a7-bd1f-4063-9115-7f125371cf80',
        ...form.getHeaders(),
      },
    });

    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

main();