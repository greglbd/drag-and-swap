window.onload = function() {

  var dragger;

  var elems = document.querySelectorAll('.box');

  function handleDraggerEvent( instance, event, pointer ) {
    //set start position as key object
    if(!$(instance.element).data('key'))
      $(instance.element).data('key', { x: instance.relativeStartPosition.x, y: instance.relativeStartPosition.y });

    $(instance.element).find('.draggable').html('Drop on item to swap').removeClass('hide');
  }
  
  function handleDraggerEnd( instance, event, pointer) {
    
    //set current
    $(instance.element).attr('data-collide', false);
    
    var temp_html = $(instance.element).html();
    var $collision_element =  $('*[data-collide=true]');
    if($collision_element.hasClass('empty'))
    {
      $collision_element.removeClass('empty')
    }else
    {
      $(instance.element).html($collision_element.html());
    }
    
    $collision_element.html(temp_html).attr('data-collide', false);
    $collision_element.find('.draggable').addClass('hide').html('Drag here to replace');
    $(instance.element).find('.draggable').addClass('hide').html('Drag here to replace');
      $(instance.element).css({ 
        'left': '0px',
        'top': '0px'
    });
    
  }
  
  function handleDraggerMove( instance, event, pointer) {
    //console.log('pointer', pointer);
    $.each(elems, function(index, value){
        
      if($(elems[index]) != $(instance.element))
      {
        //get current position relative to start position;
        var posX = $(instance.element).data('key').x + instance.position.x;        
        var posY = $(instance.element).data('key').y + instance.position.y;
  
        if(posX >= $(this).position().left && posX <= $(this).position().left + $(this).width() && posY >= $(this).position().top && posY  <= $(this).position().top + $(this).height())
        { 
          if(!$(this).hasClass('empty'))         
            $(this).find('.draggable').removeClass('hide');  
          //add collision attribute to item 
          $(this).attr('data-collide', true);
        }else {
          if(!$(this).hasClass('empty'))  
            $(this).find('.draggable').addClass('hide');
          $(this).attr('data-collide', false);
        }
      }
    });
  }
  
  
  for ( var i=0, len = elems.length; i < len; i++ ) {
    dragger = new Draggabilly( elems[i], {
      containment: '.container'
    });
    dragger.on( 'dragStart', handleDraggerEvent );
    dragger.on( 'dragEnd', handleDraggerEnd );
    dragger.on( 'dragMove', handleDraggerMove );
  }
};
