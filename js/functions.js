var $window = $(window),
    gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();

$(function() {
    // vẽ trái tim
    var $loveHeart = $("#loveHeart");
    var offsetX = $loveHeart.width() / 2;
    var offsetY = $loveHeart.height() / 2 - 55;
    $garden = $("#garden"); 
    gardenCanvas = $garden[0];
    gardenCanvas.width = $("#loveHeart").width();
    gardenCanvas.height = $("#loveHeart").height();
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);

    $("#content").css("width", $loveHeart.width() + $("#code").width());
    $("#content").css("height", Math.max($loveHeart.height(), $("#code").height()));
    $("#content").css("margin-top", Math.max(($window.height() - $("#content").height()) / 2, 10));
    $("#content").css("margin-left", Math.max(($window.width() - $("#content").width()) / 2, 10));

    
    setInterval(function() {
        garden.render();
    }, Garden.options.growSpeed);
});

$(window).resize(function() {
    var newWidth = $(window).width();
    var newHeight = $(window).height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

function getHeartPoint(angle) {
    var t = angle / Math.PI;
    var x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
    var y = -20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return new Array(offsetX + x, offsetY + y);
}

function startHeartAnimation() {
    var interval = 200;
    var angle = 10;
    var heart = new Array();
    var animationTimer = setInterval(function() {
        var bloom = getHeartPoint(angle);
        var draw = true;
        for (var i = 0; i < heart.length; i++) {
            var p = heart[i];
            var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
            if (distance < Garden.options.bloomRadius.max * 1.3) {
                draw = false;
                break;
            }
        }
        if (draw) {
            heart.push(bloom);
            garden.createRandomBloom(bloom[0], bloom[1]);
        }
        if (angle >= 30) {
            clearInterval(animationTimer);
            showMessages();
        } else {
            angle += 0.2;
        }
    }, interval);
}

(function($) {
    $.fn.typewriter = function() {
        this.each(function() {
            var $ele = $(this),
                str = $ele.html(),
                progress = 0;
            $ele.html('');
            var timer = setInterval(function() {
                var current = str.substr(progress, 1);
                if (current == '<') {
                    progress = str.indexOf('>', progress) + 1;
                } else {
                    progress++;
                }
                $ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
                musicPlay(); 
                if (progress >= str.length) {
                    musicReplay(); // Tạm dừng và khởi động lại
                    clearInterval(timer);
                }
            }, 75);
        });
        return this;
    };
})(jQuery);

/* 1 day = 24 hours = 24*60 minutes = 24*60*60 seconds = 24*60*60*1000 ms  */
function timeElapse(date) {
    var current = Date(); // thời điểm hiện tại
    var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
    var days = Math.floor(seconds / (3600 * 24));
    seconds = seconds % (3600 * 24);
    var hours = Math.floor(seconds / 3600);
    if (hours < 10) {
        hours = "0" + hours;
    }
    seconds = seconds % 3600;
    var minutes = Math.floor(seconds / 60);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    seconds = seconds % 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var result = "<span class=\"togetherTime\">" + days + "</span> days <span class=\"togetherTime\">" + hours + "</span> hours <span class=\"togetherTime\">" + minutes + "</span> minutes <span class=\"togetherTime\">" + seconds + "</span> seconds";
    $("#elapseClock").html(result);
}

function showMessages() {
    adjustWordsPosition();
    $('#messages').fadeIn(6000, function() {
        showLoveU();
    });
}

function showLoveU() {
    $('#loveu').fadeIn(4000);
    $('#loveu .signature').text('- 刘林晓');
}

function adjustWordsPosition() {
    $('#words').css("position", "absolute");
    $('#words').css("top", $("#garden").position().top + 195);
    $('#words').css("left", $("#garden").position().left + 70);
}

function adjustCodePosition() {
    $('#code').css("margin-top", ($("#garden").height() - $("#code").height()) / 2);
}



/*
   Định dạng ngày
*/
function formatDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = month < 10 ? ('0' + month) : month;
    var day = date.getDate();
    day = day < 10 ? ('0' + day) : day;
    return year + '-' + month + '-' + day;
}

/*
    Phát âm thanh gõ phím
*/
function musicPlay() {
    var audio = document.getElementById('bgMusic');
    audio.play();
}

/*
    Hiệu ứng âm thanh lặp lại
*/
function musicReplay() {
    var audio = document.getElementById('bgMusic');
    audio.currentTime = 0;
}

/*
    Tạm dừng âm thanh nhập
*/
function musicPaused() {
    var audio = document.getElementById('bgMusic');
    audio.pause();
}

/*
    Hiểu thị hình ảnh và bắt đầu thêm hình ảnh động
*/
function photoAnimation() {
    var images = $('#images img');
    var time = 10000;
    $.each(images, function(index, val) {
        setTimeout(function() {
            showPhoto($(val), index+1);
        }, time);
        setTimeout(function(){
            hiddenPhoto($(val), index+1);
        },time+8000);
        time+=11000;
    });

}

/*
    hiển thị hình ảnh
*/
function showPhoto(photo, i) {
    $(photo).addClass('show' + i);
}

/*
   Ẩn hình ảnh
*/
function hiddenPhoto(photo, i) {
    $(photo).removeClass('show' + i);
}

/*
    Hiển thị đồ thị ảnh
*/
function showAllPhoto(){
    var images = $('#images img');
    $.each(images, function(index, val) {
        showPhoto($(val), index+1);
    });
}

/*
    ẩn tất cả hình ảnh
*/
function hiddenAllPhoto(){
    var images = $('#images img');
    $.each(images, function(index, val) {
        hiddenPhoto($(val), index+1);
    });
}