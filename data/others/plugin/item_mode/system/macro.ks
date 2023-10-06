*item
; item_mode に関する macro は全てここに格納しています。
; 原則としてこのファイルの内容は変更する必要がありません。
; ただし、メッセージウィンドウの表示位置や、ボタンの表示位置やデザインなどは
; 適宜、自分のゲーム用にカスタマイズしてください。

[macro name=item_use]
  ; アイテムメニューを全て非表示にします
  [cm]
  [freeimage layer=1]
  [layopt layer=message1 visible=false]

  ; アイテム名の表示にptextを用いているので、通常会話用の設定に切り替えます
  ; 以下を自分のゲームの設定用にカスタマイズしてください
  [ptext name="chara_name_area" layer=message0 width="400" color=white x=200 y=428 size=28]
  [chara_config ptext="chara_name_area"]
  [current layer=message0]

  ; アイテムの説明に[nowait]を用いているので、通常会話用の設定に切り替えます
  [endnowait]
[endmacro]

[macro name=item_use_end]
  ; 通常会話のメッセージウィンドウを非表示にします
  ; 以下を自分のゲームの設定用にカスタマイズしてください
  [layopt layer="message0" visible="false"]
  [freeimage layer=2]

  ; アイテムメニューを表示します
  [initial_render]
  [re_render]
  [s]
[endmacro]

; アイテムメニューを閉じるボタン
[macro name="item_close"]
  [button graphic="../others/plugin/item_mode/image/close_btn_a.png" enterimg="../others/plugin/item_mode/image/close_btn_b.png" storage=../others/plugin/item_mode/system/item_menu.ks target=*backtitle width=32 height=auto x="1192" y="32"]
[endmacro]

; アイテムを使うボタン
[macro name="listen_button"]
  [glink font_color="#333333" layer="message1" graphic="../others/plugin/item_mode/image/submit_btn_a.png" enterimg="../others/plugin/item_mode/image/submit_btn_b.png" storage="../others/plugin/item_mode/customize/item_use.ks" text="相手に話を聞く" width=130 height=12 size="16" x=760 y="585" cm="false" cond="f.item_selected != null"]
[endmacro]

; ストックボタン
[macro name="stock_button"]
  [glink font_color="#333333" layer="message1" graphic="../others/plugin/item_mode/image/submit_btn_a.png" enterimg="../others/plugin/item_mode/image/submit_btn_b.png" storage="../others/plugin/item_mode/system/item_stock.ks" text="ストック" width=130 height=12 size="16" x=975 y="585" cm="false" cond="f.item_selected != null"]
[endmacro]

; ストックアイテムを参照して検証するボタン
[macro name="use_stock_item_button"]
    [iscript]
    if(f.item_stock_selected && f.item_stock_selected !== f.item_selected){
      tyrano.plugin.kag.ftag.startTag("glink", {
        color: "btn_24_blue",
        layer: "message1",
        storage: "../others/plugin/item_mode/customize/item_stock_use_branch.ks",
        text: `${f.item_stock_selected.name}との関連を検証`,
        width: 380,
        size: "16",
        x: 760,
        y: "525",
        cm: "false",
        cond: "f.item_stock_selected != null",
      });
    }
    [endscript]
[endmacro]

[macro name="initial_render"]
  [image layer=1 storage="../others/plugin/item_mode/image/note_bg.png" visible=true width="1280" height=auto top=0 left=0 time=10 wait=true]
  [image storage="../others/plugin/item_mode/image/select_btn_l_c.png" layer=1 width=34 height=auto x=290 y="635"]
  [image storage="../others/plugin/item_mode/image/select_btn_r_c.png" layer=1 width=34 height=auto x=380 y="635"]
[endmacro]

[macro name="re_render"]
  [cm]
  [get_item_list_length]
  [button graphic="../others/plugin/item_mode/image/select_btn_l_a.png" enterimg="../others/plugin/item_mode/image/select_btn_l_b.png" storage="../others/plugin/item_mode/system/item_menu.ks" target=*re_render width=34 height=auto x=290 y="635" clickse="" cond="f.page > 1" exp="f.page = f.page - 1; f.item_selected = null"]
  [button graphic="../others/plugin/item_mode/image/select_btn_r_a.png" enterimg="../others/plugin/item_mode/image/select_btn_r_b.png" storage="../others/plugin/item_mode/system/item_menu.ks" target=*re_render width=34 height=auto x=380 y="635" clickse="" cond="f.page < f.item_record_page_length" exp="f.page = f.page +1; f.item_selected = null"]
  [button graphic="../others/plugin/item_mode/image/tab_btn_evidence_a.png" clickimg="../others/plugin/item_mode/image/tab_btn_evidence_b.png" storage="../others/plugin/item_mode/system/item_menu.ks" target=*re_render width=145 height=auto x=27 y="127" cond="f.category_selected !== 'evidence'" exp="f.category_selected = 'evidence'; f.page = 1"]
  [button graphic="../others/plugin/item_mode/image/tab_btn_testimony_a.png" clickimg="../others/plugin/item_mode/image/tab_btn_testimony_b.png" storage="../others/plugin/item_mode/system/item_menu.ks" target=*re_render width=145 height=auto x=180 y="127" cond="f.category_selected !== 'testimony'" exp="f.category_selected = 'testimony'; f.page = 1"]
  [button graphic="../others/plugin/item_mode/image/tab_btn_person_a.png" clickimg="../others/plugin/item_mode/image/tab_btn_person_b.png" storage="../others/plugin/item_mode/system/item_menu.ks" target=*re_render width=145 height=auto x=333 y="127" cond="f.category_selected !== 'person'" exp="f.category_selected = 'person'; f.page = 1"]
  [button graphic="../others/plugin/item_mode/image/tab_btn_evidence_b.png" storage="../others/plugin/item_mode/system/item_menu.ks" target=*re_render width=145 height=auto x=27 y="127" cond="f.category_selected === 'evidence'" exp="f.category_selected = 'evidence'; f.page = 1"]
  [button graphic="../others/plugin/item_mode/image/tab_btn_testimony_b.png" storage="../others/plugin/item_mode/system/item_menu.ks" target=*re_render width=145 height=auto x=180 y="127" cond="f.category_selected === 'testimony'" exp="f.category_selected = 'testimony'; f.page = 1"]
  [button graphic="../others/plugin/item_mode/image/tab_btn_person_b.png" storage="../others/plugin/item_mode/system/item_menu.ks" target=*re_render width=145 height=auto x=333 y="127" cond="f.category_selected === 'person'" exp="f.category_selected = 'person'; f.page = 1"]
  [re_render_item]
  [re_render_stock_item]
  # 
  [item_close]
