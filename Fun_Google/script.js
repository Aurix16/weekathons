$(document).ready(function(){
    
    $('input[type="text"]').focus(()=>{
        $('#search').css('box-shadow','0px 2px 1px 0.3px #c2c2c2');
    });

    $(document).keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            let value = $('#search_text').val();
            let val = value.toLowerCase();
            if (val == "rotate"){
                   rotate(); 
            }else if(val == "skew"){
                skew();
            }else if(val == "normal"){
                normal();
            }else{
                alert("Enter 'rotate','skew' or 'normal' in search bar");
            }
        }
    });

    function disappear(){
        $("#google, #buttons, #languages").css("visibility","hidden");
    }
    function appear(){
        $("#google, #buttons, #languages").css("visibility","visible");
    }

    let rotate_factor = 0;
    function rotate(){
        rotate_factor += 1;
        disappear();
        $('#search').css({
            'transform' : 'rotate('+ rotate_factor*360 +'deg)',
            '-webkit-transition': '2s ease-in'
        });
        $(this).one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
              function(event) {
            appear();
        });
    }

    function skew(){
        $('#search').css({
            'webkitTransform': 'skew('+30+'deg)',
            '-webkit-transition': '0.5s ease-in'
        });
    }

    function normal(){
        location.reload();
    }
});