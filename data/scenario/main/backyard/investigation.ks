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
  [glink name="investigation_item, investigation_1" color="btn_06_black" storage="main/backyard/investigation.ks" target=*window text="校舎の窓" width=300 size="20" x=750 y="450" opacity=0]
  [glink name="investigation_item, investigation_2" color="btn_06_black" storage="main/backyard/investigation.ks" target=*tree text="大きな木" width=300 size="20" x=140 y="250" opacity=0]
  [glink name="investigation_item, investigation_3" color="btn_06_black" storage="main/backyard/investigation.ks" target=*road text="道" width=300 size="20" x=470 y="580" opacity=0]
  [glink color="btn_06_yellow" storage="main/backyard/index.ks" target=*action_select text="戻る" width=230 size="16" x=1060 y="640"]

  [image layer=0 name="investigation_select,default_display_none" storage="black.png" x=0 y=640 width=1000 height=40]
  [ptext layer=0 name="investigation_select_1,default_display_none" text="校舎の中の様子が見えそう。" x=20 y=644 size=20 time=0]
  [ptext layer=0 name="investigation_select_2,default_display_none" text="私よりも大きな木だ！" x=20 y=644 size=20 time=0]
  [ptext layer=0 name="investigation_select_3,default_display_none" text="雑草が生えている。" x=20 y=644 size=20 time=0]

  [anim name="default_display_none" opacity=0 time=0]
  [anim name="investigation_1" time="100" opacity="255"]
  [wait time="100"]
  [anim name="investigation_2" time="100" opacity="255"]
  [wait time="100"]
  [anim name="investigation_3" time="100" opacity="255"]

  [iscript]
    for (let i = 1; i <= 3; i++) {
      const investigationClass = `.investigation_${i}`;
      const investigationSelectClass = `.investigation_select_${i}`;
      setupInvestigationBehavior(investigationClass, investigationSelectClass);
    }
  [endscript]
  [s]

*window
  [cm]
  [shizuku_show face=normal_b]
  [message_true]
  [shizuku_window]
  （ここから校舎の中の様子が見えそう。）[p]

  [chara_mod name=shizuku face=hou cross=false time=10]
  （中は……、研究室かな？[r]
  本がたくさん置いてある。）[p]

  [chara_mod name=shizuku face=perplexity_b cross=false time=10]
  （……あまりジロジロ見ていると不審かも。[r]
  やめておこう！）[p]

  [cm]
  [chara_reset]
  [message_false]
  [jump target="*select_investigation"]

*tree
  [cm]
  [shizuku_show face=un_b]
  [message_true]
  [shizuku_window]
  （この木、すごく大きい！）[p]

  [chara_mod name=shizuku face=hou cross=false time=10]
  （……？　よく見ると何か[r]
  実っているような……。）[p]

  （これ、もしかしてさくらんぼ？）[p]

  [chara_mod name=shizuku face=smile_b cross=false time=10]
  （そっか！　これは桜の木なんだね！[r]
  春にまた見に来たいな〜。）[p]

  [cm]
  [chara_reset]
  [message_false]
  [jump target="*select_investigation"]

*road
  [cm]
  [shizuku_show face=normal_b]
  [message_true]
  [shizuku_window]
  （足跡もない、ふかふかの道だ。）[p]

  （こんなに雑草が元気に生えてるってことは[r]
  よほど人通りが少ないんだろうなぁ。）[p]

  [chara_mod name=shizuku face=smile_b cross=false time=10]
  （ふふ。歩いてると気持ちいいかも！）[p]

  [cm]
  [chara_reset]
  [message_false]
  [jump target="*select_investigation"]
