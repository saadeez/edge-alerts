/*	Edge Alerts v1.0, Copyright 2014, Joe Mottershaw, https://github.com/joemottershaw/
//	=================================================================================== */

	(function($) {
		$.fn.edgeAlerts = function(options) {
			function winHeight() {
				return window.innerHeight ? window.innerHeight : $(window).height();
			}

			function adjustContainer() {
				var	elementWidth = $container.width(),
					elementHeight = $container.height();

				$container.css({ 'margin-top': '-' + elementHeight / 2 + 'px', 'margin-left': '-' + elementWidth / 2 + 'px' });
			}

			function showEdgeAlerts() {
				// Prevent default actions and lose focus of all elements
					$this.on('click', function(e) {
						e.preventDefault();
					
						$(':focus').blur();
					});

				// Open callback
					if ($.isFunction(settings.callbackOpen)) {
						settings.callbackOpen.call(this);
					}

				// Add Edge Alerts and settings to document with close and container elements
					if ($('.edge-alerts').size() === 0) {
						$this.prepend($edgeAlerts.css({ 'height': winHeight(), 'background-color': settings.background }));

						if (settings.closeButton) {
							$edgeAlerts.append($close, $container);
						} else {
							$edgeAlerts.append($container);
						}
					}

					$edgeAlerts.fadeIn(settings.revealSpeed);

				// Adjust Edge Alerts height and container position on resize
					$(window).resize(function() {
						$edgeAlerts.css({ 'height': winHeight() });
						adjustContainer();
					});

				// Remove Edge Alerts
					if (settings.overlayClose) {
						$edgeAlerts.click(function(e) {
							hideEdgeAlerts();
						});
					}

					if (settings.closeButton) {
						$close.click(function(e) {
							hideEdgeAlerts();
						});
					}

					$(document).on('keyup', function(e) {
						if (settings.escKey) {
							if (e.keyCode == keyEsc) {
								hideEdgeAlerts();
							}
						}
					});

					$error.on('click', function() {
						hideEdgeAlerts();
					});

					$container.click(function(e) {
						e.stopPropagation();
					});

				// Close callback
					if ($.isFunction(settings.callbackClose)) {
						settings.callbackClose.call(this);
					}
			}

			function populateEdgeAlerts() {
				showEdgeAlerts();

				if ($.inArray(settings.type, types) !== -1) {
					if (settings.title === null || settings.message === null) {
						edgeAlertsError();
					} else {
						$container.append($popup);

						if (settings.type == 'alert') {
							$('.edge-alerts-popup-buttons').append('<a href="#" target="_self" class="edge-alerts-popup-continue">' + settings.alertContinueText + '</a>');
						} else if (settings.type == 'confirm') {
							if ($.isFunction(settings.callbackConfirm)) {
								if (settings.reverseButtons) {
									$('.edge-alerts-popup-buttons').append('<a href="#" target="_self" class="edge-alerts-popup-continue">' + settings.confirmContinueText + '</a><a href="#" target="_self" class="edge-alerts-popup-cancel">' + settings.confirmCancelText + '</a>');
								} else {
									$('.edge-alerts-popup-buttons').append('<a href="#" target="_self" class="edge-alerts-popup-cancel">' + settings.confirmCancelText + '</a><a href="#" target="_self" class="edge-alerts-popup-continue">' + settings.confirmContinueText + '</a>');
								}
							} else {
								edgeAlertsError();
							}
						}

						$('.edge-alerts-popup-buttons a').on('click', function(e) {
							e.preventDefault();
						});

						$('.edge-alerts-popup-cancel').on('click', function() {
							hideEdgeAlerts();
						});

						$('.edge-alerts-popup-continue').on('click', function() {
							if (settings.type == 'confirm') {
								settings.callbackConfirm.call(this);
							}

							hideEdgeAlerts();
						});

						$(document).on('keyup', function(e) {
							if (settings.enterKey) {
								if (e.keyCode == keyEnter) {
									if (settings.type == 'alert') {
										$('.edge-alerts-popup-continue').trigger('click');
									} else if (settings.type == 'confirm') {
										$('.edge-alerts-popup-confirm-continue').trigger('click');
									}
								}
							}
						});
					}
				} else {
					edgeAlertsError();
				}

				adjustContainer();
			}

			function hideEdgeAlerts() {
				// Before callback
					if ($.isFunction(settings.callbackBeforeClose)) {
						settings.callbackBeforeClose.call(this);
					}

				// Fade out Edge Alerts and remove element from document
					$edgeAlerts.fadeOut(settings.revealSpeed, function() {
						$edgeAlerts.remove();
					});

				// After callback
					if ($.isFunction(settings.callbackAfterClose)) {
						settings.callbackAfterClose.call(this);
					}
			}

			function edgeAlertsError() {
				$container.empty().append($error);
			}

			// Default Settings
				var settings = $.extend({
					type: 'alert',
					title: null,
					message: null,
					callbackConfirm: null,
					alertContinueText: 'Continue',
					confirmCancelText: 'Cancel',
					confirmContinueText: 'Continue',
					reverseButtons: false,
					revealSpeed: 400,
					background: 'rgba(0, 0, 0, .8)',
					overlayClose: true,
					closeButton: true,
					enterKey: true,
					escKey: true,
					callbackOpen: null,
					callbackClose: null,
					errorMessage: 'It appears there was an error with the requested dialog popup.'
				}, options),

				types = ['alert', 'confirm'],

				$this = this,
				$edgeAlerts = $('<div>', { 'class': 'edge-alerts' }),
				$close = $('<div>', { 'class': 'edge-alerts-close' }),
				$container = $('<div>', { 'class': 'edge-alerts-container' }),
				$popup = $('<div class="edge-alerts-popup-head">' + settings.title + '</div><div class="edge-alerts-popup-body"><div class="edge-alerts-popup-message">' + settings.message + '</div><div class="edge-alerts-popup-buttons edge-alerts-clearfix"></div></div>'),
				$error = $('<div class="edge-alerts-error">' + settings.errorMessage + '</div>'),
				keyEnter = 13,
				keyEsc = 27;

			// Content
				populateEdgeAlerts();

		};
	})(jQuery);