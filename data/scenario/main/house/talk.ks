
*talk
  [cm]

  [glink name="talk_btn_1" color="btn_06_black" target=*weather text="今日の天気について" width=450 size="22" x=840 y="200" opacity=0]
  [glink name="talk_btn_2" color="btn_06_black" target=*book text="好きな本は？" width=450 size="22" x=840 y="280" opacity=0]
  [glink name="talk_btn_3" color="btn_06_black" target=*tabemono text="好きな食べ物は？" width=450 size="22" x=840 y="360" opacity=0]
  [glink name="talk_btn_4" color="btn_06_black" storage="main/house/index.ks" target=*action_select text="戻る" width=230 size="16" x=1060 y="460" opacity=0]

  [anim name="talk_btn_1" time="100" opacity="255"]
  [wait time="100"]
  [anim name="talk_btn_2" time="100" opacity="255"]
  [wait time="100"]
  [anim name="talk_btn_3" time="100" opacity="255"]
  [wait time="100"]
  [anim name="talk_btn_4" time="100" opacity="255"]
  [s]

*weather
  [cm]
  [chara_show_mod name=kitaoroshi face=majimaji]
  [shizuku_show_mod face=smile_a]
  [message_true]
  [shizuku_window]
  彪先輩、今日すっごく良い天気ですね！[p]

  [chara_mod name=kitaoroshi face=kangaegoto cross=false time=10]
  [kitaoroshi_window]
  ん〜？　そだね〜。[r]
  良い天気良い天気……。[p]

  [chara_mod name=shizuku face=perplexity_b cross=false time=10]
  [shizuku_window]
  （ぜ、全然興味なさそう……。）[p]

  [chara_mod name=shizuku face=hou cross=false time=10]
  [shizuku_window]
  彪先輩は、今日は[r]
  お出かけしないんですか？[p]

  [chara_mod name=kitaoroshi face=niyari cross=false time=10]
  [kitaoroshi_window]
  そ。今日がどれだけお出かけ日和でも[r]
  オレは出かけないよ。[p]

  [chara_mod name=kitaoroshi face=mousou cross=false time=10]
  何せ、オレには家で鍛錬するという[r]
  大事な用事があるもんね。[p]

  [chara_mod name=shizuku face=perplexity_a cross=false time=10]
  [shizuku_window]
  鍛錬……？[p]

  [chara_mod name=kitaoroshi face=wink cross=false time=10]
  [kitaoroshi_window]
  しずくちゃんは元気に庭を駆け回っておいで。[r]
  オレ、リビングで見てるから☆[p]

  [chara_mod name=shizuku face=aseriwarai cross=false time=10]
  [shizuku_window]
  庭は駆け回りませんよ！[p]
  [cm]
  [message_false]
  [jump target="*talk"]

*book
  [cm]
  [chara_show_mod name=kitaoroshi face=majimaji]
  [shizuku_show_mod face=hou]
  [message_true]
  [shizuku_window]
  彪先輩が今まで読んだ中で[r]
  面白かった本や漫画ってありますか？[p]

  [chara_mod name=kitaoroshi face=kangaegoto cross=false time=10]
  [kitaoroshi_window]
  オレ、やっぱ漫画は笑えるヤツが[r]
  好きなんだよね〜。[r]
  頭すっからかんでも読めるヤツ。[p]

  [chara_mod name=kitaoroshi face=mousou cross=false time=10]
  最近読んだヤツだと[r]
  『みかじめ』って漫画がイチオシ。[p]

  [chara_mod name=shizuku face=perplexity_a cross=false time=10]
  [shizuku_window]
  み、みかじめ……？[p]

  [chara_mod name=kitaoroshi face=niyari cross=false time=10]
  [kitaoroshi_window]
  その店の用心棒を名乗る野郎共が[r]
  用心棒料をめぐって戦う異能力バトル。[p]

  野郎たちは札束ビンタを夢見て[r]
  おしぼりビンタを炸裂するんだ。[p]

  [chara_mod name=kitaoroshi face=mousou cross=false time=10]
  昔はただのアツいおしぼりだったけど[r]
  今や「草」「炎」「水」属性の[r]
  おしぼりが跳梁跋扈。[p]

  [chara_mod name=kitaoroshi face=nico cross=false time=10]
  オレがあと10も若ければ、[r]
  きっとオレも漫画を真似して[r]
  電気おしぼりビンタを炸裂させてたね！[p]

  [chara_mod name=shizuku face=aseriwarai cross=false time=10]
  [shizuku_window]
  何が一体どういうことなんですか……。[p]

  [chara_mod name=kitaoroshi face=mousou cross=false time=10]
  [kitaoroshi_window]
  今度、しずくちゃんにも漫画を貸してあげるよ。[p]

  [chara_mod name=kitaoroshi face=wink cross=false time=10]
  そしたらしずくちゃんもオレと[r]
  みかじめトークしようね☆[p]

  [chara_mod name=shizuku face=perplexity_b cross=false time=10]
  [shizuku_window]
  （できる気がしないよ！）[p]
  [cm]
  [message_false]
  [jump target="*talk"]

