*index
*initialize
  [eval exp="f.conversation_partner = 'midoshima_haruka'"]
  [eval exp="f.location_name = '東堅大学裏庭'"]

*contact
  [jump target=*first_contact cond="!f.midoshima_first"]
  [jump target=*second_contact cond="f.midoshima_first"]

*first_contact
  [move_location]
  [bg storage=token_backyard.png time=1000 wait=true]

  [message_true]
  [shizuku_show face=normal_b]
  [shizuku_window]
  え〜っと、きっとこのあたりに……あっ！[p]

  [chara_mod name=shizuku face=normal_a cross=false time=10]
  緑島先輩！　こんにちは！[p]
  #

  ; [fadeinbgm storage=midoshima_theme.ogg loop=true time=2000]
  [chara_show name=midoshima face=kaiwa cross=false time=1000]
  [midoshima_window]
  こんにちは、志貴さん。[p]

  [chara_mod name=midoshima face=oya cross=false time=10]
  [midoshima_window]
  こんなところでお会いするなんて珍しいですね。[r]
  どうかされたのですか？[p]

  [chara_mod name=shizuku face=smile_b cross=false time=10]
  [shizuku_window]
  はい。緑島先輩にお届け物です！[p]

  [midoshima_window]
  お届け物……？[p]
  [eval exp="f.midoshima_first = true"]
  [jump target=*action_select]

*second_contact
  [move_location]
  [bg storage=token_backyard.png time=1000 wait=true]

  [chara_show name=midoshima face=kaiwa cross=false time=1000]
  [shizuku_show face=normal_b]
  [message_true]
  [midoshima_window]
  こんにちは、志貴さん。[p]

  [chara_mod name=shizuku face=smile_a cross=false time=10]
  [shizuku_window]
  こんにちは！[p]
  #
  [jump target=*action_select]

*action_select
  [chara_show_mod name=midoshima face=normal cross=false time=10]
  [message_false]
  [shizuku_hide]
  [button graphic="parts/action_chosa_a.png" enterimg="parts/action_chosa_b.png" target=*investigation width=350 height=auto x=265 y=500 clickse=""]
  [button graphic="parts/action_talk_a.png" enterimg="parts/action_talk_b.png" target=*talk width=350 height=auto x=665 y=500 clickse=""]
  [button graphic="parts/action_evidence_a.png" enterimg="parts/action_evidence_b.png" storage=../others/plugin/item_mode/system/item_menu.ks target=*item_menu width=350 height=auto x=265 y=600 clickse=""]
  [button graphic="parts/action_move_a.png" enterimg="parts/action_move_b.png" target=*move width=350 height=auto x=665 y=600 clickse=""]
  [s]

*investigation
  @jump storage=main/backyard/investigation.ks target=*investigation
  [s]

*talk
  [jump storage=main/backyard/talk.ks target=*talk]
  [s]

*move
  [move_mode]
  [s]
