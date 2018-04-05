var convertButton = document.getElementById("convert-button").addEventListener("click", convert);

var result = document.getElementById("result");
var content = document.getElementById("content-area");

function convert() {

    var r = parse(content.value);
    result.innerHTML = String(r);
}


function parse(payload) {

    var json = new Object();

    var allLines = payload.split(/\n|\r\n/);
    var headers = allLines[0].split(',');
    var pm_data = [];

    json.serial = headers[0];
    json.product = headers[1];
    json.test_id = headers[2];
    json.software_id = headers[3];
    json.software_rev = headers[9];
    json.operator = headers[4].split('$')[0];
    json.password = headers[4].split('$')[0];
    json.start_time = headers[7];
    json.end_time = headers[8];
    json.type = headers[6];
    json.process_name = "Functional Test";
    json.comment = "";
    json.status = headers[5];
    json.error_code = "";
    json.measkey = "";

    //json.pm_data = 
    var test_group = [];
    var steps = [];

    //reading parametric data from the content
    for (var index = 1; index < allLines.length; ++index) {

        var tests = allLines[index].split(',');

        var test_step = new Object();

        test_step.group_name = tests[0];
        test_step.name = tests[1];
        test_step.description = "";
        test_step.comparator = tests[6];
        test_step.lowLimit  = tests[3];
        test_step.lowControlLimit
        test_step.highLimit  = tests[5];
        test_step.highControlLimit = "";
        test_step.expected = "";
        test_step.units  = tests[8];
        test_step.status = tests[2];
        test_step.comment = "";
        test_step.value = tests[7];
        test_step.sequence = "";

        steps.push(test_step);
    }

    json.pm_data = steps;

    var jsonString = JSON.stringify(json);

    return jsonString;

}


