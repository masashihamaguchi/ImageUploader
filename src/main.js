/**
 *  main.js
 */

const previewImage = function (files) {
    const imageArea = $('#image-area');

    const reader = new FileReader();
    reader.onload = (e) => {
        imageArea.attr('src', e.target.result);
    }

    // 画像を表示する
    reader.readAsDataURL(files[0]);
}

const initImageBox = function () {
    const fileArea = $('#file-area');
    const fileInput = $('#file-input');

    // dragover: マウスが乗った時
    fileArea.on('dragover', function (event) {
        event.preventDefault();
        fileArea.addClass('dragover');
    });

    // dragleave: マウスが外れた時
    fileArea.on('dragleave', function (event) {
        event.preventDefault();
        fileArea.removeClass('dragover');
    });

    // drop: 画像をドロップした時
    fileArea.on('drop', function (event) {
        event.preventDefault();
        fileArea.removeClass('dragover');

        // ドロップされたファイルを展開
        const files = event.originalEvent.dataTransfer.files;

        // ファイル形式が画像であるか確認
        if (files[0].type.match(/image\/*/)) {
            // 画像を表示する
            previewImage(files);
            // 画像をinputタグへ入れる
            fileInput.prop('files', files);
        } else {
            // エラーハンドリング
            window.alert('イメージファイル以外はアップロードできません。');
        }
    });

    // change: 画像が変更された時
    fileInput.on('change', function (event) {
        event.preventDefault();

        console.log(event);
        // ドロップされたファイルを展開
        const files = event.originalEvent.target.files;
        // 画像を表示する
        previewImage(files);
    });
}

// DOMツリーが構築されたタイミングでドラッグエリアを初期化する
$(document).ready(function () {
    initImageBox();
});
