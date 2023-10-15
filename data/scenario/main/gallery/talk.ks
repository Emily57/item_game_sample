
*talk
  [cm]

  [glink name="talk_btn_1" color="btn_06_black" target=*talk text="明日のことについて" width=450 size="22" x=840 y="200" opacity=0]
  [glink name="talk_btn_2" color="btn_06_black" target=*talk text="お仕事の話" width=450 size="22" x=840 y="280" opacity=0]
  [glink name="talk_btn_3" color="btn_06_black" target=*tabemono text="好きな食べ物は？" width=450 size="22" x=840 y="360" opacity=0]
  [glink name="talk_btn_4" color="btn_06_black" storage="main/research_building/index.ks" target=*action_select text="戻る" width=230 size="16" x=1060 y="460" opacity=0]

  [anim name="talk_btn_1" time="100" opacity="255"]
  [wait time="100"]
  [anim name="talk_btn_2" time="100" opacity="255"]
  [wait time="100"]
  [anim name="talk_btn_3" time="100" opacity="255"]
  [wait time="100"]
  [anim name="talk_btn_4" time="100" opacity="255"]
  [s]

*tabemono
  [cm]

  [shizuku_show face=normal_a]
  [message_true]
  [shizuku_window]
  夜巳さんって、好きな食べ物とかありますか？[p]

  [chara_mod name=yorumi face=smile cross=false time=10]
  [yorumi_window]
  俺が好きなのは苺！[r]
  昔からずっと苺が好きでさ。[p]

  [yorumi_window]
  苺ジャムに、苺ゼリーに、苺ミルク……。[r]
  もちろん、そのままの苺を食べるのも好きなんだ！[p]

  [chara_mod name=shizuku face=smile_a cross=false time=10]
  [shizuku_window]
  そうなんですね！[r]
  私も、苺大好きです！[p]

  [chara_mod name=yorumi face=smile_f cross=false time=10]
  [yorumi_window]
  そっか、しずくも苺好きなんだ！[r]
  それは良いことを聞いたな。[p]
  
  [chara_mod name=yorumi face=kara cross=false time=10]
  [yorumi_window]
  しずくはさ、駅前のお土産屋の[r]
  イチゴデラックスアイス食べたことある？[p]

  [chara_mod name=shizuku face=hou cross=false time=10]
  [shizuku_window]
  イチゴデラックスアイス……。[r]
  噂には聞いたことあるんですけど、[r]
  お土産屋に行く機会がなくて……。[p]

  [chara_mod name=yorumi face=smile cross=false time=10]
  [yorumi_window]
  それじゃあ今度、俺が買って帰ってくるよ。[p]

  [chara_mod name=yorumi face=kara cross=false time=10]
  [yorumi_window]
  しずく、アイス好きでしょ？[r]
  あの苺アイスと苺ソースの組み合わせは絶品だよ！[p]

  [chara_mod name=shizuku face=kirakira cross=false time=10]
  [shizuku_window]
  苺アイスに苺ソース……っ！[p]

  [chara_mod name=yorumi face=smile cross=false time=10]
  [yorumi_window]
  きっと、みんな喜ぶと思うんだよね。[r]
  楽しみに待っててね。[p]

  [chara_mod name=shizuku face=smile_a cross=false time=10]
  [shizuku_window]
  ありがとうございます！！[r]
  すっごく楽しみです！！[p]


  [cm]
  [message_false]
  [jump target="*talk"]
