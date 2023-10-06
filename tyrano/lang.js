window.tyrano_lang = {
  word: {
    go_title: "タイトルに戻ります。よろしいですか？",
    exit_game: "ウィンドウを閉じて終了します。よろしいですか？",
    not_saved: "まだ、保存されているデータがありません。",
    confirm: "確認",
    confirm_beforeunload:
      "保存していない内容があります。ゲームを終了してもよろしいですか？",
    tag: "タグ",
    not_exists: "は存在しません。",
    error: "エラーが発生しました。スクリプトを確認して下さい。",
    label: "ラベル",
    label_double: "は同一シナリオファイル内に重複しています。",
    error_occurred: "エラーが発生しました。",
    save_file_violation_1:
      "セーブデータの移動を検知しました。信頼できるセーブデータでない場合、絶対に読み込まないでください。",
    save_file_violation_2:
      "セーブデータを読み込んでゲームを起動してもよろしいですか？",
    save_file_violation_3:
      "起動を中止しました。セーブデータを削除してもう一度、起動してください。",
    double_start: "すでにゲームは起動済みです。二重起動はできません。",
    reload: "リロード",
    line: "{ line }行目",
    initialized_saved_data: "セーブデータを初期化しました。",
    initializing_saved_data: "セーブデータを初期化します。よろしいですか？",
    saved_data_is_corrupted:
      "セーブデータが壊れている可能性があります。セーブデータを初期化しますか？",
    save_does_not_work:
      "この環境ではセーブ機能が動作しません。ローカルで実行している場合などに発生します。",
    undefined_tag: "タグ「{ name }」は存在しません。",
    undefined_label: "ラベル「{ name }」は存在しません。",
    undefined_character:
      "指定されたキャラクター「{ name }」は定義されていません。[chara_new]で定義してください。",
    undefined_face:
      "指定されたキャラクター「{ name }」の表情「{ face }」は定義されていません。[chara_face]で定義してください。",
    undefined_character_parts:
      "指定されたキャラクター「{ name }」の差分パーツは定義されていません。[chara_layer]で定義してください。",
    undefined_keyframe:
      "指定されたキーフレームアニメーション「{ keyframe }」は定義されていません。[keyframe]で定義してください。",
    undefined_3d_model: "指定された3Dモデル「{ name }」は定義されていません。",
    preload_failure_sound:
      "音声ファイル「{ src }」が見つかりません。場所はフルパスで指定されていますか？\n\n(適切な例) ./data/bgm/my_bgm.mp3",
    preload_failure_image:
      "画像ファイル「{ src }」が見つかりません。場所はフルパスで指定されていますか？\n\n(適切な例) ./data/image/my_image.png",
    preload_failure_video:
      "動画ファイル「{ src }」が見つかりません。場所はフルパスで指定されていますか？\n\n(適切な例) ./data/video/my_video.mp4",
    invalid_keyframe: "キーフレームが無効な値です。",
    invalid_keyframe_percentage:
      'キーフレームに設定されているパーセンテージ「{ percentage }」は無効な値です。"0%"、"30%"のように指定してください。',
    error_in_iscript: "[iscript] の内部でエラーが発生しました。",
    missing_endif:
      "[if] のあとに [elsif] [else] [endif] のいずれかが見つかりません。または、[if] 内のタグの数が多すぎます。",
    missing_endmacro:
      "[macro] のあとに [endmacro] が見つかりません。または、[macro] 内のタグの数が多すぎます。",
    missing_endignore:
      "[ignore] のあとに [endignore] が見つかりません。または、[ignore] 内の数が多すぎます。",
    missing_parameter: "タグ「{ tag }」にパラメーター「{ param }」は必須です。",
    if_and_endif_do_not_match: "[if] と [endif] の数が一致しません。",
    unsupported_extensions: "「{ ext }」はサポートしていないファイル形式です。",
    undefined_keyconfig:
      'キーコンフィグが定義されていません。KeyConfig.js が存在しないか、KeyConfig.js 内で構文エラーが発生している可能性があります。カンマ "," やブラケット "]" "}" が不足していないかどうか、確認してください。',
    compensate_missing_quart:
      '予期しない "]" を検知しました。パラメータのクォートの数が足りていない可能性があるため、自動的に修正して解釈します。\n\n修正前: { before }\n修正後: { after }',
    duplicate_label:
      "ラベル「{ name }」は同一シナリオファイル内に重複しています。ラベル名は同一シナリオファイル内で重複しないようにしてください。",
    file_not_found: "ファイルが見つかりませんでした。\n\n{ path }",
    patch_not_found: "パッチファイルが見つかりませんでした。\n\n{ path }",
    new_patch_found:
      "新しいアップデートが見つかりました。\n\nVer: { version }\n{ message }\n\n アップデートを行いますか？",
    apply_web_patch:
      "アップデートを行います。完了後、自動的にゲームは終了します。",
    apply_patch_complete:
      "アップデートを適用しました。ゲームを再起動してください。",
  },

  novel: {
    file_menu_button_save: "menu_button_save.gif",
    file_menu_button_load: "menu_button_load.gif",
    file_menu_button_message_close: "menu_message_close.gif",
    file_menu_button_skip: "menu_button_skip.gif",
    file_menu_button_title: "menu_button_title.gif",
    file_menu_button_close: "menu_button_close.png",
    file_menu_bg: "menu_bg.jpg",
    file_save_bg: "menu_save_bg.jpg",
    file_load_bg: "menu_load_bg.jpg",
    file_button_menu: "button_menu.png",
    error_occurred: "error occurred",
  },
};