
*talk

  [cm]
  [chara_show_mod name=midoshima face=normal]
  [glink name="talk_btn_1" color="btn_06_black" target=*university text="大学について" width=450 size="22" x=840 y="200" opacity=0]
  [glink name="talk_btn_2" color="btn_06_black" target=*horticulture_club text="園芸部について" width=450 size="22" x=840 y="280" opacity=0]
  [glink name="talk_btn_3" color="btn_06_black" target=*tabemono text="好きな食べ物は？" width=450 size="22" x=840 y="360" opacity=0]
  [glink name="talk_btn_4" color="btn_06_black" storage="main/backyard/index.ks" target=*action_select text="戻る" width=230 size="16" x=1060 y="460" opacity=0]

  [anim name="talk_btn_1" time="100" opacity="255"]
  [wait time="100"]
  [anim name="talk_btn_2" time="100" opacity="255"]
  [wait time="100"]
  [anim name="talk_btn_3" time="100" opacity="255"]
  [wait time="100"]
  [anim name="talk_btn_4" time="100" opacity="255"]
  [s]

*university
  [cm]
  [shizuku_show_mod face=hou]
  [message_true]
  [shizuku_window]
  緑島先輩って、どうして[r]
  東堅大学に進学しようと思ったんですか？[p]

  [chara_mod name=midoshima face=komariegao cross=false time=10]
  [midoshima_window]
  あまり深い理由はないですよ。[r]
  両親が東堅大学出身だからというのと……。[p]

  [chara_mod name=midoshima face=kaiwa cross=false time=10]
  あとは、彪が早いうちから[r]
  東堅大学を目指していたので。[r]
  その影響も少しありますね。[p]

  [chara_mod name=midoshima face=oya cross=false time=10]
  志貴さんは、どうして東堅大学に？[p]

  [chara_mod name=shizuku face=normal_a cross=false time=10]
  [shizuku_window]
  私は……、えへへ[r]
  友達の蜜柑に熱烈に誘われたからですね。[p]

  [chara_mod name=shizuku face=aseriwarai cross=false time=10]
  蜜柑に誘われなかったら、私は一体[r]
  どの大学を選んでいたことやら……。[p]

  [chara_mod name=midoshima face=kaiwa cross=false time=10]
  [midoshima_window]
  きっかけって、色々ありますよね。[r]
  それもまた運命的で、面白いものだと思います。[p]

  志貴さんは、大学生活、楽しんでますか？[p]

  [chara_mod name=shizuku face=smile_a cross=false time=10]
  [shizuku_window]
  すっごく楽しいです！[p]

  授業も面白いし、友達もできて[r]
  東堅大学に来てよかったって思います！[p]

  [chara_mod name=midoshima face=hohoemikaiwa cross=false time=10]
  [midoshima_window]
  それはよかった。[r]
  これからも、楽しんでくださいね。[p]

  [chara_mod name=shizuku face=normal_a cross=false time=10]
  [shizuku_window]
  はい！　めいっぱい楽しみます！[p]
  [cm]
  [message_false]
  [jump target="*talk"]

*horticulture_club
  [cm]
  [shizuku_show_mod face=normal_a]
  [message_true]
  [shizuku_window]
  緑島先輩、今日は[r]
  園芸部の用事で大学に？[p]

  [chara_mod name=midoshima face=kaiwa cross=false time=10]
  [midoshima_window]
  そうですね。[r]
  午前中に講義の課題を進めて、[r]
  午後からは園芸部のことを。[p]

  少し事務的な用事と……。[r]
  小カブの収穫時期なので、様子が見たくて。[p]

  [chara_mod name=shizuku face=kirakira cross=false time=10]
  [shizuku_window]
  小カブですか！[r]
  私も見てみたいです！[p]

  [chara_mod name=midoshima face=hohoemikaiwa cross=false time=10]
  [midoshima_window]
  あとで一緒に様子を見に行きましょう。[r]
  白くて丸くて、かわいいですよ。[p]

  [chara_mod name=midoshima face=kaiwa cross=false time=10]
  収穫したら炒め物にして[r]
  みんなで食べましょうね。[p]

  [chara_mod name=shizuku face=smile_a cross=false time=10]
  [shizuku_window]
  やったー！　楽しみです！[p]
  [cm]
  [message_false]
  [jump target="*talk"]

*tabemono
  [cm]
  [shizuku_show_mod face=normal_a]
  [message_true]
  [shizuku_window]
  緑島先輩って、食べ物の好き嫌いありますか？[p]

  [chara_mod name=midoshima face=kaiwa cross=false time=10]
  [midoshima_window]
  あまりない方かもしれませんね。[r]
  虫料理なんかは苦手ですが……。[p]

  [chara_mod name=midoshima face=hohoemi cross=false time=10]
  [midoshima_window]
  好きな食べ物は牛乳や乳製品ですね。[r]
  昔から、給食の牛乳が大好きだったんです。[p]

  [chara_mod name=shizuku face=kirakira cross=false time=10]
  [shizuku_window]
  牛乳が好きなんですか！[r]
  だから緑島先輩は背が高いんですね！[p]

  [chara_mod name=midoshima face=komariegao cross=false time=10]
  [midoshima_window]
  それは……、どうなんでしょう。[r]
  僕にはわからないですけど。[p]

  [chara_mod name=midoshima face=kaiwa cross=false time=10]
  [midoshima_window]
  でも、似たようなことを彪に言われたことが[r]
  あったような気がするなぁ。ずるい、って。[p]

  [chara_mod name=shizuku face=perplexity_a cross=false time=10]
  [shizuku_window]
  ずるい……？[p]

  [chara_mod name=midoshima face=hohoemikaiwa cross=false time=10]
  [midoshima_window]
  『オレは牛乳が嫌いだから背が伸びないんだ。[r]
  食べ物の好き嫌いくらいで不公平だ』って。[p]

  [midoshima_window]
  彪は、とにかく牛乳が苦手だから[r]
  そう思うのかもしれませんね。[p]

  [chara_mod name=shizuku face=hou cross=false time=10]
  [shizuku_window]
  牛乳が苦手……、たしかに[r]
  彪先輩はコーヒーもブラック派だったような？[p]

  [chara_mod name=midoshima face=kaiwa cross=false time=10]
  [midoshima_window]
  そうですね。僕は牛乳入りばかり飲むので[r]
  彪の飲み方が格好良く見えますよ。[p]

  [chara_mod name=shizuku face=smile_a cross=false time=10]
  [shizuku_window]
  ブラック、大人っぽいですもんね！[p]

  [item_new_record category="testimony" target="hyo_nigate_tabemono"]
  [other_window]
  緑島先輩から 彪の苦手な食べ物 を聞いた！[r]
  彪の苦手な食べ物 を 証言 フォルダに記録しました。[p]

  [cm]
  [message_false]
  [jump target="*talk"]
