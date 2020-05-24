var totalprocess = 0;
var maximum = 5;
var color = ["#fc0303", "#fcba03", "#03fc07", "#03fcf0", "#fc03f4", "#ff8f8f"];
var cpuStartTime, cpuEndTime;
var proc, process = [];
var arrivaltime, brusttime, priority; // in array
var queue = [
    [0, 0, 0]
];
var sortEqual = [];
var check = 1;

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
        cpuStartTime = 0;
        cpuEndTime = 0;

        $("tbody .chart").remove();
        getDataProcess();

        //console.log(proc);
        Timer = setInterval(function() { timeCounter() }, 1000);

    });
});

function addPro() {
    //var checkbok = "<input type='checkbox' name='record'>";
    let process = "<b>P" + totalprocess + "</b>";
    let status = "<input type='text' class='status' id='status_" + totalprocess + "' value='NEW' disabled>";
    let arr = "<input type='number' id='arr_" + totalprocess + "' value='0'>";
    let bru = "<input type='number' id='brust_" + totalprocess + "' value='0'>";
    let pri = "<input type='number' id='pri_" + totalprocess + "' value='1'>";

    let markup = "<tr>" +
        /*"<td>" + checkbok + "</td>" +*/
        "<td>" + process + "</td>" +
        "<td>" + status + "</td>" +
        "<td>" + arr + "</td>" +
        "<td>" + bru + "</td>" +
        "<td>" + pri + "</td>" +

        +"</tr>";
    if (totalprocess < maximum) {
        $(".tprocess tbody").append(markup);
        totalprocess++;
    } else {
        alert("Sorry!! : Process is maximumimum " + maximum + ".");
    }
}

function removePro() {
    if (totalprocess > 0) {
        let c = confirm("You want delete?");
        if (c == true) {
            $(".tbprocess tr:last").remove();
            totalprocess--;
        }
    } else {
        alert("Sorry!! : Process is minimum " + totalprocess + ".");
    }
}

function getDataProcess() {

    proc = []; //Clear the process
    // get arrival ,brust ,pri
    // set CPU Time
    for (let i = 0; i < totalprocess; i++) {
        arrivaltime = parseInt($("#arr_" + i).val());
        brusttime = parseInt($("#brust_" + i).val());
        priority = parseInt($("#pri_" + i).val());

        cpuEndTime += brusttime; //set cpuStartTime by brust
        proc.push([arrivaltime, brusttime, priority, i]); // push to array

    }
    swapProcess();

}

function swapProcess() {

    process = []; //Clear the process
    let arrPrev;
    //Sort the process with arrival.
    proc.sort((a, b) => a[0] - b[0]);
    //Swap the process positions when arrival with equal values.
    arrPrev = proc[0][0];

    for (let i = 0; i < totalprocess; i++) {
        if (proc[i][0] == arrPrev)
            sortEqual.push(proc[i]);
        else {
            sortProcess();
            process.push(proc[i]);
        }
        arrPrev = proc[i][0];
    }

    process.sort((a, b) => a[0] - b[0]);
    console.log(process);
}

function sortProcess() {
    if (Array.isArray(sortEqual) && sortEqual.length) {
        sortEqual.sort((a, b) => a[2] - b[2]);
        for (let i = 0; i < sortEqual.length; i++) {
            process.push(sortEqual[i]);
        }
        sortEqual = [];
    }
}

function ganttChart() {
    let makeChart;
    $("tbody .chart").remove();
    for (let i = 0; i < totalprocess; i++) {
        makeChart = "<th class='chart' style='background-color:" + color[i] + "'>P" + i + "</th>";
        $(".tchart .tgantt-chart").append(makeChart);
        makeNumChart = "<td class='chart text-right'>" + i + "</td>";
        $(".tchart .tnumgantt-chart").append(makeNumChart);
    }
}

function timeCounter() {
    if (cpuStartTime <= cpuEndTime) {
        $("#cpuStartTime").text(cpuStartTime);
        $("#cpuEndTime").text(cpuEndTime);
        $("#cpuStatus").html("<b class='text-warning'>Running...</b>");
        runProc(cpuStartTime);
        cpuStartTime++;

    } else {
        clearInterval(Timer);
        $("#cpuStatus").html("<b class='text-success'>Terminate !!</b>");
        ganttChart();
    }

}

function runProc(ct) {
    let i = ct;

    if (Array.isArray(queue) && queue.length) {
        if (i < totalprocess) {
            if (process[i][2] <= queue[0][2] || check == 1) {
                process[i][1] -= 1; //pro brust time
                console.log("Time : " + ct + " P " + process[i][3]);
                if (process[i][1] != 0) {
                    //new queue
                    queue.push(process[i]);
                    queue.reverse();
                    queue.pop();

                    queue.sort((a, b) => a[2] - b[2]);
                }
                check = 0;

            } else {
                queue[0][1] -= 1; //queue brust time
                console.log("Time : " + ct + " P " + queue[0][3]);
                if (queue[0][1] == 0) {
                    queue.reverse();
                    queue.pop();
                }
                queue.push(process[i]);
                queue.sort((a, b) => a[2] - b[2]);
            }
        } else if (i >= totalprocess) {

            queue[0][1] -= 1; //queue brust time
            console.log("Time : " + ct + ", P" + queue[0][3]);
            if (queue[0][1] == 0) {
                queue.reverse();
                queue.pop();
            }
            queue.sort((a, b) => a[2] - b[2]);
        }

        console.log(queue);

    }
}