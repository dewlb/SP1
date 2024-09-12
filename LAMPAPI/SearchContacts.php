<?php

    //get JSON
    $inData = getRequestInfo();

    //init search results as empty string
    $searchResults = "";
    $searchCount = 0;

    $conn = new mysqli("localhost", "Team14", "COP4331-Team14X", "COP4331");
    if ($conn->connect_error) {
        returnWithError($conn->connect_error);
    }
    else{
        $stmnt = $conn->prepare("select * from Contacts where Name like ? and UserID=?");
        $contactName = "%" . $inData["search"] . "%";
        $stmnt->bind_param("ss", $contactName, $inData["userID"]);
        $stmnt->execute();

        $result = $stmnt->get_result();

        while($row = $result->fetch_assoc()) {
            if($searchCount > 0){
                $searchResults .= "," . PHP_EOL;
            }
            //increment search count and append search results
            $searchCount++;
            $searchResults .= '{"Name":"' . $row["Name"]. '", "Email":"' .$row["Email"]. '", "Phone":"' .$row["Phone"]. '", "ID":"' .$row["ID"]. '", "UserID":"' .$row["UserID"]. '"}';

        }

        if($searchCount == 0){
            returnWithError("No Records Found");
        }
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
