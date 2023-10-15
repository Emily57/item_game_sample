const getCategoryRecordList = (category) => {
  switch (category) {
    case "evidence":
      return f.item_list_record.evidence;
    case "testimony":
      return f.item_list_record.testimony;
    case "person":
      return f.item_list_record.person;
    default:
      return [];
  }
};
