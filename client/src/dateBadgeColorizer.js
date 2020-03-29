const dateBadgeColorizer = {
  colorizeTag: function(schedItem) {
    let badgeColor = "";
    switch (schedItem.substr(5, 2)) {
      case "01":
        badgeColor = "blue accent";
        return badgeColor;
        break;
      case "02":
        badgeColor = "deep-purple";
        return badgeColor;
        break;
      case "03":
        badgeColor = "purple lighten-2";
        return badgeColor;
        break;
      case "04":
        badgeColor = "pink";
        return badgeColor;
        break;
      case "05":
        badgeColor = "red darken-2";
        return badgeColor;
        break;
      case "06":
        badgeColor = "orange darken-3";
        return badgeColor;
        break;
      case "07":
        badgeColor = "amber";
        return badgeColor;
        break;
      case "08":
        badgeColor = "lime accent-2";
        return badgeColor;
        break;
      case "09":
        badgeColor = "green darken";
        return badgeColor;
        break;
      case "10":
        badgeColor = "teal lighten-3";
        return badgeColor;
        break;
      case "11":
        badgeColor = "indigo accent-4";
        return badgeColor;
        break;
      case "12":
        badgeColor = "indigo lighten-3";
        return badgeColor;
        break;
      default:
        return badgeColor;
        break;
    }
  }
};

export default dateBadgeColorizer;
