*kitaoroshi_hyo_engeibu_futo_default
  [item_use]
  [message_true]
  [chara_show_mod name=kitaoroshi face=wink]
  [shizuku_show_mod face=normal_b]
  [kitaoroshi_window]
  ミドリ、大学のどこかにいると思うから。[r]
  よろしくね☆[p]

  [chara_mod name=shizuku face=smile_a cross=false time=10]
  [shizuku_window]
  はい、行ってきます！[p]
  [item_use_end]
  [return]

*kitaoroshi_hyo_engeibu_futo_complete
  [item_use]
  [message_true]
  [chara_show_mod name=kitaoroshi face=majimaji]
  [shizuku_show_mod face=normal_b]
  [shizuku_window]
  彪先輩！[r]
  緑島先輩に封筒を届けてきましたよ！[p]

  [chara_mod name=kitaoroshi face=nico cross=false time=10]
  [kitaoroshi_window]
  お疲れ様！[r]
  そんなエラいしずくちゃんにはご褒美をあげよう！[p]

  [chara_mod name=kitaoroshi face=wink cross=false time=10]
  じゃん！　ミルクアイスキャンディー！[r]
  バイト先の人からもらったからさ。[r]
  冷凍庫にあるやつ、遠慮せずに食べてね☆[p]

  [chara_mod name=shizuku face=kirakira cross=false time=10]
  [shizuku_window]
  わぁ……っ！　アイスだ！！[r]
  ありがとうございます！！[p]

  [chara_mod name=kitaoroshi face=mousou cross=false time=10]
  [kitaoroshi_window]
  うんうん、遠慮せず食べていいからね〜。[p]

  [chara_mod name=kitaoroshi face=kangaegoto cross=false time=10]
  ホント気にせず……、いくらでも……。[p]

  [chara_mod name=shizuku face=perplexity_a cross=false time=10]
  [shizuku_window]
  ……？　はい、ありがとうございます？[p]

  [chara_mod name=shizuku face=perplexity_a cross=false time=10]
  （彪先輩、何か隠してる……？）[p]
  （ちょっと気になるけど、ありがたくいただこう！）[p]

  [item_new_record category="evidence" target="milk_icecandy"]
  [other_window]
  ミルクアイスキャンディー をもらった！[r]
  証拠品 に記録しました。[p]

  [item_use_end]
  [return]

*kitaoroshi_hyo_pierce_default
  [item_use]
  [chara_show_mod name=kitaoroshi face=majimaji]
  [shizuku_show_mod face=normal_a]
  [message_true]
  [shizuku_window]
  彪先輩！　机の下にピアスが落ちてたんですけど[r]
  誰のものか知りませんか？[p]

  [chara_mod name=kitaoroshi face=niyari cross=false time=10]
  [kitaoroshi_window]
  あ！　それ、スズさんのピアスじゃん！[r]
  なんかなくしたとか言ってたけど。[p]

  [chara_mod name=shizuku face=hou cross=false time=10]
  [shizuku_window]
  そうなんですね！[r]
  それじゃあ、私が夜巳さんに渡しておきます！[p]

  [chara_mod name=kitaoroshi face=wink cross=false time=10]
  [kitaoroshi_window]
  よろしく〜☆[r]
  スズさん、今は大学の研究棟にいるはずだから。[p]

  [chara_mod name=shizuku face=smile_a cross=false time=10]
  [shizuku_window]
  わかりました！[p]

  [other_window]
  ピアス の情報を更新しました！[p]
  [iscript]
    for (let i = 0; i < f.item_list_record.evidence.length; i++) {
      if (f.item_list_record.evidence[i].target === 'pierce') {
        f.item_list_record.evidence[i].version = 'updated';
        break;
      }
    }
  [endscript]

  [chara_mod name=shizuku face=normal_b cross=false time=10]
  [shizuku_window]
  （大学の研究棟に行って夜巳さんに届けよう！）[p]

  [item_use_end]
  [return]

