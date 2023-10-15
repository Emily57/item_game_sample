*index
*initialize
  [eval exp="f.conversation_partner = 'yorumi_suzuto'"]
  [eval exp="f.location_name = '東堅大学研究棟'"]

*first_contact
  [move_location]

  [bg storage=token_research_building.png time=1000 wait=true]

  [message_true]
  [shizuku_show face=hou]
  [shizuku_window]
  （……あれ？[r]
  あそこのベンチに座ってるのって……。）[p]

  [chara_mod name=shizuku face=normal_a cross=false time=10]
  [shizuku_window]
  夜巳さん、こんにちは！[p]
  #

  ; [fadeinbgm storage=yorumi_theme.ogg loop=true time=2000]
  [chara_show name=yorumi face=kara cross=false time=1000]
  [yorumi_window]
  こんにちは、しずく。[r]
  しずくも大学に来てたんだ。[p]

  [chara_mod name=shizuku face=normal_a cross=false time=10]
  [shizuku_window]
  はい。自習室で勉強してこようかな〜って。[r]
  夜巳さんは研究室ですか？[p]

  [chara_mod name=yorumi face=smile cross=false time=10]
  [yorumi_window]
  うん。でも今は、ちょっと休憩中。[p]

  [chara_mod name=yorumi face=side_kara time=10]
  [yorumi_window]
  しずくも、隣おいでよ。[r]
  ここ、風当たりが良くて気持ちいいよ。[p]

  [chara_mod name=shizuku face=smile_a cross=false time=10]
  [shizuku_window]
  ありがとうございます。[r]
  お隣、失礼します！[p]

  [jump target=*action_select]

*action_select
  [message_false]
  [shizuku_hide]
  [chara_mod name=yorumi face=normal cross=false time=10]
  [chara_show name=yorumi face=normal cross=false time=10]
  [button graphic="parts/action_chosa_a.png" enterimg="parts/action_chosa_b.png" target=*investigation width=350 height=auto x=265 y=500 clickse=""]
  [button graphic="parts/action_talk_a.png" enterimg="parts/action_talk_b.png" target=*talk width=350 height=auto x=665 y=500 clickse=""]
  [button graphic="parts/action_evidence_a.png" enterimg="parts/action_evidence_b.png" storage=../others/plugin/item_mode/system/item_menu.ks target=*item_menu width=350 height=auto x=265 y=600 clickse=""]
  [button graphic="parts/action_move_a.png" enterimg="parts/action_move_b.png" target=*move width=350 height=auto x=665 y=600 clickse=""]
  [s]

*investigation
  ; @jump storage=main/research_buildilng/investigation.ks target=*investigation
  [s]

*talk
  [jump storage=main/research_building/talk.ks target=*talk]
  [s]

*move
  [move_mode]
  [s]
