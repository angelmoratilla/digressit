<?php

function header_default_top_menu(){
	$options= get_option('digressit');
?>
	<ul>
		<li><a title="<?php _e($options['table_of_contents_label'],'digressit'); ?>" href="<?php bloginfo('home'); ?>"><?php _e($options['table_of_contents_label'],'digressit'); ?></a></li>
		<li><a title="<?php _e($options['comments_by_section_label'],'digressit'); ?>" href="<?php bloginfo('home'); ?>/comments-by-section"><?php _e($options['comments_by_section_label'],'digressit'); ?></a></li>
		<li><a title="<?php _e($options['comments_by_users_label'],'digressit'); ?>"  href="<?php bloginfo('home'); ?>/comments-by-contributor"><?php _e($options['comments_by_users_label'],'digressit'); ?></a></li>
		<li><a title="<?php _e($options['general_comments_label'],'digressit'); ?>"  href="<?php bloginfo('home'); ?>/general-comments"><?php _e($options['general_comments_label'],'digressit'); ?></a></li>
		<?php do_action('add_commentbrowser_link'); ?>		
	</ul>

<?php
}



function digressit_body_class(){
	$request_root = parse_url($_SERVER['REQUEST_URI']);

	//var_dump(is_commentbrowser());
	if(function_exists('is_commentbrowser') && is_commentbrowser()){
		$current_page_name .= ' comment-browser ';	
	}
	elseif(is_multisite() && $blog_id == 1 && is_front_page()){
		$current_page_name = ' frontpage ';	
	}
	else{
		$current_page_name .= basename(get_bloginfo('home'));
		if(is_front_page()){
			$current_page_name .= ' site-home ';
		}	
	}
	return $current_page_name;
}

?>