define(['jquery', 'jquery-carousel', 'base/carousel', 'base/webmaker', 'base/mediaGallery', 'base/privacy', 'base/ui', 'uri' ],
  function ( $, $carousel, carousel, webmaker, MediaGallery, privacy, UI, URI ) {
  'use strict';
  $(document).ready(function() {
    var $body = $('body'),
        media = new MediaGallery();

    // Search
    var query = $( ".search-poster" ).attr( "data-query" ),
        queryKeys = URI.parse( window.location.href ).queryKey,
        $searchPoster = $( ".search-poster" ),
        $searchField = $( "#search-field" ),
        $forkBtns = $( ".make-fork-btn" ),
        $nextBtn = $( ".next-page" ),
        $prevBtn = $( ".previous-page" );

    function onKeyDown() {
      $( "html, body" ).animate({ scrollTop: 0 }, 200 );
      $searchPoster.addClass( "focus" );
      $searchField.off( "keydown", onKeyDown );
    }

    if ( query ) {
      $searchField.val( query );
      onKeyDown();
    } else {
      $searchField.on( "keydown", onKeyDown );
    }

    $forkBtns.click( function( e ) {
      e.stopPropagation();
    });

    $nextBtn.click( function( e ) {
      queryKeys.page = queryKeys.page ? parseInt( queryKeys.page, 10 ) + 1 : 2;
      window.location.search = $.param( queryKeys );
    });

    $prevBtn.click( function( e ) {
      queryKeys.page = queryKeys.page > 1 ? parseInt( queryKeys.page, 10 ) - 1 : 1;
      window.location.search = $.param( queryKeys );
    });

    media.init();

    UI.select( '#search-filter', function( val ) {
      switch ( val ) {
        case 'recent':
          break;

        // case 'recommended':
        //   break;

        case 'guide:popcorn':
          media.search( { contentType: 'application/x-popcorn' } );
          break;

        case 'guide:thimble':
          media.search( { contentType: 'application/x-thimble' } );
          break;

        case 'title':
          media.search( { title: true } );
          break;

        default:
          media.search( { tags: [val], contentType: 'application/x-thimble' } );
          break;
      }
    });

    carousel.attachToCTA();
    carousel.attachToPartners();

    privacy.attach();
  });
  });
