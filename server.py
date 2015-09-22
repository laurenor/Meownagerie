import os
from flask import Flask, render_template, redirect, json, request, session, jsonify
from jinja2 import StrictUndefined
from instagram.client import InstagramAPI

app = Flask(__name__)

app.secret_key = 'hellocat'
app.jinja_env.undefined = StrictUndefined


CONFIG = {
    'client_id': os.environ.get('INSTAGRAM_CLIENT_ID'),
    'client_secret': os.environ.get('INSTAGRAM_CLIENT_SECRET'),
    'redirect_uri': os.environ.get('REDIRECT_URI')
}

api = InstagramAPI(**CONFIG)


@app.route('/')
def index():
	"""Return index page"""
	return render_template('index.html')

@app.route('/tag_search')
def tag_search():
    # access_token = request.session['access_token']
    content = "<h2>Tag Search</h2>"
    # if not access_token:
    #     return 'Missing Access Token'
    # try:
    api = client.InstagramAPI(access_token=access_token, client_secret=CONFIG['client_secret'])
    tag_search, next_tag = api.tag_search(q="mainecoon")
    tag_recent_media, next = api.tag_recent_media(tag_name=tag_search[0].name)
    photos = []
    for tag_media in tag_recent_media:
        photos.append('<img src="%s"/>' % tag_media.get_standard_resolution_url())
    content += ''.join(photos)
    

if __name__ == "__main__":
    app.debug = True

    # Use the DebugToolbar
    # DebugToolbarExtension(app)

    app.run()