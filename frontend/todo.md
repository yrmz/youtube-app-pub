# Youtube App

## Todo

### 認証系

- [x] auth2.0 認証の自動化
- [x]useContext?にトークンいれる
- [x]ルーターの認証機能
- [] トークンリフレッシュ
- [x] トークン検証
- [x] 認証できなかったらログインにリダイレクト

### Youtube API 連携

- [x] アプリケーション登録
      　　`https://developers.google.com/youtube/registering_an_application?hl=ja`
- [] API 利用の同意を得る
- [x] Youtube API の動作検証
  - 認証
    　　`https://developers.google.com/youtube/v3/guides/auth/client-side-web-apps?hl=ja`
  - チャンネル取得
    　　`https://developers.google.com/youtube/v3/docs/subscriptions/list?hl=ja`
- [x] チャンネル一覧表示

### Firebase

- [] firebase DB との連携
- [] firebase auth との連携

### 機能

- [x] フォルダ作成
- [x] フォルダを localstrage に保存
- [x] チャンネルのフォルダ分け機能
- [x] チャンネルリスト表示にチャンネル表示
- [x] フォルダ削除
  - `https://react-bootstrap.github.io/components/modal/`
- [x] フォルダ名更新
- [x] 設定で Enter 押した時の挙動を直す
- [x] 未設定一覧の追加
- [] チャンネルに飛ぶようにしたい
- [] ログアウト機能

#### Phase2 機能

- [] Container を自動で作るツール作る
- [] ページング or 無限スクロールで出てくるようにする。
- [] フォルダ並び替え
- [] フィルター

### コンポーネント

- [x] description に文字数制限入れる
- [] 共通 error ページ
- [] not found ページ
- [] API が２回呼ばれる問題
- [] ローディング画面入れる

### スタイル

- [] ログインページ
- [] スタイル整える

## リファクタリング

- [] Container と Component に分ける
- [] 設定を保存したらモーダルを閉じる
- [] 各フォームのバリデーション
- [ ] default export やめる
- [ ] URL ベタがきやめる

## 振り返り

- DB 設計から先にすればよかった・・・
  - じゃないと state の設計が変わってきてしまう。
