const sendImageFile = async () => {
  const fileInput = document.getElementById('imageFile');
  const resultDisplay = document.getElementById('resultDisplay');

  const file = fileInput.files[0];
  if (!file) {
    console.log('画像ファイルが選択されていません');
    resultDisplay.textContent = '画像ファイルを選択してください。';
    return;
  }

  console.log('画像ファイルを送信開始:', file.name);

  const reader = new FileReader();
  reader.onload = async () => {
    try {
      const response = await fetch('https://m2k7s2zf-3000.asse.devtunnels.ms/detect-face', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
        body: reader.result,
      });

      if (!response.ok) {
        throw new Error(`HTTPエラー: ${response.status}`);
      }

      const result = await response.json();
      console.log('サーバーからの応答:', result);
      resultDisplay.textContent = `顔検出結果: ${JSON.stringify(result, null, 2)}`;
    } catch (error) {
      console.error('エラー:', error);
      resultDisplay.textContent = 'エラーが発生しました。詳細はコンソールを確認してください。';
    }
  };

  reader.readAsArrayBuffer(file);
};
