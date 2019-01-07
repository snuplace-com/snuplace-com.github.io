$(function () {
    /**
    * Image galleries
    */
    initializeGalleries();
})

function initializeGalleries() {
    var attrs = {};
    var classes = $("a[data-imagelightbox]").map(function (indx, element) {
        var key = $(element).attr("data-imagelightbox");
        attrs[key] = true;
        return attrs;
    });
    var attrsName = Object.keys(attrs);

    attrsName.forEach(function (entry) {
        $("[data-imagelightbox='" + entry + "']").imageLightbox({
            overlay: true,
            arrows: true,
            button: true,
            caption: true,
        });
    });
}
