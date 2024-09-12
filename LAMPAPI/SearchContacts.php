<?php

    //get JSON
    $inData = getRequestInfo();

    //init search results as empty string & count as 0
    $searchResults = "";
    $searchCount = 0;

    //connect to database
    $conn = new mysqli("localhost", "Team14", "COP4331-Team14X", "COP4331");
    if ($conn->connect_error) {
        returnWithError($conn->connect_error);
    }
    else{
        //prepare SQL statement to search for contacts matching inputted name and userID
        $stmnt = $conn->prepare("select * from Contacts where Name like ? and UserID=?");
        $contactName = "%" . $inData["search"] . "%";
        $stmnt->bind_param("ss", $contactName, $inData["userID"]);
        $stmnt->execute();

        $result = $stmnt->get_result();

        //iterate through results and append them to searchResults string
        while($row = $result->fetch_assoc()) {
            if($searchCount > 0){
                $searchResults .= ",";
            }
            $searchCount++;
            $searchResults .= '{"Name":"' . $row["Name"]. '", "Email":"' .$row["Email"]. '", "Phone":"' .$row["Phone"]. '", "ID":"' .$row["ID"]. '", "UserID":"' .$row["UserID"]. '"}';

        }

        //if no records found
        if($searchCount == 0){
            returnWithError("No Records Found");
        }
        //if records found
        else{
            returnWithInfo($searchResults);
        }

        $stmnt->close();
        $conn->close();
    }

    //------- Functions ---------
    function getRequestInfo(){
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson($obj){
        header('Content-type: application/json');
        echo $obj;
    }

    function returnWithError($err){
        //$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
        $retValue = '{"error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }

    function returnWithInfo($searchResults){
        $retValue = '{"results":[' . $searchResults . '],"error":""}';
        sendResultInfoAsJson($retValue);
    }
