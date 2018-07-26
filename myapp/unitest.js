var request = require('request');
var web = require('./calculator');
var http = require('http');
var fs = require('fs');


function initialize(){
    return web.calculateNextState(null, "1");
}

function testUpdateNumber(s){
    var failed = false;
    var testNumber = 1;
    var updateNumber = web.updateNumber;

    //test 1
    s = updateNumber(JSON.parse(s),'5');
    if(s.left_exp != '15'|| s.display != '15'){
        testFaild(s,testNumber,"expected left: 15, display: 15");
        failed = true;
    }
    testNumber++;

     //test 2
     s = updateNumber(s,'4');
     if(s.left_exp != '154'|| s.display != '154'){
         testFaild(s,testNumber,"expected left: 154, display: 154");
         failed = true;
     }
     testNumber++;

     //test 3
     s.operator = '+'
     s = updateNumber(s,'2')
     if(s.left_exp != '154'|| s.display != '2' || s.right_exp != '2'){
         testFaild(s,testNumber,"expected left: 15, right: 2, display: 2");
         failed = true;
     }
     testNumber++;

     //test 4
     s = updateNumber(s,'0')
     if(s.left_exp != '154'|| s.display != '20' || s.right_exp != '20'){
         testFaild(s,testNumber,"expected left: 15, right: 2, display: 2");
         failed = true;
     }
     testNumber++;
     return failed;
}

function testCalculateValue(){
    var failed = false;
    var testNumber = 1;
    var calculateValue = web.calculateValue;

    //test 1
    res = calculateValue('45','+','9');
    if(res != '54'){
        testFaild(null,testNumber,"expected 54 got "+ res);
        failed = true;
    }
    testNumber++;

     //test 2
    res = calculateValue('32','-','19');
    if(res != '13'){
        testFaild(null,testNumber,"expected 13 got "+ res);
        failed = true;
    }
    testNumber++;

     //test 3
    res = calculateValue('5','*','8');
    if(res != '40'){
        testFaild(null,testNumber,"expected 40 got "+ res);
        failed = true;
    }
    testNumber++;

     //test 4
    res = calculateValue('1024','/','256');
    if(res != '4'){
        testFaild(null,testNumber,"expected 4 got "+ res);
        failed = true;
    }
    testNumber++;
     return failed;
}

function testUpdateOperator(s){
    var failed = false;
    var testNumber = 1;
    var updateOperator = web.updateOperator;
    var updateNumber = web.updateNumber;

    //test 1
    s = updateOperator(JSON.parse(s),'+');
    if(s.left_exp != '1'|| s.display != '1' || s.operator != '+'){
        testFaild(s,testNumber,"expected left: 1, operator: +, display: 1");
        failed = true;
    }
    testNumber++;

     //test 2
     s = updateNumber(s,'4');
     s= updateOperator(s,'=')
     if(s.left_exp != ''|| s.display != '5', s.right_exp != '' | s.operator != ''){
         testFaild(s,testNumber,"expected left: '', display: 5, right: '', operator: ''");
         failed = true;
     }
     testNumber++;

     //test 3
     s = updateOperator(s,'-')
     if(s.left_exp != '5'|| s.display != '5' || s.right_exp != '' || s.operator != '-'){
         testFaild(s,testNumber,"expected left: 5, right: '', display: 5, operator: -");
         failed = true;
     }
     testNumber++;

     //test 4
     s = updateNumber(s,'3')
     s = updateOperator(s, '*')
     if(s.left_exp != '2'|| s.display != '2' || s.right_exp != '' || s.operator != '*'){
        testFaild(s,testNumber,"expected left: 2, right: '', display: 2, operator: *");
        failed = true;
    }
    testNumber++;
     return failed;
}

