var NUM_IMAGES = 30;

document.addEventListener('DOMContentLoaded', loadGallery());

//adds script to body
function loadGallery() {
    var gallery = document.getElementById("gallery");    
    var tag = "norwegianforestcat";
    var pics = document.createElement("script");
    //note: access token only shown here for purpose of coding challenge; in production,
    //API calls would be made on server side and token would be stored in an environment variable.
    pics.src = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?callback=processInstaData&count=" + NUM_IMAGES + "&access_token=16384709.6ac06b4.49b97800d7fd4ac799a2c889f50f2587";
    document.body.appendChild(pics);
    document.body.removeChild(pics);
}

//gets data from instagram server
function processInstaData(instagramData) {
    var images = instagramData['data'];
    for (var i=0; i<images.length; i++) {
        var pic = images[i];
        var thumbUrl = pic.images.thumbnail.url;
        var standardUrl = pic.images.standard_resolution.url;
        var caption = pic.caption.text;
        var link = pic.link;
        var imgId = i;
        if (imgId == 0) {
            prev = NUM_IMAGES - 1;
        }
        else {
            prev = i-1;
        }
        if (imgId == NUM_IMAGES - 1) {
            next = 0;
        }
        else {
            next = i+1;
        }
        addImages(thumbUrl, imgId);
        addLightboxHTML(standardUrl, imgId, caption, link, prev, next);
  }
}

function selectedBreed(form) {
    var tag = document.getElementById("tag").value;
    setTag(tag);
}

function setTag(tag) {
    document.getElementById('gallery').innerHTML = "";
    document.getElementById('lightbox').innerHTML = "";
    var pics = document.createElement('script');
    //note: access token only shown here for purpose of coding challenge; in production,
    //API calls would be made on server side and token would be stored in an environment variable.
    pics.src = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?callback=processInstaData&count=30&access_token=16384709.6ac06b4.49b97800d7fd4ac799a2c889f50f2587";
    document.body.appendChild(pics);
    document.body.removeChild(pics);
}

//adds images to #gallery div
function addImages(thumbUrl, imgId) {
    var img = document.createElement('img');
    img.src = thumbUrl;
    gallery = document.getElementById('gallery');
    gallery.innerHTML += '<a href="#' + imgId + '"><img src="' + thumbUrl + '"></a>';
}

function addLightboxHTML(standardUrl, imgId, caption, link, prev, next) {
    // trims long captions to 140 characters
    if (caption.length > 140 ) {
        caption = caption.slice(0,140) + '...';
    }

    lightbox.innerHTML += '<span class="lightbox" id="' + imgId + '"><a href="#_"><div class="close">close x</div></a><div class="prevnext"><a href="#' + prev + '" class="left">&lt;&lt; </a><a href="#' + next + '" class="right"> &gt;&gt;</a></div><br><a href="' + link + '" target="_blank"><img src="' + standardUrl + '"></a><br><div class="caption">' + caption + ' </div></span>';    
}
