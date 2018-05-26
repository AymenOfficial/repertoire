<?php

class Database {

    var $server_name = "";
    var $db_username = "";
    var $db_password = "";
    var $db_name = "";

    var $created_connection;
    var $connected = false;

    public function __construct($server_name, $db_username, $db_password, $db_name) {
        $this->server_name = $server_name;
        $this->db_username = $db_username;
        $this->db_password = $db_password;
        $this->db_name = $db_name;
        //"Database Object instance created.";
    }

    public function __connect() {
        $conn = new mysqli($this->server_name,
            $this->db_username,
            $this->db_password,
            $this->db_name);
        // Check connection
        if (mysqli_connect_error()) {
            die("Database connection failed: " . mysqli_connect_error());
        }
        $this->created_connection = $conn;
        $this->connected = true;
    }

    public function __undo_connect() {
        $this->created_connection->close();
        $this->connected = false;
    }

    public function mysql_create_table($sql) {
        // sql to create table
        if ($this->created_connection->query($sql) === true) {
            //"Table MyGuests created successfully";
        } else {
            echo "Error creating table: " . $this->created_connection->error;
        }
    }

    public function mysql_insert_table($table, $values, $keys = "") {
        $sql = "INSERT INTO " . $table;
        if($sql !== "") {
            $sql .= " " . $keys . " ";
        }

        $sql .= " VALUES (";
        foreach ($values as $value) {
                $sql .= "'" . $value . "', ";
        }
        $sql = substr($sql, 0, strlen($sql) - 2);
        $sql .= ")";

        if ($this->created_connection->query($sql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $this->created_connection->error;
        }
    }

    public function mysql_select_all_from_table($table, $condition = "") {
        $sql = "SELECT * FROM " . $table;
        if($condition !== "" ) {
            $sql .= " " . $condition;
        }
        return $this->created_connection->query($sql);
    }

    public function mysql_select_single_from_table($table, $column_name) {
        $sql = "SELECT" . $column_name . "FROM " . $table;
        return $this->created_connection->query($sql);
    }

    public function mysql_delete_from_table($table, $id) {
        $sql = "DELETE FROM " . $table . " WHERE id =" . $id;
        return $this->created_connection->query($sql);
    }


    public function get_database_username() {
        return $this->db_username;
    }

    public function get_database_password() {
        return $this->db_password;
    }

    public function set_database_username($db_username) {
        $this->db_username = $db_username;
    }

    public function set_database_password($db_password) {
        $this->db_password = $db_password;
    }



}
