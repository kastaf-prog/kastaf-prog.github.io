/*!* fullPage 2.9.6
* https://github.com/alvarotrigo/fullPage.js
* @license MIT licensed
*
* Copyright (C) 2015 alvarotrigo.com - A project by Alvaro Trigo*/(function(global,factory){'use strict';if(typeof define==='function'&&define.amd){define(['jquery'],function($){return factory($,global,global.document,global.Math);});}else if(typeof exports==="object"&&exports){module.exports=factory(require('jquery'),global,global.document,global.Math);}else{factory(jQuery,global,global.document,global.Math);}})(typeof window!=='undefined'?window:this,function($,window,document,Math,undefined){'use strict';var WRAPPER='fullpage-wrapper';var WRAPPER_SEL='.'+WRAPPER;var SCROLLABLE='fp-scrollable';var SCROLLABLE_SEL='.'+SCROLLABLE;var RESPONSIVE='fp-responsive';var NO_TRANSITION='fp-notransition';var DESTROYED='fp-destroyed';var ENABLED='fp-enabled';var VIEWING_PREFIX='fp-viewing';var ACTIVE='active';var ACTIVE_SEL='.'+ACTIVE;var COMPLETELY='fp-completely';var COMPLETELY_SEL='.'+COMPLETELY;var SECTION_DEFAULT_SEL='.section';var SECTION='fp-section';var SECTION_SEL='.'+SECTION;var SECTION_ACTIVE_SEL=SECTION_SEL+ACTIVE_SEL;var SECTION_FIRST_SEL=SECTION_SEL+':first';var SECTION_LAST_SEL=SECTION_SEL+':last';var TABLE_CELL='fp-tableCell';var TABLE_CELL_SEL='.'+TABLE_CELL;var AUTO_HEIGHT='fp-auto-height';var AUTO_HEIGHT_SEL='.fp-auto-height';var NORMAL_SCROLL='fp-normal-scroll';var NORMAL_SCROLL_SEL='.fp-normal-scroll';var SECTION_NAV='fp-nav';var SECTION_NAV_SEL='#'+SECTION_NAV;var SECTION_NAV_TOOLTIP='fp-tooltip';var SECTION_NAV_TOOLTIP_SEL='.'+SECTION_NAV_TOOLTIP;var SHOW_ACTIVE_TOOLTIP='fp-show-active';var SLIDE_DEFAULT_SEL='.slide';var SLIDE='fp-slide';var SLIDE_SEL='.'+SLIDE;var SLIDE_ACTIVE_SEL=SLIDE_SEL+ACTIVE_SEL;var SLIDES_WRAPPER='fp-slides';var SLIDES_WRAPPER_SEL='.'+SLIDES_WRAPPER;var SLIDES_CONTAINER='fp-slidesContainer';var SLIDES_CONTAINER_SEL='.'+SLIDES_CONTAINER;var TABLE='fp-table';var SLIDES_NAV='fp-slidesNav';var SLIDES_NAV_SEL='.'+SLIDES_NAV;var SLIDES_NAV_LINK_SEL=SLIDES_NAV_SEL+' a';var SLIDES_ARROW='fp-controlArrow';var SLIDES_ARROW_SEL='.'+SLIDES_ARROW;var SLIDES_PREV='fp-prev';var SLIDES_PREV_SEL='.'+SLIDES_PREV;var SLIDES_ARROW_PREV=SLIDES_ARROW+' '+SLIDES_PREV;var SLIDES_ARROW_PREV_SEL=SLIDES_ARROW_SEL+SLIDES_PREV_SEL;var SLIDES_NEXT='fp-next';var SLIDES_NEXT_SEL='.'+SLIDES_NEXT;var SLIDES_ARROW_NEXT=SLIDES_ARROW+' '+SLIDES_NEXT;var SLIDES_ARROW_NEXT_SEL=SLIDES_ARROW_SEL+SLIDES_NEXT_SEL;var $window=$(window);var $document=$(document);$.fn.fullpage=function(options){if($('html').hasClass(ENABLED)){displayWarnings();return;}
var $htmlBody=$('html, body');var $body=$('body');var FP=$.fn.fullpage;options=$.extend({menu:false,anchors:[],lockAnchors:false,navigation:false,navigationPosition:'right',navigationTooltips:[],showActiveTooltip:false,slidesNavigation:false,slidesNavPosition:'bottom',scrollBar:false,hybrid:false,css3:true,scrollingSpeed:700,autoScrolling:true,fitToSection:true,fitToSectionDelay:1000,easing:'easeInOutCubic',easingcss3:'ease',loopBottom:false,loopTop:false,loopHorizontal:true,continuousVertical:false,continuousHorizontal:false,scrollHorizontally:false,interlockedSlides:false,dragAndMove:false,offsetSections:false,resetSliders:false,fadingEffect:false,normalScrollElements:null,scrollOverflow:false,scrollOverflowReset:false,scrollOverflowHandler:$.fn.fp_scrolloverflow?$.fn.fp_scrolloverflow.iscrollHandler:null,scrollOverflowOptions:null,touchSensitivity:5,normalScrollElementTouchThreshold:5,bigSectionsDestination:null,keyboardScrolling:true,animateAnchor:true,recordHistory:true,controlArrows:true,controlArrowColor:'#fff',verticalCentered:true,sectionsColor:[],paddingTop:0,paddingBottom:0,fixedElements:null,responsive:0,responsiveWidth:0,responsiveHeight:0,responsiveSlides:false,parallax:false,parallaxOptions:{type:'reveal',percentage:62,property:'translate'},sectionSelector:SECTION_DEFAULT_SEL,slideSelector:SLIDE_DEFAULT_SEL,afterLoad:null,onLeave:null,afterRender:null,afterResize:null,afterReBuild:null,afterSlideLoad:null,onSlideLeave:null,afterResponsive:null,lazyLoading:true},options);var slideMoving=false;var isTouchDevice=navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);var isTouch=(('ontouchstart'in window)||(navigator.msMaxTouchPoints>0)||(navigator.maxTouchPoints));var container=$(this);var windowsHeight=$window.height();var isResizing=false;var isWindowFocused=true;var lastScrolledDestiny;var lastScrolledSlide;var canScroll=true;var scrollings=[];var controlPressed;var startingSection;var isScrollAllowed={};isScrollAllowed.m={'up':true,'down':true,'left':true,'right':true};isScrollAllowed.k=$.extend(true,{},isScrollAllowed.m);var MSPointer=getMSPointer();var events={touchmove:'ontouchmove'in window?'touchmove':MSPointer.move,touchstart:'ontouchstart'in window?'touchstart':MSPointer.down};var scrollBarHandler;var focusableElementsString='a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';var resizeId;var afterSectionLoadsId;var afterSlideLoadsId;var scrollId;var scrollId2;var keydownId;var originals=$.extend(true,{},options);displayWarnings();$.extend($.easing,{easeInOutCubic:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;}});function setAutoScrolling(value,type){if(!value){silentScroll(0);}
setVariableState('autoScrolling',value,type);var element=$(SECTION_ACTIVE_SEL);if(options.autoScrolling&&!options.scrollBar){$htmlBody.css({'overflow':'hidden','height':'100%'});setRecordHistory(originals.recordHistory,'internal');container.css({'-ms-touch-action':'none','touch-action':'none'});if(element.length){silentScroll(element.position().top);}}else{$htmlBody.css({'overflow':'visible','height':'initial'});setRecordHistory(false,'internal');container.css({'-ms-touch-action':'','touch-action':''});if(element.length){$htmlBody.scrollTop(element.position().top);}}}
function setRecordHistory(value,type){setVariableState('recordHistory',value,type);}
function setScrollingSpeed(value,type){setVariableState('scrollingSpeed',value,type);}
function setFitToSection(value,type){setVariableState('fitToSection',value,type);}
function setLockAnchors(value){options.lockAnchors=value;}
function setMouseWheelScrolling(value){if(value){addMouseWheelHandler();addMiddleWheelHandler();}else{removeMouseWheelHandler();removeMiddleWheelHandler();}}
function setAllowScrolling(value,directions){if(typeof directions!=='undefined'){directions=directions.replace(/ /g,'').split(',');$.each(directions,function(index,direction){setIsScrollAllowed(value,direction,'m');});}
else{setIsScrollAllowed(value,'all','m');if(value){setMouseWheelScrolling(true);addTouchHandler();}else{setMouseWheelScrolling(false);removeTouchHandler();}}}
function setKeyboardScrolling(value,directions){if(typeof directions!=='undefined'){directions=directions.replace(/ /g,'').split(',');$.each(directions,function(index,direction){setIsScrollAllowed(value,direction,'k');});}else{setIsScrollAllowed(value,'all','k');options.keyboardScrolling=value;}}
function moveSectionUp(){var prev=$(SECTION_ACTIVE_SEL).prev(SECTION_SEL);if(!prev.length&&(options.loopTop||options.continuousVertical)){prev=$(SECTION_SEL).last();}
if(prev.length){scrollPage(prev,null,true);}}
function moveSectionDown(){var next=$(SECTION_ACTIVE_SEL).next(SECTION_SEL);if(!next.length&&(options.loopBottom||options.continuousVertical)){next=$(SECTION_SEL).first();}
if(next.length){scrollPage(next,null,false);}}
function silentMoveTo(sectionAnchor,slideAnchor){setScrollingSpeed(0,'internal');moveTo(sectionAnchor,slideAnchor);setScrollingSpeed(originals.scrollingSpeed,'internal');}
function moveTo(sectionAnchor,slideAnchor){var destiny=getSectionByAnchor(sectionAnchor);if(typeof slideAnchor!=='undefined'){scrollPageAndSlide(sectionAnchor,slideAnchor);}else if(destiny.length>0){scrollPage(destiny);}}
function moveSlideRight(section){moveSlide('right',section);}
function moveSlideLeft(section){moveSlide('left',section);}
function reBuild(resizing){if(container.hasClass(DESTROYED)){return;}
isResizing=true;windowsHeight=$window.height();$(SECTION_SEL).each(function(){var slidesWrap=$(this).find(SLIDES_WRAPPER_SEL);var slides=$(this).find(SLIDE_SEL);if(options.verticalCentered){$(this).find(TABLE_CELL_SEL).css('height',getTableHeight($(this))+'px');}
$(this).css('height',windowsHeight+'px');if(slides.length>1){landscapeScroll(slidesWrap,slidesWrap.find(SLIDE_ACTIVE_SEL));}});if(options.scrollOverflow){scrollBarHandler.createScrollBarForAll();}
var activeSection=$(SECTION_ACTIVE_SEL);var sectionIndex=activeSection.index(SECTION_SEL);if(sectionIndex){silentMoveTo(sectionIndex+1);}
isResizing=false;$.isFunction(options.afterResize)&&resizing&&options.afterResize.call(container);$.isFunction(options.afterReBuild)&&!resizing&&options.afterReBuild.call(container);}
function setResponsive(active){var isResponsive=$body.hasClass(RESPONSIVE);if(active){if(!isResponsive){setAutoScrolling(false,'internal');setFitToSection(false,'internal');$(SECTION_NAV_SEL).hide();$body.addClass(RESPONSIVE);$.isFunction(options.afterResponsive)&&options.afterResponsive.call(container,active);}}
else if(isResponsive){setAutoScrolling(originals.autoScrolling,'internal');setFitToSection(originals.autoScrolling,'internal');$(SECTION_NAV_SEL).show();$body.removeClass(RESPONSIVE);$.isFunction(options.afterResponsive)&&options.afterResponsive.call(container,active);}}
if($(this).length){FP.version='2.9.5';FP.setAutoScrolling=setAutoScrolling;FP.setRecordHistory=setRecordHistory;FP.setScrollingSpeed=setScrollingSpeed;FP.setFitToSection=setFitToSection;FP.setLockAnchors=setLockAnchors;FP.setMouseWheelScrolling=setMouseWheelScrolling;FP.setAllowScrolling=setAllowScrolling;FP.setKeyboardScrolling=setKeyboardScrolling;FP.moveSectionUp=moveSectionUp;FP.moveSectionDown=moveSectionDown;FP.silentMoveTo=silentMoveTo;FP.moveTo=moveTo;FP.moveSlideRight=moveSlideRight;FP.moveSlideLeft=moveSlideLeft;FP.fitToSection=fitToSection;FP.reBuild=reBuild;FP.setResponsive=setResponsive;FP.destroy=destroy;FP.shared={afterRenderActions:afterRenderActions};init();bindEvents();}
function init(){if(options.css3){options.css3=support3d();}
options.scrollBar=options.scrollBar||options.hybrid;setOptionsFromDOM();prepareDom();setAllowScrolling(true);setAutoScrolling(options.autoScrolling,'internal');responsive();setBodyClass();if(document.readyState==='complete'){scrollToAnchor();}
$window.on('load',scrollToAnchor);}
function bindEvents(){$window.on('scroll',scrollHandler).on('hashchange',hashChangeHandler).blur(blurHandler).resize(resizeHandler);$document.keydown(keydownHandler).keyup(keyUpHandler).on('click touchstart',SECTION_NAV_SEL+' a',sectionBulletHandler).on('click touchstart',SLIDES_NAV_LINK_SEL,slideBulletHandler).on('click',SECTION_NAV_TOOLTIP_SEL,tooltipTextHandler);$(SECTION_SEL).on('click touchstart',SLIDES_ARROW_SEL,slideArrowHandler);if(options.normalScrollElements){$document.on('mouseenter touchstart',options.normalScrollElements,function(){setAllowScrolling(false);});$document.on('mouseleave touchend',options.normalScrollElements,function(){setAllowScrolling(true);});}}
function setOptionsFromDOM(){var sections=container.find(options.sectionSelector);if(!options.anchors.length){options.anchors=sections.filter('[data-anchor]').map(function(){return $(this).data('anchor').toString();}).get();}
if(!options.navigationTooltips.length){options.navigationTooltips=sections.filter('[data-tooltip]').map(function(){return $(this).data('tooltip').toString();}).get();}}
function prepareDom(){container.css({'height':'100%','position':'relative'});container.addClass(WRAPPER);$('html').addClass(ENABLED);windowsHeight=$window.height();container.removeClass(DESTROYED);addInternalSelectors();$(SECTION_SEL).each(function(index){var section=$(this);var slides=section.find(SLIDE_SEL);var numSlides=slides.length;section.data('fp-styles',section.attr('style'));styleSection(section,index);styleMenu(section,index);if(numSlides>0){styleSlides(section,slides,numSlides);}else{if(options.verticalCentered){addTableClass(section);}}});if(options.fixedElements&&options.css3){$(options.fixedElements).appendTo($body);}
if(options.navigation){addVerticalNavigation();}
enableYoutubeAPI();if(options.scrollOverflow){scrollBarHandler=options.scrollOverflowHandler.init(options);}else{afterRenderActions();}}
function styleSlides(section,slides,numSlides){var sliderWidth=numSlides*100;var slideWidth=100/numSlides;slides.wrapAll('<div class="'+SLIDES_CONTAINER+'" />');slides.parent().wrap('<div class="'+SLIDES_WRAPPER+'" />');section.find(SLIDES_CONTAINER_SEL).css('width',sliderWidth+'%');if(numSlides>1){if(options.controlArrows){createSlideArrows(section);}
if(options.slidesNavigation){addSlidesNavigation(section,numSlides);}}
slides.each(function(index){$(this).css('width',slideWidth+'%');if(options.verticalCentered){addTableClass($(this));}});var startingSlide=section.find(SLIDE_ACTIVE_SEL);if(startingSlide.length&&($(SECTION_ACTIVE_SEL).index(SECTION_SEL)!==0||($(SECTION_ACTIVE_SEL).index(SECTION_SEL)===0&&startingSlide.index()!==0))){silentLandscapeScroll(startingSlide,'internal');}else{slides.eq(0).addClass(ACTIVE);}}
function styleSection(section,index){if(!index&&$(SECTION_ACTIVE_SEL).length===0){section.addClass(ACTIVE);}
startingSection=$(SECTION_ACTIVE_SEL);section.css('height',windowsHeight+'px');if(options.paddingTop){section.css('padding-top',options.paddingTop);}
if(options.paddingBottom){section.css('padding-bottom',options.paddingBottom);}
if(typeof options.sectionsColor[index]!=='undefined'){section.css('background-color',options.sectionsColor[index]);}
if(typeof options.anchors[index]!=='undefined'){section.attr('data-anchor',options.anchors[index]);}}
function styleMenu(section,index){if(typeof options.anchors[index]!=='undefined'){if(section.hasClass(ACTIVE)){activateMenuAndNav(options.anchors[index],index);}}
if(options.menu&&options.css3&&$(options.menu).closest(WRAPPER_SEL).length){$(options.menu).appendTo($body);}}
function addInternalSelectors(){container.find(options.sectionSelector).addClass(SECTION);container.find(options.slideSelector).addClass(SLIDE);}
function createSlideArrows(section){section.find(SLIDES_WRAPPER_SEL).after('<div class="'+SLIDES_ARROW_PREV+'"></div><div class="'+SLIDES_ARROW_NEXT+'"></div>');if(options.controlArrowColor!='#fff'){section.find(SLIDES_ARROW_NEXT_SEL).css('border-color','transparent transparent transparent '+options.controlArrowColor);section.find(SLIDES_ARROW_PREV_SEL).css('border-color','transparent '+options.controlArrowColor+' transparent transparent');}
if(!options.loopHorizontal){section.find(SLIDES_ARROW_PREV_SEL).hide();}}
function addVerticalNavigation(){$body.append('<div id="'+SECTION_NAV+'"><ul></ul></div>');var nav=$(SECTION_NAV_SEL);nav.addClass(function(){return options.showActiveTooltip?SHOW_ACTIVE_TOOLTIP+' '+options.navigationPosition:options.navigationPosition;});for(var i=0;i<$(SECTION_SEL).length;i++){var link='';if(options.anchors.length){link=options.anchors[i];}
var li='<li><a href="#'+link+'"><span></span></a>';var tooltip=options.navigationTooltips[i];if(typeof tooltip!=='undefined'&&tooltip!==''){li+='<div class="'+SECTION_NAV_TOOLTIP+' '+options.navigationPosition+'">'+tooltip+'</div>';}
li+='</li>';nav.find('ul').append(li);}
$(SECTION_NAV_SEL).find('li').eq($(SECTION_ACTIVE_SEL).index(SECTION_SEL)).find('a').addClass(ACTIVE);}
function enableYoutubeAPI(){container.find('iframe[src*="youtube.com/embed/"]').each(function(){addURLParam($(this),'enablejsapi=1');});}
function addURLParam(element,newParam){var originalSrc=element.attr('src');element.attr('src',originalSrc+getUrlParamSign(originalSrc)+newParam);}
function getUrlParamSign(url){return(!/\?/.test(url))?'?':'&';}
function afterRenderActions(){var section=$(SECTION_ACTIVE_SEL);section.addClass(COMPLETELY);lazyLoad(section);playMedia(section);if(options.scrollOverflow){options.scrollOverflowHandler.afterLoad();}
if(isDestinyTheStartingSection()){$.isFunction(options.afterLoad)&&options.afterLoad.call(section,section.data('anchor'),(section.index(SECTION_SEL)+1));}
$.isFunction(options.afterRender)&&options.afterRender.call(container);}
function isDestinyTheStartingSection(){var destinationSection=getSectionByAnchor(getAnchorsURL().section);return!destinationSection||destinationSection.length&&destinationSection.index()===startingSection.index();}
var isScrolling=false;var lastScroll=0;function scrollHandler(){var currentSection;if(!options.autoScrolling||options.scrollBar){var currentScroll=$window.scrollTop();var scrollDirection=getScrollDirection(currentScroll);var visibleSectionIndex=0;var screen_mid=currentScroll+($window.height()/2.0);var isAtBottom=$body.height()-$window.height()===currentScroll;var sections=document.querySelectorAll(SECTION_SEL);if(isAtBottom){visibleSectionIndex=sections.length-1;}
else if(!currentScroll){visibleSectionIndex=0;}
else{for(var i=0;i<sections.length;++i){var section=sections[i];if(section.offsetTop<=screen_mid)
{visibleSectionIndex=i;}}}
if(isCompletelyInViewPort(scrollDirection)){if(!$(SECTION_ACTIVE_SEL).hasClass(COMPLETELY)){$(SECTION_ACTIVE_SEL).addClass(COMPLETELY).siblings().removeClass(COMPLETELY);}}
currentSection=$(sections).eq(visibleSectionIndex);if(!currentSection.hasClass(ACTIVE)){isScrolling=true;var leavingSection=$(SECTION_ACTIVE_SEL);var leavingSectionIndex=leavingSection.index(SECTION_SEL)+1;var yMovement=getYmovement(currentSection);var anchorLink=currentSection.data('anchor');var sectionIndex=currentSection.index(SECTION_SEL)+1;var activeSlide=currentSection.find(SLIDE_ACTIVE_SEL);var slideIndex;var slideAnchorLink;if(activeSlide.length){slideAnchorLink=activeSlide.data('anchor');slideIndex=activeSlide.index();}
if(canScroll){currentSection.addClass(ACTIVE).siblings().removeClass(ACTIVE);$.isFunction(options.onLeave)&&options.onLeave.call(leavingSection,leavingSectionIndex,sectionIndex,yMovement);$.isFunction(options.afterLoad)&&options.afterLoad.call(currentSection,anchorLink,sectionIndex);stopMedia(leavingSection);lazyLoad(currentSection);playMedia(currentSection);activateMenuAndNav(anchorLink,sectionIndex-1);if(options.anchors.length){lastScrolledDestiny=anchorLink;}
setState(slideIndex,slideAnchorLink,anchorLink,sectionIndex);}
clearTimeout(scrollId);scrollId=setTimeout(function(){isScrolling=false;},100);}
if(options.fitToSection){clearTimeout(scrollId2);scrollId2=setTimeout(function(){if(options.fitToSection&&$(SECTION_ACTIVE_SEL).outerHeight()<=windowsHeight){fitToSection();}},options.fitToSectionDelay);}}}
function fitToSection(){if(canScroll){isResizing=true;scrollPage($(SECTION_ACTIVE_SEL));isResizing=false;}}
function isCompletelyInViewPort(movement){var top=$(SECTION_ACTIVE_SEL).position().top;var bottom=top+$window.height();if(movement=='up'){return bottom>=($window.scrollTop()+$window.height());}
return top<=$window.scrollTop();}
function getScrollDirection(currentScroll){var direction=currentScroll>lastScroll?'down':'up';lastScroll=currentScroll;previousDestTop=currentScroll;return direction;}
function scrolling(type){if(!isScrollAllowed.m[type]){return;}
var scrollSection=(type==='down')?moveSectionDown:moveSectionUp;if(options.scrollOverflow){var scrollable=options.scrollOverflowHandler.scrollable($(SECTION_ACTIVE_SEL));var check=(type==='down')?'bottom':'top';if(scrollable.length>0){if(options.scrollOverflowHandler.isScrolled(check,scrollable)){scrollSection();}else{return true;}}else{scrollSection();}}else{scrollSection();}}
function preventBouncing(event){var e=event.originalEvent;if(options.autoScrolling&&isReallyTouch(e)){event.preventDefault();}}
var touchStartY=0;var touchStartX=0;var touchEndY=0;var touchEndX=0;function touchMoveHandler(event){var e=event.originalEvent;var activeSection=$(e.target).closest(SECTION_SEL);if(isReallyTouch(e)){if(options.autoScrolling){event.preventDefault();}
var touchEvents=getEventsPage(e);touchEndY=touchEvents.y;touchEndX=touchEvents.x;if(activeSection.find(SLIDES_WRAPPER_SEL).length&&Math.abs(touchStartX-touchEndX)>(Math.abs(touchStartY-touchEndY))){if(!slideMoving&&Math.abs(touchStartX-touchEndX)>($window.outerWidth()/100*options.touchSensitivity)){if(touchStartX>touchEndX){if(isScrollAllowed.m.right){moveSlideRight(activeSection);}}else{if(isScrollAllowed.m.left){moveSlideLeft(activeSection);}}}}
else if(options.autoScrolling&&canScroll){if(Math.abs(touchStartY-touchEndY)>($window.height()/100*options.touchSensitivity)){if(touchStartY>touchEndY){scrolling('down');}else if(touchEndY>touchStartY){scrolling('up');}}}}}
function isReallyTouch(e){return typeof e.pointerType==='undefined'||e.pointerType!='mouse';}
function touchStartHandler(event){var e=event.originalEvent;if(options.fitToSection){$htmlBody.stop();}
if(isReallyTouch(e)){var touchEvents=getEventsPage(e);touchStartY=touchEvents.y;touchStartX=touchEvents.x;}}
function getAverage(elements,number){var sum=0;var lastElements=elements.slice(Math.max(elements.length-number,1));for(var i=0;i<lastElements.length;i++){sum=sum+lastElements[i];}
return Math.ceil(sum/number);}
var prevTime=new Date().getTime();function MouseWheelHandler(e){var curTime=new Date().getTime();var isNormalScroll=$(COMPLETELY_SEL).hasClass(NORMAL_SCROLL);if(options.autoScrolling&&!controlPressed&&!isNormalScroll){e=e||window.event;var value=e.wheelDelta||-e.deltaY||-e.detail;var delta=Math.max(-1,Math.min(1,value));var horizontalDetection=typeof e.wheelDeltaX!=='undefined'||typeof e.deltaX!=='undefined';var isScrollingVertically=(Math.abs(e.wheelDeltaX)<Math.abs(e.wheelDelta))||(Math.abs(e.deltaX)<Math.abs(e.deltaY)||!horizontalDetection);if(scrollings.length>149){scrollings.shift();}
scrollings.push(Math.abs(value));if(options.scrollBar){e.preventDefault?e.preventDefault():e.returnValue=false;}
var timeDiff=curTime-prevTime;prevTime=curTime;if(timeDiff>200){scrollings=[];}
if(canScroll){var averageEnd=getAverage(scrollings,10);var averageMiddle=getAverage(scrollings,70);var isAccelerating=averageEnd>=averageMiddle;if(isAccelerating&&isScrollingVertically){if(delta<0){scrolling('down');}else{scrolling('up');}}}
return false;}
if(options.fitToSection){$htmlBody.stop();}}
function moveSlide(direction,section){var activeSection=typeof section==='undefined'?$(SECTION_ACTIVE_SEL):section;var slides=activeSection.find(SLIDES_WRAPPER_SEL);var numSlides=slides.find(SLIDE_SEL).length;if(!slides.length||slideMoving||numSlides<2){return;}
var currentSlide=slides.find(SLIDE_ACTIVE_SEL);var destiny=null;if(direction==='left'){destiny=currentSlide.prev(SLIDE_SEL);}else{destiny=currentSlide.next(SLIDE_SEL);}
if(!destiny.length){if(!options.loopHorizontal)return;if(direction==='left'){destiny=currentSlide.siblings(':last');}else{destiny=currentSlide.siblings(':first');}}
slideMoving=true;landscapeScroll(slides,destiny,direction);}
function keepSlidesPosition(){$(SLIDE_ACTIVE_SEL).each(function(){silentLandscapeScroll($(this),'internal');});}
var previousDestTop=0;function getDestinationPosition(element){var elemPosition=element.position();var position=elemPosition.top;var isScrollingDown=elemPosition.top>previousDestTop;var sectionBottom=position-windowsHeight+element.outerHeight();var bigSectionsDestination=options.bigSectionsDestination;if(element.outerHeight()>windowsHeight){if(!isScrollingDown&&!bigSectionsDestination||bigSectionsDestination==='bottom'){position=sectionBottom;}}
else if(isScrollingDown||(isResizing&&element.is(':last-child'))){position=sectionBottom;}
previousDestTop=position;return position;}
function scrollPage(element,callback,isMovementUp){if(typeof element==='undefined'){return;}
var dtop=getDestinationPosition(element);var slideAnchorLink;var slideIndex;var v={element:element,callback:callback,isMovementUp:isMovementUp,dtop:dtop,yMovement:getYmovement(element),anchorLink:element.data('anchor'),sectionIndex:element.index(SECTION_SEL),activeSlide:element.find(SLIDE_ACTIVE_SEL),activeSection:$(SECTION_ACTIVE_SEL),leavingSection:$(SECTION_ACTIVE_SEL).index(SECTION_SEL)+1,localIsResizing:isResizing};if((v.activeSection.is(element)&&!isResizing)||(options.scrollBar&&$window.scrollTop()===v.dtop&&!element.hasClass(AUTO_HEIGHT))){return;}
if(v.activeSlide.length){slideAnchorLink=v.activeSlide.data('anchor');slideIndex=v.activeSlide.index();}
if($.isFunction(options.onLeave)&&!v.localIsResizing){if(options.onLeave.call(v.activeSection,v.leavingSection,(v.sectionIndex+1),v.yMovement)===false){return;}}
if(options.autoScrolling&&options.continuousVertical&&typeof(v.isMovementUp)!=="undefined"&&((!v.isMovementUp&&v.yMovement=='up')||(v.isMovementUp&&v.yMovement=='down'))){v=createInfiniteSections(v);}
if(!v.localIsResizing){stopMedia(v.activeSection);}
if(options.scrollOverflow){options.scrollOverflowHandler.beforeLeave();}
element.addClass(ACTIVE).siblings().removeClass(ACTIVE);lazyLoad(element);if(options.scrollOverflow){options.scrollOverflowHandler.onLeave();}
canScroll=false;setState(slideIndex,slideAnchorLink,v.anchorLink,v.sectionIndex);performMovement(v);lastScrolledDestiny=v.anchorLink;activateMenuAndNav(v.anchorLink,v.sectionIndex);}
function performMovement(v){if(options.css3&&options.autoScrolling&&!options.scrollBar){var translate3d='translate3d(0px, -'+Math.round(v.dtop)+'px, 0px)';transformContainer(translate3d,true);if(options.scrollingSpeed){clearTimeout(afterSectionLoadsId);afterSectionLoadsId=setTimeout(function(){afterSectionLoads(v);},options.scrollingSpeed);}else{afterSectionLoads(v);}}
else{var scrollSettings=getScrollSettings(v);$(scrollSettings.element).animate(scrollSettings.options,options.scrollingSpeed,options.easing).promise().done(function(){if(options.scrollBar){setTimeout(function(){afterSectionLoads(v);},30);}else{afterSectionLoads(v);}});}}
function getScrollSettings(v){var scroll={};if(options.autoScrolling&&!options.scrollBar){scroll.options={'top':-v.dtop};scroll.element=WRAPPER_SEL;}else{scroll.options={'scrollTop':v.dtop};scroll.element='html, body';}
return scroll;}
function createInfiniteSections(v){if(!v.isMovementUp){$(SECTION_ACTIVE_SEL).after(v.activeSection.prevAll(SECTION_SEL).get().reverse());}
else{$(SECTION_ACTIVE_SEL).before(v.activeSection.nextAll(SECTION_SEL));}
silentScroll($(SECTION_ACTIVE_SEL).position().top);keepSlidesPosition();v.wrapAroundElements=v.activeSection;v.dtop=v.element.position().top;v.yMovement=getYmovement(v.element);v.leavingSection=v.activeSection.index(SECTION_SEL)+1;v.sectionIndex=v.element.index(SECTION_SEL);return v;}
function continuousVerticalFixSectionOrder(v){if(!v.wrapAroundElements||!v.wrapAroundElements.length){return;}
if(v.isMovementUp){$(SECTION_FIRST_SEL).before(v.wrapAroundElements);}
else{$(SECTION_LAST_SEL).after(v.wrapAroundElements);}
silentScroll($(SECTION_ACTIVE_SEL).position().top);keepSlidesPosition();}
function afterSectionLoads(v){continuousVerticalFixSectionOrder(v);$.isFunction(options.afterLoad)&&!v.localIsResizing&&options.afterLoad.call(v.element,v.anchorLink,(v.sectionIndex+1));if(options.scrollOverflow){options.scrollOverflowHandler.afterLoad();}
if(!v.localIsResizing){playMedia(v.element);}
v.element.addClass(COMPLETELY).siblings().removeClass(COMPLETELY);canScroll=true;$.isFunction(v.callback)&&v.callback.call(this);}
function setSrc(element,attribute){element.attr(attribute,element.data(attribute)).removeAttr('data-'+attribute);}
function lazyLoad(destiny){if(!options.lazyLoading){return;}
var panel=getSlideOrSection(destiny);var element;panel.find('img[data-src], img[data-srcset], source[data-src], source[data-srcset], video[data-src], audio[data-src], iframe[data-src]').each(function(){element=$(this);$.each(['src','srcset'],function(index,type){var attribute=element.attr('data-'+type);if(typeof attribute!=='undefined'&&attribute){setSrc(element,type);}});if(element.is('source')){var typeToPlay=element.closest('video').length?'video':'audio';element.closest(typeToPlay).get(0).load();}});}
function playMedia(destiny){var panel=getSlideOrSection(destiny);panel.find('video, audio').each(function(){var element=$(this).get(0);if(element.hasAttribute('data-autoplay')&&typeof element.play==='function'){element.play();}});panel.find('iframe[src*="youtube.com/embed/"]').each(function(){var element=$(this).get(0);if(element.hasAttribute('data-autoplay')){playYoutube(element);}
element.onload=function(){if(element.hasAttribute('data-autoplay')){playYoutube(element);}};});}
function playYoutube(element){element.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}','*');}
function stopMedia(destiny){var panel=getSlideOrSection(destiny);panel.find('video, audio').each(function(){var element=$(this).get(0);if(!element.hasAttribute('data-keepplaying')&&typeof element.pause==='function'){element.pause();}});panel.find('iframe[src*="youtube.com/embed/"]').each(function(){var element=$(this).get(0);if(/youtube\.com\/embed\//.test($(this).attr('src'))&&!element.hasAttribute('data-keepplaying')){$(this).get(0).contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}','*');}});}
function getSlideOrSection(destiny){var slide=destiny.find(SLIDE_ACTIVE_SEL);if(slide.length){destiny=$(slide);}
return destiny;}
function scrollToAnchor(){var anchors=getAnchorsURL();var sectionAnchor=anchors.section;var slideAnchor=anchors.slide;if(sectionAnchor){if(options.animateAnchor){scrollPageAndSlide(sectionAnchor,slideAnchor);}else{silentMoveTo(sectionAnchor,slideAnchor);}}}
function hashChangeHandler(){if(!isScrolling&&!options.lockAnchors){var anchors=getAnchorsURL();var sectionAnchor=anchors.section;var slideAnchor=anchors.slide;var isFirstSlideMove=(typeof lastScrolledDestiny==='undefined');var isFirstScrollMove=(typeof lastScrolledDestiny==='undefined'&&typeof slideAnchor==='undefined'&&!slideMoving);if(sectionAnchor.length){if((sectionAnchor&&sectionAnchor!==lastScrolledDestiny)&&!isFirstSlideMove||isFirstScrollMove||(!slideMoving&&lastScrolledSlide!=slideAnchor)){scrollPageAndSlide(sectionAnchor,slideAnchor);}}}}
function getAnchorsURL(){var section;var slide;var hash=window.location.hash;if(hash.length){var anchorsParts=hash.replace('#','').split('/');var isFunkyAnchor=hash.indexOf('#/')>-1;section=isFunkyAnchor?'/'+anchorsParts[1]:decodeURIComponent(anchorsParts[0]);var slideAnchor=isFunkyAnchor?anchorsParts[2]:anchorsParts[1];if(slideAnchor&&slideAnchor.length){slide=decodeURIComponent(slideAnchor);}}
return{section:section,slide:slide}}
function keydownHandler(e){clearTimeout(keydownId);var activeElement=$(':focus');var keyCode=e.which;if(keyCode===9){onTab(e);}
else if(!activeElement.is('textarea')&&!activeElement.is('input')&&!activeElement.is('select')&&activeElement.attr('contentEditable')!=="true"&&activeElement.attr('contentEditable')!==''&&options.keyboardScrolling&&options.autoScrolling){var keyControls=[40,38,32,33,34];if($.inArray(keyCode,keyControls)>-1){e.preventDefault();}
controlPressed=e.ctrlKey;keydownId=setTimeout(function(){onkeydown(e);},150);}}
function tooltipTextHandler(){$(this).prev().trigger('click');}
function keyUpHandler(e){if(isWindowFocused){controlPressed=e.ctrlKey;}}
function mouseDownHandler(e){if(e.which==2){oldPageY=e.pageY;container.on('mousemove',mouseMoveHandler);}}
function mouseUpHandler(e){if(e.which==2){container.off('mousemove');}}
function slideArrowHandler(){var section=$(this).closest(SECTION_SEL);if($(this).hasClass(SLIDES_PREV)){if(isScrollAllowed.m.left){moveSlideLeft(section);}}else{if(isScrollAllowed.m.right){moveSlideRight(section);}}}
function blurHandler(){isWindowFocused=false;controlPressed=false;}
function sectionBulletHandler(e){e.preventDefault();var index=$(this).parent().index();scrollPage($(SECTION_SEL).eq(index));}
function slideBulletHandler(e){e.preventDefault();var slides=$(this).closest(SECTION_SEL).find(SLIDES_WRAPPER_SEL);var destiny=slides.find(SLIDE_SEL).eq($(this).closest('li').index());landscapeScroll(slides,destiny);}
function onkeydown(e){var shiftPressed=e.shiftKey;if(!canScroll&&[37,39].indexOf(e.which)<0){return;}
switch(e.which){case 38:case 33:if(isScrollAllowed.k.up){moveSectionUp();}
break;case 32:if(shiftPressed&&isScrollAllowed.k.up){moveSectionUp();break;}
case 40:case 34:if(isScrollAllowed.k.down){moveSectionDown();}
break;case 36:if(isScrollAllowed.k.up){moveTo(1);}
break;case 35:if(isScrollAllowed.k.down){moveTo($(SECTION_SEL).length);}
break;case 37:if(isScrollAllowed.k.left){moveSlideLeft();}
break;case 39:if(isScrollAllowed.k.right){moveSlideRight();}
break;default:return;}}
function onTab(e){var isShiftPressed=e.shiftKey;var activeElement=$(':focus');var activeSection=$(SECTION_ACTIVE_SEL);var activeSlide=activeSection.find(SLIDE_ACTIVE_SEL);var focusableWrapper=activeSlide.length?activeSlide:activeSection;var focusableElements=focusableWrapper.find(focusableElementsString);function preventAndFocusFirst(e){e.preventDefault();return focusableElements.first().focus();}
if(activeElement.length){if(!activeElement.closest(SECTION_ACTIVE_SEL,SLIDE_ACTIVE_SEL).length){activeElement=preventAndFocusFirst(e);}}
else{preventAndFocusFirst(e);}
if(!isShiftPressed&&activeElement.is(focusableElements.last())||isShiftPressed&&activeElement.is(focusableElements.first())){e.preventDefault();}}
var oldPageY=0;function mouseMoveHandler(e){if(canScroll){if(e.pageY<oldPageY&&isScrollAllowed.m.up){moveSectionUp();}
else if(e.pageY>oldPageY&&isScrollAllowed.m.down){moveSectionDown();}}
oldPageY=e.pageY;}
function landscapeScroll(slides,destiny,direction){var section=slides.closest(SECTION_SEL);var v={slides:slides,destiny:destiny,direction:direction,destinyPos:destiny.position(),slideIndex:destiny.index(),section:section,sectionIndex:section.index(SECTION_SEL),anchorLink:section.data('anchor'),slidesNav:section.find(SLIDES_NAV_SEL),slideAnchor:getAnchor(destiny),prevSlide:section.find(SLIDE_ACTIVE_SEL),prevSlideIndex:section.find(SLIDE_ACTIVE_SEL).index(),localIsResizing:isResizing};v.xMovement=getXmovement(v.prevSlideIndex,v.slideIndex);if(!v.localIsResizing){canScroll=false;}
if(options.onSlideLeave){if(!v.localIsResizing&&v.xMovement!=='none'){if($.isFunction(options.onSlideLeave)){if(options.onSlideLeave.call(v.prevSlide,v.anchorLink,(v.sectionIndex+1),v.prevSlideIndex,v.direction,v.slideIndex)===false){slideMoving=false;return;}}}}
destiny.addClass(ACTIVE).siblings().removeClass(ACTIVE);if(!v.localIsResizing){stopMedia(v.prevSlide);lazyLoad(destiny);}
if(!options.loopHorizontal&&options.controlArrows){section.find(SLIDES_ARROW_PREV_SEL).toggle(v.slideIndex!==0);section.find(SLIDES_ARROW_NEXT_SEL).toggle(!destiny.is(':last-child'));}
if(section.hasClass(ACTIVE)&&!v.localIsResizing){setState(v.slideIndex,v.slideAnchor,v.anchorLink,v.sectionIndex);}
performHorizontalMove(slides,v,true);}
function afterSlideLoads(v){activeSlidesNavigation(v.slidesNav,v.slideIndex);if(!v.localIsResizing){$.isFunction(options.afterSlideLoad)&&options.afterSlideLoad.call(v.destiny,v.anchorLink,(v.sectionIndex+1),v.slideAnchor,v.slideIndex);canScroll=true;playMedia(v.destiny);}
slideMoving=false;}
function performHorizontalMove(slides,v,fireCallback){var destinyPos=v.destinyPos;if(options.css3){var translate3d='translate3d(-'+Math.round(destinyPos.left)+'px, 0px, 0px)';addAnimation(slides.find(SLIDES_CONTAINER_SEL)).css(getTransforms(translate3d));afterSlideLoadsId=setTimeout(function(){fireCallback&&afterSlideLoads(v);},options.scrollingSpeed,options.easing);}else{slides.animate({scrollLeft:Math.round(destinyPos.left)},options.scrollingSpeed,options.easing,function(){fireCallback&&afterSlideLoads(v);});}}
function activeSlidesNavigation(slidesNav,slideIndex){slidesNav.find(ACTIVE_SEL).removeClass(ACTIVE);slidesNav.find('li').eq(slideIndex).find('a').addClass(ACTIVE);}
var previousHeight=windowsHeight;function resizeHandler(){responsive();if(isTouchDevice){var activeElement=$(document.activeElement);if(!activeElement.is('textarea')&&!activeElement.is('input')&&!activeElement.is('select')){var currentHeight=$window.height();if(Math.abs(currentHeight-previousHeight)>(20*Math.max(previousHeight,currentHeight)/100)){reBuild(true);previousHeight=currentHeight;}}}else{clearTimeout(resizeId);resizeId=setTimeout(function(){reBuild(true);},350);}}
function responsive(){var widthLimit=options.responsive||options.responsiveWidth;var heightLimit=options.responsiveHeight;var isBreakingPointWidth=widthLimit&&$window.outerWidth()<widthLimit;var isBreakingPointHeight=heightLimit&&$window.height()<heightLimit;if(widthLimit&&heightLimit){setResponsive(isBreakingPointWidth||isBreakingPointHeight);}
else if(widthLimit){setResponsive(isBreakingPointWidth);}
else if(heightLimit){setResponsive(isBreakingPointHeight);}}
function addAnimation(element){var transition='all '+options.scrollingSpeed+'ms '+options.easingcss3;element.removeClass(NO_TRANSITION);return element.css({'-webkit-transition':transition,'transition':transition});}
function removeAnimation(element){return element.addClass(NO_TRANSITION);}
function activateNavDots(name,sectionIndex){if(options.navigation){$(SECTION_NAV_SEL).find(ACTIVE_SEL).removeClass(ACTIVE);if(name){$(SECTION_NAV_SEL).find('a[href="#'+name+'"]').addClass(ACTIVE);}else{$(SECTION_NAV_SEL).find('li').eq(sectionIndex).find('a').addClass(ACTIVE);}}}
function activateMenuElement(name){if(options.menu){$(options.menu).find(ACTIVE_SEL).removeClass(ACTIVE);$(options.menu).find('[data-menuanchor="'+name+'"]').addClass(ACTIVE);}}
function activateMenuAndNav(anchor,index){activateMenuElement(anchor);activateNavDots(anchor,index);}
function getYmovement(destiny){var fromIndex=$(SECTION_ACTIVE_SEL).index(SECTION_SEL);var toIndex=destiny.index(SECTION_SEL);if(fromIndex==toIndex){return 'none';}
if(fromIndex>toIndex){return 'up';}
return 'down';}
function getXmovement(fromIndex,toIndex){if(fromIndex==toIndex){return 'none';}
if(fromIndex>toIndex){return 'left';}
return 'right';}
function addTableClass(element){if(!element.hasClass(TABLE)){element.addClass(TABLE).wrapInner('<div class="'+TABLE_CELL+'" style="height:'+getTableHeight(element)+'px;" />');}}
function getTableHeight(element){var sectionHeight=windowsHeight;if(options.paddingTop||options.paddingBottom){var section=element;if(!section.hasClass(SECTION)){section=element.closest(SECTION_SEL);}
var paddings=parseInt(section.css('padding-top'))+parseInt(section.css('padding-bottom'));sectionHeight=(windowsHeight-paddings);}
return sectionHeight;}
function transformContainer(translate3d,animated){if(animated){addAnimation(container);}else{removeAnimation(container);}
container.css(getTransforms(translate3d));setTimeout(function(){container.removeClass(NO_TRANSITION);},10);}
function getSectionByAnchor(sectionAnchor){var section=container.find(SECTION_SEL+'[data-anchor="'+sectionAnchor+'"]');if(!section.length){var sectionIndex=typeof sectionAnchor!=='undefined'?sectionAnchor-1:0;section=$(SECTION_SEL).eq(sectionIndex);}
return section;}
function getSlideByAnchor(slideAnchor,section){var slide=section.find(SLIDE_SEL+'[data-anchor="'+slideAnchor+'"]');if(!slide.length){slideAnchor=typeof slideAnchor!=='undefined'?slideAnchor:0;slide=section.find(SLIDE_SEL).eq(slideAnchor);}
return slide;}
function scrollPageAndSlide(sectionAnchor,slideAnchor){var section=getSectionByAnchor(sectionAnchor);if(!section.length)return;var slide=getSlideByAnchor(slideAnchor,section);if(sectionAnchor!==lastScrolledDestiny&&!section.hasClass(ACTIVE)){scrollPage(section,function(){scrollSlider(slide);});}
else{scrollSlider(slide);}}
function scrollSlider(slide){if(slide.length){landscapeScroll(slide.closest(SLIDES_WRAPPER_SEL),slide);}}
function addSlidesNavigation(section,numSlides){section.append('<div class="'+SLIDES_NAV+'"><ul></ul></div>');var nav=section.find(SLIDES_NAV_SEL);nav.addClass(options.slidesNavPosition);for(var i=0;i<numSlides;i++){nav.find('ul').append('<li><a href="#"><span></span></a></li>');}
nav.css('margin-left','-'+(nav.width()/2)+'px');nav.find('li').first().find('a').addClass(ACTIVE);}
function setState(slideIndex,slideAnchor,anchorLink,sectionIndex){var sectionHash='';if(options.anchors.length&&!options.lockAnchors){if(slideIndex){if(typeof anchorLink!=='undefined'){sectionHash=anchorLink;}
if(typeof slideAnchor==='undefined'){slideAnchor=slideIndex;}
lastScrolledSlide=slideAnchor;setUrlHash(sectionHash+'/'+slideAnchor);}else if(typeof slideIndex!=='undefined'){lastScrolledSlide=slideAnchor;setUrlHash(anchorLink);}
else{setUrlHash(anchorLink);}}
setBodyClass();}
function setUrlHash(url){if(options.recordHistory){location.hash=url;}else{if(isTouchDevice||isTouch){window.history.replaceState(undefined,undefined,'#'+url);}else{var baseUrl=window.location.href.split('#')[0];window.location.replace(baseUrl+'#'+url);}}}
function getAnchor(element){var anchor=element.data('anchor');var index=element.index();if(typeof anchor==='undefined'){anchor=index;}
return anchor;}
function setBodyClass(){var section=$(SECTION_ACTIVE_SEL);var slide=section.find(SLIDE_ACTIVE_SEL);var sectionAnchor=getAnchor(section);var slideAnchor=getAnchor(slide);var text=String(sectionAnchor);if(slide.length){text=text+'-'+slideAnchor;}
text=text.replace('/','-').replace('#','');var classRe=new RegExp('\\b\\s?'+VIEWING_PREFIX+'-[^\\s]+\\b',"g");$body[0].className=$body[0].className.replace(classRe,'');$body.addClass(VIEWING_PREFIX+'-'+text);}
function support3d(){var el=document.createElement('p'),has3d,transforms={'webkitTransform':'-webkit-transform','OTransform':'-o-transform','msTransform':'-ms-transform','MozTransform':'-moz-transform','transform':'transform'};document.body.insertBefore(el,null);for(var t in transforms){if(el.style[t]!==undefined){el.style[t]='translate3d(1px,1px,1px)';has3d=window.getComputedStyle(el).getPropertyValue(transforms[t]);}}
document.body.removeChild(el);return(has3d!==undefined&&has3d.length>0&&has3d!=='none');}
function removeMouseWheelHandler(){if(document.addEventListener){document.removeEventListener('mousewheel',MouseWheelHandler,false);document.removeEventListener('wheel',MouseWheelHandler,false);document.removeEventListener('MozMousePixelScroll',MouseWheelHandler,false);}else{document.detachEvent('onmousewheel',MouseWheelHandler);}}
function addMouseWheelHandler(){var prefix='';var _addEventListener;if(window.addEventListener){_addEventListener="addEventListener";}else{_addEventListener="attachEvent";prefix='on';}
var support='onwheel'in document.createElement('div')?'wheel':document.onmousewheel!==undefined?'mousewheel':'DOMMouseScroll';if(support=='DOMMouseScroll'){document[_addEventListener](prefix+'MozMousePixelScroll',MouseWheelHandler,false);}
else{document[_addEventListener](prefix+support,MouseWheelHandler,false);}}
function addMiddleWheelHandler(){container.on('mousedown',mouseDownHandler).on('mouseup',mouseUpHandler);}
function removeMiddleWheelHandler(){container.off('mousedown',mouseDownHandler).off('mouseup',mouseUpHandler);}
function addTouchHandler(){if(isTouchDevice||isTouch){if(options.autoScrolling){$body.off(events.touchmove).on(events.touchmove,preventBouncing);}
$(WRAPPER_SEL).off(events.touchstart).on(events.touchstart,touchStartHandler).off(events.touchmove).on(events.touchmove,touchMoveHandler);}}
function removeTouchHandler(){if(isTouchDevice||isTouch){if(options.autoScrolling){$body.off(events.touchmove);}
$(WRAPPER_SEL).off(events.touchstart).off(events.touchmove);}}
function getMSPointer(){var pointer;if(window.PointerEvent){pointer={down:'pointerdown',move:'pointermove'};}
else{pointer={down:'MSPointerDown',move:'MSPointerMove'};}
return pointer;}
function getEventsPage(e){var events=[];events.y=(typeof e.pageY!=='undefined'&&(e.pageY||e.pageX)?e.pageY:e.touches[0].pageY);events.x=(typeof e.pageX!=='undefined'&&(e.pageY||e.pageX)?e.pageX:e.touches[0].pageX);if(isTouch&&isReallyTouch(e)&&(options.scrollBar||!options.autoScrolling)){events.y=e.touches[0].pageY;events.x=e.touches[0].pageX;}
return events;}
function silentLandscapeScroll(activeSlide,noCallbacks){setScrollingSpeed(0,'internal');if(typeof noCallbacks!=='undefined'){isResizing=true;}
landscapeScroll(activeSlide.closest(SLIDES_WRAPPER_SEL),activeSlide);if(typeof noCallbacks!=='undefined'){isResizing=false;}
setScrollingSpeed(originals.scrollingSpeed,'internal');}
function silentScroll(top){var roundedTop=Math.round(top);if(options.css3&&options.autoScrolling&&!options.scrollBar){var translate3d='translate3d(0px, -'+roundedTop+'px, 0px)';transformContainer(translate3d,false);}
else if(options.autoScrolling&&!options.scrollBar){container.css('top',-roundedTop);}
else{$htmlBody.scrollTop(roundedTop);}}
function getTransforms(translate3d){return{'-webkit-transform':translate3d,'-moz-transform':translate3d,'-ms-transform':translate3d,'transform':translate3d};}
function setIsScrollAllowed(value,direction,type){if(direction!=='all'){isScrollAllowed[type][direction]=value;}
else{$.each(Object.keys(isScrollAllowed[type]),function(index,key){isScrollAllowed[type][key]=value;});}}
function destroy(all){setAutoScrolling(false,'internal');setAllowScrolling(false);setKeyboardScrolling(false);container.addClass(DESTROYED);clearTimeout(afterSlideLoadsId);clearTimeout(afterSectionLoadsId);clearTimeout(resizeId);clearTimeout(scrollId);clearTimeout(scrollId2);$window.off('scroll',scrollHandler).off('hashchange',hashChangeHandler).off('resize',resizeHandler);$document.off('click touchstart',SECTION_NAV_SEL+' a').off('mouseenter',SECTION_NAV_SEL+' li').off('mouseleave',SECTION_NAV_SEL+' li').off('click touchstart',SLIDES_NAV_LINK_SEL).off('mouseover',options.normalScrollElements).off('mouseout',options.normalScrollElements);$(SECTION_SEL).off('click touchstart',SLIDES_ARROW_SEL);clearTimeout(afterSlideLoadsId);clearTimeout(afterSectionLoadsId);if(all){destroyStructure();}}
function destroyStructure(){silentScroll(0);container.find('img[data-src], source[data-src], audio[data-src], iframe[data-src]').each(function(){setSrc($(this),'src');});container.find('img[data-srcset]').each(function(){setSrc($(this),'srcset');});$(SECTION_NAV_SEL+', '+SLIDES_NAV_SEL+', '+SLIDES_ARROW_SEL).remove();$(SECTION_SEL).css({'height':'','background-color':'','padding':''});$(SLIDE_SEL).css({'width':''});container.css({'height':'','position':'','-ms-touch-action':'','touch-action':''});$htmlBody.css({'overflow':'','height':''});$('html').removeClass(ENABLED);$body.removeClass(RESPONSIVE);$.each($body.get(0).className.split(/\s+/),function(index,className){if(className.indexOf(VIEWING_PREFIX)===0){$body.removeClass(className);}});$(SECTION_SEL+', '+SLIDE_SEL).each(function(){if(options.scrollOverflowHandler){options.scrollOverflowHandler.remove($(this));}
$(this).removeClass(TABLE+' '+ACTIVE);$(this).attr('style',$(this).data('fp-styles'));});removeAnimation(container);container.find(TABLE_CELL_SEL+', '+SLIDES_CONTAINER_SEL+', '+SLIDES_WRAPPER_SEL).each(function(){$(this).replaceWith(this.childNodes);});container.css({'-webkit-transition':'none','transition':'none'});$htmlBody.scrollTop(0);var usedSelectors=[SECTION,SLIDE,SLIDES_CONTAINER];$.each(usedSelectors,function(index,value){$('.'+value).removeClass(value);});}
function setVariableState(variable,value,type){options[variable]=value;if(type!=='internal'){originals[variable]=value;}}
function displayWarnings(){var extensions=['fadingEffect','continuousHorizontal','scrollHorizontally','interlockedSlides','resetSliders','responsiveSlides','offsetSections','dragAndMove','scrollOverflowReset','parallax'];if($('html').hasClass(ENABLED)){showError('error','Fullpage.js can only be initialized once and you are doing it multiple times!');return;}
if(options.continuousVertical&&(options.loopTop||options.loopBottom)){options.continuousVertical=false;showError('warn','Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled');}
if(options.scrollBar&&options.scrollOverflow){showError('warn','Option `scrollBar` is mutually exclusive with `scrollOverflow`. Sections with scrollOverflow might not work well in Firefox');}
if(options.continuousVertical&&(options.scrollBar||!options.autoScrolling)){options.continuousVertical=false;showError('warn','Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled');}
if(options.scrollOverflow&&!options.scrollOverflowHandler){options.scrollOverflow=false;showError('error','The option `scrollOverflow:true` requires the file `scrolloverflow.min.js`. Please include it before fullPage.js.');}
$.each(extensions,function(index,extension){if(options[extension]){showError('warn','fullpage.js extensions require jquery.fullpage.extensions.min.js file instead of the usual jquery.fullpage.js. Requested: '+extension);}});$.each(options.anchors,function(index,name){var nameAttr=$document.find('[name]').filter(function(){return $(this).attr('name')&&$(this).attr('name').toLowerCase()==name.toLowerCase();});var idAttr=$document.find('[id]').filter(function(){return $(this).attr('id')&&$(this).attr('id').toLowerCase()==name.toLowerCase();});if(idAttr.length||nameAttr.length){showError('error','data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).');idAttr.length&&showError('error','"'+name+'" is is being used by another element `id` property');nameAttr.length&&showError('error','"'+name+'" is is being used by another element `name` property');}});}
function showError(type,text){console&&console[type]&&console[type]('fullPage: '+text);}};});