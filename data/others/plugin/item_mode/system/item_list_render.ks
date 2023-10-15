; ITEMS_PER_PAGE: 1ページに表示するアイテムの数

[iscript]
const ITEMS_PER_PAGE = 6;

for (let i = 0; i < ITEMS_PER_PAGE; i++) {
  tyrano.plugin.kag.ftag.startTag("image", {
    layer: 1,
    storage: "../others/plugin/item_mode/image/item_btn_c.png",
    visible: true,
    width: 600,
    height: "auto",
    x: 43,
    y: 194 + 73 * i,
  });
}

recordList = getCategoryRecordList(f.category_selected);
recordId = 0;

for (let i = 0; i < recordList.length; i++) {
  if (!recordList[i].record) {
    continue;
  }

  let page = Math.floor(recordId / ITEMS_PER_PAGE) + 1;

  if (f.page === page) {
    let target = recordList[i].target;
    let y = 194 + 73 * (recordId % ITEMS_PER_PAGE);
    tyrano.plugin.kag.ftag.startTag("glink", {
      graphic: "../others/plugin/item_mode/image/item_btn_a.png",
      enterimg: "../others/plugin/item_mode/image/item_btn_b.png",
      storage: "../others/plugin/item_mode/system/item_description.ks",
      text: recordList[i].name,
      width: 520,
      height: 30,
      size: "20",
      x: 43,
      y: y,
      cm: "false",
      cond: "",
      exp: `f.item_selected_target = '${target}'`,
    });
  }
  recordId++;
}
[endscript]

[return]