*kitaoroshi_hyo_pierce_updated
  [item_use]
  [chara_show_mod name=kitaoroshi face=kushou]
  [shizuku_show_mod face=normal_b]
  [message_true]
  [kitaoroshi_window]
  しっかし、しずくちゃん。[r]
  そんなちっちゃい物、よく見つけたね〜。[p]

  [chara_mod name=shizuku face=smile_a cross=false time=10]
  [shizuku_window]
  たまたまですよ！[r]
  キラッと光ってたのが見えたんです。[p]

  [chara_mod name=kitaoroshi face=buu cross=false time=10]
  [kitaoroshi_window]
  だってさ、スズさんピアスがないって[r]
  一時間くらい探してたんだよ？[p]

  [chara_mod name=kitaoroshi face=wink cross=false time=10]
  [kitaoroshi_window]
  しずくちゃん、警察犬の才能あるよ☆[p]

  [chara_mod name=shizuku face=aseriwarai cross=false time=10]
  [shizuku_window]
  犬じゃないです！[p]

  [item_use_end]
  [return]

*kitaoroshi_hyo_hyo_nigate_tabemono
  [item_use]
  [chara_show_mod name=kitaoroshi face=majimaji cross=false time=10]
  [shizuku_show_mod face=normal_a]
  [message_true]
  [shizuku_window]
  彪先輩って、牛乳が苦手なんですか？[p]

  [chara_mod name=kitaoroshi face=buu cross=false time=10]
  [kitaoroshi_window]
  苦手なんてもんじゃないね。嫌い。アンチ。[p]

  [chara_mod name=shizuku face=perplexity_a cross=false time=10]
  [shizuku_window]
  アンチ……。[r]
  どうして嫌いなんですか？　味が苦手とか？[p]

  [chara_mod name=kitaoroshi face=ushirometai cross=false time=10]
  [kitaoroshi_window]
  それもあるけどさ〜。[r]
  なんかいい思い出がないんだよね、牛乳に。[p]

  [chara_mod name=kitaoroshi face=guchi cross=false time=10]
  [kitaoroshi_window]
  ほら、小学校のときって給食で[r]
  ご飯に味噌汁に牛乳みたいな[r]
  意味不明の組み合わせのときなかった？[p]

  [chara_mod name=shizuku face=hou cross=false time=10]
  [shizuku_window]
  あ、私のところもそうでしたよ。[r]
  どんなメニューでも必ず牛乳でした。[p]

  [chara_mod name=kitaoroshi face=buu cross=false time=10]
  [kitaoroshi_window]
  ただでさえ牛乳苦手なのにさ[r]
  変な組み合わせで牛乳飲ませようとするじゃん？[p]

  [chara_mod name=kitaoroshi face=buu cross=false time=10]
  [kitaoroshi_window]
  だからオレ、牛乳残そうとするんだけど[r]
  センセーが『大きくなれないよ』って……。[p]
  そんなワケねーだろと思ってたけど……。[p]

  [chara_mod name=kitaoroshi face=guchi cross=false time=10]
  [kitaoroshi_window]
  でもさ。ミドリって小学生のとき[r]
  休みの子の牛乳まで飲んでたらしくってさ。[p]

  [chara_mod name=kitaoroshi face=uttae cross=false time=10]
  [kitaoroshi_window]
  なんか今更になってセンセーの正しさが[r]
  証明された感じがして腹立つ！　嫌い！[p]

  [chara_mod name=shizuku face=perplexity_a cross=false time=10]
  [shizuku_window]
  な、なるほど……。[r]
  なかなか根深い問題ですね……。[p]

  [chara_mod name=kitaoroshi face=buu cross=false time=10]
  [kitaoroshi_window]
  まぁでも、"あの背丈"のアッキーも[r]
  牛乳は残さず飲んでたらしいし？[p]

  [chara_mod name=kitaoroshi face=wink cross=false time=10]
  [kitaoroshi_window]
  その事実を胸に、オレはこれからも[r]
  牛乳を避けて生きていくからね。[p]

  [chara_mod name=shizuku face=aseriwarai cross=false time=10]
  [shizuku_window]
  そんな自己正当化で[r]
  安心しないでくださいよ……。[p]

  [item_use_end]
  [return]

