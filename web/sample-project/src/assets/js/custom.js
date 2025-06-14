$(document).ready(function () {

	"use strict";

	var body = $("body");

	$(function () {
		$(".preloader").fadeOut();
		$('#side-menu').metisMenu();
	});

	/* ===== Open-Close Right Sidebar ===== */

	$(".right-side-toggle").on("click", function () {
		$(".right-sidebar").slideDown(50).toggleClass("shw-rside");
		$(".fxhdr").on("click", function () {
			body.toggleClass("fix-header"); /* Fix Header JS */
		});
		$(".fxsdr").on("click", function () {
			body.toggleClass("fix-sidebar"); /* Fix Sidebar JS */
		});

		/* ===== Service Panel JS ===== */

		var fxhdr = $('.fxhdr');
		var fxsdr = $('.fxsdr');
		if (body.hasClass("fix-header")) {
			fxhdr.attr('checked', true);
		} else {
			fxhdr.attr('checked', false);
		}
		if (body.hasClass("fix-sidebar")) {
			fxsdr.attr('checked', true);
		} else {
			fxsdr.attr('checked', false);
		}
	});

	/* ===========================================================
        Loads the correct sidebar on window load.
        collapses the sidebar on window resize.
        Sets the min-height of #page-wrapper to window size.
    =========================================================== */

	$(function () {
		var set = function () {
			var topOffset = 60,
				width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width,
				height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
			if (width < 768) {
				$('div.navbar-collapse').addClass('collapse');
				topOffset = 100; /* 2-row-menu */
			} else {
				$('div.navbar-collapse').removeClass('collapse');
			}

			/* ===== This is for resizing window ===== */

			if (width < 1170) {
				body.addClass('content-wrapper');
				$(".open-close i").removeClass('icon-arrow-right-circle');
				$(".sidebar-nav, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
				$(".logo span").hide();
			} else {
				body.removeClass('content-wrapper');
				$(".open-close i").addClass('icon-arrow-right-circle');
				$(".logo span").show();
			}

			height = height - topOffset;
			if (height < 1) {
				height = 1;
			}
			if (height > topOffset) {
				$("#page-wrapper").css("min-height", (height) + "px");
			}
		},
			url = window.location,
			element = $('ul.nav a').filter(function () {
				return this.href === url || url.href.indexOf(this.href) === 0;
			}).addClass('active').parent().parent().addClass('in').parent();
		if (element.is('li')) {
			element.addClass('active');
		}
		$(window).ready(set);
		$(window).on("resize", set);
	});

	/* ===================================================
        This is for click on open close button sidebar open close
    =================================================== */

	$("body").on('click', ".open-close", function () {
		if ($("body").hasClass("content-wrapper")) {
			$("body").trigger("resize");
			$(".sidebar-nav, .slimScrollDiv").css("overflow", "hidden").parent().css("overflow", "visible");
			$("body").removeClass("content-wrapper");
			$(".open-close i").addClass("icon-arrow-right-circle");
			$(".logo span").show();
		} else {
			$("body").trigger("resize");
			$(".sidebar-nav, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
			$("body").addClass("content-wrapper");
			$(".open-close i").removeClass("icon-arrow-right-circle");
			$(".logo span").hide();
		}
	});

	/* ===== Collapsible Panels JS ===== */

	(function ($, window, document) {
		var panelSelector = '[data-perform="panel-collapse"]',
			panelRemover = '[data-perform="panel-dismiss"]';
		$(panelSelector).each(function () {
			var collapseOpts = {
				toggle: false
			},
				parent = $(this).closest('.panel'),
				wrapper = parent.find('.panel-wrapper'),
				child = $(this).children('i');
			if (!wrapper.length) {
				wrapper = parent.children('.panel-heading').nextAll().wrapAll('<div/>').parent().addClass('panel-wrapper');
				collapseOpts = {};
			}
			wrapper.collapse(collapseOpts).on('hide.bs.collapse', function () {
				child.removeClass('ti-minus').addClass('ti-plus');
			}).on('show.bs.collapse', function () {
				child.removeClass('ti-plus').addClass('ti-minus');
			});
		});

		/* ===== Collapse Panels ===== */

		$(document).on('click', panelSelector, function (e) {
			e.preventDefault();
			var parent = $(this).closest('.panel'),
				wrapper = parent.find('.panel-wrapper');
			wrapper.collapse('toggle');
		});

		/* ===== Remove Panels ===== */

		$(document).on('click', panelRemover, function (e) {
			e.preventDefault();
			var removeParent = $(this).closest('.panel');

			function removeElement() {
				var col = removeParent.parent();
				removeParent.remove();
				col.filter(function () {
					return ($(this).is('[class*="col-"]') && $(this).children('*').length === 0);
				}).remove();
			}
			removeElement();
		});
	}(jQuery, window, document));

	/* ===== Tooltip Initialization ===== */

	$(function () {
		$('[data-toggle="tooltip"]').tooltip();
	});

	/* ===== Popover Initialization ===== */

	$(function () {
		$('[data-toggle="popover"]').popover();
	});

	/* ===== Task Initialization ===== */

	$(".list-task li label").on("click", function () {
		$(this).toggleClass("task-done");
	});
	$(".settings_box a").on("click", function () {
		$("ul.theme_color").toggleClass("theme_block");
	});

	/* ===== Collepsible Toggle ===== */

	$(".collapseble").on("click", function () {
		$(".collapseblebox").fadeToggle(350);
	});

	/* ===== Sidebar ===== */

	$('.slimscrollleft').slimScroll({
		height: '100%',
		position: 'left',
		size: "5px",
		color: '#dcdcdc'
	});
	$('.slimscrollsidebar').slimScroll({
		height: '100%',
		position: 'left',
		size: "5px",
		color: '#dcdcdc'
	});
	$('.chat-list').slimScroll({
		height: '100%',
		position: 'left',
		size: "5px",
		color: '#dcdcdc'
	});

	/* ===== Resize all elements ===== */

	body.trigger("resize");

	/* ===== Visited ul li ===== */

	$('.visited li a').on("click", function (e) {
		$('.visited li').removeClass('active');
		var $parent = $(this).parent();
		if (!$parent.hasClass('active')) {
			$parent.addClass('active');
		}
		e.preventDefault();
	});

	/* ===== Login and Recover Password ===== */

	$('#to-recover').on("click", function () {
		$("#loginform").slideUp();
		$("#recoverform").fadeIn();
	});

	/* ================================================================= 
        this is for close icon when navigation open in mobile view
    ================================================================= */

	$(".navbar-toggle").on("click", function () {
		$(".navbar-toggle i").toggleClass("ti-menu").addClass("ti-close");
	});
});
