[iscript]
  const itemList = f.item_list_record[f.category_selected];

  for (let i = 0; i < itemList.length; i++) {
    if (itemList[i].target === f.item_selected_target) {
      f.item_selected = itemList[i];
      break;
    }
  }
[endscript]

[re_render]

; アイテムの説明を描写するエリアの設定です。
[ptext name="item_name_area" layer=message1 width="500" color=white x=730 y=205 size=24]
[chara_config ptext="item_name_area"]
[position layer="message1" left="720" top="270" width="450" height="500" page="fore" visible="true" opacity="0"]
[layopt layer="message1" visible="true"]
[current layer="message1"]
[er]
[font size=20]

[nowait]
# &f.item_selected.name 

; アイテムの description の内容を描画します。
; 改行コードが適用されないので、descriptionに含まれている[r]で文章を分解し、[r]タグで結合し直すという力技をしています。
; この方法はあまりスマートではないので、より簡潔な方法があればそちらを採用したいです。
[iscript]
  var descriptions = f.item_selected.description[f.item_selected.version].split("[r]");
  for (var i = 0; i < descriptions.length; i++) {
    tyrano.plugin.kag.ftag.startTag("text", {
      val: descriptions[i],
    });
    tyrano.plugin.kag.ftag.startTag("r");
    tyrano.plugin.kag.ftag.startTag("nowait");
  }
[endscript]

[endnowait]
[listen_button]
[stock_button]
[use_stock_item_button]
[re_render_item]
[s]
