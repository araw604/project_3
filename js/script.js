$(function() {

   // set some initial variables
   var albumData,
       albumItems,
       artistName,
       itunesUrl,
       $albumList = $('.album-list');

   // when the form is submitted
   $('#album-search').on('submit', function(event) {
    $('#clicktodis').hide();
      event.preventDefault();
      $('#loader').show();
      $('.loadmore').show();
      // reset all the things
      $albumList.empty();
      albumData, albumItems = '',

      // get the search string
      artistName = $('#artist-name').val().replace(/ /g, '+'),
      itunesUrl = 'https://api.instagram.com/v1/tags/'+artistName+'/media/recent?count=12&client_id=90787d64fcb1442e941d0420ab7a0c9f';

      // make the call to the endpoint
      $.ajax({
         method: 'GET',
         url: itunesUrl,
         dataType: 'jsonp'
      })
      // if it works...
      .done(function(results) {
         albumData = results.data;

         if ( albumData.length !== 0 ) {
            $.each(albumData, function(key, value) {
               // albumItems += '<span class="border1lines">';
               albumItems += '<li class="border1lines">';
               albumItems += '<img src="' + value.images.standard_resolution.url + '" />';
               // albumItems += '<br>';
               // albumItems += /*'<p>' + */value.caption.from.username /*+ '</p>'*/;
               albumItems += '<div class="container">';
               albumItems += '<div class="item1">';
               albumItems += '<img class="rounded" src="' + value.caption.from.profile_picture + '" />';
               albumItems += '</div>';
               albumItems += '<div class="item2">';
               albumItems += '<p class="username">' + value.caption.from.username + '</p>';
               albumItems += '<p>';
               albumItems += '<i class="fa fa-heart"></i> ' +value.likes.count+ ' ';
               albumItems += '<i class="fa fa-comments"></i> ' +value.comments.count;
               albumItems += '</p>';
               
               albumItems += '</div>';
               albumItems += '</div>';
               albumItems += '</div>';
               albumItems += '</li>';


               // albumItems += '</span>';
            });
         } else {
            albumItems += '<p style="margin-top: 18px;">Sorry, artist not found.</p>';
         }

         $albumList.append(albumItems);
      })
      // and if it fails...
      .fail(function() {
         $albumList.append('<li>Sorry! There was a problem, please try again.</li>');
      })

      .always(function() {
         $('#loader').hide();
      });
   });
});