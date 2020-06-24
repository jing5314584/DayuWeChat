//index.js
//获取应用实例
var app = getApp();
var wxh = require('../../utils/wxh.js');
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.urlImages,
    imgUrls:[{"show":"是","url":"../../images/ShowCang.png","pic":"/images/Bg1.jpg","name":"收藏"},
    {"show":"是","url":"../../images/ShowCang.png","pic":"/images/Bg1.jpg","name":"收藏"},
    {"show":"是","url":"../../images/ShowCang.png","pic":"/images/Bg1.jpg","name":"收藏"}],
    lovely:[],
    menus:[{"show":"是","url":"../../images/ShowCang.png","pic":"../../images/ShowCang.png","name":"收藏"},
    {"show":"是","url":"../../images/ShowCang.png","pic":"../../images/ShowCang.png","name":"收藏"},
    {"show":"是","url":"../../images/ShowCang.png","pic":"../../images/ShowCang.png","name":"收藏"},
    {"show":"是","url":"../../images/ShowCang.png","pic":"../../images/ShowCang.png","name":"收藏"}],
    indicatorDots: true,//是否显示面板指示点;
    autoplay: true,//是否自动播放;
    interval: 3000,//动画间隔的时间;
    duration: 500,//动画播放的时长;
    indicatorColor: "rgba(51, 51, 51, .3)",
    indicatorActivecolor: "#ffffff",
    recommendList:[{"store_name":"国美电器","price":125,"image":"../../images/ShowCang.png"},
    {"store_name":"国美电器","price":125,"image":"http://demo26.crmeb.net/uploads/attach/2019/05/23/7dddb34ddf748bf65427b44e8f9134c0.jpg"},
    {"store_name":"国美电器","price":125,"image":"../../images/ShowCang.png"},
    {"store_name":"国美电器","price":125,"image":"../../images/ShowCang.png"},
    {"store_name":"国美电器","price":125,"image":"../../images/ShowCang.png"}],
    newList:[],
    hotList:[],
    benefitList:[],
    likeList:[{"store_name":"国美电器","price":125,"image":"http://demo26.crmeb.net/uploads/attach/2019/05/23/7dddb34ddf748bf65427b44e8f9134c0.jpg"},
    {"store_name":"国美电器","price":125,"image":"http://demo26.crmeb.net/uploads/attach/2019/05/23/7dddb34ddf748bf65427b44e8f9134c0.jpg"},
    {"store_name":"国美电器","price":125,"image":"http://demo26.crmeb.net/uploads/attach/2019/05/23/7dddb34ddf748bf65427b44e8f9134c0.jpg"},
    {"store_name":"国美电器","price":125,"image":"http://demo26.crmeb.net/uploads/attach/2019/05/23/7dddb34ddf748bf65427b44e8f9134c0.jpg"},
    {"store_name":"国美电器","price":125,"image":"http://demo26.crmeb.net/uploads/attach/2019/05/23/7dddb34ddf748bf65427b44e8f9134c0.jpg"}],
    offset: 0,
    title: "玩命加载中...",
    hidden: false,
    elements: [
      { title: '操作条', name: 'bar', color: 'purple', icon: 'vipcard' },
      { title: '导航栏 ', name: 'nav', color: 'mauve', icon: 'formfill' },
      { title: '列表', name: 'list', color: 'pink', icon: 'list' },
      { title: '卡片', name: 'card', color: 'brown', icon: 'newsfill' },
      { title: '表单', name: 'form', color: 'red', icon: 'formfill' },
      { title: '时间轴', name: 'timeline', color: 'orange', icon: 'timefill' },
      { title: '聊天', name: 'chat', color: 'green', icon: 'messagefill' },
      { title: '轮播', name: 'swiper', color: 'olive', icon: 'album' },
      { title: '模态框', name: 'modal', color: 'grey', icon: 'squarecheckfill' },
      { title: '步骤条', name: 'steps', color: 'cyan', icon: 'roundcheckfill' },
    ]
  },
  methods: {
    gotoUploadvoucher(){
      wx.navigateTo({
        url: '/pages/uploadvoucher/uploadvoucher',
      })
    },
  },
  goUrl:function(e){
    if (e.currentTarget.dataset.url != '#'){
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
      })
    }
  },
  torday:function(e){
    wx.switchTab({
      url: '/pages/productSort/productSort'
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setBarColor();
    var that = this;
    if (app.globalData.config !=null){
      wx.setNavigationBarTitle({
        title: app.globalData.config.routine_name,
      })
    }else{
      wx.setNavigationBarTitle({
        title: '大鱼文化',
      })
    }
    
    // if (options.spid){
    //   app.globalData.spid = options.spid;
    //   console.log(options);
    // }
    app.setUserInfo();
    that.getBrandList();
  },
  
  getBrandList:function(){
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
    };
    var that = this;
    wx.request({
      url: app.globalData.localurl + '/api/listbrand',
      method: 'POST',
      header: header,
      success: function (res) {
        console.log(res)
        if(res.data.code == '200')
        {
          that.setData({
            likeList:res.data.data
          })
        }
      }
    });
  },
  getIndexInfo:function(){
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
    };
    var that = this;
    wx.request({
      url: app.globalData.url + '/routine/auth_api/index?uid=' + app.globalData.uid,
      method: 'POST',
      header: header,
      success: function (res) {
        that.setData({
          imgUrls: res.data.data.banner,
          recommendList: res.data.data.best,//精品
          newList: res.data.data.new,//首发新品
          hotList: res.data.data.hot,//热卖单品
          benefitList: res.data.data.benefit,//促销
          lovely: res.data.data.lovely,//猜猜你喜欢上面广告位
          menus: res.data.data.menus,//导航
          likeList: res.data.data.like//猜猜喜欢
        })
      }
    })
  },
  onReachBottom: function (p) {
    var that = this;
    var limit = 20;
    var offset = that.data.offset;
    if (!offset) offset = 1;
    var startpage = limit * offset;
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
    };
    wx.request({
      url: app.globalData.url + '/routine/auth_api/get_hot_product?uid=' + app.globalData.uid,
      data: { limit: limit, offset: startpage },
      method: 'POST',
      header: header,
      success: function (res) {
        var len = res.data.data.length;
        for (var i = 0; i < len; i++) {
          that.data.likeList.push(res.data.data[i])
        }
        that.setData({
          offset: offset + 1,
          likeList: that.data.likeList
        });
        if (len < limit) {
          that.setData({
            title: "数据已经加载完成",
            hidden: true
          });
          return false;
        }
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }
    })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    return {
      title: app.globalData.config.routine_name,
      path: '/pages/index/index?scene=' + app.globalData.uid,
      // imageUrl: that.data.url + that.data.product.image,
      success: function () {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        })
      }
    }
  }
})