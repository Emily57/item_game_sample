*midoshima_haruka_engeibu_futo_default
  [item_use]
  [chara_mod name=midoshima face=normal cross=false time=10]
  [shizuku_show face=normal_a]
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
  [chara_reset]
  [chara_show name=midoshima face=hohoemikaiwa cross=false time=10]
  [shizuku_show face=normal_b]
  [message_true]
  [midoshima_window]
  ありがとうございます！[r]
  本当に、すごく助かりました！[p]
  [item_use_end]
  [return]

*midoshima_haruka_else
  [item_use]
  [shizuku_show face=normal_a]
  [message_true]
  [chara_mod name=midoshima face=tameiki cross=false time=10]
  [chara_mod name=shizuku face=normal_b cross=false time=10]
  [midoshima_window]
  これは……？　すみません、[r]
  僕はお力になれなさそうです……。[p]

  [chara_mod name=shizuku face=hou cross=false time=10]
  [shizuku_window]
  （これにはあまり興味がなさそう。[r]
  他の話を聞いてみようかな。）[p]
  [item_use_end]
  [return]
