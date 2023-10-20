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
  ; memo: y580 より下だと、カーソルオンしたときの表示と重なる。
  [glink name="investigation_item, investigation_1" color="btn_06_black" storage="main/research_building/investigation.ks" target=*floor text="床" width=300 size="20" x=200 y="550" opacity=0]
  [glink name="investigation_item, investigation_2" color="btn_06_black" storage="main/research_building/investigation.ks" target=*corridor text="廊下" width=300 size="20" x=740 y="350" opacity=0]
  [glink color="btn_06_yellow" storage="main/research_building/index.ks" target=*action_select text="戻る" width=230 size="16" x=1060 y="640"]

  [image layer=0 name="investigation_select,default_display_none" storage="black.png" x=0 y=640 width=1000 height=40]
  [ptext layer=0 name="investigation_research_building_select_1,default_display_none" text="綺麗な床だ。" x=20 y=644 size=20 time=0]
  [ptext layer=0 name="investigation_research_building_select_2,default_display_none" text="なんだか薄暗い……。" x=20 y=644 size=20 time=0]

  [anim name="default_display_none" opacity=0 time=0]
  [anim name="investigation_1" time="100" opacity="255"]
  [wait time="100"]
  [anim name="investigation_2" time="100" opacity="255"]

  [iscript]
    for (let i = 1; i <= 2; i++) {
      const investigationClass = `.investigation_${i}`;
      const investigationSelectClass = `.investigation_research_building_select_${i}`;
      setupInvestigationBehavior(investigationClass, investigationSelectClass);
    }
  [endscript]
  [s]

*floor
  [cm]
  [shizuku_show face=normal_b]
  [message_true]
  [shizuku_window]
  （床はとてもピカピカ！[r]
  自分の姿が反射している！）[p]

  [cm]
  [chara_reset]
  [message_false]
  [jump target="*select_investigation"]

*corridor
  [cm]
  [shizuku_show face=hou]
  [message_true]
  [shizuku_window]
  （この廊下……、[r]
  いつも電気がついていないよね。）[p]

  [chara_mod name=shizuku face=hou cross=false time=10]
  （この奥は数学科の研究室だし[r]
  人もいると思うのになぁ。）[p]

  [chara_mod name=shizuku face=perplexity_b cross=false time=10]
  （……もしかして、人を寄せ付けず[r]
  静かな環境を保つために[r]
  電気を切っているとか……？）[p]

  [chara_mod name=shizuku face=smile_b cross=false time=10]
  （なーんて、考えすぎかな。）[p]

  [cm]
  [chara_reset]
  [message_false]
  [jump target="*select_investigation"]
