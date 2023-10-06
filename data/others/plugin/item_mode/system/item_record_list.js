f.item_list_record = {
  evidence: [],
  testimony: [],
  person: [],
};

f.item_list_record.evidence = [];
f.item_list_record.testimony = [];
f.item_list_record.person = [];
let newId = 0;

for (const item of f.item_list.evidence) {
  f.item_list_record.evidence.push({
    id: newId,
    item_id: item.id,
    name: item.name,
    target: item.target,
    record: item.record,
    sort_id: 0,
    version: "default",
    description: item.description || { default: item.name },
  });
  newId++;
}

for (const item of f.item_list.testimony) {
  f.item_list_record.testimony.push({
    id: newId,
    item_id: item.id,
    name: item.name,
    target: item.target,
    record: item.record,
    sort_id: 0,
    version: "default",
    description: item.description || { default: item.name },
  });
  newId++;
}

for (const item of f.item_list.person) {
  f.item_list_record.person.push({
    id: newId,
    item_id: item.id,
    name: item.name,
    target: item.target,
    record: item.record,
    sort_id: 0,
    version: "default",
    description: item.description || { default: item.name },
  });
  newId++;
}
