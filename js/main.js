/* =================================
------------------------------------
	Cryptocurrency - Landing Page Template
	Version: 1.0
 ------------------------------------
 ====================================*/


'use strict';


$(window).on('load', function() {
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut();
	$("#preloder").delay(400).fadeOut("slow");

});

(function($) {

	/*------------------
		Navigation
	--------------------*/
	$('.responsive-bar').on('click', function(event) {
		$('.main-menu').slideToggle(400);
		event.preventDefault();
	});


	/*------------------
		Background set
	--------------------*/
	$('.set-bg').each(function() {
		var bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
	});


	/*------------------
		Review
	--------------------*/
	var review_meta = $(".review-meta-slider");
    var review_text = $(".review-text-slider");


    review_text.on('changed.owl.carousel', function(event) {
		review_meta.trigger('next.owl.carousel');
	});

	review_meta.owlCarousel({
		loop: true,
		nav: false,
		dots: true,
		items: 3,
		center: true,
		margin: 20,
		autoplay: true,
		mouseDrag: false,
	});


	review_text.owlCarousel({
		loop: true,
		nav: true,
		dots: false,
		items: 1,
		margin: 20,
		autoplay: true,
		navText: ['<i class="ti-angle-left"><i>', '<i class="ti-angle-right"><i>'],
		animateOut: 'fadeOutDown',
    	animateIn: 'fadeInDown',
	});



	 /*------------------
		Contact Form
	--------------------*/
    $(".check-form").focus(function () {
        $(this).next("span").addClass("active");
    });
    $(".check-form").blur(function () {
        if ($(this).val() === "") {
            $(this).next("span").removeClass("active");
        }
    });


})(jQuery);


// Installing service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
		function showRefreshUI(registration) {
			// TODO: Display a toast or refresh UI.
			// This demo creates and injects a button.
			var button = document.createElement('button');
			button.style.position = 'absolute';
			button.style.bottom = '24px';
			button.style.left = '24px';
			button.textContent = 'Waves Africa has been updated. Click to refresh';
			button.addEventListener('click', function() {
				if (!registration.waiting) {
					// Just to ensure registration.waiting is available before
					// calling postMessage()
					return;
				}
				button.disabled = true;
				registration.waiting.postMessage('skipWaiting');
			});
			document.body.appendChild(button);
		};
		function onNewServiceWorker(registration, callback) {
			if (registration.waiting) {
				// SW is waiting to activate. Can occur if multiple clients open and
				// one of the clients is refreshed.
				return callback();
			}
			function listenInstalledStateChange() {
				registration.installing.addEventListener('statechange', function(event) {
					if (event.target.state === 'installed') {
						// A new service worker is available, inform the user
						callback();
					}
				});
			};
			if (registration.installing) {
				return listenInstalledStateChange();
			}
			// We are currently controlled so a new SW may be found...
			// Add a listener in case a new SW is found,
			registration.addEventListener('updatefound', listenInstalledStateChange);
		}
		window.addEventListener('load', function() {
			var refreshing;
			// When the user asks to refresh the UI, we'll need to reload the window
			navigator.serviceWorker.addEventListener('controllerchange', function(event) {
				if (refreshing) return; // prevent infinite refresh loop when you use "Update on Reload"
				refreshing = true;
				console.log('Controller loaded');
				window.location.reload();
			});
			navigator.serviceWorker.register('/sw.js')
			.then(function (registration) {
					// Track updates to the Service Worker.
				if (!navigator.serviceWorker.controller) {
					// The window client isn't currently controlled so it's a new service
					// worker that will activate immediately
					return;
				}
				registration.update();
				onNewServiceWorker(registration, function() {
					showRefreshUI(registration);
				});
			});
		});
  });
}

