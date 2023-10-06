[eval exp="f.item_stock_selected = null"]
[re_render]

[iscript]
  f.item_stock_selected = f.item_selected;
  f.item_selected = null;
  tyrano.plugin.kag.ftag.startTag("glink", {
    graphic: "../others/plugin/item_mode/image/item_btn_a.png",
    storage: "../others/plugin/item_mode/system/item_stock.ks",
    target: "*cancel",
    text: f.item_stock_selected.name,
    width: 430,
    height: 30,
    size: "20",
    x: 698,
    y: 190,
    cm: "false",
    opacity: "0",
    name: "item_stock_target",
  });
[endscript]
[anim name="item_stock_target" time="500" opacity="255" width="245" height="24" left="+=185" top="-=100"]
[button name="item_stock_target_btn" graphic="../others/plugin/item_mode/image/close_btn_simple.png" storage="../others/plugin/item_mode/system/item_stock.ks" target=*cancel width=24 height=24 x="1160" y="110"]
[s]

*cancel
[eval exp="f.item_stock_selected = null"]
[anim name="item_stock_target_btn" time="500" opacity="0" left="+=185"]
[anim name="item_stock_target" time="500" opacity="0" left="+=185"]
[jump storage="../others/plugin/item_mode/system/item_menu.ks" target="*re_render"]
[s]