[endmacro]

[macro name="re_render_stock_item"]
  [iscript]
    if(f.item_stock_selected){
      tyrano.plugin.kag.ftag.startTag("glink", {
        graphic: "../others/plugin/item_mode/image/item_btn_a.png",
        storage: "../others/plugin/item_mode/system/item_stock.ks",
        target: "*cancel",
        text: f.item_stock_selected.name,
        width: 245,
        height: 24,
        size: "20",
        x: 883,
        y: 90,
        cm: "false",
        opacity: "255",
        name: "item_stock_target",
      });
      tyrano.plugin.kag.ftag.startTag("button", {
        graphic: "../others/plugin/item_mode/image/close_btn_simple.png",
        storage: "../others/plugin/item_mode/system/item_stock.ks",
        target: "*cancel",
        width: 24,
        height: 24,
        x: 1160,
        y: 110,
        name: "item_stock_target_btn",
      });
    }
  [endscript]
[endmacro]

[macro name="re_render_item"]
  [call storage="../others/plugin/item_mode/system/item_list_render.ks" ]
[endmacro]

[macro name="get_item_list_length"]
  [iscript]
    let selectedRecordList = getCategoryRecordList(f.category_selected);
    let trueRecordCount = selectedRecordList.reduce((count, item) => {
      return count + (item.record === true ? 1 : 0);
    }, 0);

    f.item_record_page_length = Math.ceil(trueRecordCount / 6);
  [endscript]
[endmacro]

[macro name="item_new_record"]
  [iscript]
    let selectedRecordList = getCategoryRecordList(mp.category);
    for (let i = 0; i < selectedRecordList.length; i++) {
      if (selectedRecordList[i].target === mp.target) {
        selectedRecordList[i].record = true;
        break;
      }
    }
  [endscript]
[endmacro]

[macro name="item_communication"]
  [iscript]
    const { target, version } = f.item_selected;
    const { target: mpTarget, version: mpVersion, conversation_partner: mpConversation_partner } = mp;

    if (f.conversation_partner === mpConversation_partner && target === mpTarget && (!mpVersion || version === mpVersion)) {
      tf.communication = true;
      const jumpTarget = `*${f.conversation_partner}_${mpTarget}${mpVersion ? `_${mpVersion}` : ""}`;
      tyrano.plugin.kag.ftag.startTag("jump", {
        storage: "../others/plugin/item_mode/customize/item_use_branch.ks",
        target: jumpTarget,
      });
    }
  [endscript]
[endmacro]

[macro name="item_communication_else"]
  [iscript]
    const { conversation_partner: mpConversation_partner } = mp;
    if (f.conversation_partner === mpConversation_partner && tf.communication == false) {
      tf.communication = true;
      const jumpTarget = `*${f.conversation_partner}_else`;
      tyrano.plugin.kag.ftag.startTag("jump", {
        storage: "../others/plugin/item_mode/customize/item_use_branch.ks",
        target: jumpTarget,
      });
    }
  [endscript]
[endmacro]

[macro name="item_connection"]
  [iscript]
    if (f.item_stock_selected) {
      const isSelectedFirst = [f.item_selected.target, f.item_stock_selected.target].includes(mp.stock_item_first);
      const isSelectedSecond = [f.item_selected.target, f.item_stock_selected.target].includes(mp.stock_item_second);
      const target = `${mp.stock_item_first}_and_${mp.stock_item_second}`;

      if (isSelectedFirst && isSelectedSecond) {
        tyrano.plugin.kag.ftag.startTag("jump", {
          storage: 'main/common/item.ks',
          target: target,
        });
        tf.connection = true;
        f.item_stock_selected = null;
      }
    }
  [endscript]
[endmacro]

[macro name="item_connection_else"]
  [iscript]
    if(!tf.connection){
      tyrano.plugin.kag.ftag.startTag("jump", {
        storage: 'main/common/item.ks',
        target: "*else",
      });
      f.item_stock_selected = null;
    }
  [endscript]
[endmacro]

[return]
