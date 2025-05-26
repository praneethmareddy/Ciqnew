from flask import Flask, request, send_file
import pandas as pd
from io import BytesIO

app = Flask(__name__)

@app.route('/query', methods=['GET', 'POST'])
def query():
    # Replace this with your actual query result (a list of dicts or DataFrame)
    data = [
        {"name": "Alice", "age": 30},
        {"name": "Bob", "age": 25},
        {"name": "Charlie", "age": 35}
    ]
    df = pd.DataFrame(data)

    # Save DataFrame to Excel in-memory
    output = BytesIO()
    with pd.ExcelWriter(output, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Results')

    output.seek(0)

    return send_file(
        output,
        download_name="query_results.xlsx",
        as_attachment=True,
        mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )

if __name__ == '__main__':
    app.run(debug=True)
