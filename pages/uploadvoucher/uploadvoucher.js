const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
    index: null,
    date: '2018-12-25',
  },
  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
});
