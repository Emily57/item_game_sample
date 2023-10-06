*index
*initialize
  [eval exp="f.conversation_partner = 'hiochi_akira'"]
  [eval exp="f.location_name = '美術館'"]

*first_contact
  [move_location]

  [bg storage=gate.png time=1000 wait=true]

  [message_true]
  [shizuku_show face=normal_b]
  [shizuku_window]
  （緑島先輩からもらったチケットで[r]
  美術館に入ることができた！）[p]

  [shizuku_window]
  （こっちの入り口から中に……、ってあれ？）[p]

  [chara_mod name=shizuku face=hou cross=false time=10]
  [shizuku_window]
  そこにいるの……、晃くん？[p]
  #

  ; [fadeinbgm storage=hiochi_theme.ogg loop=true time=2000]
  [chara_show name=hiochi face=kaiwa cross=false time=1000]
  [hiochi_window]
  あれ？　しずく先輩！[r]
  しずく先輩も来てたんですか！[p]

  [chara_mod name=shizuku face=normal_a cross=false time=10]
  [shizuku_window]
  そうなの。偶然だね！[r]
  晃くんはどうしてここに？[p]

  [chara_mod name=hiochi face=ureshii cross=false time=10]
  [hiochi_window]
  僕はこの美術館に世界史の教科書に載ってる[r]
  絵があるって聞いてきたんです！[r]
  先生がチケットを譲ってくれたので！[p]

  [chara_mod name=hiochi face=hoe cross=false time=10]
  [hiochi_window]
  僕は見終わったのでこれから[r]
  帰るんですけど……。しずく先輩はこれから？[p]

  [chara_mod name=shizuku face=smile_a cross=false time=10]
  [shizuku_window]
  うん、今から行くところ！[p]

  [chara_mod name=hiochi face=soppobuu cross=false time=10]
  [hiochi_window]
  そうなんですねぇ〜……。[p]

  [chara_mod name=shizuku face=hou cross=false time=10]
  [shizuku_window]
  ？[p]

  [chara_mod name=hiochi face=ureshii cross=false time=10]
  [hiochi_window]
  しずく先輩！　せっかくですし[r]
  ちょっとそこで話していきましょ！[p]

  [chara_mod name=shizuku face=smile_a cross=false time=10]
  [shizuku_window]
  うん！　是非！[p]

  [jump target=*action_select]

*action_select
  [chara_mod name=hiochi face=hohoemi cross=false time=10]
  [message_false]
  [shizuku_hide]
  [button graphic="parts/action_chosa_a.png" enterimg="parts/action_chosa_b.png" target=*investigation width=350 height=auto x=265 y=500 clickse=""]
  [button graphic="parts/action_talk_a.png" enterimg="parts/action_talk_b.png" target=*talk width=350 height=auto x=665 y=500 clickse=""]
  [button graphic="parts/action_evidence_a.png" enterimg="parts/action_evidence_b.png" storage=../others/plugin/item_mode/system/item_menu.ks target=*item_menu width=350 height=auto x=265 y=600 clickse=""]
  [button graphic="parts/action_move_a.png" enterimg="parts/action_move_b.png" target=*move width=350 height=auto x=665 y=600 clickse=""]
  [s]

*investigation
  ; @jump storage=main/research_buildilng/investigation.ks target=*investigation
  [s]

*talk
  ; [jump storage=main/research_building/talk.ks target=*talk]
  [s]

*move
  [move_mode]
  [s]
