# Image Uploader

Webサイト上でファイルをドラッグ&ドロップで選択できるようにしたサンプルプロジェクトです。

デモサイトは[こちら](https://masashihamaguchi.github.io/ImageUploader/)

![screencapture.png](/img/screencapture.png)

## 実装方法

### 1. HTMLファイルにInputタグとファイルをドロップするエリアを用意する

```html:index.html
<!-- 画像をプレビューするimgタグ -->
<img id="image-area"></img>

<!-- inputタグ -->
<input id="file-input" type="file" accept="image/*">

<!-- ファイルをドロップするエリア -->
<div id="file-area">
  <div>
    <p>Choose file or drag it here.</p>
  </div>
</div>
```

### 2. Inputタグとドロップエリアを初期化するためのメソッドを用意する

```JavaScript:main.js
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
```

### 3. ドロップもしくは選択された画像を表示するためのメソッドを用意する

```JavaScript:main.js
const previewImage = function (files) {
    const imageArea = $('#image-area');

    const reader = new FileReader();
    reader.onload = (e) => {
        imageArea.attr('src', e.target.result);
    }

    // 画像を表示する
    reader.readAsDataURL(files[0]);
}
```

### 4. DOMツリーが構築されたタイミングでドロップエリアの初期化を行う

```JavaScript:main.js
$(document).ready(function () {
    initImageBox();
});
```


## 参考サイト

- [ファイルをドラッグ&ドロップでアップロード【ライブラリ不使用Javascript】](https://kuwk.jp/blog/dd/)
- [HTML5/JavaScript でファイルのドラッグ＆ドロップ、画像ファイルのプレビュー](https://r17n.page/2020/10/24/html-js-drag-and-drop-file/)
- [ドラッグ&ドロップでファイルを選択する方法と画像ファイルのプレビュー](https://pointsandlines.jp/front-end/javascript/drag-and-drop-select)
