export default function Privacy() {
  return (
    <div className="page-container">
      <div className="legal-content">
        <a href="/" className="back-link">← トップに戻る</a>
        <h1>プライバシーポリシー</h1>
        <p className="updated">最終更新日: 2025年3月3日</p>

        <p>Ascent（以下「当事業者」）は、ユーザーの個人情報の保護を重要な責務と考えています。本プライバシーポリシーは、当事業者が提供するサービスにおける個人情報の取り扱いについて定めるものです。</p>

        <h2>1. 収集する情報</h2>
        <p>当事業者は、サービスの提供にあたり、以下の情報を収集する場合があります。</p>
        <ul>
          <li><strong>アカウント情報:</strong> Googleアカウント認証を通じて取得する氏名、メールアドレス、プロフィール画像</li>
          <li><strong>利用情報:</strong> サービスの利用状況、利用回数、分析結果等</li>
          <li><strong>決済情報:</strong> Stripe社を通じた決済に必要な情報（クレジットカード情報は当事業者では保持せず、Stripe社が管理します）</li>
          <li><strong>技術情報:</strong> IPアドレス、ブラウザの種類、アクセスログ等</li>
        </ul>

        <h2>2. 情報の利用目的</h2>
        <p>収集した情報は、以下の目的で利用します。</p>
        <ul>
          <li>サービスの提供・運営・改善</li>
          <li>ユーザー認証およびアカウント管理</li>
          <li>決済処理</li>
          <li>カスタマーサポートの提供</li>
          <li>サービスに関するお知らせの送信</li>
          <li>利用状況の分析・統計作成（個人を特定しない形式）</li>
        </ul>

        <h2>3. 第三者への提供</h2>
        <p>当事業者は、以下の場合を除き、ユーザーの個人情報を第三者に提供しません。</p>
        <ul>
          <li>ユーザーの同意がある場合</li>
          <li>法令に基づく場合</li>
          <li>サービスの提供に必要な外部サービス（Google認証、Stripe決済、データベースホスティング等）への委託</li>
        </ul>

        <h2>4. 外部サービスの利用</h2>
        <p>本サービスでは、以下の外部サービスを利用しています。各サービスの個人情報の取り扱いについては、それぞれのプライバシーポリシーをご参照ください。</p>
        <ul>
          <li>Google（認証）: <a href="https://policies.google.com/privacy" style={{ color: 'var(--color-accent)' }}>Googleプライバシーポリシー</a></li>
          <li>Stripe（決済）: <a href="https://stripe.com/jp/privacy" style={{ color: 'var(--color-accent)' }}>Stripeプライバシーポリシー</a></li>
          <li>Vercel（ホスティング）: <a href="https://vercel.com/legal/privacy-policy" style={{ color: 'var(--color-accent)' }}>Vercelプライバシーポリシー</a></li>
          <li>Google Gemini / Anthropic Claude（AI分析）: 各社のプライバシーポリシーに準拠</li>
        </ul>

        <h2>5. データの保管</h2>
        <p>ユーザーの個人情報は、サービスの提供に必要な期間保管されます。アカウントの削除を希望される場合は、下記のお問い合わせ先までご連絡ください。</p>

        <h2>6. セキュリティ</h2>
        <p>当事業者は、個人情報の漏洩・紛失・改ざんを防止するため、適切なセキュリティ対策を実施しています。ただし、インターネット上の通信において完全なセキュリティを保証することはできません。</p>

        <h2>7. Cookieについて</h2>
        <p>本サービスでは、認証状態の維持やサービスの改善のためにCookieを使用する場合があります。ブラウザの設定によりCookieを無効にすることができますが、一部のサービス機能が利用できなくなる場合があります。</p>

        <h2>8. ポリシーの変更</h2>
        <p>当事業者は、必要に応じて本ポリシーを変更する場合があります。重要な変更がある場合は、サービス内またはメールにて通知します。</p>

        <h2>9. お問い合わせ</h2>
        <p>個人情報の取り扱いに関するお問い合わせは、以下のメールアドレスまでご連絡ください。</p>
        <p>メール: <a href="mailto:nszw1101@gmail.com" style={{ color: 'var(--color-accent)' }}>nszw1101@gmail.com</a></p>
      </div>
    </div>
  );
}
