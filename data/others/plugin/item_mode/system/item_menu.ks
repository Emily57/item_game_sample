*item_menu
; アイテム画面を描写します

; アイテム選択状態の初期化
*initial_eval
  [eval exp="f.page = 1"]
  [eval exp="f.item_selected = null"]
  [eval exp="f.item_stock_selected = null"]
  [eval exp="f.category_selected = 'evidence'"]

; 不要なレイヤーを非表示
*clear_layer
  @layopt layer=fix visible=false
  @layopt layer=message0 visible=false
  [freeimage layer=2]

; 背景画像を表示
*initial_render
  [initial_render]

; アイテム一覧を表示
*re_render
  [re_render]
  [s]

; アイテムモードの終了
*backtitle  
  [cm]

  [ptext name="chara_name_area" layer=message0 width="400" color=white x=200 y=428 size=28]
  [chara_config ptext="chara_name_area"]
  [endnowait]

  [layopt layer="message1" visible="false"]
  [freeimage layer=1]
  [current layer=message0]

  [start_keyconfig]
  [clearstack]

  [iscript]
    owned_location = findLocationByName(f.location_name);

    function findLocationByName(name) {
      return location_list.find((location) => location.name === name);
    }
    tyrano.plugin.kag.ftag.startTag("jump", {
      storage: owned_location.storage,
      target: "*action_select",
    });
  [endscript]
  [s]
