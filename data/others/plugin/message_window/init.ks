*initialize
  [ptext name="chara_name_area" layer=message0 width="400" color=white x=200 y=428 size=28]
  [chara_config ptext="chara_name_area"]
  [position layer=message0 page=fore frame="../others/plugin/message_window/image/message_common.png" margint="62" marginl="200" marginr="200" marginb="50" width=1132 height=252 top=428 left=74]
  [current layer=message0]

*base_macro
  [macro name=message_true]
    [image name="message_base" layer=2 storage="../others/plugin/message_window/image/message_base.png" width=1132 height=252 top=428 left=74 visible=true]
    @layopt layer=message0 visible=true
  [endmacro]

  [macro name=message_false]
    @layopt layer=message0 visible=false
    [freeimage layer=2]
  [endmacro]

  [macro name=other_window]
    [position layer=message0 page=fore frame="../others/plugin/message_window/image/message_common.png" margint="62" marginl="200" marginr="200" marginb="50" width=1132 height=252 top=428 left=74]
    # 
  [endmacro]

; 各キャラごとにウィンドウをカスタマイズする
*customize_macro
  [macro name=shizuku_window]
    [position layer=message0 page=fore frame="../others/plugin/message_window/image/message_shizuku.png" margint="62" marginl="200" marginr="200" marginb="50" width=1132 height=252 top=428 left=74 opacity=100]
    # 志貴 しずく
  [endmacro]

  [macro name=yorumi_window]
    [position layer=message0 page=fore frame="../others/plugin/message_window/image/message_yorumi.png" margint="62" marginl="200" marginr="200" marginb="50" width=1132 height=252 top=428 left=74]
    # 夜巳 涼人
  [endmacro]

  [macro name=midoshima_window]
    [position layer=message0 page=fore frame="../others/plugin/message_window/image/message_midoshima.png" margint="62" marginl="200" marginr="200" marginb="50" width=1132 height=252 top=428 left=74]
    # 緑島 遥
  [endmacro]

  [macro name=kitaoroshi_window]
    [position layer=message0 page=fore frame="../others/plugin/message_window/image/message_kitaoroshi.png" margint="62" marginl="200" marginr="200" marginb="50" width=1132 height=252 top=428 left=74 time=0]
    # 北颪 彪
  [endmacro]

  [macro name=hiochi_window]
    [position layer=message0 page=fore frame="../others/plugin/message_window/image/message_hiochi.png" margint="62" marginl="200" marginr="200" marginb="50" width=1132 height=252 top=428 left=74 time=0]
    # 日落 晃
  [endmacro]

  [macro name=shizuku_show]
    [chara_show layer=message0 left=-75 top=330 zindex=1005 name=shizuku face=%face time=10]
  [endmacro]

  [macro name=shizuku_hide]
    [chara_hide layer=message0 name=shizuku pos_mode=false time=10]
  [endmacro]
[return]
