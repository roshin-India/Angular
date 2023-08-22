/*---------------------------------------------
Template name:  Simpli Startup - Job Board HTML Template
Version:        1.0
Author:         TechyDevs
Author Email:   contact@tecydevs.com

[Table of Content]

01: Preloader
02: side-widget-menu
02: Mobile Menu Open Control
03: Mobile Menu Close Control
04: Side user panel menu Open Control
05: Back to Top Button and Navbar Scrolling Effects
06: back to top button click control
07: most-visited-wrap
08: Client logo slider
09: client-testimonial
10: gallery-carousel
11: magnificpopup
12: Daterangepicker
13: MagnificPopup
14: Quantity number increment control
15: Quantity number decrement control
16: Tooltip
17: Nice Select
18: Counter up
----------------------------------------------*/

(function ($) {
    "use strict";

    var $window = $(window);

    $window.on('load', function () {

        var $document = $(document);
        var $dom = $('html, body');
        var preLoader = $('.loader-container');
        var skillbar = $('.skillbar');
        var headerMenuWrapper = $('.header-menu-wrapper');
        var backToTop = $('#back-to-top');
        var cardCarousel = $('.card-carousel');
        var clientLogo = $('.client-logo');
        var testimonialCarousel = $('.testimonial-carousel');
        var testimonialCarouselTwo = $('.testimonial-carousel-2');
        var galleryCarousel = $('.gallery-carousel');
        var videoPopupBtn = $('.video-popup-btn');
        var dateRangePicker = $('input[name="daterange"]');
        var userChosenSelect = $('.user-chosen-select');
        var teamCarousel = $('.team-carousel');
        var mediaCarousel = $('.media-carousel');
        var popularJobCarousel = $('.popular-job-carousel');
        var circleChart = $('.circlechart');
        var userTextEditor = $('.user-text-editor');
        var userTextEditorOne = $('.user-text-editor-1');
        var userTextEditorTwo = $('.user-text-editor-2');
        var userTextEditorThree = $('.user-text-editor-3');
        var userTextEditorFour = $('.user-text-editor-4');
        var userTextEditorFive = $('.user-text-editor-5');
        var userTextEditorSix = $('.user-text-editor-6');
        var userTextEditorSeven = $('.user-text-editor-7');
        var emojiPicker = $('.emoji-picker');
        var messageEle = $('.desc-text-area');

        /*==== Preloader =====*/
        $(preLoader).delay('500').fadeOut(2000);

        /*====  side-widget-menu  =====*/
        $document.on('click', '.side-menu-wrap .side-menu-ul>li>a .btn-toggle', function () {
            $(this).closest('li').siblings().removeClass('active').find('.dropdown-menu-item').slideUp(200);
            $(this).closest('li').toggleClass('active').find('.dropdown-menu-item').slideToggle(200);
            return false;
        });

        /*=========== side-nav-container Menu Open Control ============*/
        $document.on('click', '.logo-right-content .side-menu-open', function () {
            $('.side-nav-container').toggleClass('active');
        });

        /*=========== dashboard-nav-container Menu Open Control ============*/
        $document.on('click', '.dashboard-nav-trigger-btn', function () {
            $('.dashboard-nav-container').addClass('active');
        });

        /*=========== user-nav-container Menu Open Control ============*/
        $document.on('click', '.user-menu-open', function () {
            $('.user-nav-container').addClass('active');
        });

        /*=========== Mobile Menu Close Control ============*/
        $document.on('click', '.humburger-menu .side-menu-close', function () {
            $(".side-nav-container, .dashboard-nav-container, .user-nav-container").removeClass('active');
        });

        /*=========== Skillbar ============*/
        $(skillbar).each(function () {
            $(this).find('.skill-item').animate({ width: $(this).attr('data-percent') }, 3000);
        });

        /*===== Back to Top Button and Navbar Fixed ======*/
        $window.on('scroll', function () {
            //header fixed animation and control
            if ($window.scrollTop() > 0) {
                $(headerMenuWrapper).addClass('header-fixed');
            } else {
                $(headerMenuWrapper).removeClass('header-fixed');
            }

            //Show back to top
            if ($window.scrollTop() > 500) {
                $(backToTop).addClass('btn-active');
            } else {
                $(backToTop).removeClass('btn-active');
            }

        });

        /*===== back to top ======*/
        $document.on('click', '#back-to-top', function () {
            $($dom).animate({
                scrollTop: 0
            }, 800);
            return false;
        });

        /*==== card-carousel =====*/
        if ($(cardCarousel).length) {
            $(cardCarousel).owlCarousel({
                loop: true,
                items: 2,
                nav: false,
                dots: false,
                autoplay: true,
                smartSpeed: 500,
                margin: 30,
                responsive: {
                    // breakpoint from 0 up
                    0: {
                        items: 1
                    },
                    // breakpoint from 768 up
                    768: {
                        items: 2
                    }
                }
            });
        }

        /*==== Client logo =====*/
        if ($(clientLogo).length) {
            $(clientLogo).owlCarousel({
                loop: true,
                items: 6,
                nav: false,
                dots: false,
                smartSpeed: 700,
                autoplay: true,
                responsive: {
                    // breakpoint from 0 up
                    0: {
                        items: 1
                    },
                    // breakpoint from 425 up
                    425: {
                        items: 2
                    },
                    // breakpoint from 480 up
                    480: {
                        items: 2
                    },
                    // breakpoint from 767 up
                    767: {
                        items: 4
                    },
                    // breakpoint from 992 up
                    992: {
                        items: 6
                    }
                }
            });
        }

        /*==== testimonial-carousel =====*/
        if ($(testimonialCarousel).length) {
            $(testimonialCarousel).owlCarousel({
                loop: true,
                items: 3,
                nav: false,
                dots: true,
                smartSpeed: 700,
                autoplay: false,
                margin: 30,
                responsive: {
                    // breakpoint from 0 up
                    0: {
                        items: 1
                    },
                    // breakpoint from 768 up
                    768: {
                        items: 2
                    },
                    // breakpoint from 992 up
                    992: {
                        items: 3
                    }
                }
            });
        }

        /*==== testimonial-carousel-2 =====*/
        if ($(testimonialCarouselTwo).length) {
            $(testimonialCarouselTwo).owlCarousel({
                loop: true,
                items: 5,
                nav: false,
                dots: true,
                smartSpeed: 700,
                autoplay: false,
                margin: 30,
                responsive: {
                    // breakpoint from 0 up
                    0: {
                        items: 1
                    },
                    // breakpoint from 480 up
                    576: {
                        items: 2
                    },
                    // breakpoint from 991 up
                    991: {
                        items: 3
                    },
                    // breakpoint from 992 up
                    992: {
                        items: 4
                    },
                    // breakpoint from 1200 up
                    1200: {
                        items: 5
                    }
                }
            });
        }

        /*==== gallery-carousel =====*/
        if ($(galleryCarousel).length) {
            $(galleryCarousel).owlCarousel({
                loop: true,
                items: 1,
                nav: true,
                dots: true,
                smartSpeed: 700,
                autoplay: false,
                dotsData: true,
                navText: ["<i class=\"la la-chevron-left\"></i>", "<i class=\"la la-chevron-right\"></i>"]
            });
        }

        /*==== Magnificpopup =====*/
        if ($(videoPopupBtn).length) {
            $(videoPopupBtn).magnificPopup({
                type: 'video'
            });
        }

        /*==== Daterangepicker =====*/
        if ($(dateRangePicker).length) {
            $(dateRangePicker).daterangepicker({
                opens: 'right',
                singleDatePicker: true
            });
        }

        /*==== Quantity number increment control =====*/
        $document.on('click', '.input-number-increment', function () {
            var $input = $(this).parents('.input-number-group').find('.input-number');
            var val = parseInt($input.val(), 10);
            $input.val(val + 1);

        });

        /*==== Quantity number decrement control =====*/
        $document.on('click', '.input-number-decrement', function () {
            var $input = $(this).parents('.input-number-group').find('.input-number');
            var val = parseInt($input.val(), 10);
            $input.val(val - 1);
        });

        /*==== select2 =====*/
        // $('.location-option-field').select2({
        //     placeholder: "Location",
        //     allowClear: true
        // });
        //
        // $('.category-option-field').select2({
        //     placeholder: "Select category",
        //     allowClear: true
        // });
        //
        // $('.job-type-option-field').select2({
        //     placeholder: "Select Job Type",
        //     allowClear: true
        // });
        //
        // $('.experience-option-field').select2({
        //     placeholder: "Choose experience",
        //     allowClear: true
        // });
        //
        // $('.qualification-option-field').select2({
        //     placeholder: "Choose qualification",
        //     allowClear: true
        // });
        //
        // $('.choose-gender-option-field').select2({
        //     placeholder: "Gender",
        //     allowClear: true
        // });
        //
        // $('.job-category-option-field').select2({
        //     placeholder: "Choose One",
        //     allowClear: true
        // });
        //
        // $(".tag-option-field").select2({
        //     tags: true,
        //     placeholder: "e.g. PHP, responsibilites",
        //     tokenSeparators: [',', ' ']
        // });
        //
        // $(".location-tag-option-field").select2({
        //     tags: true,
        //     placeholder: "e.g. Australia",
        //     tokenSeparators: [',', ' ']
        // });
        //
        // $(".experience-tag-option-field").select2({
        //     tags: true,
        //     placeholder: "e.g. 3 Years",
        //     tokenSeparators: [',', ' ']
        // });
        //
        // $(".qualification-tag-option-field").select2({
        //     tags: true,
        //     placeholder: "e.g. Graduate",
        //     tokenSeparators: [',', ' ']
        // });
        //
        // $(".gender-tag-option-field").select2({
        //     tags: true,
        //     placeholder: "e.g. Male",
        //     tokenSeparators: [',', ' ']
        // });
        //
        // $(".search-tag-option-field").select2({
        //     tags: true,
        //     placeholder: "Please select",
        //     tokenSeparators: [',', ' ']
        // });
        //
        // $(".city-tag-option-field").select2({
        //     tags: true,
        //     placeholder: "Select a city",
        //     tokenSeparators: [',', ' ']
        // });
        // $(".current-salary-tag-option-field").select2({
        //     tags: true,
        //     placeholder: "Current salary",
        //     tokenSeparators: [',', ' ']
        // });
        // $(".expected-salary-tag-option-field").select2({
        //     tags: true,
        //     placeholder: "Expected salary",
        //     tokenSeparators: [',', ' ']
        // });
        // $(".languages-tag-option-field").select2({
        //     tags: true,
        //     placeholder: "Select languages",
        //     tokenSeparators: [',', ' ']
        // });
        //
        // $(".skill-option-field").select2({
        //     tags: true,
        //     placeholder: "Skill requirements",
        //     tokenSeparators: [',', ' ']
        // });
        // $(".business-tag-option-field").select2({
        //     placeholder: "Select business type",
        //     allowClear: true
        // });
        //
        // $(".short-option-field").select2({
        //     placeholder: "Short by",
        //     allowClear: true
        // });
        //
        // $(".reason-option-field").select2({
        //     placeholder: "Reason for contact",
        //     allowClear: true
        // });
        //
        // $(".industry-option-field").select2({
        //     placeholder: "Select industry",
        //     allowClear: true
        // });

        /*======= ui range slider ========*/
        if ($("#slider-range").length) {
            $("#slider-range").slider({
                range: true,
                min: 0,
                max: 500,
                values: [50, 290],
                slide: function (event, ui) {
                    $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
                }
            });
        }

        $("#amount").val("$" + $("#slider-range").slider("values", 0) +
            " - $" + $("#slider-range").slider("values", 1));


        /*==== Chosen select =====*/
        if ($(userChosenSelect).length) {
            $(userChosenSelect).chosen({
                no_results_text: "Oops, nothing found!",
                allow_single_deselect: true
            });
        }

        $(userChosenSelect).on('chosen:showing_dropdown', function (event, params) {
            var chosen_container = $(event.target).next('.chosen-container');
            var dropdown = chosen_container.find('.chosen-drop');
            var dropdown_top = dropdown.offset().top - $window.scrollTop();
            var dropdown_height = dropdown.height();
            var viewport_height = $window.height();

            if (dropdown_top + dropdown_height > viewport_height) {
                chosen_container.addClass('chosen-drop-up');
            }
        });

        $(userChosenSelect).on('chosen:hiding_dropdown', function (event, params) {
            $(event.target).next('.chosen-container').removeClass('chosen-drop-up');
        });

        /*==== team-carousel =====*/
        if ($(teamCarousel).length) {
            $(teamCarousel).owlCarousel({
                loop: true,
                items: 3,
                nav: true,
                dots: true,
                smartSpeed: 500,
                autoplay: false,
                margin: 30,
                navText: ["<i class='la la-angle-left'></i>", "<i class='la la-angle-right'></i>"],
                responsive: {
                    // breakpoint from 0 up
                    0: {
                        items: 1
                    },
                    // breakpoint from 768 up
                    768: {
                        items: 2
                    },
                    // breakpoint from 991 up
                    991: {
                        items: 2
                    },
                    // breakpoint from 992 up
                    992: {
                        items: 3
                    }
                }
            });
        }
        if ($(mediaCarousel).length) {
            $(mediaCarousel).owlCarousel({
                loop: true,
                items: 1,
                nav: true,
                dots: true,
                smartSpeed: 500,
                autoplay: false,
                margin: 30,
                navText: ["<i class='la la-angle-left'></i>", "<i class='la la-angle-right'></i>"],
            });
        }

        /*==== popular-job-carousel =====*/
        if ($(popularJobCarousel).length) {
            $(popularJobCarousel).owlCarousel({
                loop: true,
                items: 1,
                nav: false,
                dots: false,
                autoplay: true
            });
        }

        /*=========== circlechart ============*/
        if ($(circleChart).length) {
            $(circleChart).circlechart();
        }

        /*====  Tooltip =====*/
        $('[data-toggle="tooltip"]').tooltip();

        /*=========== Google map ============*/
        if ($("#map").length) {
            initMap('map', 40.717499, -74.044113, 'images/map-marker.png');
        }

        /*==== jqte text editor =====*/
        if ($(userTextEditor).length) {
            $(userTextEditor).jqte({
                placeholder: "Write your job description",
                formats: [
                    ["p", "Paragraph"],
                    ["h1", "Heading 1"],
                    ["h2", "Heading 2"],
                    ["h3", "Heading 3"],
                    ["h4", "Heading 4"],
                    ["h5", "Heading 5"],
                    ["h6", "Heading 6"],
                    ["pre", "Preformatted"]
                ]
            });
        }

        if ($(userTextEditorOne).length) {
            $(userTextEditorOne).jqte({
                placeholder: "General description",
                formats: [
                    ["p", "Paragraph"],
                    ["h1", "Heading 1"],
                    ["h2", "Heading 2"],
                    ["h3", "Heading 3"],
                    ["h4", "Heading 4"],
                    ["h5", "Heading 5"],
                    ["h6", "Heading 6"],
                    ["pre", "Preformatted"]
                ]
            });
        }

        if ($(userTextEditorTwo).length) {
            $(userTextEditorTwo).jqte({
                placeholder: "Overview of you or your firm.  Tell us about yourself or your firm.  Be descriptive.  The more entrepreneurs can read about you or your firm, the better your experience will be.  Were you an entrepreneur in the past?  What are you looking for in a company?",
                formats: [
                    ["p", "Paragraph"],
                    ["h1", "Heading 1"],
                    ["h2", "Heading 2"],
                    ["h3", "Heading 3"],
                    ["h4", "Heading 4"],
                    ["h5", "Heading 5"],
                    ["h6", "Heading 6"],
                    ["pre", "Preformatted"]
                ]
            });
        }

        if ($(userTextEditorThree).length) {
            $(userTextEditorThree).jqte({
                placeholder: "Enter long description for your online resume",
                formats: [
                    ["p", "Paragraph"],
                    ["h1", "Heading 1"],
                    ["h2", "Heading 2"],
                    ["h3", "Heading 3"],
                    ["h4", "Heading 4"],
                    ["h5", "Heading 5"],
                    ["h6", "Heading 6"],
                    ["pre", "Preformatted"]
                ]
            });
        }

        if ($(userTextEditorFour).length) {
            $(userTextEditorFour).jqte({
                placeholder: "Briefly describe about your company where you worked before",
                formats: [
                    ["p", "Paragraph"],
                    ["h1", "Heading 1"],
                    ["h2", "Heading 2"],
                    ["h3", "Heading 3"],
                    ["h4", "Heading 4"],
                    ["h5", "Heading 5"],
                    ["h6", "Heading 6"],
                    ["pre", "Preformatted"]
                ]
            });
        }

        if ($(userTextEditorFive).length) {
            $(userTextEditorFive).jqte({
                placeholder: "Provide an overview of this manager.  Include biographical information and special skills that are relevant to the manager's role",
                formats: [
                    ["p", "Paragraph"],
                    ["h1", "Heading 1"],
                    ["h2", "Heading 2"],
                    ["h3", "Heading 3"],
                    ["h4", "Heading 4"],
                    ["h5", "Heading 5"],
                    ["h6", "Heading 6"],
                    ["pre", "Preformatted"]
                ]
            });
        }

        if ($(userTextEditorSix).length) {
            $(userTextEditorSix).jqte({
                placeholder: "Describe what your company does in short. This will show in the initial summary of your company that investors view.",
                formats: [
                    ["p", "Paragraph"],
                    ["h1", "Heading 1"],
                    ["h2", "Heading 2"],
                    ["h3", "Heading 3"],
                    ["h4", "Heading 4"],
                    ["h5", "Heading 5"],
                    ["h6", "Heading 6"],
                    ["pre", "Preformatted"]
                ]
            });
        }

        if ($(userTextEditorSeven).length) {
            $(userTextEditorSeven).jqte({
                placeholder: "Describe what your company does in detail",
                formats: [
                    ["p", "Paragraph"],
                    ["h1", "Heading 1"],
                    ["h2", "Heading 2"],
                    ["h3", "Heading 3"],
                    ["h4", "Heading 4"],
                    ["h5", "Heading 5"],
                    ["h6", "Heading 6"],
                    ["pre", "Preformatted"]
                ]
            });
        }

        /*==== emoji-picker =====*/
        if ($(emojiPicker).length) {
            $(emojiPicker).emojioneArea({
                pickerPosition: "top"
            });
        }
        /*==== Text-area =====*/
        // const messageEle = document.getElementById('message');
        // const counterEle = document.getElementById('counter');
        // const maxLength = messageEle.getAttribute('maxlength');
        // const currentLength = messageEle.value.length;
        // counterEle.innerHTML = `${currentLength}/${maxLength}`;
        // messageEle.addEventListener('input', function (e) {
        //     const target = e.target;

        //     // Get the `maxlength` attribute
        //     const maxLength = target.getAttribute('maxlength');

        //     // Count the current number of characters
        //     const currentLength = target.value.length;

        //     counterEle.innerHTML = `${currentLength}/${maxLength}`;
        // });
        //--------------
        // const messageEle = document.getElementById('message');
        // const counterEle = document.getElementById('counter');
        messageEle.each(function () {
            var maxLength = $(this).attr('maxlength');
            var currentLength = $(this).val().length;
            $(this).closest('.form-group').find('.counter-text-area').html(`${currentLength}/${maxLength}`);
        });

        // counterEle.innerHTML = `${currentLength}/${maxLength}`;
        messageEle.on('input', function (e) {
            // Get the `maxlength` attribute
            var maxLength = $(this).attr('maxlength');
            // Count the current number of characters
            var currentLength = $(this).val().length;

            $(this).closest('.form-group').find('.counter-text-area').html(`${currentLength}/${maxLength}`);
        });

    });

})(jQuery);