*kitaoroshi_hyo_milk_icecandy_for_hyo
  [item_use]
  [chara_show_mod name=kitaoroshi face=mousou]
  [shizuku_show_mod face=perplexity_a]
  [message_true]
  [shizuku_window]
  彪先輩、もしかしてですけど[r]
  ミルクアイスキャンディーが苦手なんですか？[p]

  [chara_mod name=kitaoroshi face=wink cross=false time=10]
  [kitaoroshi_window]
  あ、バレた？☆[p]

  [chara_mod name=shizuku face=aseriwarai cross=false time=10]  
  [shizuku_window]
  もしかして、私たちに[r]
  在庫処理してもらいたい的な？[p]

  [chara_mod name=kitaoroshi face=buu cross=false time=10]
  [kitaoroshi_window]
  だってさ〜、オレ牛乳苦手っていつも言ってるのに[r]
  バイト先の人、好き嫌いすんなって[r]
  押し付けてくるんだよね〜。[p]

  [chara_mod name=kitaoroshi face=uttae cross=false time=10]
  これ食って牛乳と友達になれって！[r]
  無理に決まってんじゃん！[p]

  [chara_mod name=shizuku face=perplexity_a cross=false time=10]
  [shizuku_window]
  それは……、大変ですね。[p]

  [chara_mod name=kitaoroshi face=mousou cross=false time=10]
  [kitaoroshi_window]
  そこにやってきたしずくちゃん。[r]
  やっぱ持つべきはアイス好きの友達ってコト。[p]

  [chara_mod name=shizuku face=aseriwarai cross=false time=10]  
  [shizuku_window]
  それもそれで違う気がしますけど！[p]

  [chara_mod name=shizuku face=smile_a cross=false time=10]
  でも、経緯はどうあれ[r]
  私はミルクアイスキャンディーも好きなので[r]
  ありがたくいただきますね！[p]

  [chara_mod name=kitaoroshi face=wink cross=false time=10]
  [kitaoroshi_window]
  どぞどぞ〜☆[p]
  [item_use_end]
  [return]

*kitaoroshi_hyo_yorumi_suzuto
  [item_use]
  [chara_show_mod name=kitaoroshi face=niyari]
  [shizuku_show_mod face=normal_b]
  [message_true]
  [kitaoroshi_window]
  スズさん朝からいないけど、[r]
  今日も研究室に行ってるっぽいんだよね。[p]

  [chara_mod name=shizuku face=hou cross=false time=10]
  [shizuku_window]
  夜巳さん、仕事に大学に忙しそうですよね。[p]

  [chara_mod name=kitaoroshi face=kushou cross=false time=10]
  [kitaoroshi_window]
  理工学部は三年から研修室が忙しいんでしょ。[r]
  大変だね〜。[p]

  [chara_mod name=kitaoroshi face=guchi cross=false time=10]
  [kitaoroshi_window]
  しかもスズさんのいる研究室なんか[r]
  毎年、みんな死にそうな顔してるらしいし?[p]

  [chara_mod name=kitaoroshi face=nico cross=false time=10]
  [kitaoroshi_window]
  ……いつも涼しい顔してるスズさんが[r]
  どうなるか、楽しみだね☆[p]

  [chara_mod name=shizuku face=aseriwarai cross=false time=10]
  [shizuku_window]
  全然楽しみじゃないですよ！[p]
  [item_use_end]
  [return]

*kitaoroshi_hyo_midoshima_haruka
  [item_use]
  [chara_show_mod name=kitaoroshi face=majimaji]
  [shizuku_show_mod face=normal_a]
  [message_true]
  [shizuku_window]
  高校生の頃の緑島先輩って、[r]
  どんな感じだったんですか？[p]

  [chara_mod name=kitaoroshi face=mousou cross=false time=10]
  [kitaoroshi_window]
  ほとんど今と変わんないよ。[r]
  穏やかで優しくて〜。[p]

  静かで目立たないけど、しっかりしてるから[r]
  ケッコー慕われてたな。[p]

  [chara_mod name=kitaoroshi face=kushou cross=false time=10]
  みんな、授業でわかんないことがあったら[r]
  ミドリに聞きに行ってたし。[p]

  [chara_mod name=kitaoroshi face=nico cross=false time=10]
  [kitaoroshi_window]
  ……あー、でも。そうだ。[r]
  パソコンの時間とか面白くってさ。[p]

  [chara_mod name=shizuku face=hou cross=false time=10]
  [shizuku_window]
  パソコンの時間？[p]

  [chara_mod name=kitaoroshi face=mousou cross=false time=10]
  [kitaoroshi_window]
  情報学の実習の時間。[r]
  ミドリってば、パソコン音痴でさ。[p]

  [chara_mod name=kitaoroshi face=nico cross=false time=10]
  次々とエラー踏むから、ミドリのこと[r]
  生徒十人くらいで取り囲んで見てたっけ。[p]

  [chara_mod name=shizuku face=perplexity_a cross=false time=10]
  [shizuku_window]
  そ、そんなに……。[p]

  [chara_mod name=kitaoroshi face=mousou cross=false time=10]
  [kitaoroshi_window]
  今ではミドリも人並みにパソコンを[r]
  扱えるようになったけど。[p]

  あの頃を知っている身からすると[r]
  寂しいやら嬉しいやらってね。[p]

  [chara_mod name=shizuku face=smile_a cross=false time=10]
  [shizuku_window]
  なんだかんだ、良い思い出なんですね！[p]
  [item_use_end]
  [return]

