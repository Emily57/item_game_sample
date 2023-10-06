*start
; plugin
  [loadjs storage=script.js]
  [plugin name="message_window"]
  [plugin name="item_mode"]
  [plugin name="move_mode"]
  [plugin name="nc_chara"]
  [plugin name="macro"]

; ボタンやロゴの削除
  [cm]
  [freeimage layer=1]
  [freeimage layer=2]
  [clearfix]
  [fadeoutbgm time=10]

*scenario
  @jump storage=main/house/index.ks target=*index
