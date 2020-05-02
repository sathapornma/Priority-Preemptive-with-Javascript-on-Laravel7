var p = 0;
var max = 5;
var color = ["#fc0303", "#fcba03", "#03fc07", "#03fcf0", "#fc03f4"];
var cpuTime;

$(function() {
    addPro();
    addPro();
    // add process!
    $(".add-pro").click(function() {
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
        endTime = 3;
        cpuTime = setInterval(function() { makeTime() }, 1000);
    });
});

function addPro() {
    console.log("P" + p);
    //var checkbok = "<input type='checkbox' name='record'>";
    let process = "<b class='num_process' id='" + p + "'>P" + p + "</b>";
    let status = "<input type='text' class='status' name='' value='NEW' disabled>";
    let arrival = "<input type='number' name='' value='0'>";
    let brust = "<input type='number' name='' value='0'>";
    let priority = "<input type='number' name='' value='1'>";

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
    let c = confirm("You want delete?");
    if (c == true) {
        $(".tbprocess tr:last").remove();
        p--;
    }
}

function ganttChart() {
    let makeChart;
    $("tbody .chart").remove();
    for (let i = 0; i < p; i++) {
        makeChart = "<th class='chart' style='background-color:" + color[i] + "'>P" + i + "</th>";
        $(".tchart .tgantt-chart").append(makeChart);
        no = i + 1;
        makeNumChart = "<td class='chart text-right'>" + no + "</td>";
        $(".tchart .tnumgantt-chart").append(makeNumChart);
    }
}

function makeTime() {
    if (endTime >= 0) {
        $("#cpuTime").text(endTime);
        $("#cpuStatus").text("Running...");
        endTime--;
    } else {
        clearInterval(cpuTime);
        $("#cpuStatus").text("Terminate!!");
        ganttChart();
    }

}