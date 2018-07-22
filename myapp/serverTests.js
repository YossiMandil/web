var request = require('sync-request');
var path = "http://localhost:9090";



function testAll(){
    // todo add testss!!!!!!!
    try{
        myTest = buildTest(null,"8","8");
        res = test(myTest,"1");
        myTest = buildTest(res,"+","8");
        res = test(myTest,"2");
        myTest = buildTest(res,"5","5");
        res = test(myTest,"3");
        myTest = buildTest(res,"=","13");
        res = test(myTest,"4");
    }
    catch(err){
        console.log(err.message);
    }
}



function test(myTest,testNumber){
    realAnswer = myTest.display;
    result = request('POST',path + '/calculate', {json:
        myTest.input
    });
    result = JSON.parse(result.getBody('utf8'));
    if(result.display != realAnswer){
        throw new Error("Error in test: "+ testNumber+"\n"+
        "expected: "+realAnswer+"\n"+
        "got: "+result.display);
    }
    return result;
}



function buildTest(left, right, display, operator, input, output){
        calculatorState = {
        "left_exp": left, 
        "right_exp": right, 
        "display": display, 
        "operator": operator
    };
    buildTest(calculatorState,input, output)
}


function buildTest(calculatorState, input,output){
        testJson = {"input": {
            "calculatorState": calculatorState , 
            "input": input
          },
          
          "display": output
        }
        return testJson;
}

testAll();