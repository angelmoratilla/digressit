<?php
/**
 * @package Digressit
 * @subpackage Digressit_Wireframe
 */
?>
<?php get_header(); ?>

<div class="content-wrapper">
<div id="search-wrapper" role="main">
<?php digressit_get_stylized_title(); ?>
<?php if (have_posts()) : 
while (have_posts()) : the_post(); ?>
    <div <?php if(function_exists('post_class')){ post_class(); } ?> id="post-<?php the_ID(); ?>">
        <div class="entry" role="article">
            <a href="<?php the_permalink(); ?>"><h2><?php the_title(); ?></h2></a>
            <?php 
    
            $post_content = str_replace('[dig]','',strip_tags($post->post_content));
    
    
            $pos = (int)strpos($post_content, esc_html(strtolower($_GET['s'])) );
    
            $post_content = substr($post_content, $pos, 1000 );
    
    
            $post_content = str_replace(esc_html ($_GET['s']), '<b style="padding: 0 0px; background-color: #f6ff00">'.esc_html($_GET['s']).'</b>', $post_content);
    
    
            ?>
    
    
            <?php echo "[...] ".$post_content." [...]"; ?>
        
        </div>    
    </div>            
<?php endwhile;?>
<?php else: ?>
    <div class="post" id="post-<?php the_ID(); ?>">
        <div class="entry" role="article">
            <?php _e('No Results'); ?>
        </div>    
    </div>            
<?php endif; ?>
</div>
</div>
<?php get_footer(); ?>