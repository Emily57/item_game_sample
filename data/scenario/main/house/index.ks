*index
*initialize
  [eval exp="f.conversation_partner = 'kitaoroshi_hyo'"]
  [eval exp="f.location_name = '志貴ハウス'"]

*contact
  [jump target=*first_contact cond="!f.kitaoroshi_first"]
  [jump target=*second_contact cond="f.kitaoroshi_first"]

*first_contact
  [move_location]

  [bg storage=shikihouse_livingroom_daytime.png time=1000 wait=true]

  [message_true]
  [other_window]
  それは、ある日のこと……。[p]

  [shizuku_show face=smile_a]
  [shizuku_window]
  おはようございまーす！[p]
  #

  ; [fadeinbgm storage=kitaoroshi_theme.ogg loop=true time=2000]
  [chara_show name=kitaoroshi face=niyari cross=false time=1000]
  [kitaoroshi_window]
  おっ。おはよ、しずくちゃん。[r]
  もしかして今日、大学？[p]

  [chara_mod name=shizuku face=normal_a cross=false time=10]
  [shizuku_window]
  はい。自習室で勉強してこようかな〜って。[p]

  [chara_mod name=kitaoroshi face=wink cross=false time=10]
  [kitaoroshi_window]
  偉いね〜。[r]
  偉いついでにさ、オレのお願い聞いてくんない？[p]

  [chara_mod name=shizuku face=perplexity_a cross=false time=10]
  [shizuku_window]
  偉いついでって言葉、初めて聞きましたよ……。[r]
  お願いってなんですか？[p]

  [chara_mod name=kitaoroshi face=kushou cross=false time=10]
  [kitaoroshi_window]
  いやさ〜、ミドリってば、朝急いでたみたいで[r]
  園芸部で使う封筒を忘れて[r]
  大学に行っちゃったんだよね。[p]

  [kitaoroshi_window]
  オレが届けたいところだけど、オレは今、[r]
  宅急便の到着待ちで家にいなきゃいけないからさ。[p]
  しずくちゃん、これミドリに届けてくれない？[p]

  [chara_mod name=shizuku face=smile_a cross=false time=10]
  [shizuku_window]
  そういうことなら、大丈夫ですよ！[r]
  お届けします！[p]

  [chara_mod name=kitaoroshi face=wink cross=false time=10]
  [kitaoroshi_window]
  よろしく〜☆　園芸部は午後からだろうし、[r]
  急がなくて大丈夫だからね。[p]

  [chara_mod name=shizuku face=normal_a cross=false time=10]
  [shizuku_window]
  わかりました！[p]

  [item_new_record category="evidence" target="engeibu_futo"]
  [other_window]
  彪先輩から 園芸部の封筒 を受け取った！[r]
  園芸部の封筒 を 証拠品 フォルダに記録しました。[p]

  [chara_mod name=shizuku face=normal_b cross=false time=10]
  [shizuku_window]
  （準備したら出かけよう！）[p]
  [eval exp="f.kitaoroshi_first = true"]
  [jump target=*action_select]

*second_contact
  [move_location]
  [bg storage=shikihouse_livingroom_daytime.png time=1000 wait=true]

  ; [fadeinbgm storage=kitaoroshi_theme.ogg loop=true time=2000]
  [chara_show name=kitaoroshi face=niyari cross=false time=1000]
  [shizuku_show face=normal_b]
  [message_true]
  [kitaoroshi_window]
  しずくちゃん。おかえり〜。[p]

  [chara_mod name=shizuku face=smile_a cross=false time=10]
  [shizuku_window]
  ただいまです！[p]
  #
  [jump target=*action_select]

*action_select
  [message_false]
  [shizuku_hide]
  [chara_mod name=kitaoroshi face=majimaji cross=false time=10]
  [chara_show name=kitaoroshi face=majimaji cross=false time=10]
  [button graphic="parts/action_chosa_a.png" enterimg="parts/action_chosa_b.png" target=*investigation width=350 height=auto x=265 y=500 clickse=""]
  [button graphic="parts/action_talk_a.png" enterimg="parts/action_talk_b.png" target=*talk width=350 height=auto x=665 y=500 clickse=""]
  [button graphic="parts/action_evidence_a.png" enterimg="parts/action_evidence_b.png" storage=../others/plugin/item_mode/system/item_menu.ks target=*item_menu width=350 height=auto x=265 y=600 clickse=""]
  [button graphic="parts/action_move_a.png" enterimg="parts/action_move_b.png" target=*move width=350 height=auto x=665 y=600 clickse=""]
  [s]

*investigation
  @jump storage=main/house/investigation.ks target=*investigation
  [s]

*talk
  [jump storage=main/house/talk.ks target=*talk]
  [s]

*move
  [move_mode]
  [s]
