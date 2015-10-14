$(function() {

   // set some initial variables
   var albumData,
       albumItems,
       artistName,
       itunesUrl,
       $albumList = $('.album-list');

   // when the form is submitted
   $('#album-search').on('submit', function(event) {

      event.preventDefault();

      // reset all the things
      $albumList.empty();
      albumData, albumItems = '',

      // get the search string
      artistName = $('#artist-name').val().replace(/ /g, '+'),
      itunesUrl = "https://itunes.apple.com/search?entity=album&limit=6&term=" + artistName;

      // make the call to the endpoint
      $.ajax({
         method: 'GET',
         url: itunesUrl,
         dataType: 'jsonp'
      })
      // if it works...
      .done(function(data) {
         albumData = data.results;
​
         if ( albumData.length !== 0 ) {
            $.each(albumData, function(key, value) {
               albumItems += '<li>';
               albumItems += '<img src="' + value['artworkUrl100'] + '" />';
               albumItems += '<p>' + value['collectionName'] + '</p>';
               albumItems += '</li>';
            });
         } else {
            albumItems += '<p style="margin-top: 18px;">Sorry, artist not found.</p>';
         }

         $albumList.append(albumItems);
      })
      // and if it fails...
      .fail(function() {
         $albumList.append('<li>Sorry! There was a problem, please try again.</li>');
      });
   });
});