/**
 * The script is encapsulated in an self-executing anonymous function,
 * to avoid conflicts with other libraries
 */
(function($) {


	/**
	 * Declare 'use strict' to the more restrictive code and a bit safer,
	 * sparing future problems
	 */
	"use strict";



	/***********************************************************************/
	/*****************************  $Content  ******************************/
	/**
	* + Content
	* + Animate Itemas on Start
	* + FancyBox
	* + Menu Animation
	* + One Page Scroll
	* + Send Forms
	* + Show Videos
	* + Sticky menu
	* + Tootips
	*/



	/*********************  $Animate Itemas on Start  **********************/
	$('.animated').appear(function() {
		var elem = $(this);
		var animation = elem.data('animation');
		if ( !elem.hasClass('visible') ) {
			var animationDelay = elem.data('animation-delay');
			
			if ( animationDelay ) {
				setTimeout(function(){
					elem.addClass( animation + " visible" );
				}, animationDelay);

			} else {
				elem.addClass( animation + " visible" );

			}
		}
	});



	/****************************  FancyBox  *******************************/
	if ($('.fancybox').length) {
		$('a[data-rel]').each(function() {
			$(this).attr('rel', $(this).data('rel'));
		});
		
		$(".fancybox").fancybox({
			openEffect	: 'none',
			closeEffect	: 'none'
		});
	}



	/***********************  $Menu Show/Hide Logo  ************************/
	function showHideOnScroll(element, height, duration){
		var winTop = $(window).scrollTop();
		var act_opacity = element.css('opacity')

		if (winTop > height) {
			element.addClass('show');
		} else if (winTop <= height) {
			element.removeClass('show');
		}
	}

	$(window).scroll(function() { showHideOnScroll($('header'), 200, 500) });



	/*************************  $One Page Scroll  **************************/
	$('.navbar-nav').onePageNav({
		currentClass: 'active',
		filter: ':not(.exclude)',
	});



	/**************************  $Send Forms  ******************************/
	var $form = $('form');

	$form.on( 'submit' , function(e){ 
		if ( $(this).data('ajax') == 1 ) {
			e.preventDefault();
			sendForm( $(this) );
		} 
	})

	function sendForm($form){
		var fieldsData = getFieldsData($form),
			url = $form.attr('action'),
			method = $form.attr('method');

		sendData(url, method, fieldsData, $form, showResults)
	}

	
	function getFieldsData($form) {
		var $fields = $form.find('input, button, textarea, select'),
			fieldsData = {};

		$fields.each( function(){
			var name = $(this).attr('name'),
				val  = $(this).val(),
				type = $(this).attr('type');

			if ( typeof name !== 'undefined' ){
				
				if 	( type == 'checkbox' || type == 'radio' ){

					if ( $(this).is(':checked') ){
						fieldsData[name] = val;
					}
				} else {
					fieldsData[name] = val;
				}
					
			}
		});

		return fieldsData
	}

	function sendData(url, method, data, $form, callback){
		var $btn = $form.find('[type=submit]'),
			$response = $form.find('.form-response');

		$.ajax({
			beforeSend: function(objeto){ 
				$response.html('');
				$btn.button('loading'); 
			},
			complete: function(objeto, exito){ $btn.button('reset'); },
			data: data,
			success: function(dat){  callback(dat, $response); },
			type: method,
			url: url,
		});
	}

	function showResults(data, $response){
		 $response.html(data);
		 $response.find('.alert').slideDown('slow');
	}



	/***************************  $Show Videos  ****************************/
	$('.show-video').click(function(e){
		e.preventDefault();
		
		var video_name = $(this).data('video');
		var video_src = $('#'+video_name).attr('src')

		$('#'+video_name).attr('src',video_src+'?autoplay=1')
		$('#modal-'+video_name).modal()
		$('#modal-'+video_name).on('hide.bs.modal', function (e) {
			$('#'+video_name).attr('src',video_src)
		})

	});



	/***************************  $Sticky menu  ****************************/
	$("header").sticky({
		topSpacing:0,
		wrapperClassName: 'stickyWrapper'
	});



	/*****************************  $Tootips  ******************************/
	function changeTooltipColorTo(color) {
		//solution from: http://stackoverflow.com/questions/12639708/modifying-twitter-bootstraps-tooltip-colors-based-on-position
		$('.tooltip-inner').css('background-color', color)
		$('.tooltip.top .tooltip-arrow').css('border-top-color', color);
		$('.tooltip.right .tooltip-arrow').css('border-right-color', color);
		$('.tooltip.left .tooltip-arrow').css('border-left-color', color);
		$('.tooltip.bottom .tooltip-arrow').css('border-bottom-color', color);
	}

	$('.social a').tooltip({placement: 'top'})
	$('.social a').hover(function() {changeTooltipColorTo('#ec1b23')});


})(jQuery);
