<?php
/**
 * RSS2 Feed Template for displaying RSS2 Comments feed.
 *
 * @package WordPress
 */

//header('Content-Type: ' . feed_content_type('rss-http') . '; charset=' . get_option('blog_charset'), true);
header('Content-Type: text/plain');
global $digressit_commentbrowser, $wp_rewrite, $matches, $wp_query;
//echo '<?xml version="1.0" encoding="'.get_option('blog_charset').'"?'.'>';
?>
<rss version="2.0"
	xmlns:content="http://purl.org/rss/1.0/modules/content/"
	xmlns:dc="http://purl.org/dc/elements/1.1/"
	xmlns:atom="http://www.w3.org/2005/Atom"
	xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
	<?php do_action('rss2_ns'); do_action('rss2_comments_ns'); ?>>
<channel>
	<title><?php
		if ( is_singular() )
			printf(ent2ncr(__('Comments on: %s')), get_the_title_rss());
		elseif ( is_search() )
			printf(ent2ncr(__('Comments for %s searching on %s')), get_bloginfo_rss( 'name' ), esc_attr($wp_query->query_vars['s']));
		else
			printf(ent2ncr(__('Comments for %s')), get_bloginfo_rss( 'name' ) . get_wp_title_rss());
	?></title>
	<atom:link href="<?php self_link(); ?>" rel="self" type="application/rss+xml" />
	<link><?php (is_single()) ? the_permalink_rss() : bloginfo_rss("url") ?></link>
	<description><?php bloginfo_rss("description") ?></description>
	<lastBuildDate><?php echo mysql2date('r', get_lastcommentmodified('GMT')); ?></lastBuildDate>
	<?php the_generator( 'rss2' ); ?>
	<sy:updatePeriod><?php echo apply_filters( 'rss_update_period', 'hourly' ); ?></sy:updatePeriod>
	<sy:updateFrequency><?php echo apply_filters( 'rss_update_frequency', '1' ); ?></sy:updateFrequency>
	<?php do_action('commentsrss2_head'); ?>
<?php




/* FIXME: I can't find a way to get the user var from GET this is a temp hack */
preg_match('#paragraphlevel/(.+)#', $_SERVER['REQUEST_URI'], $gets);

$post = get_post($post_id);

//var_dump($post);
$valid_paragraph_tags = 'div|object|p|blockquote|code|h1|h2|h3|h4|h5|h6|h7|h8|table';
if($options['parse_list_items'] == 1){
	$valid_paragraph_tags .= "|li";
}
else{
	$valid_paragraph_tags .= "|ul|ol";
}

$paragraphs = $digressit_commentbrowser->get_tags(force_balance_tags(apply_filters('the_content',$post->post_content)), $valid_paragraph_tags, 'simplexml');


//var_dump($paragraphs);



if ( $paragraphs ) : foreach ( $paragraphs as $key => $paragraph ) : 

?>
	<item>
		<title><?php echo $post->post_title; ?></title>
		<link><?php echo get_permalink($post->ID) ?></link>
		<dc:creator><?php echo $post->post_author; ?></dc:creator>
		<pubDate><?php echo mysql2date('D, d M Y H:i:s +0000', $comment->comment_date_gmt, false); ?></pubDate>
		<guid isPermaLink="false"><?php echo $comment_post->guid; ?>#<?php echo $comment->comment_text_signature; ?></guid>
		<description>Paragraph <?php echo $key; ?></description>
		<content:encoded><![CDATA[<?php echo $paragraph; ?>]]></content:encoded>
	</item>
<?php endforeach; endif; ?>
</channel>
</rss>