*tabemono
  [cm]
  [chara_show_mod name=kitaoroshi face=majimaji]
  [shizuku_show_mod face=normal_a]
  [message_true]
  [shizuku_window]
  彪先輩の好きな食べ物はなんですか？[p]

  [chara_mod name=kitaoroshi face=mousou cross=false time=10]
  [kitaoroshi_window]
  オレはね〜、手羽先が好き。[r]
  特にスッゲー味の濃いやつ！[p]

  [chara_mod name=shizuku face=smile_a cross=false time=10]
  [shizuku_window]
  手羽先！　美味しいですよね！[r]
  私もかぶりつくのが大好きです！[p]

  [chara_mod name=kitaoroshi face=wink cross=false time=10]
  [kitaoroshi_window]
  そうそう。わかってんじゃ〜ん。[p]

  [chara_mod name=kitaoroshi face=kangaegoto cross=false time=10]
  [kitaoroshi_window]
  ……あれ？　でもわざわざオレに聞くってことは[r]
  もしかしてオレに振る舞う手料理のこと考えてた？[p]

  [chara_mod name=shizuku face=perplexity_a cross=false time=10]
  [shizuku_window]
  はい？[p]

  [chara_mod name=kitaoroshi face=mousou cross=false time=10]
  [kitaoroshi_window]
  しまった！　オレとしたことが[r]
  しずくちゃんの想いにも気づかず正直に答えちゃった！[r]
  手羽先なんて手料理しづらいのに！[p]

  [chara_mod name=kitaoroshi face=wink cross=false time=10]
  [kitaoroshi_window]
  しずくちゃん！[r]
  オレ、カレーも好きだよ！[p]

  [chara_mod name=shizuku face=aseriwarai cross=false time=10]
  [shizuku_window]
  そういうつもりで聞いた訳じゃないですからね？[p]

  [chara_mod name=shizuku face=hou cross=false time=10]
  [shizuku_window]
  あ、でも。カレーといえば、[r]
  晃くんもカレーが好きだったような？[p]

  [chara_mod name=kitaoroshi face=kushou cross=false time=10]
  [kitaoroshi_window]
  カレー"ライス"ね。[r]
  あと、秋刀魚も好きって言ってたはず。[p]

  [chara_mod name=kitaoroshi face=mousou cross=false time=10]
  [kitaoroshi_window]
  いや〜、わざわざ[r]
  秋刀魚が好きって言うなんてさ？[p]

  アッキーてば、絶対「秋刀魚好きなんて偉い！」って[r]
  言われたいがために言ってるでしょ。[p]

  [chara_mod name=shizuku face=aseriwarai cross=false time=10]
  [shizuku_window]
  そんな訳ないですよ！[p]

  [chara_mod name=shizuku face=normal_b cross=false time=10]
  [shizuku_window]
  （でも、好きな食べ物を聞かれて[r]
  秋刀魚って答える人って、珍しいかも。）[p]

  （秋刀魚に思い入れがあるのかな？[r]
  今度聞いてみよっと！）[p]

  [item_new_record category="testimony" target="akira_sukinatabemono"]
  [other_window]
  彪先輩から 晃の好きな食べ物 を聞いた！[r]
  晃の好きな食べ物 を 証言 フォルダに記録しました。[p]

  [cm]
  [message_false]
  [jump target="*talk"]
