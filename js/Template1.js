!function(jQuery,window,document){
    var Template1=new Object({
        autoplay:0,
        index:1,
        titles:["Explore the new template.","Creative. Innovative.Intuitive.","A new experience."],
        buttonText:["Follow @gettemplatesco","Get started","Get started"],
        imgName:["images/img_bg_1.jpg","images/img_bg_2.jpg","images/img_bg_3.jpg"],
        init:function(){
            var self=this;
            $("#loading").fadeOut(function(){$(this).remove()});
            self.pictureResize();
            self.autoplay=self.autoplayStart();
            $("#HomeSlider .ctr .ctrLeft").on("click",function(){
                self.index-=1;
                self.change();
            });
            $("#HomeSlider .ctr .ctrRight").on("click",function(){
                self.index+=1;
                self.change();
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
            });
        },
        getScrollTop:function(){
            return {
                "totalScroll":Math.floor($(window).scrollTop()+$(window).innerHeight()),
                "HomeTop":Math.floor($("#Home").offset().top),
                "ServicesTop":Math.floor($("#Services").offset().top),
                "PortfolioTop":Math.floor($("#Portfolio").offset().top),
                "BlogTop":Math.floor($("#Blog").offset().top),
                "Fun_FactListTop":Math.floor($("#Fun-FactList").offset().top),
                "ContactTop":Math.floor($("#Contact").offset().top)
            };
        },
        scrollTo:function(JQElement){
            var self=this;
            JQElement.on("click",function(){
                if($("#right-menu").css("display")=="block"){
                    $("#right-menu").css("display","none");
                    $("#md-menuBtn>span").removeClass("toggleOn");
                }
                var str=$(this).attr("data-section");
                if(str=="Home")
                    $("html,body").animate({"scrollTop":0},1200,"swing");
                else if(str=="Services")
                    $("html,body").animate({"scrollTop":self.getScrollTop().ServicesTop+1},1200,"swing");
                else if(str=="Portfolio")
                    $("html,body").animate({"scrollTop":self.getScrollTop().PortfolioTop+1},1200,"swing");
                else if(str=="Blog")
                    $("html,body").animate({"scrollTop":self.getScrollTop().BlogTop+1},1200,"swing");
                else if(str=="Contat")
                    $("html,body").animate({"scrollTop":self.getScrollTop().ContactTop+1},1200,"swing");
            })
        },
        change:function(){
            var self=this;
            clearInterval(self.autoplay);
            self.autoplay=self.autoplayStart();
            if(self.index<0){
                self.index=2;
            }
            else if(self.index>3){
                self.index=1;
            }
            
           $("#HomeTitle h1,button").fadeOut("fast",function(){
               $("#HomeSlider .mask").fadeOut("fast",function(){
                   $("#HomeSlider .HomeSliderImg").each(function(){
                       if($(this).index()==self.index){
                           $(this).css("display","block");
                       }
                       else{
                           $(this).css("display","none");
                       }
                   })
                   $("#HomeSlider .mask").fadeIn();
                   $("#HomeTitle button").html(self.buttonText[self.index]).fadeIn();
                   $("#HomeTitle h1").html(self.titles[self.index]).fadeIn("slow");
               });
           });
        },
        listenScroll:function(){
            var self=this;
                var TotalTop=$(window).scrollTop();
                var index=0;
                if(TotalTop>=self.getScrollTop().HomeTop&&TotalTop<self.getScrollTop().ServicesTop)
                    index=0;
                else if(TotalTop>=self.getScrollTop().ServicesTop&&TotalTop<self.getScrollTop().PortfolioTop)
                    index=1;
                else if(TotalTop>=self.getScrollTop().PortfolioTop&&TotalTop<self.getScrollTop().BlogTop)
                    index=2;
                else if(TotalTop>=self.getScrollTop().BlogTop&&TotalTop<self.getScrollTop().ContactTop)
                    index=3;
                else if(TotalTop>=self.getScrollTop().ContactTop)
                    index=4;
                $("#TopMenu li").each(function(){
                    if($(this).index()==index)
                        $(this).children().addClass("selected");
                    else
                        $(this).children().removeClass("selected");
                });
        },
        autoplayStart:function(){
            var self=this;
            return setInterval(function(){
                self.index+=1;
                self.change(self.index)},5000);
        },
        FactListShow:function(){
            if(Template1.getScrollTop().totalScroll>Template1.getScrollTop()["Fun_FactListTop"]){
                $("#Fun-FactList div").addClass("fadeInLeft animated");
                $("#Fun-FactList div").css("display","block");
            }
        },
        rightMenu:function(){
            if($("#right-menu").css("display")=="block"){
                $("#right-menu").css("display","none");
                $("#md-menuBtn>span").removeClass("toggleOn");
            }
        },
        pictureResize:function(){
            $(".preview").css("height",$(".preview img").innerHeight());
            $(".inner1Box .imgContainer").css("height",$(".inner1Box .imgContainer img").innerHeight());
        }
    });
    
    
    $(window).on("load",function(){
        $(window).on("scroll",function(){
            Template1.listenScroll();
            Template1.FactListShow();
        });
        $(window).on("resize",function(){
            Template1.rightMenu();
            Template1.pictureResize();
        });
        Template1.init();
        Template1.scrollTo($("#TopMenu>li>a"));
        Template1.scrollTo($("#right-menuUL>li>a"));
        $("#md-menuBtn").on("click",function(){
            $("#right-menu").animate({"width":"toggle"},function(){
            $("#md-menuBtn>span").toggleClass("toggleOn");})
        });
    //  Portfolio event
        $(".preview").on("mouseenter",function(e){
            $(this).children(".mark").show(); 
            $(this).children("div").stop().fadeIn(); 
            $(this).css({"box-shadow":"0px 0px 4px 0px #444","text-aglin":"center"});
            $(this).children("img").stop().animate({"width":"110%","marginTop":"-5%","marginLeft":"-5%"});
        });
        $(".preview").on("mouseleave",function(e){
            $(this).children("div").stop().fadeOut(); 
            $(this).children(".mark").hide(); 
            $(this).children("img").stop().animate({"width":"100%","marginTop":"0","marginLeft":"0"});
            $(this).css("box-shadow","none"); 
        });
    //  Blog Box event
        $(".inner1Box").on("mouseenter",function(){
            $(this).children(".imgContainer").children(".mark,.mask").stop().fadeIn();
            $(this).children(".imgContainer").children("img").stop().animate({"width":"110%","margin":"-5%"});
        });
        $(".inner1Box").on("mouseleave",function(){
            $(this).children(".imgContainer").children(".mark,.mask").stop().fadeOut();
            $(this).children(".imgContainer").children("img").stop().animate({"width":"100%","margin":"0%"});
        });
    //  Frequently Ask Questions event
        $(".QBox .boxTitle").on("click",function(){
                $(this).toggleClass("boxTitleClick");
                $(this).parent().children(".textBody").slideToggle();
        });
    });
}(jQuery,window,document);