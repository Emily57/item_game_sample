f.item_list = {
  evidence: [],
  testimony: [],
  person: [],
};

f.item_list.evidence = [
  {
    id: 0,
    name: "おにぎり",
    target: "onigiri",
    record: false,
  },
  {
    id: 1,
    name: "米",
    target: "kome",
    record: false,
  },
  {
    id: 2,
    name: "園芸部の封筒",
    target: "engeibu_futo",
    record: false,
    description: {
      default:
        "緑島先輩が家に忘れてしまったもの。[r]大学にいる緑島先輩に届けよう！",
      complete: "緑島先輩に無事に届けられた。[r]困ったときはお互い様！",
    },
  },
  {
    id: 3,
    name: "ピアス",
    target: "pierce",
    record: false,
    description: {
      default:
        "リビングの机の下に落ちていたピアス。[r]誰のものだろう？　彪先輩なら何か知っているかも。",
      updated: "夜巳さんのピアス。[r]大学の研究棟にいる夜巳さんに届けよう！",
      complete:
        "夜巳さんに無事に届けられた。[r]とても喜んでくれたみたい。いいことをしたかも！",
    },
  },
  {
    id: 4,
    name: "美術館のチケット",
    target: "art_museum_ticket",
    record: false,
    description: {
      default:
        "緑島先輩にお礼としてもらったチケット。[r]これがあれば、美術館の中に入れそう。",
    },
  },
  {
    id: 5,
    name: "友達の電話番号",
    target: "phone_number",
    record: true,
    description: {
      default:
        "大学の友達に、電話番号を教えてもらった。[r]今度、連絡を取ってみよう！",
    },
  },
  {
    id: 6,
    name: "スマートフォン",
    target: "smartphone",
    record: true,
    description: {
      default: "私のスマートフォン。[r]いつもでも電話ができる。",
    },
  },
  {
    id: 7,
    name: "イヤリング",
    target: "earring",
    record: true,
    description: {
      default: "私のイヤリング。涼しげでお気に入り。",
    },
  },
  {
    id: 8,
    name: "財布",
    target: "wallet",
    record: true,
    description: {
      default: "私の財布。出かける時はいつも持って行く。",
    },
  },
  {
    id: 9,
    name: "ハンカチ",
    target: "hankachi",
    record: true,
    description: {
      default: "私のハンカチ。大事な必需品。",
    },
  },
  {
    id: 10,
    name: "参考書",
    target: "reference_book",
    record: true,
    description: {
      default: "大学の授業で使う参考書。彪先輩のおすすめ。",
    },
  },
  {
    id: 10,
    name: "ミルクアイスキャンディー",
    target: "milk_icecandy",
    record: false,
    description: {
      default:
        "彪先輩にもらったミルクアイスキャンディー。[r]冷凍庫にたくさんあるみたい。[r]彪先輩、なんだかすごく食べて欲しそうにしてたけど……？",
    },
  },
];
f.item_list.testimony = [
  {
    id: 21,
    name: "日落晃の好きな食べ物",
    target: "akira_sukinatabemono",
    record: false,
    description: {
      default: `証言者: 北颪 彪[r]
                晃くんはカレーライスの他に、秋刀魚が好きらしい。`,
    },
  },
  {
    id: 22,
    name: "北颪彪の苦手な食べ物",
    target: "hyo_nigate_tabemono",
    record: false,
    description: {
      default: `証言者: 緑島 遥[r]
                彪先輩は牛乳が苦手らしい。[r]
                自分の背が低いのはそのせいだと思ってるみたい？[r]
                コーヒーもブラック派で、徹底的に牛乳を避けている様子。`,
    },
  },
  {
    id: 22,
    name: "ミルクアイスキャンディーのこと",
    target: "milk_icecandy_for_hyo",
    record: false,
    description: {
      default: `証言者: 志貴 しずく[r]
                彪先輩は牛乳が苦手だから、私たちにミルクアイスキャンディーを食べてもらおうとしてる？`,
    },
  },
];
f.item_list.person = [
  {
    id: 0,
    name: "夜巳 涼人",
    target: "yorumi_suzuto",
    record: true,
    description: {
      default: `東堅大学 3年生・理工学部 - 情報工学科[r]
                志貴芸能が誇る現役大学生モデル。ナルシストキャラで人気。[r]
                いつも自信満々。よく人の良いところを見つけては褒めてくれる。[r]
                最近は仕事と大学の研究室の両立で忙しそう。`,
    },
  },
  {
    id: 1,
    name: "緑島 遥",
    target: "midoshima_haruka",
    record: true,
    description: {
      default: `東堅大学 2年生・文学部 - 国文学専攻 [r]
                物腰穏やかで優しい性格。[r]
                苗字の読みは「みどしま」だが、みんなからは「ミドリ」と呼ばれている。[r]
                園芸が好きで、大学の園芸部に所属している。`,
    },
  },
  {
    id: 2,
    name: "北颪 彪",
    target: "kitaoroshi_hyo",
    record: true,
    description: {
      default: `東堅大学 2年生・経済学部 - 経済学科[r]
                いつも調子が良く、明るい性格。[r]
                頭がよく、面倒見の良い先輩で、とても頼りになる。[r]
                週5でアルバイトをしている。`,
    },
  },
  {
    id: 3,
    name: "日落 晃",
    target: "hiochi_akira",
    record: true,
    description: {
      default: `星河原高校 3年生[r]
                成績優秀で礼儀正しい、自他ともに認める良い子。[r]
                年下だということを忘れるくらいしっかりした性格。[r]
                彪先輩曰く、腹の底が見えないらしい。`,
    },
  },
];
