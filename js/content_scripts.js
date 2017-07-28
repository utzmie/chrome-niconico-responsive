;!function($) {

	var url = location.href;

	// URLチェック
	function is_page( page_type ) {
		if ( url.indexOf( 'www.nicovideo.jp/watch/' ) != -1 ) {
			return page_type == "nicovideo";
		} else if ( url.indexOf( 'live.nicovideo.jp/watch/' ) != -1 ) {
			return page_type == "nicolive";
		} else if ( url.indexOf( 'live2.nicovideo.jp/watch/' ) != -1 ) {
			return page_type == "nicolive2";
		}
	}

	// プレイヤーのチェック： Flash or HTML5
	function is_player( player_type ) {

		// ニコニコ動画
		if ( is_page( 'nicovideo' ) ) {

			// HTML5
			if ( $('.SwitchToFlashLead')[0] ) {
				return player_type == "html5";
			}
			// Flash
			else if ( $('#switchToHtml5')[0] ) {
				return player_type == "flash";
			}

		// 生放送
		} else if ( is_page( 'nicolive2' ) ) {

			// HTML5
			if ( $('#message-for-html5player-block')[0] || $('.message-for-html5player')[0] ) {
				return player_type == "html5";
			}
			// Flash
			else if ( $('#playerswf')[0] ) {
				return player_type == "flash";
			}
		}
	}

	var responsive_mode = {
		add_class: function() {
			// ニコニコ動画
			if ( is_page( 'nicovideo' ) ) {
				if ( is_player( 'html5' ) ) {
					$('html').addClass( 'utz-nico-responsive-video-html5' );
				} else {
					$('html').addClass( 'utz-nico-responsive-video-flash' );
				}
			}
			// 生放送：新配信
			else if ( is_page( 'nicolive2' ) ) {
				if ( is_player( 'html5' ) ) {
					$('html').addClass( 'utz-nico-responsive-live2-html5' );
				} else {
					$('html').addClass( 'utz-nico-responsive-live2-flash' );
				}
			}
			// 生放送：旧配信（Flash）
			else if ( is_page( 'nicolive' ) ) {
				$('html').addClass( 'utz-nico-responsive-live-flash' );
			}
		},
		remove_class: function() {
			$('html').removeClass( 'utz-nico-responsive-video-html5' );
			$('html').removeClass( 'utz-nico-responsive-video-flash' );
			$('html').removeClass( 'utz-nico-responsive-live2-html5' );
			$('html').removeClass( 'utz-nico-responsive-live2-flash' );
			$('html').removeClass( 'utz-nico-responsive-live-flash' );
		}
	}


	// 
	// Popupの機能ON/OFFチェック
	// 
	chrome.storage.local.get( 'nico_responsive_checked', function(result) {
		if ( result.nico_responsive_checked == true ) {
			responsive_mode.add_class();
		} else {
			responsive_mode.remove_class();
		}
	});

	// checkbox変更時
	chrome.storage.onChanged.addListener(function(changes, namespace) {
		if ( namespace == "local" ) {
			var storageChange = changes['nico_responsive_checked'];

			if ( storageChange.newValue == true ) {
				responsive_mode.add_class();
			} else {
				responsive_mode.remove_class();
			}
		}
	});


}(jQuery);