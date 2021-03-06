function popWork(p_url, hed, des)
{

    var img = new Image()

    img.src = p_url
    img.id="dynamic"
    img.onerror = function (e) { alert('ошибка при загрузке изображения') }

    if(img.complete)
    {
        popup(hed, des, img.width, img)
        return
    }

    else img.onload = function (e) {

        popup(hed, des, img.width, img)
    }
}



$(document).ready(function() {
    res();

    var step;
    var allowClick=true;


    function res(){
        w = $(window).width()

        popupRemove();

        bw = parseInt(w/2) - 68;


        $(".serviceImg").css("width", bw/2 - 5);
        $(".serviceImg").css("width", bw/2 - 5);

        $(".service").css("width", bw);

        step=bw/2+8.5;
        //$(".serviceImg").css("margin-right", imgW);

        $(".scrollAble").css("left",0);



        $(".bService").each(function(indx, el){

           if($(el).attr("id") != undefined) n = $(el).attr("id").charAt(0);

            if(n=="l")
            {
               $(el).removeClass("na");
                $(el).addClass("nav");
            }
           else
            {
               $(el).removeClass("nav");
                $(el).addClass("na");
            }

        });

        maxH=0;

        $(".val").each(function(ind, el)
        {
            h=parseInt($(el).height())
            if(maxH < h){maxH=h;}
        });

        $(".serviceDiv").each(function(ind, el)
        {
           $(el).height(maxH + 20)
        });

    }

    $(window).resize(function()
    {
       res();
    });

    $(".bb").click(function(event)
    {

        if(!allowClick)return;

        var tempId = event.target.id;
        var dir = -1;


        id=tempId.substr(1, tempId.length - 1);
        divId="#s"+id;

        if(tempId.charAt(0) == "l")
        {
            dir=1;

            //if(parseInt($(divId).css("left")) == 0)
            {
                $('#r' + id).removeClass("na");
                $('#r' + id).addClass("nav");
            }
            //else
            if(parseInt($(divId).css("left")) <= -step * ($(divId).children().length - 3) + 2)
            {
                if(parseInt($(divId).css("left")) <= -step * ($(divId).children().length - 2) + 2) return;
                $('#l' + id).removeClass("nav");
                $('#l' + id).addClass("na");
            }

        }
        else
        {
            //if(parseInt($(divId).css("left")) == -step * ($(divId).children().length - 2))
            {
                $('#l' + id).removeClass("na");
                $('#l' + id).addClass("nav");
            }
            //else
            if(parseInt($(divId).css("left")) >= -step-2)
            {
                if(parseInt($(divId).css("left")) >= -2) return;
                $('#r' + id).removeClass("nav");
                $('#r' + id).addClass("na");
            }
        }

        pos = parseInt($(divId).css("left"));

        $(divId).animate({left:pos-step*dir},800, "easeOutQuart", function(){allowClick=true;});
        allowClick=false;
    });

    $(".serviceImg").click(function(event)
    {
        blackLayer();
        $.get("../get_work/", {w_id:event.target.id, s_id:$(event.target).attr("sid")}, function(data) {
                // Відобразити результат
            popWork(data.p, data.h, data.d)

        });
    });

});
