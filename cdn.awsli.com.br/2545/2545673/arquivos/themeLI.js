function carrossel () {

! function(a, b, c, d) {
    function e(b, c) {
        this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: {
                start: null,
                current: null
            },
            direction: null
        }, this._states = {
            current: {},
            tags: {
                initializing: ["busy"],
                animating: ["busy"],
                dragging: ["interacting"]
            }
        }, a.each(["onResize", "onThrottledResize"], a.proxy(function(b, c) {
            this._handlers[c] = a.proxy(this[c], this)
        }, this)), a.each(e.Plugins, a.proxy(function(a, b) {
            this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this)
        }, this)), a.each(e.Workers, a.proxy(function(b, c) {
            this._pipe.push({
                filter: c.filter,
                run: a.proxy(c.run, this)
            })
        }, this)), this.setup(), this.initialize()
    }
    e.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        checkVisibility: !0,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: b,
        fallbackEasing: "swing",
        slideTransition: "",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab"
    }, e.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    }, e.Type = {
        Event: "event",
        State: "state"
    }, e.Plugins = {}, e.Workers = [{
        filter: ["width", "settings"],
        run: function() {
            this._width = this.$element.width()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            a.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            this.$stage.children(".cloned").remove()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = this.settings.margin || "",
                c = !this.settings.autoWidth,
                d = this.settings.rtl,
                e = {
                    width: "auto",
                    "margin-left": d ? b : "",
                    "margin-right": d ? "" : b
                };
            !c && this.$stage.children().css(e), a.css = e
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                c = null,
                d = this._items.length,
                e = !this.settings.autoWidth,
                f = [];
            for (a.items = {
                    merge: !1,
                    width: b
                }; d--;) c = this._mergers[d], c = this.settings.mergeFit && Math.min(c, this.settings.items) || c, a.items.merge = c > 1 || a.items.merge, f[d] = e ? b * c : this._items[d].width();
            this._widths = f
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var b = [],
                c = this._items,
                d = this.settings,
                e = Math.max(2 * d.items, 4),
                f = 2 * Math.ceil(c.length / 2),
                g = d.loop && c.length ? d.rewind ? e : Math.max(e, f) : 0,
                h = "",
                i = "";
            for (g /= 2; g > 0;) b.push(this.normalize(b.length / 2, !0)), h += c[b[b.length - 1]][0].outerHTML, b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)), i = c[b[b.length - 1]][0].outerHTML + i, g -= 1;
            this._clones = b, a(h).addClass("cloned").appendTo(this.$stage), a(i).addClass("cloned").prependTo(this.$stage)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            for (var a = this.settings.rtl ? 1 : -1, b = this._clones.length + this._items.length, c = -1, d = 0, e = 0, f = []; ++c < b;) d = f[c - 1] || 0, e = this._widths[this.relative(c)] + this.settings.margin, f.push(d + e * a);
            this._coordinates = f
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var a = this.settings.stagePadding,
                b = this._coordinates,
                c = {
                    width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
                    "padding-left": a || "",
                    "padding-right": a || ""
                };
            this.$stage.css(c)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = this._coordinates.length,
                c = !this.settings.autoWidth,
                d = this.$stage.children();
            if (c && a.items.merge)
                for (; b--;) a.css.width = this._widths[this.relative(b)], d.eq(b).css(a.css);
            else c && (a.css.width = a.items.width, d.css(a.css))
        }
    }, {
        filter: ["items"],
        run: function() {
            this._coordinates.length < 1 && this.$stage.removeAttr("style")
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            a.current = a.current ? this.$stage.children().index(a.current) : 0, a.current = Math.max(this.minimum(), Math.min(this.maximum(), a.current)), this.reset(a.current)
        }
    }, {
        filter: ["position"],
        run: function() {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"],
        run: function() {
            var a, b, c, d, e = this.settings.rtl ? 1 : -1,
                f = 2 * this.settings.stagePadding,
                g = this.coordinates(this.current()) + f,
                h = g + this.width() * e,
                i = [];
            for (c = 0, d = this._coordinates.length; c < d; c++) a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
            this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass("active"), this.$stage.children(".center").removeClass("center"), this.settings.center && this.$stage.children().eq(this.current()).addClass("center")
        }
    }], e.prototype.initializeStage = function() {
        this.$stage = this.$element.find("." + this.settings.stageClass), this.$stage.length || (this.$element.addClass(this.options.loadingClass), this.$stage = a("<" + this.settings.stageElement + ">", {
            class: this.settings.stageClass
        }).wrap(a("<div/>", {
            class: this.settings.stageOuterClass
        })), this.$element.append(this.$stage.parent()))
    }, e.prototype.initializeItems = function() {
        var b = this.$element.find(".owl-item");
        if (b.length) return this._items = b.get().map(function(b) {
            return a(b)
        }), this._mergers = this._items.map(function() {
            return 1
        }), void this.refresh();
        this.replace(this.$element.children().not(this.$stage.parent())), this.isVisible() ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)
    }, e.prototype.initialize = function() {
        if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
            var a, b, c;
            a = this.$element.find("img"), b = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, c = this.$element.children(b).width(), a.length && c <= 0 && this.preloadAutoWidthImages(a)
        }
        this.initializeStage(), this.initializeItems(), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
    }, e.prototype.isVisible = function() {
        return !this.settings.checkVisibility || this.$element.is(":visible")
    }, e.prototype.setup = function() {
        var b = this.viewport(),
            c = this.options.responsive,
            d = -1,
            e = null;
        c ? (a.each(c, function(a) {
            a <= b && a > d && (d = Number(a))
        }), e = a.extend({}, this.options, c[d]), "function" == typeof e.stagePadding && (e.stagePadding = e.stagePadding()), delete e.responsive, e.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + d))) : e = a.extend({}, this.options), this.trigger("change", {
            property: {
                name: "settings",
                value: e
            }
        }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        })
    }, e.prototype.optionsLogic = function() {
        this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, e.prototype.prepare = function(b) {
        var c = this.trigger("prepare", {
            content: b
        });
        return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(b)), this.trigger("prepared", {
            content: c.data
        }), c.data
    }, e.prototype.update = function() {
        for (var b = 0, c = this._pipe.length, d = a.proxy(function(a) {
                return this[a]
            }, this._invalidated), e = {}; b < c;)(this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
        this._invalidated = {}, !this.is("valid") && this.enter("valid")
    }, e.prototype.width = function(a) {
        switch (a = a || e.Width.Default) {
            case e.Width.Inner:
            case e.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, e.prototype.refresh = function() {
        this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
    }, e.prototype.onThrottledResize = function() {
        b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
    }, e.prototype.onResize = function() {
        return !!this._items.length && (this._width !== this.$element.width() && (!!this.isVisible() && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))))
    }, e.prototype.registerEventHandlers = function() {
        a.support.transition && this.$stage.on(a.support.transition.end + ".owl.core", a.proxy(this.onTransitionEnd, this)), !1 !== this.settings.responsive && this.on(b, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
            return !1
        })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this)))
    }, e.prototype.onDragStart = function(b) {
        var d = null;
        3 !== b.which && (a.support.transform ? (d = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), d = {
            x: d[16 === d.length ? 12 : 4],
            y: d[16 === d.length ? 13 : 5]
        }) : (d = this.$stage.position(), d = {
            x: this.settings.rtl ? d.left + this.$stage.width() - this.width() + this.settings.margin : d.left,
            y: d.top
        }), this.is("animating") && (a.support.transform ? this.animate(d.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === b.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = a(b.target), this._drag.stage.start = d, this._drag.stage.current = d, this._drag.pointer = this.pointer(b), a(c).on("mouseup.owl.core touchend.owl.core", a.proxy(this.onDragEnd, this)), a(c).one("mousemove.owl.core touchmove.owl.core", a.proxy(function(b) {
            var d = this.difference(this._drag.pointer, this.pointer(b));
            a(c).on("mousemove.owl.core touchmove.owl.core", a.proxy(this.onDragMove, this)), Math.abs(d.x) < Math.abs(d.y) && this.is("valid") || (b.preventDefault(), this.enter("dragging"), this.trigger("drag"))
        }, this)))
    }, e.prototype.onDragMove = function(a) {
        var b = null,
            c = null,
            d = null,
            e = this.difference(this._drag.pointer, this.pointer(a)),
            f = this.difference(this._drag.stage.start, e);
        this.is("dragging") && (a.preventDefault(), this.settings.loop ? (b = this.coordinates(this.minimum()), c = this.coordinates(this.maximum() + 1) - b, f.x = ((f.x - b) % c + c) % c + b) : (b = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), c = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), d = this.settings.pullDrag ? -1 * e.x / 5 : 0, f.x = Math.max(Math.min(f.x, b + d), c + d)), this._drag.stage.current = f, this.animate(f.x))
    }, e.prototype.onDragEnd = function(b) {
        var d = this.difference(this._drag.pointer, this.pointer(b)),
            e = this._drag.stage.current,
            f = d.x > 0 ^ this.settings.rtl ? "left" : "right";
        a(c).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== d.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = f, (Math.abs(d.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function() {
            return !1
        })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
    }, e.prototype.closest = function(b, c) {
        var e = -1,
            f = 30,
            g = this.width(),
            h = this.coordinates();
        return this.settings.freeDrag || a.each(h, a.proxy(function(a, i) {
            return "left" === c && b > i - f && b < i + f ? e = a : "right" === c && b > i - g - f && b < i - g + f ? e = a + 1 : this.op(b, "<", i) && this.op(b, ">", h[a + 1] !== d ? h[a + 1] : i - g) && (e = "left" === c ? a + 1 : a), -1 === e
        }, this)), this.settings.loop || (this.op(b, ">", h[this.minimum()]) ? e = b = this.minimum() : this.op(b, "<", h[this.maximum()]) && (e = b = this.maximum())), e
    }, e.prototype.animate = function(b) {
        var c = this.speed() > 0;
        this.is("animating") && this.onTransitionEnd(), c && (this.enter("animating"), this.trigger("translate")), a.support.transform3d && a.support.transition ? this.$stage.css({
            transform: "translate3d(" + b + "px,0px,0px)",
            transition: this.speed() / 1e3 + "s" + (this.settings.slideTransition ? " " + this.settings.slideTransition : "")
        }) : c ? this.$stage.animate({
            left: b + "px"
        }, this.speed(), this.settings.fallbackEasing, a.proxy(this.onTransitionEnd, this)) : this.$stage.css({
            left: b + "px"
        })
    }, e.prototype.is = function(a) {
        return this._states.current[a] && this._states.current[a] > 0
    }, e.prototype.current = function(a) {
        if (a === d) return this._current;
        if (0 === this._items.length) return d;
        if (a = this.normalize(a), this._current !== a) {
            var b = this.trigger("change", {
                property: {
                    name: "position",
                    value: a
                }
            });
            b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }, e.prototype.invalidate = function(b) {
        return "string" === a.type(b) && (this._invalidated[b] = !0, this.is("valid") && this.leave("valid")), a.map(this._invalidated, function(a, b) {
            return b
        })
    }, e.prototype.reset = function(a) {
        (a = this.normalize(a)) !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]))
    }, e.prototype.normalize = function(a, b) {
        var c = this._items.length,
            e = b ? 0 : this._clones.length;
        return !this.isNumeric(a) || c < 1 ? a = d : (a < 0 || a >= c + e) && (a = ((a - e / 2) % c + c) % c + e / 2), a
    }, e.prototype.relative = function(a) {
        return a -= this._clones.length / 2, this.normalize(a, !0)
    }, e.prototype.maximum = function(a) {
        var b, c, d, e = this.settings,
            f = this._coordinates.length;
        if (e.loop) f = this._clones.length / 2 + this._items.length - 1;
        else if (e.autoWidth || e.merge) {
            if (b = this._items.length)
                for (c = this._items[--b].width(), d = this.$element.width(); b-- && !((c += this._items[b].width() + this.settings.margin) > d););
            f = b + 1
        } else f = e.center ? this._items.length - 1 : this._items.length - e.items;
        return a && (f -= this._clones.length / 2), Math.max(f, 0)
    }, e.prototype.minimum = function(a) {
        return a ? 0 : this._clones.length / 2
    }, e.prototype.items = function(a) {
        return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a])
    }, e.prototype.mergers = function(a) {
        return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a])
    }, e.prototype.clones = function(b) {
        var c = this._clones.length / 2,
            e = c + this._items.length,
            f = function(a) {
                return a % 2 == 0 ? e + a / 2 : c - (a + 1) / 2
            };
        return b === d ? a.map(this._clones, function(a, b) {
            return f(b)
        }) : a.map(this._clones, function(a, c) {
            return a === b ? f(c) : null
        })
    }, e.prototype.speed = function(a) {
        return a !== d && (this._speed = a), this._speed
    }, e.prototype.coordinates = function(b) {
        var c, e = 1,
            f = b - 1;
        return b === d ? a.map(this._coordinates, a.proxy(function(a, b) {
            return this.coordinates(b)
        }, this)) : (this.settings.center ? (this.settings.rtl && (e = -1, f = b + 1), c = this._coordinates[b], c += (this.width() - c + (this._coordinates[f] || 0)) / 2 * e) : c = this._coordinates[f] || 0, c = Math.ceil(c))
    }, e.prototype.duration = function(a, b, c) {
        return 0 === c ? 0 : Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
    }, e.prototype.to = function(a, b) {
        var c = this.current(),
            d = null,
            e = a - this.relative(c),
            f = (e > 0) - (e < 0),
            g = this._items.length,
            h = this.minimum(),
            i = this.maximum();
        this.settings.loop ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += -1 * f * g), a = c + e, (d = ((a - h) % g + g) % g + h) !== a && d - e <= i && d - e > 0 && (c = d - e, a = d, this.reset(c))) : this.settings.rewind ? (i += 1, a = (a % i + i) % i) : a = Math.max(h, Math.min(i, a)), this.speed(this.duration(c, a, b)), this.current(a), this.isVisible() && this.update()
    }, e.prototype.next = function(a) {
        a = a || !1, this.to(this.relative(this.current()) + 1, a)
    }, e.prototype.prev = function(a) {
        a = a || !1, this.to(this.relative(this.current()) - 1, a)
    }, e.prototype.onTransitionEnd = function(a) {
        if (a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))) return !1;
        this.leave("animating"), this.trigger("translated")
    }, e.prototype.viewport = function() {
        var d;
        return this.options.responsiveBaseElement !== b ? d = a(this.options.responsiveBaseElement).width() : b.innerWidth ? d = b.innerWidth : c.documentElement && c.documentElement.clientWidth ? d = c.documentElement.clientWidth : console.warn("Can not detect viewport width."), d
    }, e.prototype.replace = function(b) {
        this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function() {
            return 1 === this.nodeType
        }).each(a.proxy(function(a, b) {
            b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, e.prototype.add = function(b, c) {
        var e = this.relative(this._current);
        c = c === d ? this._items.length : this.normalize(c, !0), b = b instanceof jQuery ? b : a(b), this.trigger("add", {
            content: b,
            position: c
        }), b = this.prepare(b), 0 === this._items.length || c === this._items.length ? (0 === this._items.length && this.$stage.append(b), 0 !== this._items.length && this._items[c - 1].after(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[c].before(b), this._items.splice(c, 0, b), this._mergers.splice(c, 0, 1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[e] && this.reset(this._items[e].index()), this.invalidate("items"), this.trigger("added", {
            content: b,
            position: c
        })
    }, e.prototype.remove = function(a) {
        (a = this.normalize(a, !0)) !== d && (this.trigger("remove", {
            content: this._items[a],
            position: a
        }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: a
        }))
    }, e.prototype.preloadAutoWidthImages = function(b) {
        b.each(a.proxy(function(b, c) {
            this.enter("pre-loading"), c = a(c), a(new Image).one("load", a.proxy(function(a) {
                c.attr("src", a.target.src), c.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
            }, this)).attr("src", c.attr("src") || c.attr("data-src") || c.attr("data-src-retina"))
        }, this))
    }, e.prototype.destroy = function() {
        this.$element.off(".owl.core"), this.$stage.off(".owl.core"), a(c).off(".owl.core"), !1 !== this.settings.responsive && (b.clearTimeout(this.resizeTimer), this.off(b, "resize", this._handlers.onThrottledResize));
        for (var d in this._plugins) this._plugins[d].destroy();
        this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.remove(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
    }, e.prototype.op = function(a, b, c) {
        var d = this.settings.rtl;
        switch (b) {
            case "<":
                return d ? a > c : a < c;
            case ">":
                return d ? a < c : a > c;
            case ">=":
                return d ? a <= c : a >= c;
            case "<=":
                return d ? a >= c : a <= c
        }
    }, e.prototype.on = function(a, b, c, d) {
        a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
    }, e.prototype.off = function(a, b, c, d) {
        a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
    }, e.prototype.trigger = function(b, c, d, f, g) {
        var h = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            },
            i = a.camelCase(a.grep(["on", b, d], function(a) {
                return a
            }).join("-").toLowerCase()),
            j = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
                relatedTarget: this
            }, h, c));
        return this._supress[b] || (a.each(this._plugins, function(a, b) {
            b.onTrigger && b.onTrigger(j)
        }), this.register({
            type: e.Type.Event,
            name: b
        }), this.$element.trigger(j), this.settings && "function" == typeof this.settings[i] && this.settings[i].call(this, j)), j
    }, e.prototype.enter = function(b) {
        a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
            this._states.current[b] === d && (this._states.current[b] = 0), this._states.current[b]++
        }, this))
    }, e.prototype.leave = function(b) {
        a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
            this._states.current[b]--
        }, this))
    }, e.prototype.register = function(b) {
        if (b.type === e.Type.Event) {
            if (a.event.special[b.name] || (a.event.special[b.name] = {}), !a.event.special[b.name].owl) {
                var c = a.event.special[b.name]._default;
                a.event.special[b.name]._default = function(a) {
                    return !c || !c.apply || a.namespace && -1 !== a.namespace.indexOf("owl") ? a.namespace && a.namespace.indexOf("owl") > -1 : c.apply(this, arguments)
                }, a.event.special[b.name].owl = !0
            }
        } else b.type === e.Type.State && (this._states.tags[b.name] ? this._states.tags[b.name] = this._states.tags[b.name].concat(b.tags) : this._states.tags[b.name] = b.tags, this._states.tags[b.name] = a.grep(this._states.tags[b.name], a.proxy(function(c, d) {
            return a.inArray(c, this._states.tags[b.name]) === d
        }, this)))
    }, e.prototype.suppress = function(b) {
        a.each(b, a.proxy(function(a, b) {
            this._supress[b] = !0
        }, this))
    }, e.prototype.release = function(b) {
        a.each(b, a.proxy(function(a, b) {
            delete this._supress[b]
        }, this))
    }, e.prototype.pointer = function(a) {
        var c = {
            x: null,
            y: null
        };
        return a = a.originalEvent || a || b.event, a = a.touches && a.touches.length ? a.touches[0] : a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : a, a.pageX ? (c.x = a.pageX, c.y = a.pageY) : (c.x = a.clientX, c.y = a.clientY), c
    }, e.prototype.isNumeric = function(a) {
        return !isNaN(parseFloat(a))
    }, e.prototype.difference = function(a, b) {
        return {
            x: a.x - b.x,
            y: a.y - b.y
        }
    }, a.fn.owlCarousel = function(b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var d = a(this),
                f = d.data("owl.carousel");
            f || (f = new e(this, "object" == typeof b && b), d.data("owl.carousel", f), a.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function(b, c) {
                f.register({
                    type: e.Type.Event,
                    name: c
                }), f.$element.on(c + ".owl.carousel.core", a.proxy(function(a) {
                    a.namespace && a.relatedTarget !== this && (this.suppress([c]), f[c].apply(this, [].slice.call(arguments, 1)), this.release([c]))
                }, f))
            })), "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c)
        })
    }, a.fn.owlCarousel.Constructor = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._interval = null, this._visible = null, this._handlers = {
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoRefresh && this.watch()
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        autoRefresh: !0,
        autoRefreshInterval: 500
    }, e.prototype.watch = function() {
        this._interval || (this._visible = this._core.isVisible(), this._interval = b.setInterval(a.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
    }, e.prototype.refresh = function() {
        this._core.isVisible() !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
    }, e.prototype.destroy = function() {
        var a, c;
        b.clearInterval(this._interval);
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._loaded = [], this._handlers = {
            "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function(b) {
                if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type)) {
                    var c = this._core.settings,
                        e = c.center && Math.ceil(c.items / 2) || c.items,
                        f = c.center && -1 * e || 0,
                        g = (b.property && b.property.value !== d ? b.property.value : this._core.current()) + f,
                        h = this._core.clones().length,
                        i = a.proxy(function(a, b) {
                            this.load(b)
                        }, this);
                    for (c.lazyLoadEager > 0 && (e += c.lazyLoadEager, c.loop && (g -= c.lazyLoadEager, e++)); f++ < e;) this.load(h / 2 + this._core.relative(g)), h && a.each(this._core.clones(this._core.relative(g)), i), g++
                }
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        lazyLoad: !1,
        lazyLoadEager: 0
    }, e.prototype.load = function(c) {
        var d = this._core.$stage.children().eq(c),
            e = d && d.find(".owl-lazy");
        !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function(c, d) {
            var e, f = a(d),
                g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src") || f.attr("data-srcset");
            this._core.trigger("load", {
                element: f,
                url: g
            }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function() {
                f.css("opacity", 1), this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this)).attr("src", g) : f.is("source") ? f.one("load.owl.lazy", a.proxy(function() {
                this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this)).attr("srcset", g) : (e = new Image, e.onload = a.proxy(function() {
                f.css({
                    "background-image": 'url("' + g + '")',
                    opacity: "1"
                }), this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this), e.src = g)
        }, this)), this._loaded.push(d.get(0)))
    }, e.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Lazy = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(c) {
        this._core = c, this._previousHeight = null, this._handlers = {
            "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && this.update()
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && "position" === a.property.name && this.update()
            }, this),
            "loaded.owl.lazy": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers), this._intervalId = null;
        var d = this;
        a(b).on("load", function() {
            d._core.settings.autoHeight && d.update()
        }), a(b).resize(function() {
            d._core.settings.autoHeight && (null != d._intervalId && clearTimeout(d._intervalId), d._intervalId = setTimeout(function() {
                d.update()
            }, 250))
        })
    };
    e.Defaults = {
        autoHeight: !1,
        autoHeightClass: "owl-height"
    }, e.prototype.update = function() {
        var b = this._core._current,
            c = b + this._core.settings.items,
            d = this._core.settings.lazyLoad,
            e = this._core.$stage.children().toArray().slice(b, c),
            f = [],
            g = 0;
        a.each(e, function(b, c) {
            f.push(a(c).height())
        }), g = Math.max.apply(null, f), g <= 1 && d && this._previousHeight && (g = this._previousHeight), this._previousHeight = g, this._core.$stage.parent().height(g).addClass(this._core.settings.autoHeightClass)
    }, e.prototype.destroy = function() {
        var a, b;
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._videos = {}, this._playing = null, this._handlers = {
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.register({
                    type: "state",
                    name: "playing",
                    tags: ["interacting"]
                })
            }, this),
            "resize.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.video && this.isInFullScreen() && a.preventDefault()
            }, this),
            "refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" === a.property.name && this._playing && this.stop()
            }, this),
            "prepared.owl.carousel": a.proxy(function(b) {
                if (b.namespace) {
                    var c = a(b.content).find(".owl-video");
                    c.length && (c.css("display", "none"), this.fetch(c, a(b.content)))
                }
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function(a) {
            this.play(a)
        }, this))
    };
    e.Defaults = {
        video: !1,
        videoHeight: !1,
        videoWidth: !1
    }, e.prototype.fetch = function(a, b) {
        var c = function() {
                return a.attr("data-vimeo-id") ? "vimeo" : a.attr("data-vzaar-id") ? "vzaar" : "youtube"
            }(),
            d = a.attr("data-vimeo-id") || a.attr("data-youtube-id") || a.attr("data-vzaar-id"),
            e = a.attr("data-width") || this._core.settings.videoWidth,
            f = a.attr("data-height") || this._core.settings.videoHeight,
            g = a.attr("href");
        if (!g) throw new Error("Missing video URL.");
        if (d = g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";
        else if (d[3].indexOf("vimeo") > -1) c = "vimeo";
        else {
            if (!(d[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
            c = "vzaar"
        }
        d = d[6], this._videos[g] = {
            type: c,
            id: d,
            width: e,
            height: f
        }, b.attr("data-video", g), this.thumbnail(a, this._videos[g])
    }, e.prototype.thumbnail = function(b, c) {
        var d, e, f, g = c.width && c.height ? "width:" + c.width + "px;height:" + c.height + "px;" : "",
            h = b.find("img"),
            i = "src",
            j = "",
            k = this._core.settings,
            l = function(c) {
                e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? a("<div/>", {
                    class: "owl-video-tn " + j,
                    srcType: c
                }) : a("<div/>", {
                    class: "owl-video-tn",
                    style: "opacity:1;background-image:url(" + c + ")"
                }), b.after(d), b.after(e)
            };
        if (b.wrap(a("<div/>", {
                class: "owl-video-wrapper",
                style: g
            })), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length) return l(h.attr(i)), h.remove(), !1;
        "youtube" === c.type ? (f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type ? a.ajax({
            type: "GET",
            url: "//vimeo.com/api/v2/video/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(a) {
                f = a[0].thumbnail_large, l(f)
            }
        }) : "vzaar" === c.type && a.ajax({
            type: "GET",
            url: "//vzaar.com/api/videos/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(a) {
                f = a.framegrab_url, l(f)
            }
        })
    }, e.prototype.stop = function() {
        this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
    }, e.prototype.play = function(b) {
        var c, d = a(b.target),
            e = d.closest("." + this._core.settings.itemClass),
            f = this._videos[e.attr("data-video")],
            g = f.width || "100%",
            h = f.height || this._core.$stage.height();
        this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), e = this._core.items(this._core.relative(e.index())), this._core.reset(e.index()), c = a('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'), c.attr("height", h), c.attr("width", g), "youtube" === f.type ? c.attr("src", "//www.youtube.com/embed/" + f.id + "?autoplay=1&rel=0&v=" + f.id) : "vimeo" === f.type ? c.attr("src", "//player.vimeo.com/video/" + f.id + "?autoplay=1") : "vzaar" === f.type && c.attr("src", "//view.vzaar.com/" + f.id + "/player?autoplay=true"), a(c).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")), this._playing = e.addClass("owl-video-playing"))
    }, e.prototype.isInFullScreen = function() {
        var b = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
        return b && a(b).parent().hasClass("owl-video-frame")
    }, e.prototype.destroy = function() {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Video = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
            "change.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value)
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function(a) {
                a.namespace && (this.swapping = "translated" == a.type)
            }, this),
            "translate.owl.carousel": a.proxy(function(a) {
                a.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    e.Defaults = {
        animateOut: !1,
        animateIn: !1
    }, e.prototype.swap = function() {
        if (1 === this.core.settings.items && a.support.animation && a.support.transition) {
            this.core.speed(0);
            var b, c = a.proxy(this.clear, this),
                d = this.core.$stage.children().eq(this.previous),
                e = this.core.$stage.children().eq(this.next),
                f = this.core.settings.animateIn,
                g = this.core.settings.animateOut;
            this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.one(a.support.animation.end, c).css({
                left: b + "px"
            }).addClass("animated owl-animated-out").addClass(g)), f && e.one(a.support.animation.end, c).addClass("animated owl-animated-in").addClass(f))
        }
    }, e.prototype.clear = function(b) {
        a(b.target).css({
            left: ""
        }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
    }, e.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._call = null, this._time = 0, this._timeout = 0, this._paused = !0, this._handlers = {
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "settings" === a.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : a.namespace && "position" === a.property.name && this._paused && (this._time = 0)
            }, this),
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoplay && this.play()
            }, this),
            "play.owl.autoplay": a.proxy(function(a, b, c) {
                a.namespace && this.play(b, c)
            }, this),
            "stop.owl.autoplay": a.proxy(function(a) {
                a.namespace && this.stop()
            }, this),
            "mouseover.owl.autoplay": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this),
            "mouseleave.owl.autoplay": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
            }, this),
            "touchstart.owl.core": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this),
            "touchend.owl.core": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this.play()
            }, this)
        }, this._core.$element.on(this._handlers), this._core.options = a.extend({}, e.Defaults, this._core.options)
    };
    e.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    }, e.prototype._next = function(d) {
        this._call = b.setTimeout(a.proxy(this._next, this, d), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read()), this._core.is("interacting") || c.hidden || this._core.next(d || this._core.settings.autoplaySpeed)
    }, e.prototype.read = function() {
        return (new Date).getTime() - this._time
    }, e.prototype.play = function(c, d) {
        var e;
        this._core.is("rotating") || this._core.enter("rotating"), c = c || this._core.settings.autoplayTimeout, e = Math.min(this._time % (this._timeout || c), c), this._paused ? (this._time = this.read(), this._paused = !1) : b.clearTimeout(this._call), this._time += this.read() % c - e, this._timeout = c, this._call = b.setTimeout(a.proxy(this._next, this, d), c - e)
    }, e.prototype.stop = function() {
        this._core.is("rotating") && (this._time = 0, this._paused = !0, b.clearTimeout(this._call), this._core.leave("rotating"))
    }, e.prototype.pause = function() {
        this._core.is("rotating") && !this._paused && (this._time = this.read(), this._paused = !0, b.clearTimeout(this._call))
    }, e.prototype.destroy = function() {
        var a, b;
        this.stop();
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.autoplay = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    "use strict";
    var e = function(b) {
        this._core = b, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        }, this._handlers = {
            "prepared.owl.carousel": a.proxy(function(b) {
                b.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
            }, this),
            "added.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 0, this._templates.pop())
            }, this),
            "remove.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 1)
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" == a.property.name && this.draw()
            }, this),
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
            }, this),
            "refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    e.Defaults = {
        nav: !1,
        navText: ['<span aria-label="Previous">&#x2039;</span>', '<span aria-label="Next">&#x203a;</span>'],
        navSpeed: !1,
        navElement: 'button type="button" role="presentation"',
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotsData: !1,
        dotsSpeed: !1,
        dotsContainer: !1
    }, e.prototype.initialize = function() {
        var b, c = this._core.settings;
        this._controls.$relative = (c.navContainer ? a(c.navContainer) : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = a("<" + c.navElement + ">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click", a.proxy(function(a) {
            this.prev(c.navSpeed)
        }, this)), this._controls.$next = a("<" + c.navElement + ">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click", a.proxy(function(a) {
            this.next(c.navSpeed)
        }, this)), c.dotsData || (this._templates = [a('<button role="button">').addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]), this._controls.$absolute = (c.dotsContainer ? a(c.dotsContainer) : a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "button", a.proxy(function(b) {
            var d = a(b.target).parent().is(this._controls.$absolute) ? a(b.target).index() : a(b.target).parent().index();
            b.preventDefault(), this.to(d, c.dotsSpeed)
        }, this));
        for (b in this._overrides) this._core[b] = a.proxy(this[b], this)
    }, e.prototype.destroy = function() {
        var a, b, c, d, e;
        e = this._core.settings;
        for (a in this._handlers) this.$element.off(a, this._handlers[a]);
        for (b in this._controls) "$relative" === b && e.navContainer ? this._controls[b].html("") : this._controls[b].remove();
        for (d in this.overides) this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, e.prototype.update = function() {
        var a, b, c, d = this._core.clones().length / 2,
            e = d + this._core.items().length,
            f = this._core.maximum(!0),
            g = this._core.settings,
            h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
        if ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)), g.dots || "page" == g.slideBy)
            for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
                if (b >= h || 0 === b) {
                    if (this._pages.push({
                            start: Math.min(f, a - d),
                            end: a - d + h - 1
                        }), Math.min(f, a - d) === f) break;
                    b = 0, ++c
                }
                b += this._core.mergers(this._core.relative(a))
            }
    }, e.prototype.draw = function() {
        var b, c = this._core.settings,
            d = this._core.items().length <= c.items,
            e = this._core.relative(this._core.current()),
            f = c.loop || c.rewind;
        this._controls.$relative.toggleClass("disabled", !c.nav || d), c.nav && (this._controls.$previous.toggleClass("disabled", !f && e <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !f && e >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !c.dots || d), c.dots && (b = this._pages.length - this._controls.$absolute.children().length, c.dotsData && 0 !== b ? this._controls.$absolute.html(this._templates.join("")) : b > 0 ? this._controls.$absolute.append(new Array(b + 1).join(this._templates[0])) : b < 0 && this._controls.$absolute.children().slice(b).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(a.inArray(this.current(), this._pages)).addClass("active"))
    }, e.prototype.onTrigger = function(b) {
        var c = this._core.settings;
        b.page = {
            index: a.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: c && (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items)
        }
    }, e.prototype.current = function() {
        var b = this._core.relative(this._core.current());
        return a.grep(this._pages, a.proxy(function(a, c) {
            return a.start <= b && a.end >= b
        }, this)).pop()
    }, e.prototype.getPosition = function(b) {
        var c, d, e = this._core.settings;
        return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c
    }, e.prototype.next = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
    }, e.prototype.prev = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
    }, e.prototype.to = function(b, c, d) {
        var e;
        !d && this._pages.length ? (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c)) : a.proxy(this._overrides.to, this._core)(b, c)
    }, a.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    "use strict";
    var e = function(c) {
        this._core = c, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.owl.carousel": a.proxy(function(c) {
                c.namespace && "URLHash" === this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
            }, this),
            "prepared.owl.carousel": a.proxy(function(b) {
                if (b.namespace) {
                    var c = a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                    if (!c) return;
                    this._hashes[c] = b.content
                }
            }, this),
            "changed.owl.carousel": a.proxy(function(c) {
                if (c.namespace && "position" === c.property.name) {
                    var d = this._core.items(this._core.relative(this._core.current())),
                        e = a.map(this._hashes, function(a, b) {
                            return a === d ? b : null
                        }).join();
                    if (!e || b.location.hash.slice(1) === e) return;
                    b.location.hash = e
                }
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function(a) {
            var c = b.location.hash.substring(1),
                e = this._core.$stage.children(),
                f = this._hashes[c] && e.index(this._hashes[c]);
            f !== d && f !== this._core.current() && this._core.to(this._core.relative(f), !1, !0)
        }, this))
    };
    e.Defaults = {
        URLhashListener: !1
    }, e.prototype.destroy = function() {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Hash = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    function e(b, c) {
        var e = !1,
            f = b.charAt(0).toUpperCase() + b.slice(1);
        return a.each((b + " " + h.join(f + " ") + f).split(" "), function(a, b) {
            if (g[b] !== d) return e = !c || b, !1
        }), e
    }
    function f(a) {
        return e(a, !0)
    }
    var g = a("<support>").get(0).style,
        h = "Webkit Moz O ms".split(" "),
        i = {
            transition: {
                end: {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    transition: "transitionend"
                }
            },
            animation: {
                end: {
                    WebkitAnimation: "webkitAnimationEnd",
                    MozAnimation: "animationend",
                    OAnimation: "oAnimationEnd",
                    animation: "animationend"
                }
            }
        },
        j = {
            csstransforms: function() {
                return !!e("transform")
            },
            csstransforms3d: function() {
                return !!e("perspective")
            },
            csstransitions: function() {
                return !!e("transition")
            },
            cssanimations: function() {
                return !!e("animation")
            }
        };
    j.csstransitions() && (a.support.transition = new String(f("transition")), a.support.transition.end = i.transition.end[a.support.transition]), j.cssanimations() && (a.support.animation = new String(f("animation")), a.support.animation.end = i.animation.end[a.support.animation]), j.csstransforms() && (a.support.transform = new String(f("transform")), a.support.transform3d = j.csstransforms3d())
}(window.Zepto || window.jQuery, window, document);
    	
};

