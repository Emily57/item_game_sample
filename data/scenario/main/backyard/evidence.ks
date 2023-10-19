*midoshima_haruka_engeibu_futo_default
  [item_use]
  [chara_show_mod name=midoshima face=normal cross=false time=10]
  [shizuku_show_mod face=normal_a]
  [message_true]
  [shizuku_window]
  これ、緑島先輩に届けて欲しいって[r]
  彪先輩から預かってました。どうぞ！[p]

  [chara_mod name=midoshima face=bikkuri cross=false time=10]
  [midoshima_window]
  え……！[r]
  わざわざ持ってきてくださったんですか？[p]

  [chara_mod name=midoshima face=hohoemikaiwa cross=false time=10]
  [midoshima_window]
  ありがとうございます！[r]
  本当に、すごく助かりました！[p]

  [chara_mod name=shizuku face=smile_a cross=false time=10]
  [shizuku_window]
  いえいえ！[r]
  これくらい、お安いご用ですよ。[p]

  [chara_mod name=midoshima face=kaiwa cross=false time=10]
  [midoshima_window]
  ……そうだ！[r]
  これ、お礼と言ってはなんですが。[p]

  [chara_mod name=midoshima face=kaiwa cross=false time=10]
  [midoshima_window]
  この間、美術館のチケットを多めにもらったんです。[r]
  よろしければ一つ、受け取ってください。[p]

  [chara_mod name=shizuku face=normal_a cross=false time=10]
  [shizuku_window]
  いいんですか？[r]
  ありがとうございます！[p]

  [item_new_record category="evidence" target="art_museum_ticket"]
  [other_window]
  緑島先輩から 美術館のチケット をもらった！[r]
  美術館のチケット を 証拠 フォルダに記録しました。[p]

  [chara_mod name=shizuku face=smile_a cross=false time=10]
  [shizuku_window]
  今日、早速行ってきます！[p]

  [chara_mod name=midoshima face=hohoemikaiwa cross=false time=10]
  [midoshima_window]
  ええ。ぜひ、楽しんできてください。[p]

  [iscript]
    for (let i = 0; i < f.item_list_record.evidence.length; i++) {
      if (f.item_list_record.evidence[i].target === 'engeibu_futo') {
        f.item_list_record.evidence[i].version = 'complete';
        break;
      }
    }
  [endscript]
  [item_use_end]
  [return]

*midoshima_haruka_engeibu_futo_complete
  [item_use]
  [chara_show_mod name=midoshima face=hohoemikaiwa cross=false time=10]
  [shizuku_show_mod face=normal_b]
  [message_true]
  [midoshima_window]
  ありがとうございます！[r]
  本当に、すごく助かりました！[p]
  [item_use_end]
  [return]

