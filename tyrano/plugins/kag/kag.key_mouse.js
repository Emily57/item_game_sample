tyrano.plugin.kag.key_mouse = {
  kag: {},
  keyconfig: {},
  map_key: {},
  map_mouse: {},
  map_ges: {},
  map_pad: {},
  is_swipe: !1,
  hold_timer_id: 0,
  previous_touchend_time: 0,
  is_keydown: !1,
  prev_point: { x: 0, y: 0 },
  move_point: 0,
  is_holding_skip: !1,
  touch_mash_count: 0,
  touch_position: "",
  MOVEMENT_CANCEL_HOLD: 100,
  HOLD_TIMEOUT: 1e3,
  TOUCH_MASH_MAX_TIME: 200,
  TOUCH_EDGE_WIDTH_RATIO: 0.3,
  PREVENT_DOUBLE_TOUCH_TIME: 350,
  VMOUSE_TICK_RATE: 1,
  GAMEPAD_TICK_RATE: 20,
  KEYBOARD_TICK_RATE: 20,
  HOLD_MASH_DELAY: 0,
  HOLD_MASH_INTERVAL: 20,
  DEFAULT_VMOUSE_MOVEMENT: 15,
  MOUSE_BUTTON_NAMES: ["", "center", "right", "prev", "next"],
  init() {
    this.util.parent = this;
    this.util.refer(this.util);
    if (void 0 === window.__tyrano_key_config) {
      this.kag.warning("undefined_keyconfig", !1);
      window.__tyrano_key_config = this.default_keyconfig;
    }
    this.keyconfig = window.__tyrano_key_config || {};
    this.map_key = this.keyconfig.key || {};
    this.map_mouse = this.keyconfig.mouse || {};
    this.map_ges = this.keyconfig.gesture || {};
    this.map_pad = this.keyconfig.gamepad || {
      button: {},
      stick_digital: {},
      stick: {},
    };
    Object.keys(this.keyconfig).forEach((key) => {
      ["key", "mouse", "gesture", "gamepad"].includes(key) ||
        (this[key] = this.keyconfig[key]);
    });
    this.j_event_layer = $(".layer_event_click");
    if ("pc" !== $.userenv()) {
      let mash_right_max = 0,
        mash_left_max = 0;
      Object.keys(this.map_ges).forEach((key) => {
        if (0 === key.indexOf("mash_right_") && this.map_ges[key]) {
          const num = parseInt(key.replace("mash_right_", ""));
          num > mash_right_max && (mash_right_max = num);
        } else if (0 === key.indexOf("mash_left_") && this.map_ges[key]) {
          const num = parseInt(key.replace("mash_left_", ""));
          num > mash_left_max && (mash_left_max = num);
        }
      });
      $([document, this.j_event_layer[0]]).swipe({
        swipe: (
          event,
          direction,
          distance,
          duration,
          fingerCount,
          fingerData
        ) => {
          if (this.util.isRemodalDisplayed()) return;
          clearTimeout(this.hold_timer_id);
          this.is_swipe = !0;
          const action_key = "swipe_" + direction + "_" + fingerCount;
          let action = this.map_ges[action_key];
          "object" == typeof action &&
            "action" in action &&
            (action = action.action);
          this.doAction(action, event);
          event.stopPropagation();
          event.preventDefault();
          return !1;
        },
        fingers: "all",
      });
      this.j_event_layer[0].addEventListener(
        "touchstart",
        (e) => {
          if (e.changedTouches && e.changedTouches[0]) {
            const x = e.changedTouches[0].pageX,
              y = e.changedTouches[0].pageY;
            this.prev_point.x = x;
            this.prev_point.y = y;
            this.move_point = 0;
          }
          this.hold_timer_id = setTimeout(() => {
            let action = this.map_ges.hold;
            "object" == typeof action &&
              "action" in action &&
              (action = action.action);
            this.doAction(action, e) && (this.is_swipe = !0);
          }, this.HOLD_TIMEOUT);
        },
        { capture: !1 }
      );
      document.addEventListener(
        "touchmove",
        (e) => {
          if (
            !this.util.isRemodalDisplayed() &&
            e.changedTouches &&
            e.changedTouches[0]
          ) {
            const x = e.changedTouches[0].pageX,
              y = e.changedTouches[0].pageY,
              dx = Math.abs(x - this.prev_point.x),
              dy = Math.abs(y - this.prev_point.y);
            this.move_point += dx + dy;
            this.move_point > this.MOVEMENT_CANCEL_HOLD &&
              clearTimeout(this.hold_timer_id);
            this.prev_point.x = x;
            this.prev_point.y = y;
          }
        },
        { capture: !1 }
      );
      this.j_event_layer[0].addEventListener(
        "touchend",
        (e) => {
          clearTimeout(this.hold_timer_id);
          clearTimeout(this.touch_mash_timer_id);
          if (this.util.isRemodalDisplayed()) return;
          const path = e.path || (e.composedPath && e.composedPath());
          (!path ||
            (path && 0 === $(path).filter(".event-setting-element").length)) &&
            this.util.clearSkipAndAuto();
          const now = this.util.getTime(),
            touch_interval = now - this.previous_touchend_time;
          let pos = "";
          const view_width = $.getViewPort().width,
            edge_width = view_width * this.TOUCH_EDGE_WIDTH_RATIO;
          if (e.changedTouches && e.changedTouches[0]) {
            const x = e.changedTouches[0].pageX;
            pos =
              x < edge_width
                ? "left"
                : x > view_width - edge_width
                ? "right"
                : "";
          }
          let action = this.map_ges.hold;
          "object" == typeof action &&
            "action" in action &&
            (action = action.action);
          const tag_array = this.util.parseTagArray(action);
          for (const tag of tag_array)
            if (tag && "holdskip" === tag.name && this.is_holding_skip) {
              this.util.clearHoldingSkip();
              break;
            }
          if (
            pos === this.touch_position &&
            touch_interval < this.TOUCH_MASH_MAX_TIME
          ) {
            this.touch_mash_count++;
            const event_type = `mash_${pos}_${this.touch_mash_count}`,
              max = "right" === pos ? mash_right_max : mash_left_max,
              action = this.map_ges[event_type];
            action &&
              (this.touch_mash_count >= max
                ? action && this.doAction(action, e)
                : (this.touch_mash_timer_id = setTimeout(() => {
                    this.touch_mash_count = 0;
                    action && this.doAction(action, e);
                  }, this.TOUCH_MASH_MAX_TIME)));
          } else this.touch_mash_count = 1;
          touch_interval < this.PREVENT_DOUBLE_TOUCH_TIME && e.preventDefault();
          this.previous_touchend_time = now;
          this.touch_position = pos;
        },
        { capture: !1, passive: !1 }
      );
    }
    this.j_event_layer.click((e) => {
      e.originalEvent && e.originalEvent.isTrusted;
      this.kag.tmp.ready_audio || this.kag.readyAudio();
      this.kag.trigger("click-event", e);
      if (!this.util.canClick()) return !1;
      if (this.is_swipe) {
        this.is_swipe = !1;
        return !1;
      }
      if (this.kag.stat.is_hide_message) {
        this.kag.layer.showMessageLayers();
        return !1;
      }
      if (this.kag.stat.is_adding_text) {
        this.kag.stat.is_click_text = !0;
        return !1;
      }
      if (this.kag.stat.is_click_text) return !1;
      if (this.kag.stat.is_stop) return !1;
      this.kag.stat.fuki.active && this.kag.layer.hideMessageLayers();
      this.kag.ftag.hideNextImg();
      this.kag.trigger("click-next", e);
      this.kag.ftag.nextOrder();
    });
    this.mouse.init(this);
    this.keyboard.init(this);
    "true" === this.kag.config.useGamepad && this.gamepad.init(this);
    this.vmouse.init(this);
  },
  doAction(action, event) {
    if (!action) return !1;
    if (Array.isArray(action)) return this.doActionArray(action, event);
    const type = typeof action;
    if ("function" === type) return this.doActionFunction(action, event);
    if ("string" === type) {
      if (action.includes(",")) {
        const action_array = action.split(",").map((item) => item.trim());
        return this.doActionArray(action_array, event);
      }
      return this.doActionString(action, event);
    }
    return (
      "object" === type && "name" in action && this.doActionTag(action, event)
    );
  },
  doActionArray(action_array, event) {
    for (const action of action_array) {
      if (this.doAction(action, event)) return !0;
    }
    return !1;
  },
  doActionFunction(action_func, event) {
    return !!this.util.isKeyConfigEnabled() && action_func(event);
  },
  doActionString(action_string, event) {
    const tag = this.kag.parser.makeTag(action_string, 0);
    return this.doActionTag(tag, event);
  },
  doActionTag(action_tag, event) {
    const name = action_tag.name,
      pm = action_tag.pm || {};
    if (!name) return !1;
    if (!this.util.isKeyConfigEnabled() && void 0 === pm["-a"]) return !1;
    const is_next = "ok" === name || "next" === name;
    pm.is_gamepad = 0 === event.type.indexOf("gamepad");
    pm.is_keyboard = 0 === event.type.indexOf("key");
    is_next &&
      (pm.is_gamepad
        ? (this.gamepad.last_used_next_gamepad_index =
            event.detail.gamepad_index)
        : (this.gamepad.last_used_next_gamepad_index = -1));
    if (event.detail && event.detail.is_hold_mash && void 0 === pm["-h"])
      return !1;
    if ("function" == typeof this[name]) {
      if (this[name](pm)) {
        const type_focus = name.includes("focus"),
          type_ok = "ok" !== name;
        type_focus ||
          type_ok ||
          this.util.unfocus(void 0, name.includes("vmouse"));
        return !0;
      }
    }
    return !1;
  },
  test() {
    alert("Hello!");
    return !0;
  },
  default: () => !1,
  next() {
    if (this.util.canClick()) {
      this.util.clearSkipAndAuto();
      $(".layer_event_click").trigger("click");
      return !0;
    }
    return !1;
  },
  showmenu() {
    if (this.util.canShowMenu()) {
      $(".menu_close").length > 0 && "none" != $(".layer_menu").css("display")
        ? $(".menu_close").click()
        : $(".button_menu").click();
      return !0;
    }
    return !1;
  },
  // hidemessage() {
  //   if (this.util.canShowMenu()) {
  //     $(".menu_close").length > 0 && "none" != $(".layer_menu").css("display")
  //       ? $(".menu_close").click()
  //       : this.kag.stat.is_strong_stop ||
  //         (this.kag.stat.is_hide_message
  //           ? this.kag.layer.showMessageLayers()
  //           : this.kag.ftag.startTag("hidemessage"));
  //     return !0;
  //   }
  //   return !1;
  // },
  hidemessage() {
    if (this.util.canShowMenu()) {
      $(".menu_close").length > 0 && "none" != $(".layer_menu").css("display")
        ? $(".menu_close").click()
        : this.kag.stat.is_strong_stop ||
          (this.kag.stat.is_hide_message
            ? (this.kag.layer.showMessageLayers(), this.showMessageImage())
            : (this.kag.ftag.startTag("hidemessage"), this.hideMessageImage()));
      return !0;
    }
    return !1;
  },
  // massage_base 画像の表示/非表示の切り替え
  hideMessageImage() {
    const messageBase = document.getElementsByClassName("message_base")[0];
    if (messageBase) {
      messageBase.style.display = "none";
    }
  },
  showMessageImage() {
    const messageBase = document.getElementsByClassName("message_base")[0];
    if (messageBase) {
      messageBase.style.display = "block";
    }
  },
  save() {
    return this._role("save");
  },
  load() {
    return this._role("load");
  },
  menu() {
    return this.util.isMenuDisplayed() ? this.close() : this._role("menu");
  },
  title() {
    return this._role("title");
  },
  holdskip() {
    if (this.util.canClick()) {
      this.is_holding_skip = !0;
      return this._role("skip", { hold: !0 });
    }
    this.kag.setSkip(!0, { hold: !0 });
    return !0;
  },
  skip() {
    if (this.util.canClick()) return this._role("skip");
    this.kag.setSkip(!this.kag.stat.is_skip);
    return !0;
  },
  backlog() {
    return (
      !!this.util.canShowMenu() &&
      !this.util.isMenuDisplayed() &&
      this._role("backlog")
    );
  },
  fullscreen() {
    return this._role("fullscreen");
  },
  qsave() {
    return this._role("quicksave");
  },
  qload() {
    return this._role("quickload");
  },
  auto() {
    return this._role("auto");
  },
  sleepgame(pm) {
    if (this.kag.tmp.sleep_game) return !1;
    if (!this.util.canJumpScenario()) return !1;
    this.kag.ftag.startTag("sleepgame", pm);
    return !0;
  },
  close() {
    if (this.util.isMenuDisplayed()) {
      $(".menu_close").click();
      return !0;
    }
    return !1;
  },
  ok(pm) {
    this.util.clearSkipAndAuto();
    if (this.vmouse.is_visible) {
      this.vmouse.leftdown();
      this.vmouse.hideWithTimeout();
      return !0;
    }
    const j_focus = this.util.findFocused();
    if (j_focus.length > 0) {
      this.vmouse.trigger("click", j_focus[0]);
      return !0;
    }
    return this.next();
  },
  cancel() {
    this.kag.key_mouse.vmouse.hide();
    if (this.util.findFocused().length > 0) {
      this.util.unfocus();
      return !0;
    }
    if (this.util.isRemodalDisplayed()) {
      const j_cancel = $(".remodal").find("#remodal-cancel");
      if ("none" !== j_cancel.css("display")) {
        j_cancel.click();
        return !0;
      }
    }
    if (this.util.isMenuDisplayed()) {
      $(".menu_close").click();
      return !0;
    }
    if (this.kag.stat.is_skip) {
      this.kag.setSkip(!1);
      return !0;
    }
    return this.util.clearSkipAndAuto();
  },
  scroll_up() {
    const j_button = $(".button_arrow_up");
    if (j_button.length > 0) {
      j_button.click();
      return !0;
    }
    return !1;
  },
  scroll_down() {
    const j_button = $(".button_arrow_down");
    if (j_button.length > 0) {
      j_button.click();
      return !0;
    }
    return !1;
  },
  focus_index(pm) {
    const index = pm.index ? parseInt(pm.index) : 1;
    this.util.unfocus();
    const j_focusable = this.util.findFocusable();
    if (0 === j_focusable.length) return !1;
    const j_target = j_focusable.eq(index - 1);
    if (!j_target[0]) return !1;
    this.util.focus(j_target);
    return !0;
  },
  focus_order(order = "next") {
    const {
      j_focusable: j_focusable,
      j_focused: j_focused,
      j_unfocused: j_unfocused,
    } = this.util.getFocusableInfo();
    console.log("!");
    console.log({
      j_focusable: j_focusable,
      j_focused: j_focused,
      j_unfocused: j_unfocused,
    });
    if (0 === j_focusable.length) return !1;
    if (0 === j_unfocused.length) return !1;
    if (1 === j_unfocused.length) {
      this.util.focus(j_unfocused);
      return !0;
    }
    if (0 === j_focused.length) {
      let index = 0;
      this.util.isCloseButton(j_focusable.eq(index)) && index++;
      this.util.focus(j_focusable.eq(index));
      return !0;
    }
    const next_index =
      (j_focusable.index(j_focused) +
        ("next" === order ? 1 : -1) +
        j_focusable.length) %
      j_focusable.length;
    this.util.focus(j_focusable.eq(next_index));
    return !0;
  },
  focus_next() {
    return this.focus_order("next");
  },
  focus_prev() {
    return this.focus_order("prev");
  },
  focus_dir(dir = "down") {
    const {
      j_focusable: j_focusable,
      j_focused: j_focused,
      j_unfocused: j_unfocused,
    } = this.util.getFocusableInfo();
    if (0 === j_focusable.length) return !1;
    if (0 === j_unfocused.length) return !1;
    if (1 === j_unfocused.length) {
      this.util.focus(j_unfocused);
      return !0;
    }
    const pos_list = [];
    let focused_pos = null;
    j_focusable.each((i, elm) => {
      const j_elm = $(elm),
        offset = j_elm.offset(),
        width = j_elm.width(),
        height = j_elm.height(),
        left = offset.left,
        top = offset.top,
        x = left + width / 2,
        y = top + height / 2,
        pos = {
          x: x,
          x1: x - width / 4,
          x2: x + width / 4,
          y: y,
          y1: y - height / 4,
          y2: y + height / 4,
          left: left,
          top: top,
          right: left + width,
          bottom: top + height,
          j_elm: j_elm,
        };
      pos_list.push(pos);
      j_focused[0] === elm && (focused_pos = pos);
    });
    const is_plus = "down" === dir || "right" === dir;
    let compare;
    switch ("up" === dir || "down" === dir) {
      default:
      case !0:
        compare = (a, b) => a.top < b.top;
        break;
      case !1:
        compare = (a, b) => a.left < b.left;
    }
    pos_list.sort((a, b) => (compare(a, b) ? -1 : 1));
    if (!focused_pos) {
      let index;
      switch (this.kag.config.firstKeyFocusType) {
        default:
        case "first":
          index = 0;
          break;
        case "dir":
          index = is_plus ? pos_list.length - 1 : 0;
          break;
        case "dir-2":
          index = 2 === pos_list.length && is_plus ? pos_list.length - 1 : 0;
      }
      0 === index && this.util.isCloseButton(pos_list[index].j_elm) && index++;
      this.util.focus(pos_list[index].j_elm);
      return !0;
    }
    this.focus_dir_angle(dir, pos_list, focused_pos);
    return !0;
  },
  focus_dir_column(dir, pos_list, focused_pos) {
    const is_dir_vertical = "up" === dir || "down" === dir,
      is_plus = "down" === dir || "right" === dir,
      _width = is_dir_vertical ? "width" : "height",
      original_width = this.kag.tmp.screen_info[`original_${_width}`],
      hash_width = parseInt(original_width / 10),
      _x = is_dir_vertical ? "x" : "y",
      new_pos_column = [];
    for (let i = 0; i <= 11; i++) new_pos_column[i] = [];
    pos_list.forEach((this_pos) => {
      let index;
      index =
        this_pos[_x] < 0
          ? 0
          : Math.min(11, Math.ceil(this_pos[_x] / hash_width));
      new_pos_column[index].push(this_pos);
    });
    const new_pos_list = new_pos_column.reduce(
        (prev, item) => prev.concat(item),
        []
      ),
      next_index =
        (new_pos_list.indexOf(focused_pos) +
          (is_plus ? 1 : -1) +
          new_pos_list.length) %
        new_pos_list.length;
    this.util.focus(new_pos_list[next_index].j_elm);
  },
  focus_dir_beam(dir, pos_list, focused_pos) {
    const is_dir_vertical = "up" === dir || "down" === dir,
      is_plus = "down" === dir || "right" === dir;
    let search_width = 100,
      searched_pos_list = [];
    for (;;) {
      const _x = is_dir_vertical ? "x" : "y",
        _left = is_dir_vertical ? "left" : "top",
        _right = is_dir_vertical ? "right" : "bottom",
        search_left = focused_pos[_x] - search_width,
        search_right = focused_pos[_x] + search_width;
      searched_pos_list = [];
      pos_list.forEach((this_pos) => {
        this_pos[_right] < search_left ||
          search_right < this_pos[_left] ||
          searched_pos_list.push(this_pos);
      });
      if (searched_pos_list.length > 1) break;
      search_width += 100;
    }
    const next_index =
      (searched_pos_list.indexOf(focused_pos) +
        (is_plus ? 1 : -1) +
        searched_pos_list.length) %
      searched_pos_list.length;
    this.util.focus(searched_pos_list[next_index].j_elm);
  },
  focus_dir_angle(dir, pos_list, focused_pos) {
    const deg_180 = Math.PI,
      deg_360 = 2 * deg_180,
      deg_90 = deg_180 / 2,
      deg_45 = deg_180 / 4,
      deg_30 = deg_180 / 6,
      deg_10 = deg_180 / 18,
      dir_rad = ["right", "up", "left", "down"].indexOf(dir) * deg_90,
      get_radian = (p1, p2, _x = "x") => {
        let radian = Math.atan2(p2.y - p1.y, p1[_x] - p2[_x]);
        radian < 0 && (radian += 2 * Math.PI);
        return radian;
      },
      get_distance = (p1, p2, _x = "x") =>
        Math.sqrt(Math.pow(p2.y - p1.y, 2) + Math.pow(p1[_x] - p2[_x], 2));
    pos_list.forEach((this_pos) => {
      if (this_pos === focused_pos) return;
      const rads = [
          get_radian(this_pos, focused_pos),
          get_radian(this_pos, focused_pos, "left"),
          get_radian(this_pos, focused_pos, "right"),
        ],
        ds = [
          get_distance(this_pos, focused_pos),
          get_distance(this_pos, focused_pos, "left"),
          get_distance(this_pos, focused_pos, "right"),
        ];
      this_pos.score = -1 / 0;
      this_pos.score_reverse = -1 / 0;
      rads.forEach((rad, i) => {
        const dif1 = Math.abs(dir_rad - rad),
          dif2 = Math.abs(dir_rad + deg_360 - rad),
          dif = Math.max(0.1, Math.min(dif1, dif2)),
          d = ds[i],
          score = -d * (1 + Math.pow(dif / deg_10, 1));
        if (score > this_pos.score) {
          this_pos.score = score;
          this_pos.dif_rad = dif;
        }
        let dif_reverse = dif - deg_180;
        dif_reverse = Math.abs(dif_reverse);
        dif_reverse = Math.pow(Math.max(0.1, dif_reverse), 2);
        let score_reverse = d / (dif_reverse / deg_180);
        if (score_reverse > this_pos.score_reverse) {
          this_pos.score_reverse = score_reverse;
          this_pos.dif_rad_reverse = dif_reverse;
        }
      });
    });
    let candidate_pos_list, candidate_pos_list_reverse;
    const seraches = [deg_30, deg_30 + deg_45];
    for (let i = 0; i < seraches.length; i++) {
      candidate_pos_list = [];
      candidate_pos_list_reverse = [];
      const search_width = seraches[i];
      pos_list.forEach((this_pos) => {
        if (this_pos !== focused_pos) {
          this_pos.dif_rad < search_width && candidate_pos_list.push(this_pos);
          this_pos.dif_rad_reverse < search_width &&
            candidate_pos_list_reverse.push(this_pos);
        }
      });
      if (candidate_pos_list.length > 0) break;
    }
    if (candidate_pos_list.length > 0)
      candidate_pos_list.sort((a, b) => (a.score > b.score ? -1 : 1));
    else {
      if (!(candidate_pos_list_reverse.length > 0)) return !1;
      candidate_pos_list_reverse.sort((a, b) =>
        a.score_reverse > b.score_reverse ? -1 : 1
      );
      candidate_pos_list = candidate_pos_list_reverse;
    }
    this.util.focus(candidate_pos_list[0].j_elm);
    return !0;
  },
  focus_up() {
    return this.focus_dir("up");
  },
  focus_down() {
    return this.focus_dir("down");
  },
  focus_left() {
    return this.focus_dir("left");
  },
  focus_right() {
    return this.focus_dir("right");
  },
  _role(role, options = {}) {
    const can_show_menu = this.util.canShowMenu();
    if ("skip" === role) {
      if (this.kag.stat.is_skip) {
        this.kag.setSkip(!1, options);
        return !0;
      }
      if (can_show_menu) {
        if (this.kag.stat.is_adding_text) {
          this.kag.setSkip(!0, options);
          return !0;
        }
        this.kag.ftag.startTag("skipstart", options);
        return !0;
      }
      return !1;
    }
    if (!can_show_menu) return !1;
    this.kag.setSkip(!1);
    "auto" !== role && this.kag.ftag.startTag("autostop", { next: "false" });
    const is_save =
        "save" === role ||
        "menu" === role ||
        "quicksave" === role ||
        "sleepgame" === role,
      is_active = this.kag.stat.is_adding_text || this.kag.stat.is_wait;
    if (is_save && is_active) return !1;
    switch (role) {
      case "save":
        "none" == $(".layer_menu").css("display") &&
          this.kag.menu.displaySave();
        break;
      case "load":
        "none" == $(".layer_menu").css("display") &&
          this.kag.menu.displayLoad();
        break;
      case "window":
        this.kag.layer.hideMessageLayers();
        break;
      case "title":
        if (!$(".remodal").hasClass("remodal-is-closed")) return !1;
        $.confirm(
          $.lang("go_title"),
          () => {
            location.reload();
          },
          () => {}
        );
        break;
      case "menu":
        this.kag.menu.showMenu();
        break;
      case "backlog":
        this.kag.menu.displayLog();
        break;
      case "fullscreen":
        this.kag.menu.screenFull();
        break;
      case "quicksave":
        this.kag.menu.setQuickSave();
        break;
      case "quickload":
        this.kag.menu.loadQuickSave();
        break;
      case "auto":
        this.kag.stat.is_auto
          ? this.kag.ftag.startTag("autostop", { next: "false" })
          : this.kag.ftag.startTag("autostart", {});
    }
    return !0;
  },
  vmouse_dir(pm, dir) {
    const movement = parseInt(pm.movement) || this.DEFAULT_VMOUSE_MOVEMENT,
      xy = this.dir_xy[dir],
      speed = this.keyboard.isPressed("Control")
        ? 4
        : this.keyboard.isPressed("Shift")
        ? 2
        : this.keyboard.isPressed("Alt")
        ? 0.2
        : 1,
      x = xy.x * movement * speed,
      y = xy.y * movement * speed;
    this.vmouse.move(x, y, this.keyboard.delay_update);
    return !0;
  },
  dir_xy: {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
  },
  vmouse_up(pm) {
    return this.vmouse_dir(pm, "up");
  },
  vmouse_down(pm) {
    return this.vmouse_dir(pm, "down");
  },
  vmouse_left(pm) {
    return this.vmouse_dir(pm, "left");
  },
  vmouse_right(pm) {
    return this.vmouse_dir(pm, "right");
  },
  vmouse_wheelup() {
    this.vmouse.wheelup();
    return !0;
  },
  vmouse_wheeldown() {
    this.vmouse.wheeldown();
    return !0;
  },
  util: {
    parent: null,
    refer(any_obj) {
      const that = this.parent;
      any_obj.parent = that;
      any_obj.kag = that.kag;
      any_obj.util = that.util;
      any_obj.keyboard = that.keyboard;
      any_obj.mouse = that.mouse;
      any_obj.vmouse = that.vmouse;
      any_obj.gamepad = that.gamepad;
    },
    canClick() {
      return !(
        "none" === this.kag.layer.layer_event.css("display") ||
        this.isMenuDisplayed()
      );
    },
    clearHoldingSkip() {
      this.kag.setSkip(!1, { hold: !0 });
      this.parent.is_holding_skip = !1;
    },
    clearSkipAndAuto() {
      if (this.kag.stat.is_skip) {
        this.kag.setSkip(!1);
        return !0;
      }
      if (this.kag.stat.is_auto && "true" === this.kag.config.autoClickStop) {
        this.kag.ftag.startTag("autostop", { next: "false" });
        return !0;
      }
      return !1;
    },
    canShowMenu() {
      return (
        !(
          "none" === this.kag.layer.layer_event.css("display") &&
          !this.kag.stat.is_strong_stop
        ) && 1 != this.kag.stat.is_wait
      );
    },
    canJumpScenario() {
      const can_show_menu = this.canShowMenu(),
        is_game_active = this.kag.stat.is_adding_text || this.kag.stat.is_wait;
      return can_show_menu && !is_game_active;
    },
    getWheelEventType: () =>
      "onwheel" in document
        ? "wheel"
        : "onmousewheel" in document
        ? "mousewheel"
        : "DOMMouseScroll",
    remodal_wrapper: null,
    isRemodalDisplayed() {
      let j_wrapper;
      if (this.remodal_wrapper) j_wrapper = this.remodal_wrapper;
      else {
        j_wrapper = $(".remodal-wrapper");
        j_wrapper.length > 0 && (this.remodal_wrapper = j_wrapper);
      }
      return j_wrapper.hasClass("remodal-is-opened");
    },
    isMenuDisplayed: () => "none" !== $(".layer_menu").css("display"),
    focused_selector: ":focus.focus",
    findFocused() {
      return $(this.focused_selector);
    },
    isFocused(j_elm) {
      return j_elm.is(this.focused_selector);
    },
    findFocusable() {
      let j_buttons;
      j_buttons = this.isRemodalDisplayed()
        ? $(".remodal-wrapper").find("[tabindex].tyrano-focusable")
        : this.isMenuDisplayed()
        ? $(".layer_menu").find("[tabindex].tyrano-focusable")
        : $("#tyrano_base [tabindex].tyrano-focusable");
      j_buttons = j_buttons.filter(function () {
        const is_display = "none" !== $(this).css("display"),
          is_pointable = "none" !== $(this).css("pointer-events");
        return is_display && is_pointable;
      });
      if (j_buttons.length <= 1) return j_buttons;
      const arr = [];
      j_buttons.each((i, elm) => {
        elm.__i = i;
        elm.__tabindex = parseInt($(elm).attr("tabindex")) || 0;
        arr.push(elm);
      });
      arr.sort((a, b) =>
        a.__tabindex < b.__tabindex
          ? -1
          : a.__tabindex > b.__tabindex
          ? 1
          : a.__i < b.__i
          ? -1
          : 1
      );
      return $(arr);
    },
    getFocusableInfo() {
      const j_focusable = this.findFocusable();
      let j_focused = $(),
        j_unfocused = $();
      const arr = [];
      if (0 === j_focusable.length)
        return {
          j_focusable: j_focusable,
          j_focused: j_focused,
          j_unfocused: j_unfocused,
        };
      j_focusable.each((i, elm) => {
        const j_elm = $(elm);
        0 === j_focused.length && this.isFocused(j_elm)
          ? (j_focused = j_elm)
          : arr.push(elm);
      });
      j_unfocused = $(arr);
      return {
        j_focusable: j_focusable,
        j_focused: j_focused,
        j_unfocused: j_unfocused,
      };
    },
    shouldDisplayFocusCursor() {
      return "true" === this.parent.kag.config.keyFocusWithMouseCursor;
    },
    focus(j_elm) {
      j_elm.focus();
      if (this.shouldDisplayFocusCursor()) {
        const rect = j_elm[0].getBoundingClientRect(),
          half_height = rect.height / 2;
        let y = (rect.top + half_height) | 0,
          x = rect.right - half_height;
        this.parent.vmouse.place(x, y, 0);
        this.parent.vmouse.j_html.addClass("vmouse-displayed");
      } else this.parent.vmouse.hide();
    },
    unfocus(j_elm, will_move_vmouse = !1) {
      j_elm || (j_elm = this.findFocused());
      if (will_move_vmouse && this.parent.vmouse.point_elm === j_elm[0])
        return !1;
      if (0 === j_elm.length) return !1;
      j_elm.blur();
    },
    isCloseButton: (j_elm) => j_elm.hasClass("menu_close"),
    smoothScrollWithFixedDuration(
      elm,
      change_in_scroll_top,
      duration = 500,
      easing = "easeOutQuint"
    ) {
      const beginning_scroll_top = elm.scrollTop;
      "linear" === easing && (easing = "_linear");
      if (elm.__scroll) {
        cancelAnimationFrame(elm.__scroll.timer);
        delete elm.__scroll;
      }
      elm.__scroll = { type: "fixed_time", timer: null, beginning_time: null };
      const scroll_loop = (time) => {
        let current_time;
        if (null === elm.__scroll.beginning_time) {
          current_time = 0;
          elm.__scroll.beginning_time = time;
        } else current_time = time - elm.__scroll.beginning_time;
        if (current_time < duration) {
          const current_scroll_top = $.easing[easing](
            null,
            current_time,
            beginning_scroll_top,
            change_in_scroll_top,
            duration
          );
          elm.scrollTo(0, current_scroll_top);
          elm.__scroll.timer = requestAnimationFrame(scroll_loop);
        } else {
          elm.scrollTo(0, beginning_scroll_top + change_in_scroll_top);
          delete elm.__scroll;
        }
      };
      elm.__scroll.timer = requestAnimationFrame(scroll_loop);
    },
    smoothScrollWithFixedSpeed(
      elm,
      change_in_scroll_top,
      afterglow_needs = !0
    ) {
      const max_volume_per_frame = 1e3 / (window.refreshRate || 60),
        y_sign = Math.sign(change_in_scroll_top),
        y_abs = Math.abs(change_in_scroll_top);
      if (elm.__scroll) {
        if (
          "fixed_time" !== elm.__scroll.type &&
          elm.__scroll.sign === y_sign
        ) {
          elm.__scroll.is_afterglow = !1;
          elm.__scroll.afterglow = max_volume_per_frame;
          elm.__scroll.remaining += y_abs;
          return;
        }
        cancelAnimationFrame(elm.__scroll.timer);
        delete elm.__scroll;
      }
      elm.__scroll = {
        type: "fixed_speed",
        timer: null,
        active: !0,
        sign: y_sign,
        remaining: y_abs,
        is_afterglow: !1,
        afterglow: max_volume_per_frame,
      };
      const scroll_loop = () => {
        if (elm.__scroll.is_afterglow) {
          elm.scrollBy(0, elm.__scroll.sign * elm.__scroll.afterglow);
          elm.__scroll.afterglow *= 0.7;
          if (elm.__scroll.afterglow < 0.1) {
            delete elm.__scroll;
            return;
          }
        } else {
          const volume = Math.min(elm.__scroll.remaining, max_volume_per_frame);
          elm.scrollBy(0, elm.__scroll.sign * volume);
          elm.__scroll.remaining -= volume;
          if (elm.__scroll.remaining <= 0) {
            elm.__scroll.is_afterglow = !0;
            if (!afterglow_needs) {
              delete elm.__scroll;
              return;
            }
          }
        }
        elm.__scroll.timer = requestAnimationFrame(scroll_loop);
      };
      scroll_loop();
    },
    getTime: () => performance.now(),
    isKeyConfigEnabled() {
      return this.kag.stat.enable_keyconfig;
    },
    isDefaultActionEnabled(action, target = "key") {
      if ("default" === action) return !0;
      if ("default_debug" === action)
        return "true" === this.kag.config["debugMenu.visible"];
      {
        let option = this.parent.keyconfig[`system_${target}_event`];
        "debug" === option && (option = this.kag.config["debugMenu.visible"]);
        return !0 === option || "true" === option;
      }
    },
    parseTagArray(action) {
      Array.isArray(action);
      return "string" != typeof action
        ? [action]
        : action.includes(",")
        ? action.split(",").map((item) => {
            item = item.trim();
            return this.parent.kag.parser.makeTag(item, 0);
          })
        : [this.parent.kag.parser.makeTag(action, 0)];
    },
  },
  mouse: {
    x: 0,
    y: 0,
    parent: null,
    dirs: ["up", "down", "left", "right"],
    swiping: !1,
    swiping_button: 0,
    swiping_done: !1,
    swiping_x: 0,
    swiping_y: 0,
    swiping_prev_x: 0,
    swiping_prev_y: 0,
    swiping_timer_id: null,
    delay_swipe_reset: 200,
    swipe_threshold: 150,
    init(that) {
      that.util.refer(this);
      const tyrano_base = $("#tyrano_base")[0];
      $(document).on("click", (e) => {
        if ("false" === this.kag.config.offscreenClickable) return;
        if (this.util.isRemodalDisplayed()) return;
        let oe = e.originalEvent || e;
        if (!oe) return;
        const path = oe.path || (oe.composedPath && oe.composedPath());
        path &&
          !path.includes(tyrano_base) &&
          "none" !== that.j_event_layer.css("display") &&
          that.j_event_layer.click();
      });
      $(document).on("mousedown", (e) => {
        e.originalEvent && e.originalEvent.isTrusted && that.vmouse.hide();
        that.is_holding_skip || that.util.clearSkipAndAuto();
        if (0 === e.button) return;
        const key = that.MOUSE_BUTTON_NAMES[e.button],
          action = key ? that.map_mouse[key] : null;
        let is_holdskip = !1;
        const tag_array = this.parent.util.parseTagArray(action);
        for (const tag of tag_array)
          if (tag && "holdskip" === tag.name) {
            is_holdskip = !0;
            break;
          }
        if (this.swipeActionExists(key)) {
          this.swiping = !0;
          this.swiping_done = !1;
          this.swiping_button = key;
          this.swiping_x = 0;
          this.swiping_y = 0;
          this.swiping_prev_x = e.pageX;
          this.swiping_prev_y = e.pageY;
          is_holdskip && that.doAction(action, e);
          return !1;
        }
        return (
          !that.doAction(action, e) &&
          1 !== e.button &&
          that.util.isDefaultActionEnabled(action, "mouse")
        );
      });
      $(document).on("mousemove", (e) => {
        this.x = e.pageX;
        this.y = e.pageY;
        if (this.swiping && !this.swiping_done) {
          clearTimeout(this.swiping_timer_id);
          this.swiping_x += e.pageX - this.swiping_prev_x;
          this.swiping_y += e.pageY - this.swiping_prev_y;
          if (
            Math.sqrt(
              Math.pow(this.swiping_x, 2) + Math.pow(this.swiping_y, 2)
            ) > this.swipe_threshold
          ) {
            this.swiping_done = !0;
            const dir = this.getDir(this.swiping_x, this.swiping_y),
              key = `${this.swiping_button}_swipe_${dir}`,
              action = key ? that.map_mouse[key] : null;
            that.doAction(action, e);
          } else {
            this.swiping_prev_x = e.pageX;
            this.swiping_prev_y = e.pageY;
            this.swiping_timer_id = setTimeout(() => {
              this.swiping_x = 0;
              this.swiping_y = 0;
            }, this.delay_swipe_reset);
          }
        }
        that.vmouse.hide();
        that.util.unfocus();
      });
      $(document).on("mouseup", (e) => {
        const key = that.MOUSE_BUTTON_NAMES[e.button],
          action = key ? that.map_mouse[key] : null;
        let is_holdskip = !1;
        const tag_array = this.parent.util.parseTagArray(action);
        for (const tag of tag_array)
          if (tag && "holdskip" === tag.name) {
            is_holdskip = !0;
            break;
          }
        if (is_holdskip) {
          clearTimeout(this.swiping_timer_id);
          that.util.clearHoldingSkip();
          return !1;
        }
        if (this.swiping) {
          clearTimeout(this.swiping_timer_id);
          if (this.swiping_done) return !1;
          if (that.doAction(action, e) || 1 === e.button) return !1;
        }
        return that.util.isDefaultActionEnabled(action, "mouse");
      });
      $(document).on(that.util.getWheelEventType(), (e) => {
        let action = null;
        action =
          (e.originalEvent.deltaY
            ? -e.originalEvent.deltaY
            : e.originalEvent.wheelDelta
            ? e.originalEvent.wheelDelta
            : -e.originalEvent.detail) < 0
            ? that.map_mouse.wheel_down
            : that.map_mouse.wheel_up;
        that.doAction(action, e);
      });
    },
    isClickEnabled(e) {
      const that = this.parent;
      if (!(e.isTrusted || (e.originalEvent && e.originalEvent.isTrusted)))
        return !0;
      if (that.vmouse.is_visible) return !1;
      return !(that.util.getTime() - that.vmouse.last_hide_time < 1e3);
    },
    swipeActionExists(key) {
      const map = this.parent.map_mouse;
      for (const dir of this.dirs) {
        if (map[`${key}_swipe_${dir}`]) return !0;
      }
      return !1;
    },
    getDir(x, y) {
      const x_abs = Math.abs(x),
        y_abs = Math.abs(y);
      return x > 0
        ? x_abs > y_abs
          ? "right"
          : y > 0
          ? "down"
          : "up"
        : x_abs > y_abs
        ? "left"
        : y > 0
        ? "down"
        : "up";
    },
  },
  keyboard: {
    parent: null,
    key_state_map: {},
    tick_rate: 0,
    delay_update: 0,
    init(that) {
      that.util.refer(this);
      this.tick_rate = that.KEYBOARD_TICK_RATE;
      this.tick_rate > 0 && (this.delay_update = (1e3 / this.tick_rate) | 0);
      if ("win" === $.getOS()) {
        delete that.map_key[91];
        delete that.map_key.Meta;
      }
      $(document).keydown((e) => {
        const elm = document.activeElement;
        if (elm) {
          if ("INPUT" === elm.tagName && "text" === elm.type) return;
          if ("TEXTAREA" === elm.tagName) return;
        }
        const state = this.getKeyState(e);
        if (state.pressed) return !1;
        state.pressed = !0;
        state.hold_frame = 0;
        state.event = e.originalEvent;
        if (this.tick_rate > 0) {
          clearTimeout(state.timer_id);
          state.timer_id = setTimeout(() => {
            this.incrementHoldFrame(state);
          }, this.delay_update);
        }
        that.kag.tmp.ready_audio || that.kag.readyAudio();
        that.kag.trigger("keydown", e);
        const action = this.getAction(e);
        return (
          !that.doAction(action, e) &&
          "Alt" !== e.key &&
          that.util.isDefaultActionEnabled(action)
        );
      });
      $(document).keyup((e) => {
        let state = this.getKeyState(e);
        if (!state.pressed)
          for (const key in this.key_state_map) {
            const stt = this.key_state_map[key];
            if (e.code === stt.code && stt.pressed) {
              state = stt;
              break;
            }
          }
        state.pressed = !1;
        state.hold_frame = 0;
        clearTimeout(state.timer_id);
        const action = this.getAction(e),
          tag_array = this.parent.util.parseTagArray(action);
        for (const tag of tag_array) {
          tag && "holdskip" === tag.name && that.util.clearHoldingSkip();
          if (tag && "ok" === tag.name && that.vmouse.is_visible) {
            that.vmouse.leftup();
            return;
          }
        }
      });
      $(window).on("blur", () => {
        for (const key in this.key_state_map) {
          const state = this.key_state_map[key];
          state.pressed = !1;
          state.hold_frame = 0;
          clearTimeout(state.timer_id);
        }
      });
      $(document).on("keyhold", (e) => {
        let state = this.getKeyState(e);
        const action = this.getAction(e),
          tag_array = this.parent.util.parseTagArray(action);
        for (const tag of tag_array)
          if (tag && tag.pm && void 0 !== tag.pm["-h"]) {
            const delay_ms = tag.pm.delay
                ? parseInt(tag.pm.delay)
                : that.HOLD_MASH_DELAY,
              interval_ms = tag.pm.interval
                ? parseInt(tag.pm.interval)
                : that.HOLD_MASH_INTERVAL,
              delay_f = Math.ceil(delay_ms / this.delay_update),
              interval_f = Math.ceil(interval_ms / this.delay_update),
              f = state.hold_frame - delay_f;
            if (f > 0 && f % interval_f == 0) {
              that.doAction(tag, e);
              return;
            }
          }
      });
    },
    isPressed(key) {
      const state = this.getKeyState(key);
      return state && state.pressed;
    },
    getAction(e) {
      return this.parent.map_key[e.key] || this.parent.map_key[e.keyCode];
    },
    getKeyState(key) {
      if ("string" == typeof key) return this.key_state_map[key];
      const event = key;
      let state = this.key_state_map[event.key];
      state ||
        (state = this.key_state_map[event.key] = new this.KeyState(event));
      return state;
    },
    getKeyStatesByCode(code) {
      const arr = [];
      for (const key in this.key_state_map) {
        const stt = this.key_state_map[key];
        code === stt.code && arr.push(stt);
      }
      return arr;
    },
    KeyState: function (event) {
      this.key = event.key;
      this.code = event.code;
      this.key_code = event.keyCode;
      this.pressed = !1;
      this.hold_frame = 0;
      this.timer_id = null;
      this.event = null;
      return this;
    },
    incrementHoldFrame(state) {
      state.hold_frame++;
      const event = new KeyboardEvent("keyhold", state.event);
      document.dispatchEvent(event);
      state.timer_id = setTimeout(() => {
        this.incrementHoldFrame(state);
      }, this.delay_update);
    },
  },
  vmouse: {
    parent: null,
    is_initialized: !1,
    j_html: null,
    j_body: null,
    j_cursor: null,
    x: 0,
    y: 0,
    hotspot_x: 0,
    hotspot_y: 0,
    state: "none",
    point_elm: null,
    point_tree: [],
    down_elms: [],
    is_visible: !1,
    is_scrolling: !1,
    is_pointer: !1,
    scroll_ratio: 1,
    screen: {},
    previous_click_time: 0,
    max_delay_double_click: 500,
    delya_hide_last_move: 3e3,
    is_auto_hidden_enabled: !0,
    hidden_timer_id: null,
    transition_duration: 50,
    fade_duration: 100,
    tick_rate: 0,
    delay_update: null,
    last_hide_time: 0,
    default_image_map: {
      none: {
        image_url: "./tyrano/images/system/transparent.png",
        hotspot_x: 0,
        hotspot_y: 0,
      },
      default: {
        image_url: "./tyrano/images/system/cursor_default.png",
        hotspot_x: 0,
        hotspot_y: 0,
      },
      pointer: {
        image_url: "./tyrano/images/system/cursor_pointer.png",
        hotspot_x: 0,
        hotspot_y: 0,
      },
    },
    image_map: {},
    init(that) {
      if (!this.is_initialized) {
        this.is_initialized = !0;
        that.util.refer(this);
        this.j_html = $("html");
        this.j_body = $("body");
        this.j_cursor = $(
          '<img id="vmouse" src="./tyrano/images/system/transparent.png" />'
        );
        this.j_body.append(this.j_cursor);
        this.tick_rate = this.parent.VMOUSE_TICK_RATE;
        this.tick_rate > 0 && (this.delay_update = (1e3 / this.tick_rate) | 0);
        $.extend(!0, this.image_map, this.default_image_map);
        that.kag.on("resize", () => {
          const info = that.kag.tmp.screen_info,
            scale_x = info.scale_x,
            scale_y = info.scale_y,
            x = (info.viewport_width / 2) | 0,
            y = (info.viewport_height / 2) | 0,
            top = 0 | info.top,
            bottom = 0 | info.bottom,
            left = 0 | info.left,
            right = 0 | info.right,
            viewport_width = 0 | info.viewport_width,
            viewport_height = 0 | info.viewport_height,
            radius =
              ((Math.sqrt(Math.pow(info.width, 2) + Math.pow(info.height, 2)) /
                2) *
                1.1) |
              0;
          Object.assign(this.screen, {
            scale_x: scale_x,
            scale_y: scale_y,
            x: x,
            y: y,
            top: top,
            bottom: bottom,
            left: left,
            right: right,
            viewport_width: viewport_width,
            viewport_height: viewport_height,
            radius: radius,
          });
        });
        that.kag.once("resize", () => {
          this.x = this.screen.x;
          this.y = this.screen.y;
          this.refreshTransform();
        });
      }
    },
    addImage(type, image_url, hotspot_x, hotspot_y) {
      hotspot_x = parseInt(hotspot_x) || 0;
      hotspot_y = parseInt(hotspot_y) || 0;
      if (!image_url) {
        const options =
          this.default_image_map[type] || this.default_image_map.default;
        image_url = options.image_url;
        hotspot_x || (hotspot_x = options.hotspot_x);
        hotspot_y || (hotspot_y = options.hotspot_y);
      }
      this.image_map[type] = {
        image_url: image_url,
        hotspot_x: hotspot_x,
        hotspot_y: hotspot_y,
      };
    },
    show() {
      if (!this.is_visible) {
        this.is_visible = !0;
        this.j_cursor.css("opacity", "1");
        this.j_html.addClass("vmouse-displayed");
        if (this.tick_rate > 0) {
          this.delay_update = (1e3 / this.tick_rate) | 0;
          this.updateLoop();
        }
      }
    },
    hide() {
      if (this.is_visible) {
        this.is_visible = !1;
        this.last_hide_time = this.parent.util.getTime();
        this.j_cursor.css("opacity", "0");
        this.j_html.removeClass("vmouse-displayed");
        this.mouseleaveAll();
      }
    },
    isAnyDown() {
      for (const item of this.down_elms) if (item) return !0;
      return !1;
    },
    hideWithTimeout() {
      clearTimeout(this.hidden_timer_id);
      this.hidden_timer_id = setTimeout(() => {
        this.isAnyDown() ? this.hideWithTimeout() : this.hide();
      }, this.delya_hide_last_move);
    },
    updateLoop() {
      if (this.is_visible) {
        this.scanPointElement();
        this.scanState();
        this.is_pointer && this.hideWithTimeout();
        setTimeout(() => {
          this.updateLoop();
        }, this.delay_update);
      }
    },
    isStatePointer: (state) =>
      "pointer" === state ||
      !(!state.includes(",") || "pointer" !== state.split(",").pop().trim()),
    trigger(event_type, elm, options = {}) {
      elm || (elm = this.point_elm);
      if (!elm) return;
      const AnyConstructor = this.getEventConstructor(event_type);
      if (!AnyConstructor) return;
      const event_options = Object.assign(
        { pageX: this.x, pageY: this.y, bubbles: !0, cancelable: !0 },
        options
      );
      elm.dispatchEvent(new AnyConstructor(event_type, event_options));
      if (event_type.includes("mouse") && PointerEvent) {
        const p_event_type = event_type.replace("mouse", "pointer");
        elm.dispatchEvent(new PointerEvent(p_event_type, event_options));
      }
      if ("click" === event_type) {
        const time = this.parent.util.getTime();
        time - this.previous_click_time < this.max_delay_double_click &&
          elm.dispatchEvent(new MouseEvent("dblclick", event_options));
        this.previous_click_time = time;
      }
      this.is_auto_hidden_enabled && this.hideWithTimeout();
    },
    getEventConstructor(event_type) {
      let constructor = Event;
      const lower = event_type.toLowerCase();
      WheelEvent && lower.includes("wheel")
        ? (constructor = WheelEvent)
        : MouseEvent &&
          (lower.includes("mouse") ||
            lower.includes("click") ||
            "contextmenu" === lower) &&
          (constructor = MouseEvent);
      return constructor;
    },
    setXY(x, y) {
      this.x = x;
      this.y = y;
      this.refreshTransform();
    },
    setTransitionDuration(duration) {
      if (
        "number" == typeof duration &&
        duration !== this.transition_duration
      ) {
        this.j_cursor.css(
          "transition",
          `transform ${duration}ms linear, opacity ${this.fade_duration}ms linear`
        );
        this.j_cursor.get(0).offsetHeight;
        this.transition_duration = duration;
      }
    },
    refreshTransform(j_cursor, x, y) {
      j_cursor || (j_cursor = this.j_cursor);
      x || (x = this.x);
      y || (y = this.y);
      j_cursor.css({ transform: `translateX(${x}px) translateY(${y}px)` });
    },
    refreshHotspot(j_cursor) {
      j_cursor || (j_cursor = this.j_cursor);
      j_cursor.css({
        marginLeft: -this.hotspot_x + "px",
        marginTop: -this.hotspot_y + "px",
      });
    },
    getElementTree(elm) {
      const arr = [];
      let next_elm = elm;
      for (
        ;
        next_elm && "HTML" !== next_elm.tagName && "BODY" !== next_elm.tagName;

      ) {
        arr.push(next_elm);
        next_elm = next_elm.parentElement;
      }
      return arr;
    },
    mouseleaveAll() {
      $(".hover").each((i, elm) => {
        this.trigger("mouseleave", elm, { bubbles: !1 });
        this.trigger("mouseout", elm, { bubbles: !1 });
        elm.classList.remove("hover");
      });
      this.point_elm = null;
      this.point_tree = [];
    },
    scanPointElement() {
      const new_elm = document.elementFromPoint(this.x, this.y),
        old_elm = this.point_elm;
      if (new_elm === old_elm) return new_elm;
      const new_tree = this.getElementTree(new_elm),
        old_tree = this.point_tree;
      new_tree.forEach((elm) => {
        if (!old_tree.includes(elm)) {
          this.trigger("mouseenter", elm, { bubbles: !1 });
          elm.classList.add("hover");
        }
      });
      old_tree.forEach((elm) => {
        if (!new_tree.includes(elm)) {
          this.trigger("mouseleave", elm, { bubbles: !1 });
          elm.classList.remove("hover");
        }
      });
      old_elm && this.trigger("mouseout", old_elm);
      if (new_elm) {
        this.trigger("mouseover", new_elm);
        $(new_elm).addClass("hover");
      }
      this.point_elm = new_elm;
      this.point_tree = new_tree;
      return new_elm;
    },
    setState(new_state, book) {
      if (new_state !== this.state)
        if (book) this.book_state = new_state;
        else {
          this.state = new_state;
          this.refreshImage();
          this.is_pointer = this.isStatePointer(this.state);
          this.book_state = null;
        }
    },
    refreshImage(state, j_cursor) {
      j_cursor || (j_cursor = this.j_cursor);
      state || (state = this.state);
      if ("none" === state) {
        j_cursor.attr("src", this.default_image_map.none.image_url);
        return;
      }
      let image_url, hotspot_x, hotspot_y;
      if (0 === state.indexOf("url(")) {
        const cursor_style = this.parseCursorCSS(state);
        image_url = cursor_style.url;
        hotspot_x = cursor_style.hotspot_x;
        hotspot_y = cursor_style.hotspot_y;
      }
      if (!image_url) {
        const options =
          state in this.image_map
            ? this.image_map[state]
            : this.image_map.default;
        image_url = options.image_url;
        hotspot_x = options.hotspot_x;
        hotspot_y = options.hotspot_y;
      }
      if (this.hotspot_x !== hotspot_x || this.hotspot_y !== hotspot_y) {
        this.hotspot_x = hotspot_x;
        this.hotspot_y = hotspot_y;
        this.refreshHotspot(j_cursor);
      }
      j_cursor.attr("src", image_url);
    },
    parseCursorCSS(css) {
      let state = "auto",
        hotspot_x = 0;
      if ((css = css.trim()).includes(",")) {
        const url_x_y___state = css.split(",");
        css = url_x_y___state[0].trim();
        state = url_x_y___state[1].trim();
      }
      const url___x_y = css.split(")"),
        url = url___x_y[0]
          .replace("url(", "")
          .replace(/"/g, "")
          .replace(/'/g, "");
      if (url___x_y[1]) {
        const x___y = url___x_y[1].split(" ");
        hotspot_x = parseInt(x___y[0]);
        hotspot_x = parseInt(x___y[1]);
      }
      return { state: state, hotspot_x: hotspot_x, hotspot_y: 0, url: url };
    },
    move(x, y, duration) {
      this.place(this.x + x, this.y + y, duration);
    },
    place(_x, _y, duration = 0, should_display = !0) {
      if (!this.screen.viewport_width) return;
      should_display && this.show();
      const x = Math.max(this.screen.left, Math.min(this.screen.right, _x)),
        y = Math.max(this.screen.top, Math.min(this.screen.bottom, _y)),
        dy = _y - this.y;
      this.is_scrolling &&
        this.parent.util.smoothScrollWithFixedDuration(
          this.down_elms[0],
          (3 * dy * this.scroll_ratio) / this.screen.scale_y,
          this.delay_update,
          "linear"
        );
      this.setTransitionDuration(duration);
      this.setXY(x, y);
      this.scanPointElement();
      this.scanState();
      this.hideWithTimeout();
    },
    scanState() {
      this.j_html.removeClass("vmouse-displayed");
      const tmp = document.body.style.getPropertyValue("cursor");
      document.body.style.setProperty("cursor", "");
      const new_state = this.point_elm
        ? $(this.point_elm).css("cursor")
        : "auto";
      document.body.style.setProperty("cursor", tmp);
      this.j_html.addClass("vmouse-displayed");
      this.setState(new_state, !!this.down_elms[0]);
    },
    wheel(delta) {
      if (!this.scanPointElement()) return;
      this.trigger(this.parent.util.getWheelEventType(), this.point_elm, {
        deltaY: delta,
        wheelDelta: -delta,
        wheelDeltaY: -delta,
        detail: delta,
      });
      let scrollable_elm;
      for (const elm of this.point_tree)
        if (0 !== elm.clientWidth && elm.offsetWidth !== elm.clientWidth) {
          scrollable_elm = elm;
          break;
        }
      scrollable_elm &&
        this.parent.util.smoothScrollWithFixedSpeed(scrollable_elm, delta, !0);
    },
    wheelup() {
      this.wheel(-100);
    },
    wheeldown() {
      this.wheel(100);
    },
    anydown(type) {
      if (this.scanPointElement()) {
        this.trigger("mousedown", this.point_elm, { button: type });
        if (0 === type) {
          this.simulateScroll();
          $(this.point_elm).addClass("active");
        }
        this.down_elms[type] = this.point_elm;
      }
    },
    simulateScroll() {
      const elm = this.point_elm;
      if (0 === elm.clientWidth) return;
      if (0 === elm.offsetWidth - elm.clientWidth) return;
      const rect = elm.getBoundingClientRect(),
        x = this.x - rect.left,
        y = this.y - rect.top,
        offset_x = x / this.screen.scale_x,
        offset_y = y / this.screen.scale_y;
      if (offset_x <= elm.clientWidth) return;
      const max_scroll_top = elm.scrollHeight - elm.offsetHeight,
        screen_height_ratio = elm.offsetHeight / elm.scrollHeight,
        scroll_top_ratio = elm.scrollTop / max_scroll_top,
        scroll_button_height = elm.offsetHeight * screen_height_ratio,
        scroll_button_max_top = elm.offsetHeight - scroll_button_height,
        scroll_button_top = scroll_button_max_top * scroll_top_ratio,
        scroll_button_bottom = scroll_button_top + scroll_button_height,
        scroll_ratio = max_scroll_top / scroll_button_max_top;
      this.scroll_ratio = scroll_ratio;
      if (offset_y < scroll_button_top) {
        const should_scroll_coord =
          (max_scroll_top *
            ((scroll_button_top - offset_y) / scroll_button_max_top)) |
          0;
        this.parent.util.smoothScrollWithFixedDuration(
          elm,
          -should_scroll_coord
        );
      } else if (offset_y <= scroll_button_bottom) this.is_scrolling = !0;
      else {
        const should_scroll_coord =
          (max_scroll_top *
            ((offset_y - scroll_button_bottom) / scroll_button_max_top)) |
          0;
        this.parent.util.smoothScrollWithFixedDuration(
          elm,
          should_scroll_coord
        );
      }
    },
    anyup(type) {
      if (!this.scanPointElement()) return;
      this.trigger("mouseup", this.point_elm, { button: type });
      const down_elm = this.down_elms[type];
      if (down_elm) {
        if (0 === type) {
          $(down_elm).removeClass("active");
          this.is_scrolling = !1;
        }
        down_elm === this.point_elm &&
          (0 === type
            ? this.trigger("click", this.point_elm)
            : 2 === type && this.trigger("contextmenu", this.point_elm));
      }
      0 === type && this.book_state && this.setState(this.book_state, !1);
      this.down_elms[type] = null;
    },
    leftdown() {
      this.anydown(0);
    },
    centerdown() {
      this.anydown(1);
    },
    rightdown() {
      this.anydown(2);
    },
    prevdown() {
      this.anydown(3);
    },
    nextdown() {
      this.anydown(4);
    },
    leftup() {
      this.anyup(0);
    },
    centerup() {
      this.anyup(1);
    },
    rightup() {
      this.anyup(2);
    },
    prevup() {
      this.anyup(3);
    },
    nextup() {
      this.anyup(4);
    },
  },
  gamepad: {
    parent: null,
    prev_gamepads: [],
    gamepad_exests: !1,
    last_used_gamepad_index: -1,
    last_used_next_gamepad_index: -1,
    MINIMAM_VALUE_DETECT_AXE: 0.15,
    MINIMAM_VALUE_DIGITAL_STICK: 0.5,
    DELAY_UPDATE: null,
    MOVEMENT_VMOUSE_PER_SECOND: 2e3,
    MOVEMENT_VMOUSE_RATIO: null,
    keymap_lang: {
      standard: {
        buttons: {
          0: "A",
          1: "B",
          2: "X",
          3: "Y",
          4: "LB",
          5: "RB",
          6: "LT",
          7: "RT",
          8: "SELECT",
          9: "START",
          10: "LS",
          11: "RS",
          12: "UP",
          13: "DOWN",
          14: "LEFT",
          15: "RIGHT",
          16: "HOME",
        },
      },
    },
    presstype: { BUTTON: 0, STICK_DIGITAL: 1 },
    init(that) {
      that.util.refer(this);
      this.TICK_RATE = that.GAMEPAD_TICK_RATE;
      this.DELAY_UPDATE = (1e3 / this.TICK_RATE) | 0;
      this.MOVEMENT_VMOUSE_RATIO =
        (this.MOVEMENT_VMOUSE_PER_SECOND / this.TICK_RATE) | 0;
      $(window).on("gamepadconnected", (e) => {
        if (!this.gamepad_exests) {
          this.gamepad_exests = !0;
          this.getGamepadInputs();
        }
      });
      $(document).on("gamepadpressdown", (e) => {
        that.kag.trigger("gamepad-pressdown", e);
        let map;
        map =
          e.detail.type === this.presstype.BUTTON
            ? that.map_pad.button
            : that.map_pad.stick_digital;
        let action = map[e.detail.button_name];
        !action &&
          e.detail.button_index >= 0 &&
          (action = map[e.detail.button_index]);
        that.doAction(action, e);
      });
      $(document).on("gamepadpresshold", (e) => {
        that.kag.trigger("gamepad-presshold", e);
        let map;
        map =
          e.detail.type === this.presstype.BUTTON
            ? that.map_pad.button
            : that.map_pad.stick_digital;
        let action = map[e.detail.button_name];
        !action &&
          e.detail.button_index >= 0 &&
          (action = map[e.detail.button_index]);
        const tag_array = this.parent.util.parseTagArray(action);
        for (const tag of tag_array)
          if (tag && tag.pm && void 0 !== tag.pm["-h"]) {
            const delay = tag.pm.delay
                ? parseInt(tag.pm.delay)
                : that.HOLD_MASH_DELAY,
              interval = tag.pm.interval
                ? parseInt(tag.pm.interval)
                : that.HOLD_MASH_INTERVAL,
              delay_f = Math.ceil(delay / this.DELAY_UPDATE),
              interval_f = Math.ceil(interval / this.DELAY_UPDATE),
              f = e.detail.hold_frame - delay_f;
            if (f > 0 && f % interval_f == 0) {
              if (that.doAction(tag, e)) return;
            }
          }
      });
      $(document).on("gamepadpressup", (e) => {
        that.kag.trigger("gamepad-pressup", e);
        let map;
        map =
          e.detail.type === this.presstype.BUTTON
            ? that.map_pad.button
            : that.map_pad.stick_digital;
        let action = map[e.detail.button_name];
        !action &&
          e.detail.button_index >= 0 &&
          (action = map[e.detail.button_index]);
        const tag_array = this.parent.util.parseTagArray(action);
        for (const tag of tag_array) {
          tag && "holdskip" === tag.name && that.util.clearHoldingSkip();
          if (tag && "ok" === tag.name && that.vmouse.is_visible) {
            that.vmouse.leftup();
            return;
          }
        }
      });
    },
    getGamepadInputs() {
      try {
        const gamepads = navigator.getGamepads
          ? navigator.getGamepads()
          : navigator.webkitGetGamepads
          ? navigator.webkitGetGamepads()
          : null;
        if (!gamepads) return;
        let gamepad_exists = !1,
          used_gamepad_exists = !1;
        Array.prototype.forEach.call(gamepads, (gamepad, gi) => {
          if (!gamepad) return;
          gamepad_exists = !0;
          const sticks = [],
            stick_num = gamepad.axes.length / 2;
          for (let si = 0; si < stick_num; si++) {
            let stick;
            const aix = 2 * si,
              aiy = 2 * si + 1,
              x = gamepad.axes[aix],
              y = gamepad.axes[aiy];
            if ("number" != typeof x || "number" != typeof y) continue;
            const digital_buttons = [
                { pressed: !1 },
                { pressed: !1 },
                { pressed: !1 },
                { pressed: !1 },
              ],
              input_exists =
                Math.abs(x) + Math.abs(y) > this.MINIMAM_VALUE_DETECT_AXE;
            stick = {
              x: x,
              y: y,
              input_exists: input_exists,
              digital_buttons: digital_buttons,
            };
            if (input_exists) {
              let radian = Math.atan2(-y, x);
              radian < 0 && (radian += 2 * Math.PI);
              const degree = radian * (180 / Math.PI),
                distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
                radian_rotate = radian + Math.PI / 4,
                digital_button_index =
                  Math.floor((2 * radian_rotate) / Math.PI) % 4;
              distance > this.MINIMAM_VALUE_DIGITAL_STICK &&
                (digital_buttons[digital_button_index].pressed = !0);
              Object.assign(stick, {
                radian: radian,
                degree: degree,
                distance: distance,
              });
            } else Object.assign(stick, { radian: 0, degree: 0, distance: 0 });
            sticks.push(stick);
          }
          let prev_gamepad = this.prev_gamepads[gi];
          if (!prev_gamepad) {
            prev_gamepad = { buttons: [], axes: [], sticks: [] };
            for (const button of gamepad.buttons)
              prev_gamepad.buttons.push({ pressed: !1 });
            for (const axe of gamepad.axes) prev_gamepad.buttons.push(0);
            for (const stick of sticks)
              prev_gamepad.sticks.push({
                digital_buttons: [
                  { pressed: !1 },
                  { pressed: !1 },
                  { pressed: !1 },
                  { pressed: !1 },
                ],
              });
          }
          let is_changed_inputs = !1;
          const prev_buttons = prev_gamepad.buttons;
          gamepad.buttons.forEach((button, bi) => {
            const prev_button = prev_buttons[bi];
            let event_type;
            const is_changed = button.pressed !== prev_button.pressed;
            if (is_changed) {
              event_type = button.pressed
                ? "gamepadpressdown"
                : "gamepadpressup";
              button.hold_frame = 0;
            } else if (button.pressed) {
              event_type = "gamepadpresshold";
              button.hold_frame = (prev_button.hold_frame || 0) + 1;
            }
            if (event_type) {
              let button_name = "";
              const lang =
                this.keymap_lang[gamepad.mapping] || this.keymap_lang.standard;
              lang && (button_name = lang.buttons[bi] || "");
              const event = new CustomEvent(event_type, {
                detail: {
                  button: button,
                  button_name: button_name,
                  button_index: bi,
                  gamepad: gamepad,
                  gamepad_index: gi,
                  hold_frame: button.hold_frame,
                  type: this.presstype.BUTTON,
                },
              });
              document.dispatchEvent(event);
            }
            is_changed && (is_changed_inputs = is_changed);
          });
          sticks.forEach((stick, si) => {
            const prev_stick = prev_gamepad.sticks[si];
            stick.digital_buttons.forEach((button, bi) => {
              const prev_button = prev_stick.digital_buttons[bi];
              let event_type;
              if (button.pressed !== prev_button.pressed) {
                event_type = button.pressed
                  ? "gamepadpressdown"
                  : "gamepadpressup";
                button.hold_frame = 0;
              } else if (button.pressed) {
                event_type = "gamepadpresshold";
                button.hold_frame = (prev_button.hold_frame || 0) + 1;
              }
              if (event_type) {
                button.hold_frame = (prev_button.hold_frame || 0) + 1;
                const event = new CustomEvent(event_type, {
                  detail: {
                    button: button,
                    button_name: `${["L", "R"][si] || "UNKNOWN"}_${
                      ["RIGHT", "UP", "LEFT", "DOWN"][bi] || ""
                    }`,
                    button_index: -1,
                    gamepad: gamepad,
                    gamepad_index: gi,
                    hold_frame: button.hold_frame,
                    type: this.presstype.STICK_DIGITAL,
                  },
                });
                document.dispatchEvent(event);
              }
            });
          });
          let vmouse_moved = !1;
          sticks.forEach((stick, si) => {
            const name = ["L", "R"][si] || "UNKNOWN",
              map = this.parent.map_pad.stick || {},
              action = map[name] || map[si] || "";
            if (0 === action.indexOf("vmouse_move") && stick.input_exists) {
              const vmouse = this.parent.vmouse,
                ratio_x =
                  (this.MOVEMENT_VMOUSE_RATIO * vmouse.screen.scale_x) | 0,
                ratio_y =
                  (this.MOVEMENT_VMOUSE_RATIO * vmouse.screen.scale_y) | 0,
                x = ratio_x * stick.x,
                y = ratio_y * stick.y;
              vmouse.move(x, y, this.DELAY_UPDATE);
              vmouse_moved = !0;
            } else if (0 === action.indexOf("vmouse_aim") && !vmouse_moved) {
              const vmouse = this.parent.vmouse;
              Math.abs(stick.x) < this.MINIMAM_VALUE_DETECT_AXE &&
                (stick.x = 0);
              Math.abs(stick.y) < this.MINIMAM_VALUE_DETECT_AXE &&
                (stick.y = 0);
              const x = vmouse.screen.x + vmouse.screen.radius * stick.x,
                y = vmouse.screen.y + vmouse.screen.radius * stick.y;
              vmouse.x === x && vmouse.y === y
                ? vmouse.hideWithTimeout()
                : vmouse.place(x, y, this.DELAY_UPDATE);
            }
          });
          if (is_changed_inputs) {
            this.last_used_gamepad_index = gamepad.index;
            used_gamepad_exists = !0;
          }
          gamepad.sticks = sticks;
          this.prev_gamepads[gi] = gamepad;
        });
        gamepad_exists
          ? setTimeout(() => {
              this.getGamepadInputs();
            }, this.DELAY_UPDATE)
          : (this.gamepad_exests = !1);
      } catch (error) {
        console.log(error);
        this.gamepad_exests = !1;
      }
    },
    getGamepad(index) {
      if (void 0 === index) {
        (index = this.last_used_next_gamepad_index) < 0 &&
          (index = this.last_used_gamepad_index);
        if (index < 0) return null;
      }
      const gamepads = navigator.getGamepads
        ? navigator.getGamepads()
        : navigator.webkitGetGamepads
        ? navigator.webkitGetGamepads()
        : null;
      return gamepads ? gamepads[index] : null;
    },
    vibrate_timer_id: null,
    vibrate(options = {}) {
      try {
        options.is_timeout || clearTimeout(this.vibrate_timer_id);
        let gamepad = options.gamepad,
          duration = void 0 !== options.duration ? options.duration : 500,
          power = void 0 !== options.power ? options.power : 1;
        const is_array = Array.isArray(duration),
          this_duration = is_array ? duration[0] : duration;
        gamepad || (gamepad = this.getGamepad());
        const act = gamepad && gamepad.vibrationActuator;
        if (!act) return;
        act.pulse
          ? act.pulse(power, this_duration)
          : act.playEffect &&
            act.playEffect(act.type, {
              duration: this_duration,
              startDelay: 0,
              strongMagnitude: power,
              weakMagnitude: power,
            });
        if (is_array) {
          duration.shift();
          if (duration.length <= 1) return;
          const delay = this_duration + duration.shift();
          options.is_timeout = !0;
          this.vibrate_timer_id = setTimeout(() => {
            this.vibrate(options);
          }, delay);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  default_keyconfig: {
    key: { 32: "hidemessage", 13: "next", 91: "skip", 17: "skip" },
    mouse: {
      right: "hidemessage",
      center: "menu",
      wheel_up: "backlog",
      wheel_down: "next",
    },
    gesture: {
      swipe_up_1: { action: "backlog" },
      swipe_left_1: { action: "auto" },
      swipe_right_1: { action: "menu" },
      swipe_down_1: { action: "load" },
      hold: { action: "skip" },
    },
  },
};