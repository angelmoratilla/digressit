jQuery(document).ready(function() {


	AjaxResult.live_post_search = function(data) {
		jQuery('.sidebar-item').hide();
		for (var i in data.message) {  
			jQuery('#sidebar-item-' + data.message[i]).show();
		}  
	}
	
	jQuery('#live-post-search').focus(function(){
		if(jQuery('#live-post-search').val() == 'Search'){
			jQuery('#live-post-search').val('');
		}
	});
	


	
	function isNumber(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	}


	function standard_digressit_commentbox_parser(){

		jQuery('.textblock').each(function(i){
			var paragraphnumber = (i == 0) ? '&nbsp;'  : i;
			var commentlabel = (i == 0) ? ' general comment'  : ' comment';
			var commentcount = jQuery('.paragraph-' + (i)).length;
			
			commentlabel = (commentcount == 1) ? commentlabel  : commentlabel + 's';
			
			jQuery("#commentwindow").append('<div class="paragraph-block" id="paragraph-block-'+(i)+'"><div class="paragraph-block-button"><span class="paragraph-label">'+(paragraphnumber)+'</span>&nbsp; <span class="commentcount">'+commentcount+'</span> '+commentlabel+'</div><div class="toplevel-respond"></div></div>');
			
			jQuery('.paragraph-' + (i)).appendTo('#paragraph-block-'+(i));				
			
		});
	}

	var dynamic_call = 'typeof(' + commentbox_function + ') != "undefined"';

	if(eval(dynamic_call)){
		eval(commentbox_function + '();');
	}


	var comment_linked;

	jQuery('.comment').click(function(e){
		var index = jQuery('.comment').index(this);

		//comment-id
		var selected_blog_id = jQuery(jQuery('.comment .comment-blog-id').get(index)).attr('title');
		var selected_comment_id = jQuery(jQuery('.comment .comment-id').get(index)).attr('title');

		jQuery.cookie('selected_comment_id', null, { path: request_uri, expires: 1} );
		jQuery.cookie('selected_blog_id', null, { path: request_uri + '/', expires: 1} );

		jQuery.cookie('selected_comment_id', selected_comment_id, { path: '/', expires: 1} );
		jQuery.cookie('selected_blog_id', selected_blog_id, { path: '/', expires: 1} );
	});

	function expand_comment_area(item, paragraphnumber){
		jQuery('.textblock').removeClass('selected-textblock');
		jQuery('.commenticonbox').removeClass('selected-paragraph');
		jQuery('#textblock-' + paragraphnumber).addClass('selected-textblock');
		jQuery('#textblock-' + paragraphnumber + ' .commenticonbox').addClass('selected-paragraph');
		jQuery('.comment').removeClass('selected');	
		jQuery('#selected_paragraph_number').val(paragraphnumber);
		jQuery("#no-comments").hide();
		
		var no_comments = true;

		jQuery(".comment").hide();
		jQuery("#respond").show();
		jQuery('textblock-' +paragraphnumber).addClass('selected-textblock');	

		var selectedparagraph  = ".paragraph-" + paragraphnumber;
		
		if(jQuery(selectedparagraph).length){
			jQuery(selectedparagraph).show();
		}
		else{
			if(jQuery('.comment').length){
				jQuery("#no-comments").show();
			}			
		}
	}

	
	/****************************************************
	*	only if we are grouping the paragraphs 
	****************************************************/

	if(jQuery('.paragraph-block').length){

		//* this only happens when we are using the standard theme */
		if (isNumber(document.location.hash.substr(1))) {
			var paragraphnumber = document.location.hash.substr(1);
			if(paragraphnumber > jQuery('.textblock').length){
				return;
			}
			jQuery('.paragraph-'+(paragraphnumber)).show();			
			jQuery('#respond').appendTo('#paragraph-block-'+(paragraphnumber));
		}

		jQuery("#cancel-response").click(function (e) {
			//jQuery('#comment_parent').val(0);
			jQuery('#comment').val('Click here add a new comment...');
		});


		jQuery("#menu ul li").click(function (e) {
			jQuery('#comment_parent').val(0);
			jQuery('#comment').val('Click here add a new comment...');

			jQuery('#submit-comment').hide();
			jQuery('#cancel-response').hide();

			jQuery('.textblock').removeClass('selected-textblock');
			jQuery('.comment'  ).hide();
			jQuery('#respond').hide();						
			jQuery('#selected_paragraph_number').val(0);
		});
		//jQuery('<li class="page_item"><input class="live-post-search" type="text" value="Search"></li>').appendTo('.menu ul');
		
		jQuery('.textblock').toggle(function(){
			if(jQuery('.paragraph-block').length){
				jQuery('#respond').hide();			
				var paragraphnumber = parseInt(jQuery('.textblock').index(this)) +1 ;

				jQuery('#respond').appendTo('#paragraph-block-'+(paragraphnumber) + ' .toplevel-respond');
				jQuery('#respond').show();			
				jQuery('.comment' ).hide();
				jQuery('.paragraph-' + paragraphnumber ).show();

				jQuery('.textblock').removeClass('selected-textblock');
				var commentboxtop = jQuery('#commentbox').position().top;

				if(paragraphnumber > 0){
					jQuery('#textblock-' + paragraphnumber).addClass('selected-textblock');

					var top = jQuery('#textblock-' + paragraphnumber).offset().top;
					var scrollto = (top > 200)  ? (top - 35) : 0;

					jQuery(window).scrollTo(scrollto , 200);

					jQuery('#commentbox').scrollTo('#paragraph-block-'+(paragraphnumber) , 200);
				}
				jQuery('#selected_paragraph_number').val(paragraphnumber);
				
				document.location.hash = '#' + paragraphnumber;
			}


		}, function(){
			//document.location.hash = 's';
			jQuery('.textblock').removeClass('selected-textblock');
			jQuery('.comment'  ).hide();
			jQuery('#respond').hide();						
			jQuery('#selected_paragraph_number').val(0);
		});

		jQuery('.paragraph-block-button').toggle(function(e){
			jQuery('.comment').hide();

			var paragraphnumber = parseInt(jQuery('.paragraph-block-button').index(this));
			jQuery('#selected_paragraph_number').val(paragraphnumber);
			jQuery('.paragraph-' + paragraphnumber).show();
			jQuery('#respond').appendTo('#paragraph-block-'+(paragraphnumber) + ' .toplevel-respond');
			jQuery('#respond').show();			

			jQuery('.textblock').removeClass('selected-textblock');

			if(paragraphnumber > 0){

				var top = jQuery('#textblock-' + paragraphnumber).offset().top;
				jQuery('#textblock-' + paragraphnumber).addClass('selected-textblock');
			
				var scrollto = (top > 200)  ? (top - 30) : 0;
				jQuery(window).scrollTo(scrollto , 200);
				jQuery('#commentbox').scrollTo('#paragraph-block-'+(paragraphnumber) , 200);
			}
			
		}, function(e){
			jQuery('.comment').hide();
			jQuery('#respond').hide();
			jQuery('.textblock').removeClass('selected-textblock');
			jQuery('#selected_paragraph_number').val(0);
		});
	
	}



	if ( document.location.hash.substr(1, 7) == 'comment') {
		var commentname = document.location.hash.substr(1);

		var paragraphnumber = jQuery('#'+ commentname).attr("class").match(/paragraph-(\d+)/)[1];
				
		var item = jQuery('.commenticonbox').get((paragraphnumber));


		jQuery('#respond').appendTo('#paragraph-block-'+(paragraphnumber) + ' .toplevel-respond');
		jQuery('#respond').show();
		jQuery('.comment').hide();
		jQuery('.paragraph-' + paragraphnumber).show();

		jQuery('#selected_paragraph_number').attr('value', paragraphnumber );

		if(jQuery('.paragraph-' + paragraphnumber).length == 0){
			jQuery('#no-comments').show();			
		}
		else{
			jQuery('#no-comments').hide();
		}

		var top = jQuery('#textblock-' + paragraphnumber).offset().top;

		jQuery('#textblock-' + paragraphnumber).addClass('selected-textblock');

		var scrollto = (top > 200)  ? (top - 30) : 0;

		jQuery(window).scrollTo(scrollto , 200);
		jQuery('#commentbox ').scrollTo('#'+commentname , 200);

		if( jQuery('.paragraph-' + paragraphnumber).length > 0 ){
			jQuery("#no-comments").hide();			
		}
	}
	else if ( document.location.hash.substr(1, 13) == 'search-result') {
		
		jQuery(window).scrollTo( jQuery('.search-result:first'), 1000);
		
	}
	else if (isNumber(document.location.hash.substr(1))) {
		var paragraphnumber = document.location.hash.substr(1);

		if(paragraphnumber > jQuery('.textblock').length){
			return;
		}
		
		var item = jQuery('.commenticonbox').get((paragraphnumber));

		jQuery('#respond').appendTo('#paragraph-block-'+(paragraphnumber) + ' .toplevel-respond');
		jQuery('#respond').show();
		jQuery('.comment').hide();
		jQuery('.paragraph-' + paragraphnumber).show();

		jQuery('#selected_paragraph_number').attr('value', paragraphnumber );

		if(jQuery('.paragraph-' + paragraphnumber).length == 0){
			jQuery('#no-comments').show();			
		}
		else{
			jQuery('#no-comments').hide();
		}
		
		if(paragraphnumber > 0){
			var top = jQuery('#textblock-' + paragraphnumber).offset().top;
			jQuery('#textblock-' + paragraphnumber).addClass('selected-textblock');
			var scrollto = (top > 200)  ? (top - 30) : 0;

			jQuery(window).scrollTo(scrollto , 200);
		}
		
		if(jQuery('#paragraph-block-' + paragraphnumber).length){
			jQuery('#commentbox').scrollTo('#paragraph-block-'+(paragraphnumber) , 200);
		}

		if( jQuery('.paragraph-' + paragraphnumber).length > 0 ){
			jQuery("#no-comments").hide();			
		}
	}
	else{
		if( parseInt(jQuery('.comment').length) == 0){
			jQuery("#no-comments").show();			
		}
		else{
			jQuery("#no-comments").hide();	
		}	
	}
	
});