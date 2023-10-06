
*talk

  [cm]

  [glink name="talk_btn_1" color="btn_06_black" target=*talk text="明日のことについて" width=450 size="22" x=840 y="200" opacity=0]
  [glink name="talk_btn_2" color="btn_06_black" target=*talk text="何をしているの？" width=450 size="22" x=840 y="280" opacity=0]
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

*tabemono

  [cm]

  [shizuku_show face=normal_a]
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
