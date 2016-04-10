(function($){
  var scrollbar = $('<div class="cleaner-scrollbar"></div>'),
		scrollbar_handle = $('<div class="cleaner-scrollbar-handle"></div>'),
		scrollbar_handle_end = 0,
		scrollbar_inner_width = 0,
		scrollbar_children,
		scrollbar_first_child;
		
	$.fn.cleaner_scrolling = function() {
		return this.each(function() {
			
			var scrollbar_container = $(this);
			var scrollbar_container_width = scrollbar_container.width();
			scrollbar_children = scrollbar_container.find('> *');
			scrollbar_first_child = scrollbar_container.find('> *:first-of-type');
			scrollbar_children.each(function(){
				var scrollbar_child_width = $(this).outerWidth(true);
				scrollbar_inner_width = scrollbar_inner_width + scrollbar_child_width;
			});
			scrollbar_inner_width = scrollbar_inner_width - scrollbar_container_width;
			var scrollbar_inner_perc = scrollbar_container_width/scrollbar_inner_width*100;
			$(this).append(scrollbar).css({"position":"relative", "overflow":"hidden"});
			scrollbar.append(scrollbar_handle);
			scrollbar.css({
				"position":"absolute",
				"bottom":"0",
				"left":"0",
				"width":"100%",
				"height":"15px",
				"background-color":"#efefef"
			});
			scrollbar_handle.css({
				"position":"absolute",
				"top":"0",
				"left":"0",
				"width":scrollbar_inner_perc+"%",
				"height":"100%",
				"background-color":"#ababab",
				"cursor":"pointer"
			});
			
			var scrollbar_width = scrollbar.width();
			var scrollbar_handle_width = scrollbar.find('.cleaner-scrollbar-handle').width();
			scrollbar_handle_end = (scrollbar_width - scrollbar_handle_width);
		});
		
		
		
		
	};
	$(document).on('click', '.cleaner-scrollbar', function(e){
		if(e.target === e.currentTarget) {
			var offset = $(this).offset();
			var mouseX = e.pageX - offset.left;
			var scrollbar_width = $('.cleaner-scrollbar').width();
			var handle_width = $('.cleaner-scrollbar-handle').width();
			var handle_min = handle_width;
			var handle_max = scrollbar_width - handle_width;
			var scrollbar_end = (scrollbar_width - handle_width);
			if(mouseX >= handle_max){
				//If you click farther than the handle can reach
				$('.cleaner-scrollbar-handle').css({"left":scrollbar_width-handle_width+"px"});
				var scrollbar_pos_perc = (scrollbar_width-handle_width)/scrollbar_end;
				var article_pos_px = scrollbar_inner_width*scrollbar_pos_perc;
				move_children(article_pos_px);
			} else if( mouseX <= handle_width){
				//If you click less than than the handle can reach
				$('.cleaner-scrollbar-handle').css({"left":"0px"});
				move_children(0);
			} else {
				//If you click anywhere in between the other two
				$('.cleaner-scrollbar-handle').css({"left":mouseX-(handle_width/2)+"px"});
				var scrollbar_pos_perc = (mouseX-(handle_width/2))/scrollbar_end;
				var article_pos_px = scrollbar_inner_width*scrollbar_pos_perc;
				move_children(article_pos_px);
			}	
		}
	});
	scrollbar_handle.draggable({
		axis: "x",
		containment: "parent",
		drag: function() {
			var scrollbar_handle_pos = $(this).css("left").replace("px", "");
			var scrollbar_handle_pos_perc = scrollbar_handle_pos/scrollbar_handle_end;
			var child_pos = scrollbar_inner_width*scrollbar_handle_pos_perc;
			move_children(child_pos);
		}
	});
	
	
	function move_children(child_pos){
		scrollbar_first_child.css({"margin-left":"-"+child_pos+"px"});	
	}
}( jQuery ));
