# backend/v2/main.py
from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import mysql.connector
import datetime

app = Flask(__name__)
CORS(app)

# MySQL configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'  # your MySQL username
app.config['MYSQL_PASSWORD'] = ''  # your MySQL password
app.config['MYSQL_DB'] = 'crud_db'
app.config['MYSQL_TABLE'] = 'users'

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",  # replace with your MySQL password
    database="crud_db"
)

cursor = db.cursor()
createTable = """
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    yearGraduated TEXT,
    course VARCHAR(100),
    birthDate TEXT,
    address TEXT,
    contactNo VARCHAR(55),
    email VARCHAR(100),
    currentStatus TEXT,
    is_Active TINYINT,
    time_created TEXT
);
"""
cursor.execute(createTable)

mysql = MySQL(app)
# create
@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    name = data['name']
    yearGraduated = data['yearGraduated']
    course=data['course']
    birthDate = data['birthDate']
    address = data['address']
    contactNo = data['contactNo']
    currentStatus = data['currentStatus']
    email = data['email']
    # Set the active field to 1 (active)
    is_Active = data['is_Active']
    # Get the current UTC time for time_created
    clock = datetime.datetime.now()
    # standard date
    dateNow  = (clock.strftime("%x"))
    # standard time w/o date
    localTimeNow = (clock.strftime("%X"))
    time_created  = (dateNow + " " +localTimeNow)
    # excursion
    cursor = mysql.connection.cursor()
    cursor.execute('''
        INSERT INTO users (name, yearGraduated, course, birthDate, address, contactNo, email, currentStatus, is_Active, time_created)
        VALUES ( %s, %s, %s, %s, %s, %s, %s,%s, %s, %s)
    ''', ( name, yearGraduated, course, birthDate, address, contactNo, email, currentStatus, is_Active, time_created))
    mysql.connection.commit()
    return jsonify({'message': 'User created successfully'}), 201

# normal read:
@app.route('/users-normal', methods=['GET'])
def get_usersNormal():
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM users')
    users = cursor.fetchall()
    return jsonify(users)

# read by active status
@app.route('/users', methods=['GET'])
def get_users():
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM users ORDER BY is_Active DESC')
    # Assumes 'is_Active' is a boolean column
    users = cursor.fetchall()
    return jsonify(users)


# update details
@app.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    name = data['name']
    yearGraduated = data['yearGraduated']
    course = data['course']
    birthDate = data['birthDate']
    address = data['address']
    contactNo = data['contactNo']
    email = data['email']
    currentStatus = data['currentStatus']
    cursor = mysql.connection.cursor()
    try:
        cursor.execute('''UPDATE users
                        SET name=%s, yearGraduated=%s, course=%s, birthDate=%s, address=%s, contactNo=%s, email=%s, currentStatus=%s
                        WHERE id=%s''',
                    (name, yearGraduated, course, birthDate, address, contactNo, email, currentStatus, id))
        mysql.connection.commit()
        # Check if the update was successful
        if cursor.rowcount == 0:
            return jsonify({'message': 'User not found'}), 404
        return jsonify({'message': 'User updated successfully'}), 200
    except Exception as e:
        mysql.connection.rollback()  # In case something goes wrong, rollback
        return jsonify({'message': str(e)}), 500
    finally:
        cursor.close()


# update active status
@app.route('/users-active/<int:id>', methods=['PUT'])
def update_status(id):
    data = request.get_json()
    is_Active = data['is_Active']
    cursor = mysql.connection.cursor()
    cursor.execute('UPDATE users SET is_Active=%s WHERE id=%s', (is_Active, id))
    mysql.connection.commit()
    return jsonify({'message': 'User Active Status updated successfully'})

# delete
@app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    cursor = mysql.connection.cursor()
    cursor.execute('DELETE FROM users WHERE id=%s', (id,))
    mysql.connection.commit()
    return jsonify({'message': 'User deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)