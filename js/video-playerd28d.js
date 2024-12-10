$(window).on('load', function () {

    /**
     *  VIDEO PLAYER
     **/
    $('.video-player .controls').removeClass('loading');
    $('.video-player .controls').addClass('play');
    $('.video-player .controls').click(function () {
        console.log('hello');
        /** VIDEO CONTAINER **/
        var vcont = $(this);
        var video = $(this).parent().find('video').get(0);

        if (video.paused) {
            video.play();
            vcont.removeClass('play');
            vcont.addClass('pause');
        } else {
            video.pause();
            vcont.removeClass('pause');
            vcont.addClass('play');
        }
    }).hover(function () {
        var vcont = $(this);
        var video = $(this).parent().find('video').get(0);
        if (video.paused) {
            vcont.removeClass('pause');
            vcont.addClass('play');
        } else {
            vcont.removeClass('play');
            vcont.addClass('pause');
        }
    }, function () {
        var vcont = $(this);
        var video = $(this).parent().find('video').get(0);

        if (video.paused) {
            vcont.removeClass('pause');
        } else {
            vcont.removeClass('play');
            vcont.removeClass('pause');

        }

    });



})

// function toggleMute(videoElement) {
//     var videoById = document.getElementById(videoElement.attr('id'));
//     console.log('prop: ', videoElement.prop('muted') ? 'true' : 'false', ' .muted: ', videoById.muted ? 'true' : 'false',);

//     if (videoElement.prop('muted')) {
//         videoElement.parent().find('.mute_button i').removeClass('fa-volume-off').addClass('fa-volume-up');
//         videoElement.prop('muted', false);
//     } else {
//         videoElement.parent().find('.mute_button i').removeClass('fa-volume-up').addClass('fa-volume-off');
//         videoElement.prop('muted', true);
//     }
// }

// $('.mute_button').on('click', function () {
//     var video = $(this).parent().find('video');
//     toggleMute(video);
// });

// // Handle the external button click
// $('#externalMuteButton').on('click', function () {
//     // Find the specific video you want to control (for example, by ID)
//     var video = $('#video_1'); // Replace with the actual ID of the video
//     toggleMute(video);
// });
function toggleMute(videoElement) {
    var videoById = document.getElementById(videoElement.attr('id'));
    var isMuted = videoElement.prop('muted');

    console.log('prop: ', isMuted ? 'true' : 'false', ' .muted: ', videoById.muted ? 'true' : 'false');

    if (isMuted) {
        videoElement.prop('muted', false);
        videoElement.parent().find('.mute_button i').removeClass('fa-volume-off').addClass('fa-volume-up');
    } else {
        videoElement.prop('muted', true);
        videoElement.parent().find('.mute_button i').removeClass('fa-volume-up').addClass('fa-volume-off');
    }
}

$('.mute_button').on('click', function () {
    var video = $(this).parent().find('video');
    toggleMute(video);
});

// Handle the external button click
$('#externalMuteButton').on('click', function () {
    var video = $('#video_1'); // Replace with the actual ID of the video

    // Synchronize the mute button icon
    var isMuted = video.prop('muted');

    if (!isMuted){
        toggleMute(video);
    }
});



$('video').on('playing', function () {
    $(this).parent().find(".controls").removeClass('loading').removeClass('play');
})
var progress_bar_steps = [ 33, 66, 100]; // Define your step points
var progress_bar_currentStep = 0;

function updateProgressBar() {
    console.log(progress_bar_currentStep)
    if (progress_bar_currentStep < progress_bar_steps.length) {
        var previousStep = progress_bar_steps[progress_bar_currentStep - 1];
        if(progress_bar_currentStep == 0){
            previousStep = 0;
        }

        var nextStep = progress_bar_steps[progress_bar_currentStep];
        var progressBar = $('#progressBar');
        var tooltip = $('#tooltip');
        var tooltipInstance = new bootstrap.Tooltip(tooltip);

        var duration = 4000;
        var increment = Math.ceil((nextStep - previousStep) / (duration / 70));
console.log(increment)

        progressBar.css('width', nextStep + '%');
        progressBar.attr('aria-valuenow', nextStep);
        updateCounter(previousStep, nextStep, increment)
       // tooltip.html(nextStep + '%');
        tooltip.css('left' , `calc(${nextStep}%)`); // Adjust left position for tooltip

        tooltipInstance.update(); // Update tooltip position and content
        // Pause for 1 second after the width transition completes
        setTimeout(function() {

            progress_bar_currentStep++;
            updateProgressBar(); // Move to the next step
        }, duration); // 1 second pause
    }else{
        setTimeout(function() {
            $('#progressBar').parent().parent().hide();
        }, 2000); // 1 second pause
    }
}
function updateCounter(start, end, increment) {
    var $counter = $('#tooltip');
    var current = start;

    var timer = setInterval(function() {
        if (current < end) {
            current += increment;
            if (current > end) {
                current = end; // Ensure it does not exceed the end value
            }
            $counter.text(Math.floor(current));
        } else {
            clearInterval(timer);
        }
    }, 70);
}

$(".trigger-play-video").on('click', function(){
    var videoById = document.getElementById($(".trigger-play-video").data('trigger-video-id'))
var delay = 0;
    if($(this).attr('data-delay') !== undefined){
         delay = $(this).data('delay');
    }
    setTimeout(function (){

        videoById.play();

        updateProgressBar();





    }, delay)

});

var resize_default = 'desktop';
function updateVideoSources() {
    // Get all video elements
    var videos = document.querySelectorAll('video');

    // Loop through each video element
    videos.forEach(function(video) {
        var source = video.querySelector('source');

        if (source) {
            // Check if the data attributes exist
            var hasMobileSrc = source.hasAttribute('data-mobile-src');
            var hasDesktopSrc = source.hasAttribute('data-desktop-src');

            if (hasMobileSrc && hasDesktopSrc) {
                var isMobile = window.innerWidth <= 767;
                if(isMobile && resize_default === 'mobile' || !isMobile && resize_default === 'desktop'){
                   return;
                }

                if(isMobile){
                    resize_default = 'mobile';
                }else{
                    resize_default = 'desktop';
                }

                var newSrc = isMobile ? source.getAttribute('data-mobile-src') : source.getAttribute('data-desktop-src');

                // Update the source element's src attribute
                source.src = newSrc;
                video.load(); // Reload the video to apply the new source
            } else {
                console.warn('Missing data-src-mobile or data-src-desktop attribute on <source> element.');
            }
        }
    });
}

// Initial update on page load
updateVideoSources();

// Update video sources on window resize
window.addEventListener('resize', updateVideoSources);
