try {
setREVStartSize({c: 'rev_slider_1_1',rl:[1240,1024,778,480],el:[823],gw:[1240],gh:[823],type:'standard',justify:'',layout:'fullwidth',mh:"0"});if (window.RS_MODULES!==undefined && window.RS_MODULES.modules!==undefined && window.RS_MODULES.modules["revslider11"]!==undefined) {window.RS_MODULES.modules["revslider11"].once = false;window.revapi1 = undefined;if (window.RS_MODULES.checkMinimal!==undefined) window.RS_MODULES.checkMinimal()}
} catch (e) { console.warn('inline script:', e); }
;
try {
(function(){
      document.querySelectorAll('.colbs-testimonials').forEach(section=>{
        const track   = section.querySelector('.colbs-track');
        const slides  = Array.from(section.querySelectorAll('.colbs-slide'));
        const bullets = Array.from(section.querySelectorAll('.colbs-bullet'));
        const prev    = section.querySelector('[data-prev]');
        const next    = section.querySelector('[data-next]');
        let index = 0, total = slides.length;

        function setActive(i){
          bullets.forEach((b,bi)=>b.setAttribute('aria-current', bi===i));
          slides.forEach((s,si)=>s.setAttribute('aria-current', si===i));
        }
        function go(i){
          index = (i + total) % total;
          track.style.transform = 'translateX(-' + (index*100) + '%)';
          setActive(index);
        }

        bullets.forEach((b,i)=>b.addEventListener('click',()=>go(i)));
        prev && prev.addEventListener('click',()=>go(index-1));
        next && next.addEventListener('click',()=>go(index+1));
        go(0);
      });
    })();
} catch (e) { console.warn('inline script:', e); }
;
try {
window.RS_MODULES = window.RS_MODULES || {};
			window.RS_MODULES.modules = window.RS_MODULES.modules || {};
			window.RS_MODULES.waiting = window.RS_MODULES.waiting || [];
			window.RS_MODULES.defered = true;
			window.RS_MODULES.moduleWaiting = window.RS_MODULES.moduleWaiting || {};
			window.RS_MODULES.type = 'compiled';
} catch (e) { console.warn('inline script:', e); }
;
try {
var cffajaxurl = "https://colbs.cr/wp-admin/admin-ajax.php";
var cfflinkhashtags = "true";
} catch (e) { console.warn('inline script:', e); }
;
try {
var ajaxRevslider;
			function rsCustomAjaxContentLoadingFunction() {
				// CUSTOM AJAX CONTENT LOADING FUNCTION
				ajaxRevslider = function(obj) {
				
					// obj.type : Post Type
					// obj.id : ID of Content to Load
					// obj.aspectratio : The Aspect Ratio of the Container / Media
					// obj.selector : The Container Selector where the Content of Ajax will be injected. It is done via the Essential Grid on Return of Content
					
					var content	= '';
					var data	= {
						action:			'revslider_ajax_call_front',
						client_action:	'get_slider_html',
						token:			'94d49438d7',
						type:			obj.type,
						id:				obj.id,
						aspectratio:	obj.aspectratio
					};
					
					// SYNC AJAX REQUEST
					jQuery.ajax({
						type:		'post',
						url:		'https://colbs.cr/wp-admin/admin-ajax.php',
						dataType:	'json',
						data:		data,
						async:		false,
						success:	function(ret, textStatus, XMLHttpRequest) {
							if(ret.success == true)
								content = ret.data;								
						},
						error:		function(e) {
							console.log(e);
						}
					});
					
					 // FIRST RETURN THE CONTENT WHEN IT IS LOADED !!
					 return content;						 
				};
				
				// CUSTOM AJAX FUNCTION TO REMOVE THE SLIDER
				var ajaxRemoveRevslider = function(obj) {
					return jQuery(obj.selector + ' .rev_slider').revkill();
				};


				// EXTEND THE AJAX CONTENT LOADING TYPES WITH TYPE AND FUNCTION				
				if (jQuery.fn.tpessential !== undefined) 					
					if(typeof(jQuery.fn.tpessential.defaults) !== 'undefined') 
						jQuery.fn.tpessential.defaults.ajaxTypes.push({type: 'revslider', func: ajaxRevslider, killfunc: ajaxRemoveRevslider, openAnimationSpeed: 0.3});   
						// type:  Name of the Post to load via Ajax into the Essential Grid Ajax Container
						// func: the Function Name which is Called once the Item with the Post Type has been clicked
						// killfunc: function to kill in case the Ajax Window going to be removed (before Remove function !
						// openAnimationSpeed: how quick the Ajax Content window should be animated (default is 0.3)					
			}
			
			var rsCustomAjaxContent_Once = false
			if (document.readyState === "loading") 
				document.addEventListener('readystatechange',function(){
					if ((document.readyState === "interactive" || document.readyState === "complete") && !rsCustomAjaxContent_Once) {
						rsCustomAjaxContent_Once = true;
						rsCustomAjaxContentLoadingFunction();
					}
				});
			else {
				rsCustomAjaxContent_Once = true;
				rsCustomAjaxContentLoadingFunction();
			}
} catch (e) { console.warn('inline script:', e); }
;
try {
var sbiajaxurl = "https://colbs.cr/wp-admin/admin-ajax.php";
} catch (e) { console.warn('inline script:', e); }
;
try {
if(typeof revslider_showDoubleJqueryError === "undefined") {function revslider_showDoubleJqueryError(sliderID) {console.log("You have some jquery.js library include that comes after the Slider Revolution files js inclusion.");console.log("To fix this, you can:");console.log("1. Set 'Module General Options' -> 'Advanced' -> 'jQuery & OutPut Filters' -> 'Put JS to Body' to on");console.log("2. Find the double jQuery.js inclusion and remove it");return "Double Included jQuery Library";}}
} catch (e) { console.warn('inline script:', e); }
;
try {
jQuery.uiBackCompat = true;
//# sourceURL=jquery-ui-core-js-before
} catch (e) { console.warn('inline script:', e); }
;
try {
var booked_js_vars = {"ajax_url":"https://colbs.cr/wp-admin/admin-ajax.php","profilePage":"","publicAppointments":"","i18n_confirm_appt_delete":"Are you sure you want to cancel this appointment?","i18n_please_wait":"Please wait ...","i18n_wrong_username_pass":"Wrong username/password combination.","i18n_fill_out_required_fields":"Please fill out all required fields.","i18n_guest_appt_required_fields":"Please enter your name to book an appointment.","i18n_appt_required_fields":"Please enter your name, your email address and choose a password to book an appointment.","i18n_appt_required_fields_guest":"Please fill in all \"Information\" fields.","i18n_password_reset":"Please check your email for instructions on resetting your password.","i18n_password_reset_error":"That username or email is not recognized.","nonce":"5711f82564"};
//# sourceURL=booked-functions-js-extra
} catch (e) { console.warn('inline script:', e); }
;
try {
var wpcf7 = {"api":{"root":"https://colbs.cr/wp-json/","namespace":"contact-form-7/v1"},"cached":"1"};
//# sourceURL=contact-form-7-js-extra
} catch (e) { console.warn('inline script:', e); }
;
try {
var preloader_plus = {"animation_delay":"500","animation_duration":"1000"};
//# sourceURL=preloader-plus-js-extra
} catch (e) { console.warn('inline script:', e); }
;
try {
var TRX_ADDONS_STORAGE = {"ajax_url":"https://colbs.cr/wp-admin/admin-ajax.php","ajax_nonce":"5292100b12","site_url":"https://colbs.cr","post_id":"411","vc_edit_mode":"0","popup_engine":"magnific","scroll_progress":"hide","animate_inner_links":"0","add_target_blank":"1","menu_collapse":"1","menu_collapse_icon":"icon-dot3","user_logged_in":"0","email_mask":"^([a-zA-Z0-9_\\-]+\\.)*[a-zA-Z0-9_\\-]+@[a-z0-9_\\-]+(\\.[a-z0-9_\\-]+)*\\.[a-z]{2,6}$","divider_slider":"of","msg_ajax_error":"Invalid server answer!","msg_magnific_loading":"Loading image","msg_magnific_error":"Error loading image","msg_error_like":"Error saving your like! Please, try again later.","msg_field_name_empty":"The name can't be empty","msg_field_email_empty":"Too short (or empty) email address","msg_field_email_not_valid":"Invalid email address","msg_field_text_empty":"The message text can't be empty","msg_search_error":"Search error! Try again later.","msg_send_complete":"Send message complete!","msg_send_error":"Transmit failed!","msg_validation_error":"Error data validation!","msg_name_empty":"The name can't be empty","msg_name_long":"Too long name","msg_email_empty":"Too short (or empty) email address","msg_email_long":"E-mail address is too long","msg_email_not_valid":"E-mail address is invalid","msg_text_empty":"The message text can't be empty","ajax_views":"","menu_cache":[".menu_mobile_inner \u003E nav \u003E ul"],"login_via_ajax":"1","msg_login_empty":"The Login field can't be empty","msg_login_long":"The Login field is too long","msg_password_empty":"The password can't be empty and shorter then 4 characters","msg_password_long":"The password is too long","msg_login_success":"Login success! The page should be reloaded in 3 sec.","msg_login_error":"Login failed!","msg_not_agree":"Please, read and check 'Terms and Conditions'","msg_password_not_equal":"The passwords in both fields are not equal","msg_registration_success":"Registration success! Please log in!","msg_registration_error":"Registration failed!","shapes_url":"","msg_rating_already_marked":"You have already rated this post with mark {{X}}","elementor_stretched_section_container":".page_wrap","msg_sc_googlemap_not_avail":"Googlemap service is not available","msg_sc_googlemap_geocoder_error":"Error while geocode address"};
//# sourceURL=trx_addons-js-extra
} catch (e) { console.warn('inline script:', e); }
;
try {
var wixBlogAjax = {"ajax_url":"https://colbs.cr/wp-admin/admin-ajax.php","nonce":"b5531ad0e2"};
//# sourceURL=wix-blog-embed-js-extra
} catch (e) { console.warn('inline script:', e); }
;
try {
var booked_fea_vars = {"ajax_url":"https://colbs.cr/wp-admin/admin-ajax.php","i18n_confirm_appt_delete":"Are you sure you want to cancel this appointment?","i18n_confirm_appt_approve":"Are you sure you want to approve this appointment?"};
//# sourceURL=booked-fea-js-js-extra
} catch (e) { console.warn('inline script:', e); }
;
try {
var cffOptions = {"placeholder":"https://colbs.cr/wp-content/plugins/custom-facebook-feed/assets/img/placeholder.png"};
//# sourceURL=cffscripts-js-extra
} catch (e) { console.warn('inline script:', e); }
;
try {
var wpgdprcFront = {"ajaxUrl":"https://colbs.cr/wp-admin/admin-ajax.php","ajaxNonce":"c539c5b547","ajaxArg":"security","pluginPrefix":"wpgdprc","blogId":"1","isMultiSite":"","locale":"en_US","showSignUpModal":"","showFormModal":"","cookieName":"wpgdprc-consent","consentVersion":"","path":"/","prefix":"wpgdprc"};
//# sourceURL=wpgdprc-front-js-js-extra
} catch (e) { console.warn('inline script:', e); }
;
try {
var JUSTITIA_STORAGE = {"ajax_url":"https://colbs.cr/wp-admin/admin-ajax.php","ajax_nonce":"5292100b12","site_url":"https://colbs.cr","theme_url":"https://colbs.cr/wp-content/themes/justitia/","site_scheme":"scheme_default","user_logged_in":"","mobile_layout_width":"767","mobile_device":"","menu_side_stretch":"","menu_side_icons":"1","background_video":"","use_mediaelements":"1","admin_mode":"","msg_ajax_error":"Invalid server answer!","alter_link_color":"#ff6c0e","button_hover":"default"};
//# sourceURL=justitia-init-js-extra
} catch (e) { console.warn('inline script:', e); }
;
try {
var mejsL10n = {"language":"en","strings":{"mejs.download-file":"Download File","mejs.install-flash":"You are using a browser that does not have Flash player enabled or installed. Please turn on your Flash player plugin or download the latest version from https://get.adobe.com/flashplayer/","mejs.fullscreen":"Fullscreen","mejs.play":"Play","mejs.pause":"Pause","mejs.time-slider":"Time Slider","mejs.time-help-text":"Use Left/Right Arrow keys to advance one second, Up/Down arrows to advance ten seconds.","mejs.live-broadcast":"Live Broadcast","mejs.volume-help-text":"Use Up/Down Arrow keys to increase or decrease volume.","mejs.unmute":"Unmute","mejs.mute":"Mute","mejs.volume-slider":"Volume Slider","mejs.video-player":"Video Player","mejs.audio-player":"Audio Player","mejs.captions-subtitles":"Captions/Subtitles","mejs.captions-chapters":"Chapters","mejs.none":"None","mejs.afrikaans":"Afrikaans","mejs.albanian":"Albanian","mejs.arabic":"Arabic","mejs.belarusian":"Belarusian","mejs.bulgarian":"Bulgarian","mejs.catalan":"Catalan","mejs.chinese":"Chinese","mejs.chinese-simplified":"Chinese (Simplified)","mejs.chinese-traditional":"Chinese (Traditional)","mejs.croatian":"Croatian","mejs.czech":"Czech","mejs.danish":"Danish","mejs.dutch":"Dutch","mejs.english":"English","mejs.estonian":"Estonian","mejs.filipino":"Filipino","mejs.finnish":"Finnish","mejs.french":"French","mejs.galician":"Galician","mejs.german":"German","mejs.greek":"Greek","mejs.haitian-creole":"Haitian Creole","mejs.hebrew":"Hebrew","mejs.hindi":"Hindi","mejs.hungarian":"Hungarian","mejs.icelandic":"Icelandic","mejs.indonesian":"Indonesian","mejs.irish":"Irish","mejs.italian":"Italian","mejs.japanese":"Japanese","mejs.korean":"Korean","mejs.latvian":"Latvian","mejs.lithuanian":"Lithuanian","mejs.macedonian":"Macedonian","mejs.malay":"Malay","mejs.maltese":"Maltese","mejs.norwegian":"Norwegian","mejs.persian":"Persian","mejs.polish":"Polish","mejs.portuguese":"Portuguese","mejs.romanian":"Romanian","mejs.russian":"Russian","mejs.serbian":"Serbian","mejs.slovak":"Slovak","mejs.slovenian":"Slovenian","mejs.spanish":"Spanish","mejs.swahili":"Swahili","mejs.swedish":"Swedish","mejs.tagalog":"Tagalog","mejs.thai":"Thai","mejs.turkish":"Turkish","mejs.ukrainian":"Ukrainian","mejs.vietnamese":"Vietnamese","mejs.welsh":"Welsh","mejs.yiddish":"Yiddish"}};
//# sourceURL=mediaelement-core-js-before
} catch (e) { console.warn('inline script:', e); }
;
try {
var _wpmejsSettings = {"pluginPath":"/wp-includes/js/mediaelement/","classPrefix":"mejs-","stretching":"responsive","audioShortcodeLibrary":"mediaelement","videoShortcodeLibrary":"mediaelement"};
//# sourceURL=mediaelement-js-extra
} catch (e) { console.warn('inline script:', e); }
;
try {
var elementorFrontendConfig = {"environmentMode":{"edit":false,"wpPreview":false,"isScriptDebug":false},"i18n":{"shareOnFacebook":"Share on Facebook","shareOnTwitter":"Share on Twitter","pinIt":"Pin it","download":"Download","downloadImage":"Download image","fullscreen":"Fullscreen","zoom":"Zoom","share":"Share","playVideo":"Play Video","previous":"Previous","next":"Next","close":"Close","a11yCarouselWrapperAriaLabel":"Carousel | Horizontal scrolling: Arrow Left & Right","a11yCarouselPrevSlideMessage":"Previous slide","a11yCarouselNextSlideMessage":"Next slide","a11yCarouselFirstSlideMessage":"This is the first slide","a11yCarouselLastSlideMessage":"This is the last slide","a11yCarouselPaginationBulletMessage":"Go to slide"},"is_rtl":false,"breakpoints":{"xs":0,"sm":480,"md":768,"lg":1025,"xl":1440,"xxl":1600},"responsive":{"breakpoints":{"mobile":{"label":"Mobile Portrait","value":767,"default_value":767,"direction":"max","is_enabled":true},"mobile_extra":{"label":"Mobile Landscape","value":880,"default_value":880,"direction":"max","is_enabled":false},"tablet":{"label":"Tablet Portrait","value":1024,"default_value":1024,"direction":"max","is_enabled":true},"tablet_extra":{"label":"Tablet Landscape","value":1200,"default_value":1200,"direction":"max","is_enabled":false},"laptop":{"label":"Laptop","value":1366,"default_value":1366,"direction":"max","is_enabled":false},"widescreen":{"label":"Widescreen","value":2400,"default_value":2400,"direction":"min","is_enabled":false}}},"version":"3.16.4","is_static":false,"experimentalFeatures":{"e_dom_optimization":true,"e_optimized_assets_loading":true,"e_optimized_css_loading":true,"additional_custom_breakpoints":true,"e_swiper_latest":true,"landing-pages":true},"urls":{"assets":"https:\/\/colbs.cr\/wp-content\/plugins\/elementor\/assets\/"},"swiperClass":"swiper","settings":{"page":[],"editorPreferences":[]},"kit":{"active_breakpoints":["viewport_mobile","viewport_tablet"],"global_image_lightbox":"yes","lightbox_enable_counter":"yes","lightbox_enable_fullscreen":"yes","lightbox_enable_zoom":"yes","lightbox_enable_share":"yes","lightbox_title_src":"title","lightbox_description_src":"description"},"post":{"id":411,"title":"COLBS%20%E2%80%93%20Where%20Excellence%20Meets%20Skill","excerpt":"","featuredImage":false}};
//# sourceURL=elementor-frontend-js-before
} catch (e) { console.warn('inline script:', e); }
;
try {
/*! This file is auto-generated */
var e="script#wp-emoji-settings",t=document.querySelector(e);if(!(t instanceof HTMLScriptElement))throw new Error("Element missing: "+e);const r=JSON.parse(t.text),s=(window._wpemojiSettings=r,"wpEmojiSettingsSupports"),o=["flag","emoji"];function i(e){try{var t={supportTests:e,timestamp:(new Date).valueOf()};sessionStorage.setItem(s,JSON.stringify(t))}catch(e){}}function c(e,t,n){e.clearRect(0,0,e.canvas.width,e.canvas.height),e.fillText(t,0,0);t=new Uint32Array(e.getImageData(0,0,e.canvas.width,e.canvas.height).data);e.clearRect(0,0,e.canvas.width,e.canvas.height),e.fillText(n,0,0);const r=new Uint32Array(e.getImageData(0,0,e.canvas.width,e.canvas.height).data);return t.every((e,t)=>e===r[t])}function p(e,t){e.clearRect(0,0,e.canvas.width,e.canvas.height),e.fillText(t,0,0);var n=e.getImageData(16,16,1,1);for(let e=0;e<n.data.length;e++)if(0!==n.data[e])return!1;return!0}function u(e,t,n,r){switch(t){case"flag":return n(e,"\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f","\ud83c\udff3\ufe0f\u200b\u26a7\ufe0f")?!1:!n(e,"\ud83c\udde8\ud83c\uddf6","\ud83c\udde8\u200b\ud83c\uddf6")&&!n(e,"\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f","\ud83c\udff4\u200b\udb40\udc67\u200b\udb40\udc62\u200b\udb40\udc65\u200b\udb40\udc6e\u200b\udb40\udc67\u200b\udb40\udc7f");case"emoji":return!r(e,"\ud83e\u1fac8")}return!1}function f(e,t,n,r){let a;const s=(a="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?new OffscreenCanvas(300,150):document.createElement("canvas")).getContext("2d",{willReadFrequently:!0}),o=(s.textBaseline="top",s.font="600 32px Arial",{});return e.forEach(e=>{o[e]=t(s,e,n,r)}),o}function a(e){var t=document.createElement("script");t.src=e,t.defer=!0,document.head.appendChild(t)}r.supports={everything:!0,everythingExceptFlag:!0},new Promise(t=>{let n=function(){try{var e=JSON.parse(sessionStorage.getItem(s));if("object"==typeof e&&"number"==typeof e.timestamp&&(new Date).valueOf()<e.timestamp+604800&&"object"==typeof e.supportTests)return e.supportTests}catch(e){}return null}();if(!n){if("undefined"!=typeof Worker&&"undefined"!=typeof OffscreenCanvas&&"undefined"!=typeof URL&&URL.createObjectURL&&"undefined"!=typeof Blob)try{var e="postMessage("+f.toString()+"("+[JSON.stringify(o),u.toString(),c.toString(),p.toString()].join(",")+"));",r=new Blob([e],{type:"text/javascript"});const a=new Worker(URL.createObjectURL(r),{name:"wpTestEmojiSupports"});return void(a.onmessage=e=>{i(n=e.data),a.terminate(),t(n)})}catch(e){}i(n=f(o,u,c,p))}t(n)}).then(e=>{for(const n in e)r.supports[n]=e[n],r.supports.everything=r.supports.everything&&r.supports[n],"flag"!==n&&(r.supports.everythingExceptFlag=r.supports.everythingExceptFlag&&r.supports[n]);var t;r.supports.everythingExceptFlag=r.supports.everythingExceptFlag&&!r.supports.flag,r.supports.everything||((t=r.source||{}).concatemoji?a(t.concatemoji):t.wpemoji&&t.twemoji&&(a(t.twemoji),a(t.wpemoji)))});
//# sourceURL=https://colbs.cr/wp-includes/js/wp-emoji-loader.min.js
} catch (e) { console.warn('inline script:', e); }
;
try {
var	tpj = jQuery;

		var	revapi1;

		if(window.RS_MODULES === undefined) window.RS_MODULES = {};
		if(RS_MODULES.modules === undefined) RS_MODULES.modules = {};
		RS_MODULES.modules["revslider11"] = {once: RS_MODULES.modules["revslider11"]!==undefined ? RS_MODULES.modules["revslider11"].once : undefined, init:function() {
			window.revapi1 = window.revapi1===undefined || window.revapi1===null || window.revapi1.length===0  ? document.getElementById("rev_slider_1_1") : window.revapi1;
			if(window.revapi1 === null || window.revapi1 === undefined || window.revapi1.length==0) { window.revapi1initTry = window.revapi1initTry ===undefined ? 0 : window.revapi1initTry+1; if (window.revapi1initTry<20) requestAnimationFrame(function() {RS_MODULES.modules["revslider11"].init()}); return;}
			window.revapi1 = jQuery(window.revapi1);
			if(window.revapi1.revolution==undefined){ revslider_showDoubleJqueryError("rev_slider_1_1"); return;}
			revapi1.revolutionInit({
					revapi:"revapi1",
					DPR:"dpr",
					sliderLayout:"fullwidth",
					visibilityLevels:"1240,1024,778,480",
					gridwidth:1240,
					gridheight:823,
					lazyType:"smart",
					maxHeight:"823px",
					perspective:600,
					perspectiveType:"global",
					editorheight:"823,768,960,720",
					responsiveLevels:"1240,1024,778,480",
					progressBar:{disableProgressBar:true},
					navigation: {
						wheelCallDelay:1000,
						onHoverStop:false,
						arrows: {
							enable:true,
							style:"hesperiden",
							left: {
								h_offset:30
							},
							right: {
								h_offset:30
							}
						},
						bullets: {
							enable:true,
							tmp:"",
							style:"hesperiden"
						}
					},
					viewPort: {
						global:true,
						globalDist:"-200px",
						enable:false
					},
					fallbacks: {
						allowHTML5AutoPlayOnAndroid:true
					},
			});
			
		}} // End of RevInitScript

		if (window.RS_MODULES.checkMinimal!==undefined) { window.RS_MODULES.checkMinimal();};
} catch (e) { console.warn('inline script:', e); }