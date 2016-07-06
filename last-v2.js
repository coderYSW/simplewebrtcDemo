! function(e) {
	if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
	else if ("function" == typeof define && define.amd) define([], e);
	else {
		var t;
		t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.SimpleWebRTC = e()
	}
}(function() {
	var e;
	return function t(e, n, r) {
		function i(a, s) {
			if (!n[a]) {
				if (!e[a]) {
					var c = "function" == typeof require && require;
					if (!s && c) return c(a, !0);
					if (o) return o(a, !0);
					var p = new Error("Cannot find module '" + a + "'");
					throw p.code = "MODULE_NOT_FOUND", p
				}
				var d = n[a] = {
					exports: {}
				};
				e[a][0].call(d.exports, function(t) {
					var n = e[a][1][t];
					return i(n ? n : t)
				}, d, d.exports, t, e, n, r)
			}
			return n[a].exports
		}
		for (var o = "function" == typeof require && require, a = 0; a < r.length; a++) i(r[a]);
		return i
	}({
		1: [function(e, t, n) {
			function r(e, t, n) {
				function r(e, i) {
					if (r.count <= 0) throw new Error("after called too many times");
					--r.count, e ? (o = !0, t(e), t = n) : 0 !== r.count || o || t(null, i)
				}
				var o = !1;
				return n = n || i, r.count = e, 0 === e ? t() : r
			}

			function i() {}
			t.exports = r
		}, {}],
		2: [function(e, t, n) {
			t.exports = function(e, t, n) {
				var r = e.byteLength;
				if (t = t || 0, n = n || r, e.slice) return e.slice(t, n);
				if (0 > t && (t += r), 0 > n && (n += r), n > r && (n = r), t >= r || t >= n || 0 === r) return new ArrayBuffer(0);
				for (var i = new Uint8Array(e), o = new Uint8Array(n - t), a = t, s = 0; n > a; a++, s++) o[s] = i[a];
				return o.buffer
			}
		}, {}],
		3: [function(e, t, n) {
			e("webrtc-adapter");
			t.exports = function(e, t, n) {
				var r, i = (window.URL, t),
					o = {
						autoplay: !0,
						mirror: !1,
						muted: !1,
						audio: !1,
						disableContextMenu: !1
					};
				if (n)
					for (r in n) o[r] = n[r];
				return i ? "audio" === i.tagName.toLowerCase() && (o.audio = !0) : i = document.createElement(o.audio ? "audio" : "video"), o.disableContextMenu && (i.oncontextmenu = function(e) {
					e.preventDefault()
				}), o.autoplay && (i.autoplay = "autoplay"), o.muted && (i.muted = !0), !o.audio && o.mirror && ["", "moz", "webkit", "o", "ms"].forEach(function(e) {
					var t = e ? e + "Transform" : "transform";
					i.style[t] = "scaleX(-1)"
				}), i.srcObject = e, i
			}
		}, {
			"webrtc-adapter": 68
		}],
		4: [function(e, t, n) {
			function r(e) {
				e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0
			}
			t.exports = r, r.prototype.duration = function() {
				var e = this.ms * Math.pow(this.factor, this.attempts++);
				if (this.jitter) {
					var t = Math.random(),
						n = Math.floor(t * this.jitter * e);
					e = 0 == (1 & Math.floor(10 * t)) ? e - n : e + n
				}
				return 0 | Math.min(e, this.max)
			}, r.prototype.reset = function() {
				this.attempts = 0
			}, r.prototype.setMin = function(e) {
				this.ms = e
			}, r.prototype.setMax = function(e) {
				this.max = e
			}, r.prototype.setJitter = function(e) {
				this.jitter = e
			}
		}, {}],
		5: [function(e, t, n) {
			! function(e) {
				"use strict";
				n.encode = function(t) {
					var n, r = new Uint8Array(t),
						i = r.length,
						o = "";
					for (n = 0; i > n; n += 3) o += e[r[n] >> 2], o += e[(3 & r[n]) << 4 | r[n + 1] >> 4], o += e[(15 & r[n + 1]) << 2 | r[n + 2] >> 6], o += e[63 & r[n + 2]];
					return i % 3 === 2 ? o = o.substring(0, o.length - 1) + "=" : i % 3 === 1 && (o = o.substring(0, o.length - 2) + "=="), o
				}, n.decode = function(t) {
					var n, r, i, o, a, s = .75 * t.length,
						c = t.length,
						p = 0;
					"=" === t[t.length - 1] && (s--, "=" === t[t.length - 2] && s--);
					var d = new ArrayBuffer(s),
						u = new Uint8Array(d);
					for (n = 0; c > n; n += 4) r = e.indexOf(t[n]), i = e.indexOf(t[n + 1]), o = e.indexOf(t[n + 2]), a = e.indexOf(t[n + 3]), u[p++] = r << 2 | i >> 4, u[p++] = (15 & i) << 4 | o >> 2, u[p++] = (3 & o) << 6 | 63 & a;
					return d
				}
			}("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")
		}, {}],
		6: [function(e, t, n) {
			(function(e) {
				function n(e) {
					for (var t = 0; t < e.length; t++) {
						var n = e[t];
						if (n.buffer instanceof ArrayBuffer) {
							var r = n.buffer;
							if (n.byteLength !== r.byteLength) {
								var i = new Uint8Array(n.byteLength);
								i.set(new Uint8Array(r, n.byteOffset, n.byteLength)), r = i.buffer
							}
							e[t] = r
						}
					}
				}

				function r(e, t) {
					t = t || {};
					var r = new o;
					n(e);
					for (var i = 0; i < e.length; i++) r.append(e[i]);
					return t.type ? r.getBlob(t.type) : r.getBlob()
				}

				function i(e, t) {
					return n(e), new Blob(e, t || {})
				}
				var o = e.BlobBuilder || e.WebKitBlobBuilder || e.MSBlobBuilder || e.MozBlobBuilder,
					a = function() {
						try {
							var e = new Blob(["hi"]);
							return 2 === e.size
						} catch (t) {
							return !1
						}
					}(),
					s = a && function() {
						try {
							var e = new Blob([new Uint8Array([1, 2])]);
							return 2 === e.size
						} catch (t) {
							return !1
						}
					}(),
					c = o && o.prototype.append && o.prototype.getBlob;
				t.exports = function() {
					return a ? s ? e.Blob : i : c ? r : void 0
				}()
			}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
		}, {}],
		7: [function(e, t, n) {
			var r = [].slice;
			t.exports = function(e, t) {
				if ("string" == typeof t && (t = e[t]), "function" != typeof t) throw new Error("bind() requires a function");
				var n = r.call(arguments, 2);
				return function() {
					return t.apply(e, n.concat(r.call(arguments)))
				}
			}
		}, {}],
		8: [function(e, t, n) {
			function r(e) {
				return e ? i(e) : void 0
			}

			function i(e) {
				for (var t in r.prototype) e[t] = r.prototype[t];
				return e
			}
			t.exports = r, r.prototype.on = r.prototype.addEventListener = function(e, t) {
				return this._callbacks = this._callbacks || {}, (this._callbacks[e] = this._callbacks[e] || []).push(t), this
			}, r.prototype.once = function(e, t) {
				function n() {
					r.off(e, n), t.apply(this, arguments)
				}
				var r = this;
				return this._callbacks = this._callbacks || {}, n.fn = t, this.on(e, n), this
			}, r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function(e, t) {
				if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
				var n = this._callbacks[e];
				if (!n) return this;
				if (1 == arguments.length) return delete this._callbacks[e], this;
				for (var r, i = 0; i < n.length; i++)
					if (r = n[i], r === t || r.fn === t) {
						n.splice(i, 1);
						break
					}
				return this
			}, r.prototype.emit = function(e) {
				this._callbacks = this._callbacks || {};
				var t = [].slice.call(arguments, 1),
					n = this._callbacks[e];
				if (n) {
					n = n.slice(0);
					for (var r = 0, i = n.length; i > r; ++r) n[r].apply(this, t)
				}
				return this
			}, r.prototype.listeners = function(e) {
				return this._callbacks = this._callbacks || {}, this._callbacks[e] || []
			}, r.prototype.hasListeners = function(e) {
				return !!this.listeners(e).length
			}
		}, {}],
		9: [function(e, t, n) {
			t.exports = function(e, t) {
				var n = function() {};
				n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e
			}
		}, {}],
		10: [function(e, t, n) {
			function r(e) {
				return r.enabled(e) ? function(t) {
					t = i(t);
					var n = new Date,
						o = n - (r[e] || n);
					r[e] = n, t = e + " " + t + " +" + r.humanize(o), window.console && console.log && Function.prototype.apply.call(console.log, console, arguments)
				} : function() {}
			}

			function i(e) {
				return e instanceof Error ? e.stack || e.message : e
			}
			t.exports = r, r.names = [], r.skips = [], r.enable = function(e) {
				try {
					localStorage.debug = e
				} catch (t) {}
				for (var n = (e || "").split(/[\s,]+/), i = n.length, o = 0; i > o; o++) e = n[o].replace("*", ".*?"), "-" === e[0] ? r.skips.push(new RegExp("^" + e.substr(1) + "$")) : r.names.push(new RegExp("^" + e + "$"))
			}, r.disable = function() {
				r.enable("")
			}, r.humanize = function(e) {
				var t = 1e3,
					n = 6e4,
					r = 60 * n;
				return e >= r ? (e / r).toFixed(1) + "h" : e >= n ? (e / n).toFixed(1) + "m" : e >= t ? (e / t | 0) + "s" : e + "ms"
			}, r.enabled = function(e) {
				for (var t = 0, n = r.skips.length; n > t; t++)
					if (r.skips[t].test(e)) return !1;
				for (var t = 0, n = r.names.length; n > t; t++)
					if (r.names[t].test(e)) return !0;
				return !1
			};
			try {
				window.localStorage && r.enable(localStorage.debug)
			} catch (o) {}
		}, {}],
		11: [function(e, t, n) {
			t.exports = e("./lib/")
		}, {
			"./lib/": 12
		}],
		12: [function(e, t, n) {
			t.exports = e("./socket"), t.exports.parser = e("engine.io-parser")
		}, {
			"./socket": 13,
			"engine.io-parser": 24
		}],
		13: [function(e, t, n) {
			(function(n) {
				function r(e, t) {
					if (!(this instanceof r)) return new r(e, t);
					if (t = t || {}, e && "object" == typeof e && (t = e, e = null), e && (e = d(e), t.host = e.host, t.secure = "https" == e.protocol || "wss" == e.protocol, t.port = e.port, e.query && (t.query = e.query)), this.secure = null != t.secure ? t.secure : n.location && "https:" == location.protocol, t.host) {
						var i = t.host.split(":");
						t.hostname = i.shift(), i.length ? t.port = i.pop() : t.port || (t.port = this.secure ? "443" : "80")
					}
					this.agent = t.agent || !1, this.hostname = t.hostname || (n.location ? location.hostname : "localhost"), this.port = t.port || (n.location && location.port ? location.port : this.secure ? 443 : 80), this.query = t.query || {}, "string" == typeof this.query && (this.query = l.decode(this.query)), this.upgrade = !1 !== t.upgrade, this.path = (t.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!t.forceJSONP, this.jsonp = !1 !== t.jsonp, this.forceBase64 = !!t.forceBase64, this.enablesXDR = !!t.enablesXDR, this.timestampParam = t.timestampParam || "t", this.timestampRequests = t.timestampRequests, this.transports = t.transports || ["polling", "websocket"], this.readyState = "", this.writeBuffer = [], this.callbackBuffer = [], this.policyPort = t.policyPort || 843, this.rememberUpgrade = t.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = t.onlyBinaryUpgrades, this.pfx = t.pfx || null, this.key = t.key || null, this.passphrase = t.passphrase || null, this.cert = t.cert || null, this.ca = t.ca || null, this.ciphers = t.ciphers || null, this.rejectUnauthorized = t.rejectUnauthorized || null, this.open()
				}

				function i(e) {
					var t = {};
					for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
					return t
				}
				var o = e("./transports"),
					a = e("component-emitter"),
					s = e("debug")("engine.io-client:socket"),
					c = e("indexof"),
					p = e("engine.io-parser"),
					d = e("parseuri"),
					u = e("parsejson"),
					l = e("parseqs");
				t.exports = r, r.priorWebsocketSuccess = !1, a(r.prototype), r.protocol = p.protocol, r.Socket = r, r.Transport = e("./transport"), r.transports = e("./transports"), r.parser = e("engine.io-parser"), r.prototype.createTransport = function(e) {
					s('creating transport "%s"', e);
					var t = i(this.query);
					t.EIO = p.protocol, t.transport = e, this.id && (t.sid = this.id);
					var n = new o[e]({
						agent: this.agent,
						hostname: this.hostname,
						port: this.port,
						secure: this.secure,
						path: this.path,
						query: t,
						forceJSONP: this.forceJSONP,
						jsonp: this.jsonp,
						forceBase64: this.forceBase64,
						enablesXDR: this.enablesXDR,
						timestampRequests: this.timestampRequests,
						timestampParam: this.timestampParam,
						policyPort: this.policyPort,
						socket: this,
						pfx: this.pfx,
						key: this.key,
						passphrase: this.passphrase,
						cert: this.cert,
						ca: this.ca,
						ciphers: this.ciphers,
						rejectUnauthorized: this.rejectUnauthorized
					});
					return n
				}, r.prototype.open = function() {
					var e;
					if (this.rememberUpgrade && r.priorWebsocketSuccess && -1 != this.transports.indexOf("websocket")) e = "websocket";
					else {
						if (0 == this.transports.length) {
							var t = this;
							return void setTimeout(function() {
								t.emit("error", "No transports available")
							}, 0)
						}
						e = this.transports[0]
					}
					this.readyState = "opening";
					var e;
					try {
						e = this.createTransport(e)
					} catch (n) {
						return this.transports.shift(), void this.open()
					}
					e.open(), this.setTransport(e)
				}, r.prototype.setTransport = function(e) {
					s("setting transport %s", e.name);
					var t = this;
					this.transport && (s("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), this.transport = e, e.on("drain", function() {
						t.onDrain()
					}).on("packet", function(e) {
						t.onPacket(e)
					}).on("error", function(e) {
						t.onError(e)
					}).on("close", function() {
						t.onClose("transport close")
					})
				}, r.prototype.probe = function(e) {
					function t() {
						if (l.onlyBinaryUpgrades) {
							var t = !this.supportsBinary && l.transport.supportsBinary;
							u = u || t
						}
						u || (s('probe transport "%s" opened', e), d.send([{
							type: "ping",
							data: "probe"
						}]), d.once("packet", function(t) {
							if (!u)
								if ("pong" == t.type && "probe" == t.data) {
									if (s('probe transport "%s" pong', e), l.upgrading = !0, l.emit("upgrading", d), !d) return;
									r.priorWebsocketSuccess = "websocket" == d.name, s('pausing current transport "%s"', l.transport.name), l.transport.pause(function() {
										u || "closed" != l.readyState && (s("changing transport and sending upgrade packet"), p(), l.setTransport(d), d.send([{
											type: "upgrade"
										}]), l.emit("upgrade", d), d = null, l.upgrading = !1, l.flush())
									})
								} else {
									s('probe transport "%s" failed', e);
									var n = new Error("probe error");
									n.transport = d.name, l.emit("upgradeError", n)
								}
						}))
					}

					function n() {
						u || (u = !0, p(), d.close(), d = null)
					}

					function i(t) {
						var r = new Error("probe error: " + t);
						r.transport = d.name, n(), s('probe transport "%s" failed because of error: %s', e, t), l.emit("upgradeError", r)
					}

					function o() {
						i("transport closed")
					}

					function a() {
						i("socket closed")
					}

					function c(e) {
						d && e.name != d.name && (s('"%s" works - aborting "%s"', e.name, d.name), n())
					}

					function p() {
						d.removeListener("open", t), d.removeListener("error", i), d.removeListener("close", o), l.removeListener("close", a), l.removeListener("upgrading", c)
					}
					s('probing transport "%s"', e);
					var d = this.createTransport(e, {
							probe: 1
						}),
						u = !1,
						l = this;
					r.priorWebsocketSuccess = !1, d.once("open", t), d.once("error", i), d.once("close", o), this.once("close", a), this.once("upgrading", c), d.open()
				}, r.prototype.onOpen = function() {
					if (s("socket open"), this.readyState = "open", r.priorWebsocketSuccess = "websocket" == this.transport.name, this.emit("open"), this.flush(), "open" == this.readyState && this.upgrade && this.transport.pause) {
						s("starting upgrade probes");
						for (var e = 0, t = this.upgrades.length; t > e; e++) this.probe(this.upgrades[e])
					}
				}, r.prototype.onPacket = function(e) {
					if ("opening" == this.readyState || "open" == this.readyState) switch (s('socket receive: type "%s", data "%s"', e.type, e.data), this.emit("packet", e), this.emit("heartbeat"), e.type) {
						case "open":
							this.onHandshake(u(e.data));
							break;
						case "pong":
							this.setPing();
							break;
						case "error":
							var t = new Error("server error");
							t.code = e.data, this.emit("error", t);
							break;
						case "message":
							this.emit("data", e.data), this.emit("message", e.data)
					} else s('packet received with socket readyState "%s"', this.readyState)
				}, r.prototype.onHandshake = function(e) {
					this.emit("handshake", e), this.id = e.sid, this.transport.query.sid = e.sid, this.upgrades = this.filterUpgrades(e.upgrades), this.pingInterval = e.pingInterval, this.pingTimeout = e.pingTimeout, this.onOpen(), "closed" != this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat))
				}, r.prototype.onHeartbeat = function(e) {
					clearTimeout(this.pingTimeoutTimer);
					var t = this;
					t.pingTimeoutTimer = setTimeout(function() {
						"closed" != t.readyState && t.onClose("ping timeout")
					}, e || t.pingInterval + t.pingTimeout)
				}, r.prototype.setPing = function() {
					var e = this;
					clearTimeout(e.pingIntervalTimer), e.pingIntervalTimer = setTimeout(function() {
						s("writing ping packet - expecting pong within %sms", e.pingTimeout), e.ping(), e.onHeartbeat(e.pingTimeout)
					}, e.pingInterval)
				}, r.prototype.ping = function() {
					this.sendPacket("ping")
				}, r.prototype.onDrain = function() {
					for (var e = 0; e < this.prevBufferLen; e++) this.callbackBuffer[e] && this.callbackBuffer[e]();
					this.writeBuffer.splice(0, this.prevBufferLen), this.callbackBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 == this.writeBuffer.length ? this.emit("drain") : this.flush()
				}, r.prototype.flush = function() {
					"closed" != this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (s("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"))
				}, r.prototype.write = r.prototype.send = function(e, t) {
					return this.sendPacket("message", e, t), this
				}, r.prototype.sendPacket = function(e, t, n) {
					if ("closing" != this.readyState && "closed" != this.readyState) {
						var r = {
							type: e,
							data: t
						};
						this.emit("packetCreate", r), this.writeBuffer.push(r), this.callbackBuffer.push(n), this.flush()
					}
				}, r.prototype.close = function() {
					function e() {
						r.onClose("forced close"), s("socket closing - telling transport to close"), r.transport.close()
					}

					function t() {
						r.removeListener("upgrade", t), r.removeListener("upgradeError", t), e()
					}

					function n() {
						r.once("upgrade", t), r.once("upgradeError", t)
					}
					if ("opening" == this.readyState || "open" == this.readyState) {
						this.readyState = "closing";
						var r = this;
						this.writeBuffer.length ? this.once("drain", function() {
							this.upgrading ? n() : e()
						}) : this.upgrading ? n() : e()
					}
					return this
				}, r.prototype.onError = function(e) {
					s("socket error %j", e), r.priorWebsocketSuccess = !1, this.emit("error", e), this.onClose("transport error", e)
				}, r.prototype.onClose = function(e, t) {
					if ("opening" == this.readyState || "open" == this.readyState || "closing" == this.readyState) {
						s('socket close with reason: "%s"', e);
						var n = this;
						clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), setTimeout(function() {
							n.writeBuffer = [], n.callbackBuffer = [], n.prevBufferLen = 0
						}, 0), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", e, t)
					}
				}, r.prototype.filterUpgrades = function(e) {
					for (var t = [], n = 0, r = e.length; r > n; n++) ~c(this.transports, e[n]) && t.push(e[n]);
					return t
				}
			}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
		}, {
			"./transport": 14,
			"./transports": 15,
			"component-emitter": 8,
			debug: 21,
			"engine.io-parser": 24,
			indexof: 33,
			parsejson: 43,
			parseqs: 44,
			parseuri: 23
		}],
		14: [function(e, t, n) {
			function r(e) {
				this.path = e.path, this.hostname = e.hostname, this.port = e.port, this.secure = e.secure, this.query = e.query, this.timestampParam = e.timestampParam, this.timestampRequests = e.timestampRequests, this.readyState = "", this.agent = e.agent || !1, this.socket = e.socket, this.enablesXDR = e.enablesXDR, this.pfx = e.pfx, this.key = e.key, this.passphrase = e.passphrase, this.cert = e.cert, this.ca = e.ca, this.ciphers = e.ciphers, this.rejectUnauthorized = e.rejectUnauthorized
			}
			var i = e("engine.io-parser"),
				o = e("component-emitter");
			t.exports = r, o(r.prototype), r.timestamps = 0, r.prototype.onError = function(e, t) {
				var n = new Error(e);
				return n.type = "TransportError", n.description = t, this.emit("error", n), this
			}, r.prototype.open = function() {
				return "closed" != this.readyState && "" != this.readyState || (this.readyState = "opening", this.doOpen()), this
			}, r.prototype.close = function() {
				return "opening" != this.readyState && "open" != this.readyState || (this.doClose(), this.onClose()), this
			}, r.prototype.send = function(e) {
				if ("open" != this.readyState) throw new Error("Transport not open");
				this.write(e)
			}, r.prototype.onOpen = function() {
				this.readyState = "open", this.writable = !0, this.emit("open")
			}, r.prototype.onData = function(e) {
				var t = i.decodePacket(e, this.socket.binaryType);
				this.onPacket(t)
			}, r.prototype.onPacket = function(e) {
				this.emit("packet", e)
			}, r.prototype.onClose = function() {
				this.readyState = "closed", this.emit("close")
			}
		}, {
			"component-emitter": 8,
			"engine.io-parser": 24
		}],
		15: [function(e, t, n) {
			(function(t) {
				function r(e) {
					var n, r = !1,
						s = !1,
						c = !1 !== e.jsonp;
					if (t.location) {
						var p = "https:" == location.protocol,
							d = location.port;
						d || (d = p ? 443 : 80), r = e.hostname != location.hostname || d != e.port, s = e.secure != p
					}
					if (e.xdomain = r, e.xscheme = s, n = new i(e), "open" in n && !e.forceJSONP) return new o(e);
					if (!c) throw new Error("JSONP disabled");
					return new a(e)
				}
				var i = e("xmlhttprequest"),
					o = e("./polling-xhr"),
					a = e("./polling-jsonp"),
					s = e("./websocket");
				n.polling = r, n.websocket = s
			}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
		}, {
			"./polling-jsonp": 16,
			"./polling-xhr": 17,
			"./websocket": 19,
			xmlhttprequest: 20
		}],
		16: [function(e, t, n) {
			(function(n) {
				function r() {}

				function i(e) {
					o.call(this, e), this.query = this.query || {}, s || (n.___eio || (n.___eio = []), s = n.___eio), this.index = s.length;
					var t = this;
					s.push(function(e) {
						t.onData(e)
					}), this.query.j = this.index, n.document && n.addEventListener && n.addEventListener("beforeunload", function() {
						t.script && (t.script.onerror = r)
					}, !1)
				}
				var o = e("./polling"),
					a = e("component-inherit");
				t.exports = i;
				var s, c = /\n/g,
					p = /\\n/g;
				a(i, o), i.prototype.supportsBinary = !1, i.prototype.doClose = function() {
					this.script && (this.script.parentNode.removeChild(this.script), this.script = null), this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), o.prototype.doClose.call(this)
				}, i.prototype.doPoll = function() {
					var e = this,
						t = document.createElement("script");
					this.script && (this.script.parentNode.removeChild(this.script), this.script = null), t.async = !0, t.src = this.uri(), t.onerror = function(t) {
						e.onError("jsonp poll error", t)
					};
					var n = document.getElementsByTagName("script")[0];
					n.parentNode.insertBefore(t, n), this.script = t;
					var r = "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent);
					r && setTimeout(function() {
						var e = document.createElement("iframe");
						document.body.appendChild(e), document.body.removeChild(e)
					}, 100)
				}, i.prototype.doWrite = function(e, t) {
					function n() {
						r(), t()
					}

					function r() {
						if (i.iframe) try {
							i.form.removeChild(i.iframe)
						} catch (e) {
							i.onError("jsonp polling iframe removal error", e)
						}
						try {
							var t = '<iframe src="javascript:0" name="' + i.iframeId + '">';
							o = document.createElement(t)
						} catch (e) {
							o = document.createElement("iframe"), o.name = i.iframeId, o.src = "javascript:0"
						}
						o.id = i.iframeId, i.form.appendChild(o), i.iframe = o
					}
					var i = this;
					if (!this.form) {
						var o, a = document.createElement("form"),
							s = document.createElement("textarea"),
							d = this.iframeId = "eio_iframe_" + this.index;
						a.className = "socketio", a.style.position = "absolute", a.style.top = "-1000px", a.style.left = "-1000px", a.target = d, a.method = "POST", a.setAttribute("accept-charset", "utf-8"), s.name = "d", a.appendChild(s), document.body.appendChild(a), this.form = a, this.area = s
					}
					this.form.action = this.uri(), r(), e = e.replace(p, "\\\n"), this.area.value = e.replace(c, "\\n");
					try {
						this.form.submit()
					} catch (u) {}
					this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
						"complete" == i.iframe.readyState && n()
					} : this.iframe.onload = n
				}
			}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
		}, {
			"./polling": 18,
			"component-inherit": 9
		}],
		17: [function(e, t, n) {
			(function(n) {
				function r() {}

				function i(e) {
					if (c.call(this, e), n.location) {
						var t = "https:" == location.protocol,
							r = location.port;
						r || (r = t ? 443 : 80), this.xd = e.hostname != n.location.hostname || r != e.port, this.xs = e.secure != t
					}
				}

				function o(e) {
					this.method = e.method || "GET", this.uri = e.uri, this.xd = !!e.xd, this.xs = !!e.xs, this.async = !1 !== e.async, this.data = void 0 != e.data ? e.data : null, this.agent = e.agent, this.isBinary = e.isBinary, this.supportsBinary = e.supportsBinary, this.enablesXDR = e.enablesXDR, this.pfx = e.pfx, this.key = e.key, this.passphrase = e.passphrase, this.cert = e.cert, this.ca = e.ca, this.ciphers = e.ciphers, this.rejectUnauthorized = e.rejectUnauthorized, this.create()
				}

				function a() {
					for (var e in o.requests) o.requests.hasOwnProperty(e) && o.requests[e].abort()
				}
				var s = e("xmlhttprequest"),
					c = e("./polling"),
					p = e("component-emitter"),
					d = e("component-inherit"),
					u = e("debug")("engine.io-client:polling-xhr");
				t.exports = i, t.exports.Request = o, d(i, c), i.prototype.supportsBinary = !0, i.prototype.request = function(e) {
					return e = e || {}, e.uri = this.uri(), e.xd = this.xd, e.xs = this.xs, e.agent = this.agent || !1, e.supportsBinary = this.supportsBinary, e.enablesXDR = this.enablesXDR, e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized, new o(e)
				}, i.prototype.doWrite = function(e, t) {
					var n = "string" != typeof e && void 0 !== e,
						r = this.request({
							method: "POST",
							data: e,
							isBinary: n
						}),
						i = this;
					r.on("success", t), r.on("error", function(e) {
						i.onError("xhr post error", e)
					}), this.sendXhr = r
				}, i.prototype.doPoll = function() {
					u("xhr poll");
					var e = this.request(),
						t = this;
					e.on("data", function(e) {
						t.onData(e)
					}), e.on("error", function(e) {
						t.onError("xhr poll error", e)
					}), this.pollXhr = e
				}, p(o.prototype), o.prototype.create = function() {
					var e = {
						agent: this.agent,
						xdomain: this.xd,
						xscheme: this.xs,
						enablesXDR: this.enablesXDR
					};
					e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized;
					var t = this.xhr = new s(e),
						r = this;
					try {
						if (u("xhr open %s: %s", this.method, this.uri), t.open(this.method, this.uri, this.async), this.supportsBinary && (t.responseType = "arraybuffer"), "POST" == this.method) try {
							this.isBinary ? t.setRequestHeader("Content-type", "application/octet-stream") : t.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
						} catch (i) {}
						"withCredentials" in t && (t.withCredentials = !0), this.hasXDR() ? (t.onload = function() {
							r.onLoad()
						}, t.onerror = function() {
							r.onError(t.responseText)
						}) : t.onreadystatechange = function() {
							4 == t.readyState && (200 == t.status || 1223 == t.status ? r.onLoad() : setTimeout(function() {
								r.onError(t.status)
							}, 0))
						}, u("xhr data %s", this.data), t.send(this.data)
					} catch (i) {
						return void setTimeout(function() {
							r.onError(i)
						}, 0)
					}
					n.document && (this.index = o.requestsCount++, o.requests[this.index] = this)
				}, o.prototype.onSuccess = function() {
					this.emit("success"), this.cleanup()
				}, o.prototype.onData = function(e) {
					this.emit("data", e), this.onSuccess()
				}, o.prototype.onError = function(e) {
					this.emit("error", e), this.cleanup(!0)
				}, o.prototype.cleanup = function(e) {
					if ("undefined" != typeof this.xhr && null !== this.xhr) {
						if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = r : this.xhr.onreadystatechange = r, e) try {
							this.xhr.abort()
						} catch (t) {}
						n.document && delete o.requests[this.index], this.xhr = null
					}
				}, o.prototype.onLoad = function() {
					var e;
					try {
						var t;
						try {
							t = this.xhr.getResponseHeader("Content-Type").split(";")[0]
						} catch (n) {}
						e = "application/octet-stream" === t ? this.xhr.response : this.supportsBinary ? "ok" : this.xhr.responseText
					} catch (n) {
						this.onError(n)
					}
					null != e && this.onData(e)
				}, o.prototype.hasXDR = function() {
					return "undefined" != typeof n.XDomainRequest && !this.xs && this.enablesXDR
				}, o.prototype.abort = function() {
					this.cleanup()
				}, n.document && (o.requestsCount = 0, o.requests = {}, n.attachEvent ? n.attachEvent("onunload", a) : n.addEventListener && n.addEventListener("beforeunload", a, !1))
			}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
		}, {
			"./polling": 18,
			"component-emitter": 8,
			"component-inherit": 9,
			debug: 21,
			xmlhttprequest: 20
		}],
		18: [function(e, t, n) {
			function r(e) {
				var t = e && e.forceBase64;
				p && !t || (this.supportsBinary = !1), i.call(this, e)
			}
			var i = e("../transport"),
				o = e("parseqs"),
				a = e("engine.io-parser"),
				s = e("component-inherit"),
				c = e("debug")("engine.io-client:polling");
			t.exports = r;
			var p = function() {
				var t = e("xmlhttprequest"),
					n = new t({
						xdomain: !1
					});
				return null != n.responseType
			}();
			s(r, i), r.prototype.name = "polling", r.prototype.doOpen = function() {
				this.poll()
			}, r.prototype.pause = function(e) {
				function t() {
					c("paused"), n.readyState = "paused", e()
				}
				var n = this;
				if (this.readyState = "pausing", this.polling || !this.writable) {
					var r = 0;
					this.polling && (c("we are currently polling - waiting to pause"), r++, this.once("pollComplete", function() {
						c("pre-pause polling complete"), --r || t()
					})), this.writable || (c("we are currently writing - waiting to pause"), r++, this.once("drain", function() {
						c("pre-pause writing complete"), --r || t()
					}))
				} else t()
			}, r.prototype.poll = function() {
				c("polling"), this.polling = !0, this.doPoll(), this.emit("poll")
			}, r.prototype.onData = function(e) {
				var t = this;
				c("polling got data %s", e);
				var n = function(e, n, r) {
					return "opening" == t.readyState && t.onOpen(), "close" == e.type ? (t.onClose(), !1) : void t.onPacket(e)
				};
				a.decodePayload(e, this.socket.binaryType, n), "closed" != this.readyState && (this.polling = !1, this.emit("pollComplete"), "open" == this.readyState ? this.poll() : c('ignoring poll - transport state "%s"', this.readyState))
			}, r.prototype.doClose = function() {
				function e() {
					c("writing close packet"), t.write([{
						type: "close"
					}])
				}
				var t = this;
				"open" == this.readyState ? (c("transport open - closing"), e()) : (c("transport not open - deferring close"), this.once("open", e))
			}, r.prototype.write = function(e) {
				var t = this;
				this.writable = !1;
				var n = function() {
						t.writable = !0, t.emit("drain")
					},
					t = this;
				a.encodePayload(e, this.supportsBinary, function(e) {
					t.doWrite(e, n)
				})
			}, r.prototype.uri = function() {
				var e = this.query || {},
					t = this.secure ? "https" : "http",
					n = "";
				return !1 !== this.timestampRequests && (e[this.timestampParam] = +new Date + "-" + i.timestamps++), this.supportsBinary || e.sid || (e.b64 = 1), e = o.encode(e), this.port && ("https" == t && 443 != this.port || "http" == t && 80 != this.port) && (n = ":" + this.port), e.length && (e = "?" + e), t + "://" + this.hostname + n + this.path + e
			}
		}, {
			"../transport": 14,
			"component-inherit": 9,
			debug: 21,
			"engine.io-parser": 24,
			parseqs: 44,
			xmlhttprequest: 20
		}],
		19: [function(e, t, n) {
			function r(e) {
				var t = e && e.forceBase64;
				t && (this.supportsBinary = !1), i.call(this, e)
			}
			var i = e("../transport"),
				o = e("engine.io-parser"),
				a = e("parseqs"),
				s = e("component-inherit"),
				c = e("debug")("engine.io-client:websocket"),
				p = e("ws");
			t.exports = r, s(r, i), r.prototype.name = "websocket", r.prototype.supportsBinary = !0, r.prototype.doOpen = function() {
				if (this.check()) {
					var e = this.uri(),
						t = void 0,
						n = {
							agent: this.agent
						};
					n.pfx = this.pfx, n.key = this.key, n.passphrase = this.passphrase, n.cert = this.cert, n.ca = this.ca, n.ciphers = this.ciphers, n.rejectUnauthorized = this.rejectUnauthorized, this.ws = new p(e, t, n), void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.binaryType = "arraybuffer", this.addEventListeners()
				}
			}, r.prototype.addEventListeners = function() {
				var e = this;
				this.ws.onopen = function() {
					e.onOpen()
				}, this.ws.onclose = function() {
					e.onClose()
				}, this.ws.onmessage = function(t) {
					e.onData(t.data)
				}, this.ws.onerror = function(t) {
					e.onError("websocket error", t)
				}
			}, "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent) && (r.prototype.onData = function(e) {
				var t = this;
				setTimeout(function() {
					i.prototype.onData.call(t, e)
				}, 0)
			}), r.prototype.write = function(e) {
				function t() {
					n.writable = !0, n.emit("drain")
				}
				var n = this;
				this.writable = !1;
				for (var r = 0, i = e.length; i > r; r++) o.encodePacket(e[r], this.supportsBinary, function(e) {
					try {
						n.ws.send(e)
					} catch (t) {
						c("websocket closed before onclose event")
					}
				});
				setTimeout(t, 0)
			}, r.prototype.onClose = function() {
				i.prototype.onClose.call(this)
			}, r.prototype.doClose = function() {
				"undefined" != typeof this.ws && this.ws.close()
			}, r.prototype.uri = function() {
				var e = this.query || {},
					t = this.secure ? "wss" : "ws",
					n = "";
				return this.port && ("wss" == t && 443 != this.port || "ws" == t && 80 != this.port) && (n = ":" + this.port), this.timestampRequests && (e[this.timestampParam] = +new Date), this.supportsBinary || (e.b64 = 1), e = a.encode(e), e.length && (e = "?" + e), t + "://" + this.hostname + n + this.path + e
			}, r.prototype.check = function() {
				return !(!p || "__initialize" in p && this.name === r.prototype.name)
			}
		}, {
			"../transport": 14,
			"component-inherit": 9,
			debug: 21,
			"engine.io-parser": 24,
			parseqs: 44,
			ws: 79
		}],
		20: [function(e, t, n) {
			var r = e("has-cors");
			t.exports = function(e) {
				var t = e.xdomain,
					n = e.xscheme,
					i = e.enablesXDR;
				try {
					if ("undefined" != typeof XMLHttpRequest && (!t || r)) return new XMLHttpRequest
				} catch (o) {}
				try {
					if ("undefined" != typeof XDomainRequest && !n && i) return new XDomainRequest
				} catch (o) {}
				if (!t) try {
					return new ActiveXObject("Microsoft.XMLHTTP")
				} catch (o) {}
			}
		}, {
			"has-cors": 32
		}],
		21: [function(e, t, n) {
			function r() {
				return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
			}

			function i() {
				var e = arguments,
					t = this.useColors;
				if (e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") + "+" + n.humanize(this.diff), !t) return e;
				var r = "color: " + this.color;
				e = [e[0], r, "color: inherit"].concat(Array.prototype.slice.call(e, 1));
				var i = 0,
					o = 0;
				return e[0].replace(/%[a-z%]/g, function(e) {
					"%%" !== e && (i++, "%c" === e && (o = i))
				}), e.splice(o, 0, r), e
			}

			function o() {
				return "object" == typeof console && "function" == typeof console.log && Function.prototype.apply.call(console.log, console, arguments)
			}

			function a(e) {
				try {
					null == e ? localStorage.removeItem("debug") : localStorage.debug = e
				} catch (t) {}
			}

			function s() {
				var e;
				try {
					e = localStorage.debug
				} catch (t) {}
				return e
			}
			n = t.exports = e("./debug"), n.log = o, n.formatArgs = i, n.save = a, n.load = s, n.useColors = r, n.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], n.formatters.j = function(e) {
				return JSON.stringify(e)
			}, n.enable(s())
		}, {
			"./debug": 22
		}],
		22: [function(e, t, n) {
			function r() {
				return n.colors[d++ % n.colors.length]
			}

			function i(e) {
				function t() {}

				function i() {
					var e = i,
						t = +new Date,
						o = t - (p || t);
					e.diff = o, e.prev = p, e.curr = t, p = t, null == e.useColors && (e.useColors = n.useColors()), null == e.color && e.useColors && (e.color = r());
					var a = Array.prototype.slice.call(arguments);
					a[0] = n.coerce(a[0]), "string" != typeof a[0] && (a = ["%o"].concat(a));
					var s = 0;
					a[0] = a[0].replace(/%([a-z%])/g, function(t, r) {
						if ("%%" === t) return t;
						s++;
						var i = n.formatters[r];
						if ("function" == typeof i) {
							var o = a[s];
							t = i.call(e, o), a.splice(s, 1), s--
						}
						return t
					}), "function" == typeof n.formatArgs && (a = n.formatArgs.apply(e, a));
					var c = i.log || n.log || console.log.bind(console);
					c.apply(e, a)
				}
				t.enabled = !1, i.enabled = !0;
				var o = n.enabled(e) ? i : t;
				return o.namespace = e, o
			}

			function o(e) {
				n.save(e);
				for (var t = (e || "").split(/[\s,]+/), r = t.length, i = 0; r > i; i++) t[i] && (e = t[i].replace(/\*/g, ".*?"), "-" === e[0] ? n.skips.push(new RegExp("^" + e.substr(1) + "$")) : n.names.push(new RegExp("^" + e + "$")))
			}

			function a() {
				n.enable("")
			}

			function s(e) {
				var t, r;
				for (t = 0, r = n.skips.length; r > t; t++)
					if (n.skips[t].test(e)) return !1;
				for (t = 0, r = n.names.length; r > t; t++)
					if (n.names[t].test(e)) return !0;
				return !1
			}

			function c(e) {
				return e instanceof Error ? e.stack || e.message : e
			}
			n = t.exports = i, n.coerce = c, n.disable = a, n.enable = o, n.enabled = s, n.humanize = e("ms"), n.names = [], n.skips = [], n.formatters = {};
			var p, d = 0
		}, {
			ms: 41
		}],
		23: [function(e, t, n) {
			var r = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
				i = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
			t.exports = function(e) {
				var t = e,
					n = e.indexOf("["),
					o = e.indexOf("]"); - 1 != n && -1 != o && (e = e.substring(0, n) + e.substring(n, o).replace(/:/g, ";") + e.substring(o, e.length));
				for (var a = r.exec(e || ""), s = {}, c = 14; c--;) s[i[c]] = a[c] || "";
				return -1 != n && -1 != o && (s.source = t, s.host = s.host.substring(1, s.host.length - 1).replace(/;/g, ":"), s.authority = s.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), s.ipv6uri = !0), s
			}
		}, {}],
		24: [function(e, t, n) {
			(function(t) {
				function r(e, t) {
					var r = "b" + n.packets[e.type] + e.data.data;
					return t(r)
				}

				function i(e, t, r) {
					if (!t) return n.encodeBase64Packet(e, r);
					var i = e.data,
						o = new Uint8Array(i),
						a = new Uint8Array(1 + i.byteLength);
					a[0] = v[e.type];
					for (var s = 0; s < o.length; s++) a[s + 1] = o[s];
					return r(a.buffer)
				}

				function o(e, t, r) {
					if (!t) return n.encodeBase64Packet(e, r);
					var i = new FileReader;
					return i.onload = function() {
						e.data = i.result, n.encodePacket(e, t, !0, r)
					}, i.readAsArrayBuffer(e.data)
				}

				function a(e, t, r) {
					if (!t) return n.encodeBase64Packet(e, r);
					if (g) return o(e, t, r);
					var i = new Uint8Array(1);
					i[0] = v[e.type];
					var a = new w([i.buffer, e.data]);
					return r(a)
				}

				function s(e, t, n) {
					for (var r = new Array(e.length), i = l(e.length, n), o = function(e, n, i) {
							t(n, function(t, n) {
								r[e] = n, i(t, r)
							})
						}, a = 0; a < e.length; a++) o(a, e[a], i)
				}
				var c = e("./keys"),
					p = e("has-binary"),
					d = e("arraybuffer.slice"),
					u = e("base64-arraybuffer"),
					l = e("after"),
					f = e("utf8"),
					h = navigator.userAgent.match(/Android/i),
					m = /PhantomJS/i.test(navigator.userAgent),
					g = h || m;
				n.protocol = 3;
				var v = n.packets = {
						open: 0,
						close: 1,
						ping: 2,
						pong: 3,
						message: 4,
						upgrade: 5,
						noop: 6
					},
					y = c(v),
					b = {
						type: "error",
						data: "parser error"
					},
					w = e("blob");
				n.encodePacket = function(e, n, o, s) {
					"function" == typeof n && (s = n, n = !1), "function" == typeof o && (s = o, o = null);
					var c = void 0 === e.data ? void 0 : e.data.buffer || e.data;
					if (t.ArrayBuffer && c instanceof ArrayBuffer) return i(e, n, s);
					if (w && c instanceof t.Blob) return a(e, n, s);
					if (c && c.base64) return r(e, s);
					var p = v[e.type];
					return void 0 !== e.data && (p += o ? f.encode(String(e.data)) : String(e.data)), s("" + p)
				}, n.encodeBase64Packet = function(e, r) {
					var i = "b" + n.packets[e.type];
					if (w && e.data instanceof w) {
						var o = new FileReader;
						return o.onload = function() {
							var e = o.result.split(",")[1];
							r(i + e)
						}, o.readAsDataURL(e.data)
					}
					var a;
					try {
						a = String.fromCharCode.apply(null, new Uint8Array(e.data))
					} catch (s) {
						for (var c = new Uint8Array(e.data), p = new Array(c.length), d = 0; d < c.length; d++) p[d] = c[d];
						a = String.fromCharCode.apply(null, p)
					}
					return i += t.btoa(a), r(i)
				}, n.decodePacket = function(e, t, r) {
					if ("string" == typeof e || void 0 === e) {
						if ("b" == e.charAt(0)) return n.decodeBase64Packet(e.substr(1), t);
						if (r) try {
							e = f.decode(e)
						} catch (i) {
							return b
						}
						var o = e.charAt(0);
						return Number(o) == o && y[o] ? e.length > 1 ? {
							type: y[o],
							data: e.substring(1)
						} : {
							type: y[o]
						} : b
					}
					var a = new Uint8Array(e),
						o = a[0],
						s = d(e, 1);
					return w && "blob" === t && (s = new w([s])), {
						type: y[o],
						data: s
					}
				}, n.decodeBase64Packet = function(e, n) {
					var r = y[e.charAt(0)];
					if (!t.ArrayBuffer) return {
						type: r,
						data: {
							base64: !0,
							data: e.substr(1)
						}
					};
					var i = u.decode(e.substr(1));
					return "blob" === n && w && (i = new w([i])), {
						type: r,
						data: i
					}
				}, n.encodePayload = function(e, t, r) {
					function i(e) {
						return e.length + ":" + e
					}

					function o(e, r) {
						n.encodePacket(e, a ? t : !1, !0, function(e) {
							r(null, i(e))
						})
					}
					"function" == typeof t && (r = t, t = null);
					var a = p(e);
					return t && a ? w && !g ? n.encodePayloadAsBlob(e, r) : n.encodePayloadAsArrayBuffer(e, r) : e.length ? void s(e, o, function(e, t) {
						return r(t.join(""))
					}) : r("0:")
				}, n.decodePayload = function(e, t, r) {
					if ("string" != typeof e) return n.decodePayloadAsBinary(e, t, r);
					"function" == typeof t && (r = t, t = null);
					var i;
					if ("" == e) return r(b, 0, 1);
					for (var o, a, s = "", c = 0, p = e.length; p > c; c++) {
						var d = e.charAt(c);
						if (":" != d) s += d;
						else {
							if ("" == s || s != (o = Number(s))) return r(b, 0, 1);
							if (a = e.substr(c + 1, o), s != a.length) return r(b, 0, 1);
							if (a.length) {
								if (i = n.decodePacket(a, t, !0), b.type == i.type && b.data == i.data) return r(b, 0, 1);
								var u = r(i, c + o, p);
								if (!1 === u) return
							}
							c += o, s = ""
						}
					}
					return "" != s ? r(b, 0, 1) : void 0
				}, n.encodePayloadAsArrayBuffer = function(e, t) {
					function r(e, t) {
						n.encodePacket(e, !0, !0, function(e) {
							return t(null, e)
						})
					}
					return e.length ? void s(e, r, function(e, n) {
						var r = n.reduce(function(e, t) {
								var n;
								return n = "string" == typeof t ? t.length : t.byteLength, e + n.toString().length + n + 2
							}, 0),
							i = new Uint8Array(r),
							o = 0;
						return n.forEach(function(e) {
							var t = "string" == typeof e,
								n = e;
							if (t) {
								for (var r = new Uint8Array(e.length), a = 0; a < e.length; a++) r[a] = e.charCodeAt(a);
								n = r.buffer
							}
							t ? i[o++] = 0 : i[o++] = 1;
							for (var s = n.byteLength.toString(), a = 0; a < s.length; a++) i[o++] = parseInt(s[a]);
							i[o++] = 255;
							for (var r = new Uint8Array(n), a = 0; a < r.length; a++) i[o++] = r[a]
						}), t(i.buffer)
					}) : t(new ArrayBuffer(0))
				}, n.encodePayloadAsBlob = function(e, t) {
					function r(e, t) {
						n.encodePacket(e, !0, !0, function(e) {
							var n = new Uint8Array(1);
							if (n[0] = 1, "string" == typeof e) {
								for (var r = new Uint8Array(e.length), i = 0; i < e.length; i++) r[i] = e.charCodeAt(i);
								e = r.buffer, n[0] = 0
							}
							for (var o = e instanceof ArrayBuffer ? e.byteLength : e.size, a = o.toString(), s = new Uint8Array(a.length + 1), i = 0; i < a.length; i++) s[i] = parseInt(a[i]);
							if (s[a.length] = 255, w) {
								var c = new w([n.buffer, s.buffer, e]);
								t(null, c)
							}
						})
					}
					s(e, r, function(e, n) {
						return t(new w(n))
					})
				}, n.decodePayloadAsBinary = function(e, t, r) {
					"function" == typeof t && (r = t, t = null);
					for (var i = e, o = [], a = !1; i.byteLength > 0;) {
						for (var s = new Uint8Array(i), c = 0 === s[0], p = "", u = 1; 255 != s[u]; u++) {
							if (p.length > 310) {
								a = !0;
								break
							}
							p += s[u]
						}
						if (a) return r(b, 0, 1);
						i = d(i, 2 + p.length), p = parseInt(p);
						var l = d(i, 0, p);
						if (c) try {
							l = String.fromCharCode.apply(null, new Uint8Array(l))
						} catch (f) {
							var h = new Uint8Array(l);
							l = "";
							for (var u = 0; u < h.length; u++) l += String.fromCharCode(h[u])
						}
						o.push(l), i = d(i, p)
					}
					var m = o.length;
					o.forEach(function(e, i) {
						r(n.decodePacket(e, t, !0), i, m)
					})
				}
			}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
		}, {
			"./keys": 25,
			after: 1,
			"arraybuffer.slice": 2,
			"base64-arraybuffer": 5,
			blob: 6,
			"has-binary": 31,
			utf8: 65
		}],
		25: [function(e, t, n) {
			t.exports = Object.keys || function(e) {
				var t = [],
					n = Object.prototype.hasOwnProperty;
				for (var r in e) n.call(e, r) && t.push(r);
				return t
			}
		}, {}],
		26: [function(e, t, n) {
			function r(e) {
				o.call(this);
				var t = e || {};
				this.config = {
					chunksize: 16384,
					pacing: 0
				};
				var n;
				for (n in t) this.config[n] = t[n];
				this.file = null, this.channel = null
			}

			function i() {
				o.call(this), this.receiveBuffer = [], this.received = 0, this.metadata = {}, this.channel = null
			}
			var o = e("wildemitter"),
				a = e("util");
			a.inherits(r, o), r.prototype.send = function(e, t) {
				var n = this;
				this.file = e, this.channel = t;
				var r = function(t) {
					var i = new window.FileReader;
					i.onload = function() {
						return function(i) {
							n.channel.send(i.target.result), n.emit("progress", t, e.size, i.target.result), e.size > t + i.target.result.byteLength ? window.setTimeout(r, n.config.pacing, t + n.config.chunksize) : (n.emit("progress", e.size, e.size, null), n.emit("sentFile"))
						}
					}(e);
					var o = e.slice(t, t + n.config.chunksize);
					i.readAsArrayBuffer(o)
				};
				window.setTimeout(r, 0, 0)
			}, a.inherits(i, o), i.prototype.receive = function(e, t) {
				var n = this;
				e && (this.metadata = e), this.channel = t, t.binaryType = "arraybuffer", this.channel.onmessage = function(e) {
					var t = e.data.byteLength;
					n.received += t, n.receiveBuffer.push(e.data), n.emit("progress", n.received, n.metadata.size, e.data), n.received === n.metadata.size ? (n.emit("receivedFile", new window.Blob(n.receiveBuffer), n.metadata), n.receiveBuffer = []) : n.received > n.metadata.size && (console.error("received more than expected, discarding..."), n.receiveBuffer = [])
				}
			}, t.exports = {}, t.exports.support = "undefined" != typeof window && window && window.File && window.FileReader && window.Blob, t.exports.Sender = r, t.exports.Receiver = i
		}, {
			util: 67,
			wildemitter: 78
		}],
		27: [function(e, t, n) {
			var r = e("getusermedia"),
				i = {};
			t.exports = function(e, t) {
				var n, o = 2 === arguments.length,
					a = o ? t : e;
				if ("undefined" == typeof window || "http:" === window.location.protocol) return n = new Error("NavigatorUserMediaError"), n.name = "HTTPS_REQUIRED", a(n);
				if (window.navigator.userAgent.match("Chrome")) {
					var s = parseInt(window.navigator.userAgent.match(/Chrome\/(.*) /)[1], 10),
						c = 33,
						p = !window.chrome.webstore;
					if (window.navigator.userAgent.match("Linux") && (c = 35), sessionStorage.getScreenMediaJSExtensionId) chrome.runtime.sendMessage(sessionStorage.getScreenMediaJSExtensionId, {
						type: "getScreen",
						id: 1
					}, null, function(t) {
						if (t && "" !== t.sourceId) e = o && e || {
							audio: !1,
							video: {
								mandatory: {
									chromeMediaSource: "desktop",
									maxWidth: window.screen.width,
									maxHeight: window.screen.height,
									maxFrameRate: 3
								}
							}
						}, e.video.mandatory.chromeMediaSourceId = t.sourceId, r(e, a);
						else {
							var n = new Error("NavigatorUserMediaError");
							n.name = "PERMISSION_DENIED", a(n)
						}
					});
					else if (window.cefGetScreenMedia) window.cefGetScreenMedia(function(t) {
						if (t) e = o && e || {
							audio: !1,
							video: {
								mandatory: {
									chromeMediaSource: "desktop",
									maxWidth: window.screen.width,
									maxHeight: window.screen.height,
									maxFrameRate: 3
								},
								optional: [{
									googLeakyBucket: !0
								}, {
									googTemporalLayeredScreencast: !0
								}]
							}
						}, e.video.mandatory.chromeMediaSourceId = t, r(e, a);
						else {
							var n = new Error("cefGetScreenMediaError");
							n.name = "CEF_GETSCREENMEDIA_CANCELED", a(n)
						}
					});
					else if (p || s >= 26 && c >= s) e = o && e || {
						video: {
							mandatory: {
								googLeakyBucket: !0,
								maxWidth: window.screen.width,
								maxHeight: window.screen.height,
								maxFrameRate: 3,
								chromeMediaSource: "screen"
							}
						}
					}, r(e, a);
					else {
						var d = window.setTimeout(function() {
							return n = new Error("NavigatorUserMediaError"), n.name = "EXTENSION_UNAVAILABLE", a(n)
						}, 1e3);
						i[d] = [a, o ? e : null], window.postMessage({
							type: "getScreen",
							id: d
						}, "*")
					}
				} else if (window.navigator.userAgent.match("Firefox")) {
					var u = parseInt(window.navigator.userAgent.match(/Firefox\/(.*)/)[1], 10);
					u >= 33 ? (e = o && e || {
						video: {
							mozMediaSource: "window",
							mediaSource: "window"
						}
					}, r(e, function(e, t) {
						if (a(e, t), !e) var n = t.currentTime,
							r = window.setInterval(function() {
								t || window.clearInterval(r), t.currentTime == n && (window.clearInterval(r), t.onended && t.onended()), n = t.currentTime
							}, 500)
					})) : (n = new Error("NavigatorUserMediaError"), n.name = "EXTENSION_UNAVAILABLE")
				}
			}, window.addEventListener("message", function(e) {
				if (e.origin == window.location.origin)
					if ("gotScreen" == e.data.type && i[e.data.id]) {
						var t = i[e.data.id],
							n = t[1],
							o = t[0];
						if (delete i[e.data.id], "" === e.data.sourceId) {
							var a = new Error("NavigatorUserMediaError");
							a.name = "PERMISSION_DENIED", o(a)
						} else n = n || {
							audio: !1,
							video: {
								mandatory: {
									chromeMediaSource: "desktop",
									maxWidth: window.screen.width,
									maxHeight: window.screen.height,
									maxFrameRate: 3
								},
								optional: [{
									googLeakyBucket: !0
								}, {
									googTemporalLayeredScreencast: !0
								}]
							}
						}, n.video.mandatory.chromeMediaSourceId = e.data.sourceId, r(n, o)
					} else "getScreenPending" == e.data.type && window.clearTimeout(e.data.id)
			})
		}, {
			getusermedia: 28
		}],
		28: [function(e, t, n) {
			e("webrtc-adapter");
			t.exports = function(e, t) {
				var n, r = 2 === arguments.length,
					i = {
						video: !0,
						audio: !0
					},
					o = "PermissionDeniedError",
					a = "PERMISSION_DENIED",
					s = "ConstraintNotSatisfiedError";
				return r || (t = e, e = i), "undefined" != typeof navigator && navigator.getUserMedia ? e.audio || e.video ? (localStorage && "true" === localStorage.useFirefoxFakeDevice && (e.fake = !0), void navigator.mediaDevices.getUserMedia(e).then(function(e) {
					t(null, e)
				})["catch"](function(e) {
					var n;
					"string" == typeof e ? (n = new Error("MediaStreamError"), e === o || e === a ? n.name = o : n.name = s) : (n = e, n.name || (n[o] ? e.name = o : e.name = s)), t(n)
				})) : (n = new Error("MediaStreamError"), n.name = "NoMediaRequestedError", setTimeout(function() {
					t(n)
				}, 0)) : (n = new Error("MediaStreamError"), n.name = "NotSupportedError", setTimeout(function() {
					t(n)
				}, 0))
			}
		}, {
			"webrtc-adapter": 68
		}],
		29: [function(e, t, n) {
			t.exports = function() {
				return this
			}()
		}, {}],
		30: [function(e, t, n) {
			function r(e, t) {
				var n = -(1 / 0);
				e.getFloatFrequencyData(t);
				for (var r = 4, i = t.length; i > r; r++) t[r] > n && t[r] < 0 && (n = t[r]);
				return n
			}
			var i = e("wildemitter"),
				o = window.AudioContext || window.webkitAudioContext,
				a = null;
			t.exports = function(e, t) {
				var n = new i;
				if (!o) return n;
				var t = t || {},
					s = t.smoothing || .1,
					c = t.interval || 50,
					p = t.threshold,
					d = t.play,
					u = t.history || 10,
					l = !0;
				a || (a = new o);
				var f, h, m;
				m = a.createAnalyser(), m.fftSize = 512, m.smoothingTimeConstant = s, h = new Float32Array(m.fftSize), e.jquery && (e = e[0]), e instanceof HTMLAudioElement || e instanceof HTMLVideoElement ? (f = a.createMediaElementSource(e), "undefined" == typeof d && (d = !0), p = p || -50) : (f = a.createMediaStreamSource(e), p = p || -50), f.connect(m), d && m.connect(a.destination), n.speaking = !1, n.setThreshold = function(e) {
					p = e
				}, n.setInterval = function(e) {
					c = e
				}, n.stop = function() {
					l = !1, n.emit("volume_change", -100, p), n.speaking && (n.speaking = !1, n.emit("stopped_speaking"))
				}, n.speakingHistory = [];
				for (var g = 0; u > g; g++) n.speakingHistory.push(0);
				var v = function() {
					setTimeout(function() {
						if (l) {
							var e = r(m, h);
							n.emit("volume_change", e, p);
							var t = 0;
							if (e > p && !n.speaking) {
								for (var i = n.speakingHistory.length - 3; i < n.speakingHistory.length; i++) t += n.speakingHistory[i];
								t >= 2 && (n.speaking = !0, n.emit("speaking"))
							} else if (p > e && n.speaking) {
								for (var i = 0; i < n.speakingHistory.length; i++) t += n.speakingHistory[i];
								0 == t && (n.speaking = !1, n.emit("stopped_speaking"))
							}
							n.speakingHistory.shift(), n.speakingHistory.push(0 + (e > p)), v()
						}
					}, c)
				};
				return v(), n
			}
		}, {
			wildemitter: 78
		}],
		31: [function(e, t, n) {
			(function(n) {
				function r(e) {
					function t(e) {
						if (!e) return !1;
						if (n.Buffer && n.Buffer.isBuffer(e) || n.ArrayBuffer && e instanceof ArrayBuffer || n.Blob && e instanceof Blob || n.File && e instanceof File) return !0;
						if (i(e)) {
							for (var r = 0; r < e.length; r++)
								if (t(e[r])) return !0
						} else if (e && "object" == typeof e) {
							e.toJSON && (e = e.toJSON());
							for (var o in e)
								if (Object.prototype.hasOwnProperty.call(e, o) && t(e[o])) return !0
						}
						return !1
					}
					return t(e)
				}
				var i = e("isarray");
				t.exports = r
			}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
		}, {
			isarray: 35
		}],
		32: [function(e, t, n) {
			var r = e("global");
			try {
				t.exports = "XMLHttpRequest" in r && "withCredentials" in new r.XMLHttpRequest
			} catch (i) {
				t.exports = !1
			}
		}, {
			global: 29
		}],
		33: [function(e, t, n) {
			var r = [].indexOf;
			t.exports = function(e, t) {
				if (r) return e.indexOf(t);
				for (var n = 0; n < e.length; ++n)
					if (e[n] === t) return n;
				return -1
			}
		}, {}],
		34: [function(e, t, n) {
			"function" == typeof Object.create ? t.exports = function(e, t) {
				e.super_ = t, e.prototype = Object.create(t.prototype, {
					constructor: {
						value: e,
						enumerable: !1,
						writable: !0,
						configurable: !0
					}
				})
			} : t.exports = function(e, t) {
				e.super_ = t;
				var n = function() {};
				n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e
			}
		}, {}],
		35: [function(e, t, n) {
			t.exports = Array.isArray || function(e) {
				return "[object Array]" == Object.prototype.toString.call(e)
			}
		}, {}],
		36: [function(t, n, r) {
			! function(t) {
				function n(e) {
					if (n[e] !== a) return n[e];
					var t;
					if ("bug-string-char-index" == e) t = "a" != "a" [0];
					else if ("json" == e) t = n("json-stringify") && n("json-parse");
					else {
						var r, i = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
						if ("json-stringify" == e) {
							var o = d.stringify,
								c = "function" == typeof o && u;
							if (c) {
								(r = function() {
									return 1
								}).toJSON = r;
								try {
									c = "0" === o(0) && "0" === o(new Number) && '""' == o(new String) && o(s) === a && o(a) === a && o() === a && "1" === o(r) && "[1]" == o([r]) && "[null]" == o([a]) && "null" == o(null) && "[null,null,null]" == o([a, s, null]) && o({
										a: [r, !0, !1, null, "\x00\b\n\f\r	"]
									}) == i && "1" === o(null, r) && "[\n 1,\n 2\n]" == o([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == o(new Date(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == o(new Date(864e13)) && '"-000001-01-01T00:00:00.000Z"' == o(new Date(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == o(new Date(-1))
								} catch (p) {
									c = !1
								}
							}
							t = c
						}
						if ("json-parse" == e) {
							var l = d.parse;
							if ("function" == typeof l) try {
								if (0 === l("0") && !l(!1)) {
									r = l(i);
									var f = 5 == r.a.length && 1 === r.a[0];
									if (f) {
										try {
											f = !l('"	"')
										} catch (p) {}
										if (f) try {
											f = 1 !== l("01")
										} catch (p) {}
										if (f) try {
											f = 1 !== l("1.")
										} catch (p) {}
									}
								}
							} catch (p) {
								f = !1
							}
							t = f
						}
					}
					return n[e] = !!t
				}
				var i, o, a, s = {}.toString,
					c = "function" == typeof e && e.amd,
					p = "object" == typeof JSON && JSON,
					d = "object" == typeof r && r && !r.nodeType && r;
				d && p ? (d.stringify = p.stringify, d.parse = p.parse) : d = t.JSON = p || {};
				var u = new Date(-0xc782b5b800cec);
				try {
					u = -109252 == u.getUTCFullYear() && 0 === u.getUTCMonth() && 1 === u.getUTCDate() && 10 == u.getUTCHours() && 37 == u.getUTCMinutes() && 6 == u.getUTCSeconds() && 708 == u.getUTCMilliseconds()
				} catch (l) {}
				if (!n("json")) {
					var f = "[object Function]",
						h = "[object Date]",
						m = "[object Number]",
						g = "[object String]",
						v = "[object Array]",
						y = "[object Boolean]",
						b = n("bug-string-char-index");
					if (!u) var w = Math.floor,
						S = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
						C = function(e, t) {
							return S[t] + 365 * (e - 1970) + w((e - 1969 + (t = +(t > 1))) / 4) - w((e - 1901 + t) / 100) + w((e - 1601 + t) / 400)
						};
					(i = {}.hasOwnProperty) || (i = function(e) {
						var t, n = {};
						return (n.__proto__ = null, n.__proto__ = {
							toString: 1
						}, n).toString != s ? i = function(e) {
							var t = this.__proto__,
								n = e in (this.__proto__ = null, this);
							return this.__proto__ = t, n
						} : (t = n.constructor, i = function(e) {
							var n = (this.constructor || t).prototype;
							return e in this && !(e in n && this[e] === n[e])
						}), n = null, i.call(this, e)
					});
					var k = {
							"boolean": 1,
							number: 1,
							string: 1,
							undefined: 1
						},
						E = function(e, t) {
							var n = typeof e[t];
							return "object" == n ? !!e[t] : !k[n]
						};
					if (o = function(e, t) {
							var n, r, a, c = 0;
							(n = function() {
								this.valueOf = 0
							}).prototype.valueOf = 0, r = new n;
							for (a in r) i.call(r, a) && c++;
							return n = r = null, c ? o = 2 == c ? function(e, t) {
								var n, r = {},
									o = s.call(e) == f;
								for (n in e) o && "prototype" == n || i.call(r, n) || !(r[n] = 1) || !i.call(e, n) || t(n)
							} : function(e, t) {
								var n, r, o = s.call(e) == f;
								for (n in e) o && "prototype" == n || !i.call(e, n) || (r = "constructor" === n) || t(n);
								(r || i.call(e, n = "constructor")) && t(n)
							} : (r = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], o = function(e, t) {
								var n, o, a = s.call(e) == f,
									c = !a && "function" != typeof e.constructor && E(e, "hasOwnProperty") ? e.hasOwnProperty : i;
								for (n in e) a && "prototype" == n || !c.call(e, n) || t(n);
								for (o = r.length; n = r[--o]; c.call(e, n) && t(n));
							}), o(e, t)
						}, !n("json-stringify")) {
						var T = {
								92: "\\\\",
								34: '\\"',
								8: "\\b",
								12: "\\f",
								10: "\\n",
								13: "\\r",
								9: "\\t"
							},
							x = "000000",
							P = function(e, t) {
								return (x + (t || 0)).slice(-e)
							},
							R = "\\u00",
							D = function(e) {
								var t, n = '"',
									r = 0,
									i = e.length,
									o = i > 10 && b;
								for (o && (t = e.split("")); i > r; r++) {
									var a = e.charCodeAt(r);
									switch (a) {
										case 8:
										case 9:
										case 10:
										case 12:
										case 13:
										case 34:
										case 92:
											n += T[a];
											break;
										default:
											if (32 > a) {
												n += R + P(2, a.toString(16));
												break
											}
											n += o ? t[r] : b ? e.charAt(r) : e[r]
									}
								}
								return n + '"'
							},
							O = function(e, t, n, r, c, p, d) {
								var u, l, f, b, S, k, E, T, x, R, M, A, j, I, _, L;
								try {
									u = t[e]
								} catch (N) {}
								if ("object" == typeof u && u)
									if (l = s.call(u), l != h || i.call(u, "toJSON")) "function" == typeof u.toJSON && (l != m && l != g && l != v || i.call(u, "toJSON")) && (u = u.toJSON(e));
									else if (u > -1 / 0 && 1 / 0 > u) {
									if (C) {
										for (S = w(u / 864e5), f = w(S / 365.2425) + 1970 - 1; C(f + 1, 0) <= S; f++);
										for (b = w((S - C(f, 0)) / 30.42); C(f, b + 1) <= S; b++);
										S = 1 + S - C(f, b), k = (u % 864e5 + 864e5) % 864e5, E = w(k / 36e5) % 24, T = w(k / 6e4) % 60, x = w(k / 1e3) % 60, R = k % 1e3
									} else f = u.getUTCFullYear(), b = u.getUTCMonth(), S = u.getUTCDate(), E = u.getUTCHours(), T = u.getUTCMinutes(), x = u.getUTCSeconds(), R = u.getUTCMilliseconds();
									u = (0 >= f || f >= 1e4 ? (0 > f ? "-" : "+") + P(6, 0 > f ? -f : f) : P(4, f)) + "-" + P(2, b + 1) + "-" + P(2, S) + "T" + P(2, E) + ":" + P(2, T) + ":" + P(2, x) + "." + P(3, R) + "Z"
								} else u = null;
								if (n && (u = n.call(t, e, u)), null === u) return "null";
								if (l = s.call(u), l == y) return "" + u;
								if (l == m) return u > -1 / 0 && 1 / 0 > u ? "" + u : "null";
								if (l == g) return D("" + u);
								if ("object" == typeof u) {
									for (I = d.length; I--;)
										if (d[I] === u) throw TypeError();
									if (d.push(u), M = [], _ = p, p += c, l == v) {
										for (j = 0, I = u.length; I > j; j++) A = O(j, u, n, r, c, p, d), M.push(A === a ? "null" : A);
										L = M.length ? c ? "[\n" + p + M.join(",\n" + p) + "\n" + _ + "]" : "[" + M.join(",") + "]" : "[]"
									} else o(r || u, function(e) {
										var t = O(e, u, n, r, c, p, d);
										t !== a && M.push(D(e) + ":" + (c ? " " : "") + t)
									}), L = M.length ? c ? "{\n" + p + M.join(",\n" + p) + "\n" + _ + "}" : "{" + M.join(",") + "}" : "{}";
									return d.pop(), L
								}
							};
						d.stringify = function(e, t, n) {
							var r, i, o, a;
							if ("function" == typeof t || "object" == typeof t && t)
								if ((a = s.call(t)) == f) i = t;
								else if (a == v) {
								o = {};
								for (var c, p = 0, d = t.length; d > p; c = t[p++], a = s.call(c), (a == g || a == m) && (o[c] = 1));
							}
							if (n)
								if ((a = s.call(n)) == m) {
									if ((n -= n % 1) > 0)
										for (r = "", n > 10 && (n = 10); r.length < n; r += " ");
								} else a == g && (r = n.length <= 10 ? n : n.slice(0, 10));
							return O("", (c = {}, c[""] = e, c), i, o, r, "", [])
						}
					}
					if (!n("json-parse")) {
						var M, A, j = String.fromCharCode,
							I = {
								92: "\\",
								34: '"',
								47: "/",
								98: "\b",
								116: "	",
								110: "\n",
								102: "\f",
								114: "\r"
							},
							_ = function() {
								throw M = A = null, SyntaxError()
							},
							L = function() {
								for (var e, t, n, r, i, o = A, a = o.length; a > M;) switch (i = o.charCodeAt(M)) {
									case 9:
									case 10:
									case 13:
									case 32:
										M++;
										break;
									case 123:
									case 125:
									case 91:
									case 93:
									case 58:
									case 44:
										return e = b ? o.charAt(M) : o[M], M++, e;
									case 34:
										for (e = "@", M++; a > M;)
											if (i = o.charCodeAt(M), 32 > i) _();
											else if (92 == i) switch (i = o.charCodeAt(++M)) {
											case 92:
											case 34:
											case 47:
											case 98:
											case 116:
											case 110:
											case 102:
											case 114:
												e += I[i], M++;
												break;
											case 117:
												for (t = ++M, n = M + 4; n > M; M++) i = o.charCodeAt(M), i >= 48 && 57 >= i || i >= 97 && 102 >= i || i >= 65 && 70 >= i || _();
												e += j("0x" + o.slice(t, M));
												break;
											default:
												_()
										} else {
											if (34 == i) break;
											for (i = o.charCodeAt(M), t = M; i >= 32 && 92 != i && 34 != i;) i = o.charCodeAt(++M);
											e += o.slice(t, M)
										}
										if (34 == o.charCodeAt(M)) return M++, e;
										_();
									default:
										if (t = M, 45 == i && (r = !0, i = o.charCodeAt(++M)), i >= 48 && 57 >= i) {
											for (48 == i && (i = o.charCodeAt(M + 1), i >= 48 && 57 >= i) && _(), r = !1; a > M && (i = o.charCodeAt(M), i >= 48 && 57 >= i); M++);
											if (46 == o.charCodeAt(M)) {
												for (n = ++M; a > n && (i = o.charCodeAt(n), i >= 48 && 57 >= i); n++);
												n == M && _(), M = n
											}
											if (i = o.charCodeAt(M), 101 == i || 69 == i) {
												for (i = o.charCodeAt(++M), 43 != i && 45 != i || M++, n = M; a > n && (i = o.charCodeAt(n), i >= 48 && 57 >= i); n++);
												n == M && _(), M = n
											}
											return +o.slice(t, M)
										}
										if (r && _(), "true" == o.slice(M, M + 4)) return M += 4, !0;
										if ("false" == o.slice(M, M + 5)) return M += 5, !1;
										if ("null" == o.slice(M, M + 4)) return M += 4, null;
										_()
								}
								return "$"
							},
							N = function(e) {
								var t, n;
								if ("$" == e && _(), "string" == typeof e) {
									if ("@" == (b ? e.charAt(0) : e[0])) return e.slice(1);
									if ("[" == e) {
										for (t = []; e = L(), "]" != e; n || (n = !0)) n && ("," == e ? (e = L(), "]" == e && _()) : _()), "," == e && _(), t.push(N(e));
										return t
									}
									if ("{" == e) {
										for (t = {}; e = L(), "}" != e; n || (n = !0)) n && ("," == e ? (e = L(), "}" == e && _()) : _()), "," != e && "string" == typeof e && "@" == (b ? e.charAt(0) : e[0]) && ":" == L() || _(), t[e.slice(1)] = N(L());
										return t
									}
									_()
								}
								return e
							},
							B = function(e, t, n) {
								var r = U(e, t, n);
								r === a ? delete e[t] : e[t] = r
							},
							U = function(e, t, n) {
								var r, i = e[t];
								if ("object" == typeof i && i)
									if (s.call(i) == v)
										for (r = i.length; r--;) B(i, r, n);
									else o(i, function(e) {
										B(i, e, n)
									});
								return n.call(e, t, i)
							};
						d.parse = function(e, t) {
							var n, r;
							return M = 0, A = "" + e, n = N(L()), "$" != L() && _(), M = A = null, t && s.call(t) == f ? U((r = {}, r[""] = n, r), "", t) : n
						}
					}
				}
				c && e(function() {
					return d
				})
			}(this)
		}, {}],
		37: [function(e, t, n) {
			function r(e) {
				p.call(this);
				var t, n = this.config = {
					autoAdjustMic: !1,
					detectSpeakingEvents: !1,
					audioFallback: !1,
					media: {
						audio: !0,
						video: !0
					},
					logger: u
				};
				for (t in e) this.config[t] = e[t];
				this.logger = n.logger, this._log = this.logger.log.bind(this.logger, "LocalMedia:"), this._logerror = this.logger.error.bind(this.logger, "LocalMedia:"), this.screenSharingSupport = a.screenSharing, this.localStreams = [], this.localScreens = [], a.supportGetUserMedia || this._logerror("Your browser does not support local media capture.")
			}
			var i = e("util"),
				o = e("hark"),
				a = e("webrtcsupport"),
				s = e("getusermedia"),
				c = e("getscreenmedia"),
				p = e("wildemitter"),
				d = e("mediastream-gain"),
				u = e("mockconsole");
			i.inherits(r, p), r.prototype.start = function(e, t) {
				var n = this,
					r = e || this.config.media;
				s(r, function(e, i) {
					if (e) {
						if (n.config.audioFallback && "DevicesNotFoundError" === e.name && r.video !== !1) return r.video = !1, void n.start(r, t)
					} else r.audio && n.config.detectSpeakingEvents && n.setupAudioMonitor(i, n.config.harkOptions), n.localStreams.push(i), n.config.autoAdjustMic && (n.gainController = new d(i), n.setMicIfEnabled(.5)), i.onended = function() {}, n.emit("localStream", i);
					return t ? t(e, i) : void 0
				})
			}, r.prototype.stop = function(e) {
				var t = this;
				if (e) {
					e.getTracks().forEach(function(e) {
						e.stop()
					});
					var n = t.localStreams.indexOf(e);
					n > -1 ? (t.emit("localStreamStopped", e), t.localStreams = t.localStreams.splice(n, 1)) : (n = t.localScreens.indexOf(e), n > -1 && (t.emit("localScreenStopped", e), t.localScreens = t.localScreens.splice(n, 1)))
				} else this.stopStreams(), this.stopScreenShare()
			}, r.prototype.stopStreams = function() {
				var e = this;
				this.audioMonitor && (this.audioMonitor.stop(), delete this.audioMonitor), this.localStreams.forEach(function(t) {
					t.getTracks().forEach(function(e) {
						e.stop()
					}), e.emit("localStreamStopped", t)
				}), this.localStreams = []
			}, r.prototype.startScreenShare = function(e) {
				var t = this;
				c(function(n, r) {
					return n || (t.localScreens.push(r), r.onended = function() {
						var e = t.localScreens.indexOf(r);
						e > -1 && t.localScreens.splice(e, 1), t.emit("localScreenStopped", r)
					}, t.emit("localScreen", r)), e ? e(n, r) : void 0
				})
			}, r.prototype.stopScreenShare = function(e) {
				var t = this;
				e ? (e.getTracks().forEach(function(e) {
					e.stop()
				}), this.emit("localScreenStopped", e)) : (this.localScreens.forEach(function(e) {
					e.getTracks().forEach(function(e) {
						e.stop()
					}), t.emit("localScreenStopped", e)
				}), this.localScreens = [])
			}, r.prototype.mute = function() {
				this._audioEnabled(!1), this.hardMuted = !0, this.emit("audioOff")
			}, r.prototype.unmute = function() {
				this._audioEnabled(!0), this.hardMuted = !1, this.emit("audioOn")
			}, r.prototype.setupAudioMonitor = function(e, t) {
				this._log("Setup audio");
				var n, r = this.audioMonitor = o(e, t),
					i = this;
				r.on("speaking", function() {
					i.emit("speaking"), i.hardMuted || i.setMicIfEnabled(1)
				}), r.on("stopped_speaking", function() {
					n && clearTimeout(n), n = setTimeout(function() {
						i.emit("stoppedSpeaking"), i.hardMuted || i.setMicIfEnabled(.5)
					}, 1e3)
				}), r.on("volume_change", function(e, t) {
					i.emit("volumeChange", e, t)
				})
			}, r.prototype.setMicIfEnabled = function(e) {
				this.config.autoAdjustMic && this.gainController.setGain(e)
			}, r.prototype.pauseVideo = function() {
				this._videoEnabled(!1), this.emit("videoOff")
			}, r.prototype.resumeVideo = function() {
				this._videoEnabled(!0), this.emit("videoOn")
			}, r.prototype.pause = function() {
				this.mute(), this.pauseVideo()
			}, r.prototype.resume = function() {
				this.unmute(), this.resumeVideo()
			}, r.prototype._audioEnabled = function(e) {
				this.setMicIfEnabled(e ? 1 : 0), this.localStreams.forEach(function(t) {
					t.getAudioTracks().forEach(function(t) {
						t.enabled = !!e
					})
				})
			}, r.prototype._videoEnabled = function(e) {
				this.localStreams.forEach(function(t) {
					t.getVideoTracks().forEach(function(t) {
						t.enabled = !!e
					})
				})
			}, r.prototype.isAudioEnabled = function() {
				var e = !0;
				return this.localStreams.forEach(function(t) {
					t.getAudioTracks().forEach(function(t) {
						e = e && t.enabled
					})
				}), e
			}, r.prototype.isVideoEnabled = function() {
				var e = !0;
				return this.localStreams.forEach(function(t) {
					t.getVideoTracks().forEach(function(t) {
						e = e && t.enabled
					})
				}), e
			}, r.prototype.startLocalMedia = r.prototype.start, r.prototype.stopLocalMedia = r.prototype.stop, Object.defineProperty(r.prototype, "localStream", {
				get: function() {
					return this.localStreams.length > 0 ? this.localStreams[0] : null
				}
			}), Object.defineProperty(r.prototype, "localScreen", {
				get: function() {
					return this.localScreens.length > 0 ? this.localScreens[0] : null
				}
			}), t.exports = r
		}, {
			getscreenmedia: 27,
			getusermedia: 28,
			hark: 30,
			"mediastream-gain": 38,
			mockconsole: 40,
			util: 67,
			webrtcsupport: 77,
			wildemitter: 78
		}],
		38: [function(e, t, n) {
			function r(e) {
				if (this.support = i.webAudio && i.mediaStream, this.gain = 1, this.support) {
					var t = this.context = new i.AudioContext;
					this.microphone = t.createMediaStreamSource(e), this.gainFilter = t.createGain(), this.destination = t.createMediaStreamDestination(), this.outputStream = this.destination.stream, this.microphone.connect(this.gainFilter), this.gainFilter.connect(this.destination), e.addTrack(this.outputStream.getAudioTracks()[0]), e.removeTrack(e.getAudioTracks()[0])
				}
				this.stream = e
			}
			var i = e("webrtcsupport");
			r.prototype.setGain = function(e) {
				this.support && (this.gainFilter.gain.value = e, this.gain = e)
			}, r.prototype.getGain = function() {
				return this.gain
			}, r.prototype.off = function() {
				return this.setGain(0)
			}, r.prototype.on = function() {
				this.setGain(1)
			}, t.exports = r
		}, {
			webrtcsupport: 39
		}],
		39: [function(e, t, n) {
			var r, i;
			window.mozRTCPeerConnection || navigator.mozGetUserMedia ? (r = "moz", i = parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1], 10)) : (window.webkitRTCPeerConnection || navigator.webkitGetUserMedia) && (r = "webkit", i = navigator.userAgent.match(/Chrom(e|ium)/) && parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2], 10));
			var o = window.mozRTCPeerConnection || window.webkitRTCPeerConnection,
				a = window.mozRTCIceCandidate || window.RTCIceCandidate,
				s = window.mozRTCSessionDescription || window.RTCSessionDescription,
				c = window.webkitMediaStream || window.MediaStream,
				p = "https:" === window.location.protocol && ("webkit" === r && i >= 26 || "moz" === r && i >= 33),
				d = window.AudioContext || window.webkitAudioContext,
				u = document.createElement("video"),
				l = u && u.canPlayType && "probably" === u.canPlayType('video/webm; codecs="vp8", vorbis'),
				f = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia;
			t.exports = {
				prefix: r,
				browserVersion: i,
				support: !!o && l && !!f,
				supportRTCPeerConnection: !!o,
				supportVp8: l,
				supportGetUserMedia: !!f,
				supportDataChannel: !!(o && o.prototype && o.prototype.createDataChannel),
				supportWebAudio: !(!d || !d.prototype.createMediaStreamSource),
				supportMediaStream: !(!c || !c.prototype.removeTrack),
				supportScreenSharing: !!p,
				dataChannel: !!(o && o.prototype && o.prototype.createDataChannel),
				webAudio: !(!d || !d.prototype.createMediaStreamSource),
				mediaStream: !(!c || !c.prototype.removeTrack),
				screenSharing: !!p,
				AudioContext: d,
				PeerConnection: o,
				SessionDescription: s,
				IceCandidate: a,
				MediaStream: c,
				getUserMedia: f
			}
		}, {}],
		40: [function(e, t, n) {
			for (var r = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","), i = r.length, o = function() {}, a = {}; i--;) a[r[i]] = o;
			t.exports = a
		}, {}],
		41: [function(e, t, n) {
			function r(e) {
				var t = /^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(e);
				if (t) {
					var n = parseFloat(t[1]),
						r = (t[2] || "ms").toLowerCase();
					switch (r) {
						case "years":
						case "year":
						case "y":
							return n * u;
						case "days":
						case "day":
						case "d":
							return n * d;
						case "hours":
						case "hour":
						case "h":
							return n * p;
						case "minutes":
						case "minute":
						case "m":
							return n * c;
						case "seconds":
						case "second":
						case "s":
							return n * s;
						case "ms":
							return n
					}
				}
			}

			function i(e) {
				return e >= d ? Math.round(e / d) + "d" : e >= p ? Math.round(e / p) + "h" : e >= c ? Math.round(e / c) + "m" : e >= s ? Math.round(e / s) + "s" : e + "ms"
			}

			function o(e) {
				return a(e, d, "day") || a(e, p, "hour") || a(e, c, "minute") || a(e, s, "second") || e + " ms"
			}

			function a(e, t, n) {
				return t > e ? void 0 : 1.5 * t > e ? Math.floor(e / t) + " " + n : Math.ceil(e / t) + " " + n + "s"
			}
			var s = 1e3,
				c = 60 * s,
				p = 60 * c,
				d = 24 * p,
				u = 365.25 * d;
			t.exports = function(e, t) {
				return t = t || {}, "string" == typeof e ? r(e) : t["long"] ? o(e) : i(e)
			}
		}, {}],
		42: [function(e, t, n) {
			var r = Object.prototype.hasOwnProperty;
			n.keys = Object.keys || function(e) {
				var t = [];
				for (var n in e) r.call(e, n) && t.push(n);
				return t
			}, n.values = function(e) {
				var t = [];
				for (var n in e) r.call(e, n) && t.push(e[n]);
				return t
			}, n.merge = function(e, t) {
				for (var n in t) r.call(t, n) && (e[n] = t[n]);
				return e
			}, n.length = function(e) {
				return n.keys(e).length
			}, n.isEmpty = function(e) {
				return 0 == n.length(e)
			}
		}, {}],
		43: [function(e, t, n) {
			(function(e) {
				var n = /^[\],:{}\s]*$/,
					r = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
					i = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
					o = /(?:^|:|,)(?:\s*\[)+/g,
					a = /^\s+/,
					s = /\s+$/;
				t.exports = function(t) {
					return "string" == typeof t && t ? (t = t.replace(a, "").replace(s, ""), e.JSON && JSON.parse ? JSON.parse(t) : n.test(t.replace(r, "@").replace(i, "]").replace(o, "")) ? new Function("return " + t)() : void 0) : null
				}
			}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
		}, {}],
		44: [function(e, t, n) {
			n.encode = function(e) {
				var t = "";
				for (var n in e) e.hasOwnProperty(n) && (t.length && (t += "&"), t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
				return t
			}, n.decode = function(e) {
				for (var t = {}, n = e.split("&"), r = 0, i = n.length; i > r; r++) {
					var o = n[r].split("=");
					t[decodeURIComponent(o[0])] = decodeURIComponent(o[1])
				}
				return t
			}
		}, {}],
		45: [function(e, t, n) {
			var r = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
				i = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
			t.exports = function(e) {
				for (var t = r.exec(e || ""), n = {}, o = 14; o--;) n[i[o]] = t[o] || "";
				return n
			}
		}, {}],
		46: [function(e, t, n) {
			function r() {
				d && s && (d = !1, s.length ? p = s.concat(p) : u = -1, p.length && i())
			}

			function i() {
				if (!d) {
					var e = setTimeout(r);
					d = !0;
					for (var t = p.length; t;) {
						for (s = p, p = []; ++u < t;) s && s[u].run();
						u = -1, t = p.length
					}
					s = null, d = !1, clearTimeout(e)
				}
			}

			function o(e, t) {
				this.fun = e, this.array = t
			}

			function a() {}
			var s, c = t.exports = {},
				p = [],
				d = !1,
				u = -1;
			c.nextTick = function(e) {
				var t = new Array(arguments.length - 1);
				if (arguments.length > 1)
					for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
				p.push(new o(e, t)), 1 !== p.length || d || setTimeout(i, 0)
			}, o.prototype.run = function() {
				this.fun.apply(null, this.array)
			}, c.title = "browser", c.browser = !0, c.env = {}, c.argv = [], c.version = "", c.versions = {}, c.on = a, c.addListener = a, c.once = a, c.off = a, c.removeListener = a, c.removeAllListeners = a, c.emit = a, c.binding = function(e) {
				throw new Error("process.binding is not supported")
			}, c.cwd = function() {
				return "/"
			}, c.chdir = function(e) {
				throw new Error("process.chdir is not supported")
			}, c.umask = function() {
				return 0
			}
		}, {}],
		47: [function(e, t, n) {
			function r(e, t) {
				var n, r = this;
				a.call(this), e = e || {}, e.iceServers = e.iceServers || [];
				var i = c.browserDetails.browser;
				this.enableChromeNativeSimulcast = !1, t && t.optional && "chrome" === i && null === navigator.appVersion.match(/Chromium\//) && t.optional.forEach(function(e) {
					e.enableChromeNativeSimulcast && (r.enableChromeNativeSimulcast = !0)
				}), this.enableMultiStreamHacks = !1, t && t.optional && "chrome" === i && t.optional.forEach(function(e) {
					e.enableMultiStreamHacks && (r.enableMultiStreamHacks = !0)
				}), this.restrictBandwidth = 0, t && t.optional && t.optional.forEach(function(e) {
					e.andyetRestrictBandwidth && (r.restrictBandwidth = e.andyetRestrictBandwidth)
				}), this.batchIceCandidates = 0, t && t.optional && t.optional.forEach(function(e) {
					e.andyetBatchIce && (r.batchIceCandidates = e.andyetBatchIce)
				}), this.batchedIceCandidates = [], t && t.optional && "chrome" === i && t.optional.forEach(function(e) {
					e.andyetFasterICE && (r.eliminateDuplicateCandidates = e.andyetFasterICE)
				}), t && t.optional && t.optional.forEach(function(e) {
					e.andyetDontSignalCandidates && (r.dontSignalCandidates = e.andyetDontSignalCandidates)
				}), this.assumeSetLocalSuccess = !1, t && t.optional && t.optional.forEach(function(e) {
					e.andyetAssumeSetLocalSuccess && (r.assumeSetLocalSuccess = e.andyetAssumeSetLocalSuccess)
				}), "firefox" === i && t && t.optional && (this.wtFirefox = 0, t.optional.forEach(function(e) {
					e.andyetFirefoxMakesMeSad && (r.wtFirefox = e.andyetFirefoxMakesMeSad, r.wtFirefox > 0 && (r.firefoxcandidatebuffer = []))
				})), this.pc = new s(e, t), this.getLocalStreams = this.pc.getLocalStreams.bind(this.pc), this.getRemoteStreams = this.pc.getRemoteStreams.bind(this.pc), this.addStream = this.pc.addStream.bind(this.pc), this.removeStream = this.pc.removeStream.bind(this.pc), this.pc.on("*", function() {
					r.emit.apply(r, arguments)
				}), this.pc.onremovestream = this.emit.bind(this, "removeStream"), this.pc.onaddstream = this.emit.bind(this, "addStream"), this.pc.onnegotiationneeded = this.emit.bind(this, "negotiationNeeded"), this.pc.oniceconnectionstatechange = this.emit.bind(this, "iceConnectionStateChange"), this.pc.onsignalingstatechange = this.emit.bind(this, "signalingStateChange"), this.pc.onicecandidate = this._onIce.bind(this), this.pc.ondatachannel = this._onDataChannel.bind(this), this.localDescription = {
					contents: []
				}, this.remoteDescription = {
					contents: []
				}, this.config = {
					debug: !1,
					sid: "",
					isInitiator: !0,
					sdpSessionID: Date.now(),
					useJingle: !1
				}, this.iceCredentials = {
					local: {},
					remote: {}
				};
				for (n in e) this.config[n] = e[n];
				this.config.debug && this.on("*", function() {
					var t = e.logger || console;
					t.log("PeerConnection event:", arguments)
				}), this.hadLocalStunCandidate = !1, this.hadRemoteStunCandidate = !1, this.hadLocalRelayCandidate = !1, this.hadRemoteRelayCandidate = !1, this.hadLocalIPv6Candidate = !1, this.hadRemoteIPv6Candidate = !1, this._remoteDataChannels = [], this._localDataChannels = [], this._candidateBuffer = []
			}
			var i = e("util"),
				o = e("sdp-jingle-json"),
				a = e("wildemitter"),
				s = e("traceablepeerconnection"),
				c = e("webrtc-adapter");
			i.inherits(r, a), Object.defineProperty(r.prototype, "signalingState", {
				get: function() {
					return this.pc.signalingState
				}
			}), Object.defineProperty(r.prototype, "iceConnectionState", {
				get: function() {
					return this.pc.iceConnectionState
				}
			}), r.prototype._role = function() {
				return this.isInitiator ? "initiator" : "responder"
			}, r.prototype.addStream = function(e) {
				this.localStream = e, this.pc.addStream(e)
			}, r.prototype._checkLocalCandidate = function(e) {
				var t = o.toCandidateJSON(e);
				"srflx" == t.type ? this.hadLocalStunCandidate = !0 : "relay" == t.type && (this.hadLocalRelayCandidate = !0), -1 != t.ip.indexOf(":") && (this.hadLocalIPv6Candidate = !0)
			}, r.prototype._checkRemoteCandidate = function(e) {
				var t = o.toCandidateJSON(e);
				"srflx" == t.type ? this.hadRemoteStunCandidate = !0 : "relay" == t.type && (this.hadRemoteRelayCandidate = !0), -1 != t.ip.indexOf(":") && (this.hadRemoteIPv6Candidate = !0)
			}, r.prototype.processIce = function(e, t) {
				t = t || function() {};
				var n = this;
				if ("closed" === this.pc.signalingState) return t();
				if (e.contents || e.jingle && e.jingle.contents) {
					var r = this.remoteDescription.contents.map(function(e) {
							return e.name
						}),
						i = e.contents || e.jingle.contents;
					i.forEach(function(e) {
						var i = e.transport || {},
							a = i.candidates || [],
							s = r.indexOf(e.name),
							c = e.name,
							p = n.remoteDescription.contents.find(function(t) {
								return t.name === e.name
							}),
							d = function() {
								a.forEach(function(e) {
									var t = o.toCandidateSDP(e) + "\r\n";
									n.pc.addIceCandidate(new RTCIceCandidate({
										candidate: t,
										sdpMLineIndex: s,
										sdpMid: c
									}), function() {}, function(e) {
										n.emit("error", e)
									}), n._checkRemoteCandidate(t)
								}), t()
							};
						if (n.iceCredentials.remote[e.name] && i.ufrag && n.iceCredentials.remote[e.name].ufrag !== i.ufrag)
							if (p) {
								p.transport.ufrag = i.ufrag, p.transport.pwd = i.pwd;
								var u = {
									type: "offer",
									jingle: n.remoteDescription
								};
								u.sdp = o.toSessionSDP(u.jingle, {
									sid: n.config.sdpSessionID,
									role: n._role(),
									direction: "incoming"
								}), n.pc.setRemoteDescription(new RTCSessionDescription(u), function() {
									d()
								}, function(e) {
									n.emit("error", e)
								})
							} else n.emit("error", "ice restart failed to find matching content");
						else d()
					})
				} else {
					if (e.candidate && 0 !== e.candidate.candidate.indexOf("a=") && (e.candidate.candidate = "a=" + e.candidate.candidate), this.wtFirefox && null !== this.firefoxcandidatebuffer && this.pc.localDescription && "offer" === this.pc.localDescription.type) return this.firefoxcandidatebuffer.push(e.candidate), t();
					n.pc.addIceCandidate(new RTCIceCandidate(e.candidate), function() {}, function(e) {
						n.emit("error", e)
					}), n._checkRemoteCandidate(e.candidate.candidate), t()
				}
			}, r.prototype.offer = function(e, t) {
				var n = this,
					r = 2 === arguments.length,
					i = r && e ? e : {
						offerToReceiveAudio: 1,
						offerToReceiveVideo: 1
					};
				return t = r ? t : e, t = t || function() {}, "closed" === this.pc.signalingState ? t("Already closed") : void this.pc.createOffer(function(e) {
					var r = {
						type: "offer",
						sdp: e.sdp
					};
					n.assumeSetLocalSuccess && (n.emit("offer", r), t(null, r)), n._candidateBuffer = [], n.pc.setLocalDescription(e, function() {
						var i;
						n.config.useJingle && (i = o.toSessionJSON(e.sdp, {
							role: n._role(),
							direction: "outgoing"
						}), i.sid = n.config.sid, n.localDescription = i, i.contents.forEach(function(e) {
							var t = e.transport || {};
							t.ufrag && (n.iceCredentials.local[e.name] = {
								ufrag: t.ufrag,
								pwd: t.pwd
							})
						}), r.jingle = i), r.sdp.split("\r\n").forEach(function(e) {
							0 === e.indexOf("a=candidate:") && n._checkLocalCandidate(e)
						}), n.assumeSetLocalSuccess || (n.emit("offer", r), t(null, r))
					}, function(e) {
						n.emit("error", e), t(e)
					})
				}, function(e) {
					n.emit("error", e), t(e)
				}, i)
			}, r.prototype.handleOffer = function(e, t) {
				t = t || function() {};
				var n = this;
				if (e.type = "offer", e.jingle) {
					if (this.enableChromeNativeSimulcast && e.jingle.contents.forEach(function(e) {
							"video" === e.name && (e.application.googConferenceFlag = !0)
						}), this.enableMultiStreamHacks && e.jingle.contents.forEach(function(e) {
							if ("video" === e.name) {
								var t = e.application.sources || [];
								0 !== t.length && "3735928559" === t[0].ssrc || (t.unshift({
									ssrc: "3735928559",
									parameters: [{
										key: "cname",
										value: "deadbeef"
									}, {
										key: "msid",
										value: "mixyourfecintothis please"
									}]
								}), e.application.sources = t)
							}
						}), n.restrictBandwidth > 0 && e.jingle.contents.length >= 2 && "video" === e.jingle.contents[1].name) {
						var r = e.jingle.contents[1],
							i = r.application && r.application.bandwidth && r.application.bandwidth.bandwidth;
						i || (e.jingle.contents[1].application.bandwidth = {
							type: "AS",
							bandwidth: n.restrictBandwidth.toString()
						}, e.sdp = o.toSessionSDP(e.jingle, {
							sid: n.config.sdpSessionID,
							role: n._role(),
							direction: "outgoing"
						}))
					}
					e.jingle.contents.forEach(function(e) {
						var t = e.transport || {};
						t.ufrag && (n.iceCredentials.remote[e.name] = {
							ufrag: t.ufrag,
							pwd: t.pwd
						})
					}), e.sdp = o.toSessionSDP(e.jingle, {
						sid: n.config.sdpSessionID,
						role: n._role(),
						direction: "incoming"
					}), n.remoteDescription = e.jingle
				}
				e.sdp.split("\r\n").forEach(function(e) {
					0 === e.indexOf("a=candidate:") && n._checkRemoteCandidate(e)
				}), n.pc.setRemoteDescription(new RTCSessionDescription(e), function() {
					t()
				}, t)
			}, r.prototype.answerAudioOnly = function(e) {
				var t = {
					mandatory: {
						OfferToReceiveAudio: !0,
						OfferToReceiveVideo: !1
					}
				};
				this._answer(t, e)
			}, r.prototype.answerBroadcastOnly = function(e) {
				var t = {
					mandatory: {
						OfferToReceiveAudio: !1,
						OfferToReceiveVideo: !1
					}
				};
				this._answer(t, e)
			}, r.prototype.answer = function(e, t) {
				var n = 2 === arguments.length,
					r = n ? t : e,
					i = n && e ? e : {
						mandatory: {
							OfferToReceiveAudio: !0,
							OfferToReceiveVideo: !0
						}
					};
				this._answer(i, r)
			}, r.prototype.handleAnswer = function(e, t) {
				t = t || function() {};
				var n = this;
				e.jingle && (e.sdp = o.toSessionSDP(e.jingle, {
					sid: n.config.sdpSessionID,
					role: n._role(),
					direction: "incoming"
				}), n.remoteDescription = e.jingle, e.jingle.contents.forEach(function(e) {
					var t = e.transport || {};
					t.ufrag && (n.iceCredentials.remote[e.name] = {
						ufrag: t.ufrag,
						pwd: t.pwd
					})
				})), e.sdp.split("\r\n").forEach(function(e) {
					0 === e.indexOf("a=candidate:") && n._checkRemoteCandidate(e)
				}), n.pc.setRemoteDescription(new RTCSessionDescription(e), function() {
					n.wtFirefox && window.setTimeout(function() {
						n.firefoxcandidatebuffer.forEach(function(e) {
							n.pc.addIceCandidate(new RTCIceCandidate(e), function() {}, function(e) {
								n.emit("error", e)
							}), n._checkRemoteCandidate(e.candidate)
						}), n.firefoxcandidatebuffer = null
					}, n.wtFirefox), t(null)
				}, t)
			}, r.prototype.close = function() {
				this.pc.close(), this._localDataChannels = [], this._remoteDataChannels = [], this.emit("close")
			}, r.prototype._answer = function(e, t) {
				t = t || function() {};
				var n = this;
				if (!this.pc.remoteDescription) throw new Error("remoteDescription not set");
				return "closed" === this.pc.signalingState ? t("Already closed") : void n.pc.createAnswer(function(e) {
					var r = [];
					if (n.enableChromeNativeSimulcast && (e.jingle = o.toSessionJSON(e.sdp, {
							role: n._role(),
							direction: "outgoing"
						}), e.jingle.contents.length >= 2 && "video" === e.jingle.contents[1].name)) {
						var i = e.jingle.contents[1].application.sourceGroups || [],
							a = !1;
						if (i.forEach(function(e) {
								"SIM" == e.semantics && (a = !0)
							}), !a && e.jingle.contents[1].application.sources.length) {
							var s = JSON.parse(JSON.stringify(e.jingle.contents[1].application.sources[0]));
							s.ssrc = "" + Math.floor(4294967295 * Math.random()), e.jingle.contents[1].application.sources.push(s), r.push(e.jingle.contents[1].application.sources[0].ssrc), r.push(s.ssrc), i.push({
								semantics: "SIM",
								sources: r
							});
							var c = JSON.parse(JSON.stringify(s));
							c.ssrc = "" + Math.floor(4294967295 * Math.random()), e.jingle.contents[1].application.sources.push(c), i.push({
								semantics: "FID",
								sources: [s.ssrc, c.ssrc]
							}), e.jingle.contents[1].application.sourceGroups = i, e.sdp = o.toSessionSDP(e.jingle, {
								sid: n.config.sdpSessionID,
								role: n._role(),
								direction: "outgoing"
							})
						}
					}
					var p = {
						type: "answer",
						sdp: e.sdp
					};
					n.assumeSetLocalSuccess && (n.emit("answer", p), t(null, p)), n._candidateBuffer = [], n.pc.setLocalDescription(e, function() {
						if (n.config.useJingle) {
							var r = o.toSessionJSON(e.sdp, {
								role: n._role(),
								direction: "outgoing"
							});
							r.sid = n.config.sid, n.localDescription = r, p.jingle = r
						}
						n.enableChromeNativeSimulcast && (p.jingle || (p.jingle = o.toSessionJSON(e.sdp, {
							role: n._role(),
							direction: "outgoing"
						})), p.jingle.contents[1].application.sources.forEach(function(e, t) {
							e.parameters = e.parameters.map(function(e) {
								return "msid" === e.key && (e.value += "-" + Math.floor(t / 2)), e
							})
						}), p.sdp = o.toSessionSDP(p.jingle, {
							sid: n.sdpSessionID,
							role: n._role(),
							direction: "outgoing"
						})), p.sdp.split("\r\n").forEach(function(e) {
							0 === e.indexOf("a=candidate:") && n._checkLocalCandidate(e)
						}), n.assumeSetLocalSuccess || (n.emit("answer", p), t(null, p))
					}, function(e) {
						n.emit("error", e), t(e)
					})
				}, function(e) {
					n.emit("error", e), t(e)
				}, e)
			}, r.prototype._onIce = function(e) {
				var t = this;
				if (e.candidate) {
					if (this.dontSignalCandidates) return;
					var n = e.candidate,
						r = {
							candidate: {
								candidate: n.candidate,
								sdpMid: n.sdpMid,
								sdpMLineIndex: n.sdpMLineIndex
							}
						};
					this._checkLocalCandidate(n.candidate);
					var i, a, s = o.toCandidateJSON(n.candidate);
					if (this.eliminateDuplicateCandidates && "relay" === s.type && (i = this._candidateBuffer.filter(function(e) {
							return "relay" === e.type
						}).map(function(e) {
							return e.foundation + ":" + e.component
						}), a = i.indexOf(s.foundation + ":" + s.component), a > -1 && s.priority >> 24 >= i[a].priority >> 24)) return;
					if ("max-bundle" === this.config.bundlePolicy && (i = this._candidateBuffer.filter(function(e) {
							return s.type === e.type
						}).map(function(e) {
							return e.address + ":" + e.port
						}), a = i.indexOf(s.address + ":" + s.port), a > -1)) return;
					if ("require" === this.config.rtcpMuxPolicy && "2" === s.component) return;
					if (this._candidateBuffer.push(s), t.config.useJingle) {
						if (n.sdpMid || (t.pc.remoteDescription && "offer" === t.pc.remoteDescription.type ? n.sdpMid = t.remoteDescription.contents[n.sdpMLineIndex].name : n.sdpMid = t.localDescription.contents[n.sdpMLineIndex].name), !t.iceCredentials.local[n.sdpMid]) {
							var c = o.toSessionJSON(t.pc.localDescription.sdp, {
								role: t._role(),
								direction: "outgoing"
							});
							c.contents.forEach(function(e) {
								var n = e.transport || {};
								n.ufrag && (t.iceCredentials.local[e.name] = {
									ufrag: n.ufrag,
									pwd: n.pwd
								})
							})
						}
						if (r.jingle = {
								contents: [{
									name: n.sdpMid,
									creator: t._role(),
									transport: {
										transportType: "iceUdp",
										ufrag: t.iceCredentials.local[n.sdpMid].ufrag,
										pwd: t.iceCredentials.local[n.sdpMid].pwd,
										candidates: [s]
									}
								}]
							}, t.batchIceCandidates > 0) return 0 === t.batchedIceCandidates.length && window.setTimeout(function() {
							var e = {};
							t.batchedIceCandidates.forEach(function(t) {
								t = t.contents[0], e[t.name] || (e[t.name] = t), e[t.name].transport.candidates.push(t.transport.candidates[0])
							});
							var n = {
								jingle: {
									contents: []
								}
							};
							Object.keys(e).forEach(function(t) {
								n.jingle.contents.push(e[t])
							}), t.batchedIceCandidates = [], t.emit("ice", n)
						}, t.batchIceCandidates), void t.batchedIceCandidates.push(r.jingle)
					}
					this.emit("ice", r)
				} else this.emit("endOfCandidates")
			}, r.prototype._onDataChannel = function(e) {
				var t = e.channel;
				this._remoteDataChannels.push(t), this.emit("addChannel", t)
			}, r.prototype.createDataChannel = function(e, t) {
				var n = this.pc.createDataChannel(e, t);
				return this._localDataChannels.push(n), n
			}, r.prototype.getStats = function(e) {
				this.pc.getStats(null, function(t) {
					e(null, t)
				}, function(t) {
					e(t)
				})
			}, t.exports = r
		}, {
			"sdp-jingle-json": 48,
			traceablepeerconnection: 64,
			util: 67,
			"webrtc-adapter": 68,
			wildemitter: 78
		}],
		48: [function(e, t, n) {
			var r = e("./lib/tosdp"),
				i = e("./lib/tojson");
			n.toIncomingSDPOffer = function(e) {
				return r.toSessionSDP(e, {
					role: "responder",
					direction: "incoming"
				})
			}, n.toOutgoingSDPOffer = function(e) {
				return r.toSessionSDP(e, {
					role: "initiator",
					direction: "outgoing"
				})
			}, n.toIncomingSDPAnswer = function(e) {
				return r.toSessionSDP(e, {
					role: "initiator",
					direction: "incoming"
				})
			}, n.toOutgoingSDPAnswer = function(e) {
				return r.toSessionSDP(e, {
					role: "responder",
					direction: "outgoing"
				})
			}, n.toIncomingMediaSDPOffer = function(e) {
				return r.toMediaSDP(e, {
					role: "responder",
					direction: "incoming"
				})
			}, n.toOutgoingMediaSDPOffer = function(e) {
				return r.toMediaSDP(e, {
					role: "initiator",
					direction: "outgoing"
				})
			}, n.toIncomingMediaSDPAnswer = function(e) {
				return r.toMediaSDP(e, {
					role: "initiator",
					direction: "incoming"
				})
			}, n.toOutgoingMediaSDPAnswer = function(e) {
				return r.toMediaSDP(e, {
					role: "responder",
					direction: "outgoing"
				})
			}, n.toCandidateSDP = r.toCandidateSDP, n.toMediaSDP = r.toMediaSDP, n.toSessionSDP = r.toSessionSDP, n.toIncomingJSONOffer = function(e, t) {
				return i.toSessionJSON(e, {
					role: "responder",
					direction: "incoming",
					creators: t
				})
			}, n.toOutgoingJSONOffer = function(e, t) {
				return i.toSessionJSON(e, {
					role: "initiator",
					direction: "outgoing",
					creators: t
				})
			}, n.toIncomingJSONAnswer = function(e, t) {
				return i.toSessionJSON(e, {
					role: "initiator",
					direction: "incoming",
					creators: t
				})
			}, n.toOutgoingJSONAnswer = function(e, t) {
				return i.toSessionJSON(e, {
					role: "responder",
					direction: "outgoing",
					creators: t
				})
			}, n.toIncomingMediaJSONOffer = function(e, t) {
				return i.toMediaJSON(e, {
					role: "responder",
					direction: "incoming",
					creator: t
				})
			}, n.toOutgoingMediaJSONOffer = function(e, t) {
				return i.toMediaJSON(e, {
					role: "initiator",
					direction: "outgoing",
					creator: t
				})
			}, n.toIncomingMediaJSONAnswer = function(e, t) {
				return i.toMediaJSON(e, {
					role: "initiator",
					direction: "incoming",
					creator: t
				})
			}, n.toOutgoingMediaJSONAnswer = function(e, t) {
				return i.toMediaJSON(e, {
					role: "responder",
					direction: "outgoing",
					creator: t
				})
			}, n.toCandidateJSON = i.toCandidateJSON, n.toMediaJSON = i.toMediaJSON, n.toSessionJSON = i.toSessionJSON
		}, {
			"./lib/tojson": 51,
			"./lib/tosdp": 52
		}],
		49: [function(e, t, n) {
			n.lines = function(e) {
				return e.split("\r\n").filter(function(e) {
					return e.length > 0
				})
			}, n.findLine = function(e, t, n) {
				for (var r = e.length, i = 0; i < t.length; i++)
					if (t[i].substr(0, r) === e) return t[i];
				if (!n) return !1;
				for (var o = 0; o < n.length; o++)
					if (n[o].substr(0, r) === e) return n[o];
				return !1
			}, n.findLines = function(e, t, n) {
				for (var r = [], i = e.length, o = 0; o < t.length; o++) t[o].substr(0, i) === e && r.push(t[o]);
				if (r.length || !n) return r;
				for (var a = 0; a < n.length; a++) n[a].substr(0, i) === e && r.push(n[a]);
				return r
			}, n.mline = function(e) {
				for (var t = e.substr(2).split(" "), n = {
						media: t[0],
						port: t[1],
						proto: t[2],
						formats: []
					}, r = 3; r < t.length; r++) t[r] && n.formats.push(t[r]);
				return n
			}, n.rtpmap = function(e) {
				var t = e.substr(9).split(" "),
					n = {
						id: t.shift()
					};
				return t = t[0].split("/"), n.name = t[0], n.clockrate = t[1], n.channels = 3 == t.length ? t[2] : "1", n
			}, n.sctpmap = function(e) {
				var t = e.substr(10).split(" "),
					n = {
						number: t.shift(),
						protocol: t.shift(),
						streams: t.shift()
					};
				return n
			}, n.fmtp = function(e) {
				for (var t, n, r, i = e.substr(e.indexOf(" ") + 1).split(";"), o = [], a = 0; a < i.length; a++) t = i[a].split("="), n = t[0].trim(), r = t[1], n && r ? o.push({
					key: n,
					value: r
				}) : n && o.push({
					key: "",
					value: n
				});
				return o
			}, n.crypto = function(e) {
				var t = e.substr(9).split(" "),
					n = {
						tag: t[0],
						cipherSuite: t[1],
						keyParams: t[2],
						sessionParams: t.slice(3).join(" ")
					};
				return n
			}, n.fingerprint = function(e) {
				var t = e.substr(14).split(" ");
				return {
					hash: t[0],
					value: t[1]
				}
			}, n.extmap = function(e) {
				var t = e.substr(9).split(" "),
					n = {},
					r = t.shift(),
					i = r.indexOf("/");
				return i >= 0 ? (n.id = r.substr(0, i), n.senders = r.substr(i + 1)) : (n.id = r, n.senders = "sendrecv"), n.uri = t.shift() || "", n
			}, n.rtcpfb = function(e) {
				var t = e.substr(10).split(" "),
					n = {};
				return n.id = t.shift(), n.type = t.shift(), "trr-int" === n.type ? n.value = t.shift() : n.subtype = t.shift() || "", n.parameters = t, n
			}, n.candidate = function(e) {
				var t;
				t = 0 === e.indexOf("a=candidate:") ? e.substring(12).split(" ") : e.substring(10).split(" ");
				for (var n = {
						foundation: t[0],
						component: t[1],
						protocol: t[2].toLowerCase(),
						priority: t[3],
						ip: t[4],
						port: t[5],
						type: t[7],
						generation: "0"
					}, r = 8; r < t.length; r += 2) "raddr" === t[r] ? n.relAddr = t[r + 1] : "rport" === t[r] ? n.relPort = t[r + 1] : "generation" === t[r] ? n.generation = t[r + 1] : "tcptype" === t[r] && (n.tcpType = t[r + 1]);
				return n.network = "1", n
			}, n.sourceGroups = function(e) {
				for (var t = [], n = 0; n < e.length; n++) {
					var r = e[n].substr(13).split(" ");
					t.push({
						semantics: r.shift(),
						sources: r
					})
				}
				return t
			}, n.sources = function(e) {
				for (var t = [], n = {}, r = 0; r < e.length; r++) {
					var i = e[r].substr(7).split(" "),
						o = i.shift();
					if (!n[o]) {
						var a = {
							ssrc: o,
							parameters: []
						};
						t.push(a), n[o] = a
					}
					i = i.join(" ").split(":");
					var s = i.shift(),
						c = i.join(":") || null;
					n[o].parameters.push({
						key: s,
						value: c
					})
				}
				return t
			}, n.groups = function(e) {
				for (var t, n = [], r = 0; r < e.length; r++) t = e[r].substr(8).split(" "), n.push({
					semantics: t.shift(),
					contents: t
				});
				return n
			}, n.bandwidth = function(e) {
				var t = e.substr(2).split(":"),
					n = {};
				return n.type = t.shift(), n.bandwidth = t.shift(), n
			}, n.msid = function(e) {
				var t = e.substr(7),
					n = t.split(" ");
				return {
					msid: t,
					mslabel: n[0],
					label: n[1]
				}
			}
		}, {}],
		50: [function(e, t, n) {
			t.exports = {
				initiator: {
					incoming: {
						initiator: "recvonly",
						responder: "sendonly",
						both: "sendrecv",
						none: "inactive",
						recvonly: "initiator",
						sendonly: "responder",
						sendrecv: "both",
						inactive: "none"
					},
					outgoing: {
						initiator: "sendonly",
						responder: "recvonly",
						both: "sendrecv",
						none: "inactive",
						recvonly: "responder",
						sendonly: "initiator",
						sendrecv: "both",
						inactive: "none"
					}
				},
				responder: {
					incoming: {
						initiator: "sendonly",
						responder: "recvonly",
						both: "sendrecv",
						none: "inactive",
						recvonly: "responder",
						sendonly: "initiator",
						sendrecv: "both",
						inactive: "none"
					},
					outgoing: {
						initiator: "recvonly",
						responder: "sendonly",
						both: "sendrecv",
						none: "inactive",
						recvonly: "initiator",
						sendonly: "responder",
						sendrecv: "both",
						inactive: "none"
					}
				}
			}
		}, {}],
		51: [function(e, t, n) {
			var r = e("./senders"),
				i = e("./parsers"),
				o = Math.random();
			n._setIdCounter = function(e) {
				o = e
			}, n.toSessionJSON = function(e, t) {
				var r, o = t.creators || [],
					a = t.role || "initiator",
					s = t.direction || "outgoing",
					c = e.split("\r\nm=");
				for (r = 1; r < c.length; r++) c[r] = "m=" + c[r], r !== c.length - 1 && (c[r] += "\r\n");
				var p = c.shift() + "\r\n",
					d = i.lines(p),
					u = {},
					l = [];
				for (r = 0; r < c.length; r++) l.push(n.toMediaJSON(c[r], p, {
					role: a,
					direction: s,
					creator: o[r] || "initiator"
				}));
				u.contents = l;
				var f = i.findLines("a=group:", d);
				return f.length && (u.groups = i.groups(f)), u
			}, n.toMediaJSON = function(e, t, o) {
				var a = o.creator || "initiator",
					s = o.role || "initiator",
					c = o.direction || "outgoing",
					p = i.lines(e),
					d = i.lines(t),
					u = i.mline(p[0]),
					l = {
						creator: a,
						name: u.media,
						application: {
							applicationType: "rtp",
							media: u.media,
							payloads: [],
							encryption: [],
							feedback: [],
							headerExtensions: []
						},
						transport: {
							transportType: "iceUdp",
							candidates: [],
							fingerprints: []
						}
					};
				"application" == u.media && (l.application = {
					applicationType: "datachannel"
				}, l.transport.sctp = []);
				var f = l.application,
					h = l.transport,
					m = i.findLine("a=mid:", p);
				if (m && (l.name = m.substr(6)), i.findLine("a=sendrecv", p, d) ? l.senders = "both" : i.findLine("a=sendonly", p, d) ? l.senders = r[s][c].sendonly : i.findLine("a=recvonly", p, d) ? l.senders = r[s][c].recvonly : i.findLine("a=inactive", p, d) && (l.senders = "none"), "rtp" == f.applicationType) {
					var g = i.findLine("b=", p);
					g && (f.bandwidth = i.bandwidth(g));
					var v = i.findLine("a=ssrc:", p);
					v && (f.ssrc = v.substr(7).split(" ")[0]);
					var y = i.findLines("a=rtpmap:", p);
					y.forEach(function(e) {
						var t = i.rtpmap(e);
						t.parameters = [], t.feedback = [];
						var n = i.findLines("a=fmtp:" + t.id, p);
						n.forEach(function(e) {
							t.parameters = i.fmtp(e)
						});
						var r = i.findLines("a=rtcp-fb:" + t.id, p);
						r.forEach(function(e) {
							t.feedback.push(i.rtcpfb(e))
						}), f.payloads.push(t)
					});
					var b = i.findLines("a=crypto:", p, d);
					b.forEach(function(e) {
						f.encryption.push(i.crypto(e))
					}), i.findLine("a=rtcp-mux", p) && (f.mux = !0);
					var w = i.findLines("a=rtcp-fb:*", p);
					w.forEach(function(e) {
						f.feedback.push(i.rtcpfb(e))
					});
					var S = i.findLines("a=extmap:", p);
					S.forEach(function(e) {
						var t = i.extmap(e);
						t.senders = r[s][c][t.senders], f.headerExtensions.push(t)
					});
					var C = i.findLines("a=ssrc-group:", p);
					f.sourceGroups = i.sourceGroups(C || []);
					var k = i.findLines("a=ssrc:", p),
						E = f.sources = i.sources(k || []),
						T = i.findLine("a=msid:", p);
					if (T) {
						var x = i.msid(T);
						["msid", "mslabel", "label"].forEach(function(e) {
							for (var t = 0; t < E.length; t++) {
								for (var n = !1, r = 0; r < E[t].parameters.length; r++) E[t].parameters[r].key === e && (n = !0);
								n || E[t].parameters.push({
									key: e,
									value: x[e]
								})
							}
						})
					}
					i.findLine("a=x-google-flag:conference", p, d) && (f.googConferenceFlag = !0)
				}
				var P = i.findLines("a=fingerprint:", p, d),
					R = i.findLine("a=setup:", p, d);
				P.forEach(function(e) {
					var t = i.fingerprint(e);
					R && (t.setup = R.substr(8)), h.fingerprints.push(t)
				});
				var D = i.findLine("a=ice-ufrag:", p, d),
					O = i.findLine("a=ice-pwd:", p, d);
				if (D && O) {
					h.ufrag = D.substr(12), h.pwd = O.substr(10), h.candidates = [];
					var M = i.findLines("a=candidate:", p, d);
					M.forEach(function(e) {
						h.candidates.push(n.toCandidateJSON(e))
					})
				}
				if ("datachannel" == f.applicationType) {
					var A = i.findLines("a=sctpmap:", p);
					A.forEach(function(e) {
						var t = i.sctpmap(e);
						h.sctp.push(t)
					})
				}
				return l
			}, n.toCandidateJSON = function(e) {
				var t = i.candidate(e.split("\r\n")[0]);
				return t.id = (o++).toString(36).substr(0, 12), t
			}
		}, {
			"./parsers": 49,
			"./senders": 50
		}],
		52: [function(e, t, n) {
			var r = e("./senders");
			n.toSessionSDP = function(e, t) {
				var r = (t.role || "initiator", t.direction || "outgoing", t.sid || e.sid || Date.now()),
					i = t.time || Date.now(),
					o = ["v=0", "o=- " + r + " " + i + " IN IP4 0.0.0.0", "s=-", "t=0 0"],
					a = e.contents || [],
					s = !1;
				a.forEach(function(e) {
					e.application.sources && e.application.sources.length && (s = !0)
				}), s && o.push("a=msid-semantic: WMS *");
				var c = e.groups || [];
				return c.forEach(function(e) {
					o.push("a=group:" + e.semantics + " " + e.contents.join(" "))
				}), a.forEach(function(e) {
					o.push(n.toMediaSDP(e, t))
				}), o.join("\r\n") + "\r\n"
			}, n.toMediaSDP = function(e, t) {
				var i = [],
					o = t.role || "initiator",
					a = t.direction || "outgoing",
					s = e.application,
					c = e.transport,
					p = s.payloads || [],
					d = c && c.fingerprints || [],
					u = [];
				if ("datachannel" == s.applicationType ? (u.push("application"), u.push("1"), u.push("DTLS/SCTP"), c.sctp && c.sctp.forEach(function(e) {
						u.push(e.number)
					})) : (u.push(s.media), u.push("1"), d.length > 0 ? u.push("UDP/TLS/RTP/SAVPF") : s.encryption && s.encryption.length > 0 ? u.push("RTP/SAVPF") : u.push("RTP/AVPF"), p.forEach(function(e) {
						u.push(e.id)
					})), i.push("m=" + u.join(" ")), i.push("c=IN IP4 0.0.0.0"), s.bandwidth && s.bandwidth.type && s.bandwidth.bandwidth && i.push("b=" + s.bandwidth.type + ":" + s.bandwidth.bandwidth), "rtp" == s.applicationType && i.push("a=rtcp:1 IN IP4 0.0.0.0"), c) {
					c.ufrag && i.push("a=ice-ufrag:" + c.ufrag), c.pwd && i.push("a=ice-pwd:" + c.pwd);
					var l = !1;
					d.forEach(function(e) {
						i.push("a=fingerprint:" + e.hash + " " + e.value), e.setup && !l && i.push("a=setup:" + e.setup)
					}), c.sctp && c.sctp.forEach(function(e) {
						i.push("a=sctpmap:" + e.number + " " + e.protocol + " " + e.streams)
					})
				}
				"rtp" == s.applicationType && i.push("a=" + (r[o][a][e.senders] || "sendrecv")), i.push("a=mid:" + e.name), s.sources && s.sources.length && (s.sources[0].parameters || []).forEach(function(e) {
					"msid" === e.key && i.push("a=msid:" + e.value)
				}), s.mux && i.push("a=rtcp-mux");
				var f = s.encryption || [];
				f.forEach(function(e) {
					i.push("a=crypto:" + e.tag + " " + e.cipherSuite + " " + e.keyParams + (e.sessionParams ? " " + e.sessionParams : ""))
				}), s.googConferenceFlag && i.push("a=x-google-flag:conference"), p.forEach(function(e) {
					var t = "a=rtpmap:" + e.id + " " + e.name + "/" + e.clockrate;
					if (e.channels && "1" != e.channels && (t += "/" + e.channels), i.push(t), e.parameters && e.parameters.length) {
						var n = ["a=fmtp:" + e.id],
							r = [];
						e.parameters.forEach(function(e) {
							r.push((e.key ? e.key + "=" : "") + e.value)
						}), n.push(r.join(";")), i.push(n.join(" "))
					}
					e.feedback && e.feedback.forEach(function(t) {
						"trr-int" === t.type ? i.push("a=rtcp-fb:" + e.id + " trr-int " + (t.value ? t.value : "0")) : i.push("a=rtcp-fb:" + e.id + " " + t.type + (t.subtype ? " " + t.subtype : ""))
					})
				}), s.feedback && s.feedback.forEach(function(e) {
					"trr-int" === e.type ? i.push("a=rtcp-fb:* trr-int " + (e.value ? e.value : "0")) : i.push("a=rtcp-fb:* " + e.type + (e.subtype ? " " + e.subtype : ""))
				});
				var h = s.headerExtensions || [];
				h.forEach(function(e) {
					i.push("a=extmap:" + e.id + (e.senders ? "/" + r[o][a][e.senders] : "") + " " + e.uri)
				});
				var m = s.sourceGroups || [];
				m.forEach(function(e) {
					i.push("a=ssrc-group:" + e.semantics + " " + e.sources.join(" "))
				});
				var g = s.sources || [];
				g.forEach(function(e) {
					for (var t = 0; t < e.parameters.length; t++) {
						var n = e.parameters[t];
						i.push("a=ssrc:" + (e.ssrc || s.ssrc) + " " + n.key + (n.value ? ":" + n.value : ""))
					}
				});
				var v = c.candidates || [];
				return v.forEach(function(e) {
					i.push(n.toCandidateSDP(e))
				}), i.join("\r\n")
			}, n.toCandidateSDP = function(e) {
				var t = [];
				t.push(e.foundation), t.push(e.component), t.push(e.protocol.toUpperCase()), t.push(e.priority), t.push(e.ip), t.push(e.port);
				var n = e.type;
				return t.push("typ"), t.push(n), "srflx" !== n && "prflx" !== n && "relay" !== n || e.relAddr && e.relPort && (t.push("raddr"), t.push(e.relAddr), t.push("rport"), t.push(e.relPort)), e.tcpType && "TCP" == e.protocol.toUpperCase() && (t.push("tcptype"), t.push(e.tcpType)), t.push("generation"), t.push(e.generation || "0"), "a=candidate:" + t.join(" ")
			}
		}, {
			"./senders": 50
		}],
		53: [function(e, t, n) {
			"use strict";
			var r = {};
			r.generateIdentifier = function() {
				return Math.random().toString(36).substr(2, 10)
			}, r.localCName = r.generateIdentifier(), r.splitLines = function(e) {
				return e.trim().split("\n").map(function(e) {
					return e.trim()
				})
			}, r.splitSections = function(e) {
				var t = e.split("\nm=");
				return t.map(function(e, t) {
					return (t > 0 ? "m=" + e : e).trim() + "\r\n"
				})
			}, r.matchPrefix = function(e, t) {
				return r.splitLines(e).filter(function(e) {
					return 0 === e.indexOf(t)
				})
			}, r.parseCandidate = function(e) {
				var t;
				t = 0 === e.indexOf("a=candidate:") ? e.substring(12).split(" ") : e.substring(10).split(" ");
				for (var n = {
						foundation: t[0],
						component: t[1],
						protocol: t[2].toLowerCase(),
						priority: parseInt(t[3], 10),
						ip: t[4],
						port: parseInt(t[5], 10),
						type: t[7]
					}, r = 8; r < t.length; r += 2) switch (t[r]) {
					case "raddr":
						n.relatedAddress = t[r + 1];
						break;
					case "rport":
						n.relatedPort = parseInt(t[r + 1], 10);
						break;
					case "tcptype":
						n.tcpType = t[r + 1]
				}
				return n
			}, r.writeCandidate = function(e) {
				var t = [];
				t.push(e.foundation), t.push(e.component), t.push(e.protocol.toUpperCase()), t.push(e.priority), t.push(e.ip), t.push(e.port);
				var n = e.type;
				return t.push("typ"), t.push(n), "host" !== n && e.relatedAddress && e.relatedPort && (t.push("raddr"), t.push(e.relatedAddress), t.push("rport"), t.push(e.relatedPort)), e.tcpType && "tcp" === e.protocol.toLowerCase() && (t.push("tcptype"), t.push(e.tcpType)), "candidate:" + t.join(" ")
			}, r.parseRtpMap = function(e) {
				var t = e.substr(9).split(" "),
					n = {
						payloadType: parseInt(t.shift(), 10)
					};
				return t = t[0].split("/"), n.name = t[0], n.clockRate = parseInt(t[1], 10), n.numChannels = 3 === t.length ? parseInt(t[2], 10) : 1, n
			}, r.writeRtpMap = function(e) {
				var t = e.payloadType;
				return void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType), "a=rtpmap:" + t + " " + e.name + "/" + e.clockRate + (1 !== e.numChannels ? "/" + e.numChannels : "") + "\r\n"
			}, r.parseExtmap = function(e) {
				var t = e.substr(9).split(" ");
				return {
					id: parseInt(t[0], 10),
					uri: t[1]
				}
			}, r.writeExtmap = function(e) {
				return "a=extmap:" + (e.id || e.preferredId) + " " + e.uri + "\r\n"
			}, r.parseFmtp = function(e) {
				for (var t, n = {}, r = e.substr(e.indexOf(" ") + 1).split(";"), i = 0; i < r.length; i++) t = r[i].trim().split("="), n[t[0].trim()] = t[1];
				return n
			}, r.writeFmtp = function(e) {
				var t = "",
					n = e.payloadType;
				if (void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType), e.parameters && Object.keys(e.parameters).length) {
					var r = [];
					Object.keys(e.parameters).forEach(function(t) {
						r.push(t + "=" + e.parameters[t])
					}), t += "a=fmtp:" + n + " " + r.join(";") + "\r\n"
				}
				return t
			}, r.parseRtcpFb = function(e) {
				var t = e.substr(e.indexOf(" ") + 1).split(" ");
				return {
					type: t.shift(),
					parameter: t.join(" ")
				}
			}, r.writeRtcpFb = function(e) {
				var t = "",
					n = e.payloadType;
				return void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType), e.rtcpFeedback && e.rtcpFeedback.length && e.rtcpFeedback.forEach(function(e) {
					t += "a=rtcp-fb:" + n + " " + e.type + (e.parameter && e.parameter.length ? " " + e.parameter : "") + "\r\n"
				}), t
			}, r.parseSsrcMedia = function(e) {
				var t = e.indexOf(" "),
					n = {
						ssrc: parseInt(e.substr(7, t - 7), 10)
					},
					r = e.indexOf(":", t);
				return r > -1 ? (n.attribute = e.substr(t + 1, r - t - 1), n.value = e.substr(r + 1)) : n.attribute = e.substr(t + 1), n
			}, r.getDtlsParameters = function(e, t) {
				var n = r.splitLines(e);
				n = n.concat(r.splitLines(t));
				var i = n.filter(function(e) {
						return 0 === e.indexOf("a=fingerprint:")
					})[0].substr(14),
					o = {
						role: "auto",
						fingerprints: [{
							algorithm: i.split(" ")[0],
							value: i.split(" ")[1]
						}]
					};
				return o
			}, r.writeDtlsParameters = function(e, t) {
				var n = "a=setup:" + t + "\r\n";
				return e.fingerprints.forEach(function(e) {
					n += "a=fingerprint:" + e.algorithm + " " + e.value + "\r\n"
				}), n
			}, r.getIceParameters = function(e, t) {
				var n = r.splitLines(e);
				n = n.concat(r.splitLines(t));
				var i = {
					usernameFragment: n.filter(function(e) {
						return 0 === e.indexOf("a=ice-ufrag:")
					})[0].substr(12),
					password: n.filter(function(e) {
						return 0 === e.indexOf("a=ice-pwd:")
					})[0].substr(10)
				};
				return i
			}, r.writeIceParameters = function(e) {
				return "a=ice-ufrag:" + e.usernameFragment + "\r\na=ice-pwd:" + e.password + "\r\n"
			}, r.parseRtpParameters = function(e) {
				for (var t = {
						codecs: [],
						headerExtensions: [],
						fecMechanisms: [],
						rtcp: []
					}, n = r.splitLines(e), i = n[0].split(" "), o = 3; o < i.length; o++) {
					var a = i[o],
						s = r.matchPrefix(e, "a=rtpmap:" + a + " ")[0];
					if (s) {
						var c = r.parseRtpMap(s),
							p = r.matchPrefix(e, "a=fmtp:" + a + " ");
						switch (c.parameters = p.length ? r.parseFmtp(p[0]) : {}, c.rtcpFeedback = r.matchPrefix(e, "a=rtcp-fb:" + a + " ").map(r.parseRtcpFb), t.codecs.push(c), c.name.toUpperCase()) {
							case "RED":
							case "ULPFEC":
								t.fecMechanisms.push(c.name.toUpperCase())
						}
					}
				}
				return r.matchPrefix(e, "a=extmap:").forEach(function(e) {
					t.headerExtensions.push(r.parseExtmap(e))
				}), t
			}, r.writeRtpDescription = function(e, t) {
				var n = "";
				return n += "m=" + e + " ", n += t.codecs.length > 0 ? "9" : "0", n += " UDP/TLS/RTP/SAVPF ", n += t.codecs.map(function(e) {
					return void 0 !== e.preferredPayloadType ? e.preferredPayloadType : e.payloadType
				}).join(" ") + "\r\n", n += "c=IN IP4 0.0.0.0\r\n", n += "a=rtcp:9 IN IP4 0.0.0.0\r\n", t.codecs.forEach(function(e) {
					n += r.writeRtpMap(e), n += r.writeFmtp(e), n += r.writeRtcpFb(e)
				}), n += "a=rtcp-mux\r\n"
			}, r.parseRtpEncodingParameters = function(e) {
				var t, n = [],
					i = r.parseRtpParameters(e),
					o = -1 !== i.fecMechanisms.indexOf("RED"),
					a = -1 !== i.fecMechanisms.indexOf("ULPFEC"),
					s = r.matchPrefix(e, "a=ssrc:").map(function(e) {
						return r.parseSsrcMedia(e)
					}).filter(function(e) {
						return "cname" === e.attribute
					}),
					c = s.length > 0 && s[0].ssrc,
					p = r.matchPrefix(e, "a=ssrc-group:FID").map(function(e) {
						var t = e.split(" ");
						return t.shift(), t.map(function(e) {
							return parseInt(e, 10)
						})
					});
				p.length > 0 && p[0].length > 1 && p[0][0] === c && (t = p[0][1]), i.codecs.forEach(function(e) {
					if ("RTX" === e.name.toUpperCase() && e.parameters.apt) {
						var r = {
							ssrc: c,
							codecPayloadType: parseInt(e.parameters.apt, 10),
							rtx: {
								payloadType: e.payloadType,
								ssrc: t
							}
						};
						n.push(r), o && (r = JSON.parse(JSON.stringify(r)), r.fec = {
							ssrc: t,
							mechanism: a ? "red+ulpfec" : "red"
						}, n.push(r))
					}
				}), 0 === n.length && c && n.push({
					ssrc: c
				});
				var d = r.matchPrefix(e, "b=");
				return d.length && (0 === d[0].indexOf("b=TIAS:") ? d = parseInt(d[0].substr(7), 10) : 0 === d[0].indexOf("b=AS:") && (d = parseInt(d[0].substr(5), 10)), n.forEach(function(e) {
					e.maxBitrate = d
				})), n
			}, r.writeSessionBoilerplate = function() {
				return "v=0\r\no=thisisadapterortc 8169639915646943137 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"
			}, r.writeMediaSection = function(e, t, n, i) {
				var o = r.writeRtpDescription(e.kind, t);
				if (o += r.writeIceParameters(e.iceGatherer.getLocalParameters()), o += r.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), "offer" === n ? "actpass" : "active"), o += "a=mid:" + e.mid + "\r\n", o += e.rtpSender && e.rtpReceiver ? "a=sendrecv\r\n" : e.rtpSender ? "a=sendonly\r\n" : e.rtpReceiver ? "a=recvonly\r\n" : "a=inactive\r\n", e.rtpSender) {
					var a = "msid:" + i.id + " " + e.rtpSender.track.id + "\r\n";
					o += "a=" + a, o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + a
				}
				return o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + r.localCName + "\r\n"
			}, r.getDirection = function(e, t) {
				for (var n = r.splitLines(e), i = 0; i < n.length; i++) switch (n[i]) {
					case "a=sendrecv":
					case "a=sendonly":
					case "a=recvonly":
					case "a=inactive":
						return n[i].substr(2)
				}
				return t ? r.getDirection(t) : "sendrecv"
			}, t.exports = r
		}, {}],
		54: [function(e, t, n) {
			t.exports = e("./lib/")
		}, {
			"./lib/": 55
		}],
		55: [function(e, t, n) {
			function r(e, t) {
				"object" == typeof e && (t = e, e = void 0), t = t || {};
				var n, r = i(e),
					o = r.source,
					p = r.id;
				return t.forceNew || t["force new connection"] || !1 === t.multiplex ? (s("ignoring socket cache for %s", o), n = a(o, t)) : (c[p] || (s("new io instance for %s", o), c[p] = a(o, t)), n = c[p]), n.socket(r.path)
			}
			var i = e("./url"),
				o = e("socket.io-parser"),
				a = e("./manager"),
				s = e("debug")("socket.io-client");
			t.exports = n = r;
			var c = n.managers = {};
			n.protocol = o.protocol, n.connect = r, n.Manager = e("./manager"), n.Socket = e("./socket")
		}, {
			"./manager": 56,
			"./socket": 58,
			"./url": 59,
			debug: 10,
			"socket.io-parser": 61
		}],
		56: [function(e, t, n) {
			function r(e, t) {
				return this instanceof r ? (e && "object" == typeof e && (t = e, e = void 0), t = t || {}, t.path = t.path || "/socket.io", this.nsps = {}, this.subs = [], this.opts = t, this.reconnection(t.reconnection !== !1), this.reconnectionAttempts(t.reconnectionAttempts || 1 / 0), this.reconnectionDelay(t.reconnectionDelay || 1e3), this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3), this.randomizationFactor(t.randomizationFactor || .5), this.backoff = new l({
					min: this.reconnectionDelay(),
					max: this.reconnectionDelayMax(),
					jitter: this.randomizationFactor()
				}), this.timeout(null == t.timeout ? 2e4 : t.timeout), this.readyState = "closed", this.uri = e, this.connected = [], this.encoding = !1, this.packetBuffer = [], this.encoder = new s.Encoder, this.decoder = new s.Decoder, this.autoConnect = t.autoConnect !== !1, void(this.autoConnect && this.open())) : new r(e, t)
			}
			var i = (e("./url"), e("engine.io-client")),
				o = e("./socket"),
				a = e("component-emitter"),
				s = e("socket.io-parser"),
				c = e("./on"),
				p = e("component-bind"),
				d = (e("object-component"), e("debug")("socket.io-client:manager")),
				u = e("indexof"),
				l = e("backo2");
			t.exports = r, r.prototype.emitAll = function() {
				this.emit.apply(this, arguments);
				for (var e in this.nsps) this.nsps[e].emit.apply(this.nsps[e], arguments)
			}, r.prototype.updateSocketIds = function() {
				for (var e in this.nsps) this.nsps[e].id = this.engine.id
			}, a(r.prototype), r.prototype.reconnection = function(e) {
				return arguments.length ? (this._reconnection = !!e, this) : this._reconnection
			}, r.prototype.reconnectionAttempts = function(e) {
				return arguments.length ? (this._reconnectionAttempts = e, this) : this._reconnectionAttempts
			}, r.prototype.reconnectionDelay = function(e) {
				return arguments.length ? (this._reconnectionDelay = e, this.backoff && this.backoff.setMin(e), this) : this._reconnectionDelay
			}, r.prototype.randomizationFactor = function(e) {
				return arguments.length ? (this._randomizationFactor = e, this.backoff && this.backoff.setJitter(e), this) : this._randomizationFactor
			}, r.prototype.reconnectionDelayMax = function(e) {
				return arguments.length ? (this._reconnectionDelayMax = e, this.backoff && this.backoff.setMax(e), this) : this._reconnectionDelayMax
			}, r.prototype.timeout = function(e) {
				return arguments.length ? (this._timeout = e, this) : this._timeout
			}, r.prototype.maybeReconnectOnOpen = function() {
				!this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
			}, r.prototype.open = r.prototype.connect = function(e) {
				if (d("readyState %s", this.readyState), ~this.readyState.indexOf("open")) return this;
				d("opening %s", this.uri), this.engine = i(this.uri, this.opts);
				var t = this.engine,
					n = this;
				this.readyState = "opening", this.skipReconnect = !1;
				var r = c(t, "open", function() {
						n.onopen(), e && e()
					}),
					o = c(t, "error", function(t) {
						if (d("connect_error"), n.cleanup(), n.readyState = "closed", n.emitAll("connect_error", t), e) {
							var r = new Error("Connection error");
							r.data = t, e(r)
						} else n.maybeReconnectOnOpen()
					});
				if (!1 !== this._timeout) {
					var a = this._timeout;
					d("connect attempt will timeout after %d", a);
					var s = setTimeout(function() {
						d("connect attempt timed out after %d", a), r.destroy(), t.close(), t.emit("error", "timeout"), n.emitAll("connect_timeout", a)
					}, a);
					this.subs.push({
						destroy: function() {
							clearTimeout(s)
						}
					})
				}
				return this.subs.push(r), this.subs.push(o), this
			}, r.prototype.onopen = function() {
				d("open"), this.cleanup(), this.readyState = "open", this.emit("open");
				var e = this.engine;
				this.subs.push(c(e, "data", p(this, "ondata"))), this.subs.push(c(this.decoder, "decoded", p(this, "ondecoded"))), this.subs.push(c(e, "error", p(this, "onerror"))), this.subs.push(c(e, "close", p(this, "onclose")))
			}, r.prototype.ondata = function(e) {
				this.decoder.add(e)
			}, r.prototype.ondecoded = function(e) {
				this.emit("packet", e)
			}, r.prototype.onerror = function(e) {
				d("error", e), this.emitAll("error", e)
			}, r.prototype.socket = function(e) {
				var t = this.nsps[e];
				if (!t) {
					t = new o(this, e), this.nsps[e] = t;
					var n = this;
					t.on("connect", function() {
						t.id = n.engine.id, ~u(n.connected, t) || n.connected.push(t)
					})
				}
				return t
			}, r.prototype.destroy = function(e) {
				var t = u(this.connected, e);
				~t && this.connected.splice(t, 1), this.connected.length || this.close()
			}, r.prototype.packet = function(e) {
				d("writing packet %j", e);
				var t = this;
				t.encoding ? t.packetBuffer.push(e) : (t.encoding = !0, this.encoder.encode(e, function(e) {
					for (var n = 0; n < e.length; n++) t.engine.write(e[n]);
					t.encoding = !1, t.processPacketQueue()
				}))
			}, r.prototype.processPacketQueue = function() {
				if (this.packetBuffer.length > 0 && !this.encoding) {
					var e = this.packetBuffer.shift();
					this.packet(e)
				}
			}, r.prototype.cleanup = function() {
				for (var e; e = this.subs.shift();) e.destroy();
				this.packetBuffer = [], this.encoding = !1, this.decoder.destroy()
			}, r.prototype.close = r.prototype.disconnect = function() {
				this.skipReconnect = !0, this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close()
			}, r.prototype.onclose = function(e) {
				d("close"), this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.emit("close", e), this._reconnection && !this.skipReconnect && this.reconnect()
			}, r.prototype.reconnect = function() {
				if (this.reconnecting || this.skipReconnect) return this;
				var e = this;
				if (this.backoff.attempts >= this._reconnectionAttempts) d("reconnect failed"), this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1;
				else {
					var t = this.backoff.duration();
					d("will wait %dms before reconnect attempt", t), this.reconnecting = !0;
					var n = setTimeout(function() {
						e.skipReconnect || (d("attempting reconnect"), e.emitAll("reconnect_attempt", e.backoff.attempts), e.emitAll("reconnecting", e.backoff.attempts), e.skipReconnect || e.open(function(t) {
							t ? (d("reconnect attempt error"), e.reconnecting = !1, e.reconnect(), e.emitAll("reconnect_error", t.data)) : (d("reconnect success"), e.onreconnect())
						}))
					}, t);
					this.subs.push({
						destroy: function() {
							clearTimeout(n)
						}
					})
				}
			}, r.prototype.onreconnect = function() {
				var e = this.backoff.attempts;
				this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", e)
			}
		}, {
			"./on": 57,
			"./socket": 58,
			"./url": 59,
			backo2: 4,
			"component-bind": 7,
			"component-emitter": 8,
			debug: 10,
			"engine.io-client": 11,
			indexof: 33,
			"object-component": 42,
			"socket.io-parser": 61
		}],
		57: [function(e, t, n) {
			function r(e, t, n) {
				return e.on(t, n), {
					destroy: function() {
						e.removeListener(t, n)
					}
				}
			}
			t.exports = r
		}, {}],
		58: [function(e, t, n) {
			function r(e, t) {
				this.io = e, this.nsp = t, this.json = this, this.ids = 0, this.acks = {}, this.io.autoConnect && this.open(), this.receiveBuffer = [], this.sendBuffer = [], this.connected = !1, this.disconnected = !0
			}
			var i = e("socket.io-parser"),
				o = e("component-emitter"),
				a = e("to-array"),
				s = e("./on"),
				c = e("component-bind"),
				p = e("debug")("socket.io-client:socket"),
				d = e("has-binary");
			t.exports = n = r;
			var u = {
					connect: 1,
					connect_error: 1,
					connect_timeout: 1,
					disconnect: 1,
					error: 1,
					reconnect: 1,
					reconnect_attempt: 1,
					reconnect_failed: 1,
					reconnect_error: 1,
					reconnecting: 1
				},
				l = o.prototype.emit;
			o(r.prototype), r.prototype.subEvents = function() {
				if (!this.subs) {
					var e = this.io;
					this.subs = [s(e, "open", c(this, "onopen")), s(e, "packet", c(this, "onpacket")), s(e, "close", c(this, "onclose"))]
				}
			}, r.prototype.open = r.prototype.connect = function() {
				return this.connected ? this : (this.subEvents(), this.io.open(), "open" == this.io.readyState && this.onopen(), this)
			}, r.prototype.send = function() {
				var e = a(arguments);
				return e.unshift("message"), this.emit.apply(this, e), this
			}, r.prototype.emit = function(e) {
				if (u.hasOwnProperty(e)) return l.apply(this, arguments), this;
				var t = a(arguments),
					n = i.EVENT;
				d(t) && (n = i.BINARY_EVENT);
				var r = {
					type: n,
					data: t
				};
				return "function" == typeof t[t.length - 1] && (p("emitting packet with ack id %d", this.ids), this.acks[this.ids] = t.pop(), r.id = this.ids++), this.connected ? this.packet(r) : this.sendBuffer.push(r), this
			}, r.prototype.packet = function(e) {
				e.nsp = this.nsp, this.io.packet(e)
			}, r.prototype.onopen = function() {
				p("transport is open - connecting"), "/" != this.nsp && this.packet({
					type: i.CONNECT
				})
			}, r.prototype.onclose = function(e) {
				p("close (%s)", e), this.connected = !1, this.disconnected = !0, delete this.id, this.emit("disconnect", e)
			}, r.prototype.onpacket = function(e) {
				if (e.nsp == this.nsp) switch (e.type) {
					case i.CONNECT:
						this.onconnect();
						break;
					case i.EVENT:
						this.onevent(e);
						break;
					case i.BINARY_EVENT:
						this.onevent(e);
						break;
					case i.ACK:
						this.onack(e);
						break;
					case i.BINARY_ACK:
						this.onack(e);
						break;
					case i.DISCONNECT:
						this.ondisconnect();
						break;
					case i.ERROR:
						this.emit("error", e.data)
				}
			}, r.prototype.onevent = function(e) {
				var t = e.data || [];
				p("emitting event %j", t), null != e.id && (p("attaching ack callback to event"), t.push(this.ack(e.id))), this.connected ? l.apply(this, t) : this.receiveBuffer.push(t)
			}, r.prototype.ack = function(e) {
				var t = this,
					n = !1;
				return function() {
					if (!n) {
						n = !0;
						var r = a(arguments);
						p("sending ack %j", r);
						var o = d(r) ? i.BINARY_ACK : i.ACK;
						t.packet({
							type: o,
							id: e,
							data: r
						})
					}
				}
			}, r.prototype.onack = function(e) {
				p("calling ack %s with %j", e.id, e.data);
				var t = this.acks[e.id];
				t.apply(this, e.data), delete this.acks[e.id]
			}, r.prototype.onconnect = function() {
				this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered()
			}, r.prototype.emitBuffered = function() {
				var e;
				for (e = 0; e < this.receiveBuffer.length; e++) l.apply(this, this.receiveBuffer[e]);
				for (this.receiveBuffer = [], e = 0; e < this.sendBuffer.length; e++) this.packet(this.sendBuffer[e]);
				this.sendBuffer = []
			}, r.prototype.ondisconnect = function() {
				p("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect")
			}, r.prototype.destroy = function() {
				if (this.subs) {
					for (var e = 0; e < this.subs.length; e++) this.subs[e].destroy();
					this.subs = null
				}
				this.io.destroy(this)
			}, r.prototype.close = r.prototype.disconnect = function() {
				return this.connected && (p("performing disconnect (%s)", this.nsp), this.packet({
					type: i.DISCONNECT
				})), this.destroy(), this.connected && this.onclose("io client disconnect"), this
			}
		}, {
			"./on": 57,
			"component-bind": 7,
			"component-emitter": 8,
			debug: 10,
			"has-binary": 31,
			"socket.io-parser": 61,
			"to-array": 63
		}],
		59: [function(e, t, n) {
			(function(n) {
				function r(e, t) {
					var r = e,
						t = t || n.location;
					return null == e && (e = t.protocol + "//" + t.host), "string" == typeof e && ("/" == e.charAt(0) && (e = "/" == e.charAt(1) ? t.protocol + e : t.hostname + e), /^(https?|wss?):\/\//.test(e) || (o("protocol-less url %s", e), e = "undefined" != typeof t ? t.protocol + "//" + e : "https://" + e), o("parse %s", e), r = i(e)), r.port || (/^(http|ws)$/.test(r.protocol) ? r.port = "80" : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")), r.path = r.path || "/", r.id = r.protocol + "://" + r.host + ":" + r.port, r.href = r.protocol + "://" + r.host + (t && t.port == r.port ? "" : ":" + r.port), r
				}
				var i = e("parseuri"),
					o = e("debug")("socket.io-client:url");
				t.exports = r
			}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
		}, {
			debug: 10,
			parseuri: 45
		}],
		60: [function(e, t, n) {
			(function(t) {
				var r = e("isarray"),
					i = e("./is-buffer");
				n.deconstructPacket = function(e) {
					function t(e) {
						if (!e) return e;
						if (i(e)) {
							var o = {
								_placeholder: !0,
								num: n.length
							};
							return n.push(e), o
						}
						if (r(e)) {
							for (var a = new Array(e.length), s = 0; s < e.length; s++) a[s] = t(e[s]);
							return a
						}
						if ("object" == typeof e && !(e instanceof Date)) {
							var a = {};
							for (var c in e) a[c] = t(e[c]);
							return a
						}
						return e
					}
					var n = [],
						o = e.data,
						a = e;
					return a.data = t(o), a.attachments = n.length, {
						packet: a,
						buffers: n
					}
				}, n.reconstructPacket = function(e, t) {
					function n(e) {
						if (e && e._placeholder) {
							var i = t[e.num];
							return i
						}
						if (r(e)) {
							for (var o = 0; o < e.length; o++) e[o] = n(e[o]);
							return e
						}
						if (e && "object" == typeof e) {
							for (var a in e) e[a] = n(e[a]);
							return e
						}
						return e
					}
					return e.data = n(e.data), e.attachments = void 0, e
				}, n.removeBlobs = function(e, n) {
					function o(e, c, p) {
						if (!e) return e;
						if (t.Blob && e instanceof Blob || t.File && e instanceof File) {
							a++;
							var d = new FileReader;
							d.onload = function() {
								p ? p[c] = this.result : s = this.result, --a || n(s)
							}, d.readAsArrayBuffer(e)
						} else if (r(e))
							for (var u = 0; u < e.length; u++) o(e[u], u, e);
						else if (e && "object" == typeof e && !i(e))
							for (var l in e) o(e[l], l, e)
					}
					var a = 0,
						s = e;
					o(s), a || n(s)
				}
			}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
		}, {
			"./is-buffer": 62,
			isarray: 35
		}],
		61: [function(e, t, n) {
			function r() {}

			function i(e) {
				var t = "",
					r = !1;
				return t += e.type, n.BINARY_EVENT != e.type && n.BINARY_ACK != e.type || (t += e.attachments, t += "-"), e.nsp && "/" != e.nsp && (r = !0, t += e.nsp), null != e.id && (r && (t += ",", r = !1), t += e.id), null != e.data && (r && (t += ","), t += u.stringify(e.data)), d("encoded %j as %s", e, t), t
			}

			function o(e, t) {
				function n(e) {
					var n = f.deconstructPacket(e),
						r = i(n.packet),
						o = n.buffers;
					o.unshift(r), t(o)
				}
				f.removeBlobs(e, n)
			}

			function a() {
				this.reconstructor = null
			}

			function s(e) {
				var t = {},
					r = 0;
				if (t.type = Number(e.charAt(0)), null == n.types[t.type]) return p();
				if (n.BINARY_EVENT == t.type || n.BINARY_ACK == t.type) {
					for (var i = "";
						"-" != e.charAt(++r) && (i += e.charAt(r), r != e.length););
					if (i != Number(i) || "-" != e.charAt(r)) throw new Error("Illegal attachments");
					t.attachments = Number(i)
				}
				if ("/" == e.charAt(r + 1))
					for (t.nsp = ""; ++r;) {
						var o = e.charAt(r);
						if ("," == o) break;
						if (t.nsp += o, r == e.length) break
					} else t.nsp = "/";
				var a = e.charAt(r + 1);
				if ("" !== a && Number(a) == a) {
					for (t.id = ""; ++r;) {
						var o = e.charAt(r);
						if (null == o || Number(o) != o) {
							--r;
							break
						}
						if (t.id += e.charAt(r), r == e.length) break
					}
					t.id = Number(t.id)
				}
				if (e.charAt(++r)) try {
					t.data = u.parse(e.substr(r))
				} catch (s) {
					return p()
				}
				return d("decoded %s as %j", e, t), t
			}

			function c(e) {
				this.reconPack = e, this.buffers = []
			}

			function p(e) {
				return {
					type: n.ERROR,
					data: "parser error"
				}
			}
			var d = e("debug")("socket.io-parser"),
				u = e("json3"),
				l = (e("isarray"), e("component-emitter")),
				f = e("./binary"),
				h = e("./is-buffer");
			n.protocol = 4, n.types = ["CONNECT", "DISCONNECT", "EVENT", "BINARY_EVENT", "ACK", "BINARY_ACK", "ERROR"], n.CONNECT = 0, n.DISCONNECT = 1, n.EVENT = 2, n.ACK = 3, n.ERROR = 4, n.BINARY_EVENT = 5, n.BINARY_ACK = 6, n.Encoder = r, n.Decoder = a, r.prototype.encode = function(e, t) {
				if (d("encoding packet %j", e), n.BINARY_EVENT == e.type || n.BINARY_ACK == e.type) o(e, t);
				else {
					var r = i(e);
					t([r])
				}
			}, l(a.prototype), a.prototype.add = function(e) {
				var t;
				if ("string" == typeof e) t = s(e), n.BINARY_EVENT == t.type || n.BINARY_ACK == t.type ? (this.reconstructor = new c(t), 0 === this.reconstructor.reconPack.attachments && this.emit("decoded", t)) : this.emit("decoded", t);
				else {
					if (!h(e) && !e.base64) throw new Error("Unknown type: " + e);
					if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
					t = this.reconstructor.takeBinaryData(e), t && (this.reconstructor = null, this.emit("decoded", t))
				}
			}, a.prototype.destroy = function() {
				this.reconstructor && this.reconstructor.finishedReconstruction()
			}, c.prototype.takeBinaryData = function(e) {
				if (this.buffers.push(e), this.buffers.length == this.reconPack.attachments) {
					var t = f.reconstructPacket(this.reconPack, this.buffers);
					return this.finishedReconstruction(), t
				}
				return null
			}, c.prototype.finishedReconstruction = function() {
				this.reconPack = null, this.buffers = []
			}
		}, {
			"./binary": 60,
			"./is-buffer": 62,
			"component-emitter": 8,
			debug: 10,
			isarray: 35,
			json3: 36
		}],
		62: [function(e, t, n) {
			(function(e) {
				function n(t) {
					return e.Buffer && e.Buffer.isBuffer(t) || e.ArrayBuffer && t instanceof ArrayBuffer
				}
				t.exports = n
			}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
		}, {}],
		63: [function(e, t, n) {
			function r(e, t) {
				var n = [];
				t = t || 0;
				for (var r = t || 0; r < e.length; r++) n[r - t] = e[r];
				return n
			}
			t.exports = r
		}, {}],
		64: [function(e, t, n) {
			function r(e) {
				return {
					type: e.type,
					sdp: e.sdp
				}
			}

			function i(e) {
				var t = {
					label: e.id
				};
				return e.getAudioTracks().length && (t.audio = e.getAudioTracks().map(function(e) {
					return e.id
				})), e.getVideoTracks().length && (t.video = e.getVideoTracks().map(function(e) {
					return e.id
				})), t
			}

			function o(e, t) {
				var n = this;
				s.call(this), this.peerconnection = new window.RTCPeerConnection(e, t), this.trace = function(e, t) {
					n.emit("PeerConnectionTrace", {
						time: new Date,
						type: e,
						value: t || ""
					})
				}, this.onicecandidate = null, this.peerconnection.onicecandidate = function(e) {
					n.trace("onicecandidate", e.candidate), null !== n.onicecandidate && n.onicecandidate(e)
				}, this.onaddstream = null, this.peerconnection.onaddstream = function(e) {
					n.trace("onaddstream", i(e.stream)), null !== n.onaddstream && n.onaddstream(e)
				}, this.onremovestream = null, this.peerconnection.onremovestream = function(e) {
					n.trace("onremovestream", i(e.stream)), null !== n.onremovestream && n.onremovestream(e)
				}, this.onsignalingstatechange = null, this.peerconnection.onsignalingstatechange = function(e) {
					n.trace("onsignalingstatechange", n.signalingState), null !== n.onsignalingstatechange && n.onsignalingstatechange(e)
				}, this.oniceconnectionstatechange = null, this.peerconnection.oniceconnectionstatechange = function(e) {
					n.trace("oniceconnectionstatechange", n.iceConnectionState), null !== n.oniceconnectionstatechange && n.oniceconnectionstatechange(e)
				}, this.onnegotiationneeded = null, this.peerconnection.onnegotiationneeded = function(e) {
					n.trace("onnegotiationneeded"), null !== n.onnegotiationneeded && n.onnegotiationneeded(e)
				}, n.ondatachannel = null, this.peerconnection.ondatachannel = function(e) {
					n.trace("ondatachannel", e), null !== n.ondatachannel && n.ondatachannel(e)
				}, this.getLocalStreams = this.peerconnection.getLocalStreams.bind(this.peerconnection), this.getRemoteStreams = this.peerconnection.getRemoteStreams.bind(this.peerconnection)
			}
			var a = e("util"),
				s = (e("webrtc-adapter"), e("wildemitter"));
			a.inherits(o, s), ["signalingState", "iceConnectionState", "localDescription", "remoteDescription"].forEach(function(e) {
				Object.defineProperty(o.prototype, e, {
					get: function() {
						return this.peerconnection[e]
					}
				})
			}), o.prototype.addStream = function(e) {
				this.trace("addStream", i(e)), this.peerconnection.addStream(e)
			}, o.prototype.removeStream = function(e) {
				this.trace("removeStream", i(e)), this.peerconnection.removeStream(e)
			}, o.prototype.createDataChannel = function(e, t) {
				return this.trace("createDataChannel", e, t), this.peerconnection.createDataChannel(e, t)
			}, o.prototype.setLocalDescription = function(e, t, n) {
				var i = this;
				return this.trace("setLocalDescription", r(e)), this.peerconnection.setLocalDescription(e).then(function() {
					i.trace("setLocalDescriptionOnSuccess"), t && t()
				}, function(e) {
					i.trace("setLocalDescriptionOnFailure", e), n && n(e)
				})
			}, o.prototype.setRemoteDescription = function(e, t, n) {
				var i = this;
				return this.trace("setRemoteDescription", r(e)), this.peerconnection.setRemoteDescription(e).then(function() {
					i.trace("setRemoteDescriptionOnSuccess"), t && t()
				}, function(e) {
					i.trace("setRemoteDescriptionOnFailure", e), n && n(e)
				})
			}, o.prototype.close = function() {
				this.trace("stop"), "closed" != this.peerconnection.signalingState && this.peerconnection.close()
			}, o.prototype.createOffer = function(e, t, n) {
				var i = this;
				return this.trace("createOffer", n), this.peerconnection.createOffer(n).then(function(t) {
					i.trace("createOfferOnSuccess", r(t)), e && e(t)
				}, function(e) {
					i.trace("createOfferOnFailure", e), t && t(e)
				})
			}, o.prototype.createAnswer = function(e, t, n) {
				var i = this;
				return this.trace("createAnswer", n), this.peerconnection.createAnswer(n).then(function(t) {
					i.trace("createAnswerOnSuccess", r(t)), e && e(t)
				}, function(e) {
					i.trace("createAnswerOnFailure", e), t && t(e)
				})
			}, o.prototype.addIceCandidate = function(e, t, n) {
				var r = this;
				return this.trace("addIceCandidate", e), this.peerconnection.addIceCandidate(e).then(function() {
					t && t()
				}, function(e) {
					r.trace("addIceCandidateOnFailure", e), n && n(e)
				})
			}, o.prototype.getStats = function() {
				this.peerconnection.getStats.apply(this.peerconnection, arguments)
			}, t.exports = o
		}, {
			util: 67,
			"webrtc-adapter": 68,
			wildemitter: 78
		}],
		65: [function(t, n, r) {
			(function(t) {
				! function(i) {
					function o(e) {
						for (var t, n, r = [], i = 0, o = e.length; o > i;) t = e.charCodeAt(i++), t >= 55296 && 56319 >= t && o > i ? (n = e.charCodeAt(i++), 56320 == (64512 & n) ? r.push(((1023 & t) << 10) + (1023 & n) + 65536) : (r.push(t), i--)) : r.push(t);
						return r
					}

					function a(e) {
						for (var t, n = e.length, r = -1, i = ""; ++r < n;) t = e[r], t > 65535 && (t -= 65536, i += w(t >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), i += w(t);
						return i
					}

					function s(e) {
						if (e >= 55296 && 57343 >= e) throw Error("Lone surrogate U+" + e.toString(16).toUpperCase() + " is not a scalar value")
					}

					function c(e, t) {
						return w(e >> t & 63 | 128)
					}

					function p(e) {
						if (0 == (4294967168 & e)) return w(e);
						var t = "";
						return 0 == (4294965248 & e) ? t = w(e >> 6 & 31 | 192) : 0 == (4294901760 & e) ? (s(e), t = w(e >> 12 & 15 | 224), t += c(e, 6)) : 0 == (4292870144 & e) && (t = w(e >> 18 & 7 | 240), t += c(e, 12), t += c(e, 6)), t += w(63 & e | 128)
					}

					function d(e) {
						for (var t, n = o(e), r = n.length, i = -1, a = ""; ++i < r;) t = n[i], a += p(t);
						return a
					}

					function u() {
						if (b >= y) throw Error("Invalid byte index");
						var e = 255 & v[b];
						if (b++, 128 == (192 & e)) return 63 & e;
						throw Error("Invalid continuation byte")
					}

					function l() {
						var e, t, n, r, i;
						if (b > y) throw Error("Invalid byte index");
						if (b == y) return !1;
						if (e = 255 & v[b], b++, 0 == (128 & e)) return e;
						if (192 == (224 & e)) {
							var t = u();
							if (i = (31 & e) << 6 | t, i >= 128) return i;
							throw Error("Invalid continuation byte")
						}
						if (224 == (240 & e)) {
							if (t = u(), n = u(), i = (15 & e) << 12 | t << 6 | n, i >= 2048) return s(i), i;
							throw Error("Invalid continuation byte")
						}
						if (240 == (248 & e) && (t = u(), n = u(), r = u(), i = (15 & e) << 18 | t << 12 | n << 6 | r, i >= 65536 && 1114111 >= i)) return i;
						throw Error("Invalid UTF-8 detected")
					}

					function f(e) {
						v = o(e), y = v.length, b = 0;
						for (var t, n = [];
							(t = l()) !== !1;) n.push(t);
						return a(n)
					}
					var h = "object" == typeof r && r,
						m = "object" == typeof n && n && n.exports == h && n,
						g = "object" == typeof t && t;
					g.global !== g && g.window !== g || (i = g);
					var v, y, b, w = String.fromCharCode,
						S = {
							version: "2.0.0",
							encode: d,
							decode: f
						};
					if ("function" == typeof e && "object" == typeof e.amd && e.amd) e(function() {
						return S
					});
					else if (h && !h.nodeType)
						if (m) m.exports = S;
						else {
							var C = {},
								k = C.hasOwnProperty;
							for (var E in S) k.call(S, E) && (h[E] = S[E])
						}
					else i.utf8 = S
				}(this)
			}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
		}, {}],
		66: [function(e, t, n) {
			t.exports = function(e) {
				return e && "object" == typeof e && "function" == typeof e.copy && "function" == typeof e.fill && "function" == typeof e.readUInt8
			}
		}, {}],
		67: [function(e, t, n) {
			(function(t, r) {
				function i(e, t) {
					var r = {
						seen: [],
						stylize: a
					};
					return arguments.length >= 3 && (r.depth = arguments[2]), arguments.length >= 4 && (r.colors = arguments[3]), m(t) ? r.showHidden = t : t && n._extend(r, t), S(r.showHidden) && (r.showHidden = !1), S(r.depth) && (r.depth = 2), S(r.colors) && (r.colors = !1), S(r.customInspect) && (r.customInspect = !0), r.colors && (r.stylize = o), c(r, e, r.depth)
				}

				function o(e, t) {
					var n = i.styles[t];
					return n ? "[" + i.colors[n][0] + "m" + e + "[" + i.colors[n][1] + "m" : e
				}

				function a(e, t) {
					return e
				}

				function s(e) {
					var t = {};
					return e.forEach(function(e, n) {
						t[e] = !0
					}), t
				}

				function c(e, t, r) {
					if (e.customInspect && t && x(t.inspect) && t.inspect !== n.inspect && (!t.constructor || t.constructor.prototype !== t)) {
						var i = t.inspect(r, e);
						return b(i) || (i = c(e, i, r)), i
					}
					var o = p(e, t);
					if (o) return o;
					var a = Object.keys(t),
						m = s(a);
					if (e.showHidden && (a = Object.getOwnPropertyNames(t)), T(t) && (a.indexOf("message") >= 0 || a.indexOf("description") >= 0)) return d(t);
					if (0 === a.length) {
						if (x(t)) {
							var g = t.name ? ": " + t.name : "";
							return e.stylize("[Function" + g + "]", "special")
						}
						if (C(t)) return e.stylize(RegExp.prototype.toString.call(t), "regexp");
						if (E(t)) return e.stylize(Date.prototype.toString.call(t), "date");
						if (T(t)) return d(t)
					}
					var v = "",
						y = !1,
						w = ["{", "}"];
					if (h(t) && (y = !0, w = ["[", "]"]), x(t)) {
						var S = t.name ? ": " + t.name : "";
						v = " [Function" + S + "]"
					}
					if (C(t) && (v = " " + RegExp.prototype.toString.call(t)), E(t) && (v = " " + Date.prototype.toUTCString.call(t)), T(t) && (v = " " + d(t)), 0 === a.length && (!y || 0 == t.length)) return w[0] + v + w[1];
					if (0 > r) return C(t) ? e.stylize(RegExp.prototype.toString.call(t), "regexp") : e.stylize("[Object]", "special");
					e.seen.push(t);
					var k;
					return k = y ? u(e, t, r, m, a) : a.map(function(n) {
						return l(e, t, r, m, n, y)
					}), e.seen.pop(), f(k, v, w)
				}

				function p(e, t) {
					if (S(t)) return e.stylize("undefined", "undefined");
					if (b(t)) {
						var n = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
						return e.stylize(n, "string")
					}
					return y(t) ? e.stylize("" + t, "number") : m(t) ? e.stylize("" + t, "boolean") : g(t) ? e.stylize("null", "null") : void 0
				}

				function d(e) {
					return "[" + Error.prototype.toString.call(e) + "]"
				}

				function u(e, t, n, r, i) {
					for (var o = [], a = 0, s = t.length; s > a; ++a) M(t, String(a)) ? o.push(l(e, t, n, r, String(a), !0)) : o.push("");
					return i.forEach(function(i) {
						i.match(/^\d+$/) || o.push(l(e, t, n, r, i, !0))
					}), o
				}

				function l(e, t, n, r, i, o) {
					var a, s, p;
					if (p = Object.getOwnPropertyDescriptor(t, i) || {
							value: t[i]
						}, p.get ? s = p.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : p.set && (s = e.stylize("[Setter]", "special")), M(r, i) || (a = "[" + i + "]"), s || (e.seen.indexOf(p.value) < 0 ? (s = g(n) ? c(e, p.value, null) : c(e, p.value, n - 1), s.indexOf("\n") > -1 && (s = o ? s.split("\n").map(function(e) {
							return "  " + e
						}).join("\n").substr(2) : "\n" + s.split("\n").map(function(e) {
							return "   " + e
						}).join("\n"))) : s = e.stylize("[Circular]", "special")), S(a)) {
						if (o && i.match(/^\d+$/)) return s;
						a = JSON.stringify("" + i), a.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (a = a.substr(1, a.length - 2), a = e.stylize(a, "name")) : (a = a.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), a = e.stylize(a, "string"))
					}
					return a + ": " + s
				}

				function f(e, t, n) {
					var r = 0,
						i = e.reduce(function(e, t) {
							return r++, t.indexOf("\n") >= 0 && r++, e + t.replace(/\u001b\[\d\d?m/g, "").length + 1
						}, 0);
					return i > 60 ? n[0] + ("" === t ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + n[1] : n[0] + t + " " + e.join(", ") + " " + n[1]
				}

				function h(e) {
					return Array.isArray(e)
				}

				function m(e) {
					return "boolean" == typeof e
				}

				function g(e) {
					return null === e
				}

				function v(e) {
					return null == e
				}

				function y(e) {
					return "number" == typeof e
				}

				function b(e) {
					return "string" == typeof e
				}

				function w(e) {
					return "symbol" == typeof e
				}

				function S(e) {
					return void 0 === e
				}

				function C(e) {
					return k(e) && "[object RegExp]" === R(e)
				}

				function k(e) {
					return "object" == typeof e && null !== e
				}

				function E(e) {
					return k(e) && "[object Date]" === R(e)
				}

				function T(e) {
					return k(e) && ("[object Error]" === R(e) || e instanceof Error)
				}

				function x(e) {
					return "function" == typeof e
				}

				function P(e) {
					return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || "undefined" == typeof e
				}

				function R(e) {
					return Object.prototype.toString.call(e)
				}

				function D(e) {
					return 10 > e ? "0" + e.toString(10) : e.toString(10)
				}

				function O() {
					var e = new Date,
						t = [D(e.getHours()), D(e.getMinutes()), D(e.getSeconds())].join(":");
					return [e.getDate(), _[e.getMonth()], t].join(" ")
				}

				function M(e, t) {
					return Object.prototype.hasOwnProperty.call(e, t)
				}
				var A = /%[sdj%]/g;
				n.format = function(e) {
					if (!b(e)) {
						for (var t = [], n = 0; n < arguments.length; n++) t.push(i(arguments[n]));
						return t.join(" ")
					}
					for (var n = 1, r = arguments, o = r.length, a = String(e).replace(A, function(e) {
							if ("%%" === e) return "%";
							if (n >= o) return e;
							switch (e) {
								case "%s":
									return String(r[n++]);
								case "%d":
									return Number(r[n++]);
								case "%j":
									try {
										return JSON.stringify(r[n++])
									} catch (t) {
										return "[Circular]"
									}
								default:
									return e
							}
						}), s = r[n]; o > n; s = r[++n]) a += g(s) || !k(s) ? " " + s : " " + i(s);
					return a
				}, n.deprecate = function(e, i) {
					function o() {
						if (!a) {
							if (t.throwDeprecation) throw new Error(i);
							t.traceDeprecation ? console.trace(i) : console.error(i), a = !0
						}
						return e.apply(this, arguments)
					}
					if (S(r.process)) return function() {
						return n.deprecate(e, i).apply(this, arguments)
					};
					if (t.noDeprecation === !0) return e;
					var a = !1;
					return o
				};
				var j, I = {};
				n.debuglog = function(e) {
					if (S(j) && (j = t.env.NODE_DEBUG || ""), e = e.toUpperCase(), !I[e])
						if (new RegExp("\\b" + e + "\\b", "i").test(j)) {
							var r = t.pid;
							I[e] = function() {
								var t = n.format.apply(n, arguments);
								console.error("%s %d: %s", e, r, t)
							}
						} else I[e] = function() {};
					return I[e]
				}, n.inspect = i, i.colors = {
					bold: [1, 22],
					italic: [3, 23],
					underline: [4, 24],
					inverse: [7, 27],
					white: [37, 39],
					grey: [90, 39],
					black: [30, 39],
					blue: [34, 39],
					cyan: [36, 39],
					green: [32, 39],
					magenta: [35, 39],
					red: [31, 39],
					yellow: [33, 39]
				}, i.styles = {
					special: "cyan",
					number: "yellow",
					"boolean": "yellow",
					undefined: "grey",
					"null": "bold",
					string: "green",
					date: "magenta",
					regexp: "red"
				}, n.isArray = h, n.isBoolean = m, n.isNull = g, n.isNullOrUndefined = v, n.isNumber = y, n.isString = b, n.isSymbol = w, n.isUndefined = S, n.isRegExp = C, n.isObject = k, n.isDate = E, n.isError = T, n.isFunction = x, n.isPrimitive = P, n.isBuffer = e("./support/isBuffer");
				var _ = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
				n.log = function() {
					console.log("%s - %s", O(), n.format.apply(n, arguments))
				}, n.inherits = e("inherits"), n._extend = function(e, t) {
					if (!t || !k(t)) return e;
					for (var n = Object.keys(t), r = n.length; r--;) e[n[r]] = t[n[r]];
					return e
				}
			}).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
		}, {
			"./support/isBuffer": 66,
			_process: 46,
			inherits: 34
		}],
		68: [function(e, t, n) {
			"use strict";
			! function() {
				var n = e("./utils").log,
					r = e("./utils").browserDetails;
				t.exports.browserDetails = r, t.exports.extractVersion = e("./utils").extractVersion, t.exports.disableLog = e("./utils").disableLog;
				var i = e("./chrome/chrome_shim") || null,
					o = e("./edge/edge_shim") || null,
					a = e("./firefox/firefox_shim") || null,
					s = e("./safari/safari_shim") || null;
				switch (r.browser) {
					case "opera":
					case "chrome":
						if (!i || !i.shimPeerConnection) return void n("Chrome shim is not included in this adapter release.");
						n("adapter.js shimming chrome."), t.exports.browserShim = i, i.shimGetUserMedia(), i.shimMediaStream(), i.shimSourceObject(), i.shimPeerConnection(), i.shimOnTrack();
						break;
					case "firefox":
						if (!a || !a.shimPeerConnection) return void n("Firefox shim is not included in this adapter release.");
						n("adapter.js shimming firefox."), t.exports.browserShim = a, a.shimGetUserMedia(), a.shimSourceObject(), a.shimPeerConnection(), a.shimOnTrack();
						break;
					case "edge":
						if (!o || !o.shimPeerConnection) return void n("MS edge shim is not included in this adapter release.");
						n("adapter.js shimming edge."), t.exports.browserShim = o, o.shimGetUserMedia(), o.shimPeerConnection();
						break;
					case "safari":
						if (!s) return void n("Safari shim is not included in this adapter release.");
						n("adapter.js shimming safari."), t.exports.browserShim = s, s.shimGetUserMedia();
						break;
					default:
						n("Unsupported browser!")
				}
			}()
		}, {
			"./chrome/chrome_shim": 69,
			"./edge/edge_shim": 71,
			"./firefox/firefox_shim": 73,
			"./safari/safari_shim": 75,
			"./utils": 76
		}],
		69: [function(e, t, n) {
			"use strict";
			var r = e("../utils.js").log,
				i = e("../utils.js").browserDetails,
				o = {
					shimMediaStream: function() {
						window.MediaStream = window.MediaStream || window.webkitMediaStream
					},
					shimOnTrack: function() {
						"object" != typeof window || !window.RTCPeerConnection || "ontrack" in window.RTCPeerConnection.prototype || Object.defineProperty(window.RTCPeerConnection.prototype, "ontrack", {
							get: function() {
								return this._ontrack
							},
							set: function(e) {
								var t = this;
								this._ontrack && (this.removeEventListener("track", this._ontrack), this.removeEventListener("addstream", this._ontrackpoly)), this.addEventListener("track", this._ontrack = e), this.addEventListener("addstream", this._ontrackpoly = function(e) {
									e.stream.addEventListener("addtrack", function(n) {
										var r = new Event("track");
										r.track = n.track, r.receiver = {
											track: n.track
										}, r.streams = [e.stream], t.dispatchEvent(r)
									}), e.stream.getTracks().forEach(function(t) {
										var n = new Event("track");
										n.track = t, n.receiver = {
											track: t
										}, n.streams = [e.stream], this.dispatchEvent(n)
									}.bind(this))
								}.bind(this))
							}
						})
					},
					shimSourceObject: function() {
						"object" == typeof window && (!window.HTMLMediaElement || "srcObject" in window.HTMLMediaElement.prototype || Object.defineProperty(window.HTMLMediaElement.prototype, "srcObject", {
							get: function() {
								return this._srcObject
							},
							set: function(e) {
								var t = this;
								return this._srcObject = e, this.src && URL.revokeObjectURL(this.src), e ? (this.src = URL.createObjectURL(e), e.addEventListener("addtrack", function() {
									t.src && URL.revokeObjectURL(t.src), t.src = URL.createObjectURL(e)
								}), void e.addEventListener("removetrack", function() {
									t.src && URL.revokeObjectURL(t.src), t.src = URL.createObjectURL(e)
								})) : void(this.src = "")
							}
						}))
					},
					shimPeerConnection: function() {
						window.RTCPeerConnection = function(e, t) {
							r("PeerConnection"), e && e.iceTransportPolicy && (e.iceTransports = e.iceTransportPolicy);
							var n = new webkitRTCPeerConnection(e, t),
								i = n.getStats.bind(n);
							return n.getStats = function(e, t, n) {
								var r = this,
									o = arguments;
								if (arguments.length > 0 && "function" == typeof e) return i(e, t);
								var a = function(e) {
										var t = {},
											n = e.result();
										return n.forEach(function(e) {
											var n = {
												id: e.id,
												timestamp: e.timestamp,
												type: e.type
											};
											e.names().forEach(function(t) {
												n[t] = e.stat(t)
											}), t[n.id] = n
										}), t
									},
									s = function(e, t) {
										var n = new Map(Object.keys(e).map(function(t) {
											return [t, e[t]]
										}));
										return t = t || e, Object.keys(t).forEach(function(e) {
											n[e] = t[e]
										}), n
									};
								if (arguments.length >= 2) {
									var c = function(e) {
										o[1](s(a(e)))
									};
									return i.apply(this, [c, arguments[0]])
								}
								return new Promise(function(t, n) {
									1 === o.length && "object" == typeof e ? i.apply(r, [function(e) {
										t(s(a(e)))
									}, n]) : i.apply(r, [function(e) {
										t(s(a(e), e.result()))
									}, n])
								}).then(t, n)
							}, n
						}, window.RTCPeerConnection.prototype = webkitRTCPeerConnection.prototype, webkitRTCPeerConnection.generateCertificate && Object.defineProperty(window.RTCPeerConnection, "generateCertificate", {
							get: function() {
								return webkitRTCPeerConnection.generateCertificate
							}
						}), i.version < 51 && (["createOffer", "createAnswer"].forEach(function(e) {
							var t = webkitRTCPeerConnection.prototype[e];
							webkitRTCPeerConnection.prototype[e] = function() {
								var e = this;
								if (arguments.length < 1 || 1 === arguments.length && "object" == typeof arguments[0]) {
									var n = 1 === arguments.length ? arguments[0] : void 0;
									return new Promise(function(r, i) {
										t.apply(e, [r, i, n])
									})
								}
								return t.apply(this, arguments)
							}
						}), ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(e) {
							var t = webkitRTCPeerConnection.prototype[e];
							webkitRTCPeerConnection.prototype[e] = function() {
								var e = arguments,
									n = this,
									r = new Promise(function(r, i) {
										t.apply(n, [e[0], r, i])
									});
								return e.length < 2 ? r : r.then(function() {
									e[1].apply(null, [])
								}, function(t) {
									e.length >= 3 && e[2].apply(null, [t])
								})
							}
						}));
						var e = RTCPeerConnection.prototype.addIceCandidate;
						RTCPeerConnection.prototype.addIceCandidate = function() {
							return null === arguments[0] ? Promise.resolve() : e.apply(this, arguments)
						}, ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(e) {
							var t = webkitRTCPeerConnection.prototype[e];
							webkitRTCPeerConnection.prototype[e] = function() {
								return arguments[0] = new("addIceCandidate" === e ? RTCIceCandidate : RTCSessionDescription)(arguments[0]), t.apply(this, arguments)
							}
						})
					},
					attachMediaStream: function(e, t) {
						r("DEPRECATED, attachMediaStream will soon be removed."), i.version >= 43 ? e.srcObject = t : "undefined" != typeof e.src ? e.src = URL.createObjectURL(t) : r("Error attaching stream to element.")
					},
					reattachMediaStream: function(e, t) {
						r("DEPRECATED, reattachMediaStream will soon be removed."), i.version >= 43 ? e.srcObject = t.srcObject : e.src = t.src
					}
				};
			t.exports = {
				shimMediaStream: o.shimMediaStream,
				shimOnTrack: o.shimOnTrack,
				shimSourceObject: o.shimSourceObject,
				shimPeerConnection: o.shimPeerConnection,
				shimGetUserMedia: e("./getusermedia"),
				attachMediaStream: o.attachMediaStream,
				reattachMediaStream: o.reattachMediaStream
			}
		}, {
			"../utils.js": 76,
			"./getusermedia": 70
		}],
		70: [function(e, t, n) {
			"use strict";
			var r = e("../utils.js").log;
			t.exports = function() {
				var e = function(e) {
						if ("object" != typeof e || e.mandatory || e.optional) return e;
						var t = {};
						return Object.keys(e).forEach(function(n) {
							if ("require" !== n && "advanced" !== n && "mediaSource" !== n) {
								var r = "object" == typeof e[n] ? e[n] : {
									ideal: e[n]
								};
								void 0 !== r.exact && "number" == typeof r.exact && (r.min = r.max = r.exact);
								var i = function(e, t) {
									return e ? e + t.charAt(0).toUpperCase() + t.slice(1) : "deviceId" === t ? "sourceId" : t
								};
								if (void 0 !== r.ideal) {
									t.optional = t.optional || [];
									var o = {};
									"number" == typeof r.ideal ? (o[i("min", n)] = r.ideal, t.optional.push(o), o = {}, o[i("max", n)] = r.ideal, t.optional.push(o)) : (o[i("", n)] = r.ideal, t.optional.push(o))
								}
								void 0 !== r.exact && "number" != typeof r.exact ? (t.mandatory = t.mandatory || {}, t.mandatory[i("", n)] = r.exact) : ["min", "max"].forEach(function(e) {
									void 0 !== r[e] && (t.mandatory = t.mandatory || {}, t.mandatory[i(e, n)] = r[e])
								})
							}
						}), e.advanced && (t.optional = (t.optional || []).concat(e.advanced)), t
					},
					t = function(t, n) {
						if (t = JSON.parse(JSON.stringify(t)), t && t.audio && (t.audio = e(t.audio)), t && "object" == typeof t.video) {
							var i = t.video.facingMode;
							if (i = i && ("object" == typeof i ? i : {
									ideal: i
								}), i && ("user" === i.exact || "environment" === i.exact || "user" === i.ideal || "environment" === i.ideal) && (!navigator.mediaDevices.getSupportedConstraints || !navigator.mediaDevices.getSupportedConstraints().facingMode) && (delete t.video.facingMode, "environment" === i.exact || "environment" === i.ideal)) return navigator.mediaDevices.enumerateDevices().then(function(o) {
								o = o.filter(function(e) {
									return "videoinput" === e.kind
								});
								var a = o.find(function(e) {
									return -1 !== e.label.toLowerCase().indexOf("back")
								}) || o.length && o[o.length - 1];
								return a && (t.video.deviceId = i.exact ? {
									exact: a.deviceId
								} : {
									ideal: a.deviceId
								}), t.video = e(t.video), r("chrome: " + JSON.stringify(t)), n(t)
							});
							t.video = e(t.video)
						}
						return r("chrome: " + JSON.stringify(t)), n(t)
					},
					n = function(e) {
						return {
							name: {
								PermissionDeniedError: "NotAllowedError",
								ConstraintNotSatisfiedError: "OverconstrainedError"
							}[e.name] || e.name,
							message: e.message,
							constraint: e.constraintName,
							toString: function() {
								return this.name + (this.message && ": ") + this.message
							}
						}
					},
					i = function(e, r, i) {
						t(e, function(e) {
							navigator.webkitGetUserMedia(e, r, function(e) {
								i(n(e))
							})
						})
					};
				navigator.getUserMedia = i;
				var o = function(e) {
					return new Promise(function(t, n) {
						navigator.getUserMedia(e, t, n)
					})
				};
				if (navigator.mediaDevices || (navigator.mediaDevices = {
						getUserMedia: o,
						enumerateDevices: function() {
							return new Promise(function(e) {
								var t = {
									audio: "audioinput",
									video: "videoinput"
								};
								return MediaStreamTrack.getSources(function(n) {
									e(n.map(function(e) {
										return {
											label: e.label,
											kind: t[e.kind],
											deviceId: e.id,
											groupId: ""
										}
									}))
								})
							})
						}
					}), navigator.mediaDevices.getUserMedia) {
					var a = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
					navigator.mediaDevices.getUserMedia = function(e) {
						return t(e, function(e) {
							return a(e)["catch"](function(e) {
								return Promise.reject(n(e))
							})
						})
					}
				} else navigator.mediaDevices.getUserMedia = function(e) {
					return o(e)
				};
				"undefined" == typeof navigator.mediaDevices.addEventListener && (navigator.mediaDevices.addEventListener = function() {
					r("Dummy mediaDevices.addEventListener called.")
				}), "undefined" == typeof navigator.mediaDevices.removeEventListener && (navigator.mediaDevices.removeEventListener = function() {
					r("Dummy mediaDevices.removeEventListener called.")
				})
			}
		}, {
			"../utils.js": 76
		}],
		71: [function(e, t, n) {
			"use strict";
			var r = e("sdp"),
				i = e("../utils").log,
				o = {
					shimPeerConnection: function() {
						window.RTCIceGatherer && (window.RTCIceCandidate || (window.RTCIceCandidate = function(e) {
							return e
						}), window.RTCSessionDescription || (window.RTCSessionDescription = function(e) {
							return e
						})), window.RTCPeerConnection = function(e) {
							var t = this,
								n = document.createDocumentFragment();
							if (["addEventListener", "removeEventListener", "dispatchEvent"].forEach(function(e) {
									t[e] = n[e].bind(n)
								}), this.onicecandidate = null, this.onaddstream = null, this.ontrack = null, this.onremovestream = null, this.onsignalingstatechange = null, this.oniceconnectionstatechange = null, this.onnegotiationneeded = null, this.ondatachannel = null, this.localStreams = [], this.remoteStreams = [], this.getLocalStreams = function() {
									return t.localStreams
								}, this.getRemoteStreams = function() {
									return t.remoteStreams
								}, this.localDescription = new RTCSessionDescription({
									type: "",
									sdp: ""
								}), this.remoteDescription = new RTCSessionDescription({
									type: "",
									sdp: ""
								}), this.signalingState = "stable", this.iceConnectionState = "new", this.iceGatheringState = "new", this.iceOptions = {
									gatherPolicy: "all",
									iceServers: []
								}, e && e.iceTransportPolicy) switch (e.iceTransportPolicy) {
								case "all":
								case "relay":
									this.iceOptions.gatherPolicy = e.iceTransportPolicy;
									break;
								case "none":
									throw new TypeError('iceTransportPolicy "none" not supported')
							}
							e && e.iceServers && (this.iceOptions.iceServers = e.iceServers.filter(function(e) {
								return e && e.urls ? (e.urls = e.urls.filter(function(e) {
									return 0 === e.indexOf("turn:") && -1 !== e.indexOf("transport=udp")
								})[0], !!e.urls) : !1
							})), this.transceivers = [], this._localIceCandidatesBuffer = []
						}, window.RTCPeerConnection.prototype._emitBufferedCandidates = function() {
							var e = this,
								t = r.splitSections(e.localDescription.sdp);
							this._localIceCandidatesBuffer.forEach(function(n) {
								var r = !n.candidate || 0 === Object.keys(n.candidate).length;
								if (r)
									for (var i = 1; i < t.length; i++) - 1 === t[i].indexOf("\r\na=end-of-candidates\r\n") && (t[i] += "a=end-of-candidates\r\n");
								else -1 === n.candidate.candidate.indexOf("typ endOfCandidates") && (t[n.candidate.sdpMLineIndex + 1] += "a=" + n.candidate.candidate + "\r\n");
								if (e.localDescription.sdp = t.join(""), e.dispatchEvent(n), null !== e.onicecandidate && e.onicecandidate(n), !n.candidate && "complete" !== e.iceGatheringState) {
									var o = e.transceivers.every(function(e) {
										return e.iceGatherer && "completed" === e.iceGatherer.state
									});
									o && (e.iceGatheringState = "complete")
								}
							}), this._localIceCandidatesBuffer = []
						}, window.RTCPeerConnection.prototype.addStream = function(e) {
							this.localStreams.push(e.clone()), this._maybeFireNegotiationNeeded()
						}, window.RTCPeerConnection.prototype.removeStream = function(e) {
							var t = this.localStreams.indexOf(e);
							t > -1 && (this.localStreams.splice(t, 1), this._maybeFireNegotiationNeeded())
						}, window.RTCPeerConnection.prototype.getSenders = function() {
							return this.transceivers.filter(function(e) {
								return !!e.rtpSender
							}).map(function(e) {
								return e.rtpSender
							})
						}, window.RTCPeerConnection.prototype.getReceivers = function() {
							return this.transceivers.filter(function(e) {
								return !!e.rtpReceiver
							}).map(function(e) {
								return e.rtpReceiver
							})
						}, window.RTCPeerConnection.prototype._getCommonCapabilities = function(e, t) {
							var n = {
								codecs: [],
								headerExtensions: [],
								fecMechanisms: []
							};
							return e.codecs.forEach(function(e) {
								for (var r = 0; r < t.codecs.length; r++) {
									var i = t.codecs[r];
									if (e.name.toLowerCase() === i.name.toLowerCase() && e.clockRate === i.clockRate && e.numChannels === i.numChannels) {
										n.codecs.push(i);
										break
									}
								}
							}), e.headerExtensions.forEach(function(e) {
								for (var r = 0; r < t.headerExtensions.length; r++) {
									var i = t.headerExtensions[r];
									if (e.uri === i.uri) {
										n.headerExtensions.push(i);
										break
									}
								}
							}), n
						}, window.RTCPeerConnection.prototype._createIceAndDtlsTransports = function(e, t) {
							var n = this,
								i = new RTCIceGatherer(n.iceOptions),
								o = new RTCIceTransport(i);
							i.onlocalcandidate = function(a) {
								var s = new Event("icecandidate");
								s.candidate = {
									sdpMid: e,
									sdpMLineIndex: t
								};
								var c = a.candidate,
									p = !c || 0 === Object.keys(c).length;
								p ? (void 0 === i.state && (i.state = "completed"), s.candidate.candidate = "candidate:1 1 udp 1 0.0.0.0 9 typ endOfCandidates") : (c.component = "RTCP" === o.component ? 2 : 1, s.candidate.candidate = r.writeCandidate(c));
								var d = n.transceivers.every(function(e) {
									return e.iceGatherer && "completed" === e.iceGatherer.state
								});
								switch (n.iceGatheringState) {
									case "new":
										n._localIceCandidatesBuffer.push(s), p && d && n._localIceCandidatesBuffer.push(new Event("icecandidate"));
										break;
									case "gathering":
										n._emitBufferedCandidates(), n.dispatchEvent(s), null !== n.onicecandidate && n.onicecandidate(s), d && (n.dispatchEvent(new Event("icecandidate")), null !== n.onicecandidate && n.onicecandidate(new Event("icecandidate")), n.iceGatheringState = "complete");
										break;
									case "complete":
								}
							}, o.onicestatechange = function() {
								n._updateConnectionState()
							};
							var a = new RTCDtlsTransport(o);
							return a.ondtlsstatechange = function() {
								n._updateConnectionState()
							}, a.onerror = function() {
								a.state = "failed", n._updateConnectionState()
							}, {
								iceGatherer: i,
								iceTransport: o,
								dtlsTransport: a
							}
						}, window.RTCPeerConnection.prototype._transceive = function(e, t, n) {
							var i = this._getCommonCapabilities(e.localCapabilities, e.remoteCapabilities);
							t && e.rtpSender && (i.encodings = e.sendEncodingParameters, i.rtcp = {
								cname: r.localCName
							}, e.recvEncodingParameters.length && (i.rtcp.ssrc = e.recvEncodingParameters[0].ssrc), e.rtpSender.send(i)), n && e.rtpReceiver && (i.encodings = e.recvEncodingParameters, i.rtcp = {
								cname: e.cname
							}, e.sendEncodingParameters.length && (i.rtcp.ssrc = e.sendEncodingParameters[0].ssrc), e.rtpReceiver.receive(i))
						}, window.RTCPeerConnection.prototype.setLocalDescription = function(e) {
							var t, n, i = this;
							if ("offer" === e.type) this._pendingOffer && (t = r.splitSections(e.sdp), n = t.shift(), t.forEach(function(e, t) {
								var n = r.parseRtpParameters(e);
								i._pendingOffer[t].localCapabilities = n
							}), this.transceivers = this._pendingOffer, delete this._pendingOffer);
							else if ("answer" === e.type) {
								t = r.splitSections(i.remoteDescription.sdp), n = t.shift();
								var o = r.matchPrefix(n, "a=ice-lite").length > 0;
								t.forEach(function(e, t) {
									var a = i.transceivers[t],
										s = a.iceGatherer,
										c = a.iceTransport,
										p = a.dtlsTransport,
										d = a.localCapabilities,
										u = a.remoteCapabilities,
										l = "0" === e.split("\n", 1)[0].split(" ", 2)[1];
									if (!l) {
										var f = r.getIceParameters(e, n);
										if (o) {
											var h = r.matchPrefix(e, "a=candidate:").map(function(e) {
												return r.parseCandidate(e)
											}).filter(function(e) {
												return "1" === e.component
											});
											c.setRemoteCandidates(h)
										}
										c.start(s, f, o ? "controlling" : "controlled");
										var m = r.getDtlsParameters(e, n);
										o && (m.role = "server"), p.start(m);
										var g = i._getCommonCapabilities(d, u);
										i._transceive(a, g.codecs.length > 0, !1)
									}
								})
							}
							switch (this.localDescription = {
								type: e.type,
								sdp: e.sdp
							}, e.type) {
								case "offer":
									this._updateSignalingState("have-local-offer");
									break;
								case "answer":
									this._updateSignalingState("stable");
									break;
								default:
									throw new TypeError('unsupported type "' + e.type + '"')
							}
							var a = arguments.length > 1 && "function" == typeof arguments[1];
							if (a) {
								var s = arguments[1];
								window.setTimeout(function() {
									s(), "new" === i.iceGatheringState && (i.iceGatheringState = "gathering"), i._emitBufferedCandidates()
								}, 0)
							}
							var c = Promise.resolve();
							return c.then(function() {
								a || ("new" === i.iceGatheringState && (i.iceGatheringState = "gathering"), window.setTimeout(i._emitBufferedCandidates.bind(i), 500))
							}), c
						}, window.RTCPeerConnection.prototype.setRemoteDescription = function(e) {
							var t = this,
								n = new MediaStream,
								i = [],
								o = r.splitSections(e.sdp),
								a = o.shift(),
								s = r.matchPrefix(a, "a=ice-lite").length > 0;
							switch (o.forEach(function(o, c) {
								var p, d, u, l, f, h, m, g, v, y, b, w, S = r.splitLines(o),
									C = S[0].substr(2).split(" "),
									k = C[0],
									E = "0" === C[1],
									T = r.getDirection(o, a),
									x = r.parseRtpParameters(o);
								E || (b = r.getIceParameters(o, a), w = r.getDtlsParameters(o, a), w.role = "client"), g = r.parseRtpEncodingParameters(o);
								var P = r.matchPrefix(o, "a=mid:");
								P = P.length ? P[0].substr(6) : r.generateIdentifier();
								var R, D = r.matchPrefix(o, "a=ssrc:").map(function(e) {
									return r.parseSsrcMedia(e)
								}).filter(function(e) {
									return "cname" === e.attribute
								})[0];
								D && (R = D.value);
								var O = r.matchPrefix(o, "a=end-of-candidates").length > 0,
									M = r.matchPrefix(o, "a=candidate:").map(function(e) {
										return r.parseCandidate(e)
									}).filter(function(e) {
										return "1" === e.component
									});
								if ("offer" !== e.type || E) "answer" !== e.type || E || (p = t.transceivers[c], d = p.iceGatherer, u = p.iceTransport, l = p.dtlsTransport, f = p.rtpSender, h = p.rtpReceiver, m = p.sendEncodingParameters, v = p.localCapabilities, t.transceivers[c].recvEncodingParameters = g, t.transceivers[c].remoteCapabilities = x, t.transceivers[c].cname = R, (s || O) && u.setRemoteCandidates(M), u.start(d, b, "controlling"), l.start(w), t._transceive(p, "sendrecv" === T || "recvonly" === T, "sendrecv" === T || "sendonly" === T), !h || "sendrecv" !== T && "sendonly" !== T ? delete p.rtpReceiver : (y = h.track, i.push([y, h]), n.addTrack(y)));
								else {
									var A = t._createIceAndDtlsTransports(P, c);
									if (O && A.iceTransport.setRemoteCandidates(M), v = RTCRtpReceiver.getCapabilities(k), m = [{
											ssrc: 1001 * (2 * c + 2)
										}], h = new RTCRtpReceiver(A.dtlsTransport, k), y = h.track, i.push([y, h]), n.addTrack(y), t.localStreams.length > 0 && t.localStreams[0].getTracks().length >= c) {
										var j = t.localStreams[0].getTracks()[c];
										f = new RTCRtpSender(j, A.dtlsTransport)
									}
									t.transceivers[c] = {
										iceGatherer: A.iceGatherer,
										iceTransport: A.iceTransport,
										dtlsTransport: A.dtlsTransport,
										localCapabilities: v,
										remoteCapabilities: x,
										rtpSender: f,
										rtpReceiver: h,
										kind: k,
										mid: P,
										cname: R,
										sendEncodingParameters: m,
										recvEncodingParameters: g
									}, t._transceive(t.transceivers[c], !1, "sendrecv" === T || "sendonly" === T)
								}
							}), this.remoteDescription = {
								type: e.type,
								sdp: e.sdp
							}, e.type) {
								case "offer":
									this._updateSignalingState("have-remote-offer");
									break;
								case "answer":
									this._updateSignalingState("stable");
									break;
								default:
									throw new TypeError('unsupported type "' + e.type + '"')
							}
							return n.getTracks().length && (t.remoteStreams.push(n), window.setTimeout(function() {
								var e = new Event("addstream");
								e.stream = n, t.dispatchEvent(e), null !== t.onaddstream && window.setTimeout(function() {
									t.onaddstream(e)
								}, 0), i.forEach(function(r) {
									var i = r[0],
										o = r[1],
										a = new Event("track");
									a.track = i, a.receiver = o, a.streams = [n], t.dispatchEvent(e), null !== t.ontrack && window.setTimeout(function() {
										t.ontrack(a)
									}, 0)
								})
							}, 0)), arguments.length > 1 && "function" == typeof arguments[1] && window.setTimeout(arguments[1], 0), Promise.resolve()
						}, window.RTCPeerConnection.prototype.close = function() {
							this.transceivers.forEach(function(e) {
								e.iceTransport && e.iceTransport.stop(), e.dtlsTransport && e.dtlsTransport.stop(), e.rtpSender && e.rtpSender.stop(), e.rtpReceiver && e.rtpReceiver.stop()
							}), this._updateSignalingState("closed")
						}, window.RTCPeerConnection.prototype._updateSignalingState = function(e) {
							this.signalingState = e;
							var t = new Event("signalingstatechange");
							this.dispatchEvent(t), null !== this.onsignalingstatechange && this.onsignalingstatechange(t)
						}, window.RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function() {
							var e = new Event("negotiationneeded");
							this.dispatchEvent(e), null !== this.onnegotiationneeded && this.onnegotiationneeded(e)
						}, window.RTCPeerConnection.prototype._updateConnectionState = function() {
							var e, t = this,
								n = {
									"new": 0,
									closed: 0,
									connecting: 0,
									checking: 0,
									connected: 0,
									completed: 0,
									failed: 0
								};
							if (this.transceivers.forEach(function(e) {
									n[e.iceTransport.state]++, n[e.dtlsTransport.state]++
								}), n.connected += n.completed, e = "new", n.failed > 0 ? e = "failed" : n.connecting > 0 || n.checking > 0 ? e = "connecting" : n.disconnected > 0 ? e = "disconnected" : n["new"] > 0 ? e = "new" : (n.connected > 0 || n.completed > 0) && (e = "connected"), e !== t.iceConnectionState) {
								t.iceConnectionState = e;
								var r = new Event("iceconnectionstatechange");
								this.dispatchEvent(r), null !== this.oniceconnectionstatechange && this.oniceconnectionstatechange(r)
							}
						}, window.RTCPeerConnection.prototype.createOffer = function() {
							var e = this;
							if (this._pendingOffer) throw new Error("createOffer called while there is a pending offer.");
							var t;
							1 === arguments.length && "function" != typeof arguments[0] ? t = arguments[0] : 3 === arguments.length && (t = arguments[2]);
							var n = [],
								i = 0,
								o = 0;
							if (this.localStreams.length && (i = this.localStreams[0].getAudioTracks().length, o = this.localStreams[0].getVideoTracks().length), t) {
								if (t.mandatory || t.optional) throw new TypeError("Legacy mandatory/optional constraints not supported.");
								void 0 !== t.offerToReceiveAudio && (i = t.offerToReceiveAudio), void 0 !== t.offerToReceiveVideo && (o = t.offerToReceiveVideo)
							}
							for (this.localStreams.length && this.localStreams[0].getTracks().forEach(function(e) {
									n.push({
										kind: e.kind,
										track: e,
										wantReceive: "audio" === e.kind ? i > 0 : o > 0
									}), "audio" === e.kind ? i-- : "video" === e.kind && o--
								}); i > 0 || o > 0;) i > 0 && (n.push({
								kind: "audio",
								wantReceive: !0
							}), i--), o > 0 && (n.push({
								kind: "video",
								wantReceive: !0
							}), o--);
							var a = r.writeSessionBoilerplate(),
								s = [];
							n.forEach(function(t, n) {
								var i, o, c = t.track,
									p = t.kind,
									d = r.generateIdentifier(),
									u = e._createIceAndDtlsTransports(d, n),
									l = RTCRtpSender.getCapabilities(p),
									f = [{
										ssrc: 1001 * (2 * n + 1)
									}];
								c && (i = new RTCRtpSender(c, u.dtlsTransport)), t.wantReceive && (o = new RTCRtpReceiver(u.dtlsTransport, p)), s[n] = {
									iceGatherer: u.iceGatherer,
									iceTransport: u.iceTransport,
									dtlsTransport: u.dtlsTransport,
									localCapabilities: l,
									remoteCapabilities: null,
									rtpSender: i,
									rtpReceiver: o,
									kind: p,
									mid: d,
									sendEncodingParameters: f,
									recvEncodingParameters: null
								};
								var h = s[n];
								a += r.writeMediaSection(h, h.localCapabilities, "offer", e.localStreams[0])
							}), this._pendingOffer = s;
							var c = new RTCSessionDescription({
								type: "offer",
								sdp: a
							});
							return arguments.length && "function" == typeof arguments[0] && window.setTimeout(arguments[0], 0, c), Promise.resolve(c)
						}, window.RTCPeerConnection.prototype.createAnswer = function() {
							var e = this,
								t = r.writeSessionBoilerplate();
							this.transceivers.forEach(function(n) {
								var i = e._getCommonCapabilities(n.localCapabilities, n.remoteCapabilities);
								t += r.writeMediaSection(n, i, "answer", e.localStreams[0])
							});
							var n = new RTCSessionDescription({
								type: "answer",
								sdp: t
							});
							return arguments.length && "function" == typeof arguments[0] && window.setTimeout(arguments[0], 0, n), Promise.resolve(n)
						}, window.RTCPeerConnection.prototype.addIceCandidate = function(e) {
							if (null === e) this.transceivers.forEach(function(e) {
								e.iceTransport.addIceCandidate({})
							});
							else {
								var t = e.sdpMLineIndex;
								if (e.sdpMid)
									for (var n = 0; n < this.transceivers.length; n++)
										if (this.transceivers[n].mid === e.sdpMid) {
											t = n;
											break
										}
								var i = this.transceivers[t];
								if (i) {
									var o = Object.keys(e.candidate).length > 0 ? r.parseCandidate(e.candidate) : {};
									if ("tcp" === o.protocol && 0 === o.port) return;
									if ("1" !== o.component) return;
									"endOfCandidates" === o.type && (o = {}), i.iceTransport.addRemoteCandidate(o);
									var a = r.splitSections(this.remoteDescription.sdp);
									a[t + 1] += (o.type ? e.candidate.trim() : "a=end-of-candidates") + "\r\n", this.remoteDescription.sdp = a.join("")
								}
							}
							return arguments.length > 1 && "function" == typeof arguments[1] && window.setTimeout(arguments[1], 0), Promise.resolve()
						}, window.RTCPeerConnection.prototype.getStats = function() {
							var e = [];
							this.transceivers.forEach(function(t) {
								["rtpSender", "rtpReceiver", "iceGatherer", "iceTransport", "dtlsTransport"].forEach(function(n) {
									t[n] && e.push(t[n].getStats())
								})
							});
							var t = arguments.length > 1 && "function" == typeof arguments[1] && arguments[1];
							return new Promise(function(n) {
								var r = new Map;
								Promise.all(e).then(function(e) {
									e.forEach(function(e) {
										Object.keys(e).forEach(function(t) {
											r.set(t, e[t]), r[t] = e[t]
										})
									}), t && window.setTimeout(t, 0, r), n(r)
								})
							})
						}
					},
					attachMediaStream: function(e, t) {
						i("DEPRECATED, attachMediaStream will soon be removed."), e.srcObject = t
					},
					reattachMediaStream: function(e, t) {
						i("DEPRECATED, reattachMediaStream will soon be removed."), e.srcObject = t.srcObject
					}
				};
			t.exports = {
				shimPeerConnection: o.shimPeerConnection,
				shimGetUserMedia: e("./getusermedia"),
				attachMediaStream: o.attachMediaStream,
				reattachMediaStream: o.reattachMediaStream
			}
		}, {
			"../utils": 76,
			"./getusermedia": 72,
			sdp: 53
		}],
		72: [function(e, t, n) {
			"use strict";
			t.exports = function() {
				var e = function(e) {
						return {
							name: {
								PermissionDeniedError: "NotAllowedError"
							}[e.name] || e.name,
							message: e.message,
							constraint: e.constraint,
							toString: function() {
								return this.name
							}
						}
					},
					t = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
				navigator.mediaDevices.getUserMedia = function(n) {
					return t(n)["catch"](function(t) {
						return Promise.reject(e(t))
					})
				}
			}
		}, {}],
		73: [function(e, t, n) {
			"use strict";
			var r = e("../utils").log,
				i = e("../utils").browserDetails,
				o = {
					shimOnTrack: function() {
						"object" != typeof window || !window.RTCPeerConnection || "ontrack" in window.RTCPeerConnection.prototype || Object.defineProperty(window.RTCPeerConnection.prototype, "ontrack", {
							get: function() {
								return this._ontrack
							},
							set: function(e) {
								this._ontrack && (this.removeEventListener("track", this._ontrack), this.removeEventListener("addstream", this._ontrackpoly)), this.addEventListener("track", this._ontrack = e), this.addEventListener("addstream", this._ontrackpoly = function(e) {
									e.stream.getTracks().forEach(function(t) {
										var n = new Event("track");
										n.track = t, n.receiver = {
											track: t
										}, n.streams = [e.stream], this.dispatchEvent(n)
									}.bind(this))
								}.bind(this))
							}
						})
					},
					shimSourceObject: function() {
						"object" == typeof window && (!window.HTMLMediaElement || "srcObject" in window.HTMLMediaElement.prototype || Object.defineProperty(window.HTMLMediaElement.prototype, "srcObject", {
							get: function() {
								return this.mozSrcObject
							},
							set: function(e) {
								this.mozSrcObject = e
							}
						}))
					},
					shimPeerConnection: function() {
						if ("object" == typeof window && (window.RTCPeerConnection || window.mozRTCPeerConnection)) {
							window.RTCPeerConnection || (window.RTCPeerConnection = function(e, t) {
								if (i.version < 38 && e && e.iceServers) {
									for (var n = [], r = 0; r < e.iceServers.length; r++) {
										var o = e.iceServers[r];
										if (o.hasOwnProperty("urls"))
											for (var a = 0; a < o.urls.length; a++) {
												var s = {
													url: o.urls[a]
												};
												0 === o.urls[a].indexOf("turn") && (s.username = o.username, s.credential = o.credential), n.push(s)
											} else n.push(e.iceServers[r])
									}
									e.iceServers = n
								}
								return new mozRTCPeerConnection(e, t)
							}, window.RTCPeerConnection.prototype = mozRTCPeerConnection.prototype, mozRTCPeerConnection.generateCertificate && Object.defineProperty(window.RTCPeerConnection, "generateCertificate", {
								get: function() {
									return mozRTCPeerConnection.generateCertificate
								}
							}), window.RTCSessionDescription = mozRTCSessionDescription, window.RTCIceCandidate = mozRTCIceCandidate), ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(e) {
								var t = RTCPeerConnection.prototype[e];
								RTCPeerConnection.prototype[e] = function() {
									return arguments[0] = new("addIceCandidate" === e ? RTCIceCandidate : RTCSessionDescription)(arguments[0]), t.apply(this, arguments)
								}
							});
							var e = RTCPeerConnection.prototype.addIceCandidate;
							RTCPeerConnection.prototype.addIceCandidate = function() {
								return null === arguments[0] ? Promise.resolve() : e.apply(this, arguments)
							};
							var t = function(e) {
									var t = new Map;
									return Object.keys(e).forEach(function(n) {
										t.set(n, e[n]), t[n] = e[n]
									}), t
								},
								n = RTCPeerConnection.prototype.getStats;
							RTCPeerConnection.prototype.getStats = function(e, r, i) {
								return n.apply(this, [e || null]).then(function(e) {
									return t(e)
								}).then(r, i)
							}
						}
					},
					shimGetUserMedia: function() {
						var e = function(e, t, n) {
							var o = function(e) {
								if ("object" != typeof e || e.require) return e;
								var t = [];
								return Object.keys(e).forEach(function(n) {
									if ("require" !== n && "advanced" !== n && "mediaSource" !== n) {
										var r = e[n] = "object" == typeof e[n] ? e[n] : {
											ideal: e[n]
										};
										if (void 0 === r.min && void 0 === r.max && void 0 === r.exact || t.push(n), void 0 !== r.exact && ("number" == typeof r.exact ? r.min = r.max = r.exact : e[n] = r.exact, delete r.exact), void 0 !== r.ideal) {
											e.advanced = e.advanced || [];
											var i = {};
											"number" == typeof r.ideal ? i[n] = {
												min: r.ideal,
												max: r.ideal
											} : i[n] = r.ideal, e.advanced.push(i), delete r.ideal, Object.keys(r).length || delete e[n]
										}
									}
								}), t.length && (e.require = t), e
							};
							return e = JSON.parse(JSON.stringify(e)), i.version < 38 && (r("spec: " + JSON.stringify(e)), e.audio && (e.audio = o(e.audio)), e.video && (e.video = o(e.video)), r("ff37: " + JSON.stringify(e))), navigator.mozGetUserMedia(e, t, n)
						};
						navigator.getUserMedia = e;
						var t = function(e) {
							return new Promise(function(t, n) {
								navigator.getUserMedia(e, t, n)
							})
						};
						if (navigator.mediaDevices || (navigator.mediaDevices = {
								getUserMedia: t,
								addEventListener: function() {},
								removeEventListener: function() {}
							}), navigator.mediaDevices.enumerateDevices = navigator.mediaDevices.enumerateDevices || function() {
								return new Promise(function(e) {
									var t = [{
										kind: "audioinput",
										deviceId: "default",
										label: "",
										groupId: ""
									}, {
										kind: "videoinput",
										deviceId: "default",
										label: "",
										groupId: ""
									}];
									e(t)
								})
							}, i.version < 41) {
							var n = navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);
							navigator.mediaDevices.enumerateDevices = function() {
								return n().then(void 0, function(e) {
									if ("NotFoundError" === e.name) return [];
									throw e
								})
							}
						}
					},
					attachMediaStream: function(e, t) {
						r("DEPRECATED, attachMediaStream will soon be removed."), e.srcObject = t
					},
					reattachMediaStream: function(e, t) {
						r("DEPRECATED, reattachMediaStream will soon be removed."), e.srcObject = t.srcObject
					}
				};
			t.exports = {
				shimOnTrack: o.shimOnTrack,
				shimSourceObject: o.shimSourceObject,
				shimPeerConnection: o.shimPeerConnection,
				shimGetUserMedia: e("./getusermedia"),
				attachMediaStream: o.attachMediaStream,
				reattachMediaStream: o.reattachMediaStream
			}
		}, {
			"../utils": 76,
			"./getusermedia": 74
		}],
		74: [function(e, t, n) {
			"use strict";
			var r = e("../utils").log,
				i = e("../utils").browserDetails;
			t.exports = function() {
				var e = function(e) {
						return {
							name: {
								SecurityError: "NotAllowedError",
								PermissionDeniedError: "NotAllowedError"
							}[e.name] || e.name,
							message: {
								"The operation is insecure.": "The request is not allowed by the user agent or the platform in the current context."
							}[e.message] || e.message,
							constraint: e.constraint,
							toString: function() {
								return this.name + (this.message && ": ") + this.message
							}
						}
					},
					t = function(t, n, o) {
						var a = function(e) {
							if ("object" != typeof e || e.require) return e;
							var t = [];
							return Object.keys(e).forEach(function(n) {
								if ("require" !== n && "advanced" !== n && "mediaSource" !== n) {
									var r = e[n] = "object" == typeof e[n] ? e[n] : {
										ideal: e[n]
									};
									if (void 0 === r.min && void 0 === r.max && void 0 === r.exact || t.push(n), void 0 !== r.exact && ("number" == typeof r.exact ? r.min = r.max = r.exact : e[n] = r.exact, delete r.exact), void 0 !== r.ideal) {
										e.advanced = e.advanced || [];
										var i = {};
										"number" == typeof r.ideal ? i[n] = {
											min: r.ideal,
											max: r.ideal
										} : i[n] = r.ideal, e.advanced.push(i), delete r.ideal, Object.keys(r).length || delete e[n]
									}
								}
							}), t.length && (e.require = t), e
						};
						return t = JSON.parse(JSON.stringify(t)), i.version < 38 && (r("spec: " + JSON.stringify(t)), t.audio && (t.audio = a(t.audio)), t.video && (t.video = a(t.video)), r("ff37: " + JSON.stringify(t))), navigator.mozGetUserMedia(t, n, function(t) {
							o(e(t))
						})
					};
				navigator.getUserMedia = t;
				var n = function(e) {
					return new Promise(function(t, n) {
						navigator.getUserMedia(e, t, n)
					})
				};
				if (navigator.mediaDevices || (navigator.mediaDevices = {
						getUserMedia: n,
						addEventListener: function() {},
						removeEventListener: function() {}
					}), navigator.mediaDevices.enumerateDevices = navigator.mediaDevices.enumerateDevices || function() {
						return new Promise(function(e) {
							var t = [{
								kind: "audioinput",
								deviceId: "default",
								label: "",
								groupId: ""
							}, {
								kind: "videoinput",
								deviceId: "default",
								label: "",
								groupId: ""
							}];
							e(t)
						})
					}, i.version < 41) {
					var o = navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);
					navigator.mediaDevices.enumerateDevices = function() {
						return o().then(void 0, function(e) {
							if ("NotFoundError" === e.name) return [];
							throw e
						})
					}
				}
				if (i.version < 49) {
					var a = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
					navigator.mediaDevices.getUserMedia = function(t) {
						return a(t)["catch"](function(t) {
							return Promise.reject(e(t))
						})
					}
				}
			}
		}, {
			"../utils": 76
		}],
		75: [function(e, t, n) {
			"use strict";
			var r = {
				shimGetUserMedia: function() {
					navigator.getUserMedia = navigator.webkitGetUserMedia
				}
			};
			t.exports = {
				shimGetUserMedia: r.shimGetUserMedia
			}
		}, {}],
		76: [function(e, t, n) {
			"use strict";
			var r = !0,
				i = {
					disableLog: function(e) {
						return "boolean" != typeof e ? new Error("Argument type: " + typeof e + ". Please use a boolean.") : (r = e, e ? "adapter.js logging disabled" : "adapter.js logging enabled")
					},
					log: function() {
						if ("object" == typeof window) {
							if (r) return;
							"undefined" != typeof console && "function" == typeof console.log && console.log.apply(console, arguments)
						}
					},
					extractVersion: function(e, t, n) {
						var r = e.match(t);
						return r && r.length >= n && parseInt(r[n], 10)
					},
					detectBrowser: function() {
						var e = {};
						if (e.browser = null, e.version = null, e.minVersion = null, "undefined" == typeof window || !window.navigator) return e.browser = "Not a browser.", e;
						if (navigator.mozGetUserMedia) e.browser = "firefox", e.version = this.extractVersion(navigator.userAgent, /Firefox\/([0-9]+)\./, 1), e.minVersion = 31;
						else if (navigator.webkitGetUserMedia)
							if (window.webkitRTCPeerConnection) e.browser = "chrome", e.version = this.extractVersion(navigator.userAgent, /Chrom(e|ium)\/([0-9]+)\./, 2), e.minVersion = 38;
							else {
								if (!navigator.userAgent.match(/Version\/(\d+).(\d+)/)) return e.browser = "Unsupported webkit-based browser with GUM support but no WebRTC support.", e;
								e.browser = "safari", e.version = this.extractVersion(navigator.userAgent, /AppleWebKit\/([0-9]+)\./, 1), e.minVersion = 602
							}
						else {
							if (!navigator.mediaDevices || !navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) return e.browser = "Not a supported browser.", e;
							e.browser = "edge", e.version = this.extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2), e.minVersion = 10547
						}
						return e.version < e.minVersion && i.log("Browser: " + e.browser + " Version: " + e.version + " < minimum supported version: " + e.minVersion + "\n some things might not work!"), e
					}
				};
			t.exports = {
				log: i.log,
				disableLog: i.disableLog,
				browserDetails: i.detectBrowser(),
				extractVersion: i.extractVersion
			}
		}, {}],
		77: [function(e, t, n) {
			var r, i;
			window.mozRTCPeerConnection || navigator.mozGetUserMedia ? (r = "moz", i = parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1], 10)) : (window.webkitRTCPeerConnection || navigator.webkitGetUserMedia) && (r = "webkit", i = navigator.userAgent.match(/Chrom(e|ium)/) && parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2], 10));
			var o = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection,
				a = window.mozRTCIceCandidate || window.RTCIceCandidate,
				s = window.mozRTCSessionDescription || window.RTCSessionDescription,
				c = window.webkitMediaStream || window.MediaStream,
				p = "https:" === window.location.protocol && ("webkit" === r && i >= 26 || "moz" === r && i >= 33),
				d = window.AudioContext || window.webkitAudioContext,
				u = document.createElement("video"),
				l = u && u.canPlayType && "probably" === u.canPlayType('video/webm; codecs="vp8", vorbis'),
				f = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia;
			t.exports = {
				prefix: r,
				browserVersion: i,
				support: !!o && !!f,
				supportRTCPeerConnection: !!o,
				supportVp8: l,
				supportGetUserMedia: !!f,
				supportDataChannel: !!(o && o.prototype && o.prototype.createDataChannel),
				supportWebAudio: !(!d || !d.prototype.createMediaStreamSource),
				supportMediaStream: !(!c || !c.prototype.removeTrack),
				supportScreenSharing: !!p,
				AudioContext: d,
				PeerConnection: o,
				SessionDescription: s,
				IceCandidate: a,
				MediaStream: c,
				getUserMedia: f
			}
		}, {}],
		78: [function(e, t, n) {
			function r() {}
			t.exports = r, r.mixin = function(e) {
				var t = e.prototype || e;
				t.isWildEmitter = !0, t.on = function(e, t, n) {
					this.callbacks = this.callbacks || {};
					var r = 3 === arguments.length,
						i = r ? arguments[1] : void 0,
						o = r ? arguments[2] : arguments[1];
					return o._groupName = i, (this.callbacks[e] = this.callbacks[e] || []).push(o), this
				}, t.once = function(e, t, n) {
					function r() {
						i.off(e, r), s.apply(this, arguments)
					}
					var i = this,
						o = 3 === arguments.length,
						a = o ? arguments[1] : void 0,
						s = o ? arguments[2] : arguments[1];
					return this.on(e, a, r), this
				}, t.releaseGroup = function(e) {
					this.callbacks = this.callbacks || {};
					var t, n, r, i;
					for (t in this.callbacks)
						for (i = this.callbacks[t], n = 0, r = i.length; r > n; n++) i[n]._groupName === e && (i.splice(n, 1), n--, r--);
					return this
				}, t.off = function(e, t) {
					this.callbacks = this.callbacks || {};
					var n, r = this.callbacks[e];
					return r ? 1 === arguments.length ? (delete this.callbacks[e], this) : (n = r.indexOf(t), r.splice(n, 1), 0 === r.length && delete this.callbacks[e], this) : this
				}, t.emit = function(e) {
					this.callbacks = this.callbacks || {};
					var t, n, r, i = [].slice.call(arguments, 1),
						o = this.callbacks[e],
						a = this.getWildcardCallbacks(e);
					if (o)
						for (r = o.slice(), t = 0, n = r.length; n > t && r[t]; ++t) r[t].apply(this, i);
					if (a)
						for (n = a.length, r = a.slice(), t = 0, n = r.length; n > t && r[t]; ++t) r[t].apply(this, [e].concat(i));
					return this
				}, t.getWildcardCallbacks = function(e) {
					this.callbacks = this.callbacks || {};
					var t, n, r = [];
					for (t in this.callbacks) n = t.split("*"), ("*" === t || 2 === n.length && e.slice(0, n[0].length) === n[0]) && (r = r.concat(this.callbacks[t]));
					return r
				}
			}, r.mixin(r)
		}, {}],
		79: [function(e, t, n) {
			function r(e, t, n) {
				var r;
				return r = t ? new o(e, t) : new o(e)
			}
			var i = function() {
					return this
				}(),
				o = i.WebSocket || i.MozWebSocket;
			t.exports = o ? r : null, o && (r.prototype = o.prototype)
		}, {}],
		80: [function(e, t, n) {
			function r(e) {
				var t = this;
				s.call(this), this.id = e.id, this.parent = e.parent, this.type = e.type || "video", this.oneway = e.oneway || !1, this.sharemyscreen = e.sharemyscreen || !1, this.browserPrefix = e.prefix, this.stream = e.stream, this.enableDataChannels = void 0 === e.enableDataChannels ? this.parent.config.enableDataChannels : e.enableDataChannels, this.receiveMedia = e.receiveMedia || this.parent.config.receiveMedia, this.channels = {}, this.sid = e.sid || Date.now().toString(), this.pc = new a(this.parent.config.peerConnectionConfig, this.parent.config.peerConnectionConstraints), this.pc.on("ice", this.onIceCandidate.bind(this)), this.pc.on("endOfCandidates", function(e) {
					t.send("endOfCandidates", e)
				}), this.pc.on("offer", function(e) {
					t.parent.config.nick && (e.nick = t.parent.config.nick), t.send("offer", e)
				}), this.pc.on("answer", function(e) {
					t.parent.config.nick && (e.nick = t.parent.config.nick), t.send("answer", e)
				}), this.pc.on("addStream", this.handleRemoteStreamAdded.bind(this)), this.pc.on("addChannel", this.handleDataChannelAdded.bind(this)), this.pc.on("removeStream", this.handleStreamRemoved.bind(this)), this.pc.on("negotiationNeeded", this.emit.bind(this, "negotiationNeeded")), this.pc.on("iceConnectionStateChange", this.emit.bind(this, "iceConnectionStateChange")), this.pc.on("iceConnectionStateChange", function() {
					switch (t.pc.iceConnectionState) {
						case "failed":
							"offer" === t.pc.pc.peerconnection.localDescription.type && (t.parent.emit("iceFailed", t), t.send("connectivityError"))
					}
				}), this.pc.on("signalingStateChange", this.emit.bind(this, "signalingStateChange")), this.logger = this.parent.logger, "screen" === e.type ? this.parent.localScreen && this.sharemyscreen && (this.logger.log("adding local screen stream to peer connection"), this.pc.addStream(this.parent.localScreen), this.broadcaster = e.broadcaster) : this.parent.localStreams.forEach(function(e) {
					t.pc.addStream(e)
				}), this.on("channelOpen", function(e) {
					e.protocol === p && (e.onmessage = function(n) {
						var r = JSON.parse(n.data),
							i = new c.Receiver;
						i.receive(r, e), t.emit("fileTransfer", r, i), i.on("receivedFile", function(e, t) {
							i.channel.close()
						})
					})
				}), this.on("*", function() {
					t.parent.emit.apply(t.parent, arguments)
				})
			}
			var i = e("util"),
				o = e("webrtcsupport"),
				a = e("rtcpeerconnection"),
				s = e("wildemitter"),
				c = e("filetransfer"),
				p = "https://simplewebrtc.com/protocol/filetransfer#inband-v1";
			i.inherits(r, s), r.prototype.handleMessage = function(e) {
				var t = this;
				if (this.logger.log("getting", e.type, e), e.prefix && (this.browserPrefix = e.prefix), "offer" === e.type) this.nick || (this.nick = e.payload.nick), delete e.payload.nick, this.pc.handleOffer(e.payload, function(e) {
					e || t.pc.answer(function(e, t) {})
				});
				else if ("answer" === e.type) this.nick || (this.nick = e.payload.nick), delete e.payload.nick, this.pc.handleAnswer(e.payload);
				else if ("candidate" === e.type) this.pc.processIce(e.payload);
				else if ("connectivityError" === e.type) this.parent.emit("connectivityError", t);
				else if ("mute" === e.type) this.parent.emit("mute", {
					id: e.from,
					name: e.payload.name
				});
				else if ("unmute" === e.type) this.parent.emit("unmute", {
					id: e.from,
					name: e.payload.name
				});
				else if ("endOfCandidates" === e.type) {
					var n = this.pc.pc.peerconnection.transceivers || [];
					n.forEach(function(e) {
						e.iceTransport && e.iceTransport.addRemoteCandidate({})
					})
				}
			}, r.prototype.send = function(e, t) {
				var n = {
					to: this.id,
					sid: this.sid,
					broadcaster: this.broadcaster,
					roomType: this.type,
					type: e,
					payload: t,
					prefix: o.prefix
				};
				this.logger.log("sending", e, n), this.parent.emit("message", n)
			}, r.prototype.sendDirectly = function(e, t, n) {
				var r = {
					type: t,
					payload: n
				};
				this.logger.log("sending via datachannel", e, t, r);
				var i = this.getDataChannel(e);
				return "open" != i.readyState ? !1 : (i.send(JSON.stringify(r)), !0)
			}, r.prototype._observeDataChannel = function(e) {
				var t = this;
				e.onclose = this.emit.bind(this, "channelClose", e), e.onerror = this.emit.bind(this, "channelError", e), e.onmessage = function(n) {
					t.emit("channelMessage", t, e.label, JSON.parse(n.data), e, n)
				}, e.onopen = this.emit.bind(this, "channelOpen", e)
			}, r.prototype.getDataChannel = function(e, t) {
				if (!o.supportDataChannel) return this.emit("error", new Error("createDataChannel not supported"));
				var n = this.channels[e];
				return t || (t = {}), n ? n : (n = this.channels[e] = this.pc.createDataChannel(e, t), this._observeDataChannel(n), n)
			}, r.prototype.onIceCandidate = function(e) {
				if (!this.closed)
					if (e) {
						var t = this.parent.config.peerConnectionConfig;
						"moz" === o.prefix && t && t.iceTransports && e.candidate && e.candidate.candidate && e.candidate.candidate.indexOf(t.iceTransports) < 0 ? this.logger.log("Ignoring ice candidate not matching pcConfig iceTransports type: ", t.iceTransports) : this.send("candidate", e)
					} else this.logger.log("End of candidates.")
			}, r.prototype.start = function() {
				this.enableDataChannels && this.getDataChannel("simplewebrtc"), this.pc.offer(this.receiveMedia, function(e, t) {})
			}, r.prototype.icerestart = function() {
				var e = this.receiveMedia;
				e.mandatory.IceRestart = !0, this.pc.offer(e, function(e, t) {})
			}, r.prototype.end = function() {
				this.closed || (this.pc.close(), this.handleStreamRemoved())
			}, r.prototype.handleRemoteStreamAdded = function(e) {
				var t = this;
				this.stream ? this.logger.warn("Already have a remote stream") : (this.stream = e.stream, this.stream.onended = function() {
					t.end()
				}, this.parent.emit("peerStreamAdded", this))
			}, r.prototype.handleStreamRemoved = function() {
				this.parent.peers.splice(this.parent.peers.indexOf(this), 1), this.closed = !0, this.parent.emit("peerStreamRemoved", this)
			}, r.prototype.handleDataChannelAdded = function(e) {
				this.channels[e.label] = e, this._observeDataChannel(e)
			}, r.prototype.sendFile = function(e) {
				var t = new c.Sender,
					n = this.getDataChannel("filetransfer" + (new Date).getTime(), {
						protocol: p
					});
				return n.onopen = function() {
					n.send(JSON.stringify({
						size: e.size,
						name: e.name
					})), t.send(e, n)
				}, n.onclose = function() {
					console.log("sender received transfer"), t.emit("complete")
				}, t
			}, t.exports = r
		}, {
			filetransfer: 26,
			rtcpeerconnection: 47,
			util: 67,
			webrtcsupport: 77,
			wildemitter: 78
		}],
		81: [function(e, t, n) {
			function r(e) {
				var t, n, r = this,
					d = e || {},
					u = this.config = {
						url: "https://sandbox.simplewebrtc.com:443/",
						socketio: {},
						connection: null,
						debug: !1,
						localVideoEl: "",
						remoteVideosEl: "",
						enableDataChannels: !0,
						autoRequestMedia: !1,
						autoRemoveVideos: !0,
						adjustPeerVolume: !1,
						peerVolumeWhenSpeaking: .25,
						media: {
							video: !0,
							audio: !0
						},
						receiveMedia: {
							offerToReceiveAudio: 1,
							offerToReceiveVideo: 1
						},
						localVideo: {
							autoplay: !0,
							mirror: !0,
							muted: !0
						}
					};
				this.logger = function() {
					return e.debug ? e.logger || console : e.logger || c
				}();
				for (t in d) this.config[t] = d[t];
				this.capabilities = a, o.call(this), n = null === this.config.connection ? this.connection = new p(this.config) : this.connection = this.config.connection, n.on("connect", function() {
					r.emit("connectionReady", n.getSessionid()), r.sessionReady = !0, r.testReadiness()
				}), n.on("message", function(e) {
					var t, n = r.webrtc.getPeers(e.from, e.roomType);
					"offer" === e.type ? (n.length && n.forEach(function(n) {
						n.sid == e.sid && (t = n)
					}), t || (t = r.webrtc.createPeer({
						id: e.from,
						sid: e.sid,
						type: e.roomType,
						enableDataChannels: r.config.enableDataChannels && "screen" !== e.roomType,
						sharemyscreen: "screen" === e.roomType && !e.broadcaster,
						broadcaster: "screen" !== e.roomType || e.broadcaster ? null : r.connection.getSessionid()
					}), r.emit("createdPeer", t)), t.handleMessage(e)) : n.length && n.forEach(function(t) {
						e.sid ? t.sid === e.sid && t.handleMessage(e) : t.handleMessage(e)
					})
				}), n.on("remove", function(e) {
					e.id !== r.connection.getSessionid() && r.webrtc.removePeers(e.id, e.type)
				}), e.logger = this.logger, e.debug = !1, this.webrtc = new i(e), ["mute", "unmute", "pauseVideo", "resumeVideo", "pause", "resume", "sendToAll", "sendDirectlyToAll", "getPeers"].forEach(function(e) {
					r[e] = r.webrtc[e].bind(r.webrtc)
				}), this.webrtc.on("*", function() {
					r.emit.apply(r, arguments)
				}), u.debug && this.on("*", this.logger.log.bind(this.logger, "SimpleWebRTC event:")), this.webrtc.on("localStream", function() {
					r.testReadiness()
				}), this.webrtc.on("message", function(e) {
					r.connection.emit("message", e)
				}), this.webrtc.on("peerStreamAdded", this.handlePeerStreamAdded.bind(this)), this.webrtc.on("peerStreamRemoved", this.handlePeerStreamRemoved.bind(this)), this.config.adjustPeerVolume && (this.webrtc.on("speaking", this.setVolumeForAll.bind(this, this.config.peerVolumeWhenSpeaking)), this.webrtc.on("stoppedSpeaking", this.setVolumeForAll.bind(this, 1))), n.on("stunservers", function(e) {
					r.webrtc.config.peerConnectionConfig.iceServers = e, r.emit("stunservers", e)
				}), n.on("turnservers", function(e) {
					r.webrtc.config.peerConnectionConfig.iceServers = r.webrtc.config.peerConnectionConfig.iceServers.concat(e), r.emit("turnservers", e)
				}), this.webrtc.on("iceFailed", function(e) {}), this.webrtc.on("connectivityError", function(e) {}), this.webrtc.on("audioOn", function() {
					r.webrtc.sendToAll("unmute", {
						name: "audio"
					})
				}), this.webrtc.on("audioOff", function() {
					r.webrtc.sendToAll("mute", {
						name: "audio"
					})
				}), this.webrtc.on("videoOn", function() {
					r.webrtc.sendToAll("unmute", {
						name: "video"
					})
				}), this.webrtc.on("videoOff", function() {
					r.webrtc.sendToAll("mute", {
						name: "video"
					})
				}), this.webrtc.on("localScreen", function(e) {
					var t = document.createElement("video"),
						n = r.getRemoteVideoContainer();
					t.oncontextmenu = function() {
						return !1
					}, t.id = "localScreen", s(e, t), n && n.appendChild(t), r.emit("localScreenAdded", t), r.connection.emit("shareScreen"), r.webrtc.peers.forEach(function(e) {
						var t;
						"video" === e.type && (t = r.webrtc.createPeer({
							id: e.id,
							type: "screen",
							sharemyscreen: !0,
							enableDataChannels: !1,
							receiveMedia: {
								offerToReceiveAudio: 0,
								offerToReceiveVideo: 0
							},
							broadcaster: r.connection.getSessionid()
						}), r.emit("createdPeer", t), t.start())
					})
				}), this.webrtc.on("localScreenStopped", function(e) {
					r.stopScreenShare()
				}), this.webrtc.on("channelMessage", function(e, t, n) {
					"volume" == n.type && r.emit("remoteVolumeChange", e, n.volume)
				}), this.config.autoRequestMedia && this.startLocalVideo()
			}
			var i = e("./webrtc"),
				o = e("wildemitter"),
				a = e("webrtcsupport"),
				s = e("attachmediastream"),
				c = e("mockconsole"),
				p = e("./socketioconnection");
			r.prototype = Object.create(o.prototype, {
				constructor: {
					value: r
				}
			}), r.prototype.leaveRoom = function() {
				if (this.roomName) {
					for (this.connection.emit("leave"); this.webrtc.peers.length;) this.webrtc.peers.shift().end();
					this.getLocalScreen() && this.stopScreenShare(), this.emit("leftRoom", this.roomName), this.roomName = void 0
				}
			}, r.prototype.disconnect = function() {
				this.connection.disconnect(), delete this.connection
			}, r.prototype.handlePeerStreamAdded = function(e) {
				var t = this,
					n = this.getRemoteVideoContainer(),
					r = s(e.stream);
				e.videoEl = r, r.id = this.getDomId(e), n && n.appendChild(r), this.emit("videoAdded", r, e), window.setTimeout(function() {
					t.webrtc.isAudioEnabled() || e.send("mute", {
						name: "audio"
					}), t.webrtc.isVideoEnabled() || e.send("mute", {
						name: "video"
					})
				}, 250)
			}, r.prototype.handlePeerStreamRemoved = function(e) {
				var t = this.getRemoteVideoContainer(),
					n = e.videoEl;
				this.config.autoRemoveVideos && t && n && t.removeChild(n), n && this.emit("videoRemoved", n, e)
			}, r.prototype.getDomId = function(e) {
				return [e.id, e.type, e.broadcaster ? "broadcasting" : "incoming"].join("_")
			}, r.prototype.setVolumeForAll = function(e) {
				this.webrtc.peers.forEach(function(t) {
					t.videoEl && (t.videoEl.volume = e)
				})
			}, r.prototype.joinRoom = function(e, t) {
				var n = this;
				this.roomName = e, this.connection.emit("join", e, function(r, i) {
					if (console.log("join CB", r, i), r) n.emit("error", r);
					else {
						var o, a, s, c;
						for (o in i.clients) {
							a = i.clients[o];
							for (s in a) a[s] && (c = n.webrtc.createPeer({
								id: o,
								type: s,
								enableDataChannels: n.config.enableDataChannels && "screen" !== s,
								receiveMedia: {
									offerToReceiveAudio: "screen" !== s && n.config.receiveMedia.offerToReceiveAudio ? 1 : 0,
									offerToReceiveVideo: n.config.receiveMedia.offerToReceiveVideo
								}
							}), n.emit("createdPeer", c), c.start())
						}
					}
					t && t(r, i), n.emit("joinedRoom", e)
				})
			}, r.prototype.getEl = function(e) {
				return "string" == typeof e ? document.getElementById(e) : e
			}, r.prototype.startLocalVideo = function() {
				var e = this;
				this.webrtc.startLocalMedia(this.config.media, function(t, n) {
					t ? e.emit("localMediaError", t) : s(n, e.getLocalVideoContainer(), e.config.localVideo)
				})
			}, r.prototype.stopLocalVideo = function() {
				this.webrtc.stopLocalMedia()
			}, r.prototype.getLocalVideoContainer = function() {
				var e = this.getEl(this.config.localVideoEl);
				if (e && "VIDEO" === e.tagName) return e.oncontextmenu = function() {
					return !1
				}, e;
				if (e) {
					var t = document.createElement("video");
					return t.oncontextmenu = function() {
						return !1
					}, e.appendChild(t), t
				}
			}, r.prototype.getRemoteVideoContainer = function() {
				return this.getEl(this.config.remoteVideosEl)
			}, r.prototype.shareScreen = function(e) {
				this.webrtc.startScreenShare(e)
			}, r.prototype.getLocalScreen = function() {
				return this.webrtc.localScreen
			}, r.prototype.stopScreenShare = function() {
				this.connection.emit("unshareScreen");
				var e = document.getElementById("localScreen"),
					t = this.getRemoteVideoContainer(),
					n = this.getLocalScreen();
				this.config.autoRemoveVideos && t && e && t.removeChild(e), e && this.emit("videoRemoved", e), n && n.getTracks().forEach(function(e) {
					e.stop()
				}), this.webrtc.peers.forEach(function(e) {
					e.broadcaster && e.end()
				})
			}, r.prototype.testReadiness = function() {
				var e = this;
				this.sessionReady && (this.config.media.video || this.config.media.audio ? this.webrtc.localStreams.length > 0 && e.emit("readyToCall", e.connection.getSessionid()) : e.emit("readyToCall", e.connection.getSessionid()))
			}, r.prototype.createRoom = function(e, t) {
				this.roomName = e, 2 === arguments.length ? this.connection.emit("create", e, t) : this.connection.emit("create", e)
			}, r.prototype.sendFile = function() {
				return a.dataChannel ? void 0 : this.emit("error", new Error("DataChannelNotSupported"))
			}, t.exports = r
		}, {
			"./socketioconnection": 82,
			"./webrtc": 83,
			attachmediastream: 3,
			mockconsole: 40,
			webrtcsupport: 77,
			wildemitter: 78
		}],
		82: [function(e, t, n) {
			function r(e) {
				this.connection = i.connect(e.url, e.socketio)
			}
			var i = e("socket.io-client");
			r.prototype.on = function(e, t) {
				this.connection.on(e, t)
			}, r.prototype.emit = function() {
				this.connection.emit.apply(this.connection, arguments)
			}, r.prototype.getSessionid = function() {
				return this.connection.id
			}, r.prototype.disconnect = function() {
				return this.connection.disconnect()
			}, t.exports = r
		}, {
			"socket.io-client": 54
		}],
		83: [function(e, t, n) {
			function r(e) {
				var t, n = this,
					r = e || {};
				this.config = {
					debug: !1,
					peerConnectionConfig: {
						iceServers: [{
							urls: "stun:stun.l.google.com:19302"
						}]
					},
					peerConnectionConstraints: {
						optional: []
					},
					receiveMedia: {
						offerToReceiveAudio: 1,
						offerToReceiveVideo: 1
					},
					enableDataChannels: !0
				};
				this.screenSharingSupport = o.screenSharing, this.logger = function() {
					return e.debug ? e.logger || console : e.logger || a
				}();
				for (t in r) this.config[t] = r[t];
				o.support || this.logger.error("Your browser doesn't seem to support WebRTC"), this.peers = [], s.call(this, this.config), this.on("speaking", function() {
					n.hardMuted || n.peers.forEach(function(e) {
						if (e.enableDataChannels) {
							var t = e.getDataChannel("hark");
							if ("open" != t.readyState) return;
							t.send(JSON.stringify({
								type: "speaking"
							}))
						}
					})
				}), this.on("stoppedSpeaking", function() {
					n.hardMuted || n.peers.forEach(function(e) {
						if (e.enableDataChannels) {
							var t = e.getDataChannel("hark");
							if ("open" != t.readyState) return;
							t.send(JSON.stringify({
								type: "stoppedSpeaking"
							}))
						}
					})
				}), this.on("volumeChange", function(e, t) {
					n.hardMuted || n.peers.forEach(function(t) {
						if (t.enableDataChannels) {
							var n = t.getDataChannel("hark");
							if ("open" != n.readyState) return;
							n.send(JSON.stringify({
								type: "volume",
								volume: e
							}))
						}
					})
				}), this.config.debug && this.on("*", function(e, t, r) {
					var i;
					i = n.config.logger === a ? console : n.logger, i.log("event:", e, t, r)
				})
			}
			var i = e("util"),
				o = e("webrtcsupport"),
				a = (e("wildemitter"), e("mockconsole")),
				s = e("localmedia"),
				c = e("./peer");
			i.inherits(r, s), r.prototype.createPeer = function(e) {
				var t;
				return e.parent = this, t = new c(e), this.peers.push(t), t
			}, r.prototype.removePeers = function(e, t) {
				this.getPeers(e, t).forEach(function(e) {
					e.end()
				})
			}, r.prototype.getPeers = function(e, t) {
				return this.peers.filter(function(n) {
					return !(e && n.id !== e || t && n.type !== t)
				})
			}, r.prototype.sendToAll = function(e, t) {
				this.peers.forEach(function(n) {
					n.send(e, t)
				})
			}, r.prototype.sendDirectlyToAll = function(e, t, n) {
				this.peers.forEach(function(r) {
					r.enableDataChannels && r.sendDirectly(e, t, n)
				})
			}, t.exports = r
		}, {
			"./peer": 80,
			localmedia: 37,
			mockconsole: 40,
			util: 67,
			webrtcsupport: 77,
			wildemitter: 78
		}]
	}, {}, [81])(81)
});