carrossel();

$(document).ready(function() {
    $('<span class="color-theme-function fundo-principal" style="display:none !Important"></span>').prependTo("body");
        $(".carrinho.vazio span.vazio-text").text("0"),
        $(`<ul class="conteudotopo-wrap">
    <li class="i-all-topo help--contact search--header">
        <div class="i-all-topo_icon titulo">
            <svg xmlns="http://www.w3.org/2000/svg" class="cor-principal search--icon" viewBox="0 0 1024 1024" version="1.1"><path d="M948.48 833.92l-185.6-183.68c-3.84-3.84-8.32-6.4-13.44-7.68C801.28 580.48 832 501.76 832 416 832 221.44 674.56 64 480 64 285.44 64 128 221.44 128 416 128 610.56 285.44 768 480 768c85.76 0 163.84-30.72 225.28-81.28 1.92 4.48 4.48 8.96 8.32 12.8l185.6 183.68c14.08 13.44 35.84 13.44 49.92 0S962.56 847.36 948.48 833.92zM480 704C320.64 704 192 575.36 192 416 192 256.64 320.64 128 480 128 639.36 128 768 256.64 768 416 768 575.36 639.36 704 480 704z"/></svg>
            <svg class="cor-principal search--close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M575.328 510.496 946.784 140.672c17.568-17.504 17.664-45.824 0.192-63.424-17.504-17.632-45.792-17.664-63.36-0.192L512.032 446.944 143.712 77.216C126.304 59.712 97.92 59.648 80.384 77.12 62.848 94.624 62.816 123.008 80.288 140.576l368.224 369.632L77.216 879.808c-17.568 17.504-17.664 45.824-0.192 63.424 8.736 8.8 20.256 13.216 31.776 13.216 11.424 0 22.848-4.352 31.584-13.056l371.36-369.696 371.68 373.088C892.192 955.616 903.68 960 915.168 960c11.456 0 22.912-4.384 31.648-13.088 17.504-17.504 17.568-45.824 0.096-63.392L575.328 510.496 575.328 510.496zM575.328 510.496"/></svg>
        </div>
    </li>
    <li class="i-all-topo help--contact">
    <div class="i-all-topo_icon titulo">
        <svg class="cor-principal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511 511.9982"><path d="m512.441406 245.640625c-1.527344-66.980469-29.011718-129.398437-77.378906-175.753906-48.300781-46.285157-111.730469-71.078125-178.589844-69.839844-66.882812-1.253906-130.289062 23.554687-178.585937 69.839844-48.371094 46.355469-75.851563 108.773437-77.382813 175.75l-.003906.210937v.210938c.351562 68.257812 29.578125 133.15625 80.320312 178.640625v61.886719c0 12.011718 8.386719 22.472656 19.9375 24.878906 1.710938.355468 3.433594.535156 5.148438.535156 4.648438 0 9.21875-1.300781 13.242188-3.8125l49.738281-31.074219c28.050781 9.824219 57.320312 14.800781 87.078125 14.800781h.375c1.648437.03125 3.277344.046876 4.921875.046876 65.105469-.003907 126.65625-24.710938 173.800781-69.886719 48.367188-46.355469 75.851562-108.773438 77.378906-175.75l.007813-.34375zm-98.15625 154.753906c-42.59375 40.820313-98.535156 62.660157-157.515625 61.496094l-.164062-.003906h-.164063c-27.675781.0625-54.914062-4.753907-80.917968-14.289063-6.429688-2.355468-13.433594-1.636718-19.21875 1.976563l-45.457032 28.394531v-56.925781c0-6.351563-2.761718-12.394531-7.578125-16.578125-45.863281-39.871094-72.367187-97.582032-72.738281-158.351563 1.398438-58.898437 25.585938-113.773437 68.132812-154.546875 42.589844-40.816406 98.546876-62.648437 157.511719-61.492187l.296875.003906.296875-.003906c58.96875-1.144531 114.921875 20.675781 157.515625 61.492187 42.507813 40.738282 66.695313 95.570313 68.128906 154.414063-1.433593 58.847656-25.621093 113.675781-68.128906 154.414062zm0 0"/><path d="m366.476562 174.273438h-220.007812c-8.289062 0-15.011719 6.71875-15.011719 15.011718 0 8.292969 6.722657 15.015625 15.011719 15.015625h220.007812c8.292969 0 15.015626-6.722656 15.015626-15.015625 0-8.292968-6.722657-15.011718-15.015626-15.011718zm0 0"/><path d="m366.476562 240.6875h-220.007812c-8.289062 0-15.011719 6.722656-15.011719 15.011719 0 8.292969 6.722657 15.015625 15.011719 15.015625h220.007812c8.292969 0 15.015626-6.722656 15.015626-15.015625 0-8.289063-6.722657-15.011719-15.015626-15.011719zm0 0"/><path d="m366.476562 307.101562h-108.171874c-8.289063 0-15.011719 6.722657-15.011719 15.015626 0 8.289062 6.722656 15.011718 15.011719 15.011718h108.171874c8.292969 0 15.015626-6.722656 15.015626-15.011718 0-8.292969-6.722657-15.015626-15.015626-15.015626zm0 0"/></svg>
        <div class="i-all-topo_text">
            <h1>Atendimento</h1>
        </div>
    </div>
    <div class="wrap-box-conta">
        <ul class="drp-conta-top">
            <span class="text-center">Central de Atendimento</span>
        </ul>
    </div>
    </li><li class="i-all-topo minha-contatopo">
    <div class="i-all-topo_icon titulo">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"> <path d="M437.02,74.981C388.667,26.629,324.38,0,256,0S123.333,26.629,74.98,74.981C26.629,123.333,0,187.62,0,256 s26.629,132.667,74.98,181.019C123.333,485.371,187.62,512,256,512s132.667-26.629,181.02-74.981 C485.371,388.667,512,324.38,512,256S485.371,123.333,437.02,74.981z M256,482c-60.844,0-116.142-24.177-156.812-63.419 C121.212,351.287,184.487,305,256,305s134.788,46.287,156.813,113.582C372.142,457.823,316.844,482,256,482z M181,200 c0-41.355,33.645-75,75-75c41.355,0,75,33.645,75,75s-33.645,75-75,75C214.645,275,181,241.355,181,200z M435.34,393.354 c-22.07-51.635-65.404-90.869-117.777-108.35C343.863,265.904,361,234.918,361,200c0-57.897-47.103-105-105-105 c-57.897,0-105,47.103-105,105c0,34.918,17.137,65.904,43.438,85.004c-52.374,17.481-95.708,56.715-117.778,108.35 C47.414,355.259,30,307.628,30,256C30,131.383,131.383,30,256,30s226,101.383,226,226C482,307.628,464.586,355.259,435.34,393.354 z"/></svg>
        <div class="i-all-topo_text">
            <h1>Minha Conta</h1>
        </div>
    </div>
    <div class="wrap-box-conta"><ul class="drp-conta-top"></ul></div></li></ul>`).prependTo(".conteudo-topo .inferior.row-fluid > .span4.hidden-phone"), $(".span4.hidden-phone .carrinho").appendTo("ul.conteudotopo-wrap");
    $('ul.conteudotopo-wrap>li.i-all-topo.help--contact.search--header').click(function() {
        $('body').toggleClass('show-search');
    });
    var o = window.getComputedStyle($(".color-theme-function")[0]).backgroundColor,
        e = $("a.botao.secundario.pequeno.dropdown-toggle");
    $(`\n        ${e.length>0?'\n            <li><a href="/conta/pedido/listar"><i class="fa fa-list-ul cor-principal sem-hover"></i>Meus pedidos</a></li>           \n            <li><a href="/conta/favorito/listar"><i class="fa fa-star cor-principal sem-hover"></i>Meus favoritos</a></li>      \n            <li><a href="/conta/logout"><i class="icon-signout cor-principal sem-hover"></i>Sair</a></li>\n        ':'\n          <span>Olá, Visitante</span>\n          <li><a href="/conta/login"><i class="icon-signin"></i>Entrar</a></li>\n          <li><a href="/conta/login"><i class="fa fa-plus"></i>Cadastrar</a></li>\n        '}\n       `).appendTo(".i-all-topo.minha-contatopo ul.drp-conta-top"), e.length > 0 && $(e).prependTo(".i-all-topo.minha-contatopo ul.drp-conta-top"), $("#rodape .institucional").removeClass("fundo-secundario"), $("#rodape .span12.visible-phone>ul").insertBefore("ul.conteudotopo-wrap li._contato_"), $(".conteudo-topo.span10 .span8.busca-mobile input#auto-complete").attr("placeholder", "Oque vocÃª estÃ¡ procurando?"), $("div#corpo .conteudo .mini-banner").insertAfter(".titulo-categoria.borda-principal.cor-principal.vitrine-destaque"), $("#cabecalho strong.qtd-carrinho.titulo.cor-secundaria").clone().appendTo(".atalhos-mobile a.icon-shopping-cart"), "" == $("strong.qtd-carrinho.titulo.cor-secundaria").html && $("strong.qtd-carrinho.titulo.cor-secundaria").html("0"), $(".row-fluid.banner.mini-banner").prependTo("div#listagemProdutos"), $(".pagina-inicial .marcas").appendTo(".pagina-inicial div#listagemProdutos"), $('<div class="wrap-btn-prod"><div class="almentar-qty-prod">+</div><div class="diminuir-qty-prod">-</div>\n</div>').insertAfter("label.qtde-adicionar-carrinho input.qtde-carrinho");
		$(".wrap-box-conta ul.drp-conta-top-v2 a.botao.secundario.pequeno.dropdown-toggle").each(function() {
            var a = $(this).text().replace(" OlÃ¡, ", "");
            $(this).html(a)
        }), $('<strong class="title_marca">Escolha pela marca</strong>').prependTo(".marcas"), $('<i class="icon-chevron-left"></i>').appendTo(".marcas .flexslider.carousel ul.flex-direction-nav a.flex-prev"), $('<i class="icon-chevron-right"></i>').appendTo(".marcas .flexslider.carousel ul.flex-direction-nav a.flex-next");
        
$(document).on("click", "#rastreio_na_pagina_web", function(a) {
            let o = $(this).siblings("#pedido-field").val();
            o.length > 5 ? window.open(`https://rastreamentocorreios.info/consulta/${o}`) : t.error("Preencha o campo de rastreio corretamente!")
        });
                
        if (window.innerWidth >= 767) {
        $("#cabecalho > .conteiner > .row-fluid > .span3").removeClass("span3").addClass("span2"), $("#cabecalho > .conteiner > .row-fluid > .conteudo-topo.span9").removeClass("span9").addClass("span10"), $("#category-list").append($(".menu.superior"));
        $(window).load(function() {
            $(".lista-redes.span3").prependTo(".conteudo-topo.span10 .inferior.row-fluid > .span4.hidden-phone"),
                function() {
                    let a = $("body:not(.pagina-inicial) .listagem li.span3"),
                        o = [],
                        e = null;
                    a.each(function() {
                        let a = $(this).height();
                        o.push(a), e = Math.max.apply(null, o)
                    }), a.css("height", `${Number(e+14)}px`)
                }()
        })
    }
    $("a.botao.secundario.pequeno.dropdown-toggle").length > 0 ? $(`<div class="acoes-menu-mobile">\n                <span>${$.trim($("a.botao.secundario.pequeno.dropdown-toggle").text())}</span>\n                <li class="minhaconta"><a href="/conta/index">Minha conta</a></li>\n                <li class="meuspedidos"><a href="/conta/pedido/listar">Meus pedidos</a></li>\n                <li class="meusfavoritos">\n                <a href="/conta/favorito/listar">Meus favoritos</a></li>\n                <li class="sair"><a href="/conta/logout">Sair</a></li><li><input type="text" id="pedido-field" placeholder="NÃºmero do pedido" autocomplete="off"><a href="#rastreio" data-target="#rastreio" style="color: ${n}" id="rastreio_na_pagina_web"><i class="fa fa-truck cor-principal sem-hover"></i>Rastrear pedido</a></li></div>`).prependTo(".menu.superior") : $('<div class="acoes-menu-mobile">\n                <span>OlÃ¡, Visitante</span>\n                <li class="entrar"><a href="/conta/login?">Entrar</a></li>\n                <li class="cadastrar"><a href="/conta/login?">Cadastrar</a></li><li><input type="text" id="pedido-field" placeholder="NÃºmero do pedido" autocomplete="off"><a href="#rastreio" data-target="#rastreio" style="color: ${n}" id="rastreio_na_pagina_web"><i class="fa fa-truck cor-principal sem-hover"></i>Rastrear pedido</a></li></div>').prependTo(".menu.superior");
    /**/
    $("a.atalho-menu").prependTo("body");
    $('<div id="js_hamb"><span></span><span></span><span></span></div>').prependTo("a.atalho-menu");
    $("#js_hamb").click(function() {
        $("body").toggleClass("menu-go-left"), $(this).toggleClass("open");
    });
    $('<div class="mask-background"></div>').prependTo("body");
    /**/
    if (window.innerWidth <= 767) {
        $(".atalhos-mobile.visible-phone").removeClass("fundo-secundario");
        $("body > *:not(.modal)").wrapAll('<div class="all-elements"></div>'),
            $(".menu.superior").insertBefore("body > .all-elements");
        //$("a.atalho-menu").prependTo("body"), 
        $(".atalhos-mobile").insertBefore(".menu.superior"),
            $('<div class="_mask-search"></div>').appendTo("#cabecalho"),
            $(window).scroll(function() {
                $(window).scrollTop() > 180 || ($("body").removeClass("active-search"), $(".drop-search").removeClass("active"))
            });
        $(".menu.superior .nivel-um > li.com-filho >.nivel-dois").hide(), $(".menu.superior .nivel-um > li.com-filho > a > i").click(function() {
            return $(this).parent("a").siblings(".nivel-dois").slideToggle(500), $(this).parent("a").toggleClass("active"), !1
        }), $("div#listagemProdutos .row-fluid.banner.mini-banner").removeClass("hidden-phone"), $(".span3 .redes-sociais .caixa-facebook").removeClass("hidden-phone"), $(".lista-redes.span3.hidden-phone").clone().prependTo("#rodape > div.institucional.fundo-secundario > div > div > div.span3 > div");
        $(".span8.busca-mobile .busca .botao.botao-busca,\n            #rodape .institucional span.titulo,\n            #rodape .redes-sociais .lista-redes i,\n            span.desconto-a-vista strong,\n            span.preco-parcela strong.cor-secundaria,\n            #rodape ul.dropdown-centralatdmtopo li a i,\n            #rodape .pagamento-selos .titulo,\n            .pagina-busca h1.titulo,\n            .pagina-categoria h1.titulo\n        ").attr("style", `color: ${o} !important`);
    } else {
        $('.menu.superior').prependTo('div#cabecalho .conteudo-topo>.inferior');
    }
    
        window.Whatsapp_Flutuante = function(param) {
            if ($("#rodape li.tel-whatsapp").length > 0 && "sim" == param.ativar) {
                let a = $("#rodape li.tel-whatsapp a").attr('href');
                $("body").append(`\n                        <a class="whats-float" target="_blank" href="${a}&text=${param.texto}"><svg viewBox="0 0 32 32" class="whatsapp-ico"><path d=" M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z" fill-rule="evenodd"></path></svg></a>\n                    `)
            }
        }
        
    $('.pagina-produto .produto-compartilhar ul').appendTo('.addthis_inline_share_toolbox');
    $('div#cabecalho>.conteiner>.row-fluid>.span2').insertAfter('div#cabecalho>.conteiner>.row-fluid>.conteudo-topo .inferior .busca-mobile');
    
    
    window.Mensagem_Superior = function(a) {
        if (a.ativar == 'sim') {
            $(`<div class="box-header-info" style="background:${a.corFundo};color:${a.corTextos}">
                <div class="box-header-info__user">${a.texto}</div>
            </div>`).insertBefore('div#cabecalho');
        } else {
            $('body').addClass('bar-top-off');
        }
    };
    
    $('.banner.tarja').before('<h2></h2>');
     
    $imgcategoria = $('.banner.tarja a img');
     
    $imgcategoria.each(function(index) {
    	$('.banner.tarja a').eq(index).append('<h3>'+$('.banner.tarja a img').eq(index).attr('alt')+'</h3>');
    });
    
    function tarjaResize() {
    	
        if ($('.banner.tarja img').length > 1 && window.innerWidth < 768) {
        	
            $(".banner.tarja:not(.owl-loaded)").owlCarousel({
                loop: true,
                margin: 10,
                nav: !0,
                autoplay: true,
                autoplayTimeout: 4000,
                autoplayHoverPause: false,
                navText: ["<i class='icon-angle-left'></i>", "<i class='icon-angle-right'></i>"],
                items: 1,
                responsive: {
                    0: {
                        items: 1
                    },
                    620: {
                        items: 2
                    }
                }
            });
        };
    };
    tarjaResize();
    $(window).resize(function() {
        tarjaResize();
    });
    
    
    window.bannersVitrine = function (b) {
        if ($(".pagina-inicial").length && window.innerWidth > 748 ) {
            let group = b
                .map(item => {
                    return `
			<li><a href="${item.imgLink}">
					<img src="${item.imgDesktop}">
				</a>
			</li>`;
                 
                })
                .join("");

            $(`<div id="banners-vitrine">
                    ${group}
			</div>`).appendTo(".banner.cheio + .row-fluid");
		
    }
    
      else if ($(".pagina-inicial").length && window.innerWidth < 748 ) {
            let group = b
                .map(item => {
                    return `
			<li><a href="${item.imgLink}">
				<img src="${item.imgMobile}">
			</li>`;
                 
                })
                .join("");

            $(`<div id="banners-vitrine">
                    ${group}
			</div>`).appendTo(".banner.cheio + .row-fluid");
		
    }
    	
    };
    
    window.descricaoHome = function (b) {
    	if ($(".pagina-inicial").length > 0 || $('.pagina-produto').length > 0) {
    			
    			let imgdescricao = imgPrincipal;
    			
    		    let group = b
                .map(item => {
                    return `
			
    			<div class="Item-descricao"><img src="${item.imgIcone}">
<div class="text-content">
                  <h3>${item.titulo}</h3>
                  <p>${item.descricao}</p>
                 </div>
                </div>`;
                })
                .join("");

            $(`<div class="home-descriptions">
            <div class="span6">
    			<img src="`+imgdescricao+`">
    			</div>
            <div class="span6">
    			<h2>RESULTADO NAS PRIMEIRAS <br> SEMANAS DE USO</h2>
                    ${group}
			</div></div>`).appendTo("div#corpo");
    		
    	}
    };
    
    window.vantagensHome = function (b) {
    	if ($(".pagina-inicial").length > 0 || $('.pagina-produto').length > 0) {

    		    let group = b
                .map(item => {
                    return `
    			<div class="vantagens">
    				<img src= ${item.imgVantagens}>
                </div>`;
                })
                .join("");

            $(`<div class="vantagens-home">
            	<div class="vantagens-imagens">
                    ${group}
			</div></div>`).appendTo("div#corpo");
    		
    	}
    };

    window.Depoimentos_Home = function(a) {
        if ($('.pagina-inicial').length > 0 || $('.pagina-produto').length > 0) {
            let group = a.map(item => {
                return `
                <li>
                    <span class="home-depositions__image"><img src="${item.imagem}"/></span>
                    <div class="depositions_info">
	                    <span class="home-depositions__name">${item.nome}</span>
	                    <span class="home-depositions__description">${item.descricao}</span>
	                    <svg class="mt-1 ds-color-accent-1" xmlns="http://www.w3.org/2000/svg" width="17.489" height="11.892" fill="currentColor" stroke="none" viewBox="0 0 17.489 11.892">
  <path d="M-6.548-27.927a3.755,3.755,0,0,1-2.886-1.307,4.531,4.531,0,0,1-1.187-3.158,7.944,7.944,0,0,1,.795-3.583A7.319,7.319,0,0,1-7.7-38.588a6.133,6.133,0,0,1,2.94-1.231q-.087.109-.2.24a12.7,12.7,0,0,0-1.089,1.514,2.325,2.325,0,0,0-.414,1.688A4.929,4.929,0,0,1-4.49-35.8a3.951,3.951,0,0,1,1.459,1.35,3.712,3.712,0,0,1,.555,2.058,4.53,4.53,0,0,1-1.2,3.136A3.739,3.739,0,0,1-6.548-27.927Zm9.343,0A3.765,3.765,0,0,1-.08-29.234a4.507,4.507,0,0,1-1.2-3.158,7.855,7.855,0,0,1,.806-3.583,7.475,7.475,0,0,1,2.123-2.614A6.084,6.084,0,0,1,4.6-39.819q-.087.109-.2.24a12.7,12.7,0,0,0-1.089,1.514,2.421,2.421,0,0,0-.436,1.688,4.929,4.929,0,0,1,1.971.577,3.951,3.951,0,0,1,1.459,1.35,3.712,3.712,0,0,1,.555,2.058,4.553,4.553,0,0,1-1.187,3.136A3.729,3.729,0,0,1,2.8-27.927Z" transform="translate(10.621 39.819)"></path>
</svg>
	                </div>
                </li>`
            }).join('');
            $(`<div class="home-depositions">
                <div class="home-depositions__title">
                    <h2>
                        A MARCA PREFERIDA DAS MULHERES
                    </h2>
                </div>
                <ul class="home-depositions__carrossel span11">
                    ${group}
                </ul>
            </div>`).appendTo('div#corpo');
            if ($('.home-depositions .home-depositions__carrossel > li').length > 3 && window.innerWidth > 767) {
                $(".home-depositions .home-depositions__carrossel").owlCarousel({
                    loop: false,
                    margin: 10,
                    nav: !0,
                    navText: ["<i class='icon-angle-left'></i>", "<i class='icon-angle-right'></i>"],
                    responsive: {
                        0: {
                            items: 1
                        },
                        768: {
                            items: 4
                        }
                    }
                });
            }
            if ($('.home-depositions .home-depositions__carrossel > li').length > 1 && window.innerWidth < 768) {
                $(".home-depositions .home-depositions__carrossel").owlCarousel({
                    loop: !0,
                    margin: 10,
                    nav: !0,
                    navText: ["<i class='icon-angle-left'></i>", "<i class='icon-angle-right'></i>"],
                    responsive: {
                        0: {
                            items: 1
                        },
                        768: {
                            items: 2
                        }
                    }
                });
            }
        }
    };
    
    	$(`<li class="borda-principal oferta-menu">
        <a href="#" title="Teste Gratis">
          <strong class="titulo cor-secundaria" style="color:#FFF !important">EXPERIMENTE GRATUITAMENTE</strong>
          
        </a>
        
      </li>`).appendTo('.menu.superior .nivel-um');
      
      $('.pagina-categoria .span9').addClass('span12').removeClass('span9');
      
      $produtos = $('.aproveite-tambem');
      
      $('.comprar').before($produtos);
      
      $('.pagina-produto li.span3').addClass('span4').removeClass('span3');
      
      if($('.pagina-produto').length){
      
    	$('.conteiner-imagem div').after('<div class="info-produto"><img src="https://cdn.awsli.com.br/2545/2545673/arquivos/Banner Produto.png"></div>');
    	
    	$(`<div class="land-produto">
    	
    	<div class="comprovados" style="background:linear-gradient(180deg, rgba(255, 232, 235, 0.32), rgba(255, 232, 235, 1) 70%)">
    		<div class="span6">
    			<img src="https://cdn.awsli.com.br/2545/2545673/arquivos/Group 88.png">
    		</div>
    		<div class="span6">
    			<h2>NÃO É MÁGICA, É FORMULA COMPROVADA</h2>
    			<p>Afirmaram ver o cabelo mais macio e brilhoso nas primeiras semanas</p>
    			<img src="https://cdn.awsli.com.br/2545/2545673/arquivos/qualidadecomprovada (2).png" alt="Qualidade Comprovada Rennaker" >
    			<p>Afirmaram ver o cabelo mais macio e brilhoso nas primeiras semanas</p>
    			<img src="https://cdn.awsli.com.br/2545/2545673/arquivos/qualidadecomprovada (1).png" alt="Qualidade Comprovada Rennaker" >
    			<p>Afirmaram ver o cabelo mais macio e brilhoso nas primeiras semanas</p>
    			<img src="https://cdn.awsli.com.br/2545/2545673/arquivos/qualidadecomprovada.png" alt="Qualidade Comprovada Rennaker" >
    		</div>
    		
    		</div>
    		

    	
    	
    	</div>`).appendTo('#corpo');
    	
    	
    	
    	
      }
      
      
       window.quemUsou = function(a) {
        if ($('.pagina-produto').length) {
            let group = a.map(item => {
                return `
                <li>
                    <span class="quem-usou__image"><img src="${item.imagem}"/></span>
                </li>`
            }).join('');
            
            $(`<div class="quem-usou">
	    			<h2>QUEM USOU, AMOU!</h2> 
	    			<p>Resultados visíveis na primeira semana de uso.</p>
                <ul class="quemUsou__carrossel span11">
                    ${group}
                </ul>
</div>`).appendTo('div#corpo');

                $(".quem-usou .quemUsou__carrossel").owlCarousel({
                    loop: false,
                    margin: 10,
                    nav: !0,
                    navText: ["<i class='icon-angle-left'></i>", "<i class='icon-angle-right'></i>"],
                    responsive: {
                        0: {
                            items: 1
                        },
                        768: {
                            items: 3
                        }
                    }
                });
            }
    };
    
    window.beneficios = function (b) {
    	if ($(".pagina-produto").length ) {

    		    let group = b
                .map(item => {
                    return `
    			<div class="beneficios">
    				<img src= ${item.imgBeneficios}>
                </div>`;
                })
                .join("");

            $(`<div class="beneficios-home ">
            	<h2>CONHEÇA OS SUPER BENEFÍCIOS DO GUMMY HAIR</h2>
            	<div class="span12 beneficios-imagens">
                    ${group}
			</div></div>`).appendTo("div#corpo");
    		
    	}
    };
    
    window.Horario_Atendimento = function(param) {
        $(`
        <li class="hour-footer">
            <p>${param.horario}</p>
        </li>
        `).appendTo('#rodape .span12.visible-phone>ul');
        
        
        $('#rodape .span12.visible-phone>ul>li').clone().appendTo('.help--contact .wrap-box-conta ul');
        $('#cabecalho .help--contact .wrap-box-conta .drp-conta-top i').addClass('cor-principal');
    };
    
    
    window.Icone_Carrinho_Sacola = function(param) {
        $(`
        <div class="icons-actions icon-carrinho" data-verify="${param.ativarCarrinho}"> 
            <svg class="cor-principal" xmlns="http://www.w3.org/2000/svg" id="Capa_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512"><path d="m15 76h64.599c2.362 8.502 68.818 247.745 71.949 259.015 1.803 6.492 7.714 10.985 14.452 10.985h270c6.673 0 12.543-4.408 14.405-10.816l61-210c1.316-4.531.423-9.417-2.41-13.191s-7.277-5.993-11.995-5.993h-377.932l-13.615-49.015c-1.804-6.492-7.715-10.985-14.453-10.985h-76c-8.284 0-15 6.716-15 15s6.716 15 15 15zm462.023 60-52.286 180h-247.336l-50-180z"/><path d="m256 421c0-24.813-20.187-45-45-45s-45 20.187-45 45 20.187 45 45 45 45-20.187 45-45zm-60 0c0-8.271 6.729-15 15-15s15 6.729 15 15-6.729 15-15 15-15-6.729-15-15z"/><path d="m436 421c0-24.813-20.187-45-45-45s-45 20.187-45 45 20.187 45 45 45 45-20.187 45-45zm-60 0c0-8.271 6.729-15 15-15s15 6.729 15 15-6.729 15-15 15-15-6.729-15-15z"/><path d="m196 226h210c8.284 0 15-6.716 15-15s-6.716-15-15-15h-210c-8.284 0-15 6.716-15 15s6.716 15 15 15z"/><path d="m376 256h-150c-8.284 0-15 6.716-15 15s6.716 15 15 15h150c8.284 0 15-6.716 15-15s-6.716-15-15-15z"/></svg>
            <span class="titulo">Meu Carrinho</span>
        </div>
        <div class="icons-actions icon-sacola" data-verify="${param.ativarSacola}">
            <svg xmlns="http://www.w3.org/2000/svg" height="512pt" viewBox="-35 0 512 512.00102" width="512pt" class="cor-principal"><path d="m443.054688 495.171875-38.914063-370.574219c-.816406-7.757812-7.355469-13.648437-15.15625-13.648437h-73.140625v-16.675781c0-51.980469-42.292969-94.273438-94.273438-94.273438-51.984374 0-94.277343 42.292969-94.277343 94.273438v16.675781h-73.140625c-7.800782 0-14.339844 5.890625-15.15625 13.648437l-38.9140628 370.574219c-.4492192 4.292969.9453128 8.578125 3.8320308 11.789063 2.890626 3.207031 7.007813 5.039062 11.324219 5.039062h412.65625c4.320313 0 8.4375-1.832031 11.324219-5.039062 2.894531-3.210938 4.285156-7.496094 3.835938-11.789063zm-285.285157-400.898437c0-35.175782 28.621094-63.796876 63.800781-63.796876 35.175782 0 63.796876 28.621094 63.796876 63.796876v16.675781h-127.597657zm-125.609375 387.25 35.714844-340.097657h59.417969v33.582031c0 8.414063 6.824219 15.238282 15.238281 15.238282s15.238281-6.824219 15.238281-15.238282v-33.582031h127.597657v33.582031c0 8.414063 6.824218 15.238282 15.238281 15.238282 8.414062 0 15.238281-6.824219 15.238281-15.238282v-33.582031h59.417969l35.714843 340.097657zm0 0"></path></svg>
            <span class="titulo">Minha Sacola</span>
        </div>
        `).insertBefore('div#cabecalho .carrinho>a i');
        $(`
        <div class="icons-actions icon-carrinho" data-verify="${param.ativarCarrinho}"> 
            <svg class="cor-principal" xmlns="http://www.w3.org/2000/svg" id="Capa_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512"><path d="m15 76h64.599c2.362 8.502 68.818 247.745 71.949 259.015 1.803 6.492 7.714 10.985 14.452 10.985h270c6.673 0 12.543-4.408 14.405-10.816l61-210c1.316-4.531.423-9.417-2.41-13.191s-7.277-5.993-11.995-5.993h-377.932l-13.615-49.015c-1.804-6.492-7.715-10.985-14.453-10.985h-76c-8.284 0-15 6.716-15 15s6.716 15 15 15zm462.023 60-52.286 180h-247.336l-50-180z"/><path d="m256 421c0-24.813-20.187-45-45-45s-45 20.187-45 45 20.187 45 45 45 45-20.187 45-45zm-60 0c0-8.271 6.729-15 15-15s15 6.729 15 15-6.729 15-15 15-15-6.729-15-15z"/><path d="m436 421c0-24.813-20.187-45-45-45s-45 20.187-45 45 20.187 45 45 45 45-20.187 45-45zm-60 0c0-8.271 6.729-15 15-15s15 6.729 15 15-6.729 15-15 15-15-6.729-15-15z"/><path d="m196 226h210c8.284 0 15-6.716 15-15s-6.716-15-15-15h-210c-8.284 0-15 6.716-15 15s6.716 15 15 15z"/><path d="m376 256h-150c-8.284 0-15 6.716-15 15s6.716 15 15 15h150c8.284 0 15-6.716 15-15s-6.716-15-15-15z"/></svg>
        </div>
        <div class="icons-actions icon-sacola" data-verify="${param.ativarSacola}">
            <svg xmlns="http://www.w3.org/2000/svg" height="512pt" viewBox="-35 0 512 512.00102" width="512pt" class="cor-principal"><path d="m443.054688 495.171875-38.914063-370.574219c-.816406-7.757812-7.355469-13.648437-15.15625-13.648437h-73.140625v-16.675781c0-51.980469-42.292969-94.273438-94.273438-94.273438-51.984374 0-94.277343 42.292969-94.277343 94.273438v16.675781h-73.140625c-7.800782 0-14.339844 5.890625-15.15625 13.648437l-38.9140628 370.574219c-.4492192 4.292969.9453128 8.578125 3.8320308 11.789063 2.890626 3.207031 7.007813 5.039062 11.324219 5.039062h412.65625c4.320313 0 8.4375-1.832031 11.324219-5.039062 2.894531-3.210938 4.285156-7.496094 3.835938-11.789063zm-285.285157-400.898437c0-35.175782 28.621094-63.796876 63.800781-63.796876 35.175782 0 63.796876 28.621094 63.796876 63.796876v16.675781h-127.597657zm-125.609375 387.25 35.714844-340.097657h59.417969v33.582031c0 8.414063 6.824219 15.238282 15.238281 15.238282s15.238281-6.824219 15.238281-15.238282v-33.582031h127.597657v33.582031c0 8.414063 6.824218 15.238282 15.238281 15.238282 8.414062 0 15.238281-6.824219 15.238281-15.238282v-33.582031h59.417969l35.714843 340.097657zm0 0"></path></svg>
        </div>
        `).prependTo('.atalhos-mobile a.icon-shopping-cart');
        if (param.ativarSacola == 'sim') {
            $('body').addClass('perfil-sacola-ativado');
        }
    };

    window.Carrossel_Produtos = function(param) {
        function addCarousel() {
            $('.pagina-inicial div#listagemProdutos ul[data-produtos-linha]').each(function() {
                $(`<li class="listagem-linha listagem-products-carousel"><ul class="carousel-content"></ul></li>`).prependTo($(this));
                $(this).find('ul').children('li').appendTo($(this).find('.carousel-content'));
                $(this).find('.listagem-linha:not(.listagem-products-carousel)').remove();
            });
            $(".pagina-inicial ul.carousel-content").owlCarousel({
                loop: param.carrosselInfinito == 'nao' ? false : true,
                margin: 10,
                nav: !0,
                navText: ["<i class='icon-angle-left'></i>", "<i class='icon-angle-right'></i>"],
                responsive: {
                    0: {
                        items: param.quantidadePorLinhaMobile
                    },
                    768: {
                        items: param.quantidadePorLinhaTablet
                    },
                    1024: {
                        items: param.quantidadePorLinhaComputador
                    }
                }
            });
        };
        if (param.ativarCarrosselComputador == 'sim' && window.innerWidth > 767) {
            addCarousel();
        }
        if (param.ativarCarrosselMobile == 'sim' && window.innerWidth < 768) {
            addCarousel();
        }
    };
   
    window.Botao_Quantidade_Listagem = function(param) {
        if (param.ativar == 'sim') {
            $(".listagem .acoes-produto").each(function() {
                if ($(this).find('a.botao.botao-comprar[title="Adicionar produto ao carrinho"]').length > 0) {
                    $(`<div class="prod-counter">
                        <input type="number" min="1" value="1" class="qtd-prod" />
                        <div class="qtd-nav">
                            <span class="button-quantity button-up">+</span>
                            <span class="button-quantity button-down">-</span>
                        </div>
                    </div>`).prependTo($(this));
                }
            });
            $(document).on("click", ".listagem .button-quantity", function() {
                let e = $(this);
                let t = e.parents('.acoes-produto').find('input[type="number"]').val();
                let o = e.parents('.acoes-produto').find('a.botao.botao-comprar[title="Adicionar produto ao carrinho"]');
                let i = 1;
                e.hasClass("button-up") ? i = parseFloat(t) + 1 : (e.hasClass("button-down")) && (i = parseFloat(t) - 1),
                    i < 1 && (i = 1),
                    e.parents('.acoes-produto').find('input[type="number"]').val(i),
                    e.parents('.acoes-produto').find('input[type="number"]').change(),
                    o.attr("href", o.attr("href").replace(/adicionar.*/g, "adicionar/" + i))
            });
            $(document).on('keyup', '.listagem .prod-counter input[type="number"]', function() {
                let t = $(this).val();
                let o = $(this).parents('.acoes-produto').find('a.botao.botao-comprar[title="Adicionar produto ao carrinho"]');
                if (t <= 1) {
                    t = 1
                    $(this).val(t)
                }
                o.attr("href", o.attr("href").replace(/adicionar.*/g, "adicionar/" + t))
            });
        }
    };
    
    $('#rodape .redes-sociais .lista-redes i').css('color','#fff');
    
    function Ajuste_Produto () {
    	$('a.botao.botao-comprar.principal.grande').after('<h5><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M12 1l8.217 1.826c.457.102.783.507.783.976v9.987c0 2.006-1.003 3.88-2.672 4.992L12 23l-6.328-4.219C4.002 17.668 3 15.795 3 13.79V3.802c0-.469.326-.874.783-.976L12 1zm0 2.049L5 4.604v9.185c0 1.337.668 2.586 1.781 3.328L12 20.597l5.219-3.48C18.332 16.375 19 15.127 19 13.79V4.604L12 3.05zm4.452 5.173l1.415 1.414L11.503 16 7.26 11.757l1.414-1.414 2.828 2.828 4.95-4.95z"/></svg>Garantia de 30 dias ou seu dinheiro de volta</h5>');
    	
    	$('#descricao').appendTo('.pagina-produto .comprar');
    }
    
    if($('.pagina-produto').length){
    	Ajuste_Produto();
    }
    
    $(`<div class="payments-methods span4"><span class="titulo">Formas de Pagamentos</span><ul>
          
<li>
              <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width="38" height="24" aria-labelledby="pi-visa"><title id="pi-visa">Visa</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z" fill="#142688"></path></svg>
            </li><li>
              <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width="38" height="24" aria-labelledby="pi-master"><title id="pi-master">Mastercard</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><circle fill="#EB001B" cx="15" cy="12" r="7"></circle><circle fill="#F79E1B" cx="23" cy="12" r="7"></circle><path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"></path></svg>
            </li><li>
              <svg role="img" aria-labelledby="pi-elo" width="38" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24"><title id="pi-elo">Elo</title><g fill-rule="nonzero" fill="none"><path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#000" opacity=".07"></path><path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" fill="#FFF"></path><g fill="#000"><path d="M13.3 15.5c-.6.6-1.4.9-2.3.9-.6 0-1.2-.2-1.6-.5l-1.2 1.9c.8.6 1.8.9 2.8.9 1.5 0 2.9-.6 3.9-1.6l-1.6-1.6zm-2.1-7.7c-3 0-5.5 2.4-5.5 5.4 0 1.1.3 2.2.9 3.1l9.8-4.2c-.6-2.5-2.7-4.3-5.2-4.3zm-3.3 5.8v-.4c0-1.8 1.5-3.2 3.2-3.2 1 0 1.8.5 2.4 1.1l-5.6 2.5zm11.6-8.3v10.5l1.8.8-.9 2.1-1.8-.8c-.4-.2-.7-.4-.9-.7-.2-.3-.3-.7-.3-1.3V5.3h2.1zM26 10.2c.3-.1.7-.2 1-.2 1.5 0 2.8 1.1 3.1 2.6l2.2-.4c-.5-2.5-2.7-4.4-5.3-4.4-.6 0-1.2.1-1.7.3l.7 2.1zm-2.6 7.1l1.5-1.7c-.7-.6-1.1-1.4-1.1-2.4s.4-1.8 1.1-2.4l-1.5-1.7c-1.1 1-1.8 2.5-1.8 4.1 0 1.7.7 3.1 1.8 4.1zm6.7-3.4c-.3 1.5-1.6 2.6-3.1 2.6-.4 0-.7-.1-1-.2l-.7 2.1c.5.2 1.1.3 1.7.3 2.6 0 4.8-1.9 5.3-4.4l-2.2-.4z"></path></g></g></svg>
            </li><li>
              <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width="38" height="24" aria-labelledby="pi-diners_club"><title id="pi-diners_club">Diners Club</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path d="M12 12v3.7c0 .3-.2.3-.5.2-1.9-.8-3-3.3-2.3-5.4.4-1.1 1.2-2 2.3-2.4.4-.2.5-.1.5.2V12zm2 0V8.3c0-.3 0-.3.3-.2 2.1.8 3.2 3.3 2.4 5.4-.4 1.1-1.2 2-2.3 2.4-.4.2-.4.1-.4-.2V12zm7.2-7H13c3.8 0 6.8 3.1 6.8 7s-3 7-6.8 7h8.2c3.8 0 6.8-3.1 6.8-7s-3-7-6.8-7z" fill="#3086C8"></path></svg>
            </li><li>
              <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24" width="38" height="24" aria-labelledby="pi-american_express"><title id="pi-american_express">American Express</title><g fill="none"><path fill="#000" d="M35,0 L3,0 C1.3,0 0,1.3 0,3 L0,21 C0,22.7 1.4,24 3,24 L35,24 C36.7,24 38,22.7 38,21 L38,3 C38,1.3 36.6,0 35,0 Z" opacity=".07"></path><path fill="#006FCF" d="M35,1 C36.1,1 37,1.9 37,3 L37,21 C37,22.1 36.1,23 35,23 L3,23 C1.9,23 1,22.1 1,21 L1,3 C1,1.9 1.9,1 3,1 L35,1"></path><path fill="#FFF" d="M8.971,10.268 L9.745,12.144 L8.203,12.144 L8.971,10.268 Z M25.046,10.346 L22.069,10.346 L22.069,11.173 L24.998,11.173 L24.998,12.412 L22.075,12.412 L22.075,13.334 L25.052,13.334 L25.052,14.073 L27.129,11.828 L25.052,9.488 L25.046,10.346 L25.046,10.346 Z M10.983,8.006 L14.978,8.006 L15.865,9.941 L16.687,8 L27.057,8 L28.135,9.19 L29.25,8 L34.013,8 L30.494,11.852 L33.977,15.68 L29.143,15.68 L28.065,14.49 L26.94,15.68 L10.03,15.68 L9.536,14.49 L8.406,14.49 L7.911,15.68 L4,15.68 L7.286,8 L10.716,8 L10.983,8.006 Z M19.646,9.084 L17.407,9.084 L15.907,12.62 L14.282,9.084 L12.06,9.084 L12.06,13.894 L10,9.084 L8.007,9.084 L5.625,14.596 L7.18,14.596 L7.674,13.406 L10.27,13.406 L10.764,14.596 L13.484,14.596 L13.484,10.661 L15.235,14.602 L16.425,14.602 L18.165,10.673 L18.165,14.603 L19.623,14.603 L19.647,9.083 L19.646,9.084 Z M28.986,11.852 L31.517,9.084 L29.695,9.084 L28.094,10.81 L26.546,9.084 L20.652,9.084 L20.652,14.602 L26.462,14.602 L28.076,12.864 L29.624,14.602 L31.499,14.602 L28.987,11.852 L28.986,11.852 Z"></path></g></svg>

            </li><li>
              <svg aria-labelledby="pi-pix" role="img" viewBox="0 0 38 24" width="38" height="24" xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com"><title id="pi-pix">Pix</title><path fill="#000" opacity=".07" d="M35 0H3C1.3 0 0 1.301 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.699-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" bx:origin="0.5 0.5"></path><g transform="matrix(.14767 0 0 .14241 -77.79 2.037)" id="pi-pix-layer1"><path d="M633.421 99.49V51.164c0-8.892 7.208-16.1 16.1-16.1l14.268.022c8.865.017 16.043 7.21 16.043 16.075v10.286c0 8.892-7.208 16.1-16.1 16.1h-20.161" id="pi-pix-path2356" fill="none" stroke="#939598" stroke-width="2.976" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity="1"></path><path d="M683.82 35.059h6.189a6.607 6.607 0 016.606 6.607v36.098" id="pi-pix-path2360" fill="none" stroke="#939598" stroke-width="2.976" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity="1"></path><path d="M695.289 29.466l-2.807-2.807a1.783 1.783 0 010-2.522l2.805-2.805a1.786 1.786 0 012.525 0l2.805 2.805a1.783 1.783 0 010 2.522l-2.806 2.807a1.783 1.783 0 01-2.522 0" id="pi-pix-path2364" fill="#32bcad" fill-opacity="1" fill-rule="nonzero" stroke="none" stroke-width=".353"></path><path d="M708.49 35.027h6.137c3.158 0 6.186 1.254 8.419 3.486l14.356 14.357a4.762 4.762 0 006.735 0l14.304-14.304a11.906 11.906 0 018.418-3.487h4.99" id="pi-pix-path2368" fill="none" stroke="#939598" stroke-width="2.976" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity="1"></path><path d="M708.49 77.448h6.137c3.158 0 6.186-1.254 8.419-3.487l14.356-14.356a4.762 4.762 0 016.735 0l14.304 14.304a11.906 11.906 0 008.418 3.487h4.99" id="pi-pix-path2372" fill="none" stroke="#939598" stroke-width="2.976" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity="1"></path><path d="M596.827 86.62c-3.08 0-5.977-1.2-8.156-3.377l-11.777-11.777c-.827-.829-2.268-.826-3.094 0l-11.82 11.82a11.463 11.463 0 01-8.156 3.377h-2.321l14.916 14.916c4.658 4.658 12.21 4.658 16.869 0l14.958-14.959z" id="pi-pix-path2376" fill="#32bcad" fill-opacity="1" fill-rule="nonzero" stroke="none" stroke-width=".353"></path><path d="M553.824 44.963c3.08 0 5.977 1.2 8.156 3.377l11.82 11.822a2.19 2.19 0 003.094-.001l11.777-11.778a11.463 11.463 0 018.156-3.377h1.419l-14.958-14.958c-4.659-4.658-12.211-4.658-16.87 0l-14.915 14.915z" id="pi-pix-path2380" fill="#32bcad" fill-opacity="1" fill-rule="nonzero" stroke="none" stroke-width=".353"></path><path d="M610.618 57.379l-9.039-9.04c-.199.08-.414.13-.642.13h-4.11a8.123 8.123 0 00-5.706 2.364L579.345 62.61a5.637 5.637 0 01-3.997 1.654 5.637 5.637 0 01-3.997-1.653l-11.821-11.82a8.121 8.121 0 00-5.706-2.365h-5.054c-.215 0-.417-.05-.607-.122l-9.075 9.075c-4.659 4.658-4.659 12.21 0 16.869l9.075 9.075c.19-.072.392-.123.607-.123h5.054a8.122 8.122 0 005.706-2.364l11.82-11.82c2.136-2.134 5.86-2.135 7.995.002l11.776 11.775a8.123 8.123 0 005.706 2.365h4.11c.228 0 .443.05.642.13l9.04-9.04c4.658-4.659 4.658-12.21 0-16.87" id="pi-pix-path2384" fill="#32bcad" fill-opacity="1" fill-rule="nonzero" stroke="none" stroke-width=".353"></path><path d="M645.69 95.381c-.666 0-1.443.161-2.21.338v2.945c.531.194 1.139.288 1.721.288 1.477 0 2.177-.499 2.177-1.8 0-1.222-.573-1.77-1.687-1.77m-2.71 5.468v-5.823h.406l.042.253c.683-.16 1.628-.371 2.304-.371.549 0 1.072.083 1.51.438.507.414.667 1.08.667 1.806 0 .76-.253 1.478-.945 1.874-.481.27-1.13.38-1.713.38-.6 0-1.173-.093-1.773-.27v1.713z" id="pi-pix-path2388" fill="#939598" fill-opacity="1" fill-rule="nonzero" stroke="none" stroke-width=".353"></path><path d="M651.618 95.364c-1.477 0-2.136.464-2.136 1.764 0 1.257.65 1.823 2.136 1.823 1.468 0 2.126-.456 2.126-1.756 0-1.257-.65-1.831-2.126-1.831m1.898 3.587c-.49.354-1.147.456-1.898.456-.768 0-1.427-.11-1.908-.456-.54-.38-.76-1.004-.76-1.789 0-.777.22-1.409.76-1.798.481-.345 1.14-.456 1.908-.456.759 0 1.409.11 1.898.456.55.389.76 1.021.76 1.789 0 .785-.22 1.419-.76 1.798" id="pi-pix-path2392" fill="#939598" fill-opacity="1" fill-rule="nonzero" stroke="none" stroke-width=".353"></path><path d="M660.508 99.289l-1.646-3.536h-.034l-1.62 3.536h-.448l-1.755-4.263h.549l1.46 3.579h.034l1.586-3.579h.455l1.63 3.579h.033l1.427-3.579h.531l-1.755 4.263z" id="pi-pix-path2396" fill="#939598" fill-opacity="1" fill-rule="nonzero" stroke="none" stroke-width=".353"></path><path d="M665.894 95.356c-1.367 0-1.832.607-1.916 1.485h3.832c-.042-.97-.54-1.485-1.916-1.485m-.017 4.05c-.82 0-1.35-.117-1.772-.472-.498-.43-.667-1.055-.667-1.772 0-.684.228-1.41.793-1.823.473-.329 1.055-.43 1.663-.43.549 0 1.181.059 1.704.413.617.414.735 1.14.735 1.966h-4.372c.017.878.304 1.655 1.958 1.655.785 0 1.519-.127 2.203-.245v.447c-.71.127-1.494.262-2.245.262" id="pi-pix-path2400" fill="#939598" fill-opacity="1" fill-rule="nonzero" stroke="none" stroke-width=".353"></path><path d="M669.762 99.289v-4.263h.405l.042.254c.903-.227 1.325-.371 2.119-.371h.059v.472h-.119c-.666 0-1.071.093-2.008.338v3.57z" id="pi-pix-path2404" fill="#939598" fill-opacity="1" fill-rule="nonzero" stroke="none" stroke-width=".353"></path><path d="M675.279 95.356c-1.367 0-1.832.607-1.916 1.485h3.832c-.042-.97-.54-1.485-1.916-1.485m-.017 4.05c-.819 0-1.35-.117-1.772-.472-.499-.43-.667-1.055-.667-1.772 0-.684.228-1.41.793-1.823.473-.329 1.055-.43 1.663-.43.549 0 1.182.059 1.704.413.617.414.735 1.14.735 1.966h-4.372c.017.878.304 1.655 1.958 1.655.785 0 1.519-.127 2.203-.245v.447c-.71.127-1.494.262-2.245.262" id="pi-pix-path2408" fill="#939598" fill-opacity="1" fill-rule="nonzero" stroke="none" stroke-width=".353"></path><path d="M683.173 95.652a5.112 5.112 0 00-1.722-.288c-1.476 0-2.177.499-2.177 1.798 0 1.232.574 1.772 1.687 1.772.667 0 1.444-.16 2.212-.33zm.093 3.637l-.042-.254c-.684.16-1.63.372-2.305.372-.548 0-1.071-.076-1.51-.439-.507-.414-.667-1.08-.667-1.806 0-.76.253-1.477.945-1.865.481-.279 1.131-.388 1.722-.388.59 0 1.165.101 1.764.27v-1.95h.498v6.06z" id="pi-pix-path2412" fill="#939598" fill-opacity="1" fill-rule="nonzero" stroke="none" stroke-width=".353"></path><path d="M690.972 95.381c-.667 0-1.443.161-2.211.338v2.937c.54.202 1.14.296 1.722.296 1.476 0 2.176-.499 2.176-1.8 0-1.222-.573-1.77-1.687-1.77m1.274 3.645c-.48.27-1.13.38-1.713.38a6.07 6.07 0 01-1.907-.321l-.026.203h-.338v-6.06h.499v2.034c.683-.151 1.603-.354 2.253-.354.55 0 1.072.083 1.51.438.507.414.667 1.08.667 1.806 0 .76-.253 1.478-.945 1.874" id="pi-pix-path2416" fill="#939598" fill-opacity="1" fill-rule="nonzero" stroke="none" stroke-width=".353"></path><path d="M693.852 100.926v-.464c.245.025.473.042.634.042.616 0 .987-.177 1.333-.878l.16-.337-2.228-4.263h.574l1.908 3.68h.033l1.815-3.68h.565l-2.397 4.786c-.438.87-.911 1.156-1.78 1.156-.195 0-.405-.017-.617-.042" id="pi-pix-path2420" fill="#939598" fill-opacity="1" fill-rule="nonzero" stroke="none" stroke-width=".353"></path><path d="M705.51 96.858h-1.655v1.494h1.662c1.14 0 1.57-.127 1.57-.751 0-.668-.59-.743-1.578-.743m-.303-2.422h-1.35v1.519h1.358c1.122 0 1.57-.135 1.57-.768 0-.675-.566-.751-1.578-.751m2.565 4.448c-.608.388-1.342.405-2.684.405h-2.523v-5.781h2.464c1.156 0 1.865.016 2.456.371.422.253.59.641.59 1.148 0 .607-.252 1.013-.911 1.283v.033c.743.17 1.224.55 1.224 1.368 0 .556-.202.92-.616 1.173" id="pi-pix-path2424" fill="#939598" fill-opacity="1" fill-rule="nonzero" stroke="none" stroke-width=".353"></path><path d="M713.436 97.5a17.866 17.866 0 00-1.536-.068c-.87 0-1.174.177-1.174.574 0 .371.254.574.92.574.557 0 1.224-.126 1.79-.254zm.253 1.789l-.034-.254c-.726.178-1.57.372-2.312.372-.457 0-.946-.06-1.292-.313-.32-.227-.472-.599-.472-1.03 0-.48.21-.928.717-1.155.447-.211 1.046-.228 1.595-.228.447 0 1.046.025 1.545.06v-.077c0-.667-.44-.886-1.638-.886-.464 0-1.03.024-1.57.075v-.86c.6-.05 1.275-.085 1.832-.085.742 0 1.511.06 1.983.397.49.346.583.828.583 1.46v2.524z" id="pi-pix-path2428" fill="#939598" fill-opacity="1" fill-rule="nonzero" stroke="none" stroke-width=".353"></path><path d="M720.19 99.289v-2.355c0-.776-.396-1.055-1.106-1.055-.522 0-1.18.135-1.738.27v3.14h-1.19v-4.263h.97l.043.27c.75-.193 1.587-.387 2.279-.387.523 0 1.055.075 1.46.438.337.305.464.726.464 1.334v2.608z" id="pi-pix-path2432" fill="#939598" fill-opacity="1" fill-rule="nonzero" stroke="none" stroke-width=".353"></path><path d="M724.734 99.407c-.549 0-1.149-.076-1.587-.447-.523-.423-.675-1.089-.675-1.807 0-.675.22-1.41.869-1.822.532-.347 1.19-.422 1.874-.422.49 0 .97.034 1.502.083v.912c-.431-.041-.946-.076-1.359-.076-1.131 0-1.662.355-1.662 1.334 0 .92.396 1.316 1.324 1.316.54 0 1.174-.1 1.79-.219v.877c-.667.136-1.393.27-2.076.27" id="pi-pix-path2436" fill="#939598" fill-opacity="1" fill-rule="nonzero" stroke="none" stroke-width=".353"></path><path d="M730.325 95.803c-1.131 0-1.63.354-1.63 1.325 0 .97.49 1.385 1.63 1.385 1.122 0 1.611-.347 1.611-1.318 0-.97-.48-1.392-1.611-1.392m2.042 3.157c-.523.353-1.207.447-2.042.447-.853 0-1.536-.102-2.05-.447-.592-.388-.803-1.03-.803-1.798 0-.769.211-1.418.802-1.806.515-.346 1.198-.447 2.05-.447.845 0 1.52.1 2.043.447.59.388.793 1.037.793 1.797 0 .769-.21 1.419-.793 1.807" id="pi-pix-path2440" fill="#939598" fill-opacity="1" fill-rule="nonzero" stroke="none" stroke-width=".353"></path><path d="M740.03 99.407c-.716 0-1.493-.118-2.075-.6-.692-.574-.903-1.46-.903-2.414 0-.851.27-1.864 1.173-2.455.7-.455 1.57-.548 2.447-.548.642 0 1.3.042 2.018.1v1.039a26.08 26.08 0 00-1.967-.093c-1.646 0-2.346.625-2.346 1.957 0 1.36.65 1.968 1.865 1.968.793 0 1.68-.16 2.574-.347v1.03c-.895.177-1.832.363-2.785.363" id="pi-pix-path2444" fill="#939598" fill-opacity="1" fill-rule="nonzero" stroke="none" stroke-width=".353"></path><path d="M746.313 95.668c-.988 0-1.368.355-1.444 1.005h2.87c-.034-.692-.44-1.005-1.426-1.005m-.178 3.739c-.7 0-1.333-.084-1.806-.473-.506-.421-.684-1.055-.684-1.781 0-.65.212-1.375.803-1.797.522-.372 1.19-.447 1.865-.447.607 0 1.325.067 1.848.43.684.481.743 1.224.75 2.101h-4.05c.025.65.371 1.073 1.57 1.073.742 0 1.57-.11 2.27-.22v.835c-.819.136-1.713.279-2.566.279" id="pi-pix-path2448" fill="#939598" fill-opacity="1" fill-rule="nonzero" stroke="none" stroke-width=".353"></path><path d="M754.206 99.289v-2.355c0-.776-.396-1.055-1.105-1.055-.524 0-1.182.135-1.739.27v3.14h-1.19v-4.263h.97l.043.27c.75-.193 1.587-.387 2.279-.387.523 0 1.055.075 1.46.438.337.305.464.726.464 1.334v2.608z" id="pi-pix-path2452" fill="#939598" fill-opacity="1" fill-rule="nonzero" stroke="none" stroke-width=".353"></path><path d="M758.775 99.407c-.574 0-1.097-.16-1.384-.608-.21-.304-.312-.717-.312-1.291v-1.596h-.861v-.885h.86l.128-1.292h1.054v1.292h1.68v.885h-1.68v1.368c0 .33.025.608.118.81.127.287.405.397.777.397.278 0 .616-.043.852-.084v.852c-.388.076-.836.152-1.232.152" id="pi-pix-path2456" fill="#939598" fill-opacity="1" fill-rule="nonzero" stroke="none" stroke-width=".353"></path><path d="M761.1 99.289v-4.263h.971l.043.27c.785-.219 1.367-.387 2.11-.387.033 0 .084 0 .151.008v1.013c-.135-.008-.295-.008-.413-.008-.583 0-1.021.067-1.672.22v3.147z" id="pi-pix-path2460" fill="#939598" fill-opacity="1" fill-rule="nonzero" stroke="none" stroke-width=".353"></path><path d="M768.701 97.5a17.86 17.86 0 00-1.536-.068c-.869 0-1.173.177-1.173.574 0 .371.253.574.92.574.557 0 1.224-.126 1.79-.254zm.253 1.789l-.033-.254c-.726.178-1.57.372-2.313.372-.456 0-.945-.06-1.291-.313-.32-.227-.473-.599-.473-1.03 0-.48.212-.928.718-1.155.447-.211 1.046-.228 1.595-.228.447 0 1.046.025 1.544.06v-.077c0-.667-.439-.886-1.637-.886-.464 0-1.03.024-1.57.075v-.86c.599-.05 1.275-.085 1.832-.085.742 0 1.51.06 1.983.397.49.346.582.828.582 1.46v2.524z" id="pi-pix-path2464" fill="#939598" fill-opacity="1" fill-rule="nonzero" stroke="none" stroke-width=".353"></path><path id="pi-pix-path2466" d="M771.422 93.23h1.19v6.059h-1.19z" fill="#939598" fill-opacity="1" fill-rule="nonzero" stroke="none" stroke-width=".353"></path></g></svg>
            </li><li>
              <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width="38" height="24" aria-labelledby="pi-boleto"><title id="pi-boleto">Boleto</title><path fill="#fff" d="M35.7 23.965H2.3a2.307 2.307 0 0 1-2.3-2.3v-19.4C0 1 1.035-.035 2.3-.035h33.4c1.265 0 2.3 1.035 2.3 2.3v19.4c0 1.265-1.035 2.3-2.3 2.3z"></path><path fill="#A7A8AB" d="M35.564 23.965H2.436c-1.344 0-2.436-1.077-2.436-2.4v-19.2c0-1.323 1.092-2.4 2.436-2.4h33.128c1.344 0 2.436 1.077 2.436 2.4v19.2c0 1.323-1.092 2.4-2.436 2.4zM2.436.925c-.806 0-1.462.646-1.462 1.44v19.2c0 .794.656 1.44 1.462 1.44h33.128c.806 0 1.462-.646 1.462-1.44v-19.2c0-.794-.656-1.44-1.462-1.44H2.436z" opacity=".25"></path><path d="M8.079 4.945h.7v6.298h-.7zm-1.83 0h.7v6.298h-.7zm7.256 0h1.901v6.298h-1.901zm9.715 0h.95v6.298h-.95zm2.324 0h.95v6.298h-.95zm3.804 0h1.221v6.298h-1.221zm-1.375 0h.395v6.298h-.395zm-6.389 0h.395v6.298h-.395zm-.845 0h.395v6.298h-.395zm-2.746 0h.395v6.298h-.395zm-6.31 0h.395v6.298h-.395zm-1.163 0h.733v6.298h-.733zM6.249 19.3v-6.478H8.68c.495 0 .891.065 1.191.196.299.131.532.333.701.606.17.271.255.556.255.855 0 .276-.075.537-.225.781a1.604 1.604 0 0 1-.679.593c.392.115.694.311.903.588.211.276.317.603.317.98 0 .305-.065.587-.193.847a1.644 1.644 0 0 1-.475.603c-.189.14-.425.247-.709.32a4.328 4.328 0 0 1-1.046.109H6.248zm.86-3.755H8.51c.38 0 .653-.026.817-.075a.903.903 0 0 0 .493-.324.936.936 0 0 0 .166-.567 1.03 1.03 0 0 0-.155-.568c-.103-.164-.25-.278-.442-.338s-.52-.09-.985-.09H7.109v1.963zm0 2.995h1.614c.277 0 .472-.011.585-.032.196-.035.362-.094.495-.176a.946.946 0 0 0 .327-.362c.086-.158.128-.341.128-.547 0-.243-.062-.452-.187-.632a.978.978 0 0 0-.516-.377c-.219-.072-.535-.109-.947-.109H7.109v2.235zm4.813-1.588c0-.867.241-1.509.725-1.927.403-.347.896-.52 1.476-.52.644 0 1.172.211 1.582.633.409.421.614 1.004.614 1.748 0 .603-.09 1.077-.271 1.422a1.92 1.92 0 0 1-.792.805 2.292 2.292 0 0 1-1.132.286c-.657 0-1.188-.21-1.594-.63-.406-.421-.608-1.027-.608-1.817zm.814.002c0 .6.131 1.05.394 1.347.264.299.594.448.994.448.395 0 .724-.149.988-.449.262-.3.394-.757.394-1.371 0-.579-.133-1.018-.397-1.315a1.261 1.261 0 0 0-.985-.448c-.4 0-.73.148-.994.445-.262.297-.394.745-.394 1.344zm4.498 2.346v-6.478h.796V19.3h-.796zm5.231-1.52l.823.109c-.128.478-.368.85-.718 1.114-.35.264-.796.397-1.341.397-.685 0-1.227-.211-1.629-.633-.401-.421-.602-1.013-.602-1.775 0-.787.202-1.399.608-1.834.406-.436.932-.653 1.579-.653.626 0 1.137.213 1.534.639.397.427.596 1.027.596 1.8l-.004.211h-3.497c.03.514.175.909.437 1.182a1.3 1.3 0 0 0 .979.41c.291 0 .54-.077.745-.231.207-.154.369-.4.49-.737zm-2.606-1.276h2.615c-.035-.395-.136-.691-.3-.888a1.216 1.216 0 0 0-.983-.46c-.365 0-.671.122-.92.366-.247.244-.385.572-.412.982zm6.164 2.086l.109.703a2.951 2.951 0 0 1-.599.071c-.288 0-.511-.045-.671-.137-.158-.092-.27-.211-.335-.36s-.097-.463-.097-.941v-2.705h-.588v-.615h.588v-1.161l.796-.478v1.639h.796v.615h-.796v2.751c0 .228.014.374.042.439a.324.324 0 0 0 .136.155.53.53 0 0 0 .271.057l.347-.032zm.487-1.638c0-.867.241-1.509.725-1.927.403-.347.896-.52 1.476-.52.644 0 1.172.211 1.582.633.409.421.614 1.004.614 1.748 0 .603-.09 1.077-.271 1.422a1.92 1.92 0 0 1-.792.805 2.292 2.292 0 0 1-1.132.286c-.657 0-1.188-.21-1.594-.63-.406-.421-.608-1.027-.608-1.817zm.814.002c0 .6.131 1.05.394 1.347.264.299.594.448.994.448.395 0 .724-.149.988-.449.262-.3.394-.757.394-1.371 0-.579-.133-1.018-.397-1.315a1.261 1.261 0 0 0-.985-.448c-.4 0-.73.148-.994.445-.262.297-.394.745-.394 1.344z" fill="#221F1F"></path></svg>
            </li></ul></div>`).appendTo('#rodape .institucional .span9 .row-fluid');
    
     var cnpj = $('#rodape>div:last-child').text();
		$('#rodape>div:last-child').hide();
		
     $('<div class="copyright"><span>'+cnpj+'</span><div>Desenvolvido por <a href="https://digitalnerd.com.br/"> <img src="https://cdn.awsli.com.br/2536/2536406/arquivos/LOGO MARCA SEPARADA - AZUL (1).png"></a></div></div>').appendTo('#rodape');
    
    
    if (window.innerWidth >= 768) {
        $('div#cabecalho').wrapAll('<div class="box-header-full"></div>');
        $('html').scrollTop() > 0 ? $('body').addClass('fixed-header-bar') : $('body').removeClass('fixed-header-bar');
        $(window).scroll(function() {
            $('html').scrollTop() > 0 ? $('body').addClass('fixed-header-bar') : $('body').removeClass('fixed-header-bar');
        });
    }
    if ($('#cabecalho .logo a img').length) {
        $('#rodape .sobre-loja-rodape .titulo').html('');
        $('#cabecalho .logo a img').clone().appendTo('#rodape .sobre-loja-rodape .titulo');
    } else {
        $('#rodape .sobre-loja-rodape .titulo').text(`Sobre a ${$('#cabecalho .logo a').attr('title')}`);
    }
    $(`<div class="separator fundo-principal"></div>`).appendTo('.titulo-categoria strong, .listagem h4, .pagina-produto .span12>.abas-custom .title_description_prod, .marcas strong.title_marca, .title-instagram a');
    if (window.innerWidth <= 767) {
        $(`
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="fill: #fdb907" xml:space="preserve"> <path d="M437.02,74.981C388.667,26.629,324.38,0,256,0S123.333,26.629,74.98,74.981C26.629,123.333,0,187.62,0,256 s26.629,132.667,74.98,181.019C123.333,485.371,187.62,512,256,512s132.667-26.629,181.02-74.981 C485.371,388.667,512,324.38,512,256S485.371,123.333,437.02,74.981z M256,482c-60.844,0-116.142-24.177-156.812-63.419 C121.212,351.287,184.487,305,256,305s134.788,46.287,156.813,113.582C372.142,457.823,316.844,482,256,482z M181,200 c0-41.355,33.645-75,75-75c41.355,0,75,33.645,75,75s-33.645,75-75,75C214.645,275,181,241.355,181,200z M435.34,393.354 c-22.07-51.635-65.404-90.869-117.777-108.35C343.863,265.904,361,234.918,361,200c0-57.897-47.103-105-105-105 c-57.897,0-105,47.103-105,105c0,34.918,17.137,65.904,43.438,85.004c-52.374,17.481-95.708,56.715-117.778,108.35 C47.414,355.259,30,307.628,30,256C30,131.383,131.383,30,256,30s226,101.383,226,226C482,307.628,464.586,355.259,435.34,393.354 z"></path></svg>
        `).appendTo('.atalhos-mobile ul li .icon-user');
        $('html').scrollTop() > 170 ? $('body').addClass('busca-fixa') : $('body').removeClass('busca-fixa');
        $(window).scroll(function() {
            $('html').scrollTop() > 170 ? $('body').addClass('busca-fixa') : $('body').removeClass('busca-fixa');
        });
    }
    $('.mask-background').click(function() {
        $('#js_hamb').click();
    });
    $('.carrinho>a i').removeClass('fundo-principal');
});