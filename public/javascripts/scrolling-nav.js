////jQuery to collapse the navbar on scroll
//$(window).scroll(function() {
//    if ($(".navbar").offset().top > 50) {
//        $(".navbar-fixed-top").addClass("top-nav-collapse");
//        $(".navbar-open").hide();
//    } else {
//        $(".navbar-fixed-top").removeClass("top-nav-collapse");
//        $(".navbar-open").show();
//    }
////});

$(window).resize(function() {
	$(".navbar").data().offset.top = $(".capa").height() - 3;
});