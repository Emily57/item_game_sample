tyrano.plugin.kag.ftag = {
  tyrano: null,
  kag: null,
  array_tag: [],
  master_tag: {},
  current_order_index: -1,
  init: function () {
    for (var order_type in tyrano.plugin.kag.tag) {
      this.master_tag[order_type] = object(tyrano.plugin.kag.tag[order_type]);
      this.master_tag[order_type].kag = this.kag;
    }
  },
  buildTag: function (array_tag, label_name) {
    this.array_tag = array_tag;
    label_name
      ? this.nextOrderWithLabel(label_name)
      : this.nextOrderWithLabel("");
  },
  buildTagIndex: function (array_tag, index, auto_next) {
    this.array_tag = array_tag;
    this.nextOrderWithIndex(index, void 0, void 0, void 0, auto_next);
  },
  completeTrans: function () {
    this.kag.stat.is_trans = !1;
    if (1 == this.kag.stat.is_stop) {
      this.kag.cancelWeakStop();
      this.nextOrder();
    }
  },
  showGlyph(mode) {
    $("#mode_glyph_" + mode).show();
  },
  hideGlyph(mode) {
    $("#mode_glyph_" + mode).hide();
  },
  changeAutoNextGlyph() {
    const glyph_auto_pm = this.kag.stat.glyph_auto_next_pm;
    if (glyph_auto_pm) {
      this.kag.stat.glyph_pm_restore = this.kag.stat.glyph_pm || {
        line: this.kag.stat.path_glyph,
        fix: this.kag.stat.flag_glyph,
        folder: "tyrano/images/system",
      };
      this.kag.stat.glyph_pm = glyph_auto_pm;
    }
  },
  restoreAutoNextGlyph() {
    const glyph_default_pm = this.kag.stat.glyph_pm_restore;
    glyph_default_pm && (this.kag.stat.glyph_pm = glyph_default_pm);
  },
  getGlyphKey(mode, fix = !0) {
    let glyph_key = "glyph";
    mode && (glyph_key += "_" + mode);
    "auto" !== mode || fix || (glyph_key += "_next");
    return glyph_key + "_pm";
  },
  hideNextImg: function () {
    $(".img_next").remove();
    $(".glyph_image").hide();
  },
  showNextImg: function () {
    if ("false" == this.kag.stat.flag_glyph) {
      $(".img_next").remove();
      const j_glyph = this.createNextImg();
      this.kag.getMessageInnerLayer().find("p").append(j_glyph);
    } else $(".glyph_image").show();
  },
  restoreNextImg: function () {
    const is_fixed = "true" === this.kag.stat.flag_glyph;
    if (
      0 !== $("." + (is_fixed ? "glyph_image" : "img_next")).length &&
      this.kag.stat.glyph_pm
    )
      if (is_fixed) {
        const pm = $.extend({}, this.kag.stat.glyph_pm, { next: "false" });
        this.kag.ftag.startTag("glyph", pm);
      } else this.showNextImg();
  },
  createNextImg: function (mode = "") {
    const glyph_key = this.getGlyphKey(mode);
    let pm = this.kag.stat[glyph_key];
    if (!pm) {
      if (mode) return null;
      pm = {
        line: this.kag.stat.path_glyph,
        fix: this.kag.stat.flag_glyph,
        folder: "tyrano/images/system",
      };
    }
    const class_names = [];
    let j_glyph,
      img_src,
      id = "";
    mode
      ? (id = "mode_glyph_" + mode)
      : "true" !== pm.fix
      ? class_names.push("img_next")
      : class_names.push("glyph_image");
    switch (pm.type) {
      default:
      case "image":
        img_src = $.parseStorage(pm.line || "nextpage.gif", pm.folder);
        j_glyph = $(`<img src="${img_src}">`);
        pm.width && j_glyph.setStyle("width", pm.width + "px");
        pm.height && j_glyph.setStyle("height", pm.height + "px");
        break;
      case "html":
        j_glyph = $(`<div>${pm.html}</div>`);
        pm.width && j_glyph.setStyle("width", pm.width + "px");
        pm.height
          ? j_glyph.setStyle("height", pm.height + "px")
          : pm.width && j_glyph.setStyle("height", pm.width + "px");
        break;
      case "figure":
        pm.figure && class_names.push("img_next_" + pm.figure);
        j_glyph = $("<div></div>");
        pm.color &&
          j_glyph.setStyle("background-color", $.convertColor(pm.color));
        pm.width && j_glyph.setStyle("width", pm.width + "px");
        pm.height
          ? j_glyph.setStyle("height", pm.height + "px")
          : pm.width && j_glyph.setStyle("height", pm.width + "px");
        break;
      case "koma_anim": {
        img_src = $.parseStorage(pm.koma_anim, pm.folder);
        j_glyph = $("<div></div>");
        const j_koma_anim = $("<div></div>");
        j_koma_anim.setStyleMap({
          display: "inline-block",
          "vertical-align": "sub",
          "background-color": "transparent",
          "background-image": `url(${img_src})`,
          "background-repeat": "no-repeat",
          "background-position": "0px 0px",
          "background-size": `${pm.image_width}px ${pm.image_height}px`,
          width: `${pm.koma_width}px`,
          height: `${pm.koma_height}px`,
        });
        j_koma_anim.get(0).animate(
          { backgroundPositionX: ["0px", `-${pm.image_width}px`] },
          {
            delay: 0,
            direction: "normal",
            duration: parseInt(pm.koma_anim_time) || 1e3,
            easing: `steps(${pm.koma_count}, end)`,
            iterations: 1 / 0,
            fill: pm.mode || "forwards",
          }
        );
        j_glyph.append(j_koma_anim);
        break;
      }
    }
    if (pm.keyframe) j_glyph.animateWithTyranoKeyframes(pm);
    else if (pm.anim) {
      class_names.push("img_next_" + pm.anim);
      pm.time &&
        j_glyph.setStyle("animation-duration", $.convertDuration(pm.time));
      pm.delay &&
        j_glyph.setStyle("animation-delay", $.convertDuration(pm.delay));
      pm.count && j_glyph.setStyle("animation-iteration-count", pm.count);
      pm.mode && j_glyph.setStyle("animation-fill-mode", pm.mode);
      pm.easing && j_glyph.setStyle("animation-timing-function", pm.easing);
      pm.direction && j_glyph.setStyle("animation-direction", pm.direction);
    }
    pm.marginl && j_glyph.setStyle("margin-left", pm.marginl + "px");
    pm.marginb && j_glyph.setStyle("margin-bottom", pm.marginb + "px");
    j_glyph.attr("class", class_names.join(" "));
    id && j_glyph.attr("id", id);
    pm.name && $.setName(j_glyph, pm.name);
    return j_glyph;
  },
  nextOrder: function () {
    if ("function" == typeof this.kag.tmp.cut_nextorder) {
      this.kag.tmp.cut_nextorder();
      return !1;
    }
    this.kag.layer.hideEventLayer();
    if (1 == this.kag.stat.is_strong_stop) return !1;
    if (1 == this.kag.stat.is_adding_text) return !1;
    this.current_order_index++;
    this.kag.trigger("nextorder", {
      scenario: this.kag.stat.current_scenario,
      index: this.current_order_index,
    });
    if (this.array_tag.length <= this.current_order_index) {
      this.kag.endStorage();
      return !1;
    }
    var tag = $.cloneObject(this.array_tag[this.current_order_index]);
    this.kag.stat.current_line = tag.line;
    if (this.kag.is_rider) {
      tag.ks_file = this.kag.stat.current_scenario;
      this.kag.rider.pushConsoleLog(tag);
    } else if (this.kag.is_studio) {
      tag.ks_file = this.kag.stat.current_scenario;
      this.kag.studio.pushConsole(tag);
      this.kag.log("**:" + this.current_order_index + "　line:" + tag.line);
      this.kag.log(tag);
    } else {
      this.kag.log("**:" + this.current_order_index + "　line:" + tag.line);
      this.kag.log(tag);
    }
    if (
      ("call" == tag.name && "make.ks" == tag.pm.storage) ||
      "make.ks" == this.kag.stat.current_scenario ||
      ("call" == tag.name &&
        tag.pm.storage == this.kag.stat.resizecall.storage) ||
      this.kag.stat.current_scenario == this.kag.stat.resizecall.storage
    ) {
      if (1 == this.kag.stat.flag_ref_page) {
        this.kag.tmp.loading_make_ref = !0;
        this.kag.stat.flag_ref_page = !1;
      }
    } else if (1 == this.kag.stat.flag_ref_page) {
      this.kag.stat.flag_ref_page = !1;
      this.kag.stat.log_clear = !0;
      this.kag.ftag.hideNextImg();
      this.kag.stat.vchat.is_active
        ? this.kag.ftag.startTag("vchat_in", {})
        : this.kag.getMessageInnerLayer().html("");
    }
    if (1 == this.checkCond(tag)) {
      if (
        1 == this.kag.stat.is_hide_message &&
        1 != this.kag.stat.fuki.active
      ) {
        this.kag.layer.showMessageLayers();
        this.kag.stat.is_hide_message = !1;
      }
      if (this.master_tag[tag.name]) {
        this.kag.stat.is_script ||
          !0 === tag.is_entity_disabled ||
          (tag.pm = this.convertEntity(tag.pm));
        var err_str = this.checkVital(tag);
        this.master_tag[tag.name].log_join
          ? (this.kag.stat.log_join = "true")
          : "text" == tag.name || (this.kag.stat.log_join = "false");
        this.checkCw(tag) && this.kag.layer.showEventLayer();
        if ("" != err_str) this.kag.error(err_str);
        else {
          tag.pm._tag = tag.name;
          this.kag.trigger(`tag-${tag.name}`, {
            target: tag.pm,
            in_scenario: !0,
            is_macro: !1,
          });
          this.master_tag[tag.name].start(
            $.extend(!0, $.cloneObject(this.master_tag[tag.name].pm), tag.pm)
          );
        }
      } else if (this.kag.stat.map_macro[tag.name]) {
        this.kag.trigger(`tag-${tag.name}`, {
          target: tag.pm,
          in_scenario: !0,
          is_macro: !0,
        });
        var stack = TYRANO.kag.getStack("macro");
        stack && (stack.pm = $.extend({}, this.kag.stat.mp));
        tag.pm = this.convertEntity(tag.pm);
        var pms = tag.pm,
          map_obj = this.kag.stat.map_macro[tag.name],
          back_pm = {};
        back_pm.index = this.kag.ftag.current_order_index;
        back_pm.storage = this.kag.stat.current_scenario;
        back_pm.pm = $.extend({}, pms);
        this.kag.stat.mp = pms;
        this.kag.pushStack("macro", back_pm);
        this.kag.ftag.nextOrderWithIndex(map_obj.index, map_obj.storage);
      } else {
        this.kag.error("undefined_tag", tag);
        this.nextOrder();
      }
    } else this.nextOrder();
  },
  checkCw: function (tag) {
    return (
      !!this.master_tag[tag.name].cw &&
      1 != this.kag.stat.is_script &&
      1 != this.kag.stat.is_html &&
      1 != this.kag.stat.checking_macro
    );
  },
  nextOrderWithTagSearch: function (target_tags) {
    const last_index = this.array_tag.length - 1;
    for (var i = 0; i < 2e3 && !(this.current_order_index >= last_index); i++) {
      if (this.kag.ftag.nextOrderWithTag(target_tags)) return !0;
    }
    return !1;
  },
  nextOrderWithTag: function (target_tags) {
    try {
      this.current_order_index++;
      var tag = this.array_tag[this.current_order_index];
      this.checkCond(tag);
      if ("" == target_tags[tag.name]) {
        if (this.master_tag[tag.name]) {
          switch (tag.name) {
            case "elsif":
            case "else":
            case "endif":
              var root = this.kag.getStack("if");
              if (!root || tag.pm.deep_if != root.deep) return !1;
          }
          tag.pm = this.convertEntity(tag.pm);
          tag.pm._tag = tag.name;
          this.master_tag[tag.name].start(
            $.extend(!0, $.cloneObject(this.master_tag[tag.name].pm), tag.pm)
          );
          return !0;
        }
        return !1;
      }
      return !1;
    } catch (e) {
      console.log(e);
      return !1;
    }
  },
  convertEntity: function (pm) {
    "" == pm["*"] && (pm = $.extend(!0, this.kag.stat.mp, $.cloneObject(pm)));
    for (let key in pm) {
      var val = pm[key],
        c = "";
      val.length > 0 && (c = val.substr(0, 1));
      if (val.length > 0 && "&" === c)
        pm[key] = this.kag.embScript(val.substr(1, val.length));
      else if (val.length > 0 && "%" === c) {
        var mp = this.kag.stat.mp;
        if (mp) {
          var vertical_bar_hash = val.substring(1).split("|"),
            map_key = vertical_bar_hash[0],
            default_value = vertical_bar_hash[1] || "";
          if ("3" !== this.kag.config.KeepSpaceInParameterValue) {
            map_key = $.trim(map_key);
            default_value = $.trim(default_value);
          }
          pm[key] = map_key in mp ? mp[map_key] : default_value;
        }
      }
    }
    return pm;
  },
  checkVital: function (tag) {
    var master_tag = this.master_tag[tag.name],
      err_str = "";
    if (!master_tag.vital) return "";
    for (var array_vital = master_tag.vital, i = 0; i < array_vital.length; i++)
      tag.pm[array_vital[i]]
        ? "" == tag.pm[array_vital[i]] &&
          (err_str = $.lang("missing_parameter", {
            tag: tag.name,
            param: array_vital[i],
          }))
        : (err_str = $.lang("missing_parameter", {
            tag: tag.name,
            param: array_vital[i],
          }));
    return err_str;
  },
  checkCond: function (tag) {
    var pm = tag.pm;
    if (pm.cond) {
      var cond = pm.cond;
      return this.kag.embScript(cond);
    }
    return !0;
  },
  startTag: function (name, pm, cb) {
    void 0 === pm && (pm = {});
    "function" == typeof cb && (this.kag.tmp.cut_nextorder = cb);
    TYRANO.kag.trigger(`tag-${name}`, {
      target: pm,
      is_next_order: !1,
      is_macro: !1,
    });
    pm._tag = name;
    this.master_tag[name].start(
      $.extend(!0, $.cloneObject(this.master_tag[name].pm), pm)
    );
  },
  bufTags: [],
  current_tags: [],
  current_cb: null,
  isExeTag: !1,
  cntTag: 0,
  startTags: function (array_tag, cb) {
    var that = this;
    this.bufTags.push({ tags: array_tag, cb: cb });
    let post_tag = () => {
      this.isExeTag = !0;
      let tobj = null;
      if (0 == this.cntTag) {
        var tmp = this.bufTags.shift();
        this.current_tags = tmp.tags;
        this.current_cb = tmp.cb;
      }
      tobj = this.current_tags[this.cntTag];
      that.startTag(tobj.tag, tobj.pm, () => {
        TYRANO.kag.tmp.cut_nextorder = null;
        this.cntTag++;
        if (this.current_tags.length == this.cntTag) {
          this.current_cb();
          if (0 != this.bufTags.length) {
            this.cntTag = 0;
            setTimeout(() => {
              post_tag();
            }, 10);
          } else this.isExeTag = !1;
        } else
          setTimeout(() => {
            post_tag();
          }, 10);
      });
    };
    if (0 == this.isExeTag) {
      this.cntTag = 0;
      post_tag();
    }
  },
  nextOrderWithLabel: function (label_name, scenario_file) {
    this.kag.cancelStrongStop();
    if (label_name) {
      -1 != label_name.indexOf("*") &&
        (label_name = label_name.substr(1, label_name.length));
      this.kag.ftag.startTag("label", {
        label_name: label_name,
        nextorder: "false",
      });
    }
    if ("*savesnap" != label_name) {
      var that = this,
        original_scenario = scenario_file;
      label_name = label_name || "";
      scenario_file = scenario_file || this.kag.stat.current_scenario;
      label_name = label_name.replace("*", "");
      if (
        scenario_file != this.kag.stat.current_scenario &&
        null != original_scenario
      ) {
        this.kag.weaklyStop();
        this.kag.loadScenario(scenario_file, function (array_tag) {
          that.kag.cancelWeakStop();
          that.kag.ftag.buildTag(array_tag, label_name);
        });
      } else if ("" == label_name) {
        this.current_order_index = -1;
        this.nextOrder();
      } else if (this.kag.stat.map_label[label_name]) {
        var label_obj = this.kag.stat.map_label[label_name];
        this.current_order_index = label_obj.index;
        this.nextOrder();
      } else {
        this.kag.error("undefined_label", { name: label_name });
        this.nextOrder();
      }
    } else {
      var tmpsnap = this.kag.menu.snap,
        co = tmpsnap.current_order_index,
        cs = tmpsnap.stat.current_scenario;
      this.nextOrderWithIndex(co, cs, void 0, void 0, "snap");
    }
  },
  nextOrderWithIndex: function (index, scenario_file, flag, insert, auto_next) {
    this.kag.cancelStrongStop();
    this.kag.cancelWeakStop();
    var that = this;
    flag = flag || !1;
    auto_next = auto_next || "yes";
    if (
      (scenario_file = scenario_file || this.kag.stat.current_scenario) !=
        this.kag.stat.current_scenario ||
      1 == flag
    ) {
      this.kag.weaklyStop();
      this.kag.loadScenario(scenario_file, function (tmp_array_tag) {
        var array_tag = $.extend(!0, [], tmp_array_tag);
        "object" == typeof insert && array_tag.splice(index + 1, 0, insert);
        that.kag.cancelWeakStop();
        that.kag.ftag.buildTagIndex(array_tag, index, auto_next);
      });
    } else {
      this.current_order_index = index;
      let nextorder_called = !1;
      if ("yes" == auto_next) {
        this.nextOrder();
        nextorder_called = !0;
      } else if ("snap" == auto_next) {
        this.kag.stat.is_strong_stop = this.kag.menu.snap.stat.is_strong_stop;
        if (1 == this.kag.stat.is_skip && 0 == this.kag.stat.is_strong_stop) {
          this.kag.ftag.nextOrder();
          nextorder_called = !0;
        }
      } else "stop" == auto_next && this.kag.ftag.startTag("s");
      nextorder_called ||
        this.kag.stat.is_strong_stop ||
        this.kag.layer.showEventLayer();
    }
  },
};
tyrano.plugin.kag.tag.text = {
  pm: { val: "", backlog: "add" },
  default_message_config: {
    ch_speed_in_click: "1",
    effect_speed_in_click: "100ms",
    edge_overlap_text: "true",
    speech_bracket_float: "false",
    speech_margin_left: "false",
    kerning: "false",
    line_spacing: "",
    letter_spacing: "",
    control_line_break: "false",
    control_line_break_chars: "、。）」』】,.)]",
  },
  getMessageConfig: function (key) {
    return (
      (this.kag.stat.message_config || {})[key] ||
      this.default_message_config[key]
    );
  },
  start: function (pm) {
    if (1 == this.kag.stat.is_script) {
      this.buildIScript(pm);
      return;
    }
    if (1 == this.kag.stat.is_html) {
      this.buildHTML(pm);
      return;
    }
    this.kag.trigger("tag-text-message", { target: pm });
    const j_outer_message = this.kag.getMessageOuterLayer(),
      j_inner_message = this.kag.getMessageInnerLayer();
    this.setMessageInnerStyle(j_inner_message);
    this.kag.stat.current_message_str = pm.val;
    const is_vertical = "true" == this.kag.stat.vertical;
    "false" != this.kag.config.defaultAutoReturn &&
      this.autoInsertPageBreak(j_inner_message, j_outer_message, is_vertical);
    this.showMessage(pm.val, is_vertical);
  },
  buildIScript: function (pm) {
    this.kag.stat.buff_script += pm.val + "\n";
    const array_tag = this.kag.ftag.array_tag;
    for (
      let i = this.kag.ftag.current_order_index + 1;
      i < array_tag.length;
      i++
    ) {
      const tag = array_tag[i];
      if ("text" !== tag.name) break;
      this.kag.stat.buff_script += tag.val + "\n";
      this.kag.ftag.current_order_index = i;
    }
    this.kag.ftag.nextOrder();
  },
  buildHTML: function (pm) {
    this.kag.stat.map_html.buff_html += pm.val;
    const array_tag = this.kag.ftag.array_tag;
    for (
      let i = this.kag.ftag.current_order_index + 1;
      i < array_tag.length;
      i++
    ) {
      const tag = array_tag[i];
      if ("text" !== tag.name) break;
      this.kag.stat.map_html.buff_html += tag.val;
      this.kag.ftag.current_order_index = i;
    }
    this.kag.ftag.nextOrder();
  },
  setMessageInnerStyle: function (j_inner_message) {
    const font_feature_settings =
      "true" === this.getMessageConfig("kerning") ? '"palt"' : "initial";
    j_inner_message.setStyleMap({
      "letter-spacing": this.kag.config.defaultPitch + "px",
      "line-height":
        parseInt(this.kag.config.defaultFontSize) +
        parseInt(this.kag.config.defaultLineSpacing) +
        "px",
      "font-family": this.kag.config.userFace,
      "font-feature-settings": font_feature_settings,
    });
  },
  autoInsertPageBreak: function (
    j_inner_message,
    j_outer_message,
    is_vertical
  ) {
    const target_property = is_vertical ? "width" : "height";
    var limit_width = 0.8 * parseInt(j_outer_message.css(target_property));
    parseInt(j_inner_message.find("p").css(target_property)) > limit_width &&
      (this.kag.stat.vchat.is_active
        ? this.kag.ftag.startTag("vchat_in", {})
        : this.kag.getMessageInnerLayer().html(""));
  },
  showMessage: function (message_str, is_vertical) {
    const chara_name = this.kag.chara.getCharaName();
    this.pushTextToBackLog(chara_name, message_str);
    this.kag.stat.play_speak && this.speechMessage(message_str);
    const j_msg_inner = this.kag.getMessageInnerLayer();
    if ("" == j_msg_inner.html()) {
      this.kag.setNewParagraph(j_msg_inner);
      this.kag.tmp.last_char_info = null;
    }
    this.kag.stat.vchat.is_active && j_msg_inner.show();
    this.kag.checkMessage(j_msg_inner);
    const j_span = this.kag.getMessageCurrentSpan(),
      tmp = this.kag.tmp;
    tmp.should_set_reverse_indent =
      chara_name &&
      !j_span.text() &&
      "false" !== this.getMessageConfig("speech_bracket_float");
    const font = this.kag.stat.font;
    (void 0 !== font.effect && "none" !== font.effect) || (font.effect = "");
    (void 0 !== font.gradient && "none" !== font.gradient) ||
      (font.gradient = "");
    tmp.is_text_stroke = font.edge && "stroke" === font.edge_method;
    tmp.is_edge_overlap = "true" === this.getMessageConfig("edge_overlap_text");
    tmp.is_individual_decoration =
      tmp.is_text_stroke ||
      (font.edge &&
        "shadow" === font.edge_method &&
        (!tmp.is_edge_overlap || font.gradient));
    this.setCurrentSpanStyle(j_span, chara_name);
    "true" == this.kag.config.autoRecordLabel && this.manageAlreadyRead(j_span);
    let should_use_inline_block = !0;
    ("" != font.effect && "fadeIn" != font.effect) ||
      (should_use_inline_block = !1);
    const message_html = this.buildMessageHTML(
        message_str,
        should_use_inline_block
      ),
      j_message_span = $(`<span>${message_html}</span>`);
    j_message_span.appendTo(j_span);
    this.kag.stat.fuki.active && this.adjustFukiSize(j_msg_inner, chara_name);
    this.addChars(j_message_span, j_msg_inner, is_vertical);
  },
  pushTextToBackLog: function (chara_name, message_str) {
    var should_join_log = "true" == this.kag.stat.log_join;
    if (
      ("" != chara_name && !should_join_log) ||
      ("" != chara_name && "true" == this.kag.stat.f_chara_ptext)
    ) {
      const log_str = `<b class="backlog_chara_name ${chara_name}">${chara_name}</b>：<span class="backlog_text ${chara_name}">${message_str}</span>`;
      this.kag.pushBackLog(log_str, "add");
      if ("true" == this.kag.stat.f_chara_ptext) {
        this.kag.stat.f_chara_ptext = "false";
        this.kag.stat.log_join = "true";
      }
    } else {
      const log_str = `<span class="backlog_text ${chara_name}">${message_str}</span>`,
        join_type = should_join_log ? "join" : "add";
      this.kag.pushBackLog(log_str, join_type);
    }
  },
  speechMessage: function (message_str) {
    const utterance = new SpeechSynthesisUtterance(message_str);
    this.kag.tmp.speak_on_volume &&
      (utterance.volume = this.kag.tmp.speak_on_volume);
    this.kag.tmp.speak_on_pitch &&
      (utterance.pitch = this.kag.tmp.speak_on_pitch);
    this.kag.tmp.speak_on_rate && (utterance.rate = this.kag.tmp.speak_on_rate);
    this.kag.tmp.speak_on_utterance &&
      this.kag.tmp.speak_on_cancel &&
      speechSynthesis.cancel(this.kag.tmp.speak_on_utterance);
    speechSynthesis.speak(utterance);
    this.kag.tmp.speak_on_utterance = utterance;
  },
  setCurrentSpanStyle: function (j_span, chara_name) {
    if (this.kag.stat.vchat.is_active)
      if ("" == chara_name) {
        $(".current_vchat").find(".vchat_chara_name").remove();
        $(".current_vchat")
          .find(".vchat-text-inner")
          .css("margin-top", "0.2em");
      } else {
        $(".current_vchat").find(".vchat_chara_name").html(chara_name);
        var vchat_name_color = $.convertColor(
            this.kag.stat.vchat.chara_name_color
          ),
          cpm = this.kag.stat.vchat.charas[chara_name];
        cpm &&
          "" != cpm.color &&
          (vchat_name_color = $.convertColor(cpm.color));
        $(".current_vchat")
          .find(".vchat_chara_name")
          .css("background-color", vchat_name_color);
        $(".current_vchat")
          .find(".vchat-text-inner")
          .css("margin-top", "1.5em");
      }
    else {
      const font = this.kag.stat.font;
      j_span.setStyleMap({
        color: font.color,
        "font-weight": font.bold,
        "font-size": font.size + "px",
        "font-family": font.face,
        "font-style": font.italic,
      });
      const letter_spacing =
          this.getMessageConfig("letter_spacing") ||
          this.kag.config.defaultPitch,
        line_spacing =
          this.getMessageConfig("line_spacing") ||
          this.kag.config.defaultLineSpacing,
        line_height = parseInt(font.size) + parseInt(line_spacing);
      j_span.setStyleMap({
        "letter-spacing": `${letter_spacing}px`,
        "line-height": `${line_height}px`,
      });
      if ("" != font.edge) {
        const edge_str = font.edge;
        switch (font.edge_method) {
          default:
          case "shadow":
            if (this.kag.tmp.is_individual_decoration) {
              const edges = $.parseEdgeOptions(edge_str);
              this.kag.tmp.text_shadow_values = [];
              for (let i = edges.length - 1; i >= 0; i--) {
                const edge = edges[i],
                  text_shadow_value = $.generateTextShadowStrokeCSSOne(
                    edge.color,
                    edge.total_width
                  );
                this.kag.tmp.text_shadow_values.push(text_shadow_value);
              }
              this.kag.tmp.inside_stroke_color = edges[0].color;
            } else
              j_span.setStyle(
                "text-shadow",
                $.generateTextShadowStrokeCSS(edge_str)
              );
            break;
          case "filter":
            j_span.setFilterCSS($.generateDropShadowStrokeCSS(edge_str));
            break;
          case "stroke":
        }
      } else
        "" != font.shadow &&
          j_span.setStyle("text-shadow", "2px 2px 2px " + font.shadow);
    }
  },
  manageAlreadyRead: function (j_span) {
    1 == this.kag.stat.already_read
      ? "default" != this.kag.config.alreadyReadTextColor &&
        j_span.setStyle(
          "color",
          $.convertColor(this.kag.config.alreadyReadTextColor)
        )
      : "false" == this.kag.config.unReadTextSkip && this.kag.setSkip(!1);
  },
  buildMessageHTML: function (message_str, should_use_inline_block = !0) {
    let message_html = "";
    const word_nobreak_list = this.kag.stat.word_nobreak_list || [],
      should_check_word_break = word_nobreak_list.length > 0;
    let is_escaping = !1;
    if (should_check_word_break) {
      const escape_char = this.getEscapeChar(message_str);
      word_nobreak_list.forEach((word) => {
        const reg = new RegExp(word, "g");
        message_str = message_str.replace(
          reg,
          escape_char + word + escape_char
        );
      });
    }
    for (let i = 0; i < message_str.length; i++) {
      let c = message_str.charAt(i);
      if (should_check_word_break && undefined === c)
        if (is_escaping) {
          is_escaping = !1;
          message_html += "</span>";
        } else {
          is_escaping = !0;
          message_html += '<span style="display: inline-block;">';
        }
      else {
        if ("" != this.kag.stat.ruby_str) {
          c = `<ruby><rb>${c}</rb><rt>${this.kag.stat.ruby_str}</rt></ruby>`;
          this.kag.stat.ruby_str = "";
        }
        if (" " == c)
          message_html += `<span class="char" style="opacity:0">${c}</span>`;
        else {
          if (1 == this.kag.stat.mark) {
            c = `<mark style="${this.kag.stat.style_mark}">${c}</mark>`;
          } else 2 == this.kag.stat.mark && (this.kag.stat.mark = 0);
          this.kag.tmp.is_individual_decoration
            ? this.kag.tmp.is_text_stroke
              ? (message_html += this.buildTextStrokeChar(
                  c,
                  this.kag.stat.font.edge
                ))
              : (message_html += this.buildTextShadowChar(
                  c,
                  this.kag.stat.font.edge
                ))
            : (message_html += should_use_inline_block
                ? `<span class="char" style="opacity:0;display:inline-block;">${c}</span>`
                : `<span class="char" style="opacity:0">${c}</span>`);
        }
      }
    }
    return message_html;
  },
  getEscapeChar: function (message_str) {
    for (let i = 34; i < 999; i++) {
      const c = String.fromCharCode(i);
      if (!message_str.includes(c)) return c;
    }
    return "∅";
  },
  buildTextShadowChar: function (c, edge_str, is_visible = !1) {
    let char_html = "";
    const is_edge_overlap = this.kag.tmp.is_edge_overlap;
    char_html += `<span class="char text-shadow ${
      is_visible ? "visible" : ""
    }" style="${is_edge_overlap ? "z-index: 10; opacity: 0; " : ""}">`;
    const opacity_style = is_edge_overlap ? "opacity: 1; " : "";
    this.kag.tmp.text_shadow_values.forEach((text_shadow_value, i, arr) => {
      const z_index = 11 + i,
        color_style =
          i + 1 < arr.length
            ? ""
            : `color: ${this.kag.tmp.inside_stroke_color}; `;
      char_html += `<span class="stroke entity" style="${color_style}${opacity_style}text-shadow: ${text_shadow_value}; z-index: ${z_index};">${c}</span>`;
    });
    char_html += `<span class="fill entity" style="${opacity_style}">${c}</span>`;
    char_html += `<span class="dummy" style="position:relative;display:inline;">${c}</span>`;
    return char_html + "</span>";
  },
  buildTextStrokeChar: function (c, edge_str, is_visible = !1) {
    let char_html = "";
    const edges = $.parseEdgeOptions(edge_str),
      is_edge_overlap = this.kag.tmp.is_edge_overlap,
      visible_class = is_visible ? "visible" : "";
    char_html += is_edge_overlap
      ? `<span class="char text-stroke ${visible_class}" style="z-index:10;opacity:0;">`
      : `<span class="char text-stroke ${visible_class}">`;
    char_html += `<span class="dummy" style="transform: scale(2);">${c}</span>`;
    for (let i = edges.length - 1; i >= 0; i--) {
      const edge = edges[i],
        width = 2 * edge.total_width;
      let style = `-webkit-text-stroke: ${width}px ${edge.color}; z-index: ${
        100 - i
      }; padding: ${width}px; margin: -${width}px 0 0 -${width}px;`;
      is_edge_overlap && (style += "opacity:1;");
      char_html += `<span class="stroke entity" style="${style}">${c}</span>`;
    }
    char_html += `<span class="fill entity" style="${
      is_edge_overlap ? "opacity:1;" : ""
    }">${c}</span>`;
    char_html += `<span class="dummy" style="position:relative;display:inline;">${c}</span>`;
    return char_html + "</span>";
  },
  adjustFukiSize: function (j_msg_inner, chara_jname) {
    this.kag.layer.showMessageLayers();
    this.kag.stat.is_hide_message = !1;
    this.kag.chara.getCharaNameArea().hide();
    if ("" == chara_jname) {
      this.adjustOthersFukiSize(j_msg_inner);
      return;
    }
    let chara_obj,
      chara_name = chara_jname;
    this.kag.stat.jcharas[chara_jname] &&
      (chara_name = this.kag.stat.jcharas[chara_jname]);
    try {
      chara_obj = $(".layer_fore").find("." + chara_name);
    } catch (e) {
      console.log(e);
      chara_obj = void 0;
    }
    void 0 !== chara_obj &&
    chara_obj.get(0) &&
    "true" === this.kag.stat.charas[chara_name].fuki.enable
      ? this.adjustCharaFukiSize(j_msg_inner, chara_name, chara_obj)
      : this.adjustOthersFukiSize(j_msg_inner);
  },
  adjustCharaFukiSize: function (j_msg_inner, chara_name, chara_obj) {
    const chara_fuki = this.kag.stat.charas[chara_name].fuki;
    if ("" != chara_fuki.fix_width) {
      j_msg_inner.css("max-width", "");
      j_msg_inner.css("width", parseInt(chara_fuki.fix_width));
    } else {
      j_msg_inner.css("width", "");
      j_msg_inner.css("max-width", parseInt(chara_fuki.max_width));
    }
    if ("true" == this.kag.stat.vertical) {
      let w = j_msg_inner.find(".vertical_text").css("width");
      j_msg_inner.css("width", w);
      j_msg_inner.css("height", "");
      j_msg_inner.css("max-height", parseInt(chara_fuki.max_width));
    } else if ("" == chara_fuki.fix_width) {
      j_msg_inner.css("width", "");
      j_msg_inner.css("height", "");
    }
    let width = j_msg_inner.css("width"),
      height = j_msg_inner.css("height");
    width =
      parseInt(width) +
      parseInt(j_msg_inner.css("padding-left")) +
      this.kag.stat.fuki.marginr +
      20;
    height =
      parseInt(height) +
      parseInt(j_msg_inner.css("padding-top")) +
      this.kag.stat.fuki.marginb +
      20;
    let j_outer_message = this.kag.getMessageOuterLayer();
    j_outer_message.css("width", width);
    j_outer_message.css("height", height);
    let chara_left = parseInt(chara_obj.css("left")),
      chara_top = parseInt(chara_obj.css("top")),
      fuki_left = chara_fuki.left,
      fuki_top = chara_fuki.top,
      chara_width =
        (chara_fuki.sippo_left,
        chara_fuki.sippo_top,
        parseInt(chara_obj.find("img").css("width"))),
      chara_height = parseInt(chara_obj.find("img").css("height"));
    fuki_left *= chara_width / this.kag.stat.charas[chara_name].origin_width;
    fuki_top *= chara_height / this.kag.stat.charas[chara_name].origin_height;
    let fuki_left2 = chara_left + fuki_left,
      fuki_top2 = chara_top + fuki_top,
      outer_width = parseInt(j_outer_message.css("width")),
      outer_height = parseInt(j_outer_message.css("height")),
      sippo = chara_fuki.sippo;
    "bottom" == sippo
      ? (fuki_top2 -= outer_height)
      : "left" == sippo
      ? (fuki_left2 += parseInt(chara_fuki.sippo_left))
      : "right" == sippo && (fuki_left2 -= outer_width);
    let fuki_right = fuki_left2 + outer_width,
      fuki_bottom = fuki_top2 + outer_height,
      sc_width = parseInt(this.kag.config.scWidth),
      sc_height = parseInt(this.kag.config.scHeight),
      sippo_left = 0;
    if (fuki_right >= sc_width) {
      fuki_left2 = fuki_left2 - (fuki_right - sc_width) - 10;
      sippo_left = fuki_right - sc_width + 10;
    }
    fuki_bottom >= sc_height &&
      (fuki_top2 = fuki_top2 - (fuki_bottom - sc_height) - 10);
    if (fuki_left2 <= 0) {
      sippo_left = fuki_left2 - 10;
      fuki_left2 = 10;
    }
    fuki_top2 <= 0 && (fuki_top2 = 10);
    j_outer_message.css("left", fuki_left2);
    j_outer_message.css("top", fuki_top2);
    j_msg_inner.css({
      left: parseInt(j_outer_message.css("left")) + 10,
      top: parseInt(j_outer_message.css("top")) + 10,
    });
    this.setFukiStyle(j_outer_message, chara_fuki);
    this.kag.updateFuki(chara_name, { sippo_left: sippo_left });
  },
  adjustOthersFukiSize: function (j_msg_inner) {
    let others_style = this.kag.stat.fuki.others_style,
      def_style = this.kag.stat.fuki.def_style,
      nwidth = others_style.max_width || def_style.width,
      nleft = others_style.left || def_style.left,
      ntop = others_style.top || def_style.top;
    if ("" != others_style.fix_width) {
      j_msg_inner.css("max-width", "");
      j_msg_inner.css("width", parseInt(others_style.fix_width));
    } else {
      j_msg_inner.css("width", "");
      j_msg_inner.css("max-width", parseInt(nwidth));
    }
    let width = j_msg_inner.css("width"),
      height = j_msg_inner.css("height");
    width =
      parseInt(width) +
      parseInt(j_msg_inner.css("padding-left")) +
      this.kag.stat.fuki.marginr +
      20;
    height =
      parseInt(height) +
      parseInt(j_msg_inner.css("padding-top")) +
      this.kag.stat.fuki.marginb +
      20;
    let j_outer_message = this.kag.getMessageOuterLayer();
    j_outer_message.css("width", width);
    j_outer_message.css("height", height);
    j_outer_message.css("left", parseInt(nleft));
    j_outer_message.css("top", parseInt(ntop));
    j_msg_inner.css({
      left: parseInt(j_outer_message.css("left")) + 10,
      top: parseInt(j_outer_message.css("top")) + 10,
    });
    this.setFukiStyle(j_outer_message, this.kag.stat.fuki.others_style);
    this.kag.updateFuki("others", { sippo: "none" });
  },
  makeOneCharVisible: function (j_char_span) {
    this.kag.tmp.is_individual_decoration &&
      !this.kag.tmp.is_edge_overlap &&
      (j_char_span = j_char_span.find(".entity"));
    if ("" != this.kag.stat.font.effect) {
      const anim_name = "t" + this.kag.stat.font.effect;
      let anim_duration = this.kag.tmp.effect_speed;
      anim_duration.includes("s") || (anim_duration += "ms");
      j_char_span.on("animationend", function (e) {
        j_char_span.removeClass("animchar");
        j_char_span.setStyleMap({
          opacity: 1,
          visibility: "visible",
          animation: "",
        });
      });
      j_char_span.addClass("animchar");
      j_char_span.setStyle(
        "animation",
        `${anim_name} ${anim_duration} ease 0s 1 normal forwards`
      );
    } else j_char_span.setStyleMap({ visibility: "visible", opacity: "1" });
  },
  makeAllCharsVisible: function (j_char_span_children) {
    this.kag.tmp.is_individual_decoration &&
      (j_char_span_children = j_char_span_children.find(".entity"));
    j_char_span_children.setStyleMap({
      animation: "",
      visibility: "visible",
      opacity: "1",
    });
  },
  addOneChar: function (
    char_index,
    j_char_span_children,
    j_message_span,
    j_msg_inner
  ) {
    this.kag.stat.is_adding_text = !0;
    this.checkClickInterrupt(j_msg_inner);
    this.makeOneCharVisible(j_char_span_children.eq(char_index));
    const next_char_index = char_index + 1;
    next_char_index < j_char_span_children.length
      ? $.setTimeout(() => {
          this.addOneChar(
            next_char_index,
            j_char_span_children,
            j_message_span,
            j_msg_inner
          );
        }, this.kag.tmp.ch_speed)
      : $.setTimeout(() => {
          this.finishAddingChars();
        }, this.kag.tmp.ch_speed);
  },
  checkClickInterrupt: function (j_msg_inner) {
    const is_skip = this.kag.stat.is_skip;
    if (
      (this.kag.stat.is_click_text || is_skip) &&
      !this.kag.tmp.processed_click_interrupt
    ) {
      this.kag.tmp.processed_click_interrupt = !0;
      const ch_speed_in_click = is_skip
        ? "0"
        : this.getMessageConfig("ch_speed_in_click");
      "default" !== ch_speed_in_click &&
        (this.kag.tmp.ch_speed = parseInt(ch_speed_in_click));
      let effect_speed_in_click = is_skip
        ? "0ms"
        : this.getMessageConfig("effect_speed_in_click");
      if ("default" !== effect_speed_in_click || is_skip) {
        this.kag.tmp.effect_speed = effect_speed_in_click;
        effect_speed_in_click.includes("s") || (effect_speed_in_click += "ms");
        j_msg_inner
          .find(".animchar")
          .setStyleMap({ "animation-duration": effect_speed_in_click });
      }
    }
  },
  finishAddingChars: function () {
    this.kag.stat.is_adding_text = !1;
    this.kag.stat.is_hide_message
      ? this.kag.once(
          "messagewindow-show",
          () => {
            this.kag.ftag.nextOrder();
          },
          { temp: !0, system: !0 }
        )
      : this.kag.ftag.nextOrder();
  },
  addChars: function (j_message_span, j_msg_inner, is_vertical) {
    let ch_speed = 30;
    "" !== this.kag.stat.ch_speed
      ? (ch_speed = parseInt(this.kag.stat.ch_speed))
      : this.kag.config.chSpeed &&
        (ch_speed = parseInt(this.kag.config.chSpeed));
    const j_char_span_children = j_message_span.find(".char"),
      font = this.kag.stat.font;
    if (font.gradient && "none" !== font.gradient) {
      (this.kag.tmp.is_individual_decoration
        ? j_char_span_children.find(".fill")
        : j_char_span_children
      ).setGradientText(font.gradient);
    }
    this.kag.tmp.should_set_reverse_indent &&
      this.setReverseIndent(j_msg_inner, j_char_span_children);
    "true" === this.getMessageConfig("control_line_break") &&
      this.controlLineBreak(j_char_span_children, is_vertical);
    if (
      !0 === this.kag.stat.is_skip ||
      this.kag.stat.is_nowait ||
      ch_speed <= 3
    ) {
      this.makeAllCharsVisible(j_char_span_children);
      $.setTimeout(() => {
        this.kag.stat.is_hide_message || this.kag.ftag.nextOrder();
      }, parseInt(this.kag.config.skipSpeed));
    } else {
      this.kag.stat.is_adding_text = !0;
      this.kag.tmp.processed_click_interrupt = !1;
      this.kag.tmp.ch_speed = ch_speed;
      this.kag.tmp.effect_speed = this.kag.stat.font.effect_speed;
      this.kag.waitClick("text");
      this.addOneChar(0, j_char_span_children, j_message_span, j_msg_inner);
    }
  },
  setReverseIndent: function (j_msg_inner, j_children) {
    const j_first_char = j_children.eq(0),
      indent_config = this.getMessageConfig("speech_bracket_float"),
      margin_config = this.getMessageConfig("speech_margin_left");
    let first_char_width = 0;
    if ("true" === indent_config || "true" === margin_config) {
      const j_width_check = j_first_char.clone();
      j_width_check.setStyleMap({
        opacity: "0",
        position: "fixed",
        display: "inline-block",
        "z-index": "1",
        top: "-9999px",
        left: "-9999px",
      });
      j_width_check.insertBefore(j_first_char);
      first_char_width = j_width_check.width();
      j_width_check.remove();
    }
    let indent = 0,
      px_indent = "px";
    switch (indent_config) {
      case "true":
        indent = first_char_width;
        break;
      default:
        indent = indent_config;
        indent_config.match(/em|%|px|vw|vh/) && (px_indent = "");
    }
    j_first_char.setStyleMap({
      position: "absolute",
      left: `-${indent}${px_indent}`,
    });
    let margin = 0,
      px_margin = "px";
    switch (margin_config) {
      case "false":
        break;
      case "true":
        margin = first_char_width;
        break;
      default:
        margin = margin_config;
        margin_config.match(/em|%|px|vw|vh/) && (px_margin = "");
    }
    0 !== margin &&
      j_msg_inner.find("p").setStyleMap({
        "box-sizing": "border-box",
        "padding-left": `${margin}${px_margin}`,
      });
  },
  controlLineBreak: function (j_char_children, is_vertical) {
    const prev = this.kag.tmp.last_char_info || {
        left: is_vertical ? 1 / 0 : -1 / 0,
        top: -1 / 0,
        j_char: null,
      },
      first_char_top = j_char_children.first().offset().top,
      last_j_char = j_char_children.last(),
      last_char_offset = last_j_char.offset();
    this.kag.tmp.last_char_info = {
      left: last_char_offset.left,
      top: last_char_offset.top,
      j_char: last_j_char,
    };
    if (first_char_top === last_char_offset.top && !prev.j_char) return;
    const bad_chars = this.getMessageConfig("control_line_break_chars");
    for (let i = 0, len = j_char_children.length; i < len; i++) {
      const j_this = j_char_children.eq(i),
        offset = j_this.offset(),
        char = j_this.text().charAt(0);
      if (is_vertical ? offset.left < prev.left : offset.top > prev.top) {
        bad_chars.includes(char) && prev.j_char.before("<br>");
        if (offset.top === last_char_offset.top) break;
      }
      prev.top = offset.top;
      prev.left = offset.left;
      prev.j_char = j_this;
    }
  },
  setFukiStyle: function (j_outer_message, chara_fuki) {
    void 0 !== chara_fuki.color &&
      j_outer_message.css("background-color", $.convertColor(chara_fuki.color));
    void 0 !== chara_fuki.opacity &&
      j_outer_message.css("opacity", $.convertOpacity(chara_fuki.opacity));
    if (void 0 !== chara_fuki.border_size) {
      j_outer_message.css("border-width", parseInt(chara_fuki.border_size));
      j_outer_message.css("border-style", "solid");
    }
    void 0 !== chara_fuki.border_color &&
      j_outer_message.css(
        "border-color",
        $.convertColor(chara_fuki.border_color)
      );
    void 0 !== chara_fuki.radius &&
      j_outer_message.css("border-radius", parseInt(chara_fuki.radius));
    void 0 !== chara_fuki.font_color &&
      j_outer_message
        .parent()
        .find(".message_inner")
        .find(".current_span")
        .css("color", $.convertColor(chara_fuki.font_color));
    void 0 !== chara_fuki.font_size &&
      j_outer_message
        .parent()
        .find(".message_inner")
        .find(".current_span")
        .css("font-size", parseInt(chara_fuki.font_size));
  },
};
tyrano.plugin.kag.tag.label = {
  pm: { nextorder: "true" },
  start: function (pm) {
    if ("true" == this.kag.config.autoRecordLabel) {
      var sf_tmp =
          "trail_" +
          this.kag.stat.current_scenario
            .replace(".ks", "")
            .replace(/\u002f/g, "")
            .replace(/:/g, "")
            .replace(/\./g, ""),
        sf_buff = this.kag.stat.buff_label_name,
        sf_label = sf_tmp + "_" + pm.label_name;
      if ("" != this.kag.stat.buff_label_name) {
        this.kag.variable.sf.record || (this.kag.variable.sf.record = {});
        var sf_str = "sf.record." + sf_buff,
          scr_str = sf_str + " = " + sf_str + "  || 0;" + sf_str + "++;";
        this.kag.evalScript(scr_str);
      }
      this.kag.variable.sf.record &&
        (this.kag.variable.sf.record[sf_label]
          ? (this.kag.stat.already_read = !0)
          : (this.kag.stat.already_read = !1));
      this.kag.stat.buff_label_name = sf_label;
    }
    "true" == pm.nextorder && this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.config_record_label = {
  pm: { color: "", skip: "" },
  start: function (pm) {
    if ("" != pm.color) {
      this.kag.config.alreadyReadTextColor = pm.color;
      this.kag.ftag.startTag("eval", {
        exp: "sf._system_config_already_read_text_color = " + pm.color,
      });
    }
    if ("" != pm.skip) {
      "true" == pm.skip
        ? (this.kag.config.unReadTextSkip = "true")
        : (this.kag.config.unReadTextSkip = "false");
      this.kag.ftag.startTag("eval", {
        exp: "sf._system_config_unread_text_skip = '" + pm.skip + "'",
      });
    }
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.l = {
  start: function () {
    var that = this;
    this.kag.stat.is_click_text = !1;
    this.kag.ftag.showNextImg();
    if (1 == this.kag.stat.is_skip) this.kag.ftag.nextOrder();
    else if (1 == this.kag.stat.is_auto) {
      this.kag.stat.is_wait_auto = !0;
      var auto_speed = that.kag.config.autoSpeed;
      if ("0" != that.kag.config.autoSpeedWithText) {
        var cnt_text = this.kag.stat.current_message_str.length;
        auto_speed =
          parseInt(auto_speed) +
          parseInt(that.kag.config.autoSpeedWithText) * cnt_text;
      }
      setTimeout(function () {
        1 == that.kag.stat.is_wait_auto &&
          (1 == that.kag.tmp.is_vo_play
            ? (that.kag.tmp.is_vo_play_wait = !0)
            : that.kag.ftag.nextOrder());
      }, auto_speed);
    }
    this.kag.stat.is_skip || this.kag.waitClick("l");
  },
};
tyrano.plugin.kag.tag.p = {
  start: function () {
    var that = this;
    this.kag.stat.flag_ref_page = !0;
    this.kag.stat.is_click_text = !1;
    this.kag.ftag.showNextImg();
    if (1 == this.kag.stat.is_skip) this.kag.ftag.nextOrder();
    else if (1 == this.kag.stat.is_auto) {
      this.kag.stat.is_wait_auto = !0;
      var auto_speed = that.kag.config.autoSpeed;
      if ("0" != that.kag.config.autoSpeedWithText) {
        var cnt_text = this.kag.stat.current_message_str.length;
        auto_speed =
          parseInt(auto_speed) +
          parseInt(that.kag.config.autoSpeedWithText) * cnt_text;
      }
      setTimeout(function () {
        1 == that.kag.stat.is_wait_auto &&
          (1 == that.kag.tmp.is_vo_play
            ? (that.kag.tmp.is_vo_play_wait = !0)
            : that.kag.ftag.nextOrder());
      }, auto_speed);
    }
    this.kag.stat.is_skip || this.kag.waitClick("p");
  },
};
tyrano.plugin.kag.tag.graph = {
  vital: ["storage"],
  pm: { storage: null },
  start: function (pm) {
    var jtext = this.kag.getMessageInnerLayer(),
      current_str = "";
    0 != jtext.find("p").find(".current_span").length &&
      (current_str = jtext.find("p").find(".current_span").html());
    var storage_url = "";
    storage_url = $.isHTTP(pm.storage)
      ? pm.storage
      : "./data/image/" + pm.storage;
    this.kag.appendMessage(
      jtext,
      current_str + "<img src='" + storage_url + "' >"
    );
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.jump = {
  pm: { storage: null, target: null, countpage: !0 },
  start: function (pm) {
    if (this.kag.stat.hold_glink && !pm.storage && !pm.target) {
      pm.storage = this.kag.stat.hold_glink_storage;
      pm.target = this.kag.stat.hold_glink_target;
      this.kag.stat.hold_glink = !1;
      this.kag.stat.hold_glink_storage = "";
      this.kag.stat.hold_glink_target = "";
    }
    var that = this;
    setTimeout(function () {
      that.kag.ftag.nextOrderWithLabel(pm.target, pm.storage);
    }, 1);
  },
};
tyrano.plugin.kag.tag.r = {
  log_join: "true",
  start: function () {
    this.kag
      .getMessageInnerLayer()
      .find("p")
      .find(".current_span")
      .append("<br>");
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.er = {
  start: function () {
    this.kag.ftag.hideNextImg();
    this.kag.getMessageInnerLayer().html("");
    this.kag.ftag.startTag("resetfont");
  },
};
tyrano.plugin.kag.tag.cm = {
  pm: { next: "true" },
  start: function (pm) {
    this.kag.ftag.hideNextImg();
    this.kag.stat.vchat.is_active
      ? this.kag.ftag.startTag("vchat_in", {})
      : this.kag.layer.clearMessageInnerLayerAll();
    this.kag.stat.log_clear = !0;
    this.kag.layer.getFreeLayer().html("").hide();
    this.kag.ftag.startTag("resetfont", pm);
  },
};
tyrano.plugin.kag.tag.ct = {
  start: function () {
    this.kag.ftag.hideNextImg();
    this.kag.layer.clearMessageInnerLayerAll();
    this.kag.layer.getFreeLayer().html("").hide();
    this.kag.stat.current_layer = "message0";
    this.kag.stat.current_page = "fore";
    this.kag.ftag.startTag("resetfont");
  },
};
tyrano.plugin.kag.tag.current = {
  pm: { layer: "", page: "fore" },
  start: function (pm) {
    "" == pm.layer && (pm.layer = this.kag.stat.current_layer);
    this.kag.stat.current_layer = pm.layer;
    this.kag.stat.current_page = pm.page;
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.position = {
  pm: {
    layer: "message0",
    page: "fore",
    left: "",
    top: "",
    width: "",
    height: "",
    color: "",
    opacity: "",
    vertical: "",
    frame: "",
    radius: "",
    border_color: "",
    border_size: "",
    marginl: "",
    margint: "",
    marginr: "",
    marginb: "",
    margin: "",
    gradient: "",
    visible: "",
    next: "true",
  },
  start: function (pm) {
    const j_message_layer = this.kag.layer.getLayer(pm.layer, pm.page),
      j_message_outer = j_message_layer.find(".message_outer"),
      j_message_inner = j_message_layer.find(".message_inner");
    "" !== pm.visible &&
      ("true" === pm.visible
        ? this.kag.layer.showLayer(j_message_layer)
        : this.kag.layer.hideLayer(j_message_layer));
    const new_style_outer = {};
    "" !== pm.left && (new_style_outer.left = pm.left + "px");
    "" !== pm.top && (new_style_outer.top = pm.top + "px");
    "" !== pm.width && (new_style_outer.width = pm.width + "px");
    "" !== pm.height && (new_style_outer.height = pm.height + "px");
    "" !== pm.radius &&
      (new_style_outer["border-radius"] = parseInt(pm.radius) + "px");
    if ("" !== pm.border_size) {
      new_style_outer["border-width"] = parseInt(pm.border_size) + "px";
      j_message_outer.css("border-style", "solid");
    }
    "" !== pm.border_color &&
      (new_style_outer["border-color"] = $.convertColor(pm.border_color));
    "" !== pm.opacity &&
      (new_style_outer.opacity = $.convertOpacity(pm.opacity));
    if ("" !== pm.color) {
      new_style_outer["background-color"] = $.convertColor(pm.color);
      j_message_outer.css("background-image", "");
    }
    "" !== pm.gradient && (new_style_outer["background-image"] = pm.gradient);
    if ("none" == pm.frame) {
      j_message_outer.css("background-image", "");
      j_message_outer.css(
        "background-color",
        $.convertColor(this.kag.config.frameColor)
      );
    } else if ("" !== pm.frame) {
      let storage_url = "";
      storage_url = $.isHTTP(pm.frame) ? pm.frame : "./data/image/" + pm.frame;
      j_message_outer.css("background-image", "url(" + storage_url + ")");
      j_message_outer.css("background-repeat", "no-repeat");
      j_message_outer.css("background-color", "");
    }
    this.kag.setStyles(j_message_outer, new_style_outer);
    this.kag.stat.fuki.def_style = $.extend(
      !0,
      this.kag.stat.fuki.def_style,
      new_style_outer
    );
    const j_filter = j_message_layer.find(".message_filter");
    j_filter.length > 0 &&
      [
        "left",
        "top",
        "width",
        "height",
        "border-radius",
        "border-style",
        "border-width",
      ].forEach((key) => {
        j_filter.css(key, j_message_outer.css(key));
      });
    this.kag.layer.refMessageLayer(pm.layer);
    if ("" != pm.vertical)
      if ("true" == pm.vertical) {
        this.kag.stat.vertical = "true";
        j_message_inner.find("p").addClass("vertical_text");
      } else {
        this.kag.stat.vertical = "false";
        j_message_inner.find("p").removeClass("vertical_text");
      }
    const new_style_inner = { "box-sizing": "border-box" };
    if ("" !== pm.margin) {
      const hash = pm.margin.split(",");
      switch (hash.length) {
        default:
        case 1:
          pm.margint = pm.marginr = pm.marginb = pm.marginl = pm.margin;
          break;
        case 2:
          pm.margint = pm.marginb = hash[0];
          pm.marginl = pm.marginr = hash[1];
          break;
        case 3:
          pm.margint = hash[0];
          pm.marginl = pm.marginr = hash[1];
          pm.marginb = hash[2];
          break;
        case 4:
          pm.margint = hash[0];
          pm.marginr = hash[1];
          pm.marginb = hash[2];
          pm.marginl = hash[3];
      }
    }
    "" !== pm.marginl &&
      (new_style_inner["padding-left"] = parseInt(pm.marginl) + "px");
    "" !== pm.margint &&
      (new_style_inner["padding-top"] = parseInt(pm.margint) + "px");
    if ("" !== pm.marginr) {
      new_style_inner["padding-right"] = parseInt(pm.marginr) + "px";
      this.kag.stat.fuki.marginr = parseInt(pm.marginr);
    }
    if ("" !== pm.marginb) {
      new_style_inner["padding-bottom"] = parseInt(pm.marginb) + "px";
      this.kag.stat.fuki.marginb = parseInt(pm.marginb);
    }
    this.kag.setStyles(j_message_inner, new_style_inner);
    this.kag.stat.fuki.def_style_inner = $.extend(
      !0,
      this.kag.stat.fuki.def_style_inner,
      new_style_inner
    );
    "true" == pm.next && this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.fuki_start = {
  pm: { layer: "message0", page: "fore" },
  start: function (pm) {
    this.kag.stat.fuki.active = !0;
    this.kag.layer
      .getLayer(pm.layer, pm.page)
      .find(".message_outer")
      .addClass("fuki_box");
    var j_msg_inner = this.kag.layer
      .getLayer(pm.layer, pm.page)
      .find(".message_inner");
    j_msg_inner.css("width", "");
    j_msg_inner.css("height", "");
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.fuki_stop = {
  pm: {},
  start: function (pm) {
    this.kag.stat.fuki.active = !1;
    var j_outer_layer = this.kag.getMessageOuterLayer();
    j_outer_layer.removeClass("fuki_box");
    let def_style = this.kag.stat.fuki.def_style;
    this.kag.setStyles(j_outer_layer, def_style);
    var j_inner_layer = this.kag.getMessageInnerLayer();
    j_inner_layer.css("max-width", "");
    let def_style_inner = this.kag.stat.fuki.def_style_inner;
    j_inner_layer
      .css("left", parseInt(j_outer_layer.css("left")) + 10)
      .css("top", parseInt(j_outer_layer.css("top")) + 10);
    this.kag.setStyles(j_inner_layer, def_style_inner);
    $(".tyrano_base").find(".chara_name_area").show();
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.fuki_chara = {
  vital: ["name"],
  pm: {
    name: "",
    sippo: "top",
    sippo_left: "40",
    sippo_top: "40",
    sippo_width: "12",
    sippo_height: "20",
    enable: "true",
    max_width: "300",
    fix_width: "",
    font_color: "",
    font_size: "",
    color: "",
    opacity: "",
    border_size: "",
    border_color: "",
    radius: "",
  },
  start: function (pm) {
    "" == pm.color && delete pm.color;
    "" == pm.opacity && delete pm.opacity;
    "" == pm.border_size && delete pm.border_size;
    "" == pm.border_color && delete pm.border_color;
    "" == pm.radius && delete pm.radius;
    "" == pm.font_size && delete pm.font_size;
    "" == pm.font_color && delete pm.font_color;
    if ("others" == pm.name)
      this.kag.stat.fuki.others_style = $.extend(
        this.kag.stat.fuki.others_style,
        pm
      );
    else {
      var cpm = this.kag.stat.charas[pm.name];
      if (null == cpm) {
        this.kag.error("undefined_character");
        return;
      }
      let _cpm = cpm.fuki;
      this.kag.stat.charas[pm.name].fuki = $.extend(_cpm, pm);
    }
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.image = {
  pm: {
    layer: "base",
    page: "fore",
    visible: "",
    top: "",
    left: "",
    x: "",
    y: "",
    width: "",
    height: "",
    pos: "",
    name: "",
    folder: "",
    time: "",
    wait: "true",
    depth: "front",
    reflect: "",
    zindex: "1",
  },
  start: function (pm) {
    var strage_url = "",
      folder = "",
      that = this;
    if ("base" != pm.layer) {
      var layer_new_style = {};
      "true" == pm.visible &&
        "fore" == pm.page &&
        (layer_new_style.display = "block");
      this.kag.setStyles(
        this.kag.layer.getLayer(pm.layer, pm.page),
        layer_new_style
      );
      if ("" != pm.pos)
        switch (pm.pos) {
          case "left":
          case "l":
            pm.left = this.kag.config["scPositionX.left"];
            break;
          case "left_center":
          case "lc":
            pm.left = this.kag.config["scPositionX.left_center"];
            break;
          case "center":
          case "c":
            pm.left = this.kag.config["scPositionX.center"];
            break;
          case "right_center":
          case "rc":
            pm.left = this.kag.config["scPositionX.right_center"];
            break;
          case "right":
          case "r":
            pm.left = this.kag.config["scPositionX.right"];
        }
      folder = "" != pm.folder ? pm.folder : "fgimage";
      strage_url = $.isHTTP(pm.storage)
        ? pm.storage
        : "./data/" + folder + "/" + pm.storage;
      var img_obj = $("<img />");
      ("svg" != $.getExt(pm.storage) && "SVG" != $.getExt(pm.storage)) ||
        (img_obj = $("<object type='image/svg+xml' />")).attr(
          "data",
          strage_url
        );
      img_obj.attr("src", strage_url);
      img_obj.css("position", "absolute");
      img_obj.css("top", pm.top + "px");
      img_obj.css("left", pm.left + "px");
      "" != pm.width && img_obj.css("width", pm.width + "px");
      "" != pm.height && img_obj.css("height", pm.height + "px");
      "" != pm.x && img_obj.css("left", pm.x + "px");
      "" != pm.y && img_obj.css("top", pm.y + "px");
      "" != pm.zindex && img_obj.css("z-index", pm.zindex);
      "" != pm.reflect && "true" == pm.reflect && img_obj.addClass("reflect");
      $.setName(img_obj, pm.name);
      (0 != pm.time && "0" != pm.time) || (pm.time = "");
      if ("" != pm.time) {
        img_obj.css("opacity", 0);
        "back" == pm.depth
          ? this.kag.layer.getLayer(pm.layer, pm.page).prepend(img_obj)
          : this.kag.layer.getLayer(pm.layer, pm.page).append(img_obj);
        img_obj
          .stop(!0, !0)
          .animate({ opacity: 1 }, parseInt(pm.time), function () {
            "true" == pm.wait && that.kag.ftag.nextOrder();
          });
        "true" != pm.wait && that.kag.ftag.nextOrder();
      } else {
        "back" == pm.depth
          ? this.kag.layer.getLayer(pm.layer, pm.page).prepend(img_obj)
          : this.kag.layer.getLayer(pm.layer, pm.page).append(img_obj);
        this.kag.ftag.nextOrder();
      }
    } else {
      folder = "" != pm.folder ? pm.folder : "bgimage";
      var new_style = {
        "background-image":
          "url(" +
          (strage_url = $.isHTTP(pm.storage)
            ? pm.storage
            : "./data/" + folder + "/" + pm.storage) +
          ")",
        display: "none",
      };
      "fore" === pm.page && (new_style.display = "block");
      this.kag.setStyles(this.kag.layer.getLayer(pm.layer, pm.page), new_style);
      this.kag.ftag.nextOrder();
    }
  },
};
tyrano.plugin.kag.tag.freeimage = {
  vital: ["layer"],
  pm: { layer: "", page: "fore", time: "", wait: "true" },
  start: function (pm) {
    var that = this;
    if ("base" != pm.layer) {
      0 == pm.time && (pm.time = "");
      if ("" != pm.time) {
        var j_obj = this.kag.layer.getLayer(pm.layer, pm.page).children();
        if (!j_obj.get(0) && "true" == pm.wait) {
          that.kag.ftag.nextOrder();
          return;
        }
        var cnt = 0,
          s_cnt = j_obj.length;
        j_obj
          .stop(!0, !0)
          .animate({ opacity: 0 }, parseInt(pm.time), function () {
            that.kag.layer.getLayer(pm.layer, pm.page).empty();
            cnt++;
            s_cnt == cnt && "true" == pm.wait && that.kag.ftag.nextOrder();
          });
      } else {
        that.kag.layer.getLayer(pm.layer, pm.page).empty();
        that.kag.ftag.nextOrder();
      }
    } else {
      this.kag.layer.getLayer(pm.layer, pm.page).css("background-image", "");
      this.kag.ftag.nextOrder();
    }
    "false" == pm.wait && this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.freelayer = tyrano.plugin.kag.tag.freeimage;
tyrano.plugin.kag.tag.free = {
  vital: ["layer", "name"],
  pm: { layer: "", page: "fore", name: "", wait: "true", time: "" },
  start: function (pm) {
    var that = this;
    if ("base" != pm.layer) {
      0 == pm.time && (pm.time = "");
      if ("" != pm.time) {
        var j_obj = this.kag.layer.getLayer(pm.layer, pm.page);
        if (!(j_obj = j_obj.find("." + pm.name)).get(0) && "true" == pm.wait) {
          that.kag.ftag.nextOrder();
          return;
        }
        var cnt = 0,
          s_cnt = j_obj.length;
        j_obj
          .stop(!0, !0)
          .animate({ opacity: 0 }, parseInt(pm.time), function () {
            j_obj.remove();
            ++cnt == s_cnt && "true" == pm.wait && that.kag.ftag.nextOrder();
          });
        "false" == pm.wait && that.kag.ftag.nextOrder();
      } else {
        let j_obj = this.kag.layer.getLayer(pm.layer, pm.page);
        j_obj = j_obj.find("." + pm.name);
        j_obj.remove();
        that.kag.ftag.nextOrder();
      }
    } else {
      let j_obj = this.kag.layer.getLayer(pm.layer, pm.page);
      j_obj = j_obj.find("." + pm.name);
      j_obj.remove();
      this.kag.ftag.nextOrder();
    }
  },
};
tyrano.plugin.kag.tag.ptext = {
  vital: ["layer", "x", "y"],
  pm: {
    layer: "0",
    page: "fore",
    x: 0,
    y: 0,
    vertical: "false",
    text: "",
    size: "",
    face: "",
    color: "",
    italic: "",
    bold: "",
    align: "left",
    edge: "",
    shadow: "",
    name: "",
    time: "",
    width: "",
    zindex: "9999",
    overwrite: "false",
  },
  start: function (pm) {
    var that = this;
    if (
      "true" == pm.overwrite &&
      "" != pm.name &&
      $("." + pm.name).length > 0
    ) {
      $("." + pm.name).updatePText(pm.text);
      0 != pm.x && $("." + pm.name).css("left", parseInt(pm.x));
      0 != pm.y && $("." + pm.name).css("top", parseInt(pm.y));
      "" != pm.color && $("." + pm.name).css("color", $.convertColor(pm.color));
      "" != pm.size && $("." + pm.name).css("font-size", parseInt(pm.size));
      this.kag.ftag.nextOrder();
      return !1;
    }
    const font = this.kag.stat.font;
    "" == pm.face && (pm.face = font.face);
    "" == pm.color
      ? (pm.color = $.convertColor(font.color))
      : (pm.color = $.convertColor(pm.color));
    "true" === pm.bold && (pm.bold = "bold");
    const font_new_style = {
        color: pm.color,
        "font-weight": pm.bold,
        "font-style": pm.fontstyle,
        "font-size": pm.size + "px",
        "font-family": pm.face,
        "z-index": "999",
        text: "",
      },
      tobj = $("<p></p>");
    tobj.css({
      position: "absolute",
      top: pm.y + "px",
      left: pm.x + "px",
      width: pm.width,
      "text-align": pm.align,
    });
    this.kag.setStyles(tobj, font_new_style);
    const is_edge_enabled = "" !== pm.edge;
    pm.edge_method = pm.edge_method || font.edge_method || "shadow";
    let is_individual_decoration =
      is_edge_enabled && "stroke" === pm.edge_method;
    is_edge_enabled &&
      "shadow" === pm.edge_method &&
      pm.gradient &&
      (is_individual_decoration = !0);
    if (is_edge_enabled)
      switch (pm.edge_method) {
        case "shadow":
          is_individual_decoration ||
            tobj.css("text-shadow", $.generateTextShadowStrokeCSS(pm.edge));
          break;
        case "filter":
          tobj.setFilterCSS($.generateDropShadowStrokeCSS(pm.edge));
      }
    else
      "" != pm.shadow &&
        tobj.css("text-shadow", "2px 2px 2px " + $.convertColor(pm.shadow));
    "true" == pm.vertical && tobj.addClass("vertical_text");
    "fix" == pm.layer && tobj.addClass("fixlayer");
    $.setName(tobj, pm.name);
    if (is_individual_decoration) {
      tobj.addClass("multiple-text");
      this.kag.event.addEventElement({ tag: "ptext", j_target: tobj, pm: pm });
      this.setEvent(tobj, pm);
    }
    tobj.updatePText(pm.text);
    "none" === pm.gradient && (pm.gradient = "");
    pm.gradient &&
      !is_individual_decoration &&
      tobj.setGradientText(pm.gradient);
    const target_layer = this.kag.layer.getLayer(pm.layer, pm.page);
    if ("" != pm.time) {
      tobj.css("opacity", 0);
      target_layer.append(tobj);
      tobj.stop(!0, !0).animate({ opacity: 1 }, parseInt(pm.time), function () {
        that.kag.ftag.nextOrder();
      });
    } else {
      target_layer.append(tobj);
      this.kag.ftag.nextOrder();
    }
  },
  setEvent: function (j_target, pm) {
    const that = TYRANO;
    j_target.get(0).updateText = (str) => {
      that.kag.tmp.is_edge_overlap = !1;
      const is_shadow = "shadow" === pm.edge_method;
      if (is_shadow) {
        const edges = $.parseEdgeOptions(pm.edge);
        that.kag.tmp.text_shadow_values = [];
        for (let i = edges.length - 1; i >= 0; i--) {
          const edge = edges[i],
            text_shadow_value = $.generateTextShadowStrokeCSSOne(
              edge.color,
              edge.total_width
            );
          that.kag.tmp.text_shadow_values.push(text_shadow_value);
        }
        that.kag.tmp.inside_stroke_color = edges[0].color;
      }
      const inner_html = Array.prototype.reduce.call(
        str,
        (total_html, this_char) =>
          is_shadow
            ? total_html +
              that.kag
                .getTag("text")
                .buildTextShadowChar(this_char, pm.edge, !0)
            : total_html +
              that.kag
                .getTag("text")
                .buildTextStrokeChar(this_char, pm.edge, !0),
        ""
      );
      j_target.html(inner_html);
      pm.gradient && j_target.find(".fill").setGradientText(pm.gradient);
    };
  },
};
tyrano.plugin.kag.tag.mtext = {
  vital: ["x", "y"],
  pm: {
    layer: "0",
    page: "fore",
    x: 0,
    y: 0,
    vertical: "false",
    text: "",
    size: "",
    face: "",
    color: "",
    italic: "",
    bold: "",
    shadow: "",
    edge: "",
    name: "",
    zindex: "9999",
    width: "",
    align: "left",
    fadeout: "true",
    time: "2000",
    in_effect: "fadeIn",
    in_delay: "50",
    in_delay_scale: "1.5",
    in_sync: "false",
    in_shuffle: "false",
    in_reverse: "false",
    wait: "true",
    out_effect: "fadeOut",
    out_delay: "50",
    out_scale_delay: "",
    out_sync: "false",
    out_shuffle: "false",
    out_reverse: "false",
  },
  start: function (pm) {
    var that = this;
    "" == pm.face && (pm.face = that.kag.stat.font.face);
    "" == pm.color
      ? (pm.color = $.convertColor(that.kag.stat.font.color))
      : (pm.color = $.convertColor(pm.color));
    var font_new_style = {
      color: pm.color,
      "font-weight": pm.bold,
      "font-style": pm.fontstyle,
      "font-size": pm.size + "px",
      "font-family": pm.face,
      "z-index": "999",
      text: "",
    };
    if ("" != pm.edge) {
      var edge_color = $.convertColor(pm.edge);
      font_new_style["text-shadow"] =
        "1px 1px 0 " +
        edge_color +
        ", -1px 1px 0 " +
        edge_color +
        ",1px -1px 0 " +
        edge_color +
        ",-1px -1px 0 " +
        edge_color;
    } else
      "" != pm.shadow &&
        (font_new_style["text-shadow"] =
          "2px 2px 2px " + $.convertColor(pm.shadow));
    var target_layer = this.kag.layer.getLayer(pm.layer, pm.page),
      tobj = $("<p></p>");
    tobj.css("position", "absolute");
    tobj.css("top", pm.y + "px");
    tobj.css("left", pm.x + "px");
    tobj.css("width", pm.width);
    tobj.css("text-align", pm.align);
    "true" == pm.vertical && tobj.addClass("vertical_text");
    $.setName(tobj, pm.name);
    tobj.html(pm.text);
    this.kag.setStyles(tobj, font_new_style);
    "fix" == pm.layer && tobj.addClass("fixlayer");
    target_layer.append(tobj);
    for (let key in pm)
      "true" == pm[key] ? (pm[key] = !0) : "false" == pm[key] && (pm[key] = !1);
    tobj.textillate({
      loop: pm.fadeout,
      minDisplayTime: pm.time,
      in: {
        effect: pm.in_effect,
        delayScale: pm.in_delay_scale,
        delay: pm.in_delay,
        sync: pm.in_sync,
        shuffle: pm.in_shuffle,
        reverse: pm.in_reverse,
        callback: function () {
          0 == pm.fadeout && 1 == pm.wait && that.kag.ftag.nextOrder();
        },
      },
      out: {
        effect: pm.out_effect,
        delayScale: pm.out_delay_scale,
        delay: pm.out_delay,
        sync: pm.out_sync,
        shuffle: pm.out_shuffle,
        reverse: pm.out_reverse,
        callback: function () {
          tobj.remove();
          1 == pm.wait && that.kag.ftag.nextOrder();
        },
      },
    });
    1 != pm.wait && this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.backlay = {
  pm: { layer: "" },
  start: function (pm) {
    this.kag.layer.backlay(pm.layer);
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.wt = {
  start: function (pm) {
    if (0 == this.kag.stat.is_trans) {
      this.kag.cancelWeakStop();
      this.kag.ftag.nextOrder();
    } else this.kag.weaklyStop();
  },
};
tyrano.plugin.kag.tag.wb = {
  start: function (pm) {
    this.kag.weaklyStop();
  },
};
tyrano.plugin.kag.tag.link = {
  pm: { target: null, storage: null, keyfocus: "", once: "true" },
  start: function (pm) {
    var that = this,
      j_span = this.kag.setMessageCurrentSpan();
    that.kag.stat.display_link = !0;
    that.kag.setElmCursor(j_span, "pointer");
    that.kag.makeFocusable(j_span, pm.keyfocus);
    !(function () {
      pm.target, pm.storage;
      that.kag.event.addEventElement({ tag: "link", j_target: j_span, pm: pm });
      that.setEvent(j_span, pm);
    })();
    this.kag.ftag.nextOrder();
  },
  setEvent: function (j_span, pm) {
    var _target = pm.target,
      _storage = pm.storage,
      that = TYRANO,
      clicked = !1;
    const once = "false" !== pm.once;
    j_span.on("mousedown", () => !1);
    j_span.on("click", (e) => {
      that.kag.tmp.ready_audio || that.kag.readyAudio();
      if (!that.kag.key_mouse.mouse.isClickEnabled(e)) {
        that.kag.key_mouse.vmouse.hide();
        return !1;
      }
      if (!clicked || !once) {
        clicked = !0;
        $("[data-event-tag=link]").each((i, elm) => {
          const j_elm = $(elm);
          if ("false" !== JSON.parse(j_elm.attr("data-event-pm")).once) {
            j_elm.off("click");
            j_elm.setStyle("cursor", "auto");
            this.kag.event.removeEventAttr(j_elm);
          }
        });
        that.kag.key_mouse.vmouse.hide();
        that.kag.trigger("click-tag-link", e);
        that.kag.stat.display_link = !1;
        TYRANO.kag.ftag.nextOrderWithLabel(_target, _storage);
        TYRANO.kag.cancelWeakStop();
        "true" == that.kag.stat.skip_link
          ? e.stopPropagation()
          : that.kag.setSkip(!1);
        return !1;
      }
    });
    that.kag.setElmCursor(j_span, "pointer");
  },
};
tyrano.plugin.kag.tag.endlink = {
  start: function (pm) {
    this.kag.setMessageCurrentSpan();
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.s = {
  start: function () {
    this.kag.stronglyStop();
    this.kag.weaklyStop();
    this.kag.stat.glink_config &&
      "true" === this.kag.stat.glink_config.auto_place &&
      this.showGLinks();
  },
  showGLinks: function () {
    const j_layer = this.kag.layer.getFreeLayer(),
      j_glink_collection = j_layer.find(".glink_button_auto_place");
    if (0 === j_glink_collection.length) return;
    j_glink_collection.removeClass("glink_button_auto_place");
    const glink_config = this.kag.getTag("glink_config").getConfig();
    j_glink_collection.setStyleMap({
      position: "relative",
      left: "auto",
      top: "auto",
      visibility: "hidden",
    });
    switch (glink_config.width) {
      case "default":
        break;
      case "max":
        j_glink_collection.alignMaxWidth();
        break;
      default:
        j_glink_collection.css({
          "box-sizing": "border-box",
          width: glink_config.width,
        });
    }
    switch (glink_config.height) {
      case "default":
        break;
      case "max":
        j_glink_collection.alignMaxHeight();
        break;
      default:
        j_glink_collection.css({
          "box-sizing": "border-box",
          height: glink_config.height,
        });
    }
    "default" !== glink_config.margin_y &&
      j_glink_collection.setStyleMap({
        "margin-top": `${glink_config.margin_y}px`,
        "margin-bottom": `${glink_config.margin_y}px`,
      });
    "default" !== glink_config.margin_x &&
      j_glink_collection.setStyleMap({
        "margin-left": `${glink_config.margin_x}px`,
        "margin-right": `${glink_config.margin_x}px`,
      });
    "default" !== glink_config.padding_y &&
      j_glink_collection.setStyleMap({
        "padding-top": `${glink_config.padding_y}px`,
        "padding-bottom": `${glink_config.padding_y}px`,
      });
    "default" !== glink_config.padding_x &&
      j_glink_collection.setStyleMap({
        "padding-left": `${glink_config.padding_x}px`,
        "padding-right": `${glink_config.padding_x}px`,
      });
    j_glink_collection.show();
    const wrapper_style = {
      position: "absolute",
      display: "flex",
      "flex-direction": glink_config.direction,
      "flex-wrap": glink_config.wrap,
      "align-items": glink_config.horizontal,
      "justify-content": glink_config.vertical,
    };
    let area_nums;
    if ("auto" === glink_config.place_area)
      $.extend(wrapper_style, this.calcFlexPosition(glink_config));
    else if ("cover" === glink_config.place_area)
      $.extend(wrapper_style, {
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
      });
    else {
      area_nums = glink_config.place_area
        .split(",")
        .map((item) => $.trim(item));
      $.extend(wrapper_style, {
        left: `${area_nums[0]}px`,
        top: `${area_nums[1]}px`,
        width: `${area_nums[2]}px`,
        height: `${area_nums[3]}px`,
      });
    }
    const j_wrapper = $('<div class="glink_auto_place_wrapper" />').setStyleMap(
      wrapper_style
    );
    "0" !== glink_config.dx && j_wrapper.css("left", `+=${glink_config.dx}px`);
    "0" !== glink_config.dy && j_wrapper.css("top", `+=${glink_config.dy}px`);
    j_glink_collection.appendTo(j_wrapper);
    let animation_target_count = 0;
    j_glink_collection.each((i, elm) => {
      const j_elm = $(elm),
        _pm = JSON.parse(j_elm.attr("data-event-pm")),
        need_animate =
          void 0 !== _pm.show_time &&
          parseInt(_pm.show_time) >= 10 &&
          ("none" !== _pm.show_keyframe || "none" !== _pm.show_effect);
      need_animate && (animation_target_count += 1);
      elm.__pm = _pm;
      elm.__need_animate = need_animate;
    });
    if (0 === animation_target_count || this.kag.stat.is_skip) {
      j_glink_collection.setStyle("visibility", "visible");
      j_wrapper.appendTo(j_layer);
      return;
    }
    j_wrapper.setStyleMap({ "pointer-events": "none" });
    let showed_counter = 0;
    j_glink_collection.each((i, elm) => {
      const j_elm = $(elm);
      if (!elm.__need_animate) {
        j_elm.setStyle("visibility", "visible");
        return;
      }
      const _pm = elm.__pm,
        timeout = parseInt(_pm.show_delay) * i;
      $.setTimeout(() => {
        j_elm.setStyle("visibility", "visible");
        if (_pm.show_keyframe && "none" !== _pm.show_keyframe)
          j_elm.animateWithTyranoKeyframes({
            keyframe: _pm.show_keyframe,
            time: _pm.show_time,
            easing: _pm.show_easing,
            delay: "0",
            count: "1",
            mode: "",
            onend: (anim) => {
              anim.cancel();
              showed_counter += 1;
              showed_counter === animation_target_count &&
                j_wrapper.setStyleMap({ "pointer-events": "auto" });
            },
          });
        else {
          j_elm.setStyle("animation-fill-mode", "forwards");
          _pm.show_time &&
            j_elm.setStyle(
              "animation-duration",
              $.convertDuration(glink_config.show_time)
            );
          _pm.show_easing &&
            j_elm.setStyle(
              "animation-timing-function",
              glink_config.show_easing
            );
          j_elm.on("animationend", (e) => {
            if (j_elm.get(0) === e.target) {
              j_elm.off("animationend");
              j_elm.removeClass(_pm.show_effect);
              j_elm.setStyleMap({
                "animation-fill-mode": "",
                "animation-duration": "",
                "animation-timing-function": "",
              });
              showed_counter += 1;
              showed_counter === animation_target_count &&
                j_wrapper.setStyleMap({ "pointer-events": "auto" });
            }
          });
          j_elm.addClass(glink_config.show_effect);
        }
      }, timeout);
    });
    j_wrapper.appendTo(j_layer);
  },
  calcFlexPosition: function (glink_config) {
    const j_message_layer = this.kag.layer.getLayer(
      this.kag.stat.current_layer,
      this.kag.stat.current_page
    );
    if ("none" === j_message_layer.css("display"))
      return { left: "0", top: "0", width: "100%", height: "100%" };
    const j_message_outer = j_message_layer.find(".message_outer"),
      gh = this.kag.tmp.screen_info.original_height,
      top = parseInt(j_message_outer.css("top")) || 0,
      height = parseInt(j_message_outer.css("height")) || gh,
      bottom = top + height;
    if (height / gh > 0.8)
      return { left: "0", top: "0", width: "100%", height: "100%" };
    return top > gh - bottom
      ? { left: "0", top: "0", width: "100%", height: `${top}px` }
      : {
          left: "0",
          top: `${bottom}px`,
          width: "100%",
          height: gh - bottom + "px",
        };
  },
};
tyrano.plugin.kag.tag._s = {
  vital: [],
  pm: {},
  start: function (pm) {
    this.kag.stat.strong_stop_recover_index = this.kag.ftag.current_order_index;
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.wait = {
  vital: ["time"],
  pm: { time: 0 },
  start: function (pm) {
    var that = this;
    this.kag.weaklyStop();
    this.kag.stronglyStop();
    this.kag.stat.is_wait = !0;
    that.kag.tmp.wait_id = setTimeout(function () {
      that.kag.cancelStrongStop();
      that.kag.cancelWeakStop();
      that.kag.stat.is_wait = !1;
      that.kag.ftag.nextOrder();
    }, pm.time);
  },
};
tyrano.plugin.kag.tag.wait_cancel = {
  vital: [],
  pm: {},
  start: function (pm) {
    clearTimeout(this.kag.tmp.wait_id);
    this.kag.tmp.wait_id = "";
    this.kag.cancelStrongStop();
    this.kag.stat.is_wait = !1;
    this.kag.cancelWeakStop();
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.hidemessage = {
  start: function () {
    this.kag.stat.is_hide_message = !0;
    this.kag.layer.hideMessageLayers();
    this.kag.layer.showEventLayer("hidemessage");
  },
};
tyrano.plugin.kag.tag.quake = {
  vital: ["time"],
  pm: {
    count: 5,
    time: 300,
    timemode: "",
    hmax: "0",
    vmax: "10",
    wait: "true",
  },
  start: function (pm) {
    var that = this;
    "0" != pm.hmax
      ? $("." + this.kag.define.BASE_DIV_NAME).effect(
          "shake",
          {
            times: parseInt(pm.count),
            distance: parseInt(pm.hmax),
            direction: "left",
          },
          parseInt(pm.time),
          function () {
            "true" == pm.wait && that.kag.ftag.nextOrder();
          }
        )
      : "0" != pm.vmax &&
        $("." + this.kag.define.BASE_DIV_NAME).effect(
          "shake",
          {
            times: parseInt(pm.count),
            distance: parseInt(pm.vmax),
            direction: "up",
          },
          parseInt(pm.time),
          function () {
            "true" == pm.wait && that.kag.ftag.nextOrder();
          }
        );
    "false" == pm.wait && that.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.quake2 = {
  pm: {
    time: "1000",
    hmax: "0",
    vmax: "200",
    wait: "true",
    copybase: "true",
    skippable: "true",
  },
  start: function (pm) {
    this.kag.tmp.quake2_finish && this.kag.tmp.quake2_finish();
    if (this.kag.stat.is_skip && "true" === pm.skippable)
      return this.kag.ftag.nextOrder();
    const duration = parseInt(pm.time),
      j_quake = $("#root_layer_game, #root_layer_system"),
      do_copy = "true" === pm.copybase;
    let j_base_clone;
    if (do_copy) {
      j_base_clone = $(".base_fore").clone();
      j_base_clone.attr("class", "temp-element quake2-element");
      $("#tyrano_base").prepend(j_base_clone);
    }
    const vmax = parseInt(pm.vmax),
      hmax = parseInt(pm.hmax),
      is_wait = "false" !== pm.wait;
    let sign = 1;
    const ignore_rate = Math.max(1, Math.ceil(refreshRate / 60));
    let current_frame = 0;
    const end_frame = ((duration / (1e3 / 60)) * ignore_rate) | 0;
    this.kag.pushAnimStack();
    this.kag.tmp.quake2_finish = () => {
      this.kag.tmp.quake2_finish = !1;
      cancelAnimationFrame(this.kag.tmp.quake2_timer_id);
      j_quake.setStyle("transform", "");
      this.kag.popAnimStack();
      do_copy && j_base_clone.remove();
      is_wait && this.kag.ftag.nextOrder();
    };
    const loop = () => {
      if (current_frame < end_frame) {
        if (current_frame % ignore_rate == 0) {
          sign *= -1;
          let v = 0,
            h = 0;
          vmax > 0 &&
            (v =
              sign *
              $.easing.easeOutQuad(
                null,
                current_frame,
                vmax,
                -vmax,
                end_frame
              ));
          hmax > 0 &&
            (h =
              sign *
              $.easing.easeOutQuad(
                null,
                current_frame,
                hmax,
                -hmax,
                end_frame
              ));
          const css = `translate(${h}px, ${v}px)`;
          j_quake.setStyle("transform", css);
          j_quake.setStyle("background", "red");
        }
        current_frame++;
        this.kag.tmp.quake2_timer_id = requestAnimationFrame(loop);
      } else this.kag.tmp.quake2_finish && this.kag.tmp.quake2_finish();
    };
    this.kag.overwrite("load-start.quake2", () => {
      this.kag.tmp.quake2_finish && this.kag.tmp.quake2_finish();
    });
    this.kag.overwrite("skip-start.quake2", () => {
      this.kag.tmp.quake2_finish && this.kag.tmp.quake2_finish();
    });
    this.kag.tmp.quake2_timer_id = requestAnimationFrame(loop);
    is_wait || this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.vibrate = {
  pm: { time: "500", power: "100", count: "" },
  start: function (pm) {
    let time;
    const duration = parseInt(pm.time),
      power = parseInt(pm.power) / 100;
    time = pm.time.includes(",")
      ? pm.time.split(",").map((item) => parseInt(item))
      : duration;
    if (pm.count) {
      let new_time = [];
      if ("number" == typeof time) {
        const count = 2 * (parseInt(pm.count) || 1) - 1;
        for (let i = 0; i < count; i++) new_time.push(time);
      } else {
        const count = parseInt(pm.count) || 1;
        for (let i = 0; i < count; i++)
          new_time = new_time.concat(time.concat());
      }
      time = new_time;
    }
    try {
      this.kag.key_mouse.gamepad.last_used_next_gamepad_index > -1
        ? this.kag.key_mouse.gamepad.vibrate({ duration: time, power: power })
        : navigator.vibrate(time);
    } catch (e) {
      console.log(e);
    }
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.vibrate_stop = {
  start: function (pm) {
    this.kag.key_mouse.gamepad.vibrate({ duration: 0, power: 0 });
    navigator.vibrate(0);
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.font = {
  pm: {},
  log_join: "true",
  start: function (pm) {
    this.kag.setMessageCurrentSpan();
    pm.size && (this.kag.stat.font.size = pm.size);
    pm.color && (this.kag.stat.font.color = $.convertColor(pm.color));
    pm.gradient && (this.kag.stat.font.gradient = pm.gradient);
    pm.bold && (this.kag.stat.font.bold = $.convertBold(pm.bold));
    pm.face && (this.kag.stat.font.face = pm.face);
    pm.italic && (this.kag.stat.font.italic = $.convertItalic(pm.italic));
    pm.effect &&
      ("none" == pm.effect
        ? (this.kag.stat.font.effect = "")
        : (this.kag.stat.font.effect = pm.effect));
    pm.effect_speed && (this.kag.stat.font.effect_speed = pm.effect_speed);
    pm.edge &&
      ("none" == pm.edge || "" == pm.edge
        ? (this.kag.stat.font.edge = "")
        : (this.kag.stat.font.edge = $.convertColor(pm.edge)));
    pm.edge_method && (this.kag.stat.font.edge_method = pm.edge_method);
    pm.shadow &&
      ("none" == pm.shadow || "" == pm.shadow
        ? (this.kag.stat.font.shadow = "")
        : (this.kag.stat.font.shadow = $.convertColor(pm.shadow)));
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.deffont = {
  pm: {},
  start: function (pm) {
    pm.size && (this.kag.stat.default_font.size = pm.size);
    pm.color && (this.kag.stat.default_font.color = $.convertColor(pm.color));
    pm.gradient && (this.kag.stat.default_font.gradient = pm.gradient);
    pm.bold && (this.kag.stat.default_font.bold = $.convertBold(pm.bold));
    pm.face && (this.kag.stat.default_font.face = pm.face);
    pm.italic &&
      (this.kag.stat.default_font.italic = $.convertItalic(pm.italic));
    pm.effect &&
      ("none" == pm.effect
        ? (this.kag.stat.default_font.effect = "")
        : (this.kag.stat.default_font.effect = pm.effect));
    pm.effect_speed &&
      (this.kag.stat.default_font.effect_speed = pm.effect_speed);
    pm.edge &&
      ("none" == pm.edge || "" == pm.edge
        ? (this.kag.stat.default_font.edge = "")
        : (this.kag.stat.default_font.edge = $.convertColor(pm.edge)));
    pm.edge_method && (this.kag.stat.default_font.edge_method = pm.edge_method);
    pm.shadow &&
      ("none" == pm.shadow || "" == pm.shadow
        ? (this.kag.stat.default_font.shadow = "")
        : (this.kag.stat.default_font.shadow = $.convertColor(pm.shadow)));
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.message_config = {
  pm: {},
  start: function (pm) {
    this.kag.setMessageCurrentSpan();
    const default_message_config =
      this.kag.ftag.master_tag.text.default_message_config || {};
    this.kag.stat.message_config || (this.kag.stat.message_config = {});
    const message_config = this.kag.stat.message_config;
    for (const key in default_message_config)
      key in pm && (message_config[key] = pm[key]);
    this.kag.stat.word_nobreak_list || (this.kag.stat.word_nobreak_list = []);
    const list = this.kag.stat.word_nobreak_list;
    $.isNonEmptyStr(pm.add_word_nobreak) &&
      pm.add_word_nobreak.split(",").forEach((word) => {
        const word_trimed = $.trim(word);
        list.includes(word_trimed) || list.push(word_trimed);
      });
    if ($.isNonEmptyStr(pm.remove_word_nobreak)) {
      let filterd_list = list;
      pm.remove_word_nobreak.split(",").forEach((word) => {
        const word_trimed = $.trim(word);
        filterd_list = filterd_list.filter((item) => item !== word_trimed);
      });
      this.kag.stat.word_nobreak_list = filterd_list;
    }
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.delay = {
  pm: { speed: "" },
  log_join: "true",
  start: function (pm) {
    "" != pm.speed && (this.kag.stat.ch_speed = parseInt(pm.speed));
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.resetdelay = {
  pm: { speed: "" },
  log_join: "true",
  start: function (pm) {
    this.kag.stat.ch_speed = "";
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.configdelay = {
  pm: { speed: "" },
  start: function (pm) {
    if ("" != pm.speed) {
      this.kag.stat.ch_speed = "";
      this.kag.config.chSpeed = pm.speed;
      this.kag.ftag.startTag("eval", {
        exp: "sf._config_ch_speed = " + pm.speed,
      });
    } else this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.nowait = {
  pm: {},
  start: function (pm) {
    this.kag.stat.is_nowait = !0;
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.endnowait = {
  pm: {},
  start: function (pm) {
    this.kag.stat.is_nowait = !1;
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.resetfont = {
  log_join: "true",
  pm: { next: "true" },
  start: function (pm) {
    this.kag.setMessageCurrentSpan();
    this.kag.stat.font = $.extend(!0, {}, this.kag.stat.default_font);
    "false" !== pm.next && this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.layopt = {
  vital: ["layer"],
  pm: {
    layer: "",
    page: "fore",
    visible: "",
    left: "",
    top: "",
    opacity: "",
    autohide: !1,
    index: 10,
  },
  start: function (pm) {
    if ("message" == pm.layer) {
      pm.layer = this.kag.stat.current_layer;
      pm.page = this.kag.stat.current_page;
    }
    var j_layer = this.kag.layer.getLayer(pm.layer, pm.page);
    ("fix" != pm.layer && "fixlayer" != pm.layer) ||
      (j_layer = $("#tyrano_base").find(".fixlayer"));
    if ("" != pm.visible)
      if ("true" == pm.visible) {
        "fore" == pm.page && j_layer.css("display", "");
        j_layer.attr("l_visible", "true");
      } else {
        j_layer.css("display", "none");
        j_layer.attr("l_visible", "false");
      }
    "" != pm.left && j_layer.css("left", parseInt(pm.left));
    "" != pm.top && j_layer.css("top", parseInt(pm.top));
    "" != pm.opacity && j_layer.css("opacity", $.convertOpacity(pm.opacity));
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.ruby = {
  vital: ["text"],
  pm: { text: "" },
  log_join: "true",
  start: function (pm) {
    var str = pm.text;
    this.kag.stat.ruby_str = str;
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.mark = {
  vital: [],
  pm: { color: "0xFFFF00", font_color: "", size: "" },
  start: function (pm) {
    pm.text;
    this.kag.stat.mark = 1;
    var style_mark = "margin-right:-1px;";
    style_mark += "background-color:" + $.convertColor(pm.color) + ";";
    "" != pm.font_color
      ? (style_mark += "color:" + $.convertColor(pm.font_color) + ";")
      : (style_mark += "color:" + this.kag.stat.font.color + ";");
    "" != pm.size &&
      (style_mark +=
        "background: linear-gradient(transparent " +
        (100 - parseInt(pm.size)) +
        "%, " +
        $.convertColor(pm.color) +
        " 0%);");
    style_mark += "padding-top:4px;padding-bottom:4px;";
    this.kag.stat.style_mark = style_mark;
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.endmark = {
  vital: [],
  pm: {},
  start: function (pm) {
    pm.text;
    1 == this.kag.stat.mark && (this.kag.stat.mark = 2);
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.locate = {
  pm: { x: null, y: null },
  start: function (pm) {
    null != pm.x && (this.kag.stat.locate.x = pm.x);
    null != pm.y && (this.kag.stat.locate.y = pm.y);
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.button = {
  pm: {
    graphic: "",
    storage: null,
    target: null,
    ext: "",
    name: "",
    x: "",
    y: "",
    width: "",
    height: "",
    fix: "false",
    savesnap: "false",
    folder: "image",
    exp: "",
    preexp: "",
    visible: "true",
    hint: "",
    clickse: "",
    enterse: "",
    leavese: "",
    activeimg: "",
    clickimg: "",
    enterimg: "",
    autoimg: "",
    skipimg: "",
    keyfocus: "",
    auto_next: "yes",
    role: "",
  },
  start: function (pm) {
    var target_layer = null;
    "" != pm.role && (pm.fix = "true");
    "false" == pm.fix
      ? (target_layer = this.kag.layer.getFreeLayer()).css("z-index", 999999)
      : (target_layer = this.kag.layer.getLayer("fix"));
    var storage_url = "";
    storage_url = $.isHTTP(pm.graphic)
      ? pm.graphic
      : "./data/" + pm.folder + "/" + pm.graphic;
    var j_button = $("<img />");
    j_button.attr("src", storage_url);
    j_button.css("position", "absolute");
    j_button.css("z-index", 99999999);
    this.kag.setElmCursor(j_button, "pointer");
    this.kag.makeFocusable(j_button, pm.keyfocus);
    "true" == pm.visible ? j_button.show() : j_button.hide();
    "" == pm.x
      ? 0 != this.kag.stat.locate.x &&
        j_button.css("left", this.kag.stat.locate.x + "px")
      : j_button.css("left", pm.x + "px");
    "" == pm.y
      ? 0 != this.kag.stat.locate.y &&
        j_button.css("top", this.kag.stat.locate.y + "px")
      : j_button.css("top", pm.y + "px");
    "false" != pm.fix && j_button.addClass("fixlayer");
    "" != pm.width && j_button.css("width", pm.width + "px");
    "" != pm.height && j_button.css("height", pm.height + "px");
    "" != pm.hint && j_button.attr({ title: pm.hint, alt: pm.hint });
    $.setName(j_button, pm.name);
    if ("" !== pm.preexp) {
      var preexp_entity = this.kag.embScript(pm.preexp);
      pm.preexp = JSON.stringify(preexp_entity);
    }
    pm.autoimg && j_button.addClass("button-auto-sync");
    pm.skipimg && j_button.addClass("button-skip-sync");
    this.kag.event.addEventElement({
      tag: "button",
      j_target: j_button,
      pm: pm,
    });
    this.setEvent(j_button, pm);
    target_layer.append(j_button);
    "false" == pm.fix && target_layer.show();
    this.kag.ftag.nextOrder();
  },
  setEvent: function (j_button, pm) {
    const that = this;
    j_button.attr("src", $.parseStorage(pm.graphic, pm.folder));
    pm.autoimg &&
      this.kag.stat.is_auto &&
      j_button.attr("src", $.parseStorage(pm.autoimg, pm.folder));
    pm.skipimg &&
      this.kag.stat.is_skip &&
      j_button.attr("src", $.parseStorage(pm.skipimg, pm.folder));
    let button_clicked = !1;
    const is_fix_button = "true" === pm.fix,
      is_role_button = !!pm.role,
      is_call_button = !is_role_button && is_fix_button,
      is_jump_button = !is_role_button && !is_fix_button,
      is_save_button =
        "save" == pm.role ||
        "menu" == pm.role ||
        "quicksave" == pm.role ||
        "sleepgame" == pm.role,
      preexp = this.kag.embScript(pm.preexp);
    j_button.hover(
      () => {
        if (!is_fix_button && !this.kag.stat.is_strong_stop) return !1;
        if (!is_fix_button && button_clicked) return !1;
        j_button.hasClass("src-change-disabled") ||
          (pm.enterimg &&
            j_button.attr("src", $.parseStorage(pm.enterimg, pm.folder)));
        pm.enterse && this.kag.playSound(pm.enterse);
      },
      () => {
        if (!is_fix_button && !this.kag.stat.is_strong_stop) return !1;
        if (!is_fix_button && button_clicked) return !1;
        j_button.hasClass("src-change-disabled") ||
          (pm.enterimg &&
            j_button.attr("src", $.parseStorage(pm.graphic, pm.folder)));
        pm.leavese && this.kag.playSound(pm.leavese);
      }
    );
    j_button.on("mousedown touchstart", () => {
      if (!this.kag.stat.is_strong_stop) return !0;
      if (button_clicked) return !0;
      j_button.hasClass("src-change-disabled") ||
        (pm.activeimg &&
          j_button.attr("src", $.parseStorage(pm.activeimg, pm.folder)));
      return !0;
    });
    j_button.on("click", (e) => {
      that.kag.tmp.ready_audio || that.kag.readyAudio();
      if (!that.kag.key_mouse.mouse.isClickEnabled(e)) {
        that.kag.key_mouse.vmouse.hide();
        return !1;
      }
      if (!this.kag.stat.is_strong_stop && !is_fix_button) return !1;
      if (button_clicked && !is_fix_button) return !1;
      if (
        !that.kag.stat.is_strong_stop &&
        "none" === that.kag.layer.layer_event.css("display")
      )
        return !1;
      if ("true" === pm.savesnap && that.kag.stat.is_stop) return !1;
      if (
        is_save_button &&
        (that.kag.stat.is_adding_text || that.kag.stat.is_wait)
      )
        return !1;
      if ("sleepgame" === pm.role && null !== that.kag.tmp.sleep_game)
        return !1;
      if ("" == pm.role && null == pm.storage && null == pm.target) return !1;
      const exists_call_stack = !!that.kag.getStack("call");
      if (is_call_button && exists_call_stack) {
        that.kag.log("callスタックが残っている場合、fixボタンは反応しません");
        that.kag.log(that.kag.getStack("call"));
        return !1;
      }
      this.kag.key_mouse.vmouse.hide();
      if (!is_fix_button) {
        button_clicked = !0;
        this.kag.cancelStrongStop();
        this.kag.layer.cancelAllFreeLayerButtonsEvents();
        j_button.addClass("clicked_button");
      }
      "" != pm.clickimg
        ? j_button.attr("src", $.parseStorage(pm.clickimg, pm.folder))
        : "" != pm.activeimg &&
          j_button.attr("src", $.parseStorage(pm.graphic, pm.folder));
      pm.clickse && this.kag.playSound(pm.clickse);
      pm.exp && this.kag.embScript(pm.exp, preexp);
      "true" === pm.savesnap &&
        that.kag.menu.snapSave(that.kag.stat.current_save_str);
      if (is_jump_button) {
        that.kag.trigger("click-tag-button", e);
        that.kag.ftag.startTag("jump", pm);
        "true" === that.kag.stat.skip_link
          ? e.stopPropagation()
          : that.kag.setSkip(!1);
        return !1;
      }
      if (is_call_button) {
        that.kag.trigger("click-tag-button-call", e);
        that.kag.ftag.startTag("call", {
          storage: pm.storage,
          target: pm.target,
          auto_next: that.kag.stat.is_strong_stop ? "stop" : pm.auto_next,
        });
        "true" === that.kag.stat.skip_link
          ? e.stopPropagation()
          : that.kag.setSkip(!1);
        return !1;
      }
      if (is_role_button) {
        that.kag.trigger("click-tag-button-role", e);
        that.kag.setSkip(!1);
        "auto" !== pm.role &&
          that.kag.ftag.startTag("autostop", { next: "false" });
        switch (pm.role) {
          case "save":
            that.kag.menu.displaySave();
            break;
          case "load":
            that.kag.menu.displayLoad();
            break;
          case "window":
            that.kag.layer.hideMessageLayers();
            break;
          case "title":
            that.kag.backTitle();
            break;
          case "menu":
            that.kag.menu.showMenu();
            break;
          case "skip":
            if (that.kag.stat.is_skip) that.kag.setSkip(!1);
            else {
              that.kag.layer.layer_event.isDisplayed() &&
                that.kag.layer.layer_event.click();
              that.kag.setSkip(!0);
            }
            break;
          case "backlog":
            that.kag.menu.displayLog();
            break;
          case "fullscreen":
            that.kag.menu.screenFull();
            break;
          case "quicksave":
            j_button.trigger("mouseleave");
            that.kag.menu.setQuickSave();
            break;
          case "quickload":
            that.kag.menu.loadQuickSave();
            break;
          case "auto":
            if (this.kag.stat.is_auto) that.kag.setAuto(!1);
            else {
              that.kag.layer.layer_event.isDisplayed() &&
                that.kag.layer.layer_event.click();
              that.kag.setAuto(!0);
            }
            break;
          case "sleepgame":
            j_button.trigger("mouseleave");
            that.kag.tmp.sleep_game = {};
            pm.next = !1;
            that.kag.ftag.startTag("sleepgame", pm);
        }
        return !1;
      }
    });
  },
};
tyrano.plugin.kag.tag.glink_config = {
  pm: {},
  default_glink_config: {
    auto_place: "true",
    auto_place_force: "false",
    margin_y: "20",
    margin_x: "0",
    padding_y: "default",
    padding_x: "default",
    direction: "column",
    wrap: "nowrap",
    dx: "0",
    dy: "0",
    width: "default",
    vertical: "center",
    horizontal: "center",
    place_area: "auto",
    show_time: "0",
    show_effect: "fadeIn",
    show_keyframe: "none",
    show_delay: "0",
    show_easing: "linear",
    select_time: "0",
    select_effect: "fadeOutRight",
    select_keyframe: "none",
    select_delay: "0",
    select_easing: "linear",
    reject_time: "0",
    reject_effect: "fadeOut",
    reject_keyframe: "none",
    reject_delay: "0",
    reject_easing: "linear",
  },
  getConfig: function (name) {
    this.kag.stat.glink_config ||
      (this.kag.stat.glink_config = $.extend({}, this.default_glink_config));
    return name ? this.kag.stat.glink_config[name] : this.kag.stat.glink_config;
  },
  start: function (pm) {
    this.kag.stat.glink_config ||
      (this.kag.stat.glink_config = $.extend({}, this.default_glink_config));
    "left" === pm.horizontal && (pm.horizontal = "flex-start");
    "right" === pm.horizontal && (pm.horizontal = "flex-end");
    "top" === pm.vertical && (pm.vertical = "start");
    "bottom" === pm.vertical && (pm.vertical = "end");
    for (const key in pm)
      "_tag" !== key && pm[key] && (this.kag.stat.glink_config[key] = pm[key]);
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.glink = {
  pm: {
    color: "black",
    font_color: "",
    storage: null,
    target: null,
    hold: "",
    name: "",
    text: "",
    x: "auto",
    y: "",
    width: "",
    height: "",
    exp: "",
    preexp: "",
    size: 30,
    graphic: "",
    enterimg: "",
    cm: "true",
    opacity: "",
    clickse: "",
    enterse: "",
    leavese: "",
    face: "",
    bold: "",
    keyfocus: "",
  },
  start: function (pm) {
    var target_layer = null;
    (target_layer = this.kag.layer.getFreeLayer()).css("z-index", 999999);
    var j_button = $("<div class='glink_button'>" + pm.text + "</div>");
    j_button.css("position", "absolute");
    j_button.css("z-index", 99999999);
    j_button.css("font-size", pm.size + "px");
    this.kag.setElmCursor(j_button, "pointer");
    this.kag.makeFocusable(j_button, pm.keyfocus);
    "" != pm.font_color && j_button.css("color", $.convertColor(pm.font_color));
    "" != pm.height && j_button.css("height", pm.height + "px");
    "" != pm.width && j_button.css("width", pm.width + "px");
    "" != pm.opacity && j_button.css("opacity", $.convertOpacity(pm.opacity));
    "true" === pm.bold && j_button.css("font-weight", "bold");
    pm.edge
      ? j_button.css("text-shadow", $.generateTextShadowStrokeCSS(pm.edge))
      : pm.shadow &&
        j_button.css("text-shadow", "2px 2px 2px " + $.convertColor(pm.shadow));
    if ("" != pm.graphic) {
      j_button.removeClass("glink_button").addClass("button_graphic");
      var img_url = "./data/image/" + pm.graphic;
      j_button.css("background-image", "url(" + img_url + ")");
      j_button.css("background-repeat", "no-repeat");
      j_button.css("background-position", "center center");
      j_button.css("background-size", "100% 100%");
    } else j_button.addClass(pm.color);
    "" != pm.face
      ? j_button.css("font-family", pm.face)
      : "" != this.kag.stat.font.face &&
        j_button.css("font-family", this.kag.stat.font.face);
    if ("auto" == pm.x) {
      var sc_width = parseInt(this.kag.config.scWidth),
        center = Math.floor(parseInt(j_button.css("width")) / 2),
        first_left = Math.floor(sc_width / 2) - center;
      j_button.css("left", first_left + "px");
    } else
      "" == pm.x
        ? j_button.css("left", this.kag.stat.locate.x + "px")
        : j_button.css("left", pm.x + "px");
    "" == pm.y
      ? j_button.css("top", this.kag.stat.locate.y + "px")
      : j_button.css("top", pm.y + "px");
    $.setName(j_button, pm.name);
    if ("" !== pm.preexp) {
      var preexp_entity = this.kag.embScript(pm.preexp);
      pm.preexp = JSON.stringify(preexp_entity);
    }
    const glink_config = this.kag.getTag("glink_config").getConfig();
    ["show", "select", "reject"].forEach((key_1) => {
      ["effect", "keyframe", "time", "easing", "delay"].forEach((key_2) => {
        const key = `${key_1}_${key_2}`;
        pm[key] || (pm[key] = glink_config[key]);
      });
    });
    this.kag.event.addEventElement({
      tag: "glink",
      j_target: j_button,
      pm: pm,
    });
    this.setEvent(j_button, pm);
    if (
      "true" === glink_config.auto_place_force ||
      ("true" === glink_config.auto_place && "auto" === pm.x && !pm.y)
    ) {
      j_button.addClass("glink_button_auto_place");
      j_button.hide();
    } else {
      const show_options = {};
      ["time", "easing", "effect", "keyframe", "delay"].forEach((key) => {
        show_options[key] = pm[`show_${key}`];
      });
      if (
        void 0 !== show_options.time &&
        parseInt(show_options.time) >= 10 &&
        ("none" !== show_options.keyframe || "none" !== show_options.effect)
      ) {
        show_options.callback = () => {
          j_button.setStyleMap({ "pointer-events": "auto" });
        };
        this.startAnim(j_button, show_options);
      }
    }
    target_layer.append(j_button);
    target_layer.show();
    this.kag.ftag.nextOrder();
  },
  setEvent: function (j_button, pm) {
    let button_clicked = !1;
    const use_cm = "false" !== pm.cm,
      preexp = this.kag.embScript(pm.preexp);
    j_button.hover(
      () => {
        if (!this.kag.stat.is_strong_stop) return !1;
        if (button_clicked) return !1;
        pm.enterimg &&
          j_button.css(
            "background-image",
            "url(./data/image/" + pm.enterimg + ")"
          );
        pm.enterse && this.kag.playSound(pm.enterse);
      },
      () => {
        if (!this.kag.stat.is_strong_stop) return !1;
        if (button_clicked) return !1;
        pm.enterimg &&
          j_button.css(
            "background-image",
            "url(./data/image/" + pm.graphic + ")"
          );
        pm.leavese && this.kag.playSound(pm.leavese);
      }
    );
    j_button.on("mousedown", () => !1);
    j_button.click((e) => {
      this.kag.tmp.ready_audio || this.kag.readyAudio();
      if (!this.kag.key_mouse.mouse.isClickEnabled(e)) {
        this.kag.key_mouse.vmouse.hide();
        return !1;
      }
      if (!this.kag.stat.is_strong_stop) return !1;
      if (button_clicked && use_cm) return !1;
      button_clicked = !0;
      this.kag.key_mouse.vmouse.hide();
      this.kag.cancelStrongStop();
      j_button.addClass("glink_button_clicked");
      pm.clickimg &&
        j_button.css(
          "background-image",
          "url(./data/image/" + pm.clickimg + ")"
        );
      this.kag.trigger("click-tag-glink", e);
      pm.clickse && this.kag.playSound(pm.clickse);
      pm.exp && this.kag.embScript(pm.exp, preexp);
      const next = () => {
        use_cm && this.kag.ftag.startTag("cm", { next: "false" });
        if ("true" === pm.hold) {
          this.kag.stat.hold_glink = !0;
          this.kag.stat.hold_glink_storage = pm.storage;
          this.kag.stat.hold_glink_target = pm.target;
          this.kag.cancelStrongStop();
          this.kag.cancelWeakStop();
          this.kag.ftag.nextOrder();
        } else this.kag.ftag.startTag("jump", pm);
        "true" === this.kag.stat.skip_link
          ? e.stopPropagation()
          : this.kag.setSkip(!1);
      };
      let animation_target_count = 0;
      const j_collection = $(".glink_button");
      j_collection.each((i, elm) => {
        const j_elm = $(elm),
          _pm = JSON.parse(j_elm.attr("data-event-pm")),
          is_selected = j_elm.hasClass("glink_button_clicked");
        is_selected || j_elm.addClass("glink_button_not_clicked");
        const head = is_selected ? "select" : "reject",
          hide_options = {};
        ["time", "easing", "effect", "keyframe", "delay"].forEach((key) => {
          hide_options[key] = _pm[`${head}_${key}`];
        });
        const need_animate =
          void 0 !== hide_options.time &&
          parseInt(hide_options.time) >= 10 &&
          ("none" !== hide_options.keyframe || "none" !== hide_options.effect);
        need_animate && (animation_target_count += 1);
        elm.__hide_options = hide_options;
        elm.__need_animate = need_animate;
      });
      const should_keep_skip =
        this.kag.stat.is_skip && "true" === this.kag.stat.skip_link;
      if (0 === animation_target_count || should_keep_skip) {
        next();
        return !1;
      }
      this.kag.layer.cancelAllFreeLayerButtonsEvents();
      let anim_complete_counter = 0;
      j_collection.each((i, elm) => {
        const j_elm = $(elm);
        if (elm.__need_animate) {
          elm.__hide_options.callback = () => {
            anim_complete_counter += 1;
            anim_complete_counter === animation_target_count && next();
          };
          this.startAnim(j_elm, elm.__hide_options, !0);
        } else {
          j_elm.setStyle("transition", "none");
          j_elm.get(0).offsetHeight;
          j_elm.setStyle("opacity", "0");
          j_elm.setStyle("visibility", "hidden");
        }
      });
      return !1;
    });
  },
  startAnim: function (j_collection, options, do_hide) {
    j_collection.setStyleMap({ "pointer-events": "none" });
    options.keyframe && "none" !== options.keyframe
      ? j_collection.each((i, elm) => {
          $(elm).animateWithTyranoKeyframes({
            keyframe: options.keyframe,
            time: options.time,
            delay: options.delay,
            count: "1",
            mode: "forwards",
            easing: options.easing,
            onend: () => {
              options.callback && options.callback();
            },
          });
        })
      : j_collection.each((i, elm) => {
          const j_elm = $(elm);
          j_elm.setStyle("animation-fill-mode", "forwards");
          options.time &&
            j_elm.setStyle(
              "animation-duration",
              $.convertDuration(options.time)
            );
          options.delay &&
            j_elm.setStyle("animation-delay", $.convertDuration(options.delay));
          options.easing &&
            j_elm.setStyle("animation-timing-function", options.easing);
          j_elm.on("animationend", (e) => {
            if (j_elm.get(0) === e.target) {
              j_elm.off("animationend");
              j_elm.removeClass(options.effect);
              do_hide && j_elm.addClass("hidden");
              options.callback && options.callback();
            }
          });
          j_elm.addClass(options.effect);
        });
  },
};
tyrano.plugin.kag.tag.clickable = {
  vital: ["width", "height"],
  pm: {
    width: "0",
    height: "0",
    x: "",
    y: "",
    border: "none",
    color: "",
    mouseopacity: "",
    opacity: "140",
    storage: null,
    target: null,
    name: "",
  },
  start: function (pm) {
    var layer_free = this.kag.layer.getFreeLayer();
    layer_free.css("z-index", 9999999);
    var j_button = $("<div />");
    j_button.css("position", "absolute");
    j_button.css("top", this.kag.stat.locate.y + "px");
    j_button.css("left", this.kag.stat.locate.x + "px");
    j_button.css("width", pm.width + "px");
    j_button.css("height", pm.height + "px");
    j_button.css("opacity", $.convertOpacity(pm.opacity));
    j_button.css("background-color", $.convertColor(pm.color));
    j_button.css("border", $.replaceAll(pm.border, ":", " "));
    this.kag.setElmCursor(j_button, "pointer");
    "" != pm.x && j_button.css("left", parseInt(pm.x));
    "" != pm.y && j_button.css("top", parseInt(pm.y));
    this.kag.event.addEventElement({
      tag: "clickable",
      j_target: j_button,
      pm: pm,
    });
    this.setEvent(j_button, pm);
    layer_free.append(j_button);
    layer_free.show();
    this.kag.ftag.nextOrder();
  },
  setEvent: function (j_button, pm) {
    const that = this;
    let button_clicked = !1;
    pm.mouseopacity &&
      j_button.hover(
        () => {
          j_button.css("opacity", $.convertOpacity(pm.mouseopacity));
        },
        () => {
          j_button.css("opacity", $.convertOpacity(pm.opacity));
        }
      );
    j_button.click((e) => {
      that.kag.tmp.ready_audio || that.kag.readyAudio();
      if (!this.kag.stat.is_strong_stop) return !1;
      if (button_clicked) return !1;
      button_clicked = !0;
      this.kag.cancelStrongStop();
      that.kag.trigger("click-tag-clickable", e);
      this.kag.ftag.startTag("cm", { next: "false" });
      this.kag.ftag.startTag("jump", pm);
    });
  },
};
tyrano.plugin.kag.tag.glyph = {
  pm: {
    line: "nextpage.gif",
    layer: "message0",
    fix: "false",
    left: "0",
    top: "0",
    name: "",
    folder: "tyrano/images/system",
    width: "",
    height: "",
    anim: "",
    time: "",
    figure: "",
    color: "0xFFFFFF",
    html: "",
    marginl: "3",
    marginb: "0",
    keyframe: "",
    easing: "",
    count: "",
    delay: "",
    derection: "",
    mode: "",
    koma_anim: "",
    koma_count: "",
    koma_width: "",
    koma_anim_time: "1000",
    target: "",
  },
  start: function (pm) {
    const fix = "true" === pm.fix;
    let j_fix_glyph,
      is_fix_glyph_displayed = !1;
    switch (pm.target) {
      default:
      case "":
        j_fix_glyph = $(".glyph_image");
        break;
      case "skip":
        j_fix_glyph = $("#mode_glyph_skip");
        break;
      case "auto":
        fix && (j_fix_glyph = $("#mode_glyph_auto"));
    }
    if (j_fix_glyph && j_fix_glyph.length) {
      is_fix_glyph_displayed = j_fix_glyph.isDisplayed();
      j_fix_glyph.remove();
    }
    pm.figure
      ? (pm.type = "figure")
      : pm.html
      ? (pm.type = "html")
      : pm.koma_anim
      ? (pm.type = "koma_anim")
      : (pm.type = "image");
    pm.keyframe && (pm.anim = "");
    const glyph_key = this.kag.ftag.getGlyphKey(pm.target, fix);
    this.kag.stat[glyph_key] = $.extend({}, pm);
    if (!pm.target) {
      this.kag.stat.path_glyph = pm.line;
      this.kag.stat.flag_glyph = pm.fix;
    }
    if (fix) {
      const j_next = this.kag.ftag.createNextImg(pm.target);
      j_next.setStyleMap({
        position: "absolute",
        "z-index": "9998",
        top: pm.top + "px",
        left: pm.left + "px",
        display: "none",
      });
      this.kag.layer.getLayer(pm.layer).append(j_next);
      is_fix_glyph_displayed && j_next.show();
    }
    pm.koma_anim
      ? this.kag.preload($.parseStorage(pm.koma_anim, pm.folder), (img) => {
          if (img) {
            pm.image_width = img.naturalWidth;
            pm.image_height = img.naturalHeight;
            pm.koma_height = pm.image_height;
            if (pm.koma_count) {
              pm.koma_count = parseInt(pm.koma_count);
              pm.koma_width = Math.round(pm.image_width / pm.koma_count);
            }
            if (pm.koma_width) {
              pm.koma_width = parseInt(pm.koma_width);
              pm.koma_count = Math.round(pm.image_width / pm.koma_width);
            }
            pm.scale_x = 1;
            pm.scale_y = 1;
            if (pm.width && !pm.height) {
              pm.scale_x = parseInt(pm.width) / pm.koma_width;
              pm.scale_y = pm.scale_x;
            } else if (!pm.width && pm.height) {
              pm.scale_y = parseInt(pm.height) / pm.koma_height;
              pm.scale_x = pm.scale_y;
            } else if (pm.width && pm.height) {
              pm.scale_x = parseInt(pm.width) / pm.koma_width;
              pm.scale_y = parseInt(pm.height) / pm.koma_height;
            }
            pm.image_width = parseInt(pm.image_width * pm.scale_x);
            pm.image_height = parseInt(pm.image_height * pm.scale_x);
            pm.koma_width = parseInt(pm.koma_width * pm.scale_x);
            pm.koma_height = parseInt(pm.koma_height * pm.scale_x);
            this.kag.stat[glyph_key] = $.extend({}, pm);
            this.nextOrder(pm);
          } else this.nextOrder(pm);
        })
      : this.nextOrder(pm);
  },
  nextOrder(pm) {
    "false" !== pm.next && this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.glyph_skip = {
  start: function (pm) {
    if ("true" !== pm.delete)
      if (pm.use) {
        $("#mode_glyph_skip").remove();
        const j_glyph = $("." + pm.use).eq(0);
        console.error(j_glyph);
        if (j_glyph.length) {
          j_glyph.attr("id", "mode_glyph_skip");
          this.kag.stat.is_skip ? j_glyph.show() : j_glyph.hide();
        }
        this.kag.ftag.nextOrder();
      } else {
        pm.target = "skip";
        pm.fix = "true";
        this.kag.ftag.startTag("glyph", pm);
      }
    else {
      $("#mode_glyph_skip").remove();
      delete this.kag.stat.glyph_auto_pm;
      this.kag.ftag.nextOrder();
    }
  },
};
tyrano.plugin.kag.tag.glyph_auto = {
  start: function (pm) {
    if ("true" !== pm.delete)
      if (pm.use) {
        $("#mode_glyph_auto").remove();
        const j_glyph = $("." + pm.use).eq(0);
        if (j_glyph.length) {
          j_glyph.attr("id", "mode_glyph_auto");
          this.kag.stat.is_auto ? j_glyph.show() : j_glyph.hide();
        }
        this.kag.ftag.nextOrder();
      } else {
        pm.target = "auto";
        this.kag.ftag.startTag("glyph", pm);
      }
    else {
      if ("true" === pm.fix) {
        $("#mode_glyph_auto").remove();
        delete this.kag.stat.glyph_auto_pm;
      } else delete this.kag.stat.glyph_auto_next_pm;
      this.kag.ftag.nextOrder();
    }
  },
};
tyrano.plugin.kag.tag.trans = {
  vital: ["time", "layer"],
  pm: { layer: "base", method: "fadeIn", children: !1, time: 1500 },
  start: function (pm) {
    this.kag.ftag.hideNextImg();
    this.kag.stat.is_trans = !0;
    var that = this;
    $.countObj(this.kag.layer.map_layer_fore);
    "false" == pm.children && 0;
    var map_layer_fore = $.cloneObject(this.kag.layer.map_layer_fore),
      map_layer_back = $.cloneObject(this.kag.layer.map_layer_back);
    for (let key in map_layer_fore)
      (1 != pm.children && key !== pm.layer) ||
        (function () {
          var _key = key,
            layer_back = (map_layer_fore[_key], map_layer_back[_key]);
          if (
            -1 != _key.indexOf("message") &&
            "false" == layer_back.attr("l_visible")
          ) {
            0;
            that.kag.layer.forelay(_key);
          } else
            $.trans(
              pm.method,
              layer_back,
              parseInt(pm.time),
              "show",
              function () {
                0;
                that.kag.layer.forelay(_key);
                that.kag.ftag.completeTrans();
                that.kag.ftag.hideNextImg();
              }
            );
        })();
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.bg = {
  vital: ["storage"],
  pm: {
    storage: "",
    method: "crossfade",
    wait: "true",
    time: 3e3,
    cross: "false",
    position: "",
  },
  start: function (pm) {
    this.kag.ftag.hideNextImg();
    var that = this;
    0 == pm.time && (pm.wait = "false");
    var storage_url = "./data/bgimage/" + pm.storage;
    $.isHTTP(pm.storage) && (storage_url = pm.storage);
    this.kag.preload(storage_url, function () {
      var j_old_bg = that.kag.layer.getLayer("base", "fore"),
        j_new_bg = j_old_bg.clone(!1);
      j_new_bg.css("background-image", "url(" + storage_url + ")");
      j_new_bg.css("display", "none");
      if ("" != pm.position) {
        j_new_bg.css("background-size", "cover");
        j_new_bg.css("background-position", pm.position);
      }
      j_old_bg.after(j_new_bg);
      that.kag.ftag.hideNextImg();
      that.kag.layer.updateLayer("base", "fore", j_new_bg);
      "true" == pm.wait && that.kag.weaklyStop();
      pm.time = that.kag.cutTimeWithSkip(pm.time);
      "true" == pm.cross &&
        $.trans(pm.method, j_old_bg, parseInt(pm.time), "hide", function () {
          j_old_bg.remove();
        });
      $.trans(pm.method, j_new_bg, parseInt(pm.time), "show", function () {
        j_new_bg.css("opacity", 1);
        "false" == pm.cross && j_old_bg.remove();
        if ("true" == pm.wait) {
          that.kag.cancelWeakStop();
          that.kag.ftag.nextOrder();
        }
      });
    });
    "false" == pm.wait && this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.bg2 = {
  vital: ["storage"],
  pm: {
    name: "",
    storage: "",
    method: "crossfade",
    wait: "true",
    time: 3e3,
    width: "",
    height: "",
    left: "",
    top: "",
    cross: "false",
  },
  start: function (pm) {
    this.kag.ftag.hideNextImg();
    var that = this;
    0 == pm.time && (pm.wait = "false");
    var storage_url = "./data/bgimage/" + pm.storage;
    $.isHTTP(pm.storage) && (storage_url = pm.storage);
    this.kag.preload(storage_url, function () {
      var j_old_bg = that.kag.layer.getLayer("base", "fore"),
        j_new_bg = j_old_bg.clone(!1),
        j_bg_img = $("<img />");
      j_bg_img.css("position", "absolute");
      var scWidth = parseInt(that.kag.config.scWidth),
        scHeight = parseInt(that.kag.config.scHeight),
        left = 0,
        top = 0;
      "" != pm.width && (scWidth = parseInt(pm.width));
      "" != pm.height && (scHeight = parseInt(pm.height));
      "" != pm.left && (left = parseInt(pm.left));
      "" != pm.top && (top = parseInt(pm.top));
      j_bg_img.css({ width: scWidth, height: scHeight, left: left, top: top });
      j_bg_img.attr("src", storage_url);
      $.setName(j_new_bg, pm.name);
      j_new_bg.find("img").remove();
      j_new_bg.append(j_bg_img);
      j_new_bg.css("display", "none");
      j_old_bg.after(j_new_bg);
      that.kag.ftag.hideNextImg();
      that.kag.layer.updateLayer("base", "fore", j_new_bg);
      "true" == pm.wait && that.kag.weaklyStop();
      pm.time = that.kag.cutTimeWithSkip(pm.time);
      "true" == pm.cross &&
        $.trans(pm.method, j_old_bg, parseInt(pm.time), "hide", function () {
          j_old_bg.remove();
        });
      $.trans(pm.method, j_new_bg, parseInt(pm.time), "show", function () {
        j_new_bg.css("opacity", 1);
        "false" == pm.cross && j_old_bg.remove();
        if ("true" == pm.wait) {
          that.kag.cancelWeakStop();
          that.kag.ftag.nextOrder();
        }
      });
    });
    "false" == pm.wait && this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.layermode = {
  vital: [],
  pm: {
    name: "",
    graphic: "",
    color: "",
    mode: "multiply",
    folder: "",
    opacity: "",
    time: "500",
    wait: "true",
  },
  start: function (pm) {
    this.kag.ftag.hideNextImg();
    var that = this,
      blend_layer = null;
    blend_layer = $(
      "<div class='layer_blend_mode blendlayer' style='display:none;position:absolute;width:100%;height:100%;z-index:99'></div>"
    );
    "" != pm.name && blend_layer.addClass("layer_blend_" + pm.name);
    "" != pm.color &&
      blend_layer.css("background-color", $.convertColor(pm.color));
    "" != pm.opacity &&
      blend_layer.css("opacity", $.convertOpacity(pm.opacity));
    let folder;
    folder = "" != pm.folder ? pm.folder : "image";
    var storage_url = "";
    if ("" != pm.graphic) {
      storage_url = "./data/" + folder + "/" + pm.graphic;
      blend_layer.css("background-image", "url(" + storage_url + ")");
    }
    blend_layer.css("mix-blend-mode", pm.mode);
    $("#tyrano_base").append(blend_layer);
    "" != pm.graphic
      ? this.kag.preload(storage_url, function () {
          blend_layer.stop(!0, !0).fadeIn(parseInt(pm.time), function () {
            "true" == pm.wait && that.kag.ftag.nextOrder();
          });
        })
      : blend_layer.stop(!0, !0).fadeIn(parseInt(pm.time), function () {
          "true" == pm.wait && that.kag.ftag.nextOrder();
        });
    "false" == pm.wait && this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.layermode_movie = {
  vital: ["video"],
  pm: {
    name: "",
    mode: "multiply",
    opacity: "",
    time: "500",
    wait: "false",
    video: "",
    volume: "",
    loop: "true",
    mute: "false",
    speed: "",
    fit: "true",
    width: "",
    height: "",
    top: "",
    left: "",
    stop: "false",
  },
  start: function (pm) {
    this.kag.ftag.hideNextImg();
    var that = this,
      blend_layer = null,
      video = (blend_layer = $(
        "<video class='layer_blend_mode blendlayer blendvideo' data-video-name='" +
          pm.name +
          "' data-video-pm='' style='display:none;position:absolute;width:100%;height:100%;z-index:99' ></video>"
      )).get(0),
      url = "./data/video/" + pm.video;
    video.src = url;
    "" != pm.volume
      ? (video.volume = parseFloat(parseInt(pm.volume) / 100))
      : (video.volume = 0);
    "" != pm.speed && (video.defaultPlaybackRate = parseFloat(pm.speed));
    video.style.backgroundColor = "black";
    video.style.position = "absolute";
    video.style.top = "0px";
    video.style.left = "0px";
    video.style.width = "auto";
    video.style.height = "auto";
    "" != pm.width && (video.style.width = pm.width + "px");
    "" != pm.height
      ? (video.style.height = pm.height + "px")
      : "false" == pm.fit
      ? (video.style.height = "100%")
      : (video.style.height = "");
    "" != pm.left && (video.style.left = pm.left + "px");
    "" != pm.top && (video.style.top = pm.top + "px");
    video.style.minHeight = "100%";
    video.style.minWidth = "100%";
    video.style.backgroundSize = "cover";
    video.autoplay = !0;
    video.autobuffer = !0;
    video.setAttribute("playsinline", "1");
    "true" == pm.mute && (video.muted = !0);
    "true" == pm.loop ? (video.loop = !0) : (video.loop = !1);
    var j_video = $(video);
    video.addEventListener("ended", function (e) {
      "false" == pm.loop && j_video.remove();
      "true" == pm.wait && that.kag.ftag.nextOrder();
    });
    j_video.attr("data-video-pm", JSON.stringify(pm));
    j_video.hide();
    video.load();
    video.play();
    blend_layer = j_video;
    "" != pm.name && blend_layer.addClass("layer_blend_" + pm.name);
    "" != pm.opacity &&
      blend_layer.css("opacity", $.convertOpacity(pm.opacity));
    blend_layer.css("mix-blend-mode", pm.mode);
    $("#tyrano_base").append(blend_layer);
    blend_layer.stop(!0, !0).fadeIn(parseInt(pm.time), function () {
      "true" == pm.wait &&
        "true" == pm.loop &&
        "true" != pm.stop &&
        that.kag.ftag.nextOrder();
    });
    "false" == pm.wait && "true" != pm.stop && this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.free_layermode = {
  vital: [],
  pm: { name: "", time: "500", wait: "true" },
  start: function (pm) {
    this.kag.ftag.hideNextImg();
    var that = this,
      blend_layer = {},
      cnt = (blend_layer =
        "" != pm.name ? $(".layer_blend_" + pm.name) : $(".blendlayer")).length,
      n = 0;
    if (0 != cnt) {
      blend_layer.each(function () {
        var blend_obj = $(this);
        blend_obj.stop(!0, !0).fadeOut(parseInt(pm.time), function () {
          blend_obj.remove();
          n++;
          "true" == pm.wait && cnt == n && that.kag.ftag.nextOrder();
        });
      });
      "false" == pm.wait && this.kag.ftag.nextOrder();
    } else that.kag.ftag.nextOrder();
  },
};
