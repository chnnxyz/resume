from flask import Flask, render_template

app = Flask(__name__)

@app.route("/", methods=['GET'])
def index():
    return render_template("index.html")

@app.route('/cv', methods=['GET'])
def resume():
    return render_template('CV.html')