var p = 0;
var max = 5;
var color = ["#fc0303", "#fcba03", "#03fc07", "#03fcf0", "#fc03f4", "#ff8f8f"];
var cpuTime = 0;
var proc;
var arr, brust, pri; // in array
var priPrev;



$(function() {
    addPro();
    addPro();
    // add process!
    $(".add-pro").click(function() {
        //console.log(p)
        addPro();
        $("tbody .chart").remove();
    });

    // remove process!
    $(".remove-pro").click(function() {
        removePro();
        $("tbody .chart").remove();
    });

    //run process
    $(".run-pro").click(function() {

        console.log("running");
        getDataProcess();
        Timer = setInterval(function() { timeCounter() }, 1000);

    });
});

function addPro() {
    //var checkbok = "<input type='checkbox' name='record'>";
    let process = "<b>P" + p + "</b>";
    let status = "<input type='text' class='status' id='status_" + p + "' value='NEW' disabled>";
    let arrival = "<input type='number' id='arr_" + p + "' value='0'>";
    let brust = "<input type='number' id='brust_" + p + "' value='0'>";
    let priority = "<input type='number' id='pri_" + p + "' value='1'>";

    let markup = "<tr>" +
        /*"<td>" + checkbok + "</td>" +*/
        "<td>" + process + "</td>" +
        "<td>" + status + "</td>" +
        "<td>" + arrival + "</td>" +
        "<td>" + brust + "</td>" +
        "<td>" + priority + "</td>" +

        +"</tr>";
    if (p < max) {
        $(".tprocess tbody").append(markup);
        p++;
    } else {
        alert("Sorry!! : Process is maximum " + max + ".");
    }
}

function removePro() {
    if (p > 0) {
        let c = confirm("You want delete?");
        if (c == true) {
            $(".tbprocess tr:last").remove();
            p--;
        }
    } else {
        alert("Sorry!! : Process is minimum " + p + ".");
    }
}

function ganttChart() {
    let makeChart;
    $("tbody .chart").remove();
    for (let i = 0; i < p; i++) {
        makeChart = "<th class='chart' style='background-color:" + color[i] + "'>P" + i + "</th>";
        $(".tchart .tgantt-chart").append(makeChart);
        makeNumChart = "<td class='chart text-right'>" + i + "</td>";
        $(".tchart .tnumgantt-chart").append(makeNumChart);
    }
}

function timeCounter() {
    if (cpuTime >= 0) {
        $("#cpuTime").text(cpuTime);
        $("#cpuStatus").text("Running...");
        runProc(proc, cpuTime);
        cpuTime--;
    } else {
        clearInterval(Timer);
        $("#cpuStatus").text("Terminate!!");
        ganttChart();
    }

}

function getDataProcess() {
    //clear process
    proc = [];

    // get arrival ,brust ,pri
    // set CPU Time
    for (let i = 0; i < p; i++) {
        arr = parseInt($("#arr_" + i).val());
        brust = parseInt($("#brust_" + i).val());
        pri = parseInt($("#pri_" + i).val());

        cpuTime = cpuTime + brust; //set cpuTime by brust
        proc.push([arr, brust, pri]); // push to array
    }
    console.log(cpuTime);
    //console.log(proc[1][0]); //[key][arrival]
    console.log(proc);
}

function runProc(pro, ct) {
    //priority preemptive
    //alert(pro[0][0]);
    for (let i = 0; i < p; i++) {
        if (pro[i][0] == ct) {
            priPrev = pro[i][2]; //priority
            console.log("priority : " + priPrev);
            //console.log("yes : " + "proc[" + i + "]" + " : " + ct);
        } else
            console.log("no : " + "proc[" + i + "]" + ": " + ct);
    }

}