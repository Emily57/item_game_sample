[macro name="move_mode"]

  [cm]
  [chara_reset]
  [message_true]
  [other_window]
  どこに移動しますか？

  [iscript]
    owned_location = findLocationByName(f.location_name);

    function findLocationByName(name) {
      return location_list.find((location) => location.name === name);
    }

    sorted_locates = location_list
      .filter((location) => location.storage !== owned_location.storage)
      .sort((a, b) => a.name.localeCompare(b.name));

    sorted_locates.forEach((location, index) => {
      tyrano.plugin.kag.ftag.startTag("glink", {
        name: `move_btn_${index + 1}`,
        color: "btn_06_black",
        storage: location.storage,
        target: "*index",
        text: location.name,
        width: 450,
        size: "22",
        x: 840,
        y: 200 + 80 * index,
      });
    });

    tyrano.plugin.kag.ftag.startTag("glink", {
      name: "move_btn_4",
      color: "btn_06_black",
      storage: owned_location.storage,
      target: "*action_select",
      text: "戻る",
      width: 230,
      size: 16,
      x: 1060,
      y: 460,
    });
  [endscript]
[endmacro]