function tetsCalculateNextState(s){
    var failed = false;
    var testNumber = 1;
    var updateOperator = web.updateOperator;
    var calculateNextState = web.calculateNextState;

    s = calculateNextState(null, "1");
    s = JSON.parse(s);

    //test 1
    if(s.left_exp != "1" || s.display != "1") {
        testFaild(s, testNumber, "expected left: 1, right: '', display: 1, operator: ''");
        failed = true;
    }
    testNumber++;

    //test 2
    s = calculateNextState(JSON.stringify(s) , "0");
    s = JSON.parse(s);
    if(s.left_exp != "10" || s.display != "10") {
        testFaild(s, testNumber, "expected left: 10, right: '', display: 10, operator: ''");
        failed = true;
    }

    testNumber++;

    //test 3
    s = calculateNextState(JSON.stringify(s) , "+");
    s = JSON.parse(s);
    if(s.left_exp != "10" || s.display != "10" || s.operator != "+") {
        testFaild(s, testNumber, "expected left: 10, right: '', display: 10, operator: +");
        failed = true;
    }

    testNumber++;

    //test 4
    s = calculateNextState(JSON.stringify(s) , "4");
    s = JSON.parse(s);
    if(s.left_exp != "10" || s.right_exp != "4" || s.display != "4" || s.operator != "+") {
        testFaild(s, testNumber, "expected left: 10, right: 4, display: 4, operator: +");
        failed = true;
    }

    testNumber++;

    //test 5
    s = calculateNextState(JSON.stringify(s) , "/");
    s = JSON.parse(s);
    if(s.left_exp != "14" || s.right_exp != "" || s.display != "14" || s.operator != "/") {
        testFaild(s, testNumber, "expected left: 14, right: '', display: 14, operator: /");
        failed = true;
    }

    testNumber++;

    //test 6
    s = calculateNextState(JSON.stringify(s) , "7");
    s = JSON.parse(s);
    if(s.left_exp != "14" || s.right_exp != "7" || s.display != "7" || s.operator != "/") {
        testFaild(s, testNumber, "expected left: 14, right: 7, display: 7, operator: /");
        failed = true;
    }

    testNumber++;

    //test 7
    s = calculateNextState(JSON.stringify(s) , "=");
    s = JSON.parse(s);
    if(s.left_exp != "" || s.right_exp != "" || s.display != "2" || s.operator != "") {
        testFaild(s, testNumber, "expected left: '', right: '', display: 2, operator: ''");
        failed = true;
    }

    testNumber++;
    
    //test 8
    s = calculateNextState(JSON.stringify(s) , "-");
    s = JSON.parse(s);
    if(s.left_exp != "2" || s.right_exp != "" || s.display != "2" || s.operator != "-") {
        testFaild(s, testNumber, "expected left: 2, right: '', display: 2, operator: -");
        failed = true;
    }

    testNumber++;

    //test 9
    s = calculateNextState(JSON.stringify(s) , "1");
    
    s = JSON.parse(s);
    if(s.left_exp != "2" || s.right_exp != "1" || s.display != "1" || s.operator != "-") {
        testFaild(s, testNumber, "expected left: 2, right: 1, display: 1, operator: -");
        failed = true;
    }

    testNumber++;

    //test 10
    s = calculateNextState(JSON.stringify(s) , "*");
    
    s = JSON.parse(s);
    
    if(s.left_exp != "1" || s.right_exp != "" || s.display != "1" || s.operator != "*") {
    
        testFaild(s, testNumber, "expected left: 1, right: '', display: 1, operator: *");
        failed = true;
    }

    testNumber++;

    //test 11
    s = calculateNextState(JSON.stringify(s) , "5");
    s = JSON.parse(s);
    
    if(s.left_exp != "1" || s.right_exp != "5" || s.display != "5" || s.operator != "*") { 
        testFaild(s, testNumber, "expected left: 1, right: 5, display: 5, operator: *");
        failed = true;
    }

    testNumber++;

    //test 12
    s = calculateNextState(JSON.stringify(s) , "=");
    s = JSON.parse(s);
    
    if(s.left_exp != "" || s.right_exp != "" || s.display != "5" || s.operator != "") { 
        testFaild(s, testNumber, "expected left: '', right: '', display: 5, operator: ''");
        failed = true;
    }
    return failed;
}


function testFaild(s,testNumber,msg){
    console.log("*************************************");
    console.log('faild in test '+testNumber);
    console.log(msg);
    if (s != null){
        console.log("got left: " + s.left_exp+", operator: "+ s.operator + 
        ", right: "+ s.right_exp + ", display: "+  s.display);
    }
    console.log("*************************************");
}




function testAll(){
    var s = null;
    s = initialize();
    console.log('testting updateNumber');
    faild = testUpdateNumber(s);

    console.log('\n\ntestting calculateValue');
    faild |= testCalculateValue(s);

    s=initialize();
    console.log('\n\ntestting updateOperator');
    faild |= testUpdateOperator(s);

    console.log('\ntesting calculateNextState');
    faild |= tetsCalculateNextState(s);


    console.log('\n');
    if(!faild){
        console.log('success');
    }
    else{
        console.log('faild!!')
    }
}
testAll();
