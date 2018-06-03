from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from algorithm import algorithm_result

app = Flask(__name__)
CORS(app, support_credentials=True)


@app.route('/', methods=['POST'])
@cross_origin(supports_credentials=True)
def give_data():
    json_data = request.get_json()
    algorithm_result_data = algorithm_result(json_data['stats'])
    your_points = algorithm_result_data[0][0]
    all_points = algorithm_result_data[0][1]
    percentage = your_points * 100 / all_points
    return jsonify(your_points=your_points, all_points=all_points, percentage=round(percentage))


if __name__ == '__main__':
    app.run(host='0.0.0.0')