*kitaoroshi_hyo_kitaoroshi_hyo
  [item_use]
  [chara_show_mod name=kitaoroshi face=majimaji]
  [shizuku_show_mod face=normal_a]
  [message_true]
  [shizuku_window]
  『北颪』って苗字、珍しいですよね。[r]
  『北嵐（キタアラシ）』と間違えちゃいそう。[p]

  [chara_mod name=kitaoroshi face=kushou cross=false time=10]
  [kitaoroshi_window]
  そうだね〜。何回キタアラシって呼ばれたことやら。[p]

  [chara_mod name=kitaoroshi face=mousou cross=false time=10]
  でも、もう間違われるのにも慣れたし？[r]
  最近は『キタアラシ』って呼ばれても返事してるよ。[p]

  [chara_mod name=shizuku face=aseriwarai cross=false time=10]
  [shizuku_window]
  それは……。災難というか[r]
  さすがの順応性というか……。[p]

  [chara_mod name=kitaoroshi face=buu cross=false time=10]
  [kitaoroshi_window]
  いや〜、こんなに間違われりゃ誰でも[r]
  オレみたいになると思うよ。[p]

  [chara_mod name=kitaoroshi face=nico cross=false time=10]
  試しにしずくちゃんも[r]
  オレと同じ苗字になってみる？[p]

  [chara_mod name=shizuku face=normal_b cross=false time=10]
  [shizuku_window]
  ………………、[p]

  [chara_mod name=shizuku face=perplexity_a cross=false time=10]
  …………え？[p]

  [chara_mod name=kitaoroshi face=mousou cross=false time=10]
  [kitaoroshi_window]
  〜♪[p]
  [item_use_end]
  [return]

*kitaoroshi_hyo_hiochi_akira
  [item_use]
  [chara_show_mod name=kitaoroshi face=uttae]
  [shizuku_show_mod face=normal_b]
  [message_true]
  [kitaoroshi_window]
  クッソ！！　アッキーの奴！！[p]

  [chara_mod name=shizuku face=perplexity_a cross=false time=10]
  [shizuku_window]
  き、急にどうしたんですか、彪先輩……？[p]

  [chara_mod name=kitaoroshi face=buu cross=false time=10]
  [kitaoroshi_window]
  いやさぁ、昨日の夜、アッキーと二人で[r]
  古い格ゲーやって遊んだんだけどさ。[p]

  [chara_mod name=kitaoroshi face=guchi cross=false time=10]
  アッキー、なんか異様に格ゲー強いんだよね。[r]
  オレ、あのゲームで初めて負けた。[p]

  [chara_mod name=shizuku face=normal_a cross=false time=10]
  [shizuku_window]
  そんなことがあったんですね。[r]
  晃くん、ゲームも得意なんだ。[p]

  [chara_mod name=kitaoroshi face=buu cross=false time=10]
  [kitaoroshi_window]
  いや。あの強さは、隠れてこっそり[r]
  あのゲームの練習してたに違いない。[p]

  [chara_mod name=kitaoroshi face=nico cross=false time=10]
  [kitaoroshi_window]
  ってなわけで、格ゲーの新作を通販で買って[r]
  今、宅急便の到着待ちってワケ。[p]

  [chara_mod name=kitaoroshi face=uttae cross=false time=10]
  [kitaoroshi_window]
  アッキーのいない間に練習して[r]
  次はオレがボコるもんね！[p]

  [chara_mod name=shizuku face=aseriwarai cross=false time=10]
  [shizuku_window]
  （それで晃くんに勝ったとして[r]
  嬉しいのかな。彪先輩……。）[p]
  [item_use_end]
  [return]

*kitaoroshi_hyo_else
  [item_use]
  [chara_show_mod name=kitaoroshi face=mousou]
  [shizuku_show_mod face=normal_b]
  [message_true]
  [kitaoroshi_window]
  宅急便まだかな〜。[p]

  [chara_mod name=shizuku face=hou cross=false time=10]
  [shizuku_window]
  （これにはあまり興味がなさそう。[r]
  他の話を聞いてみようかな。）[p]
  [item_use_end]
  [return]
