/*! ngTableColumnResizable v0.1.0 by Vitalii Savchuk(esvit666@gmail.com) - https://github.com/esvit/ng-table-resizable-columns - New BSD License */

angular.module("ngTableResizableColumns", []).directive("ngTableResizableColumns", function () {
    function a(a) {
        var b = function (a, b) {
            return function () {
                return a.apply(b, arguments)
            }
        };
        this.pointerdown = b(this.pointerdown, this);
        var c = this;
        this.options = {store: window.store, rigidSizing: !1, resizeFromBody: !0}, this.$table = a, this.setHeaders(), this.restoreColumnWidths(), this.syncHandleWidths(), $(window).on("resize.rc", function () {
            return c.syncHandleWidths()
        })
    }

    var b = function (a) {
        return parseFloat(a.style.width.replace("%", ""))
    }, c = function (a, b) {
        return a.style.width = "" + b.toFixed(2) + "%"
    }, d = function (a) {
        return 0 === a.type.indexOf("touch") ? (a.originalEvent.touches[0] || a.originalEvent.changedTouches[0]).pageX : a.pageX
    };
    return a.prototype.getColumnId = function (a) {
        return this.$table.data("resizable-columns-id") + "-" + a.data("resizable-column-id")
    }, a.prototype.setHeaders = function () {
        return this.$tableHeaders = this.$table.find("thead tr:first th:visible"), this.assignPercentageWidths(), this.createHandles()
    }, a.prototype.destroy = function () {
        return this.$handleContainer.remove(), this.$table.removeData("resizableColumns"), $(window).off(".rc")
    }, a.prototype.assignPercentageWidths = function () {
        var a = this;
        return this.$tableHeaders.each(function (b, d) {
            var e;
            return e = $(d), c(e[0], e.outerWidth() / a.$table.width() * 100)
        })
    }, a.prototype.createHandles = function () {
        var a, b = this;
        return null != (a = this.$handleContainer) && a.remove(), this.$table.before(this.$handleContainer = $("<div class='rc-handle-container' />")), this.$tableHeaders.each(function (a, c) {
            var d;
            if (0 !== b.$tableHeaders.eq(a + 1).length && null == b.$tableHeaders.eq(a).attr("data-noresize") && null == b.$tableHeaders.eq(a + 1).attr("data-noresize"))return d = $("<div class='rc-handle' />"), d.data("th", $(c)), d.appendTo(b.$handleContainer)
        }), this.$handleContainer.on("mousedown touchstart", ".rc-handle", this.pointerdown)
    }, a.prototype.syncHandleWidths = function () {
        var a = this;
        return this.setHeaders(), this.$handleContainer.width(this.$table.width()).find(".rc-handle").each(function (b, c) {
            var d;
            return d = $(c), d.css({left: d.data("th").outerWidth() + (d.data("th").offset().left - a.$handleContainer.offset().left), height: a.options.resizeFromBody ? a.$table.height() : a.$table.find("thead").height()})
        })
    }, a.prototype.saveColumnWidths = function () {
        var a = this;
        return this.$tableHeaders.each(function (c, d) {
            var e;
            return e = $(d), null == e.attr("data-noresize") && null != a.options.store ? a.options.store.set(a.getColumnId(e), b(e[0])) : void 0
        })
    }, a.prototype.restoreColumnWidths = function () {
        var a = this;
        return this.$tableHeaders.each(function (b, d) {
            var e, f;
            return e = $(d), null != a.options.store && (f = a.options.store.get(a.getColumnId(e))) ? c(e[0], f) : void 0
        })
    }, a.prototype.totalColumnWidths = function () {
        var a;
        return a = 0, this.$tableHeaders.each(function (b, c) {
            return a += parseFloat($(c)[0].style.width.replace("%", ""))
        }), a
    }, a.prototype.pointerdown = function (a) {
        var e, f, g, h, i, j = this;
        return a.preventDefault(), h = d(a), e = $(a.currentTarget), f = e.data("th"), g = this.$tableHeaders.eq(this.$tableHeaders.index(f) + 1), i = {left: b(f[0]), right: b(g[0])}, this.$table.addClass("rc-table-resizing"), $(document).on("mousemove.rc touchmove.rc", function (a) {
            var b;
            return b = (d(a) - h) / j.$table.width() * 100, c(g[0], i.right - b), c(f[0], i.left + b)
        }), $(document).one("mouseup touchend", function () {
            return $(document).off("mousemove.rc touchmove.rc"), j.$table.removeClass("rc-table-resizing"), j.syncHandleWidths(), j.saveColumnWidths()
        })
    }, {restrict: "C", priority: 999, require: "ngTable", link: function (b, c) {
        var d;
        b.$watch("$data", function () {
            d.destroy(), d = new a(c)
        }), d = new a(c)
    }}
});
//# sourceMappingURL=ng-table-resizable-columns.map