export default function Legal() {
  return (
    <div className="page-container">
      <div className="legal-content">
        <a href="/" className="back-link">← トップに戻る</a>
        <h1>特定商取引法に基づく表記</h1>
        <p className="updated">最終更新日: 2026年3月15日</p>

        <table>
          <tbody>
            <tr>
              <th>事業者名</th>
              <td>Ascent</td>
            </tr>
            <tr>
              <th>運営責任者</th>
              <td>Mutsuki Nishizawa</td>
            </tr>
            <tr>
              <th>所在地</th>
              <td>〒182-8585 東京都調布市調布ヶ丘1-5-1<br />電気通信大学 西2号館6階 606号室</td>
            </tr>
            <tr>
              <th>電話番号</th>
              <td>請求があった場合、遅滞なく開示いたします。<br />お問い合わせ先メールアドレスまでご連絡ください。</td>
            </tr>
            <tr>
              <th>メールアドレス</th>
              <td><a href="mailto:info@ascent-web.jp" style={{ color: 'var(--color-accent)' }}>info@ascent-web.jp</a></td>
            </tr>
            <tr>
              <th>サービスURL</th>
              <td><a href="https://ascent-web.jp/hp" style={{ color: 'var(--color-accent)' }}>https://ascent-web.jp/hp</a></td>
            </tr>
            <tr>
              <th>販売価格</th>
              <td>各サービスページに記載（税込価格）<br />クリニック向けHP制作: 初期費用 30,000〜50,000円（税込）/ 月額 6,000〜8,000円（税込）<br />Talk Trainer Proプラン: 月額990円（税込）</td>
            </tr>
            <tr>
              <th>販売価格以外の<br />必要料金</th>
              <td>インターネット接続に必要な通信料はお客様のご負担となります。</td>
            </tr>
            <tr>
              <th>支払方法</th>
              <td>クレジットカード決済（Stripe経由）<br />対応ブランド: Visa, Mastercard, American Express, JCB<br />※クリニック向けHP制作は銀行振込にも対応</td>
            </tr>
            <tr>
              <th>支払時期</th>
              <td>Talk Trainer: サブスクリプション登録時に初回決済、以降毎月自動決済<br />クリニック向けHP制作: 契約時に初期費用、以降毎月月額費用をお支払い</td>
            </tr>
            <tr>
              <th>サービス提供時期</th>
              <td>Talk Trainer: 決済完了後、即時ご利用いただけます。<br />クリニック向けHP制作: 契約後2〜3週間で公開</td>
            </tr>
            <tr>
              <th>返品・キャンセル</th>
              <td>デジタルサービスの性質上、原則として返品はお受けしておりません。<br />詳細は<a href="/refund" style={{ color: 'var(--color-accent)' }}>返金・キャンセルポリシー</a>をご確認ください。</td>
            </tr>
            <tr>
              <th>動作環境</th>
              <td>Google Chrome, Safari, Firefox, Edge（最新版推奨）<br />インターネット接続が必要です。</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
