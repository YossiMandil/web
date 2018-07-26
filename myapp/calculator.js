var http = require('http');
var fs = require('fs');
module.exports = {

    calculateNextState: function (jsonState, input) {

        if (jsonState == null) {
            return module.exports.initialize(input);
        }
    
        var a = JSON.parse(jsonState);
        
        if ('+-/*='.indexOf(input) > -1) {
            a = module.exports.updateOperator(a, input);   
                
        } else  {
            // check if its a number
            if ("0123456789".indexOf(input) > -1){
                a = module.exports.updateNumber(a, input);
            }
            else{
                a = JSON.parse(module.exports.initialize(''));
                a.display = 'Error!';
            } 
        }
        return JSON.stringify(a);
    },


    initialize: function (input) {
    jsonState =  {"left_exp" : "",
    "right_exp" : "",
    "operator" : "",
    "display" : ""};
    jsonState.left_exp = input;
    jsonState.display = input;
    return JSON.stringify(jsonState);
},


    updateOperator: function (jsonState, operator){
        if(jsonState.display == 'Error!'){
            return jsonState;
        }
        if (jsonState.left_exp == ''){
            jsonState.left_exp = jsonState.display;
        }

        if(jsonState.right_exp == ''){
            if(jsonState.operator != ''){
                var s = JSON.parse(module.exports.initialize(''));
                s.display = 'Error!';
                return s;
            }
            jsonState.operator = operator;
        }
        else{
            jsonState.display = module.exports.calculateValue(jsonState.left_exp,jsonState.operator,
                jsonState.right_exp);
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
    },

    calculateValue: function  (left_exp_str, operator, right_exp_str) {
    var left_exp = parseInt(left_exp_str);
    var right_exp = parseInt(right_exp_str);
    switch(operator){
        case '+':
            return (left_exp+right_exp).toString();
        case '-': 
            return (left_exp-right_exp).toString();
        case '*':
            return (left_exp*right_exp).toString();
        case '/':
            return (left_exp/right_exp).toString();
        }
    },

    updateNumber: function (jsonState, input) {
        if (jsonState.display == 'Error'){
            return module.exports.initialize(input);
        }
        // if we want to update left expr
        if (jsonState.operator == "") {
            jsonState.display = jsonState.left_exp += input;
            
        }else{
            jsonState.display = jsonState.right_exp += input;
        }
        return jsonState;
    }
};