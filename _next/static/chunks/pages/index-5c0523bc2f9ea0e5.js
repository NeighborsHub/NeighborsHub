(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5728:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(8881)}])},3415:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"Image",{enumerable:!0,get:function(){return Image}});let i=n(8754),r=n(1757),o=r._(n(7294)),a=i._(n(3935)),s=i._(n(5156)),l=n(6117),u=n(1284),d=n(2377);n(5709);let c=n(2534),f=i._(n(1612)),p={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0};function h(e,t,n,i,r,o){let a=null==e?void 0:e.src;if(!e||e["data-loaded-src"]===a)return;e["data-loaded-src"]=a;let s="decode"in e?e.decode():Promise.resolve();s.catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&r(!0),null==n?void 0:n.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let i=!1,r=!1;n.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>i,isPropagationStopped:()=>r,persist:()=>{},preventDefault:()=>{i=!0,t.preventDefault()},stopPropagation:()=>{r=!0,t.stopPropagation()}})}(null==i?void 0:i.current)&&i.current(e)}})}function g(e){let[t,n]=o.version.split(".",2),i=parseInt(t,10),r=parseInt(n,10);return i>18||18===i&&r>=3?{fetchPriority:e}:{fetchpriority:e}}let m=(0,o.forwardRef)((e,t)=>{let{src:n,srcSet:i,sizes:r,height:a,width:s,decoding:l,className:u,style:d,fetchPriority:c,placeholder:f,loading:p,unoptimized:m,fill:y,onLoadRef:b,onLoadingCompleteRef:v,setBlurComplete:w,setShowAltText:x,onLoad:C,onError:S,...k}=e;return o.default.createElement("img",{...k,...g(c),loading:p,width:s,height:a,decoding:l,"data-nimg":y?"fill":"1",className:u,style:d,sizes:r,srcSet:i,src:n,ref:(0,o.useCallback)(e=>{t&&("function"==typeof t?t(e):"object"==typeof t&&(t.current=e)),e&&(S&&(e.src=e.src),e.complete&&h(e,f,b,v,w,m))},[n,f,b,v,w,S,m,t]),onLoad:e=>{let t=e.currentTarget;h(t,f,b,v,w,m)},onError:e=>{x(!0),"empty"!==f&&w(!0),S&&S(e)}})});function y(e){let{isAppRouter:t,imgAttributes:n}=e,i={as:"image",imageSrcSet:n.srcSet,imageSizes:n.sizes,crossOrigin:n.crossOrigin,referrerPolicy:n.referrerPolicy,...g(n.fetchPriority)};return t&&a.default.preload?(a.default.preload(n.src,i),null):o.default.createElement(s.default,null,o.default.createElement("link",{key:"__nimg-"+n.src+n.srcSet+n.sizes,rel:"preload",href:n.srcSet?void 0:n.src,...i}))}let Image=(0,o.forwardRef)((e,t)=>{let n=(0,o.useContext)(c.RouterContext),i=(0,o.useContext)(d.ImageConfigContext),r=(0,o.useMemo)(()=>{let e=p||i||u.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),n=e.deviceSizes.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:n}},[i]),{onLoad:a,onLoadingComplete:s}=e,h=(0,o.useRef)(a);(0,o.useEffect)(()=>{h.current=a},[a]);let g=(0,o.useRef)(s);(0,o.useEffect)(()=>{g.current=s},[s]);let[b,v]=(0,o.useState)(!1),[w,x]=(0,o.useState)(!1),{props:C,meta:S}=(0,l.getImgProps)(e,{defaultLoader:f.default,imgConf:r,blurComplete:b,showAltText:w});return o.default.createElement(o.default.Fragment,null,o.default.createElement(m,{...C,unoptimized:S.unoptimized,placeholder:S.placeholder,fill:S.fill,onLoadRef:h,onLoadingCompleteRef:g,setBlurComplete:v,setShowAltText:x,ref:t}),S.priority?o.default.createElement(y,{isAppRouter:!n,imgAttributes:C}):null)});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},6117:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getImgProps",{enumerable:!0,get:function(){return s}}),n(5709);let i=n(6460),r=n(1284);function o(e){return void 0!==e.default}function a(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function s(e,t){var n;let s,l,u,{src:d,sizes:c,unoptimized:f=!1,priority:p=!1,loading:h,className:g,quality:m,width:y,height:b,fill:v=!1,style:w,onLoad:x,onLoadingComplete:C,placeholder:S="empty",blurDataURL:k,fetchPriority:j,layout:E,objectFit:_,objectPosition:I,lazyBoundary:O,lazyRoot:P,...z}=e,{imgConf:A,showAltText:R,blurComplete:T,defaultLoader:D}=t,M=A||r.imageConfigDefault;if("allSizes"in M)s=M;else{let e=[...M.deviceSizes,...M.imageSizes].sort((e,t)=>e-t),t=M.deviceSizes.sort((e,t)=>e-t);s={...M,allSizes:e,deviceSizes:t}}let B=z.loader||D;delete z.loader,delete z.srcSet;let N="__next_img_default"in B;if(N){if("custom"===s.loader)throw Error('Image with src "'+d+'" is missing "loader" prop.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader')}else{let e=B;B=t=>{let{config:n,...i}=t;return e(i)}}if(E){"fill"===E&&(v=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[E];e&&(w={...w,...e});let t={responsive:"100vw",fill:"100vw"}[E];t&&!c&&(c=t)}let F="",L=a(y),W=a(b);if("object"==typeof(n=d)&&(o(n)||void 0!==n.src)){let e=o(d)?d.default:d;if(!e.src)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received "+JSON.stringify(e));if(!e.height||!e.width)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received "+JSON.stringify(e));if(l=e.blurWidth,u=e.blurHeight,k=k||e.blurDataURL,F=e.src,!v){if(L||W){if(L&&!W){let t=L/e.width;W=Math.round(e.height*t)}else if(!L&&W){let t=W/e.height;L=Math.round(e.width*t)}}else L=e.width,W=e.height}}let H=!p&&("lazy"===h||void 0===h);(!(d="string"==typeof d?d:F)||d.startsWith("data:")||d.startsWith("blob:"))&&(f=!0,H=!1),s.unoptimized&&(f=!0),N&&d.endsWith(".svg")&&!s.dangerouslyAllowSVG&&(f=!0),p&&(j="high");let q=a(m),G=Object.assign(v?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:_,objectPosition:I}:{},R?{}:{color:"transparent"},w),U=T||"empty"===S?null:"blur"===S?'url("data:image/svg+xml;charset=utf-8,'+(0,i.getImageBlurSvg)({widthInt:L,heightInt:W,blurWidth:l,blurHeight:u,blurDataURL:k||"",objectFit:G.objectFit})+'")':'url("'+S+'")',V=U?{backgroundSize:G.objectFit||"cover",backgroundPosition:G.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:U}:{},Y=function(e){let{config:t,src:n,unoptimized:i,width:r,quality:o,sizes:a,loader:s}=e;if(i)return{src:n,srcSet:void 0,sizes:void 0};let{widths:l,kind:u}=function(e,t,n){let{deviceSizes:i,allSizes:r}=e;if(n){let e=/(^|\s)(1?\d?\d)vw/g,t=[];for(let i;i=e.exec(n);i)t.push(parseInt(i[2]));if(t.length){let e=.01*Math.min(...t);return{widths:r.filter(t=>t>=i[0]*e),kind:"w"}}return{widths:r,kind:"w"}}if("number"!=typeof t)return{widths:i,kind:"w"};let o=[...new Set([t,2*t].map(e=>r.find(t=>t>=e)||r[r.length-1]))];return{widths:o,kind:"x"}}(t,r,a),d=l.length-1;return{sizes:a||"w"!==u?a:"100vw",srcSet:l.map((e,i)=>s({config:t,src:n,quality:o,width:e})+" "+("w"===u?e:i+1)+u).join(", "),src:s({config:t,src:n,quality:o,width:l[d]})}}({config:s,src:d,unoptimized:f,width:L,quality:q,sizes:c,loader:B}),J={...z,loading:H?"lazy":h,fetchPriority:j,width:L,height:W,decoding:"async",className:g,style:{...G,...V},sizes:Y.sizes,srcSet:Y.srcSet,src:Y.src},X={unoptimized:f,priority:p,placeholder:S,fill:v};return{props:J,meta:X}}},6460:function(e,t){"use strict";function n(e){let{widthInt:t,heightInt:n,blurWidth:i,blurHeight:r,blurDataURL:o,objectFit:a}=e,s=i?40*i:t,l=r?40*r:n,u=s&&l?"viewBox='0 0 "+s+" "+l+"'":"";return"%3Csvg xmlns='http://www.w3.org/2000/svg' "+u+"%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='"+(u?"none":"contain"===a?"xMidYMid":"cover"===a?"xMidYMid slice":"none")+"' style='filter: url(%23b);' href='"+o+"'/%3E%3C/svg%3E"}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getImageBlurSvg",{enumerable:!0,get:function(){return n}})},5994:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{unstable_getImgProps:function(){return l},default:function(){return u}});let i=n(8754),r=n(6117),o=n(5709),a=n(3415),s=i._(n(1612)),l=e=>{(0,o.warnOnce)("Warning: unstable_getImgProps() is experimental and may change or be removed at any time. Use at your own risk.");let{props:t}=(0,r.getImgProps)(e,{defaultLoader:s.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,n]of Object.entries(t))void 0===n&&delete t[e];return{props:t}},u=a.Image},1612:function(e,t){"use strict";function n(e){let{config:t,src:n,width:i,quality:r}=e;return t.path+"?url="+encodeURIComponent(n)+"&w="+i+"&q="+(r||75)}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i}}),n.__next_img_default=!0;let i=n},8881:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return a}});var i=n(5893);function r(){return(r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}).apply(this,arguments)}n(9617);var o={strings:["These are the default values...","You know what you should do?","Use your own!","Have a great day!"],stringsElement:null,typeSpeed:0,startDelay:0,backSpeed:0,smartBackspace:!0,shuffle:!1,backDelay:700,fadeOut:!1,fadeOutClass:"typed-fade-out",fadeOutDelay:500,loop:!1,loopCount:1/0,showCursor:!0,cursorChar:"|",autoInsertCss:!0,attr:null,bindInputFocusEvents:!1,contentType:"html",onBegin:function(e){},onComplete:function(e){},preStringTyped:function(e,t){},onStringTyped:function(e,t){},onLastStringBackspaced:function(e){},onTypingPaused:function(e,t){},onTypingResumed:function(e,t){},onReset:function(e){},onStop:function(e,t){},onStart:function(e,t){},onDestroy:function(e){}};new(function(){function e(){}var t=e.prototype;return t.load=function(e,t,n){if(e.el="string"==typeof n?document.querySelector(n):n,e.options=r({},o,t),e.isInput="input"===e.el.tagName.toLowerCase(),e.attr=e.options.attr,e.bindInputFocusEvents=e.options.bindInputFocusEvents,e.showCursor=!e.isInput&&e.options.showCursor,e.cursorChar=e.options.cursorChar,e.cursorBlinking=!0,e.elContent=e.attr?e.el.getAttribute(e.attr):e.el.textContent,e.contentType=e.options.contentType,e.typeSpeed=e.options.typeSpeed,e.startDelay=e.options.startDelay,e.backSpeed=e.options.backSpeed,e.smartBackspace=e.options.smartBackspace,e.backDelay=e.options.backDelay,e.fadeOut=e.options.fadeOut,e.fadeOutClass=e.options.fadeOutClass,e.fadeOutDelay=e.options.fadeOutDelay,e.isPaused=!1,e.strings=e.options.strings.map(function(e){return e.trim()}),e.stringsElement="string"==typeof e.options.stringsElement?document.querySelector(e.options.stringsElement):e.options.stringsElement,e.stringsElement){e.strings=[],e.stringsElement.style.cssText="clip: rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px;";var i=Array.prototype.slice.apply(e.stringsElement.children),a=i.length;if(a)for(var s=0;s<a;s+=1)e.strings.push(i[s].innerHTML.trim())}for(var l in e.strPos=0,e.currentElContent=this.getCurrentElContent(e),e.currentElContent&&e.currentElContent.length>0&&(e.strPos=e.currentElContent.length-1,e.strings.unshift(e.currentElContent)),e.sequence=[],e.strings)e.sequence[l]=l;e.arrayPos=0,e.stopNum=0,e.loop=e.options.loop,e.loopCount=e.options.loopCount,e.curLoop=0,e.shuffle=e.options.shuffle,e.pause={status:!1,typewrite:!0,curString:"",curStrPos:0},e.typingComplete=!1,e.autoInsertCss=e.options.autoInsertCss,e.autoInsertCss&&(this.appendCursorAnimationCss(e),this.appendFadeOutAnimationCss(e))},t.getCurrentElContent=function(e){return e.attr?e.el.getAttribute(e.attr):e.isInput?e.el.value:"html"===e.contentType?e.el.innerHTML:e.el.textContent},t.appendCursorAnimationCss=function(e){var t="data-typed-js-cursor-css";if(e.showCursor&&!document.querySelector("["+t+"]")){var n=document.createElement("style");n.setAttribute(t,"true"),n.innerHTML="\n        .typed-cursor{\n          opacity: 1;\n        }\n        .typed-cursor.typed-cursor--blink{\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        }\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; }\n        }\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; }\n          50% { opacity: 0.0; }\n          100% { opacity: 1; }\n        }\n      ",document.body.appendChild(n)}},t.appendFadeOutAnimationCss=function(e){var t="data-typed-fadeout-js-css";if(e.fadeOut&&!document.querySelector("["+t+"]")){var n=document.createElement("style");n.setAttribute(t,"true"),n.innerHTML="\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n        }\n        .typed-cursor.typed-cursor--blink.typed-fade-out{\n          -webkit-animation: 0;\n          animation: 0;\n        }\n      ",document.body.appendChild(n)}},e}()),new(function(){function e(){}var t=e.prototype;return t.typeHtmlChars=function(e,t,n){if("html"!==n.contentType)return t;var i,r=e.substring(t).charAt(0);if("<"===r||"&"===r){for(i="<"===r?">":";";e.substring(t+1).charAt(0)!==i&&!(1+ ++t>e.length););t++}return t},t.backSpaceHtmlChars=function(e,t,n){if("html"!==n.contentType)return t;var i,r=e.substring(t).charAt(0);if(">"===r||";"===r){for(i=">"===r?"<":"&";e.substring(t-1).charAt(0)!==i&&!(--t<0););t--}return t},e}()),n(5675);var a=()=>(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("div",{style:{height:"100vh",width:"100vw",display:"flex"},children:[(0,i.jsx)("div",{style:{height:"100%",width:"50%",backgroundImage:"url(".concat("/_next/static/media/photo_2023-12-02_00-45-20.cc106a52.jpg",")"),backgroundAttachment:"fixed",backgroundRepeat:"no-repeat",boxShadow:"#333333 0px 0px 40px 15px inset"}}),(0,i.jsxs)("div",{style:{height:"100%",width:"50%",justifyContent:"center",alignItems:"center",padding:"100px",boxSizing:"border-box",backgroundColor:"#bcab91",color:"black",display:"flex",flexDirection:"column"},children:[(0,i.jsx)("h1",{style:{width:"100%",fontSize:"80px",margin:"10px 0",fontWeight:"bolder",color:"#402E32",fontFamily:"Ephesis-Regular",textAlign:"center"},children:"Neighborly Bonds"}),(0,i.jsx)("h1",{style:{width:"100%",fontSize:"30px",fontWeight:"200",color:"#6d4e2c",fontFamily:"Pacifico-Regular",fontStyle:"italic",textAlign:"center"},children:"A Tale of Connection Beyond Borders"})]})]}),(0,i.jsxs)("div",{style:{height:"100vh",width:"100vw",display:"flex"},children:[(0,i.jsx)("div",{style:{height:"100%",width:"50%",justifyContent:"center",alignItems:"center",padding:"100px",boxSizing:"border-box",background:"radial-gradient( rgba(99,42,14,1) 0%, rgba(99,42,14,1) 50%, rgba(57,23,7,1) 100%)",flexDirection:"column",display:"flex",color:"#cbccce"},children:(0,i.jsx)("p",{style:{fontSize:"30px",fontWeight:"lighter",lineHeight:1.5,fontFamily:"Pacifico-Regular",fontStyle:"italic"},children:"As a newly arrived international student in Canada, I greatly believe in helping fellow immigrants and embracing the cultural diversity that defines this new chapter of my life."})}),(0,i.jsx)("div",{style:{height:"100%",width:"50%",backgroundImage:"url(".concat("/_next/static/media/_ea7c54e7-e6f7-482f-8fd7-db3c79391715.cefe76bf.jpg",")"),boxShadow:"#333333 0px 0px 40px 15px inset",backgroundAttachment:"fixed",backgroundRepeat:"no-repeat",backgroundPosition:"100% 0"}})]}),(0,i.jsxs)("div",{style:{height:"100vh",width:"100vw",display:"flex"},children:[(0,i.jsx)("div",{style:{height:"100%",width:"50%",backgroundImage:"url(".concat("/_next/static/media/_b1cff5a2-7aa1-4143-b764-f4382980831e.310fb488.jpg",")"),boxShadow:"#061123 0px 0px 40px 15px inset",backgroundAttachment:"fixed",backgroundRepeat:"no-repeat"}}),(0,i.jsx)("div",{style:{height:"100%",width:"50%",justifyContent:"center",alignItems:"center",padding:"100px",boxSizing:"border-box",backgroundColor:"#061123",color:"white",flexDirection:"column",display:"flex"},children:(0,i.jsx)("p",{style:{fontSize:"30px",fontWeight:"lighter",lineHeight:1.5},children:"One chilly evening in early October, while video calling my family, the emptiness of the silent streets around 9 PM left me feeling isolated and solely surrounded by the melancholy of distance from loved ones and homeland. Lost in thoughts, I was abruptly interrupted by a neighbor from house number 1957, urgently alerting me of a bear sighting just a short distance away. Still in shock, I quickly ended the call to prevent worrying my family and rushed to the lady, asking for guidance as a newcomer unfamiliar with such wildlife situations. With immense kindness, she and her friend came to my aid. Alone and 10,540 kilometers away from anyone familiar, they comforted me, constantly assuring me to remain calm. Together, we swiftly navigated through a different route and they led me safely to my home."})})]}),(0,i.jsxs)("div",{style:{height:"100vh",width:"100vw",display:"flex"},children:[(0,i.jsx)("div",{style:{height:"100%",width:"50%",justifyContent:"center",alignItems:"center",padding:"100px",boxSizing:"border-box",backgroundColor:"white",color:"black",flexDirection:"column",display:"flex"},children:(0,i.jsx)("p",{style:{fontSize:"30px",fontWeight:"lighter",lineHeight:1.5},children:"It was in that moment when I realized that a neighbor can sometimes be closer than family. In the following days, I encountered the lady, and gratefully kissed her hand. Every time I pass by house number 1957, a feeling resonates within me, telling me that this woman, much like a mother, is honored for saving you. Each time I see her, I respectfully tip my hat, offering a dignified and humble greeting. She taught me that in a world of freedom, we must all support one another. I understood that the culture of camaraderie and neighborliness surpasses borders and nations, marking a truly human experience. After this real-life incident, I revisited an idea that had long lingered in my mind—an application I had set aside due to migration concerns. This experience fueled my determination to revive the project. And our motto became clear: A Neighbor May be Closer Than Family."})}),(0,i.jsx)("div",{style:{height:"100%",width:"50%",backgroundImage:"url(".concat("/_next/static/media/photo_2023-12-02_00-01-55.f8b99554.jpg",")")}})]})]})},9617:function(){},5675:function(e,t,n){n(5994)}},function(e){e.O(0,[774,888,179],function(){return e(e.s=5728)}),_N_E=e.O()}]);