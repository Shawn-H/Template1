
!function($,window,document){
    function Plugin(element,option){
        this.element=element;
        this.mask=document.createElement("div");
        this.isCreated=false;
        this.defualt={
            "width":"38%",
            "height":"20%",
            "title":"标题",
            "content":"内容",
            "drapable":true
        }
        this.options=$.extend({},this.defualt,option);
    }
    Plugin.prototype={
        inital:function(){
            var vObj=this;
//            设置mask
            vObj.mask.setAttribute("id","DialogMask");
//            触发事件
            this.element.on("click",function(){
                vObj.showDialog();
            })
        },
        showDialog:function(){
            var vObj=this;
            vObj.createDialogBox();
            if($("#DialogMask").length<1)
                document.body.appendChild(vObj.mask);
            vObj.DialogBox.css({"height":vObj.options.height,"width":vObj.options.width,"top":($("#DialogMask").innerHeight()-vObj.DialogBox.innerHeight())/2,"left":($("#DialogMask").innerWidth()-vObj.DialogBox.innerWidth())/2}).fadeIn(200);//            关闭
            vObj.DialogBox.css({"top":($("#DialogMask").innerHeight()-vObj.DialogBox.innerHeight())/2,"left":($("#DialogMask").innerWidth()-vObj.DialogBox.innerWidth())/2});
//            关闭
            vObj.CloseBtn.on("click",function(e){
                vObj.closeDialog(e);
            });
            
//            禁止选择
            $("#DialogBox , .DialogBox-Content, .DialogBoxTitle, .DialogBoxTitle .DialogBox-CloseBtn").on("selectstart",vObj.forbidSelect());
            
//            拖拽事件
            vObj.DialogTitle.on("mousedown touchstart",function(e){
                if(vObj.options.drapable)
                    if(e.target==$(this)[0])
                        vObj.drap(e);
            });
            
//            结束拖拽事件
            vObj.DialogTitle.on("mouseup",function(e){
                vObj.DialogMouseUp(e);
            });
            
        },
        closeDialog:function(e){
            var vObj=this;
            $("#DialogMask").remove();
            vObj.DialogBox.fadeOut().remove();
        },
        forbidSelect:function(){
            return false;
        },
        drap:function(e){
            var vObj=this;
            var startOffsetL=vObj.DialogBox[0].offsetLeft;
            var startOffsetT=vObj.DialogBox[0].offsetTop;
            var limitWidth=$("#DialogMask").innerWidth();
            var limitHeight=$("#DialogMask").innerHeight();
            e.stopPropagation();
            if(e.targetTouches){
                 var touch = e.targetTouches[0];
                 var startX=touch.clientX;
                 var startY=touch.clientY;
                 vObj.DialogTitle.on("touchmove",function(e){
                     var touch =e.targetTouches[0];
                     e.preventDefault();
                     var l=(touch.clientX-startX)+startOffsetL;
                     var t=(touch.clientY-startY)+startOffsetT;
                     //判断超出边界
                     if(l+vObj.DialogBox.innerWidth()>limitWidth){l=limitWidth-vObj.DialogBox.innerWidth();}
                     if(t+vObj.DialogBox.innerHeight()>limitHeight){t=limitHeight-vObj.DialogBox.innerHeight();}
                     if(l<=0){l=0}
                     if(t<=0){t=0}
                     vObj.DialogBox.css("left",l+"px");
                     vObj.DialogBox.css("top",t+"px");
                 });
             }
             else{
                 var startX=e.clientX;
                 var startY=e.clientY;
                 document.onmousemove=function(e){
                     var l=(e.clientX-startX)+startOffsetL;
                     var t=(e.clientY-startY)+startOffsetT;
                     //判断超出边界
                     if(l+vObj.DialogBox.innerWidth()>limitWidth){l=limitWidth-vObj.DialogBox.innerWidth();}
                     if(t+vObj.DialogBox.innerHeight()>limitHeight){t=limitHeight-vObj.DialogBox.innerHeight();}
                     if(l<=0){l=0}
                     if(t<=0){t=0}
                     vObj.DialogBox.css("left",l+"px");
                     vObj.DialogBox.css("top",t+"px");
                }
            }
        },
        DialogMouseUp:function(e){
            document.onmousemove=null;
        },
        createDialogBox:function(){
            var vObj=this;
            if($("#DialogBox").length<1)
            {
                var box=document.createElement("div"),
                    titleDiv=document.createElement("div"),
                    titletext=document.createElement("span"),
                    closeBtn=document.createElement("span"),
                    textContent=document.createElement("div");
                box.setAttribute("id","DialogBox");
                titleDiv.className="DialogBoxTitle";
                textContent.className="DialogBox-Content";
                closeBtn.className="DialogBox-CloseBtn";
                titletext.innerHTML=vObj.options.title;
                closeBtn.innerHTML="X";
                textContent.innerHTML=vObj.options.content;
                box.appendChild(titleDiv);
                box.appendChild(textContent);
                titleDiv.appendChild(titletext);
                titleDiv.appendChild(closeBtn);
                document.body.appendChild(box);
            }
            vObj.DialogBox=$("#DialogBox");
            vObj.DialogTitle=$("#DialogBox .DialogBoxTitle");
            vObj.CloseBtn=$("#DialogBox .DialogBoxTitle .DialogBox-CloseBtn");
        }
    };
    $.fn.HDialogBox=function(option){
        var plugin=new Plugin(this,option);
        return plugin.inital();
    }
}($,window,document);
   