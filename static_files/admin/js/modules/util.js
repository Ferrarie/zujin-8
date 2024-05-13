;
layui.define("jquery",
function(e) {
	"use strict";
	var t = layui.$,
	i = {
		fixbar: function(e) {
			var i, o, a = "layui-fixbar",
			r = "layui-fixbar-top",
			n = t(document),
			l = t("body");
			e = t.extend({
				showHeight: 200
			},
			e),
			e.bar1 = e.bar1 === !0 ? "&#xe606;": e.bar1,
			e.bar2 = e.bar2 === !0 ? "&#xe607;": e.bar2,
			e.bgcolor = e.bgcolor ? "background-color:" + e.bgcolor: "";
			var c = [e.bar1, e.bar2, "&#xe604;"],
			g = t(['<ul class="' + a + '">', e.bar1 ? '<li class="layui-icon" lay-type="bar1" style="' + e.bgcolor + '">' + c[0] + "</li>": "", e.bar2 ? '<li class="layui-icon" lay-type="bar2" style="' + e.bgcolor + '">' + c[1] + "</li>": "", '<li class="layui-icon ' + r + '" lay-type="top" style="' + e.bgcolor + '">' + c[2] + "</li>", "</ul>"].join("")),
			s = g.find("." + r),
			u = function() {
				var t = n.scrollTop();
				t >= e.showHeight ? i || (s.show(), i = 1) : i && (s.hide(), i = 0)
			};
			t("." + a)[0] || ("object" == typeof e.css && g.css(e.css), l.append(g), u(), g.find("li").on("click",
			function() {
				var i = t(this),
				o = i.attr("lay-type");
				"top" === o && t("html,body").animate({
					scrollTop: 0
				},
				200),
				e.click && e.click.call(this, o)
			}), n.on("scroll",
			function() {
				clearTimeout(o),
				o = setTimeout(function() {
					u()
				},
				100)
			}))
		},
		countdown: function(e, t, i) {
			var o = this,
			a = "function" == typeof t,
			r = new Date(e).getTime(),
			n = new Date(!t || a ? (new Date).getTime() : t).getTime(),
			l = r - n,
			c = [Math.floor(l / 864e5), Math.floor(l / 36e5) % 24, Math.floor(l / 6e4) % 60, Math.floor(l / 1e3) % 60];
			a && (i = t);
			var g = setTimeout(function() {
				o.countdown(e, n + 1e3, i)
			},
			1e3);
			return i && i(l > 0 ? c: [0, 0, 0, 0], t, g),
			l <= 0 && clearTimeout(g),
			g
		},
		timeAgo: function(e, t) {
			var i = this,
			o = [[], []],
			a = (new Date).getTime() - new Date(e).getTime();
			return a > 6912e5 ? (a = new Date(e), o[0][0] = i.digit(a.getFullYear(), 4), o[0][1] = i.digit(a.getMonth() + 1), o[0][2] = i.digit(a.getDate()), t || (o[1][0] = i.digit(a.getHours()), o[1][1] = i.digit(a.getMinutes()), o[1][2] = i.digit(a.getSeconds())), o[0].join("-") + " " + o[1].join(":")) : a >= 864e5 ? (a / 1e3 / 60 / 60 / 24 | 0) + "天前": a >= 36e5 ? (a / 1e3 / 60 / 60 | 0) + "小时前": a >= 12e4 ? (a / 1e3 / 60 | 0) + "分钟前": a < 0 ? "未来": "刚刚"
		},
		digit: function(e, t) {
			var i = "";
			e = String(e),
			t = t || 2;
			for (var o = e.length; o < t; o++) i += "0";
			return e < Math.pow(10, t) ? i + (0 | e) : e
		},
		queryString: function(str) { 
			var reg = new RegExp("(^|&)" + str + "=([^&]*)(&|$)", "i"); 
			var r = window.location.search.substr(1).match(reg); 
			if (r != null) return unescape(r[2]); 
			return null; 
		},
		toDateString: function(e, t) {
			var i = this,
			o = new Date(e || new Date),
			a = [i.digit(o.getFullYear(), 4), i.digit(o.getMonth() + 1), i.digit(o.getDate())],
			r = [i.digit(o.getHours()), i.digit(o.getMinutes()), i.digit(o.getSeconds())];
			return t = t || "yyyy-MM-dd HH:mm:ss",
			t.replace(/yyyy/g, a[0]).replace(/MM/g, a[1]).replace(/dd/g, a[2]).replace(/HH/g, r[0]).replace(/mm/g, r[1]).replace(/ss/g, r[2])
		},
		/** 
		 * 时间戳格式化函数和PHP用法一致 
		 * @param  {string} format    格式 
		 * @param  {int}    timestamp 要格式化的时间 默认为当前时间 
		 * @return {string}           格式化的时间字符串 
		 */
		date: function(format, timestamp) {
			var format = format || 'Y-m-d H:i:s';
			var a, jsdate = ((timestamp) ? new Date(timestamp * 1000) : new Date());
			var pad = function(n, c) {
				if ((n = n + "").length < c) {
					return new Array(++c - n.length).join("0") + n;
				} else {
					return n;
				}
			};
			var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
			var txt_ordin = {
				1 : "st",2 : "nd",3 : "rd",21 : "st",22 : "nd",23 : "rd",31 : "st"
			};
			var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			var f = {
				d: function() {
					return pad(f.j(), 2)
				},
				D: function() {
					return f.l().substr(0, 3)
				},
				j: function() {
					return jsdate.getDate()
				},
				l: function() {
					return txt_weekdays[f.w()]
				},
				N: function() {
					return f.w() + 1
				},
				S: function() {
					return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'
				},
				w: function() {
					return jsdate.getDay()
				},
				z: function() {
					return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0
				},

				W: function() {
					var a = f.z(),
					b = 364 + f.L() - a;
					var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
					if (b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b) {
						return 1;
					} else {
						if (a <= 2 && nd >= 4 && a >= (6 - nd)) {
							nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
							return date("W", Math.round(nd2.getTime() / 1000));
						} else {
							return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
						}
					}
				},

				F: function() {
					return txt_months[f.n()]
				},
				m: function() {
					return pad(f.n(), 2)
				},
				M: function() {
					return f.F().substr(0, 3)
				},
				n: function() {
					return jsdate.getMonth() + 1
				},
				t: function() {
					var n;
					if ((n = jsdate.getMonth() + 1) == 2) {
						return 28 + f.L();
					} else {
						if (n & 1 && n < 8 || !(n & 1) && n > 7) {
							return 31;
						} else {
							return 30;
						}
					}
				},

				L: function() {
					var y = f.Y();
					return (! (y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0
				},
				Y: function() {
					return jsdate.getFullYear()
				},
				y: function() {
					return (jsdate.getFullYear() + "").slice(2)
				},

				a: function() {
					return jsdate.getHours() > 11 ? "pm": "am"
				},
				A: function() {
					return f.a().toUpperCase()
				},
				B: function() {
					var off = (jsdate.getTimezoneOffset() + 60) * 60;
					var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
					var beat = Math.floor(theSeconds / 86.4);
					if (beat > 1000) beat -= 1000;
					if (beat < 0) beat += 1000;
					if ((String(beat)).length == 1) beat = "00" + beat;
					if ((String(beat)).length == 2) beat = "0" + beat;
					return beat;
				},
				g: function() {
					return jsdate.getHours() % 12 || 12
				},
				G: function() {
					return jsdate.getHours()
				},
				h: function() {
					return pad(f.g(), 2)
				},
				H: function() {
					return pad(jsdate.getHours(), 2)
				},
				i: function() {
					return pad(jsdate.getMinutes(), 2)
				},
				s: function() {
					return pad(jsdate.getSeconds(), 2)
				},
				O: function() {
					var t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4);
					if (jsdate.getTimezoneOffset() > 0) t = "-" + t;
					else t = "+" + t;
					return t;
				},
				P: function() {
					var O = f.O();
					return (O.substr(0, 3) + ":" + O.substr(3, 2))
				},
				c: function() {
					return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()
				},
				U: function() {
					return Math.round(jsdate.getTime() / 1000)
				}
			};

			return format.replace(/[\\]?([a-zA-Z])/g,function(t, s) {
				var ret;
				if (t != s) {
					ret = s;
				} else if (f[s]) {
					ret = f[s]();
				} else {
					ret = s;
				}
				return ret;
			});
		}
	};
	e("util", i)
});