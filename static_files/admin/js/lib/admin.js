;
layui.define("view",
function(e) {
    var a = layui.jquery,
    i = layui.laytpl,
    t = layui.element,
    n = layui.setter,
    s = layui.view,
    l = layui.device(),
    o = a(window),
    r = a("body"),
    d = a("#" + n.container),
    u = "layui-show",
    c = "layui-hide",
    y = "layui-this",
    f = "layui-disabled",
    m = "#LAY_app_body",
    h = "LAY_app_flexible",
    p = "layadmin-layout-tabs",
    v = "layadmin-side-spread-sm",
    b = "layadmin-tabsbody-item",
    g = "layui-icon-shrink-right",
    x = "layui-icon-spread-left",
    C = "layadmin-side-shrink",
    P = "LAY-system-side-menu",
    A = {
        v: "1.0.0-beta8 std",
        req: s.req,
        sendAuthCode: function(e) {
            e = a.extend({
                seconds: 60,
                elemPhone: "#LAY_phone",
                elemVercode: "#LAY_vercode"
            },
            e);
            var i, t = e.seconds,
            n = a(e.elem),
            s = function(a) {
                t--,
                t < 0 ? (n.removeClass(f).html("获取验证码"), t = e.seconds, clearInterval(i)) : n.addClass(f).html(t + "秒后重获"),
                a || (i = setInterval(function() {
                    s(!0)
                },
                1e3))
            };
            e.elemPhone = a(e.elemPhone),
            e.elemVercode = a(e.elemVercode),
            n.on("click",
            function() {
                var i = e.elemPhone,
                n = i.val();
                if (t === e.seconds && !a(this).hasClass(f)) {
                    if (!/^1\d{10}$/.test(n)) return i.focus(),
                    layer.msg("请输入正确的手机号");
                    if ("object" == typeof e.ajax) {
                        var l = e.ajax.success;
                        delete e.ajax.success
                    }
                    A.req(a.extend(!0, {
                        url: "/auth/code",
                        type: "get",
                        data: {
                            phone: n
                        },
                        success: function(a) {
                            layer.msg("验证码已发送至你的手机，请注意查收", {
                                icon: 1,
                                shade: 0
                            }),
                            e.elemVercode.focus(),
                            s(),
                            l && l(a)
                        }
                    },
                    e.ajax))
                }
            })
        },
        screen: function() {
            var e = o.width();
            return e >= 1200 ? 3 : e >= 992 ? 2 : e >= 768 ? 1 : 0
        },
        exit: s.exit,
		userProfile:function(data){
			A.req(a.extend(!0, {
				url:"",///admin/system/userprofile
				type: "post",
				data:data,
				success: function(a) {
				}
			},e.ajax))
		},
        sideFlexible: function(e) {
            var i = d,
            t = a("#" + h),
            s = A.screen();
            "spread" === e ? (t.removeClass(x).addClass(g), s < 2 ? i.addClass(v) : i.removeClass(v), i.removeClass(C),A.userProfile({'sideFlexible':0})) : (t.removeClass(g).addClass(x), s < 2 ? i.removeClass(C) : i.addClass(C), i.removeClass(v),A.userProfile({'sideFlexible':1})),
            layui.event.call(this, n.MOD_NAME, "side({*})", {
                status: e
            })
        },
        on: function(e, a) {
            return layui.onevent.call(this, n.MOD_NAME, e, a)
        },
        popup: s.popup,
        popupRight: function(e) {
            return A.popup.index = layer.open(a.extend({
                type: 1,
                id: "LAY_adminPopupR",
                anim: -1,
                title: !1,
                closeBtn: !1,
                offset: "r",
                shade: .1,
                shadeClose: !0,
                skin: "layui-anim layui-anim-rl layui-layer-adminRight",
                area: "300px"
            },
            e))
        },
        tabsPage: {},
        tabsBody: function(e) {
            return a(m).find("." + b).eq(e || 0)
        },
        tabsBodyChange: function(e, a) {
            a = a || {},
            A.tabsBody(e).addClass(u).siblings().removeClass(u),
            _.rollPage("auto", e),
            layui.event.call(this, n.MOD_NAME, "tabsPage({*})", {
                url: a.url,
                text: a.text
            })
        },
        resize: function(e) {
            var a = layui.router(),
            i = a.path.join("-");
            o.off("resize", A.resizeFn[i]),
            e(),
            A.resizeFn[i] = e,
            o.on("resize", A.resizeFn[i])
        },
        resizeFn: {},
        runResize: function() {
            var e = layui.router(),
            a = e.path.join("-");
            A.resizeFn[a] && A.resizeFn[a]()
        },
        delResize: function() {
            var e = layui.router(),
            a = e.path.join("-");
            o.off("resize", A.resizeFn[a]),
            delete A.resizeFn[a]
        },
        closeThisTabs: function() {
            A.tabsPage.index && a(z).eq(A.tabsPage.index).find(".layui-tab-close").trigger("click")
        },
		
	}
    _ = A.events = {
		
		getCookie:function(name){
			var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
			if(arr=document.cookie.match(reg)){
				return unescape(arr[2]);
			}else{
				return null;
			}
		},
		delCookie:function(name){
			var exp = new Date();
			exp.setTime(exp.getTime() - 1);
			var cval=_.getCookie(name);
			if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
		},
        flexible: function(e) {
            var a = e.find("#" + h),
            i = a.hasClass(x);
            A.sideFlexible(i ? "spread": null)
        },
        refresh: function() {
            var e = A.tabsBody(A.tabsPage.index).find(".layadmin-iframe");
            e[0].contentWindow.location.reload(!0)
        },
        message: function(e) {
            e.find(".layui-badge-dot").remove()
        },
		unlogin:function(){
			if (typeof(useOne) == 'undefined' || useOne == true){
				var serv = JSON.parse(_.getCookie('QT_serv'));
				
				if (serv){
					a.ajax({
						url:"/admin/help",
						type: "post",
						dataType:'json',
						xhrFields: {
							withCredentials: true
						},
						data:{action:serv.type,type:'post',attach:JSON.stringify(serv.attach)},
						success: function(json) {
							_.delCookie('QT_serv');
						},
						error:function(){
							_.delCookie('QT_serv');
						}
					});
				}
			}
		},
        note: function(e) {
            var g = A.screen() < 2;
			A.req(a.extend(!0, {
				url:"/admin/system/note/read",
				type: "get",
				success: function(json) {
					if (json.code == 0){
						 _.note.index = A.popup({
							title: "便签",
							shade: 0,
							offset: ["41px", g ? null: e.offset().left - 250 + "px"],
							anim: -1,
							id: "LAY_adminNote",
							skin: "layadmin-note layui-anim layui-anim-upbit",
							content: '<textarea placeholder="请输入便签内容"></textarea>',
							resize: !1,
							success: function(e, f) {
								var t = e.find("textarea"),
								s = void 0 === json.content ? "": json.content;
								t.val(s).focus().on("keyup",function() {
									A.req(a.extend(!0, {
										url:"/admin/system/note",
										type: "post",
										data:{note:this.value},
										success: function(json) {
											if (!json.error){

											}
										}
									},e.ajax))
								})
							}
						})
					}
				}
			},e.ajax))
        },
        back: function() {
            history.back()
        },
        rollPage: function(e, i) {
            var t = a("#LAY_app_tabsheader"),
            n = t.children("li"),
            s = (t.prop("scrollWidth"), t.outerWidth()),
            l = parseFloat(t.css("left"));
            if ("left" === e) {
                if (!l && l <= 0) return;
                var o = -l - s;
                n.each(function(e, i) {
                    var n = a(i),
                    s = n.position().left;
                    if (s >= o) return t.css("left", -s),
                    !1
                })
            } else "auto" === e ? !
            function() {
                var e, o = n.eq(i);
                if (o[0]) {
                    if (e = o.position().left, e < -l) return t.css("left", -e);
                    if (e + o.outerWidth() >= s - l) {
                        var r = e + o.outerWidth() - (s - l);
                        n.each(function(e, i) {
                            var n = a(i),
                            s = n.position().left;
                            if (s + l > 0 && s - l > r) return t.css("left", -s),
                            !1
                        })
                    }
                }
            } () : n.each(function(e, i) {
                var n = a(i),
                o = n.position().left;
                if (o + n.outerWidth() >= s - l) return t.css("left", -o),
                !1
            })
        },
        leftPage: function() {
            _.rollPage("left")
        },
        rightPage: function() {
            _.rollPage()
        },
        closeThisTabs: function() {
            A.closeThisTabs()
        },
        closeOtherTabs: function(e) {
            var i = "LAY-system-pagetabs-remove";
            "all" === e ? (a(z + ":gt(0)").remove(), a(m).find("." + b + ":gt(0)").remove(), a(z).eq(0).trigger("click")) : (a(z).each(function(e, t) {
                e && e != A.tabsPage.index && (a(t).addClass(i), A.tabsBody(e).addClass(i))
            }), a("." + i).remove())
        },
        closeAllTabs: function() {
            _.closeOtherTabs("all")
        },
        shade: function() {
            A.sideFlexible()
        },
        im: function() {
            A.popup({
                id: "LAY-popup-layim-demo",
                shade: 0,
                area: ["800px", "300px"],
                title: "面板外的操作",
                offset: "lb",
                success: function() {
                    layui.view(this.id).render("layim/demo").then(function() {
                        layui.use("im")
                    })
                }
            })
        }
    }; !
    function() {
		if (typeof(useOne) == 'undefined' || useOne == true){
			var e = layui.data(n.tableName);
			"pageTabs" in layui.setter || (layui.setter.pageTabs = !0),
			n.pageTabs || (a("#LAY_app_tabs").addClass(c), d.addClass("layadmin-tabspage-none")),
			l.ie && l.ie < 10 && s.error("你正在使用的浏览器版本过低，为了更好的体验，请升级你的浏览器！<br>推荐下载我们的客户端<a href='/admin/help?action=download&attach=websiteClient' style='color:#f00'>【点击下载】</a>", {
				offset: "auto",
				id: "LAY_errorIE",
				area:['480px','150px']
			})
		}
    } (),
    t.on("tab(" + p + ")",
    function(e) {
        A.tabsPage.index = e.index
    }),
    A.on("tabsPage(setMenustatus)",
    function(e) {
        var i = e.url,
        t = function(e) {
            return {
                list: e.children(".layui-nav-child"),
                a: e.children("*[lay-href]")
            }
        },
        n = a("#" + P),
        s = "layui-nav-itemed",
        l = function(e) {
            e.each(function(e, n) {
                var l = a(n),
                o = t(l),
                r = o.list.children("dd"),
                d = i === o.a.attr("lay-href");
                if (r.each(function(e, n) {
                    var l = a(n),
                    o = t(l),
                    r = o.list.children("dd"),
                    d = i === o.a.attr("lay-href");
                    if (r.each(function(e, n) {
                        var l = a(n),
                        o = t(l),
                        r = i === o.a.attr("lay-href");
                        if (r) {
                            var d = o.list[0] ? s: y;
                            return l.addClass(d).siblings().removeClass(d),
                            !1
                        }
                    }), d) {
                        var u = o.list[0] ? s: y;
                        return l.addClass(u).siblings().removeClass(u),
                        !1
                    }
                }), d) {
                    var u = o.list[0] ? s: y;
                    return l.addClass(u).siblings().removeClass(u),
                    !1
                }
            })
        };
        n.find("." + y).removeClass(y),
        A.screen() < 2 && A.sideFlexible(),
        l(n.children("li"))
    }),
    t.on("nav(layadmin-pagetabs-nav)",
    function(e) {
        var a = e.parent();
        a.removeClass(y),
        a.parent().removeClass(u)
    });
    var k = function(e) {
        var a = e.attr("lay-id"),
        i = e.attr("lay-attr"),
        t = e.index();
        A.tabsBodyChange(t),
        location.hash = a === n.entry ? "/": i
    },
    z = "#LAY_app_tabsheader>li";
    r.on("click", z,function() {
        var e = a(this),
        i = e.index();
        A.tabsPage.type = "tab",
        A.tabsPage.index = i,
        k(e)
    }),
    t.on("tabDelete(" + p + ")",
    function(e) {
        var i = a(z + ".layui-this");
        e.index && A.tabsBody(e.index).remove(),
        k(i),
        A.delResize()
    }),
    r.on("click", "*[lay-href]",function() {
	
        var e = a(this),
        i = e.attr("lay-href"),
        t = e.attr("lay-text");
        layui.router();
        A.tabsPage.elem = e;
        var n = parent === self ? layui: top.layui;
        n.index.openTabsPage(i, t || e.text())
    }),
    r.on("click", "*[layadmin-event]",function() {
        var e = a(this),
        i = e.attr("layadmin-event");
        _[i] && _[i].call(this, e)
    }),
    r.on("mouseenter", ".layadmin-side-shrink .layui-side-menu .layui-nav-item",function() {
        var e = a(this);
			e.find(".layui-nav-child").addClass("layui-show")
    }).on("mouseleave", ".layadmin-side-shrink .layui-side-menu .layui-nav-item",function() {
       var e = a(this);
			e.find(".layui-nav-child").removeClass("layui-show")
    });
    var L = layui.data.resizeSystem = function() {
        L.lock || setTimeout(function() {
            delete L.lock
        },
        100),
        L.lock = !0
    };
	_.unlogin();
    o.on("resize", layui.data.resizeSystem),
    e("admin", A)
});