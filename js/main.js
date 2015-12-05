(function ($) {
	"use strict";

	/**
	 * Helper funtion for generating list item template
	 */

	function itemTemplate( imageURL, profileURL, username, comments, likes ) {

		var template = '';

		template += '<li>';
		template += '<div class="inner-item-wrapper">';
		template += '<a href="' + imageURL + '" class="fancybox"><img src="' + imageURL + '" /></a>';
		template += '<div class="photo-meta">';
		template += '<div class="profile-wrapper"><img src="' + profileURL + '" /></div>';
		template += '<div class="user-social">';
		template += '<p>' + username + '</p>';
		template += '<p><span>' + comments + '</span>';
		template += '<span>' + likes + '</span></p>';
		template += '</div>';
		template += '</div>';
		template += '</div>';
		template += '</li>';

		return template;
	}

   /**
    * Ajax request to Instagram API
    */

   $(function() {

			// set some initial variables
			var igData,
				 igItems,
				 searchTerm,
				 endpoint,
				 nextURL,
				 $loader = $('.ajax-loader'),
				 $photos = $('.photos'),
				 $loadMore = $('.load-button');

			/**
			 * INITIAL CALL
			 */

			$('.search-form').on('submit', function(event) {

				// stop the default behaviour
				event.preventDefault();

				// reset all the things
				$photos.empty();
				igData = '';
				igItems = '';

			    // get the search string
			    searchTerm = $('#hash-tag').val().replace(/ /g, '');
				endpoint = 'https://api.instagram.com/v1/tags/' + searchTerm + '/media/recent?count=12&client_id=b8586475183a4ad89a5a0ebd4a36fbc2';

				// hide the placeholder, show the loader gif
				$('.search-placeholder').hide();
				$loader.css('display', 'block');

				// make the call to the endpoint
				$.ajax({
					method: 'GET',
					url: endpoint,
					dataType: 'jsonp'
				}).done(function(data) {

					igData = data.data;
					nextURL = data.pagination.next_url;

					// append the photos if we found any
					if ( igData.length !== 0 ) {

						igItems += '<ul>';

			          $.each(igData, function(key, value) {

							igItems += itemTemplate(
								value.images.standard_resolution.url,
								value.user.profile_picture,
								value.user.username,
								value.comments.count,
								value.likes.count
							);

			          });

						igItems += '</ul>';

			       } else {
			          igItems += '<p class="feedback">Sorry, nothing found! Please try again.</p>';
			       }

					// show and hide things now...
					$loadMore.fadeIn('slow').css('display', 'block');
					$photos.hide().append(igItems).fadeIn('slow');

				}).fail(function() {

					$photos.append('<p class="feedback">Sorry! There was a problem, please try again.</p>');

				}).always(function() {

					$loader.hide();

				}); // end ajax

			}); // end on 'submit'

			/**
			 * LOAD MORE
			 */

			$('.load-button').on('click', function() {

				// bail if there's no pagination link
				if ( nextURL.length === 0 ) {
					return;
				}

				// display our loader again
				$loader.css('display', 'block');

				$.ajax({
					method: 'GET',
					url: nextURL,
					dataType: 'jsonp'
				}).done(function(data) {

					var moreData = data.data;
					var moreItems = '';

					// append the photos if we found any
					if ( moreData.length !== 0 ) {

						$.each(moreData, function(key, value) {
							moreItems += itemTemplate(
								value.images.standard_resolution.url,
								value.user.profile_picture,
								value.user.username,
								value.comments.count,
								value.likes.count
							);
						});

						// append the new list items
						$(moreItems).hide().appendTo('.photos ul').fadeIn('slow');

						// reset the pagination URL
						nextURL = data.pagination.next_url; // reset the nextURL
					}

				}).fail(function() {

					$photos.append('<p class="feedback">Sorry! There was a problem, please try again.</p>');

				}).always(function() {

					$loader.hide();

				}); // end ajax

			}); // end on 'click'

		});

		/**
		 * Fancybox implementation
		 */

		$(function() {
			$('.fancybox').fancybox();
		});

}(jQuery));
