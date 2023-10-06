tyrano.plugin.kag.layer = {
  tyrano: null,
  kag: null,
  layer_event: {},
  layer_menu: {},
  layer_free: {},
  map_layer_fore: {},
  map_layer_back: {},
  is_swipe: !1,
  timeoutId: 0,
  start_point: { x: 0, y: 0 },
  end_point: { x: 0, y: 0 },
  init: function () {
    $("#tyrano_base").append(
      '<div id="root_layer_game" class="root_layer_game"></div>'
    );
    $("#tyrano_base").append(
      '<div id="root_layer_system" class="root_layer_system"></div>'
    );
    var layer_obj_click = $(
      "<div class='layer layer_event_click' style='z-index:9999;display:none'></div>"
    );
    layer_obj_click
      .css("width", this.kag.config.scWidth)
      .css("height", this.kag.config.scHeight)
      .css("position", "absolute");
    this.layer_event = layer_obj_click;
    this.appendLayer(this.layer_event, "root_layer_system");
    var layer_menu = $(
      "<div class='layer layer_menu' style='z-index:1000000000;display:none'  align='center'></div>"
    );
    layer_menu
      .css("width", this.kag.config.scWidth)
      .css("height", this.kag.config.scHeight)
      .css("position", "absolute");
    this.layer_menu = layer_menu;
    this.appendLayer(this.layer_menu, "root_layer_system");
    var layer_free = $(
      "<div class='layer layer_free' style='z-index:9998;display:none' ></div>"
    );
    layer_free
      .css("width", this.kag.config.scWidth)
      .css("height", this.kag.config.scHeight)
      .css("position", "absolute");
    this.layer_free = layer_free;
    this.appendLayer(this.layer_free, "root_layer_system");
  },
  getMenuLayer: function () {
    return this.layer_menu;
  },
  getFreeLayer: function () {
    return this.layer_free;
  },
  addLayer: function (layer_name) {
    var system_layer = "",
      layer_obj_fore = $(
        "<div class='layer " + layer_name + "_fore layer_fore'></div>"
      ),
      layer_obj_back = $(
        "<div class='layer " +
          layer_name +
          "_back layer_back' style='display:none'></div>"
      );
    if (-1 == layer_name.indexOf("message")) {
      layer_obj_fore.addClass("layer_camera");
      layer_obj_back.addClass("layer_camera");
    } else system_layer = "root_layer_system";
    layer_obj_fore
      .css("width", this.kag.config.scWidth)
      .css("height", this.kag.config.scHeight)
      .css("position", "absolute");
    layer_obj_back
      .css("width", this.kag.config.scWidth)
      .css("height", this.kag.config.scHeight)
      .css("position", "absolute");
    this.map_layer_fore[layer_name] = layer_obj_fore;
    this.map_layer_back[layer_name] = layer_obj_back;
    this.map_layer_fore[layer_name].attr("l_visible", "true");
    this.map_layer_back[layer_name].attr("l_visible", "true");
    this.appendLayer(this.map_layer_fore[layer_name], system_layer);
    this.appendLayer(this.map_layer_back[layer_name], system_layer);
  },
  appendLayer: function (layer_obj, system) {
    system = system || "root_layer_game";
    layer_obj.attr("data-parent-layer", system);
    "" != system
      ? $("." + this.kag.define.BASE_DIV_NAME)
          .find("#" + system)
          .append(layer_obj)
      : $("." + this.kag.define.BASE_DIV_NAME).append(layer_obj);
  },
  appendImage: function (image_obj) {
    $("." + this.kag.define.BASE_DIV_NAME).append(image_obj);
  },
  getLayer: function (layer_name, page) {
    return "fix" == layer_name
      ? $("#tyrano_base")
      : "fore" == (page = page || "fore")
      ? this.map_layer_fore[layer_name]
      : this.map_layer_back[layer_name];
  },
  updateLayer: function (layer_name, page, layer_obj) {
    "fore" == (page = page || "fore")
      ? (this.map_layer_fore[layer_name] = layer_obj)
      : (this.map_layer_back[layer_name] = layer_obj);
  },
  hideMessageLayers: function () {
    if (1 == this.kag.stat.display_link) return !1;
    this.kag.stat.is_hide_message = !0;
    this.kag.trigger("messagewindow-hide");
    for (
      var num_message_layer = parseInt(this.kag.config.numMessageLayers), i = 0;
      i < num_message_layer;
      i++
    )
      this.getLayer("message" + i).hide();
    this.hideFixLayer();
  },
  showMessageLayers: function () {
    this.kag.stat.is_hide_message = !1;
    this.kag.trigger("messagewindow-show");
    for (
      var num_message_layer = parseInt(this.kag.config.numMessageLayers), i = 0;
      i < num_message_layer;
      i++
    ) {
      var j_layer = this.getLayer("message" + i);
      "true" == j_layer.attr("l_visible") && j_layer.show();
    }
    this.showFixLayer();
  },
  showLayer: function (j_layer) {
    j_layer.css("display", "");
    j_layer.attr("l_visible", "true");
  },
  hideLayer: function (j_layer) {
    j_layer.css("display", "none");
    j_layer.attr("l_visible", "false");
  },
  showFixLayer: function () {
    $(".fixlayer").show();
  },
  hideFixLayer: function () {
    $(".fixlayer").hide();
  },
  appendObj: function (layer_name, page, obj) {
    obj.css("position", "absolute");
    this.getLayer(layer_name, page).append(obj);
  },
  refMessageLayer: function (target_layer) {
    var num = 0;
    if (target_layer) {
      if (this.map_layer_fore[target_layer]) {
        const j_message_outer =
          this.map_layer_fore[target_layer].find(".message_outer");
        this.map_layer_fore[target_layer]
          .find(".message_inner")
          .css("left", parseInt(j_message_outer.css("left")) + 10)
          .css("top", parseInt(j_message_outer.css("top")) + 10)
          .css("width", parseInt(j_message_outer.css("width")) - 10)
          .css("height", parseInt(j_message_outer.css("height")) - 10);
      }
    } else
      for (; this.map_layer_fore["message" + num]; ) {
        {
          const j_message_outer =
            this.map_layer_fore["message" + num].find(".message_outer");
          this.map_layer_fore["message" + num]
            .find(".message_inner")
            .css("left", parseInt(j_message_outer.css("left")) + 10)
            .css("top", parseInt(j_message_outer.css("top")) + 10)
            .css("width", parseInt(j_message_outer.css("width")) - 10)
            .css("height", parseInt(j_message_outer.css("height")) - 10);
        }
        num++;
      }
  },
  getLayeyHtml: function () {
    var that = this,
      layer_info = {
        map_layer_fore: {},
        map_layer_back: {},
        layer_free: {},
        layer_fix: {},
        layer_blend: {},
      };
    for (let key in this.map_layer_fore)
      layer_info.map_layer_fore[key] = $.makeSaveJSON(
        this.map_layer_fore[key].get(0),
        this.kag.array_white_attr
      );
    for (let key in this.map_layer_back)
      layer_info.map_layer_back[key] = $.makeSaveJSON(
        this.map_layer_back[key].get(0),
        this.kag.array_white_attr
      );
    layer_info.layer_free = $.makeSaveJSON(
      this.layer_free.get(0),
      this.kag.array_white_attr
    );
    var n = 0;
    $(".fixlayer").each(function () {
      layer_info.layer_fix[n] = $.makeSaveJSON(
        $(this).get(0),
        that.kag.array_white_attr
      );
      n++;
    });
    var m = 0;
    $(".blendlayer").each(function () {
      layer_info.layer_blend[m] = $.makeSaveJSON(
        $(this).get(0),
        that.kag.array_white_attr
      );
      m++;
    });
    return layer_info;
  },
  _getLayeyHtml: function () {
    var layer_info = {
      map_layer_fore: {},
      map_layer_back: {},
      layer_free: {},
      layer_fix: {},
      layer_blend: {},
    };
    for (let key in this.map_layer_fore)
      layer_info.map_layer_fore[key] = $.playerHtmlPath(
        this.map_layer_fore[key].outerHTML()
      );
    for (let key in this.map_layer_back)
      layer_info.map_layer_back[key] = $.playerHtmlPath(
        this.map_layer_back[key].outerHTML()
      );
    layer_info.layer_free = $.playerHtmlPath(this.layer_free.outerHTML());
    var n = 0;
    $(".fixlayer").each(function () {
      layer_info.layer_fix[n] = $.playerHtmlPath($(this).outerHTML());
      n++;
    });
    var m = 0;
    $(".blendlayer").each(function () {
      layer_info.layer_blend[m] = $.playerHtmlPath($(this).outerHTML());
      m++;
    });
    return layer_info;
  },
  getLayerInfo() {
    var layer_info = {
        map_layer_fore: this.map_layer_fore,
        layer_free: this.layer_free,
        layer_blend: this.layer_blend,
        layer_fix: {},
      },
      n = 0;
    $(".fixlayer").each(function () {
      layer_info.layer_fix[n] = $(this);
      n++;
    });
    return layer_info;
  },
  sortGameLayerKeys(keys) {
    var that = this;
    keys.sort(function (a, b) {
      return that.getGameLayerIndex(a) > that.getGameLayerIndex(b) ? 1 : -1;
    });
  },
  getGameLayerIndex: (key) =>
    "base" === key
      ? -1
      : key.indexOf("message") > -1
      ? 1e3 + (parseInt(key.replace("message", "")) || 0)
      : parseInt(key) || 0,
  setLayerHtml: function (layer) {
    var that = this,
      fore_keys = Object.keys(layer.map_layer_fore);
    this.sortGameLayerKeys(fore_keys);
    for (let key of fore_keys) {
      this.map_layer_fore[key].remove();
      delete this.map_layer_fore[key];
      this.map_layer_fore[key] = $.makeElementFromSave(
        layer.map_layer_fore[key],
        this.kag.array_white_attr
      );
      const parent_layer = this.map_layer_fore[key].attr("data-parent-layer");
      this.appendLayer(this.map_layer_fore[key], parent_layer);
    }
    var back_keys = Object.keys(layer.map_layer_back);
    this.sortGameLayerKeys(back_keys);
    for (let key of back_keys) {
      this.map_layer_back[key].remove();
      delete this.map_layer_back[key];
      this.map_layer_back[key] = $.makeElementFromSave(
        layer.map_layer_back[key],
        this.kag.array_white_attr
      );
      const parent_layer = this.map_layer_fore[key].attr("data-parent-layer");
      this.appendLayer(this.map_layer_back[key], parent_layer);
      this.map_layer_fore[key] &&
        this.map_layer_fore[key].after(this.map_layer_back[key]);
    }
    $(".fixlayer").each(function () {
      $(this).remove();
    });
    $(".three_canvas").each(function () {
      $(this).remove();
    });
    for (let key in layer.layer_fix)
      $("#tyrano_base").append(
        $.makeElementFromSave(layer.layer_fix[key], this.kag.array_white_attr)
      );
    $(".blendlayer").remove();
    for (let key in layer.layer_blend) {
      var obj = $.makeElementFromSave(
        layer.layer_blend[key],
        this.kag.array_white_attr
      );
      if (obj.hasClass("blendvideo")) {
        var video_pm = JSON.parse(obj.attr("data-video-pm"));
        video_pm.stop = "true";
        video_pm.time = 10;
        !(function () {
          var _video_pm = video_pm;
          setTimeout(function () {
            that.kag.ftag.startTag("layermode_movie", _video_pm);
          }, 10);
        })();
      } else $("#tyrano_base").append(obj);
    }
    this.layer_free.remove();
    delete this.layer_free;
    this.layer_free = $.makeElementFromSave(
      layer.layer_free,
      this.kag.array_white_attr
    );
    this.appendLayer(this.layer_free, "root_layer_system");
    this.layer_free.insertAfter(this.layer_menu);
  },
  clearMessageInnerLayerAll: function () {
    for (let key in this.map_layer_fore)
      -1 != key.indexOf("message") &&
        this.map_layer_fore[key].find(".message_inner").html("");
  },
  backlay: function (layer) {
    layer = layer || "";
    for (let key in this.map_layer_fore)
      if ("" == layer || layer == key) {
        var fore_class_name = this.map_layer_fore[key].attr("class"),
          back_class_name = this.map_layer_back[key].attr("class");
        this.map_layer_back[key] = this.map_layer_fore[key].clone();
        this.map_layer_back[key].removeClass(fore_class_name);
        this.map_layer_back[key].addClass(back_class_name);
        back_class_name = $.replaceAll(back_class_name, " ", ".");
        $("." + back_class_name).remove();
        this.map_layer_back[key].hide();
        this.appendLayer(this.map_layer_back[key]);
      }
  },
  showEventLayer: function (type) {
    this.layer_event.show();
  },
  hideEventLayer: function () {
    this.layer_event.hide();
  },
  cancelAllFreeLayerButtonsEvents: function () {
    const j_buttons = this.layer_free.find(".event-setting-element");
    this.kag.event.removeEventAttr(j_buttons);
    j_buttons.off("click mouseenter mouseleave mousedown touchstart");
    this.kag.makeUnfocusable(j_buttons);
  },
  forelay: function (layer) {
    layer = layer || "";
    for (let key in this.map_layer_back)
      if ("" == layer || layer == key) {
        var fore_class_name = this.map_layer_fore[key].attr("class"),
          back_class_name = this.map_layer_back[key].attr("class");
        this.map_layer_fore[key] = this.map_layer_back[key].clone(!0);
        this.map_layer_fore[key].removeClass(back_class_name);
        this.map_layer_fore[key].addClass(fore_class_name);
        fore_class_name = $.replaceAll(fore_class_name, " ", ".");
        $("." + fore_class_name).remove();
        this.map_layer_back[key].before(this.map_layer_fore[key]);
        this.map_layer_back[key].css("display", "none");
        -1 != key.indexOf("message") &&
          this.map_layer_fore[key].css("opacity", "");
      }
  },
  test: function () {},
};
