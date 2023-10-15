; plugin化されていない雑多なmacroを置く場所

[call storage="../others/plugin/macro/debug.ks"]

[macro name=move_location]
  [message_false]
  [chara_reset]
  [fadeoutbgm time=1000 wait=false]
  [bg time="1000" storage=black.png wait=true]
[endmacro]

[macro name=chara_reset]
  [chara_hide name=yorumi pos_mode=false time=10]
  [chara_hide name=midoshima pos_mode=false time=10]
  [chara_hide name=kitaoroshi pos_mode=false time=10]
  [chara_hide name=hiochi pos_mode=false time=10]
  [shizuku_hide]
[endmacro]

; キャラが登場しているとは限らず、念の為showとmodを両方呼ぶためのマクロ
; アイテムを使用したときの会話などで使う
[macro name=chara_show_mod]
  [chara_show name=%name face=%face time=10]
  [chara_mod name=%name face=%face cross=false time=10]
[endmacro]

; chara_show_mod のしずく版
[macro name=shizuku_show_mod]
  [shizuku_show face=%face]
  [chara_mod name=shizuku face=%face cross=false time=10]
[endmacro]

[macro name=wait_s]
  [iscript]
  tf.is_skip = TG.stat.is_skip;
  [endscript]
  [wait time=%time cond="tf.is_skip != true"]
  [wait time=100 cond="tf.is_skip"]
[endmacro]

[return]
