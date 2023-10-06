$.makeHash = function (num) {
  for (
    var l = num,
      c = "abcdefghijklmnopqrstuvwxyz0123456789",
      cl = c.length,
      r = "",
      i = 0;
    i < l;
    i++
  )
    r += c[Math.floor(Math.random() * cl)];
  return r;
};
$.three_pos = function (str) {
  var obj = {},
    arr_obj = str.split(",");
  if (1 == arr_obj.length) {
    obj.x = parseFloat(arr_obj[0]);
    obj.y = parseFloat(arr_obj[0]);
    obj.z = parseFloat(arr_obj[0]);
  } else {
    obj.x = parseFloat(arr_obj[0]);
    obj.y = parseFloat(arr_obj[1]);
    obj.z = parseFloat(arr_obj[2]);
  }
  return obj;
};
$.setVector = function (model) {
  var vector = {};
  vector.pos = {
    x: model.position.x,
    y: model.position.y,
    z: model.position.z,
  };
  vector.rot = {
    x: model.rotation.x,
    y: model.rotation.y,
    z: model.rotation.z,
  };
  vector.scale = { x: model.scale.x, y: model.scale.y, z: model.scale.z };
  return vector;
};
$.orgFloor = function (value, base) {
  return Math.floor(value * base) / base;
};
$.checkThreeModel = function (name) {
  return !!TYRANO.kag.tmp.three.models[name];
};
tyrano.plugin.kag.tag["3d_init"] = {
  vital: [],
  pm: {
    layer: "0",
    page: "fore",
    camera: "Perspective",
    near: "1",
    far: "5000",
    ambient_light: "1",
    directional_light: "0",
    antialias: "true",
    studio: "false",
    fps_rate: 0,
    stats: "false",
    background: "true",
    debug_pos: "true",
    next: "true",
  },
  clock: {},
  start: function (pm) {
    var that = this,
      target_layer = this.kag.layer.getLayer(pm.layer, pm.page);
    this.clock = new THREE.Clock();
    if ($(".three_canvas").length > 0) {
      this.kag.ftag.nextOrder();
      return;
    }
    var j_canvas = $("<canvas id='three' class='three_canvas'></canvas>"),
      sc_width = parseInt(this.kag.config.scWidth),
      sc_height = parseInt(this.kag.config.scHeight);
    j_canvas.css({ position: "absolute", width: sc_width, height: sc_height });
    target_layer.append(j_canvas);
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#three"),
      alpha: !0,
      antialias: $.toBoolean(pm.antialias),
      preserveDrawingBuffer: !0,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(sc_width, sc_height);
    const scene = new THREE.Scene(),
      camera_mode = pm.camera + "Camera",
      camera = new THREE[camera_mode](
        45,
        sc_width / sc_height,
        parseFloat(pm.near),
        parseFloat(pm.far)
      );
    camera.rotation.order = "YXZ";
    camera.position.set(0, 0, 1e3);
    this.kag.tmp.three.models.camera = new ThreeModel(
      { name: "camera", model: camera, mixer: null, gltf: null, pm: pm },
      three
    );
    var ray = new THREE.Raycaster(camera.position, new THREE.Vector3(0, -1, 0));
    this.kag.tmp.three.ray = ray;
    target_layer.show();
    const light_amb = new THREE.AmbientLight(
      16777215,
      parseFloat(pm.ambient_light)
    );
    scene.add(light_amb);
    const listener = new THREE.AudioListener();
    camera.add(listener);
    "true" == pm.studio && (this.kag.tmp.three.stat.fps.is_fps_studio = !0);
    if ("true" == pm.debug_pos) {
      let j_btn_get_pos = $(
        '<input class="btn_get_pos" type="button" value="カメラポジション" />'
      );
      j_btn_get_pos.on("click", (e) => {
        var camera = this.kag.tmp.three.camera;
        let str =
          "position:" +
          camera.position.x +
          "," +
          camera.position.y +
          "," +
          camera.position.z +
          "/rotation:" +
          camera.rotation.x +
          "," +
          camera.rotation.y +
          "," +
          camera.rotation.z;
        alert(str);
      });
      $("#debug_studio_area").append(j_btn_get_pos);
    }
    this.kag.tmp.three.stat.is_load = !0;
    this.kag.tmp.three.stat.canvas_show = !0;
    this.kag.tmp.three.stat.init_pm = pm;
    this.kag.tmp.three.camera = camera;
    this.kag.tmp.three.scene = scene;
    this.kag.tmp.three.renderer = renderer;
    this.kag.tmp.three.light_amb = light_amb;
    this.kag.tmp.three.audio_listener = listener;
    this.kag.tmp.three.groups = {};
    this.kag.tmp.three.groups.default = [];
    this.kag.tmp.three.target_layer = target_layer;
    this.kag.tmp.three.j_canvas = j_canvas;
    var three = this.kag.tmp.three;
    Math.random();
    let cnt_frame = 0,
      fps_stats = !1;
    three.stat.fps.fps_rate = parseInt(pm.fps_rate);
    if ("true" == pm.stats) {
      var stats = new Stats();
      stats.showPanel(0);
      document.body.appendChild(stats.dom);
      three.stats = stats;
      fps_stats = !0;
    }
    tick();
    function tick() {
      if (0 != three.stat.animation_loop) {
        if (0 != three.stat.fps.fps_rate) {
          if (three.stat.fps.fps_rate > cnt_frame) {
            cnt_frame++;
            var req_id = requestAnimationFrame(tick);
            return;
          }
          cnt_frame = 0;
        }
        1 == fps_stats && three.stats.begin();
        three.orbit_controls && three.orbit_controls.update();
        that.updateFrame();
        renderer.render(scene, camera);
        1 == fps_stats && three.stats.end();
        req_id = requestAnimationFrame(tick);
        0 == three.stat.is_load && window.cancelAnimationFrame(req_id);
      }
    }
    if ("false" == pm.background) {
      window.addEventListener(
        "focus",
        () => {
          three.stat.animation_loop = !1;
          setTimeout(() => {
            three.stat.animation_loop = !0;
            requestAnimationFrame(tick);
          }, 100);
        },
        !1
      );
      window.addEventListener(
        "blur",
        () => {
          three.stat.animation_loop = !1;
        },
        !1
      );
      window.addEventListener("visibilitychange", () => {
        if ("hidden" == document.visibilityState)
          three.stat.animation_loop = !1;
        else {
          three.stat.animation_loop = !0;
          requestAnimationFrame(tick);
        }
      });
    }
    this.initEvent(this.kag.tmp.three);
    "true" == pm.next && this.kag.ftag.nextOrder();
  },
  initEvent: function (three) {
    var that = this,
      renderer = three.renderer,
      target_layer = three.target_layer,
      j_canvas = three.j_canvas,
      camera = three.camera,
      scene = three.scene;
    j_canvas.on("mousemove", function (event, data) {
      void 0 !== data && (event = data);
      var x = event.clientX,
        y = event.clientY,
        mouse = new THREE.Vector2();
      mouse.x = (x / window.innerWidth) * 2 - 1;
      mouse.y = (-y / window.innerHeight) * 2 + 1;
      var raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      var intersects = raycaster.intersectObjects(scene.children, !0),
        name = "",
        distance = -1;
      if (intersects.length > 0) {
        for (key in intersects) {
          if (void 0 !== intersects[key].object.userData.mode) {
            name = "evt_" + intersects[key].object.uuid;
            distance = intersects[key].distance;
            break;
          }
          if (void 0 !== intersects[key].object.userData.name) {
            name = intersects[key].object.userData.name;
            distance = intersects[key].distance;
            break;
          }
        }
        if (1 == that.kag.stat.is_strong_stop && three.evt[name]) {
          if (0 == three.stat.start_event) return;
          if (
            "" != three.evt[name].ground &&
            three.evt[name].ground != three.stat.fps.ground
          )
            return;
          if ("click" != three.evt[name].mode) return;
          if ("" != three.evt[name].distance) {
            if (parseFloat(three.evt[name].distance) < distance) return;
          }
          "pointer" != $("body").css("cursor") &&
            $("body").css("cursor", "pointer");
          return;
        }
        "default" != $("body").css("cursor") &&
          $("body").css("cursor", "default");
      }
    });
    let flag_hold = !1;
    j_canvas.on("touchstart", function (event, data) {
      flag_hold = !0;
      setTimeout(function () {
        flag_hold && j_canvas.trigger("contextmenu", event);
      }, 1e3);
    });
    j_canvas.on("touchend", function (event, data) {
      flag_hold = !1;
    });
    j_canvas.on("click contextmenu", function (event, data) {
      void 0 !== data && (event = data);
      var x = 0,
        y = 0;
      if ("touchstart" == event.type) {
        var touchObject = event.changedTouches[0];
        event.type = "contextmenu";
        x = touchObject.pageX;
        y = touchObject.pageY;
        event.clientX = x;
        event.clientY = y - 100;
      } else {
        x = event.clientX;
        y = event.clientY;
      }
      var mouse = new THREE.Vector2();
      mouse.x = (x / window.innerWidth) * 2 - 1;
      mouse.y = (-y / window.innerHeight) * 2 + 1;
      var raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      var intersects = raycaster.intersectObjects(scene.children, !0),
        name = "",
        distance = -1;
      if (intersects.length > 0) {
        for (key in intersects) {
          if (void 0 !== intersects[key].object.userData.name) {
            name = intersects[key].object.userData.name;
            distance = intersects[key].distance;
            if ("contextmenu" == event.type) {
              if (three.evt[name + "contextmenu"]) {
                name += "contextmenu";
                break;
              }
            } else if (three.evt[name]) break;
          }
          if (void 0 !== intersects[key].object.uuid) {
            name = "evt_" + intersects[key].object.uuid;
            distance = intersects[key].distance;
            if (three.evt[name]) break;
          }
        }
        if (1 == three.stat.fps.is_fps_studio) {
          if (0 == three.stat.start_event) return;
          if ("" == name) {
            that.kag.cancelWeakStop();
            that.kag.ftag.startTag("jump", three.evt[name]);
            return;
          }
          var model_obj = that.kag.tmp.three.models[name];
          if (
            void 0 !== model_obj.pm._selectable &&
            "false" == model_obj.pm._selectable
          )
            return;
          TYRANO.kag.studio.selectObject(name, model_obj);
          return;
        }
        if (1 == that.kag.stat.is_strong_stop && three.evt[name]) {
          if (0 == three.stat.start_event) return;
          if (
            "" != three.evt[name].ground &&
            three.evt[name].ground != three.stat.fps.ground
          )
            return;
          let mode = three.evt[name].mode;
          if ("click" != mode && "contextmenu" != mode) return;
          if ("" != three.evt[name].distance) {
            let pm_distance = parseFloat(three.evt[name].distance);
            if (pm_distance < distance) return;
          }
          let type = three.evt[name].type;
          if ("jump" == type) {
            that.kag.layer.showEventLayer();
            that.kag.stat.f.eventUserData = three.evt[name];
            that.kag.ftag.startTag("jump", three.evt[name]);
            return;
          }
          if ("eval" == type) {
            that.kag.stat.f.eventUserData = three.evt[name];
            eval(three.evt[name].exp);
            return;
          }
        }
      }
      ("" != name && 0 != intersects.length) ||
        ($(".area_three_debug_object").get(0) &&
          TYRANO.kag.studio.selectCamera(
            "camera",
            that.kag.tmp.three.models.camera
          ));
    });
  },
  checkJoyStick: function (fps) {
    let joy = fps.joy;
    if (void 0 === window.app || void 0 === joy) return;
    let dir = joy.GetDir();
    if ("N" == dir || "NE" == dir || "NW" == dir) {
      fps.moveForward = !0;
      app.startWalk();
    } else fps.moveForward = !1;
    fps.moveBackward = "S" == dir || "SE" == dir || "SW" == dir;
    fps.rotateLeft = "NW" == dir || "W" == dir || "SW" == dir;
    fps.rotateRight = "NE" == dir || "E" == dir || "SE" == dir;
    fps.moveForward || fps.moveBackward || fps.rotateLeft || fps.rotateRight
      ? app.startWalk()
      : app.stopWalk();
  },
  getCollisionObjectID: function (object) {
    return void 0 !== object.userData.mode &&
      "collision" == object.userData.mode
      ? "evt_" + object.uuid
      : void 0 !== object.userData.name
      ? object.userData.name
      : "";
  },
  addUpdateFrame(name, func) {
    var three = this.kag.tmp.three;
    "function" == typeof func && (three.update_frame_methods[name] = func);
  },
  updateFrame: function () {
    var three = this.kag.tmp.three;
    let fps = three.stat.fps,
      that = this;
    fps.isJoy && this.checkJoyStick(fps);
    var methods = three.update_frame_methods;
    for (let key in methods) methods[key]();
    var camera = three.camera,
      models = three.models,
      delta = this.clock.getDelta();
    for (let key in models) models[key].mixer && models[key].update(delta);
    if (1 == three.stat.gyro.mode) {
      camera.rotation.x = three.stat.gyro.x;
      camera.rotation.y = three.stat.gyro.y;
    } else if (2 == three.stat.gyro.mode) {
      camera.position.x = three.stat.gyro.x;
      camera.position.y = three.stat.gyro.y;
    }
    var actualMoveSpeed = delta * fps.movementSpeed,
      actualRotateSpeed = delta * fps.rotateSpeed,
      speed_rot = 0.03;
    if (1 == fps.active) {
      var hitter = new THREE.Vector3(
          camera.position.x,
          camera.position.y + 10,
          camera.position.z
        ),
        _camera = camera,
        _hitMargin = 0.5,
        _hitteHeightOfset = 0,
        _frontMoveEnabled = !0,
        _backMoveEnabled = !0,
        _leftMoveEnabled = !0,
        _rightMoveEnabled = !0,
        _stop_move = !1,
        collision_event_name = "",
        dir_zf = new THREE.Vector3(0, 0, 1),
        ray_zf = new THREE.Raycaster();
      ray_zf.setFromCamera(dir_zf, camera);
      var objs_zf = ray_zf.intersectObjects(three.groups.default, !0);
      if (
        objs_zf.length > 0 &&
        objs_zf[0].distance < 10 + 3 * actualMoveSpeed
      ) {
        console.log(objs_zf[0]);
        console.log("zf");
        camera.position.z += 1;
        _stop_move = !0;
        collision_event_name = that.getCollisionObjectID(objs_zf[0].object);
      }
      var dir_zb = new THREE.Vector3(0, 0, 1);
      dir_zb.applyQuaternion(camera.quaternion);
      var ray_zb = new THREE.Raycaster(hitter, dir_zb),
        objs_zb = ray_zb.intersectObjects(three.groups.default, !0);
      if (
        objs_zb.length > 0 &&
        objs_zb[0].distance < 10 + 3 * actualMoveSpeed
      ) {
        camera.position.z -= 1;
        _stop_move = !0;
        collision_event_name = that.getCollisionObjectID(objs_zb[0].object);
      }
      var dir_xl = new THREE.Vector3(-1, 0, 0),
        ray_xl = new THREE.Raycaster();
      ray_xl.setFromCamera(dir_xl, camera);
      var objs_xl = ray_xl.intersectObjects(three.groups.default, !0);
      if (
        objs_xl.length > 0 &&
        objs_xl[0].distance < 10 + 3 * actualMoveSpeed
      ) {
        camera.position.x += 1;
        _stop_move = !0;
        collision_event_name = that.getCollisionObjectID(objs_xl[0].object);
      }
      var dir_xr = new THREE.Vector3(1, 0, 0),
        ray_xr = new THREE.Raycaster();
      ray_xr.setFromCamera(dir_xr, camera);
      var objs_xr = ray_xr.intersectObjects(three.groups.default, !0);
      if (
        objs_xr.length > 0 &&
        objs_xr[0].distance < 10 + 3 * actualMoveSpeed
      ) {
        camera.position.x -= 1;
        _stop_move = !0;
        var vector = new THREE.Vector3(0, 0, -1);
        vector.applyQuaternion(camera.quaternion);
        let angle = vector.angleTo(objs_xr[0].object.position);
        collision_event_name = that.getCollisionObjectID(objs_xr[0].object);
      }
      if ("" != collision_event_name && three.evt[collision_event_name]) {
        let evt_pm = three.evt[collision_event_name];
        if ("collision" == evt_pm.mode) {
          let type = evt_pm.type;
          if (1 == fps.moveForward) {
            camera.position.z += 10;
            fps.active = !1;
            setTimeout(() => {
              fps.active = !0;
            }, 1e3);
            if ("jump" == type) {
              three.stat.start_event = !1;
              that.kag.layer.showEventLayer();
              that.kag.ftag.startTag("jump", evt_pm);
              return;
            }
            if ("eval" == type) {
              eval(evt_pm.exp);
              return;
            }
          }
        }
      }
      if (1 == _stop_move) {
        fps.tmpMoveBuffer = 0;
        camera.position.x = fps.memory_pos.x;
        camera.position.y = fps.memory_pos.y;
        camera.position.z = fps.memory_pos.z;
        return;
      }
      fps.memory_pos.x = camera.position.x;
      fps.memory_pos.y = camera.position.y;
      fps.memory_pos.z = camera.position.z;
      var ray = new THREE.Raycaster();
      ray.setFromCamera(new THREE.Vector3(0, 0, 0), camera);
      const intersects = ray.intersectObjects(three.groups.default, !0);
      if (intersects.length > 0)
        var name = intersects[0].object.userData.name,
          dist = intersects[0].distance;
      var ray2 = new THREE.Raycaster();
      ray2.setFromCamera(new THREE.Vector3(0, -1, 0), camera);
      const intersects2 = ray2.intersectObjects(three.groups.default, !0);
      if (intersects2.length > 0) {
        var name = intersects2[0].object.userData.name;
        fps.ground = name;
      }
      if (fps.moveForward || fps.moveBackward);
      else {
        fps.offMoveBufferF = !1;
        fps.offMoveBufferB = !1;
      }
      if (fps.rotateLeft || fps.rotateRight);
      else {
        fps.offRotateBufferL = !1;
        fps.offRotateBufferR = !1;
      }
      (fps.rotateLeft || fps.offRotateBufferL) &&
        (fps.moveForward || fps.moveBackward,
        camera.translateX(-actualMoveSpeed));
      (fps.rotateRight || fps.offRotateBufferR) &&
        (fps.moveForward || fps.moveBackward,
        camera.translateX(+actualMoveSpeed));
      (fps.moveForward || fps.offMoveBufferF) &&
        camera.translateZ(-actualMoveSpeed);
      (fps.moveBackward || fps.offMoveBufferB) &&
        camera.translateZ(actualMoveSpeed);
      camera.position.y = fps.camera_pos_y;
    }
  },
};
tyrano.plugin.kag.tag["3d_model_new"] = {
  vital: ["name", "storage"],
  pm: {
    name: "",
    storage: "",
    pos: "0",
    rot: "0",
    scale: "100",
    tonemap: "true",
    motion: "",
    next: "true",
    folder: "",
    update: "",
  },
  start: function (pm) {
    var three = this.kag.tmp.three,
      folder = "";
    folder = "" != pm.folder ? pm.folder : "others/3d/model";
    var storage_url = "";
    storage_url = $.isHTTP(pm.storage)
      ? pm.storage
      : "./data/" + folder + "/" + pm.storage;
    var ext = $.getExt(pm.storage);
    if ("gltf" == ext || "glb" == ext) {
      new THREE.GLTFLoader().load(storage_url, (data) => {
        var gltf = data,
          model = gltf.scene;
        let pos = $.three_pos(pm.pos),
          scale = $.three_pos(pm.scale),
          rot = $.three_pos(pm.rot);
        model.position.set(pos.x, pos.y, pos.z);
        model.scale.set(scale.x, scale.y, scale.z);
        model.rotation.set(rot.x, rot.y, rot.z);
        const animations = gltf.animations;
        let mixer = new THREE.AnimationMixer(model);
        if (animations.length > 0) {
          let anim = animations[0];
          if ("" != pm.motion)
            for (var i = 0; i < animations.length; i++) {
              if (animations[i].name == pm.motion) {
                anim = animations[i];
                break;
              }
            }
          mixer.clipAction(anim).play();
        } else mixer = void 0;
        this.kag.tmp.three.models[pm.name] = new ThreeModel(
          { name: pm.name, model: model, mixer: mixer, gltf: gltf, pm: pm },
          three
        );
        "true" == pm.tonemap
          ? this.kag.tmp.three.models[pm.name].setToneMaped(!0)
          : this.kag.tmp.three.models[pm.name].setToneMaped(!1);
        "true" == pm.next && this.kag.ftag.nextOrder();
      });
    } else if ("obj" == ext) {
      var mtl_url = (obj_url = storage_url).replace(".obj", ".mtl");
      new THREE.MTLLoader().load(mtl_url, (materials) => {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        materials.toneMaped = !1;
        objLoader.load(obj_url, (obj) => {
          var model = obj;
          let pos = $.three_pos(pm.pos),
            scale = $.three_pos(pm.scale),
            rot = $.three_pos(pm.rot);
          model.position.set(pos.x, pos.y, pos.z);
          model.scale.set(scale.x, scale.y, scale.z);
          model.rotation.set(rot.x, rot.y, rot.z);
          this.kag.tmp.three.models[pm.name] = new ThreeModel(
            { name: pm.name, model: model, pm: pm },
            three
          );
          "true" == pm.tonemap
            ? this.kag.tmp.three.models[pm.name].setToneMaped(!0)
            : this.kag.tmp.three.models[pm.name].setToneMaped(!1);
          "true" == pm.next && this.kag.ftag.nextOrder();
        });
      });
    } else if ("json" == ext) {
      function toBase64Url(url, callback) {
        return new Promise((resolve) => {
          var xhr = new XMLHttpRequest();
          xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
              resolve(reader.result);
            };
            reader.readAsDataURL(xhr.response);
          };
          xhr.open("GET", url);
          xhr.responseType = "blob";
          xhr.send();
        });
      }
      function setEvent(object) {
        object.userData &&
          void 0 !== object.userData.mode &&
          (three.evt["evt_" + object.uuid] = object.userData);
        if (object.children) {
          const objects = object.children;
          for (let i = 0; i < objects.length; i++) setEvent(objects[i]);
        }
      }
      var obj_url = storage_url,
        objLoader = new THREE.ObjectLoader();
      $.loadText(obj_url, async (json) => {
        if ("" != pm.update) {
          const json_update = JSON.parse(pm.update),
            texture_update = json_update.texture || {},
            visible_update = json_update.visible || {},
            data_update = json_update.userData || {},
            object = json.object,
            materials = json.materials,
            textures = json.textures,
            images = json.images;
          await (async function set_texture_update(object) {
            void 0 !== visible_update[object.name] &&
              0 == visible_update[object.name] &&
              (object.visible = !1);
            if (void 0 !== data_update[object.name]) {
              object.userData = $.extend(
                object.userData,
                data_update[object.name]
              );
              object.userData.uuid && (object.uuid = object.userData.uuid);
            }
            if (object.material) {
              for (let i = 0; i < materials.length; i++) {
                const material = materials[i],
                  mat_uuid = material.uuid;
                if (!material.map) continue;
                const map = material.map;
                if (object.material == mat_uuid) {
                  const obj_name = object.name;
                  for (let j = 0; j < textures.length; j++) {
                    const texture = textures[j];
                    if (map == texture.uuid) {
                      const _image = texture.image;
                      for (let k = 0; k < images.length; k++) {
                        _image == images[k].uuid && (images[k].name = obj_name);
                      }
                    }
                  }
                }
              }
              for (let i = 0; i < images.length; i++) {
                const image = images[i];
                var data64 = "";
                if (texture_update[image.name]) {
                  const obj = texture_update[image.name];
                  if (obj.image) {
                    data64 = await toBase64Url(obj.image);
                    image.url = data64;
                  }
                  if (obj.repeat_x && obj.repeat_y)
                    for (let j = 0; j < textures.length; j++) {
                      const texture = textures[j];
                      image.uuid == texture.image &&
                        (texture.repeat = [
                          parseInt(obj.repeat_x),
                          parseInt(obj.repeat_y),
                        ]);
                    }
                }
              }
            }
            if (object.children) {
              const objects = object.children;
              for (let i = 0; i < objects.length; i++)
                await set_texture_update(objects[i]);
            }
          })(object);
        }
        setEvent(json.object);
        objLoader.parse(
          json,
          (obj) => {
            var model = obj;
            let pos = $.three_pos(pm.pos),
              scale = $.three_pos(pm.scale),
              rot = $.three_pos(pm.rot);
            model.position.set(pos.x, pos.y, pos.z);
            model.scale.set(scale.x, scale.y, scale.z);
            model.rotation.set(rot.x, rot.y, rot.z);
            this.kag.tmp.three.models[pm.name] = new ThreeModel(
              { name: pm.name, model: model, pm: pm },
              three
            );
            "true" == pm.next && this.kag.ftag.nextOrder();
          },
          (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
          },
          (err) => {
            console.error("An error happened");
          }
        );
      });
    } else this.kag.error("unsupported_extensions", { ext: ext });
  },
};
tyrano.plugin.kag.tag["3d_sphere_new"] = {
  vital: ["name"],
  pm: {
    name: "",
    type: "SphereGeometry",
    texture: "",
    color: "0x00ff00",
    radius: "300",
    width: "30",
    height: "30",
    side: "front",
    scale: "1",
    pos: "0",
    rot: "0",
    folder: "",
  },
  start: function (pm) {
    pm.arg1 = pm.radius;
    pm.arg2 = pm.width;
    pm.arg3 = pm.height;
    this.kag.ftag.startTag("obj_model_new", pm);
  },
};
tyrano.plugin.kag.tag["3d_sprite_new"] = {
  vital: ["name", "storage"],
  pm: {
    name: "",
    storage: "",
    scale: "",
    pos: "0",
    rot: "0",
    tonemap: "false",
    next: "true",
    folder: "",
  },
  start: function (pm) {
    var folder = "";
    folder = "" != pm.folder ? pm.folder : "others/3d/sprite";
    var storage_url = "";
    storage_url = $.isHTTP(pm.storage)
      ? pm.storage
      : "./data/" + folder + "/" + pm.storage;
    const material = new THREE.SpriteMaterial({
      map: new THREE.TextureLoader().load(storage_url),
      alphaTest: 0.5,
      transparent: !0,
    });
    "true" == pm.tonemap
      ? (material.toneMapped = !0)
      : (material.toneMapped = !1);
    var model = new THREE.Sprite(material);
    $("<img />")
      .attr("src", storage_url)
      .on("load", (e) => {
        var width = $(e.currentTarget).get(0).width,
          height = $(e.currentTarget).get(0).height;
        let pos = $.three_pos(pm.pos),
          rot = $.three_pos(pm.rot);
        model.position.set(pos.x, pos.y, pos.z);
        model.rotation.set(rot.x, rot.y, rot.z);
        if ("" == pm.scale)
          model.scale.set(1 * parseInt(width), 1 * parseInt(height), 1);
        else {
          let scale = $.three_pos(pm.scale);
          model.scale.set(scale.x, scale.y, scale.z);
          pm._load
            ? model.scale.set(scale.x, scale.y, scale.z)
            : model.scale.set(
                parseInt(width) * scale.x,
                parseInt(height) * scale.y,
                1
              );
        }
        var three = this.kag.tmp.three;
        three.scene;
        this.kag.tmp.three.models[pm.name] = new ThreeModel(
          { name: pm.name, model: model, pm: pm },
          three
        );
        "true" == pm.next && this.kag.ftag.nextOrder();
        "function" == typeof pm.callback && pm.callback();
      })
      .on("error", (e) => {
        console.log(e);
        "true" == pm.next && this.kag.ftag.nextOrder();
        return !1;
      });
  },
};
tyrano.plugin.kag.tag["3d_event"] = {
  vital: ["name"],
  pm: {
    name: "",
    type: "jump",
    exp: "",
    storage: "",
    target: "",
    distance: "",
    ground: "",
    mode: "click",
  },
  start: function (pm) {
    var three = this.kag.tmp.three;
    three.stat.start_event = !0;
    "contextmenu" == pm.mode
      ? (three.evt[pm.name + "contextmenu"] = pm)
      : (three.evt[pm.name] = pm);
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag["3d_event_delete"] = {
  vital: ["name"],
  pm: { name: "" },
  start: function (pm) {
    delete this.kag.tmp.three.evt[pm.name];
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag["3d_event_start"] = {
  vital: [],
  pm: {},
  start: function (pm) {
    this.kag.tmp.three.stat.start_event = !0;
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag["3d_event_stop"] = {
  vital: [],
  pm: {},
  start: function (pm) {
    this.kag.tmp.three.stat.start_event = !1;
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag["3d_box_new"] = {
  vital: ["name"],
  pm: {
    name: "",
    type: "BoxGeometry",
    texture: "",
    color: "0x00ff00",
    width: "1",
    height: "1",
    depth: "1",
    scale: "1",
    pos: "0",
    rot: "0",
    folder: "",
  },
  start: function (pm) {
    pm.arg1 = pm.width;
    pm.arg2 = pm.height;
    pm.arg3 = pm.depth;
    this.kag.ftag.startTag("obj_model_new", pm);
  },
};
tyrano.plugin.kag.tag["3d_image_new"] = {
  vital: ["name", "width"],
  pm: {
    name: "",
    type: "PlaneGeometry",
    texture: "",
    texture_repeat: "",
    width: "",
    height: "",
    width_vertical: "",
    width_seg: "1",
    height_seg: "1",
    scale: "1",
    pos: "0",
    rot: "0",
    doubleside: "false",
    tonemap: "false",
  },
  start: function (pm) {
    if ("" == pm.height) {
      var texture_url = "";
      texture_url =
        $.isBase64(pm.texture) || $.isHTTP(pm.texture)
          ? pm.texture
          : "./data/others/3d/texture/" + pm.texture;
      $("<img />")
        .attr("src", texture_url)
        .on("load", (e) => {
          var width = $(e.currentTarget).get(0).width,
            height = $(e.currentTarget).get(0).height,
            tmp = height / width;
          parseInt(width) < parseInt(height) &&
            "" != pm.width_vertical &&
            (pm.width = pm.width_vertical);
          pm.height = parseInt(parseInt(pm.width) * tmp);
          pm.arg1 = pm.width;
          pm.arg2 = pm.height;
          pm.arg3 = pm.width_seg;
          pm.arg4 = pm.height_seg;
          this.kag.ftag.startTag("obj_model_new", pm);
        })
        .on("error", (e) => {
          console.log(e);
          this.kag.ftag.nextOrder();
          return !1;
        });
    } else {
      pm.arg1 = pm.width;
      pm.arg2 = pm.height;
      pm.arg3 = pm.width_seg;
      pm.arg4 = pm.height_seg;
      this.kag.ftag.startTag("obj_model_new", pm);
    }
  },
};
tyrano.plugin.kag.tag.obj_model_new = {
  vital: ["name", "type"],
  pm: {
    name: "",
    type: "",
    texture: "",
    texture_repeat: "",
    color: "",
    arg1: 1,
    arg2: 1,
    arg3: 1,
    arg4: 1,
    update: "false",
    scale: "",
    pos: "",
    rot: "",
    side: "",
    doubleside: "false",
    tonemap: "true",
    user_data: "",
    motion: "",
    opacity: "",
    folder: "",
    next: "true",
  },
  start: function (pm) {
    var three = this.kag.tmp.three;
    three.scene;
    0 == pm.arg1 && (pm.arg1 = 1);
    0 == pm.arg2 && (pm.arg2 = 1);
    0 == pm.arg3 && (pm.arg3 = 1);
    0 == pm.arg4 && (pm.arg4 = 1);
    const geometry = new THREE[pm.type](
      parseFloat(pm.arg1),
      parseFloat(pm.arg2),
      parseFloat(pm.arg3),
      parseFloat(pm.arg4)
    );
    let material;
    if ("" != pm.texture)
      if ("BoxGeometry" == pm.type && pm.texture.split(",").length > 1) {
        var arr_texture = pm.texture.split(","),
          arr_material = [];
        const loader = new THREE.TextureLoader();
        for (let i = 0; i < arr_texture.length; i++) {
          "" == arr_texture[i] && (arr_texture[i] = "_system/green.png");
          var texture_url = "";
          texture_url =
            $.isBase64(pm.texture) || $.isHTTP(pm.texture)
              ? pm.texture
              : "./data/others/3d/texture/" + arr_texture[i];
          const texture = loader.load(texture_url);
          arr_material.push(
            new THREE.MeshBasicMaterial({
              alphaTest: 0.5,
              transparent: !0,
              map: texture,
            })
          );
        }
        material = arr_material;
      } else {
        texture_url = "";
        texture_url =
          $.isBase64(pm.texture) || $.isHTTP(pm.texture)
            ? pm.texture
            : "./data/others/3d/texture/" + pm.texture;
        const texture = new THREE.TextureLoader().load(texture_url);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        if ("" != pm.texture_repeat) {
          let array_texture = pm.texture_repeat.split(",");
          texture.repeat.set(
            parseInt(array_texture[0]),
            parseInt(array_texture[1])
          );
        }
        material = new THREE.MeshBasicMaterial({
          map: texture,
          alphaTest: 0.5,
          transparent: !0,
        });
      }
    else
      material = new THREE.MeshBasicMaterial({
        color: parseInt(pm.color.toLowerCase()),
        alphaTest: 0.5,
        transparent: !0,
      });
    "" != pm.side
      ? "front" == pm.side
        ? (material.side = THREE.FrontSide)
        : "back" == pm.side
        ? (material.side = THREE.BackSide)
        : "double" == pm.side && (material.side = THREE.DoubleSide)
      : "true" == pm.doubleside && (material.side = THREE.DoubleSide);
    "true" == pm.tonemap
      ? (material.toneMapped = !0)
      : (material.toneMapped = !1);
    "" != pm.opacity && (material.opacity = parseFloat(pm.opacity));
    const model = new THREE.Mesh(geometry, material);
    let pos = $.three_pos(pm.pos),
      scale = $.three_pos(pm.scale),
      rot = $.three_pos(pm.rot);
    model.position.set(pos.x, pos.y, pos.z);
    model.scale.set(scale.x, scale.y, scale.z);
    model.rotation.set(rot.x, rot.y, rot.z);
    "" != pm.user_data &&
      (model.userData = $.extend(model.userData, pm.user_data));
    this.kag.tmp.three.models[pm.name] = new ThreeModel(
      { name: pm.name, model: model, pm: pm },
      three
    );
    "true" == pm.next && this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.obj_model_mod = {
  vital: ["name"],
  pm: {
    name: "",
    jname: "",
    type: "",
    texture: "",
    texture_repeat: "",
    side: "",
    doubleside: "",
    storage: "",
    texture_reload: "true",
    scale: "",
    pos: "",
    rot: "",
    width: "",
    height: "",
    depth: "",
    color: "",
    visible: "",
    next: "true",
  },
  start: function (pm) {
    this.kag.tmp.three.scene;
    if (0 == $.checkThreeModel(pm.name)) return;
    let model = this.kag.tmp.three.models[pm.name];
    if ("" != pm.pos) {
      let pos = $.three_pos(pm.pos);
      model.setPosition(pos.x, pos.y, pos.z);
    }
    if ("" != pm.scale) {
      let scale = $.three_pos(pm.scale);
      model.setScale(scale.x, scale.y, scale.z);
    }
    if ("" != pm.rot) {
      let rot = $.three_pos(pm.rot);
      model.setRotation(rot.x, rot.y, rot.z);
    }
    "" != pm.jname && (model.pm.jname = pm.jname);
    let folder = "texture";
    if ("" != pm.storage) {
      pm.texture = pm.storage;
      folder = "sprite";
    }
    if ("" != pm.color) {
      let material = new THREE.MeshBasicMaterial({
        color: parseInt(pm.color.toLowerCase()),
        alphaTest: 0.5,
        transparent: !0,
      });
      model.model.material = material;
      model.pm.color = pm.color;
    }
    if ("" != pm.side) {
      model.pm.side = pm.side;
      "front" == pm.side
        ? (model.model.material.side = THREE.FrontSide)
        : "back" == pm.side
        ? (model.model.material.side = THREE.BackSide)
        : "double" == pm.side && (model.model.material.side = THREE.DoubleSide);
    } else if ("" != pm.doubleside) {
      model.pm.doubleside = pm.doubleside;
      "true" == pm.doubleside
        ? (model.model.material.side = THREE.DoubleSide)
        : (model.model.material.side = THREE.FrontSide);
    }
    if ("" != pm.texture)
      if ("BoxGeometry" == model.pm.type && pm.texture.split(",").length > 1) {
        var arr_texture = pm.texture.split(","),
          arr_material = [];
        const loader = new THREE.TextureLoader();
        model.pm.texture = pm.texture;
        model.pm.multi = "true";
        for (let i = 0; i < arr_texture.length; i++) {
          var texture_url = "";
          texture_url = $.isHTTP(pm.texture)
            ? pm.texture
            : "./data/others/3d/texture/" + arr_texture[i];
          const texture = loader.load(texture_url);
          arr_material.push(
            new THREE.MeshBasicMaterial({
              map: texture,
              alphaTest: 0.5,
              transparent: !0,
            })
          );
        }
        material = arr_material;
        model.model.material = material;
      } else {
        texture_url = "";
        texture_url = $.isHTTP(pm.texture)
          ? pm.texture
          : "./data/others/3d/" + folder + "/" + pm.texture;
        model.pm.texture = pm.texture;
        model.pm.multi = "false";
        $("<img />")
          .attr("src", texture_url)
          .on("load", (e) => {
            var width = $(e.currentTarget).get(0).width,
              tmp = $(e.currentTarget).get(0).height / width;
            parseFloat(model.model.scale.x);
            const texture = new THREE.TextureLoader().load(texture_url);
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            if ("false" == pm.texture_reload) {
              if ("sphere" != model.pm._type)
                if ("" != pm.texture_repeat) {
                  let array_texture = pm.texture_repeat.split(",");
                  texture.repeat.set(
                    parseInt(array_texture[0]),
                    parseInt(array_texture[1])
                  );
                } else {
                  let rx = model.model.material.map.repeat.x,
                    ry = model.model.material.map.repeat.y;
                  texture.repeat.set(parseInt(rx), parseInt(ry));
                }
              model.model.material.map = texture;
            } else {
              let material = new THREE.MeshBasicMaterial({
                map: texture,
                alphaTest: 0.5,
                transparent: !0,
              });
              model.model.material = material;
            }
            model.needsUpdate();
            "true" == pm.next && this.kag.ftag.nextOrder();
          })
          .on("error", (e) => {
            console.log(e);
            "true" == pm.next && this.kag.ftag.nextOrder();
            return !1;
          });
      }
    else if ("" != pm.texture_repeat) {
      model.pm.texture_repeat = pm.texture_repeat;
      let array_texture = pm.texture_repeat.split(",");
      model.model.material.map.repeat.set(
        parseInt(array_texture[0]),
        parseInt(array_texture[1])
      );
      model.needsUpdate();
    }
    if ("" != pm.visible) {
      let flag_visible = !1;
      "true" == pm.visible && (flag_visible = !0);
      model.setVisible(flag_visible);
    }
  },
};
tyrano.plugin.kag.tag["3d_model_mod"] = {
  vital: ["name"],
  pm: { name: "", type: "", scale: "", pos: "", rot: "", next: "true" },
  start: function (pm) {
    this.kag.tmp.three.scene;
    if (0 == $.checkThreeModel(pm.name)) return;
    let model = this.kag.tmp.three.models[pm.name];
    if ("" != pm.pos) {
      let pos = $.three_pos(pm.pos);
      model.setPosition(pos.x, pos.y, pos.z);
    }
    if ("" != pm.scale) {
      let scale = $.three_pos(pm.scale);
      model.setScale(scale.x, scale.y, scale.z);
    }
    if ("" != pm.rot) {
      let rot = $.three_pos(pm.rot);
      model.setRotation(rot.x, rot.y, rot.z);
    }
  },
};
tyrano.plugin.kag.tag["3d_video_play"] = {
  vital: ["name"],
  pm: {
    name: "",
    texture: "",
    scale: "",
    pos: "",
    rot: "",
    auto: "false",
    loop: "true",
    next: "true",
  },
  start: function (pm) {
    this.kag.tmp.three.scene;
    if (0 == $.checkThreeModel(pm.name)) return;
    var texture_url = "";
    texture_url = $.isHTTP(pm.texture)
      ? pm.texture
      : "./data/others/3d/texture/" + pm.texture;
    let model = this.kag.tmp.three.models[pm.name];
    function stop_video(model) {
      model.video.remove();
      delete model.video;
      const mat = model.old_material;
      model.model.material = mat;
      model.needsUpdate();
    }
    if (model.video) {
      stop_video(model);
      return !1;
    }
    const video = $(
      "<video loop='" + pm.loop + "' src='" + texture_url + "' />"
    ).get(0);
    if ("true" == pm.auto) {
      video.muted = !0;
      video.autoplay = !0;
    }
    setTimeout(function () {
      video.play();
    }, 300);
    video.addEventListener("ended", function () {
      "false" == pm.loop && stop_video(model);
    });
    const video_texture = new THREE.VideoTexture(video);
    let material = new THREE.MeshBasicMaterial({
      map: video_texture,
      alphaTest: 0.5,
      transparent: !0,
    });
    const old_material = model.model.material;
    model.video = video;
    model.old_material = old_material;
    model.model.material = material;
    model.needsUpdate();
    "true" == pm.next && this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag["3d_sprite_mod"] = {
  vital: ["name"],
  pm: {
    name: "",
    jname: "",
    type: "",
    texture: "",
    texture_repeat: "",
    storage: "",
    texture_reload: "true",
    scale: "",
    pos: "",
    rot: "",
    width: "",
    height: "",
    depth: "",
    next: "true",
  },
  start: function (pm) {
    this.kag.tmp.three.scene;
    if (0 == $.checkThreeModel(pm.name)) return;
    let model = this.kag.tmp.three.models[pm.name];
    if ("" != pm.pos) {
      let pos = $.three_pos(pm.pos);
      model.setPosition(pos.x, pos.y, pos.z);
    }
    if ("" != pm.scale) {
      let scale = $.three_pos(pm.scale);
      model.setScale(scale.x, scale.y, scale.z);
    }
    if ("" != pm.rot) {
      let rot = $.three_pos(pm.rot);
      model.setRotation(rot.x, rot.y, rot.z);
    }
    "" != pm.jname && (model.pm.jname = pm.jname);
    let folder = "sprite";
    pm.texture = pm.storage;
    folder = "sprite";
    if ("" != pm.texture) {
      var texture_url = "";
      texture_url = $.isHTTP(pm.texture)
        ? pm.texture
        : "./data/others/3d/sprite/" + pm.texture;
      model.pm.texture = pm.texture;
      model.pm.storage = pm.texture;
      $("<img />")
        .attr("src", texture_url)
        .on("load", (e) => {
          var width = $(e.currentTarget).get(0).width,
            tmp = $(e.currentTarget).get(0).height / width,
            scale_y = parseFloat(model.model.scale.x) * tmp;
          const texture = new THREE.TextureLoader().load(texture_url);
          if ("false" == pm.texture_reload) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            if ("" != pm.texture_repeat) {
              let array_texture = pm.texture_repeat.split(",");
              texture.repeat.set(
                parseInt(array_texture[0]),
                parseInt(array_texture[1])
              );
            } else {
              let rx = model.model.material.map.repeat.x,
                ry = model.model.material.map.repeat.y;
              texture.repeat.set(parseInt(rx), parseInt(ry));
            }
            model.model.material.map = texture;
          } else {
            model.setScale(model.model.scale.x, scale_y, 1);
            let material = new THREE.SpriteMaterial({
              map: texture,
              alphaTest: 0.5,
              transparent: !0,
            });
            model.model.material = material;
          }
          model.needsUpdate();
          "true" == pm.next && this.kag.ftag.nextOrder();
        })
        .on("error", (e) => {
          console.log(e);
          "true" == pm.next && this.kag.ftag.nextOrder();
          return !1;
        });
    } else if ("" != pm.texture_repeat) {
      model.pm.texture_repeat = pm.texture_repeat;
      let array_texture = pm.texture_repeat.split(",");
      model.model.material.map.repeat.set(
        parseInt(array_texture[0]),
        parseInt(array_texture[1])
      );
      model.needsUpdate();
    }
  },
};
tyrano.plugin.kag.tag["3d_show"] = {
  vital: ["name"],
  pm: {
    name: "",
    group: "default",
    group_uuid: "",
    time: "500",
    scale: "",
    pos: "",
    rot: "",
    force_sprite: "false",
    wait: "true",
    visible: "true",
  },
  start: function (pm) {
    var three = this.kag.tmp.three;
    if (0 != $.checkThreeModel(pm.name)) {
      var model = this.kag.tmp.three.models[pm.name];
      if ("template" === model.pm._type) {
        var models = this.kag.tmp.three.models;
        let group_name = model.pm.name;
        for (let key in models) {
          var _model = models[key];
          _model.pm.group && _model.pm.group == group_name && _model.show();
        }
      }
      (model.model.isSprite || "true" == pm.force_sprite) &&
        (pm.group = "sprite");
      three.groups[pm.group] || (three.groups[pm.group] = []);
      three.groups[pm.group].push(model.model);
      model.model.name = pm.name;
      if ("" != pm.group_uuid) {
        three.scene.getObjectByProperty("uuid", pm.group_uuid).add(model.model);
      } else three.scene.add(model.model);
      var options = { duration: parseInt(pm.time) };
      if ("" != pm.pos) {
        let pos = $.three_pos(pm.pos);
        model.setPosition(pos.x, pos.y, pos.z);
      }
      if ("" != pm.scale) {
        let scale = $.three_pos(pm.scale);
        model.setScale(scale.x, scale.y, scale.z);
      }
      if ("" != pm.rot) {
        let rot = $.three_pos(pm.rot);
        model.setRotation(rot.x, rot.y, rot.z);
      }
      if ("true" == pm.visible)
        if ("0" == pm.time) {
          console.log(model);
          model.show();
          this.kag.ftag.nextOrder();
        } else if ("true" == pm.wait)
          model.fade("in", options, () => {
            this.kag.ftag.nextOrder();
          });
        else {
          model.fade("in", options);
          this.kag.ftag.nextOrder();
        }
      else {
        model.setVisible(!1);
        this.kag.ftag.nextOrder();
      }
    }
  },
};
tyrano.plugin.kag.tag["3d_clone"] = {
  vital: ["name"],
  pm: { name: "", time: "500", scale: "", pos: "", rot: "" },
  start: function (pm) {
    var three = this.kag.tmp.three;
    if (0 != $.checkThreeModel(pm.name)) {
      var model_obj = this.kag.tmp.three.models[pm.name].model.clone();
      if ("" != pm.pos) {
        let pos = $.three_pos(pm.pos);
        model_obj.position.set(pos.x, pos.y, pos.z);
        if ("camera" == pm.name && "" != pm.lookat)
          if (three.models[pm.lookat]) {
            var model = three.models[pm.lookat].model;
            let pos = { x: 0, y: 0, z: 0 };
            pos.x = model.position.x;
            pos.y = model.position.y;
            pos.z = model.position.z;
            map_type.position = pos;
          } else map_type.position = $.three_pos(pm.lookat);
        else map_type.position = $.three_pos(pm.pos);
      }
      "" != pm.rot && (map_type.rotation = $.three_pos(pm.rot));
      if ("" != pm.scale) {
        let scale = $.three_pos(pm.scale);
        model_obj.scale.set(scale.x, scale.y, scale.z);
      }
      if ("" != pm.rot) {
        let rot = $.three_pos(pm.rot);
        model_obj.rotation.set(rot.x, rot.y, rot.z);
      }
      var cnt_fin = 0,
        cnt_type = Object.keys(map_type).length;
      for (let key in map_type) {
        let pos = map_type[key];
        var type = key;
        this.kag.tmp.three.models[pm.name].toAnim(type, pos, options, () => {
          ++cnt_fin >= cnt_type &&
            "true" == pm.wait &&
            this.kag.ftag.nextOrder();
        });
      }
      three.scene.add(model_obj);
      this.kag.ftag.nextOrder();
    }
  },
};
tyrano.plugin.kag.tag["3d_hide"] = {
  vital: ["name"],
  pm: { name: "", time: "500", next: "true", wait: "true" },
  start: function (pm) {
    if (0 != $.checkThreeModel(pm.name)) {
      var three = this.kag.tmp.three,
        options = { duration: parseInt(pm.time) },
        model = this.kag.tmp.three.models[pm.name];
      if ("true" == pm.wait)
        model.fade("out", options, (_model) => {
          this.kag.ftag.nextOrder();
          three.scene.remove(_model);
        });
      else {
        model.fade("out", options, (_model) => {
          three.scene.remove(_model);
        });
        this.kag.ftag.nextOrder();
      }
    }
  },
};
tyrano.plugin.kag.tag["3d_hide_all"] = {
  vital: [],
  pm: { time: "500", wait: "true" },
  start: function (pm) {
    var three = this.kag.tmp.three,
      options = { duration: parseInt(pm.time) },
      models = this.kag.tmp.three.models,
      cnt_fade = 0,
      fin_fade = 0;
    for (let key in models)
      if ("camera" != key) {
        cnt_fade++;
        if ("true" == pm.wait)
          models[key].fade("out", options, (_model) => {
            three.scene.remove(_model);
            fin_fade++;
            cnt_fade == fin_fade && this.kag.ftag.nextOrder();
          });
        else {
          models[key].fade("out", options, (_model) => {
            three.scene.remove(_model);
            fin_fade++;
          });
          this.kag.ftag.nextOrder();
        }
      }
    0 == cnt_fade && this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag["3d_delete"] = {
  vital: ["name"],
  pm: { name: "", next: "true" },
  start: function (pm) {
    if (0 != $.checkThreeModel(pm.name)) {
      var three = this.kag.tmp.three,
        models = this.kag.tmp.three.models,
        model = models[pm.name];
      if (model.model) {
        model.model.clear();
        three.scene.remove(model.model);
      }
      if ("template" == model.pm._type) {
        let group_name = model.pm.name;
        for (let key in models) {
          var _model = models[key];
          if (_model.pm.group && _model.pm.group == group_name) {
            three.scene.remove(_model.model);
            delete this.kag.tmp.three.models[key];
          }
        }
      }
      delete this.kag.tmp.three.models[pm.name];
      "true" == pm.next && this.kag.ftag.nextOrder();
    }
  },
};
tyrano.plugin.kag.tag["3d_delete_all"] = {
  vital: [],
  pm: {},
  start: function (pm) {
    var three = this.kag.tmp.three,
      models = this.kag.tmp.three.models;
    for (let key in models)
      if ("camera" != key) {
        var model = models[key];
        three.scene.remove(model.model);
        delete three.models[key];
      }
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag["3d_canvas_show"] = {
  vital: [],
  pm: { time: "1000" },
  start: function (pm) {
    var three = this.kag.tmp.three;
    this.kag.tmp.three.stat.canvas_show = !0;
    three.j_canvas.fadeIn(parseInt(pm.time), () => {
      this.kag.ftag.nextOrder();
    });
  },
};
tyrano.plugin.kag.tag["3d_canvas_hide"] = {
  vital: [],
  pm: { time: "1000" },
  start: function (pm) {
    var three = this.kag.tmp.three;
    this.kag.tmp.three.stat.canvas_show = !1;
    three.j_canvas.fadeOut(parseInt(pm.time), () => {
      this.kag.ftag.nextOrder();
    });
  },
};
tyrano.plugin.kag.tag["3d_close"] = {
  vital: [],
  pm: {},
  start: function (pm) {
    var three = this.kag.tmp.three;
    three.stat.is_load = !1;
    three.stat.canvas_show = !1;
    three.j_canvas && three.j_canvas.remove();
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag["3d_anim"] = {
  vital: ["name"],
  pm: {
    name: "",
    time: "1000",
    effect: "linear",
    pos: "",
    rot: "",
    scale: "",
    walk: "false",
    lookat: "",
    callback: "",
    wait: "true",
    next: "true",
  },
  start: function (pm) {
    if (0 != $.checkThreeModel(pm.name)) {
      var three = this.kag.tmp.three,
        options = {
          duration: parseInt(pm.time),
          easing: pm.effect,
          walk: pm.walk,
        },
        map_type = {};
      if ("" != pm.pos)
        if ("camera" == pm.name && "" != pm.lookat)
          if (three.models[pm.lookat]) {
            var model = three.models[pm.lookat].model;
            (pos = { x: 0, y: 0, z: 0 }).x = model.position.x;
            pos.y = model.position.y;
            pos.z = model.position.z;
            map_type.position = pos;
          } else map_type.position = $.three_pos(pm.lookat);
        else map_type.position = $.three_pos(pm.pos);
      "" != pm.rot && (map_type.rotation = $.three_pos(pm.rot));
      "" != pm.scale && (map_type.scale = $.three_pos(pm.scale));
      var cnt_fin = 0,
        cnt_type = Object.keys(map_type).length;
      for (let key in map_type) {
        var pos = map_type[key],
          type = key;
        this.kag.tmp.three.models[pm.name].toAnim(type, pos, options, () => {
          if (++cnt_fin >= cnt_type) {
            "true" == pm.wait && "true" == pm.next && this.kag.ftag.nextOrder();
            "function" == typeof pm.callback && pm.callback();
          }
        });
      }
      "true" != pm.wait && "true" == pm.next && this.kag.ftag.nextOrder();
    }
  },
};
tyrano.plugin.kag.tag["3d_anim_stop"] = {
  vital: ["name"],
  pm: { name: "", finish: "true" },
  start: function (pm) {
    if (0 != $.checkThreeModel(pm.name)) {
      this.kag.tmp.three;
      this.kag.tmp.three.models[pm.name].stopAnim(pm.finish);
      this.kag.ftag.nextOrder();
    }
  },
};
tyrano.plugin.kag.tag["3d_scene"] = {
  vital: [],
  pm: {
    tonemap: "",
    tonemap_value: "0.8",
    light_amb: "",
    fog: "",
    fog_range: "1,3000",
    fog_color: "0xFFFFFF",
    next: "true",
  },
  start: function (pm) {
    var three = this.kag.tmp.three,
      scene = three.scene,
      renderer = (three.camera, three.renderer);
    if ("" != pm.light_amb) {
      three.stat.scene_pm.light_amb = pm.light_amb;
      three.light_amb.intensity = parseFloat(pm.light_amb);
    }
    if ("" != pm.tonemap) {
      three.stat.scene_pm.tonemap = pm.tonemap;
      renderer.toneMapping = THREE[pm.tonemap + "ToneMapping"];
      renderer.toneMappingExposure = parseFloat(pm.tonemap_value);
      for (let key in three.models) three.models[key].needsUpdate();
    }
    if ("" != pm.fog)
      if ("true" == pm.fog) {
        three.stat.scene_pm.fog = pm.fog;
        three.stat.scene_pm.fog_color = pm.fog_color;
        three.stat.scene_pm.fog_range = pm.fog_range;
        var fog_tmp = pm.fog_range.split(",");
        scene.fog = new THREE.Fog(
          parseInt(pm.fog_color),
          parseFloat(fog_tmp[0]),
          parseFloat(fog_tmp[1])
        );
      } else {
        three.stat.scene_pm.fog;
        scene.fog.near = 0.1;
        scene.fog.far = 0;
      }
    "true" == pm.next && this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag["3d_camera"] = {
  vital: [],
  pm: { pos: "", rot: "", lookat: "", next: "true" },
  start: function (pm) {
    var three = this.kag.tmp.three,
      camera = three.camera;
    three.renderer;
    if ("" != pm.pos) {
      let pos = $.three_pos(pm.pos);
      camera.position.set(pos.x, pos.y, pos.z);
    }
    if ("" != pm.rot) {
      let rot = $.three_pos(pm.rot);
      camera.rotation.set(rot.x, rot.y, rot.z);
    }
    if ("" != pm.lookat) {
      var pos = { x: 0, y: 0, z: 0 };
      if (three.models[pm.lookat]) {
        var model = TYRANO.kag.tmp.three.models[pm.lookat].model;
        pos.x = model.position.x;
        pos.y = model.position.y;
        pos.z = model.position.z;
      } else pos = $.three_pos(pm.lookat);
      camera.lookAt(new THREE.Vector3(pos.x, pos.y, pos.z));
    }
    "true" == pm.next && this.kag.ftag.nextOrder();
  },
};
(tyrano.plugin.kag.tag["3d_gyro"] = {
  vital: [],
  pm: { max_x: "30", max_y: "30", mode: "rotation", next: "true" },
  start: function (pm) {
    var three = this.kag.tmp.three,
      camera = three.camera;
    three.renderer;
    {
      const GyroMonitor = (device_type) => {
        var first_beta = 0,
          first_gamma = 0,
          first_flag = !0,
          max_y = parseFloat(pm.max_y),
          max_x = parseFloat(pm.max_x),
          default_camera_y = camera.rotation.y,
          default_camera_x = camera.rotation.x,
          default_camera_pos_y = camera.position.y,
          default_camera_pos_x = camera.position.x,
          angle = 0;
        parseInt(pm.frame);
        three.stat.gyro.pm = pm;
        const orientEvent = (e) => {
          if (1 == first_flag) {
            first_flag = !1;
            first_beta = e.beta;
            first_gamma = e.gamma;
            angle = this.kag.tmp.angle;
            "rotation" == pm.mode
              ? (three.stat.gyro.mode = 1)
              : (three.stat.gyro.mode = 2);
            if (0 != angle) [max_x, max_y] = [max_y, max_x];
            else {
              max_x = pm.max_x;
              max_y = pm.max_y;
            }
          }
          if (angle == this.kag.tmp.angle) {
            if (0 != angle) {
              var t_gamma = e.gamma;
              if (-90 == angle) {
                if (t_gamma < 0) return;
              } else if (90 == angle && t_gamma > 0) return;
            }
            var hen_y = first_beta - e.beta,
              hen_x = first_gamma - e.gamma;
            Math.abs(hen_y) > max_y && (hen_y = hen_y > 0 ? max_y : -1 * max_y);
            Math.abs(hen_x) > max_x && (hen_x = hen_x > 0 ? max_x : -1 * max_x);
            var gyro_x = 0,
              gyro_y = 0;
            if (1 == three.stat.gyro.mode) {
              if (0 == angle) {
                gyro_y = default_camera_x - hen_x * (Math.PI / 180);
                gyro_x = default_camera_y - hen_y * (Math.PI / 180);
              } else if (-90 == angle) {
                gyro_y = default_camera_y + hen_y * (Math.PI / 180);
                gyro_x = default_camera_x - hen_x * (Math.PI / 180);
              } else if (90 == angle) {
                gyro_y = default_camera_y + -1 * hen_y * (Math.PI / 180);
                gyro_x = default_camera_x - -1 * hen_x * (Math.PI / 180);
              }
            } else if (2 == three.stat.gyro.mode)
              if (0 == angle) {
                gyro_x = default_camera_pos_y + 10 * hen_x;
                gyro_y = default_camera_pos_x + 10 * hen_y;
              } else if (-90 == angle) {
                gyro_y = default_camera_pos_y + 10 * hen_x;
                gyro_x = default_camera_pos_x + 10 * hen_y;
              } else if (90 == angle) {
                gyro_y = default_camera_pos_y + 10 * hen_x;
                gyro_x = default_camera_pos_x + 10 * hen_y;
              }
            three.stat.gyro.x = gyro_x;
            three.stat.gyro.y = gyro_y;
          } else first_flag = !0;
        };
        var sc_width = parseInt(this.kag.config.scWidth),
          sc_height = parseInt(this.kag.config.scHeight),
          sc_x = sc_width / 2,
          sc_y = sc_height / 2;
        const mouseMoveEvent = (e) => {
          var x = e.clientX,
            y = e.clientY,
            p_x = (x -= sc_x) / sc_x,
            p_y = (y = -1 * (y - sc_y)) / sc_y,
            max_x = parseFloat(pm.max_x),
            max_y = parseFloat(pm.max_y),
            gyro_x = 0,
            gyro_y = 0;
          if (1 == first_flag) {
            first_flag = !1;
            "rotation" == pm.mode
              ? (three.stat.gyro.mode = 1)
              : (three.stat.gyro.mode = 2);
          }
          if (1 == three.stat.gyro.mode) {
            gyro_x = default_camera_x + max_x * p_x * (Math.PI / 180);
            gyro_y = default_camera_y - max_y * p_y * (Math.PI / 180);
          } else if (2 == three.stat.gyro.mode) {
            gyro_y = default_camera_pos_x + max_x * p_x;
            gyro_x = default_camera_pos_y + max_y * p_y;
          }
          three.stat.gyro.x = gyro_y;
          three.stat.gyro.y = gyro_x;
        };
        if ("pc" == device_type) {
          $(".tyrano_base")
            .get(0)
            .removeEventListener("mousemove", mouseMoveEvent);
          $(".tyrano_base")
            .get(0)
            .addEventListener("mousemove", mouseMoveEvent, !0);
        } else {
          window.removeEventListener("deviceorientation", orientEvent);
          window.addEventListener("deviceorientation", orientEvent, !0);
        }
      };
      (() => {
        "pc" != $.userenv()
          ? DeviceMotionEvent &&
            ("function" == typeof DeviceMotionEvent.requestPermission
              ? DeviceMotionEvent.requestPermission()
                  .then((permissionState) => {
                    "granted" === permissionState && GyroMonitor("sp");
                  })
                  .catch(console.error)
              : GyroMonitor("sp"))
          : GyroMonitor("pc");
      })();
    }
    "true" == pm.next && this.kag.ftag.nextOrder();
  },
}),
  (tyrano.plugin.kag.tag["3d_gyro_stop"] = {
    vital: [],
    pm: { max_x: "30", max_y: "30", frame: "1", next: "true" },
    start: function (pm) {
      var three = this.kag.tmp.three;
      three.camera, three.renderer;
      three.stat.gyro.mode = 0;
      this.kag.ftag.nextOrder();
    },
  }),
  (tyrano.plugin.kag.tag["3d_debug_camera"] = {
    vital: [],
    pm: {
      name: "camera",
      button_text: "カメラインスペクタを閉じる",
      menu: "true",
      menu_close: "true",
      rotate: "true",
      move: "true",
    },
    start: function (pm) {
      var three = this.kag.tmp.three,
        j_canvas = three.j_canvas,
        target_layer = three.target_layer,
        old_target_layer_zindex = target_layer.css("z-index"),
        old_canvas_zindex = j_canvas.css("z-index"),
        model = this.kag.tmp.three.models[pm.name].model,
        renderer = three.renderer,
        mousedown =
          (three.camera,
          parseInt(this.kag.config.scWidth),
          parseInt(this.kag.config.scHeight),
          !1),
        button = 0,
        original_v =
          (new THREE.Vector3(),
          new THREE.Vector3(),
          new THREE.Vector3(),
          $.setVector(model)),
        first_client_x = 0,
        first_client_y = 0,
        spot_client_x = 0,
        spot_client_y = 0,
        first_model_x = 0,
        first_model_y = 0;
      function evt_mousewheel(e) {
        return !1;
      }
      function evt_mousedown(e) {
        if (0 == e.button && "true" == pm.rotate) {
          button = 0;
          first_client_x = e.clientX;
          first_client_y = e.clientY;
          first_model_x = model.rotation.x;
          first_model_y = model.rotation.y;
          $(".panel_chat").css("pointer-events", "none");
        } else if (1 == e.button && "true" == pm.move) {
          button = 1;
          first_client_y = e.clientY;
          model.position.z;
        } else {
          if (2 != e.button || "true" != pm.move) {
            mousedown = !1;
            return;
          }
          button = 2;
          first_client_x = e.clientX;
          first_client_y = e.clientY;
          first_model_x = model.position.x;
          first_model_y = model.position.y;
        }
        mousedown = !0;
      }
      function evt_mousemove(e) {
        if (1 != three.stat.fps.move_trans_control && mousedown) {
          three.stat.start_event = !1;
          if (0 == button) {
            var hen_x = first_client_x - e.clientX;
            model.rotation.y = first_model_y + 0.005 * hen_x;
            var hen_y = first_client_y - e.clientY;
            model.rotation.x = first_model_x + 0.005 * hen_y;
          } else if (1 == button) {
            0 != spot_client_y &&
              model.translateZ(-1 * (spot_client_y - e.clientY));
            spot_client_y = e.clientY;
          } else if (2 == button) {
            0 != spot_client_x && model.translateX(spot_client_x - e.clientX);
            spot_client_x = e.clientX;
            0 != spot_client_y &&
              model.translateY(-1 * (spot_client_y - e.clientY));
            spot_client_y = e.clientY;
          }
        }
      }
      function evt_mouseup(e) {
        first_client_x = 0;
        first_client_y = 0;
        if (0 == button) {
          $.orgFloor(model.rotation.x, 100),
            $.orgFloor(model.rotation.y, 100),
            model.rotation.z;
          $(".panel_chat").css("pointer-events", "");
        } else if (2 == button || 1 == button) {
          spot_client_x = 0;
          spot_client_y = 0;
        }
        var msg =
          'pos="' +
          (model.position.x + "," + model.position.y + "," + model.position.z) +
          '" rot="' +
          ($.orgFloor(model.rotation.x, 100) +
            "," +
            $.orgFloor(model.rotation.y, 100) +
            "," +
            $.orgFloor(model.rotation.z, 100)) +
          '" scale="' +
          ($.orgFloor(model.scale.x, 100) +
            "," +
            $.orgFloor(model.scale.y, 100) +
            "," +
            $.orgFloor(model.scale.z, 100)) +
          '" ';
        j_debug_msg.find("input").val(msg);
        mousedown = !1;
        1 == three.stat.fps.is_fps_studio && (three.stat.start_event = !0);
        setTimeout((e) => {
          three.stat.start_event = !0;
        }, 500);
      }
      if ("ontouchstart" in document.documentElement) {
        renderer.domElement.addEventListener(
          "touchstart",
          function (e) {
            evt_mouseup();
            for (let key in e.touches) {
              let touche = e.touches[key];
              if ("three" == touche.target.id) {
                touche.button = 0;
                evt_mousedown(touche);
                break;
              }
            }
          },
          !1
        );
        renderer.domElement.addEventListener(
          "touchend",
          function (e) {
            evt_mouseup();
          },
          !1
        );
        renderer.domElement.addEventListener(
          "touchmove",
          function (e) {
            for (let key in e.touches) {
              let touche = e.touches[key];
              if ("three" == touche.target.id) {
                touche.button = 0;
                evt_mousemove(touche);
                break;
              }
            }
          },
          !1
        );
      } else {
        window.addEventListener("mousewheel", evt_mousewheel, !1);
        window.addEventListener("mousedown", evt_mousedown, !1);
        window.addEventListener("mouseup", evt_mouseup, !1);
        window.addEventListener("mousemove", evt_mousemove, !1);
      }
      var j_close_button = $(
        "<div class='area_three_debug' style='position:absolute;z-index:9999999999;padding:10px;opacity:0.8;background-color:white;left:0px;top:0px'><button style='cursor:pointer'><span style=''>" +
          pm.button_text +
          "</span></button></div>"
      );
      j_close_button.draggable({ scroll: !1, stop: (e, ui) => {} });
      var j_debug_msg = $(
          "<div style='padding:5px'><input type='text' style='width:320px' /></div>"
        ),
        j_copy_button = $("<input type='button' value='コピー' />");
      j_copy_button.on("click", (e) => {
        evt_mouseup();
        j_debug_msg.find("input").select();
        document.execCommand("copy");
      });
      var j_reset_button = $("<input type='button' value='リセット' />");
      j_reset_button.on("click", (e) => {
        model.position.set(
          original_v.pos.x,
          original_v.pos.y,
          original_v.pos.z
        );
        model.rotation.set(
          original_v.rot.x,
          original_v.rot.y,
          original_v.rot.z
        );
        model.scale.set(
          original_v.scale.x,
          original_v.scale.y,
          original_v.scale.z
        );
      });
      j_close_button.find("button").on("click", (e) => {
        j_close_button.remove();
        j_canvas.css("z-index", old_canvas_zindex);
        target_layer.css("z-index", old_target_layer_zindex);
        renderer.domElement.removeEventListener("mousedown", evt_mousedown);
        renderer.domElement.removeEventListener("mouseup", evt_mouseup);
        renderer.domElement.removeEventListener("mousemove", evt_mousemove);
        renderer.domElement.removeEventListener("mousewheel", evt_mousewheel);
        this.kag.ftag.nextOrder();
      });
      if ("true" == pm.menu) {
        j_close_button.append("<span style='font-size:10px'>｜</span>");
        j_close_button.append(j_copy_button);
        j_close_button.append(j_reset_button);
        j_close_button.append(j_debug_msg);
      }
      if ("false" == pm.menu_close) {
        this.kag.ftag.nextOrder();
        j_close_button.hide();
      }
      if (1 == three.stat.fps.active) {
        three.stat.start_event = !0;
        this.kag.stat.is_strong_stop = !0;
      }
      $("body").append(j_close_button);
    },
  });
tyrano.plugin.kag.tag["3d_motion"] = {
  vital: ["name", "motion"],
  pm: { name: "", motion: "" },
  start: function (pm) {
    if (0 != $.checkThreeModel(pm.name)) {
      this.kag.tmp.three;
      this.kag.tmp.three.models[pm.name].setMotion(pm.motion);
      this.kag.ftag.nextOrder();
    }
  },
};
tyrano.plugin.kag.tag["3d_debug"] = {
  vital: ["name"],
  pm: {
    name: "",
    button_text: "閉",
    menu: "true",
    overlap: "false",
    reset: "false",
    control: "false",
    orbit: "true",
  },
  start: function (pm) {
    var that = this,
      three = this.kag.tmp.three,
      j_canvas = three.j_canvas,
      model_obj =
        (three.target_layer.css("z-index"),
        j_canvas.css("z-index"),
        this.kag.tmp.three.models[pm.name]),
      model = model_obj.model;
    this.kag.tmp.three.stat.fps.is_fps_studio &&
      TYRANO.kag.studio.selectObject(pm.name, model_obj);
    var renderer = three.renderer,
      camera = three.camera,
      original_v =
        (parseInt(this.kag.config.scWidth),
        parseInt(this.kag.config.scHeight),
        $.setVector(model));
    if ("true" == pm.orbit && void 0 === three.orbit) {
      let orbit = new THREE.OrbitControls(camera, renderer.domElement);
      orbit.screenSpacePanning = !0;
      orbit.rotateSpeed = 0.7;
      orbit.panSpeed = 2;
      orbit.enableZoom = !0;
      orbit.addEventListener("change", (e) => {
        three.stat.start_event = !1;
      });
      orbit.addEventListener("end", (e) => {
        setTimeout((e) => {
          three.stat.start_event = !0;
        }, 100);
      });
      three.orbit = orbit;
    }
    let control = new THREE.TransformControls(camera, renderer.domElement);
    control.size = 1.5;
    control.setTranslationSnap(20);
    control.setRotationSnap(THREE.MathUtils.degToRad(15));
    control.setScaleSnap(0.1);
    control.addEventListener("dragging-changed", function (event) {
      three.orbit && (three.orbit.enabled = !event.value);
      three.stat.fps.move_trans_control = event.value;
      console.log(event.value);
    });
    control.addEventListener("mouseUp", (e, m) => {
      var msg_pos =
          $.orgFloor(model.position.x, 100) +
          "," +
          $.orgFloor(model.position.y, 100) +
          "," +
          $.orgFloor(model.position.z, 100),
        msg_rot =
          $.orgFloor(model.rotation.x, 100) +
          "," +
          $.orgFloor(model.rotation.y, 100) +
          "," +
          $.orgFloor(model.rotation.z, 100),
        msg_scale =
          $.orgFloor(model.scale.x, 100) +
          "," +
          $.orgFloor(model.scale.y, 100) +
          "," +
          $.orgFloor(model.scale.z, 100),
        _pm = model_obj.pm;
      _pm.pos = msg_pos;
      _pm.rot = msg_rot;
      _pm.scale = msg_scale;
      model_obj.pm = _pm;
      var obj = that.kag.tmp.three.models[pm.name];
      TYRANO.kag.studio.changeObject &&
        TYRANO.kag.studio.changeObject(pm.name, obj);
      setTimeout((e) => {
        three.stat.start_event = !0;
      }, 100);
    });
    control.addEventListener("mouseDown", (e) => {
      console.log(e);
      console.log("mousedown!");
      three.stat.start_event = !1;
    });
    control.attach(model);
    three.scene.add(control);
    window.addEventListener("keydown", function (event) {
      switch (event.keyCode) {
        case 16:
          control.setTranslationSnap(null);
          control.setRotationSnap(null);
          control.setScaleSnap(null);
          break;
        case 81:
          control.setSpace("local" === control.space ? "world" : "local");
          break;
        case 70:
          three.orbit.screenSpacePanning = !1;
          break;
        case 71:
          1 == three.orbit.screenSpacePanning
            ? (three.orbit.screenSpacePanning = !1)
            : (three.orbit.screenSpacePanning = !0);
          break;
        case 87:
          control.setMode("translate");
          break;
        case 69:
          control.setMode("rotate");
          break;
        case 82:
          control.setMode("scale");
          break;
        case 67:
          const position = camera.position.clone();
          (camera = camera.isPerspectiveCamera
            ? cameraOrtho
            : cameraPersp).position.copy(position);
          orbit.object = camera;
          control.camera = camera;
          camera.lookAt(orbit.target.x, orbit.target.y, orbit.target.z);
          break;
        case 86:
          const randomFoV = Math.random() + 0.1,
            randomZoom = Math.random() + 0.1;
          cameraPersp.fov = 160 * randomFoV;
          cameraOrtho.bottom = 500 * -randomFoV;
          cameraOrtho.top = 500 * randomFoV;
          cameraPersp.zoom = 5 * randomZoom;
          cameraOrtho.zoom = 5 * randomZoom;
          onWindowResize();
          break;
        case 187:
        case 107:
          control.setSize(control.size + 0.1);
          break;
        case 189:
        case 109:
          control.setSize(Math.max(control.size - 0.1, 0.1));
          break;
        case 88:
          control.showX = !control.showX;
          break;
        case 89:
          control.showY = !control.showY;
          break;
        case 90:
          control.showZ = !control.showZ;
          break;
        case 32:
          control.enabled = !control.enabled;
      }
    });
    window.addEventListener("keyup", function (event) {
      switch (event.keyCode) {
        case 70:
          three.orbit.screenSpacePanning = !0;
          break;
        case 16:
          control.setTranslationSnap(20);
          control.setRotationSnap(THREE.MathUtils.degToRad(15));
          control.setScaleSnap(0.1);
      }
    });
    var j_close_button = $(
      "<div class='area_three_debug area_three_debug_object' style='position:absolute;z-index:9999999999;padding:10px;opacity:0.8;background-color:white;left:0px;top:0px'><button style='cursor:pointer'><span style=''>" +
        pm.button_text +
        "</span></button></div>"
    );
    j_close_button.draggable({ scroll: !1, stop: (e, ui) => {} });
    let j_btn_mode_pos = $("<input type='button' value='位置' />"),
      j_btn_mode_rot = $("<input type='button' value='回転' />"),
      j_btn_mode_scale = $("<input type='button' value='スケール' />"),
      j_btn_camera_reset = $("<input type='button' value='ズームリセット' />");
    j_btn_mode_pos.on("click", (e) => {
      control.setMode("translate");
    });
    j_btn_mode_rot.on("click", (e) => {
      control.setMode("rotate");
    });
    j_btn_mode_scale.on("click", (e) => {
      control.setMode("scale");
    });
    j_btn_camera_reset.on("click", (e) => {
      three.orbit.reset();
    });
    $("<input type='button' value='コピー' />").on("click", (e) => {
      evt_mouseup();
      j_debug_msg.find("input").select();
      document.execCommand("copy");
    });
    var j_reset_button = $("<input type='button' value='リセット' />");
    j_reset_button.on("click", (e) => {
      model.position.set(original_v.pos.x, original_v.pos.y, original_v.pos.z);
      model.rotation.set(original_v.rot.x, original_v.rot.y, original_v.rot.z);
      model.scale.set(
        original_v.scale.x,
        original_v.scale.y,
        original_v.scale.z
      );
    });
    j_close_button.find("button").on("click", (e) => {
      control.detach();
      control.dispose();
      "true" == pm.reset && j_reset_button.trigger("click");
      j_close_button.remove();
      this.kag.ftag.nextOrder();
    });
    if ("true" == pm.menu) {
      j_close_button.append("<span>｜</span>");
      j_close_button.append(j_btn_mode_pos);
      j_close_button.append(j_btn_mode_rot);
      j_close_button.append(j_btn_mode_scale);
      j_close_button.append(j_btn_camera_reset);
    }
    $("body").append(j_close_button);
  },
};
tyrano.plugin.kag.tag["3d_debug_bk"] = {
  vital: ["name"],
  pm: {
    name: "",
    button_text: "3Dインスペクタを閉じる",
    menu: "true",
    overlap: "false",
    reset: "false",
  },
  start: function (pm) {
    var that = this,
      three = this.kag.tmp.three,
      j_canvas = three.j_canvas,
      target_layer = three.target_layer,
      old_target_layer_zindex = target_layer.css("z-index"),
      old_canvas_zindex = j_canvas.css("z-index"),
      model_obj = this.kag.tmp.three.models[pm.name],
      model = model_obj.model;
    this.kag.tmp.three.stat.fps.is_fps_studio &&
      TYRANO.kag.studio.selectObject(pm.name, model_obj);
    three.renderer,
      three.camera,
      parseInt(this.kag.config.scWidth),
      parseInt(this.kag.config.scHeight);
    var prevPosition = {},
      mousedown = !1,
      button = 0,
      spot_client_x = 0,
      spot_client_y = 0,
      direction_rot = 0,
      original_v = $.setVector(model),
      first_client_x = 0,
      first_client_y = 0;
    function evt_mousewheel(e) {
      return !1;
    }
    function evt_mousedown(e) {
      if (0 == e.button) {
        first_client_x = e.clientX;
        first_client_y = e.clientY;
        button = 0;
      } else if (1 == e.button) {
        button = 1;
        first_client_y = e.clientY;
        model.position.z;
        first_client_y = e.clientY;
      } else if (2 == e.button) {
        button = 2;
        first_client_x = e.clientX;
        first_client_y = e.clientY;
      }
      mousedown = !0;
      prevPosition = { x: e.clientX, y: e.clientY };
    }
    function evt_mousemove(e) {
      if (mousedown) {
        j_close_button.hide();
        if (0 == button) {
          moveDistance = {
            x: prevPosition.x - e.clientX,
            y: prevPosition.y - e.clientY,
          };
          if (0 == direction_rot)
            Math.abs(first_client_x - e.clientX) > 5
              ? (direction_rot = 2)
              : Math.abs(first_client_y - e.clientY) > 5 && (direction_rot = 1);
          else {
            if (1 == direction_rot) {
              model.rotateX(0.01 * moveDistance.y * -1);
              if (Math.abs(moveDistance.x) > Math.abs(moveDistance.y)) {
                direction_rot = 0;
                first_client_x = e.clientX;
                first_client_y = e.clientY;
              }
            } else {
              model.rotateY(0.01 * moveDistance.x * -1);
              if (Math.abs(moveDistance.y) > Math.abs(moveDistance.x)) {
                direction_rot = 0;
                first_client_x = e.clientX;
                first_client_y = e.clientY;
              }
            }
            prevPosition = { x: e.clientX, y: e.clientY };
          }
        } else if (1 == button) {
          0 != spot_client_y &&
            model.translateZ(-1 * (spot_client_y - e.clientY));
          spot_client_y = e.clientY;
        } else if (2 == button) {
          0 != spot_client_x &&
            model.translateX(-1 * (spot_client_x - e.clientX));
          spot_client_x = e.clientX;
          0 != spot_client_y && model.translateY(spot_client_y - e.clientY);
          spot_client_y = e.clientY;
        }
      }
    }
    function evt_mouseup(e) {
      j_close_button.show();
      if (void 0 === e) return !1;
      if (
        Math.abs(first_client_x - e.clientX) < 10 &&
        Math.abs(first_client_y - e.clientY) < 10
      ) {
        that.kag.tmp.three.j_canvas.trigger("click", e);
        first_client_x = 0;
        first_client_y = 0;
        spot_client_x = 0;
        spot_client_y = 0;
        direction_rot = 0;
        mousedown = !1;
        return !1;
      }
      first_client_x = 0;
      first_client_y = 0;
      spot_client_x = 0;
      spot_client_y = 0;
      direction_rot = 0;
      if (0 == button)
        $.orgFloor(model.rotation.x, 100),
          $.orgFloor(model.rotation.y, 100),
          model.rotation.z;
      var msg_pos =
          $.orgFloor(model.position.x, 100) +
          "," +
          $.orgFloor(model.position.y, 100) +
          "," +
          $.orgFloor(model.position.z, 100),
        msg_rot =
          $.orgFloor(model.rotation.x, 100) +
          "," +
          $.orgFloor(model.rotation.y, 100) +
          "," +
          $.orgFloor(model.rotation.z, 100),
        msg_scale =
          $.orgFloor(model.scale.x, 100) +
          "," +
          $.orgFloor(model.scale.y, 100) +
          "," +
          $.orgFloor(model.scale.z, 100),
        _pm = model_obj.pm;
      _pm.pos = msg_pos;
      _pm.rot = msg_rot;
      _pm.scale = msg_scale;
      model_obj.pm = _pm;
      var obj = that.kag.tmp.three.models[pm.name];
      TYRANO.kag.studio.changeObject(pm.name, obj);
      mousedown = !1;
    }
    if ("true" == pm.overlap) {
      j_canvas.css("z-index", 9999999);
      target_layer.css("z-index", 9999999);
    }
    var j_three_debug_layer = $(
      "<div class='three_debug_layer' style='width:100%;height:100%;position:absolute;z-index:9999999;'></div>"
    );
    $(".tyrano_base").append(j_three_debug_layer);
    var three_debug_layer = j_three_debug_layer.get(0);
    three_debug_layer.addEventListener("mousewheel", evt_mousewheel, !1);
    three_debug_layer.addEventListener("mousedown", evt_mousedown, !1);
    three_debug_layer.addEventListener("mouseup", evt_mouseup, !1);
    three_debug_layer.addEventListener("mousemove", evt_mousemove, !1);
    var j_close_button = $(
      "<div class='area_three_debug area_three_debug_object' style='position:absolute;z-index:9999999999;padding:10px;opacity:0.8;background-color:white;left:0px;top:0px'><button style='cursor:pointer'><span style=''>" +
        pm.button_text +
        "</span></button></div>"
    );
    j_close_button.draggable({ scroll: !1, stop: (e, ui) => {} });
    var j_debug_msg = $(
        "<div style='padding:5px'><input type='text' style='width:320px' /></div>"
      ),
      j_copy_button = $("<input type='button' value='コピー' />");
    j_copy_button.on("click", (e) => {
      evt_mouseup();
      j_debug_msg.find("input").select();
      document.execCommand("copy");
    });
    var j_reset_button = $("<input type='button' value='リセット' />");
    j_reset_button.on("click", (e) => {
      model.position.set(original_v.pos.x, original_v.pos.y, original_v.pos.z);
      model.rotation.set(original_v.rot.x, original_v.rot.y, original_v.rot.z);
      model.scale.set(
        original_v.scale.x,
        original_v.scale.y,
        original_v.scale.z
      );
    });
    j_close_button.find("button").on("click", (e) => {
      j_three_debug_layer.remove();
      "true" == pm.reset && j_reset_button.trigger("click");
      j_close_button.remove();
      j_canvas.css("z-index", old_canvas_zindex);
      target_layer.css("z-index", old_target_layer_zindex);
      three_debug_layer.removeEventListener("mousedown", evt_mousedown);
      three_debug_layer.removeEventListener("mouseup", evt_mouseup);
      three_debug_layer.removeEventListener("mousemove", evt_mousemove);
      three_debug_layer.removeEventListener("mousewheel", evt_mousewheel);
      this.kag.ftag.nextOrder();
    });
    if ("true" == pm.menu) {
      j_close_button.append("<span>｜</span>");
      j_close_button.append(j_copy_button);
      j_close_button.append(j_reset_button);
      j_close_button.append(j_debug_msg);
    }
    $("body").append(j_close_button);
    evt_mouseup();
  },
};
tyrano.plugin.kag.tag.fps_control_start = {
  vital: [],
  pm: {},
  start: function (pm) {
    TYRANO.kag.tmp.three.stat.fps.active = !0;
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag.fps_control_stop = {
  vital: [],
  pm: {},
  start: function (pm) {
    TYRANO.kag.tmp.three.stat.fps.active = !1;
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag["3d_fps_control"] = {
  vital: [],
  pm: { joystick: "", camera_pos_y: "" },
  start: function (pm) {
    this.kag.tmp.three.renderer;
    window.addEventListener("keydown", this._onKeyDown, !1);
    window.addEventListener("keyup", this._onKeyUp, !1);
    if ("true" == pm.joystick) {
      let j_joy = $(
        '<div id="joyDiv" style="opacity:0.5;position:absolute;width:100px;height:100px;bottom:0px;left:0px;z-index:99"></div>'
      );
      $("body").prepend(j_joy);
      TYRANO.kag.tmp.three.stat.fps.joy = new JoyStick("joyDiv", {
        internalFillColor: "#DDDDDD",
        internalStrokeColor: "#DDDDDD",
        externalStrokeColor: "#DDDDDD",
      });
      TYRANO.kag.tmp.three.stat.fps.isJoy = !0;
    }
    "" != pm.camera_pos_y &&
      (TYRANO.kag.tmp.three.stat.fps.camera_pos_y = parseFloat(
        pm.camera_pos_y
      ));
    TYRANO.kag.tmp.three.stat.fps.active = !0;
    this.kag.ftag.nextOrder();
  },
  _onKeyDown: function (event) {
    let fps = TYRANO.kag.tmp.three.stat.fps,
      k = event.keyCode;
    13 == k && $(".text_chat").focus();
    if (38 == k || 87 == k) {
      fps.moveForward = !0;
      fps.offMoveBufferB = !1;
    }
    if (40 == k || 83 == k) {
      fps.moveBackward = !0;
      fps.offMoveBufferF = !1;
    }
    if (37 == k || 65 == k) {
      fps.rotateLeft = !0;
      fps.offRotateBufferR = !1;
    }
    if (39 == k || 68 == k) {
      fps.rotateRight = !0;
      fps.offRotateBufferL = !1;
    }
    1 == fps.active && void 0 !== window.app && app.startWalk();
  },
  _onKeyUp: function (event) {
    let fps = TYRANO.kag.tmp.three.stat.fps,
      k = event.keyCode;
    if (38 == k || 87 == k) {
      fps.moveForward = !1;
      fps.offMoveBufferF = !0;
    }
    if (40 == k || 83 == k) {
      fps.moveBackward = !1;
      fps.offMoveBufferB = !0;
    }
    if (37 == k || 65 == k) {
      fps.rotateLeft = !1;
      fps.offRotateBufferL = !0;
    }
    if (39 == k || 68 == k) {
      fps.rotateRight = !1;
      fps.offRotateBufferR = !0;
    }
    void 0 !== window.app &&
      0 == fps.moveForward &&
      0 == fps.moveBackward &&
      0 == fps.rotateLeft &&
      0 == fps.rotateRight &&
      app.stopWalk();
  },
};
tyrano.plugin.kag.tag["3d_new_group"] = {
  vital: ["name"],
  pm: { name: "" },
  start: function (pm) {
    var three = this.kag.tmp.three;
    const model = new THREE.Group();
    model.name = pm.name;
    this.kag.tmp.three.models[pm.name] = new ThreeModel(
      { name: pm.name, model: model, pm: pm },
      three
    );
    this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag["3d_add_group"] = {
  vital: ["name", "group"],
  pm: { name: "", new_name: "", scale: "", pos: "", rot: "", clone: "false" },
  start: function (pm) {
    this.kag.tmp.three;
    if (0 != $.checkThreeModel(pm.name))
      if (0 != $.checkThreeModel(pm.group)) {
        var model_obj;
        if ("true" == pm.clone) {
          console.log("ffffff");
          console.log(pm);
          model_obj = this.kag.tmp.three.models[pm.name].model.clone();
        } else model_obj = this.kag.tmp.three.models[pm.name].model;
        var group_obj = this.kag.tmp.three.models[pm.group].model;
        group_obj.name = pm.group;
        "" != pm.new_name &&
          model_obj.traverse(function (node) {
            node.userData.name = pm.new_name;
          });
        if ("" != pm.pos) {
          let pos = $.three_pos(pm.pos);
          model_obj.position.set(pos.x, pos.y, pos.z);
        }
        if ("" != pm.scale) {
          let scale = $.three_pos(pm.scale);
          model_obj.scale.set(scale.x, scale.y, scale.z);
        }
        if ("" != pm.rot) {
          let rot = $.three_pos(pm.rot);
          model_obj.rotation.set(rot.x, rot.y, rot.z);
        }
        group_obj.add(model_obj);
        this.kag.ftag.nextOrder();
      } else this.kag.ftag.nextOrder();
    else this.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag["3d_text_new"] = {
  vital: ["name", "text"],
  pm: {
    name: "",
    text: "",
    size: "42",
    canvas_width: "1500",
    canvas_height: "100",
    color: "",
    width: "5",
    height: "5",
    scale: "0",
    pos: "0",
    rot: "0",
    tonemap: "false",
    next: "true",
    sprite: "false",
    folder: "",
  },
  start: function (pm) {
    const canvasForText = document.createElement("canvas"),
      ctx = canvasForText.getContext("2d");
    let canvasWidth = parseInt(pm.canvas_width),
      canvasHeight = parseInt(pm.canvas_height);
    ctx.canvas.width = canvasWidth;
    ctx.canvas.height = canvasHeight;
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    "" != pm.color
      ? (ctx.fillStyle = $.convertColor(pm.color))
      : (ctx.fillStyle = "black");
    ctx.font = pm.size + "px sans-serif";
    ctx.fillText(
      pm.text,
      (canvasWidth - ctx.measureText(pm.text).width) / 2,
      canvasHeight / 2 + ctx.measureText(pm.text).actualBoundingBoxAscent / 2
    );
    const canvasTexture = new THREE.CanvasTexture(canvasForText);
    let model = null;
    if ("true" == pm.sprite) {
      const material = new THREE.SpriteMaterial({
        map: canvasTexture,
        alphaTest: 0.01,
        transparent: !0,
      });
      model = new THREE.Sprite(material);
    } else {
      const material = new THREE.MeshBasicMaterial({
          side: THREE.DoubleSide,
          map: canvasTexture,
          transparent: !0,
          alphaTest: 0.5,
        }),
        geo = new THREE.PlaneGeometry(
          parseFloat(pm.width),
          parseFloat(pm.height),
          1,
          1
        );
      model = new THREE.Mesh(geo, material);
    }
    let pos = $.three_pos(pm.pos),
      rot = $.three_pos(pm.rot),
      scale = $.three_pos(pm.scale);
    model.position.set(pos.x, pos.y, pos.z);
    model.rotation.set(rot.x, rot.y, rot.z);
    model.scale.set(scale.x, scale.y * (canvasHeight / canvasWidth), scale.z);
    var three = TYRANO.kag.tmp.three;
    three.scene;
    TYRANO.kag.tmp.three.models[pm.name] = new ThreeModel(
      { name: pm.name, model: model, pm: pm },
      three
    );
    "true" == pm.next && TYRANO.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag["3d_text_mod"] = {
  vital: ["name"],
  pm: {
    name: "",
    jname: "",
    text: "",
    size: "",
    canvas_width: "1500",
    canvas_height: "100",
    color: "",
    scale: "",
    pos: "",
    rot: "",
    next: "true",
  },
  start: function (pm) {
    this.kag.tmp.three.scene;
    if (0 == $.checkThreeModel(pm.name)) return;
    let model = this.kag.tmp.three.models[pm.name];
    if ("" != pm.pos) {
      let pos = $.three_pos(pm.pos);
      model.setPosition(pos.x, pos.y, pos.z);
    }
    if ("" != pm.scale) {
      let scale = $.three_pos(pm.scale);
      model.setScale(scale.x, scale.y, scale.z);
    }
    if ("" != pm.rot) {
      let rot = $.three_pos(pm.rot);
      model.setRotation(rot.x, rot.y, rot.z);
    }
    "" != pm.jname && (model.pm.jname = pm.jname);
    if ("" != pm.size) {
      model.pm.size = pm.size;
      pm.text = model.pm.text;
    } else pm.size = model.pm.size;
    if ("" != pm.color || "" != pm.text) {
      "" == pm.color
        ? (pm.color = model.pm.color)
        : (model.pm.color = pm.color);
      "" == pm.text ? (pm.text = model.pm.text) : (model.pm.text = pm.text);
      const canvasForText = document.createElement("canvas"),
        ctx = canvasForText.getContext("2d");
      let canvasWidth = parseInt(pm.canvas_width),
        canvasHeight = parseInt(pm.canvas_height);
      ctx.canvas.width = canvasWidth;
      ctx.canvas.height = canvasHeight;
      ctx.fillStyle = "rgba(0, 0, 0, 0)";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      "" != pm.color
        ? (ctx.fillStyle = $.convertColor(pm.color))
        : (ctx.fillStyle = "black");
      ctx.font = pm.size + "px sans-serif";
      ctx.fillText(
        pm.text,
        (canvasWidth - ctx.measureText(pm.text).width) / 2,
        canvasHeight / 2 + ctx.measureText(pm.text).actualBoundingBoxAscent / 2
      );
      const canvasTexture = new THREE.CanvasTexture(canvasForText);
      if ("true" == model.pm.sprite) {
        const material = new THREE.SpriteMaterial({
          map: canvasTexture,
          alphaTest: 0.5,
          transparent: !0,
        });
        model.model.material = material;
      } else {
        const material = new THREE.MeshBasicMaterial({
          side: THREE.DoubleSide,
          map: canvasTexture,
          transparent: !0,
          alphaTest: 0.5,
        });
        model.model.material = material;
      }
      model.needsUpdate();
    }
    "true" == pm.next && TYRANO.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag["3d_sound"] = {
  vital: [],
  pm: {
    name: "",
    target_name: "",
    pos: "0,0,0",
    folder: "",
    storage: "",
    loop: "false",
    volume: "",
    next: "true",
  },
  start: function (pm) {
    let three = TYRANO.kag.tmp.three;
    var folder = "";
    folder = "" != pm.folder ? pm.folder : "others/3d/audio";
    var storage_url = "";
    storage_url = $.isHTTP(pm.storage)
      ? pm.storage
      : "./data/" + folder + "/" + pm.storage;
    const sound = new THREE.PositionalAudio(three.audio_listener);
    let pos = $.three_pos(pm.pos);
    if ("" != pm.target_name) {
      if (0 == $.checkThreeModel(pm.target_name)) return;
      var model = this.kag.tmp.three.models[pm.target_name].model;
      pos.x = model.position.x;
      pos.y = model.position.y;
      pos.z = model.position.z;
    }
    sound.position.x = pos.x;
    sound.position.y = pos.y;
    sound.position.z = pos.z;
    new THREE.AudioLoader().load(storage_url, function (buffer) {
      sound.setBuffer(buffer);
      "true" == pm.loop && sound.setLoop(!0);
      var volume = 1;
      "" !== pm.volume && (volume = parseFloat(parseInt(pm.volume) / 100));
      sound.setVolume(volume);
      sound.setRefDistance(20);
      sound.onEnded = function () {
        "false" == pm.loop && three.scene.remove(sound);
      };
      sound.play();
    });
    three.scene.add(sound);
    "true" == pm.next && TYRANO.kag.ftag.nextOrder();
  },
};
tyrano.plugin.kag.tag["3d_helper"] = {
  vital: [],
  pm: { name: "", grid: "", axes: "", next: "true" },
  start: function (pm) {
    let three = TYRANO.kag.tmp.three,
      gridHelper = new THREE.GridHelper(4e3, 40, 8947848, 4473924);
    gridHelper.position.y = 0;
    gridHelper.name = "Grid";
    three.scene.add(gridHelper);
    const axes = new THREE.AxesHelper(500);
    axes.name = "AxesHelper";
    three.scene.add(axes);
    "true" == pm.next && TYRANO.kag.ftag.nextOrder();
  },
};
var JoyStick = function (container, parameters) {
  var title =
      void 0 === (parameters = parameters || {}).title
        ? "joystick"
        : parameters.title,
    width = void 0 === parameters.width ? 0 : parameters.width,
    height = void 0 === parameters.height ? 0 : parameters.height,
    internalFillColor =
      void 0 === parameters.internalFillColor
        ? "#00AA00"
        : parameters.internalFillColor,
    internalLineWidth =
      void 0 === parameters.internalLineWidth
        ? 2
        : parameters.internalLineWidth,
    internalStrokeColor =
      void 0 === parameters.internalStrokeColor
        ? "#003300"
        : parameters.internalStrokeColor,
    externalLineWidth =
      void 0 === parameters.externalLineWidth
        ? 2
        : parameters.externalLineWidth,
    externalStrokeColor =
      void 0 === parameters.externalStrokeColor
        ? "#008000"
        : parameters.externalStrokeColor,
    autoReturnToCenter =
      void 0 === parameters.autoReturnToCenter || parameters.autoReturnToCenter,
    objContainer = document.getElementById(container),
    canvas = document.createElement("canvas");
  canvas.id = title;
  0 === width && (width = objContainer.clientWidth);
  0 === height && (height = objContainer.clientHeight);
  canvas.width = width;
  canvas.height = height;
  objContainer.appendChild(canvas);
  var context = canvas.getContext("2d"),
    pressed = 0,
    circumference = 2 * Math.PI,
    internalRadius = (canvas.width - (canvas.width / 2 + 10)) / 2,
    maxMoveStick = internalRadius + 5,
    externalRadius = internalRadius + 30,
    centerX = canvas.width / 2,
    centerY = canvas.height / 2,
    directionHorizontalLimitPos = canvas.width / 10,
    directionHorizontalLimitNeg = -1 * directionHorizontalLimitPos,
    directionVerticalLimitPos = canvas.height / 10,
    directionVerticalLimitNeg = -1 * directionVerticalLimitPos,
    movedX = centerX,
    movedY = centerY;
  if ("ontouchstart" in document.documentElement) {
    canvas.addEventListener(
      "touchstart",
      function (event) {
        pressed = 1;
      },
      !1
    );
    canvas.addEventListener(
      "touchmove",
      function (event) {
        event.preventDefault();
        if (1 === pressed && event.targetTouches[0].target === canvas) {
          movedX = event.targetTouches[0].pageX;
          movedY = event.targetTouches[0].pageY;
          if ("BODY" === canvas.offsetParent.tagName.toUpperCase()) {
            movedX -= canvas.offsetLeft;
            movedY -= canvas.offsetTop;
          } else {
            movedX -= canvas.offsetParent.offsetLeft;
            movedY -= canvas.offsetParent.offsetTop;
          }
          context.clearRect(0, 0, canvas.width, canvas.height);
          drawExternal();
          drawInternal();
        }
      },
      !1
    );
    canvas.addEventListener(
      "touchend",
      function (event) {
        pressed = 0;
        if (autoReturnToCenter) {
          movedX = centerX;
          movedY = centerY;
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawExternal();
        drawInternal();
      },
      !1
    );
  } else {
    canvas.addEventListener(
      "mousedown",
      function (event) {
        pressed = 1;
      },
      !1
    );
    canvas.addEventListener(
      "mousemove",
      function (event) {
        if (1 === pressed) {
          movedX = event.pageX;
          movedY = event.pageY;
          if ("BODY" === canvas.offsetParent.tagName.toUpperCase()) {
            movedX -= canvas.offsetLeft;
            movedY -= canvas.offsetTop;
          } else {
            movedX -= canvas.offsetParent.offsetLeft;
            movedY -= canvas.offsetParent.offsetTop;
          }
          context.clearRect(0, 0, canvas.width, canvas.height);
          drawExternal();
          drawInternal();
        }
      },
      !1
    );
    canvas.addEventListener(
      "mouseup",
      function (event) {
        pressed = 0;
        if (autoReturnToCenter) {
          movedX = centerX;
          movedY = centerY;
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawExternal();
        drawInternal();
      },
      !1
    );
  }
  drawExternal();
  drawInternal();
  function drawExternal() {
    context.beginPath();
    context.arc(centerX, centerY, externalRadius, 0, circumference, !1);
    context.lineWidth = externalLineWidth;
    context.strokeStyle = externalStrokeColor;
    context.stroke();
  }
  function drawInternal() {
    context.beginPath();
    movedX < internalRadius && (movedX = maxMoveStick);
    movedX + internalRadius > canvas.width &&
      (movedX = canvas.width - maxMoveStick);
    movedY < internalRadius && (movedY = maxMoveStick);
    movedY + internalRadius > canvas.height &&
      (movedY = canvas.height - maxMoveStick);
    context.arc(movedX, movedY, internalRadius, 0, circumference, !1);
    var grd = context.createRadialGradient(
      centerX,
      centerY,
      5,
      centerX,
      centerY,
      200
    );
    grd.addColorStop(0, internalFillColor);
    grd.addColorStop(1, internalStrokeColor);
    context.fillStyle = grd;
    context.fill();
    context.lineWidth = internalLineWidth;
    context.strokeStyle = internalStrokeColor;
    context.stroke();
  }
  this.GetWidth = function () {
    return canvas.width;
  };
  this.GetHeight = function () {
    return canvas.height;
  };
  this.GetPosX = function () {
    return movedX;
  };
  this.GetPosY = function () {
    return movedY;
  };
  this.GetX = function () {
    return (((movedX - centerX) / maxMoveStick) * 100).toFixed();
  };
  this.GetY = function () {
    return (((movedY - centerY) / maxMoveStick) * 100 * -1).toFixed();
  };
  this.GetDir = function () {
    var result = "",
      orizontal = movedX - centerX,
      vertical = movedY - centerY;
    vertical >= directionVerticalLimitNeg &&
      vertical <= directionVerticalLimitPos &&
      (result = "C");
    vertical < directionVerticalLimitNeg && (result = "N");
    vertical > directionVerticalLimitPos && (result = "S");
    orizontal < directionHorizontalLimitNeg &&
      ("C" === result ? (result = "W") : (result += "W"));
    orizontal > directionHorizontalLimitPos &&
      ("C" === result ? (result = "E") : (result += "E"));
    return result;
  };
};
