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

[macro name=wait_s]
  [iscript]
  tf.is_skip = TG.stat.is_skip;
  [endscript]
  [wait time=%time cond="tf.is_skip != true"]
  [wait time=100 cond="tf.is_skip"]
[endmacro]

[return]