*midoshima_haruka_yorumi_suzuto
  [item_use]
  [chara_show_mod name=midoshima face=normal]
  [shizuku_show_mod face=smile_a]
  [message_true]
  [shizuku_window]
  夜巳さんも緑島先輩も[r]
  大人っぽい落ち着きがあってカッコいいです！[p]

  [chara_mod name=midoshima face=hohoemikaiwa cross=false time=10]
  [midoshima_window]
  ありがとうございます。[r]
  そう言われると、照れますね。[p]

  [chara_mod name=midoshima face=kaiwa cross=false time=10]
  夜巳さんは……、僕から見ても[r]
  特別に格好良いと思いますし。[p]

  夜巳さんに憧れる人が多いというのも[r]
  本当に、よくわかります。[p]

  [chara_mod name=shizuku face=hou cross=false time=10]
  [shizuku_window]
  緑島先輩も、夜巳さんに対して[r]
  憧れの感情があったりするんですか？[p]

  [chara_mod name=midoshima face=hohoemi cross=false time=10]
  [midoshima_window]
  ……もちろん。[p]

  [chara_mod name=midoshima face=kaiwa cross=false time=10]
  いつも堂々としていて、[r]
  自分の良いところも人の良いところも[r]
  たくさん知っていて[p]

  綺麗で……。立ち振る舞いが格好いい。[p]

  [chara_mod name=midoshima face=omou cross=false time=10]
  だから、僕なんかとは……[r]
  全然——[p]

  [chara_mod name=shizuku face=normal_a cross=false time=10]
  [shizuku_window]
  そうですよね。[r]
  緑島先輩と夜巳さんはまた別の格好良さというか[p]

  [chara_mod name=shizuku face=smile_a cross=false time=10]
  夜巳さんが硬！　緑島先輩が軟！[r]
  って感じですもんね！[p]

  [chara_mod name=midoshima face=bikkuri cross=false time=10]
  [midoshima_window]
  な、軟…………？？[p]

  [chara_mod name=shizuku face=perplexity_a cross=false time=10]
  [shizuku_window]
  ……って私は思うんですけど[r]
  もしかしてピンときませんでした？[p]

  [chara_mod name=midoshima face=kaiwa cross=false time=10]
  [midoshima_window]
  ……いえ。ありがとうございます。[r]
  ちょっと驚いただけです。[p]

  [chara_mod name=midoshima face=hohoemikaiwa cross=false time=10]
  そんな素敵なことを言ってもらえるなんて[r]
  僕は幸せですね。[p]

  [chara_mod name=shizuku face=smile_a cross=false time=10]
  [shizuku_window]
  えへへ。よかった！[p]
  [item_use_end]
  [return]

*midoshima_haruka_midoshima_haruka
  [item_use]
  [chara_show_mod name=midoshima face=normal]
  [shizuku_show_mod face=hou]
  [message_true]
  [shizuku_window]
  緑の島と書いて緑島……。[r]
  結構、珍しいですよね。[p]

  [chara_mod name=midoshima face=kaiwa cross=false time=10]
  [midoshima_window]
  そうですね。漢字が単純な分、[r]
  「ミドリシマ」と間違われがちです。[p]

  それに、高校の頃は委員会の先輩に[r]
  「緑鳥（ミドリドリ）」という苗字の人もいて[p]

  [chara_mod name=midoshima face=komariegao cross=false time=10]
  ミドシマか、ミドリドリか、[r]
  ミドリシマかミドドリかなんて[r]
  大混乱で……。[p]

  [chara_mod name=shizuku face=perplexity_a cross=false time=10]
  [shizuku_window]
  それは……、大変そうかも。[p]

  [chara_mod name=midoshima face=kaiwa cross=false time=10]
  [midoshima_window]
  結局、緑鳥先輩が[r]
  「俺のことはドリと呼べ！」と言って[r]
  混乱は解消されたんです。[p]

  [chara_mod name=midoshima face=hohoemikaiwa cross=false time=10]
  緑鳥先輩には、本当に感謝しています。[p]

  [chara_mod name=shizuku face=smile_a cross=false time=10]
  [shizuku_window]
  面白い関係なんですね！[p]
  [item_use_end]
  [return]

*midoshima_haruka_kitaoroshi_hyo
  [item_use]
  [chara_show_mod name=midoshima face=normal]
  [shizuku_show_mod face=hou]
  [message_true]
  [shizuku_window]
  彪先輩と緑島先輩って、[r]
  最初はどんな風に知り合ったんですか？[p]

  [chara_mod name=midoshima face=kaiwa cross=false time=10]
  [midoshima_window]
  高校で、彪の方から話しかけてくれたのが[r]
  きっかけなんです。[p]

  たしか、高校一年生の時の体育祭で[r]
  僕は騒がしいのが苦手だから[r]
  木陰で休んでいたんですけど。[p]

  彪も騒がしいのが嫌だって言って[r]
  僕の隣にやってきたんです。[p]

  [chara_mod name=midoshima face=hohoemikaiwa cross=false time=10]
  それからは自然と、一緒にいる機会が増えました。[p]

  「ミドリのいるところはいつも静か」[r]
  なんて言って、隣でよく寝てますよ。[p]

  [chara_mod name=shizuku face=normal_a cross=false time=10]
  [shizuku_window]
  そうなんですね。[r]
  なんだか想像ついちゃうかも。[p]

  [chara_mod name=shizuku face=smile_a cross=false time=10]
  喧騒から離れて寝ていたい感じ[r]
  ちょっと猫っぽいですよね。[p]

  [chara_mod name=midoshima face=hohoemi cross=false time=10]
  [midoshima_window]
  ふふ。そうですね。[p]

  [chara_mod name=midoshima face=kaiwa cross=false time=10]
  実際、野良の子猫が彪の隣で寝ていることもあって[r]
  二人とも、とても気持ちよさそうでしたよ。[p]

  [chara_mod name=shizuku face=kirakira cross=false time=10]
  [shizuku_window]
  み、見てみたかったその光景……！[p]
  [item_use_end]
  [return]

