// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    note: {'id': Date.now()},
    pic_index: Math.floor(Math.random() * 62),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  get_title: function (e) {
    this.data.note['title'] = e.detail.value.trim();
  },
  noting: function (e) {
    var content = e.detail.value.trim();
    this.data.note['content'] = content;
    this.data.note['length'] = content.length;
  },
  save: function (e) {
    console.log(this.data.note['title'])
    if (this.data.note['title'] === undefined || this.data.note['title'] === '' || this.data.note['content'] === undefined || this.data.note['content'] === '') {
      wx.showModal({
        content: '不能什么都不写就保存哦~~',
        showCancel: false,
        confirmText: '知道啦'
      })
    } else {
      var all_note = wx.getStorageSync('all_note');
      if (all_note == '') {
        all_note = [this.data.note];
      } else {
        all_note.push(this.data.note);
      }
      wx.setStorage({
        key: 'all_note',
        data: all_note,
        success: function(){
          wx.redirectTo({
            url: '../index/index',
          })
        }
      })
    }
  },
  get_pic_index: function() {
    this.data.pic_index = Math.floor(Math.random() * 62)
  }
})