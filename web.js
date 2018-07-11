var http = require('http');
var fs = require('fs');


var jsonStateVar = {
    "left_exp" : "",
    "right_exp" : "",
    "operator" : "",
    "display" : ""
};

var operators = {
    "+" : function(left_exp, right_exp) {return left_exp + right_exp},
    "-" : function(left_exp, right_exp) {return left_exp - right_exp},
    "*" : function(left_exp, right_exp) {return left_exp * right_exp},
    "/" : function(left_exp, right_exp) {return left_exp / right_exp},
    "=" : {}
};


function initialize (input) {
    jsonState = jsonStateVar;
    jsonState.left_exp = input;
    jsonState.display = input;
    return JSON.stringify(jsonState);
}

function calculateNextState(jsonState, input) {

    if (jsonState == null) {
        return initialize(input);
    }

    var a = JSON.parse(jsonState);
    
    if (operators.hasOwnProperty(input)) {
        a = updateOperator(a, input);   
            
    } else  {
        a = updateNumber(a, input);
    }
    return JSON.stringify(a);
}


function updateOperator(jsonState, operator){
    if (jsonState.left_exp == ''){
        jsonState.left_exp = jsonState.display;
    }

    if(jsonState.right_exp == ''){
        jsonState.operator = operator;
    }
    else{
        jsonState.display = calculateValue(jsonState.left_exp,jsonState.operator,jsonState.right_exp);
        jsonState.right_exp = '';
        if (operator == '='){
            jsonState.operator = '';
            jsonState.left_exp = '';
        }
        else{
            jsonState.left_exp = jsonState.display;
            jsonState.operator = operator;
        }
    }
    return jsonState;
}

function calculateValue (left_exp_str, operator, right_exp_str) {
    var left_exp = parseInt(left_exp_str);
    var right_exp = parseInt(right_exp_str);
    return operators[operator](left_exp, right_exp).toString();
}

function updateNumber(jsonState, input) {
    // if we want to update left expr
    if (jsonState.operator == "") {
        jsonState.display = jsonState.left_exp += input;
        
    }else{
        jsonState.display = jsonState.right_exp += input;
    }
    return jsonState;
}

http.createServer(function(req, res){
    let s = null
    s = calculateNextState(null, "1");
    console.log(JSON.parse(s).display) // 1
    s = calculateNextState(s, "2")
    console.log(JSON.parse(s).display) // 12
    s = calculateNextState(s, "+")
    console.log(JSON.parse(s).display) // 12
    s = calculateNextState(s, "4")
    console.log(JSON.parse(s).display) // 4
    s = calculateNextState(s, "3" )
    console.log(JSON.parse(s).display) // 43
    s = calculateNextState(s, "=")
    console.log(JSON.parse(s).display) // 55
    s = calculateNextState(s, "+")
    console.log(JSON.parse(s).display) // 55
    s = calculateNextState(s, "1")
    console.log(JSON.parse(s).display) // 1
    s = calculateNextState(s, "=")
    console.log(JSON.parse(s).display) // 56
    s = calculateNextState(s, "5")
    console.log(JSON.parse(s).display) // 5
}).listen(80);
