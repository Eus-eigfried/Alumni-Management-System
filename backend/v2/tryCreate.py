def runthis():
    err = ""
    err = mysql.connector.Error
    try:
        # Initialize the database connection
        cursor = db.cursor()
        # SQL to create the table if it doesn't exist
        createTable = """
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(100)
        );
        """
        # SQL to insert records into the users table
        createEntries = """INSERT INTO users (name, email)
        VALUES ('fullstack', 'fullstack@gmail.com'), ('frontend', 'frontend@gmail.com'), ('backend', 'backend@gmail.com');"""
        # Try to select from the users table to check if it exists
        cursor.execute("SELECT 1 FROM users LIMIT 1;")
        # If the table exists, this statement will succeed, and we can insert entries
        print("Table 'users' exists. Inserting entries.")
        # If the table doesn't exist, the SELECT query will raise an error
        if (err == mysql.connector.errorcode.ER_NO_SUCH_TABLE):
            # Table doesn't exist, create it
            print("Table 'users' doesn't exist. Creating table.")
            cursor.execute(createTable)
            cursor.execute(createEntries)
        # Insert entries after creating the table
        else:
            # If the error is not about the table missing, raise the error
            print("Table 'users' exist. Check if Entries are Added.")
            cursor.execute(createEntries)
    except mysql.connector.Error as err:
        print(f"Error: {err}")
runthis()