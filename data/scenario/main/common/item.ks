*yorumi_suzuto_and_midoshima_haruka
  [chara_reset]
  [item_use]
  [message_true]
  [shizuku_show face=smile_b]
  [shizuku_window]
  緑島先輩と夜巳さんの検証[p]

  [cm]
  [chara_reset]
  [message_false]
  [item_use_end]
  [return]

*phone_number_and_smartphone
  [chara_reset]
  [item_use]
  [message_true]
  [other_window]
  友達に電話をかけてみた。[p]
  楽しい時間が過ごせた！[p]

  [cm]
  [chara_reset]
  [message_false]
  [item_use_end]
  [return]

*hyo_nigate_tabemono_and_milk_icecandy
  [chara_reset]
  [item_use]
  [shizuku_show face=hou]
  [message_true]
  [shizuku_window]
  （たくさんのミルクアイスキャンディー……。[r]
  だけど、彪先輩は牛乳が苦手……。）[p]

  [chara_mod name=shizuku face=perplexity_b cross=false time=10]
  [shizuku_window]
  （……ん？　もしかして、彪先輩。[r]
  ミルクアイスキャンディーのことも苦手で……）[p]

  （私たちにかわりに食べてもらおうと[r]
  している……、ってこと？）[p]

  [item_new_record category="testimony" target="milk_icecandy_for_hyo"]
  [other_window]
  ミルクアイスキャンディーのこと を[r]
  証言 フォルダに記録しました。[p]

  [shizuku_window]
  （今度、それとなく聞いてみよう。）[p]
  [cm]
  [chara_reset]
  [message_false]
  [item_use_end]
  [return]
  
*else
  [chara_reset]
  [item_use]
  [message_true]
  [other_window]
  特に関連性はなさそうだ。[p]

  [cm]
  [chara_reset]
  [message_false]
  [item_use_end]
  [return]
