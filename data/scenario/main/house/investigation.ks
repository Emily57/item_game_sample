*investigation

*initialize
  [cm]
  [chara_reset]

*message
  [message_true]
  [other_window]
  気になるところを調べよう。[p]
  [message_false]

*select_investigation
  [glink name="investigation_item, investigation_1" color="btn_06_black" storage="main/house/investigation.ks" target=*weather text="窓の外" width=300 size="20" x=140 y="150" opacity=0]
  [glink name="investigation_item, investigation_2" color="btn_06_black" storage="main/house/investigation.ks" target=*pierce text="机の下" width=300 size="20" x=350 y="550" opacity=0]
  [glink color="btn_06_yellow" storage="main/house/index.ks" target=*action_select text="戻る" width=230 size="16" x=1060 y="640"]

  [image layer=0 name="investigation_select,default_display_none" storage="black.png" x=0 y=640 width=1000 height=40]
  [ptext layer=0 name="investigation_select_1,default_display_none" text="外は良い天気のようだ。" x=20 y=644 size=20 time=0]
  [ptext layer=0 name="investigation_select_2,default_display_none" text="何か落ちているような……。" x=20 y=644 size=20 time=0]

  [anim name="default_display_none" opacity=0 time=0]
  [anim name="investigation_1" time="100" opacity="255"]
  [wait time="100"]
  [anim name="investigation_2" time="100" opacity="255"]

  [iscript]
    for (let i = 1; i <= 2; i++) {
      const investigationClass = `.investigation_${i}`;
      const investigationSelectClass = `.investigation_select_${i}`;
      setupInvestigationBehavior(investigationClass, investigationSelectClass);
    }
  [endscript]
  [s]

*weather
  [cm]

  [message_true]
  [shizuku_show face=smile_b]
  [shizuku_window]
  （うーん、今日もいい天気だなぁ。）[p]

  [cm]
  [chara_reset]
  [message_false]
  [jump target="*select_investigation"]

*pierce
  [cm]

  [message_true]
  [shizuku_show face=hou]
  [shizuku_window]
  （あれ？　……机の下に、何か落ちてる。[r]
  なんだろ？）[p]

  [wait_s time=500]

  （これは……、ピアス？[r]
  踏んだら危ないし、拾っておこう。）[p]

  [item_new_record category="evidence" target="pierce"]
  [other_window]
  ピアス を拾った！[r]
  ピアス を 証拠 フォルダに記録しました。[p]

  [chara_mod name=shizuku face=normal_b cross=false time=10]
  [shizuku_window]
  彪先輩なら何か知ってるかも？[r]
  聞いてみよっと！[p]

  [cm]
  [chara_reset]
  [message_false]
  [jump target="*select_investigation"]
