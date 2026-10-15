try {
function setREVStartSize(e){
			//window.requestAnimationFrame(function() {
				window.RSIW = window.RSIW===undefined ? window.innerWidth : window.RSIW;
				window.RSIH = window.RSIH===undefined ? window.innerHeight : window.RSIH;
				try {
					var pw = document.getElementById(e.c).parentNode.offsetWidth,
						newh;
					pw = pw===0 || isNaN(pw) || (e.l=="fullwidth" || e.layout=="fullwidth") ? window.RSIW : pw;
					e.tabw = e.tabw===undefined ? 0 : parseInt(e.tabw);
					e.thumbw = e.thumbw===undefined ? 0 : parseInt(e.thumbw);
					e.tabh = e.tabh===undefined ? 0 : parseInt(e.tabh);
					e.thumbh = e.thumbh===undefined ? 0 : parseInt(e.thumbh);
					e.tabhide = e.tabhide===undefined ? 0 : parseInt(e.tabhide);
					e.thumbhide = e.thumbhide===undefined ? 0 : parseInt(e.thumbhide);
					e.mh = e.mh===undefined || e.mh=="" || e.mh==="auto" ? 0 : parseInt(e.mh,0);
					if(e.layout==="fullscreen" || e.l==="fullscreen")
						newh = Math.max(e.mh,window.RSIH);
					else{
						e.gw = Array.isArray(e.gw) ? e.gw : [e.gw];
						for (var i in e.rl) if (e.gw[i]===undefined || e.gw[i]===0) e.gw[i] = e.gw[i-1];
						e.gh = e.el===undefined || e.el==="" || (Array.isArray(e.el) && e.el.length==0)? e.gh : e.el;
						e.gh = Array.isArray(e.gh) ? e.gh : [e.gh];
						for (var i in e.rl) if (e.gh[i]===undefined || e.gh[i]===0) e.gh[i] = e.gh[i-1];
											
						var nl = new Array(e.rl.length),
							ix = 0,
							sl;
						e.tabw = e.tabhide>=pw ? 0 : e.tabw;
						e.thumbw = e.thumbhide>=pw ? 0 : e.thumbw;
						e.tabh = e.tabhide>=pw ? 0 : e.tabh;
						e.thumbh = e.thumbhide>=pw ? 0 : e.thumbh;
						for (var i in e.rl) nl[i] = e.rl[i]<window.RSIW ? 0 : e.rl[i];
						sl = nl[0];
						for (var i in nl) if (sl>nl[i] && nl[i]>0) { sl = nl[i]; ix=i;}
						var m = pw>(e.gw[ix]+e.tabw+e.thumbw) ? 1 : (pw-(e.tabw+e.thumbw)) / (e.gw[ix]);
						newh =  (e.gh[ix] * m) + (e.tabh + e.thumbh);
					}
					var el = document.getElementById(e.c);
					if (el!==null && el) el.style.height = newh+"px";
					el = document.getElementById(e.c+"_wrapper");
					if (el!==null && el) {
						el.style.height = newh+"px";
						el.style.display = "block";
					}
				} catch(e){
					console.log("Failure at Presize of Slider:" + e)
				}
			//});
		  };
} catch (e) { console.warn('inline script:', e); }
;
try {
(function(){
    /* ===== See more / less ===== */
    const btn = document.getElementById('colbsxSeeMore');
    const hidden = Array.from(document.querySelectorAll('.colbsx-card.is-hidden'));
    if(btn){
      btn.addEventListener('click', function(){
        const closed = hidden.some(el => el.classList.contains('is-hidden'));
        if(closed){
          hidden.forEach(el => el.classList.remove('is-hidden'));
          btn.textContent = 'See less';
        }else{
          hidden.forEach(el => el.classList.add('is-hidden'));
          btn.textContent = 'See more';
          document.querySelector('.colbsx').scrollIntoView({behavior:'smooth', block:'start'});
        }
      });
    }

    /* ====== Extended content and LinkedIn maps ====== */
    const EXTENDED_BIOS = {
      "fernanda-incera": `
        Receptionist with 3 years of customer-service experience. Currently studying English at the
        Cultural Center to strengthen skills and advance professionally. Recognized for empathy, clear communication,
        and reliable support to clients and the team.
      `,
      "yanela-noguera": `
        Dedicated professional with extensive experience in cleaning services and customer care.
        Recognized for commitment, responsibility, and quality-oriented work. Her attention to detail and
        thoroughness ensure high hygiene standards. Friendly attitude and prompt service.
      `,
      "gabriel-trejos": `
        Gabriel is a legal professional focused on Intellectual Property and Labor Law, protecting
        trademarks, copyrights, and advising on labor compliance and disputes. He assists national and
        international clients with regulatory frameworks, drafting and negotiation of contracts, delivering
        solutions that balance technical precision with practical results.
      `,
      "sebasmolinasanchez": `
        With a solid background in public and private law, Sebastián has provided comprehensive legal advice to
        a wide variety of clients. His experience spans incorporation and start-up of companies, administrative
        contracting, and major public works projects. He also collaborated with the Constitutional Chamber,
        assisting magistrates in drafting constitutional rulings with a rigorous, strategic approach.
      `,
      "sebastian-molina": `
        With a solid background in public and private law, Sebastián has provided comprehensive legal advice to
        a wide variety of clients. His experience spans incorporation and start-up of companies, administrative
        contracting, and major public works projects. He also collaborated with the Constitutional Chamber,
        assisting magistrates in drafting constitutional rulings with a rigorous, strategic approach.
      `,
      "felipe-lozada": `
        Andrés Felipe Lozada Porras is an attorney from ULACIT, specialized in corporate, immigration, and
        traffic law. Recognized for a pragmatic and accessible approach offering clear, effective solutions.
        His multi-disciplinary experience strengthened skills in legal analysis, process management and
        client-focused strategy. Guided by strong ethical principles, Felipe is dedicated to professional growth.
      `,
      "jessica-ward-2": `
        Jessica Ward is an experienced attorney with over 15 years in Intellectual Property Law.
        She holds a law degree from Escuela Libre de Derecho (Summa Cum Laude Probata) and a Master's Degree
        in Notary Law (Cum Laude Probata). She focuses on trademarks portfolio management across the Caribbean
        and Central America, privacy compliance programs, and drafting/filing PCT applications.
        Member of INTA (Emerging Issues – Blockchain), ASIPI, Board member of IPCA, and co-chair of the IP
        Committee of the Costa Rican Bar Association.
      `,
      "enmari-molina": `
        Enmari holds a Bachelor's in Public Accounting (University of Carabobo, Venezuela). She has excelled in
        administrative management for her commitment, organization, and service orientation. Currently Administrative
        and HR Manager at COLBS, she supports organizational management and talent development. She also enjoys
        handcrafted jewelry and outdoor activities.
      `,
      "enghel-naranjo": `
        Fifth-year Law student at University of Costa Rica pursuing Bachelor's and Licentiate degrees.
        Interests include Commercial Law, Tax Law, Compliance, and the impact of AI on the legal profession.
        He has supported litigation, real estate and corporate projects as a paralegal at COLBS for two years.
      `,
      "edwin-rojas": `
        Head of Litigation & Arbitration. Young and skillful attorney with 15+ years of experience,
        counseling local and foreign clients. He has led high-stakes arbitration and litigation across civil,
        commercial, and administrative law with creative, results-driven strategies; recognized by Chambers
        & Partners for Dispute Resolution. Academic: UCR Law Degree; Notarial & Registry Postgrad (U. Escuela
        Libre de Derecho); Advanced Civil Liability (U. Castilla-La Mancha); Arbitration (ULACIT/AmCham).
      `,
      "sebastian-jimenez": `
        Managing Partner. Leads Real Estate, Corporate, Banking & Finance. Advises private/institutional
        investors, developers, funds, and acts as local liaison for international law firms with interests in Costa Rica.
        Specialized in build-to-suit, sale & leaseback, long-term leases, development recording/management and FTZ.
        Director at BritCham, President of Chevening Alumni CR, IAPP Chair (CR Chapter) and Honorary Personal Advisor
        to the British Ambassador. Academic: Business (ULACIT), JD (UCR), Tax Specialization (TEC),
        LL.M. Corporate Law (LSE). Competitive tennis player, married, father of two.
      `,

      "ricardo-soto": `
        Law graduate and Bachelor in Political Science from the University of Costa Rica. He has professional experience
        in multinational firms and currently focuses his practice primarily on litigation, while also supporting a variety
        of corporate law matters. He has a particular interest in private and commercial law, areas in which he continuously
        seeks to strengthen his expertise and professional development.
      `,

      "julissa-diaz": `
        Law student at Escuela Libre de Derecho University. Her experience includes notarial, registry, and legal work,
        participating in the review and preparation of public instruments, contracts, and private documents, as well as
        handling administrative procedures. Her academic training and professional interests focus on Civil, Commercial,
        Family, Notarial, and Registry Law, contributing precise, responsible work committed to each client's needs.
      `,
      "sofia-espinoza": `
        Currently a second-year Law student at the University of Costa Rica, with an interest in Administrative and
        Environmental Law. She enjoys reading as an activity that complements her education and broadens her perspective.
      `,
      "katherine-acuna": `
        Currently a second-year Law student at the University of Costa Rica, with an interest in Administrative Law
        and Intellectual Property. In her free time, she enjoys reading.
      `,
    };

    const LINKEDIN_MAP = {
      "fernanda-incera": "https://www.linkedin.com/in/fernanda-incera-carvajal/",
      "yanela-noguera": "",
      "gabriel-trejos": "https://www.linkedin.com/in/gabriel-aguilar-1a8332315/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      "sebasmolinasanchez": "https://www.linkedin.com/in/sebasmolinasanchez/",
      "sebastian-molina": "https://www.linkedin.com/in/sebasmolinasanchez/",
      "felipe-lozada": "https://www.linkedin.com/in/felipe-lozada-porras-b6b2b519b/",
      "jessica-ward-2": "https://www.linkedin.com/in/jessica-ward-74339293/",
      "enmari-molina": "https://www.linkedin.com/in/enmari-molina-7464802a2/",
      "enghel-naranjo": "https://www.linkedin.com/in/enghel-naranjo-b8129a23a/",
      "edwin-rojas": "https://www.linkedin.com/in/edwin-a-rojas-8459885b/",
      "sebastian-jimenez": "https://www.linkedin.com/in/sebastian-jimenez-967363160/",

      "ricardo-soto": "https://www.linkedin.com/in/ricardo-soto-gutierrez?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      "julissa-diaz": "https://www.linkedin.com/in/julissa-d%C3%ADaz-979887286?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      "sofia-espinoza": "https://www.linkedin.com/in/sofia-espinoza-439a46403?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      "katherine-acuna": "",
    };

    /* ===== Modal logic ===== */
    const modal         = document.querySelector('.colbsx-modal');
    const theModalClose = modal.querySelector('.colbsx-modal-close');
    const imgEl         = modal.querySelector('.colbsx-modal-photo img');
    const nameEl        = modal.querySelector('.colbsx-modal-name');
    const roleEl        = modal.querySelector('.colbsx-modal-role');
    const bioEl         = modal.querySelector('.colbsx-modal-bio');
    const modalInBtn    = modal.querySelector('.colbsx-modal-in');
    let lastFocus       = null;

    function slugFromCard(card){
      const href = card.querySelector('.colbsx-name a')?.getAttribute('href') || '';
      const match = href.match(/\/team\/([^\/?#]+)/i);
      if(match && match[1]) return match[1];

      const raw = card.querySelector('.colbsx-name a')?.textContent.trim().toLowerCase() || '';
      return raw.replace(/\s+/g,'-').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    }

    function openModal(fromCard){
      if(!fromCard) return;
      const name  = fromCard.querySelector('.colbsx-name a')?.textContent.trim() || 'Profile';
      const role  = fromCard.querySelector('.colbsx-role')?.textContent.trim() || '';
      const photo = fromCard.querySelector('.colbsx-photo img')?.getAttribute('src') || '';

      const slug = slugFromCard(fromCard);

      const fallbackSlugs = {
        "sebastian-molina":"sebasmolinasanchez"
      };
      const safeSlug = EXTENDED_BIOS[slug] ? slug : (fallbackSlugs[slug] || slug);

      nameEl.textContent = name;
      roleEl.textContent = role;
      bioEl.innerHTML    = EXTENDED_BIOS[safeSlug] || fromCard.querySelector('.colbsx-bio')?.textContent.trim() || '';
      imgEl.src = photo;
      imgEl.alt = name;

      const inUrl = LINKEDIN_MAP[safeSlug] || LINKEDIN_MAP[slug] || '';
      if(inUrl){
        modalInBtn.style.display = 'inline-flex';
        modalInBtn.setAttribute('href', inUrl);
      }else{
        modalInBtn.style.display = 'none';
        modalInBtn.removeAttribute('href');
      }

      lastFocus = document.activeElement;
      document.body.classList.add('colbsx-lock');
      modal.setAttribute('aria-hidden','false');
      theModalClose.focus();

      document.addEventListener('keydown', onKeydown);
      modal.addEventListener('click', onBackdrop);
    }

    function closeModal(){
      modal.setAttribute('aria-hidden','true');
      document.body.classList.remove('colbsx-lock');
      document.removeEventListener('keydown', onKeydown);
      modal.removeEventListener('click', onBackdrop);
      if(lastFocus) lastFocus.focus();
    }

    function onKeydown(e){
      if(e.key === 'Escape'){ closeModal(); }
      if(e.key === 'Tab'){
        const focusables = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if(!focusables.length) return;
        const first = focusables[0], last = focusables[focusables.length-1];
        if(e.shiftKey && document.activeElement === first){ last.focus(); e.preventDefault(); }
        else if(!e.shiftKey && document.activeElement === last){ first.focus(); e.preventDefault(); }
      }
    }
    function onBackdrop(e){
      if(e.target === modal){ closeModal(); }
    }

    document.querySelectorAll('.colbsx-name a').forEach(a=>{
      a.addEventListener('click', (ev)=>{
        ev.preventDefault();
        const card = a.closest('.colbsx-card');
        openModal(card);
      });
    });

    theModalClose.addEventListener('click', closeModal);
  })();
} catch (e) { console.warn('inline script:', e); }
;
try {
document.addEventListener('DOMContentLoaded', function () {
    var sliderEl = document.querySelector('.testimonial-slider');
    if (!sliderEl) return;

    var slidesPerView = parseInt(sliderEl.dataset.slidesPerView) || 3;
    var spaceBetween = parseInt(sliderEl.dataset.spaceBetween) || 30;

    new Swiper(sliderEl, {
      slidesPerView: slidesPerView,
      spaceBetween: spaceBetween,
      loop: true,
      grabCursor: true,
      pagination: {
        el: '.testimonial-slider .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.testimonial-slider .swiper-button-next',
        prevEl: '.testimonial-slider .swiper-button-prev',
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: slidesPerView,
          spaceBetween: spaceBetween,
        }
      }
    });
  });
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
var TRX_ADDONS_STORAGE = {"ajax_url":"https://colbs.cr/wp-admin/admin-ajax.php","ajax_nonce":"5292100b12","site_url":"https://colbs.cr","post_id":"326","vc_edit_mode":"0","popup_engine":"magnific","scroll_progress":"hide","animate_inner_links":"0","add_target_blank":"1","menu_collapse":"1","menu_collapse_icon":"icon-dot3","user_logged_in":"0","email_mask":"^([a-zA-Z0-9_\\-]+\\.)*[a-zA-Z0-9_\\-]+@[a-z0-9_\\-]+(\\.[a-z0-9_\\-]+)*\\.[a-z]{2,6}$","divider_slider":"of","msg_ajax_error":"Invalid server answer!","msg_magnific_loading":"Loading image","msg_magnific_error":"Error loading image","msg_error_like":"Error saving your like! Please, try again later.","msg_field_name_empty":"The name can't be empty","msg_field_email_empty":"Too short (or empty) email address","msg_field_email_not_valid":"Invalid email address","msg_field_text_empty":"The message text can't be empty","msg_search_error":"Search error! Try again later.","msg_send_complete":"Send message complete!","msg_send_error":"Transmit failed!","msg_validation_error":"Error data validation!","msg_name_empty":"The name can't be empty","msg_name_long":"Too long name","msg_email_empty":"Too short (or empty) email address","msg_email_long":"E-mail address is too long","msg_email_not_valid":"E-mail address is invalid","msg_text_empty":"The message text can't be empty","ajax_views":"","menu_cache":[".menu_mobile_inner \u003E nav \u003E ul"],"login_via_ajax":"1","msg_login_empty":"The Login field can't be empty","msg_login_long":"The Login field is too long","msg_password_empty":"The password can't be empty and shorter then 4 characters","msg_password_long":"The password is too long","msg_login_success":"Login success! The page should be reloaded in 3 sec.","msg_login_error":"Login failed!","msg_not_agree":"Please, read and check 'Terms and Conditions'","msg_password_not_equal":"The passwords in both fields are not equal","msg_registration_success":"Registration success! Please log in!","msg_registration_error":"Registration failed!","shapes_url":"","msg_rating_already_marked":"You have already rated this post with mark {{X}}","elementor_stretched_section_container":".page_wrap","msg_sc_googlemap_not_avail":"Googlemap service is not available","msg_sc_googlemap_geocoder_error":"Error while geocode address"};
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
var elementorFrontendConfig = {"environmentMode":{"edit":false,"wpPreview":false,"isScriptDebug":false},"i18n":{"shareOnFacebook":"Share on Facebook","shareOnTwitter":"Share on Twitter","pinIt":"Pin it","download":"Download","downloadImage":"Download image","fullscreen":"Fullscreen","zoom":"Zoom","share":"Share","playVideo":"Play Video","previous":"Previous","next":"Next","close":"Close","a11yCarouselWrapperAriaLabel":"Carousel | Horizontal scrolling: Arrow Left & Right","a11yCarouselPrevSlideMessage":"Previous slide","a11yCarouselNextSlideMessage":"Next slide","a11yCarouselFirstSlideMessage":"This is the first slide","a11yCarouselLastSlideMessage":"This is the last slide","a11yCarouselPaginationBulletMessage":"Go to slide"},"is_rtl":false,"breakpoints":{"xs":0,"sm":480,"md":768,"lg":1025,"xl":1440,"xxl":1600},"responsive":{"breakpoints":{"mobile":{"label":"Mobile Portrait","value":767,"default_value":767,"direction":"max","is_enabled":true},"mobile_extra":{"label":"Mobile Landscape","value":880,"default_value":880,"direction":"max","is_enabled":false},"tablet":{"label":"Tablet Portrait","value":1024,"default_value":1024,"direction":"max","is_enabled":true},"tablet_extra":{"label":"Tablet Landscape","value":1200,"default_value":1200,"direction":"max","is_enabled":false},"laptop":{"label":"Laptop","value":1366,"default_value":1366,"direction":"max","is_enabled":false},"widescreen":{"label":"Widescreen","value":2400,"default_value":2400,"direction":"min","is_enabled":false}}},"version":"3.16.4","is_static":false,"experimentalFeatures":{"e_dom_optimization":true,"e_optimized_assets_loading":true,"e_optimized_css_loading":true,"additional_custom_breakpoints":true,"e_swiper_latest":true,"landing-pages":true},"urls":{"assets":"https:\/\/colbs.cr\/wp-content\/plugins\/elementor\/assets\/"},"swiperClass":"swiper","settings":{"page":[],"editorPreferences":[]},"kit":{"active_breakpoints":["viewport_mobile","viewport_tablet"],"global_image_lightbox":"yes","lightbox_enable_counter":"yes","lightbox_enable_fullscreen":"yes","lightbox_enable_zoom":"yes","lightbox_enable_share":"yes","lightbox_title_src":"title","lightbox_description_src":"description"},"post":{"id":326,"title":"Team%20%E2%80%93%20COLBS","excerpt":"","featuredImage":false}};
//# sourceURL=elementor-frontend-js-before
} catch (e) { console.warn('inline script:', e); }