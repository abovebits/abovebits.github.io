"use strict";

/**
 * Portfolio model class
 * @param {*} data 
 */
var PortfolioModel = function (data) {
    if (!data) throw "You should set data source";
    
    this.data = null;
    this.dataLoaded = false;
    this.dataCount = 0;
    this.indexedSkills = null;

    if (typeof data === 'array') {
        this.data = data;
        self.dataLoaded = true;
        this.dataCount = this.data.length;
    }
    else if (typeof data === 'string') {
        this.getDataByLink(data);
    }
};

PortfolioModel.prototype.getDataByLink = function (link) {
    var d = new Date(),
        self = this;
    $.ajax({
        type: 'get',
        url: link+"?v="+d.getTime(),
        beforeSend: function () {
        //    console.log('get data by portfolio');
        },
        success: function (data) {
            self.data = data;
            self.dataLoaded = true;
            self.dataCount = self.data.length;
        },
        error: function (data) {
            console.warn(data.responseText);
        }
    });
};

PortfolioModel.prototype.find = function (skill,limit, offset) {
     var _items = [],
         _end = parseInt(limit) + parseInt(offset);
    if (skill === '*') {
        _items = this.data;
    } else{
        _items = this.data.filter(function (one) {
            return ( (one.skill1.toLowerCase().indexOf(skill) !== -1) || 
            (one.skill2.toLowerCase().indexOf(skill) !== -1) || 
            (one.skill3.toLowerCase().indexOf(skill) !== -1) || 
            (one.skill4.toLowerCase().indexOf(skill) !== -1) );
         });
    }  
     
     return _items.slice(offset, _end);
};

PortfolioModel.prototype.take = function (limit, offset) {
    var _end = parseInt(limit) + parseInt(offset);
    return this.data.slice(offset, _end);    
};

PortfolioModel.prototype.indexSkills = function () {
    var _skills = [];
    for (var i = 0; i < this.data.length; i++) {
        _skills.push(this.data[i].skill1);
        _skills.push(this.data[i].skill2);
        _skills.push(this.data[i].skill3);
        _skills.push(this.data[i].skill4);
    }
    var uniqueArray = _skills.filter(function(item, pos) {
        return _skills.indexOf(item) == pos;
    });
    var _output = uniqueArray.map(function (one) {
        var _title = one.replace('images/abovebits_skills/',''),
            _titleParts = _title.split('.');
        return _titleParts[0];
    });
    this.indexedSkills = _output;
};



/**
 * Class renders gallery elements
 * @param {*} options 
 * @param {*} model <PortfolioModel>
 */
var PortfolioPresenter = function (options, model) {
    this.block = (options.block) ? $(options.block) : null; // #home_gallery
    this.galleryCount = null;
    this.model = model;
    this.searchedSkill = null;
    this.searchField = options.searchField ? $(options.searchField) : null;
    this.searchFieldCoords = null;
    this.searchFieldList = null;
    this.itemsShown = null;
    this.resizeTimestamp = null;
    this.resizeInterval = null;
    this.resizeDone = false;

    this.init();
};

PortfolioPresenter.prototype.init = function () {
    this.getCount();
    if (this.model.dataLoaded){
        this.buildDefaultPortfolio();
    }
    else {
        setTimeout(function () {
            this.buildDefaultPortfolio();
        }.bind(this), 3000);
    }
    if ("ontouchstart" in document.documentElement) $('#works a.fullblock_fancybox').css({'display':'none'});

    window.addEventListener('resize', function () {
        //console.log('resize');
        this.resizeHandler();
    }.bind(this));
    
};

PortfolioPresenter.prototype.getCount = function () {
    var screenWidth = document.documentElement.clientWidth;
	this.galleryCount = Math.floor(screenWidth/376);
    this.galleryCount = (this.galleryCount == 0) ? 1 : this.galleryCount;
	if (screenWidth == 1024 || screenWidth == 1366) this.galleryCount = Math.floor(screenWidth/316);
	if (screenWidth <= 1142) this.galleryCount = Math.floor(screenWidth/338);
	if (screenWidth <= 340) this.galleryCount = Math.floor(screenWidth/320);
};

PortfolioPresenter.prototype.render = function () {
    this.block.append(this.outputContent);
    this.block.find(".view").slideDown("slow");
    this.calcShowItems();
};

PortfolioPresenter.prototype.calcShowItems = function () {
    this.itemsShown = this.block.find(".view").length;
};

PortfolioPresenter.prototype.resizeHandler = function () {
    if (this.resizeTimestamp === null) {
        this.resizeTimestamp = (new Date()).getTime();
        //console.log('action interval');
        this.resizeInterval = setInterval(() => {
            var now = (new Date()).getTime();
            if (this.resizeTimestamp && (now - this.resizeTimestamp)/600 > 1) {

                var views = this.block.find(".view"),
                    now = views.length,
                    rows = now/this.galleryCount;
                    this.getCount();
                if (now !== this.galleryCount*2) {
                    this.block.find(".view").remove();
                    if (this.galleryCount*2 < now) {
                        var row = Math.ceil(now/this.galleryCount);
                        this.showNextItems(0, this.galleryCount*row);
                    } else {
                        if(window.innerWidth < 1366){
                            this.buildDefaultPortfolio();
                        }
                    }

                }    
                this.resizeTimestamp = null;
                clearInterval(this.resizeInterval);
            } else {
                this.resizeTimestamp = now;
            }
        }, 800);
    }
};

