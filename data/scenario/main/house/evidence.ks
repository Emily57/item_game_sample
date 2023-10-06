*kitaoroshi_hyo_engeibu_futo_default
  [item_use]
  [message_true]
  [chara_mod name=kitaoroshi face=wink cross=false time=10]
  [shizuku_show face=normal_b]
  [chara_mod name=shizuku face=normal_b cross=false time=10]
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
  [chara_reset]
  [chara_show name=kitaoroshi face=majimaji time=10]
  [shizuku_show face=normal_b]
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
  [chara_mod name=kitaoroshi face=majimaji cross=false time=10]
  [shizuku_show face=normal_a]
  [chara_mod name=shizuku face=normal_a cross=false time=10]
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
  [chara_mod name=kitaoroshi face=kushou cross=false time=10]
  [shizuku_show face=normal_b]
  [chara_mod name=shizuku face=normal_b cross=false time=10]
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
  [chara_mod name=kitaoroshi face=majimaji cross=false time=10]
  [shizuku_show face=normal_a]
  [chara_mod name=shizuku face=normal_a cross=false time=10]
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
  [chara_reset]
  [chara_show name=kitaoroshi face=mousou cross=false time=10]
  [shizuku_show face=perplexity_a]
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

*kitaoroshi_hyo_else
  [item_use]
  [chara_reset]
  [chara_show name=kitaoroshi face=mousou cross=false time=10]
  [shizuku_show face=normal_b]
  [message_true]
  [kitaoroshi_window]
  宅急便まだかな〜。[p]

  [chara_mod name=shizuku face=hou cross=false time=10]
  [shizuku_window]
  （これにはあまり興味がなさそう。[r]
  他の話を聞いてみようかな。）[p]
  [item_use_end]
  [return]
