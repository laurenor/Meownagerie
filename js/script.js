//gets data from instagram server
function processInstaData(obj) {
  console.log(obj);
  for (var i=0; i<obj['data'].length; i++) {
    thumb_url = obj['data'][i]['images']['thumbnail']['url'];
    standard_url = obj['data'][i]['images']['standard_resolution']['url'];
    caption = obj['data'][i]['caption']['text'];
    link = obj['data'][i]['link'];
    // console.log(caption);
    img_id = i;
    prev = i-1;
    next = i+1;
    // selectedBreed();
    addImages(thumb_url, img_id);
    addLightboxHTML(standard_url, img_id, caption, link, prev, next);
  }
}

//adds script to body
var tag = "fluffycat";
var pics = document.createElement('script');
pics.src = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?callback=processInstaData&count=30&access_token=16384709.6ac06b4.49b97800d7fd4ac799a2c889f50f2587";
document.body.appendChild(pics);

function selectedBreed(evt) {
    var tag = document.getElementById("tag").value;
    console.log(tag);
    setTag(tag);
    evt.preventDefault();
}

function setTag(tag) {
    document.getElementById('gallery').innerHTML = "";
    var pics = document.createElement('script');
    //note: access token only shown here for purpose of coding challenge; in production,
    //API calls would be made on server side and token would be stored in an environment variable.
    pics.src = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?callback=processInstaData&count=30&access_token=16384709.6ac06b4.49b97800d7fd4ac799a2c889f50f2587";
document.body.appendChild(pics);
}

//adds images to #gallery div
function addImages(thumb_url, img_id) {
    var img = document.createElement('img');
    img.src = thumb_url;
    gallery = document.getElementById('gallery');
    gallery.innerHTML += '<a href="#' + img_id + '"><img src="' + thumb_url + '"></a>';
}

function addLightboxHTML(standard_url, img_id, caption, link, prev, next) {
    // trims long captions to 140 characters
    capt = '';
    if (caption.length > 140 ) {
        for (var i=0; i<140; i++) {
        capt += caption[i];
        }
        capt += "...";
    }

    lightbox.innerHTML += '<span class="lightbox" id="' + img_id + '"><a href="#_"><div class="close">close x</div></a><div class="prevnext"><a href="#' + prev + '" class="left"><< previous</a><a href="#' + next + '" class="right">next >></a></div><br><a href="' + link + '"><img src="' + standard_url + '"></a><br><div class="caption">'+capt+' </div></span>';    
}
