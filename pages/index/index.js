//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    notes: [],
    id: Math.floor(Math.random() * 10),
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'all_note',
      success: function (res) {
        var first_note = {}
        if (res.data === undefined || res.data == [] || res.data == '') {
          first_note['id'] = Date.now()
          first_note['title'] = '我爱猪猪'
          first_note['content'] = '猪猪看这里~~'
          res.data = [first_note]
        }
        that.setData({
          notes: res.data
        })
      },
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }, 
  add_note: function () {
    wx.navigateTo({
      url: '../add/add',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  delete_note: function(e) {
    var notes = this.data.notes;
    console.log(notes)
    notes.splice(e.target.dataset.id, 1)
    this.setData({
      notes: notes
    })
    wx.setStorage({
      key: 'all_note',
      data: notes,
    })
  }
})
