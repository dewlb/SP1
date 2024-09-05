<?php

    //get JSON
    $inData = getRequestInfo();

    //get user info from JSON
    $username = $inData["username"];
    $password = $inData["password"];
    $firstName = $inData["firstName"];
    $lastName = $inData["lastName"];


    // connect to database
    $conn = new mysqli("localhost", "Team14", "COP4331-Team14X", "COP4331");

    // check connection
    if ($conn->connect_error) {
        returnWithError($conn->connect_error);
    }
    else{
        // prepare SQL statement to check if username already exists
        $stmt = $conn->prepare("SELECT Login FROM Users WHERE Login = ?");

        // bind parameters & execute
        $stmt->bind_param("s", $username);
        $stmt->execute();

        // get result
        $result = $stmt->get_result();

        if($result->num_rows > 0){
            returnWithError("Username already exists");
        }
        else{
            // prepare SQL statement to create account
            $stmt = $conn->prepare("INSERT INTO Users (Login, Password, FirstName, LastName) VALUES (?, ?, ?, ?)");

            $stmt->bind_param("ssss", $username, $password, $firstName, $lastName);

            // execute insertion query
            if($stmt->execute()){
                returnWithError("None; account created");
            }
            else{
                returnWithError("Error creating account");
            }
        }

        // close statement & connection
        $stmt->close();
        $conn->close();
    }

    //Function Definitions
    function getRequestInfo(){
        return json_decode(file_get_contents("php://input"), true);
    }

    function sendResultInfoAsJson($obj){
        header('Content-type: application/json');
        echo $obj;
    }

    function returnWithError($err){
        $retValue = '{"error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }

