!function($,window,document){
    $(window).on("load",function(){
        var T1=Template1();
        var preview=$(".preview"),
            imgContainer=$("#inner1 .BlogList .inner1Box .imgContainer"),
            inner1Box=$(".inner1Box");
        $("#loading").fadeOut(function(){$(this).remove()});
        T1.HomeSlider();
        T1.scrollTo($("#TopMenu>li>a"));
        T1.scrollTo($("#right-menuUL>li>a"));
        T1.period();
        preview.css("height",Math.ceil($(".preview img").innerHeight()));
        imgContainer.css("height",Math.ceil($("#inner1 .BlogList .inner1Box .imgContainer img").innerHeight()));

        $("#md-menuBtn").on("click",function(){
            $("#right-menu").animate({"width":"toggle"},function(){
            $("#md-menuBtn>span").toggleClass("toggleOn");})
        });
    //  Portfolio event

        preview.on("mouseenter",function(e){
            $(this).children(".mark").show(); 
            $(this).children("div").stop().fadeIn(); 
            $(this).css({"box-shadow":"0px 0px 4px 0px #444","text-aglin":"center"});
            $(this).children("img").stop().animate({"width":"110%","marginTop":"-5%","marginLeft":"-5%"});
        });
        preview.on("mouseleave",function(e){
            $(this).children("div").stop().fadeOut(); 
            $(this).children(".mark").hide(); 
            $(this).children("img").stop().animate({"width":"100%","marginTop":"0","marginLeft":"0"});
            $(this).css("box-shadow","none"); 
        });

    //  Blog Box event
        inner1Box.on("mouseenter",function(){
            $(this).children(".imgContainer").children(".mark,.mask").stop().fadeIn();
            $(this).children(".imgContainer").children("img").stop().animate({"width":"110%","margin":"-5%"});
        });
        inner1Box.on("mouseleave",function(){
            $(this).children(".imgContainer").children(".mark,.mask").stop().fadeOut();
            $(this).children(".imgContainer").children("img").stop().animate({"width":"100%","margin":"0%"});
        });

    //  Frequently Ask Questions event
        $(".QBox .boxTitle").on("click",function(){
                $(this).toggleClass("boxTitleClick");
                $(this).parent().children(".textBody").slideToggle();
        });

        $(window).on("resize",function(){
            if($("#right-menu").css("display")=="block"){
                $("#right-menu").css("display","none");
                $("#md-menuBtn>span").removeClass("toggleOn");
            }
            preview.css("height",$(".preview img").innerHeight());
            $(".inner1Box .imgContainer").css("height",$(".inner1Box .imgContainer img").innerHeight());
        });
        
        $('#PortfolioPreview div').magnificPopup({
                delegate :"a",
                gallery:{
                items:[
                {src:'images/img_1.jpg'},{src:'images/img_2.jpg'},{src:'images/img_3.jpg'}
                  ,{src:'images/img_4.jpg'},{src:'images/img_5.jpg'},{src:'images/img_6.jpg'}
                  ,{src:'images/img_2.jpg'},{src:'images/img_2.jpg'},{src:'images/img_3.jpg'}],
                enabled: true,
            },
            type: 'image'
        });
        $('.owl-carousel').owlCarousel({
            loop:true,
            margin:20,
            nav:true,
            touchDrag:true,
            responsive:{0:{items:1},600:{items:2},1000:{items:3}}
        })

        $(window).on("scroll",function(){
            (function(){
                var TotalTop=$(window).scrollTop();
                var index=0;
                if(TotalTop>=T1.getScrollTop().HomeTop&&TotalTop<T1.getScrollTop().ServicesTop)
                    index=0;
                else if(TotalTop>=T1.getScrollTop().ServicesTop&&TotalTop<T1.getScrollTop().PortfolioTop)
                    index=1;
                else if(TotalTop>=T1.getScrollTop().PortfolioTop&&TotalTop<T1.getScrollTop().BlogTop)
                    index=2;
                else if(TotalTop>=T1.getScrollTop().BlogTop&&TotalTop<T1.getScrollTop().ContactTop)
                    index=3;
                else if(TotalTop>=T1.getScrollTop().ContactTop)
                    index=4;
                $("#TopMenu li").each(function(){
                    if($(this).index()==index)
                        $(this).children().addClass("selected");
                    else
                        $(this).children().removeClass("selected");
                });
            })();

            if(T1.getScrollTop().totalScroll>T1.getScrollTop()["Fun_FactListTop"]){
                $("#Fun-FactList div").addClass("fadeInLeft animated");
                $("#Fun-FactList div").css("display","block");
            }
        });
    });
    function Template1(){
        var titles=["Explore the new template.","Creative. Innovative.Intuitive.","A new experience."];
        var buttonText=["Follow @gettemplatesco","Get started","Get started"];
        var imgName=["images/img_bg_1.jpg","images/img_bg_2.jpg","images/img_bg_3.jpg"]
        var index=1;
        this.getScrollTop=function(){
            return {
                "totalScroll":Math.floor($(window).scrollTop()+$(window).innerHeight()),
                "HomeTop":Math.floor($("#Home").offset().top),
                "ServicesTop":Math.floor($("#Services").offset().top),
                "PortfolioTop":Math.floor($("#Portfolio").offset().top),
                "BlogTop":Math.floor($("#Blog").offset().top),
                "Fun_FactListTop":Math.floor($("#Fun-FactList").offset().top),
                "ContactTop":Math.floor($("#Contact").offset().top)
            };
        }
        this.HomeSlider=function(){
            $("#HomeSlider .ctr .ctrLeft").on("click",function(){
                index-=1;
                change();
            });
            $("#HomeSlider .ctr .ctrRight").on("click",function(){
                index+=1;
                change();
            });
        }
        this.period=function(){
            var p=setInterval(function(){
                index+=1;
                change(index)},6000);
        }
        this.change=function(){
            if(index<0){
                index=2;
            }
            else if(index>3){
                index=1;
            }
           $("#HomeTitle h1,button").fadeOut("fast",function(){
               $("#HomeSlider .mask").fadeOut("fast",function(){
                   $("#HomeSlider .HomeSliderImg").each(function(){
                       if($(this).index()==index){
                           $(this).css("display","block");
                       }
                       else{
                           $(this).css("display","none");
                       }
                   })
                   $("#HomeSlider .mask").fadeIn();
                   $("#HomeTitle button").html(buttonText[index]).fadeIn();
                   $("#HomeTitle h1").html(titles[index]).fadeIn("slow");
               });
           })
        }
        this.scrollTo=function(JQElement){
            JQElement.on("click",function(){
                if($("#right-menu").css("display")=="block"){
                    $("#right-menu").css("display","none");
                    $("#md-menuBtn>span").removeClass("toggleOn");
                }
                var str=$(this).attr("data-section");
                if(str=="Home")
                    $("html,body").animate({"scrollTop":0},1200,"swing");
                else if(str=="Services")
                    $("html,body").animate({"scrollTop":getScrollTop().ServicesTop+1},1200,"swing");
                else if(str=="Portfolio")
                    $("html,body").animate({"scrollTop":getScrollTop().PortfolioTop+1},1200,"swing");
                else if(str=="Blog")
                    $("html,body").animate({"scrollTop":getScrollTop().BlogTop+1},1200,"swing");
                else if(str=="Contat")
                    $("html,body").animate({"scrollTop":getScrollTop().ContactTop+1},1200,"swing");
            })
        }
        return this;
    }
}($,window,document);