*title

*initialization
  [clearstack]
  ;メッセージレイヤ非表示
  @layopt layer=message0 visible=false
*initialization_end

; タイトル画面
*titleButton
  ; はじめから
  [locate x=750 y=350 ]
  [button graphic="start.png" storage=title/start.ks width="400" target=*start]

[s]

*title_end