*midoshima_haruka_hiochi_akira
  [item_use]
  [chara_show_mod name=midoshima face=normal]
  [shizuku_show_mod face=normal_a]
  [message_true]
  [shizuku_window]
  緑島先輩も、たまに晃くんに[r]
  勉強を教えていますよね。[p]

  [chara_mod name=midoshima face=kaiwa cross=false time=10]
  [midoshima_window]
  そうですね。現代文や[r]
  古文漢文の範囲を、少しだけ。[p]

  [chara_mod name=midoshima face=hohoemikaiwa cross=false time=10]
  でも、晃くんは十分によく勉強されているので[r]
  僕が教えることなんてほとんどないんですけど。[p]

  [chara_mod name=shizuku face=hou cross=false time=10]
  [shizuku_window]
  勉強を教えるときは、どんな話をするんですか？[p]

  [chara_mod name=midoshima face=kaiwa cross=false time=10]
  [midoshima_window]
  そうですね、ちょっと文学的な文章の[r]
  読み方や参考文献の話をしたり……[p]

  古文や漢文であれば、時代背景の話や[r]
  同じ作者の別作品の話をしたり、ですかね。[p]

  [chara_mod name=midoshima face=hohoemikaiwa cross=false time=10]
  つい、僕が話しすぎてしまうんですけど。[r]
  晃くんが楽しそうに聞いてくれるんですよ。[p]

  [chara_mod name=shizuku face=smile_a cross=false time=10]
  [shizuku_window]
  いいなぁ……！　すっごく楽しそう！[p]

  [chara_mod name=shizuku face=hou cross=false time=10]
  私も緑島先輩の話を聞いてみたいけど[r]
  大学だと現代文や古文漢文を学ぶ機会って[r]
  ないですよね……。[p]

  [chara_mod name=midoshima face=kaiwa cross=false time=10]
  [midoshima_window]
  自由選択の一般教養の授業であれば[r]
  文豪の作品を読み解く授業もありますよ。[p]

  [chara_mod name=shizuku face=normal_a cross=false time=10]
  [shizuku_window]
  え！　そ、そうなんですか！[p]

  [chara_mod name=midoshima face=hohoemikaiwa cross=false time=10]
  [midoshima_window]
  もし興味があれば、次の学期にでも[r]
  受講してみてください。[p]

  晃くんと三人で[r]
  本の感想を語り合えたら嬉しいです。[p]

  [chara_mod name=shizuku face=smile_a cross=false time=10]
  [shizuku_window]
  是非是非！[r]
  私も、すっごく楽しみです！[p]
  [item_use_end]
  [return]

*midoshima_haruka_else
  [item_use]
  [message_true]
  [shizuku_show_mod face=tameiki]
  [chara_show_mod name=shizuku face=normal_b]
  [midoshima_window]
  これは……？　すみません、[r]
  僕はお力になれなさそうです……。[p]

  [chara_mod name=shizuku face=hou cross=false time=10]
  [shizuku_window]
  （これにはあまり興味がなさそう。[r]
  他の話を聞いてみようかな。）[p]
  [item_use_end]
  [return]
