from flask import Flask, render_template

app = Flask(__name__)

@app.route("/", methods=['GET'])
def index():
    return render_template("index.html")

@app.route('/cv', methods=['GET'])
def resume():
    return render_template('CV.html')

@app.route('/data_science_101', methods=['GET'])
def ds_bootcamp():
    return render_template('ds_bc.html')