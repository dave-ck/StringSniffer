from flask import Flask, request
from string_sniffer import match_string

app = Flask(__name__)


@app.route('/')
def home():
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run()


@app.route('/sniff', methods=["POST"])
def sniff():
    query = request.form["queryString"]
    hits = match_string(query)
    return hits