PortfolioPresenter.prototype.buildDefaultPortfolio = function () {
    this.showNextItems(0);
    if (this.searchField && this.searchField.length) this.initSearchField();
};

PortfolioPresenter.prototype.itemHTML = function (item) {
    var ua = window.navigator.userAgent;
    var is_ie = /MSIE|Trident/.test(ua);

    if ( is_ie ) {//IE specific code goes here
        var _item = '<div class="view" style="background-image: url('+item.img+');">';
        if (item.mockup != '') _item+='<a class="fullblock_fancybox" href="'+item.mockup+'" data-fancybox="gallery_full"></a>';
        _item += '</div>';
        return _item;
    } else {
        var _item = '<div class="view">';
        if (item.mockup != '') _item += '<a class="fullblock_fancybox" href="' + item.mockup + '" data-fancybox="gallery_full"></a>';
        _item += '<img class="ios_touch"/>';
        _item += '<div class="view-back">';
        if (item.skill1 != '') _item += '<span><img src="' + item.skill1 + '"/></span>';
        if (item.skill2 != '') _item += '<span><img src="' + item.skill2 + '"/></span>';
        if (item.skill3 != '') _item += '<span><img src="' + item.skill3 + '"/></span>';
        if (item.skill4 != '') _item += '<span><img src="' + item.skill4 + '"/></span>';
        if (item.mockup != '') _item += '<a href="' + item.mockup + '" data-fancybox="gallery">→</a>';
        _item += '</div>';
        _item += '<div class="slice s1" style="background-image: url(' + item.img + ');"><span class="overlay"></span><div class="slice s2" style="background-image: url(' + item.img + ');"><span class="overlay"></span><div class="slice s3" style="background-image: url(' + item.img + ');"><span class="overlay"></span><div class="slice s4" style="background-image: url(' + item.img + ');"><span class="overlay"></span><div class="slice s5" style="background-image: url(' + item.img + ');"><span class="overlay"></span></div></div></div></div></div>';
        _item += '</div>';
        return _item;
    }
};

PortfolioPresenter.prototype.showNextItems = function (offset, forceLimit) {
    var _output = '',
        _forceLimit = forceLimit || false,
        _offset = (typeof offset === 'undefined') ? this.block.find(".view").length : offset,
        _items = (this.searchedSkill === null) ? this.model.take(_forceLimit ? _forceLimit : this.galleryCount*2, _offset)
            : this.model.find(this.searchedSkill, _forceLimit ? _forceLimit : this.galleryCount*2, _offset);
    if (_items.length) {
        
        for (var i = 0; i < _items.length; i++) {
            _output += this.itemHTML(_items[i]);
        }

    }
    if (_offset + _items.length >= this.model.dataCount) this.hideMoreButton();
    this.outputContent = _output;
    this.render();
};

PortfolioPresenter.prototype.hideMoreButton = function () {
    $('#seemore').remove();
};

PortfolioPresenter.prototype.filterItems = function (state) {
    var _output = '',
        _clearBtn = $('.clear-a'),
        _items = this.model.find(state, this.galleryCount*2, 0);
    
    _clearBtn.hide();    
    if (state.length > 1) {
        _clearBtn.show();
    }

    this.searchedSkill = (state === '*') ? null : state;

    if (_items.length) {
        for (var i = 0; i < _items.length; i++) {
            _output += this.itemHTML(_items[i]);
        }
    }    
    if (_items.length >= this.model.dataCount) this.hideMoreButton();
    this.outputContent = _output;
    this.clearBlock();
    this.render();
};

PortfolioPresenter.prototype.clearBlock = function () {
    this.block.find(".view").remove();
};

PortfolioPresenter.prototype.initSearchField = function () {
    this.searchFieldCoords = this.searchField.offset();
    this.model.indexSkills();
    $('body').append("<div class='search_gallery_list' />");
    var self = this;
    this.searchField.on('keyup input', function () {
        self.showTagsList($(this).val().toLowerCase());
    });
    $(document).on('click', function (e) {
        //console.log($(e.target).closest('.search_gallery_list').length);
        if ($(e.target).closest('.search_gallery_list').length === 0 && $(e.target).closest(self.searchField).length === 0) self.hideTagsList();
    });
    $(window).on('resize', function () {
        self.searchFieldCoords = self.searchField.offset();
    });
    $(document).on('click', '.search_gallery_list ul li', function () {
        var _v = $(this).attr('data-value');
        self.searchField.val(_v);
        //self.clearBlock();
        self.filterItems(_v.toLowerCase());
        self.hideTagsList();
        self.searchedSkill = _v.toLowerCase();
    });
};

PortfolioPresenter.prototype.showTagsList = function (val) {
    var _tags = this.model.indexedSkills.filter(function (one) {
        return one.toLowerCase().indexOf(val) !== -1 && one.length;
    }),
        _output = '';    
    if (_tags.length) {
        _output = "<ul>";
        for (var i = 0; i < _tags.length; i++) {
            _output += "<li data-value='"+_tags[i]+"'>"+_tags[i]+"</li>";
        }
        _output += "</ul>";
    }
    if (_output.length) {
        $('.search_gallery_list').html(_output).css({
            'left': this.searchFieldCoords.left,
            'top': this.searchFieldCoords.top + this.searchField.height()+15,
            'width': this.searchField.width()+7
        }).show();
    } else {
        $('.search_gallery_list').hide();
    }

};

PortfolioPresenter.prototype.hideTagsList = function () {
    $('.search_gallery_list').hide();
};