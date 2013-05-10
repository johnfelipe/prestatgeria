// Copyright Zikula Foundation 2010 - license GNU/LGPLv3 (or at your option, any later version).
if(typeof(Zikula)=="undefined"){var Zikula={}}Zikula.define=function(a){return a.split(".").inject(Zikula,function(b,c){b[c]=b[c]||{};return b[c]})};Zikula.init=function(){if(Zikula.Browser.IE){Zikula.fixbuttons()}};document.observe("dom:loaded",Zikula.init);Zikula.Browser=(function(){var a={IE6:false,IE7:false,IE8:false,IE9:false};if(Prototype.Browser.IE){if(document.documentMode!="undefined"&&document.documentMode==9){a.IE9=true}else{if(document.documentMode!="undefined"&&document.documentMode==8){a.IE8=true}else{if(typeof(document.documentElement.style.maxHeight)!="undefined"){a.IE7=true}else{a.IE6=true}}}}return Object.extend(a,Prototype.Browser)})();Zikula.dejsonize=function(c){var a;try{a=c.evalJSON(true)}catch(b){alert(Zikula.__f("illegal JSON response: \n%1$s in\n%2$s",[b,c]))}return a};Zikula.showajaxerror=function(b){if(Object.isString(b)&&b.isJSON()){var a=b.evalJSON(true);if(a.core&&a.core.statusmsg){if(typeof(a.core.statusmsg)=="object"){if(!Object.isArray(a.core.statusmsg)){a.core.statusmsg=Object.values(a.core.statusmsg)}b=a.core.statusmsg.join("\n")}else{b=a.core.statusmsg}}}else{if(Object.isArray(b)){b=b.join("\n")}else{if(typeof(b)=="object"){b=Object.values(b).join("\n")}}}if(b){alert(b)}return};Zikula.ajaxResponseError=function(c,b){var a=Zikula.dejsonize(c.responseText);if("authid" in a){if(a.authid!=""){Zikula.updateauthids(a.authid)}}if(a.displayalert=="1"&&b!=true){Zikula.showajaxerror(a.errormessage)}return a};Zikula.setselectoption=function(b,a){$A($(b).options).each(function(c){c.selected=(c.value==a)})};Zikula.getcheckboxvalue=function(a){return $F(a)||""};Zikula.updateauthids=function(a){if(a.length!=0){$$("form input[name=authid]").invoke("writeAttribute","value",a)}return};Zikula.recolor=function(a,c){var b=true;$A($(a).childElements()).each(function(d){if(!Element.hasClassName(d,c)){Element.removeClassName(d,"z-odd");Element.removeClassName(d,"z-even");if(b==true){Element.addClassName(d,"z-odd")}else{Element.addClassName(d,"z-even")}b=!b}})};Zikula.switchdisplaystate=function(b){var a=$(b);if(a.getStyle("display")=="none"){if(typeof(Effect)!="undefined"){Effect.BlindDown(a)}else{a.show()}}else{if(typeof(Effect)!="undefined"){Effect.BlindUp(a)}else{a.hide()}}};Zikula.radioswitchdisplaystate=function(f,a,d){var e=$(f);var c=$(a);var b=e.select('input[type=radio][value="1"]').pluck("checked").any();if(b==d){if(c.getStyle("display")=="none"){if(typeof(Effect)!="undefined"){Effect.BlindDown(c)}else{c.show()}}}else{if(c.getStyle("display")!="none"){if(typeof(Effect)!="undefined"){Effect.BlindUp(c)}else{c.hide()}}}};Zikula.checkboxswitchdisplaystate=function(a,b,e){var d=$(b),c=!!$F(a);if(c==e){if(d.getStyle("display")=="none"){if(typeof(Effect)!="undefined"){Effect.BlindDown(d)}else{d.show()}}}else{if(d.getStyle("display")!="none"){if(typeof(Effect)!="undefined"){Effect.BlindUp(d)}else{d.hide()}}}};Zikula.toggleInput=function(a,c){var d=c==null?function(e){return !e}:function(e){return c},b=$(a)?$(a).select("input[type=radio],input[type=checkbox]"):$$(a);if(b){b.each(function(f){f.checked=d(f.checked)})}};Zikula.fixbuttons=function(){$$("button").invoke("observe","click",function(b){var a=b.element().up("form");if(a){a.store("buttonClicked",b.element().identify())}});$$("form").invoke("observe","submit",function(b){var a=b.element(),c=a.retrieve("buttonClicked",null);a.select("button").each(function(d){d.disabled=true;if(d.identify()==c){a.insert(new Element("input",{type:"hidden",name:d.name,value:d.attributes.getNamedItem("value")?d.attributes.getNamedItem("value").nodeValue:""}))}})})};Zikula.callInProgress=function(a){switch(a.readyState){case 1:case 2:case 3:return true;break;default:return false;break}};Ajax.Responders.register({onCreate:function(a){if($("ajax_indicator")){Element.show("ajax_indicator")}a.timeoutId=window.setTimeout(function(){if(Zikula.callInProgress(a.transport)){a.transport.isAborted=true;a.transport.abort();if($("ajax_indicator")&&$("ajax_indicator").tagName=="IMG"){$("ajax_indicator").src=Zikula.Config.baseURL+"images/icons/extrasmall/error.png"}Zikula.showajaxerror(Zikula.__("Ajax connection time out!"));if(a.options.onFailure){a.options.onFailure(a.transport,a.json)}}},(typeof(Zikula.Config.ajaxtimeout)!="undefined"&&Zikula.Config.ajaxtimeout!=0)?Zikula.Config.ajaxtimeout:5000)},onComplete:function(a){if($("ajax_indicator")){Element.hide("ajax_indicator")}window.clearTimeout(a.timeoutId)}});function pndejsonize(a){return Zikula.dejsonize(a)}function pnshowajaxerror(a){return Zikula.showajaxerror(a)}function pnsetselectoption(b,a){return Zikula.setselectoption(b,a)}function pngetcheckboxvalue(a){return Zikula.getcheckboxvalue(a)}function pnupdateauthids(a){return Zikula.updateauthids(a)}function callInProgress(a){return Zikula.callInProgress(a)}function pnrecolor(a,b){return Zikula.recolor(a,b)}function switchdisplaystate(a){return Zikula.switchdisplaystate(a)}function radioswitchdisplaystate(c,a,b){return Zikula.radioswitchdisplaystate(c,a,b)}function checkboxswitchdisplaystate(a,b,c){return Zikula.checkboxswitchdisplaystate(a,b,c)}Zikula.str_repeat=function(b,a){for(var c=[];a>0;c[--a]=b){}return c.join("")};Zikula.sprintf=function(){var g=0,k,h=arguments[g++],d=[],e,b,j,l,n="";while(h){if(e=/^[^\x25]+/.exec(h)){d.push(e[0])}else{if(e=/^\x25{2}/.exec(h)){d.push("%")}else{if(e=/^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(h)){if(((k=arguments[e[1]||g++])==null)||(k==undefined)){throw ("Too few arguments.")}if(/[^s]/.test(e[7])&&(typeof(k)!="number")){throw ("Expecting number but found "+typeof(k))}switch(e[7]){case"b":k=k.toString(2);break;case"c":k=String.fromCharCode(k);break;case"d":k=parseInt(k);break;case"e":k=e[6]?k.toExponential(e[6]):k.toExponential();break;case"f":k=e[6]?parseFloat(k).toFixed(e[6]):parseFloat(k);break;case"o":k=k.toString(8);break;case"s":k=((k=String(k))&&e[6]?k.substring(0,e[6]):k);break;case"u":k=Math.abs(k);break;case"x":k=k.toString(16);break;case"X":k=k.toString(16).toUpperCase();break}k=(/[def]/.test(e[7])&&e[2]&&k>=0?"+"+k:k);j=e[3]?e[3]=="0"?"0":e[3].charAt(1):" ";l=e[5]-String(k).length-n.length;b=e[5]?Zikula.str_repeat(j,l):"";d.push(n+(e[4]?k+b:b+k))}else{throw ("Huh ?!")}}}h=h.substring(e[0].length)}return d.join("")};Zikula.vsprintf=function(b,a){return Zikula.sprintf.apply(this,[b].concat(a))};Zikula.mergeObjects=function(a,b){a=a||{};for(var d in b){try{if(b[d].constructor==Object){a[d]=Zikula.mergeObjects(a[d],b[d])}else{a[d]=b[d]}}catch(c){a[d]=b[d]}}return a};Zikula.urlsafeJsonEncode=function(b,a){a=Object.isUndefined(a)?true:a;if(a){b=Object.toJSON(b)}b=b.replace(/\+/g,"%20");return encodeURIComponent(b)};Zikula.urlsafeJsonDecode=function(b,a){a=Object.isUndefined(a)?true:a;b=b.replace(/\+/g,"%20");b=decodeURIComponent(b);if(a){b=b.evalJSON(true)}return b};Zikula.Gettext=Class.create({pluralsPattern:/^(nplurals=\d+;\s{0,}plural=[\s\d\w\(\)\?:%><=!&\|]+)\s{0,};\s{0,}$/i,nullChar:"\u0000",initialize:function(b,a){this.defaults={lang:"en",domain:"zikula_js",pluralForms:"nplurals=2; plural=n == 1 ? 0 : 1;"};this.data={};this.setup(b,a);this.__=this.getMessage.bind(this);this.__f=this.getMessageFormatted.bind(this);this._n=this.getPluralMessage.bind(this);this._fn=this.getPluralMessageFormatted.bind(this)},setup:function(c,b,a){this.setLang(c);this.setDomain(a);this.addTranslations(b||{})},addTranslations:function(a){Zikula.mergeObjects(this.data,a)},setLang:function(a){this.lang=a||this.defaults.lang},setDomain:function(a){this.domain=a||this.defaults.domain},getData:function(b,a){b=b||this.domain;if(this.data[this.lang]&&this.data[this.lang][b]&&this.data[this.lang][b][a]){return this.data[this.lang][b][a]}return{}},getMessage:function(a,b){return this.getData(b,"translations")[a]||a},getMessageFormatted:function(a,c,b){return Zikula.vsprintf(this.getMessage(a,b),c)},getPluralMessage:function(c,a,e,f){var g=this.getPluralOffset(e,f),b=c+this.nullChar+a,d=this.getMessage(b,f);if(d){return d.split(this.nullChar)[g]}else{return b.split(this.nullChar)[g]}},getPluralMessageFormatted:function(b,a,c,e,d){return Zikula.vsprintf(this.getPluralMessage(b,a,c,d),e)},getPluralOffset:function(count,domain){var eq=null,nplurals=0,plural=0,n=count||0;try{eq=this.getData(domain,"plural-forms").match(this.pluralsPattern)[1];eval(eq)}catch(e){eq=this.defaults.pluralForms;eval(eq)}if(plural>=nplurals){plural=nplurals-1}return plural}});Zikula.GettextInstance=new Zikula.Gettext(Zikula.Config.lang,Zikula._translations);Object.extend(Zikula,{__:Zikula.GettextInstance.__,__f:Zikula.GettextInstance.__f,_n:Zikula.GettextInstance._n,_fn:Zikula.GettextInstance._fn});Zikula.CookieUtil=Class.create({initialize:function(a){this.options=Object.extend({path:Zikula.Config.baseURI,domain:"",secure:false,json:true},a||{})},set:function(c,d,a,g){try{d=this.options.json?this.encode(d):d;var b={expires:a instanceof Date?a.toGMTString():this.secondsFromNow(a),path:g?g:this.options.path,domain:this.options.domain,secure:this.options.secure?"secure":""};b=Object.keys(b).inject(c+"="+d,function(h,e){return b[e]?h+";"+e+"="+b[e]:h});document.cookie=b}catch(f){return false}return true},get:function(a,c){c=Object.isUndefined(c)?this.options.json:c;var b=document.cookie.match(a+"=(.*?)(;|$)");return b?(c?this.decode(b[1]):b[1]):null},remove:function(a){return this.set(a,"",-1)},secondsFromNow:function(b){if(!b){return null}var a=new Date();a.setTime(a.getTime()+(b*1000));return a.toGMTString()},encode:function(a){return encodeURI(encodeURI(Object.toJSON(a)))},decode:function(a){return decodeURI(decodeURI(a)).evalJSON(true)}});Zikula.Cookie=new Zikula.CookieUtil();Element.Methods.getContentWidth=function(a){return["paddingLeft","paddingRight","borderLeftWidth","borderRightWidth"].inject(Element.getWidth(a),function(b,c){return b-(parseInt(Element.getStyle(a,c),10)||0)})};Element.Methods.getContentHeight=function(a){return["paddingTop","paddingBottom","borderTopWidth","borderBottomWidth"].inject(Element.getHeight(a),function(b,c){return b-(parseInt(Element.getStyle(a,c),10)||0)})};Element.Methods.setWidth=function(a,b){return Element.setStyle(a,{width:(Object.isUndefined(b)?Element.getContentWidth(a):b)+"px"})};Element.Methods.setHeight=function(b,a){return Element.setStyle(b,{height:(Object.isUndefined(a)?Element.getContentHeight(b):a)+"px"})};Element.Methods.getOutlineSize=function(a,c){c=c?c.toLowerCase():"vertical";var b;switch(c){case"vertical":case"v":b=["borderTopWidth","borderBottomWidth","marginTop","marginBottom"];break;case"horizontal":case"h":b=["borderLeftWidth","borderRightWidth","marginLeft","marginRight"];break;default:b=[("margin-"+c).camelize(),("border-"+c+"-Width").camelize()]}return b.inject(0,function(d,e){return d+(parseInt(Element.getStyle(a,e),10)||0)})};Element.Methods.getOffsetParent=function(a){if(a.offsetParent){return $(a.offsetParent)}if(a==document.body){return $(a)}while((a=a.parentNode)&&a!=document.body&&a!=document){if(Element.getStyle(a,"position")!="static"){return $(a)}}return $(document.body)};Element.addMethods();Object.extend(String.prototype,(function(){function a(b){return(parseInt(this)||0)+(b||"px")}return{toUnits:a}})());Object.extend(Number.prototype,(function(){function a(b){return(this.valueOf()||0)+(b||"px")}return{toUnits:a}})());Zikula.define("Ajax");Zikula.Ajax.Request=Class.create(Ajax.Request,{initialize:function($super,b,a){a=this.initResponseHandlers(Zikula.Ajax.Request.defaultOptions(a));a=Object.extend({authid:null,csrfToken:null},a||{});if(a.authid||a.csrfToken){this.token={name:a.csrfToken?"csrftoken":"authid",source:a.csrfToken?a.csrfToken:a.authid};if(Object.isFunction($(this.token.source).getValue)){this.token.element=$(this.token.source)}else{this.token.element=$(this.token.source).down("input[name="+this.token.name+"]").identify()}}else{this.token=false}if(this.token){var c=a.parameters||{};this.token.value=$F(this.token.element);if(Object.isString(c)){a.parameters=c+"&"+this.token.name+"="+this.token.value}else{c[this.token.name]=this.token.value;a.parameters=c}a.onComplete=this.responseComplete.bind(this)}$super(b,a)},initResponseHandlers:function(a){a=a||{};this.observers={};for(var b in a){if(b.startsWith("on")&&Object.isFunction(a[b])){this.observers[b]=a[b];a[b]=this.responseHandler.curry(b).bind(this)}}return a},responseHandler:function(b,a,c){if(this.observers[b]){a=Object.extend(a,Zikula.Ajax.Response);this.observers[b](a,c)}},responseComplete:function(a,b){a=Object.extend(a,Zikula.Ajax.Response);if(this.token){$(this.token.element).setValue(a.getToken(this.token.name))}if(this.observers.onComplete){this.observers.onComplete(a,b)}}});Object.extend(Zikula.Ajax.Request,{defaultOptions:function(a){a=Object.extend({method:"POST"},a||{});if(Zikula.Config.sessionName){var b=Zikula.Cookie.get(Zikula.Config.sessionName,false);if(b){a.requestHeaders=Object.extend({"X-ZIKULA-AJAX-TOKEN":b},a.requestHeaders||{})}}return a}});Zikula.Ajax.Response={getAuthid:function(){return this.getToken("authid")},getToken:function(a){this.tokenName=a||"token";return this.decodeResponse().core?this.decodeResponse().core[this.tokenName]:null},getMessage:function(){return this.decodeResponse().core?this.decodeResponse().core.statusmsg:null},getData:function(){return this.decodeResponse().data},getCoreData:function(){return this.decodeResponse().core},isSuccess:function(){var a=this.getStatus();return !this.transport.isAborted&&(!a||(a>=200&&a<300)||a==304)},decodeResponse:function(){if(!this.ZikulaResponse){try{this.ZikulaResponse=this.responseText.evalJSON(true)}catch(a){this.ZikulaResponse={data:this.responseText,core:null}}}return this.ZikulaResponse}};Object.extend(Zikula.Ajax.Response,{extend:function(a){return Object.extend(a,Zikula.Ajax.Response)}});Zikula.Ajax.Queue=Class.create({initialize:function(a){this.options=Object.extend({stopOnError:true,autoExecute:false,requestOptions:{}},a||{});this.queue=[];this.inProgress=false},add:function(b,a,c){if(Object.isUndefined(c)&&typeof(a)!="object"){c=a;a={}}if(Object.isArray(b)){Array.prototype.push.apply(this.queue,b)}else{this.queue.push([b,a||{}])}if(this.options.autoExecute||c){this.start()}},clear:function(){this.stop();this.queue=[]},start:function(){if(this.inProgress){return}this.inProgress=true;this.stopped=false;this.send()},stop:function(){this.stopped=true;this.inProgress=false},send:function(){if(this.queue.size()==0||this.stopped){this.inProgress=false;if(Object.isFunction(this.options.onFinish)){this.options.onFinish(!this.stopped)}this.stopped=false;return}var a=this.getParams();new Zikula.Ajax.Request(a[0],a[1])},getParams:function(){var c=this.queue.shift(),b=Object.isArray(c)?c[0]:c,a=Object.extend(Object.isArray(c)?c[1]||{}:{},this.options.requestOptions||{});if(!Object.isUndefined(a.onComplete)){this.notify=a.onComplete}else{this.notify=null}a.onComplete=this.onComplete.bind(this);return[b,a]},onComplete:function(a,b){a=Zikula.Ajax.Response.extend(a);if(Object.isFunction(this.notify)){this.notify(a,b)}if(Object.isFunction(this.options.onComplete)){this.options.onComplete(a,b)}if(this.options.stopOnError&&!a.isSuccess()){this.stopped=true}this.send()}});