//	Edge Alerts v1.2, Copyright 2014, Joe Mottershaw, https://github.com/joemottershaw/
//	===================================================================================

	;(function($, window, document, undefined) {
		var pluginName = 'edgeAlerts',
			defaults = {
				type: 'alert',
				title: null,
				message: null,
				cancelText: 'Cancel',
				continueText: 'Continue',
				reverseButtons: false,
				revealSpeed: 400,
				background: 'rgba(0, 0, 0, .8)',
				overlayClose: true,
				closeButton: true,
				enterKey: true,
				escKey: true,
				callbackInit: function() {},
				callbackBeforeOpen: function() {},
				callbackAfterOpen: function() {},
				callbackConfirm: function() {},
				callbackBeforeClose: function() {},
				callbackAfterClose: function() {},
				callbackError: function() {},
				errorMessage: 'Error loading content.'
			};

		function edgeAlerts(element, options) {
			this.element = element,
			this.$element = $(this.element);

			this.options = $.extend({}, defaults, options);

			this._defaults = defaults,
			this._name = pluginName;

			$edgeAlerts = $('<div>', { 'class': 'edge-alerts-overlay' }),
			$close = $('<div>', { 'class': 'edge-alerts-close' }),
			$container = $('<div>', { 'class': 'edge-alerts-container' }),
			$popupHead = $('<div>', { 'class': 'edge-alerts-popup-head' }),
			$popupBody = $('<div>', { 'class': 'edge-alerts-popup-body' }),
			$popupMessage = $('<div>', { 'class': 'edge-alerts-popup-message' }),
			$popupButtons = $('<div>', { 'class': 'edge-alerts-popup-buttons' }),
			$popupCancel = $('<button class="edge-alerts-popup-cancel">' + this.options.cancelText + '</div>'),
			$popupContinue = $('<button class="edge-alerts-popup-continue">' + this.options.continueText + '</div>'),
			$error = $('<div class="edge-alerts-error">' + this.options.errorMessage + '</div>');

			keyEnter = 13,
			keyEsc = 27;

			this.init();
		}

		function winHeight() {
			return window.innerHeight ? window.innerHeight : $(window).height();
		}

		edgeAlerts.prototype = {
			init: function() {
				$this = this;

				// Element click
					$this.openEdgeAlerts();

				// Callback
					this.options.callbackInit.call(this);
			},

			openEdgeAlerts: function() {
				$this = this;

				// Before callback
					this.options.callbackBeforeOpen.call(this);

				// Build
					$this.buildEdgeAlerts();
					$this.adjustContent();

					$(window).on('resize', function() {
						$this.adjustContent();
					});

				// Interaction
					if ($this.options.overlayClose)
						$edgeAlerts.on('click', function(e) {
							if (e.target === this || $(e.target).hasClass('edge-alerts-container') || $(e.target).hasClass('edge-alerts-error'))
								$this.closeEdgeAlerts();
						});

					$close.on('click', function() {
						$this.closeEdgeAlerts();
					});

					$popupCancel.on('click', function() {
						$this.closeEdgeAlerts();
					});

					$popupContinue.on('click', function() {
						$this.closeEdgeAlerts();

						if ($this.options.type == 'confirm')
							$this.options.callbackConfirm.call(this);
					});

					$('body').off('keyup').on('keyup', function(e) {
						if ($this.options.escKey && e.keyCode === keyEsc)
							$this.closeEdgeAlerts();

						if ($this.options.enterKey && e.keyCode === keyEnter)
							$popupContinue.trigger('click');
					});

				// After callback
					this.options.callbackAfterOpen.call(this);
			},

			buildEdgeAlerts: function() {
				$this = this;

				// Build
					if ($('.edge-alerts-overlay').size() === 0) {
						$('body').prepend($edgeAlerts.css({ 'background-color': this.options.background }));
							$edgeAlerts.append($close, $container);

						if (this.options.type == 'alert' || this.options.type == 'confirm')
							$container.append($popupHead.append(this.options.title), $popupBody.append($popupMessage.append(this.options.message), $popupButtons));

							if (this.options.type == 'alert')
								$popupButtons.append($popupContinue);
							else if (this.options.type == 'confirm')
								if (this.options.reverseButtons)
									$popupButtons.append($popupContinue, $popupCancel);
								else
									$popupButtons.append($popupCancel, $popupContinue);
							else
								$this.edgeAlertsError();

						$edgeAlerts.fadeIn(this.options.revealSpeed);
					}
			},

			adjustContent: function() {
				$this = this;

				// Overlay to viewport
					$edgeAlerts.css({ 'height': winHeight() });

				// Center dialog
					$container.css({ 'margin-top': '-' + $container.height() / 2 + 'px', 'margin-left': '-' + $container.width() / 2 + 'px' });
			},

			closeEdgeAlerts: function() {
				$this = this;

				// Before callback
					this.options.callbackBeforeClose.call(this);

				// Remove
					$edgeAlerts.fadeOut(this.options.revealSpeed, function() {
						$popupHead.empty();
						$popupMessage.empty();
						$popupButtons.empty();
						$(this).remove();
					});

				// After callback
					this.options.callbackAfterClose.call(this);
			},

			edgeAlertsError: function() {
				$this = this;

				// Callback
					this.options.callbackError.call(this);

				// Display
					$container.append($error);
			}
		};
		
		$.fn[pluginName] = function(options) {
			if (!$.data(this, pluginName))
				$.data(this, pluginName, new edgeAlerts(this, options));
		};
	})(jQuery, window, document);