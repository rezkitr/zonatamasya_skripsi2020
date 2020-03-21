const helpers = {
  formatDate: function(strDate) {
    let months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember"
    ];

    let dateTemp = new Date(strDate);
    let monthIndex = dateTemp.getMonth();
    let monthName = months[monthIndex];
    let day = dateTemp.getDate().toString();
    let year = dateTemp.getFullYear();

    if (day.length < 2) {
      day = `0${day}`;
    }
    let formattedDate = `${day} ${monthName} ${year}`;
    return formattedDate;
  },
  priceFormat: function(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
};

export default helpers;
