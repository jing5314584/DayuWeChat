var app = getApp();
var wxh = require('../../utils/wxh.js');
// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  url: app.globalData.urlImages,
  userinfo:[],
  orderStatusNum:[],
  coupon:'',
  collect:'',
  hasUserInfo: false,
  showModal:false
  },

  setTouchMove: function (e) {
    var that = this;
    wxh.home(that, e);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setBarColor();
    app.setUserInfo();
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
    };
    var that = this;
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                hasUserInfo: true,
                userinfo: data.userInfo
              })
            }
          })
        } else {
          this.setData({
            //showModal:true,
            hasUserInfo: false
          })
        }
      }
    })
    that.onGetUserInfo();
    console.log('服务器异常');
  },
  onGetUserInfo() {
    var that = this;
    const userInfo =  wx.setStorageSync('userInfo');
    console.log('服务器异常'+userInfo);
    if(userInfo){
      this.setData({
        hasUserInfo: true,
        userinfo: userInfo
      })
      return;
    }
      // 1. 小程序通过wx.login()获取code
      wx.login({
        success: function(login_res) {
          //获取用户信息
          wx.getUserInfo({
            success: function(info_res) {
              // 2. 小程序通过wx.request()发送code到开发者服务器
              wx.request({
                url: app.globalData.localurl + 'api/userLogin',
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  code: login_res.code, //临时登录凭证
                  rawData: info_res.rawData, //用户非敏感信息
                  signature: info_res.signature, //签名
                  encrypteData: info_res.encryptedData, //用户敏感信息
                  iv: info_res.iv //解密算法的向量
                },
                success: function(res) {
                  console.log('服务器异常' + res.data.message);
                  /** if (res.data.status == 200) {
                    // 7.小程序存储skey（自定义登录状态）到本地
                    wx.setStorageSync('userInfo', userInfo);
                    wx.setStorageSync('skey', res.data.data);
                  } else{
                    console.log('服务器异常');
                  }**/
                  
                  console.log('服务器异常' + info_res.rawData);
                  var jsonObj = JSON.parse(info_res.rawData);
                  wx.setStorageSync('userInfo', jsonObj);
                  var userInfo2 = wx.getStorageSync('userInfo');
                  console.log('服务器异常' + info_res.rawData);
                  if(userInfo2){
                    that.setData({
                      hasUserInfo: true,
                      userinfo : userInfo2
                    })
                  }
                  
                },
                fail: function(error) {
                  //调用服务端登录接口失败
                  console.log(error);
                }
              })
            }
          })
        }
      })
     
  },
  goNotification:function(){
      wx.navigateTo({
        url: '/pages/news-list/news-list',
      })
  },
  onShow: function () {
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
    };
    var that = this;
    wx.request({
      url: app.globalData.url + '/routine/auth_api/my?uid=' + app.globalData.uid,
      method: 'POST',
      header: header,
      success: function (res) {
        that.setData({
          userinfo: res.data.data
        })
      }
    });
  },  
   /**
   * 生命周期函数--我的余额
   */
  money:function(){
    wx.navigateTo({
      url: '/pages/main/main?now=' + this.data.userinfo.now_money + '&uid='+app.globalData.uid,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
   /**
   * 生命周期函数--我的积分
   */
  integral: function () {
    wx.navigateTo({
      url: '/pages/integral-con/integral-con?inte=' + this.data.userinfo.integral + '&uid=' + app.globalData.uid,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
   /**
   * 生命周期函数--我的优惠卷
   */
  coupons: function () {
    wx.navigateTo({
      url: '/pages/coupon/coupon',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
   /**
   * 生命周期函数--我的收藏
   */
  collects: function () {
    wx.navigateTo({
      url: '/pages/collect/collect',
    })
  },
   /**
   * 生命周期函数--我的推广人
   */
  extension:function(){
    wx.navigateTo({
      url: '/pages/feree/feree',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
   /**
   * 生命周期函数--我的推广
   */
  myextension: function () {
    wx.navigateTo({
      url: '/pages/extension/extension',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  getPhoneNumber: function (res){
    var that = this;
    if (res.detail.errMsg == "getPhoneNumber:ok"){
        var pdata = {};
        pdata.iv = encodeURI(res.detail.iv);
        pdata.encryptedData = res.detail.encryptedData;
        pdata.session_key = wx.getStorageSync('session_key');//获取上一步获取的session_key
        wx.request({
          url: app.globalData.url + '/routine/auth_api/bind_mobile?uid=' + app.globalData.uid,
          method: 'post',
          dataType  : 'json',
          data: {
            info: pdata
          },
          success: function (res) {
            if(res.data.code == 200){
              wx.showToast({
                title: '绑定成功',
                icon: 'success',
                duration: 2000
              })
              that.setData({
                ['userinfo.phone'] : true
              })

            }else{
              wx.showToast({
                title: '绑定失败',
                icon: 'none',
                duration: 2000
              })
            }
          },
        })
    } else {
      wx.showToast({
        title: '取消授权',
        icon: 'none',
        duration: 2000
      })
    }
  }
   /**
   * 生命周期函数--我的砍价
   */
  // cut_down_the_price:function(){
  //   wx.navigateTo({
  //     url: '../../pages/feree/feree',
  //     success: function (res) { },
  //     fail: function (res) { },
  //     complete: function (res) { },
  //   })
  // }
})