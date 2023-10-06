; それぞれのアイテムについて、シーンを振り分けるファイルです。
; 以下のフォーマットに従って書いてください。

; ラベル: *キャラクター名_アイテム名_バージョン名
; ※ バージョン名は省略できます。省力した場合はどんなバージョンのアイテムにも適用されます。*キャラクター名_アイテム名
; ※ 特にシーンが用意されていないアイテムについては、*キャラクター名_else としてください。

; ラベルの下に処理を書きます。シーンファイルにjumpするような処理を書くのがおすすめです。
; 複雑な処理は、jump先のシーンファイルに書くのがおすすめです。
; 例: [jump storage=main/scenario.ks target=*character_item_version]
; 最後には必ず [return] を書いてください。

; 例: tanaka に onigiri(default) を見せると、特殊会話が発生する。それ以外のアイテムでは特に何もない
; *tanaka_onigiri_default
; [jump storage=main/scenario.ks target=*tanaka_onigiri_default]
; [return]
; *tanaka_else
; [jump storage=main/scenario.ks target=*tanaka_else]
; [return]

*yorumi_suzuto_pierce_updated
[jump storage=main/research_building/evidence.ks target=*yorumi_suzuto_pierce_updated]
[return]
*yorumi_suzuto_else
[jump storage=main/research_building/evidence.ks target=*yorumi_suzuto_else]
[return]

*midoshima_haruka_engeibu_futo_default
[jump storage=main/backyard/evidence.ks target=*midoshima_haruka_engeibu_futo_default]
[return]
*midoshima_haruka_engeibu_futo_complete
[jump storage=main/backyard/evidence.ks target=*midoshima_haruka_engeibu_futo_complete]
[return]
*midoshima_haruka_else
[jump storage=main/backyard/evidence.ks target=*midoshima_haruka_else]
[return]

*kitaoroshi_hyo_engeibu_futo_default
[jump storage=main/house/evidence.ks target=*kitaoroshi_hyo_engeibu_futo_default]
[return]
*kitaoroshi_hyo_engeibu_futo_complete
[jump storage=main/house/evidence.ks target=*kitaoroshi_hyo_engeibu_futo_complete]
[return]
*kitaoroshi_hyo_pierce_default
[jump storage=main/house/evidence.ks target=*kitaoroshi_hyo_pierce_default]
[return]
*kitaoroshi_hyo_pierce_updated
[jump storage=main/house/evidence.ks target=*kitaoroshi_hyo_pierce_updated]
[return]
*kitaoroshi_hyo_hyo_nigate_tabemono
[jump storage=main/house/evidence.ks target=*kitaoroshi_hyo_hyo_nigate_tabemono]
[return]
*kitaoroshi_hyo_milk_icecandy_for_hyo
[jump storage=main/house/evidence.ks target=*kitaoroshi_hyo_milk_icecandy_for_hyo]
[return]
*kitaoroshi_hyo_else
[jump storage=main/house/evidence.ks target=kitaoroshi_hyo_else]
[return]

*hiochi_akira_akira_sukinatabemono
[jump storage=main/gallery/evidence.ks target=*hiochi_akira_akira_sukinatabemono]
[return]
*hiochi_akira_else
[jump storage=main/gallery/evidence.ks target=*hiochi_akira_else]
[return]
