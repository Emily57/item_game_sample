
*talk

  [cm]

  [chara_show_mod name=yorumi face=normal cross=false time=10]
  [glink name="talk_btn_1" color="btn_06_black" target=*laboratory text="研究室のこと" width=450 size="22" x=840 y="200" opacity=0]
  [glink name="talk_btn_2" color="btn_06_black" target=*osaka text="大阪出身" width=450 size="22" x=840 y="280" opacity=0]
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

*laboratory
  [shizuku_show_mod face=hou]
  [message_true]
  [shizuku_window]
  研究室って、四年生からのイメージなんですけど[r]
  理工学部は三年生からなんですか？[p]

  [chara_mod name=yorumi face=kara cross=false time=10]
  [yorumi_window]
  理工学部も、正式な決定は四年生からだよ。[r]
  ただ、三年生のうちから大体どの研究室か決まるんだ。[p]

  [yorumi_window]
  俺が入る予定の研究室は忙しくてね。[r]
  三年生のうちから見学させてもらって[r]
  何を学んでおくべきか知っておくんだ。[p]

  [chara_mod name=shizuku face=normal_a cross=false time=10]
  [shizuku_window]
  なるほど。[r]
  ……って、夜巳さんあっさり言いますけど[p]

  [chara_mod name=shizuku face=perplexity_a cross=false time=10]
  [shizuku_window]
  忙しい情報工学の研究室って[r]
  それはもうめちゃくちゃ忙しいんじゃ……。[p]

  [chara_mod name=yorumi face=komariegao cross=false time=10]
  [yorumi_window]
  ははっ。[p]

  [chara_mod name=shizuku face=aseriwarai cross=false time=10]
  [shizuku_window]
  ははっ、て！[p]

  [chara_mod name=yorumi face=kara cross=false time=10]
  [yorumi_window]
  そのあたりは覚悟の上だよ。[r]
  場合によっては、モデルの仕事も休むかもしれないし。[p]

  ただ、俺はそれでも[r]
  情報工学のことを深く学びたくて、譲れないんだ。[p]

  [chara_mod name=yorumi face=smile cross=false time=10]
  研究室の人も、とても良い人ばかりだからね。[r]
  忙しいなりに楽しもうと思っているよ！[p]

  [chara_mod name=shizuku face=normal_b cross=false time=10]
  [shizuku_window]
  （ちょっと心配だけど……。[r]
  夜巳さんのことだから、なんとかなるような[r]
  気もするかも！）[p]

  [cm]
  [message_false]
  [jump target="*talk"]

*osaka
  [shizuku_show_mod name=shizuku face=normal_a cross=false time=10]
  [message_true]
  [shizuku_window]
  夜巳さんの出身の大阪って[r]
  お笑いが盛んだって聞くんですけど[r]
  どうでした？[p]

  [chara_mod name=yorumi face=kara cross=false time=10]
  [yorumi_window]
  お笑いが盛んか。そうかもしれないね。[r]
  面白い人もたくさんいたよ。[p]

  [chara_mod name=yorumi face=komariegao cross=false time=10]
  [yorumi_window]
  ただ、大阪出身だと明かすと[r]
  俺に『面白いこと言って』って言う人がいてさ。[r]
  それはちょっと困るかも。[p]

  [chara_mod name=shizuku face=hou cross=false time=10]
  [shizuku_window]
  面白いこと言うの苦手なんですか？[r]
  ……って聞くのもなんだか違う気はしますけど。[p]

  [chara_mod name=yorumi face=gomakashi cross=false time=10]
  [yorumi_window]
  そうだ、なぁ……。[r]
  面白いこと……、言えるかな……。[p]

  [chara_mod name=yorumi face=suiri cross=false time=10]
  [yorumi_window]
  そもそも『面白い』と感じるものっていうのは[r]
  常識的展開からやや外れていて[r]
  締まりがない状態のことを指すよね？[p]

  [chara_mod name=shizuku face=perplexity_b cross=false time=10]
  [shizuku_window]
  う、ん？？[p]

  [chara_mod name=yorumi face=metojikaiwa cross=false time=10]
  [yorumi_window]
  だから展開が予想できるほど日常的で[r]
  その展開を少し外せば面白いわけだから……。[r]
  そうだ。[p]

  [chara_mod name=yorumi face=kara cross=false time=10]
  [yorumi_window]
  『この間、駅で電車を待っていたら[r]
  驚いたことにタクシーが来たんだよ！[r]
  誰かが呼んだんだろうね！』[p]

  [chara_mod name=yorumi face=smile cross=false time=10]
  [yorumi_window]
  ……どう？[p]

  [chara_mod name=shizuku face=astonishment cross=false time=10]
  [shizuku_window]
  ………………。[p]

  [chara_mod name=yorumi face=komariegao cross=false time=10]
  [yorumi_window]
  ……しずくは、いつも[r]
  面白いリアクションをしてくれるね。[p]

  [cm]
  [message_false]
  [jump target="*talk"]

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
