tyrano.plugin.kag = {
  version: 520,
  tyrano: null,
  kag: null,
  sound_swf: null,
  is_rider: !1,
  is_studio: !1,
  save_key_id: "",
  save_key_val: "",
  cache_html: {},
  cache_scenario: {},
  event_listener_map: {},
  array_white_attr: [
    "id",
    "src",
    "name",
    "data-event-tag",
    "data-event-pm",
    "data-event-target",
    "data-event-storage",
    "tabindex",
    "l_visible",
    "data-parent-layer",
    "data-video-name",
    "data-video-pm",
    "data-effect",
    "data",
    "type",
  ],
  config: {
    defaultStorageExtension: "jpg",
    projectID: "tyranoproject",
    game_version: "0.0",
    preload: "on",
    skipSpeed: "30",
    patch_apply_auto: "true",
    mediaFormatDefault: "ogg",
    configSave: "webstorage",
    configSaveOverwrite: "false",
  },
  define: {
    TYRANO_ENGINE_VERSION: 520,
    BASE_DIV_NAME: "tyrano_base",
    FLAG_APRI: !1,
  },
  variable: { sf: {}, tf: {} },
  tmp: {
    checking_macro: !1,
    ready_audio: !1,
    audio_context: !1,
    num_anim: 0,
    map_bgm: {},
    map_se: {},
    sleep_game: null,
    sleep_game_next: !1,
    base_scale: 1,
    is_se_play: !1,
    is_se_play_wait: !1,
    is_vo_play: !1,
    is_vo_play_wait: !1,
    is_bgm_play: !1,
    is_bgm_play_wait: !1,
    loading_make_ref: !1,
    cut_nextorder: null,
    wait_id: "",
    map_chara_talk_top: {},
    camera_stream: !1,
    video_playing: !1,
    angle: 0,
    largerWidth: !1,
    three: {
      stat: {
        is_load: !1,
        canvas_show: !1,
        start_event: !0,
        animation_loop: !0,
        scene_pm: {},
        init_pm: {},
        gyro: { pm: {}, x: 0, y: 0, enable: -1, mode: 0 },
        fps: {
          active: !1,
          movementSpeed: 300,
          rotateSpeed: 0.5,
          tmpMoveBuffer: 0,
          tmpRotateBuffer: 0,
          offMoveBufferF: !1,
          offMoveBufferB: !1,
          offRotateBufferL: !1,
          offRotateBufferR: !1,
          is_colid: !1,
          moveForward: !1,
          moveBackward: !1,
          rotateLeft: !1,
          rotateRight: !1,
          memory_pos: { x: 0, y: 0, z: 0 },
          ground: "",
          is_fps_studio: !1,
          isJoy: !1,
          camera_pos_y: 40,
          fps_rate: 0,
          move_trans_control: !1,
        },
      },
      groups: {},
      models: {},
      evt: {},
    },
    preload_audio_map: {},
    mode_effect: {
      pc: {
        skip: null,
        auto: null,
        stop: null,
        holdskip: null,
        holdstop: null,
      },
      phone: {
        skip: null,
        auto: null,
        stop: null,
        holdskip: null,
        holdstop: null,
      },
    },
  },
  stat: {
    map_label: {},
    map_macro: {},
    vertical: "false",
    f: {},
    mp: {},
    current_layer: "message0",
    current_page: "fore",
    is_stop: !1,
    is_wait: !1,
    is_trans: !1,
    is_wait_anim: !1,
    is_strong_stop: !1,
    strong_stop_recover_index: 0,
    is_nowait: !1,
    current_message_str: "ゲームスタート",
    current_save_str: "",
    current_keyframe: "",
    map_keyframe: {},
    is_script: !1,
    buff_script: "",
    is_html: !1,
    map_html: {},
    cssload: {},
    save_img: "",
    stack: { if: [], call: [], macro: [] },
    set_text_span: !1,
    current_scenario: "first.ks",
    is_skip: !1,
    is_auto: !1,
    current_bgm: "",
    current_bgm_vol: "",
    current_bgm_html5: "false",
    current_bgm_base64: "",
    current_bgm_pause_seek: "",
    current_se: {},
    load_auto_next: !1,
    current_bgcamera: "",
    enable_keyconfig: !0,
    current_bgmovie: { storage: "", volume: "" },
    current_camera: {},
    current_camera_layer: "",
    is_move_camera: !1,
    is_wait_camera: !1,
    current_line: 0,
    is_hide_message: !1,
    is_click_text: !1,
    is_adding_text: !1,
    flag_ref_page: !1,
    ruby_str: "",
    mark: 0,
    style_mark: "",
    ch_speed: "",
    skip_link: "true",
    log_join: "false",
    log_clear: !1,
    f_chara_ptext: "false",
    flag_glyph: "false",
    path_glyph: "nextpage.gif",
    current_cursor: "auto",
    use_close_confirm: !1,
    font: {
      enable: !1,
      color: "",
      bold: "",
      size: "",
      face: "",
      italic: "",
      effect: "",
      effect_speed: "0.2s",
      edge_method: "shadow",
    },
    qr: { mode: "off", define: {} },
    locate: { x: 0, y: 0 },
    default_font: {
      color: "",
      bold: "",
      size: "",
      face: "",
      italic: "",
      edge: "",
      shadow: "",
      effect: "",
      effect_speed: "",
      edge_method: "shadow",
    },
    fuki: {
      def_style: {},
      def_style_inner: {},
      def_pm: {},
      active: !1,
      marginr: 0,
      marginb: 0,
      others_style: {},
    },
    sysview: {
      save: "./tyrano/html/save.html",
      load: "./tyrano/html/load.html",
      backlog: "./tyrano/html/backlog.html",
      menu: "./tyrano/html/menu.html",
    },
    chara_pos_mode: "true",
    chara_effect: "swing",
    chara_ptext: "",
    chara_time: "600",
    chara_memory: "false",
    chara_anim: "true",
    pos_change_time: "600",
    chara_last_zoom_name: "",
    chara_talk_focus: "none",
    chara_brightness_value: "60",
    chara_blur_value: "2",
    chara_talk_anim: "none",
    chara_talk_anim_time: 230,
    chara_talk_anim_value: 30,
    chara_talk_anim_zoom_rate: 1.2,
    apply_filter_str: "",
    video_stack: null,
    is_wait_bgmovie: !1,
    charas: {},
    jcharas: {},
    play_bgm: !0,
    play_se: !0,
    play_speak: !1,
    map_se_volume: {},
    map_bgm_volume: {},
    map_vo: { vobuf: {}, vochara: {} },
    vostart: !1,
    log_write: !0,
    buff_label_name: "",
    already_read: !1,
    visible_menu_button: !1,
    resizecall: { storage: "", target: "" },
    vchat: {
      is_active: !1,
      chara_name_color: "0x70c7ff",
      max_log_count: 200,
      charas: {},
    },
    message_config: {},
    word_nobreak_list: [],
    title: "",
  },
  init: function () {
    this.kag = this;
    var that = this;
    this.tyrano.test();
    if (
      $.isElectron() &&
      -1 == window.navigator.userAgent.indexOf("TyranoStudio") &&
      !require("electron").remote.app.requestSingleInstanceLock()
    ) {
      alert($.lang("double_start"));
      window.close();
      void 0 !== navigator.app && navigator.app.exitApp();
    }
    this.parser.loadConfig(function (map_config) {
      that.config = $.extend(!0, that.config, map_config);
      that.checkUpdate(function () {
        that.init_game();
      });
    });
    $("script").each(function () {
      $(this).attr("src") &&
        ((-1 == $(this).attr("src").indexOf("cordova") &&
          -1 == $(this).attr("src").indexOf("phonegap")) ||
          (that.define.FLAG_APRI = !0));
    });
    ("function" == typeof TyranoPlayer || $.isNWJS()) &&
      (this.tmp.ready_audio = !0);
    var AudioContext = window.AudioContext || window.webkitAudioContext || !1;
    AudioContext && (this.tmp.audio_context = new AudioContext());
    try {
      $.getBrowser();
    } catch (e) {
      console.log(e);
    }
  },
  checkUpdate: function (call_back) {
    if ($.isNWJS() || $.isElectron())
      if ("false" != this.kag.config.patch_apply_auto) {
        var patch_path = $.localFilePath();
        patch_path = patch_path + "/" + this.kag.config.projectID + ".tpatch";
        this.applyPatch(patch_path, "true", call_back);
      } else call_back();
    else call_back();
  },
  applyPatch: function (patch_path, flag_reload, call_back) {
    var fs = require("fs");
    if (fs.existsSync(patch_path)) {
      var fse = require("fs-extra"),
        _path = require("path"),
        unzip_path = $.getUnzipPath();
      if ("asar" != unzip_path) {
        const AdmZip = require("adm-zip");
        require("path").resolve("./");
        new AdmZip(patch_path).extractAllTo(unzip_path + "/update_tmp", !0);
        fse.copySync(unzip_path + "/update_tmp/", unzip_path + "/");
        fse.removeSync(unzip_path + "/update_tmp");
        fse.removeSync(patch_path);
        $.alert("パッチを適応しました。再起動します。", function () {
          location.reload();
        });
      } else {
        const asar = require("asar");
        let path = __dirname,
          out_path = (fs.readdirSync(path), $.localFilePath());
        if ("darwin" == process.platform) {
          alert(
            "パッチを適応するゲーム実行ファイル（.app）の場所を選択してください。"
          );
          let filenames = require("electron").remote.dialog.showOpenDialogSync(
            null,
            {
              properties: ["openFile"],
              title:
                "パッチを適応するゲームの実行ファイル（app）を選択してください。",
              filters: [{ name: "", extensions: ["app"] }],
            }
          );
          if (void 0 === filenames) {
            alert("パッチの適応を中止します");
            call_back();
            return;
          }
          path = filenames[0] + "/Contents/Resources/app.asar";
          out_path += "/";
        } else out_path += "/";
        fse.mkdirSync(_path.resolve(out_path + "/update_tmp"));
        (async () => {
          await asar.extractAll(
            _path.resolve(path),
            _path.resolve(out_path + "/update_tmp/")
          );
        })();
        new (require("adm-zip"))(patch_path).extractAllTo(
          _path.resolve(out_path + "update_tmp/"),
          !0
        );
        const src = _path.resolve(out_path + "update_tmp/"),
          dest = _path.resolve(path);
        (async () => {
          await asar.createPackage(src, dest);
          $.alert($.lang("apply_patch_complete"), function () {
            fse.removeSync(_path.resolve(patch_path));
            fse.removeSync(_path.resolve(out_path + "update_tmp"));
            window.close();
          });
        })();
      }
    } else call_back();
  },
  evalScript: function (str) {
    var TG = this,
      f = this.stat.f,
      sf = this.variable.sf,
      tf = this.variable.tf,
      mp = this.stat.mp;
    eval(str);
    this.saveSystemVariable();
    this.kag.is_studio && this.kag.studio.notifyChangeVariable();
  },
  embScript: function (str, preexp) {
    try {
      var f = this.stat.f,
        sf = this.variable.sf,
        tf = this.variable.tf,
        mp = this.stat.mp;
      return eval(str);
    } catch (e) {
      return;
    }
  },
  removeSaveData: function () {
    const project_id = this.kag.config.projectID,
      type = this.kag.config.configSave,
      suffixes = [
        "_sf",
        "_tyrano_data",
        "_tyrano_quick_save",
        "_tyrano_auto_save",
      ];
    for (const suffix of suffixes) {
      const key = project_id + suffix;
      $.removeStorage(key, type);
    }
  },
  saveSystemVariable: function () {
    $.setStorage(
      this.kag.config.projectID + "_sf",
      this.variable.sf,
      this.kag.config.configSave
    );
    this.kag.trigger("storage-sf");
  },
  clearVariable: function () {
    this.stat.f = {};
    this.variable.sf = {};
    this.clearTmpVariable();
    this.saveSystemVariable();
  },
  clearTmpVariable: function () {
    var tmp_sys = this.kag.variable.tf.system;
    this.kag.variable.tf = {};
    this.kag.variable.tf.system = tmp_sys;
  },
  pushStack: function (name, flag) {
    this.stat.stack[name].push(flag);
  },
  popStack: function (name) {
    return this.stat.stack[name].pop();
  },
  getStack: function (name) {
    return this.stat.stack[name][this.stat.stack[name].length - 1];
  },
  setStack: function (name, flag) {
    this.stat.stack[name][this.stat.stack[name].length - 1] = flag;
  },
  endStorage: function () {
    var pm = this.kag.getStack("call");
    if (null == pm) return !1;
    this.kag.popStack("call");
    this.kag.ftag.nextOrderWithIndex(pm.index, pm.storage);
  },
  init_game: function () {
    var that = this;
    this.parser = object(tyrano.plugin.kag.parser);
    this.parser.kag = that;
    this.ftag = object(tyrano.plugin.kag.ftag);
    this.ftag.kag = that;
    this.ftag.init();
    this.layer = object(tyrano.plugin.kag.layer);
    this.layer.kag = that;
    this.layer.init();
    this.menu = object(tyrano.plugin.kag.menu);
    this.menu.kag = that;
    this.menu.init();
    this.key_mouse = object(tyrano.plugin.kag.key_mouse);
    this.key_mouse.kag = that;
    this.key_mouse.init();
    this.event = object(tyrano.plugin.kag.event);
    this.event.kag = that;
    this.event.init();
    this.rider = object(tyrano.plugin.kag.rider);
    this.rider.kag = that;
    this.rider.init();
    this.studio = object(tyrano.plugin.kag.studio);
    this.studio.kag = that;
    this.studio.init();
    this.chara = object(tyrano.plugin.kag.chara);
    this.chara.kag = that;
    this.chara.init();
    if ($.isElectron() && "file" == that.kag.config.configSave) {
      -1 != process.execPath.indexOf("var/folders")
        ? (that.save_key_id = that.kag.config.projectID + "_save_key")
        : (that.save_key_id = $.getExePath() + "_" + that.kag.config.projectID);
      if (localStorage.getItem(that.save_key_id))
        that.save_key_val = localStorage.getItem(that.save_key_id);
      else {
        that.save_key_val = $.makeSaveKey();
        localStorage.setItem(that.save_key_id, that.save_key_val);
        let tmp_array = that.menu.getSaveData();
        tmp_array.hash = that.save_key_val;
        $.setStorage(
          that.kag.config.projectID + "_tyrano_data",
          tmp_array,
          that.kag.config.configSave
        );
      }
      let tmp_array = that.menu.getSaveData();
      if (tmp_array.hash != that.save_key_val) {
        alert($.lang("save_file_violation_1"));
        if ("true" != that.kag.config.configSaveOverwrite) {
          alert($.lang("save_file_violation_3"));
          return !1;
        }
        if (!confirm($.lang("save_file_violation_2"))) {
          alert($.lang("save_file_violation_3"));
          return !1;
        }
        tmp_array.hash = that.save_key_val;
        $.setStorage(
          that.kag.config.projectID + "_tyrano_data",
          tmp_array,
          that.kag.config.configSave
        );
      }
    }
    var tmpsf = $.getStorage(
      this.kag.config.projectID + "_sf",
      that.config.configSave
    );
    this.variable.sf = null == tmpsf ? {} : JSON.parse(tmpsf);
    void 0 !== that.variable.sf._system_config_bgm_volume &&
      (that.config.defaultBgmVolume = String(
        that.variable.sf._system_config_bgm_volume
      ));
    void 0 !== that.variable.sf._system_config_se_volume &&
      (that.config.defaultSeVolume = String(
        that.variable.sf._system_config_se_volume
      ));
    that.variable.sf._config_ch_speed &&
      (that.config.chSpeed = that.variable.sf._config_ch_speed);
    void 0 !== that.variable.sf._system_config_auto_speed &&
      (that.config.autoSpeed = that.variable.sf._system_config_auto_speed);
    that.variable.sf._system_config_auto_click &&
      (that.config.autoClickStop =
        that.variable.sf._system_config_auto_click_stop);
    that.variable.sf._system_config_already_read_text_color &&
      (that.config.alreadyReadTextColor =
        that.variable.sf._system_config_already_read_text_color);
    void 0 !== that.variable.sf._system_config_unread_text_skip &&
      (that.config.unReadTextSkip =
        that.variable.sf._system_config_unread_text_skip);
    var auto_save_data = $.getStorage(
      this.kag.config.projectID + "_tyrano_auto_save",
      this.kag.config.configSave
    );
    this.variable.sf.system = {};
    this.variable.sf.system.autosave = !!auto_save_data;
    this.variable.tf.system = {};
    this.variable.tf.system.backlog = [];
    var button_menu_obj = $(
      "<div class='button_menu' style='z-index:100000000'><img src='./tyrano/images/system/" +
        $.novel("file_button_menu") +
        "'  /></div>"
    );
    if (
      "-1" != this.kag.config.configLeft &&
      "-1" != this.kag.config.configTop
    ) {
      button_menu_obj.css("left", parseInt(this.kag.config.configLeft));
      button_menu_obj.css("top", parseInt(this.kag.config.configTop));
    } else {
      button_menu_obj.css("left", this.config.scWidth - 70);
      button_menu_obj.css("top", this.config.scHeight - 70);
    }
    button_menu_obj.click(function () {
      that.kag.tmp.ready_audio || that.kag.readyAudio();
      that.menu.showMenu();
    });
    if ("false" == this.kag.config.configVisible) {
      button_menu_obj.hide();
      this.kag.stat.visible_menu_button = !1;
    } else this.kag.stat.visible_menu_button = !0;
    $("." + this.kag.define.BASE_DIV_NAME).append(button_menu_obj);
    if (
      this.kag.config.ScreenCentering &&
      "false" == this.kag.config.ScreenCentering
    ) {
      $(".tyrano_base").css("transform-origin", "0 0");
      $(".tyrano_base").css({ margin: 0 });
    } else {
      $(".tyrano_base").css("transform-origin", "0 0");
      $(".tyrano_base").css({ margin: 0 });
    }
    if ("pc" != $.userenv()) {
      $("#tyrano_base").css("position", "absolute");
      if ("true" != this.kag.config.vchat) {
        const noScroll = (event) => {
          event.preventDefault();
        };
        document.addEventListener("touchmove", noScroll, { passive: !1 });
      }
      const pauseSoundsOnWindowBlur = () => {
          for (const howl of Howler._howls)
            if (howl.playing()) {
              howl.pause();
              howl.__should_play_on_focus = !0;
            } else howl.__should_play_on_focus = !1;
        },
        resumeSoundsOnWindowFocus = () => {
          for (const howl of Howler._howls)
            if (howl.__should_play_on_focus) {
              howl.play();
              howl.__should_play_on_focus = !1;
            }
        };
      $(document).on("visibilitychange", () => {
        "visible" === document.visibilityState && resumeSoundsOnWindowFocus();
        "hidden" === document.visibilityState && pauseSoundsOnWindowBlur();
      });
    }
    this.tyrano.base.setBaseSize(this.config.scWidth, this.config.scHeight);
    that.tmp.angle = $.getAngle();
    that.tmp.largerWidth = $.getLargeScreenWidth();
    this.base = this.tyrano.base;
    this.base.kag = this;
    this.tmp.screen_info = {
      scale_x: 1,
      scale_y: 1,
      width: 1280,
      height: 720,
      top: 0,
      bottom: 720,
      left: 0,
      right: 1280,
      original_width: 1280,
      original_height: 720,
      viewport_width: 1920,
      viewport_hegiht: 1080,
    };
    this.tyrano.base._fitBaseSize(that.config.scWidth, that.config.scHeight, 0);
    var timerId = null,
      flag_resized = !1;
    $(window).bind("load resize orientationchange", function () {
      if (!0 !== flag_resized) {
        setTimeout(function () {
          flag_resized = !1;
        }, 100);
        flag_resized = !0;
        that.tmp.angle = $.getAngle();
        if (
          that.tmp.largerWidth != $.getLargeScreenWidth() &&
          "" != that.stat.resizecall.storage
        ) {
          if (
            "none" == that.kag.layer.layer_event.css("display") &&
            1 != that.kag.stat.is_strong_stop
          ) {
            timerId = setTimeout(function () {
              $(window).trigger("resize");
            }, 1e3);
            return !1;
          }
          if (1 == that.kag.stat.is_adding_text || 1 == that.kag.stat.is_wait) {
            timerId = setTimeout(function () {
              $(window).trigger("resize");
            }, 1e3);
            return !1;
          }
          that.kag.getStack("call");
          var _auto_next = "false";
          1 == that.kag.stat.is_strong_stop && (_auto_next = "stop");
          1 == $.getLargeScreenWidth()
            ? (that.variable.tf._larger_width = 1)
            : (that.variable.tf._larger_width = 0);
          that.kag.ftag.startTag("call", {
            storage: that.stat.resizecall.storage,
            target: that.stat.resizecall.target,
            auto_next: _auto_next,
            textclear: "false",
          });
        }
        that.tmp.largerWidth = $.getLargeScreenWidth();
        if (90 === Math.abs(window.orientation)) {
          window.scrollTo(0, 1);
          that.tyrano.base.fitBaseSize(
            that.config.scWidth,
            that.config.scHeight
          );
        } else {
          0 === window.pageYOffset && window.scrollTo(0, 1);
          that.tyrano.base.fitBaseSize(
            that.config.scWidth,
            that.config.scHeight
          );
        }
      }
    });
    !0 === window.isLoaded && $(window).trigger("load");
    $("body").on("fullscreenchange", (e) => {
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement ||
      document.fullScreenElement ||
      !1
        ? this.kag.trigger("fullscreen-start", e)
        : this.kag.trigger("fullscreen-stop", e);
    });
    this.layer.addLayer("base");
    this.layer.addLayer("message0");
    var j_message = $("<div class='message_outer'></div>");
    j_message
      .css("background-color", $.convertColor(this.config.frameColor))
      .css("opacity", $.convertOpacity(this.config.frameOpacity))
      .css("left", eval(this.config.ml))
      .css("top", eval(this.config.mt))
      .css("width", eval(this.config.mw))
      .css("height", eval(this.config.mh))
      .css("z-index", 100);
    j_message.l_visible;
    this.layer.appendObj("message0", "fore", j_message);
    var j_message_inner = $(
      "<div class='message_inner' style='z-index:1001'></div>"
    );
    "false" == this.config.WordBreak &&
      j_message_inner.css("word-break", "break-all");
    $.insertRule(
      ".message_inner p{ padding-top:" +
        this.kag.config.defaultLineSpacing +
        "px;}"
    );
    this.layer.appendObj("message0", "fore", j_message_inner);
    var num_message_layer = parseInt(this.config.numMessageLayers);
    for (let i = 1; i < num_message_layer; i++) {
      var message_layer_name = "message" + i;
      this.layer.addLayer(message_layer_name);
      this.layer.getLayer(message_layer_name).attr("l_visible", "false");
      this.layer.getLayer(message_layer_name).hide();
      var j_message1 = j_message.clone(!1);
      this.layer.appendObj(message_layer_name, "fore", j_message1);
      var j_message_inner1 = j_message_inner.clone(!1);
      this.layer.appendObj(message_layer_name, "fore", j_message_inner1);
    }
    this.layer.refMessageLayer();
    var fore_layer_num = parseInt(this.config.numCharacterLayers);
    for (let i = 0; i < fore_layer_num; i++) {
      this.layer.addLayer("" + i);
      this.layer
        .getLayer("" + i, "fore")
        .css("display", "none")
        .css("z-index", 10 + i);
      this.layer
        .getLayer("" + i, "back")
        .css("display", "none")
        .css("z-index", 10 + i);
    }
    this.stat.default_font.color = $.convertColor(
      this.kag.config.defaultChColor
    );
    this.stat.default_font.bold = $.convertBold(this.kag.config.defaultBold);
    this.stat.default_font.size = this.kag.config.defaultFontSize;
    this.stat.default_font.face = this.kag.config.userFace;
    this.stat.default_font.effect = this.kag.config.defaultChEffect;
    this.stat.default_font.effect_speed = this.kag.config.defaultChEffectSpeed;
    var smooth = this.kag.config.defaultAntialiased;
    "2" == smooth
      ? $(".tyrano_base").css("-webkit-font-smoothing", "antialiased")
      : "0" == smooth
      ? $(".tyrano_base").css("-webkit-font-smoothing", "none")
      : $(".tyrano_base").css("-webkit-font-smoothing", "subpixel-antialiased");
    "true" == this.kag.config.defaultShadow &&
      (this.stat.default_font.shadow = $.convertColor(
        this.kag.config.defaultShadowColor
      ));
    "true" == this.kag.config.defaultEdge &&
      (this.stat.default_font.edge = $.convertColor(
        this.kag.config.defaultEdgeColor
      ));
    this.stat.vertical = this.kag.config.vertical;
    this.kag.stat.font = $.extend(
      !0,
      $.cloneObject(this.kag.stat.font),
      this.stat.default_font
    );
    this.setTitle(this.config["System.title"]);
    this.setCursor(this.config.cursorDefault);
    $.isNeedClickAudio() || (this.tmp.ready_audio = !0);
    $("[tyrano='config']").each(function () {
      var key = $(this).attr("key"),
        val = $(this).val();
      that.kag.config[key] = "" + val;
    });
    if (this.kag.config.vchat && "true" == this.kag.config.vchat) {
      this.kag.config.ScreenCentering = "false";
      this.kag.config.ScreenRatio = "fix";
      this.kag.stat.vchat.is_active = !0;
      $("#vchat_base").css({
        "background-color": "#EEEEEE",
        overflow: "scroll",
      });
      $("#vchat_base").show();
      $("body").get(0).ontouchmove = "";
      this.stat.vertical = "false";
      this.kag.config.vertical = "false";
      this.stat.vertical = "false";
      this.kag.ftag.startTag("vchat_in", {});
      $("#vchat_base").on("click", (e) => {
        $(".layer_event_click").trigger("click");
        e.preventDefault();
      });
    }
    this.kag.config.vchatMenuVisible &&
      "true" == this.kag.config.vchatMenuVisible &&
      setTimeout(function () {
        let player_back_cnt;
        !(function () {
          player_back_cnt = 0;
          var j_menu_button = $(
              "<div id='player_menu_button' class='player_menu_area' style='display:none;opacity:0.6;border-radius:5px;padding:10px;margin:10px;cursor:pointer;position:absolute;left:0px;top:0px;background-color:white;font-size:2em'><span style='color:#6495ED'>メニュー</span></div>"
            ),
            j_menu_area = $(
              "<div style='display:none;position:absolute;left:10px;top:10px;font-size:2em'></div>"
            ),
            j_end_button = $(
              "<div class='player_menu_area' id='player_end_button' style='opacity:0.6;border-radius:5px;padding:10px;margin:10px 10px 10px 10px;cursor:pointer;left:0px;top:0px;background-color:white;'><span style='color:#6495ED'>タイトルへ</span></div>"
            ),
            j_auto_button = $(
              "<div class='player_menu_area' id='player_auto_button' style='opacity:0.6;border-radius:5px;padding:10px;margin:10px 10px 10px 10px;cursor:pointer;left:0px;top:0px;background-color:white;'><span style='color:#6495ED'>オート</span></div>"
            ),
            j_skip_button = $(
              "<div class='player_menu_area' id='player_skip_button' style='opacity:0.6;border-radius:5px;padding:10px;margin:10px 10px 10px 10px;cursor:pointer;left:0px;top:0px;background-color:white;'><span style='color:#6495ED'>スキップ</span></div>"
            );
          j_menu_area.append(j_end_button);
          j_menu_area.append(j_auto_button);
          j_menu_area.append(j_skip_button);
          function hide_menu() {
            j_menu_area.hide();
            j_menu_button.hide();
            player_back_cnt = 0;
          }
          j_menu_button.click(function (e) {
            j_menu_button.hide();
            j_menu_area.show();
          });
          j_end_button.click(function (e) {
            hide_menu();
            location.reload();
            e.stopPropagation();
          });
          j_auto_button.click(function (e) {
            hide_menu();
            TYRANO.kag.ftag.startTag("autostart", {});
            e.stopPropagation();
          });
          j_skip_button.click(function (e) {
            hide_menu();
            TYRANO.kag.ftag.startTag("skipstart", {});
            e.stopPropagation();
          });
          $("body").append(j_menu_button);
          $("body").append(j_menu_area);
          $("#tyrano_base").on("click.player", function () {
            player_back_cnt > 8 && hide_menu();
            player_back_cnt = 0;
          });
          setInterval(function () {
            9 == player_back_cnt && j_menu_button.show();
            player_back_cnt++;
          }, 1e3);
        })();
        $("#tyrano_base").on("click.player", function () {
          player_back_cnt = 0;
        });
      }, 1e3);
    var first_scenario_file = "first.ks";
    $("#first_scenario_file").length > 0 &&
      (first_scenario_file = $("#first_scenario_file").val());
    var array_scripts = [];
    "true" == this.kag.config.use3D &&
      (array_scripts = [
        "./tyrano/libs/three/three.js",
        "./tyrano/libs/three/loader/GLTFLoader.js",
        "./tyrano/libs/three/loader/OBJLoader.js",
        "./tyrano/libs/three/loader/MTLLoader.js",
        "./tyrano/libs/three/controls/OrbitControls.js",
        "./tyrano/libs/three/classes/ThreeModel.js",
        "./tyrano/libs/three/etc/stats.min.js",
      ]);
    $.getMultiScripts(array_scripts, () => {
      this.loadScenario(first_scenario_file, function (array_tag) {
        that.ftag.buildTag(array_tag);
      });
    });
    if (this.config.keyFocusOutlineWidth) {
      const width = this.config.keyFocusOutlineWidth;
      $.insertRuleToTyranoCSS(`:focus.focus { outline-width: ${width}px}`);
    }
    let focus_outline_color = "#000000";
    if (this.config.keyFocusOutlineColor) {
      const color = $.convertColor(this.config.keyFocusOutlineColor);
      focus_outline_color = color;
      $.insertRuleToTyranoCSS(`:focus.focus { outline-color: ${color}}`);
    }
    if (this.config.keyFocusOutlineStyle) {
      const style = $.convertColor(this.config.keyFocusOutlineStyle);
      $.insertRuleToTyranoCSS(`:focus.focus { outline-style: ${style}}`);
    }
    if (
      this.config.keyFocusOutlineAnim &&
      "none" !== this.config.keyFocusOutlineAnim
    ) {
      switch (this.config.keyFocusOutlineAnim) {
        default:
        case "flash":
          $.insertRuleToTyranoCSS(
            ":focus.focus { animation: focus 1000ms infinite alternate linear; }"
          );
          $.insertRuleToTyranoCSS(
            `\n                    @keyframes focus {\n                        0%   { outline-color: ${focus_outline_color}; }\n                        3%   { outline-color: ${focus_outline_color}; }\n                        97%  { outline-color: transparent; }\n                        100% { outline-color: transparent; }\n                    }`
          );
          break;
        case "flash_momentary":
          $.insertRuleToTyranoCSS(
            ":focus.focus { animation: focus 1000ms infinite steps(1, end); }"
          );
          $.insertRuleToTyranoCSS(
            `\n                    @keyframes focus {\n                        0% { outline-color: ${focus_outline_color}; }\n                        50%, 100% { outline-color: transparent; }\n                    }`
          );
      }
      this.config.keyFocusOutlineAnimDuration &&
        $.insertRuleToTyranoCSS(
          `:focus.hover { animation-duration: ${this.config.keyFocusOutlineAnimDuration}ms; }`
        );
    }
    "true" === this.config.keyFocusWithHoverStyle &&
      $.copyHoverCSSToFocusCSS('link[href*="tyrano/tyrano.css"]');
    if ("true" === this.config.useCloseConfirm) {
      this.kag.on(
        "storage-save storage-quicksave storage-autosave load-complete",
        () => {
          $.disableCloseConfirm();
        },
        { system: !0 }
      );
      this.kag.on(
        "nextorder",
        (e) => {
          this.stat.use_close_confirm && $.enableCloseConfirm();
        },
        { system: !0 }
      );
    }
    this.kag.ftag.master_tag.dialog_config.init();
    this.kag.is_studio && that.studio.complete(this);
  },
  pushBackLog: function (str, type) {
    if (0 != this.stat.log_write) {
      type = type || "add";
      var max_back_log = parseInt(this.kag.config.maxBackLogNum);
      if (!(max_back_log < 1)) {
        if (1 == this.kag.stat.log_clear) {
          type = "add";
          this.kag.stat.log_clear = !1;
        }
        if ("join" == type) {
          var index = this.variable.tf.system.backlog.length - 1;
          if (index >= 0) {
            var tmp = this.variable.tf.system.backlog[index];
            this.variable.tf.system.backlog[
              this.variable.tf.system.backlog.length - 1
            ] = tmp + str;
          } else this.variable.tf.system.backlog.push(str);
        } else this.variable.tf.system.backlog.push(str);
        this.stat.current_save_str =
          this.variable.tf.system.backlog[
            this.variable.tf.system.backlog.length - 1
          ];
        max_back_log < this.variable.tf.system.backlog.length &&
          this.variable.tf.system.backlog.shift();
      }
    }
  },
  setTitle: function (title) {
    this.stat.title = title;
    document.title = title;
  },
  pushAnimStack: function () {
    this.kag.tmp.num_anim++;
  },
  backTitle: function () {
    "appJsInterface" in window
      ? appJsInterface.finishGame()
      : "function" == typeof TyranoPlayer
      ? webkit.messageHandlers.backHandler.postMessage("endgame")
      : $.confirm(
          $.lang("go_title"),
          function () {
            location.href = "./index.html";
          },
          function () {
            return !1;
          }
        );
  },
  cutTimeWithSkip: function (time) {
    return 1 == this.kag.stat.is_skip &&
      "true" == this.kag.config.skipEffectIgnore
      ? 70
      : time;
  },
  readyAudio: function () {
    if (!this.tmp.ready_audio) {
      this.tmp.ready_audio = !0;
      if ($.isNeedClickAudio()) {
        var audio_obj = new Howl({
          src: "./tyrano/audio/silent.mp3",
          volume: 0.1,
          onplay: () => {
            this.kag.trigger("readyaudio");
          },
          onend: () => {
            audio_obj.unload();
          },
        });
        audio_obj.play();
      }
    }
  },
  setCursor: function (cursor) {
    this.stat.current_cursor = cursor;
    let storage, x, y, image_url, css_str;
    if ("string" == typeof cursor) {
      storage = cursor;
      x = "0";
      y = "0";
    } else if ("object" == typeof cursor) {
      storage = cursor.storage;
      x = cursor.x;
      y = cursor.y;
    }
    if ("default" === storage) css_str = "auto";
    else {
      image_url = `./data/image/${storage}`;
      css_str = `url(${image_url}) ${x} ${y}, default`;
    }
    $("body").css("cursor", css_str);
    this.kag.key_mouse.vmouse.addImage("default", image_url, x, y);
  },
  setElmCursor: function (j_elm, type) {
    this.stat.current_cursor_map || (this.stat.current_cursor_map = {});
    const option = this.stat.current_cursor_map[type] || type;
    j_elm.css("cursor", option);
  },
  updateFuki: function (chara_name, opt = {}) {
    $(".tyrano_base").find("#tmp_style").get(0) ||
      $(".tyrano_base").prepend(
        "<style id='tmp_style' type='text/css'></style>"
      );
    this.kag.getMessageInnerLayer();
    var msg_outer_layer = this.kag.getMessageOuterLayer();
    if ("others" == chara_name) {
      $("#tmp_style").html("");
      return !1;
    }
    var fuki_chara = this.kag.stat.charas[chara_name].fuki;
    fuki_chara.sippo_width = parseInt(fuki_chara.sippo_width);
    fuki_chara.sippo_height = parseInt(fuki_chara.sippo_height);
    this.kag.stat.fuki.def_style;
    let border_size = parseInt(msg_outer_layer.css("border-width")),
      sippo_left = fuki_chara.sippo_left,
      style_text = "",
      style_text_after = "";
    if ("top" == fuki_chara.sippo || "bottom" == fuki_chara.sippo) {
      sippo_left = opt.sippo_left + parseInt(fuki_chara.sippo_left);
      style_text = "left:" + sippo_left + "px;";
    } else {
      sippo_left = opt.sippo_left + parseInt(fuki_chara.sippo_top);
      style_text = "top:" + sippo_left + "px;";
    }
    let style_text_key = "";
    if ("top" == fuki_chara.sippo) {
      style_text += "bottom:100%;";
      style_text_key = "bottom";
    } else if ("bottom" == fuki_chara.sippo) {
      style_text += "top:100%;";
      style_text_key = "top";
    } else if ("left" == fuki_chara.sippo) {
      style_text += "right:100%;";
      style_text_key = "right";
    } else if ("right" == fuki_chara.sippo) {
      style_text += "left:100%;";
      style_text_key = "left";
    }
    style_text_after = "border-bottom-color:";
    let str_css = `\n\n\t\t.fuki_box:after,.fuki_box:before{\n\t\t    border: solid transparent;\n\t\t    content:'';\n\t\t    height:0;\n\t\t    width:0;\n\t\t    pointer-events:none;\n\t\t    position:absolute;\n\t\t    ${style_text}\n\t\t}\n\t\t`,
      str_css2 = "";
    str_css2 =
      "top" == fuki_chara.sippo || "bottom" == fuki_chara.sippo
        ? `\n\n\t\t\t.fuki_box:after{\n\n\t\t\t    border-color: ${msg_outer_layer
            .css("border-color")
            .replace(")", ",0)")};\n\t\t\t    border-top-width:${
            fuki_chara.sippo_height
          }px;\n\t\t\t    border-bottom-width:${
            fuki_chara.sippo_height
          }px;\n\t\t\t    border-left-width:${
            fuki_chara.sippo_width
          }px;\n\t\t\t    border-right-width:${
            fuki_chara.sippo_width
          }px;\n\t\t\t    margin-left: ${
            -1 * fuki_chara.sippo_width
          }px;\n\t\t\t    border-${style_text_key}-color:${msg_outer_layer.css(
            "background-color"
          )};\n\n\t\t\t}\n\n\t\t\t.fuki_box:before{\n\n\t\t\t    border-color: ${msg_outer_layer
            .css("border-color")
            .replace(")", ",0)")};\n\t\t\t    border-top-width:${
            fuki_chara.sippo_height + border_size
          }px;\n\t\t\t    border-bottom-width:${
            fuki_chara.sippo_height + border_size
          }px;\n\t\t\t    border-left-width:${
            fuki_chara.sippo_width + border_size
          }px;\n\t\t\t    border-right-width:${
            fuki_chara.sippo_width + border_size
          }px;\n\t\t\t    margin-left: ${
            -1 * (fuki_chara.sippo_width + border_size)
          }px;\n\t\t\t    margin-${style_text_key}: ${border_size}px;\n\t\t\t    border-${style_text_key}-color:${msg_outer_layer.css(
            "border-color"
          )};\n\n\t\t\t}`
        : `\n\n\t\t\t.fuki_box:after{\n\n\t\t\t    border-color: ${msg_outer_layer
            .css("border-color")
            .replace(")", ",0)")};\n\t\t\t    border-top-width:${
            fuki_chara.sippo_width
          }px;\n\t\t\t    border-bottom-width:${
            fuki_chara.sippo_width
          }px;\n\t\t\t    border-left-width:${
            fuki_chara.sippo_height - 2
          }px;\n\t\t\t    border-right-width:${
            fuki_chara.sippo_height - 2
          }px;\n\t\t\t    margin-top: ${
            -1 * (fuki_chara.sippo_width + 2)
          }px;\n\t\t\t    border-${style_text_key}-color:${msg_outer_layer.css(
            "background-color"
          )};\n\n\t\t\t}\n\n\t\t\t.fuki_box:before{\n\n\t\t\t    border-color: ${msg_outer_layer
            .css("border-color")
            .replace(")", ",0)")};\n\t\t\t    border-top-width:${
            fuki_chara.sippo_width + border_size
          }px;\n\t\t\t    border-bottom-width:${
            fuki_chara.sippo_width + border_size
          }px;\n\t\t\t    border-left-width:${
            fuki_chara.sippo_height + border_size - 2
          }px;\n\t\t\t    border-right-width:${
            fuki_chara.sippo_height + border_size - 2
          }px;\n\t\t\t    margin-top: ${
            -1 * (fuki_chara.sippo_width + border_size + 2)
          }px;\n\t\t\t    margin-${style_text_key}: ${border_size}px;\n\t\t\t    border-${style_text_key}-color:${msg_outer_layer.css(
            "border-color"
          )};\n\n\t\t\t}`;
    $("#tmp_style").html(str_css + "\n" + str_css2);
  },
  popAnimStack: function () {
    this.kag.tmp.num_anim > 0 && this.kag.tmp.num_anim--;
    if (this.kag.tmp.num_anim <= 0 && 1 == this.kag.stat.is_wait_anim) {
      this.kag.stat.is_wait_anim = !1;
      this.kag.cancelWeakStop();
      this.kag.ftag.nextOrder();
    }
  },
  loadScenario: function (file_name, call_back) {
    var that = this;
    this.stronglyStop();
    this.stat.current_scenario = file_name;
    var file_url = "";
    file_url = $.isHTTP(file_name) ? file_name : "./data/scenario/" + file_name;
    if (that.cache_scenario[file_url]) {
      if (call_back) {
        var result_obj = that.cache_scenario[file_url],
          tag_obj = result_obj.array_s,
          map_label = result_obj.map_label;
        that.stat.map_label = map_label;
        that.cancelStrongStop();
        call_back(tag_obj);
      }
    } else
      $.loadText(file_url, function (text_str) {
        var result_obj = that.parser.parseScenario(text_str);
        that.cache_scenario[file_url] = result_obj;
        var tag_obj = result_obj.array_s,
          map_label = result_obj.map_label;
        that.stat.map_label = map_label;
        that.cancelStrongStop();
        call_back && call_back(tag_obj);
      });
  },
  setCacheScenario: function (filename, str) {
    var result_obj = this.parser.parseScenario(str);
    console.log(this.cache_scenario);
    this.cache_scenario["./data/scenario/" + filename] = result_obj;
  },
  getMessageInnerLayer: function () {
    if (this.stat.vchat.is_active) {
      return $("#vchat_base").find(".current_vchat");
    }
    return this.layer
      .getLayer(this.stat.current_layer, this.stat.current_page)
      .find(".message_inner");
  },
  getMessageOuterLayer: function () {
    return this.layer
      .getLayer(this.stat.current_layer, this.stat.current_page)
      .find(".message_outer");
  },
  getMessageCurrentSpan: function () {
    return this.layer
      .getLayer(this.stat.current_layer, this.stat.current_page)
      .find(".message_inner")
      .find("p")
      .find(".current_span");
  },
  setMessageCurrentSpan: function () {
    var jtext = this.getMessageInnerLayer();
    0 == jtext.find("p").length && this.setNewParagraph(jtext);
    if (jtext.find("p").find(".current_span").length > 0) {
      jtext.find("p").find(".current_span").removeClass("current_span");
      this.stat.set_text_span = !1;
    }
    var j_span = $("<span class='current_span'></span>");
    jtext.find("p").append(j_span);
    return j_span;
  },
  setNewParagraph: function (j_inner) {
    "true" == this.stat.vertical
      ? j_inner.append("<p class='vertical_text'></p>")
      : j_inner.append("<p class=''></p>");
  },
  checkMessage: function (jtext) {
    if (1 == this.stat.set_text_span) {
      jtext.find("p").find(".current_span").removeClass("current_span");
      this.stat.set_text_span = !1;
    }
    0 == jtext.find(".current_span").length &&
      jtext.find("p").append($("<span class='current_span'></span>"));
  },
  appendMessage: function (jtext, str) {
    jtext.find("p").find(".current_span").html(str);
  },
  preload: function (src, callbk, options = {}) {
    this.kag.showLoadingLog("preload");
    const onend = (elm) => {
      this.kag.hideLoadingLog();
      callbk && callbk(elm);
    };
    var that = this,
      ext = $.getExt(src);
    const is_http = $.isHTTP(src),
      is_inline_data = "data:" === src.substring(0, 5);
    if (!is_http && !is_inline_data) {
      const c1 = src.charAt(0),
        c2 = src.substring(0, 2);
      "/" === c1 ? (src = "." + src) : "./" !== c2 && (src = "./" + src);
    }
    if ("wav" == ext || "mp3" == ext || "ogg" == ext || "m4a" == ext) {
      const preloaded_audio = this.kag.tmp.preload_audio_map[src];
      if (preloaded_audio)
        switch (preloaded_audio.state()) {
          case "unload":
            delete this.kag.tmp.preload_audio_map[src];
            break;
          case "loading":
            preloaded_audio.once("load", () => {
              onend(preloaded_audio);
            });
            return;
          case "loaded":
            onend(preloaded_audio);
            return;
        }
      const audio_obj = new Howl({ src: src, preload: !1 });
      this.kag.tmp.preload_audio_map[src] = audio_obj;
      audio_obj.once("load", () => {
        onend(audio_obj);
      });
      audio_obj.once("loaderror", () => {
        audio_obj.unload();
        this.kag.error("preload_failure_sound", { src: src });
        onend(audio_obj);
        delete this.kag.tmp.preload_audio_map[src];
      });
      audio_obj.__preload = !0;
      audio_obj.__single_use =
        void 0 === options.single_use || options.single_use;
      const names = (options.name || "").split(",").map((item) => item.trim());
      audio_obj.__names = names;
      audio_obj.load();
    } else if ("mp4" == ext || "ogv" == ext || "webm" == ext) {
      let evt_name = "loadeddata";
      "iphone" == $.userenv() && (evt_name = "loadedmetadata");
      $("<video />")
        .on(evt_name, function (e) {
          onend(this);
        })
        .on("error", function (e) {
          that.kag.error("preload_failure_video", { src: src });
          onend();
        })
        .attr("src", src);
    } else
      $("<img />")
        .on("load", function (e) {
          onend(this);
        })
        .on("error", function (e) {
          that.kag.error("preload_failure_image", { src: src });
          onend();
        })
        .attr("src", src);
  },
  preloadAll: function (storage, callbk) {
    const that = this;
    if (Array.isArray(storage)) {
      if (0 == storage.length) {
        callbk && callbk();
        return;
      }
      let sum = 0;
      for (let i = 0; i < storage.length; i++)
        that.kag.preload(storage[i], () => {
          sum++;
          sum === storage.length && callbk && callbk();
        });
    } else this.kag.preload(storage, callbk);
  },
  preloadNextVoice: function () {
    const array_tag = this.kag.ftag.array_tag,
      end_index = Math.min(
        array_tag.length,
        this.kag.ftag.current_order_index + 20
      );
    let i = this.kag.ftag.current_order_index + 1,
      next_chara_ptext_pm = null;
    for (; i < end_index; i++) {
      const tag = array_tag[i];
      if ("chara_ptext" === tag.name) {
        next_chara_ptext_pm = $.extend({}, tag.pm);
        break;
      }
    }
    if (next_chara_ptext_pm) {
      next_chara_ptext_pm = this.kag.ftag.convertEntity(next_chara_ptext_pm);
      const next_chara_name = next_chara_ptext_pm.name,
        next_chara_voconfig = this.kag.stat.map_vo.vochara[next_chara_name];
      if (next_chara_voconfig) {
        const next_voice_storage = $.replaceAll(
            next_chara_voconfig.vostorage,
            "{number}",
            next_chara_voconfig.number
          ),
          next_voice_storage_path = $.parseStorage(next_voice_storage, "sound");
        this.kag.preload(next_voice_storage_path, () => {});
      }
    }
  },
  setStyles: function (j_obj, array_style) {
    for (let key in array_style)
      void 0 !== array_style[key] &&
        ("" === array_style[key] || j_obj.css(key, array_style[key]));
    return j_obj;
  },
  html: function (html_file_name, data, callback) {
    var that = this;
    data = data || {};
    if (this.cache_html[html_file_name]) {
      if (callback) {
        var html = $.templates(this.cache_html[html_file_name]).render(data);
        callback($(html));
      }
    } else {
      if (!this.kag.stat.sysview) {
        this.kag.stat.sysview = {};
        this.kag.stat.sysview = {
          save: "./tyrano/html/save.html",
          load: "./tyrano/html/load.html",
          backlog: "./tyrano/html/backlog.html",
          menu: "./tyrano/html/menu.html",
        };
      }
      var path_html = this.kag.stat.sysview[html_file_name];
      $.loadText(path_html, function (text_str) {
        var html = $.templates(text_str).render(data);
        that.cache_html[html_file_name] = text_str;
        callback && callback($(html));
      });
    }
  },
  error: function (message, replace_map) {
    if ("true" == this.kag.config["debugMenu.visible"]) {
      const current_storage = this.kag.stat.current_scenario,
        line = parseInt(this.kag.stat.current_line) + 1,
        line_str = $.lang("line", { line: line });
      message in tyrano_lang.word && (message = $.lang(message, replace_map));
      const error_str = `Error: ${current_storage}:${line_str}\n\n${message}`;
      $.error_message(error_str);
    }
  },
  warning: function (message, replace_map, is_alert = !0) {
    if ("true" == this.kag.config["debugMenu.visible"]) {
      "boolean" == typeof replace_map && (is_alert = replace_map);
      message in tyrano_lang.word && (message = $.lang(message, replace_map));
      const warning_str = `Warning: ${message}`;
      is_alert ? $.error_message(warning_str) : console.warn(warning_str);
    }
  },
  log: function (obj) {
    "true" == this.kag.config["debugMenu.visible"] && console.log(obj);
  },
  setAuto: function (bool) {
    if (this.stat.is_auto !== bool) {
      if (bool) {
        this.trigger("auto-start");
        this.kag.ftag.showGlyph("auto");
        this.kag.ftag.changeAutoNextGlyph();
        $(".button-auto-sync").each((i, elm) => {
          const j_elm = $(elm),
            pm = JSON.parse(j_elm.attr("data-event-pm"));
          j_elm.attr("src", $.parseStorage(pm.autoimg, pm.folder));
          j_elm.addClass("src-change-disabled");
        });
        this.showModeEffect("auto");
        this.setSkip(!1);
      } else {
        this.stat.is_wait_auto = !1;
        this.trigger("auto-stop");
        this.kag.ftag.hideGlyph("auto");
        this.kag.ftag.restoreAutoNextGlyph();
        $(".button-auto-sync").each((i, elm) => {
          const j_elm = $(elm),
            pm = JSON.parse(j_elm.attr("data-event-pm"));
          j_elm.attr("src", $.parseStorage(pm.graphic, pm.folder));
          j_elm.removeClass("src-change-disabled");
        });
        this.showModeEffect("stop");
      }
      this.stat.is_auto = bool;
    }
  },
  setSkip: function (bool, options = {}) {
    if (this.stat.is_skip !== bool) {
      if (bool) {
        this.trigger("skip-start");
        this.kag.ftag.showGlyph("skip");
        $(".button-skip-sync").each((i, elm) => {
          const j_elm = $(elm),
            pm = JSON.parse(j_elm.attr("data-event-pm"));
          j_elm.attr("src", $.parseStorage(pm.skipimg, pm.folder));
          j_elm.addClass("src-change-disabled");
        });
        this.showModeEffect("skip", options);
        this.setAuto(!1);
      } else {
        this.trigger("skip-stop");
        this.kag.ftag.hideGlyph("skip");
        $(".button-skip-sync").each((i, elm) => {
          const j_elm = $(elm),
            pm = JSON.parse(j_elm.attr("data-event-pm"));
          j_elm.attr("src", $.parseStorage(pm.graphic, pm.folder));
          j_elm.removeClass("src-change-disabled");
        });
        this.showModeEffect("stop", options);
      }
      this.stat.is_skip = bool;
    }
  },
  weaklyStop: function () {
    this.stat.is_stop = !0;
  },
  cancelWeakStop: function () {
    this.stat.is_stop = !1;
  },
  stronglyStop: function () {
    this.stat.is_strong_stop = !0;
  },
  cancelStrongStop: function () {
    this.stat.is_strong_stop = !1;
  },
  waitClick: function (name) {
    this.layer.showEventLayer();
    this.cancelStrongStop();
    this.cancelWeakStop();
  },
  logTrigger: function (event_name, event_obj) {
    let color = "orange";
    switch (event_name.split(":")[0]) {
      case "tag":
        color = "limegreen";
        break;
      case "storage":
        color = "yellow";
        break;
      case "click":
        color = "cyan";
    }
    console.log(
      "%c" + event_name,
      `padding: 4px 6px; border-radius: 4px; background: #000; color: ${color};`
    );
    console.log(event_obj);
  },
  is_event_logging_enabled: !1,
  enableEventLogging: function () {
    this.is_event_logging_enabled = !0;
  },
  logEventLisnenerCount: function () {
    let str = "現在登録されているイベントリスナ\n";
    const map = this.event_listener_map;
    let sum = 0;
    for (const event in map)
      if (map[event]) {
        str += `${event}: ${map[event].length}件\n`;
        sum += map[event].length;
      }
    str += "%o";
    console.log(str, map);
    console.log(`合計 ${sum} 個のイベントリスナが登録されています。`);
  },
  trigger: function (event_name, event_obj = {}) {
    event_obj.name = event_name;
    this.is_event_logging_enabled && this.logTrigger(event_name, event_obj);
    const map = this.event_listener_map;
    if (void 0 === map[event_name] || 0 === map[event_name].length) return;
    let exists_once = !1;
    const unbind_target_ids = [];
    for (const listener of map[event_name]) {
      let callback_return_value;
      "function" == typeof listener.callback &&
        (callback_return_value = listener.callback.call(this, event_obj));
      if (listener.once) {
        exists_once = !0;
        unbind_target_ids.push(listener.id);
      }
      if (!1 === callback_return_value) break;
    }
    if (exists_once) {
      const new_listeners = [];
      for (const listener of map[event_name])
        unbind_target_ids.includes(listener.id) || new_listeners.push(listener);
      map[event_name] = new_listeners;
      this.is_event_logging_enabled && this.logEventLisnenerCount();
    }
  },
  event_listener_count: 0,
  on: function (event_names, callback, options = {}) {
    const map = this.event_listener_map,
      event_name_hash = event_names.split(" ");
    for (const event_name of event_name_hash) {
      const dot_hash = event_name.split("."),
        event = dot_hash[0].replace(/:/g, "-"),
        namespaces = dot_hash.slice(1);
      if ("" !== event) {
        void 0 === map[event] && (map[event] = []);
        const listener = {
          id: this.event_listener_count,
          callback: callback,
          namespaces: namespaces,
          priority: options.priority || 0,
          once: !!options.once || !1,
          system: options.system || !1,
          temp: options.temp || !1,
        };
        map[event].push(listener);
        this.event_listener_count += 1;
        this.sortEventLisneners(event);
      }
    }
    this.is_event_logging_enabled && this.logEventLisnenerCount();
  },
  once: function (event_names, callback, options = {}) {
    options.once = !0;
    this.on(event_names, callback, options);
  },
  overwrite: function (event_names, callback, options = {}) {
    this.off(event_names, options);
    this.on(event_names, callback, options);
  },
  sortEventLisneners: function (evnet_name) {
    const listeners = this.event_listener_map[evnet_name];
    Array.isArray(listeners) &&
      listeners.sort((a, b) =>
        a.priority > b.priority
          ? -1
          : a.priority < b.priority
          ? 1
          : a.id < b.id
          ? -1
          : 1
      );
  },
  off: function (event_names, options = {}) {
    const map = this.event_listener_map,
      event_name_hash = event_names.split(" ");
    for (const event_name of event_name_hash) {
      const dot_hash = event_name.split("."),
        event = dot_hash[0],
        del_namespaces = dot_hash.slice(1);
      if (!event || (void 0 !== map[event] && 0 !== map[event].length)) {
        let event_list;
        event_list = "" === event ? Object.keys(map) : [event];
        for (const _event of event_list) {
          const new_listeners = [];
          for (const listener of map[_event]) {
            let should_keep = !1;
            for (const this_del_namespace of del_namespaces)
              if (!listener.namespaces.includes(this_del_namespace)) {
                should_keep = !0;
                break;
              }
            if (listener.system) {
              should_keep = !0;
              options.system && (should_keep = !1);
            }
            should_keep && new_listeners.push(listener);
          }
          map[_event] = new_listeners;
        }
      } else;
    }
    this.is_event_logging_enabled && this.logEventLisnenerCount();
  },
  offTempListeners: function () {
    const map = this.event_listener_map;
    for (const event in map)
      map[event] &&
        (map[event] = map[event].filter((listener) => !listener.temp));
    this.is_event_logging_enabled && this.logEventLisnenerCount();
  },
  getTag: function (tag_name = "") {
    return this.ftag.master_tag[tag_name];
  },
  parseKeyframesForWebAnimationAPI: function (name) {
    if (!this.stat.map_keyframe[name] || !this.stat.map_keyframe[name].frames)
      return null;
    const frames = this.stat.map_keyframe[name].frames,
      keyframes = [];
    for (const percentage_str in frames) {
      const offset = parseInt(percentage_str) / 100,
        frame = frames[percentage_str],
        this_keyframe = {},
        transform_strs = [];
      for (const _key in frame.trans) {
        let key = _key,
          value = frame.trans[_key];
        if ("x" === _key || "y" === _key || "z" === _key) {
          key = "translate" + _key.toUpperCase();
          value += "px";
        }
        transform_strs.push(`${key}(${value})`);
      }
      transform_strs.length > 0 &&
        (this_keyframe.transform = transform_strs.join(" "));
      for (const _key in frame.styles) {
        if ("_tag" === _key) continue;
        this_keyframe[$.parseCamelCaseCSS(_key)] = $.convertColor(
          frame.styles[_key]
        );
      }
      this_keyframe.offset = offset;
      keyframes.push(this_keyframe);
    }
    return keyframes;
  },
  getHiddenArea() {
    if (this.__j_hiden_area) return this.__j_hiden_area;
    let j_hidden_area = $("#hidden_area");
    if (j_hidden_area.length > 0) {
      this.__j_hiden_area = j_hidden_area;
      return j_hidden_area;
    }
    j_hidden_area = $('<div id="hidden_area" />')
      .appendTo("body")
      .css({ position: "fixed", left: "200%", top: "200%", opacity: "0" });
    this.__j_hiden_area = j_hidden_area;
    return j_hidden_area;
  },
  __j_hiden_area: null,
  changeHowlVolume: function (audio_obj, options = {}) {
    let tag_volume =
        void 0 !== audio_obj.__tag_volume ? audio_obj.__tag_volume : 1,
      config_volume =
        void 0 !== audio_obj.__config_volume ? audio_obj.__config_volume : 1;
    void 0 !== options.tag && (tag_volume = options.tag);
    void 0 !== options.config && (config_volume = options.config);
    const new_howl_volume = tag_volume * config_volume;
    if (options.time && 0 !== parseInt(options.time)) {
      const duration = Math.max(100, parseInt(options.time));
      audio_obj.fade(audio_obj.volume(), new_howl_volume, duration);
    } else audio_obj.volume(new_howl_volume);
    audio_obj.__tag_volume = tag_volume;
    audio_obj.__config_volume = config_volume;
  },
  playSound: function (storage, buf) {
    this.kag.ftag.startTag("playse", {
      storage: storage,
      buf: buf,
      stop: "true",
    });
  },
  makeFocusable: function (j_elm, tabindex = 0) {
    if ("false" !== this.config.useKeyFocus) {
      if ("string" == typeof tabindex) {
        if ("false" === tabindex) return;
        tabindex = parseInt(tabindex) || 0;
      }
      j_elm.attr("tabindex", tabindex);
      j_elm.addClass("tyrano-focusable");
      j_elm.off("focusin focusout");
      j_elm.on("focusin", () => {
        "true" === this.config.keyFocusWithHoverStyle &&
          j_elm.trigger("mouseenter");
        j_elm.addClass("focus");
      });
      j_elm.on("focusout", () => {
        "true" === this.config.keyFocusWithHoverStyle &&
          j_elm.trigger("mouseleave");
        j_elm.removeClass("focus");
      });
    }
  },
  makeUnfocusable: function (j_elm) {
    if ("false" !== this.config.useKeyFocus) {
      j_elm.removeAttr("tabindex");
      j_elm.removeClass("tyrano-focusable");
      j_elm.off("focusin focusout");
    }
  },
  makeUnfocusableAll: function (j_elm) {
    "false" !== this.config.useKeyFocus &&
      this.makeUnfocusable(j_elm.find("[tabindex]"));
  },
  unfocus: function () {
    $(":focus").blur().removeClass("hover");
  },
  restoreFocusable: function () {
    "false" !== this.config.useKeyFocus &&
      $(".tyrano-focusable").each((i, elm) => {
        const j_elm = $(elm),
          tabindex = parseInt(j_elm.attr("tabindex")) || 0;
        this.makeFocusable(j_elm, tabindex);
      });
  },
  chara: {
    init() {},
    getCharaNameArea() {
      return this.kag.stat.chara_ptext
        ? $("." + this.kag.stat.chara_ptext)
        : $();
    },
    getCharaName() {
      let chara_name = "";
      if ("" != this.kag.stat.chara_ptext) {
        const j_chara_name = this.getCharaNameArea();
        chara_name = j_chara_name.hasClass("multiple-text")
          ? j_chara_name.find(".fill").text()
          : $.isNull(j_chara_name.html());
      }
      return chara_name;
    },
    setNotSpeakerStyle(j_chara) {
      const filter = this.kag.stat.apply_filter_str;
      j_chara.setFilterCSS(filter);
    },
    setSpeakerStyle: function (j_chara) {
      j_chara.setFilterCSS("");
    },
    isPlusLighterEnabled() {
      return "true" === this.kag.stat.plus_lighter;
    },
    getCharaContainer(chara_name, j_layer) {
      j_layer || (j_layer = $(".layer_fore"));
      let chara_selector = "";
      chara_name && (chara_selector = "." + chara_name);
      return j_layer.find(".tyrano_chara" + chara_selector);
    },
    setPartContainer(j_chara) {
      this.isPlusLighterEnabled() &&
        j_chara.children("img").each((i, img) => {
          this.wrapPartContainer(img);
        });
    },
    wrapPartContainer(j_img) {
      const j_div = $(
        '<div class="chara_part_container plus_lighter_container" />'
      );
      j_div.insertAfter(j_img);
      j_div.append(j_img);
    },
  },
  showModeEffect(_type, options = {}) {
    clearTimeout(this.tmp.screen_effect_timer_id);
    const type = options.hold ? "hold" + _type : _type;
    this.tmp.screen_effect_timer_id = setTimeout(() => {
      if (this.kag.tmp.prev_screen_effect_type === type) return;
      this.kag.tmp.prev_screen_effect_type = type;
      const env = "pc" === $.userenv() ? "pc" : "phone";
      if (!this.tmp.mode_effect[env] || !this.tmp.mode_effect[env][type])
        return;
      const def = this.tmp.mode_effect[env][type],
        storage = def.storage;
      if (!storage || "none" === storage) return;
      $("#mode_effect").remove();
      let j_effect;
      if ("default" === storage) {
        j_effect = $(
          `<div id="mode_effect" class="mode_effect mode_effect_default ${_type}"><div></div><div></div></div>`
        );
        def.width &&
          "auto" !== def.width &&
          j_effect.css("font-size", `${(def.width / 15).toFixed(0)}px`);
        def.bgcolor && j_effect.css("background", $.convertColor(def.bgcolor));
        if (def.color)
          if ("stop" === _type) {
            j_effect
              .children()
              .eq(0)
              .css("border-right-color", $.convertColor(def.color));
            j_effect
              .children()
              .eq(1)
              .css("border-left-color", $.convertColor(def.color));
          } else
            j_effect
              .children()
              .css("border-left-color", $.convertColor(def.color));
      } else {
        const src = $.parseStorage(storage, "image");
        j_effect = $(
          `<img id="mode_effect" src="${src}" class="mode_effect ${type}" />`
        );
        def.width &&
          "auto" !== def.width &&
          j_effect.css("width", $.convertLength(def.width));
        def.height &&
          "auto" !== def.height &&
          j_effect.css("height", $.convertLength(def.height));
      }
      j_effect.setStyle("animation-duration", "800ms");
      $("#tyrano_base").append(j_effect);
      setTimeout(() => {
        j_effect.remove();
      }, 800);
    }, 10);
  },
  showLoadingLog(type = "preload") {
    if (!this.kag.stat.loading_log) return;
    const tmp = this.kag.tmp;
    clearTimeout(tmp.loading_log_hide_timer_id);
    let text = this.kag.stat.loading_log.message_map[type];
    if (text && "none" !== text) {
      "default" === text &&
        (text = this.kag.getTag("loading_log").default_message_map[type]);
      "notext" === text && (text = "");
      tmp.j_loading_log_message.text(text);
      text &&
        tmp.j_loading_log_message.setStyle(
          "animation-duration",
          `${this.kag.stat.loading_log.dot_time}ms`
        );
      this.kag.stat.loading_log.use_icon
        ? tmp.j_loading_log_icon.show()
        : tmp.j_loading_log_icon.hide();
      clearTimeout(tmp.loading_log_timer_id);
      tmp.loading_log_timer_id = $.setTimeout(() => {
        tmp.j_loading_log.show();
      }, Math.max(11, this.kag.stat.loading_log.min_time));
    }
  },
  hideLoadingLog() {
    if (
      !this.kag.ftag.master_tag.loading_log ||
      !this.kag.ftag.master_tag.loading_log.initialized
    )
      return;
    const tmp = this.kag.tmp;
    clearTimeout(tmp.loading_log_hide_timer_id);
    tmp.loading_log_hide_timer_id = setTimeout(() => {
      clearTimeout(tmp.loading_log_timer_id);
      tmp.j_loading_log.hide();
    }, 10);
  },
  test: function () {},
};
tyrano.plugin.kag.tag = {};
