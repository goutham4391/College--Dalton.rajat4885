/* ==========================================================================
   Project:     Dalton State College
   Date:        11/11/14 - File created
   Created by:  Third Wave Digital (www.thirdwavedigital.com)
   ========================================================================== */
  
  
var main = function() {
    
    /* ==========================================================================
	   Init
    ========================================================================== */
    
    var init = function() {
 
        // All pages
        main.$html = $("html");
        main.$head = $("head");
        main.$offcanvasmenu = $(".offcanvasmenu");
        main.$header = $(".header-wrapper");
        main.$quicklinks = $(".quicklinks");
		main.$mainmenu = $(".mainmenu");
		main.$content = $(".content-wrapper");
		main.$sidelinks = $(".sidelinks-wrapper");
		
        offCanvasMenu();
		mainMenu();
		quickLinks();
		sideLinks();
		hasTouchSupport();
		cmsTables();
		cmsResponsiveImages();
		cmsResponsiveIframes();
		
		// Style guide excluded
		if (!$('#style-guide').length) {
			fixedHeader(50);
		}
		
		// Homepage only
		if ($('#homepage').length) {
			main.$news = $('.featured-news .news');
			main.$events = $(".upcoming-events .event");
			homepageNews();
			homepageEvents();
		};
		
		// Interior only
		if ($('.submenu').length) {
			main.$submenu = $(".submenu");
			main.$aside_left = $("aside");
			subMenu();		
		};
		
		// Faculty/Staff pages
		if ($('.faculty-staff-select').length) {
			facultystaffSearchPage();	
		};
		if ($('.faculty-staff-quicklinks').length) {
			facultystaffDetailPage();	
		};
		
		// Edit Profile button
		if($(".btn-edit-my-profile").length) editProfileButton();
		
		// Profile logout button
		if($(".btn-edit-my-profile-logout").length) editProfileLogoutButton();
				
		//Slideshow pages
		if ($('.slideshow-wrapper').length) {
			main.$slideshow = $('.slideshow-wrapper');
			verticalSlideshow(4000);
		};
		
		// Fancyboxes
		if ($('.fancybox-media').length) cmsFancyBox();

          // Cookie notification
          if ($(".cookie-notification-wrapper").length) cookieNotification();
    };
    
    
    /* ==========================================================================
	   Offcanvas menu
    ========================================================================== */
    
	var offCanvasMenu = function() {
	    main.$header.find(".btn-offcanvas").on("click", function(e){
	          e.preventDefault();
	          if (!main.$html.hasClass("offcanvas-open")) {
	              main.$html.addClass("offcanvas-open");
	              	if ($('.slideshow-wrapper').length) pauseVerticalSlideshow();
	          } else {
	            main.$html.removeClass("offcanvas-open");
	            	if ($('.slideshow-wrapper').length) resumeVerticalSlideshow();
	          };
        });
                       
        // Swap angle icons
		main.$offcanvasmenu.find(".dropdown-toggle").on("click", function(e){
			var depth = $(this).parents("ul").length;
			switch(depth) {
				case 1:
					main.$offcanvasmenu.find("ul i").not($(this).find("i")).removeClass("fa-angle-up").addClass("fa-angle-down");
				break;
				case 2: 
					main.$offcanvasmenu.find("ul ul i").not($(this).find("i")).removeClass("fa-angle-up").addClass("fa-angle-down");
				break;
				case 3:	
					main.$offcanvasmenu.find("ul ul ul i").not($(this).find("i")).removeClass("fa-angle-up").addClass("fa-angle-down");
				break;
			};
			$(this).find("i").toggleClass("fa-angle-down fa-angle-up");
		});
		
		// Bootstrap subs
        main.$offcanvasmenu.find(".dropdown-menu .dropdown-toggle").on("click", function(e){
        	e.preventDefault();
        	e.stopPropagation();
        	var depth = $(this).parents("ul").length;
        	switch(depth) {
	        	case (depth < 3):
	        		main.$offcanvasmenu.find(".dropdown-menu li").not($(this).parent()).removeClass("open");
	        	break;
	        	case 3:
	        		main.$offcanvasmenu.find(".dropdown-menu ul li").not($(this).parent()).removeClass("open");
	        	break;

        	};
        	$(this).parent().toggleClass('open');
        }); 
        
        // Prevent bootstrap from closing dropdowns on document click
		var allowClose = false;
		main.$offcanvasmenu.find(".dropdown").on({
		    "shown.bs.dropdown": function() { allowClose = false;},
		    "click":             function() { allowClose = true; },
		    "hide.bs.dropdown":  function() { if (!allowClose) return false; }
		});

		// Close the offcanvas menu when resizing
    	$(window).resize(function(){
    		if ($(window).width() >= 768) {
	            if (main.$html.hasClass("offcanvas-open")) {
	            	main.$html.removeClass("offcanvas-open").addClass("offcanvas-closed");
		        };	
        	};
		}).resize();
 
    };
    
    /* ==========================================================================
	   Main menu
    ========================================================================== */
    
    var mainMenu = function() {
	    if (!hasTouchSupport()) {      
       		// Use hover states if it's not a touch device
       		main.$mainmenu.find("li").hover(
	            function () {
	                $("ul:first", this).addClass("show");
	            }, 
	            function () {
	                $("ul:first", this).removeAttr("class");
			});	
       	} else {
       		// Use the click event 
	    	main.$mainmenu.find("li:has(ul) > a").on("click",function(e) {
		    	e.preventDefault();
		    	e.stopPropagation();
		    	closeDropdowns();
       			var $thisdropdown = $(this).parent().find("ul");
       			$(this).parent().toggleClass("show");
	            $thisdropdown.toggleClass("show");  
	    	});
	    	
	    	$(document).click(function(){
	            closeDropdowns();
	        });
       	}
         
         function closeDropdowns() {
           main.$mainmenu.find("ul").removeClass("show");
           main.$mainmenu.find("li").removeClass("show");
        };  
    };
    
    /* ==========================================================================
	   Header
    ========================================================================== */
    
    var fixedHeader = function(offset) {
	    $(window).bind("scroll",function() {
			if ($(document).scrollTop() >= main.$header.height() - offset) {
	            main.$html.addClass("fixed-header");
	        } else {
	        	main.$html.removeClass("fixed-header");    
	        };
		});
    };
    
    var quickLinks = function() {
       // Quicklinks dropdown
       main.$quicklinks.find(".btn-quicklinks a").not(".btn-quicklinks ul a").on("click",function(e) {
	   		e.preventDefault();
		    e.stopPropagation();
	    });
        if (!hasTouchSupport()) {      
       		// Use hover states if it's not a touch device
	       	main.$quicklinks.find(".btn-quicklinks").hover(
	            function () {
	                $(this).find("ul").addClass("show");
	            }, 
	            function () {
	                $(this).find("ul").removeAttr("class");
			});	
       	} else {
       		// Use the click event 
	    	main.$quicklinks.find(".btn-quicklinks a[href=#]").on("click",function(e) {
       			var $thisdropdown = $(this).parent().find("ul");
	             //closeDropdowns();
	             $thisdropdown.toggleClass("show");  
	    	});
	    	
	    	$(document).click(function(){
	            closeDropdowns();
	        });
       	}
         
         function closeDropdowns() {
            main.$quicklinks.find("ul").removeClass("show");
        };  
        
        // Quicklinks form
       var original_html = main.$quicklinks.find(".btn-search").html();
	    main.$quicklinks.find(".btn-search").on("click",function(e) {
	    	e.preventDefault();
	    	e.stopPropagation();
	    	if (main.$quicklinks.find("form").hasClass("hidden")) {
		    	$(this).html("<a href=''><i class='fa fa-times-circle'></i> Close</a>");
		    } else {
			    $(this).html(original_html);	
		    }
            main.$quicklinks.find("form").toggleClass("hidden");  
            if (!main.$quicklinks.find("form").hasClass("hidden")) main.$quicklinks.find("input[type='text']").focus();
    	});

    };
    
    /* ==========================================================================
	   Submenu
    ========================================================================== */
    
    var subMenu = function() {
	    var original_html = $("aside .btn-showsubmenu").html();
		
		// Show/hide the submenu in the <aside> element
		main.$aside_left.find(".btn-showsubmenu").click(function(e) {
			e.preventDefault();
			if (main.$submenu.hasClass("hidden-xs")) {
				main.$submenu.removeClass("hidden-xs");
				$(this).html("<i class='fa fa-times-circle'></i> Close").addClass("open");
			} else {
				main.$submenu.addClass("hidden-xs");
				$(this).html(original_html).removeClass("open");
			}
		}); 
		
		// Swap angle icons
		main.$submenu.find(".dropdown-toggle").on("click", function(e){
			var depth = $(this).parents("ul").length;
			//console.log(depth);
			switch(depth) {
				case 1:
					main.$submenu.find("i").not($(this).find("i")).removeClass("fa-angle-up").addClass("fa-angle-down");
				break;
				case 2: 
					main.$submenu.find("ul ul i").not($(this).find("i")).removeClass("fa-angle-up").addClass("fa-angle-down");
				break;
				case 3:	
					main.$submenu.find("ul ul ul i").not($(this).find("i")).removeClass("fa-angle-up").addClass("fa-angle-down");
				break;
			};
			$(this).find("i").toggleClass("fa-angle-down fa-angle-up");
		});
		
		// Bootstrap subs
        main.$submenu.find(".dropdown-menu .dropdown-toggle").on("click", function(e){
        	e.preventDefault();
        	e.stopPropagation();
        	var depth = $(this).parents("ul").length;
        	//console.log(depth)
        	switch(depth) {
	        	case (depth < 3):
	        		main.$submenu.find(".dropdown-menu li").not($(this).parent()).removeClass("open");
	        	break;
	        	case 3:
	        		main.$submenu.find(".dropdown-menu ul li").not($(this).parent()).removeClass("open");
	        	break;

        	};
        	$(this).parent().toggleClass('open');
        }); 
        
        // Prevent bootstrap from closing dropdowns on document click
		var allowClose = false;
		main.$submenu.find(".dropdown").on({
		    "shown.bs.dropdown": function() { allowClose = false;},
		    "click":             function() { allowClose = true; },
		    "hide.bs.dropdown":  function() { if (!allowClose) return false; }
		});    
    };
    
    /* ==========================================================================
	   Sidelinks
    ========================================================================== */
    
	var sideLinks = function() {
	 	main.$sidelinks.find('li a').on('click',function(e) {
		 	e.preventDefault();
		 	e.stopPropagation();
		 	main.$sidelinks.find('li').not($(this).parent()).removeClass('active');
		 	main.$sidelinks.find('i').not($(this).parent()).removeClass("fa-angle-down").addClass("fa-angle-up");
		 	$(this).parent().toggleClass('active')
		 	$(this).find('i').removeClass("fa-angle-up").addClass("fa-angle-down");
		 	var div = '.'+$(this).data('toggle');
		 	main.$sidelinks.find('.tab').addClass('hidden');
		 	main.$sidelinks.find(div).removeClass('hidden')
		 	if (!$('.sidelinks-wrapper').hasClass('open')) $('.sidelinks-wrapper').addClass('open');
		 	if (!main.$sidelinks.find('li').hasClass('active')) {
			 	main.$sidelinks.removeClass('open');
			 	main.$sidelinks.find('i').removeClass("fa-angle-down").addClass("fa-angle-up");
			 }
	 	}); 
    };
    
    /* ==========================================================================
	   Vertical Slideshow
    ========================================================================== */
    
    // Slideshow
    var verticalSlideshow = function(duration) {
	    // Main carousel
	   main.$slideshow.find('.carousel').carousel({
		  interval: duration
		});	
		
		// Add some styles needed to make the carousel slide vertically, ie10 & up only
		if (!main.$html.hasClass('lt-ie10')) {
			main.$head.append('<style type="text/css" class="vertical-carousel-css"></style>');
			function updateVerticalCarouselCSS() {
				// Add styles to correct vertical boostrap slide 
				var cHeight = main.$slideshow.find('.carousel').height();
				main.$head.find(".vertical-carousel-css").html(
			    	'.carousel.vertical .next{top:'+cHeight+'px}' + 
					'.carousel.vertical .prev{top:-'+cHeight+'px}' +
					'.carousel.vertical .active.left{top:-'+cHeight+'px}' +
					'.carousel.vertical .active.right{top:'+cHeight+'px}'
				);
				
				// Toggle the class on the carousel, will default to horizontal slides sub 768
				if ($(window).width() < 768) {
					main.$slideshow.find('.carousel').removeClass("vertical");
				} else {
					main.$slideshow.find('.carousel').addClass("vertical");	
				};
			};
		};
			
		// Center the carousel controls on mobile, 1/2 of image height minus 1/2 of icon size
		function centerMobileCarouselControls() {
			var middle = Math.round(main.$slideshow.find('.carousel img').height() / 2)-16;
			main.$slideshow.find('.carousel-control.mobile').css('top',middle);
		};
		
		$(window).load(function() {
			updateVerticalCarouselCSS();
			centerMobileCarouselControls();
		 });
		 
	    $(window).resize(function(){
			updateVerticalCarouselCSS();
			centerMobileCarouselControls();
		}).resize();
		
		// Pause & resume slideshow on resize
		var breakpoint;
		$(window).resize(function(){
			//xs
			if ($(window).width() < 768 && breakpoint != "xs") {
				pauseVerticalSlideshow();	
				breakpoint = "xs";
				//console.log("Paused");
			};
			// md
        	if ($(window).width() >= 768 && breakpoint != "md") {
				resumeVerticalSlideshow();
				breakpoint = "md";
				//console.log("Playing");
			};
		}).resize();
		
		$(window).on("load",function() {
			if ($(window).width() <768) pauseVerticalSlideshow();
		});
	};
   
	var pauseVerticalSlideshow = function() {
	   main.$slideshow.find('.carousel').carousel('pause');
	};
	
	var resumeVerticalSlideshow = function() {
		main.$slideshow.find('.carousel').carousel('cycle');
	};  
	
    /* ==========================================================================
	   Homepage
    ========================================================================== */
    
    // Match heights on news articles
	var homepageNews = function() {
		main.$news.matchHeight();
	};
    // Match heights on events
    
    var homepageEvents = function() {
    	main.$events.matchHeight();
    };
	
	/* ==========================================================================
	   Faculty/Staff Pages
    ========================================================================== */
	
	var facultystaffSearchPage = function() {
		$('.selectpicker').selectpicker({
		  width: "100%",
		  liveSearch: true
		});
		$(".selectpicker").on("change",function(e) {
			e.preventDefault();
			location.href = $(this).val();
		});
		$(".btn-name-search").on("click",function(e) {
			e.preventDefault();
			e.stopPropagation();
			if($(".name").val().trim().length > 0) {
				$(this).parents('form').submit();
			}
		});
		$(".form-name-search").on("submit",function(e) {
			e.preventDefault();
			e.stopPropagation();
			if($(".name").val().trim().length > 0) {
				location.href = $(".form-name-search").attr('action') + $(".name").val().trim();
			}
		});
		$(".make-switch input").bootstrapSwitch({
			onText: 'YES',
			offText: 'NO',
			onSwitchChange: function() {
				if($(this).prop("checked")) {
					$(".table-results tr").not(".is-academic-advisor").addClass("hidden");
				} else {
					$(".table-results tr").removeClass("hidden");
				}
			}
		});
		if($(".make-switch input").hasClass("show")) {
			//alert('hisdfsf');
			$(".make-switch input").prop("checked",true).trigger("change");
		}
	};
		
	var facultystaffDetailPage = function() {
		$(".faculty-staff-quicklinks .btn-showsearch").on("click",function(e) {
			e.preventDefault();
			$(".faculty-staff-search").toggleClass("hidden");
		});
		$(".faculty-staff-search .close").on("click",function(e) {
			e.preventDefault();
			$(".faculty-staff-search").toggleClass("hidden");
		});
		$(".btn-name-search").on("click",function(e) {
			e.preventDefault();
			if($(".name").val().trim().length > 0) {
				location.href = $(".form-name-search").attr('action') + $(".name").val().trim();
			}
		});
		$(".form-name-search").on("keypress",function() {
			//return event.keyCode != 13;
			return true;
		});
		editProfileButton();
	};
	
	var editProfileButton = function() {
		$(".btn-edit-my-profile").on("click",function(e) {
			if(!$(this).hasClass('logged-in')) {
				e.preventDefault();
				$("#modal-login").modal();
			}
		});
		
		$(".btn-password").on("click",function(e) {
			e.preventDefault();
			$('.modal-content .alert').addClass('hidden');
			$(".modal-login-body").addClass('hidden');
			$(".modal-password-body").removeClass('hidden');
		});
		
		$(".btn-login").on("click",function(e) {
			e.preventDefault();
			$('.modal-content .alert').addClass('hidden');
			$(".modal-login-body").removeClass('hidden');
			$(".modal-password-body").addClass('hidden');
		});
		
		$(".btn-submit-password").unbind().on("click",function(e) {
			e.preventDefault();
			validatorDefaults();
			$(".form-password").validate({
				rules: {
					email: {
						required: true,
						validEmail: true
					}
				},
				messages: {
					email: "<span class='fa fa-warning'></span> Valid Email Required!"
				},
				submitHandler: function() {
					var data = $(".form-password").serialize();
					$('.modal-content .alert').addClass('hidden');
					$.ajax({
						url: "/custom/com/directory_public.cfc?method=sendPassword&returnformat=plain",
						method: "post",
						data: data,
						success: function(response) {
							if(response == 'true') {
								$('.modal-content .modal-password-body .alert.alert-success').removeClass('hidden');
							} else
							 	$('.modal-content .modal-password-body .alert.alert-danger').removeClass('hidden');
						}
					});
					return false;
				}
			});
			$(".form-password").submit();
		});
		
		$(".modal-content .btn-submit-login").on('click',function(e) {
			e.preventDefault();
			validatorDefaults();
			$(".form-login").validate({
				rules: {
					email: {
						required: true,
						validEmail: true
					},
					password: "required"
				},
				messages: {
					email: "<span class='fa fa-warning'></span> Valid Email Required!",
					password: "<span class='fa fa-warning'></span> Required!"
				},
				submitHandler: function() {
					var data = $(".form-login").serialize();
					$('.modal-content .alert').addClass('hidden');
					$.ajax({
						url: "/custom/com/directory_public.cfc?method=login&returnformat=plain",
						method: "post",
						data: data,
						success: function(response) {
							if(parseInt(response,10) > 0) {
								$('.modal-content .modal-login-body .alert.alert-success').removeClass('hidden');
								location.href = $("#redirect").val() + response;
							} else
								$('.modal-content .modal-login-body .alert.alert-danger').removeClass('hidden');
						}
					});
					return false;
				}
			});
			$(".form-login").submit();
		});
	};
	
	
	var editProfileLogoutButton = function() {
		$(".btn-edit-my-profile-logout").on("click",function(e) {
			e.preventDefault();
			var href = $(this).attr("href");
			$.ajax({
				url: "/custom/com/directory_public.cfc?method=logout",
				method: "post",
				success: function() {
					location.href = href;
				}
			});
		});
	};
	
   	/* ==========================================================================
	   CMS Tables
    ========================================================================== */
    
    var cmsTables = function() {
		var $table_70_30 = $(".table-70-30");
		$table_70_30.addClass("cms-table").removeAttr("border").attr("role","presentation").wrap("<div class='row' />");
		$table_70_30.find("tr").each(function() {
			$(this).find("td:eq(0)").addClass("col-xs-12 col-sm-7 col-lg-8");
			$(this).find("td:eq(1)").addClass("col-xs-12 col-sm-5 col-lg-4");
		});
		
		var $table_30_70 = $(".table-30-70");
		$table_30_70.addClass("cms-table").removeAttr("border").attr("role","presentation").wrap("<div class='row' />");
		$table_30_70.find("tr").each(function() {
			$(this).find("td:eq(0)").addClass("col-xs-12 col-sm-5 col-lg-4");
			$(this).find("td:eq(1)").addClass("col-xs-12 col-sm-7 col-lg-8");
		});
		
		var $table_33 = $(".table-33");
		$table_33.addClass("cms-table").removeAttr("border").attr("role","presentation").wrap("<div class='row' />");
		$table_33.find("td").addClass("col-xs-12 col-sm-4");
		
		var $table_50_50 = $(".table-50-50");
		$table_50_50.addClass("cms-table").removeAttr("border").attr("role","presentation").wrap("<div class='row' />");
		$table_50_50.find("td").addClass("col-xs-12 col-sm-6");
		
		var $table_50_50_Media = $(".table-50-50-media");
		$table_50_50_Media.addClass("cms-table").removeAttr("border").attr("role","presentation").wrap("<div class='row' />");
		$table_50_50_Media.find("td").addClass("col-xs-12 col-md-6");
		$table_50_50_Media.find("tr").contents().unwrap();
		
		var $table_4_PerRow = $(".table-4-per-row");
		$table_4_PerRow.addClass("cms-table").removeAttr("border").attr("role","presentation").wrap("<div class='row' />");
		$table_4_PerRow.find("td").addClass("col-xs-12 col-ms-6 col-sm-3");
		$table_4_PerRow.find("tr").contents().unwrap();
		
		var $table_20_80 = $(".table-20-80");
		$table_20_80.addClass("cms-table").removeAttr("border").attr("role","presentation").wrap("<div class='row' />");
		$table_20_80.find("tr").each(function() {
			$(this).find("td:eq(0)").addClass("col-xs-12 col-sm-4 col-lg-3");
			$(this).find("td:eq(1)").addClass("col-xs-12 col-sm-8 col-lg-9");
		});
    };
    
   /* ==========================================================================
	   CMS Responsive Iframes
    ========================================================================== */
    
    var cmsResponsiveIframes = function() {
		var $content = $(".content-wrapper");
		$content.find("iframe[src*='youtube.com'],iframe[src*='vimeo.com']").wrap('<div class="embed-responsive embed-responsive-16by9"/>').addClass('embed-responsive-item');
	};
	
	/* ==========================================================================
	   CMS Responsive Images
    ========================================================================== */
    
    var cmsResponsiveImages = function() {
		var $content = $(".content-wrapper");
		$content.find("img").addClass("img-responsive");
	};
	
	/* ==========================================================================
	   CMS Fancy Boxes
    ========================================================================== */
    
    var cmsFancyBox = function() {
		var $fancybox = $('.fancybox-media');
		$fancybox.fancybox({
			openEffect  : 'none',
			closeEffect : 'none',
			aspectRatio: true,
			height: '450',
			helpers : {
				media : {}
			},
			padding: 0
		});
	};
	
	 /* ==========================================================================
	   Utils
    ========================================================================== */
    
    var hasTouchSupport = function() {
        var check = false;
        if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
            main.$html.addClass("touch");
            check = true;
        };
        return check;
    };
    
    var validatorDefaults = function() {
    	
			// override jquery validate plugin defaults
			// ignore is set to empty array, this forces validation of hidden fields if they are named in an individual instance of rules: required{}
			$.validator.setDefaults({
			    highlight: function(element) {
			        $(element).closest('.form-group').addClass('has-error');
			    },
			    unhighlight: function(element) {
			        $(element).closest('.form-group').removeClass('has-error');
			    },
			    errorElement: 'span',
			    errorClass: 'help-block',
			    errorPlacement: function(error, element) {
			        if(element.parent('.input-group').length) {
			            error.insertAfter(element.parent());
			        } else if(element.parents(".input-group").length){
			        	error.insertAfter(element.parents(".input-group"));
			        } else {
			            error.insertAfter(element);
			        }
			    },
			    ignore: []
			});
    };

     /* ==========================================================================
          Cookie Notificaiton
     ========================================================================== */
       
     var cookieNotification = function() {
          var $cookienotification = $(".cookie-notification-wrapper"),
               getCookie = function(name) {
                    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); return match ? match[1] : null;
               }

          // Show notification?
          getCookie("dalton_cookie_notification") == null ? $cookienotification.removeClass("hidden") : $cookienotification.remove();

          $cookienotification.find(".btn").on("click",function(e) {
               // Close & set cookie
               $cookienotification.remove();
               document.cookie = "dalton_cookie_notification=accept;expires=0;path=/";
          })

     }

    
    /* ==========================================================================
	   Return public methods
    ========================================================================== */
    
    return {
	    init:init
	};

}();

$(document).ready(function() {
    
    main.init();
    
}); 


        



