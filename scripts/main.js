document.addEventListener('DOMContentLoaded', async (event) => {
    const dropArea = document.getElementById('drop-area');
    const dropMessage = document.createElement('p');
    dropMessage.id = 'drop-message';
    dropMessage.textContent = 'ここに画像をドラッグ＆ドロップ';
    dropArea.appendChild(dropMessage);

    const myButton1 = document.getElementById('button1');
    const myButton2 = document.getElementById('button2');
    const resultArea = document.getElementById('result');

    // ドラッグオーバー時のスタイル変更
    const handleDragOver = (e) => {
        e.preventDefault();
        dropArea.classList.add('hover');
    };

    // ドラッグリーブ時のスタイルリセット
    const handleDragLeave = (e) => {
        dropArea.classList.remove('hover');
    };

    // ドロップ時の処理
    const handleDrop = async (e) => {
        e.preventDefault();
        dropArea.classList.remove('hover');

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = async (event) => {
                    
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    img.style.maxWidth = '100%';
                    img.style.maxHeight = '100%';
                    img.style.objectFit = 'contain';
                    dropArea.innerHTML = '';
                    dropArea.appendChild(img);

                    dropArea.removeEventListener('dragover', handleDragOver);
                    dropArea.removeEventListener('dragleave', handleDragLeave);
                    dropArea.removeEventListener('drop', handleDrop);
                    // ボタンを有効化
                    myButton1.disabled = false;
                    myButton2.disabled = false;
                };

                reader.onerror = (error) => {
                    console.error('ファイルの読み込み中にエラーが発生しました:', error);
                    alert(`ファイルの読み込み中にエラーが発生しました: ${error.message}`);
                };

                reader.readAsDataURL(file);
            } else {
                alert('画像ファイルをドロップしてください。');
            }
        }
    };

    dropArea.addEventListener('dragover', handleDragOver);
    dropArea.addEventListener('dragleave', handleDragLeave);
    dropArea.addEventListener('drop', handleDrop);

    // 画像を削除して初期状態にリセットするボタンのクリックイベントリスナーを追加
    myButton1.addEventListener('click', () => {
        dropArea.innerHTML = '';
        dropArea.appendChild(dropMessage);
        resultArea.innerHTML = '';

        // ボタンを無効化
        myButton1.disabled = true;
        myButton2.disabled = true;
    });

    // 別のページに移動するボタンのクリックイベントリスナーを追加
    myButton2.addEventListener('click', () => {
        // 新しい「戻る」ボタンを作成
        const backButton = document.createElement('button');
        backButton.textContent = '戻る';
        backButton.id = 'backButton';
        document.body.appendChild(backButton);

        myButton1.remove();
        myButton2.remove();

        // 「戻る」ボタンのクリックイベントリスナーを追加
        backButton.addEventListener('click', () => {
            // 「戻る」ボタンを削除
            backButton.remove();

            // 初期状態にリセット
            dropArea.innerHTML = '';
            dropArea.appendChild(dropMessage);
            resultArea.innerHTML = '';

            document.body.appendChild(myButton1);
            document.body.appendChild(myButton2);

            // ボタンを無効化
            myButton1.disabled = true;
            myButton2.disabled = true;
        });
    });
});